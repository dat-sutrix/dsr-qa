import { test, expect, type Page } from '@playwright/test';
import { EcoProductsPage } from '../../pages/EcoProductsPage';
import {
  type Language, languages, topPaths, detailPaths, finderPaths, categorySlugs, td03, td06, productIndexPaths,
  tagColumnPattern, productHref, legacyDomain, codePaths, damPattern, emptyFrameMaxPx, htmlLang,
  pageMissing, finderMissing, indexMissing, tagMissing, td06Missing, cnMissing,
} from '../../fixtures/dsr-590';

const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

// Preflight: first candidate path with HTTP 200 wins (A1); none → skip (pages not on DEV yet).
async function open(eco: EcoProductsPage, candidates: string[]) {
  for (const p of candidates) {
    const response = await eco.goto(p);
    observations.push({ tried: p, status: response?.status() });
    if (response?.status() === 200) return p;
  }
  test.skip(true, pageMissing);
  return '';
}
const openTop = (eco: EcoProductsPage, lang: Language) => open(eco, topPaths(lang));
// TD-590-03 = recycled; spec: "if missing use any published detail".
const openDetail = (eco: EcoProductsPage, lang: Language) =>
  open(eco, [...detailPaths(lang, td03.slug), ...categorySlugs.filter(s => s !== td03.slug).flatMap(s => detailPaths(lang, s))]);

function watchConsole(page: Page) {
  const errors: string[] = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  page.on('pageerror', e => errors.push(e.message));
  return errors;
}

const status = async (page: Page, url: string) => (await page.request.get(url, { maxRedirects: 0 })).status();
const slugOf = (url: string) => new URL(url).pathname.replace(/\/$/, '').split('/').pop() || '';

// A6: product query-index (Q14 default) → product ids whose tag column contains `tag`.
async function taggedProducts(page: Page, lang: Language, tag: string) {
  for (const p of productIndexPaths(lang)) {
    const r = await page.request.get(p);
    observations.push({ index: p, status: r.status() });
    if (!r.ok()) continue;
    const json = await r.json();
    const sheet = json.data ? json : json.products ?? json;
    const columns: string[] = sheet.columns ?? Object.keys(sheet.data?.[0] ?? {});
    const column = tagColumnPattern.map(re => columns.find(c => re.test(c))).find(Boolean);
    observations.push({ columns, tagColumn: column ?? null });
    test.skip(!column, tagMissing);
    const ids = (sheet.data as Record<string, string>[])
      .filter(row => String(row[column!] ?? '').split(/[,;|]\s*|\s+/).map(s => s.trim().toLowerCase()).includes(tag))
      .map(row => String(row.path ?? row.id ?? '').match(/(\d+)$/)?.[1] ?? String(row.id ?? row.path));
    return ids;
  }
  test.skip(true, indexMissing);
  return [];
}

