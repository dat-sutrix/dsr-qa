# JOB-ZZ-IDLE-32 – catalog overlay empty block: detailed diagnosis (DEV, 2026-10-22)

Run: curl probes ~02:34Z, browser pass 2026-10-22T02:35:44Z → 02:37:28Z (Chromium 153.0.8010.12 headless, fresh context per URL, empty localStorage, no clicks/no input).
Automation HEAD: 0f59bf2e076742de338bfbe4989ad7212a04dde9. Deployed code: `blocks/catalog-detail/catalog-detail.js` and `scripts/detail-page.js` Last-Modified **2026-10-22 01:48:45 GMT** (after IDLE-30 and JOB-20261021-12; same on .page and .live). `scripts/catalog-link.js` 2026-10-20 05:55:17, `scripts/overlay-rows.js` 2026-10-19 23:35:11.
Raw files: `raw/` (static HTML of the 14 URLs, the persisted-query JSON in `raw/gql/`, and copies of the JS). Browser data: `browser-diag.json`. Script: `diag.cjs`.

## 1. Overlay pages – raw data (identical on .aem.page and .aem.live)

| Page | HTTP .live / .page | Last-Modified | robots | Rows in catalog-detail block (json2html) | requiresForm row | File row | Browser: final URL | Network to file | Block after JS |
|---|---|---|---|---|---|---|---|---|---|
| ja qa190-cat-pdf | 200 / 200 | 21/10 14:36:47 | noindex | source=overlay, cfPath, catalogTitle=**"qa190-cat-pdf"**, catalogId, description (ja), 3× catalogCategories, thumbnail (image 7.png), catalogType=pdf, publishDate/updateDate 2026-09-03, related.* | **absent** | pdfAsset = …/sample-pdf-a4-size-65kb.pdf | unchanged | PDF document nav → `net::ERR_ABORTED` (headless download event) | empty, height 0 |
| ja qa190-cat-pdf-form | 200 / 200 | 21/10 14:17:41 | noindex | same set; catalogTitle "catalog pdf form" | **absent** | pdfAsset (same PDF) | unchanged | PDF → `net::ERR_ABORTED` | empty, height 0 |
| ja qa190-cat-ebook-form | 200 / 200 | 21/10 14:18:13 | noindex | same set; catalogTitle "catalog ebook form", catalogType=ebook | **absent** | ebookUrl = https://www.ykkfastening.com/ | **https://ykkdigitalshowroom.com/en/** (ykkfastening 301 → ykkdigitalshowroom) | document nav to ykkfastening.com | page left |
| en qa190-cat-pdf | 200 / 200 | 21/10 14:30:44 | noindex | catalogTitle "catalog pdf", en description | **absent** | pdfAsset | unchanged | PDF → `net::ERR_ABORTED` | empty, height 0 |
| en qa190-cat-pdf-form | 200 / 200 | 21/10 14:20:08 | noindex | catalogTitle "catalog pdf form" | **absent** | pdfAsset | unchanged | PDF → `net::ERR_ABORTED` | empty, height 0 |
| en qa190-cat-ebook-form | 200 / 200 | 21/10 14:20:42 | noindex | catalogTitle "catalog ebook form", ebook | **absent** | ebookUrl | https://ykkdigitalshowroom.com/en/ | ykkfastening.com | page left |

- No redirect at HTTP level (num_redirects 0).
- Console: 1–2× `Failed to load resource: 404` on ja pages (= known placeholders.json 404, `/placeholders.json` + `/ja/placeholders.json` both 404 → cause none); no page errors (no JS exception).
- PDF: `content-type: application/pdf`, `content-disposition: inline`, 66156 bytes, HTTP 200. Headless Chromium treats a PDF navigation as a download → `net::ERR_ABORTED`, so the tab stays on the page with the block already emptied. A headed browser would show the PDF viewer instead (not verified headed).
- Public persisted query `ykk/dsr-catalog-page;path=/content/dam/dsr/{lang}/catalogs/{id}` (publish tier, read-only GET) returns for **all 6**: related isActive=true, isBoothLimited=null, catalog._path=/content/dam/common/{lang}/catalogs/{id}, **`requiresForm: false`** (the key is present with value false, not missing). See `raw/gql/*.json`.

## 2. Demo page vs overlay (/master/ja/test-space/dsr-570-catalog-detail, 200 on both tiers)

The demo block has one authored row (`catalogid-02`) and **no `source | overlay` row**. So `readOverlayRows()` returns null and the block renders the hard-coded `MOCK_CATALOG`. The demo does not prove that real data renders; it shows the mock layout only.

