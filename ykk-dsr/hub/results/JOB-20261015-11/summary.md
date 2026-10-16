# JOB-20261015-11 – DSR-501 P2/P3 (DEV, en)

Added `describe('DSR-501')` to the DSR-173 movie-detail spec. Added fixture `fixtures/dsr-501.ts`. Ran on DEV (chromium) with tsc clean and exit 0.

Result: P3 and P2 are both **blocked (data)**. Neither test reached its assertions.

- qa501-a and qa501-b return HTTP 200. Both video-detail blocks show "Unable to load video information.", with no main movie title and no related cards.
- The raw HTML of **both** pages references videoId `qa501-main-a`. Page B should use `qa501-main-b`.
- The publish persisted query `ykk/video-detail;videoId=<id>` returns empty `dmMovieList` for qa501-main-a, qa501-main-b, qa501-rel-1 and qa501-off. `movieid-01` (DSR-173) works.
- Likely cause: the qa501 CFs are not on publish, or their `movieId` field differs from the CF name. This contradicts the Night Report ("9 CF published").

To unblock:
1. Publish the CFs and verify movieId = CF name.
2. Fix page B to reference qa501-main-b.

Then re-run `npm run test:dev -- tests/movie-detail/DSR-173.movie-detail.spec.ts --project chromium --grep DSR-501`.

Assumption: related titles equal the CF names. qa501-off was not present on either page, but this proves nothing while the block is empty.
No evidence/ folder: there were no failed tests. Run report: results/DSR-501/DEV/automation-run-20261016.md.
