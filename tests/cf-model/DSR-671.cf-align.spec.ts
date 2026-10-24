import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { test, expect, type APIRequestContext } from '@playwright/test';
import { type Json, dsrItems, contentOf } from '../../fixtures/cf-models';
import {
  languages, base, td, blockedTd, blockedCookie, productPage, catalogPage, lists, dsrModels, tagRoot, articleRoot, siteRoot,
  relatedCardSelector, catalogLinkSelector, headingSelector,
} from '../../fixtures/dsr-671';

// DSR-671 align CF related models with the DM*dsr spec, baseline BL-671-1 (tc-out/DSR-671.spec.json A1).
// Read-only: publish persisted queries + EDS pages; Author models via tools/author/lib (GET only, host allowlist).
// Not here: manual 5.0, 9.0, 10.0, 13.0; 4.0 Blocked-by DSR-655 (client, CB-1); 17.0 = run of the DSR-586/654/587 specs vs ledger.
// Helpers mirror tests/cf-model/DSR-669.cf-model-rename.spec.ts.
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

const url = (p: string) => `${base()}${p}`;

async function graphql(request: APIRequestContext, target: string) {
  const response = await request.get(target, { failOnStatusCode: false });
  const body = await response.json().catch(() => ({})) as { data?: Json; errors?: unknown };
  observations.push({ url: target, status: response.status(), errors: body.errors ?? null, keys: Object.keys(body.data ?? {}) });
  expect(response.status(), `HTTP status ${target}`).toBe(200);
  expect(body.errors, `'errors' in ${target}`).toBeUndefined();
  return body.data ?? {};
}

/** Preflight: the DSR CF item of a dsr-*-page query; skips the test (Blocked-by TD) when the query returns no item. */
async function itemOrSkip(request: APIRequestContext, target: string, blocked: string) {
  const item = dsrItems(await graphql(request, target))[0];
  test.skip(!item, `${blocked} – ${target} returns no item`);
  return item as Json;
}

type Field = Json & { name: string; type: string; label?: string; required?: boolean };
type Model = { name: string; path?: string; fields: Field[] } & Json;
/** Live CF models from Author (tools/author getModels, GET /adobe/sites/cf/models). HTTP 401 → skip (cookie). */
async function authorModels(): Promise<Record<string, Model>> {
  const aem = await import(pathToFileURL(path.resolve(__dirname, '../../tools/author/lib/aem.mjs')).href);
  try {
    return await aem.getModels();
  } catch (err) {
    const message = (err as Error).message;
    observations.push({ author: message });
    test.skip(/HTTP 40[13]|Missing .*aem-dev\.env/.test(message), `${blockedCookie}: ${message}`);
    throw err;
  }
}
const model = (models: Record<string, Model>, name: string) => {
  const m = Object.values(models).find(x => x.name.toLowerCase() === name.toLowerCase());
  expect(m, `model ${name} on DEV`).toBeDefined();
  return m as Model;
};
const field = (m: Model, name: string) => m.fields.find(f => f.name === name);
/** Field config keys matching a pattern (e.g. rootPath, tag root) – the CF OpenAPI may not expose them. */
const configOf = (f: Field | undefined, pattern: RegExp) => Object.fromEntries(Object.entries(f ?? {}).filter(([k]) => pattern.test(k)));

