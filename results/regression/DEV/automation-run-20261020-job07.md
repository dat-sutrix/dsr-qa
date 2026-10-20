# regression DEV automation run — 20261020-job07

Job: `JOB-20261020-07` (DSR-586 / DSR-585 / product regression after the dm_product CR fix; run-only, read-only). One run of the product specs on EDS `main` **.aem.live**. Non-spec checks (queries, pages, removed UI, deploy dates) are in `ykk-dsr/hub/results/JOB-20261020-07/raw.md`. Comparison baseline (pre-CR, before 12:12 JST = 03:12Z): JOB-20261019-05 (`results/regression/DEV/automation-run-20261020.md`, 01:21Z) for DSR-PRODLIST/DSR-PDO, and JOB-ZZ-IDLE-17 (`results/DSR-583/DEV/automation-run-20261020.md`, 01:57Z) for DSR-PLSP.

## 1. Header

- Run start (UTC): 2026-10-20T06:51:10Z (Playwright start; tsc check and manual checks 06:45–06:50Z)
- Run end (UTC): 2026-10-20T06:55:48Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/test-space/product-list (DSR-PRODLIST), /{ja,en}/product-list (DSR-PLSP), /{ja,en}/products/990586xxx (DSR-PDO, TD-586 ids)
- Build under test: not independently verified. EDS `main` after dsr-eds#189; Last-Modified: blocks/product-list/product-list.js 2026-10-20T04:50:11Z, blocks/product-detail/product-detail.js 2026-10-20T05:42:57Z, cf-templates/product.html 2026-10-20T05:43:36Z. AEM persisted queries after dsr-fullstack 5e827682 per the incident report (not verified; queries respond without errors).
- Baseline ID: DSR-583/DSR-586 as recorded in `docs/` (overlay: BL-OVL-1, docs/DSR-587/overlay-data-flow-BL.md incl. 2026-10-20 incident note); not re-verified in this run
- Automation HEAD commit SHA: bbbe3647e9574f14391af6161da654cee137abfa
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j07/run.json npm run test:dev -- tests/product-list tests/product-detail --project=chromium --output=test-results/j07
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 39 | 4 | 10 | 25 | 1 | 2 | configured 1; 10 tests retried (all failed again) | 4m 38s (Playwright 4.6m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/product-list` (DSR-583 ×2 specs) + `tests/product-detail` (DSR-586), chromium only. Flaky: 0. No DSR-278 or DSR-457 spec exists in the repo (DSR-457 items are inside DSR-PDO-019, skipped).

### Changes vs pre-CR baseline (classification per job: cr-expected / product / test / env)

| Test | Before (pre-CR) | Now | Class | Note |
|---|---|---|---|---|
| all 39 | same | same | — | No status change. 0 cr-expected, 0 product, 0 test, 0 env. |
| DSR-PRODLIST-001 [ja] | fail, received 1 product | fail, received 3 products | env (data) | Same failing assertion; product count changed because the DSR CF set in /content/dam/dsr/ja/products/ now has 3 items (135, 46, productid-01x). Not caused by the CR. |
| DSR-PLSP-002/003/005 | fail | fail | — | Same messages as JOB-ZZ-IDLE-17 (767 → 3 columns, 320 overflow; filter-step locator timeout; left 2 vs 0). |

DSR-586 "overlay positives on id 46 only": not run on id 46. The spec reads TD-586-01 = 990586001 with fixed expected values (name "QA586 product A", code "QA586-A"); running it on 46 would need a code/fixture change and different expected values, which a run-only job must not make. Id 46 was checked manually (raw.md §2/§3).

## 4. Executed tests

Duration per attempt (initial / retry). Proposed outcomes.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PLSP-001 | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 8.6s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | failed | 21.2s / 22.7s | Error: 320: cards overflowing their column |
| DSR-PLSP-003 | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | failed | 30.6s / 30.6s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | failed | 6.4s / 6.7s | Error: 3 results: left aligned |
| DSR-PLSP-004 | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 10.7s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 5.4s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | failed | 15.8s / 16.5s | Error: 320: cards overflowing their column |
| DSR-PLSP-003 | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | failed | 30.5s / 30.4s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | failed | 5.4s / 4.8s | Error: 3 results: left aligned |
| DSR-PLSP-004 | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 10.3s | — |
| DSR-PRODLIST-001 | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | failed | 6.6s / 6.6s | Error: TD-583-01 ≥ 6 products |
| DSR-PRODLIST-002 | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed | 17.0s / 13.6s | Error: 320: distinct column offsets |
| DSR-PRODLIST-003 | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | failed | 10.4s / 9.5s | Error: open: distinct column offsets |
| DSR-PRODLIST-004 | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed | 10.6s / 11.5s | Error: 1440: distinct column offsets |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-PDO-001 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-001 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-002 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live — TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-003 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-003 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-004 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-005 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-006 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-006 [ja] CF related in subfolder → no page (404) — TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live — TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-008 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list — TD-586-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586008 HTTP 404) |
| DSR-PDO-009 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex — TD-586-09 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586009 HTTP 404) |
| DSR-PDO-011 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index — TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-012 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-014 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [en] language variant: 200, html lang matches, product name present — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issue #18) — (no reason given; test.fixme without description) |
| DSR-PDO-017 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-017 [ja] fixed Product CF field set displayed, removed fields absent — DSR-585 項目fix版 field list not in repo (Q27 review open) |
| DSR-PDO-019 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PRODLIST-003 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [en] SP column count stays 2 after scroll, load more, filter and 3 reloads — blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1): last card = column width, left aligned — blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-006 [ja] SP card layout vs Figma 375 frame (visual) — Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-006 [en] SP card layout vs Figma 375 frame (visual) — Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-007 [ja] Real device iOS Safari / Android Chrome: 2 columns (manual) — Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |

## 6. Failed tests

### DSR-PLSP-002 — DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45` — expected [] (no overflowing cards), received 3 overflowing cards
- Failing assertion: `Error: 767: distinct card left values in first row` — `tests/product-list/DSR-583.product-list-sp.spec.ts:43` — Expected: 2; Received: 3
- Failing assertion: `Error: 767: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list-sp.spec.ts:44` — Expected: 2; Received: 3
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PLSP-002_ja.png` (committed); `test-results/j07/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium-retry1/test-failed-1.png`

### DSR-PLSP-003 — DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — (no file location: global test timeout)
- Failing assertion: `Error: locator.evaluate: Test timeout of 30000ms exceeded.` — `pages/ProductListPage.ts:112`
- Attempt(s): timedOut / timedOut
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PLSP-003_ja.png` (committed); `test-results/j07/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png`

### DSR-PLSP-005 — DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Error: 3 results: left aligned` — `tests/product-list/DSR-583.product-list-sp.spec.ts:130` — Expected: 0; Received: 2
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PLSP-005_ja.png` (committed); `test-results/j07/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium-retry1/test-failed-1.png`

### DSR-PLSP-002 — DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45` — expected [] (no overflowing cards), received 3 overflowing cards
- Failing assertion: `Error: 767: distinct card left values in first row` — `tests/product-list/DSR-583.product-list-sp.spec.ts:43` — Expected: 2; Received: 3
- Failing assertion: `Error: 767: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list-sp.spec.ts:44` — Expected: 2; Received: 3
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PLSP-002_en.png` (committed); `test-results/j07/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium-retry1/test-failed-1.png`

### DSR-PLSP-003 — DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — (no file location: global test timeout)
- Failing assertion: `Error: locator.evaluate: Test timeout of 30000ms exceeded.` — `pages/ProductListPage.ts:112`
- Attempt(s): timedOut / timedOut
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PLSP-003_en.png` (committed); `test-results/j07/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png`

### DSR-PLSP-005 — DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Error: 3 results: left aligned` — `tests/product-list/DSR-583.product-list-sp.spec.ts:130` — Expected: 0; Received: 2
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PLSP-005_en.png` (committed); `test-results/j07/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-001 — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `Error: TD-583-01 ≥ 6 products` — `tests/product-list/DSR-583.product-list.spec.ts:48` — Expected: >= 6; Received:    3
- Failing assertion: `Error: 375: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33` — Expected: 2; Received: 1
- Failing assertion: `Error: 375: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list.spec.ts:34` — Expected: 2; Received: 1
- Failing assertion: `Error: 375: row 1 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Failing assertion: `Error: 375: row 2 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PRODLIST-001_ja.png` (committed); `test-results/j07/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-002 — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `Error: 320: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list.spec.ts:34` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: row 1 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: row 2 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Failing assertion: `Error: 360: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33` — Expected: 2; Received: 1
- Failing assertion: `Error: 360: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list.spec.ts:34` — Expected: 2; Received: 1
- … 18 more soft assertions of the same kind at other widths/checkpoints (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PRODLIST-002_ja.png` (committed); `test-results/j07/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-003 — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `Error: open: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70` — Expected: 2; Received: 1
- Failing assertion: `Error: open: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:71` — Expected: 2; Received: 1
- Failing assertion: `Error: scroll-bottom: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70` — Expected: 2; Received: 1
- Failing assertion: `Error: scroll-bottom: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:71` — Expected: 2; Received: 1
- Failing assertion: `Error: reload-1: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70` — Expected: 2; Received: 1
- Failing assertion: `Error: reload-1: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:71` — Expected: 2; Received: 1
- … 4 more soft assertions of the same kind at other widths/checkpoints (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PRODLIST-003_ja.png` (committed); `test-results/j07/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-004 — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `Error: 1440: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153` — Expected: 4; Received: 1
- Failing assertion: `Error: 1440: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:154` — Expected: 4; Received: 1
- Failing assertion: `Error: 1200: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153` — Expected: 4; Received: 1
- Failing assertion: `Error: 1200: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:154` — Expected: 4; Received: 1
- Failing assertion: `Error: 980: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153` — Expected: 3; Received: 1
- Failing assertion: `Error: 980: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:154` — Expected: 3; Received: 1
- … 2 more soft assertions of the same kind at other widths/checkpoints (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-07/evidence/DSR-PRODLIST-004_ja.png` (committed); `test-results/j07/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium/test-failed-1.png`, `test-results/j07/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/test-failed-1.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. The retry screenshots are copied to `ykk-dsr/hub/results/JOB-20261020-07/evidence/` (committed).

## 7. Open points for QA

- All failures are known pre-CR failures (DSR-583 layout: PLSP-002 proposed product; PLSP-003/005 proposed test defects per JOB-ZZ-IDLE-17; PRODLIST-001…004 proposed data, test-space listing renders 1 column). None is attributable to the DSR-585 CR.
- DSR-586 positives are still all skipped (TD-586 ids not seeded). Overlay id 46 is only checked manually: 200 on .aem.page, 404 on .aem.live (not live-published; same as before the CR).
- `blocks/product-detail/product-detail.js` and `cf-templates/product.html` are dated ~53 min after the #189 merge (14:42–14:43 JST). Possibly a second deploy; not verified.
- The plastic-parts filter removal could not be confirmed in the UI: there is no plastic product in the data (`FAMILIES.plastic` is still in product-list.js as a category family).
- Not verified: the outage window itself (no pre-fix capture), STG, Author content, Cloud Manager deploy times, firefox/webkit.
