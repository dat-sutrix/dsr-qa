import { test, expect, type APIRequestContext } from '@playwright/test';
import {
  type Language, type Shape, languages, queries, existingProductId, legacyProductId, base, productPath, searchIndexPaths, td, seeded,
  ver04Done, blockedVer04, blockedAuthor, removedFields, oldSpellings, ver04DetailFields, coreFields, openingTypeValues, mediaSlots,
  mediaTypes, imageExtension, newFields, sliderSameAsParentValues, commonProductsRoot, digitsOnly, leftoverText,
} from '../../fixtures/dsr-585';
import { type Json, dsrItems, inactiveItems, contentListItems, contentOf } from '../../fixtures/cf-models';

// DSR-585 product CF (DM_product) re-baselined to DM_product_ver0.4 (spec.json A1, BL-OVL-1).
// Read-only: CF layer via publish persisted queries only, never Author. Spec ids from ykk-dsr/hub/tc-out/DSR-585.spec.json:
// 1.0 → DSR-PCF-001 … Automation TCs 13.0/14.0/15.0/19.0; Author TCs 7.0/16.0/17.0/18.0 also get a publish-side proxy
// (values only – widget, options list, defaults and save/reopen stay manual).
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

const pending = (description: string) => test.info().annotations.push({ type: 'pending', description });

async function graphql(request: APIRequestContext, url: string) {
  const response = await request.get(url, { failOnStatusCode: false });
  const body = await response.json().catch(() => ({})) as { data?: Json; errors?: unknown };
  observations.push({ url, status: response.status(), errors: body.errors ?? null });
  expect(response.status(), `HTTP status ${url}`).toBe(200);
  expect(body.errors, `'errors' in ${url}`).toBeUndefined();
  return body.data ?? {};
}

// dsr-* queries wrap the DM_product CF in item.product; product-detail / dm-product-list return it directly.
// List names via fixtures/cf-models (DSR-669: dmProductRelatedList → dmProductDsrList, aliases may stay).
const productsOf = (data: Json) => [
  ...dsrItems(data), ...(inactiveItems(data) ?? []),
].map(i => contentOf(i, 'product')).filter((p): p is Json => !!p).concat(contentListItems(data));

function allKeys(value: unknown, out = new Set<string>()) {
  if (Array.isArray(value)) value.forEach(v => allKeys(v, out));
  else if (value && typeof value === 'object') Object.entries(value).forEach(([k, v]) => { out.add(k); allKeys(v, out); });
  return out;
}

function shapeOf(value: unknown): Shape | 'null' | 'other' {
  if (value === null || value === undefined) return 'null';
  if (typeof value === 'boolean') return 'boolean';
  if (typeof value === 'string') return 'string';
  if (typeof value === 'object' && '_path' in (value as Json)) return 'asset';
  if (typeof value === 'object' && 'plaintext' in (value as Json)) return 'plain-multiline';
  return 'other';
}

async function productPageProduct(request: APIRequestContext, lang: Language, id: string) {
  const data = await graphql(request, queries.productPage(lang, id));
  const product = contentOf(dsrItems(data)[0], 'product') ?? undefined;
  expect(product, `DSR list items[0].product for ${lang}/${id}`).toBeTruthy();
  return product!;
}

const authorOnly: [string, string, string][] = [
  ['001', 'DM_product field set matches ver0.4 (10 tabs, 83 fields)', 'TD-585-01'],
  ['002', 'removed fields and old spellings not shown in the CF editor', 'TD-585-01'],
  ['003', 'field types match fix list', 'TD-585-01'],
  ['004', 'required fields enforced on save (negative)', 'TD-585-02'],
  ['005', 'single-line text accepts 255 characters (boundary)', 'TD-585-02'],
  ['006', 'zipperChainTypeCategories tag picker stores several chain-type tags', 'TD-585-01 + chain-type tag namespace'],
  ['008', 'data entry template columns match the model', 'TD-585-03 + template revision (Q28)'],
  ['009', 'bulk import with revised template', 'TD-585-03 + import procedure (Q28)'],
  ['010', 'bulk import rejects row missing a required field (negative)', 'TD-585-03 + import procedure (Q28)'],
  ['011', 'pre-change product CF opens and keeps retained values', 'TD-585-04'],
  ['012', 'ja / en / cn folders use the same model', 'TD-585-01 en/cn copies; cn folder may not exist (Issue #18)'],
];

