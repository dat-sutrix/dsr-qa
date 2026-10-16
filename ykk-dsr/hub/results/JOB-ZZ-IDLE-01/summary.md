# JOB-ZZ-IDLE-01: nightly regression, DEV, 2026-10-16
Ran `npx tsc --noEmit` (exit 0, no errors), then `npm run test:dev -- --project=chromium` on all specs (10:46–10:58Z, exit 1).
152 tests: 72 pass, 1 flaky (passed on retry), 22 fail, 57 skip/fixme. Full report: `results/regression/DEV/automation-run-20261016.md`.

| Spec | TC | Previous | Now | Suspect |
|---|---|---|---|---|
| movie-detail/DSR-173.movie-detail.spec.ts | DSR-MOVIE-014 | pass (07/10) | fail | product |
| movie-detail/DSR-173.movie-detail.spec.ts | DSR-MOVIE-033 | pass (07/10) | fail | product |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [ja] PC | pass (15/10) | fail | test |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [en] PC | pass (15/10) | fail | test |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [ja] SP | pass (15/10) | flaky | test |

- MOVIE-014/033: the dsr-173 test page no longer renders the player or related products. Page HTML is unchanged since 05/10, so the cause is client-side rendering or CF movieid-01 (product, possibly data; CF not checked).
- TOP-001 PC: 90 s timeout inside the scroll + `img.decode()` evaluate, which has no time limit (test). SP passed in about 6 s.
- No fail→pass changes. The other 18 failures were already failing in earlier reports: BREAD-014, MOVIE-026, DSR-501-P2/P3 (DSR-173 spec), NEWS-002/003/006/007/012/018 and TOP-004..007 ja+en.
- The run rewrote tracked files (evidence/DSR-552/DEV/*.png and codex's JOB-20261015-14/layout-*-sp.json). I reverted them and did not commit them.
