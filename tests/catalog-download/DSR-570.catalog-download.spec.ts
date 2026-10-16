import { test, expect, type Page, type Request, type Response } from '@playwright/test';
import { CatalogDownloadPage } from '../../pages/CatalogDownloadPage';
import { CatalogDisplayPage } from '../../pages/CatalogDisplayPage';
import type { CatalogItem } from '../../fixtures/dsr-557';
import { viewports, languages, type Language, formPath, listPath, td, consentText, dateFormat, japanese, unknownId, blockedData } from '../../fixtures/dsr-570';

// Read-only: the download button is never clicked; no form is submitted (A7).
test.use({ viewport: viewports.PC });
const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});
const normalize = (url: string) => { const u = new URL(url); u.pathname = u.pathname.replace(/\/+$/, '') || '/'; return u.href; };
const isPdf = (href: string) => new URL(href).pathname.toLowerCase().endsWith('.pdf');

type ListItem = CatalogItem & { catalogId?: string; _path?: string; pdfAsset: { _publishUrl: string; _path?: string } | null };

async function openForm(page: Page, lang: Language) {
  const form = new CatalogDownloadPage(page);
  const response = await form.goto(formPath(lang));
  // Preflight: page 404 → blocked-data (job JOB-20261016-12).
  test.skip(response?.status() === 404, blockedData(`TD-570-01 ${lang} form page ${formPath(lang)} HTTP 404`));
  expect(response?.status()).toBe(200);
  await expect(form.block).toBeVisible();
  return { form, response };
}
async function openList(page: Page, lang: Language) {
  const list = new CatalogDisplayPage(page);
  const { response, data } = await list.goto(listPath(lang));
  test.skip(response?.status() === 404, blockedData(`${lang} list page ${listPath(lang)} HTTP 404`));
  expect(response?.status()).toBe(200);
  await expect(list.items.first()).toBeVisible();
  return { list, data: data as ListItem[] };
}
// Preflight: card not rendered → blocked-data. Records the CF as returned by dm-catalog-list.
async function card(list: CatalogDisplayPage, data: ListItem[], lang: Language, key: keyof typeof td, cause: string) {
  const { title, catalogId } = td[key];
  const item = data.find(i => i.catalogTitle === title);
  const rendered = await list.item(title).count();
  observations.push({ language: lang, card: title, inResponse: !!item, catalogId: item?.catalogId, catalogType: item?.catalogType, requiresForm: item?.requiresForm, ebookUrl: item?.ebookUrl, pdfAsset: item?.pdfAsset?._publishUrl ?? null, rendered });
  test.skip(!rendered, blockedData(`card "${title}" (${catalogId}) not rendered on ${listPath(lang)} (in dm-catalog-list: ${item ? 'yes' : 'no'}) – ${cause}`));
  expect(rendered).toBe(1);
  return { card: list.item(title), item };
}

