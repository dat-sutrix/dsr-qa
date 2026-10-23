# REGRESSION DEV automation run — 20261023-job15

Job: `JOB-20261023-15` (R2 regression for `block:catalog-detail`, Martin's refactor 23/10).

## 1. Header

- Run start (UTC): 2026-10-23T06:08:29Z
- Run end (UTC): 2026-10-23T06:12:06Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /{ja,en}/library/catalog/qa190-cat-* (pdf, pdf-form, ebook, ebook-form), /{ja,en}/library/catalog (list), catalog download form pages, catalog/video list pages
- Build under test: not independently verified. `blocks/catalog-detail/catalog-detail.js` on `.aem.live` and `.aem.page`: `Last-Modified: Thu, 22 Oct 2026 01:48:45 GMT`, ETag `"b7e43493b9bdc11fcbbeb85cf528194e"` (checked 06:13Z). That is **older than** the refactor reported in CHANGES.md (23/10 ~12:50 VN). The refactor may not be deployed to DEV `main` yet.
- Baseline ID: BL-OVL-1 / Regression S12 ledger (`ykk-dsr/hub/results/REGRESSION/ledger.json`)
- Automation HEAD commit SHA: ade60e987f6aadeb2ecb3eec8462fb43cae64051
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j15.json npm run test:dev -- tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts tests/catalog-download/DSR-570.catalog-download.spec.ts tests/catalog-video/DSR-557.catalog-video.spec.ts --grep "\[(ja|en)\]"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 100 | 85 | 8 | 7 | 1 | 2 | 1 configured; 8 retried (all failed again) | 3.6 min (217 s) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms them.
Scope/browser: subset (3 specs, ja + en; cn tests excluded by grep); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is summed over attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 [ja] | DSR-CATDL-001 [ja] catalog detail header renders | pass | 4.8 s | — |
| DSR-CATDL-002 [ja] | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | pass | 4.5 s | — |
| DSR-CATDL-005 [ja] | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | pass | 4.7 s | — |
| DSR-CATDL-006 [ja] | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | pass | 5.1 s | — |
| DSR-CATDL-018 [ja] | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form | pass | 1.8 s | — |
| DSR-CATDL-001 [en] | DSR-CATDL-001 [en] catalog detail header renders | pass | 1.3 s | — |
| DSR-CATDL-002 [en] | DSR-CATDL-002 [en] download form fields, labels, consent and button present | pass | 1.7 s | — |
| DSR-CATDL-005 [en] | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | pass | 2.1 s | — |
| DSR-CATDL-006 [en] | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | pass | 2.0 s | — |
| DSR-CATDL-018 [en] | DSR-CATDL-018 [en] e-book form card links to the detail page with the form | pass | 3.4 s | — |
| DSR-CATDL-003 [ja] | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | pass | 3.0 s | — |
| DSR-CATDL-007 [ja] | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | fail | 9.0 s (2 attempts) | gated PDF URL (pdfAsset._publishUrl) in dsr-catalog-list response before submit |
| DSR-CATDL-010 [ja] | DSR-CATDL-010 [ja] catalog ID handed to the form | pass | 2.9 s | — |
| DSR-CATDL-016 [en] | DSR-CATDL-016 [en] fixed texts translated (no Japanese) | fail | 3.3 s (2 attempts) | Japanese fixed texts on the en form (必須, 氏名（姓）…) |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 5.9 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.8 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 1.1 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap | pass | 1.2 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 13.2 s (2 attempts) | title expected "QA190 PDF form required", rendered "catalog pdf form" |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.4 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 0.3 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 8.7 s | — |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.5 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 0.5 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap | pass | 0.4 s | — |
| DSR-CATOV-001 [ja] | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 12.4 s (2 attempts) | title expected "QA190 e-book form", rendered "catalog ebook form" |
| DSR-CATOV-002 [ja] | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.6 s | — |
| DSR-CATOV-003 [ja] | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [ja] | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 0.5 s | — |
| DSR-CATOV-004 [ja] | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | pass | 0.1 s | — |
| DSR-CATOV-005 [ja] | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 3.8 s | — |
| DSR-CATOV-007 [ja] | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | pass | 0.8 s | — |
| DSR-CATOV-008 [ja] | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 1.9 s | — |
| DSR-CATOV-012 [ja] | DSR-CATOV-012 [ja] catalog list card links to the overlay page | fail | 15.5 s (2 attempts) | no list card 'QA190 PDF catalog' (TD-190 not seeded) |
| DSR-CATOV-015 [ja] | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 4.1 s | — |
| DSR-CATOV-016 [ja] | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 1.5 s | — |
| DSR-CATOV-017 [ja] | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 9.4 s | — |
| DSR-CATOV-019 [ja] | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 3.7 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 3.9 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.3 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | pass | 0.1 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap | pass | 0.4 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 13.4 s (2 attempts) | title expected "QA190 PDF form required", rendered "catalog pdf form" |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.9 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.3 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | pass | 1.4 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file | pass | 7.9 s | — |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 0.9 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | pass | 1.3 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap | pass | 1.3 s | — |
| DSR-CATOV-001 [en] | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | fail | 14.5 s (2 attempts) | title expected "QA190 e-book form", rendered "catalog ebook form" |
| DSR-CATOV-002 [en] | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | pass | 1.3 s | — |
| DSR-CATOV-003 [en] | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | pass | 1.3 s | — |
| DSR-CATOV-021 [en] | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | pass | 1.4 s | — |
| DSR-CATOV-004 [en] | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | pass | 1.2 s | — |
| DSR-CATOV-005 [en] | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list | pass | 5.9 s | — |
| DSR-CATOV-006 [en] | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | pass | 0.1 s | — |
| DSR-CATOV-007 [en] | DSR-CATOV-007 [en] catalog/search is not taken by the overlay | pass | 0.7 s | — |
| DSR-CATOV-008 [en] | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | pass | 1.4 s | — |
| DSR-CATOV-012 [en] | DSR-CATOV-012 [en] catalog list card links to the overlay page | fail | 14.5 s (2 attempts) | no list card 'QA190 PDF catalog' (TD-190 not seeded) |
| DSR-CATOV-015 [en] | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly | pass | 4.4 s | — |
| DSR-CATOV-016 [en] | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | pass | 1.2 s | — |
| DSR-CATOV-017 [en] | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form | pass | 5.8 s | — |
| DSR-CATOV-019 [en] | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type | pass | 3.7 s | — |
| DSR-CATOV-009 [en] | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | pass | 0.3 s | — |
| DSR-CATOV-010 [en] | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | pass | 3.9 s | — |
| DSR-CATOV-011 [en] | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | pass | 0.1 s | — |
| DSR-CATOV-014 [en] | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list | pass | 4.1 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | pass | 2.0 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | pass | 1.9 s | — |
| DSR-CATV-002 [ja] | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | pass | 1.1 s | — |
| DSR-CATV-006 [ja] | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 1.7 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | pass | 1.5 s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | pass | 1.8 s | — |
| DSR-CATV-002 [ja] | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | pass | 1.5 s | — |
| DSR-CATV-006 [ja] | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 1.7 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | pass | 1.5 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | pass | 1.8 s | — |
| DSR-CATV-002 [en] | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | pass | 0.8 s | — |
| DSR-CATV-006 [en] | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | pass | 1.7 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | pass | 1.5 s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | pass | 1.6 s | — |
| DSR-CATV-002 [en] | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | pass | 1.5 s | — |
| DSR-CATV-006 [en] | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | pass | 2.4 s | — |
| DSR-CATV-003 [ja] | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) | pass | 2.0 s | — |
| DSR-CATV-007 [ja] | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 4.8 s | — |
| DSR-CATV-003 [ja] | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) | pass | 2.6 s | — |
| DSR-CATV-007 [ja] | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 5.0 s | — |
| DSR-CATV-003 [en] | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) | pass | 1.7 s | — |
| DSR-CATV-007 [en] | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) | pass | 4.4 s | — |
| DSR-CATV-003 [en] | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) | pass | 1.7 s | — |
| DSR-CATV-007 [en] | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) | pass | 4.2 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATDL-017 [ja] | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATOV-006 [ja] | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 [ja] | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 [ja] | Visual – codex job |
| DSR-CATOV-018 [en] | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 [en] | Visual – codex job |
| DSR-CATOV-013 [en] | Manual – QA-PT |

