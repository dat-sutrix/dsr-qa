# DSR-669 DEV automation run — 20261023-job21

Job: `JOB-20261023-21` (DSR-669/670/671 CF model refactor regression, runbook `docs/DSR-669/regression-runbook.md` steps 5–6 + P1 non-overlay specs). Hub results: `ykk-dsr/hub/results/JOB-20261023-21/`.

## 1. Header

- Run start (UTC): 2026-10-23T09:28:08Z
- Run end (UTC): 2026-10-23T09:48:41Z (A @overlay 09:28:08Z → 09:34:48Z · B P1 non-overlay 09:35:04Z → 09:41:18Z · C smoke 09:41:18Z → 09:41:23Z · D evidence rerun of the 26 failed tests 09:42:40Z → 09:48:41Z)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` where a test says so); persisted queries on https://publish-p192812-e2014374.adobeaemcloud.com
- Target page(s): overlay video/product/catalog pages, video/catalog lists, product list, catalog download, breadcrumb test pages, TOP, DSR-173 smoke page (every page used by the specs below)
- Build under test: deploys announced on DSR-669 `dev/2026.10.23` a47274d (2026-10-23T07:21:58Z) and DSR-670 `dev/2026.10.23_2` b33514f (08:25:33Z); Martin migration report: cq:model migration 07:32Z, republish 07:37–07:39Z, overlay pages regenerated 07:39–07:44Z. Checked myself: Author models are `DM_*_dsr` in every `dsr/*` folder (`models-after.md`, 09:25Z); persisted queries return the `related`/`inactive` aliases. EDS commit SHA not checked. `blocks/catalog-detail/catalog-detail.js` Last-Modified = Thu, 22 Oct 2026 01:48:45 GMT (catalog-detail refactor not deployed).
- Baseline ID: BL-OVL-1 (overlay); regression reference = `ykk-dsr/hub/results/REGRESSION/ledger.json` (REG-1200 + JOB-23-13/-15, ≤ 06:12Z) and `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json`
- Automation HEAD commit SHA: 2ab814740f69eaad798895de020907d0355be16c (no code changes in this job)
- Exact command used (4 groups, run one after another):

```sh
# A – runbook step 5
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/overlay-after-669.json npm run test:dev:overlay -- --reporter=list,json
# B – P1 non-overlay specs (tests already run in A excluded)
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job2321/b.json ENV=dev npx playwright test tests/catalog-video/DSR-557.catalog-video.spec.ts tests/product-list/DSR-583.product-list.spec.ts tests/product-list/DSR-583.product-list-sp.spec.ts tests/catalog-download/DSR-570.catalog-download.spec.ts tests/breadcrumb/DSR-552.breadcrumb.spec.ts tests/top/DSR-609.top.spec.ts --grep @auto --grep-invert "@manual|@blocked|@overlay" --reporter=list,json
# C – smoke
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job2321/c.json ENV=dev npx playwright test tests/smoke.spec.ts --grep-invert "@manual|@blocked" --reporter=list,json
# D – evidence rerun of the 26 failed tests (B and C had cleared test-results/, so the screenshots of A and B were gone)
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job2321/d.json ENV=dev npx playwright test tests/catalog-download/DSR-570.catalog-download.spec.ts tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts tests/product-list/DSR-583.product-list.spec.ts tests/product-list/DSR-583.product-list-sp.spec.ts tests/top/DSR-609.top.spec.ts --project=chromium --grep "DSR-CATDL-007 \[ja\]|DSR-CATDL-016 \[en\]|DSR-CATOV-001 \[(ja|en)\] qa190-cat-(pdf|ebook)-form|DSR-CATOV-012 \[(ja|en)\]|DSR-PLSP-00[235] |DSR-PRODLIST-00[1-4] \[ja\]|DSR-TOP-00[4-7] " --grep-invert "@manual|@blocked" --output=/tmp/job2321/ev-out --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Group | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| A @overlay | 257 | 208 | 8 | 41 | 1 | 2 | configured 1; 8 retry attempts | 6.6 min |
| B P1 non-overlay | 65 | 34 | 18 | 13 | 1 | 2 | configured 1; 18 retry attempts | 6.2 min |
| C smoke | 1 | 1 | 0 | 0 | 0 | 1 | configured 1; 0 | 2.4 s |
| **A+B+C** | **323** | **243** | **26** | **54** | – | – | 26 retry attempts | 12.8 min |
| D evidence rerun | 26 | 0 | 26 | 0 | 1 | 2 | configured 1; 26 retry attempts | 6.0 min |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms. Scope: chromium only (firefox/webkit match only DSR-BREAD-032, which has no `@auto` tag). Flaky outcomes: 0. Group D repeats tests of A/B and is not added to the totals; all 26 failed again the same way.

Comparison (runbook step 6, `ykk-dsr/hub/results/JOB-20261023-21/compare.md`): 0 regressed vs `overlay-before-669.json` (4 fixed: CATOV-002 ja/en); 0 NEW FAIL vs the ledger (every failing key was already failing).

## 4. Executed tests

Duration = sum of attempts. Group in brackets (A/B/C). Skipped tests are in section 5.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 6.6 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 4.3 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 4.8 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 5.3 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 6.2 s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 5.5 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 4.6 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 5.6 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 4.4 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 3.7 s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 3.1 s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | fail | 12.0 s (2 attempts) | Error: gated PDF URL delivered to the browser before submit expect(received).toEqual(expected) // deep equality - Expected - 1 |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | pass | 3.6 s | — |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) (`catalog-download/DSR-570.catalog-download.spec.ts`, A) | fail | 4.3 s (2 attempts) | Error: fixed texts containing Japanese expect(received).toEqual(expected) // deep equality - Expected - 1 |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 6.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.2 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.4 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.6 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | fail | 15.4 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.9 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.5 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.9 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 10.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.8 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.5 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.9 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | fail | 13.3 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book f |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.9 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.4 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 4.3 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.5 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 2.2 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | fail | 15.7 s (2 attempts) | Error: card 'QA190 PDF catalog' expect(locator).toBeVisible() failed Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 7.6 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 2.7 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 8.6 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 4.3 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 4.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | fail | 12.2 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.8 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.5 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.6 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 8.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.9 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.6 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.8 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | fail | 12.7 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book f |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.7 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.6 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.6 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 4.9 s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 0.8 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.5 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 2.9 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | fail | 18.4 s (2 attempts) | Error: card 'QA190 PDF catalog' expect(locator).toBeVisible() failed Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 7.1 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 4.4 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 9.1 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 5.7 s | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.6 s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 7.1 s | — |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 1.5 s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`, A) | pass | 5.6 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 6.8 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 7.5 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 9.0 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 5.6 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 4.0 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.0 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.2 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 8.9 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 7.8 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 7.1 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.5 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.4 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.7 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.3 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.5 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.7 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.8 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.8 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.2 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.6 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.4 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.4 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.7 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.1 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 1.4 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.2 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 1.9 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.4 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 1.6 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 1.6 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.0 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 4.4 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 3.2 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 4.7 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 2.6 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 4.8 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 6.1 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`, A) | pass | 7.4 s | — |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 3.7 s | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 3.5 s | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 1.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 6.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 6.6 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 5.8 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 5.9 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 5.8 s | — |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 3.6 s | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 4.4 s | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 3.9 s | — |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 3.9 s | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 3.7 s | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 3.4 s | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title (`movie-detail/DSR-587.movie-overlay.spec.ts`, A) | pass | 3.1 s | — |
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first (`movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`, A) | pass | 8.4 s | — |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed (`movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`, A) | pass | 8.4 s | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 (`movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts`, A) | pass | 8.1 s | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 (`movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts`, A) | pass | 7.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.4 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.6 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.0 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.5 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 0.9 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.9 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.2 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.7 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.1 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.3 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`, A) | pass | 1.5 s | — |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`, A) | pass | 0.0 s | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`, A) | pass | 0.0 s | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`, A) | pass | 0.5 s | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`, A) | pass | 0.7 s | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`, A) | pass | 0.3 s | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`, A) | pass | 0.5 s | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only (`product-cf/DSR-585.product-cf.spec.ts`, A) | pass | 0.7 s | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only (`product-cf/DSR-585.product-cf.spec.ts`, A) | pass | 0.8 s | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 5.1 s | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 5.2 s | — |
| DSR-PDO-002 | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 0.7 s | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 0.3 s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 0.4 s | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 4.3 s | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 5.7 s | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 6.4 s | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 6.3 s | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 0.6 s | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 3.6 s | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 3.1 s | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 2.8 s | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 2.7 s | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 3.0 s | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 5.3 s | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page (`product-detail/DSR-586.product-detail.spec.ts`, A) | pass | 2.8 s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [ja] display name overrides page title (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 7.6 s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [en] display name overrides page title (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 7.7 s | — |
| DSR-BREAD-015 | DSR-BREAD-015 [ja] special characters in display name are plain text (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 4.9 s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [ja] each language uses its own display names (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 2.8 s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [en] each language uses its own display names (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 2.5 s | — |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 4.1 s | — |
| DSR-BREAD-002 | DSR-BREAD-002 ancestor links (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 10.5 s | — |
| DSR-BREAD-003 | DSR-BREAD-003 current page is not linked (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 2.4 s | — |
| DSR-BREAD-004 | DSR-BREAD-004 HOME label and destination (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 2.4 s | — |
| DSR-BREAD-005 | DSR-BREAD-005 grandchild trail order (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 3.0 s | — |
| DSR-BREAD-006 | DSR-BREAD-006 parent trail (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 2.7 s | — |
| DSR-BREAD-007 | DSR-BREAD-007 missing intermediate page (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 1.6 s | — |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 2.3 s | — |
| DSR-BREAD-009 | DSR-BREAD-009 404 excludes breadcrumb (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 3.7 s | — |
| DSR-BREAD-011 | DSR-BREAD-011 empty label uses title (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 3.7 s | — |
| DSR-BREAD-017 | DSR-BREAD-017 localized HOME destinations (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 3.1 s | — |
| DSR-BREAD-025 | DSR-BREAD-025 BreadcrumbList structured data (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 3.2 s | — |
| DSR-BREAD-027 | DSR-BREAD-027 semantic markup and accessibility (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 4.5 s | — |
| DSR-BREAD-028 | DSR-BREAD-028 keyboard navigation (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 9.9 s | — |
| DSR-BREAD-031 | DSR-BREAD-031 site-origin console errors (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 5.6 s | — |
| DSR-BREAD-035 | DSR-BREAD-035 arrow asset origin and status (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 6.3 s | — |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 5.0 s | — |
| DSR-BREAD-005 | DSR-BREAD-005 grandchild trail order (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 4.6 s | — |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 4.2 s | — |
| DSR-BREAD-017 | DSR-BREAD-017 localized HOME destinations (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 4.7 s | — |
| DSR-BREAD-025 | DSR-BREAD-025 BreadcrumbList structured data (`breadcrumb/DSR-552.breadcrumb.spec.ts`, B) | pass | 4.8 s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll (`product-list/DSR-583.product-list-sp.spec.ts`, B) | pass | 6.5 s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width (`product-list/DSR-583.product-list-sp.spec.ts`, B) | fail | 35.6 s (2 attempts) | Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality - Expected - 1 |
| DSR-PLSP-003 | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload (`product-list/DSR-583.product-list-sp.spec.ts`, B) | fail | 61.8 s (2 attempts) | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned (`product-list/DSR-583.product-list-sp.spec.ts`, B) | fail | 61.4 s (2 attempts) | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) (`product-list/DSR-583.product-list-sp.spec.ts`, B) | pass | 10.6 s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll (`product-list/DSR-583.product-list-sp.spec.ts`, B) | pass | 3.9 s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width (`product-list/DSR-583.product-list-sp.spec.ts`, B) | fail | 34.0 s (2 attempts) | Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality - Expected - 1 |
| DSR-PLSP-003 | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload (`product-list/DSR-583.product-list-sp.spec.ts`, B) | fail | 62.2 s (2 attempts) | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned (`product-list/DSR-583.product-list-sp.spec.ts`, B) | fail | 61.1 s (2 attempts) | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) (`product-list/DSR-583.product-list-sp.spec.ts`, B) | pass | 7.8 s | — |
| DSR-PRODLIST-001 | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll (`product-list/DSR-583.product-list.spec.ts`, B) | fail | 6.2 s (2 attempts) | Error: 375: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 2 |
| DSR-PRODLIST-002 | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll (`product-list/DSR-583.product-list.spec.ts`, B) | fail | 23.8 s (2 attempts) | Error: 320: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 2 |
| DSR-PRODLIST-003 | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads (`product-list/DSR-583.product-list.spec.ts`, B) | fail | 22.2 s (2 attempts) | Error: open: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 2 |
| DSR-PRODLIST-004 | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 (`product-list/DSR-583.product-list.spec.ts`, B) | fail | 23.3 s (2 attempts) | Error: 1440: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 4 |
| DSR-TOP-004 | DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search (`top/DSR-609.top.spec.ts`, B) | fail | 9.6 s (2 attempts) | Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality Expected: not [] |
| DSR-TOP-005 | DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (`top/DSR-609.top.spec.ts`, B) | fail | 16.3 s (2 attempts) | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).toBe(expected) // Object.is equality Expec |
| DSR-TOP-006 | DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date (`top/DSR-609.top.spec.ts`, B) | fail | 16.9 s (2 attempts) | Error: page requests /ja/news/query-index.json expect(received).toContain(expected) // indexOf Expected value: "/ja/news/query-index.json" |
| DSR-TOP-007 | DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (`top/DSR-609.top.spec.ts`, B) | fail | 15.4 s (2 attempts) | Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected) Expected: <= 1 |
| DSR-TOP-008 | DSR-TOP-008 [ja] NEWS with empty query-index renders without error (`top/DSR-609.top.spec.ts`, B) | pass | 6.4 s | — |
| DSR-TOP-009 | DSR-TOP-009 [ja] main visual image is eager and is the LCP element (`top/DSR-609.top.spec.ts`, B) | pass | 4.6 s | — |
| DSR-TOP-004 | DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search (`top/DSR-609.top.spec.ts`, B) | fail | 8.0 s (2 attempts) | Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality Expected: not [] |
| DSR-TOP-005 | DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (`top/DSR-609.top.spec.ts`, B) | fail | 7.5 s (2 attempts) | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).toBe(expected) // Object.is equality Expec |
| DSR-TOP-006 | DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date (`top/DSR-609.top.spec.ts`, B) | fail | 7.0 s (2 attempts) | Error: page requests /en/news/query-index.json expect(received).toContain(expected) // indexOf Expected value: "/en/news/query-index.json" |
| DSR-TOP-007 | DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (`top/DSR-609.top.spec.ts`, B) | fail | 7.3 s (2 attempts) | Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected) Expected: <= 1 |
| DSR-TOP-008 | DSR-TOP-008 [en] NEWS with empty query-index renders without error (`top/DSR-609.top.spec.ts`, B) | pass | 3.9 s | — |
| DSR-TOP-009 | DSR-TOP-009 [en] main visual image is eager and is the LCP element (`top/DSR-609.top.spec.ts`, B) | pass | 5.6 s | — |
| SMOKE-001 | SMOKE-001 DSR-173 test page is reachable (`smoke.spec.ts`, C) | pass | 0.8 s | — |

## 5. Skipped tests

Reasons copied verbatim from the test annotations.

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-011 (DSR-ARTICLE-011 [ja] listing card images of qa529 articles absolute, G) | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-011 (DSR-ARTICLE-011 [en] listing card images of qa529 articles absolute, G) | Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-CATDL-017 (DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another c) | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 (DSR-CATDL-016 [cn] fixed texts translated (Chinese)) | cn: no /master/cn (Issue #18) |
| DSR-CATOV-006 (DSR-CATOV-006 [ja] unpublished DSR CF → 404 on both hosts, removed fro) | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 (DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per DSR-655 Y3 ) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 (DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per DSR-655 Y3 ) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-VOV-004 (DSR-VOV-004 [en] CF related name with uppercase / underscore → 404) | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 (DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → ) | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 (DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .aem.live) | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-010 (DSR-VOV-010 [en] unpublished CF related → 404 on both hosts, absent fr) | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 (DSR-VOV-011 [ja] video/tech-talk stays a list page) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 (DSR-VOV-011 [en] video/tech-talk stays a list page) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-016 (DSR-VOV-016 [en] related contents ordered by update date, newest first) | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 (DSR-VOV-017 [en] DSR-173 Group A page switched to the overlay page) | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-538-retest (DSR-538-retest [en] qa587-main (.aem.page) related card hrefs on the E) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [ja] qa587-main (.aem.page) related card hrefs on the E) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [en] qa587-main (.aem.live) related card hrefs on the E) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [ja] qa587-main (.aem.live) related card hrefs on the E) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-CATOV-002 (DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-previ) | preview-only CF: not on .aem.live (HTTP 404 = expected) |
| DSR-PCF-001 (DSR-PCF-001 [ja] DM_product field set matches ver0.4 (10 tabs, 83 fiel) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 (DSR-PCF-002 [ja] removed fields and old spellings not shown in the CF ) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 (DSR-PCF-003 [ja] field types match fix list) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 (DSR-PCF-004 [ja] required fields enforced on save (negative)) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 (DSR-PCF-005 [ja] single-line text accepts 255 characters (boundary)) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 (DSR-PCF-006 [ja] zipperChainTypeCategories tag picker stores several c) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 (DSR-PCF-008 [ja] data entry template columns match the model) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 (DSR-PCF-009 [ja] bulk import with revised template) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 (DSR-PCF-010 [ja] bulk import rejects row missing a required field (neg) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 (DSR-PCF-011 [ja] pre-change product CF opens and keeps retained values) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 (DSR-PCF-012 [ja] ja / en / cn folders use the same model) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 (DSR-PCF-013 [ja] published TD-585-01 returns ver0.4 fields via dsr-pro) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 (DSR-PCF-013 [en] published TD-585-01 returns ver0.4 fields via dsr-pro) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 (DSR-PCF-014 [ja] product search JSON entry has search keys and no remo) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 (DSR-PCF-015 [ja] product detail of TD-585-01 renders without errors (r) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 (DSR-PCF-018 [ja] product CF name = numeric productId in content CF fol) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 (DSR-PCF-018 [en] product CF name = numeric productId in content CF fol) | Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-006 (DSR-PDO-006 [ja] CF related in subfolder → no page (404)) | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 (DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live) | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 (DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent fr) | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-020 (DSR-PDO-020 [ja] ver0.4 new fields – current state recorded (Blocked: ) | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |
| DSR-BREAD-018 (DSR-BREAD-018 [cn] each language uses its own display names) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-022 (DSR-BREAD-022 SP parent navigation) | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 (DSR-BREAD-029 STG Lighthouse performance) | Run on STG (Lighthouse) |
| DSR-BREAD-030 (DSR-BREAD-030 movie breadcrumb regression) | DSR-536 / movie-detail placement |
| DSR-BREAD-033 (DSR-BREAD-033 all page types) | Layout tickets |
| DSR-BREAD-034 (DSR-BREAD-034 responsive movie back control) | DSR-536 / movie-detail placement |
| DSR-BREAD-001 (DSR-BREAD-001 child trail and placement) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 (DSR-BREAD-005 grandchild trail order) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 (DSR-BREAD-008 HOME excludes breadcrumb) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 (DSR-BREAD-017 localized HOME destinations) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 (DSR-BREAD-025 BreadcrumbList structured data) | cn: no /master/cn (Issue #18) |
| DSR-PRODLIST-003 (DSR-PRODLIST-003 [en] SP column count stays 2 after scroll, load more,) | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 (DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1): last car) | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |

## 6. Failed tests

All 26 were already failing in `ykk-dsr/hub/results/REGRESSION/ledger.json` before the deploy (not NEW FAIL). Classification: see `ykk-dsr/hub/results/JOB-20261023-21/summary.md`.

### DSR-CATDL-007 [ja] — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `Error: gated PDF URL delivered to the browser before submit` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Expected: - Expected  - 1 / - Array []
- Actual: + Received  + 3 / + Array [ / +   "dsr-catalog-list response: item qa190-cat-pdf-form (requiresForm=true) pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/pdf/sample-pdf-a4-size-65kb.pdf", / + ]
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-CATDL-007_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-CATDL-016 [en] — DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Failing assertion: `Error: fixed texts containing Japanese` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Expected: - Expected  -  1 / - Array []
- Actual: + Received  + 44 / + Array [ / +   "必須 / + 氏名（姓）",
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-CATDL-016_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-CATOV-001 [ja] — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected: Expected: "QA190 PDF form required" / - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms / - waiting for locator('main .catalog-detail').locator('.catalog-detail-title') / - unexpected value "catalog pdf form"
- Actual: Received: "catalog pdf form" / Timeout:  5000ms
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-CATOV-001_ja_qa190-cat-pdf-form.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-CATOV-001 [ja] — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected: Expected: "QA190 e-book form" / - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms / - waiting for locator('main .catalog-detail').locator('.catalog-detail-title') / - unexpected value "catalog ebook form"
- Actual: Received: "catalog ebook form" / Timeout:  5000ms
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-CATOV-001_ja_qa190-cat-ebook-form.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-CATOV-012 [ja] — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion: `Error: card 'QA190 PDF catalog'` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected: Expected: visible / - card 'QA190 PDF catalog' locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() with timeout 5000ms / - waiting for locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first()
- Actual: Timeout: 5000ms
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-CATOV-012_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-CATOV-001 [en] — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected: Expected: "QA190 PDF form required" / - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms / - waiting for locator('main .catalog-detail').locator('.catalog-detail-title') / - unexpected value "catalog pdf form"
- Actual: Received: "catalog pdf form" / Timeout:  5000ms
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-CATOV-001_en_qa190-cat-pdf-form.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-CATOV-001 [en] — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected: Expected: "QA190 e-book form" / - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms / - waiting for locator('main .catalog-detail').locator('.catalog-detail-title') / - unexpected value "catalog ebook form"
- Actual: Received: "catalog ebook form" / Timeout:  5000ms
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-CATOV-001_en_qa190-cat-ebook-form.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-CATOV-012 [en] — DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion: `Error: card 'QA190 PDF catalog'` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected: Expected: visible / - card 'QA190 PDF catalog' locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() with timeout 5000ms / - waiting for locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first()
- Actual: Timeout: 5000ms
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-CATOV-012_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PLSP-002 [ja] — DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected: - Expected  - 1 / - Array []
- Actual: + Received  + 8 / + Array [ / +   "", / +   "",
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PLSP-002_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PLSP-003 [ja] — DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — `tests/product-list/DSR-583.product-list-sp.spec.ts:68 (timeout, no assertion location)`
- Expected: see message
- Actual: 
- Attempt(s): timedOut → timedOut (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PLSP-003_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PLSP-005 [ja] — DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Test timeout of 30000ms exceeded.` — `tests/product-list/DSR-583.product-list-sp.spec.ts:105 (timeout, no assertion location)`
- Expected: see message
- Actual: 
- Attempt(s): timedOut → timedOut (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PLSP-005_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PLSP-002 [en] — DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected: - Expected  - 1 / - Array []
- Actual: + Received  + 6 / + Array [ / +   "", / +   "",
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PLSP-002_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PLSP-003 [en] — DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — `tests/product-list/DSR-583.product-list-sp.spec.ts:68 (timeout, no assertion location)`
- Expected: see message
- Actual: 
- Attempt(s): timedOut → timedOut (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PLSP-003_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PLSP-005 [en] — DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Test timeout of 30000ms exceeded.` — `tests/product-list/DSR-583.product-list-sp.spec.ts:105 (timeout, no assertion location)`
- Expected: see message
- Actual: 
- Attempt(s): timedOut → timedOut (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PLSP-005_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PRODLIST-001 [ja] — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `Error: 375: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected: Expected: 2
- Actual: Received: 1
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PRODLIST-001_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PRODLIST-002 [ja] — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `Error: 320: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected: Expected: 2
- Actual: Received: 1
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PRODLIST-002_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PRODLIST-003 [ja] — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `Error: open: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70`
- Expected: Expected: 2
- Actual: Received: 1
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PRODLIST-003_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-PRODLIST-004 [ja] — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `Error: 1440: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153`
- Expected: Expected: 4
- Actual: Received: 1
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-PRODLIST-004_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-TOP-004 [ja] — DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover` — `tests/top/DSR-609.top.spec.ts:40`
- Expected: Expected: not []
- Actual: expect(received).not.toEqual(expected) // deep equality / Expected: not []
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-TOP-004_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-TOP-005 [ja] — DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83`
- Expected: Expected: true
- Actual: Received: false
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-TOP-005_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-TOP-006 [ja] — DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /ja/news/query-index.json` — `tests/top/DSR-609.top.spec.ts:124`
- Expected: Expected value: "/ja/news/query-index.json"
- Actual: Received array: ["/query-index.json"]
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-TOP-006_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-TOP-007 [ja] — DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160`
- Expected: Expected: <= 1
- Actual: Received:    2
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-TOP-007_ja.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-TOP-004 [en] — DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover` — `tests/top/DSR-609.top.spec.ts:40`
- Expected: Expected: not []
- Actual: expect(received).not.toEqual(expected) // deep equality / Expected: not []
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-TOP-004_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-TOP-005 [en] — DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83`
- Expected: Expected: true
- Actual: Received: false
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-TOP-005_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-TOP-006 [en] — DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /en/news/query-index.json` — `tests/top/DSR-609.top.spec.ts:124`
- Expected: Expected value: "/en/news/query-index.json"
- Actual: Received array: ["/query-index.json"]
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-TOP-006_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

### DSR-TOP-007 [en] — DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160`
- Expected: Expected: <= 1
- Actual: Received:    2
- Attempt(s): failed → failed (initial + retry, same failure); evidence rerun (group D) failed the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-21/evidence/DSR-TOP-007_en.png` (from group D rerun, committed); trace of group D in `/tmp/job2321/ev-out/` (not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. The committed PNGs are in `ykk-dsr/hub/results/JOB-20261023-21/evidence/` (3.6 MB). They come from group D, because groups B and C cleared `test-results/` and removed the screenshots of A and B.

## 7. Open points for QA

- Build identity: I did not check the EDS commit on `main`. The deploy and migration come from the job file and the Martin report. I checked the Author models (`models-after.md`) and the Last-Modified of `catalog-detail.js` myself.
- The catalog-detail refactor is not on DEV (`catalog-detail.js` Last-Modified 22 Oct 01:48:45 GMT, ETag unchanged). The 654/570/557 results do not cover it, so they need a rerun when the file changes.
- Ledger keys `DSR-ARTICLE-011 [ja]/[en]` and `DSR-501-P2/P3 [en]` were not updated. Each key holds two different tests, and only one of them ran here (TC ID collision, also noted in REG-1200).
- Step 3 lint: 17 manifests still name `DM_*_related` (`model-current` FAIL). `TD-557-DAM.yaml` does not parse (YAMLParseError line 14 col 62). I did not check whether that error is older than this job. Manifests are owned by Claude and I did not edit them.
- DSR-671 checks are only observations (`observations-670-671.md`). isActive=false related items could not be checked because no test data exists. `productLabel` is never `{productId}｜{productName}`, and the expected behaviour for existing CFs is unclear.
- `test-results/overlay-after-669.json` was cleared by group B and then restored from a copy taken right after group A (same content).
- During group B the 552 spec rewrote the tracked PNGs in `evidence/DSR-552/DEV/` (side effect of the spec). I reverted them, so they are not part of this commit.
