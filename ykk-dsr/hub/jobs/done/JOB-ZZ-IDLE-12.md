---
id: JOB-ZZ-IDLE-12
agent: claude-code
us: DSR-227
type: write-only
env: dev
lang: [ja, en]
tcs: [3.0, 9.0, 10.0, 12.0, 13.0, 14.0, 15.0, 16.0, 17.0]
priority: P3 (idle)
created_by: claude-tc-job
---

## Context
Idle work: scaffold automation for DSR-227 (asset migration – DAM naming, product page images/PDF, DM renditions; In Progress – Quentin) from `ykk-dsr/hub/tc-out/DSR-227.spec.json` (Automation TCs). Read-only. Sample migrated products not delivered yet → use preflight skip, and record a baseline.

## Steps
1. `fixtures/dsr-227.ts`: product page list = DEV `query-index.json` rows matching `/{lang}/products/<digits>` (BL-OVL-1) + fallback `https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page/en/products/46`. Test titles `DSR-ASSET-<NNN>` (1.0 → 001 …). Sample ids from TD-227-02 left as `// TODO: sample ids from dev`.
2. Helper `pages/AssetAudit.ts`: collect img/source/srcset/video/a[href$=.pdf] URLs + network responses; naming regex `^[a-z0-9-]+(\.[a-z0-9]+)?$` per path segment after the DAM root.
3. Preflight: no product page 200 → `test.skip('DSR-227 no product page on DEV')`.
4. Record only (no verdict) into the run report: number of product pages found, asset URL hosts/roots, count of naming violations (list first 20, e.g. `/content/dam/ykk/common/products/airystring/image/Description Image.png`), any asset response ≥ 400. This is the pre-migration baseline for QA.
5. `npx tsc --noEmit`; run `npm run test:dev -- --grep "DSR-ASSET"` once; report per AGENTS.md "Run reporting".

## Output
Code + `results/DSR-227/DEV/automation-run-<YYYYMMDD>.md`; commit `[DSR-227] scaffold asset migration automation + run report`.
