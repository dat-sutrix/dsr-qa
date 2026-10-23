# DSR-587 DEV automation run — 20261023-job13-overlay

## 1. Header

- Run start (UTC): 2026-10-23T05:55:36Z
- Run end (UTC): 2026-10-23T06:00:47Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` tier where a test says so)
- Build under test: not independently verified (EDS main branch on DEV at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + docs/DSR-529/baseline-BL-v1.md + JOB-20261023-13 approved Expected change (VOV-008 technical rows ignored; CATOV-021 non-form query-index check dropped; ARTICLE-023 fixme Blocked-by DSR-356)
- Automation HEAD commit SHA: b2509a9523faa3322f1b018413f96aac755a154d (+ uncommitted JOB-20261023-13 edits to the 3 specs, committed with this report)
- Target page(s): all `@overlay`-tagged tests (video/product/catalog overlay detail, catalog list/download, overlay SEO) – see section 4
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job13/run2.json npm run test:dev:overlay
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 257 | 208 | 8 | 41 | 1 | 2 | 1 configured; 8 test(s) retried | 5.2 min |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: cross-US `@overlay` suite, chromium. Flaky outcomes: none. Every one of the 8 fails was already failing before this run (JOB-20261023-10, JOB-ZY-REG-20261023-1200), so there is no NEW FAIL.

## 4. Executed tests

Duration = summed over attempts. Each failed test failed on both attempts (initial + 1 retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | passed | 3.7 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 3.4 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 3.5 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | passed | 4.1 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | passed | 4.5 s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders | passed | 4.6 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present | passed | 3.5 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 3.5 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | passed | 2.3 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form | passed | 2.3 s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 1.8 s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | 7.9 s | Error: gated PDF URL delivered to the browser before submit |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | passed | 2.5 s | — |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | failed | 3.3 s | Error: fixed texts containing Japanese |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 5.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.8 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | passed | 1.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap | passed | 1.3 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 14.8 s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.6 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | passed | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 0.4 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 6.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.4 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | passed | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap | passed | 0.3 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 12.4 s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.7 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | passed | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 0.6 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | passed | 0.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | passed | 4.0 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | passed | 0.8 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | passed | 3.4 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page | failed | 18.2 s | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | passed | 4.9 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | passed | 1.7 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | passed | 5.4 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | passed | 3.7 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 3.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.3 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | passed | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap | passed | 0.3 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 11.7 s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.5 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | passed | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 0.3 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 4.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.5 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | passed | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap | passed | 0.4 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 11.6 s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.4 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | passed | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 0.4 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | passed | 0.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | passed | 3.7 s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | passed | 0.1 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | passed | 0.5 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | passed | 2.5 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page | failed | 16.9 s | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | passed | 5.4 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | passed | 2.2 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | passed | 6.3 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | passed | 3.8 s | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 0.4 s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | passed | 4.1 s | — |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | passed | 0.1 s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | passed | 4.0 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | passed | 5.7 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | passed | 7.8 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | passed | 5.0 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | passed | 3.9 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | passed | 2.2 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 2.1 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 2.1 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | passed | 5.9 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | passed | 6.9 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | passed | 5.0 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | passed | 3.0 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | passed | 1.6 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 2.0 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 1.9 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | passed | 1.7 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | passed | 1.6 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | passed | 1.1 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | passed | 2.2 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | passed | 1.8 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | passed | 1.8 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | passed | 1.6 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | passed | 1.7 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | passed | 1.7 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | passed | 1.8 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | passed | 1.6 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | passed | 1.8 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | passed | 1.6 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | passed | 2.0 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | passed | 2.9 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | passed | 2.1 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | passed | 2.3 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | passed | 3.7 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | passed | 2.0 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | passed | 3.7 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | passed | 1.9 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | passed | 3.7 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | passed | 2.1 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | passed | 3.8 s | — |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | passed | 1.1 s | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | passed | 1.3 s | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | passed | 2.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | passed | 2.1 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | passed | 3.6 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | passed | 3.6 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list | passed | 3.9 s | — |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed | 1.9 s | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed | 2.5 s | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only | passed | 2.0 s | — |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked | passed | 0.8 s | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | passed | 0.9 s | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title | passed | 0.5 s | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title | passed | 0.5 s | — |
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first | passed | 3.7 s | — |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | passed | 3.3 s | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | passed | 2.1 s | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | passed | 1.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | passed | 1.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | passed | 1.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | passed | 1.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | passed | 1.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | passed | 1.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | passed | 1.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | passed | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | passed | 0.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | passed | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | passed | 0.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | passed | 0.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | passed | 1.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a | passed | 2.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b | passed | 1.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off | passed | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 | passed | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 | passed | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 | passed | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 | passed | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 | passed | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 | passed | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b | passed | 2.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b | passed | 2.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | passed | 1.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | passed | 1.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | passed | 1.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | passed | 1.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | passed | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | passed | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | passed | 0.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main | passed | 0.4 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | passed | 1.0 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | passed | 1.5 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | passed | 1.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | passed | 1.0 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | passed | 1.0 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | passed | 1.0 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | passed | 1.1 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | passed | 1.0 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | passed | 1.0 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | passed | 1.0 s | — |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 2.4 s | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.8 s | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 1.1 s | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 1.1 s | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.8 s | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.8 s | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | passed | 3.5 s | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | passed | 1.8 s | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | passed | 5.3 s | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | passed | 5.0 s | — |
| DSR-PDO-002 | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 1.4 s | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | passed | 0.9 s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | passed | 0.7 s | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | passed | 6.9 s | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page | passed | 11.2 s | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | passed | 9.2 s | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | passed | 5.9 s | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | passed | 0.1 s | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | passed | 2.9 s | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | passed | 3.1 s | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | passed | 1.5 s | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | passed | 1.7 s | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent | passed | 2.6 s | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images | passed | 4.9 s | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | passed | 2.1 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-011 (DSR-ARTICLE-011 [ja]) | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-011 (DSR-ARTICLE-011 [en]) | Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-CATDL-017 (DSR-CATDL-017 [ja]) | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 (DSR-CATDL-016 [cn]) | cn: no /master/cn (Issue #18) |
| DSR-CATOV-006 (DSR-CATOV-006 [ja]) | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 (DSR-CATOV-018 [ja]) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 (DSR-CATOV-018 [en]) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-VOV-004 (DSR-VOV-004 [en]) | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 (DSR-VOV-005 [en]) | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 (DSR-VOV-006 [en]) | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-010 (DSR-VOV-010 [en]) | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 (DSR-VOV-011 [ja]) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 (DSR-VOV-011 [en]) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-016 (DSR-VOV-016 [en]) | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 (DSR-VOV-017 [en]) | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-538-retest (DSR-538-retest [en]) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [ja]) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [en]) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [ja]) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-CATOV-002 (DSR-CATOV-002 [en]) | preview-only CF: not on .aem.live (HTTP 404 = expected) |
| DSR-PCF-001 (DSR-PCF-001 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 (DSR-PCF-002 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 (DSR-PCF-003 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 (DSR-PCF-004 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 (DSR-PCF-005 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 (DSR-PCF-006 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 (DSR-PCF-008 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 (DSR-PCF-009 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 (DSR-PCF-010 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 (DSR-PCF-011 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 (DSR-PCF-012 [ja]) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 (DSR-PCF-013 [ja]) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 (DSR-PCF-013 [en]) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 (DSR-PCF-014 [ja]) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 (DSR-PCF-015 [ja]) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 (DSR-PCF-018 [ja]) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 (DSR-PCF-018 [en]) | Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-006 (DSR-PDO-006 [ja]) | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 (DSR-PDO-007 [ja]) | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 (DSR-PDO-011 [ja]) | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-020 (DSR-PDO-020 [ja]) | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |

## 6. Failed tests

Raw error lines per attempt (file:line :: first lines of the message). Hub copies of the first-attempt screenshots are in `ykk-dsr/hub/results/JOB-20261023-13/evidence/`. Those copies are committed.

### DSR-CATDL-007 — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- attempt 0: tests/catalog-download/DSR-570.catalog-download.spec.ts:195 :: Error: gated PDF URL delivered to the browser before submit / expect(received).toEqual(expected) // deep equality / - Expected  - 1 / + Received  + 3
  attachments: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/error-context.md, test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/trace.zip
- attempt 1: tests/catalog-download/DSR-570.catalog-download.spec.ts:195 :: Error: gated PDF URL delivered to the browser before submit / expect(received).toEqual(expected) // deep equality / - Expected  - 1 / + Received  + 3
  attachments: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png, test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/error-context.md, test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/trace.zip

### DSR-CATDL-016 — DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- attempt 0: tests/catalog-download/DSR-570.catalog-download.spec.ts:245 :: Error: fixed texts containing Japanese / expect(received).toEqual(expected) // deep equality / - Expected  -  1 / + Received  + 44
  attachments: test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium/error-context.md, test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium/trace.zip
- attempt 1: tests/catalog-download/DSR-570.catalog-download.spec.ts:245 :: Error: fixed texts containing Japanese / expect(received).toEqual(expected) // deep equality / - Expected  -  1 / + Received  + 44
  attachments: test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium-retry1/test-failed-1.png, test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium-retry1/error-context.md, test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium-retry1/trace.zip

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- attempt 0: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144 :: Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 PDF form required" / Received: "catalog pdf form" / Timeout:  5000ms
  attachments: test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/error-context.md, test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/trace.zip
- attempt 1: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144 :: Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 PDF form required" / Received: "catalog pdf form" / Timeout:  5000ms
  attachments: test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/error-context.md, test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/trace.zip

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- attempt 0: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144 :: Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 e-book form" / Received: "catalog ebook form" / Timeout:  5000ms
  attachments: test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/error-context.md, test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/trace.zip
- attempt 1: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144 :: Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 e-book form" / Received: "catalog ebook form" / Timeout:  5000ms
  attachments: test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/error-context.md, test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/trace.zip

### DSR-CATOV-012 — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- attempt 0: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277 :: Error: card 'QA190 PDF catalog' / expect(locator).toBeVisible() failed / Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() / Expected: visible
  attachments: test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium/error-context.md, test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium/trace.zip
- attempt 1: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277 :: Error: card 'QA190 PDF catalog' / expect(locator).toBeVisible() failed / Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() / Expected: visible
  attachments: test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/error-context.md, test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/trace.zip

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- attempt 0: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144 :: Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 PDF form required" / Received: "catalog pdf form" / Timeout:  5000ms
  attachments: test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/error-context.md, test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/trace.zip
- attempt 1: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144 :: Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 PDF form required" / Received: "catalog pdf form" / Timeout:  5000ms
  attachments: test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/error-context.md, test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/trace.zip

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- attempt 0: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144 :: Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 e-book form" / Received: "catalog ebook form" / Timeout:  5000ms
  attachments: test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/error-context.md, test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/trace.zip
- attempt 1: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144 :: Error: expect(locator).toHaveText(expected) failed / Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') / Expected: "QA190 e-book form" / Received: "catalog ebook form" / Timeout:  5000ms
  attachments: test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/error-context.md, test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/trace.zip

### DSR-CATOV-012 — DSR-CATOV-012 [en] catalog list card links to the overlay page

- attempt 0: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277 :: Error: card 'QA190 PDF catalog' / expect(locator).toBeVisible() failed / Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() / Expected: visible
  attachments: test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium/error-context.md, test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium/trace.zip
- attempt 1: tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277 :: Error: card 'QA190 PDF catalog' / expect(locator).toBeVisible() failed / Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() / Expected: visible
  attachments: test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/error-context.md, test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/trace.zip


Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**. Local files may be overwritten by later runs.

## 7. Open points for QA

- All 8 fails were already known, and none has cause ≠ none. CATOV-001 -form and CATOV-012 are data issues (titles are dev samples, not "QA190 …"; 0%). CATDL-007 is draft BUG-CAT-PDF-EXPOSE (70%). CATDL-016 is draft BUG-CAT-FORM-EN (70%). I did not re-investigate any of them.
- The touched TCs passed inside this suite too: VOV-008 3/3 and CATOV-021 8/8.
- I did not independently verify the build identity.
