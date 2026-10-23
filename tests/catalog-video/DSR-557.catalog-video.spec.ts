import { test, expect, type Page } from '@playwright/test';
import { CatalogDisplayPage } from '../../pages/CatalogDisplayPage';
import { CatalogDetailPage } from '../../pages/CatalogDetailPage';
import { VideoPlayerPage } from '../../pages/VideoPlayerPage';
import { viewports, languages, type Language, catalogPath, videoPath, videoHosts, youtubeVideos, damVideos, embedDomains, playerRequests, facadeThumbnails, embedSrc, youkuVideos, youkuEmbedSrc, youkuFrameHost, cnSwitchPending, expectedLabel, today, qa190, core, type CoreKey, coreItem, contentCfPath, oldFolder, type CatalogItem, listBlocked, detailPath } from '../../fixtures/dsr-557';

test.use({ viewport: viewports.PC });
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});
const normalize = (url: string) => { const u = new URL(url); u.pathname = u.pathname.replace(/\/+$/, '') || '/'; return u.href; };

async function openCatalog(page: Page, lang: Language) {
  const catalog = new CatalogDisplayPage(page);
  const { response, data } = await catalog.goto(catalogPath(lang));
  // Blocked: no DEV data — see docs/DSR-557/discovery-DEV.md
  test.skip(response?.status() === 404, `Blocked – no DEV data for ${lang} catalog page (${catalogPath(lang)} HTTP 404)`);
  expect(response?.status()).toBe(200);
  observations.push({ language: lang, url: page.url(), status: response?.status(), items: data });
  // JOB-20261022-14 rule 3: empty dsr-catalog-list → blocked by the AEM query deploy, not a fail.
  test.skip(!data.length, `${listBlocked}: dsr-catalog-list returned 0 items (${lang})`);
  await expect(catalog.block).toBeVisible();
  await expect(catalog.items.first()).toBeVisible();
  return { catalog, data };
}
async function openVideo(page: Page, host: string, lang: Language, id: string) {
  const video = new VideoPlayerPage(page);
  const target = `${host}${videoPath(lang, id)}`;
  const response = await video.goto(target);
  // Blocked: overlay page not generated (CF related not published on this tier)
  test.skip(response?.status() === 404, `Blocked – no DEV data: ${target} HTTP 404`);
  expect(response?.status()).toBe(200);
  expect(page.url(), 'no redirect').toBe(target);
  await expect(video.player).toBeVisible();
  return video;
}
// Core catalogs: the re-seeded content CF /content/dam/common/{lang}/catalogs/{id} (JOB-20261020-04), never the old folder.
function pick(data: CatalogItem[], lang: Language, key: CoreKey, match: (item: CatalogItem) => boolean, name: string): CatalogItem {
  const item = coreItem(data, lang, key);
  observations.push({ core: core[key], contentCf: contentCfPath(lang, core[key]), inResponse: !!item, item: item ?? null });
  test.skip(!item, `Blocked – no DEV data: ${contentCfPath(lang, core[key])} absent from dsr-catalog-list (${lang})`);
  test.skip(!match(item!), `Blocked – data: ${core[key]} (${lang}) is not a ${name}: catalogType=${item!.catalogType}, requiresForm=${item!.requiresForm}, ebookUrl=${item!.ebookUrl}`);
  return item!;
}
function cardsOf(catalog: CatalogDisplayPage, data: CatalogItem[], cf: CatalogItem) {
  const match = catalog.cards(data, cf);
  test.skip(!match, `Blocked – title "${cf.catalogTitle}" is shared by CFs that link differently; card cannot be attributed to ${cf._path}`);
  return match!;
}

