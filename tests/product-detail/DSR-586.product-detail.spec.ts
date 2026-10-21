import { test, expect, type APIRequestContext, type Browser, type Page } from '@playwright/test';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import {
  type Language, base, hosts, productPath, productsRoot, td, notSeeded, seeded, descriptionPrefix, settleMs, redirectWaitMs,
  graphqlPattern, indexPath, sitemapPath, htmlLang, removedFieldLabels, displayFields, newFields, noNewFieldDesign, td01,
  pdoId, needsTd, literalEmpty, publishHost, incomplete, unavailableRow,
} from '../../fixtures/dsr-586';

// DSR-586 product detail overlay (json2html), baseline BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md).
// Read-only. Spec ids from ykk-dsr/hub/tc-out/DSR-586.spec.json: 1.0 → DSR-PDO-001 … Automation TCs only.
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

const url = (path: string, host = base()) => `${host}${path}`;
// PDO_ID override: the product id under test replaces the TD id; TD values are then not asserted.
const productId = (tdId: keyof typeof td) => pdoId() || td[tdId].id;
const valueSpecific = () => test.skip(!!pdoId(), `${needsTd} (PDO_ID=${pdoId()} override: TC asserts TD-586 data)`);

// Positive TDs only (01, 02): an overlay 'unavailable' row means the TD is not resolved → skip (see fixtures incomplete()).
const positive = (tdId: keyof typeof td) => tdId === '01' || tdId === '02';
function skipIfUnavailable(tdId: keyof typeof td, html: string, target: string) {
  const reason = html.match(unavailableRow)?.[1];
  observations.push({ url: target, unavailable: reason ?? null });
  test.skip(reason !== undefined && positive(tdId), incomplete(tdId, reason ?? ''));
}

async function status(request: APIRequestContext, target: string) {
  const response = await request.get(target, { maxRedirects: 0, failOnStatusCode: false });
  observations.push({ url: target, status: response.status(), location: response.headers().location ?? null });
  return response;
}

// Preflight: TD page 404 → skip (never fail on missing data).
async function openProduct(page: Page, lang: Language, tdId: keyof typeof td) {
  const detail = new ProductDetailPage(page);
  const target = url(productPath(lang, productId(tdId)));
  const response = await detail.goto(target);
  test.skip(response?.status() === 404, `${notSeeded(tdId)} (${target} HTTP 404)`);
  observations.push({ language: lang, url: target, finalUrl: page.url(), status: response?.status() });
  skipIfUnavailable(tdId, await (await page.request.get(target, { failOnStatusCode: false })).text(), target);
  return { detail, response, target };
}

async function rawProduct(request: APIRequestContext, lang: Language, tdId: keyof typeof td) {
  const target = url(productPath(lang, productId(tdId)));
  const response = await status(request, target);
  test.skip(response.status() === 404, `${notSeeded(tdId)} (${target} HTTP 404)`);
  const html = await response.text();
  skipIfUnavailable(tdId, html, target);
  return { response, target, html };
}

