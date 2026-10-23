# REGRESSION DEV automation run — 20261023-reg1620

Job: `JOB-ZY-REG-20261023-1620-claude-code` (R2 + R1 after DSR-669/670/671 deploy + migration, `block:catalog-detail`, `fix:DSR-667`/`block:eco-carousel`). Policy: `ykk-dsr/hub/regression/README.md` §2–§5. Publish side only: no Author, no login, no form submit, no AEM writes.

## 1. Header

- Run start (UTC): 2026-10-23T09:52:57Z
- Run end (UTC): 2026-10-23T10:07:59Z (overlay 2026-10-23T09:52:57Z → 2026-10-23T09:58:37Z; non-overlay 2026-10-23T09:58:52Z → 2026-10-23T10:07:55Z; smoke 2026-10-23T10:07:55Z → 2026-10-23T10:07:59Z)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` where a test says so); persisted queries on publish-p192812-e2014374
- Target page(s): all pages used by the specs in §3 (overlay video/product/catalog, catalog/video lists, product list, catalog download, breadcrumb, TOP, article 529, eco 590, product CF 585, DSR-173 smoke page)
- Build under test: CHANGES.md / KNOWN-FACTS report `dev/2026.10.23` a47274d (669/671) + `dev/2026.10.23_2` b33514f (670), migration finished 16:15 VN (Martin). Not independently verified (no repo access). Block file headers observed at 09:50Z: `catalog-detail.js` Last-Modified Thu, 22 Oct 2026 01:48:45 GMT (ETag b7e43493…, unchanged → catalog-detail refactor still not deployed); `eco-carousel.css` Fri, 23 Oct 2026 07:21:26 GMT; `eco-carousel.js` Mon, 19 Oct 2026 04:43:32 GMT (same on .live and .page).
- Baseline ID: Regression S12 R2 (CHANGES.md rows `regressed = no`); overlay BL-OVL-1; ledger `ykk-dsr/hub/results/REGRESSION/ledger.json`; pre-669 reference `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json`
- Automation HEAD commit SHA: af3a3ba8e771529710eb90ff344ed1cd20d77051 (no code changes in this job)
- Exact command used (3 runs in sequence; Playwright cleans `test-results/` per run, so each run's artifacts were copied to /tmp before the next):

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/overlay-after-669.json npm run test:dev:overlay -- --reporter=list,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg1620cc/b.json ENV=dev npx playwright test tests/breadcrumb/DSR-552.breadcrumb.spec.ts tests/top/ tests/catalog-video/ tests/product-list/ tests/catalog-download/ tests/article-detail/DSR-529.article-detail.spec.ts tests/product-cf/ tests/eco-products/DSR-590.eco-products.spec.ts --project=chromium --grep @auto --grep-invert "@manual|@blocked|@overlay" --reporter=list,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg1620cc/c.json ENV=dev npx playwright test tests/smoke.spec.ts --project=chromium --grep-invert "@manual|@blocked" --reporter=list,json
node scripts/compare-runs.mjs ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json test-results/overlay-after-669.json --out ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/compare.md
```

The second run excludes `@overlay` because those tests already ran in the first run (no duplicates). Postprocessing: `finish.py`, `write_outputs.py`, `observe.cjs` in the job result folder.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| overlay (`@overlay`) | 257 | 208 | 8 | 41 | 1 | 2 | configured 1; 8 retries (all failed again) | 5.6 min |
| non-overlay `@auto` | 118 | 66 | 24 | 28 | 1 | 2 | configured 1; 24 retries (all failed again) | 9.0 min |
| smoke | 1 | 1 | 0 | 0 | 0 | 1 | configured 1; 0 | 1.9 s |
| **Total** | **376** | **275** | **32** | **69** | – | – | 32 | ~15 min |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms. Browser: chromium (firefox/webkit projects only match DSR-BREAD-032, which has no `@auto`/`@overlay` tag, so they ran nothing). Flaky outcomes: 0.

