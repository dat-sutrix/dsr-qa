# DSR-586 DEV automation run — 20261022-job13

## 1. Header

- Run start (UTC): 2026-10-22T08:23:20Z
- Run end (UTC): 2026-10-22T08:30:20Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /{ja,en}/products/990586001 (TD-586-01); /{ja,en}/products/46 (.aem.page, PDO_ID override)
- Build under test: dsr-eds `main` on DEV after PR #206 (Martin 22/10); application SHA not independently verified
- Baseline ID: BL-OVL-1 + DSR-586 spec.json (re-baseline 2026-10-20) + Martin 22/10 (product og:image = media01)
- Automation HEAD commit SHA: 8cc016fbe8b1d69780b2b266e34fde1c3d3bbb1f (spec changes of this job uncommitted in the working tree at run time; committed with this report)
- Job: ykk-dsr/hub/jobs/running/JOB-20261022-13.md
- Exact command(s) used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/586-page.json npm run test:dev -- tests/product-detail/DSR-586.product-detail.spec.ts --grep "DSR-PDO-003 " --project=chromium --output=test-results/j13-586-page
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/586-live.json npm run test:dev -- tests/product-detail/DSR-586.product-detail.spec.ts --grep "DSR-PDO-003 " --project=chromium --output=test-results/j13-586-live
PDO_ID=46 BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/586pdo46-page.json npm run test:dev -- tests/product-detail/DSR-586.product-detail.spec.ts --grep "DSR-PDO-003 " --project=chromium --output=test-results/j13-586pdo46-page
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 6 | 2 | 0 | 4 | 586/page=0, 586/live=0, 586pdo46/page=0 | 2 | configured 1; actual 0 test(s) retried | 13 s (sum of runs) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (job TCs), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = summed over attempts. Tier = host (.aem.page / .aem.live).

| TC ID | Title | Tier | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | page | passed | 2.4 s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | page | passed | 2.2 s | — |

## 5. Skipped tests

| TC ID | Tier | Verbatim skip reason |
|---|---|---|
| DSR-PDO-003 | page | TD-586-01 incomplete: overlay row 'unavailable / no-product' |
| DSR-PDO-003 | page | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/products/990586001 HTTP 404) |
| DSR-PDO-003 | live | TD-586-01 incomplete: overlay row 'unavailable / no-product' |
| DSR-PDO-003 | live | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |

## 6. Failed tests

None

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; failed-test screenshots copied to `ykk-dsr/hub/results/JOB-20261022-13/evidence/`.

## 7. Open points for QA

- TD-586-01 ja renders `unavailable | no-product` and en is 404 → PDO-003 skipped on both tiers (data). og:image there = site default.
- Product og:image verified only on existing product 46 (.aem.page only; .aem.live 404): og:image absolute, GET 200 image/* for ja + en.
- No product DSR CF was republished by JOB-12, so PR #206 on products is verified on product 46 only.
