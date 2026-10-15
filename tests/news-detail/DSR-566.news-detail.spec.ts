import { test, expect } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

const output = path.resolve('ykk-dsr/hub/results/JOB-20261015-10');
for (const variant of [
  { tc: 'DSR-NEWS-014', device: 'PC', width: 1440, height: 900 },
  { tc: 'DSR-NEWS-015', device: 'SP', width: 375, height: 812 },
]) {
  test(`${variant.tc} [en] ${variant.device} news detail capture and layout facts`, async ({ page }) => {
    await page.setViewportSize({ width: variant.width, height: variant.height });
    const response = await page.goto('/master/en/test-space/dsr-357-news-detail');
    // TODO: data-testid news-detail-title
    const title = page.getByRole('heading', { level: 2 }).filter({ hasText: 'YKK EXPERIENCE' });
    await expect(title).toBeVisible();
    await page.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all(Array.from(document.images).map(img => img.decode().catch(() => undefined)));
    });
    const facts = await title.evaluate(el => {
      const box = (node: Element) => {
        const r = node.getBoundingClientRect();
        return { width: r.width, left: r.left, right: r.right, leftMargin: r.left, rightMargin: innerWidth - r.right };
      };
      const style = getComputedStyle(el);
      const range = document.createRange();
      range.selectNodeContents(el);
      const lines = [...new Set(Array.from(range.getClientRects()).map(r => r.top))];
      const overflow = Array.from(document.querySelectorAll('body *')).flatMap(node => {
        const r = node.getBoundingClientRect();
        const s = getComputedStyle(node);
        if (!r.width || !r.height || s.visibility === 'hidden' || s.display === 'none') return [];
        return r.left < -0.5 || r.right > innerWidth + 0.5
          ? [{ tag: node.tagName, id: node.id, class: node.className, left: r.left, right: r.right }] : [];
      });
      return {
        viewport: { width: innerWidth, height: innerHeight }, scrollWidth: document.documentElement.scrollWidth,
        main: box(document.querySelector('main')!),
        articleSection: box(el.closest('.section')!), articleContent: box(el.parentElement!),
        title: { text: el.textContent, ...box(el), lineCount: lines.length, whiteSpace: style.whiteSpace,
          textOverflow: style.textOverflow, overflow: style.overflow, webkitLineClamp: style.webkitLineClamp },
        overflowElements: overflow,
        meta: Array.from(document.querySelectorAll('meta[name], meta[property]')).map(m => ({ name: m.getAttribute('name') || m.getAttribute('property'), content: m.getAttribute('content') })),
      };
    });
    await fs.mkdir(path.join(output, 'evidence'), { recursive: true });
    await page.screenshot({ path: path.join(output, `evidence/${variant.tc}_DEV_01.png`), fullPage: true });
    await fs.writeFile(path.join(output, `${variant.tc}-facts.json`), JSON.stringify({ url: page.url(), httpStatus: response?.status(), ...facts }, null, 2) + '\n');
    expect(response?.status()).toBe(200);
    if (variant.device === 'SP') expect(facts.scrollWidth).toBeLessThanOrEqual(375);
    // PC is capture-only. Title wrapping and overflow facts are retained for human review.
  });
}
