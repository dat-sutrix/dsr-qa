import type { Locator, Page, Response } from '@playwright/test';

export type GridMetrics = {
  viewport: number;
  cards: number;
  gridTemplateColumns: string | null;
  tracks: number;
  columns: number;
  firstRowColumns: number;
  cardWidths: number[];
  cardLefts: number[];
  rows: number[];
  overflow: string[];
  scrollWidth: number;
};

export type ProductListSelectors = {
  listing: string;
  grid: string;
  cards: string;
  titles: string;
  chips: string;
};

// Product list = listing block, variant listing-product-index (DEV 2026-10-16). No data-testid on the listing yet:
// class selectors observed on /master/ja/test-space/product-list.
export class ProductListPage {
  readonly listing: Locator;
  readonly grid: Locator;
  readonly cards: Locator;
  readonly titles: Locator;
  readonly chips: Locator;
  readonly loadMore: Locator;

  // TODO: data-testid product-list, product-list-grid, product-card, product-card-title, product-list-filter
  static readonly listingSelectors: ProductListSelectors = {
    listing: 'main .listing.block',
    grid: '.cards ul',
    cards: ':scope > li',
    titles: '.cards-card-title',
    chips: '.listing-chip:not([data-key="__all__"])',
  };

  // product-list block (/{lang}/product-list on DEV 2026-10-20): checkbox filters in a sidebar that is a drawer on SP.
  static readonly blockSelectors: ProductListSelectors = {
    listing: 'main .product-list.block',
    grid: '.pl-grid',
    cards: ':scope > li.pl-card',
    titles: '.pl-card-name',
    chips: '.pl-filter-option',
  };

  constructor(readonly page: Page, selectors: ProductListSelectors = ProductListPage.listingSelectors) {
    this.listing = page.locator(selectors.listing);
    this.grid = this.listing.locator(selectors.grid).first();
    this.cards = this.grid.locator(selectors.cards);
    this.titles = this.cards.locator(selectors.titles);
    this.chips = this.listing.locator(selectors.chips);
    // TODO: data-testid product-list-load-more
    this.loadMore = this.listing.getByRole('button', { name: /more|もっと見る|さらに表示/i });
  }

  async goto(path: string): Promise<Response | null> {
    const response = await this.page.goto(path);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    return response;
  }

  async waitForCards() {
    await this.cards.first().waitFor({ state: 'visible' });
  }

  // Column count = distinct card left offsets in the first 3 rows (spec.json 1.0 step 4) and grid track count.
  async metrics(): Promise<GridMetrics> {
    const grid = await this.grid.evaluate(ul => {
      const style = getComputedStyle(ul);
      const cols = style.gridTemplateColumns;
      const boxes = [...ul.children].map(li => {
        const r = li.getBoundingClientRect();
        return { left: Math.round(r.left), top: Math.round(r.top), width: Math.round(r.width * 10) / 10, right: r.right, overflow: (li as HTMLElement).scrollWidth > (li as HTMLElement).clientWidth + 1, id: (li as HTMLElement).dataset.cardId ?? '' };
      });
      return { cols: cols && cols !== 'none' ? cols : null, boxes };
    });
    const rows = [...new Set(grid.boxes.map(b => b.top))].sort((a, b) => a - b);
    const firstRows = rows.slice(0, 3);
    const lefts = [...new Set(grid.boxes.filter(b => firstRows.includes(b.top)).map(b => b.left))].sort((a, b) => a - b);
    return {
      viewport: this.page.viewportSize()?.width ?? 0,
      cards: grid.boxes.length,
      gridTemplateColumns: grid.cols,
      tracks: grid.cols ? grid.cols.trim().split(/\s+/).length : 0,
      columns: lefts.length,
      firstRowColumns: new Set(grid.boxes.filter(b => b.top === rows[0]).map(b => b.left)).size,
      cardWidths: grid.boxes.map(b => b.width),
      cardLefts: lefts,
      rows: rows.map(top => grid.boxes.filter(b => b.top === top).length),
      overflow: grid.boxes.filter(b => b.overflow).map(b => b.id),
      scrollWidth: await this.page.evaluate(() => document.documentElement.scrollWidth),
    };
  }

  // product-list block: check filter option i like a user (open SP drawer, expand its group, tick, close drawer).
  async toggleBlockFilter(i: number) {
    const option = this.chips.nth(i);
    // TODO: data-testid product-list-filter-toggle / product-list-filter-close
    const open = this.listing.locator('.pl-filter-toggle');
    const close = this.listing.locator('.pl-filter-close');
    // The SP drawer sits off-screen (still "visible" to Playwright), so open/close only when the toggle is shown.
    const drawer = await open.isVisible();
    if (drawer) await open.click();
    const group = this.listing.locator('.pl-filter-group').filter({ has: option });
    if (await group.evaluate(g => g.classList.contains('is-collapsed'))) await group.locator('.pl-filter-heading').click();
    await option.click();
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    if (drawer) await close.click();
  }
}
