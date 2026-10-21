# regression DEV automation run — 20261021-job08

Job: `JOB-20261020-08` (DSR-586 / DSR-585 / product regression after the DM_product ver0.4 update; run-only, read-only). One run of the product specs. Non-spec checks (queries, pages, removed UI, deploy dates) are in `ykk-dsr/hub/results/JOB-20261020-08/raw.md`. Comparison baseline: JOB-20261020-07 (`results/regression/DEV/automation-run-20261020-job07.md`, 20/10 06:51Z, before ver0.4) for DSR-583/DSR-586; JOB-20261021-03 (`results/DSR-586/DEV/automation-run-20261021-job03.md`, PDO_ID=46) for DSR-PDO on id 46; `results/DSR-585/DEV/automation-run-20261021.md` (01:45Z) for DSR-PCF.

## 1. Header

- Run start (UTC): 2026-10-21T09:03:38Z (Playwright startTime; tsc 09:03Z; manual checks 08:59–09:02Z)
- Run end (UTC): 2026-10-21T09:08:06Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (DSR-586 with `PDO_ID=46` uses the .aem.page tier per fixtures/dsr-586.ts; DSR-585 calls the publish persisted queries directly)
- Target page(s): /master/{ja,en}/test-space/product-list (DSR-PRODLIST), /{ja,en}/product-list (DSR-PLSP), /{ja,en}/products/46 on .aem.page (DSR-PDO), publish `dsr-product-page`, `product-detail`, `dsr-product-list`, `dm-product-list` (DSR-PCF)
- Build under test: not independently verified. Last-Modified: blocks/product-list/product-list.js and blocks/product-detail/product-detail.js 2026-10-20T08:33:41Z, cf-templates/product.html 2026-10-20T11:36:16Z, blocks/listing/listing.js + adapters/cf.js 2026-10-21T08:54:13Z (deployed 9 min before this run). AEM model = DM_product ver0.4 per Martin's confirmation (21/10 15:55 VN, quoted in the job); not verified on Author.
- Baseline ID: DSR-583 / DSR-586 / DSR-585 as recorded in `docs/` and `ykk-dsr/hub/tc-out/DSR-585.spec.json` (oracle DM_product_ver0.4, A1); overlay BL-OVL-1
- Automation HEAD commit SHA: 9a2bc369a7825b23201d1c5ff313483d19c0e6d3
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j08/run.json PDO_ID=46 DSR585_VER04_DONE=1 npm run test:dev -- tests/product-list tests/product-detail tests/product-cf
```

`DSR585_VER04_DONE=1` because the job records Martin's ver0.4 confirmation (Q46 default: old names now fail instead of Pending). `PDO_ID=46` because the job limits DSR-586 overlay positives to id 46.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 64 | 24 | 10 | 30 | 1 | 2 | configured 1; 10 tests retried (all failed again) | 4m 28s (Playwright 4.5m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/product-list` (DSR-583 ×2 specs), `tests/product-detail` (DSR-586), `tests/product-cf` (DSR-585); chromium only (the config limits firefox/webkit to DSR-BREAD-032). Flaky: 0. No DSR-278 or DSR-457 spec exists in the repo; DSR-457 items are covered by DSR-PDO-019.

### Changes vs baseline (classification per job: cr-expected / product / test / env)

| Test | Before | Now | Class | Note |
|---|---|---|---|---|
| DSR-583 (19: 14 executed, 5 skipped) | JOB-07: 4 pass / 10 fail / 5 skip | identical | — | Same assertions and values (320 overflow 3 cards, 767→3 cols, filter timeout, left 2 vs 0, 3 products, 1 column). 0 changes. |
| DSR-586 on id 46 (20) | JOB-20261021-03: 12 pass / 8 skip | identical | — | JOB-07 skipped all PDO (TD-586 ids); id 46 now runnable via PDO_ID. |
| DSR-585 (25) | 21/10 01:45Z: 8 pass / 17 skip | identical | — | DSR-PCF-019 ja/en pass now with `DSR585_VER04_DONE=1` (old names would fail, none present). |

Totals: 0 cr-expected, 0 product, 0 test, 0 env. All 10 failures are cause `none` (pre-existing DSR-583 layout/data issues).

## 4. Executed tests

