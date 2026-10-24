import { test, expect, type APIRequestContext, type Page } from '@playwright/test';
import { BoothPage } from '../../pages/BoothPage';
import {
  type Language, languages, base, boothTopPath, itemPath, sp, pc, knownConsole,
  blockedCn, blockedAuthor, blockedVisual, blocked1img, blocked1prod,
} from '../../fixtures/dsr-608';

// DSR-608 Booth TOP / ITEM for (scaffold, JOB-ZZ-IDLE-47). Spec ids from ykk-dsr/hub/tc-out/DSR-608.spec.json sheet 1 ("ブース"):
// 608-1.0 → DSR-BOOTH-001 … 608-14.0 → DSR-BOOTH-014. Read-only. Baseline: DSR-172 BAC 1–6 + adopted dev TC (A1–A12).
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

const url = (path: string) => `${base()}${path}`;

// Preflight (A3): page missing on the target host → blocked-data skip, not Fail.
async function preflight(request: APIRequestContext, path: string, td: string) {
  const status = await BoothPage.status(request, url(path));
  observations.push({ preflight: url(path), status });
  test.skip(status !== 200, `Blocked-data: ${td} ${path} returns ${status} on ${base()} (A3, Q16)`);
}

async function open(page: Page, path: string) {
  const view = new BoothPage(page);
  const response = await view.goto(url(path));
  observations.push({ url: url(path), finalUrl: page.url(), status: response?.status() ?? null });
  return view;
}

const sameOrigin = (href: string) => href.startsWith('/') && !href.startsWith('//');

