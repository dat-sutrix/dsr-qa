import { test, expect, type Page } from '@playwright/test';
import { ProductListPage, type GridMetrics } from '../../pages/ProductListPage';
import {
  type Language, primaryPath, fallbackPath, blockedData, sp, spWidths, pcColumns, spColumns, minCards, reloads,
  widthTolerance, filterTargets, filterBlocked,
} from '../../fixtures/dsr-583';

const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

// Preflight: primary path (test-space), then A1 fallback. Both 404 → blocked-data skip.
async function openList(page: Page, lang: Language) {
  const list = new ProductListPage(page);
  let path = primaryPath(lang);
  let response = await list.goto(path);
  if (response?.status() === 404 && fallbackPath(lang) !== path) {
    observations.push({ tried: path, status: 404 });
    path = fallbackPath(lang);
    response = await list.goto(path);
  }
  test.skip(response?.status() === 404, `${blockedData} (${primaryPath(lang)} and ${fallbackPath(lang)} HTTP 404)`);
  expect(response?.status()).toBe(200);
  await list.waitForCards();
  observations.push({ language: lang, path, url: page.url(), status: response?.status() });
  return { list, path };
}

// Common SP expectations: N columns, full rows of N, no card overflow, no horizontal scroll.
function expectColumns(m: GridMetrics, columns: number, label: string) {
  expect.soft(m.columns, `${label}: distinct column offsets`).toBe(columns);
  expect.soft(m.tracks, `${label}: grid-template-columns tracks`).toBe(columns);
  const fullRows = m.rows.slice(0, -1);
  for (const [i, n] of fullRows.entries()) expect.soft(n, `${label}: row ${i + 1} cards`).toBe(columns);
  expect.soft(m.overflow, `${label}: cards overflowing their column`).toEqual([]);
  expect.soft(m.scrollWidth, `${label}: document scrollWidth`).toBeLessThanOrEqual(m.viewport);
}

test.describe('SP', () => {
  test.use({ viewport: sp, isMobile: true, hasTouch: true });

  test('DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll', { tag: ['@auto'] }, async ({ page }) => {
    const { list } = await openList(page, 'ja');
    const m = await list.metrics();
    observations.push({ step: '375', ...m });
    expect.soft(m.cards, `TD-583-01 ≥ ${minCards} products`).toBeGreaterThanOrEqual(minCards);
    expectColumns(m, spColumns, '375');
  });

  test('DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll', { tag: ['@auto'] }, async ({ page }) => {
    const { list, path } = await openList(page, 'ja');
    for (const width of spWidths) {
      await page.setViewportSize({ width, height: sp.height });
      await list.goto(path);
      await list.waitForCards();
      const m = await list.metrics();
      observations.push({ step: String(width), ...m });
      expectColumns(m, spColumns, String(width));
    }
  });

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-PRODLIST-003 [${lang}] SP column count stays 2 after scroll, load more, filter and 3 reloads`, { tag: ['@auto'] }, async ({ page }) => {
      const { list } = await openList(page, lang);
      const check = async (step: string) => {
        const m = await list.metrics();
        observations.push({ step, ...m });
        expect.soft(m.columns, `${step}: distinct column offsets`).toBe(spColumns);
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
      const chips = await list.chips.count();
      if (chips) {
        await list.chips.first().click();
        await page.waitForLoadState('networkidle').catch(() => undefined);
        await check('filter');
      } else {
        observations.push({ step: 'filter', note: 'no filter control on page – step not run' });
        test.info().annotations.push({ type: 'note', description: 'filter step not run: no filter control on page' });
      }
      for (let i = 1; i <= reloads; i++) {
        await page.reload();
        await page.waitForLoadState('networkidle').catch(() => undefined);
        await list.waitForCards();
        await check(`reload-${i}`);
      }
    });
  }

  test('DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1): last card = column width, left aligned', { tag: ['@auto'] }, async ({ page }) => {
    const { list } = await openList(page, 'ja');
    const chipCount = await list.chips.count();
    const found: Record<number, string> = {};
    for (let i = 0; i < chipCount && Object.keys(found).length < filterTargets.length; i++) {
      await list.chips.nth(i).click();
      await page.waitForLoadState('networkidle').catch(() => undefined);
      const n = await list.cards.count();
      if ((filterTargets as readonly number[]).includes(n) && !found[n]) found[n] = (await list.chips.nth(i).innerText()).trim();
      await list.chips.nth(i).click();
    }
    observations.push({ chips: chipCount, found });
    test.skip(Object.keys(found).length === 0, filterBlocked);
    for (const target of filterTargets) {
      if (!found[target]) { observations.push({ target, note: 'no filter with this result count' }); continue; }
      const chip = list.chips.filter({ hasText: found[target] }).first();
      await chip.click();
      await page.waitForLoadState('networkidle').catch(() => undefined);
      const m = await list.metrics();
      const gridLeft = await list.grid.evaluate(ul => Math.round(ul.getBoundingClientRect().left));
      const trackWidth = m.gridTemplateColumns ? parseFloat(m.gridTemplateColumns.split(/\s+/)[0]) : NaN;
      observations.push({ target, chip: found[target], gridLeft, trackWidth, ...m });
      const last = m.cardWidths[m.cardWidths.length - 1];
      const reference = target > 1 ? m.cardWidths[0] : trackWidth;
      expect.soft(Math.abs(last - reference), `${target} results: last card width vs ${target > 1 ? 'first card' : 'column track'}`).toBeLessThanOrEqual(widthTolerance);
      expect.soft(m.cardLefts[0], `${target} results: left aligned`).toBe(gridLeft);
      await chip.click();
    }
  });

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-PRODLIST-006 [${lang}] SP card layout vs Figma 375 frame (visual)`, { tag: ['@visual'] }, async () => {
      test.fixme(true, 'Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame)');
    });
  }

  test('DSR-PRODLIST-007 [ja] Real device iOS Safari / Android Chrome: 2 columns (manual)', { tag: ['@manual'] }, async () => {
    test.fixme(true, 'Manual TC (real iOS Safari / Android Chrome) – documented only, not automated');
  });
});

test.describe('PC/TB', () => {
  test.use({ viewport: { width: 1440, height: 900 } });

  test('DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3', { tag: ['@auto'] }, async ({ page }) => {
    const { list, path } = await openList(page, 'ja');
    for (const { width, columns } of pcColumns) {
      await page.setViewportSize({ width, height: 900 });
      await list.goto(path);
      await list.waitForCards();
      const m = await list.metrics();
      observations.push({ step: String(width), expectedColumns: columns, ...m });
      expect.soft(m.columns, `${width}: distinct column offsets`).toBe(columns);
      expect.soft(m.tracks, `${width}: grid tracks`).toBe(columns);
      expect.soft(m.scrollWidth, `${width}: document scrollWidth`).toBeLessThanOrEqual(width);
    }
  });
});
