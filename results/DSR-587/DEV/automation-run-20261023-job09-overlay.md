# @overlay suite (DSR-587 / 586 / 654 / 570 / 557 / 585 / 529) DEV automation run — 20261023-job09-overlay

## 1. Header

- Run start (UTC): 2026-10-23T04:48:39Z
- Run end (UTC): 2026-10-23T04:55:21Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (preview tier `.aem.page` for the preview-only TCs)
- Target page(s): all @overlay specs (movie, product, catalog, catalog-download, catalog-video, product-cf, overlay-seo, article)
- Build under test: not independently verified (EDS main branch on DEV at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + Martin 23/10 decision (overlay has no preview; DSR-674 Dismissed)
- Automation HEAD commit SHA: c3af819e51009c34b86d444778d5d7e0ac206792 (+ uncommitted JOB-20261023-09 edits to the 3 spec files, committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j9_t2.json npm run test:dev:overlay   # = ENV=dev playwright test --grep @overlay
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 257 | 198 | 18 | 41 | 1 | 2 | 1 configured; 18 test(s) retried | 400.8 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `--grep @overlay`, 257 tests across 10 spec files; chromium. Flaky outcomes: none.

## 4. Executed tests

Duration = summed over attempts. Failed tests failed on both attempts (initial + 1 retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | passed | 5.5 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 3.9 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 4.8 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | passed | 6.3 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | passed | 5.5 s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders | passed | 4.3 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present | passed | 4.3 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 5.7 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | passed | 5.7 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form | passed | 5.8 s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 5.1 s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | 23.2 s | Error: gated PDF URL delivered to the browser before submit \| expect(received).toEqual(expected) // deep equality |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | passed | 7.2 s | — |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | failed | 9.4 s | Error: fixed texts containing Japanese \| expect(received).toEqual(expected) // deep equality |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 5.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 2.6 s | Error: meta robots \| expect(received).not.toContain(expected) // indexOf |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | passed | 1.3 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap | failed | 2.4 s | Error: sitemap <loc> \| expect(received).toHaveLength(expected) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 15.2 s | Error: expect(locator).toHaveText(expected) failed \| Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') \| Expected: "QA190 PDF form requ |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.4 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 1.2 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 9.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 2.5 s | Error: meta robots \| expect(received).not.toContain(expected) // indexOf |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | passed | 1.7 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap | failed | 2.8 s | Error: sitemap <loc> \| expect(received).toHaveLength(expected) |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 17.0 s | Error: expect(locator).toHaveText(expected) failed \| Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') \| Expected: "QA190 e-book form" |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.2 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 1.1 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | passed | 1.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | passed | 6.0 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | passed | 2.4 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | passed | 5.9 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page | failed | 26.5 s | Error: card 'QA190 PDF catalog' \| expect(locator).toBeVisible() failed |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | passed | 6.0 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | passed | 2.2 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | passed | 6.5 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | passed | 3.9 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 4.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 1.0 s | Error: meta robots \| expect(received).not.toContain(expected) // indexOf |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | passed | 0.3 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap | failed | 0.4 s | Error: sitemap <loc> \| expect(received).toHaveLength(expected) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 11.8 s | Error: expect(locator).toHaveText(expected) failed \| Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') \| Expected: "QA190 PDF form requ |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.9 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 1.0 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | passed | 9.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 2.1 s | Error: meta robots \| expect(received).not.toContain(expected) // indexOf |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap | failed | 2.1 s | Error: sitemap <loc> \| expect(received).toHaveLength(expected) |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 14.3 s | Error: expect(locator).toHaveText(expected) failed \| Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') \| Expected: "QA190 e-book form" |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 1.0 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.3 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 0.9 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | passed | 1.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | passed | 5.5 s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | passed | 1.4 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | passed | 2.6 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | passed | 5.2 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page | failed | 25.6 s | Error: card 'QA190 PDF catalog' \| expect(locator).toBeVisible() failed |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | passed | 6.0 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | passed | 4.1 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | passed | 9.0 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | passed | 5.4 s | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 0.8 s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | failed | 1.1 s | Error: qa654-folder/qa654-sub \| expect(received).toBe(expected) // Object.is equality |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | passed | 0.1 s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | passed | 3.9 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | passed | 10.2 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | passed | 9.5 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | passed | 9.8 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | passed | 3.7 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | passed | 3.1 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 4.4 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 3.0 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | passed | 7.1 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | passed | 7.7 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | passed | 5.3 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | passed | 3.1 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | passed | 2.1 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 2.8 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 2.5 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | passed | 1.7 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | passed | 1.9 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | passed | 1.4 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | passed | 6.3 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | passed | 5.4 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | passed | 5.0 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | passed | 3.5 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | passed | 4.8 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | passed | 4.8 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | passed | 4.7 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | passed | 3.3 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | passed | 4.6 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | passed | 4.7 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | passed | 4.8 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | passed | 3.2 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | passed | 4.9 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | passed | 2.5 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | passed | 4.1 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | passed | 5.8 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | passed | 7.5 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | passed | 2.2 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | passed | 3.8 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | passed | 5.6 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | passed | 7.8 s | — |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | passed | 3.5 s | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | passed | 4.1 s | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | passed | 5.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | passed | 5.5 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | passed | 4.4 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | passed | 3.8 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list | failed | 9.0 s | Error: video-detail rows \| expect(received).toEqual(expected) // deep equality |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed | 1.7 s | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed | 2.1 s | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only | passed | 1.5 s | — |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked | passed | 0.9 s | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | passed | 1.1 s | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title | passed | 0.9 s | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title | passed | 0.8 s | — |
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first | passed | 2.8 s | — |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | passed | 2.4 s | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | passed | 1.8 s | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | passed | 1.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | passed | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | passed | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | passed | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | passed | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | passed | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | passed | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | passed | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a | passed | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam | passed | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam | passed | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 | passed | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 | passed | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 | passed | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a | passed | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | passed | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | passed | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | passed | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | passed | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | passed | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | passed | 1.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | passed | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | passed | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam | passed | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam | passed | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main | passed | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main | passed | 0.3 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | passed | 0.8 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | passed | 0.9 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | passed | 0.8 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | passed | 0.9 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | passed | 0.8 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | passed | 0.9 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | passed | 1.0 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | passed | 0.9 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | passed | 1.2 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | passed | 1.1 s | — |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.1 s | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.1 s | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 0.6 s | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 0.5 s | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.3 s | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.4 s | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | passed | 0.7 s | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | passed | 1.0 s | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | passed | 2.2 s | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | passed | 2.0 s | — |
| DSR-PDO-002 | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 0.9 s | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | passed | 0.4 s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | passed | 0.4 s | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | passed | 4.1 s | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page | passed | 3.9 s | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | passed | 5.5 s | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | passed | 5.7 s | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | passed | 0.1 s | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | passed | 3.4 s | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | passed | 4.4 s | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | passed | 1.9 s | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | passed | 1.8 s | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent | passed | 2.0 s | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images | passed | 4.1 s | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | passed | 2.0 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-011 [ja] listing card images of qa529 articles absolute, GET 200 | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-011 [en] listing card images of qa529 articles absolute, GET 200 | Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [cn] fixed texts translated (Chinese) | (no reason recorded) |
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
| DSR-PCF-001 [ja] DM_product field set matches ver0.4 (10 tabs, 83 fields) | (no reason recorded) |
| DSR-PCF-002 [ja] removed fields and old spellings not shown in the CF editor | (no reason recorded) |
| DSR-PCF-003 [ja] field types match fix list | (no reason recorded) |
| DSR-PCF-004 [ja] required fields enforced on save (negative) | (no reason recorded) |
| DSR-PCF-005 [ja] single-line text accepts 255 characters (boundary) | (no reason recorded) |
| DSR-PCF-006 [ja] zipperChainTypeCategories tag picker stores several chain-type tags | (no reason recorded) |
| DSR-PCF-008 [ja] data entry template columns match the model | (no reason recorded) |
| DSR-PCF-009 [ja] bulk import with revised template | (no reason recorded) |
| DSR-PCF-010 [ja] bulk import rejects row missing a required field (negative) | (no reason recorded) |
| DSR-PCF-011 [ja] pre-change product CF opens and keeps retained values | (no reason recorded) |
| DSR-PCF-012 [ja] ja / en / cn folders use the same model | (no reason recorded) |
| DSR-PCF-013 [ja] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names | (no reason recorded) |
| DSR-PCF-013 [en] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names | (no reason recorded) |
| DSR-PCF-014 [ja] product search JSON entry has search keys and no removed fields | (no reason recorded) |
| DSR-PCF-015 [ja] product detail of TD-585-01 renders without errors (regression) | (no reason recorded) |
| DSR-PCF-018 [ja] product CF name = numeric productId in content CF folder | (no reason recorded) |
| DSR-PCF-018 [en] product CF name = numeric productId in content CF folder | (no reason recorded) |
| DSR-PDO-006 [ja] CF related in subfolder → no page (404) | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-020 [ja] ver0.4 new fields – current state recorded (Blocked: no design) | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |

## 6. Failed tests

### DSR-CATDL-007 — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `Error: gated PDF URL delivered to the browser before submit \| expect(received).toEqual(expected) // deep equality` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:159` (test declaration line)
- Expected vs actual: see assertion message above; context: dsr-catalog-list exposes pdfAsset._publishUrl for the form-gated PDF (known since JOB-14)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: product / none / 70%

### DSR-CATDL-016 — DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Failing assertion: `Error: fixed texts containing Japanese \| expect(received).toEqual(expected) // deep equality` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:240` (test declaration line)
- Expected vs actual: see assertion message above; context: BUG-CAT-FORM-EN: Japanese fixed texts on en form (known since JOB-20261022-03)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: product / none / 70%

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion: `Error: meta robots \| expect(received).not.toContain(expected) // indexOf` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:147` (test declaration line)
- Expected vs actual: see assertion message above; context: non-form pdf/ebook page carries noindex (known since JOB-20261022-13)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: product / none / 40%

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap

- Failing assertion: `Error: sitemap <loc> \| expect(received).toHaveLength(expected)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:183` (test declaration line)
- Expected vs actual: see assertion message above; context: catalog overlay pages absent from sitemap (known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: no screenshot (request-only test); observed attachment in playwright-report/
- Proposed suspect / cause / confidence: product / none / 50%

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed \| Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') \| Expected: "QA190 PDF form required"` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:126` (test declaration line)
- Expected vs actual: see assertion message above; context: content CF title is dev sample, not TD-190 "QA190 …" (known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: data / none / 0%

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion: `Error: meta robots \| expect(received).not.toContain(expected) // indexOf` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:147` (test declaration line)
- Expected vs actual: see assertion message above; context: non-form pdf/ebook page carries noindex (known since JOB-20261022-13)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: product / none / 40%

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap

- Failing assertion: `Error: sitemap <loc> \| expect(received).toHaveLength(expected)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:183` (test declaration line)
- Expected vs actual: see assertion message above; context: catalog overlay pages absent from sitemap (known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: no screenshot (request-only test); observed attachment in playwright-report/
- Proposed suspect / cause / confidence: product / none / 50%

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed \| Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') \| Expected: "QA190 e-book form"` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:126` (test declaration line)
- Expected vs actual: see assertion message above; context: content CF title is dev sample, not TD-190 "QA190 …" (known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: data / none / 0%

### DSR-CATOV-012 — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion: `Error: card 'QA190 PDF catalog' \| expect(locator).toBeVisible() failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:263` (test declaration line)
- Expected vs actual: see assertion message above; context: no card titled TD-190 'QA190 PDF catalog' in list (dev-sample titles, known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: data / none / 0%

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion: `Error: meta robots \| expect(received).not.toContain(expected) // indexOf` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:147` (test declaration line)
- Expected vs actual: see assertion message above; context: non-form pdf/ebook page carries noindex (known since JOB-20261022-13)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: product / none / 40%

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap

- Failing assertion: `Error: sitemap <loc> \| expect(received).toHaveLength(expected)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:183` (test declaration line)
- Expected vs actual: see assertion message above; context: catalog overlay pages absent from sitemap (known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: no screenshot (request-only test); observed attachment in playwright-report/
- Proposed suspect / cause / confidence: product / none / 50%

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed \| Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') \| Expected: "QA190 PDF form required"` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:126` (test declaration line)
- Expected vs actual: see assertion message above; context: content CF title is dev sample, not TD-190 "QA190 …" (known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: data / none / 0%

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion: `Error: meta robots \| expect(received).not.toContain(expected) // indexOf` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:147` (test declaration line)
- Expected vs actual: see assertion message above; context: non-form pdf/ebook page carries noindex (known since JOB-20261022-13)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: product / none / 40%

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap

- Failing assertion: `Error: sitemap <loc> \| expect(received).toHaveLength(expected)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:183` (test declaration line)
- Expected vs actual: see assertion message above; context: catalog overlay pages absent from sitemap (known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: no screenshot (request-only test); observed attachment in playwright-report/
- Proposed suspect / cause / confidence: product / none / 50%

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed \| Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') \| Expected: "QA190 e-book form"` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:126` (test declaration line)
- Expected vs actual: see assertion message above; context: content CF title is dev sample, not TD-190 "QA190 …" (known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: data / none / 0%

### DSR-CATOV-012 — DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion: `Error: card 'QA190 PDF catalog' \| expect(locator).toBeVisible() failed` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:263` (test declaration line)
- Expected vs actual: see assertion message above; context: no card titled TD-190 'QA190 PDF catalog' in list (dev-sample titles, known)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium/test-failed-1.png, test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png
- Proposed suspect / cause / confidence: data / none / 0%

### DSR-CATOV-010 — DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict)

- Failing assertion: `Error: qa654-folder/qa654-sub \| expect(received).toBe(expected) // Object.is equality` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:366` (test declaration line)
- Expected vs actual: see assertion message above; context: subfolder path qa654-folder/qa654-sub returns 200 stub instead of 404 (known since JOB-19/IDLE-39)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: no screenshot (request-only test); observed attachment in playwright-report/
- Proposed suspect / cause / confidence: product / none / 50%

### DSR-VOV-008 — DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list

- Failing assertion: `Error: video-detail rows \| expect(received).toEqual(expected) // deep equality` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:177` (test declaration line)
- Expected vs actual: see assertion message above; context: rows = source, cfPath, unavailable vs TC "single unavailable row" (Expected change proposed in JOB-08)
- Attempt(s): initial failed, retry 1 failed
- Evidence paths: test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium/test-failed-1.png, test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium/test-failed-2.png, test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium-retry1/test-failed-1.png, test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium-retry1/test-failed-2.png
- Proposed suspect / cause / confidence: test / none / 10%

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. First-attempt screenshots are copied to `ykk-dsr/hub/results/JOB-20261023-09/evidence/` (committed).

## 7. Open points for QA

- Expected changed per JOB-20261023-09 (approved exception to AGENTS §4): preview-only DSR CF → `.aem.page` 200 overlay not-found stub (rows source: overlay + unavailable: not-found, robots noindex, no item title/name) and `.aem.live` 404. Source: Martin 23/10, DSR-674 Dismissed, tc-out updated by Claude in 1e02259.
- Build identity on DEV not independently verified.
- The 'no title/name' check is a substring search for the TD title/name in the raw HTML body (PDO/VOV) or the full HTML (CATOV).
- All 18 failures are pre-existing and match earlier runs (JOB-20261022-03/13, JOB-19, IDLE-30/35/39, JOB-20261023-04/06/08); none relate to the 3 changed tests. VOV-002 / CATOV-009 / PDO-002 passed in this run as well.
- CATOV-009 previously failed (.page lacked 'QA654 preview'); it now passes under the new Expected.
- suspect/cause/confidence per failure are inferred from earlier job summaries; not re-investigated in this job.
- Single cross-US report stored under results/DSR-587/DEV/ (overlay BL owner); the run is not duplicated into each US folder.
