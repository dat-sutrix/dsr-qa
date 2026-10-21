import type { Locator, Page, Response } from '@playwright/test';

// Catalog detail on an overlay page (/{lang}/library/catalog/{id}, DSR-654). No data-testid in DEV (2026-10-21).
export class CatalogDetailPage {
  readonly block: Locator;
  readonly title: Locator;
  readonly form: Locator;

  constructor(readonly page: Page) {
    // TODO: data-testid catalog-detail
    this.block = page.locator('main .catalog-detail');
    // TODO: data-testid catalog-detail-title (h1 is the fixed heading "Product Catalog")
    this.title = this.block.locator('.catalog-detail-title');
    // TODO: data-testid catalog-detail-form
    this.form = this.block.locator('form.catalog-detail-form');
  }

  async goto(url: string): Promise<Response | null> {
    return this.page.goto(url);
  }
}
