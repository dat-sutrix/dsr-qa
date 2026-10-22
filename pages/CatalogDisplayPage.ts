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
    // dsr-catalog-list: data.related.items[] = DSR CF { _path, isActive, isBoothLimited, catalog: content CF }.
    const items: { _path?: string; isActive?: boolean | null; isBoothLimited?: boolean | null; catalog?: CatalogItem | null }[] = json?.data?.related?.items ?? [];
    const data = items.filter(i => i.catalog).map(i => ({ ...i.catalog!, dsrPath: i._path, isActive: i.isActive, isBoothLimited: i.isBoothLimited }));
    return { response, data };
  }

  // TODO: data-testid catalog-title / catalog-thumbnail / catalog-link / catalog-date / catalog-label
  title(item: Locator): Locator { return item.locator('.cards-card-title a'); }
  image(item: Locator): Locator { return item.locator('.cards-card-image img'); }
  links(item: Locator): Locator { return item.locator('a[href]'); }
  cta(item: Locator): Locator { return item.locator('.cards-card-cta a'); }
  meta(item: Locator): Locator { return item.locator('.cards-card-meta'); }
  // Exact title match: "QA190 e-book" must not match "QA190 e-book form".
  item(title: string): Locator {
    const exact = new RegExp(`^\\s*${title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}\\s*$`);
    return this.items.filter({ has: this.page.locator('.cards-card-title a', { hasText: exact }) });
  }

  // CFs can share a title (dev sample titles) and cards carry no CF id.
  // Title-matched cards are usable only when every CF with that title links the same way; otherwise returns null.
  cards(data: CatalogItem[], cf: CatalogItem): { cards: Locator; twins: number } | null {
    const key = (i: CatalogItem) => JSON.stringify([i.catalogType, i.requiresForm === true, i.ebookUrl, i.pdfAsset?._publishUrl ?? null]);
    const twins = data.filter(i => i.catalogTitle === cf.catalogTitle);
    return twins.every(i => key(i) === key(cf)) ? { cards: this.item(cf.catalogTitle), twins: twins.length } : null;
  }

  // Badge element only (span.cards-badge-new, plus .cards-badge-update for UPDATE); the title may contain "NEW".
  badge(item: Locator): Locator { return item.locator('.cards-card-image [class*="cards-badge"]'); }

  async label(item: Locator): Promise<string> {
    const badge = this.badge(item);
    if (!(await badge.count())) return '';
    const text = (await badge.allInnerTexts()).join(' ').trim().toUpperCase();
    return text === 'NEW' ? 'NEW' : text === 'UPDATE' ? 'UPDATE' : text;
  }
}
