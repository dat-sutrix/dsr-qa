# DSR-570 DEV automation run — 20261020 (JOB-20261020-05, rerun after catalog overlay merge)

## 1. Header

- Run start (UTC): 2026-10-20T05:53:00Z
- Run end (UTC): 2026-10-20T05:54:48Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/{ja,en}/test-space/dsr-570-catalog-detail` (ja 200, en 404), `/master/{ja,en}/test-space/list-catalog` (200), and the card targets `/{ja,en}/library/catalog/qa190-cat-pdf-form` (404 on .live)
- Build under test: not independently verified (no build ID exposed). The catalog overlay was merged to dev ~12:45 UTC+7 (05:45Z). The front-end `scripts/catalog-link.js` changed again (DSR-655 Y3, e-book gated) between ~05:52Z and ~05:56Z. This run may have straddled that deploy.
- Baseline ID: none for DSR-570 (TC Expected results, unchanged)
- Automation HEAD commit SHA: `098be3c2ae7fb0464ed9fdb9ebc599487c724277` (no code changes)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job0505-570.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit` (2026-10-20T05:52Z)
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 16 | 8 | 3 | 5 | 1 | 2 | 1 configured; 3 used (all failed again) | 1.8 min |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope: one spec file, ja + en (+ cn fixme), Chromium. Flaky: 0.
The JSON report was lost, because the next run (DSR-557) cleaned `test-results/`. Results come from the list-reporter log.

## 4. Executed tests

Durations are per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | passed | 4.3s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 3.5s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 3.8s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | failed | 8.9s + 8.8s | card → /ja/library/catalog/qa190-cat-pdf-form, page 404 on .live: no form |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | passed | 4.3s | — (pre DSR-655 Y3 deploy) |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 3.2s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | failed | 8.8s + 9.0s | card → /en/library/catalog/qa190-cat-pdf-form, 404 on .live (exists only on .page) |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | passed | 3.9s | — (pre DSR-655 Y3 deploy) |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 3.4s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | 9.3s + 8.7s | gated PDF URL in dm-catalog-list response (unchanged since 16/10) |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | passed | 6.2s | — |

## 5. Skipped tests

The JSON report was lost, so the skip reasons below are **not verbatim from this run**. They were reconstructed from the spec code plus HTTP checks made at 05:58Z.

| TC ID | Skip reason (reconstructed) |
|---|---|
| DSR-CATDL-001 [en] | `blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404` (URL confirmed 404) |
| DSR-CATDL-002 [en] | same as above |
| DSR-CATDL-016 [en] | same as above |
| DSR-CATDL-017 [ja] | `no catalog-ID mechanism on DEV yet: "QA190 PDF form required" card href carries no catalog id; demo form page is not bound to a CF (Ngoc 10/15)` (the href is now a path `/ja/library/catalog/qa190-cat-pdf-form`, not a query parameter) |
| DSR-CATDL-016 [cn] | `cn: no /master/cn (Issue #18)` (fixme) |

## 6. Failed tests

### DSR-CATDL-006 [ja] / [en] — requiresForm=true card leads to the download form

- Failing assertion: `await expect(form.form).toHaveCount(1)` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:101`
- Expected: following the `QA190 PDF form required` card lands on a page with one download form
- Actual: 0 forms in `.catalog-detail.block`. The card href is now `/{lang}/library/catalog/qa190-cat-pdf-form`, which is the new overlay detail page. On .live this returns 404 for both languages. It exists only for en on .aem.page (preview, not yet published). For ja there is no DSR CF at all.
- Attempt(s): failed / failed on retry, both languages
- Evidence paths: none retained (screenshots under `test-results/` were removed by the next run's output clean). The same state is recorded in `ykk-dsr/hub/results/JOB-20261020-05/inventory.md`.
- Classification: **merge-expected / data**. The new link target is correct by design. The DSR CFs/pages for ja and en still need to be created and published (Night Pack).

### DSR-CATDL-007 [ja] — form-gated PDF URL not exposed before submit

- Failing assertion: `expect(gatedHits, 'gated PDF URL delivered to the browser before submit').toEqual([])` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:187`
- Expected: `[]`
- Actual: `["dm-catalog-list response: item qa190-cat-pdf-form (requiresForm=true) pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf"]`
- Attempt(s): failed / failed
- Evidence paths: none retained (see above)
- Classification: **product, not merge-related**. This failure has been identical since 2026-10-16. Note: the new `catalog-detail.js` says the gated PDF is "public, like every catalog PDF today — DSR-655 Y4", so this may become a TC decision.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- CATDL-018 passed in both languages, but this was most likely just before the DSR-655 Y3 deploy. At 05:57Z the `QA190 e-book form` card links to `/{lang}/library/catalog/qa190-cat-ebook-form` (404), not to `ebookUrl`. A rerun now is expected to fail CATDL-018. Its Expected result ("opens ebookUrl without form") conflicts with DSR-655 Y3, so it needs a TC decision (suspect: test).
- CATDL-017's id mechanism is now a path segment (`/library/catalog/{catalogId}`), not a query parameter, so the test skips. The test needs an update to cover path ids.
- The JSON report and failure screenshots were lost because the DSR-557 run cleaned `test-results/`. Durations and assertions come from the list log. Skip reasons are reconstructed, not verbatim.
- The build identity was not verified.
