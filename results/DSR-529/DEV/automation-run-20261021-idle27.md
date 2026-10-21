# DSR-529 DEV automation run — 20261021-idle27

## 1. Header

- Run start (UTC): 2026-10-21T10:22:35.240Z
- Run end (UTC): 2026-10-21T10:22:58.761833Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /en/library/article, /en/library/article/stories/qa529-01, /ja/library/article, /ja/library/article/stories/qa529-01, /ja/library/article/stories/qa529-02
- Build under test: not independently verified; page Last-Modified: Tue, 20 Oct 2026 11:36:16 GMT.
- Baseline ID: JOB-ZZ-IDLE-27 record-only capture; no comparison baseline or verdict.
- Automation HEAD commit SHA: f4a432471bad884f8949da9475468f103819b174 (new capture spec in working tree).
- Exact command used:

```sh
npm run test:dev -- tests/article-detail/DSR-529.idle27-capture.spec.ts --project=chromium --workers=2 --retries=0
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---|---|---|
| 10 | 10 | 0 | 0 | 0 | 2 configured, 1 used | 0 configured/actual | 23.522s |

Chromium capture subset only. Passed counts successful capture execution, not product or visual acceptance. No flaky outcomes. All ten navigations returned HTTP 404; this record-only job does not assert HTTP 200. Outcomes remain subject to human QA review.

## 4. Executed tests

Durations per single attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /ja/library/article/stories/qa529-01 1440x900 record only | Capture completed (no verdict) | 2589 ms | — |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /ja/library/article/stories/qa529-01 375x900 record only | Capture completed (no verdict) | 2096 ms | — |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /en/library/article/stories/qa529-01 1440x900 record only | Capture completed (no verdict) | 2403 ms | — |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /en/library/article/stories/qa529-01 375x900 record only | Capture completed (no verdict) | 1891 ms | — |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /ja/library/article/stories/qa529-02 1440x900 record only | Capture completed (no verdict) | 2488 ms | — |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /ja/library/article/stories/qa529-02 375x900 record only | Capture completed (no verdict) | 1860 ms | — |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /ja/library/article 1440x900 record only | Capture completed (no verdict) | 2575 ms | — |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /ja/library/article 375x900 record only | Capture completed (no verdict) | 1847 ms | — |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /en/library/article 1440x900 record only | Capture completed (no verdict) | 2231 ms | — |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /en/library/article 375x900 record only | Capture completed (no verdict) | 1818 ms | — |

## 5. Skipped tests

None.

## 6. Failed tests

None. PNGs and raw observations are committed under `results/JOB-ZZ-IDLE-27/`. Playwright reports in `test-results/` and `playwright-report/` are gitignored and not committed.

## 7. Open points for QA

- All exact job URLs returned 404, so article content was unavailable. Date arrays are empty; tag/image-block/related-card counts are zero on the 404 DOM, not verified article values. No main images existed to request or report image statuses for.
- Paths intentionally follow the job without `/master`; no substitute URLs were tested.
- Actual deployment and whether QA-PT had republished were not independently verified.
- Baselines are timestamped records, not approved visual references; no visual comparison performed.
