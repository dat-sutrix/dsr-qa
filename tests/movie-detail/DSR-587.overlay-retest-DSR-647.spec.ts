// Retest of bug DSR-647 (fixed in DSR-587, Jira comment 61175) on the overlay branch URLs, hub job JOB-20261016-04 (P3 order: JOB-20261017-01).
// Baseline BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md): max 5 related movies, isUnavailable = true hidden,
// order by update date newest first, static HTML, no GraphQL call in the browser.
// JOB-20261019-03: retargeted to main (overlay merged 20/10) with TD-587-14/15 (qa587-rel-a / qa587-rel-b); qa501-* not re-seeded.
import { test, expect, type Page, type TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { MovieDetailPage } from '../../pages/MovieDetailPage';
import { mainBase, mainPageA, mainPageB, overlayPath, dsrVideoPageQuery, maxRelatedMovies, blockedNo6th, blockedStalePreview, blockedNoDistinctUpdateDate, nightReportSince, blockedStaleNightReport } from '../../fixtures/dsr-501';

// Job output asks for a full-page screenshot of A and B on every run.
const evidence = path.resolve(process.env.DSR_JOB_EVIDENCE || 'test-results/DSR-647-retest');

interface RelatedMovie { movieId: string; movieTitle: string; isUnavailable: boolean | null; publishDate: string | null; updateDate: string | null; _path: string }

async function queryRelatedMovies(page: Page, movieId: string) {
  const response = await page.request.get(dsrVideoPageQuery(movieId));
  const body = await response.json();
  const items = body?.data?.related?.items ?? [];
  const relatedMovies: RelatedMovie[] = items[0]?.movie?.relatedMovies ?? [];
  return { status: response.status(), relatedItems: items.length, inactiveItems: body?.data?.inactive?.items?.length ?? null, relatedMovies };
}

async function openOverlay(page: Page, movieId: string, testInfo: TestInfo) {
  const url = mainBase + overlayPath(movieId);
  const graphqlCalls: string[] = [];
  page.on('request', (request) => { if (/graphql|execute\.json/i.test(request.url())) graphqlCalls.push(request.url()); });
  const htmlResponse = await page.request.get(url);
  const html = await htmlResponse.text();
  const lastModified = htmlResponse.headers()['last-modified'] ?? null;
  // Static block rows: one "relatedMovies" row per related movie (cf-templates/video.html).
  const staticRelatedRows = html.match(/<div>relatedMovies<\/div>[\s\S]*?<\/ul>/g)?.map((row) => row.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()) ?? [];
  const movie = new MovieDetailPage(page);
  const response = await page.goto(url, { waitUntil: 'networkidle' });
  expect(response?.status()).toBe(200);
  await expect(movie.title).toBeVisible();
  const title = await movie.title.innerText();
  fs.mkdirSync(evidence, { recursive: true });
  const shot = path.join(evidence, `${testInfo.title.split(' ')[0]}_en_fullpage.png`);
  await page.screenshot({ path: shot, fullPage: true });
  await testInfo.attach('page', { path: shot, contentType: 'image/png' });
  return { movie, url, html, lastModified, title, staticRelatedRows, graphqlCalls };
}

async function relatedMovieTitles(movie: MovieDetailPage): Promise<string[]> {
  const titles = await movie.relatedContentSection.locator('[data-testid="related-content-card"][data-content-type="movie"]')
    .getByTestId('related-content-card-title').allInnerTexts();
  return titles.map((t) => t.trim());
}

// Expected card titles come from the query (trimmed; publish 21/10: "QA587 related 1 " has a trailing space).
const titlesOf = (movies: RelatedMovie[], ids: readonly string[]) =>
  ids.map((id) => movies.find((m) => m.movieId === id)?.movieTitle.trim() ?? `<missing ${id}>`);

function skipIfBeforeNightReport(lastModified: string | null) {
  test.skip(!lastModified || new Date(lastModified) <= new Date(nightReportSince),
    `${blockedStaleNightReport} (last-modified ${lastModified}; since ${nightReportSince})`);
}

test('DSR-501-P3 [en] related movies are max 5, newest updated first', { tag: ['@DSR-647'] }, async ({ page }, testInfo) => {
  const query = await queryRelatedMovies(page, mainPageA.movieId);
  const o = await openOverlay(page, mainPageA.movieId, testInfo);
  await expect(o.movie.relatedContentSection).toBeVisible();
  const shown = await relatedMovieTitles(o.movie);
  await testInfo.attach('observed', { body: JSON.stringify({ url: o.url, title: o.title, lastModified: o.lastModified, query, staticRelatedRows: o.staticRelatedRows, shown, graphqlCalls: o.graphqlCalls }, null, 2), contentType: 'application/json' });
  expect(o.html).toContain(o.title);
  expect(o.graphqlCalls).toEqual([]);
  expect(shown.length).toBeLessThanOrEqual(maxRelatedMovies);
  skipIfBeforeNightReport(o.lastModified);
  test.skip(query.relatedMovies.length <= maxRelatedMovies, `${blockedNo6th} (query returns ${query.relatedMovies.length}; shown ${shown.length})`);
  // Freshness check (JOB-20261017-01): branch HTML built from fewer inputs than publish = stale preview, not a product result.
  test.skip(o.staticRelatedRows.length < query.relatedMovies.length,
    `${blockedStalePreview} (static HTML ${o.staticRelatedRows.length} relatedMovies rows, query ${query.relatedMovies.length}; last-modified ${o.lastModified})`);
  const updateDates = query.relatedMovies.map((m) => m.updateDate);
  test.skip(updateDates.some((d) => !d) || new Set(updateDates).size !== updateDates.length,
    `${blockedNoDistinctUpdateDate} (${JSON.stringify(updateDates)})`);
  // DSR-647 comment 61177: newest updateDate first, max 5, isUnavailable = true hidden.
  const newest = [...query.relatedMovies].filter((m) => m.isUnavailable !== true)
    .sort((a, b) => (b.updateDate as string).localeCompare(a.updateDate as string))
    .slice(0, maxRelatedMovies).map((m) => m.movieId);
  expect(newest).toEqual([...mainPageA.expectedRelatedIdsByUpdateDesc]);
  expect(shown).toHaveLength(maxRelatedMovies);
  expect(shown).toEqual(titlesOf(query.relatedMovies, mainPageA.expectedRelatedIdsByUpdateDesc));
  expect(shown).not.toContain(titlesOf(query.relatedMovies, [mainPageA.absentId])[0]);
});

test('DSR-501-P2 [en] unavailable related movie is not displayed', { tag: ['@DSR-647'] }, async ({ page }, testInfo) => {
  const query = await queryRelatedMovies(page, mainPageB.movieId);
  const o = await openOverlay(page, mainPageB.movieId, testInfo);
  await expect(o.movie.relatedContentSection).toBeVisible();
  const shown = await relatedMovieTitles(o.movie);
  const renderedDom = await page.content();
  await testInfo.attach('observed', { body: JSON.stringify({ url: o.url, title: o.title, query, staticRelatedRows: o.staticRelatedRows, shown, graphqlCalls: o.graphqlCalls, lastModified: o.lastModified, excludedInStaticHtml: o.html.includes(mainPageB.excludedTitle) }, null, 2), contentType: 'application/json' });
  expect(o.html).toContain(o.title);
  expect(o.graphqlCalls).toEqual([]);
  skipIfBeforeNightReport(o.lastModified);
  expect(query.relatedMovies.map((m) => m.movieId)).toContain(mainPageB.excludedId);
  expect(shown).toEqual(titlesOf(query.relatedMovies, mainPageB.expectedRelatedIds));
  expect(renderedDom).not.toContain(mainPageB.excludedTitle);
  await expect(page.getByText(mainPageB.excludedTitle)).toHaveCount(0);
  // QA decision 2026-10-19 (JOB-20261019-01, BL-OVL-1): json2html writes every row and the block filters isUnavailable on the client,
  // so static HTML is recorded (excludedInStaticHtml) but not asserted.
});
