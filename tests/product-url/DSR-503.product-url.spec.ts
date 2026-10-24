import { test, expect, type APIRequestContext } from '@playwright/test';
import { ProductUrlPage } from '../../pages/ProductUrlPage';
import { ProductDetailPage } from '../../pages/ProductDetailPage';
import {
  type Language, languages, base, productPath, productPageQuery, td, malformed, reloads, blockedCn, blockedList, blockedAuthor,
} from '../../fixtures/dsr-503';

// DSR-503 product detail URL by product id (scaffold, JOB-ZZ-IDLE-44). Spec ids from ykk-dsr/hub/tc-out/DSR-503.spec.json:
// 1.0 → DSR-PURL-001 … 9.0 → DSR-PURL-009. Read-only. Baseline BL-OVL-1 (URL id = DSR CF node name).
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

const url = (path: string) => `${base()}${path}`;

// CF oracle (publish persisted query). No live related CF → data missing → skip, never fail.
async function cfProduct(request: APIRequestContext, lang: Language, id: string) {
  const query = productPageQuery(lang, id);
  const response = await request.get(query, { failOnStatusCode: false });
  const json = response.ok() ? await response.json().catch(() => null) : null;
  const product = json?.data?.related?.items?.[0]?.product ?? null;
  observations.push({ query, status: response.status(), productCode: product?.productCode ?? null, productName: product?.productName ?? null });
  test.skip(!product?.productCode, `TD-503 product ${id} [${lang}] has no live DSR CF (data)`);
  return { code: String(product.productCode), name: String(product.productName ?? '') };
}

async function openProduct(page: import('@playwright/test').Page, lang: string, id: string) {
  const view = new ProductUrlPage(page);
  const target = url(productPath(lang, id));
  const response = await view.goto(target);
  observations.push({ url: target, finalUrl: page.url(), status: response?.status() ?? null });
  return { view, target, response };
}

