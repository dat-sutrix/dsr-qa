# DSR-654 DEV automation run — 20261023-job10-overlay

## 1. Header

- Run start (UTC): 2026-10-23T05:00:29Z
- Run end (UTC): 2026-10-23T05:07:47Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` tier where a test says so)
- Target page(s): all `@overlay`-tagged tests (video/product/catalog overlay detail, catalog list/download, overlay SEO) – see section 4
- Build under test: not independently verified (EDS main branch on DEV at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + JOB-20261023-10 approved Expected change (Martin 23/10 CATOV-010 by design; Dat 23/10 BUG-CAT-NOINDEX by design)
- Automation HEAD commit SHA: f87193bc3b9d10c15bfc8d815fc9e3e5ef9581f4 (+ uncommitted JOB-20261023-10 edits to tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, committed with this report)
- Exact command used:

```sh
npm run test:dev:overlay -- --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 257 | 203 | 13 | 41 | 1 | 2 | 1 configured; 13 test(s) retried | 7.3 min |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: cross-US `@overlay` suite (DSR-587/654/586/570/… specs tagged @overlay); chromium. Flaky outcomes: none.

## 4. Executed tests

Duration = summed over attempts. Failed tests failed on both attempts (initial + 1 retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | passed | 6.6 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 4.9 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 4.9 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | passed | 7.0 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | passed | 7.8 s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders | passed | 5.1 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present | passed | 5.4 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 5.6 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | passed | 6.1 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form | passed | 5.2 s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 3.9 s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | 15.8 s | Error: gated PDF URL delivered to the browser before submit |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | passed | 5.7 s | — |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | failed | 8.0 s | Error: fixed texts containing Japanese |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 5.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.1 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in query-index and sitemap | failed | 3.2 s | Error: query-index rows |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 15.5 s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.1 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.3 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 1.4 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 9.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.0 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in query-index and sitemap | failed | 3.0 s | Error: query-index rows |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 14.7 s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.3 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 1.4 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | passed | 1.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | passed | 6.0 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | passed | 2.5 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | passed | 5.4 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page | failed | 18.4 s | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | passed | 4.3 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | passed | 1.7 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | passed | 6.6 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | passed | 3.9 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 4.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.5 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | passed | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in query-index and sitemap | failed | 1.7 s | Error: query-index rows |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 12.3 s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.1 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 1.6 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 7.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.9 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in query-index and sitemap | failed | 3.1 s | Error: query-index rows |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 15.2 s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.5 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 1.4 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | passed | 1.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | passed | 5.7 s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | passed | 1.3 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | passed | 2.5 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | passed | 3.1 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page | failed | 18.1 s | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | passed | 5.0 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | passed | 2.4 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | passed | 6.5 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | passed | 5.0 s | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 0.4 s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | passed | 4.1 s | — |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | passed | 1.1 s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | passed | 6.2 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | passed | 6.0 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | passed | 6.9 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | passed | 3.7 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | passed | 2.0 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | passed | 2.0 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 1.6 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 1.6 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | passed | 6.2 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | passed | 7.7 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | passed | 4.2 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | passed | 3.7 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | passed | 2.2 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 2.4 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 3.0 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | passed | 1.8 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | passed | 1.8 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | passed | 1.2 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | passed | 2.3 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | passed | 5.4 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | passed | 5.4 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | passed | 3.5 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | passed | 5.5 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | passed | 5.0 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | passed | 5.8 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | passed | 4.9 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | passed | 6.4 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | passed | 5.4 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | passed | 4.8 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | passed | 3.2 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | passed | 5.7 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | passed | 2.2 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | passed | 3.8 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | passed | 2.4 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | passed | 3.7 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | passed | 1.9 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | passed | 4.0 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | passed | 2.2 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | passed | 3.9 s | — |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | passed | 1.4 s | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | passed | 1.1 s | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | passed | 2.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | passed | 2.6 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | passed | 4.1 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | passed | 5.3 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list | failed | 12.0 s | Error: video-detail rows |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed | 4.0 s | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed | 4.4 s | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only | passed | 3.7 s | — |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked | passed | 3.6 s | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | passed | 3.2 s | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title | passed | 3.2 s | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title | passed | 3.2 s | — |
| DSR-501-P3 [en] rela | DSR-501-P3 [en] related movies are max 5, newest updated first | passed | 6.9 s | — |
| DSR-501-P2 [en] unav | DSR-501-P2 [en] unavailable related movie is not displayed | passed | 6.9 s | — |
| DSR-538-retest [en]  | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | passed | 7.5 s | — |
| DSR-538-retest [en]  | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | passed | 7.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | passed | 1.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | passed | 2.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | passed | 2.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | passed | 1.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | passed | 2.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | passed | 2.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | passed | 2.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | passed | 1.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | passed | 0.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | passed | 0.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | passed | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | passed | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | passed | 0.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | passed | 1.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a | passed | 2.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b | passed | 1.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off | passed | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off | passed | 1.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 | passed | 2.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 | passed | 1.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 | passed | 1.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 | passed | 1.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a | passed | 2.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b | passed | 1.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | passed | 1.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | passed | 1.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | passed | 1.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | passed | 1.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | passed | 1.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | passed | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | passed | 0.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | passed | 0.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam | passed | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam | passed | 1.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main | passed | 1.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main | passed | 1.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | passed | 1.0 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | passed | 1.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | passed | 1.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | passed | 0.8 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | passed | 1.0 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | passed | 0.8 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | passed | 0.9 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | passed | 0.9 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | passed | 1.1 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | passed | 1.0 s | — |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 2.0 s | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.8 s | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 1.1 s | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 1.1 s | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.8 s | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 1.2 s | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | passed | 3.4 s | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | passed | 2.1 s | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | passed | 7.3 s | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | passed | 5.9 s | — |
| DSR-PDO-002 | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 1.6 s | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | passed | 1.4 s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | passed | 1.6 s | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | passed | 8.0 s | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page | passed | 9.2 s | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | passed | 10.8 s | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | passed | 6.8 s | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | passed | 0.1 s | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | passed | 4.4 s | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | passed | 3.9 s | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | passed | 2.8 s | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | passed | 2.0 s | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent | passed | 2.4 s | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images | passed | 4.6 s | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | passed | 2.9 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-011 [ja] listing card images of qa529 articles absolute, GET 200 | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-011 [en] listing card images of qa529 articles absolute, GET 200 | Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [cn] fixed texts translated (Chinese) | cn: no /master/cn (Issue #18) |
| DSR-CATOV-006 [ja] unpublished DSR CF → 404 on both hosts, removed from query-index | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-VOV-004 [en] CF related name with uppercase / underscore → 404 | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404 | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .aem.live | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-010 [en] unpublished CF related → 404 on both hosts, absent from query-index | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 [ja] video/tech-talk stays a list page | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] video/tech-talk stays a list page | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-016 [en] related contents ordered by update date, newest first | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 [en] DSR-173 Group A page switched to the overlay page | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-538-retest [en] qa587-main (.aem.page) related card hrefs on the EDS host, HTTP 200 | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] qa587-main (.aem.page) related card hrefs on the EDS host, HTTP 200 | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [en] qa587-main (.aem.live) related card hrefs on the EDS host, HTTP 200 | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] qa587-main (.aem.live) related card hrefs on the EDS host, HTTP 200 | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-preview | preview-only CF: not on .aem.live (HTTP 404 = expected) |
| DSR-PCF-001 [ja] DM_product field set matches ver0.4 (10 tabs, 83 fields) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 [ja] removed fields and old spellings not shown in the CF editor | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 [ja] field types match fix list | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 [ja] required fields enforced on save (negative) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 [ja] single-line text accepts 255 characters (boundary) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 [ja] zipperChainTypeCategories tag picker stores several chain-type tags | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 [ja] data entry template columns match the model | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 [ja] bulk import with revised template | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 [ja] bulk import rejects row missing a required field (negative) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 [ja] pre-change product CF opens and keeps retained values | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 [ja] ja / en / cn folders use the same model | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 [ja] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 [en] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 [ja] product search JSON entry has search keys and no removed fields | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 [ja] product detail of TD-585-01 renders without errors (regression) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 [ja] product CF name = numeric productId in content CF folder | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 [en] product CF name = numeric productId in content CF folder | Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-006 [ja] CF related in subfolder → no page (404) | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-020 [ja] ver0.4 new fields – current state recorded (Blocked: no design) | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |

