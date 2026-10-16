# DSR-501 DEV automation run — 20261016

## 1. Header

- Run start (UTC): 2026-10-16T04:43:54Z
- Run end (UTC): 2026-10-16T04:44:05Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/en/test-space/qa501-a`, `/master/en/test-space/qa501-b`
- Build under test: not independently verified
- Baseline ID: none given for DSR-501 (job JOB-20261015-11; answers Toan 2026-09-04, Chiba 2026-09-25)
- Automation HEAD commit SHA: 00c91dde4175463d9065717a705801065adb8529 (plus uncommitted DSR-501 changes committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job11.json npm run test:dev -- tests/movie-detail/DSR-173.movie-detail.spec.ts --project chromium --grep "DSR-501"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 0 | 0 | 2 | 0 | 1 | 1 configured; 0 used | 10.9 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `describe('DSR-501')`; chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (time to reach the preflight skip).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| — | No test reached its assertions; both were skipped at preflight (section 5). | — | — | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-501-P3 | blocked-data: page not wired to qa501 CF (main title: none, block shows "Unable to load video information.") |
| DSR-501-P2 | blocked-data: page not wired to qa501 CF (main title: none, block shows "Unable to load video information.") |

## 6. Failed tests

None.

Preflight screenshots and JSON are attached to the test results in `test-results/` / `playwright-report/`. Those folders are gitignored and **not committed**.

## 7. Open points for QA

- Both pages return HTTP 200, but the `video-detail` block renders `Unable to load video information.`. No movie title and no related cards are shown.
- Raw HTML of **both** qa501-a and qa501-b references videoId `qa501-main-a`. Page B should reference `qa501-main-b`, so it looks mis-authored.
- Publish persisted query `/graphql/execute.json/ykk/video-detail;videoId=<id>` returns `dmMovieList.items: []` for qa501-main-a, qa501-main-b, qa501-rel-1 and qa501-off. For comparison, `movieid-01` (DSR-173) returns data. This contradicts the Night Report ("9 CF published"). The CFs may not be on publish, or their `movieId` field may not match the CF names.
- Assumption (not verified): related movie titles equal the CF names (qa501-rel-1…). Related movies are read from `related-content-card[data-content-type="movie"]` inside `movie-detail-related-content`.
- isUnavailable (P2) and the 5-item limit (P3) remain unverified.