Duration per attempt (initial / retry). Proposed outcomes.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.1s | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.0s | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 0.4s | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 0.4s | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.2s | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.4s | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | passed | 0.4s | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | passed | 0.2s | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | passed | 5.5s | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | passed | 5.2s | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | passed | 1.0s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | passed | 0.8s | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | passed | 6.8s | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages | passed | 5.6s | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | passed | 6.1s | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | passed | 5.8s | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | passed | 4.5s | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | passed | 4.2s | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] fixed Product CF field set displayed, removed fields absent | passed | 2.0s | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | passed | 1.8s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 6.1s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | failed | 17.0s / 16.8s | Error: 320: cards overflowing their column |
| DSR-PLSP-003 | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | failed | 30.5s / 30.7s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | failed | 6.8s / 6.4s | Error: 3 results: left aligned |
| DSR-PLSP-004 | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 9.9s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 6.8s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | failed | 15.9s / 15.5s | Error: 320: cards overflowing their column |
| DSR-PLSP-003 | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | failed | 30.5s / 30.5s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | failed | 4.8s / 4.5s | Error: 3 results: left aligned |
| DSR-PLSP-004 | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 10.0s | — |
| DSR-PRODLIST-001 | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | failed | 2.0s / 2.3s | Error: TD-583-01 ≥ 6 products |
| DSR-PRODLIST-002 | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed | 10.4s / 10.6s | Error: 320: distinct column offsets |
| DSR-PRODLIST-003 | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | failed | 7.9s / 7.1s | Error: open: distinct column offsets |
| DSR-PRODLIST-004 | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed | 8.0s / 11.4s | Error: 1440: distinct column offsets |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-PCF-001 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-001 [ja] DM_product field set matches ver0.4 (10 tabs, 83 fields) — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-002 [ja] removed fields and old spellings not shown in the CF editor — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-003 [ja] field types match fix list — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-004 [ja] required fields enforced on save (negative) — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-005 [ja] single-line text accepts 255 characters (boundary) — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-006 [ja] zipperChainTypeCategories tag picker stores several chain-type tags — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-008 [ja] data entry template columns match the model — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-009 [ja] bulk import with revised template — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-010 [ja] bulk import rejects row missing a required field (negative) — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-011 [ja] pre-change product CF opens and keeps retained values — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-012 [ja] ja / en / cn folders use the same model — Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-013 [ja] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names — Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-013 [en] published TD-585-01 returns ver0.4 fields via dsr-product-page, no removed or old names — Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-014 [ja] product search JSON entry has search keys and no removed fields — Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-015 [ja] product detail of TD-585-01 renders without errors (regression) — Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-018 [ja] product CF name = numeric productId in content CF folder — Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-018 [en] product CF name = numeric productId in content CF folder — Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-002 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live — needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-006 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-006 [ja] CF related in subfolder → no page (404) — needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-007 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live — needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-008 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list — needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-009 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex — needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-011 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index — needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-012 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent — needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-014 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issue #18) — (no description) |
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
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PLSP-002_ja.png` (committed); `test-results/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium-retry1/test-failed-1.png`

### DSR-PLSP-003 — DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — (no file location: global test timeout)
- Failing assertion: `Error: locator.evaluate: Test timeout of 30000ms exceeded.` — `pages/ProductListPage.ts:112`
- Attempt(s): timedOut / timedOut
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PLSP-003_ja.png` (committed); `test-results/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png`

### DSR-PLSP-005 — DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Error: 3 results: left aligned` — `tests/product-list/DSR-583.product-list-sp.spec.ts:130` — Expected: 0; Received: 2
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PLSP-005_ja.png` (committed); `test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium-retry1/test-failed-1.png`

### DSR-PLSP-002 — DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45` — expected [] (no overflowing cards), received 3 overflowing cards
- Failing assertion: `Error: 767: distinct card left values in first row` — `tests/product-list/DSR-583.product-list-sp.spec.ts:43` — Expected: 2; Received: 3
- Failing assertion: `Error: 767: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list-sp.spec.ts:44` — Expected: 2; Received: 3
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PLSP-002_en.png` (committed); `test-results/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium-retry1/test-failed-1.png`

### DSR-PLSP-003 — DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — (no file location: global test timeout)
- Failing assertion: `Error: locator.evaluate: Test timeout of 30000ms exceeded.` — `pages/ProductListPage.ts:112`
- Attempt(s): timedOut / timedOut
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PLSP-003_en.png` (committed); `test-results/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png`