// ---- C14 TOP ----
for (const lang of languages) {
  test(`DSR-ECO-001 [${lang}] TOP shows one card per category with image, name, and active summary + VIEW MORE`, { tag: ['@auto'] }, async ({ page }) => {
    const eco = new EcoProductsPage(page);
    const errors = watchConsole(page);
    await openTop(eco, lang);
    const cards = await eco.cards.all();
    const rows = [];
    for (const card of cards) {
      const img = card.locator('img').first();
      rows.push({ name: await eco.cardName(card), imageLoaded: await eco.loaded(img) });
    }
    observations.push({ cards: rows, consoleErrors: errors });
    expect.soft(cards.length, 'card count = TD-590-02 (A3)').toBe(categorySlugs.length);
    expect.soft(rows.filter(r => !r.imageLoaded || !r.name), 'cards missing image or name').toEqual([]);
    await expect.soft(eco.activeCard.locator('p').first(), 'active card summary').not.toBeEmpty();
    await expect.soft(eco.viewMore(eco.activeCard), 'active card VIEW MORE').toBeVisible();
    expect.soft(errors, 'console errors').toEqual([]);
  });

  test(`DSR-ECO-002 [${lang}] each category card VIEW MORE links to its TD-590-02 detail page (200, same language)`, { tag: ['@auto'] }, async ({ page }) => {
    const eco = new EcoProductsPage(page);
    const top = await openTop(eco, lang);
    const prefix = top.slice(0, top.indexOf('/product/'));
    const hrefs = await eco.carousel.getByRole('link').evaluateAll(as => as.map(a => (a as HTMLAnchorElement).href));
    expect.soft(hrefs.filter(h => h.includes(legacyDomain)), 'links to legacy domain').toEqual([]);
    const results = [];
    const n = await eco.cards.count();
    for (let i = 0; i < n; i++) {
      await eco.goto(top);
      const card = eco.cards.nth(i);
      // Make the card active (click it), then follow VIEW MORE (or the card link).
      await card.click().catch(() => undefined);
      const link = (await eco.viewMore(card).isVisible()) ? eco.viewMore(card) : card.getByRole('link').first();
      await Promise.all([page.waitForURL(u => u.pathname !== top, { timeout: 10_000 }).catch(() => undefined), link.click()]);
      const url = page.url();
      results.push({ i, url, status: await status(page, url) });
    }
    observations.push({ results });
    const slugs = results.map(r => slugOf(r.url));
    expect.soft(results.filter(r => r.status !== 200), 'detail pages not 200').toEqual([]);
    expect.soft(results.filter(r => !new URL(r.url).pathname.startsWith(`${prefix}/`)), 'language prefix not kept').toEqual([]);
    expect.soft([...slugs].sort(), 'detail slugs = TD-590-02').toEqual([...categorySlugs].sort());
  });

  test(`DSR-ECO-004 [${lang}] 環境配慮型製品診断 button links to the product finder (P087, 200)`, { tag: ['@auto'] }, async ({ page }) => {
    const eco = new EcoProductsPage(page);
    const top = await openTop(eco, lang);
    const prefix = top.slice(0, top.indexOf('/product/'));
    await expect(eco.finderButton, 'finder button').toBeVisible();
    await Promise.all([page.waitForURL(u => u.pathname !== top, { timeout: 10_000 }).catch(() => undefined), eco.finderButton.click()]);
    const url = page.url();
    const code = await status(page, url);
    observations.push({ url, status: code });
    // P087 in the same language/prefix as the TOP that answered 200.
    expect.soft(new URL(url).pathname.replace(/\/$/, ''), 'finder URL (P087), same language').toBe(finderPaths(lang).find(p => p.startsWith(`${prefix}/`)));
    test.skip(code === 404, finderMissing);
    expect(code, 'finder HTTP status').toBe(200);
  });
}

test('DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last', { tag: ['@auto'] }, async ({ page }) => {
  const eco = new EcoProductsPage(page);
  await openTop(eco, 'ja');
  const n = await eco.cards.count();
  expect(n, 'card count').toBeGreaterThan(1);
  const names = await Promise.all((await eco.cards.all()).map(c => eco.cardName(c)));
  const first = await eco.activeName();
  const sequence = [first];
  for (let i = 0; i < n; i++) {
    await eco.next.click();
    await page.waitForTimeout(500); // carousel transition
    sequence.push(await eco.activeName());
  }
  observations.push({ names, sequence });
  for (let i = 1; i < sequence.length; i++)
    expect.soft((names.indexOf(sequence[i]) - names.indexOf(sequence[i - 1]) + n) % n, `next #${i} moves by one`).toBe(1);
  expect.soft(sequence[n], `after ${n} next clicks the first card is active again (A4)`).toBe(first);
  await eco.prev.click();
  await page.waitForTimeout(500);
  const afterPrev = await eco.activeName();
  observations.push({ afterPrevAtFirst: afterPrev });
  expect.soft(afterPrev, 'prev at first wraps to last (A4)').toBe(names[(names.indexOf(first) - 1 + n) % n]);
  const dots = await eco.dots.count();
  expect.soft(dots, 'dot count = card count').toBe(n);
  const dotResults = [];
  for (let i = 0; i < dots; i++) {
    await eco.dots.nth(i).click();
    await page.waitForTimeout(500);
    const dot = eco.dots.nth(i);
    dotResults.push({
      i, active: await eco.activeName(),
      highlighted: (await dot.getAttribute('aria-selected')) === 'true' || (await dot.getAttribute('aria-current')) === 'true' || /active/.test((await dot.getAttribute('class')) || ''),
    });
  }
  observations.push({ dotResults });
  expect.soft(dotResults.filter(d => d.active !== names[d.i] || !d.highlighted), 'dot → matching card active + dot highlighted').toEqual([]);
});

