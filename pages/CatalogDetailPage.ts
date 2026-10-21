import type { Locator, Page, Response } from '@playwright/test';

// Catalog detail on an overlay page (/{lang}/library/catalog/{id}, DSR-654). No data-testid in DEV (2026-10-21).
export class CatalogDetailPage {
  readonly block: Locator;
  readonly title: Locator;
  readonly form: Locator;
  readonly image: Locator;
  readonly description: Locator;
  readonly date: Locator;
  readonly typeLabel: Locator;
  readonly action: Locator;

  constructor(readonly page: Page) {
    // TODO: data-testid catalog-detail
    this.block = page.locator('main .catalog-detail');
    // TODO: data-testid catalog-detail-title (h1 is the fixed heading "Product Catalog")
    this.title = this.block.locator('.catalog-detail-title');
    // TODO: data-testid catalog-detail-form
    this.form = this.block.locator('form.catalog-detail-form');
    // TODO: data-testid catalog-detail-image
    this.image = this.block.locator('.catalog-detail-cover-frame img');
    // TODO: data-testid catalog-detail-description
    this.description = this.block.locator('.catalog-detail-description');
    // TODO: data-testid catalog-detail-date
    this.date = this.block.locator('.catalog-detail-date');
    // TODO: data-testid catalog-detail-type (no type label element in DEV 2026-10-21)
    this.typeLabel = this.block.locator('.catalog-detail-type');
    // TODO: data-testid catalog-detail-action (download / view button; not rendered in DEV 2026-10-21)
    this.action = this.block.getByRole('link', { name: /download|view|ダウンロード|閲覧|見る/i });
  }

  async goto(url: string): Promise<Response | null> {
    return this.page.goto(url);
  }
}
