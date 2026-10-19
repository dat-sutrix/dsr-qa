# DSR-587 DEV automation run — 20261019-job19-01-run1 (JOB-20261019-01, DSR-647 retest P2 assertion-scope fix, run 1 of 2)

## 1. Header

- Run start (UTC): 2026-10-19T05:05:10Z
- Run end (UTC): 2026-10-19T05:05:18Z
- Environment + base URL: DEV — branch preview https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page. The spec uses absolute URLs, so `BASE_URL` from `envs/dev.env` is not used.
- Target page: `/en/library/video/qa501-main-b` (page B, P2)
- Build under test: branch `dsr-productdetail-moustache` (aem.page). Not independently verified beyond the URL.
- Baseline ID: BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`). The QA decision of 19/10 in JOB-20261019-01 removed the "absent from static HTML" assertion; the Expected wording was not changed.
- Automation HEAD commit SHA: `9ab00a5814b58a21fb3866c27aa649f1f3116bd1`, plus uncommitted edits to `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` (P2 only; P3 untouched). Those edits are committed with this report.
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job20261019-01/p2-run1.json npm run test:dev -- tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts --project=chromium --grep "DSR-501-P2" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit` (one check before both runs, 2026-10-19T05:03:45Z)
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 0 | 0 | 0 | 1 | 1 configured; 0 used | 4.8 s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope: `DSR-501-P2` only, en, Chromium. P3 was not run because it is outside this job's scope. Flaky: 0.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | passed | 3.0s | — |

**Assertions kept:**

- HTTP 200, and the title `video title main b` is present in the HTML.
- 0 GraphQL/`execute.json` browser requests.
- Shown related movies = `["video title rel1"]` (exactly 1 card).
- `video title off` is absent from the rendered DOM, and `getByText` count = 0.

**Removed assertion:** static HTML must not contain `video title off`.

**Observed (JSON attachment):**

- The query returned 2 related movies: rel1 (`isUnavailable` null) and movieoff (`isUnavailable` true).
- The static HTML has 2 `relatedMovies` rows, including `movieoff ... isUnavailable: true`. `excludedInStaticHtml` = true. This is recorded only, as expected under BL-OVL-1, because the block filters on the client.

## 5. Skipped tests

None.

## 6. Failed tests

None.

Evidence: a full-page screenshot was written to `test-results/DSR-647-retest/DSR-501-P2_en_fullpage.png`. It is gitignored, **not committed**, and overwritten by later runs.

## 7. Open points for QA

- The P2 pass relies on client-side filtering. A JS-disabled client or crawler would still see the `video title off` row in the static HTML. Per BL-OVL-1 this is accepted (QA decision 19/10), but it is noted here for the DSR-647 owner.
- The branch preview HTML was not checked for freshness in this run. Build identity was not independently verified.
