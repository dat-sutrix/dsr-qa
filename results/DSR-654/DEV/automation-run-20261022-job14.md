# DSR-654 DEV automation run — 20261022-job14

JOB-20261022-14 (test-expectation fixes found in JOB-20261022-10, rerun ja+en on .aem.page and .aem.live). Proposed outcomes only; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-22T07:59:45Z
- Run end (UTC): 2026-10-22T08:07:57Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /{ja,en}/library/catalog/{qa190-cat-pdf,-pdf-form,-ebook,-ebook-form}, TD-654-02..08 ids, /query-index.json, /sitemap.xml
- Build under test: not independently verified (no build ID exposed). No deploy observed during the run. Catalog list served by `dsr-catalog-list;folder=/content/dam/dsr/{lang}/catalogs/` (ja 6 / en 5 items, probe 07:4xZ).
- Baseline ID: DSR-654 TC sheet (CATOV, tc-out/DSR-654.spec.json) + BL-OVL-1 + IDLE-32; docs/DSR-654/assumptions.md
- Automation HEAD commit SHA: 28697db5eae8cae31dbe951080a45f5dc2fbb7b7 plus the uncommitted JOB-14 spec changes, which are committed together with this report
- Exact commands used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job14/run/654-page2.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --project=chromium --output=test-results/job14-654-page2
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job14/run/654-live.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts --project=chromium --output=test-results/job14-654-live
```

The .aem.page run reported here is `654-page2` (08:03:54–08:07:57Z). An earlier .aem.page run (`654-page`, 07:52–07:57Z: 36 pass / 19 fail / 7 skip) used the first version of the redirect helper. That version asserted the last navigation, so the external ykkfastening.com → ykkdigitalshowroom.com hop failed CATOV-001 (qa190-cat-ebook) and CATOV-017 in ja and en. The helper now asserts the first navigation after the detail URL (docs/DSR-654/assumptions.md), and the .aem.live run already used the fixed version. All other outcomes of the first run match `654-page2`.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before the reruns and again after the redirect-helper fix)

## 3. Suite summary

| Tier | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| .aem.page | 62 | 40 | 15 | 7 | 1 (inferred – see note) | 2 | 1 configured; each failed test retried once and failed again | 4m02s |
| .aem.live | 62 | 40 | 15 | 7 | 1 | 2 | 1 configured; each failed test retried once and failed again | 3m58s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: one spec file, chromium project only. Flaky outcomes: 0.
Note: the wrapper for `654-page2` logged `rc=0`, but a `$(date)` substitution in the same echo reset `$?`. Playwright exits 1 when any test fails, so the real exit code is 1 (the log shows "15 failed").

## 4. Executed tests

Duration = sum of all attempts. Result = proposed.

| TC ID | Title | Tier | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | .aem.page | pass | 4.4s | — |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail (retry: failed/failed) | 1.0s | non-form page: meta robots=noindex; requiresForm row absent (TC expects "false"); title/og:image OK |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap | .aem.page | fail (retry: failed/failed) | 0.4s | non-form page in query-index but not in sitemap (consistent with its robots=noindex) |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | fail (retry: failed/failed) | 11.9s | title = content CF dev sample (e.g. "catalog pdf form"), TD-190 "QA190 …" not seeded; page + form OK |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | pass | 0.5s | — |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | .aem.page | pass | 0.1s | — |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | .aem.page | pass | 5.8s | — |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail (retry: failed/failed) | 0.8s | non-form page: meta robots=noindex; requiresForm row absent (TC expects "false"); title/og:image OK |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap | .aem.page | fail (retry: failed/failed) | 0.3s | non-form page in query-index but not in sitemap (consistent with its robots=noindex) |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | fail (retry: failed/failed) | 11.6s | title = content CF dev sample (e.g. "catalog pdf form"), TD-190 "QA190 …" not seeded; page + form OK |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | pass | 0.4s | — |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | .aem.page | pass | 0.1s | — |
| DSR-CATOV-004 | DSR-654 catalog detail overlay > DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | .aem.page | pass | 0.8s | — |
| DSR-CATOV-005 | DSR-654 catalog detail overlay > DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | .aem.page | pass | 4.1s | — |
| DSR-CATOV-007 | DSR-654 catalog detail overlay > DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | .aem.page | pass | 0.9s | — |
| DSR-CATOV-008 | DSR-654 catalog detail overlay > DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | .aem.page | pass | 2.4s | — |
| DSR-CATOV-012 | DSR-654 catalog detail overlay > DSR-CATOV-012 [ja] catalog list card links to the overlay page | .aem.page | fail (retry: failed/failed) | 14.1s | no card titled TD-190 'QA190 PDF catalog' (dev sample titles); pdf card links to the PDF by design (IDLE-32) – TC outside JOB-14 scope |
| DSR-CATOV-015 | DSR-654 catalog detail overlay > DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | .aem.page | pass | 5.3s | — |
| DSR-CATOV-016 | DSR-654 catalog detail overlay > DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | .aem.page | pass | 1.8s | — |
| DSR-CATOV-017 | DSR-654 catalog detail overlay > DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | .aem.page | pass | 6.5s | — |
| DSR-CATOV-019 | DSR-654 catalog detail overlay > DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | .aem.page | pass | 4.6s | — |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | .aem.page | pass | 4.1s | — |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail (retry: failed/failed) | 1.1s | non-form page: meta robots=noindex; requiresForm row absent (TC expects "false"); title/og:image OK |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 0.2s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap | .aem.page | fail (retry: failed/failed) | 0.4s | non-form page in query-index but not in sitemap (consistent with its robots=noindex) |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | fail (retry: failed/failed) | 12.4s | title = content CF dev sample (e.g. "catalog pdf form"), TD-190 "QA190 …" not seeded; page + form OK |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | pass | 1.5s | — |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | .aem.page | pass | 1.2s | — |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | .aem.page | pass | 10.3s | — |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | fail (retry: failed/failed) | 2.2s | non-form page: meta robots=noindex; requiresForm row absent (TC expects "false"); title/og:image OK |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.3s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap | .aem.page | fail (retry: failed/failed) | 2.3s | non-form page in query-index but not in sitemap (consistent with its robots=noindex) |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.page | fail (retry: failed/failed) | 14.6s | title = content CF dev sample (e.g. "catalog pdf form"), TD-190 "QA190 …" not seeded; page + form OK |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.page | pass | 1.2s | — |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | .aem.page | pass | 1.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | .aem.page | pass | 1.0s | — |
| DSR-CATOV-004 | DSR-654 catalog detail overlay > DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | .aem.page | pass | 1.4s | — |
| DSR-CATOV-005 | DSR-654 catalog detail overlay > DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | .aem.page | pass | 5.7s | — |
| DSR-CATOV-006 | DSR-654 catalog detail overlay > DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | .aem.page | pass | 1.4s | — |
| DSR-CATOV-007 | DSR-654 catalog detail overlay > DSR-CATOV-007 [en] catalog/search is not taken by the overlay | .aem.page | pass | 2.8s | — |
| DSR-CATOV-008 | DSR-654 catalog detail overlay > DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | .aem.page | pass | 5.5s | — |
| DSR-CATOV-012 | DSR-654 catalog detail overlay > DSR-CATOV-012 [en] catalog list card links to the overlay page | .aem.page | fail (retry: failed/failed) | 18.2s | no card titled TD-190 'QA190 PDF catalog' (dev sample titles); pdf card links to the PDF by design (IDLE-32) – TC outside JOB-14 scope |
| DSR-CATOV-015 | DSR-654 catalog detail overlay > DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | .aem.page | pass | 4.7s | — |
| DSR-CATOV-016 | DSR-654 catalog detail overlay > DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | .aem.page | pass | 1.5s | — |
| DSR-CATOV-017 | DSR-654 catalog detail overlay > DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | .aem.page | pass | 5.8s | — |
| DSR-CATOV-019 | DSR-654 catalog detail overlay > DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | .aem.page | pass | 3.7s | — |
| DSR-CATOV-009 | DSR-654 catalog detail overlay > DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live | .aem.page | fail (retry: failed/failed) | 0.2s | qa654-preview on .aem.page has no 'QA654 preview' (same as JOB-10) |
| DSR-CATOV-010 | DSR-654 catalog detail overlay > DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | .aem.page | pass | 0.2s | — |
| DSR-CATOV-011 | DSR-654 catalog detail overlay > DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | .aem.page | pass | 0.1s | — |
| DSR-CATOV-014 | DSR-654 catalog detail overlay > DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | .aem.page | pass | 3.7s | — |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | .aem.live | pass | 5.9s | — |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail (retry: failed/failed) | 2.2s | non-form page: meta robots=noindex; requiresForm row absent (TC expects "false"); title/og:image OK |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 1.3s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap | .aem.live | fail (retry: failed/failed) | 2.8s | non-form page in query-index but not in sitemap (consistent with its robots=noindex) |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | fail (retry: failed/failed) | 15.7s | title = content CF dev sample (e.g. "catalog pdf form"), TD-190 "QA190 …" not seeded; page + form OK |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | pass | 1.1s | — |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | .aem.live | pass | 1.2s | — |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | .aem.live | pass | 8.9s | — |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail (retry: failed/failed) | 2.1s | non-form page: meta robots=noindex; requiresForm row absent (TC expects "false"); title/og:image OK |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 1.2s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap | .aem.live | fail (retry: failed/failed) | 2.1s | non-form page in query-index but not in sitemap (consistent with its robots=noindex) |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | fail (retry: failed/failed) | 14.9s | title = content CF dev sample (e.g. "catalog pdf form"), TD-190 "QA190 …" not seeded; page + form OK |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | pass | 0.7s | — |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | .aem.live | pass | 0.1s | — |
| DSR-CATOV-004 | DSR-654 catalog detail overlay > DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | .aem.live | pass | 0.1s | — |
| DSR-CATOV-005 | DSR-654 catalog detail overlay > DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | .aem.live | pass | 4.5s | — |
| DSR-CATOV-007 | DSR-654 catalog detail overlay > DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | .aem.live | pass | 1.4s | — |
| DSR-CATOV-008 | DSR-654 catalog detail overlay > DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | .aem.live | pass | 2.0s | — |
| DSR-CATOV-012 | DSR-654 catalog detail overlay > DSR-CATOV-012 [ja] catalog list card links to the overlay page | .aem.live | fail (retry: failed/failed) | 14.0s | no card titled TD-190 'QA190 PDF catalog' (dev sample titles); pdf card links to the PDF by design (IDLE-32) – TC outside JOB-14 scope |
| DSR-CATOV-015 | DSR-654 catalog detail overlay > DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | .aem.live | pass | 4.8s | — |
| DSR-CATOV-016 | DSR-654 catalog detail overlay > DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | .aem.live | pass | 2.5s | — |
| DSR-CATOV-017 | DSR-654 catalog detail overlay > DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | .aem.live | pass | 7.9s | — |
| DSR-CATOV-019 | DSR-654 catalog detail overlay > DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | .aem.live | pass | 3.7s | — |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | .aem.live | pass | 3.9s | — |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail (retry: failed/failed) | 1.1s | non-form page: meta robots=noindex; requiresForm row absent (TC expects "false"); title/og:image OK |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap | .aem.live | fail (retry: failed/failed) | 0.4s | non-form page in query-index but not in sitemap (consistent with its robots=noindex) |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | fail (retry: failed/failed) | 12.0s | title = content CF dev sample (e.g. "catalog pdf form"), TD-190 "QA190 …" not seeded; page + form OK |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | pass | 0.5s | — |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | .aem.live | pass | 0.1s | — |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | .aem.live | pass | 5.9s | — |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | fail (retry: failed/failed) | 0.9s | non-form page: meta robots=noindex; requiresForm row absent (TC expects "false"); title/og:image OK |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap | .aem.live | fail (retry: failed/failed) | 0.3s | non-form page in query-index but not in sitemap (consistent with its robots=noindex) |
| DSR-CATOV-001 | DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | .aem.live | fail (retry: failed/failed) | 11.6s | title = content CF dev sample (e.g. "catalog pdf form"), TD-190 "QA190 …" not seeded; page + form OK |
| DSR-CATOV-002 | DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | .aem.live | pass | 0.8s | — |
| DSR-CATOV-003 | DSR-654 catalog detail overlay > DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | .aem.live | pass | 0.1s | — |
| DSR-CATOV-021 | DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | .aem.live | pass | 0.2s | — |
| DSR-CATOV-004 | DSR-654 catalog detail overlay > DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | .aem.live | pass | 0.8s | — |
| DSR-CATOV-005 | DSR-654 catalog detail overlay > DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | .aem.live | pass | 4.2s | — |
| DSR-CATOV-006 | DSR-654 catalog detail overlay > DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | .aem.live | pass | 0.1s | — |
| DSR-CATOV-007 | DSR-654 catalog detail overlay > DSR-CATOV-007 [en] catalog/search is not taken by the overlay | .aem.live | pass | 0.6s | — |
| DSR-CATOV-008 | DSR-654 catalog detail overlay > DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | .aem.live | pass | 1.8s | — |
| DSR-CATOV-012 | DSR-654 catalog detail overlay > DSR-CATOV-012 [en] catalog list card links to the overlay page | .aem.live | fail (retry: failed/failed) | 15.2s | no card titled TD-190 'QA190 PDF catalog' (dev sample titles); pdf card links to the PDF by design (IDLE-32) – TC outside JOB-14 scope |
| DSR-CATOV-015 | DSR-654 catalog detail overlay > DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | .aem.live | pass | 4.0s | — |
| DSR-CATOV-016 | DSR-654 catalog detail overlay > DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | .aem.live | pass | 1.2s | — |
| DSR-CATOV-017 | DSR-654 catalog detail overlay > DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | .aem.live | pass | 5.8s | — |
| DSR-CATOV-019 | DSR-654 catalog detail overlay > DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | .aem.live | pass | 3.7s | — |
| DSR-CATOV-009 | DSR-654 catalog detail overlay > DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live | .aem.live | fail (retry: failed/failed) | 0.3s | qa654-preview on .aem.page has no 'QA654 preview' (same as JOB-10) |
| DSR-CATOV-010 | DSR-654 catalog detail overlay > DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | .aem.live | pass | 0.2s | — |
| DSR-CATOV-011 | DSR-654 catalog detail overlay > DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | .aem.live | pass | 0.1s | — |
| DSR-CATOV-014 | DSR-654 catalog detail overlay > DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | .aem.live | pass | 4.1s | — |

## 5. Skipped tests

| TC ID | Tier | Verbatim skip reason |
|---|---|---|
| DSR-CATOV-006 [ja] | .aem.page | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 [ja] | .aem.page | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 [ja] | .aem.page | Visual – codex job |
| DSR-CATOV-018 [en] | .aem.page | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 [en] | .aem.page | Visual – codex job |
| DSR-CATOV-013 [en] | .aem.page | Manual – QA-PT |
| DSR-CATOV-001 [cn] | .aem.page | Issue #18: no /cn path on DEV |
| DSR-CATOV-006 [ja] | .aem.live | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 [ja] | .aem.live | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 [ja] | .aem.live | Visual – codex job |
| DSR-CATOV-018 [en] | .aem.live | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 [en] | .aem.live | Visual – codex job |
| DSR-CATOV-013 [en] | .aem.live | Manual – QA-PT |
| DSR-CATOV-001 [cn] | .aem.live | Issue #18: no /cn path on DEV |

## 6. Failed tests

### DSR-CATOV-002 — DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion(s): `meta robots`; `row requiresForm` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:157`
- Expected: robots without noindex and row requiresForm = "false". Actual: `robots=noindex`, no requiresForm row (false is omitted). `<title>` = live content CF title + suffix (rule 4) passes; og:image is now an absolute URL (JOB-10 saw `about:error`). The -form pages pass this TC: no noindex, row present.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 40%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-002_ja_qa190-cat-pdf_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-002_ja_qa190-cat-pdf_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-021 — DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap

