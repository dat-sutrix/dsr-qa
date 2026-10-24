# DSR-671 DEV automation run — 20261024-tc170

Job: `ykk-dsr/hub/jobs/running/JOB-20261024-06.md`, TC **DSR-671 17.0**: run the DSR-586, DSR-654, DSR-587 specs on DEV and compare with `ykk-dsr/hub/results/REGRESSION/ledger.json` (0 NEW FAIL expected). Main run: [automation-run-20261024.md](automation-run-20261024.md).

## 1. Header

- Run start (UTC): 2026-10-24T04:18:51Z
- Run end (UTC): 2026-10-24T04:23:35Z
- Environment + base URL: DEV — `https://main--dsr-eds-dev--sutrix-projects.aem.live`
- Target page(s): overlay product / catalog / video pages and lists used by the 5 spec files below (ja, en; cn = fixme/skip)
- Build under test: not independently verified. Last-Modified on .aem.live: `product-detail.js` / `video-detail.js` Fri, 23 Oct 2026 07:15:23 GMT, `catalog-detail.js` Thu, 22 Oct 2026 01:48:45 GMT (same as JOB-20261024-01).
- Baseline ID: BL-671-1 (17.0); per-spec baselines unchanged (BL-OVL-1 for overlay)
- Automation HEAD commit SHA: `16f080d0c82ed9c7fdb9a3247bfa644b4d473c07` (no change to these specs)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j06/run2/results.json npm run test:dev -- tests/product-detail/DSR-586.product-detail.spec.ts tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts tests/movie-detail/DSR-587.movie-overlay.spec.ts tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts tests/movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (same working tree as the main run)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 118 | 85 | 6 | 27 | 1 | 2 | configured 1; 6 actual (all 6 failed tests failed again on retry) | 4.7 min (282 s) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (5 spec files); chromium. Flaky outcomes: 0.

**Ledger comparison (17.0):** 88 ledger keys (`<TC> [<lang>]`, retest specs as `<TC> (retest-<ticket>)` / `DSR-538-retest`). **NEW FAIL (ledger pass → now fail): 0.** Failing keys DSR-CATOV-001 [ja]/[en] and DSR-CATOV-012 [ja]/[en] are already `fail` in the ledger (JOB-ZZ-IDLE-44, known data). 5 keys not in the ledger, all skip now: DSR-CATOV-001 [cn], DSR-PDO-014 [cn], DSR-VOV-009 [en], DSR-VOV-011 [cn], DSR-VOV-018 [cn]. No other status changes. Ledger **not updated** (non-regression job, hub/AGENTS.md §2).

## 4. Executed tests

