# DSR-570 automation spec (baseline BL-v1)

Source: `ykk-dsr/hub/tc-out/DSR-570.spec.json` (copied verbatim, EN expected only), TC file `[Sutrix] DSR -192- [ページ固有ブロック] 資料ダウンロード（カタログDL・ダウンロードフォーム）.xlsx`.
Baseline BL-v1 = DSR-192 BAC 1–5 / TCC 1–4 + DSR-570 comments 60987/61054 (Ngoc 10/15: demo page is layout only, not bound to CF; form is plain HTML, HubSpot later) + Figma C10 3326-80556.
Automation ID `DSR-CATDL-0NN` = TC NN.0. Spec: `tests/catalog-download/DSR-570.catalog-download.spec.ts` (JOB-20261016-12). Read-only: the download button is never clicked.

| ID | TC | Feature | Exec | Lang | In spec | Expected (EN, verbatim) | Blocked by |
|---|---|---|---|---|---|---|---|
| DSR-CATDL-001 | 1.0 | Catalog detail – header block renders | Automation | ja, en, cn | yes | HTTP 200; exactly 1 h1 (製品カタログ on ja); image loads (naturalWidth > 0); name, description, date (YYYY.MM.DD) and type label are non-empty text nodes. | — (en/cn page: see 16.0) |
| DSR-CATDL-002 | 2.0 | Download form – fields, labels, consent, button present | Automation | ja, en, cn | yes | Each input has an associated label (label[for] or aria-label) that is non-empty; 1 consent checkbox with text containing 個人情報; 1 submit button visible and in viewport after scroll. Field names recorded (final list pending C10 – A2). | C10 field list (YKK) – verdict on structure only |
| DSR-CATDL-003 | 3.0 | Download form – consent required (negative, no submit) | Automation | ja | yes | Consent checkbox has required=true OR the button is disabled while unchecked. Neither → Fail. | HubSpot form may replace the HTML form (A3) – re-run after HS |
| DSR-CATDL-004 | 4.0 | Download form – required-field validation messages | Manual | ja | no | Each required field shows a message next to it; no POST request is sent; page stays on the form. | C10 required/optional split (YKK) + HubSpot form (Ngoc) |
| DSR-CATDL-005 | 5.0 | requiresForm = false → direct download | Automation | ja, en | yes | href points to a .pdf (not the form page); response HTTP 200 with content-type application/pdf. | — |
| DSR-CATDL-006 | 6.0 | requiresForm = true → form shown, no direct PDF | Automation | ja, en | yes | Card is rendered; href is not a .pdf; target page shows the download form (2.0 structure) with this catalog's name. | DSR-570 CF integration (Ngoc 10/15: demo is layout only, not bound to catalog CF) – owner Ngoc · card not rendered on DEV 16/10 (JOB-06) |
| DSR-CATDL-007 | 7.0 | Form-gated PDF URL not exposed before submit | Automation | ja | yes | The PDF path of qa-190-cat-pdf-form appears in no response body or DOM attribute. Found → Fail (record where). | DSR-570 CF integration (Ngoc 10/15: demo is layout only, not bound to catalog CF) – owner Ngoc · method decided in design (A4) |
| DSR-CATDL-008 | 8.0 | Catalog CF – requiresForm default TRUE | Manual | ja | no | requiresForm checkbox/switch is ON (true) without any edit. | — |
| DSR-CATDL-009 | 9.0 | Editor toggles requiresForm → behaviour switches after publish | Manual | ja | no | Step 1 → form page; step 3 → direct PDF (as 5.0); step 4 → form again. | DSR-570 CF integration (Ngoc 10/15: demo is layout only, not bound to catalog CF) – owner Ngoc |
| DSR-CATDL-010 | 10.0 | Catalog ID handed to the form | Automation | ja | yes | The catalog CF ID/name (qa-190-cat-pdf-form) appears in the URL or in one hidden input; a different catalog gives a different value. | HubSpot form integration EX-06/EX-07 (LOWP) + DSR-570 – owner Ngoc / Quentin |
| DSR-CATDL-011 | 11.0 | HubSpot registration shows requested catalog | Manual | ja | no | Exactly 1 HubSpot record with the entered email and catalog ID = qa-190-cat-pdf-form. | HubSpot form integration EX-06/EX-07 (LOWP) + DSR-570 – owner Ngoc / Quentin |
| DSR-CATDL-012 | 12.0 | Thank-you page – PDF download and TOP link | Manual | ja | no | Heading ありがとうございます。 shown; PDF opens and is the qa-190-cat-pdf-form file (title check); TOP link goes to /{lang}/ top. | HubSpot form integration EX-06/EX-07 (LOWP) + DSR-570 – owner Ngoc / Quentin · DV-12 flow (YKK) |
| DSR-CATDL-013 | 13.0 | Personal data not stored in AEM | Manual | ja | no | Form data POST goes only to a HubSpot host (*.hubspot.com / *.hsforms.com); no POST to *.aem.live / *.aem.page / adobeaemcloud.com. | HubSpot form integration EX-06/EX-07 (LOWP) + DSR-570 – owner Ngoc / Quentin |
| DSR-CATDL-014 | 14.0 | Visual PC – form vs Figma C10 | Visual (Playwright VPS) | ja | no | Layout order (title → catalog block image left / text right → form label left / input right → consent → centered rounded button) matches; differences listed. | C10 not final (YKK) – compare to latest frame |
| DSR-CATDL-015 | 15.0 | Visual SP – form and thank-you at 375px | Visual (Playwright VPS) | ja | no | No horizontal scroll (scrollWidth ≤ 375); inputs full width; button fully visible. Thank-you compared to Figma 3326-81328 when reachable. | Thank-you part: HubSpot form integration EX-06/EX-07 (LOWP) + DSR-570 – owner Ngoc / Quentin |
| DSR-CATDL-016 | 16.0 | en / cn – texts translated | Automation | en, cn | yes | en: no Japanese characters in fixed texts; cn: Chinese text. | en page not created (QA-PT TD-570-01 en) · cn: no /master/cn (Issue #18) |
| DSR-CATDL-017 | 17.0 | Form page with unknown / missing catalog ID (negative) | Automation | ja | yes | Either HTTP 404 / error message, or redirect to the catalog list; never a form showing another catalog's name. Behaviour recorded (A5). | DSR-570 CF integration (Ngoc 10/15: demo is layout only, not bound to catalog CF) – owner Ngoc |
| DSR-CATDL-018 | 18.0 | e-book catalog with requiresForm = true | Automation | ja, en | yes | href = ebookUrl, target _blank; no form page in between. | EX-10 (YKK) – default A6 · ebookUrl fix QA-PT 16/10 |
| DSR-CATDL-019 | 19.0 | Lighthouse – form page | Visual (Playwright VPS) | ja | no | Performance ≥ 95 and Accessibility ≥ 95 on mobile and desktop (DoD); scores recorded. | — |

## Assumptions (from spec.json)

| ID | Assumption | Source | TCs |
|---|---|---|---|
| A1 | Test page = /master/ja/test-space/dsr-570-catalog-detail (Ngoc 10/15). Layout only; not bound to catalog CF; form is plain HTML (HubSpot later). CF-dependent TCs written, Blocked-by DSR-570 CF integration. | DSR-570 comments 60987, 61054 | All |
| A2 | [Giả định] Form field list in Figma C10 is placeholder (フォーム項目1–5); TCs judge structure (label per input, consent, button), not exact field names. | DSR-192 open item C10 | 2.0, 4.0 |
| A3 | [Giả định] When HubSpot embed replaces the HTML form, 2.0/3.0 are re-run against the HubSpot DOM without TC change. | DSR-570 comment 61054; EX-06 | 2.0, 3.0 |
| A4 | [Giả định] TCC#3 gating method undecided; 7.0 passes if the PDF path is absent from everything sent before submit. | DSR-192 TCC#3 | 7.0 |
| A5 | [Giả định] Unknown/missing catalog ID: 404, error message or redirect to list all accepted. | Not specified | 17.0 |
| A6 | [Giả định] EX-10 open: e-book opens without form (same as DSR-557 CATV-017). | DSR-192 EX-10 | 18.0 |
| A7 | Read-only for agents: no form submit, no Author edits. Submits (4.0, 11.0–13.0) and CF edits (8.0, 9.0) are Manual by QA-PT. | AGENTS.md | 4.0, 8.0, 9.0, 11.0–13.0 |

## Automation notes (JOB-20261016-12)

- 002: "associated label" accepts `label[for]`, a wrapping `<label>` (HTMLInputElement.labels) or `aria-label`. The consent check counts checkboxes whose accessible name contains 個人情報 (exactly 1).
- 003: reads `required` on the 個人情報 consent checkbox and the button `disabled` / `aria-disabled`; never clicks the button.
- 007: the gated PDF path is taken from the `dm-catalog-list` item `qa190-cat-pdf-form`. A non-null `pdfAsset` on that item = exposure (Fail, location recorded). The same file is shared by requiresForm=false CFs on DEV, so plain string hits on the list page are recorded, not attributed.
- 010/006: follow the `QA190 PDF form required` card; card not rendered → blocked-data skip. The demo page URL/hidden inputs are recorded anyway.
- 017: skipped while no catalog-ID mechanism exists (no card href carrying the catalog id). Demo page behaviour with/without `?id=999999` is recorded.
- 018: href = ebookUrl and target _blank on all card links; the first popup navigation must be ebookUrl (redirects after it belong to the external site).
- 016 cn: fixme (no /master/cn, Issue #18).
