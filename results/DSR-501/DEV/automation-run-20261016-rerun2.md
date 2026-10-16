# DSR-501 DEV automation run — 20261016-rerun2

## 1. Header

- Run start (UTC): 2026-10-16T05:12:02Z
- Run end (UTC): 2026-10-16T05:12:45Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/en/test-space/qa501-a`, `/master/en/test-space/qa501-b` (reference: `/master/en/test-space/dsr-173-video-detail`)
- Build under test: not independently verified (front-end read live from `/blocks/video-detail/video-detail.js` at run time)
- Baseline ID: none given for DSR-501 (job JOB-20261016-03, rerun of JOB-20261015-11)
- Automation HEAD commit SHA: 6a888b243720c6145a8f6355a950cf2d1520bc21 (plus the uncommitted `fixtures/dsr-501.ts` title update, committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job16-03.json npm run test:dev -- tests/movie-detail/DSR-173.movie-detail.spec.ts --project chromium --grep "DSR-501" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 0 | 2 | 0 | 1 | 2 | 1 configured; 1 used per test (both retries failed) | 40.9 s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms them.
Scope/browser: subset `describe('DSR-501')`; chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-501-P3 | DSR-501-P3 [en] related movies are limited to 5 in authored order | Fail (proposed) | 8.9 s / 8.4 s | `movie-detail-related-content` not rendered on qa501-a |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed | Fail (proposed) | 7.6 s / 7.8 s | `movie-detail-related-content` not rendered on qa501-b |

## 5. Skipped tests

None. Both pages passed preflight: HTTP 200 and main titles `video title main a` / `video title main b`.

## 6. Failed tests

### DSR-501-P3 — DSR-501-P3 [en] related movies are limited to 5 in authored order

- Failing assertion: `await expect(movie.relatedContentSection).toBeVisible()` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:268`
- Expected: related area shows exactly 5 movie cards `video title rel1` … `video title rel5`, in that order
- Actual: `getByTestId('movie-detail-related-content')` not found (5000 ms). The DOM holds only the comments `no related products` and `no related content`.
- Attempt(s): initial fail, retry fail (same error)
- Evidence paths: `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium/test-failed-1.png` (+ `-retry1/`); committed copy `ykk-dsr/hub/results/JOB-20261016-03/evidence/DSR-501-P3_en.png`

### DSR-501-P2 — DSR-501-P2 [en] unavailable related movie is not displayed

- Failing assertion: `await expect(movie.relatedContentSection).toBeVisible()` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:275`
- Expected: related area on page B (videoId qa501-main-b) shows `video title rel1` only; no `video title off` anywhere
- Actual: related area not found. `video title off` is also absent from the page, but the assertion order means the test never reached that check.
- Attempt(s): initial fail, retry fail (same error)
- Evidence paths: `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium/test-failed-1.png` (+ `-retry1/`); committed copy `ykk-dsr/hub/results/JOB-20261016-03/evidence/DSR-501-P2_en.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Diagnostics (curl and a Playwright network log, 2026-10-16 ~05:10Z): every page calls `https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/video-detail;videoId=<id>?t=<ts>`.
  - `qa501-main-a`: dmMovieList 1 item, movieId `qa501-main-a`, movieTitle `video title main a`; item keys `movieId, movieTitle, description, movieAsset, movieSource, movieSourceId, thumbnail, relatedProducts`; `relatedProducts: []`; dmMovieRelatedList 0 items.
  - `qa501-main-b`: same shape; movieTitle `video title main b`; `relatedProducts: []`; dmMovieRelatedList 0 items.
  - `movieid-01`: same shape; movieTitle `movieTitle`; `relatedProducts: []`; dmMovieRelatedList 2 items, each holding only `relatedArticles` (article-page-1..3 `_publishUrl`, title null) plus `_metadata`.
  - **No `relatedMovies` or `relatedVideos` key is returned for any id**; it is absent, not empty.
  - Related CFs exist on publish: `videoId=rel1` → `video title rel1`; `videoId=movieoff` → `video title off`.
- The front end (`blocks/video-detail/video-detail.js`) builds the related-content list from `cf.relatedVideos` + `dmMovieRelatedList.items[0].relatedArticles` + `cf.relatedLandingPages`. It sorts by updateDate descending. No 5-item cap or isUnavailable filter on related items was found in that file. These are code-reading observations, not verified behaviour.
- Rendered: page A and page B show no related area. The reference page shows a heading `Related Content` and 3 cards (`article-page-1`, `article-page-2`, `article-page-3`, all `data-content-type="article"`), i.e. from relatedArticles only.
- Classification per job: neither (a) nor (b) applies cleanly. The query does not select the related-movie field at all. Category (c) is closest: the block renders related movies only from `relatedVideos`, which the persisted query does not return. Suspect: product (persisted query / FE field mapping). Not verified: the field name of 関連動画 in the DM_movie model, and whether rel1..rel6 are actually referenced on publish.
- Page B now references `qa501-main-b` (raw HTML and the network call), so it has been republished.
