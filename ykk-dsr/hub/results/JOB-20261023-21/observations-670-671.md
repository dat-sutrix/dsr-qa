# JOB-20261023-21 – DSR-670 / DSR-671 observations + build check (DEV, read-only)

Collected 2026-10-23 09:28–09:33Z with GET only: publish persisted queries (`https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/...`), EDS `.aem.live`/`.aem.page`, and Author model schema (`models-after.md`). These are observations, not verdicts. The 671 rows are **Pending TC proposals** for Claude to turn into TC rows (DSR-586).

## Build check
| File | Host | Last-Modified | ETag |
|---|---|---|---|
| `blocks/catalog-detail/catalog-detail.js` | .aem.live | Thu, 22 Oct 2026 01:48:45 GMT | `b7e43493b9bdc11fcbbeb85cf528194e` |
| `blocks/catalog-detail/catalog-detail.js` | .aem.page | Thu, 22 Oct 2026 01:48:45 GMT | `b7e43493b9bdc11fcbbeb85cf528194e` |

Same values as before the deploy (job note: 22 Oct 01:48:45 GMT, JOB-23-15 ETag `b7e43493…`). So Martin's catalog-detail refactor is **still not deployed** on DEV `main`. The 654/570/557 rerun in this job therefore does not cover the refactor.

## DSR-670 (tech talks)
| Check | Observed | Proposed |
|---|---|---|
| Model `DM_techmovie_dsr` exists | yes – `/conf/ykk/settings/dam/cfm/models/dm_techmovie_dsr`, fields movieLabel, movie (→ DM_movie, required), dsrFeatures, isBoothLimited, relatedArticles, relatedLandingPages, isActive (表示フラグ) | Pass (model exists) |
| `movies/tech/` folders | `/content/dam/dsr/ja/movies/tech`, `/content/dam/dsr/en/movies/tech`: no CF (matches the Martin report) | – |
| Query `dsr-techmovie-page` | `…/dsr-techmovie-page;path=/content/dam/dsr/ja/movies/tech/x` → HTTP 200, body `{"data":{"inactive":{"items":[]},"related":{"items":[]}}}` | Pass (query exists, empty expected) |
| `/{lang}/library/video/tech-talk/<id>` renders | not checked: DEV has no tech talk | Pending (no data) |

## DSR-671
| # | Check | Observed | Proposed |
|---|---|---|---|
| 671-a | Related catalogs/videos whose DSR CF has isActive=false are NOT shown on product detail (`/ja/products/990586001` + qa586 products) | `dsr-product-page` for every product in `dsr-product-list` (ja 8, en 4): ja 990586001 has `relatedCatalogs: []`, `relatedVideos: []`; **no qa586 product has a related catalog or video**. Only `productid-01x` (ja/en, not qa586) has relations: catalog `catalogid-02`, videos `movieid-01` (en), `FILTERED` (ja/en). Their DSR CFs: en `movies/standard/movieid-01` isActive=true; en `movies/standard/filtered` isActive=true; `dsr/en/catalogs/catalogid-02` → `dsr-catalog-page` returns no item. No related item with isActive=false exists | **Pending – data.** Needs a qa586 product whose relatedCatalogs/relatedVideos point to a content CF whose DSR CF has isActive=false (e.g. qa654-inactive / qa587-inactive) – Author data (lane author/chrome) |
| 671-b | Product label `{productId}｜{productName}` | `dsr-product-page` field `productLabel` (stored value): ja 990586001 = `"990586001"`; ja 135/46/productid-01x = id only; ja 990586008/990586009/qa586-alpha/qa586/990586006 and en 135/990586001 = `null`. **None has the form `{productId}｜{productName}`** (e.g. expected `990586001｜QA586 product A`). The page `/ja/products/990586001` (200) shows no label (overlay rows: productName, productId …) | **Pending.** Not clear whether the format is applied only when the CF is saved in the CF editor (then existing CFs keep old values) or should be computed. Claude to decide expected; no bug proposed |
| 671-c | catalog `hubspotFormId` / `promoText` in query | `DM_catalog_dsr` model has both (models-after.md). `dsr-catalog-page;path=/content/dam/dsr/ja/catalogs/qa190-cat-pdf-form` returns `"hubspotFormId": null, "promoText": {"plaintext": null, "html": null}` → present. `dsr-catalog-list` (ja, 15 items) item keys = `_path, catalog, isActive, isBoothLimited` → **not in the list query** | Pass for `dsr-catalog-page`; list query does not carry them (only an observation – not known whether it should) |
| 671-d | `relatedMoodboards` absent | Removed from `DM_product_dsr` (models diff). Not in any `dsr-product-page` response (12 products) | Pass |
| 671-e | Migration counts | Folder table in `models-after.md` lists 82 DSR CFs (direct children); Martin report 84. Likely the 2 CFs in sub-folders (e.g. `dsr/ja/products/qa586/990586006`) – not verified | – |
