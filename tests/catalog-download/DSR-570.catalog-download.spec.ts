import { test, expect, type Page, type Response } from '@playwright/test';
import { CatalogDownloadPage } from '../../pages/CatalogDownloadPage';
import { CatalogDisplayPage } from '../../pages/CatalogDisplayPage';
import { type CatalogItem, coreItem, contentCfPath, detailPath, oldFolder, listBlocked } from '../../fixtures/dsr-557';
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

// Form page: overlay detail of TD-570-03 when it renders the form; otherwise the TD-570-01 demo page (JOB-20261020-04).
async function openForm(page: Page, lang: Language) {
  const form = new CatalogDownloadPage(page);
  const detail = detailPath(lang, td.pdfForm.catalogId);
  const detailResponse = await form.goto(detail);
  const detailForms = detailResponse?.ok() && new URL(page.url()).pathname === detail ? await form.form.count() : 0;
  observations.push({ formTarget: detail, status: detailResponse?.status(), finalUrl: page.url(), forms: detailForms });
  if (detailForms) return { form, response: detailResponse, path: detail };
  test.info().annotations.push({ type: 'target', description: `${detail}: no form (HTTP ${detailResponse?.status()}, final ${page.url()}) → TD-570-01 demo page` });
  const response = await form.goto(formPath(lang));
  // Preflight: page 404 → blocked-data (job JOB-20261016-12).
  test.skip(response?.status() === 404, blockedData(`TD-570-01 ${lang} form page ${formPath(lang)} HTTP 404; ${detail} renders no form`));
  expect(response?.status()).toBe(200);
  await expect(form.block).toBeVisible();
  return { form, response, path: formPath(lang) };
}
async function openList(page: Page, lang: Language) {
  const list = new CatalogDisplayPage(page);
  const { response, data } = await list.goto(listPath(lang));
  test.skip(response?.status() === 404, blockedData(`${lang} list page ${listPath(lang)} HTTP 404`));
  expect(response?.status()).toBe(200);
  // JOB-20261022-14 rule 3: empty dsr-catalog-list → blocked by the AEM query deploy, not a fail.
  test.skip(!data.length, `${listBlocked}: dsr-catalog-list returned 0 items (${lang})`);
  await expect(list.items.first()).toBeVisible();
  return { list, data: data as ListItem[] };
}
// Preflight: CF absent, requiresForm ≠ TD (gated TCs only), or card not attributable/rendered → blocked-data.
async function card(list: CatalogDisplayPage, data: ListItem[], lang: Language, key: keyof typeof td, cause: string, gated = false) {
  const { catalogId, requiresForm } = td[key];
  const cfPath = contentCfPath(lang, catalogId);
  const item = coreItem(data, lang, td[key].key);
  const match = item ? list.cards(data, item) : null;
  const rendered = match ? await match.cards.count() : 0;
  observations.push({ language: lang, catalogId, cfPath, inResponse: !!item, title: item?.catalogTitle, catalogType: item?.catalogType, requiresForm: item?.requiresForm, ebookUrl: item?.ebookUrl, pdfAsset: item?.pdfAsset?._publishUrl ?? null, rendered, twins: match?.twins ?? null });
  test.skip(!item, blockedData(`${cfPath} absent from dsr-catalog-list – ${cause}`));
  test.skip(gated && item!.requiresForm !== requiresForm, blockedData(`${catalogId} (${lang}) requiresForm=${item!.requiresForm} in ${cfPath}; TD expects ${requiresForm} – ${cause}`));
  test.skip(!match, blockedData(`title "${item!.catalogTitle}" shared by CFs that link differently; card not attributable to ${cfPath}`));
  test.skip(!rendered, blockedData(`card "${item!.catalogTitle}" (${catalogId}) not rendered on ${listPath(lang)} – ${cause}`));
  expect(rendered).toBe(match!.twins);
  return { card: match!.cards.first(), item };
}

