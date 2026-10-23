# DSR-557 DEV automation run — 20261023-job06-rerun2

JOB-20261023-06 (run 2 = evidence rerun of the same subset, read-only; run 1 JSON/screenshots had been overwritten by the next Playwright run). Agent Author applied BUGCHK-586-02, TD-529-META, TD-566-FIX, TD-190-DSR, TD-587-PHASE2 on DEV between 03:33:44Z and 03:35:53Z (52 writes, all 2xx; verify L1–L3 0 FAIL – see ykk-dsr/hub/results/JOB-20261023-06/).

## 1. Header

- Run start (UTC): 2026-10-23T03:52:37Z
- Run end (UTC): 2026-10-23T03:52:53Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (.aem.live; .aem.page where the spec checks preview)
- Target page(s): same as -job06
- Build under test: not independently verified (EDS `main` as served at run time; no build ID exposed)
- Baseline ID: same as -job06
- Automation HEAD commit SHA: 43b8fc86ce2bb93cb03fdedcb99e8caa7e0b7242 + uncommitted change in this job: tests/catalog-video/DSR-557.catalog-video.spec.ts (CATV-018–020 now select the TD-190-DSR content CFs /content/dam/common/{lang}/catalogs/qa190-cat-* instead of the old folder) and a comment in fixtures/dsr-557.ts; committed with this report
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/j06-557.json npm run test:dev -- tests/catalog-video/DSR-557.catalog-video.spec.ts --project=chromium --grep "DSR-CATV-0(18|19|20) "
```
(`npm run test:dev` = `ENV=dev playwright test`; BASE_URL from envs/dev.env.)

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run 2026-10-23 ~03:39Z after the DSR-557 spec change; no code change afterwards)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 6 | 6 | 0 | 0 | 0 | 2 (config) | configured 1; 0 retries used (none) | 16 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (018/019/020); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (attempt 1 / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-018 [ja] | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 2.9s | — |
| DSR-CATV-019 [ja] | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 2.1s | — |
| DSR-CATV-020 [ja] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 1.9s | — |
| DSR-CATV-018 [en] | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 2.0s | — |
| DSR-CATV-019 [en] | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 2.1s | — |
| DSR-CATV-020 [en] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 1.9s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None.

## 7. Open points for QA

- Same outcome as run 1.
- Build under test not independently verified.
- `test-results/` and `playwright-report/` are gitignored; trace/screenshot paths there are not committed.
