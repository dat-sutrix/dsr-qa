import { test, expect, type APIRequestContext, type Page } from '@playwright/test';
import { AssetAudit, type AssetResponse } from '../../pages/AssetAudit';
import {
  type Language, languages, indexPath, productPath, fallbackUrl, sampleIds, maxPages,
  legacyDomain, sampleFolder, pc, sp, upscaleTolerance,
  noProductPage, baselineOnly, indexEmpty, noWebpSample, noPdf, noSameProduct,
} from '../../fixtures/dsr-227';

// DSR-227 asset migration (Automation TCs 3.0, 9.0, 10.0, 12.0–17.0 → DSR-ASSET-NNN). Read-only.
// Until TD-227-02 sample ids are delivered every test records observations (attachment "observed") and skips:
// pre-migration baseline for QA, no verdict.
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

type Mode = 'sample' | 'index' | 'fallback';
type Target = { mode: Mode; urls: string[] };

async function indexIds(request: APIRequestContext, lang: Language): Promise<string[]> {
  const r = await request.get(indexPath);
  if (!r.ok()) return [];
  const rows = ((await r.json()).data ?? []) as { path: string }[];
  return rows.map(row => row.path.match(productPath(lang))?.[1]).filter((id): id is string => !!id);
}

// Preflight: TD-227-02 sample ids > query-index products (TD-227-08) > fallback overlay page (A7). Only 200 pages kept.
async function productPages(request: APIRequestContext, lang: Language, limit = 3): Promise<Target> {
  const samples = sampleIds();
  const ids = samples.length ? samples : await indexIds(request, lang);
  let mode: Mode = samples.length ? 'sample' : 'index';
  let candidates = ids.slice(0, limit).map(id => `/${lang}/products/${id}`);
  if (!candidates.length) { mode = 'fallback'; candidates = [fallbackUrl(lang)]; }
  const urls: string[] = [];
  for (const url of candidates) {
    const status = (await request.get(url)).status();
    observations.push({ preflight: url, status });
    if (status === 200) urls.push(url);
  }
  observations.push({ mode, pages: urls.length });
  test.skip(!urls.length, noProductPage);
  return { mode, urls };
}

// Sample-based TCs give a verdict only on TD-227-02 pages; anything else is baseline.
const gate = (t: Target) => test.skip(t.mode !== 'sample', baselineOnly);

async function audit(page: Page, url: string) {
  const a = new AssetAudit(page);
  const errors: string[] = [];
  page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
  await a.goto(url);
  await a.scrollToBottom();
  return { a, errors, refs: await a.refs(), images: await a.images() };
}

const bad = (rs: AssetResponse[]) => rs.filter(r => r.status >= 400).map(r => ({ url: r.url, status: r.status }));