// ---- C15 detail ----
for (const lang of languages) {
  test(`DSR-ECO-005 [${lang}] detail hero shows tag, background image, category name, and summary`, { tag: ['@auto'] }, async ({ page }) => {
    const eco = new EcoProductsPage(page);
    const path = await openDetail(eco, lang);
    const isTd03 = slugOf(new URL(path, 'http://x').href) === td03.slug;
    const backgrounds = await eco.backgroundUrls(eco.hero);
    const statuses = await Promise.all(backgrounds.map(async u => ({ u, status: await status(page, u) })));
    const heroImg = eco.hero.locator('img').first();
    const h1 = page.locator('h1');
    observations.push({ path, isTd03, backgrounds: statuses, h1: await h1.allTextContents(), tag: await eco.heroTag.textContent().catch(() => null) });
    expect.soft(statuses.length, 'background image present').toBeGreaterThan(0);
    expect.soft(statuses.filter(s => s.status !== 200), 'background not 200').toEqual([]);
    if (await heroImg.count()) expect.soft(await eco.loaded(heroImg), 'hero image naturalWidth > 0').toBe(true);
    await expect.soft(h1, 'exactly one h1').toHaveCount(1);
    if (isTd03) await expect.soft(h1, 'category name = TD-590-03').toHaveText(td03.name[lang]);
    else await expect.soft(h1, 'category name').not.toBeEmpty();
    await expect.soft(eco.heroSummary, 'summary').not.toBeEmpty();
    if (isTd03) await expect.soft(eco.heroTag, 'tag label = TD-590-03').toContainText(new RegExp(`${td03.tag}|${td03.name[lang]}`, 'i'));
    else await expect.soft(eco.heroTag, 'tag label').not.toBeEmpty();
  });

  test(`DSR-ECO-007 [${lang}] detail product list equals the query-index products carrying the eco tag`, { tag: ['@auto'] }, async ({ page }) => {
    const eco = new EcoProductsPage(page);
    const path = await openDetail(eco, lang);
    const tag = slugOf(new URL(path, 'http://x').href);
    const hrefs = await eco.productHrefs();
    const expected = await taggedProducts(page, lang, tag);
    const actual = hrefs.map(h => new URL(h).pathname.match(productHref(lang))?.[1] ?? h);
    const statuses = await Promise.all(hrefs.map(async h => ({ h, status: await status(page, h) })));
    observations.push({ path, tag, expected, actual, statuses });
    expect.soft(expected.length, 'TD-590-04: ≥ 3 tagged products').toBeGreaterThanOrEqual(3);
    expect.soft([...actual].sort(), 'card ids = query-index ids').toEqual([...expected].sort());
    expect.soft(statuses.filter(s => s.status !== 200), 'card links not 200').toEqual([]);
  });

  test(`DSR-ECO-010 [${lang}] detail product cards link to /${lang}/products/{id} with HTTP 200`, { tag: ['@auto'] }, async ({ page }) => {
    const eco = new EcoProductsPage(page);
    const path = await openDetail(eco, lang);
    const hrefs = await eco.productHrefs();
    const statuses = await Promise.all(hrefs.map(async h => ({ h, status: await status(page, h) })));
    observations.push({ path, statuses });
    expect(hrefs.length, 'product cards').toBeGreaterThan(0);
    expect.soft(hrefs.filter(h => !productHref(lang).test(new URL(h).pathname)), 'hrefs not /{lang}/products/{digits} (BL-OVL-1)').toEqual([]);
    expect.soft(statuses.filter(s => s.status !== 200), 'hrefs not 200').toEqual([]);
  });
}

test('DSR-ECO-006 [ja] free editing area renders between hero and product list', { tag: ['@auto'] }, async ({ page }) => {
  const eco = new EcoProductsPage(page);
  const path = await openDetail(eco, 'ja');
  const img = eco.freeArea.locator('img').first();
  const imgSrc = await img.evaluate(el => (el as HTMLImageElement).currentSrc).catch(() => null);
  const y = async (l: typeof eco.hero) => (await l.boundingBox())?.y ?? NaN;
  const order = { hero: await y(eco.hero), free: await y(eco.freeArea), list: await y(eco.productList) };
  observations.push({ path, text: (await eco.freeArea.innerText().catch(() => '')).slice(0, 300), imgSrc, order });
  // TD-590-03 free-area content (A5) is not specified verbatim; record and check non-empty + image + order.
  await expect.soft(eco.freeArea, 'free area text').not.toBeEmpty();
  expect.soft(imgSrc && await status(page, imgSrc), 'free area image 200').toBe(200);
  expect.soft(order.hero < order.free && order.free < order.list, 'order hero < free area < product list').toBe(true);
});