test.describe('DSR-503 product detail URL by product id', () => {
  for (const lang of languages) {
    test(`DSR-PURL-001 [${lang}] /{lang}/products/{id} returns 200 without redirect and shows the CF product`, { tag: ['@auto'] }, async ({ page, request }) => {
      const cf = await cfProduct(request, lang, td['01'].id);
      const target = url(productPath(lang, td['01'].id));
      const raw = await ProductUrlPage.rawStatus(request, target);
      observations.push(raw);
      expect(raw.status, 'raw status, no redirect').toBe(200);
      const { view, response } = await openProduct(page, lang, td['01'].id);
      expect(response?.status()).toBe(200);
      expect(new URL(page.url()).pathname, 'final path').toBe(productPath(lang, td['01'].id));
      await expect(view.detail.code).toHaveText(cf.code);
    });
  }
  test('DSR-PURL-001 [cn] /cn/products/{id} returns 200', { tag: ['@blocked'] }, () => test.fixme(true, blockedCn));

  test('DSR-PURL-002 [ja,en] same id resolves under every language with only {lang} different', { tag: ['@auto'] }, async ({ page, request }) => {
    const codes: string[] = [];
    for (const lang of languages) {
      const cf = await cfProduct(request, lang, td['01'].id);
      const { view, response } = await openProduct(page, lang, td['01'].id);
      expect(response?.status(), `${lang} status`).toBe(200);
      const lang_ = await view.htmlLang();
      observations.push({ lang, htmlLang: lang_ });
      expect.soft(lang_, `${lang} html lang`).toBe(lang);
      await expect(view.detail.code).toHaveText(cf.code);
      codes.push((await view.product()).code);
    }
    expect(new Set(codes).size, `product code identical across languages: ${codes.join(' / ')}`).toBe(1);
    // TODO: add cn when /cn exists on DEV (Issue #18).
  });

  test('DSR-PURL-003 [ja] two ids → two fixed URLs, stable across reloads', { tag: ['@auto'] }, async ({ page, request }) => {
    const seen: Record<string, string> = {};
    for (const tdId of ['01', '02'] as const) {
      const cf = await cfProduct(request, 'ja', td[tdId].id);
      const { view, response } = await openProduct(page, 'ja', td[tdId].id);
      expect(response?.status()).toBe(200);
      for (let i = 0; i <= reloads; i++) {
        if (i > 0) await page.reload();
        await expect(view.detail.code, `TD-503-${tdId} load ${i + 1}`).toHaveText(cf.code);
      }
      seen[tdId] = cf.code;
    }
    expect(seen['01'], 'two products differ').not.toBe(seen['02']);
  });

  for (const lang of languages) {
    test(`DSR-PURL-004 [${lang}] product list card href follows /{lang}/products/{id}`, { tag: ['@blocked'] }, () => {
      // TODO: data-testid product-card; list page = fixtures/paths.ts productList once Q20 is answered.
      test.fixme(true, blockedList);
    });
  }

  test('DSR-PURL-005 [ja] unknown id → 404, no product block', { tag: ['@auto'] }, async ({ page, request }) => {
    const raw = await ProductUrlPage.rawStatus(request, url(productPath('ja', td['03'].id)));
    observations.push(raw);
    expect(raw.status).toBe(404);
    const { view } = await openProduct(page, 'ja', td['03'].id);
    await expect(view.detail.code).toHaveCount(0);
  });

  test('DSR-PURL-006 [ja] malformed ids → 404 (trailing slash 404 or 301 to canonical)', { tag: ['@auto'] }, async ({ request }) => {
    await cfProduct(request, 'ja', td['01'].id);
    const canonical = productPath('ja', td['01'].id);
    for (const [name, path] of Object.entries(malformed(td['01'].id))) {
      const raw = await ProductUrlPage.rawStatus(request, url(path));
      observations.push({ case: name, ...raw });
      if (name === 'trailingSlash') {
        // A4: both accepted; observed behaviour recorded in the attachment.
        const ok = raw.status === 404 || (raw.status === 301 && !!raw.location && new URL(raw.location, base()).pathname === canonical);
        expect.soft(ok, `${name} ${path}: ${raw.status} ${raw.location ?? ''}`).toBe(true);
      } else {
        expect.soft(raw.status, `${name} ${path}`).toBe(404);
      }
    }
  });

  for (const lang of languages) {
    test(`DSR-PURL-007 [${lang}] raw HTML contains product name + code; canonical / og:url end with the URL`, { tag: ['@auto'] }, async ({ request, browser }) => {
      const cf = await cfProduct(request, lang, td['01'].id);
      const target = url(productPath(lang, td['01'].id));
      const response = await request.get(target, { maxRedirects: 0, failOnStatusCode: false });
      expect(response.status()).toBe(200);
      const html = await response.text();
      const head = ProductUrlPage.rawHead(html);
      const doc = await ProductDetailPage.parseRaw(browser, html);
      observations.push({ url: target, ...head, codeInRaw: doc.bodyText.includes(cf.code), nameInRaw: doc.bodyText.includes(cf.name) });
      expect.soft(doc.bodyText, 'product code in raw HTML').toContain(cf.code);
      expect.soft(doc.bodyText, 'product name in raw HTML').toContain(cf.name);
      const suffix = productPath(lang, td['01'].id);
      if (head.canonical !== null) expect.soft(new URL(head.canonical).pathname, 'canonical').toBe(suffix);
      expect.soft(head.ogUrl, 'og:url present').not.toBeNull();
      if (head.ogUrl) expect.soft(new URL(head.ogUrl).pathname, 'og:url').toBe(suffix);
    });
  }

  test('DSR-PURL-008 [ja] CF id field drives the URL (Author read)', { tag: ['@manual'] }, () => test.fixme(true, blockedAuthor));
  test('DSR-PURL-009 [ja] page not created on CF save, only after publish', { tag: ['@manual'] }, () =>
    test.fixme(true, `${blockedAuthor}; needs Author write TD-503-04 (QA-PT)`));
});