for (const lang of languages) {
  test.describe(lang, () => {
    test('DSR-CATV-012 catalog item shows thumbnail and title', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
      const { catalog, data } = await openCatalog(page, lang);
      // Core: ≥ 1 card (ja and en CFs with identical values can share a title). Old-folder NEW/UPDATE CFs: exactly 1.
      for (const key of Object.keys(core) as CoreKey[]) {
        const cf = coreItem(data, lang, key);
        if (cf) expect.soft(await catalog.item(cf.catalogTitle).count(), `core card ${core[key]} "${cf.catalogTitle}"`).toBeGreaterThan(0);
      }
      for (const title of [...qa190.new, ...qa190.upd, ...qa190.both].filter(t => data.some(i => i.catalogTitle === t))) {
        expect.soft(await catalog.item(title).count(), `qa190 card "${title}"`).toBe(1);
      }
      // Merge record: pre-merge CFs in the list response (expected none with dsr-catalog-list, BL-OVL-1 2026-10-20 12:40).
      observations.push({ language: lang, oldFolderItems: data.filter(i => i._path?.startsWith(oldFolder)).map(i => i._path), otherLangItems: data.filter(i => /^\/content\/dam\/common\/(ja|en|cn)\//.test(i._path ?? '') && !i._path!.startsWith(`/content/dam/common/${lang}/`)).map(i => i._path) });
      const count = await catalog.items.count();
      for (let i = 0; i < count; i++) {
        const item = catalog.items.nth(i);
        const title = (await catalog.title(item).innerText()).trim();
        const img = catalog.image(item);
        await img.scrollIntoViewIfNeeded();
        await expect.poll(() => img.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
        observations.push({ index: i, title, src: await img.getAttribute('src'), naturalWidth: await img.evaluate(el => (el as HTMLImageElement).naturalWidth), meta: await catalog.meta(item).allInnerTexts() });
        expect.soft(title, `item ${i} title`).not.toBe('');
      }
    });

    test('DSR-CATV-013 PDF item without form opens in a new tab', { tag: ['@overlay', '@auto'] }, async ({ page, context }) => {
      const { catalog, data } = await openCatalog(page, lang);
      const pdf = pick(data, lang, 'pdf', i => i.catalogType === 'pdf' && i.requiresForm !== true && !!i.pdfAsset, 'pdf requiresForm=false item');
      const { cards, twins } = cardsOf(catalog, data, pdf);
      await expect(cards).toHaveCount(twins);
      const item = cards.first();
      for (const link of await catalog.links(cards).all()) {
        const attrs = await link.evaluate(a => ({ href: a.getAttribute('href'), target: a.getAttribute('target'), rel: a.getAttribute('rel'), download: a.hasAttribute('download') }));
        observations.push({ link: attrs });
        expect.soft(attrs.target).toBe('_blank');
        expect.soft(attrs.rel ?? '').toMatch(/\bnoopener\b/);
        expect.soft(attrs.download).toBe(false);
      }
      const origin = page.url();
      const href = (await catalog.title(item).getAttribute('href'))!;
      const pdfResponse = context.waitForEvent('response', { predicate: r => normalize(r.url()) === normalize(new URL(href, origin).href), timeout: 15_000 }).catch(() => null);
      const [popup] = await Promise.all([page.waitForEvent('popup'), catalog.title(item).click()]);
      const response = await pdfResponse;
      const type = (await response?.allHeaders())?.['content-type'] ?? '';
      const disposition = (await response?.allHeaders())?.['content-disposition'] ?? '';
      observations.push({ popupUrl: popup.url(), responseUrl: response?.url(), status: response?.status(), contentType: type, contentDisposition: disposition, originalUrl: page.url(), pages: context.pages().length });
      expect(new URL(response?.url() ?? popup.url()).pathname.endsWith('.pdf') || type.includes('application/pdf')).toBe(true);
      expect(page.isClosed()).toBe(false);
      expect(page.url()).toBe(origin);
      expect(context.pages()).toContain(popup);
    });

    for (const [number, title, requiresForm, cf] of [[16, 'e-book item opens ebookUrl without form', false, 'ebook']] as const) {
      test(`DSR-CATV-0${number} ${title}`, { tag: ['@overlay', '@auto'] }, async ({ page, context }) => {
        const { catalog, data } = await openCatalog(page, lang);
        const ebook = pick(data, lang, cf, i => i.catalogType === 'ebook' && !!i.ebookUrl && (i.requiresForm === true) === requiresForm, `ebook requiresForm=${requiresForm} item`);
        const { cards, twins } = cardsOf(catalog, data, ebook);
        await expect(cards).toHaveCount(twins);
        const item = cards.first();
        const link = catalog.title(item);
        expect(normalize(new URL((await link.getAttribute('href'))!, page.url()).href)).toBe(normalize(ebook.ebookUrl!));
        // QA decision 2026-10-19 (JOB-20261019-01): count forms on the DSR origin only, between the click and the popup navigation; forms on the external e-book site are ignored.
        const dsrOrigin = new URL(page.url()).origin;
        const formsBefore = await page.locator('form').count();
        const navigation = context.waitForEvent('request', { predicate: r => r.isNavigationRequest() && normalize(r.url()) === normalize(ebook.ebookUrl!), timeout: 15_000 }).catch(() => null);
        const [popup] = await Promise.all([page.waitForEvent('popup'), link.click()]);
        const request = await navigation;
        const formsOnPage = await page.locator('form').count();
        await popup.waitForLoadState('domcontentloaded');
        const popupOnDsr = new URL(popup.url()).origin === dsrOrigin;
        const formsOnPopup = popupOnDsr ? await popup.locator('form').count() : 0;
        observations.push({ ebookUrl: ebook.ebookUrl, requiresForm: ebook.requiresForm, navigatedTo: request?.url(), popupUrl: popup.url(), dsrOrigin, formsBefore, formsOnPage, popupOnDsr, formsOnPopup, externalPopupFormsIgnored: popupOnDsr ? null : await popup.locator('form').count(), originalUrl: page.url() });
        expect(request, 'navigation to ebookUrl').not.toBeNull();
        expect(formsOnPage + formsOnPopup, 'forms on DSR origin').toBe(0);
      });
    }

    // DSR-655 Y3: an e-book with requiresForm is gated like a PDF; the card links to the overlay detail page with the form (JOB-20261022-14 rule 2).
    test('DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
      const { catalog, data } = await openCatalog(page, lang);
      const ebook = pick(data, lang, 'ebookForm', i => i.catalogType === 'ebook' && i.requiresForm === true, 'ebook requiresForm=true item');
      const { cards, twins } = cardsOf(catalog, data, ebook);
      await expect(cards).toHaveCount(twins);
      const origin = page.url();
      const hrefs = await catalog.links(cards.first()).evaluateAll((as, base) => as.map(a => ({ href: new URL(a.getAttribute('href')!, base).href, target: a.getAttribute('target') })), origin);
      const expected = new URL(detailPath(lang, core.ebookForm), origin).href;
      observations.push({ requiresForm: ebook.requiresForm, ebookUrl: ebook.ebookUrl, links: hrefs, expected });
      expect.soft(hrefs.filter(l => normalize(l.href) !== normalize(expected)), 'card links not pointing to the overlay detail page').toEqual([]);
      await page.goto(expected);
      const detail = new CatalogDetailPage(page);
      observations.push({ finalUrl: page.url(), forms: await detail.form.count() });
      expect(normalize(page.url()), 'stays on the detail page').toBe(normalize(expected));
      // Read-only: the form is never submitted.
      await expect(detail.form, 'download form').toHaveCount(1);
    });

    for (const [number, title, kind, titles] of [[18, 'NEW label within 10 days of publishDate', 'NEW', qa190.new], [19, 'UPDATE label within 10 days of updateDate', 'UPDATE', qa190.upd], [20, 'only NEW when publishDate and updateDate both apply', 'BOTH', qa190.both]] as const) {
      test(`DSR-CATV-0${number} ${title}`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
        const { catalog, data } = await openCatalog(page, lang);
        const on = today();
        // Blocked: dates come from the dsr-catalog-list GraphQL response; DOM shows one formatted date only.
        test.skip(data.every(i => !i.publishDate && !i.updateDate), `Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dsr-catalog-list response) (${lang})`);
        // Only this TC's qa190 rows, re-seeded by Agent Author in the BL-OVL-1 layout (TD-190-DSR, JOB-20261023-06): content CF /content/dam/common/{lang}/catalogs/qa190-cat-*.
        const own = data.filter(i => (titles as readonly string[]).includes(i.catalogTitle) && i._path?.startsWith(contentCfPath(lang, 'qa190-cat-')));
        test.skip(!own.length, `Blocked – no DEV data for ${titles.join(', ')} (${lang})`);
        const rows = [];
        for (const item of own) {
          const card = catalog.item(item.catalogTitle);
          const rendered = await card.count();
          const shown = rendered === 1 ? await catalog.label(card) : null;
          rows.push({ title: item.catalogTitle, publishDate: item.publishDate, updateDate: item.updateDate, today: on, expected: expectedLabel(item, on), shown, rendered, meta: rendered === 1 ? await catalog.meta(card).allInnerTexts() : [] });
        }
        observations.push({ language: lang, rows });
        expect(rows.filter(r => r.shown !== r.expected)).toEqual([]);
        const both = (i: CatalogItem) => expectedLabel({ publishDate: i.publishDate, updateDate: null }, on) === 'NEW' && expectedLabel({ publishDate: null, updateDate: i.updateDate }, on) === 'UPDATE';
        const hasCase = kind === 'BOTH' ? own.some(both) : own.some(i => expectedLabel(i, on) === kind);
        test.skip(!hasCase, `Blocked – no DEV data for ${kind === 'BOTH' ? 'publishDate and updateDate both within 10 days' : kind + ' case'} (${lang}, today ${on}); all items' labels match the rule`);
      });
    }

  });
}

// Video TCs on overlay pages (JOB-20261020-02): YouTube qa587-main, DAM mp4 qa557-dam, on .aem.page and .aem.live.
for (const lang of languages) {
  for (const host of videoHosts()) {
    const tier = new URL(host).hostname.endsWith('.aem.live') ? 'live' : 'page';
    test.describe(`${lang} video ${tier}`, () => {
      for (const id of [youtubeVideos[0].id, damVideos[0].id]) {
        test(`DSR-CATV-001 [${lang}] no autoplay before click (${id}, .aem.${tier})`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
          const video = await openVideo(page, host, lang, id);
          await page.waitForLoadState('networkidle');
          const srcs = await video.iframeSrcs(); const paused = await video.videosPaused();
          const autoplayAttr = await video.page.locator('video').evaluateAll(v => v.map(x => (x as HTMLVideoElement).autoplay));
          observations.push({ url: page.url(), iframes: srcs, videoPaused: paused, videoAutoplay: autoplayAttr, facadeVisible: await video.facade.isVisible(), damVideo: await video.video.count() });
          if (id === damVideos[0].id) await expect(video.video, 'DAM <video>').toHaveCount(1);
          expect(srcs.filter(s => /[?&]autoplay=1(&|$)/.test(s))).toEqual([]);
          expect(paused.every(Boolean)).toBe(true);
        });
      }

      for (const v of youtubeVideos) {
        test(`DSR-CATV-002 [${lang}] YouTube embed src after click (${v.id}, .aem.${tier})`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
          const video = await openVideo(page, host, lang, v.id);
          await video.facade.click();
          await expect(video.embed).toBeAttached();
          const src = (await video.embed.getAttribute('src'))!;
          observations.push({ url: page.url(), movieSourceId: v.movieSourceId, src });
          expect(new URL(src).hostname).toMatch(/^(www\.)?youtube(-nocookie)?\.com$/);
          expect(src).toContain(v.youtubeId);
        });
      }

      test(`DSR-CATV-006 [${lang}] no YouTube/Youku request before interaction (${youtubeVideos[0].id}, .aem.${tier})`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
        // DSR-109 facade: thumbnail allowed (QA decision 2026-10-15)
        const requests: string[] = [];
        page.on('request', r => { if (embedDomains.test(r.url())) requests.push(r.url()); });
        const video = await openVideo(page, host, lang, youtubeVideos[0].id);
        await page.waitForLoadState('networkidle');
        const before = [...requests]; const iframes = await video.iframeSrcs();
        const playerBefore = before.filter(u => playerRequests.test(u));
        await video.facade.click();
        await expect(video.embed).toBeAttached();
        const src = await video.embed.getAttribute('src');
        observations.push({ url: page.url(), requestsBeforeInteraction: before, playerRequestsBefore: playerBefore, thumbnailsBefore: before.filter(u => facadeThumbnails.test(u)), iframesBefore: iframes, iframeAfterClick: src, requestsAfterClick: requests.slice(before.length) });
        expect.soft(iframes, 'iframes before interaction').toEqual([]);
        expect.soft(playerBefore, 'embed/player requests before interaction').toEqual([]);
        expect(src ?? '', 'iframe src after click').toMatch(embedSrc);
      });
    });
  }
}

