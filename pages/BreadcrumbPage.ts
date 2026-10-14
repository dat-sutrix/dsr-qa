import type { Locator, Page, Response } from '@playwright/test';

export class BreadcrumbPage {
  readonly breadcrumb: Locator;
  readonly list: Locator;
  readonly items: Locator;
  readonly links: Locator;
  readonly current: Locator;
  readonly arrows: Locator;
  readonly jsonld: Locator;
  readonly back: Locator;

  constructor(readonly page: Page) {
    this.breadcrumb = page.getByTestId('breadcrumb');
    this.list = this.breadcrumb.getByTestId('breadcrumb-list');
    this.items = this.breadcrumb.getByTestId('breadcrumb-item');
    this.links = this.breadcrumb.getByTestId('breadcrumb-link');
    this.current = this.breadcrumb.getByTestId('breadcrumb-current');
    this.arrows = this.breadcrumb.getByTestId('breadcrumb-arrow');
    // TODO: data-testid breadcrumb-jsonld; search head and body, filter by parsed @type below.
    this.jsonld = page.locator('script[type="application/ld+json"]');
    this.back = page.getByTestId('movie-detail-back');
  }

  goto(path: string): Promise<Response | null> {
    return this.page.goto(path);
  }

  async breadcrumbJsonLd(): Promise<Record<string, unknown>[]> {
    const results: Record<string, unknown>[] = [];
    const collect = (value: unknown): void => {
      if (Array.isArray(value)) { value.forEach(collect); return; }
      if (!value || typeof value !== 'object') return;
      const node = value as Record<string, unknown>;
      const types = Array.isArray(node['@type']) ? node['@type'] : [node['@type']];
      if (types.includes('BreadcrumbList')) results.push(node);
      if (node['@graph']) collect(node['@graph']);
    };
    for (const text of await this.jsonld.allTextContents()) collect(JSON.parse(text));
    return results;
  }
}
