// JOB-ZZ-IDLE-32 read-only browser diagnosis: catalog overlay pages + demo page.
// No clicks, no form input. One fresh context per URL (empty localStorage).
const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const HOST = (t) => `https://main--dsr-eds-dev--sutrix-projects.aem.${t}`;
const EVID = 'evidence/DSR-654/DEV/diag-20261022';
const targets = [];
for (const tier of ['live', 'page']) {
  for (const lang of ['ja', 'en']) for (const id of ['qa190-cat-pdf', 'qa190-cat-pdf-form', 'qa190-cat-ebook-form']) targets.push({ tier, lang, id, path: `/${lang}/library/catalog/${id}` });
  targets.push({ tier, lang: 'ja', id: 'demo-dsr-570', path: '/master/ja/test-space/dsr-570-catalog-detail' });
}
(async () => {
  const out = { started: new Date().toISOString(), runs: [] };
  const browser = await chromium.launch();
  out.browser = browser.version();
  let n = 0;
  for (const t of targets) {
    const url = HOST(t.tier) + t.path;
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, acceptDownloads: false });
    const page = await ctx.newPage();
    const row = { ...t, url, console: [], pageErrors: [], failed: [], damRequests: [], mainFrameNavigations: [], downloads: [] };
    page.on('console', (m) => { if (['error', 'warning'].includes(m.type())) row.console.push(`${m.type()}: ${m.text()}`.slice(0, 300)); });
    page.on('pageerror', (e) => row.pageErrors.push(String(e).slice(0, 300)));
    page.on('requestfailed', (r) => row.failed.push({ url: r.url(), error: r.failure()?.errorText, nav: r.isNavigationRequest() }));
    page.on('request', (r) => { if (/\/content\/dam\/|\.pdf|graphql|ykkfastening/.test(r.url())) row.damRequests.push({ url: r.url(), type: r.resourceType(), nav: r.isNavigationRequest() }); });
    page.on('framenavigated', (f) => { if (f === page.mainFrame()) row.mainFrameNavigations.push(f.url()); });
    page.on('download', (d) => row.downloads.push(d.url()));
    try {
      const resp = await page.goto(url, { waitUntil: 'domcontentloaded', timeout: 60000 });
      row.httpStatus = resp?.status();
      await page.waitForTimeout(6000);
      row.finalUrl = page.url();
      row.dom = await page.evaluate(() => {
        const b = document.querySelector('main .catalog-detail');
        if (!b) return { block: false };
        const r = b.getBoundingClientRect();
        return {
          block: true, status: b.dataset.blockStatus, height: r.height, childCount: b.children.length,
          h1: [...b.querySelectorAll('h1')].map((e) => e.textContent.trim()),
          h2: [...b.querySelectorAll('h2')].map((e) => e.textContent.trim()),
          form: !!b.querySelector('form'), img: [...b.querySelectorAll('img')].map((e) => e.getAttribute('src')).slice(0, 3),
          date: b.querySelector('.catalog-detail-date')?.textContent || null,
          categories: [...b.querySelectorAll('.catalog-detail-categories li')].map((e) => e.textContent),
          description: b.querySelector('.catalog-detail-description')?.textContent?.slice(0, 120) || null,
          robots: document.querySelector('meta[name=robots]')?.content || null,
        };
      }).catch((e) => ({ error: String(e).slice(0, 200) }));
      row.evidence = `${EVID}/IDLE32_${t.tier}_${t.lang}_${t.id}_${String(++n).padStart(2, '0')}.png`;
      await page.screenshot({ path: row.evidence }).catch((e) => { row.evidence = `screenshot failed: ${e.message.slice(0, 100)}`; });
    } catch (e) { row.error = e.message.slice(0, 300); row.finalUrl = page.url(); }
    out.runs.push(row);
    console.log(JSON.stringify({ url, status: row.httpStatus, final: row.finalUrl, h: row.dom?.height, h2: row.dom?.h2, form: row.dom?.form, failed: row.failed.length }));
    await ctx.close();
  }
  await browser.close();
  out.finished = new Date().toISOString();
  fs.writeFileSync(path.join(__dirname, 'browser-diag.json'), JSON.stringify(out, null, 2) + '\n');
})();