for (const lang of languages) {
  test(`DSR-ASSET-003 [${lang}] migrated asset paths after the DAM root use lowercase letters, digits and hyphens only`, { tag: ['@auto'] }, async ({ page, request }) => {
    const target = await productPages(request, lang);
    const violations = [];
    for (const url of target.urls) {
      const { a, refs } = await audit(page, url);
      const dam = [...refs.map(r => r.url), ...a.responses.map(r => r.url)].filter(AssetAudit.isDam);
      const v = AssetAudit.namingViolations(dam);
      observations.push({ page: url, damUrls: [...new Set(dam)].length, violations: v });
      violations.push(...v);
    }
    gate(target);
    expect.soft(violations, 'naming violations (TCC#1)').toEqual([]);
  });

  test(`DSR-ASSET-009 [${lang}] product page images load from the new DAM (naturalWidth > 0, 200, no legacy/sample path)`, { tag: ['@auto'] }, async ({ page, request }) => {
    const target = await productPages(request, lang);
    const failed: unknown[] = [];
    for (const url of target.urls) {
      const { a, images, errors } = await audit(page, url);
      const broken = images.filter(i => i.src && (!i.complete || i.naturalWidth === 0)).map(i => i.src);
      const notMigrated = images.map(i => i.src).filter(s => s.includes(legacyDomain) || s.includes(sampleFolder));
      const hosts = [...new Set(images.filter(i => i.src).map(i => AssetAudit.root(i.src)))];
      const notOk = a.responses.filter(r => r.resourceType === 'image' && r.status !== 200).map(r => ({ url: r.url, status: r.status }));
      observations.push({ page: url, images: images.length, hosts, broken, notMigrated, notOk, consoleErrors: errors });
      failed.push(...broken.map(src => ({ broken: src })), ...notMigrated.map(src => ({ notMigrated: src })), ...notOk, ...errors.map(e => ({ console: e })));
    }
    gate(target);
    expect.soft(failed, 'broken / non-migrated images, non-200 image requests, console errors').toEqual([]);
  });

  test(`DSR-ASSET-010 [${lang}] product PDFs open from the new DAM (200, application/pdf, size > 0, naming rule)`, { tag: ['@auto'] }, async ({ page, request }) => {
    const target = await productPages(request, lang);
    const pdfs: { page: string; url: string; status: number; contentType: string; bytes: number; dam: boolean }[] = [];
    for (const url of target.urls) {
      const { refs } = await audit(page, url);
      for (const ref of refs.filter(r => r.kind === 'pdf')) {
        const r = await request.get(ref.url);
        pdfs.push({ page: url, url: ref.url, status: r.status(), contentType: r.headers()['content-type'] || '', bytes: (await r.body()).length, dam: AssetAudit.isDam(ref.url) });
      }
    }
    observations.push({ pdfs, violations: AssetAudit.namingViolations(pdfs.map(p => p.url)) });
    gate(target);
    test.skip(!pdfs.length, noPdf);
    expect.soft(pdfs.filter(p => p.status !== 200 || !p.contentType.includes('application/pdf') || p.bytes === 0 || !p.dam), 'PDFs not 200/pdf/non-empty/DAM').toEqual([]);
    expect.soft(AssetAudit.namingViolations(pdfs.map(p => p.url)), 'PDF naming violations').toEqual([]);
  });

  test(`DSR-ASSET-012 [${lang}] main image: SP (375, DPR 2) rendition smaller than PC (1440, DPR 1) and not upscaled`, { tag: ['@auto'] }, async ({ browser, request }) => {
    test.setTimeout(120_000);
    const target = await productPages(request, lang);
    type Shot = { src: string; bytes: number; naturalWidth: number; renderedWidth: number; dpr: number } | null;
    const rows: { page: string; pc?: Shot; sp?: Shot }[] = [];
    for (const url of target.urls) {
      const shot: { pc?: Shot; sp?: Shot } = {};
      for (const [name, opts] of [['pc', pc], ['sp', sp]] as const) {
        const context = await browser.newContext(opts);
        try {
          const page = await context.newPage();
          const { a } = await audit(page, url);
          const img = await a.mainImage();
          shot[name] = img && { src: img.src, bytes: a.responses.find(r => r.url === img.src)?.bytes ?? -1, naturalWidth: img.naturalWidth, renderedWidth: img.renderedWidth, dpr: opts.deviceScaleFactor };
        } finally {
          await context.close();
        }
      }
      rows.push({ page: url, ...shot });
    }
    observations.push({ rows });
    gate(target);
    for (const r of rows) {
      expect.soft(r.pc && r.sp, `main image found (${r.page})`).toBeTruthy();
      if (!r.pc || !r.sp) continue;
      expect.soft(r.sp.src, `SP request differs from PC (${r.page})`).not.toBe(r.pc.src);
      expect.soft(r.sp.bytes, `SP bytes < PC bytes (${r.page})`).toBeLessThan(r.pc.bytes);
      for (const s of [r.pc, r.sp]) {
        expect.soft(s.naturalWidth, `not upscaled at DPR ${s.dpr} (${r.page})`).toBeGreaterThanOrEqual(s.renderedWidth * s.dpr * upscaleTolerance);
      }
    }
  });

  test(`DSR-ASSET-013 [${lang}] .webp-source image displays in Chromium and WebKit (naturalWidth > 0, 200, image content-type)`, { tag: ['@auto'] }, async ({ page, request, playwright }) => {
    test.setTimeout(120_000);
    const target = await productPages(request, lang);
    // TD-227-02 #2: webp source = DAM path ending .webp (delivery format fmt=webp / format=webply is not the source).
    // TODO: take the webp-source asset from the migration mapping (TD-227-04) once delivered.
    const isWebpSource = (src: string) => /\.webp$/i.test(new URL(src).pathname);
    const result: Record<string, unknown>[] = [];
    const webkit = await playwright.webkit.launch().catch(e => { observations.push({ webkitLaunch: String(e).slice(0, 200) }); return null; });
    try {
      for (const url of target.urls) {
        for (const [name, p] of [['chromium', page], ['webkit', webkit && await webkit.newPage()]] as const) {
          if (!p) continue;
          const { a, images } = await audit(p, url);
          const webp = images.filter(i => i.src && isWebpSource(i.src));
          result.push({
            page: url, browser: name,
            webpSource: webp.map(i => ({ src: i.src, naturalWidth: i.naturalWidth, response: a.responses.find(r => r.url === i.src) })),
            deliveredAsWebp: a.responses.filter(r => r.contentType.includes('webp')).length,
            brokenImages: images.filter(i => i.src && i.naturalWidth === 0).map(i => i.src),
          });
        }
      }
    } finally {
      await webkit?.close();
    }
    observations.push({ result });
    gate(target);
    const webp = result.flatMap(r => (r.webpSource as { src: string; naturalWidth: number; response?: AssetResponse }[]).map(w => ({ browser: r.browser, ...w })));
    test.skip(!webp.length, noWebpSample);
    expect.soft(webkit, 'WebKit launched').toBeTruthy();
    expect.soft(webp.filter(w => w.naturalWidth === 0 || w.response?.status !== 200 || !w.response?.contentType.startsWith('image/')), 'webp-source images not displayed').toEqual([]);
  });

  test(`DSR-ASSET-014 [${lang}] migrated assets are reachable without login (fresh context, 200)`, { tag: ['@auto'] }, async ({ page, request, playwright }) => {
    test.setTimeout(120_000);
    const target = await productPages(request, lang);
    const urls = new Set<string>();
    for (const url of target.urls) {
      const { a, refs } = await audit(page, url);
      [...refs.map(r => r.url), ...a.responses.map(r => r.url)].filter(AssetAudit.isDam).forEach(u => urls.add(u));
    }
    const fresh = await playwright.request.newContext();
    const rows = [];
    try {
      for (const url of urls) {
        const r = await fresh.get(url);
        rows.push({ url, status: r.status(), finalUrl: r.url() });
      }
    } finally {
      await fresh.dispose();
    }
    observations.push({ damUrls: rows.length, notOk: rows.filter(r => r.status !== 200 || r.finalUrl !== r.url) });
    gate(target);
    expect.soft(rows.length, 'DAM asset URLs collected').toBeGreaterThan(0);
    expect.soft(rows.filter(r => r.status !== 200 || /login|j_security_check/i.test(r.finalUrl)), 'assets not 200 without login').toEqual([]);
  });

  test(`DSR-ASSET-015 [${lang}] migrated content images keep a non-empty alt`, { tag: ['@auto'] }, async ({ page, request }) => {
    const target = await productPages(request, lang);
    const missing = [];
    for (const url of target.urls) {
      const { images } = await audit(page, url);
      // Content images = in main, not decorative (role=presentation / aria-hidden).
      const content = images.filter(i => i.inMain && !i.decorative && i.src);
      const m = content.filter(i => !i.alt?.trim()).map(i => i.src);
      observations.push({ page: url, contentImages: content.length, emptyAlt: m });
      missing.push(...m);
    }
    gate(target);
    expect.soft(missing, 'content images with empty alt (A6)').toEqual([]);
  });

  test(`DSR-ASSET-016 [${lang}] no asset response >= 400 on DEV product pages (query-index, max ${maxPages})`, { tag: ['@auto'] }, async ({ page, request }) => {
    test.setTimeout(300_000);
    const target = await productPages(request, lang, maxPages);
    const broken: { page: string; url: string; status: number }[] = [];
    const roots = new Map<string, number>();
    const dam: string[] = [];
    for (const url of target.urls) {
      const { a, refs } = await audit(page, url);
      broken.push(...bad(a.responses).map(b => ({ page: url, ...b })));
      for (const u of new Set([...refs.map(r => r.url), ...a.responses.map(r => r.url)])) {
        roots.set(AssetAudit.root(u), (roots.get(AssetAudit.root(u)) ?? 0) + 1);
        if (AssetAudit.isDam(u)) dam.push(u);
      }
    }
    const violations = AssetAudit.namingViolations(dam);
    // Pre-migration baseline (job step 4).
    observations.push({
      baseline: {
        indexProductPages: (await indexIds(request, lang)).length, pagesAudited: target.urls, mode: target.mode,
        roots: Object.fromEntries(roots), namingViolations: violations.length, first20: violations.slice(0, 20), responses400: broken,
      },
    });
    test.skip(target.mode === 'fallback', indexEmpty);
    expect.soft(broken, 'asset responses >= 400 (page → URL → status)').toEqual([]);
  });
}

