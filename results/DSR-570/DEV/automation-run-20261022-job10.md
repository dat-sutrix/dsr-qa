# DSR-570 DEV automation run — 20261022-job10

JOB-20261022-10 (catalog rerun after Agent Author data fix JOB-20261022-07). Proposed outcomes only; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-22T06:15:44.291Z
- Run end (UTC): 2026-10-22T07:03:38.749Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /master/{ja,en}/test-space/list-catalog, /{lang}/library/catalog/qa190-cat-pdf-form (fallback /master/{lang}/test-space/dsr-570-catalog-detail)
- Build under test: not independently verified (no build ID exposed). Code deploy observed at 2026-10-22T06:19:14Z (last-modified of blocks/listing/types.js, blocks/listing/adapters/cf.js, scripts/catalog-link.js on .aem.live); catalog list switched from dm-catalog-list to dsr-catalog-list;folder=/content/dam/dsr/{lang}/. Runs before/after are labelled.
- Baseline ID: DSR-570 TC sheet (CATDL) + BL-OVL-1 + DSR-655 Y3
- Automation HEAD commit SHA: af233042023099969048f3de0c84aee54dc76c6f
- Exact commands used (in this order):

```sh
# .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy)
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job10/run/570-page.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --project=chromium --output=test-results/job10-570-page
# .aem.live
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job10/run/570-live.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --project=chromium --output=test-results/job10-570-live
# .aem.page (run 2, post-deploy)
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job10/run/570-page2.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --project=chromium --output=test-results/job10-570-page2
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run once at 06:13:56Z on the same tree before the test runs).

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | 16 | 6 | 5 | 5 | 1 | 2 | 1 configured; 5 tests retried | 399s |
| .aem.live | 16 | 3 | 1 | 12 | 1 | 2 | 1 configured; 1 tests retried | 295s |
| .aem.page (run 2, post-deploy) | 16 | 3 | 1 | 12 | 1 | 2 | 1 configured; 1 tests retried | 297s |

Counts are runner outcomes (unique tests). Job-level proposed verdicts (pass/fail/blocked/skip with suspect) are in ykk-dsr/hub/results/JOB-20261022-10/result.json; the column "Result" below shows the proposed verdict. Scope/browser: chromium only. Flaky: 0.

## 4. Executed tests

Duration = last attempt.

| TC ID | Title | Host | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | pass | 18.5s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | pass | 17.1s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | pass | 4.5s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | blocked | 8.4s | card → /ja/library/catalog/qa190-cat-pdf-form, form count 0: overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | fail | 33.5s | test expectation to fix: e-book + requiresForm is gated since DSR-655 Y3 (catalog-link.js header, 2026-10-20); card links to detail page |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | pass | 4.1s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | blocked | 11.1s | card → /en/library/catalog/qa190-cat-pdf-form, form count 0: overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | fail | 34.5s | test expectation to fix: e-book + requiresForm is gated since DSR-655 Y3 (catalog-link.js header, 2026-10-20); card links to detail page |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | pass | 17.0s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | fail | 25.0s | gated PDF URL delivered before submit: list GraphQL item qa190-cat-pdf-form (requiresForm=true) carries pdfAsset._publishUrl + pdfAsset row in overlay HTML (asset shared with non-form CFs) |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | pass | 20.6s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | .aem.live | pass | 16.9s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | .aem.live | pass | 16.4s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | .aem.live | pass | 16.4s | — |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | .aem.live | blocked | 30.8s | timeout: overlay form page has 0 forms (stale page) → fell back to demo page, no hidden catalog id; detail page also stale |
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | .aem.page (run 2, post-deploy) | pass | 16.9s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | .aem.page (run 2, post-deploy) | pass | 16.6s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | .aem.page (run 2, post-deploy) | pass | 18.8s | — |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | .aem.page (run 2, post-deploy) | blocked | 31.0s | timeout: overlay form page has 0 forms (stale page) → fell back to demo page, no hidden catalog id; detail page also stale |

## 5. Skipped tests

| TC ID | Host | Verbatim skip reason |
|---|---|---|
| DSR-CATDL-001 [en] | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-002 [en] | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-017 [ja] | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [en] | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-016 [cn] | .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) | cn: no /master/cn (Issue #18) |
| DSR-CATDL-005 [ja] | .aem.live | blocked-data: /content/dam/common/ja/catalogs/qa190-cat-pdf absent from dm-catalog-list – TD-570-02 |
| DSR-CATDL-006 [ja] | .aem.live | blocked-data: /content/dam/common/ja/catalogs/qa190-cat-pdf-form absent from dm-catalog-list – TD-570-03 |
| DSR-CATDL-018 [ja] | .aem.live | blocked-data: /content/dam/common/ja/catalogs/qa190-cat-ebook-form absent from dm-catalog-list – TD-570-04 |
| DSR-CATDL-001 [en] | .aem.live | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-002 [en] | .aem.live | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-005 [en] | .aem.live | blocked-data: /content/dam/common/en/catalogs/qa190-cat-pdf absent from dm-catalog-list – TD-570-02 |
| DSR-CATDL-006 [en] | .aem.live | blocked-data: /content/dam/common/en/catalogs/qa190-cat-pdf-form absent from dm-catalog-list – TD-570-03 |
| DSR-CATDL-018 [en] | .aem.live | blocked-data: /content/dam/common/en/catalogs/qa190-cat-ebook-form absent from dm-catalog-list – TD-570-04 |
| DSR-CATDL-007 [ja] | .aem.live | blocked-data: /content/dam/common/ja/catalogs/qa190-cat-pdf-form absent from dm-catalog-list on /master/ja/test-space/list-catalog |
| DSR-CATDL-017 [ja] | .aem.live | no catalog-ID mechanism on DEV yet: "qa190-cat-pdf-form" card not rendered; overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [en] | .aem.live | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-016 [cn] | .aem.live | cn: no /master/cn (Issue #18) |
| DSR-CATDL-005 [ja] | .aem.page (run 2, post-deploy) | blocked-data: /content/dam/common/ja/catalogs/qa190-cat-pdf absent from dm-catalog-list – TD-570-02 |
| DSR-CATDL-006 [ja] | .aem.page (run 2, post-deploy) | blocked-data: /content/dam/common/ja/catalogs/qa190-cat-pdf-form absent from dm-catalog-list – TD-570-03 |
| DSR-CATDL-018 [ja] | .aem.page (run 2, post-deploy) | blocked-data: /content/dam/common/ja/catalogs/qa190-cat-ebook-form absent from dm-catalog-list – TD-570-04 |
| DSR-CATDL-001 [en] | .aem.page (run 2, post-deploy) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-002 [en] | .aem.page (run 2, post-deploy) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-005 [en] | .aem.page (run 2, post-deploy) | blocked-data: /content/dam/common/en/catalogs/qa190-cat-pdf absent from dm-catalog-list – TD-570-02 |
| DSR-CATDL-006 [en] | .aem.page (run 2, post-deploy) | blocked-data: /content/dam/common/en/catalogs/qa190-cat-pdf-form absent from dm-catalog-list – TD-570-03 |
| DSR-CATDL-018 [en] | .aem.page (run 2, post-deploy) | blocked-data: /content/dam/common/en/catalogs/qa190-cat-ebook-form absent from dm-catalog-list – TD-570-04 |
| DSR-CATDL-007 [ja] | .aem.page (run 2, post-deploy) | blocked-data: /content/dam/common/ja/catalogs/qa190-cat-pdf-form absent from dm-catalog-list on /master/ja/test-space/list-catalog |
| DSR-CATDL-017 [ja] | .aem.page (run 2, post-deploy) | no catalog-ID mechanism on DEV yet: "qa190-cat-pdf-form" card not rendered; overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [en] | .aem.page (run 2, post-deploy) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-016 [cn] | .aem.page (run 2, post-deploy) | cn: no /master/cn (Issue #18) |

## 6. Failed tests

### DSR-CATDL-006 — DSR-CATDL-006 [ja] requiresForm=true card leads to the download form

- Failing assertion — `tests/catalog-download/DSR-570.catalog-download.spec.ts:104`:
  - .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) (2 attempts, all failed): Error: expect(locator).toHaveCount(expected) failed; Expected: 1; Received: 0
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — card → /ja/library/catalog/qa190-cat-pdf-form, form count 0: overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish
- Evidence paths: none generated (request-only test)

### DSR-CATDL-018 — DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form

- Failing assertion — `tests/catalog-download/DSR-570.catalog-download.spec.ts:118`:
  - .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) (2 attempts, all failed): Error: page.waitForEvent: Test timeout of 30000ms exceeded.
- Proposed: fail; suspect test; cause none; product-bug confidence 10% — test expectation to fix: e-book + requiresForm is gated since DSR-655 Y3 (catalog-link.js header, 2026-10-20); card links to detail page
- Evidence paths: `test-results/job10-570-page/catalog-download-DSR-570.c-937ce-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`

### DSR-CATDL-006 — DSR-CATDL-006 [en] requiresForm=true card leads to the download form

- Failing assertion — `tests/catalog-download/DSR-570.catalog-download.spec.ts:104`:
  - .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) (2 attempts, all failed): Error: expect(locator).toHaveCount(expected) failed; Expected: 1; Received: 0
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — card → /en/library/catalog/qa190-cat-pdf-form, form count 0: overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish
- Evidence paths: none generated (request-only test)

### DSR-CATDL-018 — DSR-CATDL-018 [en] e-book form card opens ebookUrl without form

- Failing assertion — `tests/catalog-download/DSR-570.catalog-download.spec.ts:118`:
  - .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) (2 attempts, all failed): Error: page.waitForEvent: Test timeout of 30000ms exceeded.
- Proposed: fail; suspect test; cause none; product-bug confidence 10% — test expectation to fix: e-book + requiresForm is gated since DSR-655 Y3 (catalog-link.js header, 2026-10-20); card links to detail page
- Evidence paths: `test-results/job10-570-page/catalog-download-DSR-570.c-b8a9e-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`

### DSR-CATDL-007 — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion — `tests/catalog-download/DSR-570.catalog-download.spec.ts:167`:
  - .aem.page (run 1, 06:15–06:22Z, straddles 06:19Z deploy) (2 attempts, all failed): Error: gated PDF path on the form page (responses + DOM); - Expected  - 1; + Received  + 3 ‖ Error: gated PDF URL delivered to the browser before submit; - Expected  - 1; + Received  + 3
- Proposed: fail; suspect product; cause none; product-bug confidence 70% — gated PDF URL delivered before submit: list GraphQL item qa190-cat-pdf-form (requiresForm=true) carries pdfAsset._publishUrl + pdfAsset row in overlay HTML (asset shared with non-form CFs)
- Evidence paths: `test-results/job10-570-page/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png`

### DSR-CATDL-010 — DSR-CATDL-010 [ja] catalog ID handed to the form

- Failing assertion — `tests/catalog-download/DSR-570.catalog-download.spec.ts:206`:
  - .aem.live (2 attempts, all failed): Error: expect(locator).toBeVisible() failed; Expected: visible; Received: undefined
  - .aem.page (run 2, post-deploy) (2 attempts, all failed): Error: expect(locator).toBeVisible() failed; Expected: visible; Received: undefined
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — timeout: overlay form page has 0 forms (stale page) → fell back to demo page, no hidden catalog id; detail page also stale
- Evidence paths: none generated (request-only test)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; selected failure screenshots are copied to `ykk-dsr/hub/results/JOB-20261022-10/evidence/`.

## 7. Open points for QA

- Preflight: content CFs common/{ja,en}/catalogs/qa190-cat-pdf-form + -ebook-form have requiresForm=true (dm-catalog-list 06:12Z), but none of the 4 -form overlay pages has a requiresForm row (DSR CF cq:lastModified 2026-10-21T14:17–14:20Z). BL-OVL-1: a content CF change shows only after the DSR CF is republished; JOB-20261022-07 published the content CFs only. Proposed fix: Agent Author republishes dsr/{ja,en}/catalogs/qa190-cat-pdf-form and -ebook-form (preview + publish), then rerun.
- A code deploy at 06:19:14Z changed the catalog list query (dm-catalog-list → dsr-catalog-list;folder=/content/dam/dsr/{lang}/). Runs after it are on a different build than page run 1; build identity is not independently verified.
- Content CF titles/dates are dev samples (catalog pdf / qa190-cat-pdf ja, 2026-09-03), not TD-190 values.
- Not verified: Author-side state (no Author access in this lane); whether a republished -form page drops the pdfAsset row.
- CATDL-006 (page run 1): the requiresForm=true card leads to /{lang}/library/catalog/qa190-cat-pdf-form, which renders 0 forms because the page is stale → blocked (data).
- CATDL-007 (page run 1): the gated PDF URL reaches the browser before submit – the list GraphQL item qa190-cat-pdf-form (requiresForm=true) carries pdfAsset._publishUrl, and the overlay HTML has a pdfAsset row. The new dsr-catalog-list response (checked 07:00Z) still carries pdfAsset._publishUrl for it. The asset file is shared with non-form CFs. Proposed product fail at 70% (< 80% → Claude decides).
- CATDL-018 (page run 1): e-book + requiresForm card does not open ebookUrl directly – consistent with DSR-655 Y3 → TC expectation to fix (suspect test).
- CATDL-010 (.live, page run 2) timed out: overlay form page has 0 forms (stale), demo fallback has no hidden catalog id → blocked (data).
- en demo page /master/en/test-space/dsr-570-catalog-detail is still 404 (CATDL-001/002/016 en blocked, as before).