test.describe('DSR-586 product detail overlay', () => {
  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-PDO-001 [${lang}] live CF related → detail page shows name, code, images and specs`, { tag: ['@auto'] }, async ({ page, request }) => {
      const { detail, response, target } = await openProduct(page, lang, '01');
      expect(response?.status()).toBe(200);
      expect(page.url(), 'no redirect').toBe(target);
      if (pdoId()) {
        await expect(detail.name).not.toBeEmpty();
        await expect(detail.code).not.toBeEmpty();
        observations.push({ name: await detail.name.innerText(), code: await detail.code.innerText() });
        // Observation only: live tier of the same path (publish-to-live gap).
        await status(request, url(productPath(lang, pdoId()), hosts().live));
      } else {
        await expect(detail.name).toHaveText(td['01'].name);
        await expect(detail.code).toHaveText(td['01'].code);
      }
      const images = await detail.loadedImages();
      const specs = await detail.headings.allInnerTexts();
      observations.push({ images, specs });
      expect.soft(images.filter(i => i.naturalWidth > 0).length, '≥ 1 product image loaded').toBeGreaterThanOrEqual(1);
      // TestData: "fill any 3 spec fields" – values not fixed in the sheet; rows recorded for QA comparison with the CF commune.
      expect.soft(specs.length, 'spec sections rendered').toBeGreaterThanOrEqual(1);
    });
  }

  test('DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live', { tag: ['@auto'] }, async ({ request }) => {
    valueSpecific();
    const path = productPath('ja', td['02'].id);
    const preview = await status(request, url(path, hosts().page));
    test.skip(preview.status() === 404, `${notSeeded('02')} (${url(path, hosts().page)} HTTP 404)`);
    expect.soft(preview.status(), '.aem.page').toBe(200);
    expect.soft(await preview.text(), '.aem.page product name').toContain(td['02'].name);
    expect.soft((await status(request, url(path, hosts().live))).status(), '.aem.live').toBe(404);
  });

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-PDO-003 [${lang}] raw HTML (no JS) has name and description in body, title / description / og:image in head`, { tag: ['@auto'] }, async ({ request, browser }) => {
      const { response, html } = await rawProduct(request, lang, '01');
      expect(response.status()).toBe(200);
      const raw = await ProductDetailPage.parseRaw(browser, html);
      observations.push({ title: raw.title, description: raw.description, ogImage: raw.ogImage, rows: raw.rows });
      // PDO_ID: no TD values → expect the CF values the raw rows themselves carry (productName / description rows).
      const row = (key: string) => raw.rows.find(r => r.key === key)?.value.replace(/\s+/g, ' ') ?? '';
      const name = pdoId() ? row('productName') : td['01'].name;
      const description = pdoId() ? row('description') : td['01'].description;
      if (pdoId()) expect.soft(name, 'productName row').not.toBe('');
      if (pdoId()) expect.soft(description, 'description row').not.toBe('');
      expect.soft(raw.bodyText, 'body: product name').toContain(name);
      expect.soft(raw.bodyText, `body: first ${descriptionPrefix} chars of description`).toContain(description.slice(0, descriptionPrefix));
      expect.soft(raw.title, '<title>').toContain(name);
      expect.soft(raw.description?.trim() ?? '', 'meta description').not.toBe('');
      expect(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
      const og = await request.get(raw.ogImage!, { failOnStatusCode: false });
      observations.push({ ogImage: raw.ogImage, status: og.status(), contentType: og.headers()['content-type'] });
      expect.soft(og.status(), 'og:image HTTP').toBe(200);
      expect.soft(og.headers()['content-type'] ?? '', 'og:image content-type').toMatch(/^image\//);
    });
  }

  test('DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser', { tag: ['@auto'] }, async ({ page }) => {
    const requests: string[] = [];
    page.on('request', r => requests.push(r.url()));
    const { detail } = await openProduct(page, 'ja', '01');
    await page.waitForTimeout(settleMs);
    const graphql = requests.filter(u => graphqlPattern.test(u));
    observations.push({ requests: requests.length, graphql });
    expect.soft(graphql, 'requests to */graphql/* or */execute.json/*').toEqual([]);
    if (pdoId()) await expect(detail.name).not.toBeEmpty();
    else await expect(detail.name).toHaveText(td['01'].name);
  });

  test('DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages', { tag: ['@auto'] }, async ({ page }) => {
    const { detail } = await openProduct(page, 'ja', '01');
    await expect(detail.block, `${productId('01')}: product-detail block`).toBeVisible();

    if (seeded('05')) {
      const alpha = url(productPath('ja', td['05'].id));
      const response = await detail.goto(alpha);
      const blocks = await detail.block.count();
      observations.push({ url: alpha, status: response?.status(), blocks });
      expect.soft(response?.status(), `${td['05'].id} HTTP`).toBe(404);
      expect.soft(blocks, `${td['05'].id}: product-detail block`).toBe(0);
    } else {
      test.info().annotations.push({ type: 'not-verified', description: `${notSeeded('05')} (DSR586_SEEDED) – qa586-alpha step not run` });
    }

    const root = url(productsRoot('ja'));
    const response = await detail.goto(root);
    const blocks = await detail.block.count();
    observations.push({ url: root, status: response?.status(), blocks });
    expect.soft(blocks, '/ja/products/: product-detail block').toBe(0);
  });

  test('DSR-PDO-006 [ja] CF related in subfolder → no page (404)', { tag: ['@auto'] }, async ({ request }) => {
    valueSpecific();
    test.skip(!seeded('06'), `${notSeeded('06')} (negative TC: confirm via DSR586_SEEDED)`);
    for (const path of [productPath('ja', td['06'].id), `/ja/products/${td['06'].subfolder}/${td['06'].id}`]) {
      expect.soft((await status(request, url(path))).status(), path).toBe(404);
    }
  });

  test('DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live', { tag: ['@auto'] }, async ({ request }) => {
    valueSpecific();
    test.skip(!seeded('07'), `${notSeeded('07')} (negative TC: confirm via DSR586_SEEDED)`);
    const path = productPath('ja', td['07'].id);
    for (const host of [hosts().page, hosts().live]) expect.soft((await status(request, url(path, host))).status(), host).toBe(404);
  });

  test('DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list', { tag: ['@auto'] }, async ({ request, browser, page }) => {
    valueSpecific();
    const { response, html, target } = await rawProduct(request, 'ja', '08');
    expect.soft(response.status(), 'raw HTTP').toBe(200);
    const raw = await ProductDetailPage.parseRaw(browser, html);
    observations.push({ robots: raw.robots, rows: raw.rows });
    expect.soft(raw.robots ?? '', 'meta robots').toContain('noindex');

    const detail = new ProductDetailPage(page);
    await detail.goto(target);
    await page.waitForTimeout(redirectWaitMs);
    // Product list URL not confirmed (Q30): record exact final URL; assert the visitor left the detail page.
    observations.push({ finalUrl: page.url() });
    expect.soft(new URL(page.url()).pathname, 'final URL (product list – Q30)').not.toBe(new URL(target).pathname);
    expect.soft(await detail.name.count(), 'product name shown').toBe(0);
  });

  test('DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex', { tag: ['@auto'] }, async ({ request, browser, page }) => {
    valueSpecific();
    const { html, target } = await rawProduct(request, 'ja', '09');
    const raw = await ProductDetailPage.parseRaw(browser, html);
    observations.push({ robots: raw.robots, rows: raw.rows });
    expect.soft(raw.robots ?? '', 'meta robots').toContain('noindex');
    expect.soft(raw.rows.filter(r => r.key === 'unavailable').length, "'unavailable' rows").toBe(1);
    expect.soft(raw.rows.map(r => r.key), 'no productName row').not.toContain('productName');

    const detail = new ProductDetailPage(page);
    await detail.goto(target);
    await page.waitForTimeout(redirectWaitMs);
    observations.push({ finalUrl: page.url() });
    expect.soft(new URL(page.url()).pathname, 'final URL (same as 8.0 – Q30)').not.toBe(new URL(target).pathname);
    expect.soft(await detail.name.count(), 'product name shown').toBe(0);
  });

  test('DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index', { tag: ['@auto'] }, async ({ request }) => {
    valueSpecific();
    test.skip(!seeded('11'), `${notSeeded('11')} (negative TC: confirm via DSR586_SEEDED)`);
    const path = productPath('ja', td['11'].id);
    for (const host of [hosts().page, hosts().live]) expect.soft((await status(request, url(path, host))).status(), host).toBe(404);
    const index = await queryIndexPaths(request);
    expect.soft(index.includes(path), `${indexPath} contains ${path}`).toBe(false);
  });

  test('DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent', { tag: ['@auto'] }, async ({ request }) => {
    valueSpecific();
    const { response } = await rawProduct(request, 'ja', '01');
    expect(response.status()).toBe(200);
    const path = productPath('ja', td['01'].id);
    const preview = productPath('ja', td['02'].id);
    const index = await queryIndexPaths(request);
    const sitemap = await sitemapPaths(request);
    observations.push({ index: indexPath, indexEntries: index.length, sitemap: sitemapPath, sitemapEntries: sitemap.length });
    expect.soft(index, `${indexPath} contains ${path}`).toContain(path);
    expect.soft(sitemap, `${sitemapPath} contains ${path}`).toContain(path);
    if ((await status(request, url(preview, hosts().page))).status() === 200) {
      expect.soft(index, `${indexPath} must not contain ${preview}`).not.toContain(preview);
      expect.soft(sitemap, `${sitemapPath} must not contain ${preview}`).not.toContain(preview);
    } else {
      test.info().annotations.push({ type: 'not-verified', description: `${notSeeded('02')} – preview-only absence not checked` });
    }
  });

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-PDO-013 [${lang}] Contact button → inquiry page with product code (no submit)`, { tag: ['@auto'] }, async ({ page }) => {
      const { detail } = await openProduct(page, lang, '01');
      const contact = detail.contact.first();
      await expect(contact).toBeVisible();
      // PDO_ID: expected code = the code the page itself shows (no TD value).
      const expectedCode = pdoId() ? (await detail.code.first().innerText()).trim() : td['01'].code;
      const href = await contact.getAttribute('href');
      await contact.click();
      await page.waitForLoadState('networkidle').catch(() => undefined);
      // Inquiry target pending DSR-504: record final URL; product code may be a URL param or a field value. Never submit.
      // TODO: data-testid inquiry-product-code
      const field = page.locator('input[name*="productCode" i], input[name*="product-code" i], input[id*="productCode" i]').first();
      const fieldValue = (await field.count()) ? await field.inputValue() : null;
      observations.push({ href, finalUrl: page.url(), fieldValue });
      const finalParam = new URL(page.url()).searchParams.get('productCode');
      expect.soft(fieldValue ?? finalParam, 'product code (field or URL param)').toBe(expectedCode);
    });
  }

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-PDO-014 [${lang}] language variant: 200, html lang matches, product name present`, { tag: ['@auto'] }, async ({ page }) => {
      const { detail, response } = await openProduct(page, lang, '01');
      expect(response?.status()).toBe(200);
      const lang_ = await page.locator('html').getAttribute('lang');
      const name = await detail.name.first().innerText().catch(() => null);
      observations.push({ htmlLang: lang_, name });
      expect.soft(lang_, 'html lang').toBe(htmlLang[lang]);
      // Per-language TD name not in the TestData sheet ("en, cn copies"): recorded; the shared TD value is asserted.
      if (pdoId()) expect.soft(name?.trim() ?? '', 'product name').not.toBe('');
      else expect.soft(name, 'product name').toBe(td['01'].name);
    });
  }
  test.fixme('DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issue #18)', async () => {});

  test('DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent', { tag: ['@auto'] }, async ({ page, request, browser }) => {
    const { detail, target } = await openProduct(page, 'ja', '01');
    const text = await detail.block.innerText();
    const shownRemoved = removedFieldLabels.filter(f => text.includes(f));
    const literals = text.match(new RegExp(literalEmpty, 'g')) ?? [];
    observations.push({ shownRemoved, literals });
    expect.soft(shownRemoved, 'removed fields shown').toEqual([]);
    expect.soft(literals, "literal 'undefined' / 'null' in block text").toEqual([]);

    // Step 2: oracle = raw overlay row (CF value); TD-586-01 value cross-checked (TD ≠ CF = data, not product).
    const rows = await rawRows(request, browser, target);
    const tdValue: Record<string, string> = { productName: td['01'].name, productCode: td['01'].code, description: td['01'].description, ...td01.display };
    const rendered: string[] = [], notRendered: string[] = [], notInCf: string[] = [], tdMismatch: string[] = [];
    for (const field of displayFields) {
      const cf = rowValue(rows, field);
      if (!cf) { notInCf.push(field); continue; }
      if (!pdoId() && tdValue[field] && !squash(cf).includes(squash(tdValue[field]))) tdMismatch.push(`${field}: CF '${cf}' ≠ TD '${tdValue[field]}'`);
      const shown = field === 'colorVariationsPdf'
        ? (await detail.block.locator('a[href]').evaluateAll(as => as.map(a => decodeURIComponent((a as HTMLAnchorElement).href)))).some(h => h.includes(baseName(cf)))
        : squash(text).includes(squash(cf));
      (shown ? rendered : notRendered).push(field);
    }
    observations.push({ rendered, notRendered, notInCf, tdMismatch });
    // Spec 17.0: values not rendered are listed, Pending until design (Q29) – recorded, not failed.
    if (notRendered.length) test.info().annotations.push({ type: 'pending', description: `not rendered (design Q29): ${notRendered.join(', ')}` });
    if (notInCf.length) test.info().annotations.push({ type: 'not-verified', description: `no CF value (TD optional fields not filled): ${notInCf.join(', ')}` });
    if (tdMismatch.length) test.info().annotations.push({ type: 'data', description: tdMismatch.join(' · ') });
    expect.soft(rendered, 'productName / productCode rendered').toEqual(expect.arrayContaining(['productName', 'productCode']));
  });

  test('DSR-PDO-020 [ja] ver0.4 new fields – current state recorded (Blocked: no design)', { tag: ['@auto'] }, async ({ page, request, browser }) => {
    const { detail, target } = await openProduct(page, 'ja', '01');
    const text = squash(await detail.block.innerText());
    const srcs = await detail.block.locator('img').evaluateAll(is => is.map(i => decodeURIComponent((i as HTMLImageElement).currentSrc || (i as HTMLImageElement).src)));
    const rows = await rawRows(request, browser, target);
    const state = await Promise.all(newFields.map(async field => {
      const cf = rowValue(rows, field);
      const image = /Image$/.test(field);
      const rendered = !!cf && (image ? srcs.some(s => s.includes(baseName(cf))) : text.includes(squash(cf)));
      const images = image && rendered ? await detail.block.locator('img').evaluateAll((is, b) => is
        .filter(i => decodeURIComponent((i as HTMLImageElement).currentSrc || (i as HTMLImageElement).src).includes(b))
        .map(i => (i as HTMLImageElement).naturalWidth), baseName(cf)) : [];
      return { field, cf: cf || null, td: pdoId() ? null : td01.newValues[field] ?? null, rendered, naturalWidths: images };
    }));
    observations.push({ newFields: state });
    test.skip(true, `${noNewFieldDesign}: rendered ${state.filter(s => s.rendered).map(s => s.field).join(', ') || 'none'}`);
  });

  test('DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images', { tag: ['@auto'] }, async ({ page, request, browser }) => {
    const failed: string[] = [];
    const media = (type: string) => type === 'image' || type === 'media';
    page.on('requestfailed', r => { if (media(r.resourceType())) failed.push(`${r.url()} ${r.failure()?.errorText ?? ''}`); });
    page.on('response', r => { if (media(r.request().resourceType()) && r.status() >= 400) failed.push(`${r.url()} HTTP ${r.status()}`); });
    const { detail, target } = await openProduct(page, 'ja', '01');
    const rows = await rawRows(request, browser, target);
    const filled = [...new Set(rows.map(r => r.key.match(/^(media\d{2})(Asset|Url)$/)?.[1]).filter((m): m is string => !!m))].sort();
    const external = filled.filter(m => /external/i.test(rowValue(rows, `${m}Type`)));
    await detail.gallery.scrollIntoViewIfNeeded().catch(() => undefined);
    await page.waitForTimeout(settleMs);
    const items = await detail.thumbs.evaluateAll(ts => ts.map(t => t.getAttribute('data-media') ?? ''));
    const images = await detail.images.evaluateAll(is => is.map(i => ({
      src: (i as HTMLImageElement).currentSrc, complete: (i as HTMLImageElement).complete, naturalWidth: (i as HTMLImageElement).naturalWidth })));
    observations.push({ filled, external, items, images, failed, stageSrc: images[0]?.src ?? null });
    if (!pdoId() && filled.join() !== td01.media.join()) {
      test.info().annotations.push({ type: 'data', description: `filled slots ${filled.join(',')} ≠ TD-586-01 ${td01.media.join(',')}` });
    }
    expect.soft(items[0], 'first gallery item').toBe('media01');
    // Spec 21.0: External may be shown as a link instead of a gallery item → recorded, not failed.
    const missing = filled.filter(m => !items.includes(m));
    if (missing.some(m => external.includes(m))) test.info().annotations.push({ type: 'record', description: `External slot not a gallery item: ${missing.filter(m => external.includes(m)).join(', ')}` });
    expect.soft(missing.filter(m => !external.includes(m)), 'filled slots without gallery item').toEqual([]);
    expect.soft(items.filter(m => !filled.includes(m)), 'gallery items for empty slots').toEqual([]);
    expect.soft(images.filter(i => i.complete && i.naturalWidth === 0).map(i => i.src), 'broken images (naturalWidth 0)').toEqual([]);
    expect.soft(failed, 'failed media requests').toEqual([]);
  });

  test('DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page', { tag: ['@auto'] }, async ({ page }) => {
    const { detail, response } = await openProduct(page, 'ja', '01');
    expect(response?.status()).toBe(200);
    await expect(detail.block).toBeVisible();
    // DSR-457 not marked fixed (BUGS.md: In Testing) → items 3 / 7 / 13 are record-only, never Fail here.
    const record = {
      item3ToolbarIcons: await detail.toolbarIcons.count(),
      item7PlayIconsVisible: await detail.playIcons.filter({ visible: true }).count(),
      item13MovieLinks: await detail.movieLinks.evaluateAll(as => as.map(a => (a as HTMLAnchorElement).href)),
      relatedCards: await detail.relatedCards.evaluateAll(as => as.map(a => a.getAttribute('href') ?? '')),
    };
    observations.push(record);
    // DSR-538 regression: related card links are EDS paths, not the AEM publish domain.
    expect.soft(record.relatedCards.filter(h => publishHost.test(h)), 'related cards → publish domain').toEqual([]);
    // Items 2/4/5/9/11/12: check definitions are in QA-PT evidence (BUGS.md), not in the repo → not verified here.
    test.info().annotations.push({ type: 'not-verified', description: 'DSR-457 items 2/4/5/9/11/12: check definitions not in repo' });
  });
});

