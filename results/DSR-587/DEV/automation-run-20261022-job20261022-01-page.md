# DSR-587 DEV automation run — 20261022-job20261022-01-page

Job: JOB-20261022-01 (lane claude-code). TC 17.0 rerun (DSR-173 Group A DSR-MOVIE-012/014/026/027/033 on the overlay page, ja + en) on `.aem.page`. DSR-538 retest for `.aem.page` is in automation-run-20261022-job20261022-01-live.md (that spec covers both tiers).

## 1. Header

- Run start (UTC): 2026-10-22T01:00:46Z (Playwright JSON startTime)
- Run end (UTC): 2026-10-22T01:01:10Z (start + reported duration)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page (BASE_URL override of envs/dev.env)
- Target page(s): /ja/library/video/qa587-main, /en/library/video/qa587-main (TD-587-01), /en/library/video/qa587-rel-a (TD-587-14)
- Build under test: not independently verified (EDS `main` branch of dsr-eds-dev at run time).
- Baseline ID: BL-v1 (docs/DSR-173/) for DSR-MOVIE Group A; BL-OVL-1 + TD-587-01/14
- Automation HEAD commit SHA: 68edf849a740c00d5b94fac81cab54149bda7670 plus the same uncommitted working-tree changes as the -live report; committed together with this report.
- Exact command used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page DSR173_MOVIE_PATH=/en/library/video/qa587-main DSR173_RELATED_PATH=/en/library/video/qa587-rel-a PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job22/page.json npm run test:dev -- tests/movie-detail/DSR-173.movie-detail.spec.ts --project=chromium --grep "DSR-MOVIE-0(12|14|26|27|33) "
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (same working tree as the -live run).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 | 7 | 0 | 1 | 0 (no failures; exit code not captured separately) | 2 | configured 1; 0 used | 24.1 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (`--grep`), project chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-MOVIE-012 | DSR-MOVIE-012 [ja] displays the exact movie title | pass | 3446 ms | — |
| DSR-MOVIE-012 | DSR-MOVIE-012 [en] displays the exact movie title | pass | 3289 ms | — |
| DSR-MOVIE-014 | DSR-MOVIE-014 [ja] embeds the configured YouTube movie | pass | 4696 ms | — |
| DSR-MOVIE-014 | DSR-MOVIE-014 [en] embeds the configured YouTube movie | pass | 2386 ms | — |
| DSR-MOVIE-026 | DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | pass | 5748 ms | — |
| DSR-MOVIE-027 | DSR-MOVIE-027 [ja] outputs exactly one title and og:title | pass | 1271 ms | — |
| DSR-MOVIE-027 | DSR-MOVIE-027 [en] outputs exactly one title and og:title | pass | 1451 ms | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-MOVIE-033 (DSR-MOVIE-033 displays component sections in vertical order on PC) | Blocked-by data: TD-587-01 (qa587-main) has no relatedProducts row |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**.

## 7. Open points for QA

- Same as the -live report (fixture data-only change, 014 facade click, 026 language-prefix check, og:image record-only).
