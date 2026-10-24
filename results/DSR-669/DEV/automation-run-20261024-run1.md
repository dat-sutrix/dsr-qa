# DSR-669 DEV automation run — 20261024-run1

## 1. Header

- Run start (UTC): 2026-10-24T02:20:52Z
- Run end (UTC): 2026-10-24T02:22:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): Same as `automation-run-20261024.md`
- Build under test: Not independently verified. Job input: deploy `dev/2026.10.23` a47274d (DSR-669). Observed: `product-detail.js`, `video-detail.js`, `related-product.js` Last-Modified Fri, 23 Oct 2026 07:15:23 GMT; `catalog-detail.js` Thu, 22 Oct 2026 01:48:45 GMT.
- Baseline ID: BL-669-1 (tc-out/DSR-669.spec.json A1); BL-OVL-1 for overlay specs; pre-669 oracle `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json` (A2)
- Automation HEAD commit SHA: 1bf151d25aad0f19753fffb2964f71f865ad16f1 (+ uncommitted `tests/cf-model/DSR-669.cf-model-rename.spec.ts`, `fixtures/dsr-669.ts`, committed with this report)
- Job: JOB-20261024-04 (lane claude-code)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/run669/spec.json npx playwright test tests/cf-model/DSR-669.cf-model-rename.spec.ts --project=chromium --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before the first spec run and again after the test fix, both exit 0 with empty output)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 36 | 27 | 4 | 7 | 1 | 2 | 1 configured; 4 tests retried (all failed again) | 1.6 min |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: First run of the new spec (before a test fix). JSON output was overwritten by the final run; this report is built from the list log (`/tmp/run669-spec.log`, not committed). Per-test durations are not available.

## 4. Executed tests

Duration = sum of all attempts. "pending annotation" = the test passed its executed checks, but part of the TC could not be compared (see §7). It is not a final Pass.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-669 9.0 | 16 tests (ja/en × 8 queries) | 14 pass, 2 fail (video-detail ja/en) | n/a | content items: `_path` missing in video-detail (test bug) |
| DSR-669 11.0 | 2 tests | pass | n/a | — |
| DSR-669 12.0 | 6 tests | pass | n/a | — |
| DSR-669 13.0 | 6 tests | 4 pass (pending annotation), 2 fail | n/a | card link 404 (product ja, video en) |
| DSR-669 14.0 | 1 test | pass | n/a | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-669 1.0/2.0/3.0/4.0/10.0 | Author read-only TC: executed with tools/author (GET only), not from Playwright |
| DSR-669 15.0 | Blocked-by TD-669-02 (republish by lane author/chrome, no republish time in job input) |
| DSR-669 16.0 | Blocked-by TD-669-03 (qa669-new not published) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa669-new HTTP 404) |

## 6. Failed tests

### DSR-669 9.0 [ja] and [en] video-detail — 200, no errors, dm*DsrList, QA item present (test bug, fixed)
- Failing assertion: `expect.soft(paths(contentListItems(data)), 'content items').toContain(...)` — `tests/cf-model/DSR-669.cf-model-rename.spec.ts:61` (pre-fix line)
- Expected `/content/dam/common/ja/movies/qa587-main`; actual array of `""`: `video-detail` `dmMovieList` items have no `_path` field. `qa587-main` is present as `movieId`.
- Fix: match on `_path` or `movieId`/`productId` (`pathsOrIds`), qaItem `qa587-main`. Passes in the final run. Expected result unchanged (QA item present).

### DSR-669 13.0 [ja] product list / [en] video list — card links 200
- Same values as the final run: `/ja/products/990586006` 404, `/en/library/video/QA587_Upper` 404. See `automation-run-20261024.md` §6.
- Evidence: overwritten by the later runs (`test-results/` is gitignored and was cleared). The committed screenshots come from the final run.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Superseded by `automation-run-20261024.md`. Only change between the runs: the 9.0 detail matcher (test code) and the `video-detail` qaItem in `fixtures/dsr-669.ts`.
