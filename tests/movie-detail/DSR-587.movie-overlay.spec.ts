import { test, expect, type APIRequestContext, type Browser, type Page } from '@playwright/test';
import { MovieDetailPage } from '../../pages/MovieDetailPage';
import {
  type Language, base, hosts, videoPath, listPath, techTalkListPath, td, notSeeded, seeded, siteTitleSuffix, maxRelatedMovies,
  playWaitMs, redirectWaitMs, graphqlPattern, indexPath, htmlLang, cnPending, techTalkPending, dsr173GroupA, nonStandardHref, manual009,
} from '../../fixtures/dsr-587';
import { detailPath } from '../../fixtures/dsr-173';

// DSR-587 movie detail via overlay + json2html, baseline BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md).
// Read-only. Spec ids from ykk-dsr/hub/tc-out/DSR-587.spec.json: 1.0 → DSR-VOV-001 … Automation TCs only (9.0 manual, 12/13 Q32, 19 visual).
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
async function openVideo(page: Page, lang: Language, tdId: '01' | '07' | '08' | '14' | '15') {
  const movie = new MovieDetailPage(page);
  const target = url(videoPath(lang, td[tdId].id));
  const response = await movie.goto(target);
  test.skip(response?.status() === 404, `${notSeeded(tdId)} (${target} HTTP 404)`);
  observations.push({ language: lang, url: target, finalUrl: page.url(), status: response?.status() });
  return { movie, response, target };
}

async function rawVideo(request: APIRequestContext, lang: Language, tdId: '01' | '07' | '08') {
  const target = url(videoPath(lang, td[tdId].id));
  const response = await status(request, target);
  test.skip(response.status() === 404, `${notSeeded(tdId)} (${target} HTTP 404)`);
  return { response, target, html: await response.text() };
}

// Static HTML read in a JS-disabled context. Block rows: <div class="video-detail"><div><div>key</div><div>value</div></div>…
async function parseRaw(browser: Browser, html: string) {
  const context = await browser.newContext({ javaScriptEnabled: false });
  try {
    const page = await context.newPage();
    await page.setContent(html, { waitUntil: 'domcontentloaded' });
    return await page.evaluate(() => {
      const meta = (sel: string) => document.querySelector<HTMLMetaElement>(sel)?.content ?? null;
      const rows = [...document.querySelectorAll('main .video-detail > div')].map(row => {
        const cells = [...row.children] as HTMLElement[];
        return { key: (cells[0]?.textContent ?? '').trim(), value: (cells[1]?.textContent ?? '').trim() };
      });
      return {
        title: document.title,
        description: meta('meta[name="description"]'),
        robots: meta('meta[name="robots"]'),
        ogImage: meta('meta[property="og:image"]'),
        bodyText: document.body?.textContent?.replace(/\s+/g, ' ') ?? '',
        rows,
      };
    });
  } finally {
    await context.close();
  }
}

// TODO: data-testid for the related-content card link type; filter movie cards by data-content-type.
const relatedMovieHrefs = (movie: MovieDetailPage) => movie.relatedContentSection
  .locator('[data-testid="related-content-card"][data-content-type="movie"]')
  .getByTestId('related-content-card-link').evaluateAll(links => links.map(a => a.getAttribute('href') ?? ''));
// TODO: data-testid for the list block and its cards (DSR-523). Class "listing" from /en/library/video/search.
const listingBlock = (page: Page) => page.locator('main .listing');
const listingCards = (page: Page) => listingBlock(page).locator('a[href*="/library/video/"]');
const videoDetailBlock = (page: Page) => page.locator('main .video-detail');

