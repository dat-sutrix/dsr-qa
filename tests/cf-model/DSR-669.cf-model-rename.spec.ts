import { test, expect, type APIRequestContext } from '@playwright/test';
import { type Json, dsrItems, inactiveItems, contentListItems } from '../../fixtures/cf-models';
import {
  languages, base, td, dsrPath, queries, inactiveProductQuery, oldNames, oldQueryRequest, blockScripts, overlayPages,
  robotsMeta, rawRow, lists, cardSelector, unableToLoad, preListIds, republishedAt, blockedTd02, td03, blockedTd03,
} from '../../fixtures/dsr-669';
import { persisted } from '../../fixtures/dsr-585';

// DSR-669 CF related model rename (DM_*_related → DM_*_dsr), baseline BL-669-1 (tc-out/DSR-669.spec.json A1).
// Read-only: publish persisted queries + EDS pages only. Author TCs (1.0–4.0, 10.0) run with tools/author, not here.
// Manual TCs 5.0–8.0 are not automated. 12.0 full regression = `npm run test:dev:overlay` + scripts/compare-runs.mjs
// against ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json; the 12.0 tests below check the 3 TD pages only.
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

const pending = (description: string) => test.info().annotations.push({ type: 'pending', description });
const url = (path: string) => `${base()}${path}`;

async function graphql(request: APIRequestContext, target: string) {
  const response = await request.get(target, { failOnStatusCode: false });
  const body = await response.json().catch(() => ({})) as { data?: Json; errors?: unknown };
  observations.push({ url: target, status: response.status(), errors: body.errors ?? null, keys: Object.keys(body.data ?? {}) });
  expect(response.status(), `HTTP status ${target}`).toBe(200);
  expect(body.errors, `'errors' in ${target}`).toBeUndefined();
  return body.data ?? {};
}

const paths = (items: Json[]) => items.map(i => String(i._path ?? ''));
// video-detail content items carry no _path → match the QA item by _path or by its id field (movieId / productId).
const pathsOrIds = (items: Json[]) => items.flatMap(i => [i._path, i.movieId, i.productId].filter(v => v != null).map(String));

const authorOnly: [string, string][] = [
  ['1.0', 'models dm_{movie,product,catalog}_dsr exist with title DM_*_dsr'],
  ['2.0', 'no DM_*_related model remains (negative)'],
  ['3.0', 'every DSR CF (incl. sub-folders) uses DM_*_dsr, total ≥ 84'],
  ['4.0', 'CF commune keep DM_movie / DM_product / DM_catalog'],
  ['10.0', 'no persisted query text uses dm*RelatedList (negative)'],
];

