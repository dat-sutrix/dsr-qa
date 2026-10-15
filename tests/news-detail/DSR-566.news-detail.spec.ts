import { test, expect, type Locator, type Page } from '@playwright/test';
import { NewsDetailPage } from '../../pages/NewsDetailPage';
import { languages, type Language, viewports, newsPath, queryIndexPaths, rootQueryIndex, indexFields, backToListSuffix, relatedPattern, seoMeta, isoDate } from '../../fixtures/dsr-566';

test.use({ viewport: viewports.PC });
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

async function openNews(page: Page, lang: Language) {
  const news = new NewsDetailPage(page);
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const response = await news.goto(newsPath(lang));
  test.skip(response?.status() === 404, `Blocked – page not on DEV (${newsPath(lang)} HTTP 404)`);
  expect(response?.status()).toBe(200);
  observations.push({ language: lang, url: page.url(), status: response?.status(), consoleErrors: errors });
  return news;
}
// DOM position of the first match, for order checks.
const before = async (a: Locator, b: Locator) => a.evaluate((x, y) => !!(x.compareDocumentPosition(y as Node) & Node.DOCUMENT_POSITION_FOLLOWING), await b.elementHandle());

for (const lang of languages) {
  test.describe(lang, () => {
    test(`DSR-NEWS-001 [${lang}] page shows date, category, title and body`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      observations.push({ counts: { date: await news.date.count(), category: await news.category.count(), title: await news.title.count(), body: await news.body.count(), image: await news.images.count(), backToList: await news.backToList.count() } });
      for (const [name, el] of [['date', news.date], ['category', news.category], ['title', news.title], ['body', news.body]] as const) {
        await expect.soft(el.first(), `${name} visible`).toBeVisible();
      }
    });

    test(`DSR-NEWS-002 [${lang}] fixed order date → category → title → body → CTA → Back to list`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      const chain: [string, Locator][] = [['date', news.date], ['category', news.category], ['title', news.title], ['body', news.body], ['cta', news.cta], ['backToList', news.backToList]];
      const present: { name: string; count: number }[] = [];
      for (const [name, el] of chain) present.push({ name, count: await el.count() });
      observations.push({ present });
      // CTA is optional (if authored); Back to list is a template area and must exist.
      const missing = present.filter(p => p.count === 0 && p.name !== 'cta').map(p => p.name);
      expect(missing, 'required elements missing').toEqual([]);
      const ordered = chain.filter(([name]) => present.find(p => p.name === name)!.count > 0);
      for (let i = 0; i < ordered.length - 1; i++) {
        expect.soft(await before(ordered[i][1].first(), ordered[i + 1][1].first()), `${ordered[i][0]} before ${ordered[i + 1][0]}`).toBe(true);
      }
    });

    test(`DSR-NEWS-003 [${lang}] shown date equals meta publish date`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      const shown = (await news.date.first().innerText()).trim();
      const meta = await page.locator('meta[name="published-time"]').getAttribute('content');
      observations.push({ shown, metaPublishedTime: meta, shownIso: isoDate(shown), metaIso: isoDate(meta), note: 'format recorded only (A4 / tc-questions Q1 open)' });
      expect(isoDate(shown), 'shown date parsable').not.toBeNull();
      expect(isoDate(shown)).toBe(isoDate(meta));
    });

    test(`DSR-NEWS-004 [${lang}] category and title are non-empty text`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      for (const [name, el] of [['category', news.category], ['title', news.title]] as const) {
        await expect(el, `${name} count`).toHaveCount(1);
        const info = await el.evaluate(e => ({ tag: e.tagName.toLowerCase(), text: (e as HTMLElement).innerText.trim(), images: e.querySelectorAll('img, svg, picture').length }));
        observations.push({ [name]: info });
        expect.soft(info.tag, `${name} is not an image`).not.toMatch(/^(img|svg|picture)$/);
        expect.soft(info.images, `${name} contains no image`).toBe(0);
        expect.soft(info.text, `${name} text`).not.toBe('');
      }
      // Recorded only: spec.json 4.0 full text also expects the title to be the single h1.
      observations.push({ h1Count: await page.locator('h1').count(), titleTag: await news.title.evaluate(e => e.tagName.toLowerCase()) });
    });

    test(`DSR-NEWS-006 [${lang}] Back to list href resolves to /${lang}/news/`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      await expect(news.backToList, 'Back to list link').toHaveCount(1);
      const href = await news.backToList.getAttribute('href');
      const resolved = new URL(href ?? '', page.url()).pathname;
      observations.push({ href, resolved, target: await news.backToList.getAttribute('target'), note: 'target page status not asserted (A3)' });
      expect(resolved.endsWith(backToListSuffix(lang)), `${resolved} ends with ${backToListSuffix(lang)}`).toBe(true);
    });

    test(`DSR-NEWS-007 [${lang}] page row in query-index with publishDate/category/tags/template`, { tag: ['@auto'] }, async ({ page, request }) => {
      await openNews(page, lang);
      const path = newsPath(lang);
      let found: { index: string; row: Record<string, unknown>; columns: string[] } | null = null;
      for (const index of queryIndexPaths(lang)) {
        const res = await request.get(index);
        const json = res.ok() ? await res.json().catch(() => null) : null;
        const row = json?.data?.find((r: { path: string }) => r.path === path);
        observations.push({ index, status: res.status(), rows: json?.data?.length ?? null, containsPage: !!row });
        if (row && !found) found = { index, row, columns: json.columns ?? Object.keys(row) };
      }
      // Recorded only: site-wide index (not one of the job's two paths).
      const root = await request.get(rootQueryIndex);
      const rootJson = root.ok() ? await root.json().catch(() => null) : null;
      observations.push({ index: rootQueryIndex, status: root.status(), row: rootJson?.data?.find((r: { path: string }) => r.path === path) ?? null, recordedOnly: true });
      expect(found, `page ${path} in ${queryIndexPaths(lang).join(' or ')}`).not.toBeNull();
      observations.push({ foundIn: found!.index, row: found!.row });
      for (const field of indexFields) {
        // Index column may be named publicationdate on DEV; record both.
        const keys = field === 'publishDate' ? ['publishDate', 'publicationdate'] : [field];
        expect.soft(keys.some(k => found!.columns.includes(k)), `field ${field} present`).toBe(true);
      }
    });

    test(`DSR-NEWS-009 [${lang}] no related-content block`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      const blocks = await news.main.locator('[class*="related"], [data-block-name*="related"]').count();
      const headings = await news.main.getByRole('heading', { name: relatedPattern }).count();
      observations.push({ relatedBlocks: blocks, relatedHeadings: headings, blockNames: await news.main.locator('[data-block-name]').evaluateAll(els => els.map(e => e.getAttribute('data-block-name'))) });
      expect.soft(blocks).toBe(0);
      expect.soft(headings).toBe(0);
    });

    test(`DSR-NEWS-010 [${lang}] CTA (Button8) href equals authored URL`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      await expect(news.cta, 'Button8 CTA').toHaveCount(1);
      const href = await news.cta.getAttribute('href');
      const authored = await news.authoredCtaHref(newsPath(lang));
      observations.push({ label: (await news.cta.innerText()).trim(), href, authored, resolved: new URL(href ?? '', page.url()).href });
      expect(href ?? '').not.toBe('');
      expect(href).not.toBe('#');
      expect(href).toBe(authored);
    });

    test(`DSR-NEWS-012 [${lang}] My List button and share icons visible and enabled (no click)`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      const shares = await news.share.evaluateAll(els => els.map(a => ({ href: a.getAttribute('href'), label: a.getAttribute('aria-label') ?? a.textContent?.trim() })));
      observations.push({ metaClass: await news.meta.getAttribute('class'), myList: await news.myList.count(), shares });
      await expect.soft(news.myList, 'My List button').toBeVisible();
      await expect.soft(news.myList, 'My List enabled').toBeEnabled();
      expect.soft(shares.length, 'share icons').toBeGreaterThan(0);
      for (let i = 0; i < shares.length; i++) {
        await expect.soft(news.share.nth(i), `share ${i} visible`).toBeVisible();
        expect.soft(shares[i].href ?? '', `share ${i} href`).not.toMatch(/^(#?)$/);
      }
    });

    test(`DSR-NEWS-013 [${lang}] body keeps h2/h3, strong, ul/ol, a when present`, { tag: ['@auto'] }, async ({ page }) => {
      const news = await openNews(page, lang);
      await expect(news.body.first()).toBeVisible();
      const counts = await news.body.evaluateAll(els => Object.fromEntries(['h2', 'h3', 'strong', 'ul', 'ol', 'li', 'a'].map(t => [t, els.reduce((n, e) => n + e.querySelectorAll(t).length, 0)])));
      const links = await news.body.locator('a').evaluateAll(els => els.map(a => a.getAttribute('href')));
      observations.push({ counts, links });
      test.info().annotations.push({ type: 'observed', description: `body elements ${JSON.stringify(counts)}` });
      for (const href of links) expect.soft(href ?? '', 'body link href').not.toMatch(/^(#?)$/);
      if (counts.ul + counts.ol > 0) expect.soft(counts.li, 'list items').toBeGreaterThan(0);
    });

    test(`DSR-NEWS-018 [${lang}] title, description and og tags non-empty`, { tag: ['@auto'] }, async ({ page }) => {
      await openNews(page, lang);
      const head = await new NewsDetailPage(page).head();
      observations.push({ head });
      expect.soft((await page.title()).trim(), '<title>').not.toBe('');
      for (const selector of seoMeta) {
        const content = await page.locator(selector).first().getAttribute('content', { timeout: 1_000 }).catch(() => null);
        expect.soft(content?.trim() ?? '', selector).not.toBe('');
      }
    });
  });
}
