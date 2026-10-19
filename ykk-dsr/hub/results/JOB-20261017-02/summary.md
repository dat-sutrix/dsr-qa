# JOB-20261017-02: DSR-173 retest, DSR-MOVIE-014 + 033 (DEV, en)

I ran both TCs twice in chromium, each run a fresh browser context. tsc is clean. Both failed in both runs, retries included (exit 1). The screenshots are byte-identical across attempts.
- **Cause (suspect: data).** The block calls `GET publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/video-detail;videoId=movieid-01` and gets 200. The response has `movieSource: "youtube"`, `movieSourceId: null`, `movieAsset: null`, `relatedProducts: []`. Fixture/BL-v1 expects `irFRtAVphCY&t=38s` and `productId-01`.
  `video-source.js` returns no player for an empty source, so the block renders `<!--no video source-->` (and `<!--no related products-->`). This is consistent behaviour, not a JS crash.
- **No product error seen.** There were 0 console errors, 0 page errors and 0 failed requests (59 responses, all 200).
- **Static HTML unchanged.** The block is `video-detail` (not `movie-detail`; `/blocks/movie-detail/movie-detail.js` returns 404) with the single row `movieid-01`. last-modified is 05/10 07:26Z for the plain variant and 16/10 03:33Z for the br variant, with an identical body.
- **Deployed JS last-modified.** `blocks/video-detail/video-detail.js` 13/10 05:10Z; `scripts/video-source.js` and `video-player.js` 13/10 04:00Z.
- **Not verified.** I could not tell when or who emptied movieSourceId/relatedProducts in CF movieid-01: there is no last-modified on GraphQL and no `_metadata` on the movie item. Also not verified: whether it is unpublished vs edited. Next step: ask dev/author to check CF movieid-01 on Author and republish.
- **DSR-MOVIE-033 will still fail on related products.** Even once the player is restored, 033 needs related products, which are also empty.
- I made no code or Expected changes.
Screenshots: evidence/DSR-MOVIE-014_en.png, evidence/DSR-MOVIE-033_en.png. Reports: results/DSR-173/DEV/automation-run-20261019-job17-02.md and results/DSR-173/DEV/automation-run-20261019-job17-02-run2.md.