test.describe('DSR-671 CF models aligned with DM*dsr spec', () => {
  test('DSR-671 1.0 [-] DM_catalog_dsr has hubspotFormId (text, HubSpotフォームID) + promoText (rich long-text, 訴求文言), both optional', { tag: ['@auto', '@author'] }, async () => {
    const m = model(await authorModels(), 'DM_catalog_dsr');
    const hubspot = field(m, 'hubspotFormId');
    const promo = field(m, 'promoText');
    observations.push({ model: m.path ?? m.name, hubspotFormId: hubspot ?? null, promoText: promo ?? null });
    expect.soft(hubspot?.type, 'hubspotFormId type').toBe('text');
    expect.soft(hubspot?.label, 'hubspotFormId label').toBe('HubSpotフォームID');
    expect.soft(hubspot?.required ?? false, 'hubspotFormId required').toBe(false);
    expect.soft(promo?.type, 'promoText type').toBe('long-text');
    expect.soft(promo?.label, 'promoText label').toBe('訴求文言');
    expect.soft(promo?.required ?? false, 'promoText required').toBe(false);
    const mime = configOf(promo, /mime|format|richtext/i);
    if (Object.keys(mime).length) expect.soft(JSON.stringify(mime), 'promoText rich text').toMatch(/html|rich/i);
    else test.info().annotations.push({ type: 'pending', description: 'promoText rich-text mode not exposed by the CF OpenAPI (type long-text only)' });
  });

  for (const lang of languages) {
    test(`DSR-671 2.0 [${lang}] dsr-catalog-page ${td.existingCatalog} → 200, no errors, keys hubspotFormId + promoText`, { tag: ['@auto'] }, async ({ request }) => {
      const item = await itemOrSkip(request, catalogPage(lang, td.existingCatalog), `TD-671-04 ${td.existingCatalog} [${lang}] not live`);
      observations.push({ hubspotFormId: item.hubspotFormId, promoText: item.promoText });
      expect.soft(Object.keys(item), 'item keys').toEqual(expect.arrayContaining(['hubspotFormId', 'promoText']));
      if (item.promoText !== null) expect.soft(Object.keys(item.promoText as Json), 'promoText keys').toEqual(expect.arrayContaining(['plaintext', 'html']));
    });
  }

  test(`DSR-671 3.0 [en] dsr-catalog-page ${td.catalog} → promoText html bold + plaintext without tags, hubspotFormId null`, { tag: ['@auto'] }, async ({ request }) => {
    const item = await itemOrSkip(request, catalogPage('en', td.catalog), blockedTd('03'));
    const promo = (item.promoText ?? {}) as { html?: string | null; plaintext?: string | null };
    observations.push({ promoText: promo, hubspotFormId: item.hubspotFormId });
    expect.soft(promo.html ?? '', 'promoText.html bold').toMatch(/<(strong|b)>\s*bold\s*<\/(strong|b)>/);
    expect.soft(promo.html ?? '', 'promoText.html text').toContain('QA671 promo');
    expect.soft((promo.plaintext ?? '').replace(/\s+/g, ' ').trim(), 'promoText.plaintext').toContain('QA671 promo bold');
    expect.soft(promo.plaintext ?? '', 'promoText.plaintext tags').not.toMatch(/<[a-z/][^>]*>/i);
    expect.soft(item.hubspotFormId ?? null, 'hubspotFormId').toBeNull();
  });

  test(`DSR-671 6.0 [en] dsr-product-page ${td.product} → productLabel '${td.productLabel}'`, { tag: ['@auto'] }, async ({ request }) => {
    const item = await itemOrSkip(request, productPage('en', td.product), blockedTd('01'));
    observations.push({ productLabel: item.productLabel ?? null });
    expect(item.productLabel, 'productLabel (separator U+FF5C)').toBe(td.productLabel);
  });

  test('DSR-671 7.0 [-] model DM_product_dsr has no relatedMoodboards', { tag: ['@auto', '@author'] }, async () => {
    const m = model(await authorModels(), 'DM_product_dsr');
    observations.push({ model: m.path ?? m.name, fields: m.fields.map(f => f.name) });
    expect(m.fields.map(f => f.name), 'DM_product_dsr fields').not.toContain('relatedMoodboards');
  });

  for (const lang of languages) {
    test(`DSR-671 7.0 [${lang}] dsr-product-page of every dsr-product-list item → no relatedMoodboards, no errors`, { tag: ['@auto'] }, async ({ request }) => {
      const list = lists(lang)[0];
      const listData = await graphql(request, list.url);
      const items = dsrItems(listData).map(i => String(i._path));
      expect(items.length, `${list.name} items`).toBeGreaterThanOrEqual(1);
      const hits: string[] = JSON.stringify(listData).includes('relatedMoodboards') ? [list.name] : [];
      for (const p of items) {
        const target = productPage(lang, p.replace(`/content/dam/dsr/${lang}/products/`, ''));
        const response = await request.get(target, { failOnStatusCode: false });
        const body = await response.text();
        const errors = (JSON.parse(body || '{}') as { errors?: unknown }).errors ?? null;
        observations.push({ url: target, status: response.status(), errors, relatedMoodboards: body.includes('relatedMoodboards') });
        expect.soft(response.status(), `HTTP ${target}`).toBe(200);
        expect.soft(errors, `errors ${target}`).toBeNull();
        if (body.includes('relatedMoodboards')) hits.push(p);
      }
      expect.soft(hits, 'responses containing relatedMoodboards').toEqual([]);
    });
  }

  test('DSR-671 8.0 [-] DM_product_dsr relatedArticles / relatedContents rootPath = article hierarchy (not site root)', { tag: ['@auto', '@author'] }, async () => {
    const m = model(await authorModels(), 'DM_product_dsr');
    const raw = Object.fromEntries(['relatedArticles', 'relatedContents'].map(n => [n, field(m, n) ?? null]));
    observations.push({ model: m.path ?? m.name, raw });
    const roots = Object.entries(raw).map(([n, f]) => [n, Object.values(configOf(f ?? undefined, /root/i))[0]] as const);
    test.skip(roots.some(([, r]) => r === undefined), `Pending: rootPath not exposed by the CF OpenAPI (manual 9.0 covers); raw field config attached`);
    for (const [n, r] of roots) {
      expect.soft(String(r), `${n} rootPath`).not.toMatch(siteRoot);
      expect.soft(String(r), `${n} rootPath (A5)`).toMatch(articleRoot);
    }
  });

  for (const lang of languages) {
    test(`DSR-671 11.0 [${lang}] every DSR CF of dsr-product/catalog/video-list references a content CF of the same language and type`, { tag: ['@auto'] }, async ({ request }) => {
      const mismatches: Record<string, unknown>[] = [];
      const noRef: string[] = [];
      for (const list of lists(lang)) {
        const items = dsrItems(await graphql(request, list.url));
        observations.push({ list: list.name, count: items.length });
        for (const i of items) {
          const p = String(i._path);
          const ref = contentOf(i, list.ref);
          if (!ref) { noRef.push(p); continue; } // reference not resolvable on publish (e.g. content CF unpublished) – raw only
          const refPath = String(ref._path);
          if (!p.startsWith(list.dsr) || !refPath.startsWith(list.common)) mismatches.push({ list: list.name, dsr: p, ref: refPath, expected: `${list.common}…` });
        }
      }
      observations.push({ mismatches, noRef });
      if (noRef.length) test.info().annotations.push({ type: 'observation', description: `No resolvable reference (null on publish): ${noRef.join(', ')}` });
      expect.soft(mismatches, 'language/type mismatches').toEqual([]);
    });
  }

  test('DSR-671 12.0 [-] dsrFeatures on the 4 DM_*_dsr models: tag root ≠ /content/cq:tags, forceSelection, no autocreateTag', { tag: ['@auto', '@author'] }, async () => {
    const models = await authorModels();
    const raw = Object.fromEntries(dsrModels.map(n => [n, field(model(models, n), 'dsrFeatures') ?? null]));
    observations.push({ raw });
    const cfg = Object.entries(raw).map(([n, f]) => [n, configOf(f ?? undefined, /root|forceSelection|autocreate/i)] as const);
    test.skip(cfg.some(([, c]) => !Object.keys(c).some(k => /root/i.test(k)) || !Object.keys(c).some(k => /forceSelection/i.test(k))),
      'Pending: tag root / forceSelection not exposed by the CF OpenAPI (manual 13.0 covers); raw field config attached');
    for (const [n, c] of cfg) {
      const root = Object.entries(c).find(([k]) => /root/i.test(k))?.[1];
      const force = Object.entries(c).find(([k]) => /forceSelection/i.test(k))?.[1];
      const auto = Object.entries(c).find(([k]) => /autocreate/i.test(k))?.[1];
      expect.soft(String(root).replace(/\/$/, ''), `${n} tag root (A6)`).not.toBe(tagRoot);
      expect.soft(String(force), `${n} forceSelection`).toBe('true');
      expect.soft(auto === undefined || String(auto) === 'false', `${n} autocreateTag false/absent (${auto})`).toBe(true);
    }
  });

  test(`DSR-671 14.0 [en] /en/products/${td.product} related catalogs: ${td.existingCatalog} present, no ${td.inactiveCatalog.id}`, { tag: ['@auto'] }, async ({ request, page }) => {
    await itemOrSkip(request, productPage('en', td.product), blockedTd('01'));
    const response = await page.goto(url(`/en/products/${td.product}`), { waitUntil: 'networkidle' });
    const links = await page.locator(catalogLinkSelector).evaluateAll(as => as.map(a => ({ href: a.getAttribute('href'), text: a.textContent?.trim() ?? '' })));
    const text = await page.locator('main').innerText();
    observations.push({ url: page.url(), status: response?.status(), catalogLinks: links });
    expect(response?.status(), 'HTTP').toBe(200);
    expect.soft(links.map(l => l.href), 'related catalog link').toContain(`/en/library/catalog/${td.existingCatalog}`);
    expect.soft(JSON.stringify(links), 'inactive catalog link').not.toContain(td.inactiveCatalog.id);
    expect.soft(text, 'inactive catalog title').not.toContain(td.inactiveCatalog.title);
  });

  test(`DSR-671 15.0 [en] /en/products/${td.product} 関連コンテンツ: ${td.movie} present, no ${td.inactiveMovie.id}`, { tag: ['@auto'] }, async ({ request, page }) => {
    await itemOrSkip(request, productPage('en', td.product), blockedTd('01'));
    const response = await page.goto(url(`/en/products/${td.product}`), { waitUntil: 'networkidle' });
    const cards = await page.locator(relatedCardSelector).evaluateAll(as => as.map(a => ({ href: a.getAttribute('href'), text: a.textContent?.trim() ?? '' })));
    const text = await page.locator('main').innerText();
    observations.push({ url: page.url(), status: response?.status(), relatedCards: cards });
    expect(response?.status(), 'HTTP').toBe(200);
    expect.soft(cards.map(c => c.href), 'related video card').toContain(`/en/library/video/${td.movie}`);
    expect.soft(JSON.stringify(cards), 'inactive video card').not.toContain(td.inactiveMovie.id);
    expect.soft(text, 'inactive video title').not.toContain(td.inactiveMovie.title);
  });

  test(`DSR-671 16.0 [en] /en/products/${td.productOnlyInactive} (only inactive related) → 0 related catalogs/videos, same headings as ${td.oracleProduct}, no console error`, { tag: ['@auto'] }, async ({ request, page }) => {
    await itemOrSkip(request, productPage('en', td.productOnlyInactive), blockedTd('02'));
    const collect = async (id: string) => {
      const consoleErrors: string[] = [];
      const onConsole = (m: { type(): string; text(): string }) => { if (m.type() === 'error') consoleErrors.push(m.text()); };
      page.on('console', onConsole);
      const response = await page.goto(url(`/en/products/${id}`), { waitUntil: 'networkidle' });
      page.off('console', onConsole);
      const raw = {
        url: page.url(), status: response?.status(), consoleErrors,
        catalogLinks: await page.locator(catalogLinkSelector).count(),
        videoCards: await page.locator(`${relatedCardSelector}[href*="/library/video/"]`).count(),
        headings: await page.locator(headingSelector).allInnerTexts(),
      };
      observations.push(raw);
      return raw;
    };
    const target = await collect(td.productOnlyInactive);
    const oracle = await collect(td.oracleProduct);
    expect(target.status, 'HTTP').toBe(200);
    expect.soft(target.catalogLinks, 'related catalog cards').toBe(0);
    expect.soft(target.videoCards, 'related video items').toBe(0);
    expect.soft(target.headings, `section headings vs ${td.oracleProduct}`).toEqual(oracle.headings);
    expect.soft(target.consoleErrors, 'console errors').toEqual([]);
  });
});
