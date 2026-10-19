import type { Page, Response } from '@playwright/test';

export type IconOccurrence = {
  selector: string;
  kind: 'img' | 'svg-use' | 'inline-svg' | 'css-background' | 'css-mask';
  src: string;
  alt: string | null;
  ariaLabel: string | null;
  ariaHidden: boolean;
  visibleLabel: string;
  width: number;
  height: number;
  visible: boolean;
  broken: boolean;
};

// Icons in product list (cards + filter panel) and product detail blocks. No data-testid for icons yet:
// class selectors observed on /ja/product-list (DEV 2026-10-19). Same rules as fixtures/dsr-589-inventory.cjs.
// TODO: data-testid product-icon
export const iconScopes = ['main .product-list.block', 'main .product-detail.block'];

export class IconPage {
  constructor(readonly page: Page) {}

  async goto(path: string): Promise<Response | null> {
    const response = await this.page.goto(path);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    return response;
  }

  async icons(): Promise<IconOccurrence[]> {
    return this.page.evaluate(scopes => {
      const out: IconOccurrence[] = [];
      const sel = (el: Element) => {
        const parts: string[] = [];
        for (let e: Element | null = el; e && e.tagName !== 'MAIN'; e = e.parentElement) {
          const cls = typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).join('.') : '';
          parts.unshift(e.tagName.toLowerCase() + cls);
          if (cls && parts.length >= 3) break;
        }
        return parts.join(' > ');
      };
      const urls = (v: string) => [...(v || '').matchAll(/url\("?([^")]+)"?\)/g)].map(m => m[1]);
      // Visible label = text of the nearest control/label around the icon (A6: aria-hidden icon needs a visible label).
      const visibleLabel = (el: Element) => {
        const host = el.closest('button, a, label, [role="button"]') ?? el.parentElement;
        const input = host?.querySelector('input');
        return ((host as HTMLElement | null)?.innerText || input?.getAttribute('placeholder') || input?.getAttribute('aria-label') || '').trim();
      };
      for (const scope of scopes) {
        const root = document.querySelector(scope);
        if (!root) continue;
        for (const el of root.querySelectorAll('*')) {
          const r = el.getBoundingClientRect();
          const base = {
            selector: sel(el),
            ariaHidden: !!el.closest('[aria-hidden="true"]'),
            ariaLabel: el.getAttribute('aria-label') ?? el.closest('[aria-label]')?.getAttribute('aria-label') ?? null,
            visibleLabel: visibleLabel(el),
          };
          const tag = el.tagName.toLowerCase();
          if (tag === 'img') {
            const img = el as HTMLImageElement;
            const src = img.currentSrc || img.src;
            // Product photos (Dynamic Media renditions) are not icons.
            if (!/dynamicmedia\/deliver/.test(src) && !el.closest('.pl-card-image, .pd-gallery'))
              out.push({ ...base, kind: 'img', src, alt: img.getAttribute('alt'), width: Math.round(r.width), height: Math.round(r.height), visible: r.width > 0 && r.height > 0, broken: img.complete && img.naturalWidth === 0 });
          }
          if (tag === 'use') {
            const href = el.getAttribute('href') || el.getAttribute('xlink:href');
            const box = el.closest('svg')!.getBoundingClientRect();
            if (href) out.push({ ...base, kind: 'svg-use', src: new URL(href, location.href).href, alt: null, width: Math.round(box.width), height: Math.round(box.height), visible: box.width > 0 && box.height > 0, broken: false });
          }
          if (tag === 'svg' && !el.querySelector('use'))
            out.push({ ...base, kind: 'inline-svg', src: 'inline-svg', alt: el.getAttribute('aria-label'), width: Math.round(r.width), height: Math.round(r.height), visible: r.width > 0 && r.height > 0, broken: false });
          for (const pseudo of [null, '::before', '::after']) {
            const cs = getComputedStyle(el, pseudo);
            const shown = (pseudo ? cs.content !== 'none' && cs.display !== 'none' : r.width > 0 && r.height > 0) && cs.visibility !== 'hidden';
            const seen = new Set<string>();
            for (const [prop, kind] of [['backgroundImage', 'css-background'], ['maskImage', 'css-mask'], ['webkitMaskImage', 'css-mask']] as const) {
              for (const u of urls(cs[prop] as string)) {
                if (seen.has(u)) continue;
                seen.add(u);
                out.push({ ...base, selector: base.selector + (pseudo || ''), kind, src: u, alt: null, width: Math.round(pseudo ? parseFloat(cs.width) || 0 : r.width), height: Math.round(pseudo ? parseFloat(cs.height) || 0 : r.height), visible: shown, broken: false });
              }
            }
          }
        }
      }
      return out;
    }, iconScopes);
  }
}
