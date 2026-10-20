import { test, expect, type Page } from '@playwright/test';
import { ProductListPage, type GridMetrics } from '../../pages/ProductListPage';
import {
  languages, type Language, plspPath, plspFallbackPath, plspMinCards, plspDataMissing, plspSpWidths, plspPcWidths, plspToDo,
  sp, spColumns, reloads, widthTolerance,
} from '../../fixtures/dsr-583';

// JOB-ZZ-IDLE-17: DSR-583 SP card grid fixed to 2 columns, on the product-list block page.
// Card counts are recorded, never asserted (few items after the 20/10 overlay merge).
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
  if (info.status !== info.expectedStatus) info.annotations.push({ type: 'suspect', description: `product – ${plspToDo}` });
});

// Preflight: /master/{lang}/product-list, fallback /{lang}/product-list. 404 on both or < 2 cards → skip.
async function openList(page: Page, lang: Language) {
  const list = new ProductListPage(page, ProductListPage.blockSelectors);
  let path = plspPath(lang);
  let response = await list.goto(path);
  if (response?.status() === 404) {
    observations.push({ tried: path, status: 404 });
    path = plspFallbackPath(lang);
    response = await list.goto(path);
  }
  test.skip(response?.status() === 404, `${plspDataMissing} (${plspPath(lang)} and ${plspFallbackPath(lang)} HTTP 404)`);
  await list.cards.first().waitFor({ state: 'visible', timeout: 10_000 }).catch(() => undefined);
  const cards = await list.cards.count();
  observations.push({ language: lang, path, url: page.url(), status: response?.status(), cards });
  test.skip(cards < plspMinCards, `${plspDataMissing} (${path}: ${cards} cards)`);
  return { list, path };
}

async function record(list: ProductListPage, step: string, extra: Record<string, unknown> = {}) {
  const m = await list.metrics();
  observations.push({ step, ...extra, ...m });
  return m;
}

// SP expectation: 2 columns (first-row distinct lefts and grid tracks), no card overflow, no horizontal scroll.
function expectSp(m: GridMetrics, label: string) {
  expect.soft(m.firstRowColumns, `${label}: distinct card left values in first row`).toBe(spColumns);
  expect.soft(m.tracks, `${label}: grid-template-columns tracks`).toBe(spColumns);
  expect.soft(m.overflow, `${label}: cards overflowing their column`).toEqual([]);
  expect.soft(m.scrollWidth, `${label}: document scrollWidth`).toBeLessThanOrEqual(m.viewport);
}

