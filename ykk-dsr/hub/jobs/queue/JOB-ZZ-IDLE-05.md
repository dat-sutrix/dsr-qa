---
id: JOB-ZZ-IDLE-05
agent: claude-code
us: DSR-586
type: write-only
env: dev
lang: [ja, en]
tcs: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 9.0, 11.0, 12.0, 13.0, 14.0, 17.0, 19.0]
priority: P3 (idle)
created_by: claude-tc-job
---

## Context
Idle work: scaffold Playwright automation for DSR-586 product detail overlay from `ykk-dsr/hub/tc-out/DSR-586.spec.json` (Automation TCs only). Baseline `docs/DSR-587/overlay-data-flow-BL.md` (BL-OVL-1). Read-only.

## Steps
1. Mirror DSR-552 layout: `fixtures/dsr-586.ts` (TD ids 990586001…), `pages/ProductDetailPage.ts`, `tests/product-detail/DSR-586.product-detail.spec.ts`; test titles `DSR-PDO-<NNN>` mapped to spec ids (1.0 → 001 …).
2. Base URL from env (`envs/dev.env`); optional override `DSR586_BASE=https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page` (branch test page /en/products/46, Martin 16/10).
3. Preflight per TC: TD page 404 → `test.skip('TD-586-xx not seeded')`. Never fail on missing data.
4. 3.0 / 8.0 / 9.0 use raw HTTP (no JS); 4.0 records network and asserts 0 requests to graphql/execute.json.
5. `npx tsc --noEmit` must pass; run `npm run test:dev -- --grep DSR-586` once, report per AGENTS.md "Run reporting".

## Output
Code + `results/DSR-586/DEV/automation-run-<YYYYMMDD>.md`; commit `[DSR-586] scaffold product-detail overlay automation + run report`.
