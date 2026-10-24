import { test, expect, type APIRequestContext } from '@playwright/test';
import { type Json, dsrItems, inactiveItems, contentOf } from '../../fixtures/cf-models';
import {
  type Language, type TdId, languages, base, td, standardMovie, missingId, techPath, contentPath, standardDsrPath, techQuery,
  videoPageQuery, videoListQuery, techTalkPage, videoPage, videoList, namingVariants, blockedBy, robotsMeta, titleTag, rawRow,
  blockClasses, cardSelector, qa670, listBefore,
} from '../../fixtures/dsr-670';
import { MovieDetailPage } from '../../pages/MovieDetailPage';

// DSR-670 tech-talk model DM_techmovie_dsr, baseline BL-670-1 (tc-out/DSR-670.spec.json A1). Read-only: publish GraphQL + EDS.
// Author TCs 1.0 / 2.0 run with `node tools/author/author.mjs models` (GET only), not here. Manual 3.0–6.0 are not automated.
// 13.0 full regression = tests/movie-detail/DSR-587.* compared with results/REGRESSION/ledger.json; the test below checks the query.
// Data TCs preflight `dsr-techmovie-page`: no item → skip "Blocked-by TD-670-0x", never Fail (job JOB-20261024-05).
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
  observations.push({ url: target, status: response.status(), errors: body.errors ?? null, data: body.data ?? null });
  expect(response.status(), `HTTP status ${target}`).toBe(200);
  expect(body.errors, `'errors' in ${target}`).toBeUndefined();
  return body.data ?? {};
}

const paths = (items: Json[]) => items.map(i => String(i._path ?? ''));
/** Preflight: the DSR CF of a TD is returned by dsr-techmovie-page (related or inactive); otherwise skip as Blocked-by. */
async function preflight(request: APIRequestContext, tdId: TdId, lang: Language = 'ja') {
  const data = await graphql(request, techQuery(lang, td[tdId].id));
  const found = [...dsrItems(data), ...(inactiveItems(data) ?? [])].some(i => i._path === techPath(lang, td[tdId].id));
  test.skip(!found, blockedBy(tdId, lang));
  return data;
}

async function raw(request: APIRequestContext, path: string) {
  const response = await request.get(url(path), { maxRedirects: 0, failOnStatusCode: false });
  const html = await response.text();
  const r = {
    url: url(path), status: response.status(), title: html.match(titleTag)?.[1]?.trim() ?? null, robots: html.match(robotsMeta)?.[1] ?? null,
    source: html.match(rawRow('source'))?.[1] ?? null, cfPath: html.match(rawRow('cfPath'))?.[1] ?? null,
    unavailable: html.match(rawRow('unavailable'))?.[1] ?? null, blocks: blockClasses(html),
  };
  observations.push(r);
  return { ...r, html };
}

