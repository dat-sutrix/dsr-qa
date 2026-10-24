# JOB-20261024-01 – DSR-669/670/671 publish-side close-out (DEV, ja/en) – done
Read-only: curl + Playwright network log on `.aem.live`/`.aem.page`, GET on the publish GraphQL host `publish-p192812-e2014374.adobeaemcloud.com`. No Author calls, no npm test → no run report, no tsc. 2026-10-24 00:51–00:56Z.
**NEW FAIL: none. Merge/incident-related (cause ≠ none): none.** 0 Fail; 1 Pending (no tech-talk data); 671 = observations only.

| Check | ja | en | Raw value | Proposed | suspect / cause / conf. |
|---|---|---|---|---|---|
| 670-1 tech-talk page 200 / video-detail | Pending | Pending | No tech-talk CF on DEV: `dsr-video-list;folder=…/{ja,en}/movies/tech/` → `items: []`; query-index has no `tech-talk` path; `/…/library/video/tech-talk/{movieid-01,qa587-main}` 404 on live + page. Same as Martin migration report ("movies/tech/ holds no CF") | Pending | data / none / – |
| 670-2 `dsr-techmovie-page` on publish | Pass | Pass | 200 JSON; no path → GraphQL `ValidationError` (`path` ID!) = query deployed; `path=/content/dam/dsr/ja/movies/tech/x` → `related.items: []`. No page calls it from the browser (detail pages are server-rendered) | Pass | – |
| 669-1 old `*-related*` queries unused | Pass | Pass | Browser network of video `qa587-main`, catalog `qa190-cat-pdf`, product `990586001` (live; product also .page): **0 GraphQL calls** (only query-index.json + tags.json). Search/list pages call only `dsr-video-list`, `dsr-catalog-list`. Guessed old names `{video,catalog,product,movie}-related-page`, `dsr-*-related` → 404 PersistenceError | Pass | – |
| 669-2 new `dsr-*` queries 200 | Pass | Pass | `dsr-video-page`, `dsr-catalog-page`, `dsr-product-page`, `dsr-video-list`, `dsr-catalog-list`: all 200 with data; overlay HTML matches (`source=overlay`, `cfPath=/content/dam/dsr/…`) | Pass | – |
| 671 productLabel | Obs | Obs | `dsr-product-page` 990586001: ja `"990586001"`, en `null` (HTML: ja `related.productLabel=990586001`, en row absent). Also ja 135→`"135"`, 46→`"46"`, others `null`. Not `{productId}｜{productName}` | Obs | Martin is checking it on Mon 26/10 (KNOWN-FACTS 23/10 17:05); CFs last modified 22/10, before the deploy |
| 671 catalog `hubspotFormId` / `promoText` | Obs | Obs | Both keys present in `dsr-catalog-page` (qa190-cat-pdf): `hubspotFormId: null`, `promoText: {plaintext: null, html: null}` | Obs | – |
| 671 `relatedMoodboards` absent | Obs | Obs | Key absent in every product/catalog/video response fetched (12 products, 2 catalogs, 2 videos) | Obs | – |
| 671 isActive=false hides related catalog/video | Obs | Obs | Not observable: no product DSR CF links a catalog/video CF (`relatedContents` empty or only `/content/sites/…` pages; 12 products checked). Needs seeded data (Author) | Obs | data / none / – |
| 4 Last-Modified (live = page) | – | – | `catalog-detail.js` Thu 22 Oct 01:48:45 GMT · `product-detail.js` Fri 23 Oct 07:15:23 GMT · `video-detail.js` Fri 23 Oct 07:15:23 GMT (= dsr-eds #212 merge 07:15Z). CSS: product 20 Oct 04:50, video 13 Oct 04:00, catalog 15 Oct 03:59. Overlay pages regenerated 23 Oct 07:41–07:43Z | Obs | catalog-detail.js unchanged since 22/10 |

Raw responses: `raw/` (6 JSON). No screenshots committed (no fails). Side note, not checked against a baseline: `dsr-product-page` for `ja/products/990586008` returns the item under `related` with `isActive: false`.