## 6. Failed tests

### DSR-CATDL-007 [ja]

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:195` (test at line 159); failed on both attempts.
- Expected vs actual: gated PDF URL (pdfAsset._publishUrl) in dsr-catalog-list response before submit.
- Proposed cause: suspect `product`, cause `none`, 70% product-bug confidence; pre-existing, draft BUG-CAT-PDF-EXPOSE.
- Evidence: `ykk-dsr/hub/results/JOB-20261023-15/evidence/DSR-CATDL-007_ja.png` (committed); trace/error-context under `test-results/` (not committed).

### DSR-CATDL-016 [en]

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:245` (test at line 240); failed on both attempts.
- Expected vs actual: Japanese fixed texts on the en form (必須, 氏名（姓）…).
- Proposed cause: suspect `product`, cause `none`, 70% product-bug confidence; pre-existing, draft BUG-CAT-FORM-EN.
- Evidence: `ykk-dsr/hub/results/JOB-20261023-15/evidence/DSR-CATDL-016_en.png` (committed); trace/error-context under `test-results/` (not committed).

### DSR-CATOV-001 [ja] qa190-cat-pdf-form

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144` (test at line 129); failed on both attempts.
- Expected vs actual: title expected "QA190 PDF form required", rendered "catalog pdf form".
- Proposed cause: suspect `data`, cause `none`, 0% product-bug confidence; pre-existing; block renders CF catalogTitle; CF holds dev sample text.
- Evidence: `ykk-dsr/hub/results/JOB-20261023-15/evidence/DSR-CATOV-001_ja_qa190-cat-pdf-form.png` (committed); trace/error-context under `test-results/` (not committed).

### DSR-CATOV-001 [ja] qa190-cat-ebook-form

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144` (test at line 129); failed on both attempts.
- Expected vs actual: title expected "QA190 e-book form", rendered "catalog ebook form".
- Proposed cause: suspect `data`, cause `none`, 0% product-bug confidence; pre-existing; block renders CF catalogTitle; CF holds dev sample text.
- Evidence: `ykk-dsr/hub/results/JOB-20261023-15/evidence/DSR-CATOV-001_ja_qa190-cat-ebook-form.png` (committed); trace/error-context under `test-results/` (not committed).

