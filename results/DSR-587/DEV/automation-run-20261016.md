# DSR-587 DEV automation run — 20261016

## 1. Header

- Run start (UTC): 2026-10-16T07:01:24Z
- Run end (UTC): 2026-10-16T07:01:42Z
- Environment + base URL: DEV — branch preview https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page (absolute URLs in the spec; `BASE_URL` from `envs/dev.env` is not used)
- Target page(s): `/en/library/video/qa501-main-a` (page A), `/en/library/video/qa501-main-b` (page B)
- Build under test: branch `DSR-PRODUCTDETAIL-moustache` (aem.page), not independently verified beyond the URL
- Baseline ID: BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`, update 2026-10-16 from DSR-647 comment 61175); hub job JOB-20261016-04
- Automation HEAD commit SHA: 645b305f5e15e9a7ed49bdcbecf420e5df17f65d (plus the new spec and fixture lines, committed with this report)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261016-04/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job16-04.json npm run test:dev -- tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts --project chromium --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 1 | 0 | 1 | 0 | 1 (2 configured) | 1 configured; 0 used | 18 s (Playwright 16.1 s) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset, new spec `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`; chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | Pass (proposed) | 4.1 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-501-P3 | blocked-data: 6th related movie not on publish (query returns 5; shown 5) |

Before the skip, the P3 test asserted these checks, and all passed: related area visible, ≤ 5 movie cards (5 shown: `video title rel1` … `video title rel5`), static HTML contains the title `video title main a`, and the browser made 0 GraphQL requests.

## 6. Failed tests

None.

## 7. Open points for QA

- Persisted query (raw, 2026-10-16 ~07:00Z): the job's **%2F-encoded** URL returns `related.items: []`, `inactive.items: []` for both paths, including with a cache-buster. With the **unencoded** path (`;path=/content/dam/dsr/en/movies/standard/<id>`), the query returns 1 related item for each. The spec uses the unencoded form.
  - qa501-main-a: isActive true; cq:lastModified 2026-10-16T06:40:45.759Z. `jcr:created` differs between calls: 06:42:01.123Z in the page HTML, 06:42:20.981Z in a later query. **relatedMovies: 5**: rel1, rel2, rel3, rel4, rel5 (titles `video title relN`). All have isUnavailable null, publishDate 2026-10-15 and updateDate null. CF commune paths are under `/content/dam/ykk/common/product-cf/test/`.
  - qa501-main-b: isActive null; relatedMovies 2: rel1 (`video title rel1`, isUnavailable null) and movieoff (`video title off`, isUnavailable **true**). Both have publishDate 2026-10-15 and updateDate null.
- P3 blocked: rel6 is not in the publish response. Not verified whether rel6 is unreferenced in qa501-main-a or its CF commune is unpublished.
- The order rule (newest update first) **cannot be tested** with this data: every updateDate is null and every publishDate is identical. The rendered order rel1→rel5 matches the authored order, but that proves nothing about sorting.
- Static HTML: both pages have one `relatedMovies` block row per query item. **Page B's raw HTML includes the `movieoff` / `video title off` row with `isUnavailable: true`.** The block drops it, so it is absent from the rendered DOM and visible text. "Nowhere on the page" was judged on the rendered page; Claude should decide whether the raw source must also omit it.
- Network: 0 requests matching `graphql|execute.json` on either page (load to networkidle).
- Evidence: full-page screenshots `ykk-dsr/hub/results/JOB-20261016-04/evidence/DSR-501-P3_en_fullpage.png` and `DSR-501-P2_en_fullpage.png` (committed). `test-results/` and `playwright-report/` are gitignored and not committed.
