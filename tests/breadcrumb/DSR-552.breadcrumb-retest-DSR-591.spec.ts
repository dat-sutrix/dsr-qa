// Retest of bug DSR-591 (hub jobs JOB-20261014-01, JOB-20261015-02): breadcrumb must follow the URL hierarchy of published pages,
// not query-index.json. Kept separate from DSR-552.breadcrumb.spec.ts so its afterEach does not overwrite committed evidence.
import { test, expect, type Page, type Locator } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { type Language, homePath, testSpacePath, t1, expectedTrail, expectedPaths, normalizeUrl, viewports } from '../../fixtures/dsr-552';

test.use({ viewport: viewports.PC });
// Hub job protocol: failure screenshots only, under the job's result folder.
const evidence = path.resolve(process.env.DSR_JOB_EVIDENCE || 'test-results/DSR-591-retest');
const grandchild = (lang: Language) => testSpacePath(lang, t1[2]);
const child = (lang: Language) => testSpacePath(lang, t1[1]);
// data-testid is live (docs/DSR-552/data-testid.md); JOB-20261015-02 asks to prefer it.
const crumbs = (page: Page) => page.getByTestId('breadcrumb');
const crumbItems = (nav: Locator) => nav.getByTestId('breadcrumb-item');

async function openGrandchild(page: Page, lang: Language, url = grandchild(lang)) {
  const response = await page.goto(url);
  expect(response?.status()).toBe(200);
  const nav = crumbs(page); await expect(nav).toBeVisible();
  // The block renders HOME + current first and inserts ancestors asynchronously; wait until the trail is settled.
  await page.waitForLoadState('networkidle');
  let previous = -1;
  await expect.poll(async () => { const count = await crumbItems(nav).count(); const settled = count === previous; previous = count; return settled; },
    { intervals: [500], timeout: 10_000, message: 'breadcrumb item count settled' }).toBe(true);
  return nav;
}
async function titleOf(page: Page, url: string) {
  const response = await page.request.get(url);
  const html = await response.text();
  return { status: response.status(), title: html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1].trim() ?? null };
}

test.afterEach(async ({ page }, info) => {
  if (info.status === info.expectedStatus || page.url() === 'about:blank') return;
  const id = info.title.match(/^(DSR-BREAD-\d+) \[(\w+)\]/)!;
  fs.mkdirSync(evidence, { recursive: true });
  await page.goto((id[1] === 'DSR-BREAD-001' ? child : grandchild)(id[2] as Language)).catch(() => {});
  const file = path.join(evidence, `${id[1]}_${id[2]}.png`);
  await crumbs(page).screenshot({ path: file }).catch(() => page.screenshot({ path: file }));
  await info.attach('breadcrumb', { path: file, contentType: 'image/png' });
});

for (const lang of ['ja', 'en'] as const) {
  test(`DSR-BREAD-001 [${lang}] child trail follows URL hierarchy`, { tag: ['@DSR-591'] }, async ({ page }) => {
    const nav = await openGrandchild(page, lang, child(lang));
    const items = crumbItems(nav);
    const observed = (await items.allTextContents()).map(s => s.trim());
    await test.info().attach('observed', { body: JSON.stringify({ url: page.url(), items: observed }), contentType: 'application/json' });
    await expect(items).toHaveText(expectedTrail(lang, 1));
  });

  test(`DSR-BREAD-005 [${lang}] grandchild trail follows URL hierarchy`, { tag: ['@DSR-591'] }, async ({ page }) => {
    const nav = await openGrandchild(page, lang);
    const items = crumbItems(nav);
    const observed = (await items.allTextContents()).map(s => s.trim());
    await test.info().attach('observed', { body: JSON.stringify({ url: page.url(), items: observed }), contentType: 'application/json' });
    await expect(items).toHaveText(expectedTrail(lang, 2));
    await expect(items).toHaveCount(5);
  });

  test(`DSR-BREAD-002 [${lang}] ancestor links navigate in same tab`, { tag: ['@DSR-591'] }, async ({ page, baseURL }) => {
    const nav = await openGrandchild(page, lang);
    const trail = expectedTrail(lang, 2); const paths = expectedPaths(lang, 2);
    const observed: Record<string, unknown>[] = [];
    // Click order from the job: QA Child, QA Parent, test-space item, HOME (back to grandchild between clicks).
    for (const i of [3, 2, 1, 0]) {
      const link = nav.getByTestId('breadcrumb-link').filter({ hasText: new RegExp(`^\\s*${trail[i]}\\s*$`) });
      if (await link.count() === 0) { observed.push({ item: trail[i], missing: true }); expect.soft(await link.count(), `breadcrumb link "${trail[i]}" present`).toBe(1); continue; }
      const href = (await link.getAttribute('href'))!;
      const target = await link.getAttribute('target');
      const pagesBefore = page.context().pages().length;
      const [response] = await Promise.all([page.waitForNavigation(), link.click()]);
      const row = { item: trail[i], href, target, url: page.url(), status: response?.status(), pages: page.context().pages().length };
      observed.push(row);
      expect.soft(normalizeUrl(href, baseURL!), `href of "${trail[i]}"`).toBe(normalizeUrl(paths[i], baseURL!));
      expect.soft(['_self', null, ''], `target of "${trail[i]}"`).toContain(target);
      expect.soft(normalizeUrl(page.url(), baseURL!), `URL after clicking "${trail[i]}"`).toBe(normalizeUrl(paths[i], baseURL!));
      // JOB-20261015-02: HOME /master/{lang} 404 is a known data gap, reported separately as blocked, not a TC failure.
      if (i === 0) test.info().annotations.push({ type: 'home-status', description: String(response?.status()) });
      else expect.soft(response?.status(), `HTTP status of ${paths[i]}`).toBe(200);
      expect.soft(row.pages, 'same tab').toBe(pagesBefore);
      await page.goBack(); await expect(page).toHaveURL(new RegExp(grandchild(lang) + '/?$'));
    }
    await test.info().attach('observed', { body: JSON.stringify(observed, null, 2), contentType: 'application/json' });
  });

  test(`DSR-BREAD-011 [${lang}] items equal page titles`, { tag: ['@DSR-591'] }, async ({ page, baseURL }) => {
    const nav = await openGrandchild(page, lang);
    const items = crumbItems(nav);
    const observed: Record<string, unknown>[] = [];
    for (const item of await items.all()) {
      const text = (await item.textContent())?.trim() ?? '';
      const link = item.getByTestId('breadcrumb-link');
      const href = await link.count() ? await link.getAttribute('href') : null;
      // HOME is a fixed label (docs/DSR-552/test-data.md); current item is compared with this page's title.
      const source = href === null ? { status: 200, title: await page.title() } : normalizeUrl(href, baseURL!) === normalizeUrl(homePath(lang), baseURL!) ? null : await titleOf(page, href);
      observed.push({ text, href, pageStatus: source?.status, pageTitle: source?.title });
      expect.soft(text, 'no empty item').not.toBe('');
      expect.soft(['dsr552-bc', 'child', 'grandchild', ...(lang === 'ja' ? ['test-space'] : [])], 'no node name').not.toContain(text);
      if (source) expect.soft(text, `item equals title of ${href ?? 'current page'}`).toBe(source.title);
    }
    await test.info().attach('observed', { body: JSON.stringify(observed, null, 2), contentType: 'application/json' });
    await expect(items).toHaveText(expectedTrail(lang, 2));
  });
}