Scope notes: `npm run test:dev:overlay` also picks up 2 `*retest*` specs (`DSR-587.overlay-retest-DSR-647`, `DSR-587.related-links-retest-DSR-538`, 8 tests: 4 pass, 4 skip). Their results are listed below but excluded from the ledger comparison (README §1). Not run: `analysis/`, `*capture*`, visual specs, P2/P3 specs outside the job list.

**Ledger comparison:** 260 TC/lang keys, 0 status changes, 0 NEW FAIL (details: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/compare.md`).

## 4. Executed tests

Duration = summed attempts. Fail = failed on first attempt and on the retry.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | pass | 4.8 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | pass | 3.2 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | pass | 3.8 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | pass | 4.7 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | pass | 4.6 s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders | pass | 3.3 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present | pass | 4.4 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | pass | 2.1 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | pass | 2.6 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form | pass | 2.4 s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | pass | 2.1 s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | fail | 9.2 s | Error: gated PDF URL delivered to the browser before submit  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | pass | 2.6 s | — |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | fail | 4.4 s | Error: fixed texts containing Japanese  expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 44  - Array [] + |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 6.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.9 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap | pass | 1.3 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 13.4 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.7 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 0.5 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 6.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.4 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap | pass | 0.7 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 13.0 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.8 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 0.4 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | pass | 0.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 3.9 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | pass | 0.9 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 1.8 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page | fail | 15.7 s | Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 4.2 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 1.7 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 6.9 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 4.0 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 3.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.3 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap | pass | 0.5 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 12.8 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.8 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 0.4 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 4.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.4 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap | pass | 0.4 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 11.5 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.0 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 1.6 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | pass | 1.3 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 5.6 s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | pass | 1.4 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | pass | 2.4 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 5.1 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page | fail | 21.7 s | Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 5.7 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 3.6 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 5.8 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 3.9 s | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 0.6 s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | pass | 4.4 s | — |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | pass | 0.6 s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | pass | 3.9 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | pass | 5.4 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | pass | 6.5 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 5.9 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | pass | 2.2 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 1.9 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 2.2 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 1.7 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title | pass | 5.7 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab | pass | 7.2 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 6.7 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | pass | 3.2 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 2.4 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 2.6 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 4.4 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | pass | 2.2 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | pass | 2.1 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | pass | 1.8 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 2.2 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | pass | 2.0 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | pass | 2.1 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | pass | 1.6 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 2.0 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | pass | 1.6 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | pass | 1.8 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | pass | 1.0 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 1.3 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | pass | 1.5 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | pass | 1.9 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | pass | 3.5 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 4.5 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | pass | 6.8 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 7.4 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | pass | 5.1 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 8.2 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | pass | 5.3 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 6.8 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | pass | 4.8 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 6.8 s | — |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | pass | 4.0 s | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | pass | 1.5 s | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | pass | 2.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | pass | 1.6 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | pass | 4.1 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | pass | 3.8 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list | pass | 4.0 s | — |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | 1.3 s | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | 1.5 s | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only | pass | 1.6 s | — |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked | pass | 0.9 s | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | pass | 1.2 s | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title | pass | 1.7 s | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title | pass | 1.4 s | — |
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first | pass | 2.0 s | — |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | pass | 2.3 s | — |
| DSR-538 | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | pass | 2.4 s | — |
| DSR-538 | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | pass | 2.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | pass | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | pass | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | pass | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | pass | 0.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | pass | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a | pass | 1.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a | pass | 0.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b | pass | 0.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main | pass | 0.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 | pass | 0.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | pass | 0.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam | pass | 0.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main | pass | 0.3 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | pass | 0.7 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | pass | 1.0 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | pass | 1.3 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | pass | 3.5 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | pass | 4.1 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | pass | 3.8 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | pass | 3.9 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | pass | 4.0 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | pass | 3.8 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | pass | 3.7 s | — |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass | 0.0 s | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass | 0.0 s | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass | 0.4 s | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass | 0.5 s | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass | 0.2 s | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass | 0.4 s | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | pass | 0.7 s | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | pass | 0.7 s | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | pass | 2.7 s | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | pass | 1.9 s | — |
| DSR-PDO-002 | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 0.4 s | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | pass | 0.3 s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | pass | 0.4 s | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | pass | 3.7 s | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page | pass | 3.8 s | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | pass | 5.7 s | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | pass | 8.9 s | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | pass | 1.7 s | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | pass | 7.5 s | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | pass | 7.0 s | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | pass | 6.0 s | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | pass | 5.6 s | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent | pass | 6.2 s | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images | pass | 8.4 s | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | pass | 5.5 s | — |
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | pass | 10.9 s | — |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | pass | 9.0 s | — |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | pass | 9.3 s | — |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [ja] info bar date = meta publicationdate, format YYYY.MM.DD | pass | 8.5 s | — |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 4.8 s | — |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 4.3 s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [ja] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present | pass | 6.4 s | — |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 7.4 s | Error: category tag IDs  expect(received).toHaveLength(expected)  Expected length: 2 Received length: 1 Received array:  ["product"] |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | pass | 4.4 s | — |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | pass | 2.6 s | — |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | pass | 3.9 s | — |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 8.1 s | Error: viewAllStories href  expect(received).not.toMatch(expected)  Expected pattern: not /^(#?)$/ Received string:      "#" |
| DSR-ARTICLE-028 | DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link | pass | 2.2 s | — |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | pass | 2.4 s | — |
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | pass | 3.7 s | — |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | pass | 2.4 s | — |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | pass | 2.0 s | — |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [en] info bar date = meta publicationdate, format YYYY.MM.DD | pass | 2.7 s | — |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 2.4 s | — |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 3.0 s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [en] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present | pass | 3.7 s | — |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 10.5 s | Error: category tag IDs  expect(received).toHaveLength(expected)  Expected length: 2 Received length: 1 Received array:  ["product"] |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | pass | 2.3 s | — |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | pass | 2.4 s | — |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | pass | 2.4 s | — |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 8.0 s | Error: viewAllStories href  expect(received).not.toMatch(expected)  Expected pattern: not /^(#?)$/ Received string:      "#" |
| DSR-ARTICLE-028 | DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link | pass | 2.3 s | — |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | pass | 2.3 s | — |
| DSR-ARTICLE-015 | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | pass | 2.0 s | — |
| DSR-ARTICLE-020 | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | pass | 2.3 s | — |
| DSR-ARTICLE-025 | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | pass | 2.0 s | — |
| DSR-ARTICLE-009 | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | pass | 4.4 s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [ja] display name overrides page title | pass | 4.6 s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [en] display name overrides page title | pass | 4.2 s | — |
| DSR-BREAD-015 | DSR-BREAD-015 [ja] special characters in display name are plain text | pass | 3.6 s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [ja] each language uses its own display names | pass | 2.5 s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [en] each language uses its own display names | pass | 2.2 s | — |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement | pass | 5.1 s | — |
| DSR-BREAD-002 | DSR-BREAD-002 ancestor links | pass | 14.1 s | — |
| DSR-BREAD-003 | DSR-BREAD-003 current page is not linked | pass | 4.8 s | — |
| DSR-BREAD-004 | DSR-BREAD-004 HOME label and destination | pass | 4.9 s | — |
| DSR-BREAD-005 | DSR-BREAD-005 grandchild trail order | pass | 4.6 s | — |
| DSR-BREAD-006 | DSR-BREAD-006 parent trail | pass | 4.8 s | — |
| DSR-BREAD-007 | DSR-BREAD-007 missing intermediate page | pass | 1.1 s | — |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb | pass | 1.4 s | — |
| DSR-BREAD-009 | DSR-BREAD-009 404 excludes breadcrumb | pass | 1.8 s | — |
| DSR-BREAD-011 | DSR-BREAD-011 empty label uses title | pass | 2.4 s | — |
| DSR-BREAD-017 | DSR-BREAD-017 localized HOME destinations | pass | 2.3 s | — |
| DSR-BREAD-025 | DSR-BREAD-025 BreadcrumbList structured data | pass | 2.2 s | — |
| DSR-BREAD-027 | DSR-BREAD-027 semantic markup and accessibility | pass | 3.6 s | — |
| DSR-BREAD-028 | DSR-BREAD-028 keyboard navigation | pass | 3.3 s | — |
| DSR-BREAD-031 | DSR-BREAD-031 site-origin console errors | pass | 2.1 s | — |
| DSR-BREAD-035 | DSR-BREAD-035 arrow asset origin and status | pass | 2.6 s | — |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement | pass | 2.2 s | — |
| DSR-BREAD-005 | DSR-BREAD-005 grandchild trail order | pass | 4.8 s | — |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb | pass | 3.2 s | — |
| DSR-BREAD-017 | DSR-BREAD-017 localized HOME destinations | pass | 2.9 s | — |
| DSR-BREAD-025 | DSR-BREAD-025 BreadcrumbList structured data | pass | 2.4 s | — |
| DSR-ECO-001 | DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | pass | 3.1 s | — |
| DSR-ECO-003 | DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | pass | 21.7 s | — |
| DSR-ECO-005 | DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary | fail | 21.7 s | Error: tag label  expect(locator).not.toBeEmpty() failed  Locator: locator('main').locator('.hero, [class*="hero"]').first().locator('[class |
| DSR-ECO-006 | DSR-ECO-006 [ja] free editing area renders between hero and product list | fail | 32.8 s | Error: free area text  expect(locator).not.toBeEmpty() failed  Locator: locator('main').locator('[class*="free"], .default-content-wrapper') |
| DSR-ECO-012 | DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | pass | 1.8 s | — |
| DSR-ECO-013 | DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | pass | 2.2 s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | pass | 3.1 s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | fail | 28.7 s | Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 8  - Array [] |
| DSR-PLSP-003 | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | fail | 61.8 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | fail | 61.3 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | pass | 10.4 s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | pass | 6.2 s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | fail | 34.5 s | Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 6  - Array [] |
| DSR-PLSP-003 | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | fail | 61.2 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | fail | 61.0 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | pass | 9.9 s | — |
| DSR-PRODLIST-001 | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | fail | 7.6 s | Error: 375: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-002 | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | fail | 32.4 s | Error: 320: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-003 | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | fail | 21.2 s | Error: open: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-004 | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | fail | 23.7 s | Error: 1440: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 4 Received: 1 |
| DSR-TOP-004 | DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | fail | 15.1 s | Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not []  |
| DSR-TOP-005 | DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | fail | 14.7 s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equ |
| DSR-TOP-006 | DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | fail | 18.6 s | Error: page requests /ja/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/ja/news/query-index.json" |
| DSR-TOP-007 | DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | fail | 14.0 s | Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2 |
| DSR-TOP-008 | DSR-TOP-008 [ja] NEWS with empty query-index renders without error | pass | 6.9 s | — |
| DSR-TOP-009 | DSR-TOP-009 [ja] main visual image is eager and is the LCP element | pass | 7.2 s | — |
| DSR-TOP-004 | DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | fail | 10.8 s | Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not []  |
| DSR-TOP-005 | DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | fail | 8.6 s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equ |
| DSR-TOP-006 | DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | fail | 6.2 s | Error: page requests /en/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/en/news/query-index.json" |
| DSR-TOP-007 | DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | fail | 7.5 s | Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2 |
| DSR-TOP-008 | DSR-TOP-008 [en] NEWS with empty query-index renders without error | pass | 3.4 s | — |
| DSR-TOP-009 | DSR-TOP-009 [en] main visual image is eager and is the LCP element | pass | 4.0 s | — |
| SMOKE-001 | SMOKE-001 DSR-173 test page is reachable | pass | 0.6 s | — |

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
| DSR-VOV-004 [en] | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 [en] | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 [en] | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-010 [en] | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 [ja] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-016 [en] | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 [en] | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-538 [en] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [ja] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [en] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [ja] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
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
| DSR-PDO-006 [ja] | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 [ja] | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 [ja] | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-020 [ja] | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |
| DSR-ARTICLE-026 [ja] | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 [en] | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |
| DSR-BREAD-018 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-022 [-] | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 [-] | Run on STG (Lighthouse) |
| DSR-BREAD-030 [-] | DSR-536 / movie-detail placement |
| DSR-BREAD-033 [-] | Layout tickets |
| DSR-BREAD-034 [-] | DSR-536 / movie-detail placement |
| DSR-BREAD-001 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 [cn] | cn: no /master/cn (Issue #18) |
| DSR-ECO-002 [ja] | demo data (Ngọc 21/10) |
| DSR-ECO-004 [ja] | demo data (Ngọc 21/10) |
| DSR-ECO-001 [en] | en demo page not on DEV |
| DSR-ECO-002 [en] | en demo page not on DEV |
| DSR-ECO-004 [en] | en demo page not on DEV |
| DSR-ECO-007 [ja] | demo data (Ngọc 21/10) |
| DSR-ECO-010 [ja] | demo data (Ngọc 21/10) |
| DSR-ECO-005 [en] | DSR-590 page not on DEV |
| DSR-ECO-007 [en] | DSR-590 page not on DEV |
| DSR-ECO-010 [en] | DSR-590 page not on DEV |
| DSR-ECO-009 [ja] | demo data (Ngọc 21/10) |
| DSR-ECO-013 [en] | en demo page not on DEV |
| DSR-ECO-013 [cn] | cn: no /master/cn on DEV (Issue #18) |
| DSR-PRODLIST-003 [en] | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 [ja] | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |

## 6. Failed tests

All 32 failures were already `fail` in the ledger (REG-1200, JOB-23-13/-15). None is a NEW FAIL, all have cause `none`. Evidence = first-attempt screenshot, committed under `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/`. Traces and the `test-results/` / `playwright-report/` folders are not committed.

### DSR-CATDL-007 [ja] — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Expected vs actual: Error: gated PDF URL delivered to the browser before submit  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 3  - Array [] + Array [ +   "dsr-catalog-list response: 
- Proposed: fail · suspect `product` · cause `none` · confidence 70% · known: draft BUG-CAT-PDF-EXPOSE (DASHBOARD 🐞); DSR-655 Y4 client question
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-CATDL-007_ja.png`

### DSR-CATDL-016 [en] — DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Expected vs actual: Error: fixed texts containing Japanese  expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 44  - Array [] + Array [ +   "必須 + 氏名（姓）", +   "必須 + 氏名（名）", +   "必須 + メールアド
- Proposed: fail · suspect `product` · cause `none` · confidence 70% · known: draft BUG-CAT-FORM-EN (DASHBOARD 🐞)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-CATDL-016_en.png`

### DSR-CATOV-001 [ja] — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required" Received: "catalog pdf form" Timeout:
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form"), still after 669 migration
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-CATOV-001_ja.png`

### DSR-CATOV-001 [ja] — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form" Received: "catalog ebook form" Timeout:  50
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form"), still after 669 migration
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-CATOV-001_ja_2.png`

### DSR-CATOV-012 [ja] — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected vs actual: Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() Expected: visible Timeout: 5000ms Error: elemen
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: no list card 'QA190 PDF catalog' (TD-190 title not seeded); qa190-cat-pdf CF is in dsr-catalog-list
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-CATOV-012_ja.png`

### DSR-CATOV-001 [en] — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required" Received: "catalog pdf form" Timeout:
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form"), still after 669 migration
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-CATOV-001_en.png`

### DSR-CATOV-001 [en] — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form" Received: "catalog ebook form" Timeout:  50
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form"), still after 669 migration
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-CATOV-001_en_2.png`

### DSR-CATOV-012 [en] — DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected vs actual: Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() Expected: visible Timeout: 5000ms Error: elemen
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: no list card 'QA190 PDF catalog' (TD-190 title not seeded); qa190-cat-pdf CF is in dsr-catalog-list
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-CATOV-012_en.png`

### DSR-ARTICLE-012 [ja] — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:183`
- Expected vs actual: Error: category tag IDs  expect(received).toHaveLength(expected)  Expected length: 2 Received length: 1 Received array:  ["product"]
- Proposed: fail · suspect `data` · cause `none` · confidence 30% · known (JOB-23-06, IDLE-39): meta category has 1 tag ID ["product"], expected 2
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-ARTICLE-012_ja.png`

### DSR-ARTICLE-024 [ja] — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:244`
- Expected vs actual: Error: viewAllStories href  expect(received).not.toMatch(expected)  Expected pattern: not /^(#?)$/ Received string:      "#"
- Proposed: fail · suspect `product` · cause `none` · confidence 50% · known (IDLE-35/39): VIEW ALL STORIES href "#"
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-ARTICLE-024_ja.png`

### DSR-ARTICLE-012 [en] — DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:183`
- Expected vs actual: Error: category tag IDs  expect(received).toHaveLength(expected)  Expected length: 2 Received length: 1 Received array:  ["product"]
- Proposed: fail · suspect `data` · cause `none` · confidence 30% · known (JOB-23-06, IDLE-39): meta category has 1 tag ID ["product"], expected 2
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-ARTICLE-012_en.png`

### DSR-ARTICLE-024 [en] — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:244`
- Expected vs actual: Error: viewAllStories href  expect(received).not.toMatch(expected)  Expected pattern: not /^(#?)$/ Received string:      "#"
- Proposed: fail · suspect `product` · cause `none` · confidence 50% · known (IDLE-35/39): VIEW ALL STORIES href "#"
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-ARTICLE-024_en.png`

### DSR-ECO-005 [ja] — DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary

- Failing assertion: `tests/eco-products/DSR-590.eco-products.spec.ts:189`
- Expected vs actual: Error: tag label  expect(locator).not.toBeEmpty() failed  Locator: locator('main').locator('.hero, [class*="hero"]').first().locator('[class*="tag"]').first() Expected: not empty Timeout: 5000ms Error
- Proposed: fail · suspect `test` · cause `none` · confidence 30% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-ECO-005_ja.png`

### DSR-ECO-006 [ja] — DSR-ECO-006 [ja] free editing area renders between hero and product list

- Failing assertion: `tests/eco-products/DSR-590.eco-products.spec.ts:230`
- Expected vs actual: Error: free area text  expect(locator).not.toBeEmpty() failed  Locator: locator('main').locator('[class*="free"], .default-content-wrapper').first() Expected: not empty Timeout: 5000ms Error: element(
- Proposed: fail · suspect `test` · cause `none` · confidence 30% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-ECO-006_ja.png`

### DSR-PLSP-002 [ja] — DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected vs actual: Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 8  - Array [] + Array [ +   "", +   "", +   "", +   "", +   "", +   "", +
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 SP 2-column dismissed Not a bug 23/10 (KNOWN-FACTS) → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PLSP-002_ja.png`

### DSR-PLSP-003 [ja] — DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts (test timeout, no assertion location)`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated (timeout 30 s)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PLSP-003_ja.png`

### DSR-PLSP-005 [ja] — DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts (test timeout, no assertion location)`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated (timeout 30 s)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PLSP-005_ja.png`

### DSR-PLSP-002 [en] — DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected vs actual: Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 6  - Array [] + Array [ +   "", +   "", +   "", +   "", + ]
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 SP 2-column dismissed Not a bug 23/10 (KNOWN-FACTS) → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PLSP-002_en.png`

### DSR-PLSP-003 [en] — DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts (test timeout, no assertion location)`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated (timeout 30 s)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PLSP-003_en.png`

### DSR-PLSP-005 [en] — DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts (test timeout, no assertion location)`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated (timeout 30 s)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PLSP-005_en.png`

### DSR-PRODLIST-001 [ja] — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual: Error: 375: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PRODLIST-001_ja.png`

### DSR-PRODLIST-002 [ja] — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual: Error: 320: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PRODLIST-002_ja.png`

### DSR-PRODLIST-003 [ja] — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:70`
- Expected vs actual: Error: open: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PRODLIST-003_ja.png`

### DSR-PRODLIST-004 [ja] — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:153`
- Expected vs actual: Error: 1440: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 4 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; column-offset check returns 1 at 1440 (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-PRODLIST-004_ja.png`

### DSR-TOP-004 [ja] — DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual: Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not [] 
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-TOP-004_ja.png`

### DSR-TOP-005 [ja] — DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equality  Expected: true Received: false
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-TOP-005_ja.png`

### DSR-TOP-006 [ja] — DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual: Error: page requests /ja/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/ja/news/query-index.json" Received array: ["/query-index.json"]
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-TOP-006_ja.png`

### DSR-TOP-007 [ja] — DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual: Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-TOP-007_ja.png`

### DSR-TOP-004 [en] — DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual: Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not [] 
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-TOP-004_en.png`

### DSR-TOP-005 [en] — DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equality  Expected: true Received: false
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-TOP-005_en.png`

### DSR-TOP-006 [en] — DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual: Error: page requests /en/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/en/news/query-index.json" Received array: ["/query-index.json"]
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-TOP-006_en.png`

### DSR-TOP-007 [en] — DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual: Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/evidence/DSR-TOP-007_en.png`

## 7. Open points for QA

- Build SHAs a47274d / b33514f and "migration complete" come from CHANGES.md / KNOWN-FACTS (Martin 16:15 VN). I did not verify them independently. The Author-side steps (probe, models diff, manifest lint) were not run: they stay with JOB-20261023-11.
- `block:catalog-detail`: `catalog-detail.js` still shows Last-Modified 22 Oct 01:48:45 GMT, the same as JOB-23-15. The refactor is still not deployed on DEV `main`, so this run does not cover it. That CHANGES.md row should stay `no`.
- CF-model-669 classification rule (list/count diffs = `data`): not needed. No 557/583/654 list, query-index or sitemap test changed status. The 22 newly-live preview items did not break any count assertion. The expected not-live items behaved as expected: VOV-002 en / CATOV-009 en / PDO-002 ja passed (stub/404), the CATOV-002 en og:image sweep (.live, preview-only CF) was skipped. I did not run a separate check for `catalog/catalogid-01` ja 404 (no test targets it). It is in the dsr-catalog-list response.
- DSR-VOV-011/013 en passed on the first attempt (no retry needed), so I did not capture raw list JSON for them.
- DSR-583 PLSP/PRODLIST fails: DSR-583 SP 2-column was dismissed as Not a bug (KNOWN-FACTS 23/10), so these Expected values look outdated (`suspect: test`). The Claude-web TC owner should decide on fixme/Expected changes. I did not change any spec.
- Observation (no verdict) 671: `/ja/products/990586001` `related.productLabel` = `990586001` in both the persisted query and the overlay rows, not `{productId}｜{productName}`. The rendered page shows no ｜ label (h1 "QA586 product A"). It is not verified whether productLabel is computed at save time (old CF not re-saved) or is still pending.
- Observation 671: `dsr-catalog-page` contains `hubspotFormId` (null) and `promoText` (null). `dsr-catalog-list` contains neither. `relatedMoodboards` is absent from catalog-page, catalog-list and product-page.
- Observation 670: `dsr-techmovie-page;path=/content/dam/dsr/{ja,en}/movies/tech/…` → HTTP 200 `{"data":{"inactive":{"items":[]},"related":{"items":[]}}}`, which is the expected empty result (DEV has no tech talks). Without `path` → 200 with a GraphQL ValidationError (path NonNull).
- Observation DSR-667: at 393/390/375 px (.live and .page), the 11 dots wrap to 2 rows, dot 9 is clipped 0 px and clears the next button by 58.5/57/49.5 px. JOB-23-12 measured 1/4/19 px clipping and 39/36/21 px clearance with a single row. eco-carousel.css Last-Modified moved from 03:25:30Z to 07:21:26Z. This matches Dat's 14:20 VN retest (Done). Raw data: `observations.json`. I did not commit screenshots (lane rule).
- Side effect: the DSR-552 spec rewrites tracked PNGs under `evidence/DSR-552/DEV/*_pass.png`. I reverted them so they stay out of this commit.