Duration = summed over attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | Pass (proposed) | 6.1 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 3.5 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | Pass (proposed) | 1.2 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap | Pass (proposed) | 1.3 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | Fail (proposed) | 14.4 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 1.0 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | Pass (proposed) | 1.2 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | Pass (proposed) | 1.3 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | Pass (proposed) | 9.1 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 0.9 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | Pass (proposed) | 1.2 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap | Pass (proposed) | 1.3 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | Fail (proposed) | 14.3 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 0.8 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | Pass (proposed) | 0.1 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | Pass (proposed) | 0.7 s (1 attempt) | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | Pass (proposed) | 0.1 s (1 attempt) | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | Pass (proposed) | 6.0 s (1 attempt) | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | Pass (proposed) | 1.5 s (1 attempt) | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | Pass (proposed) | 3.5 s (1 attempt) | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page | Fail (proposed) | 19.3 s (2 attempts) | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | Pass (proposed) | 4.6 s (1 attempt) | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | Pass (proposed) | 2.8 s (1 attempt) | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | Pass (proposed) | 7.9 s (1 attempt) | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | Pass (proposed) | 3.8 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | Pass (proposed) | 6.1 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 1.0 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | Pass (proposed) | 1.5 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap | Pass (proposed) | 1.3 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | Fail (proposed) | 14.4 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 1.1 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | Pass (proposed) | 1.2 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | Pass (proposed) | 1.5 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | Pass (proposed) | 8.0 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 1.0 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | Pass (proposed) | 1.1 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap | Pass (proposed) | 1.3 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | Fail (proposed) | 14.4 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | Pass (proposed) | 1.4 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | Pass (proposed) | 1.3 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | Pass (proposed) | 1.5 s (1 attempt) | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | Pass (proposed) | 1.2 s (1 attempt) | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | Pass (proposed) | 5.8 s (1 attempt) | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | Pass (proposed) | 1.4 s (1 attempt) | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | Pass (proposed) | 2.3 s (1 attempt) | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | Pass (proposed) | 5.1 s (1 attempt) | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page | Fail (proposed) | 24.4 s (2 attempts) | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | Pass (proposed) | 6.1 s (1 attempt) | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | Pass (proposed) | 5.0 s (1 attempt) | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | Pass (proposed) | 9.1 s (1 attempt) | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | Pass (proposed) | 6.2 s (1 attempt) | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | Pass (proposed) | 1.4 s (1 attempt) | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | Pass (proposed) | 6.5 s (1 attempt) | — |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | Pass (proposed) | 1.2 s (1 attempt) | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | Pass (proposed) | 5.6 s (1 attempt) | — |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | Pass (proposed) | 4.0 s (1 attempt) | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | Pass (proposed) | 5.5 s (1 attempt) | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | Pass (proposed) | 1.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | Pass (proposed) | 7.1 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | Pass (proposed) | 7.8 s (1 attempt) | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | Pass (proposed) | 5.8 s (1 attempt) | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | Pass (proposed) | 5.5 s (1 attempt) | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list | Pass (proposed) | 5.7 s (1 attempt) | — |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | Pass (proposed) | 3.6 s (1 attempt) | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | Pass (proposed) | 3.9 s (1 attempt) | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only | Pass (proposed) | 4.8 s (1 attempt) | — |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked | Pass (proposed) | 3.3 s (1 attempt) | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | Pass (proposed) | 1.6 s (1 attempt) | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title | Pass (proposed) | 0.9 s (1 attempt) | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title | Pass (proposed) | 1.3 s (1 attempt) | — |
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first | Pass (proposed) | 5.8 s (1 attempt) | — |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | Pass (proposed) | 4.9 s (1 attempt) | — |
| DSR-538 | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | Pass (proposed) | 2.5 s (1 attempt) | — |
| DSR-538 | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | Pass (proposed) | 2.2 s (1 attempt) | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | Pass (proposed) | 4.1 s (1 attempt) | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | Pass (proposed) | 2.1 s (1 attempt) | — |
| DSR-PDO-002 | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | Pass (proposed) | 0.5 s (1 attempt) | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | Pass (proposed) | 1.0 s (1 attempt) | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | Pass (proposed) | 0.5 s (1 attempt) | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | Pass (proposed) | 4.6 s (1 attempt) | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page | Pass (proposed) | 6.1 s (1 attempt) | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | Pass (proposed) | 6.2 s (1 attempt) | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | Pass (proposed) | 6.2 s (1 attempt) | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | Pass (proposed) | 2.1 s (1 attempt) | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | Pass (proposed) | 7.9 s (1 attempt) | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | Pass (proposed) | 6.8 s (1 attempt) | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | Pass (proposed) | 5.3 s (1 attempt) | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | Pass (proposed) | 5.5 s (1 attempt) | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent | Pass (proposed) | 6.2 s (1 attempt) | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images | Pass (proposed) | 8.6 s (1 attempt) | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | Pass (proposed) | 5.3 s (1 attempt) | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATOV-006 [ja] | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 [ja] | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 [ja] | Visual – codex job |
| DSR-CATOV-018 [en] | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 [en] | Visual – codex job |
| DSR-CATOV-013 [en] | Manual – QA-PT |
| DSR-CATOV-001 [cn] | Issue #18: no /cn path on DEV |
| DSR-VOV-004 [en] | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 [en] | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 [en] | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-009 [en] | Manual TC: Author edit + publish of CF commune / CF related; agents are read-only (A6) – QA-PT |
| DSR-VOV-010 [en] | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 [ja] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 [cn] | Issue #18: no /cn path on DEV |
| DSR-VOV-016 [en] | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 [en] | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-VOV-018 [cn] | Issue #18: no /cn path on DEV |
| DSR-538 [en] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [ja] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [en] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [ja] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-PDO-006 [ja] | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 [ja] | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 [ja] | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-014 [cn] | test.fixme (no runtime reason; title: "DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issue #18)") |
| DSR-PDO-020 [ja] | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |

## 6. Failed tests

All 6 are known (already `fail` in the ledger, not NEW FAIL). Raw details as recorded in JOB-ZZ-IDLE-44; not re-analysed beyond the first error line.

### DSR-CATOV-001 — [ja]/[en] qa190-cat-pdf-form and qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (4 tests)

- Failing assertion: `expect(locator).toHaveText(expected)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:129` (test declaration line)
- Expected: catalog name of the TD (QA title) shown on the detail page.
- Actual: the `-form` CF titles are dev samples ("catalog pdf form" / "catalog ebook form") – known data issue (ledger note, confidence 0%, suspect data).
- Attempt(s): failed on attempt 1 and retry 1.
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png` (+ ebook-form folders).

### DSR-CATOV-012 — [ja]/[en] catalog list card links to the overlay page (2 tests)

- Failing assertion: `card 'QA190 PDF catalog'` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:268` (test declaration line)
- Expected: list card titled "QA190 PDF catalog" links to the overlay page.
- Actual: no card with that title (TD-190 title not seeded; qa190-cat-pdf title is "catalog pdf") – known data issue.
- Attempt(s): failed on attempt 1 and retry 1.
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png`.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Proposed 17.0 = **Pass** (0 NEW FAIL). Comparison is per ledger key; a key is `fail` if any of its sub-tests fails.
- The run covers only the 5 DSR-586/654/587 spec files on chromium (no @overlay-seo, list or 570 specs); @manual/@blocked tests were included and skipped as before.
- 671-specific data (TD-671-01/02) does not exist yet, so these suites do not yet exercise the "inactive related item hidden" behaviour (DSR-671 14.0–16.0).