test.describe('DSR-670 tech-talk model DM_techmovie_dsr', () => {
  for (const [tc, title] of [['1.0', 'model dm_techmovie_dsr: 7 fields, movie + isActive required, defaults false'], ['2.0', 'movie field: DM_movie only, rootPath /content/dam/common']]) {
    test(`DSR-670 ${tc} [-] ${title}`, { tag: ['@auto', '@author'] }, () =>
      test.skip(true, 'Author read-only TC: executed with tools/author models (GET only), not from Playwright'));
  }

  test('DSR-670 7.0 [ja] dsr-techmovie-page qa670-tech → 200, no errors, 1 related item (movie → content qa670-tech, isActive true), inactive []', { tag: ['@auto', '@blocked'] }, async ({ request }) => {
    const data = await preflight(request, '01');
    const items = dsrItems(data);
    expect.soft(items, 'related items').toHaveLength(1);
    expect.soft(items[0]?._path, 'related _path').toBe(techPath('ja', td['01'].id));
    expect.soft(contentOf(items[0], 'movie')?._path, 'movie reference').toBe(contentPath('ja', td['01'].id));
    expect.soft(items[0]?.isActive, 'isActive').toBe(true);
    expect.soft(inactiveItems(data), 'inactive items').toEqual([]);
  });

  test(`DSR-670 7.0 [ja] dsr-techmovie-page …/tech/${missingId} → 200, no errors, related [] (negative)`, { tag: ['@auto'] }, async ({ request }) => {
    const data = await graphql(request, techQuery('ja', missingId));
    expect.soft(Object.keys(data), 'aliases').toContain('related');
    expect.soft(dsrItems(data), 'related items').toEqual([]);
  });

  for (const lang of languages) {
    test(`DSR-670 8.0 [${lang}] /${lang}/library/video/tech-talk/${td['01'].id} → 200, title, player, same blocks as ${standardMovie}, no noindex`, { tag: ['@auto', '@blocked'] }, async ({ request, page }) => {
      await preflight(request, '01', lang);
      const tech = await raw(request, techTalkPage(lang, td['01'].id));
      const standard = await raw(request, videoPage(lang, standardMovie));
      expect(tech.status, 'HTTP').toBe(200);
      expect.soft(tech.title ?? '', '<title>').toContain(td['01'].title);
      expect.soft(tech.html, 'description').toContain(td['01'].description);
      expect.soft(tech.source, 'row source').toBe('overlay');
      expect.soft(tech.cfPath, 'row cfPath').toBe(techPath(lang, td['01'].id));
      expect.soft(tech.unavailable, 'row unavailable').toBeNull();
      expect.soft(tech.robots ?? '', 'meta robots').not.toContain('noindex');
      expect.soft(tech.blocks, `block order vs ${videoPage(lang, standardMovie)}`).toEqual(standard.blocks);

      const movie = new MovieDetailPage(page);
      await page.goto(url(techTalkPage(lang, td['01'].id)));
      await expect.soft(movie.player, 'player').toBeVisible();
      observations.push({ finalUrl: page.url() });
      pending('.aem.page tier and movieSourceId vs TD value not compared (TD sheet: "same as qa587-main")');
    });
  }

  test('DSR-670 9.0 [ja] tech-talk URL naming: QA670-TECH, qa670_tech, standard URL /ja/library/video/qa670-tech → 404 ×3', { tag: ['@auto', '@blocked'] }, async ({ request }) => {
    await preflight(request, '01'); // a 404 proves nothing while qa670-tech does not exist
    for (const path of namingVariants) {
      const r = await raw(request, path);
      expect.soft(r.status, path).toBe(404);
      expect.soft(r.html, `${path} shows the qa670-tech video`).not.toContain(td['01'].title);
    }
  });

  for (const [tc, tdId, expectUnavailable] of [['10.0', '02', 'inactive'], ['11.0', '03', null], ['12.0', '04', 'unavailable']] as const) {
    test(`DSR-670 ${tc} [ja] /ja/library/video/tech-talk/${td[tdId].id} → robots noindex, behaviour = standard video`, { tag: ['@auto', '@blocked'] }, async ({ request, page }) => {
      await preflight(request, tdId);
      const path = techTalkPage('ja', td[tdId].id);
      const r = await raw(request, path);
      expect.soft(r.status, 'raw HTTP').toBe(200);
      expect.soft(r.robots ?? '', 'meta robots').toContain('noindex');
      if (expectUnavailable) expect.soft(r.unavailable, 'row unavailable').toBe(expectUnavailable);
      if (tdId === '02') {
        await page.goto(url(path));
        await page.waitForURL(u => u.pathname !== path, { timeout: 10_000 }).catch(() => undefined);
        observations.push({ finalUrl: page.url() });
        expect.soft(new URL(page.url()).pathname, 'browser final URL (list, KNOWN-FACTS 22/10)').not.toBe(path);
      } else {
        pending(`Standard ${tdId === '03' ? 'booth-limited' : 'isUnavailable'} video behaviour not compared side by side (A4); raw values attached`);
      }
    });
  }

  for (const lang of languages) {
    test(`DSR-670 13.0 [${lang}] dsr-video-page ${standardMovie} → 200, no errors, related item (regression after 670)`, { tag: ['@auto'] }, async ({ request }) => {
      const data = await graphql(request, videoPageQuery(lang, standardMovie));
      expect.soft(Object.keys(data), 'aliases').toEqual(expect.arrayContaining(['related', 'inactive']));
      expect.soft(paths(dsrItems(data)), 'related items').toContain(standardDsrPath(lang, standardMovie));
      expect.soft(contentOf(dsrItems(data)[0], 'movie')?.movieId, 'movieId').toBe(standardMovie);
    });
  }

  test('DSR-670 14.0 [ja] /ja/library/video/search + dsr-video-list show no QA670 item; count unchanged vs before TD-670-01', { tag: ['@auto', '@blocked'] }, async ({ request, page }) => {
    // Snapshot first, so the pre-TD state is recorded even when the TC is blocked.
    const data = await graphql(request, videoListQuery('ja'));
    const queryPaths = paths(dsrItems(data));
    const response = await page.goto(url(videoList('ja')), { waitUntil: 'networkidle' });
    const cards = page.locator(cardSelector);
    await cards.first().waitFor({ state: 'visible' }).catch(() => undefined);
    const cardIds = await cards.evaluateAll(els => els.map(li => (li as HTMLElement).dataset.cardId ?? li.querySelector('a[href]')?.getAttribute('href') ?? ''));
    observations.push({ snapshot: { capturedAt: new Date().toISOString(), cards: cardIds, queryPaths }, listStatus: response?.status() });

    await preflight(request, '01');
    expect.soft(response?.status(), 'list HTTP').toBe(200);
    expect.soft(queryPaths.filter(p => qa670.test(p) || p.includes('/movies/tech/')), 'dsr-video-list tech items').toEqual([]);
    expect.soft(cardIds.filter(id => qa670.test(id)), 'QA670 cards').toEqual([]);
    expect.soft(await page.locator('main').innerText(), 'QA670 text in list').not.toMatch(qa670);
    const before = listBefore();
    if (!before) pending('No pre-TD-670-01 list snapshot (list-before-td670.json) → count comparison not done');
    else {
      expect.soft(cardIds.length, `card count vs ${before.capturedAt}`).toBe(before.cards.length);
      expect.soft(queryPaths.length, `dsr-video-list count vs ${before.capturedAt}`).toBe(before.queryPaths.length);
    }
  });
});