test.describe('DSR-608 Booth TOP / ITEM for', () => {
  for (const lang of languages) {
    test(`DSR-BOOTH-001 [${lang}] Products and ITEM for buttons navigate to their pages`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, boothTopPath(lang), 'TD-608-01');
      const view = await open(page, boothTopPath(lang));
      await expect(view.productsLink).toHaveCount(1);
      const products = (await view.productsLink.getAttribute('href')) ?? '';
      const productsUrl = new URL(products, url('/'));
      observations.push({ products, query: productsUrl.search });
      // A8: product list filter is DSR-170 (out of scope) – pass on 200 + booth tag in the query.
      expect.soft(productsUrl.pathname, 'Products target language prefix').toMatch(new RegExp(`^/${lang}/`));
      expect.soft(productsUrl.search, 'Products query carries the booth tag').not.toBe('');
      expect(await BoothPage.status(request, productsUrl.href), `GET ${products}`).toBe(200);

      const items = await view.hrefs(view.itemLinks);
      observations.push({ itemFor: items });
      expect(items.length, 'ITEM for buttons').toBeGreaterThan(0);
      for (const href of items) {
        await view.goto(url(boothTopPath(lang)));
        const target = new URL(href, url('/')).pathname;
        await view.top.locator(`a.bt-link[href="${href}"]`).first().click();
        await page.waitForURL(u => u.pathname === target).catch(() => {});
        expect(new URL(page.url()).pathname, `ITEM for ${href}`).toBe(target);
        await expect(view.item, `booth-item block on ${href}`).toBeVisible();
      }
    });
  }
  test('DSR-BOOTH-001 [cn] Products and ITEM for buttons', { tag: ['@blocked'] }, () => test.fixme(true, blockedCn));

  for (const lang of languages) {
    test(`DSR-BOOTH-002 [${lang}] Pills switch to a sibling booth and highlight the current one`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, boothTopPath(lang), 'TD-608-01');
      const view = await open(page, boothTopPath(lang));
      const pills = await view.topPills.evaluateAll(els => els.map(e => ({ tag: e.tagName, text: e.textContent?.trim(), href: e.getAttribute('href'), current: e.getAttribute('aria-current'), cls: e.className })));
      observations.push({ pills });
      const links = pills.filter(p => p.tag === 'A' && p.href);
      test.skip(links.length === 0, `Blocked-data: no sibling booth pill links on ${boothTopPath(lang)} (${pills.length} pills, none linked; TD-608-01 needs ≥ 2 sibling booths)`);
      const target = links.find(p => new URL(p.href!, url('/')).pathname !== boothTopPath(lang))!;
      await view.topPills.filter({ hasText: target.text! }).first().click();
      await page.waitForLoadState('domcontentloaded');
      expect(new URL(page.url()).pathname).toBe(new URL(target.href!, url('/')).pathname);
      // TODO: active marker unknown (aria-current / class) – confirm with dev, then assert exact attribute.
      const active = view.topPills.filter({ hasText: target.text! }).first();
      const marker = await active.evaluate(e => e.getAttribute('aria-current') ?? (/(active|current|is-)/.test(e.className) ? e.className : null));
      expect(marker, 'selected pill is highlighted').not.toBeNull();
    });
  }

  for (const lang of languages) {
    test(`DSR-BOOTH-003 [${lang}] main visual: 1 image static, ≥ 2 images carousel`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, boothTopPath(lang), 'TD-608-01');
      const view = await open(page, boothTopPath(lang));
      const slides = await view.slides.count();
      const controls = await view.mediaControls.count();
      observations.push({ slides, controls });
      expect(slides, 'MV slides').toBeGreaterThan(0);
      if (slides === 1) {
        expect(controls, '1 image → no carousel controls').toBe(0);
        test.info().annotations.push({ type: 'partial', description: 'Only the 1-image case is available on TD-608-01; ≥ 2 images not authored' });
        return;
      }
      // TODO: carousel markup with ≥ 2 slides not seen yet – assert arrow click changes the visible slide.
      expect(controls, '≥ 2 images → carousel controls').toBeGreaterThan(0);
      const before = await view.slides.evaluateAll(els => els.findIndex(e => (e as HTMLElement).offsetParent && e.getBoundingClientRect().left >= 0));
      await view.mediaControls.last().click();
      await expect.poll(() => view.slides.evaluateAll(els => els.findIndex(e => (e as HTMLElement).offsetParent && e.getBoundingClientRect().left >= 0))).not.toBe(before);
    });
  }
  test('DSR-BOOTH-003 [ja] 1-image QA copy page', { tag: ['@blocked'] }, () => test.fixme(true, blocked1img));

  for (const lang of languages) {
    test(`DSR-BOOTH-004 [${lang}] exactly 1 related YouTube video embeds and loads`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, boothTopPath(lang), 'TD-608-01');
      const view = await open(page, boothTopPath(lang));
      await expect(view.video, 'one video block in booth TOP').toHaveCount(1);
      // A9: video component = DSR-190; facade click → iframe only (playback quality not judged).
      await view.videoFacade.click();
      const iframe = view.video.locator('iframe');
      await expect(iframe).toHaveCount(1);
      const src = (await iframe.getAttribute('src')) ?? '';
      observations.push({ iframe: src });
      expect(src).toMatch(/youtube(-nocookie)?\.com\/embed\//);
    });
  }

  for (const lang of languages) {
    test(`DSR-BOOTH-005 [${lang}] ITEM for back link returns to Booth TOP; pills switch ITEM for`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, itemPath(lang), 'TD-608-04');
      const view = await open(page, itemPath(lang));
      const back = (await view.itemBack.getAttribute('href')) ?? '';
      const pills = await view.hrefs(view.itemPills);
      observations.push({ back, pills });
      expect(new URL(back, url('/')).pathname, 'back link → Booth TOP').toBe(boothTopPath(lang));
      await view.itemBack.click();
      await page.waitForLoadState('domcontentloaded');
      await expect(view.top, 'Booth TOP after back').toBeVisible();

      const others = pills.filter(h => new URL(h, url('/')).pathname !== itemPath(lang));
      test.skip(others.length === 0, 'Blocked-data: no other ITEM for pill (TD-608-04 needs ≥ 2 ITEM for)');
      for (const href of others) {
        const target = new URL(href, url('/')).href;
        const status = await BoothPage.status(request, target);
        observations.push({ pill: href, status });
        expect.soft(href, `pill ${href} is a site path with language prefix`).toMatch(new RegExp(`^/${lang}/`));
        expect.soft(status, `GET pill ${href}`).toBe(200);
      }
    });
  }

  for (const lang of languages) {
    test(`DSR-BOOTH-006 [${lang}] single product: no thumbnails, image + name + text + CTA shown`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, itemPath(lang), 'TD-608-04');
      const view = await open(page, itemPath(lang));
      const panels = await view.panels.count();
      observations.push({ panels });
      test.skip(panels !== 1, `Blocked-data: ${itemPath(lang)} has ${panels} products; single-product page is TD-608-03 (${blocked1prod})`);
      await expect(view.thumbs, 'thumbnail gallery hidden').toHaveCount(0);
      await expect(view.itemImage.first()).toBeVisible();
      await expect(view.panelHeading).not.toHaveText('');
      await expect(view.panelBody).not.toHaveText('');
      await expect(view.panelCta).toBeVisible();
      const cta = (await view.panelCta.getAttribute('href')) ?? '';
      observations.push({ cta });
      expect(await BoothPage.status(request, new URL(cta, url('/')).href), `GET CTA ${cta}`).toBe(200);
    });
  }
  test('DSR-BOOTH-006 [ja] single-product QA copy page', { tag: ['@blocked'] }, () => test.fixme(true, blocked1prod));

  for (const lang of languages) {
    test(`DSR-BOOTH-007 [${lang}] thumbnail click switches image, name, Item Code, text and CTA together`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, itemPath(lang), 'TD-608-04');
      const view = await open(page, itemPath(lang));
      const panels = await view.panels.count();
      const thumbs = await view.thumbs.count();
      observations.push({ panels, thumbs });
      test.skip(panels < 2, `Blocked-data: ${itemPath(lang)} has ${panels} product (TD-608-04 needs ≥ 2)`);
      // TODO: thumbnail markup not seen yet (only 1 product on the sample) – confirm selector once ≥ 2 products are authored.
      const snapshot = async () => ({
        image: await view.itemImage.first().getAttribute('src'),
        name: await view.panelHeading.innerText(),
        body: await view.panelBody.innerText(),
        cta: await view.panelCta.getAttribute('href'),
      });
      const first = await snapshot();
      await view.item.locator('.bi-thumb').nth(1).click();
      const second = await snapshot();
      observations.push({ first, second });
      for (const key of ['image', 'name', 'body', 'cta'] as const) expect.soft(second[key], `${key} changed`).not.toBe(first[key]);
    });
  }

  for (const lang of languages) {
    test(`DSR-BOOTH-008 [${lang}] related contents auto-fetched (same language) or block hidden`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, itemPath(lang), 'TD-608-04');
      const requests: { url: string; status: number }[] = [];
      page.on('response', r => { if (/query-index|graphql|\.json/.test(r.url())) requests.push({ url: r.url(), status: r.status() }); });
      const view = await open(page, itemPath(lang));
      const present = await view.related.count();
      const hrefs = present ? await view.hrefs(view.relatedLinks) : [];
      observations.push({ present, hrefs, requests });
      if (!present || !(await view.related.isVisible())) {
        // DSR-661 c.64907: 0 results → block hidden (by design).
        expect(hrefs.length).toBe(0);
        return;
      }
      expect(hrefs.length, 'related cards').toBeGreaterThan(0);
      for (const href of hrefs.filter(sameOrigin)) expect.soft(href, 'same-language related content').toMatch(new RegExp(`^/${lang}/`));
      // TODO: newest-first order needs dates on the cards (8.0 index source DSR-182/560) – recorded only.
    });
  }

  for (const lang of languages) {
    test(`DSR-BOOTH-009 [${lang}] CTA modal opens and closes (content pending YKK)`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, boothTopPath(lang), 'TD-608-01');
      const view = await open(page, boothTopPath(lang));
      const triggers = await view.ctaButtons.count();
      observations.push({ triggers });
      test.skip(triggers === 0, 'Blocked-data: no CTA modal trigger on Booth TOP (modal content pending YKK, Q18 / CB-10)');
      // A7: open / close only; modal texts recorded (Q18, CB-10).
      await view.ctaButtons.first().click();
      await expect(view.modal, 'modal opens').toBeVisible();
      observations.push({ modalText: (await view.modal.first().innerText()).slice(0, 300) });
      await page.keyboard.press('Escape');
      await expect(view.modal, 'Esc closes the modal').toHaveCount(0);
    });
  }

  test('DSR-BOOTH-010 [ja] Author edit + publish reflects on the page', { tag: ['@manual'] }, () => test.fixme(true, blockedAuthor));

  for (const lang of languages) {
    for (const [device, viewport] of [['PC', pc], ['SP', sp]] as const) {
      test(`DSR-BOOTH-011 [${lang}] ${device} Booth TOP + ITEM for render in the right language without horizontal scroll`, { tag: ['@auto'] }, async ({ page, request }) => {
        await preflight(request, boothTopPath(lang), 'TD-608-01');
        await preflight(request, itemPath(lang), 'TD-608-04');
        await page.setViewportSize(viewport);
        for (const [path, block] of [[boothTopPath(lang), 'top'], [itemPath(lang), 'item']] as const) {
          const view = await open(page, path);
          await expect(view[block], `${block} block`).toBeVisible();
          const overflow = await view.horizontalOverflow();
          const htmlLang = await page.evaluate(() => document.documentElement.lang);
          const internal = (await view.hrefs(page.locator(`main .booth-${block}.block a[href]`))).filter(sameOrigin);
          observations.push({ path, device, overflow, htmlLang, internal });
          expect.soft(htmlLang, 'html lang').toBe(lang);
          expect.soft(overflow, 'horizontal scroll px').toBeLessThanOrEqual(0);
          for (const href of internal) expect.soft(href, 'language-specific link').toMatch(new RegExp(`^/${lang}(/|$)`));
        }
      });
    }
  }
  test('DSR-BOOTH-011 [cn] PC/SP', { tag: ['@blocked'] }, () => test.fixme(true, blockedCn));

  for (const lang of languages) {
    test(`DSR-BOOTH-012 [${lang}] interactive elements are keyboard reachable and Enter opens ITEM for`, { tag: ['@auto'] }, async ({ page, request }) => {
      await preflight(request, boothTopPath(lang), 'TD-608-01');
      const view = await open(page, boothTopPath(lang));
      const controls = await view.links.evaluateAll(els => els.map(e => ({ tag: e.tagName, role: e.getAttribute('role'), label: e.textContent?.trim() })));
      observations.push({ controls });
      for (const c of controls) expect.soft(['A', 'BUTTON'].includes(c.tag) || !!c.role, `${c.label} is a/button/role`).toBe(true);
      // Tab until the first ITEM for link has focus (≤ 40 presses), then Enter.
      const target = view.itemLinks.first();
      const href = (await target.getAttribute('href')) ?? '';
      let focused = false;
      for (let i = 0; i < 40 && !focused; i++) {
        await page.keyboard.press('Tab');
        focused = await target.evaluate(e => e === document.activeElement);
      }
      expect(focused, 'ITEM for link reachable by Tab').toBe(true);
      const outline = await target.evaluate(e => { const s = getComputedStyle(e); return `${s.outlineStyle} ${s.outlineWidth} ${s.boxShadow}`; });
      observations.push({ focusStyle: outline });
      const destination = new URL(href, url('/')).pathname;
      await page.keyboard.press('Enter');
      await page.waitForURL(u => u.pathname === destination).catch(() => {});
      expect(new URL(page.url()).pathname, 'Enter on focused ITEM for link').toBe(destination);
      // TODO: axe-core scope DS-04 pending (Quentin) – add AxeBuilder once the a11y scope is fixed.
    });
  }

  test('DSR-BOOTH-013 [ja,en] PC/SP layout vs Figma C02', { tag: ['@visual'] }, () => test.fixme(true, blockedVisual));

  for (const lang of languages) {
    for (const [device, viewport] of [['PC', pc], ['SP', sp]] as const) {
      test(`DSR-BOOTH-014 [${lang}] ${device} Booth TOP background image (200, width > 0) and category name`, { tag: ['@auto'] }, async ({ page, request }) => {
        await preflight(request, boothTopPath(lang), 'TD-608-01');
        const errors: string[] = [];
        page.on('console', m => { if (m.type() === 'error') errors.push(m.text()); });
        await page.setViewportSize(viewport);
        const view = await open(page, boothTopPath(lang));
        await expect(view.topTitle).toBeVisible();
        const title = (await view.topTitle.innerText()).trim();
        const bg = await view.topBg.first().evaluate(e => ({ src: (e as HTMLImageElement).currentSrc, natural: (e as HTMLImageElement).naturalWidth, width: e.getBoundingClientRect().width }));
        const bgStatus = await BoothPage.status(request, bg.src);
        const unexpected = errors.filter(e => !knownConsole.some(re => re.test(e)));
        observations.push({ title, bg, bgStatus, errors });
        // No per-language oracle for the authored category name yet (TD-608-01 "existing") – non-empty only, text recorded.
        expect(title, 'category name').not.toBe('');
        expect(bgStatus, `GET ${bg.src}`).toBe(200);
        expect(bg.natural, 'background image decoded').toBeGreaterThan(0);
        expect(bg.width, 'background rendered width').toBeGreaterThan(0);
        expect.soft(unexpected, 'console errors (known EDS 404 resource excluded)').toEqual([]);
      });
    }
  }
});