test.describe('DSR-587 movie detail overlay', () => {
  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-VOV-001 [${lang}] live CF related → movie detail page 200, title shown, movie plays`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
      const { movie, response, target } = await openVideo(page, lang, '01');
      expect(response?.status()).toBe(200);
      expect(page.url(), 'no redirect').toBe(target);
      await expect(movie.title).toHaveText(td['01'].title);
      await expect(movie.player).toBeVisible();
      if (await movie.playerVideo.count()) {
        // DAM video: start playback, wait 5 s, currentTime > 0.
        await movie.playerVideo.click();
        await page.waitForTimeout(playWaitMs);
        const currentTime = await movie.playerVideo.evaluate(v => (v as HTMLVideoElement).currentTime);
        observations.push({ player: 'video', currentTime });
        expect(currentTime, 'video currentTime').toBeGreaterThan(0);
      } else {
        // YouTube: the iframe is cross-origin, so playback is checked through the embed src (TC Expected allows this).
        // Step 3 "click play": the YouTube player is a facade until clicked (DSR-109).
        if (await movie.playerFacade.count()) await movie.playerFacade.click();
        await expect(movie.playerEmbed).toHaveAttribute('src', /\/embed\/[\w-]+/);
        const src = await movie.playerEmbedSrc();
        observations.push({ player: 'youtube', src });
        if (td['01'].movieSourceId) expect(src).toContain(`/embed/${td['01'].movieSourceId.split(/[&?]/)[0]}`);
        else test.info().annotations.push({ type: 'not-verified', description: 'TD-587-01 movieSourceId not recorded in fixtures/dsr-587.ts – embed id not compared' });
      }
    });
  }

  test('DSR-VOV-002 [en] preview-only CF related → 200 on .aem.page, 404 on .aem.live', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    const path = videoPath('en', td['02'].id);
    const preview = await status(request, url(path, hosts().page));
    test.skip(preview.status() === 404, `${notSeeded('02')} (${url(path, hosts().page)} HTTP 404)`);
    expect.soft(preview.status(), '.aem.page').toBe(200);
    expect.soft(await preview.text(), '.aem.page movie title').toContain(td['02'].title);
    expect.soft((await status(request, url(path, hosts().live))).status(), '.aem.live').toBe(404);
  });

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-VOV-003 [${lang}] raw HTML has title / description / og:image and movie title; 0 GraphQL requests`, { tag: ['@overlay', '@auto'] }, async ({ request, browser, page }) => {
      const { response, html } = await rawVideo(request, lang, '01');
      expect(response.status()).toBe(200);
      const raw = await parseRaw(browser, html);
      observations.push({ title: raw.title, description: raw.description, ogImage: raw.ogImage, rows: raw.rows });
      expect.soft(raw.title, '<title>').toBe(`${td['01'].title}${siteTitleSuffix}`);
      // Separator for removed line breaks is TBD (DSR-173 TC 028); check no break and both lines present.
      expect.soft(raw.description ?? '', 'meta description: no line break').not.toMatch(/[\r\n]|<br/i);
      for (const line of td['01'].descriptionLines) expect.soft(raw.description ?? '', 'meta description').toContain(line);
      expect.soft(raw.bodyText, 'body: movie title').toContain(td['01'].title);
      expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//);
      if (/^https?:\/\//.test(raw.ogImage ?? '')) {
        const og = await request.get(raw.ogImage!, { failOnStatusCode: false });
        observations.push({ ogImage: raw.ogImage, status: og.status() });
        expect.soft(og.status(), 'og:image HTTP').toBe(200);
      }

      const graphql: string[] = [];
      page.on('request', r => { if (graphqlPattern.test(r.url())) graphql.push(r.url()); });
      await page.goto(url(videoPath(lang, td['01'].id)), { waitUntil: 'networkidle' });
      observations.push({ graphql });
      expect.soft(graphql, 'requests to */graphql/* or */execute.json/*').toEqual([]);
    });
  }

  test('DSR-VOV-004 [en] CF related name with uppercase / underscore → 404', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    test.skip(!seeded('04'), `${notSeeded('04')} (negative TC: confirm via DSR587_SEEDED)`);
    for (const id of td['04'].ids) expect.soft((await status(request, url(videoPath('en', id)))).status(), id).toBe(404);
  });

  test('DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    test.skip(!seeded('05'), `${notSeeded('05')} (negative TC: confirm via DSR587_SEEDED)`);
    for (const id of [td['05'].id, td['05'].legacyId]) expect.soft((await status(request, url(videoPath('en', id)))).status(), id).toBe(404);
  });

  test('DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .aem.live', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    test.skip(!seeded('06'), `${notSeeded('06')} (negative TC: confirm via DSR587_SEEDED)`);
    const path = videoPath('en', td['06'].id);
    for (const host of [hosts().page, hosts().live]) expect.soft((await status(request, url(path, host))).status(), host).toBe(404);
  });

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-VOV-007 [${lang}] isActive = false → noindex, browser sent to movie list`, { tag: ['@overlay', '@auto'] }, async ({ request, browser, page }) => {
      const { html, target } = await rawVideo(request, lang, '07');
      const raw = await parseRaw(browser, html);
      observations.push({ robots: raw.robots, rows: raw.rows });
      expect.soft(raw.robots ?? '', 'meta robots').toContain('noindex');
      const movie = new MovieDetailPage(page);
      await movie.goto(target);
      await page.waitForTimeout(redirectWaitMs);
      observations.push({ finalUrl: page.url() });
      expect.soft(new URL(page.url()).pathname, 'final URL').toBe(listPath(lang));
      await expect.soft(movie.title, 'movie title not shown').toHaveCount(0);
    });
  }

  test('DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list', { tag: ['@overlay', '@auto'] }, async ({ request, browser, page }) => {
    const { html, target } = await rawVideo(request, 'en', '08');
    const raw = await parseRaw(browser, html);
    observations.push({ robots: raw.robots, rows: raw.rows });
    expect.soft(raw.robots ?? '', 'meta robots').toContain('noindex');
    expect.soft(raw.rows.map(r => r.key || r.value), 'video-detail rows').toEqual(['unavailable']);
    const movie = new MovieDetailPage(page);
    await movie.goto(target);
    await page.waitForTimeout(redirectWaitMs);
    observations.push({ finalUrl: page.url() });
    expect.soft(new URL(page.url()).pathname, 'final URL').toBe(listPath('en'));
    await expect.soft(movie.title, 'movie title not shown').toHaveCount(0);
  });

  test('DSR-VOV-009 [en] CF commune edit shows only after CF related republish', () => { test.fixme(true, manual009); });

  test('DSR-VOV-010 [en] unpublished CF related → 404 on both hosts, absent from query-index', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    test.skip(!seeded('10'), `${notSeeded('10')} (negative TC: confirm via DSR587_SEEDED)`);
    const path = videoPath('en', td['10'].id);
    for (const host of [hosts().page, hosts().live]) expect.soft((await status(request, url(path, host))).status(), host).toBe(404);
    const index = await status(request, url(indexPath));
    const paths = index.ok() ? ((await index.json())?.data ?? []).map((row: { path?: string }) => row.path) : [];
    observations.push({ indexRows: paths.length });
    expect.soft(index.status(), 'query-index HTTP').toBe(200);
    expect.soft(paths, 'query-index paths').not.toContain(path);
  });

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-VOV-011 [${lang}] video/search stays a list page (list block with ≥ 1 card, no video-detail)`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
      const target = url(listPath(lang));
      const response = await page.goto(target);
      observations.push({ url: target, finalUrl: page.url(), status: response?.status() });
      expect(response?.status(), target).toBe(200);
      await expect(listingBlock(page), 'list block').toHaveCount(1);
      await expect(listingCards(page).first(), 'first list card').toBeVisible();
      observations.push({ cards: await listingCards(page).count() });
      await expect(videoDetailBlock(page), 'video-detail block').toHaveCount(0);
      await expect(page.getByText('unavailable', { exact: true }), 'unavailable row').toHaveCount(0);
    });

    test(`DSR-VOV-011 [${lang}] video/tech-talk stays a list page`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
      const target = url(techTalkListPath(lang));
      const response = await page.goto(target);
      observations.push({ url: target, finalUrl: page.url(), status: response?.status() });
      test.skip(response?.status() === 404, `${techTalkPending} (${target})`);
      expect(response?.status(), target).toBe(200);
      await expect(listingBlock(page), 'list block').toHaveCount(1);
      await expect(listingCards(page).first(), 'first list card').toBeVisible();
      await expect(videoDetailBlock(page), 'video-detail block').toHaveCount(0);
    });
  }

  test('DSR-VOV-011 [cn] list pages', () => { test.fixme(true, cnPending); });

  test('DSR-VOV-013 [en] movie list shows standard movies only', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    const target = url(listPath('en'));
    let navigations = 0;
    page.on('framenavigated', f => { if (f === page.mainFrame()) navigations++; });
    const response = await page.goto(target);
    expect(response?.status(), target).toBe(200);
    const listed = await listingCards(page).first().waitFor({ state: 'visible', timeout: 5_000 }).then(() => true, () => false);
    observations.push({ url: target, finalUrl: page.url(), status: response?.status(), mainFrameNavigations: navigations, videoDetailBlocks: await videoDetailBlock(page).count().catch(() => null) });
    expect(listed, `first list card (main-frame navigations: ${navigations})`).toBe(true);
    const hrefs = await listingCards(page).evaluateAll(links => links.map(a => a.getAttribute('href') ?? ''));
    const paths = hrefs.map(h => new URL(h, page.url()).pathname);
    observations.push({ cardPaths: paths });
    expect.soft(paths, `${td['01'].id} card`).toContain(videoPath('en', td['01'].id));
    expect.soft(paths.filter(p => nonStandardHref.test(p)), 'hrefs to /video/search or /video/tech-talk').toEqual([]);
  });

  test('DSR-VOV-014 [en] related movies max 5 when 6 are linked', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    const { movie } = await openVideo(page, 'en', '14');
    await expect(movie.relatedContentSection).toBeVisible();
    const hrefs = await relatedMovieHrefs(movie);
    observations.push({ relatedMovieHrefs: hrefs });
    expect(hrefs).toHaveLength(maxRelatedMovies);
  });

  test('DSR-VOV-015 [en] related movie with isUnavailable = true is hidden', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    const { movie } = await openVideo(page, 'en', '15');
    await expect(movie.relatedContentSection).toBeVisible();
    const hrefs = await relatedMovieHrefs(movie);
    observations.push({ relatedMovieHrefs: hrefs });
    expect.soft(hrefs.some(h => h.endsWith(`/${td['15'].shownId}`)), `${td['15'].shownId} shown`).toBe(true);
    expect.soft(hrefs.filter(h => h.includes(td['15'].hiddenId)), `${td['15'].hiddenId} absent`).toEqual([]);
    expect.soft(await page.content(), 'rendered DOM').not.toContain(td['15'].hiddenId);
  });

  test('DSR-VOV-016 [en] related contents ordered by update date, newest first', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    const { movie } = await openVideo(page, 'en', '14');
    const expected = td['14'].expectedOrderByUpdateDesc;
    test.skip(expected === null, 'TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc)');
    await expect(movie.relatedContentSection).toBeVisible();
    const hrefs = await movie.relatedContentCardLinks.evaluateAll(links => links.map(a => a.getAttribute('href') ?? ''));
    observations.push({ relatedContentHrefs: hrefs });
    expect(hrefs.map(h => new URL(h, page.url()).pathname)).toEqual(expected);
  });

  test('DSR-VOV-017 [en] DSR-173 Group A page switched to the overlay page', { tag: ['@overlay', '@auto'] }, async ({ request }) => {
    // Gate only: the Group A assertions stay in DSR-173.movie-detail.spec.ts (no change). Run them with
    // DSR173_MOVIE_PATH=/en/library/video/qa587-main DSR173_RELATED_PATH=/en/library/video/qa587-rel-a npm run test:dev -- --grep "DSR-MOVIE-0(12|14|20|25|26|27|28|29|33|34) "
    for (const tdId of ['01', '14'] as const) {
      const target = url(videoPath('en', td[tdId].id));
      test.skip((await status(request, target)).status() === 404, `${notSeeded(tdId)} (${target} HTTP 404)`);
    }
    const movieOnOverlay = detailPath('VALID_YOUTUBE', 'en');
    const relatedOnOverlay = detailPath('RELATED_6', 'en');
    observations.push({ groupA: dsr173GroupA, movieOnOverlay, relatedOnOverlay });
    test.skip(movieOnOverlay !== videoPath('en', td['01'].id) || relatedOnOverlay !== videoPath('en', td['14'].id),
      `DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now ${movieOnOverlay} / ${relatedOnOverlay}); run DSR-173 Group A with them`);
  });

  for (const lang of ['ja', 'en'] as const) {
    test(`DSR-VOV-018 [${lang}] language variant: 200, html lang, title`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
      const { movie, response } = await openVideo(page, lang, '01');
      expect(response?.status()).toBe(200);
      const actualLang = await page.locator('html').getAttribute('lang');
      observations.push({ htmlLang: actualLang });
      expect.soft(actualLang, 'html lang').toBe(htmlLang[lang]);
      await expect.soft(movie.title).toHaveText(td['01'].title);
    });
  }

  test('DSR-VOV-018 [cn] language variant', () => { test.fixme(true, cnPending); });
});
