# DSR-587 DEV automation run — 20261023-job06

JOB-20261023-06 (single run; JSON + screenshots retained). Agent Author applied BUGCHK-586-02, TD-529-META, TD-566-FIX, TD-190-DSR, TD-587-PHASE2 on DEV between 03:33:44Z and 03:35:53Z (52 writes, all 2xx; verify L1–L3 0 FAIL – see ykk-dsr/hub/results/JOB-20261023-06/).

## 1. Header

- Run start (UTC): 2026-10-23T03:45:31Z
- Run end (UTC): 2026-10-23T03:45:48Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (.aem.live; .aem.page where the spec checks preview)
- Target page(s): /en/library/video/qa587-unavail (TD-587-08), /en/library/video/qa587-removed (TD-587-10), query-index
- Build under test: not independently verified (EDS `main` as served at run time; no build ID exposed)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, incl. Update 2026-10-21); expected results from ykk-dsr/hub/tc-out/DSR-587.spec.json
- Automation HEAD commit SHA: 43b8fc86ce2bb93cb03fdedcb99e8caa7e0b7242
- Exact command used:

```sh
DSR587_SEEDED=06,10 PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/j06-587.json npm run test:dev -- tests/movie-detail/DSR-587.movie-overlay.spec.ts --project=chromium --grep "DSR-VOV-0(08|10) "
```
(`npm run test:dev` = `ENV=dev playwright test`; BASE_URL from envs/dev.env.)

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run 2026-10-23 ~03:39Z after the DSR-557 spec change; no code change afterwards)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 1 | 1 | 0 | 1 | 2 (config) | configured 1; 1 retry used (all failed again) | 17 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (VOV-008/010 after TD-587-PHASE2); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (attempt 1 / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-008 [en] | DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list | fail | 5.3s / 5.0s | rows = source, cfPath, unavailable (TC: single unavailable row); noindex + redirect pass |
| DSR-VOV-010 [en] | DSR-VOV-010 [en] unpublished CF related → 404 on both hosts, absent from query-index | pass | 0.7s | — |

## 5. Skipped tests

None.

## 6. Failed tests

### DSR-VOV-008 [en] — DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list

- Failing assertion(s): tests/movie-detail/DSR-587.movie-overlay.spec.ts:176 (`video-detail rows`)
- Assertion messages: `Error: video-detail rows`
- Expected: video-detail rows = ['unavailable'] (BL-OVL-1: "single unavailable row + noindex")
- Actual: rows = ['source' (overlay), 'cfPath' (/content/dam/dsr/en/movies/standard/qa587-unavail), 'unavailable' (no-movie)]; robots noindex ✓; browser redirected to movie list ✓ (only the rows assertion failed)
- Proposed classification: suspect `test`, cause `none`, confidence real product bug 30%. `source`/`cfPath` look like technical rows emitted for every overlay page; BL wording probably means one data row. Claude to decide whether TC/BL should exclude technical rows.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-VOV-008_en.png

## 7. Open points for QA

- DSR587_SEEDED=10 set from L1/L2 verify of TD-587-PHASE2 (Deactivate publish + preview on DSR qa587-removed).
- TD-587-08: commune qa587-unavail stays on preview (only publish deactivated) – JOB-05 note.
- Build under test not independently verified.
- `test-results/` and `playwright-report/` are gitignored; trace/screenshot paths there are not committed.
