# DSR-670 DEV automation run — 20261024-r587

## 1. Header

- Run start (UTC): 2026-10-24T02:38:13Z
- Run end (UTC): 2026-10-24T02:39:59Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): DSR-587 overlay specs (TD-587 `qa587-*` video pages, `/{ja,en}/library/video/search`); DSR-670 TC 13.0 regression
- Build under test: Not independently verified. Job input: deploy `dev/2026.10.23_2` b33514f. `video-detail.js` Last-Modified Fri, 23 Oct 2026 07:15:23 GMT.
- Baseline ID: BL-670-1 (TC 13.0); BL-OVL-1 for DSR-587 specs. Oracle = `ykk-dsr/hub/results/REGRESSION/ledger.json` (last run JOB-ZZ-IDLE-44, 2026-10-24T01:07:07Z)
- Automation HEAD commit SHA: 400b116334d282dc23750187586d8edf5138405f (DSR-587 specs unchanged)
- Job: JOB-20261024-05 (lane claude-code)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/run670/r587.json npm run test:dev -- tests/movie-detail/DSR-587
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (same working tree as `automation-run-20261024.md`)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 34 | 17 | 2 | 15 | 1 | 2 | 1 configured; 2 tests retried (both failed again) | 104.2 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/movie-detail/DSR-587*` (3 files), Chromium. Flaky: 0.
Vs ledger: 2 previous pass → fail (DSR-VOV-011 [en] search, DSR-VOV-013 [en]); both passed on the rerun at 02:40Z (`automation-run-20261024-rerun1.md`). DSR-501-P2/P3 [en]: ledger fail (01:23Z) → pass now.

## 4. Executed tests

Duration = sum of attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-001 [ja] | live CF related → movie detail page 200, title shown, movie plays | Pass | 4.8 s | — |
| DSR-VOV-001 [en] | live CF related → movie detail page 200, title shown, movie plays | Pass | 4.0 s | — |
| DSR-VOV-002 [en] | preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | Pass | 1.6 s | — |
| DSR-VOV-003 [ja] | raw HTML has title / description / og:image and movie title; 0 GraphQL requests | Pass | 7.4 s | — |
| DSR-VOV-003 [en] | raw HTML has title / description / og:image and movie title; 0 GraphQL requests | Pass | 8.0 s | — |
| DSR-VOV-007 [ja] | isActive = false → noindex, browser sent to movie list | Pass | 5.5 s | — |
| DSR-VOV-007 [en] | isActive = false → noindex, browser sent to movie list | Pass | 5.6 s | — |
| DSR-VOV-008 [en] | CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list | Pass | 5.7 s | — |
| DSR-VOV-011 [ja] | video/search stays a list page (list block with ≥ 1 card, no video-detail) | Pass | 5.3 s | — |
| DSR-VOV-011 [en] | video/search stays a list page (list block with ≥ 1 card, no video-detail) | **Fail** | 14.0 s | `main .listing` count 0; page shows "Unable to load video information." |
| DSR-VOV-013 [en] | movie list shows standard movies only | **Fail** | 14.0 s | first list card not visible; same "Unable to load video information." |
| DSR-VOV-014 [en] | related movies max 5 when 6 are linked | Pass | 3.5 s | — |
| DSR-VOV-015 [en] | related movie with isUnavailable = true is hidden | Pass | 3.2 s | — |
| DSR-VOV-018 [ja] | language variant: 200, html lang, title | Pass | 3.2 s | — |
| DSR-VOV-018 [en] | language variant: 200, html lang, title | Pass | 3.1 s | — |
| DSR-501-P3 [en] | related movies are max 5, newest updated first | Pass | 7.3 s | — |
| DSR-501-P2 [en] | unavailable related movie is not displayed | Pass | 8.0 s | — |
| DSR-538-retest [en] | qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | Pass | 8.0 s | — |
| DSR-538-retest [en] | qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | Pass | 6.8 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-VOV-004 [en] | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 [en] | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 [en] | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-009 [en] | fixme: Manual TC: Author edit + publish of CF commune / CF related; agents are read-only (A6) – QA-PT |
| DSR-VOV-010 [en] | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 [ja] tech-talk | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (…) |
| DSR-VOV-011 [en] tech-talk | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (…) |
| DSR-VOV-011 [cn] | fixme: Issue #18: no /cn path on DEV |
| DSR-VOV-016 [en] | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 [en] | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group … |
| DSR-VOV-018 [cn] | fixme: Issue #18: no /cn path on DEV |
| DSR-538-retest [en] qa587-main (.aem.page) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] qa587-main (.aem.page) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [en] qa587-main (.aem.live) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] qa587-main (.aem.live) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |

"(…)" = reason truncated in this table; the full text is in the JSON report.

## 6. Failed tests

### DSR-VOV-011 [en] — video/search stays a list page (list block with ≥ 1 card, no video-detail)

- Failing assertion: `await expect(listingBlock(page), 'list block').toHaveCount(1)` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:215`
- Expected: 1 `main .listing` block with ≥ 1 card
- Actual: 0 `main .listing` elements; `<main>` shows only the breadcrumb and "Unable to load video information."
- Attempt(s): initial fail, retry fail (≈ 02:39Z)
- Evidence paths: `ykk-dsr/hub/results/JOB-20261024-05/evidence/DSR-670-13.0_en_DSR-VOV-011.png` (committed); `test-results/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium/` (trace, not committed)

### DSR-VOV-013 [en] — movie list shows standard movies only

- Failing assertion: `expect(listed, 'first list card (main-frame navigations: 1)').toBe(true)` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:244`
- Expected: first list card visible within 5 s
- Actual: no card; same "Unable to load video information." message
- Attempt(s): initial fail, retry fail (≈ 02:39Z)
- Evidence paths: `ykk-dsr/hub/results/JOB-20261024-05/evidence/DSR-670-13.0_en_DSR-VOV-013.png` (committed); `test-results/movie-detail-DSR-587.movie-1f34b--shows-standard-movies-only-chromium/` (trace, not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Within about 1 minute (02:40Z), raw HTML `/en/library/video/search` returned 200 with `class="listing"`. `dsr-video-list;folder=/content/dam/dsr/en/` returned 200 with 30 items and no `errors`. A browser probe loaded cards; the block requests `dsr-video-list;folder=/content/dam/dsr/en/movies/standard/;cb=…` → 200. Both tests passed on the rerun (`-rerun1`). The failing request/response during the window was not captured, so the cause of the transient client-side load error is **not verified**. The cb param bypasses cache, so a slow or failed publish GraphQL response is the most likely cause.
- Do not count this as a 670 regression unless it recurs. It matches the "Unable to load" pattern of DSR-673 (empty list), which Claude may want to cross-check.
