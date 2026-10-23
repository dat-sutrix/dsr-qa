# DSR-669 DEV automation run — 20261023

Pre-deploy `@overlay` reference run for the DSR-669/670/671 regression (JOB-20261023-07). Outcomes are proposals; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-23T03:03:12Z
- Run end (UTC): 2026-10-23T03:09:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` tier derived by the specs)
- Target page(s): overlay pages `/{ja,en}/library/video/*`, `/{ja,en}/products/*`, `/{ja,en}/library/catalog/*`, catalog list / download pages, `/master/{ja,en}/test-space/article-list`, publish persisted queries (`dsr-product-*`, `dsr-catalog-list`, `dsr-video-page`)
- Build under test: not independently verified (DSR-669/670/671 **not deployed yet**; the Author model check at 03:00Z still showed `DM_*_related` only, `ykk-dsr/hub/results/JOB-20261023-07/models-live.md`)
- Baseline ID: BL-OVL-1 (+ Update 2026-10-21), DSR-529 BL-v1 (A16)
- Automation HEAD commit SHA: 521a69353dfd6d0b04f357d9279bb3a30966ea05 **plus the uncommitted working-tree changes of JOB-20261023-07** (committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j07-overlay.json npm run test:dev:overlay -- --reporter=list,json
# = ENV=dev playwright test --grep @overlay --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before and after the test run)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 257 | 189 | 20 | 48 | 1 | 2 | configured 1; every failed test was retried once and failed again | 6.3 min |

Counts are unique tests. Scope: subset `@overlay` (10 spec files), project chromium. Flaky: 0.
Of the 20 failures, 8 (CATOV-002/021 non-form) are proposed **Pending**, not Fail (BUG-CAT-NOINDEX by-design candidate, docs/DSR-654/assumptions.md). All 20 were already known from earlier jobs; none is caused by this job's code changes.

## 4. Executed tests

Duration = sum of attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | pass | 5.5 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | pass | 4.4 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | pass | 5.1 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | pass | 5.5 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | pass | 6.5 s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders | pass | 5.0 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present | pass | 5.2 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | pass | 4.6 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | pass | 5.4 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form | pass | 5.8 s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | pass | 4.1 s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | fail | 17.9 s | gated PDF URL reaches the browser before submit (known 70%, JOB-23-04) |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | pass | 5.7 s | — |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | fail | 8.8 s | en form renders Japanese texts (known 70%) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 5.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | fail (proposed Pending) | 1.8 s | Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 1.5 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap | fail (proposed Pending) | 2.5 s | Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 14.7 s | -form page title = content CF dev sample, not TD-190 title (known JOB-22-14) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.3 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.3 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 1.2 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 8.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | fail (proposed Pending) | 1.9 s | Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap | fail (proposed Pending) | 2.2 s | Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 14.6 s | -form page title = content CF dev sample, not TD-190 title (known JOB-22-14) |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.1 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 1.0 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | pass | 1.3 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 5.4 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | pass | 2.4 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 5.2 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page | fail | 21.6 s | card "QA190 PDF catalog" absent: content CF titles are dev samples (known JOB-22-14) |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 4.4 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 1.7 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 6.1 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 4.0 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 3.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | fail (proposed Pending) | 0.9 s | Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap | fail (proposed Pending) | 0.6 s | Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 14.2 s | -form page title = content CF dev sample, not TD-190 title (known JOB-22-14) |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.1 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 1.0 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 9.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | fail (proposed Pending) | 2.1 s | Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap | fail (proposed Pending) | 2.1 s | Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 14.2 s | -form page title = content CF dev sample, not TD-190 title (known JOB-22-14) |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.1 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 1.0 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | pass | 1.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 5.8 s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | pass | 0.1 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | pass | 1.0 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 2.0 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page | fail | 14.8 s | card "QA190 PDF catalog" absent: content CF titles are dev samples (known JOB-22-14) |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 4.4 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 1.7 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 6.4 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 3.9 s | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live | fail | 0.7 s | preview-only DSR CF on .aem.page renders unavailable/not-found (known BUG-CAT-PREVIEW, JOB-23-03) |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | fail | 0.5 s | subfolder path qa654-folder/qa654-sub returns 200 (unavailable) instead of 404 (known JOB-22-19) |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | pass | 0.1 s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | pass | 4.1 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | pass | 7.9 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | pass | 7.9 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 5.5 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | pass | 3.1 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | pass | 3.3 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | pass | 6.7 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 4.9 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | pass | 1.9 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | pass | 1.9 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | pass | 1.9 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | pass | 2.0 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 2.4 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | pass | 1.8 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | pass | 2.7 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | pass | 6.0 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 5.3 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | pass | 5.3 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | pass | 5.2 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | pass | 3.7 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 5.1 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | pass | 4.9 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | pass | 4.5 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | pass | 3.3 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 5.2 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | pass | 4.8 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 7.7 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | pass | 2.6 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 5.0 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | pass | 1.7 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 4.3 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | pass | 1.7 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 4.1 s | — |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | pass | 1.6 s | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | pass | 1.7 s | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only CF related → 200 on .aem.page, 404 on .aem.live | fail | 0.6 s | preview-only DSR CF on .aem.page renders unavailable/not-found (known BUG-CAT-PREVIEW, JOB-23-03) |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | pass | 2.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | pass | 1.9 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | pass | 4.1 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | pass | 4.2 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list | fail | 19.3 s | TD-587-08 (commune unpublished) not seeded – phase 2 not done; no seeded guard in this test |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | 1.6 s | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | 1.5 s | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only | pass | 2.1 s | — |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked | pass | 1.1 s | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | pass | 0.9 s | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title | pass | 0.7 s | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title | pass | 0.7 s | — |
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first | pass | 2.5 s | — |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | pass | 2.7 s | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | pass | 2.5 s | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | pass | 1.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | pass | 0.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 | pass | 1.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 | pass | 1.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a | pass | 1.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a | pass | 1.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b | pass | 1.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b | pass | 1.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | pass | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | pass | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | pass | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | pass | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | pass | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | pass | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | pass | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | pass | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | pass | 0.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam | pass | 1.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam | pass | 1.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main | pass | 1.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main | pass | 1.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable / inactive, browser ends on /ja/library/catalog (HTTP 200) | pass | 1.0 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable / inactive, browser ends on /ja/library/catalog (HTTP 200) | pass | 0.8 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable / inactive, browser ends on /en/library/catalog (HTTP 200) | pass | 0.9 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable / inactive, browser ends on /en/library/catalog (HTTP 200) | pass | 1.0 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable / inactive, browser ends on /ja/library/video/search (HTTP 200) | pass | 1.4 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable / inactive, browser ends on /ja/library/video/search (HTTP 200) | pass | 0.9 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable / inactive, browser ends on /en/library/video/search (HTTP 200) | pass | 1.2 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable / inactive, browser ends on /en/library/video/search (HTTP 200) | pass | 1.7 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable / movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | pass | 1.0 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable / movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | pass | 1.4 s | — |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass | 0.2 s | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass | 0.0 s | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass | 0.5 s | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass | 0.5 s | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass | 0.2 s | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass | 0.5 s | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | pass | 1.1 s | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | pass | 0.8 s | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | pass | 2.0 s | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | pass | 1.9 s | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | pass | 0.4 s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | pass | 0.4 s | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | pass | 4.0 s | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page | pass | 4.8 s | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | pass | 6.8 s | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | pass | 7.3 s | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | pass | 0.4 s | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | pass | 4.3 s | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | pass | 4.3 s | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | pass | 2.8 s | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | pass | 3.6 s | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent | pass | 6.5 s | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images | pass | 8.6 s | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | pass | 5.5 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-011 [ja] | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-011 [en] | Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-CATDL-017 [ja] | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [cn] | cn: no /master/cn (Issue #18) |
| DSR-CATOV-006 [ja] | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 [ja] | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 [en] | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATV-018 [-] | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (ja) |
| DSR-CATV-019 [-] | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (ja) |
| DSR-CATV-020 [-] | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (ja) |
| DSR-CATV-018 [-] | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (en) |
| DSR-CATV-019 [-] | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (en) |
| DSR-CATV-020 [-] | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (en) |
| DSR-VOV-004 [en] | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 [en] | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 [en] | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-010 [en] | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 [ja] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-016 [en] | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 [en] | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-538-retest [en] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [en] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-CATOV-002 [en] | preview-only CF: not on .aem.live (HTTP 404 = expected) |
| DSR-PCF-001 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 [en] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 [en] | Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-002 [ja] | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-006 [ja] | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 [ja] | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 [ja] | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-020 [ja] | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |

## 6. Failed tests

### DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Expected vs actual:

```
Error: gated PDF URL delivered to the browser before submit
expect(received).toEqual(expected) // deep equality
- Expected  - 1
+ Received  + 3
- Array []
```

- Proposed: Fail · suspect `product` · cause `none` · confidence 70% — gated PDF URL reaches the browser before submit (known 70%, JOB-23-04)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATDL-007_ja.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Expected vs actual:

```
Error: fixed texts containing Japanese
expect(received).toEqual(expected) // deep equality
- Expected  -  1
+ Received  + 44
- Array []
```

- Proposed: Fail · suspect `product` · cause `none` · confidence 70% — en form renders Japanese texts (known 70%)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATDL-016_en.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:162`
- Expected vs actual:

```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
```

- Proposed: Pending · suspect `product` · cause `none` · confidence 40% — Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-002_ja_qa190-cat-pdf.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:209`
- Expected vs actual:

```
Error: sitemap <loc>
expect(received).toHaveLength(expected)
Expected length: 1
Received length: 0
Received array:  []
```

- Proposed: Pending · suspect `product` · cause `none` · confidence 40% — Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/(none)` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:141`
- Expected vs actual:

```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 PDF form required"
Received: "catalog pdf form"
Timeout:  5000ms
```

- Proposed: Fail · suspect `data` · cause `none` · confidence 0% — -form page title = content CF dev sample, not TD-190 title (known JOB-22-14)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-001_ja_qa190-cat-pdf-form.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:162`
- Expected vs actual:

```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
```

- Proposed: Pending · suspect `product` · cause `none` · confidence 40% — Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-002_ja_qa190-cat-ebook.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:209`
- Expected vs actual:

```
Error: sitemap <loc>
expect(received).toHaveLength(expected)
Expected length: 1
Received length: 0
Received array:  []
```

- Proposed: Pending · suspect `product` · cause `none` · confidence 40% — Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/(none)` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:141`
- Expected vs actual:

```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 e-book form"
Received: "catalog ebook form"
Timeout:  5000ms
```

- Proposed: Fail · suspect `data` · cause `none` · confidence 0% — -form page title = content CF dev sample, not TD-190 title (known JOB-22-14)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-001_ja_qa190-cat-ebook-form.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:272`
- Expected vs actual:

```
Error: card 'QA190 PDF catalog'
expect(locator).toBeVisible() failed
Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first()
Expected: visible
Timeout: 5000ms
```

- Proposed: Fail · suspect `data` · cause `none` · confidence 0% — card "QA190 PDF catalog" absent: content CF titles are dev samples (known JOB-22-14)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-012_ja.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:162`
- Expected vs actual:

```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
```

- Proposed: Pending · suspect `product` · cause `none` · confidence 40% — Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-002_en_qa190-cat-pdf.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:209`
- Expected vs actual:

```
Error: sitemap <loc>
expect(received).toHaveLength(expected)
Expected length: 1
Received length: 0
Received array:  []
```

- Proposed: Pending · suspect `product` · cause `none` · confidence 40% — Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/(none)` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:141`
- Expected vs actual:

```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 PDF form required"
Received: "catalog pdf form"
Timeout:  5000ms
```

- Proposed: Fail · suspect `data` · cause `none` · confidence 0% — -form page title = content CF dev sample, not TD-190 title (known JOB-22-14)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-001_en_qa190-cat-pdf-form.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:162`
- Expected vs actual:

```
Error: meta robots
expect(received).not.toContain(expected) // indexOf
Expected substring: not "noindex"
Received string:        "noindex"
```

- Proposed: Pending · suspect `product` · cause `none` · confidence 40% — Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-002_en_qa190-cat-ebook.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:209`
- Expected vs actual:

```
Error: sitemap <loc>
expect(received).toHaveLength(expected)
Expected length: 1
Received length: 0
Received array:  []
```

- Proposed: Pending · suspect `product` · cause `none` · confidence 40% — Pending: BUG-CAT-NOINDEX by-design candidate (non-form noindex / no sitemap row); Expected unchanged
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/(none)` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:141`
- Expected vs actual:

```
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 e-book form"
Received: "catalog ebook form"
Timeout:  5000ms
```

- Proposed: Fail · suspect `data` · cause `none` · confidence 0% — -form page title = content CF dev sample, not TD-190 title (known JOB-22-14)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-001_en_qa190-cat-ebook-form.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-012 [en] catalog list card links to the overlay page

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:272`
- Expected vs actual:

```
Error: card 'QA190 PDF catalog'
expect(locator).toBeVisible() failed
Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first()
Expected: visible
Timeout: 5000ms
```

- Proposed: Fail · suspect `data` · cause `none` · confidence 0% — card "QA190 PDF catalog" absent: content CF titles are dev samples (known JOB-22-14)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-CATOV-012_en.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:355`
- Expected vs actual:

```
Error: 'QA654 preview' on .aem.page
expect(received).toContain(expected) // indexOf
Expected substring: "QA654 preview"
Received string:    "<!DOCTYPE html>
<html>
```

- Proposed: Fail · suspect `product` · cause `none` · confidence 50% — preview-only DSR CF on .aem.page renders unavailable/not-found (known BUG-CAT-PREVIEW, JOB-23-03)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/(none)` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict)

- Assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:365`
- Expected vs actual:

```
Error: qa654-folder/qa654-sub
expect(received).toBe(expected) // Object.is equality
Expected: 404
Received: 200
```

- Proposed: Fail · suspect `product` · cause `none` · confidence 50% — subfolder path qa654-folder/qa654-sub returns 200 (unavailable) instead of 404 (known JOB-22-19)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/(none)` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-VOV-002 [en] preview-only CF related → 200 on .aem.page, 404 on .aem.live

- Assertion: `tests/movie-detail/DSR-587.movie-overlay.spec.ts:110`
- Expected vs actual:

```
Error: .aem.page movie title
expect(received).toContain(expected) // indexOf
Expected substring: "QA587 preview"
Received string:    "<!DOCTYPE html>
<html>
```

- Proposed: Fail · suspect `product` · cause `none` · confidence 50% — preview-only DSR CF on .aem.page renders unavailable/not-found (known BUG-CAT-PREVIEW, JOB-23-03)
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/(none)` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

### DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list

- Assertion: `tests/movie-detail/DSR-587.movie-overlay.spec.ts:175`
- Expected vs actual:

```
Error: meta robots
expect(received).toContain(expected) // indexOf
Expected substring: "noindex"
Received string:    ""
```

- Proposed: Fail · suspect `data` · cause `none` · confidence 0% — TD-587-08 (commune unpublished) not seeded – phase 2 not done; no seeded guard in this test
- Evidence: `ykk-dsr/hub/results/JOB-20261023-07/evidence/DSR-VOV-008_en.png` (committed); traces and retry screenshots under `test-results/` (gitignored, not committed)

## 7. Open points for QA

- This run is the **pre-deploy reference** for `scripts/compare-runs.mjs` (JSON: `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json`). It is not all green; compare per test.
- DSR-PDO-005 ran with the **new Expected** (BL-OVL-1 21/10 node-name rule): `qa586-alpha` = 200 + product-detail block → pass. `tc-out/DSR-586.spec.json` 5.0 still has the old text (Claude-owned).
- CATOV-002/021 non-form: Expected unchanged, verdict proposed Pending until Dat OK/NG.
- DSR-VOV-008 fails because TD-587-08 is not seeded (phase 2). The test has no seeded guard; earlier jobs excluded it with `--grep`. Data, not product.
- ARTICLE-011 listing (the only 529 test in `@overlay`) skipped: ja list shows placeholder cards, en list 404.
- `fixtures/cf-models.ts` handles `dm*DsrList` from code reading only. The real post-deploy response shape was not seen (not deployed).
- Build/commit of DEV (dsr-eds / fullstack) not independently verified.