test.describe('DSR-585 product CF (DM_product ver0.4)', () => {
  for (const [tc, title, data] of authorOnly) {
    test(`DSR-PCF-${tc} [ja] ${title}`, { tag: ['@overlay', '@manual', '@blocked'] }, () => test.fixme(true, `Blocked: ${blockedAuthor}; ${data}; ${blockedVer04}`));
  }

  for (const lang of languages) {
    test(`DSR-PCF-007 [${lang}] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy)`, { tag: ['@overlay', '@auto', '@proxy'] }, async ({ request }) => {
      const data = await graphql(request, queries.dmProductList());
      const own = contentListItems(data).filter(p => String(p._path).startsWith(commonProductsRoot(lang)));
      const values = own.map(p => ({ path: p._path, openingType: p.openingType ?? null }));
      observations.push({ language: lang, values });
      const filled = values.filter(v => v.openingType !== null);
      test.skip(filled.length === 0, `blocked-data: no product CF in ${commonProductsRoot(lang)} has openingType filled`);
      const asText = filled.filter(v => typeof v.openingType === 'string');
      if (asText.length) {
        pending(`openingType is single line text (Q45/A7): ${asText.map(v => v.path).join(', ')}`);
        test.skip(true, 'Pending: openingType returned as single line text (Q45/A7) – not Fail');
      }
      for (const v of filled) {
        expect.soft(Array.isArray(v.openingType), `${v.path} openingType is multi-value`).toBe(true);
        expect.soft((v.openingType as string[]).filter(o => !openingTypeValues.includes(o)), `${v.path} values outside 止/開/逆開/チェーン`).toEqual([]);
      }
    });
  }

  for (const lang of languages) {
    test(`DSR-PCF-013 [${lang}] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names`, { tag: ['@overlay', '@auto'] }, async ({ request }) => {
      test.fixme(!seeded('01'), `Blocked: TD-585-01 not seeded (DSR585_SEEDED); ${blockedVer04}`);
      const product = await productPageProduct(request, lang, td['01'].id);
      const keys = Object.keys(product);
      observations.push({ language: lang, keys, core: Object.fromEntries(coreFields.map(k => [k, product[k]])) });
      expect.soft(product.productId).toBe(td['01'].id);
      expect.soft(product.productCode).toBe(td['01'].code);
      expect.soft(product.productName).toBe(td['01'].name);
      expect.soft(product.publishDate).toBe(td['01'].publishDate);
      expect.soft(ver04DetailFields.filter(f => !keys.includes(f)), 'missing ver0.4 detail fields').toEqual([]);
      expect.soft([...removedFields, ...oldSpellings].filter(f => keys.includes(f)), 'removed / old names present').toEqual([]);
    });
  }

  test('DSR-PCF-014 [ja] product search JSON entry has search keys and no removed fields', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    test.fixme(!seeded('01'), `Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); ${blockedVer04}`);
    let entry: Json | undefined;
    for (const path of searchIndexPaths('ja')) {
      const response = await request.get(`${base()}${path}?limit=5000`, { failOnStatusCode: false });
      observations.push({ url: path, status: response.status() });
      if (response.status() !== 200) continue;
      const rows = ((await response.json().catch(() => ({}))) as { data?: Json[] }).data ?? [];
      entry = rows.find(r => r.productId === td['01'].id || String(r.path ?? '').endsWith(`/products/${td['01'].id}`));
      if (entry) break;
    }
    observations.push({ entry: entry ?? null });
    expect(entry, `search JSON entry for ${td['01'].id}`).toBeTruthy();
    const keys = Object.keys(entry!);
    expect.soft(['productId', 'productName', 'productCategories', 'applications'].filter(k => !keys.includes(k)), 'missing search keys').toEqual([]);
    expect.soft(removedFields.filter(f => keys.includes(f)), 'removed field names').toEqual([]);
  });

  test('DSR-PCF-015 [ja] product detail of TD-585-01 renders without errors (regression)', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    test.fixme(!seeded('01'), `Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; ${blockedVer04}`);
    const errors: string[] = [];
    page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
    await page.setViewportSize({ width: 1440, height: 900 });
    const response = await page.goto(`${base()}${productPath('ja', td['01'].id)}`);
    await page.waitForLoadState('networkidle').catch(() => undefined);
    // TODO: data-testid product-name (DSR-586 not yet in DOM) – h1 used temporarily
    const h1 = (await page.locator('h1').first().textContent().catch(() => null))?.trim() ?? null;
    const text = await page.locator('main').innerText().catch(() => page.locator('body').innerText());
    const leftovers = leftoverText.filter(r => r.test(text)).map(String);
    observations.push({ status: response?.status(), finalUrl: page.url(), h1, consoleErrors: errors, leftovers });
    expect(response?.status()).toBe(200);
    expect.soft(h1).toBe(td['01'].name);
    expect.soft(errors, 'console errors').toEqual([]);
    expect.soft(leftovers, "literal 'undefined' / 'null' / '{{'").toEqual([]);
  });

  for (const lang of languages) {
    test(`DSR-PCF-016 [${lang}] media01 image only, media02–15 each Type/Asset/Url (publish proxy)`, { tag: ['@overlay', '@auto', '@proxy'] }, async ({ request }) => {
      const product = await productPageProduct(request, lang, existingProductId);
      const keys = Object.keys(product);
      const media01 = product.media01Asset as Json | null;
      const slots = mediaSlots.map(s => ({ slot: s, keys: ['Type', 'Asset', 'Url'].filter(k => keys.includes(`${s}${k}`)), type: product[`${s}Type`] ?? null }));
      observations.push({ language: lang, path: product._path, media01Asset: media01?._path ?? null, media01Keys: keys.filter(k => k.startsWith('media01')), slots });
      expect.soft(keys.filter(k => /^media01(Type|Url)$/.test(k)), 'media01 has no Type/Url').toEqual([]);
      expect.soft(keys, 'media01Asset field').toContain('media01Asset');
      if (media01?._path) expect.soft(String(media01._path), 'media01Asset is an image').toMatch(imageExtension);
      expect.soft(slots.filter(s => s.keys.length !== 3).map(s => s.slot), 'slots without Type/Asset/Url').toEqual([]);
      const badTypes = slots.filter(s => s.type !== null && !mediaTypes.includes(String(s.type).toLowerCase()));
      expect.soft(badTypes.map(s => `${s.slot}=${s.type}`), 'Type values outside Image/Video/360/3D/External').toEqual([]);
    });
  }

  for (const lang of languages) {
    test(`DSR-PCF-017 [${lang}] 7 fields added in ver0.4 exist with the defined type (publish proxy)`, { tag: ['@overlay', '@auto', '@proxy'] }, async ({ request }) => {
      const product = await productPageProduct(request, lang, existingProductId);
      const found = Object.entries(newFields).map(([field, shape]) => ({ field, expected: shape, present: field in product, actual: shapeOf(product[field]) }));
      observations.push({ language: lang, path: product._path, found });
      expect.soft(found.filter(f => !f.present).map(f => f.field), 'missing ver0.4 fields').toEqual([]);
      // Empty values (null) cannot show the type; only filled values are compared.
      expect.soft(found.filter(f => f.actual !== 'null' && f.actual !== f.expected).map(f => `${f.field}: ${f.actual}`), 'type mismatch').toEqual([]);
      const slider = product.applicableSliderSameAsParent;
      if (slider) expect.soft(sliderSameAsParentValues, 'applicableSliderSameAsParent option').toContain(slider);
      if (found.every(f => f.actual === 'null')) pending(`all 7 fields empty on ${product._path}; types not observable – defaults need Author (TD-585-02)`);
    });
  }

  for (const lang of languages) {
    test(`DSR-PCF-018 [${lang}] product CF name = numeric productId in content CF folder`, { tag: ['@overlay', '@auto', '@proxy'] }, async ({ request }) => {
      // Folder listing of existing data is recorded only (non-digit / mismatching names = data to clean, not Fail of the model).
      const data = await graphql(request, queries.dmProductList());
      const own = contentListItems(data).filter(p => String(p._path).startsWith(commonProductsRoot(lang)));
      const names = own.slice(0, 10).map(p => ({ name: String(p._path).split('/').pop(), productId: p.productId ?? null }));
      const toClean = names.filter(n => !digitsOnly.test(n.name!) || n.name !== n.productId);
      observations.push({ language: lang, folder: commonProductsRoot(lang), names, toClean });
      if (toClean.length) test.info().annotations.push({ type: 'data', description: `to clean: ${toClean.map(n => `${n.name} (productId ${n.productId})`).join(', ')}` });
      test.fixme(lang !== 'ja' || !seeded('01'), `Blocked: TD-585-01 ${lang === 'ja' ? 'not seeded (DSR585_SEEDED)' : 'is ja only'}; ${blockedVer04}`);
      const tdCf = own.find(p => p._path === `${commonProductsRoot('ja')}${td['01'].id}`);
      expect(tdCf, `${commonProductsRoot('ja')}${td['01'].id}`).toBeTruthy();
      expect(tdCf!.productId).toBe(td['01'].id);
    });
  }

  test('DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    const targets = [
      queries.productPage('ja', existingProductId), queries.productDetail(legacyProductId), queries.productList('ja'), queries.dmProductList(),
    ];
    const hits: { query: string; items: number; removed: string[]; old: string[] }[] = [];
    for (const target of targets) {
      const data = await graphql(request, target);
      const keys = allKeys(productsOf(data));
      hits.push({
        query: target.split('/ykk/')[1], items: productsOf(data).length,
        removed: removedFields.filter(f => keys.has(f) && !oldSpellings.includes(f)), old: oldSpellings.filter(f => keys.has(f)),
      });
    }
    observations.push({ hits });
    expect.soft(hits.filter(h => h.items === 0).map(h => h.query), 'queries with 0 product items').toEqual([]);
    expect.soft(hits.flatMap(h => h.removed.map(f => `${h.query}: ${f}`)), 'removed ver0.3 fields').toEqual([]);
    const old = hits.flatMap(h => h.old.map(f => `${h.query}: ${f}`));
    if (old.length && !ver04Done()) {
      pending(`old names before Martin's ver0.4 done ping (Q46): ${old.join(', ')}`);
      test.skip(true, 'Pending: old field names present, ver0.4 not confirmed done (Q46) – suspect data, cause dm_product-ver0.4');
    }
    expect.soft(old, 'old spellings (Q46, cause dm_product-ver0.4)').toEqual([]);
  });

  test('DSR-PCF-019 [en] en product persisted queries return ver0.4 names only', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    const hits: { query: string; items: number; names: string[] }[] = [];
    for (const target of [queries.productPage('en', existingProductId), queries.productList('en')]) {
      const data = await graphql(request, target);
      const keys = allKeys(productsOf(data));
      hits.push({ query: target.split('/ykk/')[1], items: productsOf(data).length, names: [...new Set([...removedFields, ...oldSpellings])].filter(f => keys.has(f)) });
    }
    observations.push({ hits });
    expect.soft(hits.filter(h => h.items === 0).map(h => h.query), 'queries with 0 product items').toEqual([]);
    const found = hits.flatMap(h => h.names.map(f => `${h.query}: ${f}`));
    if (found.some(f => oldSpellings.some(o => f.endsWith(`: ${o}`))) && !ver04Done()) {
      pending(`old names before Martin's ver0.4 done ping (Q46): ${found.join(', ')}`);
      test.skip(true, 'Pending: old field names present, ver0.4 not confirmed done (Q46) – suspect data, cause dm_product-ver0.4');
    }
    expect.soft(found, 'removed / old field names').toEqual([]);
  });
});
