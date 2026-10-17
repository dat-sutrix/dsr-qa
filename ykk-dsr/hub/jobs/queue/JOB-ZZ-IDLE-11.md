---
id: JOB-ZZ-IDLE-11
agent: claude-code
us: DSR-590
type: write-only
env: dev
lang: [ja, en]
tcs: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 9.0, 10.0, 12.0, 13.0]
priority: P3 (idle)
created_by: claude-tc-job
---

## Context
Idle work: scaffold automation for DSR-590 (eco-friendly TOP C14 / detail C15; To Do – Ngoc) from `ykk-dsr/hub/tc-out/DSR-590.spec.json` (Automation TCs). Read-only. Pages may not exist yet → preflight skip.

## Steps
1. `fixtures/dsr-590.ts`: TOP `/{lang}/product/performance/sustainable` (fallback `/master/{lang}/…`), 9 detail slugs from spec TD-590-02 (recycled, water-saving, renewal, bio-based, bluesign-approved, circularity, sustainable-metal-finish, natural-fiber, non-plated), finder `…/sustainable-solution-finder`. Test titles `DSR-ECO-<NNN>` (1.0 → 001 …).
2. Page object `pages/EcoProductsPage.ts`; selectors role/text + `// TODO: data-testid`.
3. Preflight: TOP/detail 404 → `test.skip('DSR-590 page not on DEV')`. 7.0 reads product query-index per Q14 default; tag column from header.
4. Record (no verdict) current HTTP status of all 11 URLs in ja/en into the run report – this tells QA when the pages land.
5. `npx tsc --noEmit`; run `npm run test:dev -- --grep "DSR-ECO"` once; report per AGENTS.md "Run reporting".

## Output
Code + `results/DSR-590/DEV/automation-run-<YYYYMMDD>.md`; commit `[DSR-590] scaffold eco-friendly automation + run report`.
