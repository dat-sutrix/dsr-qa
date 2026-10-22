# DSR-587 DEV automation run — 20261022-job20261022-08-page

## 1. Header

- Run start (UTC): 2026-10-22T04:35:58Z
- Run end (UTC): 2026-10-22T04:36:17Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page
- Target page(s): /ja/library/video/search, /en/library/video/search, /ja/library/video/tech-talk, /en/library/video/tech-talk
- Build under test: not independently verified (job JOB-20261022-08 assumes Martin's DSR-665 fix is on DEV main; .live/.page last-modified of the search pages = 2026-10-22 01:49 UTC)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md)
- Automation HEAD commit SHA: 968f39ed61d9f01026a481cb45c7a4b1acfd6f52
- Exact command used (ENV defaults to dev in playwright.config.ts, so envs/dev.env is loaded; equivalent to `npm run test:dev -- …`):

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job08/vov-page.json DSR587_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page npx playwright test tests/movie-detail/DSR-587.movie-overlay.spec.ts -g "DSR-VOV-01[13]" --output=/tmp/job08/tr-vov-page --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 6 | 3 | 0 | 3 | 0 | 1 (config 2) | 1 configured; 0 used | 18.3s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `-g "DSR-VOV-01[13]"` of tests/movie-detail/DSR-587.movie-overlay.spec.ts; chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-011 [ja] | video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed (5 cards) | 4.9s | — |
| DSR-VOV-011 [en] | video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed (12 cards) | 3.8s | — |
| DSR-VOV-013 [en] | movie list shows standard movies only | passed (same 12 card paths as .live) | 3.4s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-VOV-011 [ja] tech-talk | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] tech-talk | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/tech-talk) |
| DSR-VOV-011 [cn] | Issue #18: no /cn path on DEV |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed** (this run used `--output=/tmp/job08/...`, also not committed). Retest screenshots: ykk-dsr/hub/results/JOB-20261022-08/evidence/.

## 7. Open points for QA

- DSR-VOV-013 exists in the spec for [en] only; [ja] reload/listing was checked by the job probe instead (ykk-dsr/hub/results/JOB-20261022-08/summary.md).
- VOV-013 observed `mainFrameNavigations: 2`. Probe trace (evidence/nav-trace.json): one document request, `performance` navigation type `navigate`, JS context unchanged after 15 s → the 2nd event is a same-document history update, not a reload. Not a fail; worth confirming with Martin that the listing calls history.replaceState.
- Build identity / fix commit not independently verified.
