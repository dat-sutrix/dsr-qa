import { test, expect, type APIRequestContext, type Browser } from '@playwright/test';
import { CatalogDetailPage } from '../../pages/CatalogDetailPage';
import {
  type Language, base, hosts, catalogPath, searchPath, dsrCfPath, td, tdKeys, notSeeded, inactiveId, removedId,
  negativePending, siteTitleSuffix, listPath, redirectWaitMs, graphqlPattern, indexPath, htmlLang, cnPending,
} from '../../fixtures/dsr-654';

// DSR-654 catalog detail via overlay + json2html, baseline BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md).
// Scaffold mirrors tests/movie-detail/DSR-587.movie-overlay.spec.ts. Read-only.
// TODO TC id from TC job: DSR-CATOV-NNN below are placeholders until the DSR-654 TC sheet exists.
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

const url = (path: string, host = base()) => `${host}${path}`;

async function status(request: APIRequestContext, target: string) {
  const response = await request.get(target, { maxRedirects: 0, failOnStatusCode: false });
  observations.push({ url: target, status: response.status(), location: response.headers().location ?? null });
  return response;
}

// Preflight: TD page 404 where 200 expected → skip (never fail on missing data).
async function rawCatalog(request: APIRequestContext, lang: Language, id: string) {
  const target = url(catalogPath(lang, id));
  const response = await status(request, target);
  test.skip(response.status() === 404, `${notSeeded(id)} (${target} HTTP 404)`);
  return { response, target, html: await response.text() };
}

// Static HTML read in a JS-disabled context. Block rows: <div class="catalog-detail"><div><div>key</div><div>value</div></div>…
async function parseRaw(browser: Browser, html: string) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    return await page.evaluate(() => {
      const meta = (sel: string) => document.querySelector<HTMLMetaElement>(sel)?.content ?? null;
      const rows = [...document.querySelectorAll('main .catalog-detail > div')].map(row => {
        const cells = [...row.children] as HTMLElement[];
        return { key: (cells[0]?.textContent ?? '').trim(), value: (cells[1]?.textContent ?? '').trim() };
      });
      return {
        title: document.title,
        description: meta('meta[name="description"]'),
        robots: meta('meta[name="robots"]'),
        ogImage: meta('meta[property="og:image"]'),
        cfPath: meta('meta[name="cf-path"]'),
        rows,
      };
    });
  } finally {
    await context.close();
  }
}

const row = (rows: { key: string; value: string }[], key: string) => rows.find(r => r.key === key)?.value ?? null;

