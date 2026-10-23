# DSR-587 DEV automation run — 20261023-job19

## 1. Header

- Run start (UTC): 2026-10-23T16:50:20Z
- Run end (UTC): 2026-10-23T16:50:27Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/en/library/video/QA587_Upper`, `/en/library/video/qa587_upper`, `/en/library/video/qa587-sub`, `/en/library/video/qa501-main-a`
- Build under test: not independently verified (EDS DEV main, after the DSR-669 migration deployed 23/10)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, incl. update 2026-10-21)
- Automation HEAD commit SHA: bf18fb7a2ff2d6167bd57e4d0b297916e99c4dad
- Exact command used:

```sh
DSR587_SEEDED=04,05 npm run test:dev -- tests/movie-detail/DSR-587.movie-overlay.spec.ts -g "DSR-VOV-00[45]" --reporter=list
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 1 | 1 | 0 | 1 | 2 (config) | 1 configured; 1 used (VOV-005 failed again on retry) | 5.8 s (Playwright) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms them.
Scope/browser: a subset (job JOB-20261023-19) run in chromium. Flaky outcomes: 0.

## 4. Executed tests

Per-test durations were not captured: the `--reporter=list` override disabled the configured JSON reporter, and the list output was truncated.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-004 | DSR-VOV-004 [en] CF related name with uppercase / underscore → 404 | passed | not captured | — |
| DSR-VOV-005 | DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404 | failed (both attempts) | not captured | `qa501-main-a` returned 200 instead of 404 (stale fixture) |

## 5. Skipped tests

None.

## 6. Failed tests

### DSR-VOV-005 — DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404

- Failing assertion: `expect.soft(status, 'qa501-main-a').toBe(404)` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:155`
- Expected: 404 for `qa587-sub` and for legacyId `qa501-main-a`
- Actual: `qa587-sub` 404 (OK); `qa501-main-a` **200** (title "video title main a | YKK DIGITAL SHOWROOM", on both .live and .page)
- Attempt(s): the initial attempt and retry1 both failed in the same way
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-19/evidence/DSR-VOV-005_en.png` (committed); `test-results/movie-detail-DSR-587.movie-64c93-tside-content-dam-dsr-→-404-chromium*/` (error-context, trace)
- Assessment: the test is at fault. `qa501-main-a` was moved under `/content/dam/dsr/en/movies/standard` (noted in JOB-ZZ-IDLE-06), so its page is now valid. The fixture `legacyId` in `fixtures/dsr-587.ts:27` is outdated.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- The Author read-only verification (job step 1) was not done because the Author cookie returned HTTP 401. Not verified: the real node name of the TD-587-04 CF, and for `qa587/qa587-sub` whether it exists, its model, isActive, its movie ref, and its replication.
- I did not check a renamed TD-587-04 URL, if AEM renamed the node, because the node name is unknown.
- curl confirms that `/en/library/video/qa587/qa587-sub` is 200 on .live and .page as a noindex stub with body "unavailable". This is by design (KNOWN-FACTS CATOV-010) and is not asserted by the spec.
- `DSR587_SEEDED=04,05` is based on the QA-PT Night Report 23/10 (Pass). I have not confirmed the seeding independently.
- Fixture fix proposed but not made (verify-only job): remove or replace `legacyId` for TC 5.0.
