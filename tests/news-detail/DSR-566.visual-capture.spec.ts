import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { NewsDetailPage } from '../../pages/NewsDetailPage';

const output = 'ykk-dsr/hub/results/JOB-20261016-11';
const target = '/master/ja/test-space/qa566-news-01';
test.describe.configure({ mode: 'serial' });
let missing = false;
for (const [tc, width, height] of [['DSR-NEWS-014', 1440, 900], ['DSR-NEWS-015', 390, 844]] as const) {
  test(`${tc} [ja] capture news layout at ${width}x${height}`, async ({ page }) => {
    test.skip(missing, 'blocked-data: target returned HTTP 404; stopped per job');
    await page.setViewportSize({ width, height });
    const news = new NewsDetailPage(page);
    const response = await page.goto(target);
    missing = response?.status() === 404;
    fs.mkdirSync(path.join(output, 'evidence'), { recursive: true });
    const basic = { url: page.url(), status: response?.status(), viewport: { width, height } };
    fs.writeFileSync(path.join(output, `${tc}-facts.json`), JSON.stringify(basic, null, 2));
    test.skip(missing, 'blocked-data: target returned HTTP 404; stopped per job');
    expect(response?.status()).toBe(200);
    await news.title.first().waitFor();
    await page.evaluate(async () => {
      await document.fonts.ready;
      for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 100)); }
      await Promise.all([...document.images].map(i => i.decode().catch(() => {})));
      window.scrollTo(0, 0);
    });
    const layout = await page.evaluate(() => {
      const bounds = (e: Element) => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return { tag: e.tagName, class: e.className, text: (e as HTMLElement).innerText, x: r.x, y: r.y, width: r.width, height: r.height, leftMargin: r.left, rightMargin: innerWidth - r.right, textOverflow: s.textOverflow, whiteSpace: s.whiteSpace, lineClamp: s.webkitLineClamp }; };
      return { scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth,
        main: [...document.querySelectorAll('main')].map(bounds),
        blocks: [...document.querySelectorAll('main .block')].map(bounds),
        images: [...document.querySelectorAll('main img')].map(e => ({ ...bounds(e), src: (e as HTMLImageElement).currentSrc, naturalWidth: (e as HTMLImageElement).naturalWidth, naturalHeight: (e as HTMLImageElement).naturalHeight })),
        overflow: [...document.querySelectorAll('body *')].filter(e => { const r = e.getBoundingClientRect(); const s = getComputedStyle(e); return r.width > 0 && r.height > 0 && s.visibility !== 'hidden' && s.display !== 'none' && (r.left < -0.5 || r.right > innerWidth + 0.5); }).map(bounds) };
    });
    const title = await news.title.first().evaluate(e => { const r = document.createRange(); r.selectNodeContents(e); const s = getComputedStyle(e); return { text: e.textContent, lines: [...new Set([...r.getClientRects()].map(r => r.y))].length, textOverflow: s.textOverflow, whiteSpace: s.whiteSpace, lineClamp: s.webkitLineClamp, clientWidth: e.clientWidth, scrollWidth: e.scrollWidth }; });
    const date = (await news.date.allTextContents()).map(t => t.trim());
    const facts = { ...basic, layout, title, date, dateFormatPass: date.length > 0 && date.every(d => /^\d{4}\.\d{2}\.\d{2}$/.test(d)), meta: await news.head() };
    fs.writeFileSync(path.join(output, `${tc}-facts.json`), JSON.stringify(facts, null, 2));
    await page.screenshot({ path: path.join(output, 'evidence', `${tc}_DEV_01.png`), fullPage: true });
    if (tc === 'DSR-NEWS-015') {
      expect(layout.scrollWidth, 'SP scrollWidth <= 390').toBeLessThanOrEqual(390);
      expect(title.textOverflow, 'title has no ellipsis').not.toBe('ellipsis');
      expect(title.lines, 'title wraps').toBeGreaterThan(1);
    }
  });
}