test('DSR-ECO-009 [ja] detail with 0 matching products shows no broken list and no error', { tag: ['@auto'] }, async ({ page }) => {
  const eco = new EcoProductsPage(page);
  const slug = td06();
  if (!slug) { await openDetail(eco, 'ja'); test.skip(true, td06Missing); }
  const errors = watchConsole(page);
  await open(eco, detailPaths('ja', slug!));
  const cards = await eco.productCards.count();
  const visible = await eco.productList.isVisible().catch(() => false);
  const height = (await eco.productList.boundingBox().catch(() => null))?.height ?? 0;
  const message = visible ? (await eco.productList.innerText()).trim() : null;
  observations.push({ slug, cards, sectionVisible: visible, height, emptyStateText: message, consoleErrors: errors });
  expect.soft(cards, '0 product cards').toBe(0);
  if (visible && !message) expect.soft(height, `empty frame ≤ ${emptyFrameMaxPx}px`).toBeLessThanOrEqual(emptyFrameMaxPx);
  expect.soft(errors, 'console errors').toEqual([]);
});

test('DSR-ECO-012 [ja] TOP card and detail hero backgrounds are DAM references, not code-bundled files', { tag: ['@auto'] }, async ({ page }) => {
  const eco = new EcoProductsPage(page);
  await openTop(eco, 'ja');
  const top = await eco.backgroundUrls(eco.cards);
  await openDetail(eco, 'ja');
  const hero = await eco.backgroundUrls(eco.hero);
  const all = [...top, ...hero];
  const classify = (u: string) => (codePaths.test(new URL(u).pathname) ? 'code' : damPattern.test(u) ? 'dam' : 'other');
  const rows = all.map(u => ({ u, kind: classify(u) }));
  observations.push({ rows });
  expect(all.length, 'background URLs found').toBeGreaterThan(0);
  expect.soft(rows.filter(r => r.kind === 'code'), 'URLs under /blocks/, /styles/, /icons/, /scripts/').toEqual([]);
  expect.soft(rows.filter(r => r.kind === 'other'), 'URLs neither media_ nor DAM/Dynamic Media (Q19)').toEqual([]);
});

// ---- Languages (BAC#4) ----
for (const lang of languages) {
  test(`DSR-ECO-013 [${lang}] TOP and detail exist with html lang and language-kept internal links`, { tag: ['@auto'] }, async ({ page }) => {
    const eco = new EcoProductsPage(page);
    const report = [];
    for (const [i, candidates] of [topPaths(lang), detailPaths(lang, td03.slug)].entries()) {
      const path = await open(eco, candidates);
      const prefix = path.slice(0, path.indexOf('/product/'));
      const links = await eco.internalLinks();
      const otherLang = links.filter(h => !new URL(h).pathname.startsWith(`${prefix}/`) && /^\/(master\/)?(ja|en|zh|cn)\//.test(new URL(h).pathname));
      const names = i === 0 ? await Promise.all((await eco.cards.all()).map(c => eco.cardName(c))) : [];
      report.push({ path, htmlLang: await page.locator('html').getAttribute('lang'), otherLang, names });
    }
    observations.push({ report });
    for (const r of report) {
      expect.soft(r.htmlLang, `${r.path}: html lang`).toBe(htmlLang[lang]);
      expect.soft(r.otherLang, `${r.path}: internal links with another language prefix`).toEqual([]);
      // Card names not in another language: ja names contain Japanese script; en names contain none.
      const wrongScript = r.names.filter(n => (lang === 'ja') !== /[぀-ヿ一-鿿]/.test(n));
      expect.soft(wrongScript, `${r.path}: card names in another language`).toEqual([]);
    }
  });
}
test('DSR-ECO-013 [cn] TOP and detail exist with html lang and language-kept internal links', { tag: ['@auto'] }, async () => {
  test.fixme(true, cnMissing);
});
