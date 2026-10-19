# JOB-ZZ-IDLE-07: daily regression, DEV (job date 2026-10-17, actually run 2026-10-19)
Ran `npx tsc --noEmit` (exit 0, no errors), then `npm run test:dev -- --project=chromium` on all specs (04:48–04:59Z, exit 1). Full report: `results/regression/DEV/automation-run-20261017.md`.
270 tests: 81 pass, 1 flaky, 32 fail, 156 skip/fixme. 118 tests come from specs added after 16/10 (DSR-529/570/583/586/587).

| Spec | TC | Previous (16/10) | Now | Suspect |
|---|---|---|---|---|
| breadcrumb/DSR-552.breadcrumb.spec.ts | DSR-BREAD-014 [ja] | fail | pass | — |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [ja]/[en] PC | fail | pass | — (test fix 3ac42ec) |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [ja] SP | flaky | pass | — |
| catalog-video/DSR-557.catalog-video.spec.ts | DSR-CATV-016/017 [ja]/[en] | skip | fail | test |
| movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts | DSR-501-P2 [en] | pass | fail | test |
| movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts | DSR-501-P3 [en] | pass | skip | data |

- Unchanged fails vs 16/10: **19** (MOVIE-014/026/033, 501-P2/P3 in the DSR-173 spec, NEWS-002/003/006/007/012/018, TOP-004..007 ja+en).
- New-spec fails (not in 16/10): 8 + 1 flaky. They are CATDL-007 (product), CATDL-014 timeout and CATDL-015 flaky (test), VOV-011 ja/en 404 (env), PRODLIST-001..004 (data). Each matches its latest US report.
- CATV-016/017: the data guard is lifted; the popup lands on an external page that has a `<form>`, so the test assertion is likely too broad. 501-P2: static HTML still contains the unavailable row. 501-P3: skipped by its stale-preview guard.
- BREAD-014 passes with no test change, so the page likely changed (not verified).
- The report filename uses the job's date (20261017), not the run-start date (20261019).
- Reverted run-rewritten tracked files (DSR-552 evidence PNGs, codex's JOB-20261015-14 JSON and JOB-20261016-13 PNG). None were committed.
