import type { APIRequestContext, Locator, Page, Response } from '@playwright/test';
import { ProductDetailPage } from './ProductDetailPage';

export type RawStatus = { url: string; status: number; location: string | null };

// DSR-503 product URL checks. Product content reuses ProductDetailPage (DSR-586 block selectors);
// this object adds the URL/SEO surface: canonical, og:url, html lang and raw (no-redirect) status.
export class ProductUrlPage {
  readonly detail: ProductDetailPage;
  readonly canonical: Locator;
  readonly ogUrl: Locator;

  constructor(readonly page: Page) {
    this.detail = new ProductDetailPage(page);
    this.canonical = page.locator('head link[rel="canonical"]');
    this.ogUrl = page.locator('head meta[property="og:url"]');
  }

  goto(url: string): Promise<Response | null> {
    return this.detail.goto(url);
  }

  htmlLang(): Promise<string> {
    return this.page.evaluate(() => document.documentElement.lang);
  }

  async product() {
    return { name: (await this.detail.name.innerText()).trim(), code: (await this.detail.code.innerText()).trim() };
  }

  // GET without following redirects (final status + Location as served).
  static async rawStatus(request: APIRequestContext, url: string): Promise<RawStatus> {
    const response = await request.get(url, { maxRedirects: 0, failOnStatusCode: false });
    return { url, status: response.status(), location: response.headers().location ?? null };
  }

  // Raw HTML (no JS) head values for SEO checks (7.0).
  static rawHead(html: string) {
    const attr = (re: RegExp) => html.match(re)?.[1] ?? null;
    return {
      canonical: attr(/<link[^>]+rel="canonical"[^>]+href="([^"]*)"/i),
      ogUrl: attr(/<meta[^>]+property="og:url"[^>]+content="([^"]*)"/i),
    };
  }
}
