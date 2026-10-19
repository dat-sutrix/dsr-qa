# DSR-173 DEV automation run — 20261019-job17-02 (JOB-20261017-02, MOVIE-014/033 retest run 1)

## 1. Header

- Run start (UTC): 2026-10-19T04:29:07Z
- Run end (UTC): 2026-10-19T04:29:43Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`BASE_URL` from `envs/dev.env`)
- Target page: `/master/en/test-space/dsr-173-video-detail`
- Build under test: not independently verified. Observed `last-modified` values: `/blocks/video-detail/video-detail.js` Tue, 13 Oct 2026 05:10:12 GMT; `/scripts/video-source.js` and `/scripts/video-player.js` Tue, 13 Oct 2026 04:00:00 GMT; `/scripts/scripts.js` Mon, 19 Oct 2026 03:10:29 GMT. `/blocks/movie-detail/movie-detail.js` returns 404, so the block is `video-detail`.
- Baseline ID: BL-v1 (docs/DSR-173/); hub job JOB-20261017-02
- Automation HEAD commit SHA: 6a7c7e254fcd6a201c143e4a051b1136323d0810 (no code changes)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job02/run1.json ENV=dev npx playwright test tests/movie-detail/DSR-173.movie-detail.spec.ts --project=chromium --grep "DSR-MOVIE-(014|033) " --output=/tmp/job02/out1
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run once before run 1, same HEAD for both runs)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 0 | 2 | 0 | 1 | 1 | configured 1; 2 used (both failed again) | 33.4 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (DSR-MOVIE-014, DSR-MOVIE-033), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (initial | retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-MOVIE-014 | DSR-MOVIE-014 embeds the configured YouTube movie | failed | 6.70 s \| 6.76 s | `movie-detail-player-embed` not found: block rendered `<!--no video source-->` |
| DSR-MOVIE-033 | DSR-MOVIE-033 displays component sections in vertical order on PC | failed | 6.97 s \| 7.29 s | `movie-detail-player` not found (title is visible) |

## 5. Skipped tests

None

## 6. Failed tests

### DSR-MOVIE-014 — embeds the configured YouTube movie

- Failing assertion: `expect(movie.playerEmbed).toHaveAttribute('src', /\/embed\//)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:32`
- Expected: player embed iframe with `/embed/irFRtAVphCY` (fixture `movieSourceId: 'irFRtAVphCY&t=38s'`)
- Actual: element(s) not found within 5000 ms. The rendered block contains `<!--no video source-->` and no iframe or video element.
- Attempt(s): initial failed, retry failed
- Evidence paths: `/tmp/job02/out1/*YouTube-movie-chromium*/test-failed-1.png`, `trace.zip`, `error-context.md` (outside the project, not committed). A committed copy is at `ykk-dsr/hub/results/JOB-20261017-02/evidence/DSR-MOVIE-014_en.png`; all 4 attempts across both runs are byte-identical.

### DSR-MOVIE-033 — displays component sections in vertical order on PC

- Failing assertion: `expect(section).toBeVisible()` for `movie.player` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:201`
- Expected: title, player, related products and related content are visible, in vertical order
- Actual: `getByTestId('movie-detail-player')` not found. The title passed. The rendered block also contains `<!--no related products-->`, so the next check (`movie-detail-related-products`) would fail too.
- Attempt(s): initial failed, retry failed
- Evidence paths: `/tmp/job02/out1/*vertical-order-on-PC-chromium*/test-failed-1.png`, `trace.zip` (not committed). A committed copy is at `ykk-dsr/hub/results/JOB-20261017-02/evidence/DSR-MOVIE-033_en.png`.

Evidence under `/tmp/job02/` (and the default `test-results/`, `playwright-report/`) is not committed; local files may be overwritten or removed.

## 7. Open points for QA

- Read-only diagnostic (Playwright script, separate from the spec) shows the GraphQL request `GET https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/video-detail;videoId=movieid-01` → 200 returning `movieSource: "youtube"`, `movieSourceId: null`, `movieAsset: null`, `relatedProducts: []`. The fixture/baseline expects `movieSourceId: 'irFRtAVphCY&t=38s'` and `relatedProducts: ['productId-01']`. In `video-source.js`, an empty source id or asset makes the block emit `<!--no video source-->`. Proposed cause: data (CF movieid-01 fields empty or unpublished). When or why the CF changed is not verified, because the GraphQL response has no last-modified and the movie item exposes no `_metadata`.
- 0 console errors, 0 page errors and 0 failed requests during load (59 responses, all 200).
- Static HTML unchanged: `video-detail` block with the single row `movieid-01`. The uncompressed variant reports `last-modified: Mon, 05 Oct 2026 07:26:42 GMT`; the br variant reports `Fri, 16 Oct 2026 03:33:43 GMT`, with an identical body apart from the nonce.
- The command used `npx playwright test` with `ENV=dev` directly (equivalent to `npm run test:dev --`) and `--output` outside the project.
