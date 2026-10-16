import { test, expect, type Page } from '@playwright/test';
import { CatalogDisplayPage } from '../../pages/CatalogDisplayPage';
import { VideoPlayerPage } from '../../pages/VideoPlayerPage';
import { viewports, languages, type Language, catalogPath, videoPath, youtubeVideos, embedDomains, playerRequests, facadeThumbnails, embedSrc, expectedLabel, today, qa190, notRendered, type CatalogItem } from '../../fixtures/dsr-557';

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
  await expect(catalog.block).toBeVisible();
  await expect(catalog.items.first()).toBeVisible();
  observations.push({ language: lang, url: page.url(), status: response?.status(), items: data });
  return { catalog, data };
}
async function openVideo(page: Page, lang: Language, id: string) {
  const video = new VideoPlayerPage(page);
  const response = await video.goto(videoPath(lang, id));
  // Blocked: no DEV data — see docs/DSR-557/discovery-DEV.md
  test.skip(response?.status() === 404, `Blocked – no DEV data for ${lang} video page (${videoPath(lang, id)} HTTP 404)`);
  expect(response?.status()).toBe(200);
  await expect(video.player).toBeVisible();
  return video;
}
function pick(data: CatalogItem[], lang: Language, title: string, match: (item: CatalogItem) => boolean, name: string): CatalogItem {
  const item = data.find(i => i.catalogTitle === title && match(i));
  test.skip(!item, `Blocked – no DEV data for ${name} "${title}" (${lang})`);
  return item!;
}
// Known data/product gaps (fixtures notRendered): record instead of failing; fixme if the TC depends on the card.
async function noteNotRendered(catalog: CatalogDisplayPage, title: string, fixme = false) {
  const reason = notRendered[title];
  if (!reason || (await catalog.item(title).count())) return;
  test.info().annotations.push({ type: 'not-rendered', description: `${title}: ${reason}` });
  test.fixme(fixme, `${title} not rendered – ${reason}`);
}

for (const lang of languages) {
  test.describe(lang, () => {
    test('DSR-CATV-012 catalog item shows thumbnail and title', { tag: ['@auto'] }, async ({ page }) => {
      const { catalog, data } = await openCatalog(page, lang);
      const seeded = Object.values(qa190).flat();
      for (const title of seeded.filter(t => data.some(i => i.catalogTitle === t))) {
        if (notRendered[title]) { await noteNotRendered(catalog, title); continue; }
        expect.soft(await catalog.item(title).count(), `qa190 card "${title}"`).toBe(1);
      }
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

    test('DSR-CATV-013 PDF item without form opens in a new tab', { tag: ['@auto'] }, async ({ page, context }) => {
      const { catalog, data } = await openCatalog(page, lang);
      const pdf = pick(data, lang, qa190.pdf, i => i.catalogType === 'pdf' && i.requiresForm !== true && !!i.pdfAsset, 'pdf requiresForm=false item');
      const item = catalog.item(pdf.catalogTitle);
      await expect(item).toHaveCount(1);
      for (const link of await catalog.links(item).all()) {
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

    for (const [number, title, requiresForm, cf] of [[16, 'e-book item opens ebookUrl without form', false, qa190.ebook], [17, 'e-book item flagged requiresForm opens ebookUrl without form', true, qa190.ebookForm]] as const) {
      test(`DSR-CATV-0${number} ${title}`, { tag: ['@auto'] }, async ({ page, context }) => {
        const { catalog, data } = await openCatalog(page, lang);
        const ebook = pick(data, lang, cf, i => i.catalogType === 'ebook' && !!i.ebookUrl && (i.requiresForm === true) === requiresForm, `ebook requiresForm=${requiresForm} item`);
        await noteNotRendered(catalog, cf, true);
        const item = catalog.item(ebook.catalogTitle);
        await expect(item).toHaveCount(1);
        const link = catalog.title(item);
        expect(normalize(new URL((await link.getAttribute('href'))!, page.url()).href)).toBe(normalize(ebook.ebookUrl!));
        const navigation = context.waitForEvent('request', { predicate: r => r.isNavigationRequest() && normalize(r.url()) === normalize(ebook.ebookUrl!), timeout: 15_000 }).catch(() => null);
        const [popup] = await Promise.all([page.waitForEvent('popup'), link.click()]);
        const request = await navigation;
        await popup.waitForLoadState('domcontentloaded');
        const forms = await popup.locator('form').count();
        observations.push({ ebookUrl: ebook.ebookUrl, requiresForm: ebook.requiresForm, navigatedTo: request?.url(), popupUrl: popup.url(), forms, originalUrl: page.url() });
        expect(request, 'navigation to ebookUrl').not.toBeNull();
        expect(forms).toBe(0);
      });
    }

    for (const [number, title, kind, titles] of [[18, 'NEW label within 10 days of publishDate', 'NEW', qa190.new], [19, 'UPDATE label within 10 days of updateDate', 'UPDATE', qa190.upd], [20, 'only NEW when publishDate and updateDate both apply', 'BOTH', qa190.both]] as const) {
      test(`DSR-CATV-0${number} ${title}`, { tag: ['@auto'] }, async ({ page }) => {
        const { catalog, data } = await openCatalog(page, lang);
        const on = today();
        // Blocked: dates come from the dm-catalog-list GraphQL response; DOM shows one formatted date only.
        test.skip(data.every(i => !i.publishDate && !i.updateDate), `Blocked – publishDate/updateDate not exposed (checked DOM .cards-card-meta and dm-catalog-list response) (${lang})`);
        // Only this TC's qa190 rows (JOB-20261016-06).
        const own = data.filter(i => (titles as readonly string[]).includes(i.catalogTitle));
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

    test('DSR-CATV-001 no autoplay before click', { tag: ['@auto'] }, async ({ page }) => {
      const video = await openVideo(page, lang, youtubeVideos[0].id);
      await page.waitForLoadState('networkidle');
      const srcs = await video.iframeSrcs(); const paused = await video.videosPaused();
      observations.push({ url: page.url(), iframes: srcs, videoPaused: paused, facadeVisible: await video.facade.isVisible() });
      expect(srcs.filter(s => /[?&]autoplay=1(&|$)/.test(s))).toEqual([]);
      expect(paused.every(Boolean)).toBe(true);
    });

    for (const v of youtubeVideos) {
      test(`DSR-CATV-002 YouTube embed src after click (${v.id})`, { tag: ['@auto'] }, async ({ page }) => {
        const video = await openVideo(page, lang, v.id);
        await video.facade.click();
        await expect(video.embed).toBeAttached();
        const src = (await video.embed.getAttribute('src'))!;
        observations.push({ url: page.url(), movieSourceId: v.movieSourceId, src });
        expect(new URL(src).hostname).toMatch(/^(www\.)?youtube(-nocookie)?\.com$/);
        expect(src).toContain(v.youtubeId);
      });
    }

    test('DSR-CATV-006 no YouTube/Youku request before interaction', { tag: ['@auto'] }, async ({ page }) => {
      // DSR-109 facade: thumbnail allowed (QA decision 2026-10-15)
      const requests: string[] = [];
      page.on('request', r => { if (embedDomains.test(r.url())) requests.push(r.url()); });
      const video = await openVideo(page, lang, youtubeVideos[0].id);
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
