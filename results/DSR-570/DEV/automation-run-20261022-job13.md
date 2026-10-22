# DSR-570 DEV automation run — 20261022-job13

## 1. Header

- Run start (UTC): 2026-10-22T08:25:25Z
- Run end (UTC): 2026-10-22T08:29:18Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /{ja,en}/library/catalog (list) → -form detail pages
- Build under test: dsr-eds `main` on DEV after PR #206 (Martin 22/10); application SHA not independently verified
- Baseline ID: docs/DSR-570/automation-spec.md (A8/A9)
- Automation HEAD commit SHA: 8cc016fbe8b1d69780b2b266e34fde1c3d3bbb1f (spec changes of this job uncommitted in the working tree at run time; committed with this report)
- Job: ykk-dsr/hub/jobs/running/JOB-20261022-13.md
- Exact command(s) used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/570-page.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --grep "DSR-CATDL-0(06|10) " --project=chromium --output=test-results/j13-570-page
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/570-live.json npm run test:dev -- tests/catalog-download/DSR-570.catalog-download.spec.ts --grep "DSR-CATDL-0(06|10) " --project=chromium --output=test-results/j13-570-live
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 6 | 6 | 0 | 0 | 570/page=0, 570/live=0 | 2 | configured 1; actual 0 test(s) retried | 30 s (sum of runs) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (job TCs), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = summed over attempts. Tier = host (.aem.page / .aem.live).

| TC ID | Title | Tier | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | page | passed | 3.3 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | page | passed | 2.7 s | — |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | page | passed | 3.2 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | live | passed | 5.2 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | live | passed | 5.6 s | — |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form | live | passed | 6.7 s | — |

## 5. Skipped tests

None

## 6. Failed tests

None

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; failed-test screenshots copied to `ykk-dsr/hub/results/JOB-20261022-13/evidence/`.

## 7. Open points for QA

- CATDL-010 is ja only in the spec (no en variant).
- Read-only: no form submitted.
