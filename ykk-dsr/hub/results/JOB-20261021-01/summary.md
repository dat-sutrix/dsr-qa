# JOB-20261021-01: overlay 404 diagnostics (DEV, read-only), 2026-10-21 08:21–08:27Z

## For Martin
- Persisted queries are fine. `dsr-video-page;path=/content/dam/dsr/{en,ja}/movies/standard/qa-587-main` returns 1 item with no errors, `isActive=true`, and the content CF `/content/dam/common/{en/qa587-main | ja/qa-587-main}`.
- The 404s come from EDS, not from the overlay template. `x-error: failed to load /en/library/video/<id>.md from content-bus: 404`. admin.hlx.page/status shows `preview.status 404` for every QA CF created on 20/10 from 13:11Z onwards (qa-587-main en, qa557-dam, qa587-rel-a, qa587-r1…r6). This is true whatever the `isActive` value is.
- Every overlay page that is 200 on .page has a preview entry made by an explicit preview run: sort-main, movieid-01, long, qa501-main-a, products/46 en and productid-01x were previewed on 16/10 or 19/10 with `sourceLocation` json2html **`dsr-productdetail-moustache`** (the test branch, not main). products/46 ja and catalog qa190-cat-pdf-form en were previewed on 20/10 with json2html `main`.
- **Republishing the DSR CF in Author does not create a preview entry by itself.** qa-587-main en has DSR CF `cq:lastModified` 07:52:50Z today and still has no preview entry at 08:26Z.
- No overlay page had ever been on .live (`live.status 404` on all 11 pages checked, products/46 included). The one exception appeared during this run: **ja/qa-587-main was previewed at 08:25:56Z and went live at 08:25:58Z**. Its source is json2html `main`, and it now returns 200 on both .page and .live with `cf-path` `/content/dam/dsr/ja/movies/standard/qa-587-main`. Its CF was last modified at 07:58Z, so someone triggered preview and live about 27 min later. en/qa-587-main is still 404.
- First difference found: the working pages have a content-bus preview entry and the failing ones have none. Query data is not the gate. Working CFs also carry uppercase or leading-space movieIds (`FILTERED`, `" norelated"`).
- Data note: the DSR CF is **`qa-587-main`**. There is no `qa587-main` DSR CF in en or ja, so `/en/library/video/qa587-main` can never exist. The en content CF is `qa587-main`, which breaks the "same ID" rule.
- Question for Martin: is something supposed to call preview/live automatically when a DSR CF is published, and if so why does it not fire? Or is a manual Sidekick/admin preview and publish the intended step? Who ran it for ja/qa-587-main at 08:25Z?

## Merge/incident-related
| URL | symptom | cause | confidence (product bug) | first seen | evidence |
|---|---|---|---|---|---|
| /en/library/video/qa-587-main (.page/.live) | 404: no preview entry in content-bus, although the DSR CF is published, isActive=true and the query returns 1 item | overlay-merge | 55% (publish→preview trigger missing or not run; whether it is manual by design is unknown) | JOB-20261021-01 (symptom 20/10) | raw/headers.txt, raw/admin-status*.txt, raw/vp_en_qa-587-main.json |
| every overlay URL on .live (video, product 46/135/productid-01x, catalog) | 404: never published to live (until ja/qa-587-main at 08:25:58Z) | overlay-merge | 40% (may be intended: nobody ran publish) | JOB-ZZ-IDLE-23 | raw/admin-status-all.txt, raw/prodtable.txt |

Not merge-related (cause `none`, data, 0% bug): `qa587-main` DSR CF does not exist (it is named `qa-587-main`). en qa557-dam and qa587-rel-a have `isActive=false` and r1–r6 have `isActive=null`. None of these were republished today (lastModified 20/10 13:54–14:41Z). The DSR CF qa587-r5 references content CF **qa587-r6**. ja qa557-dam has `isActive=null` and movieId "QA587 dam". The ja catalogs qa190-cat-pdf-form and qa190-cat-pdf have no DSR CF (0 items). The en catalog DSR CF still references `/content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form`, which is outside `/content/dam/common/en/catalogs/`.

## Raw table: job ids (queried 08:21–08:24Z, status rechecked 08:26Z, preview entries 08:25–08:27Z)
| id / lang | query (items, isActive, inactive) | content CF ref | .page | .live | .html / trailing `/` | preview entry |
|---|---|---|---|---|---|---|
| qa587-main en | dsr-video-page 0 items | – | 404 | 404 | 404/404 | none |
| qa587-main ja | dsr-video-page 0 items | – | 404 | 404 | 404/404 | none |
| qa-587-main en | 1, true, 0 | /content/dam/common/en/movies/qa587-main | 404 | 404 | 404/404 | none |
| qa-587-main ja | 1, true, 0 | /content/dam/common/ja/movies/qa-587-main | 404 at 08:23 → **200** at 08:26 | 404 → **200** | 404/404 (08:23) | 21/10 08:25:56Z, json2html main |
| qa557-dam en | 1, **false**, 1 | /content/dam/common/en/movies/qa557-dam | 404 | 404 | 404/404 | none |
| qa587-rel-a en | 1, **false**, 1 | /content/dam/common/en/movies/qa587-rel-a | 404 | 404 | 404/404 | none |
| qa190-cat-pdf-form en | dsr-catalog-page 1, true, 0 | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form | 200 | 404 | 404/404 | 20/10 06:12Z, json2html main |
| qa190-cat-pdf-form ja | 0 items | – | 404 | 404 | 404/404 | – |
| qa190-cat-pdf ja | 0 items | – | 404 | 404 | 404/404 | – |
| products/46 en | dsr-product-page 1, true, 0 (no errors) | /content/dam/common/en/products/461 | 200 | 404 | 404/404 | 16/10 04:26Z, json2html dsr-productdetail-moustache |

Step 3 (dsr-video-list `folder=/content/dam/dsr/{lang}/movies/standard/`, 23 en + 5 ja items, tech 0): every DSR CF created on or before 19/10 is 200 on .page (15 en and 3 ja, including isActive=null qa501-main-b). Every one created from 20/10 13:11Z is 404, with ja qa-587-main as the exception after 08:25Z. All are 404 on .live. Field diff of qa501-main-a (200) against qa-587-main en (404): the only structural difference is `relatedMovies` (6 against `[]`). The rest are values: movieId/movieLabel `qa501-main-a` against `QA587 main1`. For ja sort-main against ja qa-587-main: movieLabel `sort-main` against null, movieAsset present against null, relatedArticles/LPs 3+2 against `[]`. None of these explains a missing content-bus entry. Full per-id table: raw/idtable.txt. Products: raw/prodtable.txt.

Step 4, naming rules: all folders are correct (`/content/dam/dsr/{lang}/movies/standard/`, `/products/`, `/catalogs/`), and so are the lang folders. Ids use only `[a-z0-9-]`. `productid-01x` is 200 on .page even though BL-OVL-1 says product ids are digits-only (regex `([0-9]+)$`). That preview came from the moustache branch, so BL and the deployed config may differ; to be confirmed. The overlay block code makes no GraphQL call; the queries are dsr-video-page, dsr-product-page, dsr-catalog-page and dsr-video-list (`dsr-catalog-list` does not exist).

Method: curl GETs only, with no preview/publish POST, no login and no form submit. No npm test run, so there is no automation-run report and tsc was not run. No screenshots: the 404 body is the generic "Page not found" page, and the hub evidence rule covers failed tests only. Who triggered ja/qa-587-main at 08:25Z was not verified.
