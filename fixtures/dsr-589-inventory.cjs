// DSR-589 JOB-ZZ-IDLE-10: read-only capture of the temporary icon inventory (TD-589-06) on DEV.
// Usage: ENV=dev node fixtures/dsr-589-inventory.cjs  → results/DSR-589/DEV/temp-icon-inventory.json
const { chromium } = require('@playwright/test');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const ENV = process.env.ENV || 'dev';
require('dotenv').config({ path: path.resolve(__dirname, '..', 'envs', `${ENV}.env`) });
const base = (process.env.BASE_URL || '').replace(/\/$/, '');
const langs = ['ja', 'en'];
const detailCount = 5;

// Icon areas (A3): product list block = cards + filter panel (condition search); product detail block = performance/function area.
const scopes = ['main .product-list.block', 'main .product-detail.block'];

async function status(url) {
  const r = await fetch(url, { redirect: 'manual' });
  return r.status;
}

async function collect(page) {
  return page.evaluate(scopes => {
    const out = [];
    const sel = el => {
      const parts = [];
      for (let e = el; e && e.tagName !== 'MAIN'; e = e.parentElement) {
        const cls = typeof e.className === 'string' && e.className.trim() ? '.' + e.className.trim().split(/\s+/).join('.') : '';
        parts.unshift(e.tagName.toLowerCase() + cls);
        if (cls && parts.length >= 3) break;
      }
      return parts.join(' > ');
    };
    const label = el => el.getAttribute('aria-label') ?? el.closest('[aria-label]')?.getAttribute('aria-label') ?? null;
    const urls = v => [...(v || '').matchAll(/url\("?([^")]+)"?\)/g)].map(m => m[1]);
    for (const scope of scopes) {
      const root = document.querySelector(scope);
      if (!root) continue;
      for (const el of root.querySelectorAll('*')) {
        const r = el.getBoundingClientRect();
        const card = !!el.closest('.pl-card');
        const base = { selector: sel(el), inCard: card, ariaHidden: el.closest('[aria-hidden="true"]') ? true : false, ariaLabel: label(el) };
        if (el.tagName === 'IMG') {
          const src = el.currentSrc || el.src;
          // Product photos (Dynamic Media renditions in .pl-card-image / .pd-gallery) are not icons.
          const photo = /dynamicmedia\/deliver/.test(src) || !!el.closest('.pl-card-image, .pd-gallery');
          if (!photo) out.push({ ...base, kind: 'img', src, alt: el.getAttribute('alt'), w: Math.round(r.width), h: Math.round(r.height), visible: r.width > 0 && r.height > 0, broken: el.complete && el.naturalWidth === 0 });
        }
        if (el.tagName.toLowerCase() === 'use') {
          const href = el.getAttribute('href') || el.getAttribute('xlink:href');
          const svg = el.closest('svg').getBoundingClientRect();
          if (href) out.push({ ...base, kind: 'svg-use', src: new URL(href, location.href).href, alt: null, w: Math.round(svg.width), h: Math.round(svg.height), visible: svg.width > 0 && svg.height > 0 });
        }
        if (el.tagName.toLowerCase() === 'svg' && !el.querySelector('use')) {
          out.push({ ...base, kind: 'inline-svg', src: 'inline:' + el.outerHTML, alt: el.getAttribute('aria-label'), w: Math.round(r.width), h: Math.round(r.height), visible: r.width > 0 && r.height > 0 });
        }
        for (const pseudo of [null, '::before', '::after']) {
          const cs = getComputedStyle(el, pseudo);
          const shown = pseudo ? cs.content !== 'none' && cs.display !== 'none' : r.width > 0 && r.height > 0;
          // maskImage and webkitMaskImage report the same value in Chromium → one entry per element/pseudo/url.
          const seen = new Set();
          for (const prop of ['backgroundImage', 'maskImage', 'webkitMaskImage']) {
            for (const u of urls(cs[prop])) {
              if (seen.has(u)) continue;
              seen.add(u);
              out.push({ ...base, selector: base.selector + (pseudo || ''), kind: `css-${prop === 'backgroundImage' ? 'background' : 'mask'}`, src: u, alt: null, w: Math.round(pseudo ? parseFloat(cs.width) || 0 : r.width), h: Math.round(pseudo ? parseFloat(cs.height) || 0 : r.height), visible: shown && cs.visibility !== 'hidden' });
            }
          }
        }
      }
    }
    return out;
  }, scopes);
}

