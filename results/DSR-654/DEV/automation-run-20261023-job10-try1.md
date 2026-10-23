# DSR-654 DEV automation run — 20261023-job10-try1

## 1. Header

- Run start (UTC): 2026-10-23T04:58:19Z
- Run end (UTC): 2026-10-23T04:58:57Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` tier where a test says so)
- Target page(s): /{ja,en}/library/catalog/{qa190-cat-pdf,qa190-cat-pdf-form,qa190-cat-ebook,qa190-cat-ebook-form}, /en/library/catalog/qa654-sub, /en/library/catalog/qa654-folder/qa654-sub, /query-index.json, /sitemap.xml
- Build under test: not independently verified (EDS main branch on DEV at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + JOB-20261023-10 approved Expected change (Martin 23/10 CATOV-010 by design; Dat 23/10 BUG-CAT-NOINDEX by design)
- Automation HEAD commit SHA: f87193bc3b9d10c15bfc8d815fc9e3e5ef9581f4 (+ uncommitted JOB-20261023-10 edits to tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts, committed with this report)
- Exact command used:

```sh
ENV=dev npx playwright test --grep "DSR-CATOV-(002|010|021)" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 43 | 34 | 8 | 1 | 1 | 2 | 1 configured; 8 test(s) retried | 35.8 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset – first attempt after the JOB-10 edit (CATOV-002/010/021 + DSR-587 og:image sweep titles that match the grep); superseded by automation-run-20261023-job10.md; chromium. Flaky outcomes: none.

## 4. Executed tests

Duration = summed over attempts. Failed tests failed on both attempts (initial + 1 retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 1.1 s | Error: row requiresForm |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in query-index and sitemap | failed | 1.1 s | Error: query-index rows |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.4 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 0.8 s | Error: row requiresForm |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in query-index and sitemap | failed | 1.0 s | Error: query-index rows |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.4 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 0.9 s | Error: row requiresForm |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in query-index and sitemap | failed | 1.0 s | Error: query-index rows |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.4 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 0.7 s | Error: row requiresForm |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in query-index and sitemap | failed | 1.2 s | Error: query-index rows |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | passed | 0.4 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 0.3 s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) | passed | 3.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | passed | 2.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | passed | 0.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | passed | 0.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | passed | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | passed | 1.0 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | passed | 1.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | passed | 1.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | passed | 0.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | passed | 0.2 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-preview | preview-only CF: not on .aem.live (HTTP 404 = expected) |

## 6. Failed tests

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion: `Error: row requiresForm` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:172`
- Expected / actual: Expected: "false"; Received: null
- Attempt(s): failed → failed
- Evidence paths: none generated (request-only test) / test-results/ attachments

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:195`
- Expected / actual: Expected length: 0; Received length: 1; Received array:  ["/ja/library/catalog/qa190-cat-pdf"]
- Attempt(s): failed → failed
- Evidence paths: none generated (request-only test) / test-results/ attachments

### DSR-CATOV-002 — DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion: `Error: row requiresForm` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:172`
- Expected / actual: Expected: "false"; Received: null
- Attempt(s): failed → failed
- Evidence paths: none generated (request-only test) / test-results/ attachments

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:195`
- Expected / actual: Expected length: 0; Received length: 1; Received array:  ["/ja/library/catalog/qa190-cat-ebook"]
- Attempt(s): failed → failed
- Evidence paths: none generated (request-only test) / test-results/ attachments

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion: `Error: row requiresForm` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:172`
- Expected / actual: Expected: "false"; Received: null
- Attempt(s): failed → failed
- Evidence paths: none generated (request-only test) / test-results/ attachments

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:195`
- Expected / actual: Expected length: 0; Received length: 1; Received array:  ["/en/library/catalog/qa190-cat-pdf"]
- Attempt(s): failed → failed
- Evidence paths: none generated (request-only test) / test-results/ attachments

### DSR-CATOV-002 — DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id

- Failing assertion: `Error: row requiresForm` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:172`
- Expected / actual: Expected: "false"; Received: null
- Attempt(s): failed → failed
- Evidence paths: none generated (request-only test) / test-results/ attachments

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:195`
- Expected / actual: Expected length: 0; Received length: 1; Received array:  ["/en/library/catalog/qa190-cat-ebook"]
- Attempt(s): failed → failed
- Evidence paths: none generated (request-only test) / test-results/ attachments

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- This first attempt treated a missing `requiresForm` row as the fixture value only for the noindex branch, but the existing `row requiresForm` assertion expected the literal row → 4 CATOV-002 non-form fails (`Received: null`). Fixed in the spec and re-run (automation-run-20261023-job10.md). Evidence of this attempt was overwritten by the re-run.
- CATOV-021 non-form: job Expected = NOT listed in query-index and sitemap. Observed: sitemap excludes the 4 non-form pages (pass), but /query-index.json still lists each of them once with column `robots: noindex`. Expected kept as written by the job (AGENTS §4: Expected not changed to pass). Agent view: listing in query-index with robots=noindex is standard EDS behaviour (the index is internal and may feed lists; only sitemap is for crawlers) → suspect `test`, real-bug confidence 20%. Claude to decide whether 'not in query-index' should be dropped.
- [Giả định] requiresForm is read from the static overlay HTML (content CF row). json2html emits the row only when true (observed 23/10 on qa190-cat-pdf: no requiresForm row; -form ids: row `true`), so a missing row = false. CATOV-002 'row requiresForm' assertion now reads 'absent = false' and still cross-checks against the fixture; before this change it failed on non-form ids (masked by the robots failure in earlier summaries).
- Build identity of DEV EDS/overlay not independently verified.
- The `--grep "DSR-CATOV-(002|010|021)"` subset also matches the DSR-587 overlay-seo og:image sweep tests titled `DSR-CATOV-002 … og:image sweep` (tests/overlay-seo/DSR-587.overlay-seo.spec.ts); they are included in the counts.
