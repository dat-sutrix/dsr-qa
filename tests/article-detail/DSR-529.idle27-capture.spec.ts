import { test } from '@playwright/test';
import fs from 'node:fs/promises';

// Record only: exact JOB-ZZ-IDLE-27 paths, no product assertions.
const output = 'results/JOB-ZZ-IDLE-27';
const base = 'https://main--dsr-eds-dev--sutrix-projects.aem.live';
const paths = ['/ja/library/article/stories/qa529-01', '/en/library/article/stories/qa529-01', '/ja/library/article/stories/qa529-02', '/ja/library/article', '/en/library/article'];
for (const target of paths) for (const width of [1440, 375]) {
  const tc = width === 1440 ? 'DSR-ARTICLE-030' : 'DSR-ARTICLE-031';
  test(`${tc} ${target} ${width}x900 record only`, async ({ page, request }) => {
    test.setTimeout(120_000);
    const started = new Date().toISOString();
    await page.setViewportSize({ width, height: 900 });
    const responses = new Map<string, number>();
    page.on('response', r => responses.set(r.url(), r.status()));
    const response = await page.goto(base + target, { waitUntil: 'networkidle' });
    await page.evaluate(async () => {
      for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
        scrollTo(0, y); await new Promise(r => setTimeout(r, 150));
      }
    });
    await page.waitForLoadState('networkidle');
    await page.evaluate(() => scrollTo(0, 0));
    const data = await page.evaluate(() => {
      // TODO: data-testid article-date / article-tag / article-image / related-card
      const image = (img: HTMLImageElement) => ({ src: img.getAttribute('src'), currentSrc: img.currentSrc, resolvedSrc: img.src, complete: img.complete, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight });
      const related = [...document.querySelectorAll('main [data-block-name^="related-"]')];
      return {
        finalURL: location.href, title: document.title,
        infoBarDateText: [...document.querySelectorAll('.article-meta .article-meta-date')].map(e => e.textContent),
        tagChipCount: document.querySelectorAll('.article-meta .article-meta-tag').length,
        tagChipText: [...document.querySelectorAll('.article-meta .article-meta-tag')].map(e => e.textContent),
        imageBlockCount: document.querySelectorAll('main [data-block-name="image"], main [data-block-name="article-image"]').length,
        blocks: [...document.querySelectorAll('main [data-block-name]')].map(e => ({ name: e.getAttribute('data-block-name'), images: e.querySelectorAll('img').length })),
        images: [...document.querySelectorAll<HTMLImageElement>('main img')].map(img => ({ ...image(img), block: img.closest('[data-block-name]')?.getAttribute('data-block-name') ?? null })),
        related: related.map(e => ({ block: e.getAttribute('data-block-name'), cardCount: e.querySelectorAll('[data-card-id]').length, html: e.innerHTML, images: [...e.querySelectorAll<HTMLImageElement>('img')].map(image) })),
      };
    });
    const imageStatuses = [];
    for (const src of new Set(data.images.map(img => img.currentSrc || img.resolvedSrc).filter(Boolean))) {
      if (responses.has(src)) imageStatuses.push({ src, status: responses.get(src), source: 'browser response' });
      else {
        try { const r = await request.get(src, { timeout: 15_000 }); imageStatuses.push({ src, status: r.status(), source: 'supplementary GET' }); }
        catch (error) { imageStatuses.push({ src, status: null, source: 'supplementary GET', error: String(error) }); }
      }
    }
    const stem = `${target.slice(1).replaceAll('/', '_')}_${width}x900`;
    await fs.mkdir(`${output}/baselines`, { recursive: true });
    await page.screenshot({ path: `${output}/baselines/${stem}.png`, fullPage: true });
    await fs.writeFile(`${output}/${stem}.json`, JSON.stringify({ tc, target, started, finished: new Date().toISOString(), viewport: { width, height: 900 }, httpStatus: response?.status() ?? null, lastModified: response?.headers()['last-modified'] ?? null, ...data, imageStatuses, screenshot: `${output}/baselines/${stem}.png`, verdict: null }, null, 2) + '\n');
  });
}