(async () => {
  const started = new Date().toISOString();
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const pages = [];
  const occurrences = [];
  for (const lang of langs) {
    // A3: /master/{lang}/product-list, fallback /{lang}/product-list.
    const listCandidates = [`/master/${lang}/product-list`, `/${lang}/product-list`];
    let listPath = null;
    for (const p of listCandidates) {
      const res = await page.goto(base + p);
      pages.push({ lang, type: 'product-list', path: p, status: res?.status() ?? null, finalUrl: page.url() });
      if (res?.status() === 200) { listPath = p; break; }
    }
    if (!listPath) continue;
    await page.waitForLoadState('networkidle').catch(() => undefined);
    await page.locator('.pl-card').first().waitFor({ timeout: 15_000 }).catch(() => undefined);
    const listIcons = await collect(page);
    occurrences.push(...listIcons.map(i => ({ ...i, lang, page: listPath })));
    const ids = [...new Set(await page.$$eval('.pl-card .pl-fav-btn', bs => bs.map(b => b.dataset.id)))];
    const hrefs = await page.$$eval('main a[href*="/products/"]', as => as.map(a => a.getAttribute('href')));
    pages[pages.length - 1].cards = await page.locator('.pl-card').count();
    pages[pages.length - 1].productLinks = hrefs.length;
    pages[pages.length - 1].cardIds = ids;
    // Cards carry no <a href> (DEV 2026-10-19); detail ids are taken from the card data-id (in list order).
    // Preflight every id; keep the first 5 that answer 200.
    let kept = 0;
    for (const id of ids) {
      if (kept >= detailCount) break;
      const p = `/${lang}/products/${id}`;
      const s = await status(base + p);
      const entry = { lang, type: 'product-detail', path: p, status: s };
      pages.push(entry);
      if (s !== 200) continue;
      kept++;
      await page.goto(base + p);
      await page.waitForLoadState('networkidle').catch(() => undefined);
      entry.finalUrl = page.url();
      occurrences.push(...(await collect(page)).map(i => ({ ...i, lang, page: p })));
    }
  }
  await browser.close();

  // Fetch each distinct file once: HTTP status + sha1.
  const files = new Map();
  for (const o of occurrences) {
    if (files.has(o.src)) continue;
    if (o.src.startsWith('inline:')) {
      files.set(o.src, { status: null, sha1: crypto.createHash('sha1').update(o.src.slice(7)).digest('hex'), bytes: o.src.length - 7 });
      continue;
    }
    const url = o.src.replace(/#.*$/, '');
    try {
      const r = await fetch(url);
      const buf = Buffer.from(await r.arrayBuffer());
      files.set(o.src, { status: r.status, sha1: r.ok ? crypto.createHash('sha1').update(buf).digest('hex') : null, bytes: buf.length, contentType: r.headers.get('content-type') });
    } catch (e) {
      files.set(o.src, { status: null, sha1: null, error: String(e.message || e) });
    }
  }
  const icons = new Map();
  for (const o of occurrences) {
    const f = files.get(o.src);
    const key = f.sha1 || `unresolved:${o.src}`;
    if (!icons.has(key)) icons.set(key, { sha1: f.sha1, fileName: o.src.startsWith('inline:') ? null : decodeURIComponent(new URL(o.src).pathname.split('/').pop()), urls: [], httpStatus: f.status, bytes: f.bytes, contentType: f.contentType ?? null, pages: [], usages: [] });
    const icon = icons.get(key);
    const src = o.src.startsWith('inline:') ? 'inline-svg' : o.src;
    if (!icon.urls.includes(src)) icon.urls.push(src);
    if (!icon.pages.includes(`${o.page}`)) icon.pages.push(o.page);
    const usage = { page: o.page, lang: o.lang, kind: o.kind, selector: o.selector, inCard: o.inCard, alt: o.alt, ariaLabel: o.ariaLabel, ariaHidden: o.ariaHidden, rendered: `${o.w}x${o.h}`, visible: o.visible, broken: o.broken ?? (o.src.startsWith('inline:') ? false : f.status !== 200) };
    const same = icon.usages.find(u => u.page === usage.page && u.selector === usage.selector && u.alt === usage.alt && u.ariaLabel === usage.ariaLabel && u.rendered === usage.rendered && u.visible === usage.visible);
    if (same) same.count++; else icon.usages.push({ ...usage, count: 1 });
  }
  const out = {
    td: 'TD-589-06', us: 'DSR-589', job: 'JOB-ZZ-IDLE-10', env: ENV.toUpperCase(), base, capturedStart: started, capturedEnd: new Date().toISOString(),
    viewport: '1440x900 Chromium', scopes,
    note: 'Temporary icon inventory captured before replacement (A2). Unique by sha1 of the fetched file. Product photos (Dynamic Media renditions) excluded.',
    pages, iconCount: icons.size, occurrenceCount: occurrences.length, icons: [...icons.values()],
  };
  const file = path.resolve(__dirname, '..', 'results', 'DSR-589', ENV.toUpperCase(), 'temp-icon-inventory.json');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, JSON.stringify(out, null, 2) + '\n');
  console.log(`${file}: ${icons.size} unique icons, ${occurrences.length} occurrences`);
})();