## 6. Failed tests

### DSR-CATDL-007 — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `Error: gated PDF URL delivered to the browser before submit` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Expected / actual: - Expected  - 1; + Received  + 3; - Array []; + Array [; +   "dsr-catalog-list response: item qa190-cat-pdf-form (requiresForm=true) pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/pdf/sample-pdf-a4-size-65kb.pdf",; + ]
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png

### DSR-CATDL-016 — DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Failing assertion: `Error: fixed texts containing Japanese` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Expected / actual: - Expected  -  1; + Received  + 44; - Array []; + Array [; +   "必須; + 氏名（姓）",
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium-retry1/test-failed-1.png

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:196`
- Expected / actual: Expected length: 0; Received length: 1; Received array:  ["/ja/library/catalog/qa190-cat-pdf"]
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-2cf94--in-query-index-and-sitemap-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2cf94--in-query-index-and-sitemap-chromium-retry1/test-failed-1.png (blank page: request-only test, screenshot not meaningful)

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected / actual: Expected: "QA190 PDF form required"; Received: "catalog pdf form"
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:196`
- Expected / actual: Expected length: 0; Received length: 1; Received array:  ["/ja/library/catalog/qa190-cat-ebook"]
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-88ec1--in-query-index-and-sitemap-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-88ec1--in-query-index-and-sitemap-chromium-retry1/test-failed-1.png (blank page: request-only test, screenshot not meaningful)

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected / actual: Expected: "QA190 e-book form"; Received: "catalog ebook form"
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png

