import type { Locator, Page, Response } from '@playwright/test';

interface CollectedError {
  type: 'pageerror' | 'console';
  name: string | null;
  message: string;
  stack: string | null;
  firstStackFrame: string | null;
  sourceUrl: string | null;
  location: { url: string; lineNumber: number; columnNumber: number } | null;
}

export class MovieDetailPage {
  readonly back: Locator;
  readonly heading: Locator;
  readonly title: Locator;
  readonly player: Locator;
  readonly playerEmbed: Locator;
  readonly playerVideo: Locator;
  readonly relatedProductsSection: Locator;
  readonly relatedProductsHeading: Locator;
  private readonly productCards: Locator;
  readonly relatedProductCardLinks: Locator;
  readonly relatedProductNames: Locator;
  readonly relatedProductCodes: Locator;
  readonly relatedProductBookmarks: Locator;
  readonly relatedContentSection: Locator;
  readonly relatedContentHeading: Locator;
  readonly carouselPrev: Locator;
  readonly carouselNext: Locator;
  private readonly contentCards: Locator;
  readonly relatedContentCardLinks: Locator;
  readonly relatedContentCardImages: Locator;
  readonly relatedContentCardTitles: Locator;
  readonly relatedContentTags: Locator;

  private readonly errors: CollectedError[] = [];

  constructor(readonly page: Page) {
    page.on('pageerror', (error) => {
      const firstStackFrame = error.stack?.split('\n').find((line) => /^\s*at\s/.test(line))?.trim() ?? null;
      const sourceUrl = firstStackFrame?.match(/https?:\/\/[^\s)]+/)?.[0].replace(/:\d+(?::\d+)?$/, '') ?? null;
      this.errors.push({
        type: 'pageerror', name: error.name, message: error.message,
        stack: error.stack ?? null, firstStackFrame, sourceUrl, location: null,
      });
    });
    page.on('console', (message) => {
      if (message.type() !== 'error') return;
      this.errors.push({
        type: 'console', name: null, message: message.text(), stack: null, firstStackFrame: null,
        sourceUrl: message.location().url || null, location: message.location(),
      });
    });
    this.back = page.getByTestId('movie-detail-back');
    this.heading = page.getByTestId('movie-detail-heading');
    this.title = page.getByTestId('movie-detail-title');
    this.player = page.getByTestId('movie-detail-player');
    this.playerEmbed = page.getByTestId('movie-detail-player-embed');
    this.playerVideo = page.getByTestId('movie-detail-player-video');
    this.relatedProductsSection = page.getByTestId('movie-detail-related-products');
    this.relatedProductsHeading = page.getByTestId('movie-detail-related-products-heading');
    this.productCards = page.getByTestId('related-product-card');
    this.relatedProductCardLinks = page.getByTestId('related-product-card-link');
    this.relatedProductNames = page.getByTestId('related-product-name');
    this.relatedProductCodes = page.getByTestId('related-product-code');
    this.relatedProductBookmarks = page.getByTestId('related-product-bookmark');
    this.relatedContentSection = page.getByTestId('movie-detail-related-content');
    this.relatedContentHeading = page.getByTestId('movie-detail-related-content-heading');
    this.carouselPrev = this.relatedContentSection.getByTestId('carousel-prev');
    this.carouselNext = this.relatedContentSection.getByTestId('carousel-next');
    this.contentCards = page.getByTestId('related-content-card');
    this.relatedContentCardLinks = page.getByTestId('related-content-card-link');
    this.relatedContentCardImages = page.getByTestId('related-content-card-image');
    this.relatedContentCardTitles = page.getByTestId('related-content-card-title');
    this.relatedContentTags = page.getByTestId('related-content-tag');
  }

  goto(path: string): Promise<Response | null> {
    return this.page.goto(path);
  }

  metaContent(nameOrProperty: string): Promise<string | null> {
    // Metadata has no data-testid; read its standard name/property directly.
    return this.page.evaluate((key) => {
      const meta = Array.from(document.head.getElementsByTagName('meta')).find(
        (element) => element.name === key || element.getAttribute('property') === key,
      );
      return meta?.getAttribute('content') ?? null;
    }, nameOrProperty);
  }

  relatedProductCards(): Locator {
    return this.productCards;
  }

  playerEmbedSrc(): Promise<string | null> {
    return this.playerEmbed.getAttribute('src');
  }

  consoleErrors(siteUrl: string): ReadonlyArray<CollectedError & { source: 'site' | 'third-party' | 'unknown' }> {
    // Use the configured site, even if navigation redirects to a different origin.
    const siteOrigin = new URL(siteUrl).origin;
    return this.errors.map((error) => {
      let source: 'site' | 'third-party' | 'unknown' = 'unknown';
      if (error.sourceUrl) {
        try {
          source = new URL(error.sourceUrl).origin === siteOrigin ? 'site' : 'third-party';
        } catch {
          // Missing or unparseable sources remain visible in the attachment.
        }
      }
      return { ...error, source };
    });
  }

  relatedContentCards(): Locator {
    return this.contentCards;
  }

  relatedContentTitles(): Promise<string[]> {
    return this.relatedContentCardTitles.allTextContents();
  }

  async clickNextUntilEnd(): Promise<void> {
    const cardCount = await this.contentCards.count();
    for (let clicks = 0; clicks <= cardCount; clicks += 1) {
      const disabled = await this.carouselNext.evaluate((button) =>
        button.hasAttribute('disabled') || button.getAttribute('aria-disabled') === 'true',
      );
      if (disabled) return;
      await this.carouselNext.click();
    }
    throw new Error('Related Content carousel did not reach its end');
  }
}
