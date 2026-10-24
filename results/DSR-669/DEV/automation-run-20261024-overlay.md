# DSR-669 DEV automation run — 20261024-overlay

## 1. Header

- Run start (UTC): 2026-10-24T02:24:50Z
- Run end (UTC): 2026-10-24T02:32:22Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): All `@overlay` specs (587 movie overlay/SEO/647/538 retests, 586 product detail, 654 catalog overlay, 557, 570, 585, 529 ARTICLE-011): see table
- Build under test: Not independently verified. Job input: deploy `dev/2026.10.23` a47274d (DSR-669). Observed: `product-detail.js`, `video-detail.js`, `related-product.js` Last-Modified Fri, 23 Oct 2026 07:15:23 GMT; `catalog-detail.js` Thu, 22 Oct 2026 01:48:45 GMT.
- Baseline ID: BL-669-1 (tc-out/DSR-669.spec.json A1); BL-OVL-1 for overlay specs; pre-669 oracle `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json` (A2)
- Automation HEAD commit SHA: 1bf151d25aad0f19753fffb2964f71f865ad16f1 (+ uncommitted `tests/cf-model/DSR-669.cf-model-rename.spec.ts`, `fixtures/dsr-669.ts`, committed with this report)
- Job: JOB-20261024-04 (lane claude-code)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/run669/overlay.json npm run test:dev:overlay
# = ENV=dev playwright test --grep @overlay
node scripts/compare-runs.mjs ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json /tmp/run669/overlay.json --out /tmp/run669/compare.md
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before the first spec run and again after the test fix, both exit 0 with empty output)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 257 | 208 | 8 | 41 | 1 | 2 | 1 configured; 8 tests retried (all failed again) | 7.5 min (450.0 s) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: Subset `@overlay` (DSR-669 TC 12.0), Chromium. Flaky: 0. Diff vs pre-669 (`overlay-before-669.json`, 2026-10-23T03:03Z): **regressed 0**, fixed 4 (CATOV-002 ×4), skip→pass 6 (CATV-018/019/020 ja+en), 9 renamed/new tests, 9 no longer present (renamed titles). Full diff: `ykk-dsr/hub/results/JOB-20261024-04/overlay-diff-vs-before-669.md`.

## 4. Executed tests