- Failing assertion(s): `sitemap <loc>` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:201`
- Expected: 1 sitemap `<loc>`. Actual: 0. query-index row = 1. Only the non-form ids fail, which is consistent with their `robots=noindex`.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 40%
- Evidence paths: no screenshot (API-only test); observed JSON attachment in the Playwright JSON report; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-001 — DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion(s): `expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:139`
- Expected: `.catalog-detail-title` = TD-190 title (e.g. "QA190 PDF form required"). Actual: content CF dev-sample title (e.g. "catalog pdf form"). HTTP 200, no redirect, form count 1. Rule 4 of the job covers only CATOV-002, so the expectation is unchanged.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `data` · cause `none` · confidence 0%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-001_ja_qa190-cat-pdf-form_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-001_ja_qa190-cat-pdf-form_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-002 — DSR-654 catalog detail overlay > DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion(s): `meta robots`; `row requiresForm` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:157`
- Expected: robots without noindex and row requiresForm = "false". Actual: `robots=noindex`, no requiresForm row (false is omitted). `<title>` = live content CF title + suffix (rule 4) passes; og:image is now an absolute URL (JOB-10 saw `about:error`). The -form pages pass this TC: no noindex, row present.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 40%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-002_ja_qa190-cat-ebook_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-002_ja_qa190-cat-ebook_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-021 — DSR-654 catalog detail overlay > DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap

