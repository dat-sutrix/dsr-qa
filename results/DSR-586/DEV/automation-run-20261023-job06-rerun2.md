# DSR-586 DEV automation run — 20261023-job06-rerun2

JOB-20261023-06 (run 2 = evidence rerun of the same subset, read-only; run 1 JSON/screenshots had been overwritten by the next Playwright run). Agent Author applied BUGCHK-586-02, TD-529-META, TD-566-FIX, TD-190-DSR, TD-587-PHASE2 on DEV between 03:33:44Z and 03:35:53Z (52 writes, all 2xx; verify L1–L3 0 FAIL – see ykk-dsr/hub/results/JOB-20261023-06/).

## 1. Header

- Run start (UTC): 2026-10-23T03:46:19Z
- Run end (UTC): 2026-10-23T03:46:29Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (.aem.live; .aem.page where the spec checks preview)
- Target page(s): same as -job06
- Build under test: not independently verified (EDS `main` as served at run time; no build ID exposed)
- Baseline ID: same as -job06
- Automation HEAD commit SHA: 43b8fc86ce2bb93cb03fdedcb99e8caa7e0b7242
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/j06-586.json npm run test:dev -- tests/product-detail/DSR-586.product-detail.spec.ts --project=chromium --grep "DSR-PDO-0(02|12) "
```
(`npm run test:dev` = `ENV=dev playwright test`; BASE_URL from envs/dev.env.)

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run 2026-10-23 ~03:39Z after the DSR-557 spec change; no code change afterwards)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 1 | 1 | 0 | 1 | 2 (config) | configured 1; 1 retry used (all failed again) | 8.6 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (PDO-002/012 after BUGCHK-586-02); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (attempt 1 / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PDO-002 [ja] | DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live | fail | 1.8s / 1.7s | .aem.page 200 but body = `unavailable: not-found`, no product name (BUG-PREVIEW) |
| DSR-PDO-012 [ja] | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | pass | 2.0s | — |

## 5. Skipped tests

None.

## 6. Failed tests

### DSR-PDO-002 [ja] — DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live

- Failing assertion(s): tests/product-detail/DSR-586.product-detail.spec.ts:87 (`.aem.page product name`)
- Assertion messages: `Error: .aem.page product name`
- Expected: .aem.page 200 with product name "QA586 product B"; .aem.live 404
- Actual: .aem.page 200, `<title>YKK DIGITAL SHOWROOM</title>`, robots noindex, product-detail block rows `source: overlay` + `unavailable: not-found`; .aem.live 404 (passes). L1/L2 for content CF + DSR CF 990586002 preview PASS (Activate, lastReplicated_preview ≥ 03:33:44Z)
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 85%. Third preview-only DSR CF with the same symptom (qa587-preview, qa654-preview, 990586002); content CF was on preview before the check.
- Evidence: no screenshot (API-only test: request fixture). Raw HTML recorded in the run log; same structure as ykk-dsr/hub/results/JOB-20261023-06/BUGCHK-PREVIEW/page-*.html

## 7. Open points for QA

- Same outcome as run 1.
- Build under test not independently verified.
- `test-results/` and `playwright-report/` are gitignored; trace/screenshot paths there are not committed.
