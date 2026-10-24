const fs = require('node:fs');
const path = require('node:path');
const { chromium } = require('@playwright/test');
const dir = __dirname;
const statePath = path.join(dir, 'captures.json');
const deadline = Date.parse('2026-10-26T02:00:00Z');
const url = 'https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/article/stories/qa529-02';
(async () => {
  const rows = fs.existsSync(statePath) ? JSON.parse(fs.readFileSync(statePath)) : [];
  const now = Date.now();
  if (now > deadline || (rows.length && now - Date.parse(rows.at(-1).at) < 7200000)) return;
  const row = { at: new Date(now).toISOString(), url, viewport: { width: 1440, height: 900 }, profileAssets: [] };
  let browser;
  try {
    browser = await chromium.launch({ headless: true });
    const page = await browser.newPage({ viewport: row.viewport });
    page.on('response', response => {
      if (/\/blocks\/profile[^/]*\/[^/?]+/.test(new URL(response.url()).pathname)) {
        row.profileAssets.push({ url: response.url(), status: response.status(), lastModified: response.headers()['last-modified'] ?? null });
      }
    });
    const response = await page.goto(url, { waitUntil: 'networkidle', timeout: 60000 });
    row.status = response.status(); row.finalUrl = page.url();
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(2000);
    const name = `capture-${row.at.replace(/[:.]/g, '-')}.png`;
    // Requested observational captures, not failure evidence or fix assertions.
    fs.mkdirSync(path.join(dir, 'captures'), { recursive: true });
    await page.screenshot({ path: path.join(dir, 'captures', name), fullPage: false });
    row.screenshot = `captures/${name}`;
    for (const asset of ['profile.js', 'profile.css']) {
      const assetUrl = new URL('/blocks/profile/' + asset, url).href;
      if (!row.profileAssets.some(entry => entry.url === assetUrl)) {
        const response = await page.request.get(assetUrl);
        row.profileAssets.push({ url: assetUrl, status: response.status(), lastModified: response.headers()['last-modified'] ?? null, source: 'direct GET' });
      }
    }
    row.result = row.status === 200 ? 'captured' : 'blocked';
  } catch (error) { row.result = 'blocked'; row.error = error.message; }
  finally { if (browser) await browser.close(); }
  rows.push(row);
  fs.writeFileSync(statePath, JSON.stringify(rows, null, 2) + '\n');
  console.log(JSON.stringify(row));
})();
