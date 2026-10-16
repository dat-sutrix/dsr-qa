import type { Locator, Page, Response } from '@playwright/test';

export type GridMetrics = {
  viewport: number;
  cards: number;
  gridTemplateColumns: string | null;
  tracks: number;
  columns: number;
  cardWidths: number[];
  cardLefts: number[];
  rows: number[];
  overflow: string[];
  scrollWidth: number;
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

  constructor(readonly page: Page) {
    // TODO: data-testid product-list
    this.listing = page.locator('main .listing.block');
    // TODO: data-testid product-list-grid
    this.grid = this.listing.locator('.cards ul').first();
    // TODO: data-testid product-card
    this.cards = this.grid.locator(':scope > li');
    // TODO: data-testid product-card-title
    this.titles = this.cards.locator('.cards-card-title');
    // TODO: data-testid product-list-filter
    this.chips = this.listing.locator('.listing-chip:not([data-key="__all__"])');
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
      cardWidths: grid.boxes.map(b => b.width),
      cardLefts: lefts,
      rows: rows.map(top => grid.boxes.filter(b => b.top === top).length),
      overflow: grid.boxes.filter(b => b.overflow).map(b => b.id),
      scrollWidth: await this.page.evaluate(() => document.documentElement.scrollWidth),
    };
  }
}
