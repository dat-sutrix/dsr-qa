# DSR-552 DEV automation run — 20261019-tc014-job07

## 1. Header

- Run start (UTC): 2026-10-19T10:23:08Z
- Run end (UTC): 2026-10-19T10:23:36Z (2 consecutive runs: 10:23:08–10:23:25Z, 10:23:25–10:23:36Z)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/ja/test-space/dsr552-edge/long/leaf (the en equivalent returns 404, see §7)
- Build under test: not independently verified. Assumed to be the DEV `main` that includes the DSR-651 fix (Jira [Dev] In Testing 2026-10-19 13:55 JST, per JOB-20261019-07)
- Baseline ID: BL-v1 (DSR-552 automation-spec)
- Automation HEAD commit SHA: 6c853bd3a6faffd8ccdc8b35d9f0ddc3a0c50b71
- Exact command used (run twice):

```sh
DSR_JOB_EVIDENCE=/tmp/job07/ev<N> PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job07/run<N>.json npm run test:dev -- tests/breadcrumb/DSR-552.breadcrumb.spec.ts --grep "DSR-BREAD-014" --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 1 | 0 | 0 | 0 | 1 | configured 1; actual 0 | 15.2s |
| 2 | 1 | 1 | 0 | 0 | 0 | 1 | configured 1; actual 0 | 9.2s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: subset DSR-BREAD-014 only, Chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-014 (run 1) | DSR-BREAD-014 [ja] 100-character display name keeps layout | passed | 12.3s | — |
| DSR-BREAD-014 (run 2) | DSR-BREAD-014 [ja] 100-character display name keeps layout | passed | 7.6s | — |

Observed values (identical in both runs):

| Viewport | innerWidth | documentElement.scrollWidth | nav width / right | label width | lines | white-space / overflow / text-overflow | clipped (ellipsis) |
|---|---:|---:|---|---:|---:|---|---|
| 1440×900 | 1440 | 1440 | 1360 / 1400 | 1344 | 1 | nowrap / hidden / ellipsis | true |
| 1024×768 | 1024 | 1024 | 944 / 984 | 928 | 1 | nowrap / hidden / ellipsis | true |
| 375 (SP, recorded by spec) | 375 | 375 | 343 / 359 | 96 | 1 | nowrap / hidden / ellipsis | true |

## 5. Skipped tests

None. No en test for DSR-BREAD-014 exists in the spec, so none was skipped at runtime. See §7.

## 6. Failed tests

None.

Section screenshots (DSR-BREAD-014_ja_{1440,1024,375}.png) were written to /tmp/job07/ev1 and /tmp/job07/ev2. The afterEach full-page capture went to evidence/DSR-552/DEV/DSR-BREAD-014_ja_pass.png. None of these files are committed (hub rule: failed-test evidence only). `test-results/` and `playwright-report/` are gitignored and not committed.

## 7. Open points for QA

- en was not executed. The spec covers 014 only for ja, and `/master/en/test-space/dsr552-edge/long` and `/long/leaf` return 404 on DEV (checked with curl during this job). test-data.md lists T3 long as ja-only. An en seed and its expected display name/trail are needed before an en case can be added. Proposed: blocked (test data).
- Build identity (whether the DSR-651 fix is deployed) was not independently verified.
- "Truncated inside its container" is judged from computed style (nowrap + overflow hidden + text-overflow ellipsis, label scrollWidth > clientWidth) and nav right edge < innerWidth. The visual match to Figma is QA's call.
