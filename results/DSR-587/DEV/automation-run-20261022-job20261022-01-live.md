# DSR-587 DEV automation run — 20261022-job20261022-01-live

Job: JOB-20261022-01 (lane claude-code). TC 17.0 rerun (DSR-173 Group A DSR-MOVIE-012/014/026/027/033 on the overlay page, ja + en) on `.aem.live`, plus DSR-538 retest (related card hrefs) on `.aem.page` and `.aem.live`.

## 1. Header

- Run start (UTC): 2026-10-22T00:59:50Z (Playwright JSON startTime)
- Run end (UTC): 2026-10-22T01:00:39Z (start + reported duration)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (DSR-538 retest also uses https://main--dsr-eds-dev--sutrix-projects.aem.page via `hosts()`)
- Target page(s): /ja/library/video/qa587-main, /en/library/video/qa587-main (TD-587-01), /en/library/video/qa587-rel-a (TD-587-14)
- Build under test: not independently verified (EDS `main` branch of dsr-eds-dev at run time). Raw HTML last-modified: qa587-main en 2026-10-21 13:06:39 GMT, ja 13:14:19 GMT, qa587-rel-a 13:30:07 GMT.
- Baseline ID: BL-v1 (docs/DSR-173/) for DSR-MOVIE Group A; BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md incl. Update 2026-10-21) + TD-587-01/14 (data verified PASS in ykk-dsr/hub/results/JOB-20261021-09)
- Automation HEAD commit SHA: 68edf849a740c00d5b94fac81cab54149bda7670 plus uncommitted working-tree changes from this job (fixtures/dsr-173.ts, tests/movie-detail/DSR-173.movie-detail.spec.ts, new tests/movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts); committed together with this report.
- Exact command used:

```sh
DSR173_MOVIE_PATH=/en/library/video/qa587-main DSR173_RELATED_PATH=/en/library/video/qa587-rel-a PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job22/live.json npm run test:dev -- tests/movie-detail/DSR-173.movie-detail.spec.ts tests/movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts --project=chromium --grep "DSR-MOVIE-0(12|14|26|27|33) |DSR-538-retest"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before this test run on the same working tree).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 14 | 9 | 0 | 5 | 0 | 2 | configured 1; 0 used | 49.2 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (`--grep`), project chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-MOVIE-012 | DSR-MOVIE-012 [ja] displays the exact movie title | pass | 4084 ms | — |
| DSR-MOVIE-012 | DSR-MOVIE-012 [en] displays the exact movie title | pass | 3998 ms | — |
| DSR-MOVIE-014 | DSR-MOVIE-014 [ja] embeds the configured YouTube movie | pass | 6190 ms | — |
| DSR-MOVIE-014 | DSR-MOVIE-014 [en] embeds the configured YouTube movie | pass | 4992 ms | — |
| DSR-MOVIE-026 | DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | pass | 10570 ms | — |
| DSR-MOVIE-027 | DSR-MOVIE-027 [ja] outputs exactly one title and og:title | pass | 3822 ms | — |
| DSR-MOVIE-027 | DSR-MOVIE-027 [en] outputs exactly one title and og:title | pass | 2947 ms | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | pass | 9824 ms | — |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | pass | 7810 ms | — |

DSR-538-retest observed hrefs (both tiers): `/en/library/video/qa587-r6`, `-r5`, `-r4`, `-r3`, `-r2` → resolved on `main--dsr-eds-dev--sutrix-projects.aem.{page,live}`, HTTP 200 each (no redirect followed), 0 on publish-p192812.

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-MOVIE-033 (DSR-MOVIE-033 displays component sections in vertical order on PC) | Blocked-by data: TD-587-01 (qa587-main) has no relatedProducts row |
| DSR-538-retest [en] qa587-main (.aem.page) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] qa587-main (.aem.page) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [en] qa587-main (.aem.live) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] qa587-main (.aem.live) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed** (`observed` JSON attachments per DSR-538-retest test).

## 7. Open points for QA

- Fixture change is data only: with `DSR173_MOVIE_PATH` set, VALID_YOUTUBE uses TD-587-01 (title "QA587 main movie", movieSourceId `irFRtAVphCY`, relatedProducts none); ja path/title = en copy ([Giả định] TD-587-01 ja copy has same id and values – page showed "QA587 main movie" on ja).
- DSR-MOVIE-014 now clicks the facade (TC step) and asserts the embed is absent before the click.
- DSR-MOVIE-026 opens RELATED_6 (qa587-rel-a) when set. Its same-language check now takes the language prefix of the opened page (`/en/` on overlay, `/master/en/` on test-space) instead of the hard-coded `/master/en/`; the Expected "same-language link" is unchanged – please confirm.
- DSR-538: card hrefs are clean. Raw HTML still has `https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/png/image%207.png` as DAM thumbnail source (json2html block rows + `og:image:secure_url`), HTTP 200 image/png. These are image sources, not card links – not counted as a DSR-538 fail.
- og:image recorded only (not re-tested): still `about:error` on all 3 pages, both tiers. DSR-VOV-013 not re-run (bug DSR-665).
- qa587-main has no related section, so the DSR-538 check there is skipped (nothing to check), not passed. TD-587-14 shows 5 of 6 related (r6…r2) = max 5 rule.
