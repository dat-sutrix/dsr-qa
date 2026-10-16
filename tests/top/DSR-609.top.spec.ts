import { test, expect, type Page } from '@playwright/test';
import { TopPage, colours } from '../../pages/TopPage';
import { languages, type Language, viewports, searchKeyword, recommendMax, ratioTolerance, newsIndexPath, newsPrefix, newsCount, titleLineLimit, emptyIndex, knownConsoleNoise, publishTime } from '../../fixtures/dsr-609';

test.use({ viewport: viewports.PC });
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({ page }, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
  await info.attach('page', { body: await page.screenshot({ fullPage: true }), contentType: 'image/png' }).catch(() => undefined);
});

async function openTop(page: Page, lang: Language, baseURL: string | undefined) {
  const top = new TopPage(page);
  const response = await top.goto(lang, baseURL!);
  observations.push({ language: lang, host: top.host, attempts: top.attempts });
  test.skip(response?.status() === 404, `blocked-data: /${lang}/top-page HTTP 404 on .aem.live and .aem.page`);
  expect(response?.status(), 'top page HTTP status').toBe(200);
  return top;
}

for (const lang of languages) {
  test.describe(lang, () => {
    test(`DSR-TOP-004 [${lang}] quick search hover style and keyword search navigates to product search`, { tag: ['@auto'] }, async ({ page, baseURL }) => {
      const top = await openTop(page, lang, baseURL);
      await expect(top.search, 'quick search box').toBeVisible();
      const parts = { box: top.search, title: top.searchTitle, input: top.searchInput };
      const before: Record<string, unknown> = {};
      const after: Record<string, unknown> = {};
      for (const [k, el] of Object.entries(parts)) before[k] = await colours(el);
      await top.search.hover();
      await page.waitForTimeout(500);
      for (const [k, el] of Object.entries(parts)) after[k] = await colours(el);
      // Text or background colour must change; border-only change is recorded but does not count.
      const changed = Object.keys(parts).filter(k => {
        const b = before[k] as Record<string, string>, a = after[k] as Record<string, string>;
        return b.color !== a.color || b.backgroundColor !== a.backgroundColor;
      });
      observations.push({ hover: { before, after, textOrBackgroundChanged: changed } });
      expect.soft(changed, 'text/background colour changes on hover').not.toEqual([]);

      const action = await top.search.getAttribute('action');
      await top.searchInput.fill(searchKeyword);
      const [nav] = await Promise.all([
        page.waitForResponse(r => r.request().isNavigationRequest() && r.url().includes(`q=${searchKeyword}`)),
        top.searchInput.press('Enter'),
      ]);
      await page.waitForLoadState('domcontentloaded');
      observations.push({ search: { action, keyword: searchKeyword, url: page.url(), status: nav.status() } });
      expect(page.url(), 'navigated away from top page').not.toContain('/top-page');
      expect(nav.status(), `product search page ${nav.url()} HTTP status`).toBe(200);
    });

    test(`DSR-TOP-005 [${lang}] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link`, { tag: ['@auto'] }, async ({ page, baseURL }) => {
      const top = await openTop(page, lang, baseURL);
      await top.recommend.scrollIntoViewIfNeeded();
      await top.scrollThrough();
      const cards = await top.recommendCards.evaluateAll(items => items.map(li => {
        const img = li.querySelector('img');
        const r = img?.getBoundingClientRect();
        const radius = (e: Element | null) => (e ? getComputedStyle(e).borderTopLeftRadius : null);
        const href = (sel: string) => {
          const a = li.querySelector(sel)?.closest('a');
          return a ? a.getAttribute('href') : null;
        };
        return {
          title: li.querySelector('h3')?.textContent?.trim(),
          ratio: r && r.height ? r.width / r.height : null,
          size: r ? [r.width, r.height] : null,
          // TODO: data-testid top-recommend-card / -media / -title / -desc
          radius: { card: radius(li.querySelector('.top-recommend-card')), media: radius(li.querySelector('.top-recommend-media')), img: radius(img) },
          href: { image: href('img'), title: href('.top-recommend-title'), description: href('.top-recommend-desc') },
        };
      }));
      observations.push({ cards });
      expect(cards.length, 'card count').toBeGreaterThan(0);
      expect.soft(cards.length, `card count ≤ ${recommendMax}`).toBeLessThanOrEqual(recommendMax);
      const ratios = cards.map(c => c.ratio!).filter(Boolean);
      const spread = (Math.max(...ratios) - Math.min(...ratios)) / Math.min(...ratios);
      expect.soft(spread, `image aspect ratios within ±${ratioTolerance * 100}%`).toBeLessThanOrEqual(ratioTolerance);
      for (const [i, c] of cards.entries()) {
        const rounded = Object.values(c.radius).some(v => v !== null && parseFloat(v) > 0);
        expect.soft(rounded, `card ${i + 1} border-radius > 0 (card/media/img: ${JSON.stringify(c.radius)})`).toBe(true);
      }
      const { image, title, description } = cards[0].href;
      for (const [part, h] of Object.entries(cards[0].href)) {
        expect.soft(h, `card 1 ${part} is inside a link with a non-empty href`).toBeTruthy();
        expect.soft(h, `card 1 ${part} href is not #`).not.toBe('#');
      }
      expect.soft(new Set([image, title, description]).size, 'card 1 image/title/description share one href').toBe(1);
    });

    test(`DSR-TOP-006 [${lang}] NEWS shows the ${newsCount} newest items by publish date`, { tag: ['@auto'] }, async ({ page, baseURL }) => {
      const requested: string[] = [];
      page.on('request', r => { if (/query-index\.json/.test(r.url())) requested.push(r.url()); });
      const top = await openTop(page, lang, baseURL);
      await top.news.scrollIntoViewIfNeeded();
      await expect(top.newsItems.first(), 'first NEWS item').toBeVisible();
      const requestedPaths = requested.map(u => new URL(u).pathname);

      // Expected rows: the TC index; if it does not exist, the index the page actually requested (filtered to /{lang}/news/).
      const tcIndex = await page.request.get(top.host + newsIndexPath(lang));
      let source = newsIndexPath(lang);
      let rows: Record<string, unknown>[] = [];
      if (tcIndex.ok()) rows = (await tcIndex.json()).data;
      else if (requested.length) {
        source = `${requestedPaths[0]} (filtered ${newsPrefix(lang)}; ${newsIndexPath(lang)} HTTP ${tcIndex.status()})`;
        rows = ((await (await page.request.get(requested[0])).json()).data as Record<string, unknown>[]).filter(r => String(r.path).startsWith(newsPrefix(lang)));
      }
      const dated = rows.map(r => ({ path: String(r.path), title: r.title, publicationdate: r.publicationdate, t: publishTime(r.publicationdate) }))
        .sort((a, b) => (b.t ?? -Infinity) - (a.t ?? -Infinity));
      const expected = dated.slice(0, newsCount);

      // TODO: data-testid top-news-item / top-news-title
      const shown = await top.newsItems.evaluateAll(items => items.map(li => ({
        href: li.querySelector('a')?.getAttribute('href') ?? '',
        title: li.querySelector('h3')?.textContent?.trim(),
        date: li.querySelector('time')?.getAttribute('datetime'),
      })));
      const links: { href: string; status: number }[] = [];
      for (const s of shown) links.push({ href: s.href, status: (await page.request.get(new URL(s.href, page.url()).href)).status() });
      observations.push({ requestedIndex: requested, tcIndexStatus: tcIndex.status(), expectedSource: source, indexRows: dated.length, expected, shown, links });

      expect.soft(requestedPaths, `page requests ${newsIndexPath(lang)}`).toContain(newsIndexPath(lang));
      expect(rows.length, 'news index rows available for comparison').toBeGreaterThan(0);
      expect.soft(shown.length, 'NEWS item count').toBe(Math.min(newsCount, dated.length));
      // Position i must hold a row with the same publish date as the i-th newest row (ties in any order).
      const shownDates = shown.map(s => dated.find(d => d.path === s.href.replace(/^https?:\/\/[^/]+/, ''))?.publicationdate ?? null);
      expect.soft(shownDates.map(d => publishTime(d)), 'publish dates of shown items (desc)').toEqual(expected.map(e => e.t));
      for (const l of links) expect.soft(l.status, `${l.href} HTTP status`).toBe(200);
    });

    test(`DSR-TOP-007 [${lang}] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP`, { tag: ['@auto'] }, async ({ page, baseURL }) => {
      const top = await openTop(page, lang, baseURL);
      const measured: Record<string, { lines: number; natural: number; clamp: string; textOverflow: string; ratio: number | null }[]> = {};
      for (const vp of ['PC', 'SP'] as const) {
        await page.setViewportSize(viewports[vp]);
        await top.news.scrollIntoViewIfNeeded();
        await page.waitForTimeout(500);
        measured[vp] = await top.newsItems.evaluateAll(items => items.map(li => {
          // TODO: data-testid top-news-title / top-news-media
          const t = li.querySelector('.top-news-title') as HTMLElement;
          const s = getComputedStyle(t);
          const lh = parseFloat(s.lineHeight);
          // Natural height: unclamped clone in the same container.
          const c = t.cloneNode(true) as HTMLElement;
          c.style.cssText = 'display:block;-webkit-line-clamp:unset;line-clamp:unset;max-height:none;height:auto;overflow:visible;white-space:normal';
          t.parentElement!.appendChild(c);
          const natural = Math.round(c.getBoundingClientRect().height / lh);
          c.remove();
          const m = li.querySelector('.top-news-media')!.getBoundingClientRect();
          return { lines: Math.round(t.getBoundingClientRect().height / lh), natural, clamp: s.webkitLineClamp, textOverflow: s.textOverflow, ratio: m.height ? m.width / m.height : null };
        }));
      }
      observations.push({ measured, limits: titleLineLimit });
      const exercised = (['PC', 'SP'] as const).filter(vp => measured[vp].some(m => m.natural > titleLineLimit[vp]));
      observations.push({ exercised });
      for (const vp of exercised) {
        for (const [i, m] of measured[vp].entries()) {
          expect.soft(m.lines, `${vp} item ${i + 1} title lines ≤ ${titleLineLimit[vp]}`).toBeLessThanOrEqual(titleLineLimit[vp]);
          if (m.natural > titleLineLimit[vp]) expect.soft(m.clamp !== 'none' || m.textOverflow === 'ellipsis', `${vp} item ${i + 1} overflowing title has ellipsis (line-clamp/text-overflow)`).toBe(true);
        }
      }
      for (const [i, pc] of measured.PC.entries()) {
        const sp = measured.SP[i];
        if (pc.ratio && sp?.ratio) expect.soft(Math.abs(pc.ratio - sp.ratio) / pc.ratio, `item ${i + 1} image ratio PC ${pc.ratio.toFixed(3)} vs SP ${sp.ratio.toFixed(3)}`).toBeLessThanOrEqual(ratioTolerance);
      }
      test.skip(exercised.length === 0, 'not exercised: no NEWS title exceeds the line limit at PC (2) or SP (1) – Pending');
    });

    test(`DSR-TOP-008 [${lang}] NEWS with empty query-index renders without error`, { tag: ['@auto'] }, async ({ page, baseURL }) => {
      const mocked: string[] = [];
      // Mock both the TC index path and any other query-index.json the page requests (the NEWS source on DEV).
      await page.route(/query-index\.json/, route => { mocked.push(route.request().url()); return route.fulfill({ json: emptyIndex }); });
      const errors: { text: string; url: string }[] = [];
      page.on('pageerror', e => errors.push({ text: e.message, url: 'pageerror' }));
      page.on('console', m => { if (m.type() === 'error') errors.push({ text: m.text(), url: m.location().url }); });
      const top = await openTop(page, lang, baseURL);
      await top.news.scrollIntoViewIfNeeded();
      await page.waitForTimeout(1000);
      const area = await top.news.evaluate(n => {
        const r = n.getBoundingClientRect();
        return { text: (n as HTMLElement).innerText, width: r.width, height: r.height, html: n.outerHTML.slice(0, 2000) };
      }).catch(() => null);
      const scrollWidth = await page.evaluate(() => document.documentElement.scrollWidth);
      // The 404 of a .aem.live preflight attempt (before the .aem.page fallback) is not a page error.
      const preflight = top.attempts.filter(a => a.status === 404).map(a => a.url);
      const relevant = errors.filter(e => !preflight.includes(e.url) && !knownConsoleNoise.some(re => re.test(e.url) || re.test(e.text)));
      observations.push({ mocked, newsArea: area, newsItems: await top.newsItems.count(), scrollWidth, consoleErrors: errors, consoleErrorsAsserted: relevant, note: 'empty-state content undefined (Q10) – recorded only' });
      expect(mocked.length, 'query-index request intercepted').toBeGreaterThan(0);
      expect.soft(relevant, 'console / page errors').toEqual([]);
      expect.soft(area, 'NEWS area present').not.toBeNull();
      expect.soft(area?.width ?? 0, 'NEWS area has width').toBeGreaterThan(0);
      expect.soft(scrollWidth, 'no horizontal overflow').toBeLessThanOrEqual(viewports.PC.width);
      await expect.soft(top.news.getByRole('heading', { name: 'NEWS' }), 'NEWS heading').toBeVisible();
    });

    test(`DSR-TOP-009 [${lang}] main visual image is eager and is the LCP element`, { tag: ['@auto'] }, async ({ page, baseURL }) => {
      await page.addInitScript(() => {
        const w = window as unknown as { __lcp: Element[] };
        w.__lcp = [];
        new PerformanceObserver(l => { for (const e of l.getEntries()) w.__lcp.push((e as unknown as { element: Element }).element); }).observe({ type: 'largest-contentful-paint', buffered: true });
      });
      const top = await openTop(page, lang, baseURL);
      await page.waitForTimeout(1500);
      const attrs = { loading: await top.heroImage.getAttribute('loading'), fetchpriority: await top.heroImage.getAttribute('fetchpriority'), src: await top.heroImage.evaluate(i => (i as HTMLImageElement).currentSrc) };
      const lcp = await top.heroImage.evaluate(img => {
        const list = (window as unknown as { __lcp: (Element | null)[] }).__lcp;
        const last = list[list.length - 1];
        return { entries: list.length, isHero: last === img, last: last ? `${last.tagName}.${last.className} ${(last as HTMLImageElement).currentSrc ?? ''}` : null };
      });
      observations.push({ heroImage: attrs, lcp });
      expect.soft(attrs.loading, 'main visual not lazy').not.toBe('lazy');
      expect.soft(attrs.loading === 'eager' || attrs.fetchpriority === 'high', 'eager or fetchpriority=high').toBe(true);
      expect(lcp.isHero, `LCP element is the main visual (last LCP: ${lcp.last})`).toBe(true);
    });
  });
}
