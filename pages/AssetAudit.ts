import type { Page, Response } from '@playwright/test';
import { damRoots, namingRule } from '../fixtures/dsr-227';

export type AssetRef = { kind: 'img' | 'source' | 'video' | 'pdf'; url: string };
export type AssetResponse = { url: string; status: number; contentType: string; bytes: number; resourceType: string };
export type ImageState = { src: string; complete: boolean; naturalWidth: number; renderedWidth: number; alt: string | null; decorative: boolean; inMain: boolean };

// DSR-227 asset audit: DOM asset references (img/source/srcset/video/PDF links) + network responses of a product page.
// Read-only; generic selectors because it runs on any product page (no data-testid needed).
export class AssetAudit {
  readonly responses: AssetResponse[] = [];

  constructor(readonly page: Page) {
    page.on('response', r => { void this.record(r); });
  }

  private async record(r: Response) {
    const type = r.request().resourceType();
    const contentType = r.headers()['content-type'] || '';
    if (!['image', 'media'].includes(type) && !/\.pdf(\?|$)/i.test(r.url()) && !contentType.includes('pdf')) return;
    const bytes = await r.request().sizes().then(s => s.responseBodySize).catch(() => Number(r.headers()['content-length'] || 0));
    this.responses.push({ url: r.url(), status: r.status(), contentType, bytes, resourceType: type });
  }

  async goto(url: string): Promise<Response | null> {
    const response = await this.page.goto(url);
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
    return response;
  }

  // Scroll to the bottom so lazy images load (9.0 step 1).
  async scrollToBottom() {
    await this.page.evaluate(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 600) {
        window.scrollTo(0, y);
        await new Promise(r => setTimeout(r, 100));
      }
    });
    await this.page.waitForLoadState('networkidle').catch(() => undefined);
  }

  async refs(): Promise<AssetRef[]> {
    return this.page.evaluate(() => {
      const out: { kind: 'img' | 'source' | 'video' | 'pdf'; url: string }[] = [];
      const abs = (u: string) => { try { return new URL(u, location.href).href; } catch { return ''; } };
      const srcset = (s: string) => s.split(',').map(c => c.trim().split(/\s+/)[0]).filter(Boolean);
      document.querySelectorAll('img').forEach(i => {
        [i.currentSrc, i.getAttribute('src') || '', ...srcset(i.getAttribute('srcset') || '')].forEach(u => u && out.push({ kind: 'img', url: abs(u) }));
      });
      document.querySelectorAll('source').forEach(s => {
        [s.getAttribute('src') || '', ...srcset(s.getAttribute('srcset') || '')].forEach(u => u && out.push({ kind: 'source', url: abs(u) }));
      });
      document.querySelectorAll('video').forEach(v => {
        [v.currentSrc, v.getAttribute('src') || '', v.getAttribute('poster') || ''].forEach(u => u && out.push({ kind: 'video', url: abs(u) }));
      });
      document.querySelectorAll('a[href*=".pdf" i]').forEach(a => out.push({ kind: 'pdf', url: (a as HTMLAnchorElement).href }));
      const seen = new Set<string>();
      return out.filter(r => r.url && !seen.has(r.kind + r.url) && seen.add(r.kind + r.url));
    });
  }

  async images(): Promise<ImageState[]> {
    return this.page.locator('img').evaluateAll(imgs => imgs.map(el => {
      const i = el as HTMLImageElement;
      return {
        src: i.currentSrc || i.getAttribute('src') || '',
        complete: i.complete,
        naturalWidth: i.naturalWidth,
        renderedWidth: i.getBoundingClientRect().width,
        alt: i.getAttribute('alt'),
        decorative: i.getAttribute('role') === 'presentation' || !!i.closest('[aria-hidden="true"]'),
        inMain: !!i.closest('main'),
      };
    }));
  }

  // Largest rendered image in main = "main image" (12.0).
  async mainImage(): Promise<ImageState | null> {
    const imgs = (await this.images()).filter(i => i.inMain && i.renderedWidth > 0 && i.src);
    return imgs.sort((a, b) => b.renderedWidth - a.renderedWidth)[0] ?? null;
  }

  // ---- static helpers (URL only) ----
  static isDam(url: string): boolean {
    return damRoots.some(re => re.test(new URL(url).pathname));
  }

  // Path segments after the DAM root, decoded; null if the URL is not a DAM/DM URL.
  static damSegments(url: string): string[] | null {
    const path = new URL(url).pathname;
    for (const re of damRoots) {
      const m = path.match(re);
      if (m) return path.slice(m.index! + m[0].length).split('/').filter(Boolean).map(s => { try { return decodeURIComponent(s); } catch { return s; } });
    }
    return null;
  }

  static namingViolations(urls: string[]): { url: string; segments: string[] }[] {
    const out: { url: string; segments: string[] }[] = [];
    for (const url of new Set(urls)) {
      const bad = (AssetAudit.damSegments(url) ?? []).filter(s => !namingRule.test(s));
      if (bad.length) out.push({ url, segments: bad });
    }
    return out;
  }

  // host + DAM root (or first path segment) for the baseline "hosts/roots" table.
  static root(url: string): string {
    const u = new URL(url);
    for (const re of damRoots) {
      const m = u.pathname.match(re);
      if (m) return `${u.host}${u.pathname.slice(0, m.index! + m[0].length)}`;
    }
    if (/\/media_[0-9a-f]+/.test(u.pathname)) return `${u.host} (EDS media_)`;
    return `${u.host}/${u.pathname.split('/')[1] ?? ''}/`;
  }
}