for (const lang of languages) {
  test.describe(lang, () => {
    test(`DSR-CATDL-001 [${lang}] catalog detail header renders`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
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

    test(`DSR-CATDL-002 [${lang}] download form fields, labels, consent and button present`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
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

    test(`DSR-CATDL-005 [${lang}] requiresForm=false card downloads PDF directly`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
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

    test(`DSR-CATDL-006 [${lang}] requiresForm=true card leads to the download form`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
      const { list, data } = await openList(page, lang);
      const { card: item, item: cf } = await card(list, data, lang, 'pdfForm', 'TD-570-03', true);
      const href = new URL((await list.title(item).getAttribute('href'))!, page.url()).href;
      observations.push({ href });
      expect(isPdf(href), 'href is not a .pdf').toBe(false);
      await page.goto(href);
      const form = new CatalogDownloadPage(page);
      observations.push({ target: page.url(), name: await form.name.allInnerTexts() });
      await expect(form.form).toHaveCount(1);
      await expect(form.submit).toBeVisible();
      await expect(form.name).toHaveText(cf!.catalogTitle);
    });

    // DSR-655 Y3: e-book + requiresForm is gated like a PDF; the card links to the overlay detail page with the form (JOB-20261022-14 rule 2).
    test(`DSR-CATDL-018 [${lang}] e-book form card links to the detail page with the form`, { tag: ['@overlay', '@auto'] }, async ({ page }) => {
      const { list, data } = await openList(page, lang);
      const { card: item, item: cf } = await card(list, data, lang, 'ebookForm', 'TD-570-04', true);
      const expected = new URL(detailPath(lang, td.ebookForm.catalogId), page.url()).href;
      const links = await list.links(item).evaluateAll((as, base) => as.map(a => ({ href: new URL(a.getAttribute('href')!, base).href, target: a.getAttribute('target') })), page.url());
      observations.push({ ebookUrl: cf!.ebookUrl, requiresForm: cf!.requiresForm, catalogType: cf!.catalogType, links, expected });
      expect.soft(cf!.catalogType).toBe('ebook');
      expect.soft(links.filter(l => normalize(l.href) !== normalize(expected)), 'card links not pointing to the overlay detail page').toEqual([]);
      await page.goto(expected);
      const form = new CatalogDownloadPage(page);
      observations.push({ finalUrl: page.url(), forms: await form.form.count(), name: await form.name.allInnerTexts() });
      expect(normalize(page.url()), 'stays on the detail page').toBe(normalize(expected));
      // Read-only: the form is never submitted.
      await expect(form.form).toHaveCount(1);
      await expect(form.submit).toBeVisible();
    });
  });
}

test.describe('ja', () => {
  test('DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click)', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
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

  test('DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    const bodies: Promise<{ url: string; body: string }>[] = [];
    const capture = (r: Response) => {
      if (/text|json|javascript|xml/.test(r.headers()['content-type'] ?? '')) bodies.push(r.text().then(body => ({ url: r.url(), body }), () => ({ url: r.url(), body: '' })));
    };
    page.on('response', capture);
    const { list, data } = await openList(page, 'ja');
    await page.waitForLoadState('networkidle');
    const gated = coreItem(data, 'ja', td.pdfForm.key);
    // Merge record: the pre-merge gated CF (old folder) is still listed (JOB-20261020-04).
    const old = data.find(i => i._path === `${oldFolder}${td.pdfForm.catalogId}`);
    observations.push({ oldGatedCf: old ? { path: old._path, requiresForm: old.requiresForm, pdfAsset: old.pdfAsset?._publishUrl ?? null } : null });
    test.skip(!gated, blockedData(`${contentCfPath('ja', td.pdfForm.catalogId)} absent from dsr-catalog-list on ${listPath('ja')}`));
    test.skip(gated!.requiresForm !== true, blockedData(`${td.pdfForm.catalogId} (ja) requiresForm=${gated!.requiresForm} in ${contentCfPath('ja', td.pdfForm.catalogId)}; nothing is gated (TD-570-03 expects true)`));
    const listBodies = await Promise.all(bodies.splice(0));
    const listDom = await page.content();
    // The gated PDF path as the CMS knows it; if pdfAsset is not delivered at all, the CF's own path is the search key.
    const pdfPath = gated!.pdfAsset?._path ?? gated!.pdfAsset?._publishUrl ?? null;
    const file = pdfPath?.split('/').pop() ?? null;
    const rendered = await list.item(gated!.catalogTitle).count();

    await openForm(page, 'ja');
    await page.waitForLoadState('networkidle');
    const formBodies = await Promise.all(bodies.splice(0));
    const formDom = await page.content();
    page.off('response', capture);

    const where = (body: string) => !!file && body.includes(file);
    const gatedHits = gated!.pdfAsset ? [`dsr-catalog-list response: item ${gated!.catalogId} (requiresForm=${gated!.requiresForm}) pdfAsset._publishUrl = ${gated!.pdfAsset._publishUrl}`] : [];
    // The same asset file is shared by requiresForm=false CFs on DEV, so plain string hits on the list page are not attributable to the gated CF.
    const sharedBy = data.filter(i => i !== gated && file && JSON.stringify(i.pdfAsset ?? '').includes(file)).map(i => `${i.catalogId} (requiresForm=${i.requiresForm})`);
    const listHits = listBodies.filter(b => where(b.body)).map(b => b.url).concat(where(listDom) ? ['list DOM'] : []);
    const formHits = formBodies.filter(b => where(b.body)).map(b => b.url).concat(where(formDom) ? ['form DOM'] : []);
    observations.push({ pdfPath, gatedCardRendered: rendered, gatedHits, sharedBy, listHits, formHits, formResponses: formBodies.map(b => b.url) });
    if (sharedBy.length) test.info().annotations.push({ type: 'data', description: `PDF ${file} is shared by ${sharedBy.length} requiresForm=false CFs; list-page string hits are not attributable to ${gated!.catalogId}` });
    expect.soft(formHits, 'gated PDF path on the form page (responses + DOM)').toEqual([]);
    expect(gatedHits, 'gated PDF URL delivered to the browser before submit').toEqual([]);
  });

  test('DSR-CATDL-010 [ja] catalog ID handed to the form', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    const { form } = await openForm(page, 'ja');
    observations.push({ demoFormUrl: page.url(), query: Object.fromEntries(new URL(page.url()).searchParams), hiddenInputs: await form.hiddenInputs() });
    const { list, data } = await openList(page, 'ja');
    const { card: item } = await card(list, data, 'ja', 'pdfForm', 'TD-570-03 + HubSpot EX-06/EX-07', true);
    await page.goto(new URL((await list.title(item).getAttribute('href'))!, page.url()).href);
    const target = new CatalogDownloadPage(page);
    const hidden = await target.hiddenInputs();
    observations.push({ formUrl: page.url(), hiddenInputs: hidden });
    const id = td.pdfForm.catalogId;
    expect(decodeURIComponent(page.url()).includes(id) || hidden.some(h => h.value.includes(id)), `${id} in URL or hidden input`).toBe(true);
  });

  test('DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    // Demo page behaviour recorded for A5 regardless of the id mechanism.
    const demo = new CatalogDownloadPage(page);
    for (const query of ['', `?id=${unknownId}`]) {
      const response = await demo.goto(formPath('ja') + query);
      observations.push({ demo: formPath('ja') + query, status: response?.status(), finalUrl: page.url(), name: await demo.name.allInnerTexts(), forms: await demo.form.count() });
    }
    const { list, data } = await openList(page, 'ja');
    const gated = coreItem(data, 'ja', td.pdfForm.key);
    const title = gated?.catalogTitle ?? td.pdfForm.catalogId;
    const rendered = gated ? await list.item(title).count() : 0;
    const href = rendered ? new URL((await list.title(list.item(title).first()).getAttribute('href'))!, page.url()) : null;
    const param = href && [...href.searchParams].find(([, v]) => v.includes(td.pdfForm.catalogId))?.[0];
    observations.push({ pdfFormCf: gated?._path ?? null, requiresForm: gated?.requiresForm ?? null, pdfFormCardRendered: rendered, href: href?.href ?? null, idParam: param ?? null });
    test.skip(!param, `no catalog-ID mechanism on DEV yet: "${title}" card ${rendered ? `href carries no catalog id (requiresForm=${gated?.requiresForm})` : 'not rendered'}; overlay detail is /{lang}/library/catalog/{id} (path, not query)`);
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
  test('DSR-CATDL-016 [en] fixed texts translated (no Japanese)', { tag: ['@overlay', '@auto'] }, async ({ page }) => {
    const { form } = await openForm(page, 'en');
    const texts = await form.fixedTexts();
    observations.push({ url: page.url(), texts });
    expect(texts.length).toBeGreaterThan(0);
    expect(texts.filter(t => japanese.test(t)), 'fixed texts containing Japanese').toEqual([]);
  });
});

test.describe('cn', () => {
  test('DSR-CATDL-016 [cn] fixed texts translated (Chinese)', { tag: ['@overlay', '@auto'] }, async () => {
    test.fixme(true, 'cn: no /master/cn (Issue #18)');
  });
});
