# DSR-587 DEV automation run — 20261021-job20261020-02-live-rerun

Job: JOB-20261020-02 (lane claude-code). Rerun after test fixes: VOV-001 clicks the facade (TC step 3); VOV-003 og:image check made soft so the GraphQL check still runs; VOV-013 records main-frame navigations. No Expected value changed.

## 1. Header

- Run start (UTC): 2026-10-21T16:30:42Z (Playwright JSON startTime)
- Run end (UTC): 2026-10-21T16:32:04Z (start + reported duration)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /{ja,en}/library/video/qa587-main, /en/library/video/search
- Build under test: not independently verified (EDS `main` branch of dsr-eds-dev at run time; Martin merge 21/10 16:45 JST per hub notes).
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md incl. Update 2026-10-21) + TD-587-01 (ykk-dsr/hub/tc-out/DSR-587.spec.json)
- Automation HEAD commit SHA: 06430495f4af596cb6a3b18dd4c230cf03dad272 plus uncommitted working-tree changes from this job (fixtures/dsr-557.ts, fixtures/dsr-587.ts, pages/MovieDetailPage.ts, pages/VideoPlayerPage.ts, tests/catalog-video/DSR-557.catalog-video.spec.ts, tests/movie-detail/DSR-587.movie-overlay.spec.ts); committed together with this report. 
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job02/r4.json npm run test:dev -- tests/movie-detail/DSR-587.movie-overlay.spec.ts --project=chromium --grep "DSR-VOV-0(01|03|09|13|18) "
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before this test run on the same working tree).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 9 | 4 | 3 | 2 | 1 | 1 | configured 1; 3 retries used | 82.7 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (`--grep`), project chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (ms); retry outcomes shown.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | pass (passed) | 3543 | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | pass (passed) | 3318 | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | fail (failed / failed) | 5885 / 6692 | Error: og:image absolute URL |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | fail (failed / failed) | 5909 / 5953 | Error: og:image absolute URL |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only | fail (failed / failed) | 17615 / 15811 | Error: first list card (main-frame navigations: 72) |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title | pass (passed) | 3146 | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title | pass (passed) | 3258 | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-VOV-009 (DSR-VOV-009 [en] CF commune edit shows only after CF related republish) | Manual TC: Author edit + publish of CF commune / CF related; agents are read-only (A6) – QA-PT |
| DSR-VOV-018 (DSR-VOV-018 [cn] language variant) | Issue #18: no /cn path on DEV |

## 6. Failed tests

### DSR-VOV-003 — DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests

- Failing assertion: `expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//)` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:125`
- Expected: og:image = absolute URL returning HTTP 200 (TC 3.0 / DSR-MOVIE-029)
- Actual: raw HTML `<meta property="og:image" content="about:error">` on https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main; `og:image:secure_url` = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/png/image%207.png (HTTP 200, image/png). <title> "QA587 main movie | YKK DIGITAL SHOWROOM", description "QA587 line1  QA587 line2", body title present.
- Attempt(s): failed / failed (same failure on retry)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-02/evidence/DSR-VOV-003_ja.png, DSR-VOV-003_en.png (committed, from the .aem.live rerun); local /tmp/job02/tr-r4

### DSR-VOV-003 — DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests

- Failing assertion: `expect.soft(raw.ogImage ?? '', 'og:image absolute URL').toMatch(/^https?:\/\//)` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:125`
- Expected: og:image = absolute URL returning HTTP 200 (TC 3.0 / DSR-MOVIE-029)
- Actual: raw HTML `<meta property="og:image" content="about:error">` on https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main; `og:image:secure_url` = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/png/image%207.png (HTTP 200, image/png). <title> "QA587 main movie | YKK DIGITAL SHOWROOM", description "QA587 line1  QA587 line2", body title present.
- Attempt(s): failed / failed (same failure on retry)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-02/evidence/DSR-VOV-003_ja.png, DSR-VOV-003_en.png (committed, from the .aem.live rerun); local /tmp/job02/tr-r4

### DSR-VOV-013 — DSR-VOV-013 [en] movie list shows standard movies only

- Failing assertion: `expect(listed, 'first list card …').toBe(true)` (initial run: `expect(listingCards(page).first()).toBeVisible()`) — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:233`
- Expected: /en/library/video/search shows the movie list; qa587-main card present; no href to /video/search or /video/tech-talk
- Actual: HTTP 200 but raw HTML is an overlay `video-detail` block with rows source=overlay, unavailable=not-found; browser reloads the same URL continuously (72 main-frame navigations within the 5 s wait); no list block, no cards. video-detail.js:238-239 sends unavailable movies to backListUrl() = /video/search → loop.
- Attempt(s): failed / failed (same failure on retry)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-02/evidence/DSR-VOV-013_en.png (blank page, separate capture 16:36Z; Playwright took no screenshot because the page kept navigating)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Run on the job-start working tree; code changes are in the same commit as this report.
- TD-587-01 movieSourceId `irFRtAVphCY` was read from the raw page (row movieSourceId), not from a QA-PT record; the TestData sheet only says "any public YouTube id".
- Raw `movieId` row on qa587-main = "QA587 main1" (en) – BL-OVL-1 says ID = CF node name (`qa587-main`). Not asserted by the listed TCs; looks like a data entry issue (QA-PT-ERRORS "ID ≠ tên CF").
- VOV-009 (TC 9.0) is a Manual TC that needs Author writes; not executed by this read-only agent.
- VOV-003: only the og:image assertion failed; title, description (no line break, both lines), body title and 0 GraphQL requests passed.
- og:image `about:error` appears on every QA overlay page checked (qa587-main, qa557-dam, qa587-rel-a, qa587-r1, catalog qa190-cat-pdf). All use the same thumbnail `image 7.png` (space in file name), so a data cause (file name) cannot be excluded – product vs data not separated.
- VOV-013 cannot evaluate the hrefs while the list page loops; the tech-talk part of 13.0 also stays blocked by Q32.