Duration = sum of all attempts. "pending annotation" = the test passed its executed checks, but part of the TC could not be compared (see §7). It is not a final Pass.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 5.0 s (1 attempt) | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 5.2 s (1 attempt) | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 7.6 s (1 attempt) | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 7.0 s (1 attempt) | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 5.8 s (1 attempt) | — |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 4.5 s (1 attempt) | — |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 4.6 s (1 attempt) | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 5.6 s (1 attempt) | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 4.7 s (1 attempt) | — |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 5.5 s (1 attempt) | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 4.2 s (1 attempt) | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit (`catalog-download/DSR-570.catalog-download.spec.ts`) | fail | 19.9 s (2 attempts) | Error: gated PDF URL delivered to the browser before submit |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 7.7 s (1 attempt) | — |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) (`catalog-download/DSR-570.catalog-download.spec.ts`) | fail | 7.6 s (2 attempts) | Error: fixed texts containing Japanese |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 4.9 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.9 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.9 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail | 16.0 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 10.5 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.7 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail | 15.4 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 6.5 s (1 attempt) | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 3.3 s (1 attempt) | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 6.2 s (1 attempt) | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail | 22.9 s (2 attempts) | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 6.1 s (1 attempt) | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.5 s (1 attempt) | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 8.7 s (1 attempt) | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 4.2 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 4.2 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.3 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail | 12.0 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.8 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 8.0 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail | 13.7 s (2 attempts) | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.7 s (1 attempt) | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 6.2 s (1 attempt) | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 2.2 s (1 attempt) | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 2.9 s (1 attempt) | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.3 s (1 attempt) | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail | 23.9 s (2 attempts) | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 6.5 s (1 attempt) | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 3.6 s (1 attempt) | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 7.9 s (1 attempt) | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.7 s (1 attempt) | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 6.2 s (1 attempt) | — |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.7 s (1 attempt) | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 7.9 s (1 attempt) | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 8.5 s (1 attempt) | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 11.3 s (1 attempt) | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.1 s (1 attempt) | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.8 s (1 attempt) | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.3 s (1 attempt) | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.4 s (1 attempt) | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.3 s (1 attempt) | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 7.0 s (1 attempt) | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.4 s (1 attempt) | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.7 s (1 attempt) | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.3 s (1 attempt) | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.0 s (1 attempt) | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.7 s (1 attempt) | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.1 s (1 attempt) | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.9 s (1 attempt) | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.0 s (1 attempt) | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.3 s (1 attempt) | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.6 s (1 attempt) | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.3 s (1 attempt) | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.2 s (1 attempt) | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 8.5 s (1 attempt) | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.4 s (1 attempt) | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 6.7 s (1 attempt) | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.5 s (1 attempt) | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.4 s (1 attempt) | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.7 s (1 attempt) | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 6.9 s (1 attempt) | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.0 s (1 attempt) | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 6.0 s (1 attempt) | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 8.1 s (1 attempt) | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 7.7 s (1 attempt) | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.0 s (1 attempt) | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 7.5 s (1 attempt) | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.2 s (1 attempt) | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 7.6 s (1 attempt) | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.3 s (1 attempt) | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 7.1 s (1 attempt) | — |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 4.1 s (1 attempt) | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.9 s (1 attempt) | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 1.6 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 10.4 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 7.2 s (1 attempt) | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 5.7 s (1 attempt) | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 5.9 s (1 attempt) | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 5.7 s (1 attempt) | — |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.8 s (1 attempt) | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.9 s (1 attempt) | — |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.3 s (1 attempt) | — |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.8 s (1 attempt) | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.6 s (1 attempt) | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.7 s (1 attempt) | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.6 s (1 attempt) | — |
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first (`movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`) | pass | 10.7 s (1 attempt) | — |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed (`movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`) | pass | 6.8 s (1 attempt) | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 (`movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts`) | pass | 9.6 s (1 attempt) | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 (`movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts`) | pass | 6.7 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.7 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.0 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.8 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.8 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.7 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.9 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.7 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.8 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.8 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.8 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.7 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.5 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.7 s (1 attempt) | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s (1 attempt) | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.8 s (1 attempt) | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 2.3 s (1 attempt) | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.6 s (1 attempt) | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 2.2 s (1 attempt) | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 4.3 s (1 attempt) | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 3.8 s (1 attempt) | — |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.1 s (1 attempt) | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 1.0 s (1 attempt) | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 1.0 s (1 attempt) | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 2.6 s (1 attempt) | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 2.2 s (1 attempt) | — |
| DSR-PDO-002 | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 0.4 s (1 attempt) | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 4.6 s (1 attempt) | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 4.2 s (1 attempt) | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 7.1 s (1 attempt) | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 7.5 s (1 attempt) | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 0.1 s (1 attempt) | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 5.1 s (1 attempt) | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 4.9 s (1 attempt) | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 3.3 s (1 attempt) | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 3.2 s (1 attempt) | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 4.4 s (1 attempt) | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 7.2 s (1 attempt) | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 6.2 s (1 attempt) | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [ja] listing card images of qa529 articles absolute, GET 200: Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [en] listing card images of qa529 articles absolute, GET 200: Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-CATDL-017 | DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form: no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 | DSR-CATDL-016 [cn] fixed texts translated (Chinese): cn: no /master/cn (Issue #18) |
| DSR-CATOV-006 | DSR-CATOV-006 [ja] unpublished DSR CF → 404 on both hosts, removed from query-index: TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 | DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl): Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 | DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl): Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-VOV-004 | DSR-VOV-004 [en] CF related name with uppercase / underscore → 404: TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 | DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404: TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 | DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .aem.live: TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-010 | DSR-VOV-010 [en] unpublished CF related → 404 on both hosts, absent from query-index: TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/tech-talk stays a list page: tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 | DSR-VOV-011 [en] video/tech-talk stays a list page: tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-016 | DSR-VOV-016 [en] related contents ordered by update date, newest first: TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 | DSR-VOV-017 [en] DSR-173 Group A page switched to the overlay page: DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-538-retest | DSR-538-retest [en] qa587-main (.aem.page) related card hrefs on the EDS host, HTTP 200: No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest | DSR-538-retest [ja] qa587-main (.aem.page) related card hrefs on the EDS host, HTTP 200: No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest | DSR-538-retest [en] qa587-main (.aem.live) related card hrefs on the EDS host, HTTP 200: No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest | DSR-538-retest [ja] qa587-main (.aem.live) related card hrefs on the EDS host, HTTP 200: No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-preview: preview-only CF: not on .aem.live (HTTP 404 = expected) |
| DSR-PCF-001 | DSR-PCF-001 [ja] DM_product field set matches ver0.4 (10 tabs, 83 fields): Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 | DSR-PCF-002 [ja] removed fields and old spellings not shown in the CF editor: Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 | DSR-PCF-003 [ja] field types match fix list: Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 | DSR-PCF-004 [ja] required fields enforced on save (negative): Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 | DSR-PCF-005 [ja] single-line text accepts 255 characters (boundary): Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 | DSR-PCF-006 [ja] zipperChainTypeCategories tag picker stores several chain-type tags: Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 | DSR-PCF-008 [ja] data entry template columns match the model: Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 | DSR-PCF-009 [ja] bulk import with revised template: Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 | DSR-PCF-010 [ja] bulk import rejects row missing a required field (negative): Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 | DSR-PCF-011 [ja] pre-change product CF opens and keeps retained values: Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 | DSR-PCF-012 [ja] ja / en / cn folders use the same model: Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 | DSR-PCF-013 [ja] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names: Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 | DSR-PCF-013 [en] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names: Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 | DSR-PCF-014 [ja] product search JSON entry has search keys and no removed fields: Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 | DSR-PCF-015 [ja] product detail of TD-585-01 renders without errors (regression): Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 | DSR-PCF-018 [ja] product CF name = numeric productId in content CF folder: Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 | DSR-PCF-018 [en] product CF name = numeric productId in content CF folder: Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-006 | DSR-PDO-006 [ja] CF related in subfolder → no page (404): TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 | DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live: TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 | DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index: TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-020 | DSR-PDO-020 [ja] ver0.4 new fields – current state recorded (Blocked: no design): Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |

