import { test, expect, type Locator, type Page } from '@playwright/test';
import { ArticleDetailPage, type MetaEntry } from '../../pages/ArticleDetailPage';
import {
  languages, type Language, viewports, slugs, articlePath, minimalLanguages, blockedData,
  td01, td01Common, td02, blockOrder, optionalBlocks, uniqueMeta, transformParams, storiesIndexPaths, indexProperties, isoDate,
} from '../../fixtures/dsr-529';

test.use({ viewport: viewports.PC });
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

// Preflight: open the TD page under library/article/stories (no fallback). 404 → blocked-data skip.
async function openArticle(page: Page, lang: Language, slug: string = slugs.full) {
  const article = new ArticleDetailPage(page);
  const errors: string[] = [];
  page.on('pageerror', e => errors.push(e.message));
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  const path = articlePath(lang, slug);
  const response = await article.goto(path);
  test.skip(response?.status() === 404, `${blockedData} (${path} HTTP 404)`);
  expect(response?.status()).toBe(200);
  observations.push({ language: lang, path, url: page.url(), status: response?.status() });
  return { article, path, errors };
}
const metaValues = (meta: MetaEntry[], key: string) => meta.filter(m => m.key === key).map(m => m.content ?? '');
// DOM position of the first match, for order checks.
const before = async (a: Locator, b: Locator) => a.evaluate((x, y) => !!(x.compareDocumentPosition(y as Node) & Node.DOCUMENT_POSITION_FOLLOWING), await b.elementHandle());

