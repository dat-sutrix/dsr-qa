import type { Locator, Page, Response } from '@playwright/test';

// Eco-friendly products TOP (C14) and detail template (C15). C14 = eco-carousel block on the DEV demo page
// (JOB-20261019-08); C15 not on DEV. No ARIA states on cards/dots → block classes; replace once data-testid lands.
export class EcoProductsPage {
  readonly main: Locator;

  constructor(readonly page: Page) {
    this.main = page.locator('main');
  }

  async goto(path: string): Promise<Response | null> {
    const response = await this.page.goto(path);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    return response;
  }

  // ---- C14 TOP ----
  // TODO: data-testid eco-carousel
  get carousel(): Locator {
    return this.main.locator('.eco-carousel, [aria-roledescription="carousel"], .carousel, [class*="sustainable"]').first();
  }

  // TODO: data-testid eco-category-card (incl. off-screen items). Loop clones (.is-clone, aria-hidden) excluded.
  get cards(): Locator {
    return this.carousel.locator('[aria-roledescription="slide"], li:has(img)').and(this.page.locator(':not(.is-clone)'));
  }

  // TODO: data-testid eco-category-card-active
  get activeCard(): Locator {
    return this.carousel.locator('.eco-carousel-card.is-active').first();
  }

  // DEV demo authors the same name on every card → identify cards by position (data-index).
  async activeIndex(): Promise<number> {
    return Number(await this.activeCard.getAttribute('data-index'));
  }

  // TODO: data-testid eco-carousel-next / eco-carousel-prev
  get next(): Locator { return this.carousel.getByRole('button', { name: /next|次/i }); }
  get prev(): Locator { return this.carousel.getByRole('button', { name: /prev|前/i }); }

  // TODO: data-testid eco-carousel-dot
  get dots(): Locator {
    return this.carousel.locator('[role="tab"], .eco-carousel-dot, [class*="dot"] button, [class*="pagination"] button');
  }

  // TODO: data-testid eco-view-more
  viewMore(card: Locator): Locator { return card.getByRole('link', { name: /VIEW MORE/i }); }

  // href of every card's VIEW MORE (inactive panels are hidden, so read the DOM, not the a11y tree).
  async viewMoreHrefs(): Promise<string[]> {
    return this.cards.evaluateAll(cs => cs.map(c =>
      ([...c.querySelectorAll('a[href]')] as HTMLAnchorElement[]).find(a => /VIEW MORE/i.test(a.textContent || ''))?.href ?? ''));
  }

  // TODO: data-testid eco-category-summary
  cardSummary(card: Locator): Locator { return card.locator('[class*="desc"], [class*="panel"] p').first(); }

  // TODO: data-testid eco-top-background (block background behind the head/carousel)
  get topBackground(): Locator { return this.carousel.locator('[class*="-bg"]'); }

  // TODO: data-testid eco-finder-button
  get finderButton(): Locator {
    return this.main.getByRole('link', { name: /環境配慮型製品診断|solution finder|product finder/i }).first();
  }

  async cardName(card: Locator): Promise<string> {
    // TODO: data-testid eco-category-name
    return ((await card.locator('h2, h3, [class*="name"], [class*="title"]').first().textContent().catch(() => '')) || '').trim();
  }

  async activeName(): Promise<string> {
    return this.cardName(this.activeCard);
  }

  // ---- C15 detail ----
  // TODO: data-testid eco-hero
  get hero(): Locator { return this.main.locator('.hero, [class*="hero"]').first(); }
  // TODO: data-testid eco-hero-tag
  get heroTag(): Locator { return this.hero.locator('[class*="tag"]').first(); }
  // TODO: data-testid eco-hero-summary
  get heroSummary(): Locator { return this.hero.locator('p').first(); }
  // TODO: data-testid eco-free-area (A5: standard EDS default content)
  get freeArea(): Locator { return this.main.locator('[class*="free"], .default-content-wrapper').first(); }
  // TODO: data-testid eco-product-list
  get productList(): Locator { return this.main.locator('[class*="product-list"]').first(); }
  // TODO: data-testid eco-product-card
  get productCards(): Locator { return this.productList.locator('a[href*="/products/"]'); }

  async productHrefs(): Promise<string[]> {
    return this.productCards.evaluateAll(as => as.map(a => (a as HTMLAnchorElement).href));
  }

  async loaded(img: Locator): Promise<boolean> {
    return img.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth > 0).catch(() => false);
  }

  // 12.0: background image URLs = img src inside hero/cards + CSS background-image in those scopes.
  async backgroundUrls(scope: Locator): Promise<string[]> {
    return scope.evaluateAll(roots => {
      const out = new Set<string>();
      for (const root of roots) {
        for (const el of [root, ...root.querySelectorAll('*')]) {
          if (el instanceof HTMLImageElement && (el.currentSrc || el.src)) out.add(new URL(el.currentSrc || el.src, location.href).href);
          for (const m of getComputedStyle(el).backgroundImage.matchAll(/url\("?([^")]+)"?\)/g)) out.add(new URL(m[1], location.href).href);
        }
      }
      return [...out];
    });
  }

  async internalLinks(): Promise<string[]> {
    return this.main.locator('a[href]').evaluateAll(as => as.map(a => (a as HTMLAnchorElement).href).filter(h => h.startsWith(location.origin)));
  }
}
