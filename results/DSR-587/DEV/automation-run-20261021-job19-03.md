# DSR-587 DEV automation run — 20261021-job19-03

Hub job JOB-20261019-03 (retest bug DSR-647 via DSR-587, retargeted 2026-10-20 09:00 to main + TD-587-14/15).

## 1. Header

- Run start (UTC): 2026-10-21T16:20:21Z
- Run end (UTC): 2026-10-21T16:20:33Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page (spec fixture `mainBase`; `envs/dev.env` BASE_URL .aem.live not used by this spec)
- Target page(s): `/en/library/video/qa587-rel-a` (P3), `/en/library/video/qa587-rel-b` (P2)
- Build under test: not independently verified (main, after Martin overlay merge 20/10 and merge 21/10 16:45 JST). Page last-modified: rel-a `Wed, 21 Oct 2026 13:30:07 GMT`, rel-b `Wed, 21 Oct 2026 13:42:52 GMT`
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + DSR-647 comment 61177 (newest updateDate first, max 5)
- Automation HEAD commit SHA: 297a7986a0c497f5a483c5c3d7838879554c14a0 (plus uncommitted fixture/spec changes committed with this report)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=test-results/JOB-20261019-03 npm run test:dev -- tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 (config 2) | configured 1; actual 0 | 10.6 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (1 spec file); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first | passed | 5.1 s | — |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | passed | 3.5 s | — |

Observed (raw):
- P3 qa587-rel-a: page title "QA587 rel A"; query relatedMovies = qa587-r1…r6 (updateDate 2026-10-01…06, isUnavailable null); static HTML 6 relatedMovies rows; cards shown = `QA587 related 6, 5, 4, 3, 2` (r1 absent); no GraphQL/execute.json call in the browser.
- P2 qa587-rel-b: page title "QA587 rel B"; query relatedMovies = qa587-r1, qa587-off (isUnavailable true); cards shown = `QA587 related 1`; "QA587 off" absent from rendered DOM (present in static HTML rows – recorded, not asserted per QA decision 2026-10-19); no GraphQL call.

## 5. Skipped tests

None.

## 6. Failed tests

None.

Evidence (full-page screenshots, both tests): `test-results/JOB-20261019-03/DSR-501-P3_en_fullpage.png`, `test-results/JOB-20261019-03/DSR-501-P2_en_fullpage.png`. Under `test-results/` (gitignored), **not committed**.

## 7. Open points for QA

- Code change: fixtures/dsr-501.ts adds `mainBase`, `mainPageA` (qa587-rel-a), `mainPageB` (qa587-rel-b), `nightReportSince`; spec retargeted from branch `dsr-productdetail-moustache` / qa501-* to main / qa587-*. Order is asserted on movieId (r6→r2), card titles from the query.
- [Giả định] Freshness: job says "last-modified after the Night Report time". The Night 21/10 report (23:15 VN) is written after QA-PT publishes, so the threshold is the Night 21/10 start `2026-10-21T11:00:00Z` (18:00 VN). Both pages (13:30 / 13:42 UTC) pass it.
- Data: content CF qa587-r1 movieTitle has a trailing space ("QA587 related 1 "); the spec trims titles. Cosmetic data issue, not a product finding.
- `lang: [ja, en]` in the job: TD-587-14/15 are en-only by design (manifest TD-587-14-15); ja not run.
- Job "Context" also mentions DSR-BREAD-014 (DSR-651); it is not in `tcs:` and was not run.
- Build identity not verified.
