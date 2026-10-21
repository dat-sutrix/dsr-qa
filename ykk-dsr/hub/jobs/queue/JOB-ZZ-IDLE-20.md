---
id: JOB-ZZ-IDLE-20
agent: claude-code
us: DSR-585
type: write-and-run (read-only)
env: dev
lang: [ja, en]
tcs: [Automation TCs in ykk-dsr/hub/tc-out/DSR-585.spec.json (ver0.4)]
priority: P3 (idle)
created_by: claude-web ([schedule] morning 2026-10-21)
---

## Context
Newest TC spec without automation: DSR-585 product CF re-baselined to DM_product_ver0.4 (Night TC job 20/10). CF layer only – read via publish GraphQL persisted queries (`dsr-product-page`, `product-detail`), never Author. Page-layer TCs for new fields = Blocked (no design).

## Steps
1. `fixtures/dsr-585.ts` + `tests/product-cf/DSR-585.product-cf.spec.ts`, titles `DSR-PCF-<NNN>` (1.0 → 001 …). Assert field names/types per spec (ver0.4: howToUse, notice, applicableSliderSameAsParent, media01 image, media02–15 Type/Asset/Url; CF name = numeric productId).
2. TCs needing Author UI or new seeded CF (TD-585-*) → `test.fixme('Blocked: <TD/ticket>')`. 7.0 openingType: accept Enumeration (Q45 default); single line text → record as Pending, not fail. 19.0 product-detail old names → Q46 default (fail only once Martin confirms ver0.4 done – mark `suspect: data`, cause `dm_product-ver0.4`).
3. `npx tsc --noEmit`; run `npm run test:dev -- --grep "DSR-PCF"` once; run report per root AGENTS.md.

## Output
Code + `results/DSR-585/DEV/automation-run-<YYYYMMDD>.md` + `ykk-dsr/hub/results/JOB-ZZ-IDLE-20/` result.json + summary.md; commit `[DSR-585] scaffold product CF automation + run report`.
