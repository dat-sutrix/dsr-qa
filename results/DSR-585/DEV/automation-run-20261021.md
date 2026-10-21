# DSR-585 DEV automation run — 20261021

## 1. Header

- Run start (UTC): 2026-10-21T01:45:28Z (Playwright startTime 01:45:30.523Z)
- Run end (UTC): 2026-10-21T01:45:49Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (CF layer: publish GraphQL https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/…)
- Target page(s): persisted queries `dsr-product-page;path=/content/dam/dsr/{ja,en}/products/46`, `product-detail;productId=productId-01x`, `dsr-product-list;folder=/content/dam/dsr/{ja,en}/products/`, `dm-product-list`; page `/ja/products/990585001` (15.0, not reached – fixme)
- Build under test: not independently verified (no build ID exposed by publish GraphQL)
- Baseline ID: DM_product_ver0.4 (spec.json A1, Quentin 2026-10-20 DSR-585 comment 61605) + BL-OVL-1
- Automation HEAD commit SHA: 38c241807f496f1cd0e3f3e06c505f2ce2d6076b (new spec/fixture uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/pcf/run.json npm run test:dev -- --grep "DSR-PCF"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 25 | 8 | 0 | 17 | 0 | 1 | configured 1; actual 0 | 18.9 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `--grep "DSR-PCF"` (tests/product-cf/DSR-585.product-cf.spec.ts), chromium project. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PCF-007 | [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass (proposed) | 2.6 s | — |
| DSR-PCF-007 | [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | pass (proposed) | 0.8 s | — |
| DSR-PCF-016 | [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass (proposed) | 1.3 s | — |
| DSR-PCF-016 | [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | pass (proposed) | 1.2 s | — |
| DSR-PCF-017 | [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass (proposed) | 1.4 s | — |
| DSR-PCF-017 | [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | pass (proposed) | 1.2 s | — |
| DSR-PCF-019 | [ja] all product persisted queries return ver0.4 names only | pass (proposed) | 4.3 s | — |
| DSR-PCF-019 | [en] en product persisted queries return ver0.4 names only | pass (proposed) | 1.3 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-PCF-001 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 [en] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 [en] | Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**. Per-test raw values are in the `observed` attachment of each test (playwright-report/, not committed).

## 7. Open points for QA

- **Q46 changed since JOB-20261020-09:** `product-detail;productId=productId-01x` now returns `howToUse`, `howToUseImage`, `notice`, `noticeImage`, `applicableSliderSameAsParent` and none of `Howtouse / HowtouseImage / Notice / NoticeImage / applicableSliderStandard / applicableSliderSpecial` (curl 01:43Z and the 019 run). All 4 queries had 0 of the 27 removed names. Martin's ver0.4 "done" ping is still not recorded in the hub, so DSR-PCF-019 pass is a proposal on a possibly in-progress model (A8).
- **Proxy TCs (007, 016, 017, 018):** spec exec = Manual (Author). The automated part only reads published values of existing DEV CFs (product 46 = CF `/content/dam/common/{lang}/products/461`; dm-product-list folders). Widget type, option list, defaults, video rejection in media01 and save/reopen are **not** verified – the Author part of each TC stays open.
- 007: filled openingType values were arrays (`['stop']`, `['stop','open','reverseOpen','chain']`) → Enumeration (multiple), Q45 default. No single-line-text value seen, so no Pending.
- 017: on product 46 only `howToUse` (plain multiline) is filled; the other 6 new fields are null, so their type is not observable via publish.
- 018 data to clean (not Fail of the model): ja `1350` (productId 135), `461` (46), `cf-products1` (productId-01x); en additionally `applicable-slider-special-2`, `cf-products10`, `cf-products11`, `parent-product-2`. en `1107`, `1131` match.
- Field types of the full 83-field list are not in the repo (only names cited in spec.json), so 019 checks removed/old names only, not completeness.
- Env flags for later runs: `DSR585_SEEDED=01,02` (TD-585 seeded) enables 013/014/015/018; `DSR585_VER04_DONE=1` turns old names in 019 from Pending into Fail (Q46).
