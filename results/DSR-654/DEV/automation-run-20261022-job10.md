# DSR-654 DEV automation run — 20261022-job10

JOB-20261022-10 (catalog rerun after Agent Author data fix JOB-20261022-07). Proposed outcomes only; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-22T06:24:48.216Z
- Run end (UTC): 2026-10-22T06:54:47.731Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /{ja,en}/library/catalog/{qa190-cat-pdf,-pdf-form,-ebook,-ebook-form}, /en/library/catalog/qa654-*
- Build under test: not independently verified (no build ID exposed). Code deploy observed at 2026-10-22T06:19:14Z (last-modified of blocks/listing/types.js, blocks/listing/adapters/cf.js, scripts/catalog-link.js on .aem.live); catalog list switched from dm-catalog-list to dsr-catalog-list;folder=/content/dam/dsr/{lang}/. Runs before/after are labelled.
- Baseline ID: DSR-654 TC sheet (ykk-dsr/hub/tc-out/DSR-654.spec.json) + BL-OVL-1
- Automation HEAD commit SHA: af233042023099969048f3de0c84aee54dc76c6f
- Exact commands used (in this order):

```sh
# .aem.page
DSR654_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job10/run/654-page.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --project=chromium --output=test-results/job10-654-page
# .aem.live
DSR654_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job10/run/654-live.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --project=chromium --output=test-results/job10-654-live
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run once at 06:13:56Z on the same tree before the test runs).

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| .aem.page | 62 | 20 | 37 | 5 | 1 | 2 | 1 configured; 37 tests retried | 580s |
| .aem.live | 62 | 20 | 37 | 5 | 1 | 2 | 1 configured; 37 tests retried | 523s |

Counts are runner outcomes (unique tests). Job-level proposed verdicts (pass/fail/blocked/skip with suspect) are in ykk-dsr/hub/results/JOB-20261022-10/result.json; the column "Result" below shows the proposed verdict. Scope/browser: chromium only. Flaky: 0.

## 4. Executed tests

Duration = last attempt.

| TC ID | Title | Host | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | fail | 7.1s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail | 1.1s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap | .aem.page | fail | 1.0s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | blocked | 7.2s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail | 1.1s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.1s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | .aem.page | fail | 1.2s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | fail | 9.3s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail | 1.1s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap | .aem.page | fail | 1.1s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | blocked | 9.6s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail | 1.1s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | .aem.page | fail | 1.0s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | .aem.page | pass | 1.9s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | .aem.page | pass | 5.8s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | .aem.page | pass | 2.8s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | .aem.page | pass | 6.0s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page | .aem.page | fail | 10.1s | card 'QA190 PDF catalog' not on list: content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → download opens the PDF directly | .aem.page | fail | 10.6s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | .aem.page | blocked | 8.0s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed) |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form | .aem.page | fail | 13.7s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) (e-book; same mechanism, not named in job) |
| DSR-CATOV-018 | DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) | .aem.page | blocked | 15.0s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed) |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] catalog detail shows image, name, description, date and type label of the content CF | .aem.page | fail | 7.9s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | fail | 7.1s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail | 1.2s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap | .aem.page | fail | 1.1s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | blocked | 7.0s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail | 1.2s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | .aem.page | fail | 1.1s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | fail | 10.3s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail | 1.1s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.1s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap | .aem.page | fail | 1.1s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | blocked | 9.0s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail | 1.0s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.1s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | .aem.page | fail | 1.2s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | .aem.page | pass | 1.8s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | .aem.page | pass | 5.7s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | .aem.page | skip (runner: passed) | 0.3s | TD-654-03 not seeded yet (QA-PT tonight); runner pass on expected 404 is not evidence |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | .aem.page | pass | 0.7s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | .aem.page | pass | 1.9s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page | .aem.page | fail | 7.3s | card 'QA190 PDF catalog' not on list: content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → download opens the PDF directly | .aem.page | fail | 9.0s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | .aem.page | blocked | 6.0s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed) |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form | .aem.page | fail | 13.7s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) (e-book; same mechanism, not named in job) |
| DSR-CATOV-018 | DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) | .aem.page | blocked | 14.9s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed) |
| DSR-CATOV-019 | DSR-CATOV-019 [en] catalog detail shows image, name, description, date and type label of the content CF | .aem.page | fail | 6.1s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) |
| DSR-CATOV-009 | DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live | .aem.page | fail | 0.2s | qa654-preview on .aem.page renders 'unavailable: not-found' (generic title); .aem.live 404 as expected |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | .aem.page | skip (runner: passed) | 0.5s | TD-654-05 not seeded yet (QA-PT tonight); runner pass on expected 404 is not evidence |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | .aem.page | pass | 0.1s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | .aem.page | pass | 3.7s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | fail | 7.0s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail | 0.6s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap | .aem.live | fail | 0.2s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | blocked | 5.7s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail | 0.6s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | .aem.live | fail | 0.2s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | fail | 7.9s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail | 0.4s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap | .aem.live | fail | 0.2s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | blocked | 8.7s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail | 1.0s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page) |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 1.4s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | .aem.live | fail | 1.1s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | .aem.live | pass | 1.4s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | .aem.live | pass | 5.8s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | .aem.live | pass | 2.4s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | .aem.live | pass | 4.7s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page | .aem.live | fail | 9.6s | card 'QA190 PDF catalog' not on list: content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → download opens the PDF directly | .aem.live | fail | 10.6s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | .aem.live | blocked | 7.5s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed) |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form | .aem.live | fail | 12.9s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) (e-book; same mechanism, not named in job) |
| DSR-CATOV-018 | DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) | .aem.live | blocked | 16.0s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed) |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] catalog detail shows image, name, description, date and type label of the content CF | .aem.live | fail | 6.1s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | fail | 5.9s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail | 0.5s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.2s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap | .aem.live | fail | 0.2s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | blocked | 7.1s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail | 0.8s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | .aem.live | fail | 0.2s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | fail | 9.0s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail | 1.1s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap | .aem.live | fail | 1.1s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | blocked | 9.4s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail | 0.9s | content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page) |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | .aem.live | fail | 1.1s | sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update) |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | .aem.live | pass | 1.2s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | .aem.live | pass | 5.5s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | .aem.live | skip (runner: passed) | 0.2s | TD-654-03 not seeded yet (QA-PT tonight); runner pass on expected 404 is not evidence |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | .aem.live | pass | 0.6s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | .aem.live | pass | 1.4s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page | .aem.live | fail | 7.5s | card 'QA190 PDF catalog' not on list: content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …' |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → download opens the PDF directly | .aem.live | fail | 8.9s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | .aem.live | blocked | 5.9s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed) |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form | .aem.live | fail | 11.1s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) (e-book; same mechanism, not named in job) |
| DSR-CATOV-018 | DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) | .aem.live | blocked | 12.0s | overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed) |
| DSR-CATOV-019 | DSR-CATOV-019 [en] catalog detail shows image, name, description, date and type label of the content CF | .aem.live | fail | 6.2s | test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) |
| DSR-CATOV-009 | DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live | .aem.live | fail | 0.2s | qa654-preview on .aem.page renders 'unavailable: not-found' (generic title); .aem.live 404 as expected |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | .aem.live | skip (runner: passed) | 0.4s | TD-654-05 not seeded yet (QA-PT tonight); runner pass on expected 404 is not evidence |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | .aem.live | pass | 0.1s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | .aem.live | pass | 3.9s | — |

## 5. Skipped tests

| TC ID | Host | Verbatim skip reason |
|---|---|---|
| DSR-CATOV-006 [ja] | .aem.page | TD-654-03 exists in en only (A7) |
| DSR-CATOV-020 [ja] | .aem.page | Visual – codex job |
| DSR-CATOV-020 [en] | .aem.page | Visual – codex job |
| DSR-CATOV-013 [en] | .aem.page | Manual – QA-PT |
| DSR-CATOV-001 [cn] | .aem.page | Issue #18: no /cn path on DEV |
| DSR-CATOV-006 [ja] | .aem.live | TD-654-03 exists in en only (A7) |
| DSR-CATOV-020 [ja] | .aem.live | Visual – codex job |
| DSR-CATOV-020 [en] | .aem.live | Visual – codex job |
| DSR-CATOV-013 [en] | .aem.live | Manual – QA-PT |
| DSR-CATOV-001 [cn] | .aem.live | Issue #18: no /cn path on DEV |

## 6. Failed tests

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:89`:
  - .aem.page (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 PDF catalog"; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 PDF catalog"; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-48f08-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-48f08-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:103`:
  - .aem.page (2 attempts, all failed): Error: <title>; Expected: "QA190 PDF catalog / YKK DIGITAL SHOWROOM"; Received: "qa190-cat-pdf / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 PDF catalog"; Received: "qa190-cat-pdf" ‖ Error: row requiresForm; Expected: "false"; Received: null
  - .aem.live (2 attempts, all failed): Error: <title>; Expected: "QA190 PDF catalog / YKK DIGITAL SHOWROOM"; Received: "qa190-cat-pdf / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 PDF catalog"; Received: "qa190-cat-pdf" ‖ Error: row requiresForm; Expected: "false"; Received: null
- Proposed: fail; suspect data; cause none; product-bug confidence 45% — content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:133`:
  - .aem.page (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
  - .aem.live (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
- Proposed: fail; suspect product; cause none; product-bug confidence 60% — sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:89`:
  - .aem.page (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 PDF form required"; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 PDF form required"; Error: element(s) not found
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo
- Evidence paths: none generated (request-only test)

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:103`:
  - .aem.page (2 attempts, all failed): Error: <title>; Expected: "QA190 PDF form required / YKK DIGITAL SHOWROOM"; Received: "catalog pdf form / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 PDF form required"; Received: "catalog pdf form" ‖ Error: row requiresForm; Expected: "true"; Received: null
  - .aem.live (2 attempts, all failed): Error: <title>; Expected: "QA190 PDF form required / YKK DIGITAL SHOWROOM"; Received: "catalog pdf form / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 PDF form required"; Received: "catalog pdf form" ‖ Error: row requiresForm; Expected: "true"; Received: null
- Proposed: fail; suspect data; cause none; product-bug confidence 40% — content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-645e6-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-645e6-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:133`:
  - .aem.page (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
  - .aem.live (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
- Proposed: fail; suspect product; cause none; product-bug confidence 60% — sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:89`:
  - .aem.page (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 e-book"; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 e-book"; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-908da-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-908da-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:103`:
  - .aem.page (2 attempts, all failed): Error: <title>; Expected: "QA190 e-book / YKK DIGITAL SHOWROOM"; Received: "catalog ebook / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 e-book"; Received: "catalog ebook" ‖ Error: row requiresForm; Expected: "false"; Received: null
  - .aem.live (2 attempts, all failed): Error: <title>; Expected: "QA190 e-book / YKK DIGITAL SHOWROOM"; Received: "catalog ebook / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 e-book"; Received: "catalog ebook" ‖ Error: row requiresForm; Expected: "false"; Received: null
- Proposed: fail; suspect data; cause none; product-bug confidence 45% — content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:133`:
  - .aem.page (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
  - .aem.live (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
- Proposed: fail; suspect product; cause none; product-bug confidence 60% — sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:89`:
  - .aem.page (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 e-book form"; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 e-book form"; Error: element(s) not found
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo
- Evidence paths: none generated (request-only test)

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:103`:
  - .aem.page (2 attempts, all failed): Error: <title>; Expected: "QA190 e-book form / YKK DIGITAL SHOWROOM"; Received: "catalog ebook form / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 e-book form"; Received: "catalog ebook form" ‖ Error: row requiresForm; Expected: "true"; Received: null
  - .aem.live (2 attempts, all failed): Error: <title>; Expected: "QA190 e-book form / YKK DIGITAL SHOWROOM"; Received: "catalog ebook form / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 e-book form"; Received: "catalog ebook form" ‖ Error: row requiresForm; Expected: "true"; Received: null
- Proposed: fail; suspect data; cause none; product-bug confidence 40% — content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-5c267-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-5c267-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:133`:
  - .aem.page (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
  - .aem.live (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
- Proposed: fail; suspect product; cause none; product-bug confidence 60% — sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-012 — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:210`:
  - .aem.page (2 attempts, all failed): Error: card 'QA190 PDF catalog'; Expected: visible; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: card 'QA190 PDF catalog'; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect data; cause none; product-bug confidence 0% — card 'QA190 PDF catalog' not on list: content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png`

### DSR-CATOV-015 — DSR-CATOV-015 [ja] PDF, requiresForm OFF → download opens the PDF directly

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:230`:
  - .aem.page (2 attempts, all failed): Error: download button; Expected: visible; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: download button; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-d9520-load-opens-the-PDF-directly-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-d9520-load-opens-the-PDF-directly-chromium-retry1/test-failed-1.png`

### DSR-CATOV-016 — DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:248`:
  - .aem.page (2 attempts, all failed): Error: catalog-detail block; Expected: visible; Received: hidden
  - .aem.live (2 attempts, all failed): Error: catalog-detail block; Expected: visible; Received: hidden
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-017 — DSR-CATOV-017 [ja] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:267`:
  - .aem.page (2 attempts, all failed): Error: view button; Expected: visible; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: view button; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) (e-book; same mechanism, not named in job)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-c164e-in-a-new-tab-without-a-form-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-c164e-in-a-new-tab-without-a-form-chromium-retry1/test-failed-1.png`

### DSR-CATOV-018 — DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl)

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:281`:
  - .aem.page (2 attempts, all failed): Error: view button; Expected: visible; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: view button; Expected: visible; Error: element(s) not found
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-019 — DSR-CATOV-019 [ja] catalog detail shows image, name, description, date and type label of the content CF

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:299`:
  - .aem.page (2 attempts, all failed): Error: catalog-detail block; Expected: visible; Received: hidden
  - .aem.live (2 attempts, all failed): Error: catalog-detail block; Expected: visible; Received: hidden
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-0fa3f-ype-label-of-the-content-CF-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-0fa3f-ype-label-of-the-content-CF-chromium-retry1/test-failed-1.png`

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:89`:
  - .aem.page (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 PDF catalog"; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 PDF catalog"; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-93ed3-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-93ed3-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:103`:
  - .aem.page (2 attempts, all failed): Error: <title>; Expected: "QA190 PDF catalog / YKK DIGITAL SHOWROOM"; Received: "catalog pdf / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 PDF catalog"; Received: "catalog pdf" ‖ Error: row requiresForm; Expected: "false"; Received: null
  - .aem.live (2 attempts, all failed): Error: <title>; Expected: "QA190 PDF catalog / YKK DIGITAL SHOWROOM"; Received: "catalog pdf / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 PDF catalog"; Received: "catalog pdf" ‖ Error: row requiresForm; Expected: "false"; Received: null
- Proposed: fail; suspect data; cause none; product-bug confidence 45% — content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:133`:
  - .aem.page (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
  - .aem.live (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
- Proposed: fail; suspect product; cause none; product-bug confidence 60% — sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:89`:
  - .aem.page (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 PDF form required"; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 PDF form required"; Error: element(s) not found
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo
- Evidence paths: none generated (request-only test)

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:103`:
  - .aem.page (2 attempts, all failed): Error: <title>; Expected: "QA190 PDF form required / YKK DIGITAL SHOWROOM"; Received: "catalog pdf form / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 PDF form required"; Received: "catalog pdf form" ‖ Error: row requiresForm; Expected: "true"; Received: null
  - .aem.live (2 attempts, all failed): Error: <title>; Expected: "QA190 PDF form required / YKK DIGITAL SHOWROOM"; Received: "catalog pdf form / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 PDF form required"; Received: "catalog pdf form" ‖ Error: row requiresForm; Expected: "true"; Received: null
- Proposed: fail; suspect data; cause none; product-bug confidence 40% — content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-598d3-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-598d3-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:133`:
  - .aem.page (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
  - .aem.live (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
- Proposed: fail; suspect product; cause none; product-bug confidence 60% — sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:89`:
  - .aem.page (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 e-book"; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 e-book"; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168); also content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-85ad0-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-85ad0-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:103`:
  - .aem.page (2 attempts, all failed): Error: <title>; Expected: "QA190 e-book / YKK DIGITAL SHOWROOM"; Received: "catalog ebook / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 e-book"; Received: "catalog ebook" ‖ Error: row requiresForm; Expected: "false"; Received: null
  - .aem.live (2 attempts, all failed): Error: <title>; Expected: "QA190 e-book / YKK DIGITAL SHOWROOM"; Received: "catalog ebook / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 e-book"; Received: "catalog ebook" ‖ Error: row requiresForm; Expected: "false"; Received: null
- Proposed: fail; suspect data; cause none; product-bug confidence 45% — content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:133`:
  - .aem.page (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
  - .aem.live (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
- Proposed: fail; suspect product; cause none; product-bug confidence 60% — sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:89`:
  - .aem.page (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 e-book form"; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: expect(locator).toHaveText(expected) failed; Expected: "QA190 e-book form"; Error: element(s) not found
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed); also content CF title is dev sample ('catalo
- Evidence paths: none generated (request-only test)

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:103`:
  - .aem.page (2 attempts, all failed): Error: <title>; Expected: "QA190 e-book form / YKK DIGITAL SHOWROOM"; Received: "catalog ebook form / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 e-book form"; Received: "catalog ebook form" ‖ Error: row requiresForm; Expected: "true"; Received: null
  - .aem.live (2 attempts, all failed): Error: <title>; Expected: "QA190 e-book form / YKK DIGITAL SHOWROOM"; Received: "catalog ebook form / YKK DIGITAL SHOWROOM" ‖ Error: og:image absolute URL; Expected pattern: /^https?:\/\//; Received string:  "about:error" ‖ Error: meta robots; Expected substring: not "noindex"; Received string:        "noindex" ‖ Error: row catalogTitle; Expected: "QA190 e-book form"; Received: "catalog ebook form" ‖ Error: row requiresForm; Expected: "true"; Received: null
- Proposed: fail; suspect data; cause none; product-bug confidence 40% — content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'; robots=noindex; og:image=about:error; requiresForm row missing (stale page)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-35ccf-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-35ccf-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:133`:
  - .aem.page (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
  - .aem.live (2 attempts, all failed): Error: sitemap <loc>; Expected length: 1; Received length: 0
- Proposed: fail; suspect product; cause none; product-bug confidence 60% — sitemap has 0 <loc> for the page (query-index 1 row); every catalog overlay page is noindex, even isActive=true (qa654-update)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-012 — DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:210`:
  - .aem.page (2 attempts, all failed): Error: card 'QA190 PDF catalog'; Expected: visible; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: card 'QA190 PDF catalog'; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect data; cause none; product-bug confidence 0% — card 'QA190 PDF catalog' not on list: content CF title is dev sample ('catalog pdf' …), not TD-190 'QA190 …'
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png`

### DSR-CATOV-015 — DSR-CATOV-015 [en] PDF, requiresForm OFF → download opens the PDF directly

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:230`:
  - .aem.page (2 attempts, all failed): Error: download button; Expected: visible; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: download button; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-ff7ef-load-opens-the-PDF-directly-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-ff7ef-load-opens-the-PDF-directly-chromium-retry1/test-failed-1.png`

### DSR-CATOV-016 — DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:248`:
  - .aem.page (2 attempts, all failed): Error: catalog-detail block; Expected: visible; Received: hidden
  - .aem.live (2 attempts, all failed): Error: catalog-detail block; Expected: visible; Received: hidden
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-017 — DSR-CATOV-017 [en] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:267`:
  - .aem.page (2 attempts, all failed): Error: view button; Expected: visible; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: view button; Expected: visible; Error: element(s) not found
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168) (e-book; same mechanism, not named in job)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-a8859-in-a-new-tab-without-a-form-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-a8859-in-a-new-tab-without-a-form-chromium-retry1/test-failed-1.png`

### DSR-CATOV-018 — DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl)

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:281`:
  - .aem.page (2 attempts, all failed): Error: view button; Expected: visible; Error: element(s) not found
  - .aem.live (2 attempts, all failed): Error: view button; Expected: visible; Error: element(s) not found
- Proposed: blocked; suspect data; cause none; product-bug confidence 0% — overlay page not regenerated after content CF requiresForm=true (no requiresForm row; DSR CF lastModified 21/10 14:1xZ; BL-OVL-1: republish DSR CF needed)
- Evidence paths: none generated (request-only test)

### DSR-CATOV-019 — DSR-CATOV-019 [en] catalog detail shows image, name, description, date and type label of the content CF

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:299`:
  - .aem.page (2 attempts, all failed): Error: catalog-detail block; Expected: visible; Received: hidden
  - .aem.live (2 attempts, all failed): Error: catalog-detail block; Expected: visible; Received: hidden
- Proposed: fail; suspect test; cause none; product-bug confidence 0% — test expectation to fix: non-form detail goes to the file by design (IDLE-32, catalog-detail.js:165-168)
- Evidence paths: `test-results/job10-654-page/catalog-overlay-DSR-654.ca-d4090-ype-label-of-the-content-CF-chromium-retry1/test-failed-1.png`, `test-results/job10-654-live/catalog-overlay-DSR-654.ca-d4090-ype-label-of-the-content-CF-chromium-retry1/test-failed-1.png`

### DSR-CATOV-009 — DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live

- Failing assertion — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:321`:
  - .aem.page (2 attempts, all failed): Error: 'QA654 preview' on .aem.page; Expected substring: "QA654 preview"; Received string:    "<!DOCTYPE html>
  - .aem.live (2 attempts, all failed): Error: 'QA654 preview' on .aem.page; Expected substring: "QA654 preview"; Received string:    "<!DOCTYPE html>
- Proposed: fail; suspect product; cause none; product-bug confidence 50% — qa654-preview on .aem.page renders 'unavailable: not-found' (generic title); .aem.live 404 as expected
- Evidence paths: none generated (request-only test)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; selected failure screenshots are copied to `ykk-dsr/hub/results/JOB-20261022-10/evidence/`.

## 7. Open points for QA

- Preflight: content CFs common/{ja,en}/catalogs/qa190-cat-pdf-form + -ebook-form have requiresForm=true (dm-catalog-list 06:12Z), but none of the 4 -form overlay pages has a requiresForm row (DSR CF cq:lastModified 2026-10-21T14:17–14:20Z). BL-OVL-1: a content CF change shows only after the DSR CF is republished; JOB-20261022-07 published the content CFs only. Proposed fix: Agent Author republishes dsr/{ja,en}/catalogs/qa190-cat-pdf-form and -ebook-form (preview + publish), then rerun.
- A code deploy at 06:19:14Z changed the catalog list query (dm-catalog-list → dsr-catalog-list;folder=/content/dam/dsr/{lang}/). Runs after it are on a different build than page run 1; build identity is not independently verified.
- Content CF titles/dates are dev samples (catalog pdf / qa190-cat-pdf ja, 2026-09-03), not TD-190 values.
- Not verified: Author-side state (no Author access in this lane); whether a republished -form page drops the pdfAsset row.
- Per job: non-form qa190-cat-pdf / -ebook detail pages go to the file / ebookUrl by design (IDLE-32) → CATOV-001/015/019 (and 017, same mechanism) are 'test expectation to fix', not product fails.
- CATOV-016/018 and CATOV-001 for -form ids are blocked (stale page). CATOV-002 for -form additionally misses the requiresForm row.
- Every catalog overlay page is robots=noindex, including qa654-update (isActive=true per JOB-07 plan), while the video overlay qa587-main is indexable → sitemap has 0 catalog <loc> (CATOV-021). og:image is 'about:error' (og:image:secure_url is fine). Proposed product at 60% – Claude decides.
- CATOV-009: qa654-preview on .aem.page renders 'unavailable: not-found' with the generic title; the DSR CF is preview-only, so the overlay may be looking it up on the publish tier. 50%, not verified.
- TD-654-03 / -05 not seeded (QA-PT tonight): CATOV-006 en and CATOV-010 passed in the runner (expected 404) but are reported as skip – a 404 cannot prove the seed.
- Breadcrumb current item on catalog detail shows the document title incl. ' | YKK DIGITAL SHOWROOM' (screenshot DSR-CATOV-019_ja_live.png) – DSR-552 side observation, not verified against the breadcrumb baseline.
