---
id: JOB-ZZ-IDLE-06
agent: claude-code
us: DSR-587
type: write-only
env: dev
lang: [ja, en]
tcs: [1.0, 2.0, 3.0, 4.0, 5.0, 6.0, 7.0, 8.0, 10.0, 11.0, 14.0, 15.0, 16.0, 17.0, 18.0]
priority: P3 (idle)
created_by: claude-tc-job
---

## Context
Idle work: extend `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` (or add `tests/movie-detail/DSR-587.movie-overlay.spec.ts`) from `ykk-dsr/hub/tc-out/DSR-587.spec.json` (Automation TCs). Baseline `docs/DSR-587/overlay-data-flow-BL.md`. Read-only.

## Steps
1. Fixtures `fixtures/dsr-587.ts` with TD ids qa587-*; URL /{lang}/library/video/{id}. Test titles `DSR-VOV-<NNN>` (1.0 → 001 …).
2. Base URL from env; optional `DSR587_BASE=https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page` (Martin branch).
3. Preflight: TD page 404 where 200 expected → `test.skip('TD-587-xx not seeded')`. 11.0 runs now on /en/library/video/search (existing page).
4. 17.0: parametrize DSR-173 Group A page URL (no change to DSR-173 assertions).
5. `npx tsc --noEmit`; run `npm run test:dev -- --grep "DSR-VOV"` once; report per AGENTS.md "Run reporting".

## Output
Code + `results/DSR-587/DEV/automation-run-<YYYYMMDD>.md`; commit `[DSR-587] scaffold movie overlay automation + run report`.