for (const lang of languages) {
  test.describe(lang, () => {
    test(`DSR-CATDL-001 [${lang}] catalog detail header renders`, { tag: ['@auto'] }, async ({ page }) => {
      const { form, response } = await openForm(page, lang);
      const h1 = await page.locator('h1').allInnerTexts();
      await form.image.scrollIntoViewIfNeeded();
      await expect.poll(() => form.image.evaluate(el => (el as HTMLImageElement).complete && (el as HTMLImageElement).naturalWidth)).toBeGreaterThan(0);
      const texts = { name: await form.name.innerText(), description: await form.description.innerText(), date: await form.date.innerText(), type: (await form.typeLabel.allInnerTexts()).join(' | ') };
      observations.push({ url: page.url(), status: response?.status(), h1, image: await form.image.evaluate(el => ({ src: (el as HTMLImageElement).currentSrc, alt: el.getAttribute('alt'), naturalWidth: (el as HTMLImageElement).naturalWidth })), ...texts });
      expect.soft(h1, 'exactly one h1').toHaveLength(1);
      if (lang === 'ja') expect.soft(h1[0]?.trim()).toBe('製品カタログ');
      for (const [field, value] of Object.entries(texts)) expect.soft(value.trim(), `${field} non-empty`).not.toBe('');
      expect.soft(texts.date.trim(), 'date YYYY.MM.DD').toMatch(dateFormat);
    });

    test(`DSR-CATDL-002 [${lang}] download form fields, labels, consent and button present`, { tag: ['@auto'] }, async ({ page }) => {
      const { form } = await openForm(page, lang);
      await expect(form.form).toHaveCount(1);
      const fields = await form.fields();
      const consents = await form.consent.count();
      observations.push({ url: page.url(), fields, consentCheckboxes: consents, allConsentCheckboxes: await form.form.locator('.catalog-detail-consent input[type="checkbox"]').evaluateAll(els => els.map(el => ({ name: (el as HTMLInputElement).name, required: (el as HTMLInputElement).required, label: [...((el as HTMLInputElement).labels ?? [])].map(l => l.textContent?.trim()).join(' ') }))) });
      expect(fields.length, 'form inputs').toBeGreaterThan(0);
      expect.soft(fields.filter(f => !f.label), 'inputs without label').toEqual([]);
      expect.soft(consents, `consent checkbox containing ${consentText}`).toBe(1);
      await expect(form.submit).toHaveCount(1);
      await form.submit.scrollIntoViewIfNeeded();
      await expect(form.submit).toBeVisible();
      await expect(form.submit).toBeInViewport();
    });

    test(`DSR-CATDL-005 [${lang}] requiresForm=false card downloads PDF directly`, { tag: ['@auto'] }, async ({ page }) => {
      const { list, data } = await openList(page, lang);
      const { card: item, item: cf } = await card(list, data, lang, 'pdf', 'TD-570-02');
      expect.soft(cf?.requiresForm, 'CF requiresForm').toBe(false);
      const hrefs = await list.links(item).evaluateAll((as, base) => as.map(a => new URL(a.getAttribute('href')!, base).href), page.url());
      const href = new URL((await list.title(item).getAttribute('href'))!, page.url()).href;
      const response = await page.request.get(href);
      const contentType = response.headers()['content-type'] ?? '';
      observations.push({ href, links: hrefs, status: response.status(), contentType, formPage: formPath(lang) });
      expect.soft(hrefs.filter(h => !isPdf(h)), 'card links not pointing to a .pdf').toEqual([]);
      expect.soft(hrefs.filter(h => new URL(h).pathname.startsWith(formPath(lang))), 'card links to the form page').toEqual([]);
      expect(response.status()).toBe(200);
      expect(contentType).toContain('application/pdf');
    });

    test(`DSR-CATDL-006 [${lang}] requiresForm=true card leads to the download form`, { tag: ['@auto'] }, async ({ page }) => {
      const { list, data } = await openList(page, lang);
      const { card: item } = await card(list, data, lang, 'pdfForm', 'DSR-570 CF integration (Ngoc 10/15: demo page is layout only, not bound to catalog CF)');
      const href = new URL((await list.title(item).getAttribute('href'))!, page.url()).href;
      observations.push({ href });
      expect(isPdf(href), 'href is not a .pdf').toBe(false);
      await page.goto(href);
      const form = new CatalogDownloadPage(page);
      observations.push({ target: page.url(), name: await form.name.allInnerTexts() });
      await expect(form.form).toHaveCount(1);
      await expect(form.submit).toBeVisible();
      await expect(form.name).toHaveText(td.pdfForm.title);
    });

    test(`DSR-CATDL-018 [${lang}] e-book form card opens ebookUrl without form`, { tag: ['@auto'] }, async ({ page, context }) => {
      const { list, data } = await openList(page, lang);
      const { card: item, item: cf } = await card(list, data, lang, 'ebookForm', 'TD-570-04');
      test.skip(!cf?.ebookUrl, blockedData(`"${td.ebookForm.title}" has no ebookUrl in dm-catalog-list (ebookUrl fix QA-PT 16/10)`));
      const ebookUrl = cf!.ebookUrl!;
      const links = await list.links(item).evaluateAll((as, base) => as.map(a => ({ href: new URL(a.getAttribute('href')!, base).href, target: a.getAttribute('target'), rel: a.getAttribute('rel') })), page.url());
      // Navigations outside the list page, in order. frame() throws for a popup's first navigation (issued before its frame exists).
      const navigations: string[] = [];
      const record = (r: Request) => {
        if (!r.isNavigationRequest()) return;
        try { if (r.frame().page() === page || r.frame().parentFrame()) return; } catch { /* popup navigation before frame creation */ }
        navigations.push(r.url());
      };
      context.on('request', record);
      const [popup] = await Promise.all([page.waitForEvent('popup'), list.title(item).click()]);
      await expect.poll(() => navigations.length, { timeout: 15_000 }).toBeGreaterThan(0);
      context.off('request', record);
      const first = navigations[0];
      observations.push({ ebookUrl, requiresForm: cf!.requiresForm, catalogType: cf!.catalogType, links, popupNavigations: navigations, popupUrl: popup.url(), originalUrl: page.url() });
      expect.soft(cf!.catalogType).toBe('ebook');
      for (const link of links) {
        expect.soft(normalize(link.href), 'href = ebookUrl').toBe(normalize(ebookUrl));
        expect.soft(link.target, 'target').toBe('_blank');
      }
      expect(normalize(first), 'first popup navigation = ebookUrl (no form page in between)').toBe(normalize(ebookUrl));
      await popup.close();
    });
  });
}