test(`DSR-ASSET-017 [ja+en] same product uses the same DAM image paths in ja and en`, { tag: ['@auto'] }, async ({ page, request }) => {
  const ja = await productPages(request, 'ja');
  const en = await productPages(request, 'en');
  const id = (u: string) => u.match(/\/products\/(\d+)$/)?.[1];
  const pairs = ja.urls.map(j => [j, en.urls.find(e => id(e) === id(j))] as const).filter((p): p is readonly [string, string] => !!p[1]);
  const diffs = [];
  for (const [j, e] of pairs) {
    const paths = async (url: string) => {
      const { images } = await audit(page, url);
      return new Set(images.map(i => i.src).filter(s => s && AssetAudit.isDam(s)).map(s => new URL(s).pathname));
    };
    const pj = await paths(j);
    const pe = await paths(e);
    // TODO: ignore language-specific files allowed by the design doc (DSR-606 Q2, e.g. *_cn.jpg).
    const d = { id: id(j), onlyJa: [...pj].filter(p => !pe.has(p)), onlyEn: [...pe].filter(p => !pj.has(p)) };
    observations.push(d);
    diffs.push(d);
  }
  observations.push({ pairs: pairs.length });
  test.skip(!pairs.length, noSameProduct);
  gate(ja);
  expect.soft(diffs.filter(d => d.onlyJa.length || d.onlyEn.length), 'DAM image paths differ between ja and en').toEqual([]);
});
