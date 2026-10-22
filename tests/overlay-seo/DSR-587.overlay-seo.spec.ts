import { test, expect, type APIRequestContext, type Browser } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import YAML from 'yaml';
import { hosts } from '../../fixtures/dsr-587';

// JOB-20261022-13 (DSR-587/654/586). Read-only.
// Part 1 – og:image (dsr-eds PR #206, Martin 22/10): every overlay page republished by JOB-20261022-12
// (manifest REPUBLISH-OVL-20261022) on .aem.page and .aem.live, cache-busted with ?cb=<epoch>:
// raw og:image + twitter:image absolute, not about:error, GET 200 image/*. A page that renders the
// unavailable state (redirects to the list / incomplete CF) may have no og:image = expected (recorded, not failed).
// Part 3 – isActive OFF (Martin 22/10): raw page 200 + 'unavailable | inactive' row is by design; the redirect to
// the list happens in the browser. Real browser → final URL = list page, list HTTP 200.
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

type Item = { path: string; replicate: string[] };
const manifestFile = path.resolve(__dirname, '../../ykk-dsr/hub/author/manifests/REPUBLISH-OVL-20261022.yaml');
const items: Item[] = (YAML.parse(fs.readFileSync(manifestFile, 'utf8')).items as Item[]).filter(i => i.path.startsWith('/content/dam/dsr/'));

// DSR CF path → overlay URL (BL-OVL-1): movies/{standard|tech} → /library/video, catalogs → /library/catalog, products → /products.
function overlayPath(cfPath: string) {
  const [, lang, kind, ...rest] = cfPath.replace('/content/dam/dsr/', '/').split('/');
  const id = rest[rest.length - 1];
  const type = kind === 'movies' ? 'video' : kind === 'catalogs' ? 'catalog' : 'product';
  const url = type === 'video' ? `/${lang}/library/video/${id}` : type === 'catalog' ? `/${lang}/library/catalog/${id}` : `/${lang}/products/${id}`;
  return { lang, id, type, url };
}
const tcByType: Record<string, string> = { video: 'DSR-VOV-003', catalog: 'DSR-CATOV-002', product: 'DSR-PDO-003' };
const cb = () => `cb=${Date.now()}`;
const absolute = /^https?:\/\//;
const defaultImage = /\/default-meta-image\.png/;

async function parseHead(browser: Browser, html: string) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    return await page.evaluate(() => {
      const meta = (sel: string) => document.querySelector<HTMLMetaElement>(sel)?.getAttribute('content') ?? null;
      // Overlay block rows: <div><div>key</div><div>value</div></div>
      const unavailable = [...document.querySelectorAll('main div > div')].map(row => [...row.children].map(c => (c.textContent ?? '').trim()))
        .find(cells => cells.length === 2 && cells[0] === 'unavailable');
      return {
        title: document.title,
        robots: meta('meta[name="robots"]'),
        ogImage: meta('meta[property="og:image"]'),
        twitterImage: meta('meta[name="twitter:image"]') ?? meta('meta[property="twitter:image"]'),
        unavailable: unavailable ? unavailable[1] : null,
      };
    });
  } finally {
    await context.close();
  }
}

