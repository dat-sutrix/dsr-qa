# Visual capture DEV — JOB-ZZ-IDLE-18

## 1. Header

- Run start (UTC): 2026-10-20T01:04:46.222Z
- Run end (UTC): 2026-10-20T01:08:56.083Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: all 22 IDLE-16 page/viewport pairs plus `/master/ja/test-space/dsr-590-eco-top-page` and `/master/{ja,en}/library/article/stories/qa529-01` at both viewports. Full list in job result.json.
- Build under test: not independently verified.
- Baseline ID: JOB-20261019-06 (pixels); JOB-ZZ-IDLE-16 (HTTP status). This capture becomes the requested Sprint 12 baseline.
- Automation HEAD commit SHA: bb5cf9ab211ff7633b63cb39693eae40778f8c01
- Exact command: `node /tmp/job18/run.cjs` (loads envs/dev.env; capture script retained on VPS).

## 2. TypeScript check

`npx tsc --noEmit`: exit 0; no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---|---|---:|---:|---:|---|---|
| 28 capture targets | N/A | N/A | 0 | 0 | 2 | One timeout retry allowed; 2 targets retried | 249.9s |

No assertion tests or verdicts. 26 captured; 2 capture errors. Chromium 153.0.8010.12.

## 4. Executed tests

No TC assertions; observational capture targets only. Per-target durations not instrumented.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| N/A | /master/ja/test-space/dsr552-bc/child/grandchild 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/test-space/dsr552-bc/child/grandchild 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/test-space/dsr552-bc/child/grandchild 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/test-space/dsr552-bc/child/grandchild 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/test-space/dsr552-edge/long/leaf 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/test-space/dsr552-edge/long/leaf 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/test-space/list-catalog 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/test-space/list-catalog 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/test-space/list-catalog 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/test-space/list-catalog 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/test-space/dsr-173-video-detail 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/test-space/dsr-173-video-detail 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/test-space/dsr-278-product-detail 390x844 | error; HTTP 200 | Not instrumented | page.waitForLoadState: Timeout 120000ms exceeded. |
| N/A | /master/en/test-space/dsr-278-product-detail 1440x900 | error; HTTP 200 | Not instrumented | page.waitForLoadState: Timeout 120000ms exceeded. |
| N/A | /master/ja/test-space/product-list 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/test-space/product-list 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/test-space/product-list 1440x900 | captured; HTTP 404 | Not instrumented | — |
| N/A | /master/en/test-space/product-list 390x844 | captured; HTTP 404 | Not instrumented | — |
| N/A | /master/ja 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/test-space/dsr-590-eco-top-page 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/test-space/dsr-590-eco-top-page 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/library/article/stories/qa529-01 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/ja/library/article/stories/qa529-01 390x844 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/library/article/stories/qa529-01 1440x900 | captured; HTTP 200 | Not instrumented | — |
| N/A | /master/en/library/article/stories/qa529-01 390x844 | captured; HTTP 200 | Not instrumented | — |

## 5. Skipped tests

None.

## 6. Failed tests

None. No assertions or pass/fail verdicts. Capture errors and attempts, if any, are recorded in job result.json.

## 7. Open points for QA

- Deployed build and overlay merge identity not independently verified.
- New pages and missing prior captures have no pixel comparison; null differences are not zero differences.
- Exact RGBA pixel inequality over the maximum image rectangle, counting unmatched pixels as changed; dynamic content may affect differences.
- Initial card counts only, no load-more or pagination interactions. Card selectors follow existing listing DOM classes.
- Only HTTP status changes vs IDLE-16 or pixel differences >2% vs JOB-20261019-06 qualify for committed PNGs: `ykk-dsr/hub/results/JOB-ZZ-IDLE-18/evidence/`.
- Other captures remain on VPS at `/home/qa/dsr-baselines/JOB-ZZ-IDLE-18/`; individual paths and hashes in result.json. `test-results/` and `playwright-report/` remain gitignored and uncommitted.
- HTTP error pages also captured for baseline retention and width observations; no verdicts.
