# DSR-557 DEV capture run — JOB-20261022-20

## 1. Header
- Run start (UTC): 2026-10-22T10:29:51.234Z
- Run end (UTC): 2026-10-22T10:30:46.887Z
- Environment: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /ja/library/catalog, /en/library/catalog
- Build under test: not independently verified
- Baseline: JOB-20261022-20 measurable capture requirements; BUG-RULES §6 date format
- Automation HEAD: cbb5e401ba635c575ee866cc793b0bc374b0a64f
- Command: `node ykk-dsr/hub/results/JOB-20261022-20/capture.cjs`

## 2. TypeScript check
`npx tsc --noEmit`: exit 0, no errors.

## 3. Suite summary
| Total | Passed | Failed | Skipped/blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---|---|---|
| 6 | 3 | 0 | 3 blocked | 0 | 1 sequential script | 0 automated | 55.65s |
Capture-only Chromium run, not an npm test suite. Pass means measurements captured, not pixel approval. Initial setup failed before browser launch; browser installed. Initial ja attempt timed out waiting for query; diagnostic and final capture confirmed empty main.

## 4. Executed tests
| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-012 en | Count and DOM titles | Capture complete: 5 | Not individually timed | — |
| DSR-CATV-013 en | Dates, labels, thumbnails | Capture complete | Not individually timed | — |
| DSR-CATV-014 en | Mobile bounds | Capture complete: width 390, one card per row | Not individually timed | — |

## 5. Skipped tests
| TC ID | Verbatim stop reason |
|---|---|
| DSR-CATV-012 ja | list empty |
| DSR-CATV-013 ja | list empty |
| DSR-CATV-014 ja | list empty |
Job stop rule, not framework skip annotations: HTTP 200, empty main, no catalog query response in 45s.

## 6. Failed tests
None. Screenshots of all capture states are committed as explicitly required by this job at `ykk-dsr/hub/results/JOB-20261022-20/evidence/capture-20261022/` (873,131 bytes).

## 7. Open points for QA
- No Figma comparison or pixel verdict; human QA review pending.
- Japanese expected six cards unavailable; source of empty published main not verified. No Author access performed.
- English ebook-form label is literally PDF; recorded only, correctness not inferred.
- Raw card/text/image boxes and response statuses: `ykk-dsr/hub/results/JOB-20261022-20/observations.json`.
- No test-results or playwright-report artifacts generated; those directories remain gitignored.