for (const lang of languages) {
  test.describe(`SP [${lang}]`, () => {
    test.use({ viewport: sp, isMobile: true, hasTouch: true });

    test(`DSR-PLSP-001 [${lang}] SP 375px: exactly 2 card columns, no horizontal scroll`, { tag: ['@auto'] }, async ({ page }) => {
      const { list } = await openList(page, lang);
      expectSp(await record(list, '375'), '375');
    });

    test(`DSR-PLSP-002 [${lang}] SP widths 320–767: 2 card columns at every width`, { tag: ['@auto'] }, async ({ page }) => {
      const { list, path } = await openList(page, lang);
      for (const width of plspSpWidths) {
        await page.setViewportSize({ width, height: sp.height });
        await list.goto(path);
        await list.cards.first().waitFor({ state: 'visible' });
        expectSp(await record(list, String(width)), String(width));
      }
    });

    test(`DSR-PLSP-003 [${lang}] SP column count stays 2 after scroll, filter and reload`, { tag: ['@auto'] }, async ({ page }) => {
      const { list } = await openList(page, lang);
      const check = async (step: string) => {
        const m = await record(list, step);
        expect.soft(m.firstRowColumns, `${step}: distinct card left values in first row`).toBe(spColumns);
        expect.soft(m.tracks, `${step}: grid tracks`).toBe(spColumns);
      };
      await check('open');
      await page.evaluate(() => window.scrollTo(0, document.documentElement.scrollHeight));
      await page.waitForLoadState('networkidle').catch(() => undefined);
      const loadMore = await list.loadMore.count();
      if (loadMore) {
        await list.loadMore.first().click();
        await page.waitForLoadState('networkidle').catch(() => undefined);
      }
      observations.push({ loadMorePresent: loadMore > 0 });
      await check('scroll-bottom');
      if (await list.chips.count()) {
        const label = (await list.chips.first().innerText()).trim();
        await list.toggleBlockFilter(0);
        observations.push({ filter: label });
        // A filter can leave a single card; record it but only assert the grid track count then.
        const m = await record(list, 'filter');
        if (m.cards >= plspMinCards) expect.soft(m.firstRowColumns, 'filter: distinct card left values in first row').toBe(spColumns);
        expect.soft(m.tracks, 'filter: grid tracks').toBe(spColumns);
      } else {
        observations.push({ step: 'filter', note: 'no filter control on page – step not run' });
        test.info().annotations.push({ type: 'note', description: 'filter step not run: no filter control on page' });
      }
      for (let i = 1; i <= reloads; i++) {
        await page.reload();
        await page.waitForLoadState('networkidle').catch(() => undefined);
        await list.cards.first().waitFor({ state: 'visible' });
        await check(`reload-${i}`);
      }
    });

    test(`DSR-PLSP-005 [${lang}] SP odd result count: last card = other card width, left aligned`, { tag: ['@auto'] }, async ({ page }) => {
      const { list } = await openList(page, lang);
      // Unfiltered list first; else the first filter option giving an odd count. Prefer an odd count ≥ 3.
      const unfiltered = await list.cards.count();
      let found: { filter: string; index: number; count: number } | null = unfiltered % 2 === 1 ? { filter: '(none)', index: -1, count: unfiltered } : null;
      const options = await list.chips.count();
      const tried: Record<string, number> = {};
      for (let i = 0; i < options && !(found && found.count >= 3); i++) {
        const label = (await list.chips.nth(i).innerText()).trim();
        await list.toggleBlockFilter(i);
        const n = await list.cards.count();
        tried[`${i}:${label}`] = n;
        await list.toggleBlockFilter(i);
        if (n % 2 === 1 && (!found || n > found.count)) found = { filter: label, index: i, count: n };
      }
      observations.push({ unfiltered, options, tried, found });
      test.skip(!found, 'blocked-data: TD-583-02 no filter giving an odd result count');
      if (found!.index >= 0) await list.toggleBlockFilter(found!.index);
      const m = await record(list, `odd-${found!.count}`, { filter: found!.filter });
      const gridLeft = await list.grid.evaluate(ul => Math.round(ul.getBoundingClientRect().left));
      const trackWidth = m.gridTemplateColumns ? parseFloat(m.gridTemplateColumns.split(/\s+/)[0]) : NaN;
      const last = m.cardWidths[m.cardWidths.length - 1];
      const reference = m.cards > 1 ? m.cardWidths[0] : trackWidth;
      observations.push({ lastCardWidth: last, reference, referenceKind: m.cards > 1 ? 'first card' : 'column track', gridLeft });
      expect.soft(Math.abs(last - reference), `${m.cards} results: last card width vs ${m.cards > 1 ? 'first card' : 'column track'}`).toBeLessThanOrEqual(widthTolerance);
      expect.soft(m.cardLefts[0], `${m.cards} results: left aligned`).toBe(gridLeft);
      expect.soft(m.tracks, `${m.cards} results: grid tracks`).toBe(spColumns);
    });
  });

  test.describe(`PC/TB [${lang}]`, () => {
    test.use({ viewport: { width: 1440, height: 900 } });

    test(`DSR-PLSP-004 [${lang}] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4)`, { tag: ['@auto'] }, async ({ page }) => {
      const { list, path } = await openList(page, lang);
      for (const { width, columns } of plspPcWidths) {
        await page.setViewportSize({ width, height: 900 });
        await list.goto(path);
        await list.cards.first().waitFor({ state: 'visible' });
        const m = await record(list, String(width), { expectedColumns: columns });
        // Few cards cap the first row, so the Figma check uses the grid track count.
        if (columns !== null) expect.soft(m.tracks, `${width}: grid tracks`).toBe(columns);
        expect.soft(m.scrollWidth, `${width}: document scrollWidth`).toBeLessThanOrEqual(width);
      }
    });
  });
}