### DSR-CATOV-012 — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion: `Error: card 'QA190 PDF catalog'` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:275`
- Expected / actual: Expected: visible
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:196`
- Expected / actual: Expected length: 0; Received length: 1; Received array:  ["/en/library/catalog/qa190-cat-pdf"]
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-432a0--in-query-index-and-sitemap-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-432a0--in-query-index-and-sitemap-chromium-retry1/test-failed-1.png (blank page: request-only test, screenshot not meaningful)

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected / actual: Expected: "QA190 PDF form required"; Received: "catalog pdf form"
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:196`
- Expected / actual: Expected length: 0; Received length: 1; Received array:  ["/en/library/catalog/qa190-cat-ebook"]
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-1d585--in-query-index-and-sitemap-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-1d585--in-query-index-and-sitemap-chromium-retry1/test-failed-1.png (blank page: request-only test, screenshot not meaningful)

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected / actual: Expected: "QA190 e-book form"; Received: "catalog ebook form"
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png

### DSR-CATOV-012 — DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion: `Error: card 'QA190 PDF catalog'` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:275`
- Expected / actual: Expected: visible
- Attempt(s): failed → failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png

### DSR-VOV-008 — DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list

- Failing assertion: `Error: video-detail rows` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:182`
- Expected / actual: - Expected  - 0; + Received  + 2; +   "source",; +   "cfPath",
- Attempt(s): failed → failed
- Evidence paths: test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium/test-failed-1.png, test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium/test-failed-2.png, test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium-retry1/test-failed-1.png, test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium-retry1/test-failed-2.png

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- CATOV-021 non-form: job Expected = NOT listed in query-index and sitemap. Observed: sitemap excludes the 4 non-form pages (pass), but /query-index.json still lists each of them once with column `robots: noindex`. Expected kept as written by the job (AGENTS §4: Expected not changed to pass). Agent view: listing in query-index with robots=noindex is standard EDS behaviour (the index is internal and may feed lists; only sitemap is for crawlers) → suspect `test`, real-bug confidence 20%. Claude to decide whether 'not in query-index' should be dropped.
- Pre-existing fails unchanged by this job (not re-investigated; suspect/cause/confidence copied from JOB-20261023-09): CATOV-001 -form ×4 (data, dev-sample title), CATOV-012 ×2 (data, no 'QA190 PDF catalog' card), CATDL-007 ja (product 70%), CATDL-016 en (product 70%), VOV-008 en (test 10%).
- Versus JOB-20261023-09: CATOV-002 non-form ×4 and CATOV-010 now pass (Expected changed by this job); CATOV-021 non-form ×4 still fail, now on query-index instead of sitemap.
- [Giả định] requiresForm is read from the static overlay HTML (content CF row). json2html emits the row only when true (observed 23/10 on qa190-cat-pdf: no requiresForm row; -form ids: row `true`), so a missing row = false. CATOV-002 'row requiresForm' assertion now reads 'absent = false' and still cross-checks against the fixture; before this change it failed on non-form ids (masked by the robots failure in earlier summaries).
- Build identity of DEV EDS/overlay not independently verified.
