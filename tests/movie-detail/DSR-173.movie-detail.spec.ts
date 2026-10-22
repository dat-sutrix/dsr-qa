import { expect, test, type TestInfo } from '@playwright/test';
import { blockedNotWired, dsr173MovieTitle, pageA, pageB } from '../../fixtures/dsr-501';
import {
  blockedNoRelatedProducts, descriptionLineBreakSeparator, detailPath, languages, movieData, onOverlay, requireData,
  type Language, type MovieDataKey,
} from '../../fixtures/dsr-173';
import { MovieDetailPage } from '../../pages/MovieDetailPage';

const fixture = movieData.VALID_YOUTUBE;
// en always; ja too when the fixture has a ja path (overlay page, JOB-20261022-01).
const titleLanguages = languages.filter((lang) => lang === 'en' || detailPath('VALID_YOUTUBE', lang) !== null);

async function openMovie(movie: MovieDetailPage, lang: Language = 'en', key: MovieDataKey = 'VALID_YOUTUBE'): Promise<void> {
  const path = detailPath(key, lang);
  requireData([`${key}.path.${lang}`, path]);
  await movie.goto(path!);
  await expect(movie.title).toBeVisible();
}

for (const lang of titleLanguages) test(`DSR-MOVIE-012 [${lang}] displays the exact movie title`, async ({ page }) => {
  requireData([`VALID_YOUTUBE.movieTitle.${lang}`, fixture.movieTitle[lang]]);
  const movie = new MovieDetailPage(page);
  await openMovie(movie, lang);
  await expect(movie.title).toHaveText(fixture.movieTitle[lang]!);
  expect(await movie.title.innerText()).toBe(fixture.movieTitle[lang]);
  expect(await movie.title.innerText()).not.toMatch(/&amp;|&reg;/);
});

