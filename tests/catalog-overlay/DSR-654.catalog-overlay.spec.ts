import { test, expect, type APIRequestContext, type Browser } from '@playwright/test';
import { CatalogDetailPage } from '../../pages/CatalogDetailPage';
import {
  type Language, base, hosts, catalogPath, searchPath, dsrCfPath, td, tdKeys, td654, coreTdId, ebookUrl, notSeeded,
  seedUnverifiable, siteTitleSuffix, listPath, redirectWaitMs, graphqlPattern, indexPath, sitemapPath, htmlLang,
  dateFormat, formPending, manualPending, visualPending, cnPending,
} from '../../fixtures/dsr-654';

// DSR-654 catalog detail via overlay + json2html. TC sheet: ykk-dsr/hub/tc-out/DSR-654.spec.json (TC N.0 = DSR-CATOV-00N),
// baseline BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + DSR-570/557/655. Read-only: never submits the form.
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

const url = (path: string, host = base()) => `${host}${path}`;

async function status(request: APIRequestContext, target: string) {
  const response = await request.get(target, { maxRedirects: 0, failOnStatusCode: false });
  observations.push({ url: target, status: response.status(), location: response.headers().location ?? null });
  return response;
}

// Preflight: TD page 404 where 200 expected → skip (never fail on missing data).
async function rawCatalog(request: APIRequestContext, lang: Language, id: string, tdId = coreTdId, host = base()) {
  const target = url(catalogPath(lang, id), host);
  const response = await status(request, target);
  test.skip(response.status() === 404, `${notSeeded(tdId, id)} (${target} HTTP 404)`);
  return { response, target, html: await response.text() };
}

// Static HTML read in a JS-disabled context. Block rows: <div class="catalog-detail"><div><div>key</div><div>value</div></div>…
async function parseRaw(browser: Browser, html: string) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    return await page.evaluate(() => {
      const meta = (sel: string) => document.querySelector<HTMLMetaElement>(sel)?.content ?? null;
      const rows = [...document.querySelectorAll('main .catalog-detail > div')].map(row => {
        const cells = [...row.children] as HTMLElement[];
        return { key: (cells[0]?.textContent ?? '').trim(), value: (cells[1]?.textContent ?? '').trim() };
      });
      return {
        title: document.title,
        description: meta('meta[name="description"]'),
        robots: meta('meta[name="robots"]'),
        ogImage: meta('meta[property="og:image"]'),
        cfPath: meta('meta[name="cf-path"]'),
        rows,
      };
    });
  } finally {
    await context.close();
  }
}