- Failing assertion(s): `sitemap <loc>` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:201`
- Expected: 1 sitemap `<loc>`. Actual: 0. query-index row = 1. Only the non-form ids fail, which is consistent with their `robots=noindex`.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 40%
- Evidence paths: no screenshot (API-only test); observed JSON attachment in the Playwright JSON report; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-001 — DSR-654 catalog detail overlay > DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion(s): `expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:139`
- Expected: `.catalog-detail-title` = TD-190 title (e.g. "QA190 PDF form required"). Actual: content CF dev-sample title (e.g. "catalog pdf form"). HTTP 200, no redirect, form count 1. Rule 4 of the job covers only CATOV-002, so the expectation is unchanged.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `data` · cause `none` · confidence 0%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-001_ja_qa190-cat-ebook-form_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-001_ja_qa190-cat-ebook-form_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-012 — DSR-654 catalog detail overlay > DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion(s): `card 'QA190 PDF catalog'` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:264`
- Expected: card titled 'QA190 PDF catalog' that links to /{lang}/library/catalog/qa190-cat-pdf. Actual: no such card; the list shows dev sample titles, and the qa190-cat-pdf card links straight to the PDF (IDLE-32 by design). This TC is outside JOB-14 scope, so the expectation is unchanged.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `test` · cause `none` · confidence 0%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-012_ja_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-012_ja_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-002 — DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion(s): `meta robots`; `row requiresForm` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:157`
- Expected: robots without noindex and row requiresForm = "false". Actual: `robots=noindex`, no requiresForm row (false is omitted). `<title>` = live content CF title + suffix (rule 4) passes; og:image is now an absolute URL (JOB-10 saw `about:error`). The -form pages pass this TC: no noindex, row present.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 40%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-002_en_qa190-cat-pdf_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-002_en_qa190-cat-pdf_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-021 — DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap

- Failing assertion(s): `sitemap <loc>` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:201`
- Expected: 1 sitemap `<loc>`. Actual: 0. query-index row = 1. Only the non-form ids fail, which is consistent with their `robots=noindex`.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 40%
- Evidence paths: no screenshot (API-only test); observed JSON attachment in the Playwright JSON report; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-001 — DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion(s): `expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:139`
- Expected: `.catalog-detail-title` = TD-190 title (e.g. "QA190 PDF form required"). Actual: content CF dev-sample title (e.g. "catalog pdf form"). HTTP 200, no redirect, form count 1. Rule 4 of the job covers only CATOV-002, so the expectation is unchanged.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `data` · cause `none` · confidence 0%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-001_en_qa190-cat-pdf-form_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-001_en_qa190-cat-pdf-form_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-002 — DSR-654 catalog detail overlay > DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion(s): `meta robots`; `row requiresForm` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:157`
- Expected: robots without noindex and row requiresForm = "false". Actual: `robots=noindex`, no requiresForm row (false is omitted). `<title>` = live content CF title + suffix (rule 4) passes; og:image is now an absolute URL (JOB-10 saw `about:error`). The -form pages pass this TC: no noindex, row present.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 40%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-002_en_qa190-cat-ebook_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-002_en_qa190-cat-ebook_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-021 — DSR-654 catalog detail overlay > DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap

- Failing assertion(s): `sitemap <loc>` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:201`
- Expected: 1 sitemap `<loc>`. Actual: 0. query-index row = 1. Only the non-form ids fail, which is consistent with their `robots=noindex`.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 40%
- Evidence paths: no screenshot (API-only test); observed JSON attachment in the Playwright JSON report; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-001 — DSR-654 catalog detail overlay > DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion(s): `expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:139`
- Expected: `.catalog-detail-title` = TD-190 title (e.g. "QA190 PDF form required"). Actual: content CF dev-sample title (e.g. "catalog pdf form"). HTTP 200, no redirect, form count 1. Rule 4 of the job covers only CATOV-002, so the expectation is unchanged.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `data` · cause `none` · confidence 0%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-001_en_qa190-cat-ebook-form_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-001_en_qa190-cat-ebook-form_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-012 — DSR-654 catalog detail overlay > DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion(s): `card 'QA190 PDF catalog'` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:264`
- Expected: card titled 'QA190 PDF catalog' that links to /{lang}/library/catalog/qa190-cat-pdf. Actual: no such card; the list shows dev sample titles, and the qa190-cat-pdf card links straight to the PDF (IDLE-32 by design). This TC is outside JOB-14 scope, so the expectation is unchanged.
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `test` · cause `none` · confidence 0%
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-012_en_page.png`, `ykk-dsr/hub/results/JOB-20261022-14/evidence/DSR-CATOV-012_en_live.png`; trace/raw under `test-results/job14-*` (gitignored, not committed)