### DSR-CATOV-012 [ja]

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277` (test at line 268); failed on both attempts.
- Expected vs actual: no list card 'QA190 PDF catalog' (TD-190 not seeded).
- Proposed cause: suspect `data`, cause `none`, 0% product-bug confidence; pre-existing; TD-190 titles not seeded.
- Evidence: `ykk-dsr/hub/results/JOB-20261023-15/evidence/DSR-CATOV-012_ja.png` (committed); trace/error-context under `test-results/` (not committed).

### DSR-CATOV-001 [en] qa190-cat-pdf-form

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144` (test at line 129); failed on both attempts.
- Expected vs actual: title expected "QA190 PDF form required", rendered "catalog pdf form".
- Proposed cause: suspect `data`, cause `none`, 0% product-bug confidence; pre-existing; block renders CF catalogTitle; CF holds dev sample text.
- Evidence: `ykk-dsr/hub/results/JOB-20261023-15/evidence/DSR-CATOV-001_en_qa190-cat-pdf-form.png` (committed); trace/error-context under `test-results/` (not committed).

### DSR-CATOV-001 [en] qa190-cat-ebook-form

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144` (test at line 129); failed on both attempts.
- Expected vs actual: title expected "QA190 e-book form", rendered "catalog ebook form".
- Proposed cause: suspect `data`, cause `none`, 0% product-bug confidence; pre-existing; block renders CF catalogTitle; CF holds dev sample text.
- Evidence: `ykk-dsr/hub/results/JOB-20261023-15/evidence/DSR-CATOV-001_en_qa190-cat-ebook-form.png` (committed); trace/error-context under `test-results/` (not committed).

### DSR-CATOV-012 [en]

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:277` (test at line 268); failed on both attempts.
- Expected vs actual: no list card 'QA190 PDF catalog' (TD-190 not seeded).
- Proposed cause: suspect `data`, cause `none`, 0% product-bug confidence; pre-existing; TD-190 titles not seeded.
- Evidence: `ykk-dsr/hub/results/JOB-20261023-15/evidence/DSR-CATOV-012_en.png` (committed); trace/error-context under `test-results/` (not committed).

## 7. Open points for QA

- **Build:** the deployed `catalog-detail.js` dates from 22/10 01:48Z, so this run probably did **not** test Martin's 23/10 refactor. Re-run R2 once the deploy is confirmed (the `Last-Modified` value changes). CHANGES.md row stays `regressed = no` until then (Claude to decide).
- **CATOV-001 -form title:** the rendered `.catalog-detail-title` = static HTML `<title>` prefix = static row `catalogTitle` (`catalog pdf form` / `catalog ebook form`, ja and en). The deployed block takes `catalogTitle` from the overlay rows (`catalog = {...cf}`, `h2.catalog-detail-title textContent = catalog.catalogTitle`). The block does not ignore the CF title, so the cause is data. The content CF in Author was not read (read-only lane, no Author access). The overlay row is taken as the CF value.
- Static pages for the form catalogs were last published 22/10 07:43Z (`Last-Modified` header).
- No NEW FAIL. All 8 fails match the ledger (`last = fail`) and earlier jobs (REG-1200, JOB-23-13).
- Evidence for failed tests is committed under `ykk-dsr/hub/results/JOB-20261023-15/evidence/`. `test-results/` and `playwright-report/` are gitignored and not committed.
