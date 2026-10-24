import type { APIRequestContext, Locator, Page, Response } from '@playwright/test';

// DSR-608 Booth TOP (booth-top block) + ITEM for (booth-item block). No data-testid on either block yet:
// class selectors observed on preview /ja/digital-showroom/both(/item) 2026-10-24.
export class BoothPage {
  readonly top: Locator;
  readonly topBg: Locator;
  readonly topBack: Locator;
  readonly topPills: Locator;
  readonly topTitle: Locator;
  readonly slides: Locator;
  readonly mediaControls: Locator;
  readonly links: Locator;
  readonly productsLink: Locator;
  readonly itemLinks: Locator;
  readonly ctaButtons: Locator;
  readonly video: Locator;
  readonly videoFacade: Locator;
  readonly item: Locator;
  readonly itemBack: Locator;
  readonly itemPills: Locator;
  readonly itemTitle: Locator;
  readonly thumbs: Locator;
  readonly panels: Locator;
  readonly itemImage: Locator;
  readonly panelHeading: Locator;
  readonly panelBody: Locator;
  readonly panelCta: Locator;
  readonly related: Locator;
  readonly relatedLinks: Locator;
  readonly modal: Locator;

  constructor(readonly page: Page) {
    // TODO: data-testid booth-top
    this.top = page.locator('main .booth-top.block');
    // TODO: data-testid booth-top-bg
    this.topBg = this.top.locator('.bt-bg img');
    // TODO: data-testid booth-top-back
    this.topBack = this.top.locator('a.bt-back');
    // TODO: data-testid booth-pill (TOP pills are <span> on the sample page, ITEM pills are <a>)
    this.topPills = this.top.locator('.booth-pills .booth-pill');
    // TODO: data-testid booth-top-title (category name)
    this.topTitle = this.top.locator('.bt-title');
    // TODO: data-testid booth-top-slide
    this.slides = this.top.locator('.bt-media .bt-slide');
    // Carousel arrows / dots: no markup with 1 slide; any button inside the media area counts as a control.
    this.mediaControls = this.top.locator('.bt-media').locator('button, [role="tab"]').filter({ visible: true });
    // TODO: data-testid booth-top-link
    this.links = this.top.locator('.bt-links .bt-link');
    this.productsLink = this.top.locator('a.bt-link').filter({ hasText: 'Products' });
    this.itemLinks = this.top.locator('a.bt-link').filter({ hasNotText: 'Products' });
    // CTA modal trigger (608-9.0). button.bt-zoom is the image preview toggle (adds .is-previewing), not the modal.
    // TODO: data-testid booth-cta – modal markup not on DEV yet (content pending YKK, Q18 / CB-10).
    this.ctaButtons = this.top.locator('button.bt-link:not(.bt-zoom), [aria-haspopup="dialog"]');
    this.video = this.top.locator('.bt-video .video.block');
    this.videoFacade = this.video.locator('.vp-facade');

    // TODO: data-testid booth-item
    this.item = page.locator('main .booth-item.block');
    this.itemBack = this.item.locator('a.bi-back');
    this.itemPills = this.item.locator('.booth-pills a.booth-pill');
    this.itemTitle = this.item.locator('.bi-heading-main .bi-title');
    // TODO: data-testid booth-item-thumb (no thumbnail markup with 1 product)
    this.thumbs = this.item.locator('.bi-thumbs, .bi-thumb').filter({ visible: true });
    this.panels = this.item.locator('.bi-panels .bi-panel');
    this.itemImage = this.item.locator('.bi-media img').filter({ visible: true });
    this.panelHeading = this.panels.filter({ visible: true }).locator('.bi-heading');
    this.panelBody = this.panels.filter({ visible: true }).locator('.bi-body');
    this.panelCta = this.panels.filter({ visible: true }).locator('a.bi-cta');

    this.related = page.locator('main .related-content.block');
    this.relatedLinks = this.related.locator('a[href]');
    // TODO: data-testid booth-cta-modal (markup unknown; content pending YKK, Q18)
    this.modal = page.locator('dialog[open], [role="dialog"], .modal.open, .modal[aria-hidden="false"]').filter({ visible: true });
  }

  async goto(url: string): Promise<Response | null> {
    const response = await this.page.goto(url, { waitUntil: 'domcontentloaded' });
    await this.page.waitForLoadState('networkidle').catch(() => {});
    return response;
  }

  hrefs(links: Locator): Promise<string[]> {
    return links.evaluateAll(els => els.map(e => e.getAttribute('href') ?? ''));
  }

  horizontalOverflow(): Promise<number> {
    return this.page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  }

  static async status(request: APIRequestContext, url: string): Promise<number> {
    return (await request.get(url, { failOnStatusCode: false })).status();
  }
}