for (const lang of titleLanguages) test(`DSR-MOVIE-014 [${lang}] embeds the configured YouTube movie`, async ({ page, baseURL }, testInfo) => {
  requireData(['VALID_YOUTUBE.movieSourceId', fixture.movieSourceId]);
  expect(baseURL, 'Site origin must be configured').toBeTruthy();
  const movie = new MovieDetailPage(page);
  try {
    await openMovie(movie, lang);
    // TC step: click the player facade (DSR-109); the embed must load only after the click.
    await expect(movie.playerFacade).toBeVisible();
    await expect(movie.playerEmbed).toHaveCount(0);
    await movie.playerFacade.click();
    await expect(movie.playerEmbed).toHaveAttribute('src', /\/embed\//);
    const src = await movie.playerEmbedSrc();
    // The CF also contains provider parameters; compare the actual YouTube ID.
    const youtubeId = fixture.movieSourceId!.split(/[&?]/)[0];
    expect(src).toContain(`/embed/${youtubeId}`);
    expect(new URL(src!, page.url()).hostname).toMatch(/(^|\.)youtube(?:-nocookie)?\.com$/);
  } finally {
    await testInfo.attach('collected-errors', {
      body: JSON.stringify(movie.consoleErrors(baseURL!), null, 2),
      contentType: 'application/json',
    });
  }
});

test('DSR-MOVIE-036 no site-origin console errors on the movie component page', { tag: ['@known-bug-CSP'] }, async ({ page, baseURL }, testInfo) => {
  // CSP style-src blocks the Google Fonts stylesheet, so the design fonts (Noto Sans JP/SC) do not load.
  expect(baseURL, 'Site origin must be configured').toBeTruthy();
  const movie = new MovieDetailPage(page);
  try {
    await openMovie(movie);
    // Only source URLs on the configured site origin fail; retain third-party
    // and unknown-source errors in the attachment for diagnosis.
    expect(movie.consoleErrors(baseURL!).filter((error) => error.source === 'site')).toEqual([]);
  } finally {
    await testInfo.attach('collected-errors', {
      body: JSON.stringify(movie.consoleErrors(baseURL!), null, 2),
      contentType: 'application/json',
    });
  }
});

test('DSR-MOVIE-020 displays visible related product codes in order', async ({ page }) => {
  // Blocked: Issue #1 — related product order/specification is unconfirmed.
  test.fixme(true, 'Issue #1: related products specification pending');
  requireData(['VALID_YOUTUBE.relatedProducts', fixture.relatedProducts]);
  const movie = new MovieDetailPage(page);
  await openMovie(movie);
  const cards = movie.relatedProductCards();
  await expect(cards).toHaveCount(fixture.relatedProducts!.length);
  for (const [index, code] of fixture.relatedProducts!.entries()) {
    const visibleCode = cards.nth(index).getByTestId('related-product-code');
    await expect(visibleCode).toBeVisible();
    expect(await visibleCode.innerText()).toBe(code);
  }
});

test('DSR-MOVIE-021 sorts related content by update date descending', async ({ page }) => {
  const data = movieData.RELATED_SORT;
  const path = detailPath('RELATED_SORT', 'en');
  requireData(['RELATED_SORT.path.en', path], ['RELATED_SORT.expectedOrder', data.expectedOrder]);
  // Blocked: Issue #13 — sort fields must be confirmed before using seeded data.
  test.fixme(true, 'Issue #13: related sort field pending');
  const movie = new MovieDetailPage(page);
  await movie.goto(path!);
  await expect(movie.relatedContentCards()).toHaveCount(data.expectedOrder!.length);
  expect(await movie.relatedContentTitles()).toEqual(data.expectedOrder);
});

test('DSR-MOVIE-023 excludes unavailable and inactive related movies', async ({ page }) => {
  const data = movieData.RELATED_FILTERED;
  const path = detailPath('RELATED_FILTERED', 'en');
  requireData(['RELATED_FILTERED.path.en', path], ['RELATED_FILTERED.expectedOrder', data.expectedOrder], ['RELATED_FILTERED.excludedTitles', data.excludedTitles]);
  // Blocked: Issue #14 — related filtering requirements are unconfirmed.
  test.fixme(true, 'Issue #14: related filtering pending');
  const movie = new MovieDetailPage(page);
  await movie.goto(path!);
  await expect(movie.relatedContentCards()).toHaveCount(data.expectedOrder!.length);
  const titles = await movie.relatedContentTitles();
  expect(titles).toEqual(data.expectedOrder);
  for (const excluded of data.excludedTitles!) expect(titles).not.toContain(excluded);
});

test('DSR-MOVIE-025 navigates the related content carousel to its end', async ({ page }) => {
  const path = detailPath('RELATED_6', 'en');
  requireData(['RELATED_6.path.en', path]);
  // Blocked: Issue #5 — carousel behavior and cards per view are unconfirmed.
  test.fixme(true, 'Issue #5: carousel behavior pending');
  await page.setViewportSize({ width: 1440, height: 900 });
  const movie = new MovieDetailPage(page);
  await movie.goto(path!);
  await expect(movie.relatedContentCards()).toHaveCount(6);
  await expect(movie.carouselPrev).toBeDisabled();
  await movie.clickNextUntilEnd();
  await expect(movie.relatedContentCards().last()).toBeInViewport();
  await expect(movie.carouselNext).toBeDisabled();
});

test('DSR-MOVIE-026 displays related thumbnails, types, tags and valid links', { tag: ['@known-bug-DSR-538'] }, async ({ page, request }) => {
  // RELATED_MIXED when seeded; else RELATED_6 (overlay: TD-587-14 qa587-rel-a, TC 17.0); else the verified host's related content.
  const key = (['RELATED_MIXED', 'RELATED_6'] as const).find((k) => detailPath(k, 'en') !== null) ?? 'VALID_YOUTUBE';
  const movie = new MovieDetailPage(page);
  await openMovie(movie, 'en', key);
  // Same-language links: same language prefix as the opened page (/master/en/ on test-space, /en/ on the overlay, BL-OVL-1).
  const languagePrefix = new URL(page.url()).pathname.match(/^\/(?:master\/)?en\//)?.[0] ?? '/en/';
  const cards = movie.relatedContentCards();
  await expect(cards.first()).toBeVisible();
  const count = await cards.count();
  expect(count).toBeGreaterThan(0);
  for (let index = 0; index < count; index += 1) {
    const card = cards.nth(index);
    const label = `Related card ${index + 1}`;
    await card.scrollIntoViewIfNeeded();
    const title = card.getByTestId('related-content-card-title');
    await expect.soft(title, label).toBeVisible();
    await expect.soft(title, label).not.toHaveText('');
    const type = await card.getAttribute('data-content-type');
    expect.soft(['movie', 'article', 'landing-page'], label).toContain(type);
    if (type === 'movie' || type === 'article') {
      await expect.soft(card.getByTestId('related-content-tag'), label).toHaveText(type === 'movie' ? 'MOVIE' : 'STORY');
    }
    // DSR-538: keep both thumbnail and link checks active, including HTTP status.
    const image = card.getByTestId('related-content-card-image');
    await expect.soft(image, `${label} thumbnail`).toBeVisible({ timeout: 1_000 });
    expect.soft(await image.evaluateAll((images) => images.length === 1 && images.every(
      (element) => element instanceof HTMLImageElement && element.complete && element.naturalWidth > 0,
    )), `${label} thumbnail loaded`).toBe(true);
    const href = await card.getByTestId('related-content-card-link').getAttribute('href');
    expect.soft(href, `${label} href`).toBeTruthy();
    if (href) {
      const url = new URL(href, page.url());
      expect.soft(url.pathname.startsWith(languagePrefix), `${label} language (${url.pathname}, prefix ${languagePrefix})`).toBe(true);
      const response = await request.get(url.href);
      expect.soft(response.status(), `${label} ${url.href}`).toBe(200);
    }
  }
});

for (const lang of titleLanguages) test(`DSR-MOVIE-027 [${lang}] outputs exactly one title and og:title`, async ({ page }) => {
  requireData([`VALID_YOUTUBE.movieTitle.${lang}`, fixture.movieTitle[lang]]);
  const movie = new MovieDetailPage(page);
  await openMovie(movie, lang);
  const expected = `${fixture.movieTitle[lang]} | YKK DIGITAL SHOWROOM`;
  await expect(page).toHaveTitle(expected);
  expect(await page.evaluate(() => ({
    title: document.head.getElementsByTagName('title').length,
    ogTitle: Array.from(document.head.getElementsByTagName('meta')).filter((meta) => meta.getAttribute('property') === 'og:title').length,
  }))).toEqual({ title: 1, ogTitle: 1 });
  expect(await movie.metaContent('og:title')).toBe(expected);
});

test('DSR-MOVIE-028 removes line breaks from description metadata', async ({ page }) => {
  // Blocked: metadata line-break separator is still TBD in automation-spec.md (TC 028).
  test.fixme(descriptionLineBreakSeparator === null, 'Description line-break separator is unconfirmed');
  requireData(['VALID_YOUTUBE.description.en', fixture.description.en]);
  const movie = new MovieDetailPage(page);
  await openMovie(movie);
  const expected = fixture.description.en!.replace(/\r\n|\r|\n|<br\s*\/?>/gi, descriptionLineBreakSeparator!);
  for (const name of ['description', 'og:description']) {
    const content = await movie.metaContent(name);
    expect(content).not.toMatch(/[\r\n]|<br/i);
    expect(content).toBe(expected);
  }
});

test('DSR-MOVIE-029 outputs an absolute reachable CF thumbnail', async ({ page, request }) => {
  requireData(['VALID_YOUTUBE.thumbnail', fixture.thumbnail]);
  const movie = new MovieDetailPage(page);
  await openMovie(movie);
  const image = await movie.metaContent('og:image');
  expect(image).toMatch(/^https:\/\//);
  expect(decodeURIComponent(new URL(image!).pathname)).toBe(fixture.thumbnail);
  const response = await request.get(image!);
  expect(response.status()).toBe(200);
  expect(response.headers()['content-type']).toMatch(/^image\//);
});

test('DSR-MOVIE-033 displays component sections in vertical order on PC', async ({ page }) => {
  // DSR-539: breadcrumb is a separate component and is outside this check.
  test.skip(onOverlay && fixture.relatedProducts === null, blockedNoRelatedProducts);
  await page.setViewportSize({ width: 1440, height: 900 });
  const movie = new MovieDetailPage(page);
  await openMovie(movie);
  let previousBottom = -Infinity;
  for (const section of [movie.title, movie.player, movie.relatedProductsSection, movie.relatedContentSection]) {
    await expect(section).toBeVisible();
    const box = await section.boundingBox();
    expect(box).not.toBeNull();
    expect(box!.y).toBeGreaterThanOrEqual(previousBottom);
    previousBottom = box!.y + box!.height;
  }
});

test('DSR-MOVIE-034 displays the component back control', async ({ page }) => {
  // DSR-540 / DSR-536: destination validation awaits the movie URL structure.
  const movie = new MovieDetailPage(page);
  await openMovie(movie);
  await expect(movie.back).toHaveCount(1);
  await expect(movie.back).toBeVisible();
});

const deferred = [
  ['001', 'B: page auto-generation not implemented'],
  ['002', 'B: page auto-generation not implemented'],
  ['003', 'B: page auto-generation not implemented'],
  ['004', 'M: Universal Editor requires IMS login; manual only'],
  ['005', 'B: page auto-generation not implemented'],
  ...['006', '007', '008', '009', '010'].map((id) => [id, 'B: URL structure not implemented, DSR-536']),
  ['011', 'B: page auto-generation not implemented'],
  ['013', 'C: overflow automation deferred; CJK font manual'],
  ['015', 'C: iframe source automation deferred; playback manual'],
  ['016', 'B: movie-detail-player-video not implemented, DAM test data pending'],
  ['017', 'B: movie-detail-player-video not implemented, DAM test data pending'],
  ['018', 'B: test data pending (docs/DSR-173/test-data.md); Issue #12'],
  ['019', 'C: layout automation deferred; in-iframe error manual'],
  ['022', 'B: test data pending (docs/DSR-173/test-data.md)'],
  ['024', 'B: test data pending (docs/DSR-173/test-data.md)'],
  ['030', 'M: SNS debuggers need login and public URL; manual only'],
  ['031', 'B: page auto-generation not implemented'],
  ['032', 'B: ja/zh pages not available'],
  ['035', 'B: SP design pending'],
];
for (const [id, reason] of deferred) {
  test(`DSR-MOVIE-${id} ${reason}`, () => { test.skip(true, reason); });
}

test.describe('DSR-501', () => {
  // Preflight per JOB-20261015-11: 404, the block error, or the DSR-173 movie → blocked-data (skip), never fail.
  async function openQa501(movie: MovieDetailPage, path: string, testInfo: TestInfo): Promise<void> {
    const response = await movie.goto(path);
    const status = response?.status() ?? null;
    test.skip(status === 404, `blocked-data: ${path} returned 404`);
    // TODO: data-testid for the video-detail error state (observed: p.vd-error)
    const error = movie.page.getByText('Unable to load video information.');
    await expect(movie.title.or(error).first()).toBeVisible();
    const mainTitle = await movie.title.count() ? await movie.title.innerText() : null;
    await testInfo.attach('preflight', {
      body: JSON.stringify({ path, finalUrl: movie.page.url(), status, mainTitle, blockError: await error.count() > 0 }, null, 2),
      contentType: 'application/json',
    });
    await testInfo.attach('page', { body: await movie.page.screenshot({ fullPage: true }), contentType: 'image/png' });
    test.skip(mainTitle === null || mainTitle === dsr173MovieTitle, `${blockedNotWired} (main title: ${mainTitle ?? 'none, block shows "Unable to load video information."'})`);
  }

  function relatedMovieTitles(movie: MovieDetailPage): Promise<string[]> {
    return movie.relatedContentSection.locator('[data-testid="related-content-card"][data-content-type="movie"]')
      .getByTestId('related-content-card-title').allInnerTexts();
  }

  test('DSR-501-P3 [en] related movies are limited to 5 in authored order', async ({ page }, testInfo) => {
    const movie = new MovieDetailPage(page);
    await openQa501(movie, pageA.path, testInfo);
    await expect(movie.relatedContentSection).toBeVisible();
    expect(await relatedMovieTitles(movie)).toEqual([...pageA.expectedRelated]);
  });

  test('DSR-501-P2 [en] unavailable related movie is not displayed', async ({ page }, testInfo) => {
    const movie = new MovieDetailPage(page);
    await openQa501(movie, pageB.path, testInfo);
    await expect(movie.relatedContentSection).toBeVisible();
    expect(await relatedMovieTitles(movie)).toEqual([...pageB.expectedRelated]);
    expect(await page.content()).not.toContain(pageB.excludedTitle);
    await expect(page.locator('a', { hasText: pageB.excludedTitle })).toHaveCount(0);
  });
});