for (const lang of languages) {
  test.describe(lang, () => {
    test(`DSR-ARTICLE-002 [${lang}] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error`, { tag: ['@auto'] }, async ({ page }) => {
      const { article, errors } = await openArticle(page, lang);
      const present: { name: string; count: number }[] = [];
      for (const name of blockOrder) present.push({ name, count: await article.block(name).count() });
      const emptyBlocks = await article.main.locator('.block').evaluateAll(els => els.filter(e => e.getBoundingClientRect().height === 0 || !(e.textContent?.trim() || e.querySelector('img, picture, svg, video, iframe'))).map(e => e.className));
      observations.push({ present, emptyBlocks, consoleErrors: errors, blockNames: await article.main.locator('[data-block-name]').evaluateAll(els => els.map(e => e.getAttribute('data-block-name'))) });
      // Block 13 may be absent (spec.json 2.0 blocked note) – recorded only.
      const missing = present.filter(p => p.count === 0 && !optionalBlocks.includes(p.name)).map(p => p.name);
      expect.soft(missing, 'required blocks missing').toEqual([]);
      const ordered = blockOrder.filter(name => present.find(p => p.name === name)!.count > 0);
      for (let i = 0; i < ordered.length - 1; i++) {
        expect.soft(await before(article.block(ordered[i]).first(), article.block(ordered[i + 1]).first()), `${ordered[i]} before ${ordered[i + 1]}`).toBe(true);
      }
      expect.soft(emptyBlocks, 'empty blocks').toEqual([]);
      expect.soft(errors, 'console errors').toEqual([]);
    });

    test(`DSR-ARTICLE-003 [${lang}] title block = TD title, one h1, <title> = title`, { tag: ['@auto'] }, async ({ page }) => {
      const { article } = await openArticle(page, lang);
      await expect(article.title, 'h1 count').toHaveCount(1);
      const info = await article.title.evaluate(e => ({ text: (e as HTMLElement).innerText.trim(), images: e.querySelectorAll('img, svg, picture').length }));
      observations.push({ h1: info, documentTitle: await page.title(), expected: td01[lang].title });
      expect.soft(info.text).toBe(td01[lang].title);
      expect.soft(info.images, 'title is text, not image').toBe(0);
      expect.soft(await page.title(), '<title>').toBe(td01[lang].title);
    });

    test(`DSR-ARTICLE-006 [${lang}] info bar shows 2 tag labels, not raw tag IDs`, { tag: ['@auto'] }, async ({ page }) => {
      const { article } = await openArticle(page, lang);
      const labels = (await article.tags.allInnerTexts()).map(t => t.trim()).filter(Boolean);
      observations.push({ labels, note: 'label language = page language is assumption A5 / Q5' });
      expect.soft(labels, 'tag labels').toHaveLength(td01Common.tagCount);
      // Raw tag IDs look like namespace:path (spec.json 12.0).
      for (const label of labels) expect.soft(label, 'not a raw tag ID').not.toMatch(/^[\w-]+:[\w/-]+$/);
    });

    test(`DSR-ARTICLE-007 [${lang}] info bar date = meta published-date`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { article, path } = await openArticle(page, lang);
      await expect(article.date.first(), 'info bar date').toBeVisible();
      const shown = (await article.date.first().innerText()).trim();
      const meta = metaValues((await article.rawMeta(request, path)).meta, 'published-date')[0] ?? null;
      observations.push({ shown, metaPublishedDate: meta, shownIso: isoDate(shown), metaIso: isoDate(meta), expectedFormat: 'YYYY.MM.DD (A4 / Q4 open – format recorded only)' });
      expect(isoDate(shown), 'shown date parsable').not.toBeNull();
      expect(isoDate(shown)).toBe(isoDate(meta));
    });

    test(`DSR-ARTICLE-008 [${lang}] My List button and share icons visible/enabled; share href has encoded page URL (no click)`, { tag: ['@auto'] }, async ({ page }) => {
      const { article } = await openArticle(page, lang);
      const shares = await article.share.evaluateAll(els => els.map(a => ({ href: a.getAttribute('href'), label: a.getAttribute('aria-label') ?? a.textContent?.trim() })));
      const pageUrl = page.url().split(/[?#]/)[0];
      observations.push({ infoBarClass: await article.infoBar.first().getAttribute('class').catch(() => null), myList: await article.myList.count(), shares, pageUrl });
      await expect.soft(article.myList, 'My List button').toBeVisible();
      await expect.soft(article.myList, 'My List enabled').toBeEnabled();
      expect.soft(shares.length, 'share icons').toBeGreaterThan(0);
      for (let i = 0; i < shares.length; i++) {
        await expect.soft(article.share.nth(i), `share ${i} visible`).toBeVisible();
        expect.soft(shares[i].href ?? '', `share ${i} href contains encoded page URL`).toContain(encodeURIComponent(pageUrl));
      }
    });

    test(`DSR-ARTICLE-010 [${lang}] meta published-date / updated-date ISO 8601, one each; update date not visible`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { article, path } = await openArticle(page, lang);
      const { meta } = await article.rawMeta(request, path);
      const published = metaValues(meta, 'published-date');
      const updated = metaValues(meta, 'updated-date');
      const visible = await article.main.innerText();
      observations.push({ published, updated });
      expect.soft(published, 'published-date count').toHaveLength(1);
      expect.soft(updated, 'updated-date count').toHaveLength(1);
      for (const [name, value, start] of [['published-date', published[0], td01Common.publishDate], ['updated-date', updated[0], td01Common.updateDate]] as const) {
        expect.soft(value ?? '', `${name} starts with ${start}`).toMatch(new RegExp(`^${start}`));
        expect.soft(Number.isNaN(Date.parse(value ?? '')), `${name} parses as ISO 8601`).toBe(false);
      }
      for (const text of ['2026.10.10', '2026-10-10']) expect.soft(visible, `update date ${text} not visible`).not.toContain(text);
    });

    test(`DSR-ARTICLE-011 [${lang}] meta thumbnail: 1, absolute, no transform params, GET 200 image/*`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { article, path } = await openArticle(page, lang);
      const thumbs = metaValues((await article.rawMeta(request, path)).meta, 'thumbnail');
      observations.push({ thumbnail: thumbs });
      expect(thumbs, 'thumbnail meta count').toHaveLength(1);
      const url = thumbs[0];
      expect(url, 'absolute URL').toMatch(/^https?:\/\//);
      const params = [...new URL(url).searchParams.keys()];
      expect.soft(params.filter(p => transformParams.includes(p)), 'transform params').toEqual([]);
      const res = await request.get(url);
      observations.push({ params, status: res.status(), contentType: res.headers()['content-type'] });
      expect.soft(res.status()).toBe(200);
      expect.soft(res.headers()['content-type'] ?? '').toMatch(/^image\//);
    });

    test(`DSR-ARTICLE-012 [${lang}] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { article, path } = await openArticle(page, lang);
      const { meta } = await article.rawMeta(request, path);
      const category = metaValues(meta, 'category')[0] ?? '';
      const keywords = metaValues(meta, 'search-keywords')[0] ?? '';
      const ids = category.split(',').map(s => s.trim()).filter(Boolean);
      observations.push({ category, keywords });
      expect.soft(ids, 'category tag IDs').toHaveLength(td01Common.tagCount);
      for (const id of ids) expect.soft(id, 'tag ID namespace:path').toMatch(/^[\w-]+:\S+$/);
      for (const kw of td01Common.keywords) expect.soft(keywords, `search-keywords has ${kw}`).toContain(kw);
      const visible = await article.main.innerText();
      for (const kw of td01Common.keywords) expect.soft(visible, `${kw} not visible`).not.toContain(kw);
    });

    test(`DSR-ARTICLE-013 [${lang}] meta related-stories = r1,r2,r3 in order`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { article, path } = await openArticle(page, lang);
      const related = metaValues((await article.rawMeta(request, path)).meta, 'related-stories')[0] ?? '';
      const paths = related.split(',').map(s => s.trim()).filter(Boolean);
      observations.push({ related, paths });
      expect(paths, 'related-stories count').toHaveLength(3);
      slugs.related.forEach((slug, i) => {
        expect.soft(paths[i], `item ${i + 1} = ${slug}`).toMatch(new RegExp(`/${slug}(\\.html)?$`));
        expect.soft(paths[i], `item ${i + 1} under /library/article/stories/`).toContain('/library/article/stories/');
      });
    });

    test(`DSR-ARTICLE-014 [${lang}] title/description/OGP/published-date/thumbnail/category exactly once, non-empty`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { article, path } = await openArticle(page, lang);
      const { title, meta } = await article.rawMeta(request, path);
      const counts = Object.fromEntries(uniqueMeta.map(k => [k, k === 'title' ? [title ?? ''] : metaValues(meta, k)]));
      observations.push({ counts });
      for (const key of uniqueMeta) {
        expect.soft(counts[key], `${key} count`).toHaveLength(1);
        expect.soft(counts[key][0]?.trim() ?? '', `${key} non-empty`).not.toBe('');
      }
      expect.soft(counts['og:title'][0], 'og:title = authored OGP').toBe(td01[lang].ogTitle);
      expect.soft(counts['og:description'][0], 'og:description = authored OGP').toBe(td01[lang].ogDescription);
      const ogImage = counts['og:image'][0] ?? '';
      expect.soft(ogImage, 'og:image absolute').toMatch(/^https?:\/\//);
      if (/^https?:\/\//.test(ogImage)) expect.soft((await request.get(ogImage)).status(), 'og:image status').toBe(200);
    });

    test(`DSR-ARTICLE-016 [${lang}] robots: qa529-02 noindex,nofollow; qa529-01 no noindex`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { article, path } = await openArticle(page, lang);
      const fullRobots = metaValues((await article.rawMeta(request, path)).meta, 'robots');
      observations.push({ page: slugs.full, robots: fullRobots });
      expect.soft(fullRobots.join(','), `${slugs.full} robots`).not.toMatch(/noindex/i);
      if (!minimalLanguages.includes(lang)) {
        observations.push({ note: `${slugs.minimal} not in TD for ${lang} (TD-529-02 is ja only) – full-page part only` });
        return;
      }
      const minimal = await openArticle(page, lang, slugs.minimal);
      const minimalRobots = metaValues((await article.rawMeta(request, minimal.path)).meta, 'robots').join(',');
      observations.push({ page: slugs.minimal, robots: minimalRobots });
      expect.soft(minimalRobots, `${slugs.minimal} robots`).toMatch(/noindex/i);
      expect.soft(minimalRobots, `${slugs.minimal} robots`).toMatch(/nofollow/i);
    });

    test(`DSR-ARTICLE-024 [${lang}] VIEW ALL STORIES + Contact visible; hrefs recorded`, { tag: ['@auto'] }, async ({ page }) => {
      const { article } = await openArticle(page, lang);
      const links = [['viewAllStories', article.viewAllStories], ['contact', article.contact]] as const;
      for (const [name, el] of links) {
        await expect.soft(el.first(), `${name} visible`).toBeVisible();
        const href = await el.first().getAttribute('href', { timeout: 1_000 }).catch(() => null);
        observations.push({ [name]: { text: await el.first().innerText({ timeout: 1_000 }).catch(() => null), href, note: 'targets undecided (A8 / Q8) – not judged' } });
        expect.soft(href ?? '', `${name} href`).not.toMatch(/^(#?)$/);
      }
      // Block 14 sits after related items (block 13) when present.
      if (await article.relatedItems.count()) expect.soft(await before(article.relatedItems.first(), article.viewAllStories.first()), 'footer action after related items').toBe(true);
    });

    test(`DSR-ARTICLE-026 [${lang}] stories query-index contains qa529-01 with 6 properties`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { path } = await openArticle(page, lang);
      let found: { index: string; row: Record<string, unknown> } | null = null;
      let any200 = false;
      for (const index of storiesIndexPaths(lang)) {
        const res = await request.get(index);
        const json = res.ok() ? await res.json().catch(() => null) : null;
        any200 ||= res.status() === 200;
        const row = json?.data?.find((r: { path: string }) => r.path === path);
        observations.push({ index, status: res.status(), rows: json?.data?.length ?? null, containsPage: !!row });
        if (row && !found) found = { index, row };
      }
      // spec.json 26.0: Blocked (not Fail) when no candidate index exists (B2 / Q7).
      test.skip(!any200, `blocked-data: no stories query-index returns 200 (${storiesIndexPaths(lang).join(', ')})`);
      expect(found, `${path} in stories index`).not.toBeNull();
      observations.push({ foundIn: found!.index, row: found!.row });
      for (const key of indexProperties) {
        expect.soft(Object.keys(found!.row).map(k => k.toLowerCase()), `property ${key}`).toContain(key);
        expect.soft(String(found!.row[key] ?? ''), `${key} non-empty`).not.toBe('');
      }
    });

    test(`DSR-ARTICLE-029 [${lang}] language page: 200, title/info bar in ${lang}, <html lang>=${lang}`, { tag: ['@auto'] }, async ({ page }) => {
      const { article } = await openArticle(page, lang);
      const htmlLang = await page.locator('html').getAttribute('lang');
      observations.push({ htmlLang, title: (await article.title.first().innerText().catch(() => '')).trim(), infoBar: await article.infoBar.first().innerText().catch(() => null) });
      expect.soft(htmlLang ?? '', '<html lang>').toMatch(new RegExp(`^${lang}`, 'i'));
      await expect.soft(article.title.first()).toHaveText(td01[lang].title);
      await expect.soft(article.infoBar.first(), 'info bar').toBeVisible();
    });
  });
}

// TD-529-02 exists for ja only (TestData en column "—").
for (const lang of minimalLanguages) {
  test.describe(`${lang} minimal (TD-529-02)`, () => {
    test(`DSR-ARTICLE-015 [${lang}] OGP fallback: og:title = title, og:description = description, og:image 200`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { article, path } = await openArticle(page, lang, slugs.minimal);
      const { meta } = await article.rawMeta(request, path);
      const og = { title: metaValues(meta, 'og:title'), description: metaValues(meta, 'og:description'), image: metaValues(meta, 'og:image') };
      observations.push({ og });
      expect.soft(og.title[0], 'og:title').toBe(td02[lang as keyof typeof td02].title);
      expect.soft(og.description[0], 'og:description').toBe(td02[lang as keyof typeof td02].description);
      expect(og.image[0] ?? '', 'og:image non-empty').not.toBe('');
      const res = await request.get(new URL(og.image[0], page.url()).href);
      observations.push({ ogImageStatus: res.status() });
      expect.soft(res.status(), 'og:image status').toBe(200);
    });

    test(`DSR-ARTICLE-020 [${lang}] no related stories block/heading when not specified (トルツメ)`, { tag: ['@auto'] }, async ({ page }) => {
      const { article } = await openArticle(page, lang, slugs.minimal);
      const blocks = await article.boxes(article.relatedStories);
      const headings = await article.boxes(article.relatedStoriesHeading);
      // Gap recorded only: last content section to footer action (normal section gap not specified in px).
      const gap = await article.viewAllStories.first().evaluate(el => {
        const section = el.closest('main > *');
        const prev = section?.previousElementSibling;
        return prev ? Math.round(el.getBoundingClientRect().top - prev.getBoundingClientRect().bottom) : null;
      }, undefined, { timeout: 1_000 }).catch(() => null);
      observations.push({ relatedStoriesBlocks: blocks, headings, gapToFooterActionPx: gap });
      expect.soft(blocks.filter(b => b.visible), 'visible related stories block').toEqual([]);
      expect.soft(headings.filter(h => h.visible), 'visible related stories heading').toEqual([]);
    });

    test(`DSR-ARTICLE-023 [${lang}] no related items block/heading when 0 results (トルツメ)`, { tag: ['@auto'] }, async ({ page }) => {
      const { article } = await openArticle(page, lang, slugs.minimal);
      const blocks = await article.boxes(article.relatedItems);
      const headings = await article.boxes(article.relatedItemsHeading);
      observations.push({ relatedItemsBlocks: blocks, headings });
      expect.soft(blocks.filter(b => b.visible), 'visible related items block').toEqual([]);
      expect.soft(headings.filter(h => h.visible), 'visible related items heading').toEqual([]);
    });

    test(`DSR-ARTICLE-025 [${lang}] no empty profile wrapper with height > 0 (トルツメ)`, { tag: ['@auto'] }, async ({ page }) => {
      const { article } = await openArticle(page, lang, slugs.minimal);
      const profile = await article.boxes(article.profile);
      const emptySections = await article.main.locator(':scope > div').evaluateAll(els => els.filter(e => e.getBoundingClientRect().height > 0 && !(e.textContent?.trim() || e.querySelector('img, picture, svg, video, iframe, a, button'))).map(e => e.className));
      observations.push({ profile, emptySections });
      expect.soft(profile.filter(p => p.visible), 'visible profile wrapper').toEqual([]);
      expect.soft(emptySections, 'empty sections with height > 0').toEqual([]);
    });
  });
}

test.describe('ja My List (client-side only)', () => {
  test('DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload', { tag: ['@auto'] }, async ({ page }) => {
    const { article, path } = await openArticle(page, 'ja');
    await expect(article.myList, 'My List button').toBeVisible();
    const stateBefore = { pressed: await article.myList.getAttribute('aria-pressed'), class: await article.myList.getAttribute('class') };
    // Client-side store only; no AEM write (job: read-only except localStorage).
    await article.myList.click();
    const readStore = () => page.evaluate(() => Object.fromEntries(Object.keys(localStorage).filter(k => /my-?list/i.test(k)).map(k => [k, localStorage.getItem(k)])));
    const store = await readStore();
    const stateAfter = { pressed: await article.myList.getAttribute('aria-pressed'), class: await article.myList.getAttribute('class') };
    await page.reload();
    await page.waitForLoadState('networkidle').catch(() => undefined);
    const stateReload = { pressed: await article.myList.getAttribute('aria-pressed'), class: await article.myList.getAttribute('class') };
    observations.push({ stateBefore, store, stateAfter, storeAfterReload: await readStore(), stateReload });
    const raw = Object.values(store).join('\n');
    expect(raw, 'mylist store has page path').toContain(path);
    expect.soft(raw, 'stored under stories').toMatch(/stories/);
    expect.soft(JSON.stringify(stateAfter), 'button state changed').not.toBe(JSON.stringify(stateBefore));
    expect.soft(JSON.stringify(stateReload), 'state kept after reload').toBe(JSON.stringify(stateAfter));
  });
});

// Manual (Author) – documented only; run by human QA.
for (const [tc, title] of [
  ['001', 'page creation with article template (Author, BAC#1)'],
  ['004', 'article-specific info not editable in body (Author, BAC#5)'],
  ['005', 'author-editable areas 4/5/6/9/11 (Author, BAC#1)'],
  ['021', 'related stories picker max 3, stories only (Author)'],
  ['032', 'required page properties validation (Author, negative)'],
] as const) {
  test(`DSR-ARTICLE-${tc} [ja] ${title}`, { tag: ['@manual'] }, () => test.fixme(true, 'Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule)'));
}

// Visual – no Figma PC/SP design frames yet (only spec board 162-450; B6).
for (const [tc, title] of [['030', 'visual PC 1440 vs Figma'], ['031', 'visual SP 390 vs Figma']] as const) {
  test(`DSR-ARTICLE-${tc} [ja] ${title}`, { tag: ['@visual'] }, () => test.fixme(true, 'Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat)'));
}

// Automation TCs blocked by dependencies (spec.json "blocked" column); implement when unblocked.
for (const [tc, title, reason] of [
  ['017', 'related stories cards r1..r3 (block 12)', 'Stories index not on DEV yet – Martin prereq #1 (helix-query.yaml) / Q7'],
  ['018', 'related stories NEW icon on r1 only', 'Stories index not on DEV yet – Martin prereq #1 / Q7; NEW period Q6'],
  ['019', 'related stories max 3, missing path skipped (qa529-04)', 'Stories index not on DEV yet – Martin prereq #1 / Q7; TD-529-04 not seeded'],
  ['022', 'related items cards from product index (block 13)', '製品index relatedArticles/sortOrder not defined – 製品詳細 ticket (Martin prereq #3)'],
  ['027', 'published article appears in article list', 'Article list DSR-170 (out of scope) + stories index'],
  ['028', 'breadcrumb on article page', 'Martin open decision #4 (breadcrumb in scope?) + DSR-552 – Q9'],
] as const) {
  test(`DSR-ARTICLE-${tc} [ja] ${title}`, { tag: ['@auto', '@blocked'] }, () => test.fixme(true, `Blocked: ${reason}`));
}

test('DSR-ARTICLE-029 [cn] language page (cn)', { tag: ['@auto', '@blocked'] }, () => test.fixme(true, 'Blocked: no /master/cn on DEV (Issue #18) – all cn rows'));