// Youku TCs 3.0 / 7.0 / 11.0 (JOB-20261023-03, TD-557-YOUKU). TC 3.0 is cn in the TC file; DEV has no cn → ja/en overlay pages.
const cspViolations = (page: Page) => page.evaluate(() => (window as unknown as { __csp?: string[] }).__csp ?? []);
const watchCsp = (page: Page) => page.addInitScript(() => {
  const w = window as unknown as { __csp: string[] };
  w.__csp = [];
  document.addEventListener('securitypolicyviolation', e => w.__csp.push(`${e.violatedDirective} ${e.blockedURI}`));
});
for (const lang of languages) {
  for (const host of videoHosts()) {
    const tier = new URL(host).hostname.endsWith('.aem.live') ? 'live' : 'page';
    test.describe(`${lang} youku ${tier}`, () => {
      for (const v of youkuVideos) {
        test(`DSR-CATV-003 [${lang}] Youku embed src after click (${v.id}, .aem.${tier})`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
          const video = await openVideo(page, host, lang, v.id);
          await page.waitForLoadState('networkidle');
          const before = await video.iframeSrcs();
          await video.facade.click();
          await expect(video.embed).toBeAttached();
          const src = (await video.embed.getAttribute('src'))!;
          observations.push({ url: page.url(), movieSourceId: v.movieSourceId, iframesBefore: before, src });
          test.info().annotations.push({ type: 'not-verified', description: 'TC A4: Youku playback not asserted from the VPS network; embed src only' });
          expect.soft(before, 'iframes before click').toEqual([]);
          expect(new URL(src).hostname).toBe('player.youku.com');
          expect(src.split('?')[0]).toBe(youkuEmbedSrc(v.movieSourceId));
          expect(src).not.toMatch(/[?&]autoplay=1(&|$)/);
        });

        test(`DSR-CATV-007 [${lang}] CSP allows the Youku embed, no violation (${v.id}, .aem.${tier})`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
          await watchCsp(page);
          const errors: string[] = [];
          page.on('console', m => { if (m.type() === 'error' && /Content Security Policy|Refused to/i.test(m.text())) errors.push(m.text()); });
          const video = await openVideo(page, host, lang, v.id);
          const response = await page.request.get(page.url(), { failOnStatusCode: false });
          const csp = response.headers()['content-security-policy'] ?? '';
          const frameSrc = csp.split(';').map(d => d.trim()).find(d => d.startsWith('frame-src')) ?? '';
          await video.facade.click();
          await expect(video.embed).toBeAttached();
          await page.waitForTimeout(3_000);
          const violations = await cspViolations(page);
          observations.push({ url: page.url(), frameSrc, violations, consoleErrors: errors, src: await video.embed.getAttribute('src') });
          test.info().annotations.push({ type: 'not-verified', description: 'TC 7.0 "only the required domains are added" not asserted (no approved domain list); frame-src recorded in observed' });
          expect(frameSrc.split(/\s+/), 'CSP frame-src').toContain(youkuFrameHost);
          expect.soft(violations, 'securitypolicyviolation events').toEqual([]);
          expect.soft(errors, 'console CSP errors').toEqual([]);
        });
      }
    });
  }
}
test('DSR-CATV-011 [cn] Youku on cn pages, YouTube on ja/en (switching rule)', () => { test.fixme(true, cnSwitchPending); });
