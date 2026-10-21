import type { Browser, Locator, Page, Response } from '@playwright/test';

export type RawDoc = {
  title: string;
  description: string | null;
  robots: string | null;
  ogImage: string | null;
  htmlLang: string;
  bodyText: string;
  rows: { key: string; value: string }[];
};

// Product detail = product-detail block rendered by overlay (json2html) rows. No data-testid on the block yet:
// class selectors observed on branch page /en/products/46 (2026-10-19).
export class ProductDetailPage {
  readonly block: Locator;
  readonly name: Locator;
  readonly code: Locator;
  readonly images: Locator;
  readonly gallery: Locator;
  readonly thumbs: Locator;
  readonly headings: Locator;
  readonly contact: Locator;
  readonly toolbarIcons: Locator;
  readonly playIcons: Locator;
  readonly movieLinks: Locator;
  readonly relatedCards: Locator;

  constructor(readonly page: Page) {
    // TODO: data-testid product-detail
    this.block = page.locator('main .product-detail.block');
    // TODO: data-testid product-detail-name (two h1: .pd-info-mobile and desktop; only one visible per viewport)
    this.name = this.block.locator('.pd-name').filter({ visible: true });
    // TODO: data-testid product-detail-code
    this.code = this.block.locator('.pd-code-value').filter({ visible: true });
    // TODO: data-testid product-detail-image
    this.images = this.block.locator('.pd-gallery img');
    // TODO: data-testid product-detail-gallery / product-detail-media (thumb data-media = slot, observed on /ja/products/46 2026-10-21)
    this.gallery = this.block.locator('.pd-gallery');
    this.thumbs = this.gallery.locator('.pd-gallery-thumb[data-media]');
    // TODO: data-testid product-detail-spec
    this.headings = this.block.locator('h2, h3');
    // TODO: data-testid product-detail-contact
    this.contact = this.block.getByRole('link', { name: /contact us|お問い合わせ|问询|咨询/i }).filter({ visible: true });
    // TODO: data-testid product-detail-toolbar (DSR-457 #3; selector not confirmed)
    this.toolbarIcons = this.block.locator('[class*="toolbar"] button, [class*="toolbar"] a');
    // TODO: data-testid product-detail-play-icon (DSR-457 #7)
    this.playIcons = this.block.locator('[class*="play"]');
    // TODO: data-testid product-detail-movie-link (DSR-457 #13)
    this.movieLinks = this.block.getByRole('link', { name: /movie/i });
    // TODO: data-testid product-detail-related-card (class observed on /{ja,en}/products/46, 2026-10-21)
    this.relatedCards = this.block.locator('a.pd-related-card');
  }

  async goto(url: string): Promise<Response | null> {
    const response = await this.page.goto(url);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    return response;
  }

  async loadedImages() {
    return this.images.evaluateAll(imgs => imgs.map(i => ({ src: (i as HTMLImageElement).currentSrc, naturalWidth: (i as HTMLImageElement).naturalWidth })));
  }

  // Raw HTML (no JS): parsed in a JavaScript-disabled context so page scripts never run.
  static async parseRaw(browser: Browser, html: string): Promise<RawDoc> {
    const context = await browser.newContext({ javaScriptEnabled: false });
    try {
      const page = await context.newPage();
      await page.setContent(html, { waitUntil: 'domcontentloaded' });
      return await page.evaluate(() => {
        const meta = (sel: string) => document.querySelector<HTMLMetaElement>(sel)?.content ?? null;
        const rows = [...document.querySelectorAll('main .product-detail > div')].map(row => {
          const cells = [...row.children] as HTMLElement[];
          return { key: (cells[0]?.textContent ?? '').trim(), value: (cells[1]?.textContent ?? '').trim() };
        });
        return {
          title: document.title,
          description: meta('meta[name="description"]'),
          robots: meta('meta[name="robots"]'),
          ogImage: meta('meta[property="og:image"]'),
          htmlLang: document.documentElement.lang,
          bodyText: document.body?.textContent?.replace(/\s+/g, ' ') ?? '',
          rows,
        };
      });
    } finally {
      await context.close();
    }
  }
}
