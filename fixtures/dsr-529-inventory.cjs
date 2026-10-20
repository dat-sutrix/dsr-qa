// DSR-529 JOB-20261019-02 extras: read-only capture, no verdict (Claude classifies).
// (1) HTTP status of /master/{ja,en}/library/article/stories/qa529-01 and /master/{ja,en}/qa529-01
// (2) every <img>/<picture> in <main> on qa529-01 ja+en (count + src), plus the related-product area of qa529-02 (DSR-ARTICLE-023 context).
// Usage: ENV=dev node fixtures/dsr-529-inventory.cjs <out.json>
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');
const ENV = process.env.ENV || 'dev';
require('dotenv').config({ path: path.resolve(__dirname, '..', 'envs', `${ENV}.env`) });
const base = (process.env.BASE_URL || '').replace(/\/$/, '');
const out = process.argv[2] || `results/DSR-529/${ENV.toUpperCase()}/qa529-01-inventory.json`;
const langs = ['ja', 'en'];
const stories = lang => `/master/${lang}/library/article/stories/qa529-01`;

async function status(p) {
  const r = await fetch(base + p, { redirect: 'manual' });
  return { path: p, status: r.status, location: r.headers.get('location') };
}

async function images(page) {
  return page.evaluate(() => {
    const blockOf = el => el.closest('[data-block-name]')?.getAttribute('data-block-name') ?? el.closest('main > div')?.className ?? null;
    const imgs = [...document.querySelectorAll('main img')].map((img, i) => {
      const r = img.getBoundingClientRect();
      return {
        index: i, block: blockOf(img), inPicture: !!img.closest('picture'), src: img.getAttribute('src'), currentSrc: img.currentSrc,
        alt: img.getAttribute('alt'), natural: `${img.naturalWidth}x${img.naturalHeight}`, rendered: `${Math.round(r.width)}x${Math.round(r.height)}`, complete: img.complete,
      };
    });
    const pictures = [...document.querySelectorAll('main picture')].map((p, i) => ({
      index: i, block: blockOf(p), sources: [...p.querySelectorAll('source')].map(s => s.getAttribute('srcset')), img: p.querySelector('img')?.getAttribute('src') ?? null,
    }));
    return { imgCount: imgs.length, pictureCount: pictures.length, imgs, pictures };
  });
}

(async () => {
  const startedAt = new Date().toISOString();
  const statuses = [];
  for (const lang of langs) for (const p of [stories(lang), `/master/${lang}/qa529-01`]) statuses.push(await status(p));
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  const inventory = [];
  for (const lang of langs) {
    const res = await page.goto(base + stories(lang));
    await page.waitForLoadState('networkidle').catch(() => undefined);
    // Scroll through so lazy images resolve.
    await page.evaluate(async () => { for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); } });
    await page.waitForLoadState('networkidle').catch(() => undefined);
    inventory.push({ lang, path: stories(lang), finalUrl: page.url(), status: res?.status(), ...(await images(page)) });
  }
  await page.goto(base + '/master/ja/library/article/stories/qa529-02');
  await page.waitForLoadState('networkidle').catch(() => undefined);
  const relatedProduct = await page.evaluate(() => [...document.querySelectorAll('main [data-block-name="related-product"]')].map(b => {
    const r = b.getBoundingClientRect();
    return { className: b.className, height: Math.round(r.height), headings: [...b.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => h.textContent.trim()), links: b.querySelectorAll('a').length, imgs: b.querySelectorAll('img').length, text: b.innerText.trim().slice(0, 300) };
  }));
  await browser.close();
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, JSON.stringify({ env: ENV, base, startedAt, finishedAt: new Date().toISOString(), statuses, inventory, qa52902RelatedProduct: relatedProduct }, null, 2) + '\n');
  console.log(`wrote ${out}`);
})();
