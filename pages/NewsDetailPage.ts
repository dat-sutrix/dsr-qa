import type { Locator, Page, Response } from '@playwright/test';
import { backToListName, myListName } from '../fixtures/dsr-566';

export class NewsDetailPage {
  readonly main: Locator;
  readonly meta: Locator;
  readonly date: Locator;
  readonly myList: Locator;
  readonly share: Locator;
  readonly category: Locator;
  readonly title: Locator;
  readonly body: Locator;
  readonly images: Locator;
  readonly cta: Locator;
  readonly backToList: Locator;

  constructor(readonly page: Page) {
    this.main = page.locator('main');
    // TODO: data-testid news-article-meta / news-date
    this.meta = this.main.locator('.article-meta.block');
    this.date = this.meta.locator('.article-meta-date');
    // TODO: data-testid news-mylist / news-share
    this.myList = this.meta.getByRole('button', { name: myListName });
    this.share = this.meta.locator('.article-meta-actions a');
    // TODO: data-testid news-category / news-title
    this.category = this.main.locator('.news-detail.block .news-detail-category');
    this.title = this.main.locator('.news-detail.block .news-detail-title');
    // TODO: data-testid news-body
    this.body = this.main.locator('.text.block');
    this.images = this.main.locator('.image.block img');
    // TODO: data-testid news-cta (Button8)
    this.cta = this.main.locator('.button.block a.button8');
    // TODO: data-testid news-back-to-list
    this.backToList = this.main.getByRole('link', { name: backToListName });
  }

  async goto(path: string): Promise<Response | null> {
    const response = await this.page.goto(path);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    return response;
  }

  // Authored CTA link from the published source (`<path>.plain.html`), i.e. before block decoration.
  async authoredCtaHref(path: string): Promise<string | null> {
    return this.page.evaluate(async src => {
      const html = await (await fetch(`${src}.plain.html`)).text();
      const block = new DOMParser().parseFromString(html, 'text/html').querySelector('.button');
      const rows = block ? [...block.children] : [];
      const cell = rows[1];
      return cell?.querySelector('a')?.getAttribute('href') ?? cell?.textContent?.trim() ?? null;
    }, path);
  }

  async head(): Promise<Record<string, string | null>> {
    return this.page.evaluate(() => {
      const out: Record<string, string | null> = { title: document.title };
      for (const m of document.head.querySelectorAll('meta[name], meta[property]')) out[m.getAttribute('name') ?? m.getAttribute('property')!] = m.getAttribute('content');
      return out;
    });
  }
}