| Field | Demo (rendered) | Overlay pages (static rows) | Effect |
|---|---|---|---|
| first row `source / overlay` | absent → mock path | present | overlay path taken |
| requiresForm | n/a (mock is not checked) | **absent from rows; CF value = false** | → `!requiresForm(cf)` branch → leave page |
| catalogTitle | "AQUASEAL® 製品カタログ" (mock) | "catalog pdf form" / "catalog ebook form" / ja "qa190-cat-pdf" / en "catalog pdf" | TD-190 titles not applied (data) |
| catalogId | aquaseal-catalog (mock) | = node name | OK |
| description | mock text | "Catalog description…" (ja pdf: カタログの説明文…) | – |
| publishDate | 2022-01-20 → "2022.01.20" | 2026-09-03 | TD-190 dates not applied (data) |
| catalogCategories | dsr:catalog-category/standard-catalog → "STANDARD CATALOG" | site:product/material/{aluminium,cotton,magnet} | different tag root (data; label not observed) |
| thumbnail | /blocks/listing/fixtures/placeholder1.svg | publish DAM image 7.png | – |
| pdfAsset / ebookUrl | not in DOM | **present in static HTML** (template writes them only when requiresForm is falsy) | confirms falsy requiresForm |
| robots | none | noindex (template: `{{^requiresForm}}`) | confirms falsy requiresForm |
| Block output | h1 製品カタログ, h2 title, date, category, image, bookmark, form (height 1712 px) | empty (height 0) or left page | – |

## 3. Code paths (DEV .aem.live, quoted)

`blocks/catalog-detail/catalog-detail.js`:
```
152    const overlay = readOverlayRows(this.block, OVERLAY_SCHEMA);
153    this.block.textContent = '';
155    if (overlay?.unavailable) {
156      goToList(listUrl('catalog'), { replace: true });
160    let catalog = MOCK_CATALOG;
161    if (overlay) {
162      const { related, cfPath, ...cf } = overlay.data;
163      // Not form-gated: no page to show, the file itself (option b). A PDF
164      // and an e-book are both gated by requiresForm (DSR-655 Y3).
165      if (!requiresForm(cf)) {
166        const action = catalogAction(cf, { formSent: true });
167        if (action?.href) window.location.replace(action.href);
168        else goToList(listUrl('catalog'), { replace: true });
169        return;
170      }
```
`scripts/catalog-link.js`:
```
66  export function requiresForm(cf) {
67    return cf?.requiresForm === true || cf?.requiresForm === 'true';
```
`cf-templates/catalog.html` (writes the row only when true; file rows and noindex only when falsy):
```
{{^requiresForm}}<meta name="robots" content="noindex">{{/requiresForm}}
{{#requiresForm}}<div><div>requiresForm</div><div>true</div></div>{{/requiresForm}}
{{^requiresForm}} {{#pdfAsset}}…pdfAsset row…{{/pdfAsset}} {{#ebookUrl}}…ebookUrl row…{{/ebookUrl}} {{/requiresForm}}
```
- Empty block = line 153 clears the block, then line 165 is true (no requiresForm row), and line 167 does `location.replace(file)`. PDF: headless aborts the navigation, so the page stays empty. E-book: the browser goes to ebookUrl.
- Redirect to the list happens only on an `unavailable` row (line 155) or a non-form catalog with no usable file href (line 168). Neither occurred.
- The form renders only when requiresForm is `true`/`'true'` and this browser has not sent the form (`localStorage dsr:document-download:v1`).

## 4. Verdict per page

| Page | Verdict | Product-bug conf. | Exact missing field / reason |
|---|---|---|---|
| ja/en qa190-cat-pdf-form | **data** | 5% | content CF `/content/dam/common/{ja,en}/catalogs/qa190-cat-pdf-form` **requiresForm = false** (TD-654-01/TD-190 expect true). Title/date also ≠ TD-190. |
| ja/en qa190-cat-ebook-form | **data** | 5% | content CF `/content/dam/common/{ja,en}/catalogs/qa190-cat-ebook-form` **requiresForm = false** (TD expects true). |
| ja/en qa190-cat-pdf | **test** (+ data title ja) | 0% | requiresForm=false is correct here. The code sends the visitor straight to the PDF by design (comment "option b", DSR-655 Y3). CATOV-001/015/019 expect a rendered detail page with a title/button, which conflicts with the implemented behaviour. ja catalogTitle = "qa190-cat-pdf" (≠ TD-190 "QA190 PDF catalog"). |

The remaining 5% on the -form pages is that the gated render path (form + summary on a real overlay CF) has never been observed on DEV, because no CF currently has requiresForm=true. It can only be confirmed after BUGCHK-190-FORM.
