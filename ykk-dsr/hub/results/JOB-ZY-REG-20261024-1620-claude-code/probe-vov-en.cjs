// REG-VOV-EN probe (observation, not a spec) for JOB-ZY-REG-20261024-1620-claude-code step 3 (light probe; copied from REG-1220). Read-only GETs on .live.
// Loads /en/library/video/search 10x (~30 s apart) + /ja/library/video/search 3x (control, interleaved), records per load
// document status/title/card count/"Unable to load" + every request whose URL contains graphql|dsr-video-list.
// HAR is recorded for every load in /tmp; kept (with screenshot + console log) only for failing loads.
// Usage: node probe-vov-en.cjs (cwd = repo root)
const fs = require('node:fs');
const { chromium } = require('@playwright/test');
const D = 'ykk-dsr/hub/results/JOB-ZY-REG-20261024-1620-claude-code';
const base = require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL;
const TMP = '/tmp/reg1620cc/probe';
fs.mkdirSync(TMP, { recursive: true }); fs.mkdirSync(`${D}/evidence`, { recursive: true });
const plan = [];
for (let i = 1; i <= 10; i++) { plan.push(['en', i]); if (i % 3 === 0) plan.push(['ja', i / 3]); }
const sleep = ms => new Promise(r => setTimeout(r, ms));
(async () => {
  const browser = await chromium.launch();
  const out = { job: 'JOB-ZY-REG-20261024-1620-claude-code', base, started: new Date().toISOString(), loads: [] };
  for (const [lang, n] of plan) {
    const t0 = Date.now();
    const id = `${lang}-${String(n).padStart(2, '0')}`;
    const har = `${TMP}/${id}.har`;
    const ctx = await browser.newContext({ recordHar: { path: har, content: 'embed' }, viewport: { width: 1440, height: 900 } });
    const page = await ctx.newPage();
    const reqs = [], consoleLog = [];
    const watch = u => /graphql|dsr-video-list/i.test(u);
    const started = new Map();
    page.on('console', m => consoleLog.push(`[${new Date().toISOString()}] ${m.type()}: ${m.text()}`));
    page.on('pageerror', e => consoleLog.push(`[${new Date().toISOString()}] pageerror: ${e.message}`));
    page.on('request', r => { if (watch(r.url())) started.set(r, Date.now()); });
    page.on('requestfinished', async r => {
      if (!watch(r.url())) return;
      const resp = await r.response(); let body = '';
      try { body = (await resp.text()).slice(0, 500); } catch (e) { body = `(body unavailable: ${e.message})`; }
      const h = resp.headers();
      reqs.push({ url: r.url(), method: r.method(), resourceType: r.resourceType(), status: resp.status(),
        x_cache: h['x-cache'] ?? null, age: h['age'] ?? null, cdn_cache_control: h['cdn-cache-control'] ?? null,
        cache_control: h['cache-control'] ?? null, content_type: h['content-type'] ?? null,
        duration_ms: Date.now() - (started.get(r) ?? t0), body500: body });
    });
    page.on('requestfailed', r => { if (watch(r.url())) reqs.push({ url: r.url(), method: r.method(), resourceType: r.resourceType(),
      failed: true, errorText: r.failure()?.errorText ?? null, duration_ms: Date.now() - (started.get(r) ?? t0) }); });
    const rec = { id, lang, utc: new Date().toISOString() };
    try {
      const resp = await page.goto(`${base}/${lang}/library/video/search`, { waitUntil: 'load', timeout: 45000 });
      rec.document_status = resp?.status() ?? null;
      rec.document_x_cache = resp?.headers()['x-cache'] ?? null;
      await page.waitForLoadState('networkidle', { timeout: 20000 }).catch(() => { rec.networkidle_timeout = true; });
      const cards = page.locator('main .listing a[href*="/library/video/"]');
      const unable = page.getByText('Unable to load video information', { exact: false });
      await Promise.race([cards.first().waitFor({ timeout: 15000 }), unable.first().waitFor({ timeout: 15000 })]).catch(() => {});
      await sleep(1000);
      rec.title = await page.title();
      rec.card_count = await cards.count();
      rec.unable_to_load = (await unable.count()) > 0;
    } catch (e) { rec.navigation_error = e.message.slice(0, 300); }
    rec.duration_ms = Date.now() - t0;
    rec.requests = reqs;
    rec.failed = !!(rec.unable_to_load || rec.navigation_error || rec.document_status !== 200 || !rec.card_count || rec.title === 'YKK DIGITAL SHOWROOM');
    if (rec.failed) {
      await page.screenshot({ path: `${D}/evidence/probe-vov-${id}.png` }).catch(() => {});
      rec.evidence = { screenshot: `evidence/probe-vov-${id}.png`, har: `evidence/probe-vov-${id}.har`, console: `evidence/probe-vov-${id}.console.log` };
    }
    await ctx.close();
    if (rec.failed) { fs.copyFileSync(har, `${D}/evidence/probe-vov-${id}.har`); fs.writeFileSync(`${D}/evidence/probe-vov-${id}.console.log`, consoleLog.join('\n') + '\n'); }
    rec.console_errors = consoleLog.filter(l => /error/i.test(l)).slice(0, 10);
    out.loads.push(rec);
    console.log(rec.utc, id, rec.document_status, JSON.stringify(rec.title), 'cards', rec.card_count, 'unable', rec.unable_to_load,
      'reqs', reqs.map(r => `${r.status ?? r.errorText} ${r.url.split('?')[0].split('/').slice(-2).join('/')}`).join(' , '), rec.failed ? 'FAILED' : '');
    fs.writeFileSync(`${D}/probe-vov-en.json`, JSON.stringify(out, null, 1));
    const wait = 30000 - (Date.now() - t0);
    if (wait > 0) await sleep(wait);
  }
  out.finished = new Date().toISOString();
  const en = out.loads.filter(l => l.lang === 'en'), ja = out.loads.filter(l => l.lang === 'ja');
  out.summary = { en_loads: en.length, en_failed: en.filter(l => l.failed).length, ja_loads: ja.length, ja_failed: ja.filter(l => l.failed).length };
  fs.writeFileSync(`${D}/probe-vov-en.json`, JSON.stringify(out, null, 1));
  console.log(JSON.stringify(out.summary));
  await browser.close();
})();
