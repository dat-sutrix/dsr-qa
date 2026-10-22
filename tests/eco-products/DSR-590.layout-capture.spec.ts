import { test, expect, devices, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { topDemoPath, detailDemoPath } from '../../fixtures/dsr-590';

// JOB-20261022-04: PC 1440 / SP 390 full-page captures of the C14/C15 demo pages for the Look & Feel card.
// Capture only (no layout assertions); demo data (Ngọc 21/10).
const day = new Date().toISOString().slice(0, 10).replace(/-/g, '');
const output = path.resolve('evidence/DSR-590', day);
// File suffix = live | page (.aem.live / .aem.page).
const host = (url: string) => new URL(url).hostname.split('.').pop();
const pages = { 'eco-top': topDemoPath('ja'), 'eco-detail': detailDemoPath('ja') };
test.setTimeout(90_000);

async function capture(page: Page, name: string, target: string) {
  fs.mkdirSync(output, { recursive: true });
  const response = await page.goto(target);
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.evaluate(async () => { await document.fonts.ready; });
  // Scroll through the page so lazy images load before the full-page capture.
  await page.evaluate(async () => {
    for (let y = 0; y < document.documentElement.scrollHeight; y += innerHeight / 2) {
      scrollTo(0, y);
      await new Promise(resolve => setTimeout(resolve, 150));
    }
    scrollTo(0, 0);
  });
  await page.waitForLoadState('networkidle').catch(() => undefined);
  await page.waitForTimeout(1000);
  const file = `${name}_${host(page.url())}.png`;
  await page.screenshot({ path: path.join(output, file), fullPage: true, scale: 'css', animations: 'disabled' });
  const facts = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, scrollHeight: document.documentElement.scrollHeight, innerWidth }));
  fs.writeFileSync(path.join(output, file.replace(/\.png$/, '.json')),
    JSON.stringify({ url: page.url(), httpStatus: response?.status(), capturedAt: new Date().toISOString(), ...facts }, null, 2) + '\n');
  expect(response?.status(), `${target} HTTP status`).toBe(200);
}

for (const [key, target] of Object.entries(pages)) {
  test(`DSR-590 capture [ja] ${key} PC 1440 full page`, async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await capture(page, `${key}_PC1440`, target);
  });

  test(`DSR-590 capture [ja] ${key} SP 390 full page`, async ({ browser, baseURL }) => {
    const context = await browser.newContext({ ...devices['iPhone 13'], viewport: { width: 390, height: 844 }, baseURL });
    try {
      await capture(await context.newPage(), `${key}_SP390`, target);
    } finally { await context.close(); }
  });
}
