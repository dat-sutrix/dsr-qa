# JOB-20261016-03 — DSR-501 P3/P2 rerun (DEV, en)

Ran DSR-501-P3 and DSR-501-P2 with the corrected titles (`video title rel1..rel5`, excluded `video title off`). Result: 2/2 FAIL, including the retry; tsc clean.
Both pages load their main movie (`video title main a` / `video title main b`). No related area renders on either page (DOM comments: `no related products`, `no related content`).
Page B is republished: its HTML and network call use `qa501-main-b`.

Diagnostics. Raw values from `https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/video-detail;videoId=<id>`, the host the page calls:
- qa501-main-a: dmMovieList 1 item, movieId qa501-main-a, title `video title main a`, relatedProducts=[], dmMovieRelatedList 0 items.
- qa501-main-b: 1 item, movieId qa501-main-b, title `video title main b`, relatedProducts=[], dmMovieRelatedList 0 items.
- movieid-01: 1 item, movieId movieid-01, title `movieTitle`, relatedProducts=[], dmMovieRelatedList 2 items with relatedArticles only (article-page-1..3, title null).
- Item keys for all three: movieId, movieTitle, description, movieAsset, movieSource, movieSourceId, thumbnail, relatedProducts. **No relatedMovies or relatedVideos key exists** (absent, not empty).
- Related CFs are on publish: videoId=rel1 → `video title rel1`; videoId=movieoff → `video title off`.
- Rendering: the reference page shows heading `Related Content` and 3 article cards (article-page-1/2/3). Page A shows nothing (full-page screenshot: evidence/qa501-a_fullpage_en.png).

Classification: this is (c), not (a) or (b). `blocks/video-detail/video-detail.js` takes related movies only from `cf.relatedVideos`, and articles from `dmMovieRelatedList.relatedArticles`. The persisted query never selects a related-movie field, so the authored relatedMovies cannot reach the page.
Suspect: product (persisted query and/or FE field name). Not verified: the actual DM_movie field name, and whether rel1..rel6 references are published.
The FE code also shows no 5-item cap and no isUnavailable filter for related items, and sorts by updateDate desc instead of authored order. That may matter once the data flows; this is from reading the code, not verified.
Run report: results/DSR-501/DEV/automation-run-20261016-rerun2.md.
