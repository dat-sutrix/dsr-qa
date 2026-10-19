// Retest of bug DSR-647 (fixed in DSR-587, Jira comment 61175) on the overlay branch URLs, hub job JOB-20261016-04 (P3 order: JOB-20261017-01).
// Baseline BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md): max 5 related movies, isUnavailable = true hidden,
// order by update date newest first, static HTML, no GraphQL call in the browser.
import { test, expect, type Page, type TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { MovieDetailPage } from '../../pages/MovieDetailPage';
import { pageA, pageB, overlayBase, overlayPath, dsrVideoPageQuery, maxRelatedMovies, blockedNo6th, blockedStalePreview, blockedNoDistinctUpdateDate } from '../../fixtures/dsr-501';

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
  const url = overlayBase + overlayPath(movieId);
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

function relatedMovieTitles(movie: MovieDetailPage): Promise<string[]> {
  return movie.relatedContentSection.locator('[data-testid="related-content-card"][data-content-type="movie"]')
    .getByTestId('related-content-card-title').allInnerTexts();
}

test('DSR-501-P3 [en] related movies are max 5, newest updated first', { tag: ['@DSR-647'] }, async ({ page }, testInfo) => {
  const query = await queryRelatedMovies(page, pageA.movieId);
  const o = await openOverlay(page, pageA.movieId, testInfo);
  await expect(o.movie.relatedContentSection).toBeVisible();
  const shown = await relatedMovieTitles(o.movie);
  await testInfo.attach('observed', { body: JSON.stringify({ url: o.url, title: o.title, lastModified: o.lastModified, query, staticRelatedRows: o.staticRelatedRows, shown, graphqlCalls: o.graphqlCalls }, null, 2), contentType: 'application/json' });
  expect(o.html).toContain(o.title);
  expect(o.graphqlCalls).toEqual([]);
  expect(shown.length).toBeLessThanOrEqual(maxRelatedMovies);
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
    .slice(0, maxRelatedMovies).map((m) => m.movieTitle);
  expect(newest).toEqual([...pageA.expectedRelatedByUpdateDesc]);
  expect(shown).toHaveLength(maxRelatedMovies);
  expect(shown).toEqual(newest);
});

test('DSR-501-P2 [en] unavailable related movie is not displayed', { tag: ['@DSR-647'] }, async ({ page }, testInfo) => {
  const query = await queryRelatedMovies(page, pageB.movieId);
  const o = await openOverlay(page, pageB.movieId, testInfo);
  await expect(o.movie.relatedContentSection).toBeVisible();
  const shown = await relatedMovieTitles(o.movie);
  const renderedDom = await page.content();
  await testInfo.attach('observed', { body: JSON.stringify({ url: o.url, title: o.title, query, staticRelatedRows: o.staticRelatedRows, shown, graphqlCalls: o.graphqlCalls, excludedInStaticHtml: o.html.includes(pageB.excludedTitle) }, null, 2), contentType: 'application/json' });
  expect(o.html).toContain(o.title);
  expect(o.graphqlCalls).toEqual([]);
  expect(shown).toEqual([...pageB.expectedRelated]);
  expect(renderedDom).not.toContain(pageB.excludedTitle);
  await expect(page.getByText(pageB.excludedTitle)).toHaveCount(0);
  // QA decision 2026-10-19 (JOB-20261019-01, BL-OVL-1): json2html writes every row and the block filters isUnavailable on the client,
  // so static HTML is recorded (excludedInStaticHtml) but not asserted.
});
