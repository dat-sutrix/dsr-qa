import type { APIRequestContext, Locator, Page, Response } from '@playwright/test';
import { myListName, relatedStoriesName, relatedItemsName, viewAllStoriesName, contactName, shareHost } from '../fixtures/dsr-529';

export type MetaEntry = { key: string; content: string | null };

// Article (STORIES) detail, template `article`. No data-testid list yet (2026-10-16): selectors are
// class/role guesses based on the shared article-meta block (DSR-566) and must be confirmed on TD-529-01.
export class ArticleDetailPage {
  readonly main: Locator;
  readonly title: Locator;
  readonly subtitle: Locator;
  readonly articleImage: Locator;
  readonly description: Locator;
  readonly infoBar: Locator;
  readonly date: Locator;
  readonly tags: Locator;
  readonly myList: Locator;
  readonly share: Locator;
  readonly body: Locator;
  readonly profile: Locator;
  readonly relatedStories: Locator;
  readonly relatedStoriesHeading: Locator;
  readonly relatedItems: Locator;
  readonly relatedItemsHeading: Locator;
  readonly viewAllStories: Locator;
  readonly contact: Locator;
  readonly footerAction: Locator;

  constructor(readonly page: Page) {
    this.main = page.locator('main');
    // TODO: data-testid article-title (block 3)
    this.title = this.main.locator('h1');
    // TODO: data-testid article-subtitle / article-image / article-description (blocks 4/5/6)
    // DEV renders 4/5/6 as plain text/image blocks in the article-title section (JOB-20261022-02):
    // title → text (subtitle) → image → text (description) → article-meta. Scope to that section's blocks, not wrappers.
    const header = this.main.locator('.section:has(.article-title.block)');
    this.subtitle = header.locator('.article-title-wrapper + .text-wrapper > .text.block');
    this.articleImage = header.locator('.image-wrapper > .image.block');
    this.description = header.locator('.image-wrapper + .text-wrapper > .text.block');
    // TODO: data-testid article-info-bar / article-date / article-tag (block 7)
    this.infoBar = this.main.locator('.article-meta.block, [data-block-name*="info-bar"]');
    this.date = this.infoBar.locator('.article-meta-date, time');
    // Leaf chips only: the .article-meta-tags wrapper also matched [class*="tag"] (JOB-20261021-05).
    this.tags = this.infoBar.locator('.article-meta-tag');
    // TODO: data-testid article-mylist / article-share
    this.myList = this.infoBar.getByRole('button', { name: myListName });
    this.share = this.infoBar.locator('.article-meta-actions a, a[href*="facebook"], a[href*="twitter"], a[href*="x.com"], a[href*="linkedin"]');
    // TODO: data-testid article-body / article-profile (blocks 9/11)
    // Body text is outside the article-title section (that section's text blocks are 4/6).
    this.body = this.main.locator('.section:not(:has(.article-title.block)) .text.block');
    this.profile = this.main.locator('[data-block-name*="profile"], [class*="profile"]');
    // TODO: data-testid article-related-stories / article-related-items (blocks 12/13)
    // Block is related-articles on DEV (JOB-20261020-10). Match the block only: the section wrapper
    // "related-articles-container" is present even without the block (JOB-ZZ-IDLE-19).
    this.relatedStories = this.main.locator('[data-block-name="related-articles"], .related-articles.block, [data-block-name*="related-stories"], .related-stories.block');
    this.relatedStoriesHeading = this.main.getByRole('heading', { name: relatedStoriesName });
    // Block is related-product on DEV; match the block, not the related-product-container section.
    this.relatedItems = this.main.locator('[data-block-name="related-product"], .related-product.block, [data-block-name*="related-items"], .related-items.block');
    this.relatedItemsHeading = this.main.getByRole('heading', { name: relatedItemsName });
    // TODO: data-testid article-view-all-stories / article-contact (block 14)
    this.viewAllStories = page.getByRole('link', { name: viewAllStoriesName });
    this.contact = this.main.getByRole('link', { name: contactName });
    this.footerAction = this.viewAllStories;
  }

  async goto(path: string): Promise<Response | null> {
    const response = await this.page.goto(path);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    return response;
  }

  // Locator for a block named in fixtures blockOrder.
  block(name: string): Locator {
    return (this as unknown as Record<string, Locator>)[name];
  }

  // <meta name|property> entries from the published HTML as served (before client-side decoration).
  async rawMeta(request: APIRequestContext, path: string): Promise<{ title: string | null; meta: MetaEntry[] }> {
    const html = await (await request.get(path)).text();
    return this.page.evaluate(src => {
      const doc = new DOMParser().parseFromString(src, 'text/html');
      return {
        title: doc.querySelector('title')?.textContent ?? null,
        meta: [...doc.head.querySelectorAll('meta[name], meta[property]')].map(m => ({ key: (m.getAttribute('name') ?? m.getAttribute('property'))!, content: m.getAttribute('content') })),
      };
    }, html);
  }

  isShareHref(href: string | null): boolean {
    return shareHost.test(href ?? '');
  }

  // Rendered height and visibility of every match, to check トルツメ (collapsed) areas.
  async boxes(el: Locator): Promise<{ visible: boolean; height: number }[]> {
    return el.evaluateAll(els => els.map(e => {
      const r = e.getBoundingClientRect();
      const s = getComputedStyle(e);
      return { visible: s.display !== 'none' && s.visibility !== 'hidden' && r.height > 0, height: r.height };
    }));
  }
}
