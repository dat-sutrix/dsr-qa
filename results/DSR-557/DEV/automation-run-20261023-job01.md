# DSR-557/654 DEV automation run — 20261023-job01

## 1. Header
- Run start/end UTC: 2026-10-23T00:56:37.418Z / 2026-10-23T00:59:10.919340+00:00
- Environment: DEV; https://main--dsr-eds-dev--sutrix-projects.aem.live and https://main--dsr-eds-dev--sutrix-projects.aem.page
- Target pages: /ja/library/catalog, /en/library/catalog
- Build under test: not independently verified.
- Baseline: JOB-20261023-01 pass criteria (no design baseline).
- Automation HEAD: 504e4d5b64e39be12223dd78b8819bc5a5470409
- Commands: `node results/JOB-20261023-01/run.cjs`; `node results/JOB-20261023-01/direct.cjs`; `python3 results/JOB-20261023-01/report.py`.

## 2. TypeScript check
`npx tsc --noEmit`: exit 0; no errors.

## 3. Suite summary
| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---|---|---|
| 12 | 6 | 6 | 0 | 0 | 4 concurrent contexts | 0; three requested independent loads | 153.5 s including follow-up/report |
Read-only Chromium capture; proposed classifications, not final QA verdicts. Four successful direct GETs supplement the 12 loads. Initial direct-fetch API errors were corrected and repeated separately.

## 4. Executed tests
| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| catalog-live-en-1 | https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog load 1 | pass (recovered) | 46.7s | — |
| catalog-live-en-2 | https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog load 2 | pass (recovered) | 46.5s | — |
| catalog-live-en-3 | https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog load 3 | pass (recovered) | 45.5s | — |
| catalog-live-ja-1 | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog load 1 | fail (render issue) | 46.6s | 0 cards; direct JSON 7 items; no catalog-list request |
| catalog-live-ja-2 | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog load 2 | fail (render issue) | 46.5s | 0 cards; direct JSON 7 items; no catalog-list request |
| catalog-live-ja-3 | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog load 3 | fail (render issue) | 45.6s | 0 cards; direct JSON 7 items; no catalog-list request |
| catalog-page-en-1 | https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog load 1 | pass (recovered) | 46.6s | — |
| catalog-page-en-2 | https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog load 2 | pass (recovered) | 46.3s | — |
| catalog-page-en-3 | https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog load 3 | pass (recovered) | 45.6s | — |
| catalog-page-ja-1 | https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog load 1 | fail (render issue) | 46.8s | 0 cards; direct JSON 7 items; no catalog-list request |
| catalog-page-ja-2 | https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog load 2 | fail (render issue) | 46.4s | 0 cards; direct JSON 7 items; no catalog-list request |
| catalog-page-ja-3 | https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/catalog load 3 | fail (render issue) | 45.5s | 0 cards; direct JSON 7 items; no catalog-list request |

## 5. Skipped tests
None.

## 6. Failed tests

### catalog-live-ja-1
- Failing criterion: job pass criteria (`ykk-dsr/hub/jobs/running/JOB-20261023-01.md:27`); observational capture, no assertion thrown.
- Expected for recovery: ≥1 card. Actual: 0 cards; direct JSON 7 items; no catalog-list request in 45 seconds.
- Evidence: `evidence/JOB-20261023-01/ja-live-1.png` (committed).
- Cause none; product-bug confidence 70%, configuration not verified.

### catalog-live-ja-2
- Failing criterion: job pass criteria (`ykk-dsr/hub/jobs/running/JOB-20261023-01.md:27`); observational capture, no assertion thrown.
- Expected for recovery: ≥1 card. Actual: 0 cards; direct JSON 7 items; no catalog-list request in 45 seconds.
- Evidence: `evidence/JOB-20261023-01/ja-live-2.png` (committed).
- Cause none; product-bug confidence 70%, configuration not verified.

### catalog-live-ja-3
- Failing criterion: job pass criteria (`ykk-dsr/hub/jobs/running/JOB-20261023-01.md:27`); observational capture, no assertion thrown.
- Expected for recovery: ≥1 card. Actual: 0 cards; direct JSON 7 items; no catalog-list request in 45 seconds.
- Evidence: `evidence/JOB-20261023-01/ja-live-3.png` (committed).
- Cause none; product-bug confidence 70%, configuration not verified.

### catalog-page-ja-1
- Failing criterion: job pass criteria (`ykk-dsr/hub/jobs/running/JOB-20261023-01.md:27`); observational capture, no assertion thrown.
- Expected for recovery: ≥1 card. Actual: 0 cards; direct JSON 7 items; no catalog-list request in 45 seconds.
- Evidence: `evidence/JOB-20261023-01/ja-page-1.png` (committed).
- Cause none; product-bug confidence 70%, configuration not verified.

### catalog-page-ja-2
- Failing criterion: job pass criteria (`ykk-dsr/hub/jobs/running/JOB-20261023-01.md:27`); observational capture, no assertion thrown.
- Expected for recovery: ≥1 card. Actual: 0 cards; direct JSON 7 items; no catalog-list request in 45 seconds.
- Evidence: `evidence/JOB-20261023-01/ja-page-2.png` (committed).
- Cause none; product-bug confidence 70%, configuration not verified.

### catalog-page-ja-3
- Failing criterion: job pass criteria (`ykk-dsr/hub/jobs/running/JOB-20261023-01.md:27`); observational capture, no assertion thrown.
- Expected for recovery: ≥1 card. Actual: 0 cards; direct JSON 7 items; no catalog-list request in 45 seconds.
- Evidence: `evidence/JOB-20261023-01/ja-page-3.png` (committed).
- Cause none; product-bug confidence 70%, configuration not verified.

## 7. Open points for QA
- Proposed outcomes only; no design verdict.
- Japanese page emitted no catalog-list request; Japanese direct URL derived by replacing /en/ with /ja/ in observed English URL, preserving endpoint, folder format and cache parameter.
- Item lang fields absent are recorded as null; language folders are preserved separately in paths. No authenticated Author/data verification.
- Deployed build not independently verified.
- Initial capture process used an unavailable browser.request API for direct fetch; direct.cjs successfully repeated all four GETs. run.cjs corrected. No browser attempts repeated.
- All raw measurements: results/JOB-20261023-01/result.json. No artifacts under test-results/ or playwright-report/ included.
