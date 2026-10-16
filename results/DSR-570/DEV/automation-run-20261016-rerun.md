# DSR-570 DEV automation run — 20261016-rerun

## 1. Header

- Run start (UTC): 2026-10-16T13:22:54Z
- Run end (UTC): 2026-10-16T13:26:02Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/ja/test-space/dsr-570-catalog-detail`, `/master/en/test-space/dsr-570-catalog-detail`, `/master/{ja,en}/test-space/list-catalog`
- Build under test: not independently verified (EDS `main` branch as served on DEV at run time)
- Baseline ID: BL-v1 (DSR-192 BAC 1–5 / TCC 1–4 + DSR-570 comments 60987/61054 + Figma C10 3326-80556; `ykk-dsr/hub/tc-out/DSR-570.spec.json`)
- Automation HEAD commit SHA: `acc434f4dd9a303c350d8173573b7e825140f475` plus the uncommitted new DSR-570 files of JOB-20261016-12 (committed together with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-570-job12-rerun.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before this test run)

Change since previous run: DSR-CATDL-018 now records popup navigations with a `context.on('request')` listener and `try/catch` around `request.frame()`.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 16 | 5 | 3 | 8 | 1 | 2 | configured 1; 3 tests retried, all failed again | 188 s (Playwright 3.1 m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: DSR-570 spec only; chromium project. Flaky outcomes: 0.

## 4. Executed tests

Per-test durations were retained only for the rows shown with a value (the JSON was overwritten by the next run). The pass set is taken from the run counts and matches run 1; it was not retained per test.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders | passed (per counts) | not retained | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed (per counts) | not retained | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed (per counts) | not retained | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed (per counts) | not retained | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 3.7s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | failed | 20.7s + 21.6s | no popup navigation recorded within 15 s — test defect |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | failed | 23.5s + 24.2s | no popup navigation recorded within 15 s — test defect |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | not retained | gated PDF URL in dm-catalog-list response (same as run 1) |

## 5. Skipped tests

8 skipped (count from run output). Reasons are produced by the same unchanged preflight code as run 1; per-test reasons for this run were not retained:

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATDL-006 [ja] | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/ja/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15: demo page is layout only, not bound to catalog CF) |
| DSR-CATDL-006 [en] | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/en/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15: demo page is layout only, not bound to catalog CF) |
| DSR-CATDL-001 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-002 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-010 [ja] | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/ja/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15) + HubSpot EX-06/EX-07 |
| DSR-CATDL-017 [ja] | no catalog-ID mechanism on DEV yet: "QA190 PDF form required" card not rendered; demo form page is not bound to a CF (Ngoc 10/15) |
| DSR-CATDL-016 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-016 [cn] | cn: no /master/cn (Issue #18) (fixme) |

## 6. Failed tests

### DSR-CATDL-018 [ja] / [en] — e-book form card opens ebookUrl without form

- Failing assertion: `expect.poll(() => navigations.length, { timeout: 15_000 }).toBeGreaterThan(0)` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:117` (intermediate version)
- Expected: ≥ 1 popup navigation recorded.
- Actual: 0. The `catch` around `request.frame()` discarded exactly the popup's first navigation (issued before its frame exists).
- Attempt(s): failed initial and retry.
- Evidence paths: `test-results/…-c-937ce-…/test-failed-1.png`, `…-c-b8a9e-…/test-failed-1.png` (overwritten).
- Proposed suspect: test. Fixed in rerun2 (frame-less navigations are now kept).

### DSR-CATDL-007 [ja]

Same failure as run 1 (assertion at `tests/catalog-download/DSR-570.catalog-download.spec.ts:183` after line shift); see automation-run-20261016.md §6.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**.

## 7. Open points for QA

- All outcomes are proposals; human QA confirms.
- Build identity on DEV was not independently verified.
- 007: the exposure is the GraphQL response for the list page (client-side query to the AEM publish host). Whether this counts as a TCC#3 violation, or whether gating is planned server-side/HubSpot later (A4), is for QA/dev to decide. A distinct PDF asset for `qa190-cat-pdf-form` would remove the shared-file ambiguity.
- 002 passed on structure only (A2). Observed ja fields: lastname, firstname, email, phone, company (required text/email/tel), department (optional), jobtitle, location, field (required selects), jobfunction (9 checkboxes; group legend 必須 but no `required` on the inputs), plus 2 consent checkboxes (`consent_contact`, `consent_store`), both `required`. Only `consent_store` mentions 個人情報. "必須"/"任意" badge text is part of each label. Field `field` (あなたの担当分野は？) offers prefecture options, the same as 勤務地 — likely placeholder content.
- 003 passed via `required` on the consent checkbox; the button is not disabled. Button was never clicked.
- 001 ja: image is a placeholder SVG (`/blocks/listing/fixtures/placeholder1.svg`, naturalWidth 400); the demo content (AQUASEAL®, 2022.01.20) is not bound to a CF.
- 010/017: demo page has no catalog ID in URL or hidden inputs (`hiddenInputs: []`); `?id=999999` returns 200 with the same demo catalog. Recorded only; the TCs are skipped because the requiresForm=true card is not rendered.
- 018 follows ebookUrl to an external site (`https://www.ykkfastening.com/`, which redirects to ykkdigitalshowroom.com). Read-only navigation only.
- CF paths/catalogIds on DEV differ from the TD sheet (see docs/DSR-570/test-data.md); `qa190-cat-ebook-form` catalogId has 2 trailing spaces.
- Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; it is overwritten by later runs.
