# REGRESSION DEV automation run — 20261023-reg2020

Job: `JOB-ZY-REG-20261023-2020-claude-code` (R3 full S12, P1 + P2; odd slot 20:20). Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. Publish side only: no Author, no login, no form submit, no AEM writes.

## 1. Header

- Run start (UTC): 2026-10-23T13:25:53Z
- Run end (UTC): 2026-10-23T13:45:13Z (overlay 13:25:53Z → 13:33:01Z; P1+P2 non-overlay `@auto` 13:33:01Z → 13:43:27Z; smoke + 664 + 173 13:43:28Z → 13:45:13Z)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` where a test says so); persisted queries on publish-p192812-e2014374
- Target page(s): all pages used by the specs in §3 (overlay video/product/catalog + overlay SEO, catalog/video lists, product list, catalog download, breadcrumb, TOP, article 529, news 566, video block 664, movie detail 173, eco 590, icons 589, product CF 585, smoke)
- Build under test: not independently verified (no dev repo access). File headers observed at ~13:26Z, identical on `.live` and `.page`: `scripts/scripts.js` Last-Modified Mon, 19 Oct 2026 03:10:29 GMT (ETag 53efa556…); `styles/styles.css` Fri, 09 Oct 2026 01:34:56 GMT (b22adbb6…); `blocks/header/header.js` Wed, 30 Sep 2026 05:35:24 GMT (4a5ef25f…); `eco-carousel.js` Mon, 19 Oct 2026 04:43:32 GMT (b6a6184d…); `eco-carousel.css` Fri, 23 Oct 2026 07:21:26 GMT (d1d7c97a…). Per README §7 these headers alone do not prove that nothing was deployed.
- Baseline ID: Regression S12 R3; overlay BL-OVL-1; ledger `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = REG-1620; P2 589/173/566/664 keys from REG-1200)
- Automation HEAD commit SHA: 0fcf93807789060155fff5b4cc10410ea1161e1b (no code changes in this job)
- Exact command used (3 runs in sequence; Playwright cleans `test-results/` per run, so each run's artifacts were copied to /tmp before the next):

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg2020cc/overlay.json npm run test:dev:overlay -- --reporter=list,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg2020cc/b.json ENV=dev npx playwright test tests/breadcrumb/DSR-552.breadcrumb.spec.ts tests/top/ tests/catalog-video/ tests/product-list/ tests/catalog-download/ tests/article-detail/DSR-529.article-detail.spec.ts tests/news-detail/DSR-566.news-detail.spec.ts tests/eco-products/DSR-590.eco-products.spec.ts tests/icons/ tests/product-cf/ --project=chromium --grep @auto --grep-invert "@manual|@blocked|@overlay" --reporter=list,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg2020cc/c.json ENV=dev npx playwright test tests/smoke.spec.ts tests/video-block/ tests/movie-detail/DSR-173.movie-detail.spec.ts --project=chromium --grep-invert "@manual|@blocked|@overlay" --reporter=list,json
```

Run 2 excludes `@overlay` because those tests already ran in run 1. Run 3 has no `--grep @auto`: `smoke.spec.ts`, `video-block/DSR-664.*` and `movie-detail/DSR-173.*` carry no `@auto` tag (a `@auto` filter would select 0 tests). They have no `@manual`/`@blocked` tag either, so they ran as listed by the job. This matches how REG-1620 ran smoke and REG-1200 ran 173. Postprocessing: `finish.py`, `write_outputs.py`, `gen_report.py`, `repng.py`, `observe.cjs` in `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/`.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| overlay (`@overlay`) | 257 | 208 | 8 | 41 | 1 | 2 | configured 1; 8 retries (all failed again) | 7.1 min |
| P1 + P2 non-overlay `@auto` | 157 | 66 | 26 | 65 | 1 | 2 | configured 1; 26 retries (all failed again) | 10.4 min |
| smoke + 664 + 173 (untagged) | 47 | 13 | 5 | 29 | 1 | 2 | configured 1; 5 retries (all failed again) | 1.7 min |
| **Total** | **461** | **287** | **39** | **135** | – | – | 39 | ~19 min |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms. Browser: chromium only (`--project=chromium` in runs 2–3; in run 1 the firefox/webkit projects only match DSR-BREAD-032, which has no `@overlay` tag, so they ran nothing). Flaky outcomes: 0.

Per spec: 654 49/6/3 · 587 overlay 15/0/8 · overlay-seo 65/0/1 · 586 17/0/4 · 570 12/2/2 · 552 26/0/11 · 609 4/8/0 · 557 38/0/0 · 583 4/10/2 · 529 28/4/4 · 566 0/0/24 · 590 4/2/13 · 589 0/2/13 · 585 8/0/17 · 664 7/0/1 · 173 5/5/28 · smoke 1/0/0 (pass/fail/skip). `npm run test:dev:overlay` also picked up the 2 `*retest*` specs (8 tests: 4 pass, 4 skip); they are listed below but excluded from the ledger (README §1). Not run: P3, `analysis/`, `*capture*`, visual specs.

**Ledger comparison:** 341 TC/lang keys, **0 status changes, 0 NEW FAIL**. Six ledger keys produced no test in this run, the same as in REG-1620 (`DSR-ARTICLE-023 [ja]`, `DSR-CATOV-013 [en]`, `DSR-CATOV-020 [ja/en]`, and the 2 `DSR-538-retest` keys, which are out of scope). Their ledger rows were left unchanged.

## 4. Executed tests

Duration = summed attempts. Fail = failed on first attempt and on the retry. Retest specs are marked (excluded from the ledger).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 [ja] | DSR-CATDL-001 [ja] catalog detail header renders | pass | 7.0 s | — |
| DSR-CATDL-002 [ja] | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | pass | 3.9 s | — |
| DSR-CATDL-005 [ja] | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | pass | 4.2 s | — |
| DSR-CATDL-006 [ja] | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | pass | 4.8 s | — |
| DSR-CATDL-018 [ja] | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | pass | 7.7 s | — |
| DSR-CATDL-001 [en] | DSR-CATDL-001 [en] catalog detail header renders | pass | 4.1 s | — |
| DSR-CATDL-002 [en] | DSR-CATDL-002 [en] download form fields, labels, consent and button present | pass | 4.8 s | — |
| DSR-CATDL-005 [en] | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | pass | 3.6 s | — |
| DSR-CATDL-006 [en] | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | pass | 4.6 s | — |
| DSR-CATDL-018 [en] | DSR-CATDL-018 [en] e-book form card links to the detail page with the form | pass | 6.5 s | — |
| DSR-CATDL-003 [ja] | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | pass | 4.3 s | — |
| DSR-CATDL-007 [ja] | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | fail | 18.6 s | Error: gated PDF URL delivered to the browser before submit  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received |
| DSR-CATDL-010 [ja] | DSR-CATDL-010 [ja] catalog ID handed to the form | pass | 5.8 s | — |
| DSR-CATDL-016 [en] | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | fail | 7.6 s | Error: fixed texts containing Japanese  expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 44  - Array [] + |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 5.8 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.9 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 1.1 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap | pass | 2.0 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 17.0 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.2 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.2 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 2.0 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 11.0 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.1 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 1.2 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap | pass | 1.4 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 15.6 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.3 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.3 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 1.6 s | — |
| DSR-CATOV-004 [ja] | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | pass | 1.7 s | — |
| DSR-CATOV-005 [ja] | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 5.9 s | — |
| DSR-CATOV-007 [ja] | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | pass | 2.3 s | — |
| DSR-CATOV-008 [ja] | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 5.2 s | — |
| DSR-CATOV-012 [ja] | DSR-CATOV-012 [ja] catalog list card links to the overlay page | fail | 24.5 s | Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog |
| DSR-CATOV-015 [ja] | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 6.8 s | — |
| DSR-CATOV-016 [ja] | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 4.2 s | — |
| DSR-CATOV-017 [ja] | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 8.2 s | — |
| DSR-CATOV-019 [ja] | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 5.5 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 5.8 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.8 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 1.3 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap | pass | 1.3 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 14.6 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.6 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 0.4 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 7.1 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.4 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap | pass | 0.4 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 12.1 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.5 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 0.4 s | — |
| DSR-CATOV-004 [en] | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | pass | 0.1 s | — |
| DSR-CATOV-005 [en] | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 3.8 s | — |
| DSR-CATOV-006 [en] | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | pass | 0.3 s | — |
| DSR-CATOV-007 [en] | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | pass | 0.8 s | — |
| DSR-CATOV-008 [en] | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 2.7 s | — |
| DSR-CATOV-012 [en] | DSR-CATOV-012 [en] catalog list card links to the overlay page | fail | 20.1 s | Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog |
| DSR-CATOV-015 [en] | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 7.1 s | — |
| DSR-CATOV-016 [en] | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 5.1 s | — |
| DSR-CATOV-017 [en] | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 8.8 s | — |
| DSR-CATOV-019 [en] | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 5.7 s | — |
| DSR-CATOV-009 [en] | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 1.6 s | — |
| DSR-CATOV-010 [en] | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | pass | 7.0 s | — |
| DSR-CATOV-011 [en] | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | pass | 1.4 s | — |
| DSR-CATOV-014 [en] | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | pass | 5.8 s | — |
| DSR-CATV-012 [ja] | DSR-CATV-012 catalog item shows thumbnail and title | pass | 7.4 s | — |
| DSR-CATV-013 [ja] | DSR-CATV-013 PDF item without form opens in a new tab | pass | 10.0 s | — |
| DSR-CATV-016 [ja] | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 10.1 s | — |
| DSR-CATV-017 [ja] | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | pass | 5.9 s | — |
| DSR-CATV-018 [ja] | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 5.3 s | — |
| DSR-CATV-019 [ja] | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 4.1 s | — |
| DSR-CATV-020 [ja] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 4.0 s | — |
| DSR-CATV-012 [en] | DSR-CATV-012 catalog item shows thumbnail and title | pass | 8.2 s | — |
| DSR-CATV-013 [en] | DSR-CATV-013 PDF item without form opens in a new tab | pass | 9.0 s | — |
| DSR-CATV-016 [en] | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 7.7 s | — |
| DSR-CATV-017 [en] | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | pass | 5.2 s | — |
| DSR-CATV-018 [en] | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 4.9 s | — |
| DSR-CATV-019 [en] | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 2.6 s | — |
| DSR-CATV-020 [en] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 2.5 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | pass | 2.7 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | pass | 2.3 s | — |
| DSR-CATV-002 [ja] | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | pass | 2.5 s | — |
| DSR-CATV-006 [ja] | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 2.0 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | pass | 1.9 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | pass | 2.0 s | — |
| DSR-CATV-002 [ja] | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | pass | 1.8 s | — |
| DSR-CATV-006 [ja] | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 1.9 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | pass | 1.6 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | pass | 1.9 s | — |
| DSR-CATV-002 [en] | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | pass | 2.3 s | — |
| DSR-CATV-006 [en] | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 1.8 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | pass | 1.5 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | pass | 2.0 s | — |
| DSR-CATV-002 [en] | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | pass | 1.0 s | — |
| DSR-CATV-006 [en] | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 1.9 s | — |
| DSR-CATV-003 [ja] | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | pass | 2.4 s | — |
| DSR-CATV-007 [ja] | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 4.1 s | — |
| DSR-CATV-003 [ja] | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | pass | 2.6 s | — |
| DSR-CATV-007 [ja] | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 3.9 s | — |
| DSR-CATV-003 [en] | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | pass | 2.2 s | — |
| DSR-CATV-007 [en] | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 3.9 s | — |
| DSR-CATV-003 [en] | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | pass | 5.4 s | — |
| DSR-CATV-007 [en] | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 8.3 s | — |
| DSR-VOV-001 [ja] | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | pass | 4.0 s | — |
| DSR-VOV-001 [en] | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | pass | 4.1 s | — |
| DSR-VOV-002 [en] | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 1.7 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | pass | 7.0 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | pass | 8.9 s | — |
| DSR-VOV-007 [ja] | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | pass | 5.6 s | — |
| DSR-VOV-007 [en] | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | pass | 5.5 s | — |
| DSR-VOV-008 [en] | DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list | pass | 5.8 s | — |
| DSR-VOV-011 [ja] | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | 3.6 s | — |
| DSR-VOV-011 [en] | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | 4.1 s | — |
| DSR-VOV-013 [en] | DSR-VOV-013 [en] movie list shows standard movies only | pass | 3.3 s | — |
| DSR-VOV-014 [en] | DSR-VOV-014 [en] related movies max 5 when 6 are linked | pass | 3.4 s | — |
| DSR-VOV-015 [en] | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | pass | 3.4 s | — |
| DSR-VOV-018 [ja] | DSR-VOV-018 [ja] language variant: 200, html lang, title | pass | 3.3 s | — |
| DSR-VOV-018 [en] | DSR-VOV-018 [en] language variant: 200, html lang, title | pass | 3.0 s | — |
| DSR-501-P3 [en] (retest) | DSR-501-P3 [en] related movies are max 5, newest updated first | pass | 7.8 s | — |
| DSR-501-P2 [en] (retest) | DSR-501-P2 [en] unavailable related movie is not displayed | pass | 6.8 s | — |
| DSR-538 [en] (retest) | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | pass | 6.9 s | — |
| DSR-538 [en] (retest) | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | pass | 6.8 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | pass | 0.9 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | pass | 1.0 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | pass | 1.1 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | pass | 1.0 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | pass | 1.0 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | pass | 0.9 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | pass | 0.9 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | pass | 0.8 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | pass | 0.9 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | pass | 0.8 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | pass | 1.1 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | pass | 1.0 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | pass | 0.8 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | pass | 0.9 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | pass | 1.0 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a | pass | 1.7 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a | pass | 0.9 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b | pass | 0.9 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b | pass | 1.0 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam | pass | 0.9 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam | pass | 1.0 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main | pass | 0.9 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main | pass | 0.9 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off | pass | 1.0 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off | pass | 0.8 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 | pass | 2.1 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 | pass | 1.7 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 | pass | 1.9 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 | pass | 1.9 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 | pass | 1.9 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 | pass | 2.8 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 | pass | 1.6 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 | pass | 1.5 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 | pass | 1.8 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 | pass | 1.6 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 | pass | 1.1 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 | pass | 1.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a | pass | 1.5 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a | pass | 1.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b | pass | 1.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b | pass | 1.4 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | pass | 1.1 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | pass | 1.2 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | pass | 2.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | pass | 1.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | pass | 1.5 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | pass | 1.2 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | pass | 1.2 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | pass | 1.2 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | pass | 0.4 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam | pass | 1.6 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam | pass | 1.1 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main | pass | 1.2 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main | pass | 1.3 s | — |
| DSR-CATOV-005 [ja] | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | pass | 1.1 s | — |
| DSR-CATOV-005 [ja] | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | pass | 1.3 s | — |
| DSR-CATOV-005 [en] | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | pass | 0.9 s | — |
| DSR-CATOV-005 [en] | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | pass | 1.0 s | — |
| DSR-VOV-007 [ja] | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | pass | 1.2 s | — |
| DSR-VOV-007 [ja] | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | pass | 1.5 s | — |
| DSR-VOV-007 [en] | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | pass | 1.2 s | — |
| DSR-VOV-007 [en] | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | pass | 1.1 s | — |
| DSR-VOV-008 [en] | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | pass | 1.0 s | — |
| DSR-VOV-008 [en] | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | pass | 1.3 s | — |
| DSR-PCF-007 [ja] | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass | 0.0 s | — |
| DSR-PCF-007 [en] | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass | 0.0 s | — |
| DSR-PCF-016 [ja] | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass | 0.6 s | — |
| DSR-PCF-016 [en] | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass | 0.5 s | — |
| DSR-PCF-017 [ja] | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass | 0.3 s | — |
| DSR-PCF-017 [en] | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass | 0.4 s | — |
| DSR-PCF-019 [ja] | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | pass | 0.9 s | — |
| DSR-PCF-019 [en] | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | pass | 0.8 s | — |
| DSR-PDO-001 [ja] | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | pass | 5.3 s | — |
| DSR-PDO-001 [en] | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | pass | 6.3 s | — |
| DSR-PDO-002 [ja] | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 1.6 s | — |
| DSR-PDO-003 [ja] | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | pass | 1.7 s | — |
| DSR-PDO-003 [en] | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | pass | 1.3 s | — |
| DSR-PDO-004 [ja] | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | pass | 5.0 s | — |
| DSR-PDO-005 [ja] | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page | pass | 4.9 s | — |
| DSR-PDO-008 [ja] | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | pass | 7.2 s | — |
| DSR-PDO-009 [ja] | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | pass | 6.5 s | — |
| DSR-PDO-012 [ja] | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | pass | 0.5 s | — |
| DSR-PDO-013 [ja] | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | pass | 4.5 s | — |
| DSR-PDO-013 [en] | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | pass | 4.2 s | — |
| DSR-PDO-014 [ja] | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | pass | 2.6 s | — |
| DSR-PDO-014 [en] | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | pass | 2.6 s | — |
| DSR-PDO-017 [ja] | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent | pass | 3.2 s | — |
| DSR-PDO-021 [ja] | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images | pass | 5.7 s | — |
| DSR-PDO-019 [ja] | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | pass | 3.0 s | — |
| DSR-ARTICLE-002 [ja] | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | pass | 6.6 s | — |
| DSR-ARTICLE-003 [ja] | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | pass | 4.6 s | — |
| DSR-ARTICLE-006 [ja] | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | pass | 4.4 s | — |
| DSR-ARTICLE-007 [ja] | DSR-ARTICLE-007 [ja] info bar date = meta publicationdate, format YYYY.MM.DD | pass | 4.6 s | — |
| DSR-ARTICLE-008 [ja] | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 5.0 s | — |
| DSR-ARTICLE-010 [ja] | DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 4.6 s | — |
| DSR-ARTICLE-011 [ja] | DSR-ARTICLE-011 [ja] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present | pass | 7.5 s | — |
| DSR-ARTICLE-012 [ja] | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 11.8 s | Error: category tag IDs  expect(received).toHaveLength(expected)  Expected length: 2 Received length: 1 Received array:  ["product"] |
| DSR-ARTICLE-013 [ja] | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | pass | 5.3 s | — |
| DSR-ARTICLE-014 [ja] | DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | pass | 5.7 s | — |
| DSR-ARTICLE-016 [ja] | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | pass | 5.8 s | — |
| DSR-ARTICLE-024 [ja] | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 12.2 s | Error: viewAllStories href  expect(received).not.toMatch(expected)  Expected pattern: not /^(#?)$/ Received string:      "#" |
| DSR-ARTICLE-028 [ja] | DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link | pass | 4.9 s | — |
| DSR-ARTICLE-029 [ja] | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | pass | 5.1 s | — |
| DSR-ARTICLE-002 [en] | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | pass | 5.6 s | — |
| DSR-ARTICLE-003 [en] | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | pass | 5.1 s | — |
| DSR-ARTICLE-006 [en] | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | pass | 6.0 s | — |
| DSR-ARTICLE-007 [en] | DSR-ARTICLE-007 [en] info bar date = meta publicationdate, format YYYY.MM.DD | pass | 2.9 s | — |
| DSR-ARTICLE-008 [en] | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 2.6 s | — |
| DSR-ARTICLE-010 [en] | DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 2.3 s | — |
| DSR-ARTICLE-011 [en] | DSR-ARTICLE-011 [en] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present | pass | 2.8 s | — |
| DSR-ARTICLE-012 [en] | DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 7.4 s | Error: category tag IDs  expect(received).toHaveLength(expected)  Expected length: 2 Received length: 1 Received array:  ["product"] |
| DSR-ARTICLE-013 [en] | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | pass | 2.5 s | — |
| DSR-ARTICLE-014 [en] | DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | pass | 2.6 s | — |
| DSR-ARTICLE-016 [en] | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | pass | 2.6 s | — |
| DSR-ARTICLE-024 [en] | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 8.5 s | Error: viewAllStories href  expect(received).not.toMatch(expected)  Expected pattern: not /^(#?)$/ Received string:      "#" |
| DSR-ARTICLE-028 [en] | DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link | pass | 2.7 s | — |
| DSR-ARTICLE-029 [en] | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | pass | 2.7 s | — |
| DSR-ARTICLE-015 [ja] | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | pass | 5.7 s | — |
| DSR-ARTICLE-020 [ja] | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | pass | 3.2 s | — |
| DSR-ARTICLE-025 [ja] | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | pass | 2.4 s | — |
| DSR-ARTICLE-009 [ja] | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | pass | 6.8 s | — |
| DSR-BREAD-010 [ja] | DSR-BREAD-010 [ja] display name overrides page title | pass | 4.4 s | — |
| DSR-BREAD-010 [en] | DSR-BREAD-010 [en] display name overrides page title | pass | 4.2 s | — |
| DSR-BREAD-015 [ja] | DSR-BREAD-015 [ja] special characters in display name are plain text | pass | 3.5 s | — |
| DSR-BREAD-018 [ja] | DSR-BREAD-018 [ja] each language uses its own display names | pass | 2.3 s | — |
| DSR-BREAD-018 [en] | DSR-BREAD-018 [en] each language uses its own display names | pass | 2.0 s | — |
| DSR-BREAD-001 [ja] | DSR-BREAD-001 child trail and placement | pass | 3.0 s | — |
| DSR-BREAD-002 [ja] | DSR-BREAD-002 ancestor links | pass | 11.7 s | — |
| DSR-BREAD-003 [ja] | DSR-BREAD-003 current page is not linked | pass | 2.3 s | — |
| DSR-BREAD-004 [ja] | DSR-BREAD-004 HOME label and destination | pass | 2.6 s | — |
| DSR-BREAD-005 [ja] | DSR-BREAD-005 grandchild trail order | pass | 2.7 s | — |
| DSR-BREAD-006 [ja] | DSR-BREAD-006 parent trail | pass | 2.6 s | — |
| DSR-BREAD-007 [ja] | DSR-BREAD-007 missing intermediate page | pass | 1.4 s | — |
| DSR-BREAD-008 [ja] | DSR-BREAD-008 HOME excludes breadcrumb | pass | 2.3 s | — |
| DSR-BREAD-009 [ja] | DSR-BREAD-009 404 excludes breadcrumb | pass | 1.8 s | — |
| DSR-BREAD-011 [ja] | DSR-BREAD-011 empty label uses title | pass | 2.5 s | — |
| DSR-BREAD-017 [ja] | DSR-BREAD-017 localized HOME destinations | pass | 2.4 s | — |
| DSR-BREAD-025 [ja] | DSR-BREAD-025 BreadcrumbList structured data | pass | 2.3 s | — |
| DSR-BREAD-027 [ja] | DSR-BREAD-027 semantic markup and accessibility | pass | 3.9 s | — |
| DSR-BREAD-028 [ja] | DSR-BREAD-028 keyboard navigation | pass | 3.6 s | — |
| DSR-BREAD-031 [ja] | DSR-BREAD-031 site-origin console errors | pass | 2.6 s | — |
| DSR-BREAD-035 [ja] | DSR-BREAD-035 arrow asset origin and status | pass | 3.1 s | — |
| DSR-BREAD-001 [en] | DSR-BREAD-001 child trail and placement | pass | 2.4 s | — |
| DSR-BREAD-005 [en] | DSR-BREAD-005 grandchild trail order | pass | 3.1 s | — |
| DSR-BREAD-008 [en] | DSR-BREAD-008 HOME excludes breadcrumb | pass | 2.3 s | — |
| DSR-BREAD-017 [en] | DSR-BREAD-017 localized HOME destinations | pass | 2.9 s | — |
| DSR-BREAD-025 [en] | DSR-BREAD-025 BreadcrumbList structured data | pass | 2.8 s | — |
| DSR-ECO-001 [ja] | DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | pass | 3.3 s | — |
| DSR-ECO-003 [ja] | DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | pass | 22.0 s | — |
| DSR-ECO-005 [ja] | DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary | fail | 21.8 s | Error: tag label  expect(locator).not.toBeEmpty() failed  Locator: locator('main').locator('.hero, [class*="hero"]').first().locator('[class |
| DSR-ECO-006 [ja] | DSR-ECO-006 [ja] free editing area renders between hero and product list | fail | 34.5 s | Error: free area text  expect(locator).not.toBeEmpty() failed  Locator: locator('main').locator('[class*="free"], .default-content-wrapper') |
| DSR-ECO-012 [ja] | DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | pass | 2.2 s | — |
| DSR-ECO-013 [ja] | DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | pass | 2.7 s | — |
| DSR-ICON-006 [ja] | DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error | fail | 14.7 s | Error: console errors  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 3  - Array [] + Array [ +   "Faile |
| DSR-ICON-006 [en] | DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error | fail | 12.0 s | Error: console errors  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 3  - Array [] + Array [ +   "Faile |
| DSR-PLSP-001 [ja] | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | pass | 4.3 s | — |
| DSR-PLSP-002 [ja] | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | fail | 31.9 s | Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 8  - Array [] |
| DSR-PLSP-003 [ja] | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | fail | 63.1 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 [ja] | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | fail | 61.6 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 [ja] | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | pass | 10.8 s | — |
| DSR-PLSP-001 [en] | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | pass | 4.3 s | — |
| DSR-PLSP-002 [en] | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | fail | 37.5 s | Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 6  - Array [] |
| DSR-PLSP-003 [en] | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | fail | 61.1 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 [en] | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | fail | 61.0 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 [en] | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | pass | 8.8 s | — |
| DSR-PRODLIST-001 [ja] | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | fail | 8.5 s | Error: 375: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-002 [ja] | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | fail | 28.8 s | Error: 320: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-003 [ja] | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | fail | 28.0 s | Error: open: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-004 [ja] | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | fail | 28.6 s | Error: 1440: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 4 Received: 1 |
| DSR-TOP-004 [ja] | DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | fail | 8.6 s | Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not []  |
| DSR-TOP-005 [ja] | DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | fail | 8.6 s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equ |
| DSR-TOP-006 [ja] | DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | fail | 7.3 s | Error: page requests /ja/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/ja/news/query-index.json" |
| DSR-TOP-007 [ja] | DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | fail | 12.0 s | Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2 |
| DSR-TOP-008 [ja] | DSR-TOP-008 [ja] NEWS with empty query-index renders without error | pass | 5.2 s | — |
| DSR-TOP-009 [ja] | DSR-TOP-009 [ja] main visual image is eager and is the LCP element | pass | 5.0 s | — |
| DSR-TOP-004 [en] | DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | fail | 8.8 s | Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not []  |
| DSR-TOP-005 [en] | DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | fail | 10.3 s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equ |
| DSR-TOP-006 [en] | DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | fail | 8.5 s | Error: page requests /en/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/en/news/query-index.json" |
| DSR-TOP-007 [en] | DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | fail | 7.7 s | Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2 |
| DSR-TOP-008 [en] | DSR-TOP-008 [en] NEWS with empty query-index renders without error | pass | 3.9 s | — |
| DSR-TOP-009 [en] | DSR-TOP-009 [en] main visual image is eager and is the LCP element | pass | 4.2 s | — |
| DSR-MOVIE-012 [en] | DSR-MOVIE-012 [en] displays the exact movie title | pass | 2.3 s | — |
| DSR-MOVIE-014 [en] | DSR-MOVIE-014 [en] embeds the configured YouTube movie | fail | 15.1 s | Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-player-facade') Expected: visible Timeout: 5000ms Error: ele |
| DSR-MOVIE-036 | DSR-MOVIE-036 no site-origin console errors on the movie component page | pass | 1.3 s | — |
| DSR-MOVIE-026 | DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | fail | 18.2 s | Error: Related card 1 thumbnail  expect(locator).toBeVisible() failed  Locator: getByTestId('related-content-card').first().getByTestId('rel |
| DSR-MOVIE-027 [en] | DSR-MOVIE-027 [en] outputs exactly one title and og:title | pass | 1.7 s | — |
| DSR-MOVIE-029 | DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | pass | 1.5 s | — |
| DSR-MOVIE-033 | DSR-MOVIE-033 displays component sections in vertical order on PC | fail | 13.7 s | Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-player') Expected: visible Timeout: 5000ms Error: element(s) |
| DSR-MOVIE-034 | DSR-MOVIE-034 displays the component back control | pass | 1.6 s | — |
| DSR-501-P3 [en] | DSR-501-P3 [en] related movies are limited to 5 in authored order | fail | 14.2 s | Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-related-content') Expected: visible Timeout: 5000ms Error: e |
| DSR-501-P2 [en] | DSR-501-P2 [en] unavailable related movie is not displayed | fail | 16.6 s | Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-related-content') Expected: visible Timeout: 5000ms Error: e |
| SMOKE-001 DSR-173 test page is reachable | SMOKE-001 DSR-173 test page is reachable | pass | 0.6 s | — |
| DSR-VCAP-001 [en] | DSR-VCAP-001 [en] live: authored video block with empty caption shows no "null" text | pass | 4.5 s | — |
| DSR-VCAP-001 [en] | DSR-VCAP-001 [en] page: authored video block with empty caption shows no "null" text | pass | 3.1 s | — |
| DSR-VCAP-002 [en] | DSR-VCAP-002 [en] page: booth TOP code-built video block shows no "null" text | pass | 2.5 s | — |
| DSR-VCAP-003 [en] | DSR-VCAP-003 [en] live: video detail player area shows no "null" text (control) | pass | 1.4 s | — |
| DSR-VCAP-003 [en] | DSR-VCAP-003 [en] page: video detail player area shows no "null" text (control) | pass | 1.4 s | — |
| DSR-VCAP-004 [en] | DSR-VCAP-004 [en] live: product detail shows no "null" text (control) | pass | 1.4 s | — |
| DSR-VCAP-004 [en] | DSR-VCAP-004 [en] page: product detail shows no "null" text (control) | pass | 1.7 s | — |

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
| DSR-538 [en] (retest) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [ja] (retest) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [en] (retest) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538 [ja] (retest) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
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
| DSR-BREAD-022 | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 | Run on STG (Lighthouse) |
| DSR-BREAD-030 | DSR-536 / movie-detail placement |
| DSR-BREAD-033 | Layout tickets |
| DSR-BREAD-034 | DSR-536 / movie-detail placement |
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
| DSR-ICON-001 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 [ja] | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-001 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 [en] | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-005 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-007 [ja] | blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 [ja] | blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 [ja] | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 [en] | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-NEWS-001 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-002 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-003 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-004 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-006 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-007 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-008 [en] | TC 8.0 is ja only |
| DSR-NEWS-009 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-010 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-012 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-013 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-018 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-001 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-002 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-003 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-004 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-006 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-007 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-008 [ja] | Blocked – page under test is not under /ja/news/ (needs TD-566-03) |
| DSR-NEWS-009 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-010 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-012 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-013 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-018 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-PRODLIST-003 [en] | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 [ja] | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-MOVIE-020 | Issue #1: related products specification pending |
| DSR-MOVIE-021 | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023 | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025 | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 | Description line-break separator is unconfirmed |
| DSR-MOVIE-001 | B: page auto-generation not implemented |
| DSR-MOVIE-002 | B: page auto-generation not implemented |
| DSR-MOVIE-003 | B: page auto-generation not implemented |
| DSR-MOVIE-004 | M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005 | B: page auto-generation not implemented |
| DSR-MOVIE-006 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011 | B: page auto-generation not implemented |
| DSR-MOVIE-013 | C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015 | C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016 | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017 | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018 | B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019 | C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022 | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024 | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030 | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 | B: page auto-generation not implemented |
| DSR-MOVIE-032 | B: ja/zh pages not available |
| DSR-MOVIE-035 | B: SP design pending |
| DSR-VCAP-002 [en] | live /en/product/application/fashion/fashion returns 404 (not published on this host) |

## 6. Failed tests

All 39 failing tests (37 TC/lang keys) were already `fail` in the ledger (REG-1620 for P1/529/585/590; REG-1200 for 589/173). None is a NEW FAIL; all have cause `none`. Evidence = one first-attempt screenshot per TC/lang (losslessly recompressed), committed under `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/`. Traces, `test-results/` and `playwright-report/` are not committed.

### DSR-CATDL-007 [ja] — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Expected vs actual: Error: gated PDF URL delivered to the browser before submit  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 3  - Array [] + Array [ +   "dsr-catalog-list response: 
- Proposed: fail · suspect `product` · cause `none` · confidence 70% · known: draft BUG-CAT-PDF-EXPOSE (DASHBOARD 🐞); DSR-655 Y4 client question
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-CATDL-007_ja.png`

### DSR-CATDL-016 [en] — DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Expected vs actual: Error: fixed texts containing Japanese  expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 44  - Array [] + Array [ +   "必須 + 氏名（姓）", +   "必須 + 氏名（名）", +   "必須 + メールアド
- Proposed: fail · suspect `product` · cause `none` · confidence 70% · known: draft BUG-CAT-FORM-EN (DASHBOARD 🐞)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-CATDL-016_en.png`

### DSR-CATOV-001 [ja] — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required" Received: "catalog pdf form" Timeout:
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-CATOV-001_ja.png`

### DSR-CATOV-001 [ja] — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form" Received: "catalog ebook form" Timeout:  50
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-CATOV-001_ja.png`

### DSR-CATOV-012 [ja] — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected vs actual: Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() Expected: visible Timeout: 5000ms Error: elemen
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: no list card 'QA190 PDF catalog' (TD-190 title not seeded)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-CATOV-012_ja.png`

### DSR-CATOV-001 [en] — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required" Received: "catalog pdf form" Timeout:
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-CATOV-001_en.png`

### DSR-CATOV-001 [en] — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form" Received: "catalog ebook form" Timeout:  50
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-CATOV-001_en.png`

### DSR-CATOV-012 [en] — DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected vs actual: Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() Expected: visible Timeout: 5000ms Error: elemen
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: no list card 'QA190 PDF catalog' (TD-190 title not seeded)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-CATOV-012_en.png`

### DSR-ARTICLE-012 [ja] — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:183`
- Expected vs actual: Error: category tag IDs  expect(received).toHaveLength(expected)  Expected length: 2 Received length: 1 Received array:  ["product"]
- Proposed: fail · suspect `data` · cause `none` · confidence 30% · known (JOB-23-06, IDLE-39): meta category has 1 tag ID ["product"], expected 2
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-ARTICLE-012_ja.png`

### DSR-ARTICLE-024 [ja] — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:244`
- Expected vs actual: Error: viewAllStories href  expect(received).not.toMatch(expected)  Expected pattern: not /^(#?)$/ Received string:      "#"
- Proposed: fail · suspect `product` · cause `none` · confidence 50% · known (IDLE-35/39): VIEW ALL STORIES href "#"
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-ARTICLE-024_ja.png`

### DSR-ARTICLE-012 [en] — DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:183`
- Expected vs actual: Error: category tag IDs  expect(received).toHaveLength(expected)  Expected length: 2 Received length: 1 Received array:  ["product"]
- Proposed: fail · suspect `data` · cause `none` · confidence 30% · known (JOB-23-06, IDLE-39): meta category has 1 tag ID ["product"], expected 2
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-ARTICLE-012_en.png`

### DSR-ARTICLE-024 [en] — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:244`
- Expected vs actual: Error: viewAllStories href  expect(received).not.toMatch(expected)  Expected pattern: not /^(#?)$/ Received string:      "#"
- Proposed: fail · suspect `product` · cause `none` · confidence 50% · known (IDLE-35/39): VIEW ALL STORIES href "#"
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-ARTICLE-024_en.png`

### DSR-ECO-005 [ja] — DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary

- Failing assertion: `tests/eco-products/DSR-590.eco-products.spec.ts:189`
- Expected vs actual: Error: tag label  expect(locator).not.toBeEmpty() failed  Locator: locator('main').locator('.hero, [class*="hero"]').first().locator('[class*="tag"]').first() Expected: not empty Timeout: 5000ms Error
- Proposed: fail · suspect `test` · cause `none` · confidence 30% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-ECO-005_ja.png`

### DSR-ECO-006 [ja] — DSR-ECO-006 [ja] free editing area renders between hero and product list

- Failing assertion: `tests/eco-products/DSR-590.eco-products.spec.ts:230`
- Expected vs actual: Error: free area text  expect(locator).not.toBeEmpty() failed  Locator: locator('main').locator('[class*="free"], .default-content-wrapper').first() Expected: not empty Timeout: 5000ms Error: element(
- Proposed: fail · suspect `test` · cause `none` · confidence 30% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-ECO-006_ja.png`

### DSR-ICON-006 [ja] — DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `tests/icons/DSR-589.icons.spec.ts:107`
- Expected vs actual: Error: console errors  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 3  - Array [] + Array [ +   "Failed to load resource: the server responded with a status of 40
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · pre-existing (IDLE-35/39, REG-1200): console "Failed to load resource"
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-ICON-006_ja.png`

### DSR-ICON-006 [en] — DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `tests/icons/DSR-589.icons.spec.ts:107`
- Expected vs actual: Error: console errors  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 3  - Array [] + Array [ +   "Failed to load resource: the server responded with a status of 40
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · pre-existing (IDLE-35/39, REG-1200): console "Failed to load resource"
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-ICON-006_en.png`

### DSR-PLSP-002 [ja] — DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected vs actual: Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 8  - Array [] + Array [ +   "", +   "", +   "", +   "", +   "", +   "", +
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 SP 2-column dismissed Not a bug 23/10 (KNOWN-FACTS) → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PLSP-002_ja.png`

### DSR-PLSP-003 [ja] — DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts` (test timeout 30 s, no assertion location reported)
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PLSP-003_ja.png`

### DSR-PLSP-005 [ja] — DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts` (test timeout 30 s, no assertion location reported)
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PLSP-005_ja.png`

### DSR-PLSP-002 [en] — DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected vs actual: Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 6  - Array [] + Array [ +   "", +   "", +   "", +   "", + ]
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 SP 2-column dismissed Not a bug 23/10 (KNOWN-FACTS) → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PLSP-002_en.png`

### DSR-PLSP-003 [en] — DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts` (test timeout 30 s, no assertion location reported)
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PLSP-003_en.png`

### DSR-PLSP-005 [en] — DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts` (test timeout 30 s, no assertion location reported)
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PLSP-005_en.png`

### DSR-PRODLIST-001 [ja] — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual: Error: 375: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PRODLIST-001_ja.png`

### DSR-PRODLIST-002 [ja] — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual: Error: 320: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PRODLIST-002_ja.png`

### DSR-PRODLIST-003 [ja] — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:70`
- Expected vs actual: Error: open: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PRODLIST-003_ja.png`

### DSR-PRODLIST-004 [ja] — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:153`
- Expected vs actual: Error: 1440: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 4 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; column-offset check returns 1 at 1440 (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-PRODLIST-004_ja.png`

### DSR-TOP-004 [ja] — DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual: Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not [] 
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-TOP-004_ja.png`

### DSR-TOP-005 [ja] — DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equality  Expected: true Received: false
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-TOP-005_ja.png`

### DSR-TOP-006 [ja] — DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual: Error: page requests /ja/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/ja/news/query-index.json" Received array: ["/query-index.json"]
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-TOP-006_ja.png`

### DSR-TOP-007 [ja] — DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual: Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-TOP-007_ja.png`

### DSR-TOP-004 [en] — DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual: Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not [] 
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-TOP-004_en.png`

### DSR-TOP-005 [en] — DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equality  Expected: true Received: false
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-TOP-005_en.png`

### DSR-TOP-006 [en] — DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual: Error: page requests /en/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/en/news/query-index.json" Received array: ["/query-index.json"]
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-TOP-006_en.png`

### DSR-TOP-007 [en] — DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual: Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-TOP-007_en.png`

### DSR-MOVIE-014 [en] — DSR-MOVIE-014 [en] embeds the configured YouTube movie

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:36`
- Expected vs actual: Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-player-facade') Expected: visible Timeout: 5000ms Error: element(s) not found  Call log:   - Expect "toBeVisible" getByT
- Proposed: fail · suspect `data` · cause `none` · confidence 20% · pre-existing (IDLE-39, REG-1200): legacy DSR-173 test page
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-MOVIE-014_en.png`

### DSR-MOVIE-026 — DSR-MOVIE-026 displays related thumbnails, types, tags and valid links

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:151`
- Expected vs actual: Error: Related card 1 thumbnail  expect(locator).toBeVisible() failed  Locator: getByTestId('related-content-card').first().getByTestId('related-content-card-image') Expected: visible Timeout: 1000ms 
- Proposed: fail · suspect `product` · cause `none` · confidence 60% · known bug DSR-538 (@known-bug-DSR-538)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-MOVIE-026_-.png`

### DSR-MOVIE-033 — DSR-MOVIE-033 displays component sections in vertical order on PC

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:213`
- Expected vs actual: Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-player') Expected: visible Timeout: 5000ms Error: element(s) not found  Call log:   - Expect "toBeVisible" getByTestId('
- Proposed: fail · suspect `data` · cause `none` · confidence 20% · pre-existing (IDLE-39, REG-1200): legacy DSR-173 test page
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-MOVIE-033_-.png`

### DSR-501-P3 [en] — DSR-501-P3 [en] related movies are limited to 5 in authored order

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:280`
- Expected vs actual: Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-related-content') Expected: visible Timeout: 5000ms Error: element(s) not found  Call log:   - Expect "toBeVisible" getB
- Proposed: fail · suspect `data` · cause `none` · confidence 10% · pre-existing (IDLE-30/35/39, REG-1200): qa501-* not re-seeded after overlay merge
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-501-P3_en.png`

### DSR-501-P2 [en] — DSR-501-P2 [en] unavailable related movie is not displayed

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:287`
- Expected vs actual: Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-related-content') Expected: visible Timeout: 5000ms Error: element(s) not found  Call log:   - Expect "toBeVisible" getB
- Proposed: fail · suspect `data` · cause `none` · confidence 10% · pre-existing (IDLE-30/35/39, REG-1200): qa501-* not re-seeded after overlay merge
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/evidence/DSR-501-P2_en.png`

## 7. Open points for QA

- 0 NEW FAIL, so step 2's retry-2× + raw-response rule was not triggered. All 39 failing tests (37 TC/lang keys) were already `fail` in the ledger and keep their known classification (cause `none`). Suspect/confidence values were carried over from REG-1620 / REG-1200, not re-derived.
- P2 baseline: 566/664/173/589 were not in REG-1620 but already had ledger rows from REG-1200. Every one of them has the same status as in REG-1200 (589 ICON-006 ja/en fail; 173 MOVIE-014/026/033 + 501-P2/P3 fail; 664 all pass/skip as before).
- **566 news detail: all 24 tests skipped.** `/master/{ja,en}/test-space/test-news-detail-template` returns 404 on `.aem.live` and `.aem.page` (curl, checked after the run ended, ~13:47Z). That is the same as REG-1200 (skip), so it is not a NEW FAIL. However, the ledger shows NEWS-001/003/004 passed at 03:32Z / 04:39Z today, so the page was there earlier. Not verified whether it was moved or unpublished on purpose (CHANGES.md rows for DSR-672/357 are `regressed = yes`).
- Untagged specs (smoke, 664, 173) ran without the `@auto` filter, see §1.
- Observations (no verdict): build headers in §1, unchanged vs REG-1620 for eco-carousel; scripts.js/styles.css/header.js not compared before (first record). Pending CHANGES.md rows DSR-639 header/footer, DSR-661 and DSR-675 show no file-header change on the files checked. Per README §7 that is **not** proof that they were not deployed. 671-LABEL: `dsr-product-page` `productLabel` ja 990586001 = `"990586001"`, en = `null` (raw: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/q_dsr-product-page_{ja,en}_990586001.json`). The page h1 is "QA586 product A" and shows no `｜` label. Unchanged vs REG-1620.
- Evidence was recompressed losslessly (zlib level 9) to stay ≤ 5 MB (4.99 MB, 37 PNGs). Screenshots were not checked by eye.
