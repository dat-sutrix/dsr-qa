# DSR-557 DEV automation run — 20261023-job06

JOB-20261023-06 (run 1; its JSON report and screenshots were overwritten by the next Playwright run (shared test-results/), so this report is built from the list-reporter log only. Outcomes were identical in the evidence rerun (-job06-rerun2)). Agent Author applied BUGCHK-586-02, TD-529-META, TD-566-FIX, TD-190-DSR, TD-587-PHASE2 on DEV between 03:33:44Z and 03:35:53Z (52 writes, all 2xx; verify L1–L3 0 FAIL – see ykk-dsr/hub/results/JOB-20261023-06/).

## 1. Header

- Run start (UTC): 2026-10-23T03:45:14Z
- Run end (UTC): 2026-10-23T03:45:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (.aem.live; .aem.page where the spec checks preview)
- Target page(s): /{ja,en} catalog list page (catalogPath in fixtures/dsr-557.ts) – rows qa190-cat-{new-0,new-10,new-11,upd-0,upd-10,upd-11,both,noupd}
- Build under test: not independently verified (EDS `main` as served at run time; no build ID exposed)
- Baseline ID: BL-v1 (Drive DSR-190 TC file, QA edition 2026-10-15: TC 18.0–20.0) + DSR-611 defaults (10-day window inclusive, today = Asia/Tokyo)
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
| 6 | 6 | 0 | 0 | 0 | 2 (config) | configured 1; 0 retries used (none) | 17 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (NEW/UPDATE/BOTH TCs 018/019/020 after TD-190-DSR); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (attempt 1 / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-018 [ja] | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 2.2s | — |
| DSR-CATV-019 [ja] | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 2.4s | — |
| DSR-CATV-020 [ja] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 2.5s | — |
| DSR-CATV-018 [en] | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 2.1s | — |
| DSR-CATV-019 [en] | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 2.1s | — |
| DSR-CATV-020 [en] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 2.0s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None.

## 7. Open points for QA

- Dates in TD-190-DSR are valid for 2026-10-23 JST only; a rerun on another day needs new dates.
- [Giả định] catalogCategories = site:product/material/aluminium (TD-190-DSR).
- Build under test not independently verified.
- `test-results/` and `playwright-report/` are gitignored; trace/screenshot paths there are not committed.