// Raw overlay rows (JS disabled) – the CF values json2html delivered for this page.
async function rawRows(request: APIRequestContext, browser: Browser, target: string) {
  return (await ProductDetailPage.parseRaw(browser, await (await request.get(target, { failOnStatusCode: false })).text())).rows;
}
const rowValue = (rows: { key: string; value: string }[], key: string) => rows.filter(r => r.key === key).map(r => r.value.replace(/\s+/g, ' ').trim()).join(' ').trim();
const squash = (v: string) => v.replace(/\s+/g, '');
const baseName = (path: string) => decodeURIComponent(path.split('/').pop() ?? '').replace(/\.[a-z0-9]+$/i, '');

async function queryIndexPaths(request: APIRequestContext) {
  const paths: string[] = [];
  for (let offset = 0; ; offset += 500) {
    const response = await request.get(url(`${indexPath}?offset=${offset}&limit=500`), { failOnStatusCode: false });
    if (!response.ok()) break;
    const body = await response.json() as { total: number; data: { path: string }[] };
    paths.push(...body.data.map(d => d.path));
    if (offset + 500 >= body.total || !body.data.length) break;
  }
  return paths;
}

async function sitemapPaths(request: APIRequestContext) {
  const response = await request.get(url(sitemapPath), { failOnStatusCode: false });
  if (!response.ok()) return [];
  return [...(await response.text()).matchAll(/<loc>([^<]+)<\/loc>/g)].map(m => new URL(m[1]).pathname);
}
