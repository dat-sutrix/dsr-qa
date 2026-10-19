# DSR-587 DEV automation run — 20261019-job17-01 (JOB-20261017-01, DSR-647 retest P2 + P3, run 1)

## 1. Header

- Run start (UTC): 2026-10-19T04:25:45Z
- Run end (UTC): 2026-10-19T04:26:01Z
- Environment + base URL: DEV — branch preview https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page (absolute URLs in the spec; `BASE_URL` from `envs/dev.env` is not used)
- Target pages: `/en/library/video/qa501-main-a` (page A, P3), `/en/library/video/qa501-main-b` (page B, P2)
- Build under test: branch `dsr-productdetail-moustache` (aem.page). Not independently verified beyond the URL.
- Baseline ID: BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`) + order rule DSR-647 comment 61177; hub job JOB-20261017-01
- Automation HEAD commit SHA: 5f135fe4a845b9e7cc3731f10823287767c5f02d. The working tree also had uncommitted spec/fixture edits: the P3 order assertion changed to updateDate desc, plus a freshness guard. These are committed with this report.
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261017-01/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job-20261017-01.json npm run test:dev -- tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 1 | 0 | 1 | 0 | 1 | configured 1; none used | 13.6 s |

Subset: the DSR-587 overlay retest spec, chromium. Proposed outcomes only; human QA confirms.
This run is superseded by `automation-run-20261019-job17-01-rerun2.md`, which added the job's static-HTML check to P2.

## 4. Executed tests

Duration is for a single attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | passed | 5.3 s | — (static-HTML check not yet in the spec) |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-501-P3 | blocked-data: stale preview, static HTML has fewer relatedMovies rows than query (static HTML 5 relatedMovies rows, query 6; last-modified Fri, 16 Oct 2026 06:43:41 GMT) |

## 6. Failed tests

None.

## 7. Open points for QA

- The P2 pass covers only the rendered DOM. The job's Expected also requires the excluded movie to be absent from the static HTML. That check was added and run in rerun2, where it fails.
- The Playwright JSON for this run (`test-results/job-20261017-01.json`) was deleted when rerun2 cleaned `test-results/`. The values above come from the console output and the observed attachment, which was read before the rerun.