## 6. Failed tests

All 8 fails also failed in the pre-669 run (`overlay-before-669.json`). They are known and not caused by 669 (JOB-20261023-07 summary).

### DSR-CATDL-007 [ja] — form-gated PDF URL not exposed before submit
- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:195` ('gated PDF URL delivered to the browser before submit')
- Expected: `[]`. Actual: `dsr-catalog-list response: item qa190-cat-pdf-form (requiresForm=true) pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/pdf/sample-pdf-a4-size-65kb.pdf`
- Attempts: failed / failed. Evidence: `test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium{,-retry1}/test-failed-1.png`

### DSR-CATDL-016 [en] — fixed texts translated (no Japanese)
- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:245` ('fixed texts containing Japanese')
- Expected: `[]`. Actual: 44 lines of Japanese form labels (e.g. `必須 氏名（姓）`, `必須 メールアドレス`, `デザイナー`).
- Attempts: failed / failed. Evidence: `test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium{,-retry1}/test-failed-1.png`

### DSR-CATOV-001 [ja]/[en] qa190-cat-pdf-form and qa190-cat-ebook-form (4 tests) — catalog name shown
- Failing assertion: `toHaveText` on `.catalog-detail-title` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Expected "QA190 PDF form required" / "QA190 e-book form"; actual "catalog pdf form" / "catalog ebook form" (content CF dev-sample titles, data).
- Attempts: failed / failed each. Evidence: `test-results/catalog-overlay-DSR-654.ca-{df8ef,7452c,2f7b8,2b0d7}-with-the-catalog-name-shown-chromium{,-retry1}/test-failed-1.png`

### DSR-CATOV-012 [ja]/[en] — catalog list card links to the overlay page
- Failing assertion: `toBeVisible` card 'QA190 PDF catalog' — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277`
- Expected: visible card. Actual: element(s) not found (no card with that title; list shows 14 cards, see `lists-after-669.json`).
- Attempts: failed / failed each. Evidence: `test-results/catalog-overlay-DSR-654.ca-{c09f8,3ced6}-d-links-to-the-overlay-page-chromium{,-retry1}/test-failed-1.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- The diff key is project + file + title. 9 tests were renamed after 23/10 (JOB-23-10 re-baselines of CATOV-009/010/021, VOV-002/008, PDO-002). Those show as "no longer present" + "new"; all 9 new titles pass.
- The 8 fails were not re-triaged in this job. Cause and suspect come from JOB-20261023-07 (data / product, cause none).
- Run on HEAD 1bf151d plus this job's uncommitted new spec (not tagged `@overlay`, so not in this run).
