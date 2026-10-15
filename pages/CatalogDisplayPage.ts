import type { Locator, Page, Response } from '@playwright/test';
import { catalogQuery, type CatalogItem } from '../fixtures/dsr-557';

export class CatalogDisplayPage {
  readonly block: Locator;
  readonly items: Locator;

  constructor(readonly page: Page) {
    // TODO: data-testid catalog-display; no data-testid on the catalog listing in DEV (2026-10-15).
    this.block = page.locator('.listing.listing-catalog');
    // TODO: data-testid catalog-item
    this.items = this.block.locator('.cards.catalog li');
  }

  async goto(path: string): Promise<{ response: Response | null; data: CatalogItem[] }> {
    const query = this.page.waitForResponse(r => catalogQuery.test(r.url()), { timeout: 15_000 }).catch(() => null);
    const response = await this.page.goto(path);
    const json = await (await query)?.json().catch(() => null);
    return { response, data: json?.data?.dmCatalogList?.items ?? [] };
  }

  // TODO: data-testid catalog-title / catalog-thumbnail / catalog-link / catalog-date / catalog-label
  title(item: Locator): Locator { return item.locator('.cards-card-title a'); }
  image(item: Locator): Locator { return item.locator('.cards-card-image img'); }
  links(item: Locator): Locator { return item.locator('a[href]'); }
  cta(item: Locator): Locator { return item.locator('.cards-card-cta a'); }
  meta(item: Locator): Locator { return item.locator('.cards-card-meta'); }
  item(title: string): Locator { return this.items.filter({ has: this.page.locator('.cards-card-title a', { hasText: title }) }); }

  async label(item: Locator): Promise<string> {
    const text = (await item.innerText()).toUpperCase();
    return /\bNEW\b/.test(text) ? 'NEW' : /\bUPDATE\b/.test(text) ? 'UPDATE' : '';
  }
}