test.describe('ja', () => {
  test('DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click)', { tag: ['@auto'] }, async ({ page }) => {
    const { form } = await openForm(page, 'ja');
    await expect(form.consent).toHaveCount(1);
    const initiallyChecked = await form.consent.isChecked();
    // Unchecking the consent box only changes local DOM state; the button is never clicked.
    if (initiallyChecked) await form.consent.setChecked(false);
    await expect(form.consent).not.toBeChecked();
    const state = {
      consentRequired: await form.consent.evaluate(el => (el as HTMLInputElement).required),
      buttonDisabled: await form.submit.isDisabled(),
      buttonAriaDisabled: await form.submit.getAttribute('aria-disabled'),
      formNoValidate: await form.form.evaluate(f => (f as HTMLFormElement).noValidate),
      formValid: await form.form.evaluate(f => (f as HTMLFormElement).checkValidity()),
    };
    observations.push({ url: page.url(), initiallyChecked, ...state });
    expect(state.consentRequired || state.buttonDisabled || state.buttonAriaDisabled === 'true', 'consent required OR button disabled').toBe(true);
  });

  test('DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit', { tag: ['@auto'] }, async ({ page }) => {
    const bodies: Promise<{ url: string; body: string }>[] = [];
    const capture = (r: Response) => {
      if (/text|json|javascript|xml/.test(r.headers()['content-type'] ?? '')) bodies.push(r.text().then(body => ({ url: r.url(), body }), () => ({ url: r.url(), body: '' })));
    };
    page.on('response', capture);
    const { list, data } = await openList(page, 'ja');
    await page.waitForLoadState('networkidle');
    const gated = data.find(i => i.catalogTitle === td.pdfForm.title);
    test.skip(!gated, blockedData(`"${td.pdfForm.title}" absent from dm-catalog-list on ${listPath('ja')}`));
    const listBodies = await Promise.all(bodies.splice(0));
    const listDom = await page.content();
    // The gated PDF path as the CMS knows it; if pdfAsset is not delivered at all, the CF's own path is the search key.
    const pdfPath = gated!.pdfAsset?._path ?? gated!.pdfAsset?._publishUrl ?? null;
    const file = pdfPath?.split('/').pop() ?? null;
    const rendered = await list.item(td.pdfForm.title).count();

    await openForm(page, 'ja');
    await page.waitForLoadState('networkidle');
    const formBodies = await Promise.all(bodies.splice(0));
    const formDom = await page.content();
    page.off('response', capture);

    const where = (body: string) => !!file && body.includes(file);
    const gatedHits = gated!.pdfAsset ? [`dm-catalog-list response: item ${gated!.catalogId} (requiresForm=${gated!.requiresForm}) pdfAsset._publishUrl = ${gated!.pdfAsset._publishUrl}`] : [];
    // The same asset file is shared by requiresForm=false CFs on DEV, so plain string hits on the list page are not attributable to the gated CF.
    const sharedBy = data.filter(i => i !== gated && file && JSON.stringify(i.pdfAsset ?? '').includes(file)).map(i => `${i.catalogId} (requiresForm=${i.requiresForm})`);
    const listHits = listBodies.filter(b => where(b.body)).map(b => b.url).concat(where(listDom) ? ['list DOM'] : []);
    const formHits = formBodies.filter(b => where(b.body)).map(b => b.url).concat(where(formDom) ? ['form DOM'] : []);
    observations.push({ pdfPath, gatedCardRendered: rendered, gatedHits, sharedBy, listHits, formHits, formResponses: formBodies.map(b => b.url) });
    if (sharedBy.length) test.info().annotations.push({ type: 'data', description: `PDF ${file} is shared by ${sharedBy.length} requiresForm=false CFs; list-page string hits are not attributable to ${gated!.catalogId}` });
    expect.soft(formHits, 'gated PDF path on the form page (responses + DOM)').toEqual([]);
    expect(gatedHits, 'gated PDF URL delivered to the browser before submit').toEqual([]);
  });

  test('DSR-CATDL-010 [ja] catalog ID handed to the form', { tag: ['@auto'] }, async ({ page }) => {
    const { form } = await openForm(page, 'ja');
    observations.push({ demoFormUrl: page.url(), query: Object.fromEntries(new URL(page.url()).searchParams), hiddenInputs: await form.hiddenInputs() });
    const { list, data } = await openList(page, 'ja');
    const { card: item } = await card(list, data, 'ja', 'pdfForm', 'DSR-570 CF integration (Ngoc 10/15) + HubSpot EX-06/EX-07');
    await page.goto(new URL((await list.title(item).getAttribute('href'))!, page.url()).href);
    const target = new CatalogDownloadPage(page);
    const hidden = await target.hiddenInputs();
    observations.push({ formUrl: page.url(), hiddenInputs: hidden });
    const id = td.pdfForm.catalogId;
    expect(decodeURIComponent(page.url()).includes(id) || hidden.some(h => h.value.includes(id)), `${id} in URL or hidden input`).toBe(true);
  });

  test('DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form', { tag: ['@auto'] }, async ({ page }) => {
    // Demo page behaviour recorded for A5 regardless of the id mechanism.
    const demo = new CatalogDownloadPage(page);
    for (const query of ['', `?id=${unknownId}`]) {
      const response = await demo.goto(formPath('ja') + query);
      observations.push({ demo: formPath('ja') + query, status: response?.status(), finalUrl: page.url(), name: await demo.name.allInnerTexts(), forms: await demo.form.count() });
    }
    const { list, data } = await openList(page, 'ja');
    const rendered = await list.item(td.pdfForm.title).count();
    const href = rendered ? new URL((await list.title(list.item(td.pdfForm.title)).getAttribute('href'))!, page.url()) : null;
    const param = href && [...href.searchParams].find(([, v]) => v.includes(td.pdfForm.catalogId))?.[0];
    observations.push({ pdfFormCardRendered: rendered, href: href?.href ?? null, idParam: param ?? null });
    test.skip(!param, `no catalog-ID mechanism on DEV yet: "${td.pdfForm.title}" card ${rendered ? 'href carries no catalog id' : 'not rendered'}; demo form page is not bound to a CF (Ngoc 10/15)`);
    const names = data.map(i => i.catalogTitle);
    for (const mutate of [(u: URL) => u.searchParams.set(param!, unknownId), (u: URL) => u.searchParams.delete(param!)]) {
      const url = new URL(href!.href); mutate(url);
      const response = await demo.goto(url.href);
      const shown = (await demo.name.allInnerTexts()).map(t => t.trim());
      observations.push({ url: url.href, status: response?.status(), finalUrl: page.url(), shown, forms: await demo.form.count() });
      const handled = response?.status() === 404 || new URL(page.url()).pathname.startsWith(listPath('ja')) || (await demo.form.count()) === 0;
      expect.soft(handled, `${url.search || 'no id'}: 404, error or redirect to list`).toBe(true);
      expect.soft(shown.filter(n => names.includes(n)), `${url.search || 'no id'}: another catalog's name in the form`).toEqual([]);
    }
  });
});

test.describe('en', () => {
  test('DSR-CATDL-016 [en] fixed texts translated (no Japanese)', { tag: ['@auto'] }, async ({ page }) => {
    const { form } = await openForm(page, 'en');
    const texts = await form.fixedTexts();
    observations.push({ url: page.url(), texts });
    expect(texts.length).toBeGreaterThan(0);
    expect(texts.filter(t => japanese.test(t)), 'fixed texts containing Japanese').toEqual([]);
  });
});

test.describe('cn', () => {
  test('DSR-CATDL-016 [cn] fixed texts translated (Chinese)', { tag: ['@auto'] }, async () => {
    test.fixme(true, 'cn: no /master/cn (Issue #18)');
  });
});