### DSR-CATOV-009 — DSR-654 catalog detail overlay > DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live

- Failing assertion(s): `'QA654 preview' on .aem.page` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:347`
- Expected: 'QA654 preview' in .aem.page HTML of qa654-preview. Actual: not present (same as JOB-10, `unavailable: not-found`).
- Tiers: .aem.page, .aem.live; attempts failed/failed on each.
- Proposed: fail · suspect `product` · cause `none` · confidence 50%
- Evidence paths: no screenshot (API-only test); observed JSON attachment in the Playwright JSON report; trace/raw under `test-results/job14-*` (gitignored, not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Rule 1 TCs pass on both tiers (CATOV-001 pdf/ebook, 015, 017, 019). The PDF redirect is proven by the navigation request, because headless Chromium downloads the PDF. The e-book redirect is proven by the first navigation, and the external site redirects on to ykkdigitalshowroom.com (recorded only).
- CATOV-002/021 non-form: `robots=noindex` and no sitemap entry only on non-form pages. The -form pages are indexable. This may be by design because those pages redirect to the file, so confidence drops to 40% (JOB-10: 60%). Claude to decide. The missing `requiresForm` row when false could equally be a TC expectation issue.
- CATOV-001 -form ids still expect the TD-190 title (the job’s rule 4 names only CATOV-002) → fail as data until the content CFs carry the TD-190 titles.
- CATOV-012 (card title TD-190 + card → overlay page for a non-form PDF) and CATOV-018 (Y3 answered → now pending-skip because a form is shown) need an expectation update. Both were outside JOB-14 scope.
- CATOV-009 unchanged from JOB-10 (product, 50%).
- Read-only: no form submitted, no AEM content changed.
