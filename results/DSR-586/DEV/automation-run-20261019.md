# DSR-586 DEV automation run — 20261019

## 1. Header

- Run start (UTC): 2026-10-19T04:40:57.615Z
- Run end (UTC): 2026-10-19T04:41:26.413Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`DSR586_BASE` not set)
- Target page(s): /ja/products/990586001, /en/products/990586001, /ja/products/990586008, /ja/products/990586009 (.aem.live); /ja/products/990586002 (.aem.page)
- Build under test: main branch, application SHA not independently verified.
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + DSR-586 spec.json
- Automation HEAD commit SHA: 50449a6438da493f33bbca778b3bc7d536e9126e (new spec files uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-586-idle05.json npm run test:dev -- --grep DSR-586
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 20 | 0 | 0 | 20 | 0 | 1 | 1 configured; 0 used | 27.4 s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms them.
Scope/browser: subset `--grep DSR-586`, chromium project only. Flaky outcomes: 0.

## 4. Executed tests

None. All 20 tests skipped at preflight; no assertion ran. Durations below are per attempt and include the preflight request.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| — | — | — | — | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-PDO-001 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) — 3994 ms |
| DSR-PDO-001 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) — 4467 ms |
| DSR-PDO-002 [ja] | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) — 908 ms |
| DSR-PDO-003 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) — 579 ms |
| DSR-PDO-003 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) — 556 ms |
| DSR-PDO-004 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) — 3437 ms |
| DSR-PDO-005 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) — 1589 ms |
| DSR-PDO-006 [ja] | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) — 16 ms |
| DSR-PDO-007 [ja] | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) — 18 ms |
| DSR-PDO-008 [ja] | TD-586-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586008 HTTP 404) — 629 ms |
| DSR-PDO-009 [ja] | TD-586-09 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586009 HTTP 404) — 661 ms |
| DSR-PDO-011 [ja] | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) — 21 ms |
| DSR-PDO-012 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) — 42 ms |
| DSR-PDO-013 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) — 1877 ms |
| DSR-PDO-013 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) — 1578 ms |
| DSR-PDO-014 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) — 1241 ms |
| DSR-PDO-014 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) — 1228 ms |
| DSR-PDO-014 [cn] | test.fixme (no runtime reason; title: "language variant – no /cn path on DEV (Issue #18)") |
| DSR-PDO-017 [ja] | DSR-585 項目fix版 field list not in repo (Q27 review open) — 181 ms |
| DSR-PDO-019 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) — 1321 ms |

## 6. Failed tests

None.

No evidence generated (no failures). `test-results/` and `playwright-report/` are gitignored and not committed.

## 7. Open points for QA

- This run executed no assertions: test data TD-586-01…11 is not seeded on DEV main (B1). The assertion logic has not been checked against a live overlay page. Re-run after QA-PT seeding; for branch preview use `DSR586_BASE=https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page` (TD ids are also 404 there as of 2026-10-19).
- Negative TCs 6.0, 7.0 and 11.0 (and the qa586-alpha step of 5.0) expect 404, so a 404 cannot show whether the data was seeded. These run only when QA-PT sets `DSR586_SEEDED=05,06,07,11` (comma list). Otherwise they skip and are never counted as passed.
- Selectors are classes observed on branch page /en/products/46 (`.product-detail.block`, `.pd-name`, `.pd-code-value`, `.pd-gallery img`). No data-testid yet; `// TODO: data-testid` markers are in pages/ProductDetailPage.ts. DSR-457 toolbar/play/MOVIE selectors (19.0) are guesses and not confirmed.
- Assumptions:
  - The en copy of TD-586-01 uses the same name, code and description as ja, because the TestData sheet says "en, cn copies" and gives no per-language values (affects 1.0, 3.0, 13.0, 14.0).
  - 1.0 spec rows have no fixed TD values, so only rendered spec sections ≥ 1 are asserted and the rows are recorded.
- 8.0/9.0: the product list URL is still pending (Q30). The tests assert only that the final pathname differs from the detail path and record the exact URL.
- 13.0: the inquiry target is pending DSR-504. The test accepts the product code either from an input field or from the `productCode` URL param, and it never submits. Branch page href observed: `?productCode=Z15-1#contact`.
- 12.0: on DEV only the root `/query-index.json` and `/sitemap.xml` exist (`/ja/query-index.json` 404). The test pages the index in 500-row steps.
- 17.0: `fixedDisplayFields` / `removedFieldLabels` in fixtures/dsr-586.ts are empty until the DSR-585 fix list review closes (Q27); the test skips while they are empty.
- 19.0 is record-only for DSR-457 items 3/7/13. Items 2/4/5/9/11/12 are not verified because their check definitions are not in the repo.
- Out of scope per job (not Automation): 10.0 and 18.0 (Manual), 15.0 and 16.0 (Visual).