test.describe('DSR-669 CF related model rename', () => {
  for (const [tc, title] of authorOnly) {
    test(`DSR-669 ${tc} [-] ${title}`, { tag: ['@auto', '@author'] }, () =>
      test.skip(true, 'Author read-only TC: executed with tools/author (GET only), not from Playwright'));
  }

  for (const lang of languages) {
    for (const q of queries(lang)) {
      test(`DSR-669 9.0 [${lang}] ${q.name} → 200, no errors, ${q.kind === 'page' ? 'aliases related + inactive' : q.kind === 'list' ? 'alias related ≥ 1' : 'dm*DsrList'}, QA item present`, { tag: ['@auto'] }, async ({ request }) => {
        const data = await graphql(request, q.url);
        if (q.kind === 'page') {
          expect.soft(Object.keys(data), 'aliases').toEqual(expect.arrayContaining(['related', 'inactive']));
          expect.soft(paths(dsrItems(data)), 'related items').toContain(q.qaItem);
        } else if (q.kind === 'list') {
          expect.soft(Object.keys(data), 'alias').toContain('related');
          expect.soft(dsrItems(data).length, 'related items').toBeGreaterThanOrEqual(1);
          expect.soft(paths(dsrItems(data)), 'related items').toContain(q.qaItem);
        } else {
          expect.soft(Object.keys(data).filter(k => /^dm[A-Z][A-Za-z]*DsrList$/.test(k)), 'dm*DsrList field').toHaveLength(1);
          expect.soft(Object.keys(data).filter(k => /RelatedList$/.test(k)), 'dm*RelatedList field').toEqual([]);
          expect.soft(pathsOrIds(contentListItems(data)), 'content items').toContain(q.qaItem);
        }
        expect.soft(JSON.stringify(data), 'old model / list names in response').not.toMatch(oldNames);
      });
    }
  }

  test('DSR-669 11.0 [ja] delivered block JS has no dm*RelatedList / dm_*_related', { tag: ['@auto'] }, async ({ request }) => {
    for (const script of blockScripts) {
      const response = await request.get(url(script), { failOnStatusCode: false });
      const body = await response.text();
      const hits = body.match(new RegExp(oldNames.source, 'g')) ?? [];
      observations.push({ url: url(script), status: response.status(), lastModified: response.headers()['last-modified'] ?? null, bytes: body.length, hits });
      expect.soft(response.status(), script).toBe(200);
      expect.soft(hits, `old names in ${script}`).toEqual([]);
    }
  });

  test('DSR-669 11.0 [ja] product + video overlay pages send no request to a *-related* persisted query', { tag: ['@auto'] }, async ({ page }) => {
    const graphqlCalls: string[] = [];
    page.on('request', r => { if (r.url().includes('/graphql/')) graphqlCalls.push(r.url()); });
    for (const path of [`/ja/products/${td.product}`, `/ja/library/video/${td.movie}`]) {
      const response = await page.goto(url(path), { waitUntil: 'networkidle' });
      observations.push({ url: url(path), status: response?.status(), finalUrl: page.url() });
      expect.soft(response?.status(), path).toBe(200);
    }
    observations.push({ graphqlCalls });
    expect.soft(graphqlCalls.filter(u => oldQueryRequest.test(u) || oldNames.test(decodeURIComponent(u))), 'requests to old queries').toEqual([]);
  });

  for (const lang of languages) {
    for (const p of overlayPages(lang)) {
      test(`DSR-669 12.0 [${lang}] ${p.path} still renders the DSR CF overlay (200, cfPath dsr, no unavailable row, title)`, { tag: ['@auto'] }, async ({ request }) => {
        const response = await request.get(url(p.path), { failOnStatusCode: false });
        const html = await response.text();
        const raw = {
          status: response.status(), title: html.match(/<title>([^<]*)<\/title>/)?.[1]?.trim() ?? null,
          source: html.match(rawRow('source'))?.[1] ?? null, cfPath: html.match(rawRow('cfPath'))?.[1] ?? null,
          unavailable: html.match(rawRow('unavailable'))?.[1] ?? null, robots: html.match(robotsMeta)?.[1] ?? null,
          block: html.includes(`class="${p.block}"`),
        };
        observations.push({ url: url(p.path), ...raw });
        expect(raw.status, 'HTTP').toBe(200);
        expect.soft(raw.source, 'row source').toBe('overlay');
        expect.soft(raw.cfPath, 'row cfPath').toBe(dsrPath(lang, p.type, p.id));
        expect.soft(raw.unavailable, 'row unavailable').toBeNull();
        expect.soft(raw.block, `${p.block} block`).toBe(true);
        expect.soft(raw.title ?? '', '<title>').not.toBe('');
      });
    }
  }

  for (const lang of languages) {
    for (const list of lists(lang)) {
      test(`DSR-669 13.0 [${lang}] ${list.name} list loads cards, no 'Unable to load', card links 200; ids vs pre-669`, { tag: ['@auto'] }, async ({ page, request }) => {
        const response = await page.goto(url(list.path), { waitUntil: 'networkidle' });
        expect(response?.status(), `HTTP ${list.path}`).toBe(200);
        const cards = page.locator(cardSelector);
        await cards.first().waitFor({ state: 'visible' }).catch(() => undefined);
        const items = await cards.evaluateAll(els => els.map(li => ({
          id: (li as HTMLElement).dataset.cardId ?? li.querySelector<HTMLElement>('[data-id]')?.dataset.id ?? '',
          href: li.querySelector('a[href]')?.getAttribute('href') ?? null,
        })));
        const text = await page.locator('main').innerText();
        const ids = items.map(i => i.id);
        observations.push({ url: url(list.path), finalUrl: page.url(), count: items.length, ids });
        expect.soft(text, 'error message').not.toMatch(unableToLoad);
        expect(items.length, 'cards').toBeGreaterThanOrEqual(1);

        const links = [...new Set(items.map(i => i.href).filter((h): h is string => !!h && h.startsWith('/')))];
        const statuses: Record<string, number> = {};
        for (const href of links) statuses[href] = (await request.get(url(href), { failOnStatusCode: false })).status();
        observations.push({ linkStatuses: statuses });
        expect.soft(Object.entries(statuses).filter(([, s]) => s !== 200), 'card links not 200').toEqual([]);

        const before = preListIds[`${list.name} [${lang}]`];
        if (!before) pending(`No pre-669 card ids recorded for ${list.name} [${lang}] (spec.json A2 oracle missing); observed ${items.length} cards`);
        else expect.soft([...ids].sort(), 'card ids vs pre-669').toEqual([...before].sort());
      });
    }
  }

  test('DSR-669 14.0 [ja] isActive false product 990586008 → query alias inactive, page 200 + unavailable + noindex, browser leaves detail', { tag: ['@auto'] }, async ({ request, page }) => {
    const data = await graphql(request, inactiveProductQuery('ja'));
    const target = dsrPath('ja', 'products', td.inactiveProduct);
    observations.push({ inactive: inactiveItems(data), related: dsrItems(data).map(i => ({ _path: i._path, isActive: i.isActive })) });
    expect.soft(paths(inactiveItems(data) ?? []), 'inactive alias').toContain(target);
    expect.soft(dsrItems(data).find(i => i._path === target)?.isActive ?? false, 'isActive').toBe(false);

    const path = `/ja/products/${td.inactiveProduct}`;
    const response = await request.get(url(path), { maxRedirects: 0, failOnStatusCode: false });
    const html = await response.text();
    const raw = { status: response.status(), unavailable: html.match(rawRow('unavailable'))?.[1] ?? null, robots: html.match(robotsMeta)?.[1] ?? null };
    observations.push({ url: url(path), ...raw });
    expect.soft(raw.status, 'raw HTTP').toBe(200);
    expect.soft(raw.unavailable, 'row unavailable').toBe('inactive');
    expect.soft(raw.robots ?? '', 'meta robots').toContain('noindex');

    await page.goto(url(path));
    await page.waitForURL(u => u.pathname !== path, { timeout: 10_000 }).catch(() => undefined);
    observations.push({ finalUrl: page.url() });
    expect.soft(new URL(page.url()).pathname, 'browser final URL (list, KNOWN-FACTS 22/10)').not.toBe(path);
  });

  test('DSR-669 15.0 [ja/en] republish regenerates the 3 overlay pages (Last-Modified after republish, 200)', { tag: ['@auto', '@blocked'] }, async ({ request }) => {
    const since = republishedAt();
    test.skip(!since || Number.isNaN(Date.parse(since)), blockedTd02);
    for (const path of [`/en/library/video/${td.movie}`, `/ja/products/${td.product}`, `/ja/library/catalog/${td.catalog}`]) {
      const response = await request.get(url(path), { failOnStatusCode: false });
      const lastModified = response.headers()['last-modified'] ?? '';
      const html = await response.text();
      observations.push({ url: url(path), status: response.status(), lastModified, unavailable: html.match(rawRow('unavailable'))?.[1] ?? null });
      expect.soft(response.status(), path).toBe(200);
      expect.soft(Date.parse(lastModified), `Last-Modified ${path} after ${since}`).toBeGreaterThan(Date.parse(since));
      expect.soft(html.match(rawRow('unavailable'))?.[1] ?? null, `row unavailable ${path}`).toBeNull();
    }
    pending('Content identity before/after republish needs the TD-669-02 "before" HTML snapshot (not compared here)');
  });

  test('DSR-669 16.0 [ja] new DM_catalog_dsr CF qa669-new → page 200 with title, query returns it under related', { tag: ['@auto', '@blocked'] }, async ({ request }) => {
    const path = `/ja/library/catalog/${td03.id}`;
    const response = await request.get(url(path), { failOnStatusCode: false });
    observations.push({ url: url(path), status: response.status() });
    test.skip(response.status() === 404, `${blockedTd03} (${url(path)} HTTP 404)`);
    expect.soft(response.status(), 'HTTP').toBe(200);
    expect.soft(await response.text(), 'catalog title').toContain(td03.title);
    const data = await graphql(request, persisted(`dsr-catalog-page;path=${dsrPath('ja', 'catalogs', td03.id)}`));
    expect.soft(paths(dsrItems(data)), 'related items').toContain(dsrPath('ja', 'catalogs', td03.id));
  });
});