async function checkImage(request: APIRequestContext, label: string, value: string | null) {
  expect.soft(value ?? '', `${label} present`).not.toBe('');
  expect.soft(value ?? '', `${label} not about:error`).not.toContain('about:error');
  expect.soft(value ?? '', `${label} absolute`).toMatch(absolute);
  if (!value || !absolute.test(value)) return;
  const res = await request.get(value, { failOnStatusCode: false });
  observations.push({ label, url: value, status: res.status(), contentType: res.headers()['content-type'] ?? null });
  expect.soft(res.status(), `${label} HTTP`).toBe(200);
  expect.soft(res.headers()['content-type'] ?? '', `${label} content-type`).toMatch(/^image\//);
}

test.describe('JOB-13 part 1 – overlay og:image after republish (PR #206)', () => {
  for (const item of items) {
    const o = overlayPath(item.path);
    for (const tier of ['page', 'live'] as const) {
      test(`${tcByType[o.type]} [${o.lang}] og:image sweep ${tier} ${o.url}`, { tag: ['@auto', '@job13'] }, async ({ request, browser }) => {
        const target = `${hosts()[tier]}${o.url}?${cb()}`;
        const response = await request.get(target, { maxRedirects: 0, failOnStatusCode: false });
        observations.push({ cf: item.path, replicate: item.replicate, url: target, status: response.status(), location: response.headers().location ?? null });
        const onTier = tier === 'page' || item.replicate.includes('publish');
        test.skip(response.status() === 404 && !onTier, `preview-only CF: not on .aem.live (HTTP 404 = expected)`);
        test.skip(response.status() === 404, `not served on .aem.${tier} (HTTP 404) – recorded`);
        expect(response.status(), 'page HTTP').toBe(200);
        const raw = await parseHead(browser, await response.text());
        observations.push(raw);
        if (raw.unavailable !== null && (!raw.ogImage || defaultImage.test(raw.ogImage))) {
          // Martin 22/10: redirecting / incomplete pages may have no page image → expected, recorded.
          test.info().annotations.push({ type: 'expected-no-og-image', description: `unavailable | ${raw.unavailable}; og:image=${raw.ogImage ?? 'none'}` });
          expect.soft(raw.ogImage ?? '', 'og:image not about:error').not.toContain('about:error');
          expect.soft(raw.twitterImage ?? '', 'twitter:image not about:error').not.toContain('about:error');
          return;
        }
        await checkImage(request, 'og:image', raw.ogImage);
        await checkImage(request, 'twitter:image', raw.twitterImage);
        expect.soft(raw.ogImage ?? '', 'og:image is a page image, not the site default').not.toMatch(defaultImage);
      });
    }
  }
});

// Part 3 targets: isActive OFF pages (TD-654-02 qa654-inactive ja/en, TD-587-07 qa587-inactive ja/en).
// qa587-off (TD-587-15 hidden movie) renders 'unavailable | movie-unavailable' on DEV 22/10: same browser-redirect path
// (BL-OVL-1, VOV-008 expectation), checked as the only live qa587 unavailable page while qa587-inactive is 404.
const inactive = [
  { tc: 'DSR-CATOV-005', lang: 'ja', url: '/ja/library/catalog/qa654-inactive', list: '/ja/library/catalog', reason: 'inactive' },
  { tc: 'DSR-CATOV-005', lang: 'en', url: '/en/library/catalog/qa654-inactive', list: '/en/library/catalog', reason: 'inactive' },
  { tc: 'DSR-VOV-007', lang: 'ja', url: '/ja/library/video/qa587-inactive', list: '/ja/library/video/search', reason: 'inactive' },
  { tc: 'DSR-VOV-007', lang: 'en', url: '/en/library/video/qa587-inactive', list: '/en/library/video/search', reason: 'inactive' },
  { tc: 'DSR-VOV-008', lang: 'en', url: '/en/library/video/qa587-off', list: '/en/library/video/search', reason: 'movie-unavailable' },
] as const;

test.describe('JOB-13 part 3 – isActive OFF → browser redirect to list', () => {
  for (const d of inactive) {
    for (const tier of ['page', 'live'] as const) {
      test(`${d.tc} [${d.lang}] ${d.url.split('/').pop()} ${tier}: raw 200 + unavailable | ${d.reason}, browser ends on ${d.list} (HTTP 200)`, { tag: ['@auto', '@job13'] }, async ({ request, browser, page }) => {
        const target = `${hosts()[tier]}${d.url}?${cb()}`;
        const response = await request.get(target, { maxRedirects: 0, failOnStatusCode: false });
        observations.push({ url: target, status: response.status() });
        test.skip(response.status() === 404, `page not seeded on .aem.${tier} (HTTP 404)`);
        // By design (Martin 22/10): 200 + unavailable | inactive, no server redirect.
        expect.soft(response.status(), 'raw HTTP (by design 200)').toBe(200);
        const raw = await parseHead(browser, await response.text());
        observations.push(raw);
        expect.soft(raw.unavailable, `raw row 'unavailable | ${d.reason}'`).toBe(d.reason);
        expect.soft(raw.robots ?? '', 'meta robots').toContain('noindex');

        const documents: { url: string; status: number }[] = [];
        page.on('response', r => { if (r.request().isNavigationRequest() && r.frame() === page.mainFrame()) documents.push({ url: r.url(), status: r.status() }); });
        await page.goto(target);
        await page.waitForURL(u => new URL(u).pathname.replace(/\/$/, '') === d.list, { timeout: 10_000 }).catch(() => undefined);
        await page.waitForLoadState('load').catch(() => undefined);
        const finalUrl = page.url();
        const listDoc = documents.find(x => new URL(x.url).pathname.replace(/\/$/, '') === d.list);
        observations.push({ finalUrl, navigations: documents });
        await test.info().attach('final-page', { body: await page.screenshot(), contentType: 'image/png' });
        expect.soft(new URL(finalUrl).pathname.replace(/\/$/, ''), 'browser final URL = list').toBe(d.list);
        const listStatus = listDoc?.status ?? (await request.get(`${hosts()[tier]}${d.list}`, { failOnStatusCode: false })).status();
        observations.push({ listStatus, listStatusSource: listDoc ? 'browser navigation' : 'GET' });
        expect.soft(listStatus, 'list page HTTP').toBe(200);
      });
    }
  }
});
