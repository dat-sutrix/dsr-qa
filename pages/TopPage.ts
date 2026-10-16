import type { Locator, Page, Response } from '@playwright/test';
import { hosts, topPath, type Language } from '../fixtures/dsr-609';

export class TopPage {
  readonly main: Locator;
  readonly heroImage: Locator;
  readonly search: Locator;
  readonly searchTitle: Locator;
  readonly searchInput: Locator;
  readonly recommend: Locator;
  readonly recommendCards: Locator;
  readonly news: Locator;
  readonly newsItems: Locator;
  // Host that served the page (.aem.live or .aem.page fallback) and all attempts.
  host = '';
  attempts: { url: string; status: number | undefined }[] = [];

  constructor(readonly page: Page) {
    this.main = page.locator('main');
    // TODO: data-testid top-hero-image
    this.heroImage = this.main.locator('.top-hero-bg img');
    // TODO: data-testid top-quick-search
    this.search = this.main.getByRole('search');
    this.searchTitle = this.search.locator('.top-hero-search-title');
    this.searchInput = this.search.getByRole('searchbox');
    // TODO: data-testid top-recommend
    this.recommend = this.main.locator('.top-recommend');
    this.recommendCards = this.recommend.getByRole('listitem');
    // TODO: data-testid top-news
    this.news = this.main.locator('.top-news');
    this.newsItems = this.news.getByRole('listitem');
  }

  async goto(lang: Language, baseURL: string): Promise<Response | null> {
    let response: Response | null = null;
    for (const host of hosts(baseURL)) {
      response = await this.page.goto(host + topPath(lang));
      this.attempts.push({ url: this.page.url(), status: response?.status() });
      this.host = host;
      if (response?.status() !== 404) break;
    }
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    return response;
  }

  // Scrolls through the page so lazy images and late blocks load.
  async scrollThrough() {
    await this.page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 500) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 100));
      }
      window.scrollTo(0, 0);
    });
  }
}

// Computed colours of an element, for hover before/after comparison.
export const colours = (el: Locator) => el.evaluate(e => {
  const s = getComputedStyle(e);
  return { color: s.color, backgroundColor: s.backgroundColor, borderColor: s.borderColor };
});