### DSR-PLSP-005 — DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Error: 3 results: left aligned` — `tests/product-list/DSR-583.product-list-sp.spec.ts:130` — Expected: 0; Received: 2
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PLSP-005_en.png` (committed); `test-results/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-001 — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `Error: TD-583-01 ≥ 6 products` — `tests/product-list/DSR-583.product-list.spec.ts:48` — Expected: >= 6; Received:    3
- Failing assertion: `Error: 375: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33` — Expected: 2; Received: 1
- Failing assertion: `Error: 375: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list.spec.ts:34` — Expected: 2; Received: 1
- Failing assertion: `Error: 375: row 1 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Failing assertion: `Error: 375: row 2 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PRODLIST-001_ja.png` (committed); `test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-002 — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `Error: 320: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list.spec.ts:34` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: row 1 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: row 2 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Failing assertion: `Error: 360: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33` — Expected: 2; Received: 1
- Failing assertion: `Error: 360: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list.spec.ts:34` — Expected: 2; Received: 1
- … 18 more soft assertions of the same kind at other widths/checkpoints (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PRODLIST-002_ja.png` (committed); `test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-003 — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `Error: open: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70` — Expected: 2; Received: 1
- Failing assertion: `Error: open: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:71` — Expected: 2; Received: 1
- Failing assertion: `Error: scroll-bottom: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70` — Expected: 2; Received: 1
- Failing assertion: `Error: scroll-bottom: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:71` — Expected: 2; Received: 1
- Failing assertion: `Error: reload-1: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70` — Expected: 2; Received: 1
- Failing assertion: `Error: reload-1: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:71` — Expected: 2; Received: 1
- … 4 more soft assertions of the same kind at other widths/checkpoints (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PRODLIST-003_ja.png` (committed); `test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-004 — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `Error: 1440: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153` — Expected: 4; Received: 1
- Failing assertion: `Error: 1440: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:154` — Expected: 4; Received: 1
- Failing assertion: `Error: 1200: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153` — Expected: 4; Received: 1
- Failing assertion: `Error: 1200: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:154` — Expected: 4; Received: 1
- Failing assertion: `Error: 980: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153` — Expected: 3; Received: 1
- Failing assertion: `Error: 980: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:154` — Expected: 3; Received: 1
- … 2 more soft assertions of the same kind at other widths/checkpoints (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261020-08/evidence/DSR-PRODLIST-004_ja.png` (committed); `test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/test-failed-1.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. The retry screenshots are copied to `ykk-dsr/hub/results/JOB-20261020-08/evidence/` (committed).

## 7. Open points for QA

- All 10 failures are the known DSR-583 failures, identical to JOB-07 (PLSP-002 proposed product; PLSP-003/005 proposed test defects; PRODLIST-001…004 proposed data, test-space listing renders 1 column). None is attributable to ver0.4 (cause `none`).
- TC 19.0 (DSR-PCF-019): all 4 queries return 0 of the 27 removed names and 0 old spellings; `product-detail` now matches ver0.4 (proposed Pass per query). The CDN copy of `product-detail` was a cache HIT aged 26165 s and already had ver0.4 names, so no old-name cache headers could be recorded.
- DSR-586 passes are on real product 46 on .aem.page, not TD-586 and not .aem.live (/{ja,en}/products/46 still 404 on .live, as in JOB-07).
- ver0.4 fields are returned but not rendered (no design); `applicableSliderSpecial-2` data seen in JOB-07 on productId-01x has no ver0.4 counterpart (`applicableSliderSameAsParent` empty). Expected by the model change; data migration not verified.
- blocks/listing/listing.js + adapters/cf.js were redeployed at 08:54:13Z, 9 min before the run (eco tag filter). The product-list pages behaved the same, but the run is close to a deploy.
- Plastic-parts filter removal is still unproven (no plastic product in data; `FAMILIES.plastic` remains in product-list.js).
- Not verified: Author model (no Author access), STG, Cloud Manager deploy times, firefox/webkit.
