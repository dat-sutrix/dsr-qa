# DSR-670 DEV automation run — 20261024-rerun1

## 1. Header

- Run start (UTC): 2026-10-24T02:40:50Z
- Run end (UTC): 2026-10-24T02:40:57Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/en/library/video/search` (+ `/en/library/video/tech-talk`, matched by grep)
- Build under test: Not independently verified (same as `automation-run-20261024-r587.md`)
- Baseline ID: BL-670-1 (TC 13.0); BL-OVL-1
- Automation HEAD commit SHA: 400b116334d282dc23750187586d8edf5138405f
- Job: JOB-20261024-05 (lane claude-code). Rerun of the 2 fails from `-r587`.
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/run670/rerun.json npm run test:dev -- tests/movie-detail/DSR-587.movie-overlay.spec.ts --grep "DSR-VOV-01[13] \[en\]"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (same working tree)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 3 | 2 | 0 | 1 | 0 | 1 | 1 configured; 0 used | 5.0 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: grep subset, Chromium. Flaky: 0.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-011 [en] | video/search stays a list page (list block with ≥ 1 card, no video-detail) | Pass | 1.5 s | — |
| DSR-VOV-013 [en] | movie list shows standard movies only | Pass | 1.6 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-VOV-011 [en] tech-talk | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (…) |

## 6. Failed tests

None.

## 7. Open points for QA

- The fails at about 02:39Z in `-r587` did not reproduce about 1 minute later. The cause was not verified (see `-r587` §7).