test.describe('DSR-654 catalog detail overlay', () => {
  for (const lang of ['ja', 'en'] as const) {
    for (const key of tdKeys) {
      const data = td[key];

      test(`DSR-CATOV-001 [${lang}] ${data.id}: overlay page 200, no redirect, catalog title shown`, { tag: ['@auto'] }, async ({ page }) => {
        const catalog = new CatalogDetailPage(page);
        const target = url(catalogPath(lang, data.id));
        const response = await catalog.goto(target);
        observations.push({ url: target, finalUrl: page.url(), status: response?.status() });
        test.skip(response?.status() === 404, `${notSeeded(data.id)} (${target} HTTP 404)`);
        expect(response?.status()).toBe(200);
        expect(page.url(), 'no redirect').toBe(target);
        await expect(catalog.title).toHaveText(data.title);
        // requiresForm = true → HubSpot form shown on the detail page (DSR-570 / DSR-655 Y3).
        await expect.soft(catalog.form, 'form slot').toHaveCount(data.requiresForm ? 1 : 0);
      });

      test(`DSR-CATOV-002 [${lang}] ${data.id}: raw HTML head + overlay rows, DSR CF same id as content CF`, { tag: ['@auto'] }, async ({ request, browser }) => {
        const { response, html } = await rawCatalog(request, lang, data.id);
        expect(response.status()).toBe(200);
        const raw = await parseRaw(browser, html);
        observations.push(raw);
        expect.soft(raw.title, '<title>').toBe(`${data.title}${siteTitleSuffix}`);
        expect.soft(raw.description ?? '', 'meta description').not.toBe('');
        expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
        expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
        // Directory-strict: DSR CF directly under /content/dam/dsr/{lang}/catalogs/, name = URL id.
        expect.soft(raw.cfPath, 'meta cf-path').toBe(dsrCfPath(lang, data.id));
        expect.soft(row(raw.rows, 'source'), 'row source').toBe('overlay');
        expect.soft(row(raw.rows, 'cfPath'), 'row cfPath').toBe(dsrCfPath(lang, data.id));
        // 1 content CF ⇒ 1 DSR CF same id: catalogId comes from the content CF.
        expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
        expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
        expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
        expect.soft(raw.rows.map(r => r.key), 'no unavailable row').not.toContain('unavailable');
      });

      test(`DSR-CATOV-003 [${lang}] ${data.id}: live-published → 200 on .aem.page and .aem.live`, { tag: ['@auto'] }, async ({ request }) => {
        const path = catalogPath(lang, data.id);
        const page = (await status(request, url(path, hosts().page))).status();
        const live = (await status(request, url(path, hosts().live))).status();
        test.skip(page === 404 && live === 404, `${notSeeded(data.id)} (${path} HTTP 404 on .aem.page and .aem.live)`);
        expect.soft(page, '.aem.page').toBe(200);
        expect.soft(live, '.aem.live').toBe(200);
      });
    }

    test(`DSR-CATOV-004 [${lang}] naming rule: uppercase / underscore id → 404`, { tag: ['@auto'] }, async ({ request }) => {
      // Precondition: the lowercase page exists on this host, so a 404 on the variant comes from the regex.
      const { id } = td.pdfForm;
      await rawCatalog(request, lang, id);
      // TODO(TC job): subfolder / outside /content/dam/dsr DSR CF cases need their own TD ids.
      for (const variant of [id.toUpperCase(), id.replace(/-/g, '_')]) {
        expect.soft((await status(request, url(catalogPath(lang, variant)))).status(), variant).toBe(404);
      }
    });

    test(`DSR-CATOV-005 [${lang}] isActive (表示フラグ) = false → noindex, browser sent to catalog list`, { tag: ['@auto'] }, async ({ request, browser, page }) => {
      test.skip(!inactiveId, negativePending('isActive=false'));
      const { html, target } = await rawCatalog(request, lang, inactiveId!);
      const raw = await parseRaw(browser, html);
      observations.push({ robots: raw.robots, rows: raw.rows });
      expect.soft(raw.robots ?? '', 'meta robots').toContain('noindex');
      await page.goto(target);
      await page.waitForTimeout(redirectWaitMs);
      observations.push({ finalUrl: page.url() });
      expect.soft(new URL(page.url()).pathname, 'final URL').toBe(listPath(lang));
      await expect.soft(new CatalogDetailPage(page).title, 'catalog title not shown').toHaveCount(0);
    });

    test(`DSR-CATOV-006 [${lang}] unpublished DSR CF → 404 on both hosts, absent from query-index`, { tag: ['@auto'] }, async ({ request }) => {
      test.skip(!removedId, negativePending('unpublished'));
      const path = catalogPath(lang, removedId!);
      for (const host of [hosts().page, hosts().live]) expect.soft((await status(request, url(path, host))).status(), host).toBe(404);
      const index = await status(request, url(indexPath));
      const paths = index.ok() ? ((await index.json())?.data ?? []).map((r: { path?: string }) => r.path) : [];
      expect.soft(index.status(), 'query-index HTTP').toBe(200);
      expect.soft(paths, 'query-index paths').not.toContain(path);
    });

    test(`DSR-CATOV-007 [${lang}] catalog/search is not an overlay page`, { tag: ['@auto'] }, async ({ page }) => {
      const target = url(searchPath(lang));
      const response = await page.goto(target);
      observations.push({ url: target, finalUrl: page.url(), status: response?.status() });
      test.skip(response?.status() === 404, `catalog/search Sites page not published (${target} HTTP 404)`);
      expect(response?.status(), target).toBe(200);
      await expect(page.locator('main .catalog-detail'), 'catalog-detail block').toHaveCount(0);
    });

    test(`DSR-CATOV-008 [${lang}] overlay page makes 0 GraphQL requests; html lang`, { tag: ['@auto'] }, async ({ request, page }) => {
      const { id } = td.pdfForm;
      await rawCatalog(request, lang, id);
      const graphql: string[] = [];
      page.on('request', r => { if (graphqlPattern.test(r.url())) graphql.push(r.url()); });
      await page.goto(url(catalogPath(lang, id)), { waitUntil: 'networkidle' });
      const actualLang = await page.locator('html').getAttribute('lang');
      observations.push({ graphql, htmlLang: actualLang });
      expect.soft(graphql, 'requests to */graphql/* or */execute.json/*').toEqual([]);
      expect.soft(actualLang, 'html lang').toBe(htmlLang[lang]);
    });
  }

  test('DSR-CATOV-001 [cn] catalog overlay pages', () => { test.fixme(true, cnPending); });
});
