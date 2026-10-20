# Visual capture DEV — JOB-20261019-06

## 1. Header

- Run start (UTC): 2026-10-20T00:57:43.482Z
- Run end (UTC): 2026-10-20T01:01:05.432Z
- Environment: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: all 11 JOB-ZZ-IDLE-16 paths plus ja/en test-space/video-list; full list in job result.json.
- Build under test: not independently verified.
- Baseline: JOB-ZZ-IDLE-16.
- Automation HEAD: 95fc62a2de17883d262f14d841d9e1c20a929afd
- Exact command: `node /tmp/job06/run.cjs` (loads envs/dev.env; temporary capture script, not committed).

## 2. TypeScript check

`npx tsc --noEmit`: exit 0; no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---|---|---:|---:|---:|---|---|
| 26 capture targets | N/A | N/A | 4 | 0 | 2 | One retry after capture timeout; 1 targets retried | 201.9s |

Capture observations only, no test verdicts or npm suite. 21 captured; 1 capture errors; 4 pixel comparisons.

## 4. Executed tests

No assertion tests; capture targets below. Per-target durations not instrumented.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| N/A | /master/ja/test-space/dsr552-bc/child/grandchild 390x844 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/ja/test-space/dsr552-bc/child/grandchild 1440x900 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/en/test-space/dsr552-bc/child/grandchild 390x844 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/en/test-space/dsr552-bc/child/grandchild 1440x900 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/ja/test-space/dsr552-edge/long/leaf 390x844 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/ja/test-space/dsr552-edge/long/leaf 1440x900 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/ja/test-space/list-catalog 390x844 | captured; diff 41.461834% | Not recorded | — |
| N/A | /master/ja/test-space/list-catalog 1440x900 | captured; diff 8.150612% | Not recorded | — |
| N/A | /master/en/test-space/list-catalog 390x844 | captured; diff 41.448457% | Not recorded | — |
| N/A | /master/en/test-space/list-catalog 1440x900 | captured; diff 8.147396% | Not recorded | — |
| N/A | /master/en/test-space/dsr-173-video-detail 1440x900 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/en/test-space/dsr-173-video-detail 390x844 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/en/test-space/dsr-278-product-detail 390x844 | error; diff unavailable% | Not recorded | page.waitForLoadState: Timeout 120000ms exceeded. |
| N/A | /master/en/test-space/dsr-278-product-detail 1440x900 | captured; diff unavailable% | Not recorded | Baseline capture unavailable: error |
| N/A | /master/ja/test-space/product-list 1440x900 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/ja/test-space/product-list 390x844 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/ja 1440x900 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/ja 390x844 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/en 1440x900 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/en 390x844 | captured; diff unavailable% | Not recorded | JOB-ZZ-IDLE-16 PNG not retained (only >2% were committed) |
| N/A | /master/ja/test-space/video-list 1440x900 | captured; diff unavailable% | Not recorded | Supplemental list count target; absent from baseline page list |
| N/A | /master/ja/test-space/video-list 390x844 | captured; diff unavailable% | Not recorded | Supplemental list count target; absent from baseline page list |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| /master/en/test-space/product-list 1440x900 | HTTP 404 |
| /master/en/test-space/product-list 390x844 | HTTP 404 |
| /master/en/test-space/video-list 1440x900 | HTTP 404 |
| /master/en/test-space/video-list 390x844 | HTTP 404 |

## 6. Failed tests

None. No assertions or pass/fail verdicts. Product-detail mobile returned HTTP 200 but network idle timed out at 60s and 120s; no screenshot generated. Raw timeout messages are in result.json. This is a capture error, not a product verdict.

## 7. Open points for QA

- Missing baseline PNGs block complete comparison; status needs-input. Only four catalog images retained by IDLE-16.
- Merge/build identity not verified. Host UTC run start precedes the job's 07:45 queue annotation (timezone unspecified).
- Initial DOM card counts only; historical counts unavailable. Video ja URL documented in docs/DSR-557/discovery-DEV.md; en counterpart probed.
- Screenshot differences may include dynamic content/rendering. No verdicts.
- Committed evidence: ykk-dsr/hub/results/JOB-20261019-06/evidence/ (only diffs >2%). Other captures: /tmp/job06/ (not committed); test-results/ and playwright-report/ remain gitignored.