const row = (rows: { key: string; value: string }[], key: string) => rows.find(r => r.key === key)?.value ?? null;
// Attribute values pointing at a PDF file (href/src/data-*), for the "PDF URL not exposed" check.
const pdfRefs = (html: string) => [...html.matchAll(/=\s*["']([^"']*\.pdf(?:[?#][^"']*)?)["']/gi)].map(m => m[1]);

// TC 5.0 / 14.0: noindex + 'unavailable' row, browser sent to the catalog list (BL-OVL-1).
async function expectSentToList(
  request: APIRequestContext, browser: Browser, page: import('@playwright/test').Page,
  lang: Language, data: { tdId: string; id: string }, singleUnavailable: boolean,
) {
  const { html, target } = await rawCatalog(request, lang, data.id, data.tdId);
  const raw = await parseRaw(browser, html);
  observations.push({ robots: raw.robots, rows: raw.rows });
  expect.soft(raw.robots ?? '', 'meta robots').toContain('noindex');
  expect.soft(raw.rows.map(r => r.key), "'unavailable' row").toContain('unavailable');
  if (singleUnavailable) {
    expect.soft(raw.rows.filter(r => r.key === 'unavailable'), "single 'unavailable' row").toHaveLength(1);
    expect.soft(raw.rows.map(r => r.key), 'no catalogTitle row').not.toContain('catalogTitle');
  }
  await page.goto(target);
  await page.waitForTimeout(redirectWaitMs);
  observations.push({ finalUrl: page.url() });
  expect.soft(new URL(page.url()).pathname, 'final URL = catalog list').toMatch(new RegExp(`^${listPath(lang)}(/search)?/?$`));
  await expect.soft(new CatalogDetailPage(page).title, 'catalog title not shown').toHaveCount(0);
}

test.describe('DSR-654 catalog detail overlay', () => {
  for (const lang of ['ja', 'en'] as const) {
    for (const key of tdKeys) {
      const data = td[key];

      test(`DSR-CATOV-001 [${lang}] ${data.id}: publishing DSR CF creates the catalog detail page with the catalog name shown`, { tag: ['@auto'] }, async ({ page }) => {
        const catalog = new CatalogDetailPage(page);
        const target = url(catalogPath(lang, data.id));
        const response = await catalog.goto(target);
        observations.push({ url: target, finalUrl: page.url(), status: response?.status(), title: await page.title() });
        test.skip(response?.status() === 404, `${notSeeded(coreTdId, data.id)} (${target} HTTP 404)`);
        expect(response?.status()).toBe(200);
        expect(page.url(), 'no redirect').toBe(target);
        await expect(catalog.title).toHaveText(data.title);
        expect.soft(await page.title(), '<title> starts with catalog name').toMatch(new RegExp(`^${data.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}`));
        // requiresForm = true → download form shown on the detail page (DSR-570 / DSR-655 Y3).
        await expect.soft(catalog.form, 'form slot').toHaveCount(data.requiresForm ? 1 : 0);
      });

      test(`DSR-CATOV-002 [${lang}] ${data.id}: static HTML carries title, description, og:image and the content CF rows with the same id`, { tag: ['@auto'] }, async ({ request, browser }) => {
        const { response, html } = await rawCatalog(request, lang, data.id);
        expect(response.status()).toBe(200);
        const raw = await parseRaw(browser, html);
        observations.push(raw);
        expect.soft(raw.title, '<title>').toBe(`${data.title}${siteTitleSuffix}`);
        expect.soft(raw.description ?? '', 'meta description').not.toBe('');
        expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
        expect.soft(raw.robots ?? '', 'meta robots').not.toContain('noindex');
        // Directory-strict: DSR CF directly under /content/dam/dsr/{lang}/catalogs/, name = URL id.
        expect.soft(raw.cfPath, 'meta cf-path').toBe(dsrCfPath(lang, data.id));
        expect.soft(row(raw.rows, 'source'), 'row source').toBe('overlay');
        expect.soft(row(raw.rows, 'cfPath'), 'row cfPath').toBe(dsrCfPath(lang, data.id));
        // 1 content CF ⇒ 1 DSR CF same id: catalogId (= node name) comes from the content CF.
        expect.soft(row(raw.rows, 'catalogId'), 'row catalogId (content CF)').toBe(data.id);
        expect.soft(row(raw.rows, 'catalogTitle'), 'row catalogTitle').toBe(data.title);
        expect.soft(row(raw.rows, 'catalogType'), 'row catalogType').toBe(data.catalogType);
        expect.soft(row(raw.rows, 'requiresForm'), 'row requiresForm').toBe(String(data.requiresForm));
        expect.soft(raw.rows.map(r => r.key), 'no unavailable row').not.toContain('unavailable');
      });

      test(`DSR-CATOV-003 [${lang}] ${data.id}: live-published catalog is served on .aem.page and .aem.live`, { tag: ['@auto'] }, async ({ request }) => {
        const path = catalogPath(lang, data.id);
        const page = (await status(request, url(path, hosts().page))).status();
        const live = (await status(request, url(path, hosts().live))).status();
        test.skip(page === 404 && live === 404, `${notSeeded(coreTdId, data.id)} (${path} HTTP 404 on .aem.page and .aem.live)`);
        expect.soft(page, '.aem.page').toBe(200);
        expect.soft(live, '.aem.live').toBe(200);
      });

      test(`DSR-CATOV-021 [${lang}] ${data.id}: live page listed once in query-index and sitemap`, { tag: ['@auto'] }, async ({ request }) => {
        const live = hosts().live;
        const path = catalogPath(lang, data.id);
        await rawCatalog(request, lang, data.id, coreTdId, live);
        const index = await status(request, url(indexPath, live));
        const paths: string[] = index.ok() ? ((await index.json())?.data ?? []).map((r: { path?: string }) => r.path) : [];
        expect.soft(index.status(), 'query-index HTTP').toBe(200);
        expect.soft(paths.filter(p => p === path), 'query-index rows').toHaveLength(1);
        // sitemap.xml may be a sitemap index → read its children.
        const locs: string[] = [];
        const sitemap = await status(request, url(sitemapPath, live));
        expect.soft(sitemap.status(), 'sitemap HTTP').toBe(200);
        const xml = sitemap.ok() ? await sitemap.text() : '';
        const locsOf = (text: string) => [...text.matchAll(/<loc>\s*([^<]+?)\s*<\/loc>/g)].map(m => m[1]);
        if (/<sitemapindex/i.test(xml)) {
          for (const child of locsOf(xml)) {
            const res = await status(request, child);
            if (res.ok()) locs.push(...locsOf(await res.text()));
          }
        } else {
          locs.push(...locsOf(xml));
        }
        observations.push({ indexRows: paths.filter(p => p === path).length, sitemapLocs: locs.filter(l => l.endsWith(path)) });
        expect.soft(locs.filter(l => new URL(l).pathname === path), 'sitemap <loc>').toHaveLength(1);
      });
    }

    test(`DSR-CATOV-004 [${lang}] naming rule: uppercase / underscore catalog URL → 404`, { tag: ['@auto'] }, async ({ request }) => {
      // Precondition: the lowercase page exists on this host, so a 404 on the variant comes from the regex.
      const { id } = td.pdf;
      await rawCatalog(request, lang, id);
      for (const variant of [id.toUpperCase(), id.replace(/-/g, '_'), id[0].toUpperCase() + id.slice(1)]) {
        expect.soft((await status(request, url(catalogPath(lang, variant)))).status(), variant).toBe(404);
      }
    });

    test(`DSR-CATOV-005 [${lang}] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list`, { tag: ['@auto'] }, async ({ request, browser, page }) => {
      // BL-OVL-1 expectation kept (redirect to list); A4.
      await expectSentToList(request, browser, page, lang, td654.inactive, false);
    });

    test(`DSR-CATOV-006 [${lang}] unpublished DSR CF → 404 on both hosts, removed from query-index`, { tag: ['@auto'] }, async ({ request }) => {
      const data = td654.removed;
      test.skip(!(data.langs as readonly string[]).includes(lang), `${data.tdId} exists in ${data.langs.join(', ')} only (A7)`);
      test.info().annotations.push({ type: 'note', description: seedUnverifiable(data.tdId) });
      const path = catalogPath(lang, data.id);
      for (const host of [hosts().page, hosts().live]) expect.soft((await status(request, url(path, host))).status(), host).toBe(404);
      const index = await status(request, url(indexPath));
      const paths: string[] = index.ok() ? ((await index.json())?.data ?? []).map((r: { path?: string }) => r.path) : [];
      expect.soft(index.status(), 'query-index HTTP').toBe(200);
      expect.soft(paths.filter(p => p?.endsWith(`/catalog/${data.id}`)), 'query-index paths').toEqual([]);
    });

    test(`DSR-CATOV-007 [${lang}] catalog/search is not taken by the overlay`, { tag: ['@auto'] }, async ({ request, page }) => {
      const target = url(searchPath(lang));
      const raw = await (await status(request, target)).text();
      const response = await page.goto(target);
      // Status = the Sites page status (200 if the page exists, else site 404); recorded, not asserted.
      observations.push({ url: target, finalUrl: page.url(), status: response?.status() });
      test.info().annotations.push({ type: 'observed', description: `${target} HTTP ${response?.status()}` });
      await expect.soft(page.locator('main .catalog-detail'), 'catalog-detail block').toHaveCount(0);
      expect.soft(raw, "no 'unavailable' row").not.toMatch(/<div>\s*unavailable\s*<\/div>/);
    });

    test(`DSR-CATOV-008 [${lang}] catalog detail page makes 0 GraphQL requests; html lang matches the site`, { tag: ['@auto'] }, async ({ request, page }) => {
      // Form-gated id: an open catalog leaves the page for its file (catalog-link.js), so no page to inspect.
      const { id } = td.pdfForm;
      await rawCatalog(request, lang, id);
      const graphql: string[] = [];
      page.on('request', r => { if (graphqlPattern.test(r.url())) graphql.push(r.url()); });
      await page.goto(url(catalogPath(lang, id)), { waitUntil: 'networkidle' });
      const actualLang = await page.locator('html').getAttribute('lang');
      observations.push({ graphql, htmlLang: actualLang });
      expect.soft(graphql, 'requests to */graphql/* or */execute.json/*').toEqual([]);
      expect.soft(actualLang, 'html lang').toBe(htmlLang[lang]);
    });

    test(`DSR-CATOV-012 [${lang}] catalog list card links to the overlay page`, { tag: ['@auto'] }, async ({ request, page }) => {
      const data = td.pdf;
      await rawCatalog(request, lang, data.id);
      const list = url(listPath(lang));
      const response = await page.goto(list, { waitUntil: 'networkidle' });
      observations.push({ url: list, status: response?.status() });
      test.skip(response?.status() === 404, `catalog list not published (${list} HTTP 404, DSR-638)`);
      // TODO: data-testid catalog-card
      const card = page.locator('main a[href]').filter({ hasText: data.title }).first();
      await expect(card, `card '${data.title}'`).toBeVisible();
      const href = (await card.getAttribute('href')) ?? '';
      const resolved = new URL(href, list);
      observations.push({ href });
      expect.soft(resolved.pathname, 'href path').toBe(catalogPath(lang, data.id));
      expect.soft(resolved.origin, 'same host, no publish host').toBe(new URL(list).origin);
      await page.goto(resolved.href);
      expect.soft(page.url(), 'target not redirected').toBe(resolved.href);
      await expect.soft(new CatalogDetailPage(page).title, 'same catalog name').toHaveText(data.title);
    });

    test(`DSR-CATOV-015 [${lang}] PDF, requiresForm OFF → download opens the PDF directly`, { tag: ['@auto'] }, async ({ request, page }) => {
      const data = td.pdf;
      const { target } = await rawCatalog(request, lang, data.id);
      const catalog = new CatalogDetailPage(page);
      await catalog.goto(target).catch(e => observations.push({ gotoError: String(e) }));
      await page.waitForTimeout(redirectWaitMs);
      observations.push({ finalUrl: page.url() });
      await expect(catalog.action, 'download button').toBeVisible();
      const href = (await catalog.action.getAttribute('href')) ?? '';
      observations.push({ href });
      expect.soft(new URL(href, target).pathname, 'href ends with .pdf').toMatch(/\.pdf$/i);
      const file = await request.get(new URL(href, target).href, { failOnStatusCode: false });
      observations.push({ fileStatus: file.status(), contentType: file.headers()['content-type'] });
      expect.soft(file.status(), 'PDF HTTP').toBe(200);
      expect.soft(file.headers()['content-type'] ?? '', 'content-type').toContain('application/pdf');
      await expect.soft(catalog.form, 'no form').toHaveCount(0);
    });

    test(`DSR-CATOV-016 [${lang}] PDF, requiresForm ON → form first, PDF URL not exposed`, { tag: ['@auto'] }, async ({ request, page }) => {
      const data = td.pdfForm;
      const { target, html } = await rawCatalog(request, lang, data.id);
      const catalog = new CatalogDetailPage(page);
      await catalog.goto(target);
      await expect(catalog.block, 'catalog-detail block').toBeVisible();
      // Never submitted (read-only).
      const formCount = await catalog.form.count();
      const actionHref = (await catalog.action.count()) ? (await catalog.action.first().getAttribute('href')) ?? '' : null;
      const dom = await page.content();
      const exposed = { html: pdfRefs(html), dom: pdfRefs(dom), pdfAssetRow: /<div>\s*pdfAsset\s*<\/div>/.test(html) };
      observations.push({ formCount, actionHref, exposed });
      expect.soft(formCount > 0 || actionHref !== null, 'form shown (or a button leading to it)').toBe(true);
      if (actionHref !== null) expect.soft(actionHref, 'button href not a PDF').not.toMatch(/\.pdf([?#]|$)/i);
      expect.soft(exposed.html, 'PDF path in raw HTML').toEqual([]);
      expect.soft(exposed.dom, 'PDF path in DOM').toEqual([]);
      expect.soft(exposed.pdfAssetRow, 'pdfAsset row in raw HTML').toBe(false);
    });

    test(`DSR-CATOV-017 [${lang}] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form`, { tag: ['@auto'] }, async ({ request, page }) => {
      const data = td.ebook;
      const { target } = await rawCatalog(request, lang, data.id);
      const catalog = new CatalogDetailPage(page);
      await catalog.goto(target).catch(e => observations.push({ gotoError: String(e) }));
      await page.waitForTimeout(redirectWaitMs);
      observations.push({ finalUrl: page.url() });
      await expect(catalog.action, 'view button').toBeVisible();
      observations.push({ href: await catalog.action.getAttribute('href'), target: await catalog.action.getAttribute('target') });
      await expect.soft(catalog.action, 'href = ebookUrl').toHaveAttribute('href', ebookUrl);
      await expect.soft(catalog.action, 'target').toHaveAttribute('target', '_blank');
      await expect.soft(catalog.form, 'no form').toHaveCount(0);
    });

    test(`DSR-CATOV-018 [${lang}] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl)`, { tag: ['@auto'] }, async ({ request, page }) => {
      const data = td.ebookForm;
      const { target } = await rawCatalog(request, lang, data.id);
      const catalog = new CatalogDetailPage(page);
      await catalog.goto(target).catch(e => observations.push({ gotoError: String(e) }));
      await page.waitForTimeout(redirectWaitMs);
      const formCount = await catalog.form.count();
      observations.push({ finalUrl: page.url(), formCount });
      // A5: a form shown = Pending until DSR-655 Y3 is answered, never Fail.
      if (formCount > 0) {
        test.info().annotations.push({ type: 'pending', description: formPending });
        test.skip(true, formPending);
      }
      await expect(catalog.action, 'view button').toBeVisible();
      await expect.soft(catalog.action, 'href = ebookUrl').toHaveAttribute('href', ebookUrl);
      await expect.soft(catalog.action, 'target').toHaveAttribute('target', '_blank');
    });

    test(`DSR-CATOV-019 [${lang}] catalog detail shows image, name, description, date and type label of the content CF`, { tag: ['@auto'] }, async ({ request, browser, page }) => {
      const data = td.pdf;
      const { target, html } = await rawCatalog(request, lang, data.id);
      const raw = await parseRaw(browser, html);
      const catalog = new CatalogDetailPage(page);
      await catalog.goto(target);
      await expect(catalog.block, 'catalog-detail block').toBeVisible();
      const naturalWidth = await catalog.image.first().evaluate((img: HTMLImageElement) => img.naturalWidth).catch(() => 0);
      const publishDate = row(raw.rows, 'publishDate') ?? '';
      observations.push({ finalUrl: page.url(), naturalWidth, rows: raw.rows });
      expect.soft(naturalWidth, 'image naturalWidth').toBeGreaterThan(0);
      await expect.soft(catalog.title, 'name = catalogTitle').toHaveText(data.title);
      await expect.soft(catalog.description, 'description = content CF').toHaveText(row(raw.rows, 'description') ?? '');
      await expect.soft(catalog.date, 'date YYYY.MM.DD').toHaveText(dateFormat);
      await expect.soft(catalog.date, 'date = publishDate').toHaveText(publishDate.slice(0, 10).replace(/-/g, '.'));
      await expect.soft(catalog.typeLabel, 'type label').not.toHaveText('');
    });

    test(`DSR-CATOV-020 [${lang}] layout PC 1440 / SP 375 vs pre-overlay demo`, () => { test.fixme(true, visualPending); });
  }

  // en-only TDs (A7).
  test('DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live', { tag: ['@auto'] }, async ({ request }) => {
    const data = td654.preview;
    const path = catalogPath('en', data.id);
    const { html } = await rawCatalog(request, 'en', data.id, data.tdId, hosts().page);
    expect.soft(html, `'${data.title}' on .aem.page`).toContain(data.title);
    expect.soft((await status(request, url(path, hosts().live))).status(), '.aem.live').toBe(404);
  });

  test('DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict)', { tag: ['@auto'] }, async ({ request }) => {
    const data = td654.sub;
    test.info().annotations.push({ type: 'note', description: seedUnverifiable(data.tdId) });
    for (const host of [hosts().page, hosts().live]) {
      expect.soft((await status(request, url(catalogPath('en', data.id), host))).status(), `${host} ${data.id}`).toBe(404);
    }
    expect.soft((await status(request, url(`/en/library/catalog/${data.folder}/${data.id}`))).status(), `${data.folder}/${data.id}`).toBe(404);
  });

  test('DSR-CATOV-011 [en] content CF only (no DSR CF) → no page', { tag: ['@auto'] }, async ({ request }) => {
    const data = td654.contentOnly;
    test.info().annotations.push({ type: 'note', description: seedUnverifiable(data.tdId) });
    for (const host of [hosts().page, hosts().live]) {
      expect.soft((await status(request, url(catalogPath('en', data.id), host))).status(), host).toBe(404);
    }
  });

  test('DSR-CATOV-013 [en] content CF change shows only after DSR CF republish', () => { test.fixme(true, manualPending); });

  test('DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list', { tag: ['@auto'] }, async ({ request, browser, page }) => {
    // BL-OVL-1 expectation kept (redirect to list), same as 005.
    await expectSentToList(request, browser, page, 'en', td654.contentUnpub, true);
  });

  test('DSR-CATOV-001 [cn] catalog overlay pages', () => { test.fixme(true, cnPending); });
});
