import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const output = path.resolve('ykk-dsr/hub/results/JOB-20261016-13');
for (const [tc, width, height] of [['014', 1440, 900], ['015', 375, 812]] as const) {
  test(`DSR-CATDL-${tc} [ja] capture catalog download form at ${width}px`, async ({ page }, info) => {
    await page.setViewportSize({ width, height });
    const response = await page.goto('/master/ja/test-space/dsr-570-catalog-detail');
    await expect(page.getByRole('heading', { level: 1 })).toBeVisible();
    const button = page.getByRole('button', { name: 'ダウンロードする', exact: true });
    await expect(button).toBeVisible();
    await page.evaluate(async () => { await document.fonts.ready; await Promise.all(Array.from(document.images).map(i => i.decode().catch(() => {}))); });
    await button.scrollIntoViewIfNeeded();
    const buttonInViewport = await button.evaluate(e => { const r = e.getBoundingClientRect(); return r.left >= 0 && r.right <= innerWidth && r.top >= 0 && r.bottom <= innerHeight; });
    await page.evaluate(() => scrollTo(0, 0));
    // TODO: data-testid catalog-detail (semantic block classes used only for geometry measurement).
    const measurements = await page.evaluate(() => {
      const rect = (e: Element) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y + scrollY, width: r.width, height: r.height, right: r.right, bottom: r.bottom + scrollY }; };
      const one = (s: string) => { const e = document.querySelector(s); return e ? rect(e) : null; };
      const form = document.querySelector('form')!;
      const style = getComputedStyle(form);
      const contentWidth = form.getBoundingClientRect().width - parseFloat(style.paddingLeft) - parseFloat(style.paddingRight);
      return {
        scrollWidth: document.documentElement.scrollWidth, contentWidth,
        title: document.querySelector('h1')?.textContent,
        regions: Object.fromEntries(['h1', '.catalog-detail-summary', '.catalog-detail-cover', '.catalog-detail-info', '.catalog-detail-fields', '.catalog-detail-consent', '.catalog-detail-submit'].map(s => [s, one(s)])),
        fields: Array.from(form.querySelectorAll('input:not([type=checkbox]), select, textarea')).map(e => ({ name: e.getAttribute('name'), ...rect(e), contentRatio: e.getBoundingClientRect().width / contentWidth, label: (e as HTMLInputElement).labels?.[0]?.textContent, labelRect: (e as HTMLInputElement).labels?.[0] ? rect((e as HTMLInputElement).labels![0]) : null })),
        buttonRadius: getComputedStyle(document.querySelector('.catalog-detail-submit')!).borderRadius,
      };
    });
    fs.mkdirSync(path.join(output, 'evidence'), { recursive: true });
    await page.screenshot({ path: path.join(output, `evidence/DSR-CATDL-${tc}_DEV_01.png`), fullPage: true });
    fs.writeFileSync(path.join(output, `DSR-CATDL-${tc}-measurements.json`), JSON.stringify({ url: page.url(), httpStatus: response?.status(), viewport: { width, height }, browser: page.context().browser()?.version(), buttonFullyVisibleAfterScroll: buttonInViewport, ...measurements }, null, 2) + '\n');
    await info.attach('measurements', { body: JSON.stringify(measurements), contentType: 'application/json' });
    expect(response?.status()).toBe(200);
    if (tc === '015') expect(measurements.scrollWidth).toBeLessThanOrEqual(375);
  });
}
