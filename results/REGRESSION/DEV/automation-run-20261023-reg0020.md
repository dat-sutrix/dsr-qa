# REGRESSION DEV automation run — 20261023-reg0020

Job: `JOB-ZY-REG-20261024-0020-claude-code` (R3, Sprint 12: P1 + P3; even slot 00:20 VN). Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. Publish side only: no Author, no login, no form submit, no AEM writes, no mail sent (433 = GET only).

## 1. Header

- Run start (UTC): 2026-10-23T17:24:20Z
- Run end (UTC): 2026-10-23T17:38:38Z for the 3 main runs (overlay 17:24:20Z → 17:29:29Z; P1 non-overlay `@auto` + 227 17:29:29Z → 17:37:49Z; smoke + 433 + 591 retest 17:37:50Z → 17:38:38Z). NEW FAIL retries 17:38:54Z → 17:39:15Z; TZ diagnostic → 17:39:28Z.
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` where a test says so); persisted queries on publish-p192812-e2014374
- Target page(s): all pages used by the specs in §3 (overlay video/product/catalog + overlay SEO, catalog/video lists, product list, catalog download, breadcrumb, TOP, smoke, asset migration, mail endpoints, retest pages for DSR-591/647/538)
- Build under test: not independently verified (no dev repo access). File headers at 17:24Z, identical on `.live` and `.page` and unchanged vs REG-2020: `scripts/scripts.js` Mon, 19 Oct 2026 03:10:29 GMT (ETag 53efa556…); `styles/styles.css` Fri, 09 Oct 2026 01:34:56 GMT (b22adbb6…); `blocks/header/header.js` Wed, 30 Sep 2026 05:35:24 GMT (4a5ef25f…); `blocks/footer/footer.js` Tue, 15 Sep 2026 06:07:33 GMT (aa6a4016…); `eco-carousel.js` Mon, 19 Oct 2026 04:43:32 GMT (b6a6184d…); `eco-carousel.css` Fri, 23 Oct 2026 07:21:26 GMT (d1d7c97a…). Per README §7 these headers alone do not prove that nothing was deployed.
- Baseline ID: Regression S12 R3; overlay BL-OVL-1; ledger `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = REG-2020)
- Automation HEAD commit SHA: ae00c79dd3f69193ccad760a664fd6cad46b52f6 (no code changes in this job)
- Host timezone: Europe/Berlin (CEST); Playwright config sets no `timezoneId`, so the browser runs in this timezone. This matters for the NEW FAIL in §6.
- Exact commands (3 runs in sequence; Playwright cleans `test-results/` per run, so each run's artifacts were copied to /tmp before the next):

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg0020cc/overlay.json npm run test:dev:overlay -- --reporter=list,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg0020cc/b.json ENV=dev npx playwright test tests/breadcrumb/DSR-552.breadcrumb.spec.ts tests/top/ tests/catalog-video/ tests/product-list/ tests/catalog-download/ tests/asset-migration/DSR-227.asset-migration.spec.ts --project=chromium --grep @auto --grep-invert "@manual|@blocked|@overlay" --reporter=list,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg0020cc/c.json ENV=dev npx playwright test tests/smoke.spec.ts tests/mail/DSR-433.mail-endpoints.spec.ts tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts --project=chromium --grep-invert "@manual|@blocked|@overlay" --reporter=list,json
# NEW FAIL retries (job step 2) and diagnostic
ENV=dev npx playwright test tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --grep "DSR-CATV-01[89]" --repeat-each 2 --retries 0
TZ=Asia/Tokyo ENV=dev npx playwright test tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --grep "DSR-CATV-01[89]|DSR-CATV-020" --retries 0
```

Run 1 also includes the `@overlay` retest specs for DSR-647 and DSR-538 (P3), and the `@overlay` tests of 557, 570, 585 and one 529 test. Run 2 excludes `@overlay` because those tests already ran in run 1. Run 3 has no `--grep @auto`: `smoke.spec.ts`, `mail/DSR-433.*` and the DSR-591 retest spec carry no `@auto` tag (a `@auto` filter would select 0 tests). They have no `@manual`/`@blocked` tag either, so they ran as listed by the job. The 433 spec only sends GET requests without parameters and never sends mail. Postprocessing: `finish.py`, `write_outputs.py`, `finalize.py`, `gen_report.py`, `repng.py`, `observe.cjs`, `catv-raw.cjs` in `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/`.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| overlay (`@overlay`) | 257 | 204 | 12 | 41 | 1 | 2 | configured 1; 13 retries (12 failed again, 1 flaky) | 5.1 min |
| P1 non-overlay `@auto` + 227 | 82 | 36 | 18 | 28 | 1 | 2 | configured 1; 18 retries (all failed again) | 8.3 min |
| smoke + 433 + 591 retest (untagged) | 11 | 11 | 0 | 0 | 0 | 2 | configured 1; none needed | 0.8 min |
| **Total** | **350** | **251** | **30** | **69** | – | – | 31 | ~14 min |
| NEW FAIL retry (CATV-018/019 ×2) | 8 | 0 | 8 | 0 | 1 | 2 | 0 | <1 min |
| Diagnostic, browser TZ Asia/Tokyo (CATV-018/019/020) | 6 | 6 | 0 | 0 | 0 | 2 | 0 | <1 min |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms. Browser: chromium only (in run 1 the firefox/webkit projects only match DSR-BREAD-032, which has no `@overlay` tag, so they ran nothing). Flaky: 1 (`DSR-CATOV-001 [ja] qa190-cat-pdf`, passed on retry; the TC/lang key stays `fail` because of its known `-form` subcases).

Per spec (pass/fail/skip): 654 49/6/3 · 587 overlay 15/0/8 · overlay-seo 65/0/1 · 586 17/0/4 · 570 12/2/2 · 557 34/4/0 · 585 8/0/17 · 529 (@overlay only) 0/0/2 · 552 26/0/11 · 609 4/8/0 · 583 4/10/2 · smoke 1/0/0 · 227 2/0/15 · 433 2/0/0 · retest 591 8/0/0 · retest 647 2/0/0 · retest 538 2/0/4. Not run: P2 (odd slot), `analysis/`, `*capture*`, visual specs.

**Ledger comparison:** 240 TC/lang keys. **4 NEW FAIL** (`DSR-CATV-018/019` ja + en, see §6). 29 keys are new P3/retest baselines (227 ×17, 433 ×2, 591 retest ×8, 647 retest ×2), so they are not NEW FAIL. `DSR-ARTICLE-011 [ja/en]` (P2) was left unchanged: only its `@overlay` subcase ran here (skip, same as REG-2020), and the P2 subcase that passed in REG-2020 was not run. Other ledger keys not produced in this run (P2 specs, 6 keys missing as in REG-2020) were left unchanged. Ledger now has 376 keys.

## 4. Executed tests

Duration = summed attempts. Fail = failed on first attempt and on the retry. Retest specs are marked (ledger key `<TC> (retest-<ticket>) [<lang>]`; DSR-538 keeps `DSR-538-retest`).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 [ja] | DSR-CATDL-001 [ja] catalog detail header renders | pass | 4.2 s | — |
| DSR-CATDL-002 [ja] | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | pass | 3.5 s | — |
| DSR-CATDL-005 [ja] | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | pass | 3.1 s | — |
| DSR-CATDL-006 [ja] | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | pass | 2.0 s | — |
| DSR-CATDL-018 [ja] | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | pass | 2.1 s | — |
| DSR-CATDL-001 [en] | DSR-CATDL-001 [en] catalog detail header renders | pass | 1.7 s | — |
| DSR-CATDL-002 [en] | DSR-CATDL-002 [en] download form fields, labels, consent and button present | pass | 2.3 s | — |
| DSR-CATDL-005 [en] | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | pass | 1.4 s | — |
| DSR-CATDL-006 [en] | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | pass | 1.9 s | — |
| DSR-CATDL-018 [en] | DSR-CATDL-018 [en] e-book form card links to the detail page with the form | pass | 2.4 s | — |
| DSR-CATDL-003 [ja] | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | pass | 1.5 s | — |
| DSR-CATDL-007 [ja] | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | fail | 8.7 s | Error: gated PDF URL delivered to the browser before submit  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received |
| DSR-CATDL-010 [ja] | DSR-CATDL-010 [ja] catalog ID handed to the form | pass | 3.8 s | — |
| DSR-CATDL-016 [en] | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | fail | 3.8 s | Error: fixed texts containing Japanese  expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 44  - Array [] + |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 35.4 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.4 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap | pass | 0.8 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 11.9 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.6 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.2 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 0.5 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 6.8 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.3 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap | pass | 0.6 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 12.2 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.6 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 0.5 s | — |
| DSR-CATOV-004 [ja] | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | pass | 0.1 s | — |
| DSR-CATOV-005 [ja] | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 3.9 s | — |
| DSR-CATOV-007 [ja] | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | pass | 1.2 s | — |
| DSR-CATOV-008 [ja] | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 3.3 s | — |
| DSR-CATOV-012 [ja] | DSR-CATOV-012 [ja] catalog list card links to the overlay page | fail | 15.8 s | Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog |
| DSR-CATOV-015 [ja] | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 4.2 s | — |
| DSR-CATOV-016 [ja] | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 1.4 s | — |
| DSR-CATOV-017 [ja] | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 6.5 s | — |
| DSR-CATOV-019 [ja] | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 4.1 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 3.9 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.4 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap | pass | 0.3 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 12.4 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.7 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 0.6 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 7.4 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.5 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap | pass | 0.4 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 11.8 s | Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.5 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 0.6 s | — |
| DSR-CATOV-004 [en] | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | pass | 0.1 s | — |
| DSR-CATOV-005 [en] | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 4.0 s | — |
| DSR-CATOV-006 [en] | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | pass | 0.1 s | — |
| DSR-CATOV-007 [en] | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | pass | 0.6 s | — |
| DSR-CATOV-008 [en] | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 2.6 s | — |
| DSR-CATOV-012 [en] | DSR-CATOV-012 [en] catalog list card links to the overlay page | fail | 17.0 s | Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog |
| DSR-CATOV-015 [en] | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 5.3 s | — |
| DSR-CATOV-016 [en] | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 1.6 s | — |
| DSR-CATOV-017 [en] | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 6.5 s | — |
| DSR-CATOV-019 [en] | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 3.8 s | — |
| DSR-CATOV-009 [en] | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 0.3 s | — |
| DSR-CATOV-010 [en] | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | pass | 3.8 s | — |
| DSR-CATOV-011 [en] | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | pass | 0.0 s | — |
| DSR-CATOV-014 [en] | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | pass | 3.9 s | — |
| DSR-CATV-012 [ja] | DSR-CATV-012 catalog item shows thumbnail and title | pass | 5.7 s | — |
| DSR-CATV-013 [ja] | DSR-CATV-013 PDF item without form opens in a new tab | pass | 6.5 s | — |
| DSR-CATV-016 [ja] | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 6.3 s | — |
| DSR-CATV-017 [ja] | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | pass | 2.7 s | — |
| DSR-CATV-018 [ja] | DSR-CATV-018 NEW label within 10 days of publishDate | fail | 5.0 s | Error: expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 14  - Array [] + Array [ +   Object { +     "expe |
| DSR-CATV-019 [ja] | DSR-CATV-019 UPDATE label within 10 days of updateDate | fail | 4.8 s | Error: expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 14  - Array [] + Array [ +   Object { +     "expe |
| DSR-CATV-020 [ja] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 1.7 s | — |
| DSR-CATV-012 [en] | DSR-CATV-012 catalog item shows thumbnail and title | pass | 8.6 s | — |
| DSR-CATV-013 [en] | DSR-CATV-013 PDF item without form opens in a new tab | pass | 6.6 s | — |
| DSR-CATV-016 [en] | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 5.4 s | — |
| DSR-CATV-017 [en] | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form | pass | 2.4 s | — |
| DSR-CATV-018 [en] | DSR-CATV-018 NEW label within 10 days of publishDate | fail | 4.9 s | Error: expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 14  - Array [] + Array [ +   Object { +     "expe |
| DSR-CATV-019 [en] | DSR-CATV-019 UPDATE label within 10 days of updateDate | fail | 5.6 s | Error: expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 14  - Array [] + Array [ +   Object { +     "expe |
| DSR-CATV-020 [en] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 2.1 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | pass | 1.9 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | pass | 1.8 s | — |
| DSR-CATV-002 [ja] | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | pass | 1.2 s | — |
| DSR-CATV-006 [ja] | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 1.8 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | pass | 1.8 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | pass | 2.1 s | — |
| DSR-CATV-002 [ja] | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | pass | 2.3 s | — |
| DSR-CATV-006 [ja] | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 1.9 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | pass | 1.8 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | pass | 2.0 s | — |
| DSR-CATV-002 [en] | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | pass | 3.4 s | — |
| DSR-CATV-006 [en] | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 2.7 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | pass | 2.1 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | pass | 2.3 s | — |
| DSR-CATV-002 [en] | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | pass | 2.2 s | — |
| DSR-CATV-006 [en] | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 2.3 s | — |
| DSR-CATV-003 [ja] | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | pass | 2.6 s | — |
| DSR-CATV-007 [ja] | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 3.7 s | — |
| DSR-CATV-003 [ja] | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | pass | 2.5 s | — |
| DSR-CATV-007 [ja] | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 3.8 s | — |
| DSR-CATV-003 [en] | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | pass | 2.2 s | — |
| DSR-CATV-007 [en] | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 4.1 s | — |
| DSR-CATV-003 [en] | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | pass | 2.2 s | — |
| DSR-CATV-007 [en] | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 4.0 s | — |
| DSR-VOV-001 [ja] | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | pass | 2.3 s | — |
| DSR-VOV-001 [en] | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | pass | 1.7 s | — |
| DSR-VOV-002 [en] | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 0.5 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | pass | 2.6 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | pass | 2.2 s | — |
| DSR-VOV-007 [ja] | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | pass | 3.9 s | — |
| DSR-VOV-007 [en] | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | pass | 4.0 s | — |
| DSR-VOV-008 [en] | DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list | pass | 4.1 s | — |
| DSR-VOV-011 [ja] | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | 2.1 s | — |
| DSR-VOV-011 [en] | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | pass | 1.6 s | — |
| DSR-VOV-013 [en] | DSR-VOV-013 [en] movie list shows standard movies only | pass | 1.8 s | — |
| DSR-VOV-014 [en] | DSR-VOV-014 [en] related movies max 5 when 6 are linked | pass | 0.9 s | — |
| DSR-VOV-015 [en] | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | pass | 1.0 s | — |
| DSR-VOV-018 [ja] | DSR-VOV-018 [ja] language variant: 200, html lang, title | pass | 0.8 s | — |
| DSR-VOV-018 [en] | DSR-VOV-018 [en] language variant: 200, html lang, title | pass | 0.6 s | — |
| DSR-501-P3 [en] (retest) | DSR-501-P3 [en] related movies are max 5, newest updated first | pass | 2.6 s | — |
| DSR-501-P2 [en] (retest) | DSR-501-P2 [en] unavailable related movie is not displayed | pass | 2.3 s | — |
| DSR-538 [en] (retest) | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | pass | 2.0 s | — |
| DSR-538 [en] (retest) | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | pass | 1.6 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | pass | 0.5 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | pass | 0.4 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | pass | 0.4 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | pass | 0.5 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | pass | 0.4 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | pass | 0.4 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | pass | 0.4 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | pass | 0.4 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | pass | 0.5 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | pass | 0.2 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | pass | 0.3 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | pass | 0.4 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a | pass | 0.8 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a | pass | 0.5 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b | pass | 0.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b | pass | 0.6 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam | pass | 0.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main | pass | 0.5 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off | pass | 0.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 | pass | 0.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 | pass | 0.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 | pass | 0.6 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 | pass | 0.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 | pass | 0.5 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 | pass | 0.4 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a | pass | 0.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a | pass | 0.3 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b | pass | 0.5 s | — |
| DSR-VOV-003 [en] | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b | pass | 0.4 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | pass | 0.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | pass | 0.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | pass | 0.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | pass | 0.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | pass | 0.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | pass | 1.6 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | pass | 1.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | pass | 1.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | pass | 0.3 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | pass | 0.2 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam | pass | 1.0 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam | pass | 1.2 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main | pass | 1.5 s | — |
| DSR-VOV-003 [ja] | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main | pass | 1.3 s | — |
| DSR-CATOV-005 [ja] | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | pass | 1.3 s | — |
| DSR-CATOV-005 [ja] | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) | pass | 1.6 s | — |
| DSR-CATOV-005 [en] | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | pass | 1.9 s | — |
| DSR-CATOV-005 [en] | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) | pass | 1.1 s | — |
| DSR-VOV-007 [ja] | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | pass | 1.2 s | — |
| DSR-VOV-007 [ja] | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) | pass | 0.9 s | — |
| DSR-VOV-007 [en] | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | pass | 0.8 s | — |
| DSR-VOV-007 [en] | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) | pass | 1.0 s | — |
| DSR-VOV-008 [en] | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | pass | 1.0 s | — |
| DSR-VOV-008 [en] | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | pass | 1.2 s | — |
| DSR-PCF-007 [ja] | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass | 0.1 s | — |
| DSR-PCF-007 [en] | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass | 0.0 s | — |
| DSR-PCF-016 [ja] | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass | 0.5 s | — |
| DSR-PCF-016 [en] | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass | 0.5 s | — |
| DSR-PCF-017 [ja] | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass | 0.2 s | — |
| DSR-PCF-017 [en] | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass | 0.4 s | — |
| DSR-PCF-019 [ja] | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | pass | 0.6 s | — |
| DSR-PCF-019 [en] | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | pass | 0.8 s | — |
| DSR-PDO-001 [ja] | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | pass | 2.1 s | — |
| DSR-PDO-001 [en] | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | pass | 1.7 s | — |
| DSR-PDO-002 [ja] | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 0.5 s | — |
| DSR-PDO-003 [ja] | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | pass | 0.4 s | — |
| DSR-PDO-003 [en] | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | pass | 0.5 s | — |
| DSR-PDO-004 [ja] | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | pass | 4.0 s | — |
| DSR-PDO-005 [ja] | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page | pass | 3.7 s | — |
| DSR-PDO-008 [ja] | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | pass | 7.5 s | — |
| DSR-PDO-009 [ja] | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | pass | 6.9 s | — |
| DSR-PDO-012 [ja] | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | pass | 0.8 s | — |
| DSR-PDO-013 [ja] | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | pass | 4.4 s | — |
| DSR-PDO-013 [en] | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | pass | 4.5 s | — |
| DSR-PDO-014 [ja] | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | pass | 2.4 s | — |
| DSR-PDO-014 [en] | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | pass | 2.1 s | — |
| DSR-PDO-017 [ja] | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent | pass | 2.4 s | — |
| DSR-PDO-021 [ja] | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images | pass | 5.2 s | — |
| DSR-PDO-019 [ja] | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | pass | 2.4 s | — |
| DSR-ASSET-016 [ja] | DSR-ASSET-016 [ja] no asset response >= 400 on DEV product pages (query-index, max 50) | pass | 16.2 s | — |
| DSR-ASSET-016 [en] | DSR-ASSET-016 [en] no asset response >= 400 on DEV product pages (query-index, max 50) | pass | 5.5 s | — |
| DSR-BREAD-010 [ja] | DSR-BREAD-010 [ja] display name overrides page title | pass | 7.8 s | — |
| DSR-BREAD-010 [en] | DSR-BREAD-010 [en] display name overrides page title | pass | 5.2 s | — |
| DSR-BREAD-015 [ja] | DSR-BREAD-015 [ja] special characters in display name are plain text | pass | 3.5 s | — |
| DSR-BREAD-018 [ja] | DSR-BREAD-018 [ja] each language uses its own display names | pass | 2.6 s | — |
| DSR-BREAD-018 [en] | DSR-BREAD-018 [en] each language uses its own display names | pass | 2.1 s | — |
| DSR-BREAD-001 [ja] | DSR-BREAD-001 child trail and placement | pass | 2.4 s | — |
| DSR-BREAD-002 [ja] | DSR-BREAD-002 ancestor links | pass | 15.0 s | — |
| DSR-BREAD-003 [ja] | DSR-BREAD-003 current page is not linked | pass | 4.7 s | — |
| DSR-BREAD-004 [ja] | DSR-BREAD-004 HOME label and destination | pass | 4.8 s | — |
| DSR-BREAD-005 [ja] | DSR-BREAD-005 grandchild trail order | pass | 6.7 s | — |
| DSR-BREAD-006 [ja] | DSR-BREAD-006 parent trail | pass | 5.5 s | — |
| DSR-BREAD-007 [ja] | DSR-BREAD-007 missing intermediate page | pass | 4.2 s | — |
| DSR-BREAD-008 [ja] | DSR-BREAD-008 HOME excludes breadcrumb | pass | 4.3 s | — |
| DSR-BREAD-009 [ja] | DSR-BREAD-009 404 excludes breadcrumb | pass | 3.8 s | — |
| DSR-BREAD-011 [ja] | DSR-BREAD-011 empty label uses title | pass | 5.1 s | — |
| DSR-BREAD-017 [ja] | DSR-BREAD-017 localized HOME destinations | pass | 5.3 s | — |
| DSR-BREAD-025 [ja] | DSR-BREAD-025 BreadcrumbList structured data | pass | 4.9 s | — |
| DSR-BREAD-027 [ja] | DSR-BREAD-027 semantic markup and accessibility | pass | 6.2 s | — |
| DSR-BREAD-028 [ja] | DSR-BREAD-028 keyboard navigation | pass | 6.5 s | — |
| DSR-BREAD-031 [ja] | DSR-BREAD-031 site-origin console errors | pass | 4.7 s | — |
| DSR-BREAD-035 [ja] | DSR-BREAD-035 arrow asset origin and status | pass | 6.4 s | — |
| DSR-BREAD-001 [en] | DSR-BREAD-001 child trail and placement | pass | 4.6 s | — |
| DSR-BREAD-005 [en] | DSR-BREAD-005 grandchild trail order | pass | 4.7 s | — |
| DSR-BREAD-008 [en] | DSR-BREAD-008 HOME excludes breadcrumb | pass | 4.4 s | — |
| DSR-BREAD-017 [en] | DSR-BREAD-017 localized HOME destinations | pass | 4.8 s | — |
| DSR-BREAD-025 [en] | DSR-BREAD-025 BreadcrumbList structured data | pass | 5.1 s | — |
| DSR-PLSP-001 [ja] | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | pass | 2.6 s | — |
| DSR-PLSP-002 [ja] | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | fail | 28.6 s | Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 8  - Array [] |
| DSR-PLSP-003 [ja] | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | fail | 61.5 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 [ja] | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | fail | 61.5 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 [ja] | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | pass | 7.5 s | — |
| DSR-PLSP-001 [en] | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | pass | 2.7 s | — |
| DSR-PLSP-002 [en] | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | fail | 32.9 s | Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 6  - Array [] |
| DSR-PLSP-003 [en] | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | fail | 61.3 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 [en] | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | fail | 61.3 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 [en] | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | pass | 12.8 s | — |
| DSR-PRODLIST-001 [ja] | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | fail | 4.3 s | Error: 375: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-002 [ja] | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | fail | 24.4 s | Error: 320: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-003 [ja] | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | fail | 14.3 s | Error: open: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1 |
| DSR-PRODLIST-004 [ja] | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | fail | 15.7 s | Error: 1440: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 4 Received: 1 |
| DSR-TOP-004 [ja] | DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | fail | 8.0 s | Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not []  |
| DSR-TOP-005 [ja] | DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | fail | 8.6 s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equ |
| DSR-TOP-006 [ja] | DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | fail | 7.3 s | Error: page requests /ja/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/ja/news/query-index.json" |
| DSR-TOP-007 [ja] | DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | fail | 8.0 s | Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2 |
| DSR-TOP-008 [ja] | DSR-TOP-008 [ja] NEWS with empty query-index renders without error | pass | 3.7 s | — |
| DSR-TOP-009 [ja] | DSR-TOP-009 [ja] main visual image is eager and is the LCP element | pass | 4.7 s | — |
| DSR-TOP-004 [en] | DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | fail | 9.9 s | Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not []  |
| DSR-TOP-005 [en] | DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | fail | 8.3 s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equ |
| DSR-TOP-006 [en] | DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | fail | 6.2 s | Error: page requests /en/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/en/news/query-index.json" |
| DSR-TOP-007 [en] | DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | fail | 11.1 s | Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2 |
| DSR-TOP-008 [en] | DSR-TOP-008 [en] NEWS with empty query-index renders without error | pass | 7.9 s | — |
| DSR-TOP-009 [en] | DSR-TOP-009 [en] main visual image is eager and is the LCP element | pass | 8.1 s | — |
| DSR-BREAD-001 [ja] (retest) | DSR-BREAD-001 [ja] child trail follows URL hierarchy | pass | 4.6 s | — |
| DSR-BREAD-005 [ja] (retest) | DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | pass | 4.6 s | — |
| DSR-BREAD-002 [ja] (retest) | DSR-BREAD-002 [ja] ancestor links navigate in same tab | pass | 8.1 s | — |
| DSR-BREAD-011 [ja] (retest) | DSR-BREAD-011 [ja] items equal page titles | pass | 6.7 s | — |
| DSR-BREAD-001 [en] (retest) | DSR-BREAD-001 [en] child trail follows URL hierarchy | pass | 4.5 s | — |
| DSR-BREAD-005 [en] (retest) | DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | pass | 4.1 s | — |
| DSR-BREAD-002 [en] (retest) | DSR-BREAD-002 [en] ancestor links navigate in same tab | pass | 7.3 s | — |
| DSR-BREAD-011 [en] (retest) | DSR-BREAD-011 [en] items equal page titles | pass | 5.2 s | — |
| DSR-MAIL-016 | DSR-MAIL-016 [—] webhook GET without auth is refused | pass | 1.2 s | — |
| DSR-MAIL-017 | DSR-MAIL-017 [—] test-send GET without params or auth is not public | pass | 1.0 s | — |
| SMOKE-001 DSR-173 test page is reachable | SMOKE-001 DSR-173 test page is reachable | pass | 1.8 s | — |

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
| DSR-ASSET-003 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-003 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-017 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
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
| DSR-PRODLIST-003 [en] | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 [ja] | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |

## 6. Failed tests

30 failing tests (28 TC/lang keys). **4 NEW FAIL** (DSR-CATV-018/019 ja+en, previous pass REG-2020); the other 26 were already `fail` in the ledger (REG-2020). All have cause `none`. Evidence = one first-attempt screenshot per TC/lang (losslessly recompressed), committed under `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/`. Traces, `test-results/` and `playwright-report/` are not committed.

### DSR-CATDL-007 [ja] — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Expected vs actual: Error: gated PDF URL delivered to the browser before submit  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 3  - Array [] + Array [ +   "dsr-catalog-list response: 
- Proposed: fail · suspect `product` · cause `none` · confidence 70% · known: draft BUG-CAT-PDF-EXPOSE (DASHBOARD 🐞); DSR-655 Y4 client question
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATDL-007_ja.png`

### DSR-CATDL-016 [en] — DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Expected vs actual: Error: fixed texts containing Japanese  expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 44  - Array [] + Array [ +   "必須 + 氏名（姓）", +   "必須 + 氏名（名）", +   "必須 + メールアド
- Proposed: fail · suspect `product` · cause `none` · confidence 70% · known: draft BUG-CAT-FORM-EN (DASHBOARD 🐞)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATDL-016_en.png`

### DSR-CATOV-001 [ja] — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required" Received: "catalog pdf form" Timeout:
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATOV-001_ja.png`

### DSR-CATOV-001 [ja] — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form" Received: "catalog ebook form" Timeout:  50
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATOV-001_ja.png`

### DSR-CATOV-012 [ja] — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected vs actual: Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() Expected: visible Timeout: 5000ms Error: elemen
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: no list card 'QA190 PDF catalog' (TD-190 title not seeded)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATOV-012_ja.png`

### DSR-CATOV-001 [en] — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required" Received: "catalog pdf form" Timeout:
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATOV-001_en.png`

### DSR-CATOV-001 [en] — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected vs actual: Error: expect(locator).toHaveText(expected) failed  Locator:  locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form" Received: "catalog ebook form" Timeout:  50
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: -form CF titles are dev samples ("catalog pdf form" / "catalog ebook form")
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATOV-001_en.png`

### DSR-CATOV-012 [en] — DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected vs actual: Error: card 'QA190 PDF catalog'  expect(locator).toBeVisible() failed  Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() Expected: visible Timeout: 5000ms Error: elemen
- Proposed: fail · suspect `data` · cause `none` · confidence 0% · known: no list card 'QA190 PDF catalog' (TD-190 title not seeded)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATOV-012_en.png`

### DSR-CATV-018 [ja] — DSR-CATV-018 NEW label within 10 days of publishDate

- Failing assertion: `tests/catalog-video/DSR-557.catalog-video.spec.ts:167`
- Expected vs actual: Error: expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 14  - Array [] + Array [ +   Object { +     "expected": "", +     "meta": Array [ +       "2026.10.13", +    
- **NEW FAIL** (ledger last = pass, REG-2020 2026-10-23T13:33:01Z). Retried 2× (`--repeat-each 2 --retries 0`): fail 2/2. Passes with browser TZ Asia/Tokyo. Raw: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/catv-raw.json`, `q_dsr-catalog-list_{ja,en}.json`
- Proposed: fail · suspect `test` · cause `none` · confidence 15% · NEW FAIL, time-window artefact: test today() = JST (2026-10-24), browser runs in host TZ Europe/Berlin (2026-10-23); product labels by browser-local date. Same TCs pass with browser TZ Asia/Tokyo; data unchanged
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATV-018_ja.png`

### DSR-CATV-019 [ja] — DSR-CATV-019 UPDATE label within 10 days of updateDate

- Failing assertion: `tests/catalog-video/DSR-557.catalog-video.spec.ts:167`
- Expected vs actual: Error: expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 14  - Array [] + Array [ +   Object { +     "expected": "", +     "meta": Array [ +       "2026.09.15", +    
- **NEW FAIL** (ledger last = pass, REG-2020 2026-10-23T13:33:01Z). Retried 2× (`--repeat-each 2 --retries 0`): fail 2/2. Passes with browser TZ Asia/Tokyo. Raw: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/catv-raw.json`, `q_dsr-catalog-list_{ja,en}.json`
- Proposed: fail · suspect `test` · cause `none` · confidence 15% · NEW FAIL, time-window artefact: test today() = JST (2026-10-24), browser runs in host TZ Europe/Berlin (2026-10-23); product labels by browser-local date. Same TCs pass with browser TZ Asia/Tokyo; data unchanged
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATV-019_ja.png`

### DSR-CATV-018 [en] — DSR-CATV-018 NEW label within 10 days of publishDate

- Failing assertion: `tests/catalog-video/DSR-557.catalog-video.spec.ts:167`
- Expected vs actual: Error: expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 14  - Array [] + Array [ +   Object { +     "expected": "", +     "meta": Array [ +       "2026.10.13", +    
- **NEW FAIL** (ledger last = pass, REG-2020 2026-10-23T13:33:01Z). Retried 2× (`--repeat-each 2 --retries 0`): fail 2/2. Passes with browser TZ Asia/Tokyo. Raw: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/catv-raw.json`, `q_dsr-catalog-list_{ja,en}.json`
- Proposed: fail · suspect `test` · cause `none` · confidence 15% · NEW FAIL, time-window artefact: test today() = JST (2026-10-24), browser runs in host TZ Europe/Berlin (2026-10-23); product labels by browser-local date. Same TCs pass with browser TZ Asia/Tokyo; data unchanged
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATV-018_en.png`

### DSR-CATV-019 [en] — DSR-CATV-019 UPDATE label within 10 days of updateDate

- Failing assertion: `tests/catalog-video/DSR-557.catalog-video.spec.ts:167`
- Expected vs actual: Error: expect(received).toEqual(expected) // deep equality  - Expected  -  1 + Received  + 14  - Array [] + Array [ +   Object { +     "expected": "", +     "meta": Array [ +       "2026.09.15", +    
- **NEW FAIL** (ledger last = pass, REG-2020 2026-10-23T13:33:01Z). Retried 2× (`--repeat-each 2 --retries 0`): fail 2/2. Passes with browser TZ Asia/Tokyo. Raw: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/catv-raw.json`, `q_dsr-catalog-list_{ja,en}.json`
- Proposed: fail · suspect `test` · cause `none` · confidence 15% · NEW FAIL, time-window artefact: test today() = JST (2026-10-24), browser runs in host TZ Europe/Berlin (2026-10-23); product labels by browser-local date. Same TCs pass with browser TZ Asia/Tokyo; data unchanged
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-CATV-019_en.png`

### DSR-PLSP-002 [ja] — DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected vs actual: Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 8  - Array [] + Array [ +   "", +   "", +   "", +   "", +   "", +   "", +
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 SP 2-column dismissed Not a bug 23/10 (KNOWN-FACTS) → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PLSP-002_ja.png`

### DSR-PLSP-003 [ja] — DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PLSP-003_ja.png`

### DSR-PLSP-005 [ja] — DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PLSP-005_ja.png`

### DSR-PLSP-002 [en] — DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected vs actual: Error: 320: cards overflowing their column  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 6  - Array [] + Array [ +   "", +   "", +   "", +   "", + ]
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 SP 2-column dismissed Not a bug 23/10 (KNOWN-FACTS) → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PLSP-002_en.png`

### DSR-PLSP-003 [en] — DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PLSP-003_en.png`

### DSR-PLSP-005 [en] — DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PLSP-005_en.png`

### DSR-PRODLIST-001 [ja] — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual: Error: 375: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PRODLIST-001_ja.png`

### DSR-PRODLIST-002 [ja] — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual: Error: 320: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PRODLIST-002_ja.png`

### DSR-PRODLIST-003 [ja] — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:70`
- Expected vs actual: Error: open: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 2 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; DSR-583 dismissed Not a bug 23/10 → Expected outdated
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PRODLIST-003_ja.png`

### DSR-PRODLIST-004 [ja] — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:153`
- Expected vs actual: Error: 1440: distinct column offsets  expect(received).toBe(expected) // Object.is equality  Expected: 4 Received: 1
- Proposed: fail · suspect `test` · cause `none` · confidence 10% · known; column-offset check returns 1 at 1440 (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-PRODLIST-004_ja.png`

### DSR-TOP-004 [ja] — DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual: Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not [] 
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-TOP-004_ja.png`

### DSR-TOP-005 [ja] — DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equality  Expected: true Received: false
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-TOP-005_ja.png`

### DSR-TOP-006 [ja] — DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual: Error: page requests /ja/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/ja/news/query-index.json" Received array: ["/query-index.json"]
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-TOP-006_ja.png`

### DSR-TOP-007 [ja] — DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual: Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-TOP-007_ja.png`

### DSR-TOP-004 [en] — DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual: Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not [] 
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-TOP-004_en.png`

### DSR-TOP-005 [en] — DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equality  Expected: true Received: false
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-TOP-005_en.png`

### DSR-TOP-006 [en] — DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual: Error: page requests /en/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/en/news/query-index.json" Received array: ["/query-index.json"]
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-TOP-006_en.png`

### DSR-TOP-007 [en] — DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual: Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2
- Proposed: fail · suspect `product` · cause `none` · confidence 40% · known (IDLE-35/39)
- Evidence: `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/evidence/DSR-TOP-007_en.png`


## 7. Open points for QA

- **NEW FAIL DSR-CATV-018/019 (ja + en) is a time-window artefact, not a deploy regression (proposal, confidence 15% product bug).** `fixtures/dsr-557.ts:59` `today()` uses Asia/Tokyo; the product computes the NEW/UPDATE label from the browser's local date. The VPS and browser run in Europe/Berlin. Between 15:00Z and 22:00Z, JST is already the next day: the test expects no label for the "10 days" rows (`QA190 NEW 10`, `QA190 UPD 10`, dated 2026-10-13), but the page still shows NEW/UPDATE. The `dsr-catalog-list` data is unchanged (raw JSON saved), the page and the query return HTTP 200, and the same tests pass with the browser in Asia/Tokyo. Note: the 10-day boundary rows also roll over each day, so the same behaviour should repeat at every JST midnight. Open question for Claude/dev: which timezone defines "within 10 days" (JST server-side or visitor local)? Test-side options: set `timezoneId: 'Asia/Tokyo'` for 557, or compute `today()` in the browser. No code was changed in this job.
- **4a REG-VIDLIST-EN:** on `/en/library/video/search` page 1, "QA587 main movie" appears twice with different hrefs and different DSR CFs (`/content/dam/dsr/en/movies/standard/QA587_Upper` and `.../standard/qa587-main`). Both reference the same content CF `/content/dam/common/en/movies/qa587-main`. This points to data (2 DSR CFs), not a duplicated id in code. A 3rd DSR CF `.../standard/qa587/qa587-sub` also references it (it is not on page 1). ja shows it once. Raw: `q_video-search_{ja,en}_0.json`. Screenshots: `evidence-obs/REG-VIDLIST_{ja,en}.png`.
- **4b 566 page:** not found. There is no news-detail page under a new path. `fixtures/paths.ts` has no news-detail entry, and the old and `/{lang}/test-space/` variants return 404 on `.live` and `.page`. Pages that exist: `/master/en/test-space/qa566-news-01` (in query-index) and `/master/ja/test-space/qa566-news-01` (HTTP 200, not in query-index); these can be used via `DSR566_SLUG=qa566-news-01`. Also `/master/en/test-space/dsr-357-news-detail` (old block) and `/ja/news/2024/recruitment` (template `news-article`).
- **4c headers:** unchanged vs REG-2020, `.live` = `.page`. Pending CHANGES.md rows DSR-639/661/675 show no file change: **not verified**, which does not mean "not deployed" (README §7).
- DSR-CATOV-001 [ja] qa190-cat-pdf passed only on retry (flaky; REG-2020 had 0 flaky). The key stays a known fail.
- Retest keys are stored as `<TC> (retest-<ticket>) [<lang>]` so they don't overwrite the main-spec keys with the same TC IDs. DSR-538 keeps the existing `DSR-538-retest [lang]` key.
- 227: 15 of 17 skip (`blocked-data: TD-227-02 sample migrated products not delivered`); only ASSET-016 ja/en ran (pass).
- Not verified: Author side, STG/PRO, visual specs.
