# Overlay data flow – baseline BL-OVL-1 (source: Martin, 2026-10-16)

Source: "DSR Overlay Data Flow – DSR-584 / DSR-587", claude.ai artifact RJZeN9qkbwEa8uDyTC8rQr shared by Portal Martin to Dat on 2026-10-16. Applies to video detail (DSR-587), product detail (DSR-586/585, DSR-503 URL rule) and catalog detail. Status per Martin: **Video** done, verified locally; **Product** AEM + overlay config ready (DSR-584), template/block to do; **Catalog** AEM + overlay config ready, URL to confirm, template/block to do.

## Two CFs per item
| | CF commune (content) | CF related (DSR listing) |
|---|---|---|
| Path | `/content/dam/common/{lang}/{products\|movies\|catalogs}/{id}` | `/content/dam/dsr/{lang}/{products\|movies/standard\|catalogs}/{id}` |
| Model | DM_product, DM_movie, DM_catalog | dm_*_related today → DM_*_dsr in CF spec (2026-10-08) |
| Holds | name, description, media, specs, related items (shared by all YKK sites) | `isActive`, DSR-only links (`relatedArticles`, `relatedLandingPages` / `relatedContents`), reference to one CF commune of the same language (`movie` / `product` / `catalog`) |
| Creates the page? | **Never** | **Yes – publishing it creates the page** |

## Path and naming rules (CF related)
- Directly in `/content/dam/dsr/{lang}/{products|movies/standard|catalogs}/`. Other folder or subfolder → **no page**.
- Name = id: lowercase letters, digits, hyphens only; no prefix. Uppercase or `_` → **404**.
- Never rename or move a published CF related (URL changes, links break).
- CF commune in `/content/dam/common/{lang}/…`, same language, **must be published**, else page shows as unavailable.

| CF related path | Page | |
|---|---|---|
| /content/dam/dsr/ja/products/51 | /ja/products/51 | ✓ |
| /content/dam/dsr/en/movies/standard/sort-main | /en/library/video/sort-main | ✓ |
| /content/dam/dsr/cn/catalogs/12 | /cn/library/catalog/12 (URL to confirm) | ✓ |
| /content/dam/dsr/ja/products/zipper/51 | no page (subfolder) | ✗ |
| /content/dam/dsr/ja/products/Item_51 | 404 (uppercase, `_`) | ✗ |
| /content/dam/common/ja/products/51 | no page (CF commune) | ✗ |
| /content/dam/ykk/…/related-product/dm-product-related-1 | no page (not under /content/dam/dsr/) | ✗ |

## URL / regex / query per type
| Type | Page URL | json2html regex | Sites pages kept | Persisted query | List field | Ref |
|---|---|---|---|---|---|---|
| Video | /{lang}/library/video/{id} | `(?<=\/library\/video\/)(?!search$\|tech-talk$)([a-z0-9-]+)$` | video/search, video/search/* | dsr-video-page | dmMovieRelatedList | movie |
| Product | /{lang}/products/{id} | `(?<=\/products\/)([0-9]+)$` (digits only) | any Sites page whose name is not a number | dsr-product-page | dmProductRelatedList | product |
| Catalog | /{lang}/library/catalog/{id} | `(?<=\/library\/catalog\/)(?!search$)([a-z0-9-]+)$` | catalog/search | dsr-catalog-page | dmCatalogRelatedList | catalog |

Query call: `https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/<query>;path=<CF related folder><id>` (publish tier, published content only, cache 0). Response: `related.items[]` (CF related + inlined CF commune) and `inactive.items[]` (non-empty only when `isActive` = false).

## Editor action → effect
| Action | Effect |
|---|---|
| Publish CF related (preview) | page on aem.page only |
| Publish CF related (live) | page on aem.page + aem.live, added to query-index and sitemap |
| Edit + publish CF commune | no change until CF related is republished |
| Republish CF related | page regenerated from current published CF commune |
| `isActive = false`, republish | page kept with `noindex`; block sends visitors to the list |
| Unpublish CF commune, republish CF related | same as isActive = false |
| Unpublish CF related | page removed (preview + live) |

## Rendering
json2html Mustache template (`cf-templates/video.html`; product/catalog to do) writes `<head>` (title, description, og:image) and one block row per field; inactive or missing CF commune → single `unavailable` row + `noindex`. Page is static HTML (content readable without JS). Block (`scripts/overlay-rows.js`, `blocks/video-detail`) rebuilds the object from rows – **no GraphQL call in the browser**.

## Update 2026-10-16 (Martin, DSR-647 comment 61175)
- `relatedMovies` added to `dsr-video-page`; related movies with `isUnavailable = true` not shown; max 5 related movies.
- Order (video detail spec): 関連コンテンツ mixes movies, articles and LPs, sorted by update date, newest first (not authored order).
- Branch for test: `DSR-PRODUCTDETAIL-moustache` → https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/{id}. QA CF related qa501-main-a/b created by Martin under /content/dam/dsr/en/movies/standard/.

## QA observations (not in the source)
- ~~No `relatedMovies` in the DEV excerpt~~ → resolved by the update above.
- Two flags: `isActive` (CF related, hides detail page) vs `isUnavailable` (CF commune DM_movie, DSR-501 point 2) – relation not defined.
- "Today's test CFs live elsewhere": QA data `qa501-*`, `qa190-*` under `/content/dam/ykk/common/product-cf/test/` will **not** generate overlay pages.

## Update 2026-10-19 (Martin, chat DSR || Dev - QC) – merge to main 2026-10-20 morning
- After merge, DEV main: product and video detail pages exist **only** for items set up in the new folders; any other product/video → "page not found". Product list and video list show only those items. Sample (fake) data removed. Staging/production unchanged.
- dev-eds.ykkdigitalshowroom.com: lists show an error for a few days (server setting); usual review links (.aem.page/.aem.live) not affected → QA uses .aem.page/.aem.live only.
- Authoring (per item, per language ja/en/cn):
  1. Content CF: product `/content/dam/common/{lang}/products/{id}`, video `/content/dam/common/{lang}/movies/{id}` → fill, publish.
  2. DSR CF: product `/content/dam/dsr/{lang}/products/{id}`, video `/content/dam/dsr/{lang}/movies/standard/{id}` (**tech talk: `/movies/tech/`**) – same name; pick the content CF (same language); tick **表示フラグ / isActive**; related articles / LPs = **site pages** (not CFs); publish → creates the page.
  3. Check `/{lang}/products/{id}` or `/{lang}/library/video/{id}`.
- Names: lowercase, digits, "-" only; no prefix, no subfolder. Never rename a published CF. Content change = publish content CF, then republish DSR CF.
- QA impact: QA CFs under `/content/dam/ykk/common/product-cf/test/` (qa190-*, qa501-*) are outside the new folders → their pages/list entries are expected to disappear after merge (not a bug). Re-seed in the new folders.
- 2026-10-19 16:20 Martin (thread): (1) **Catalog overlay not implemented yet** – next step, planned 2026-10-20 afternoon; catalog list/download pages change after that. (2) From now on test **video only on `/{lang}/library/video/{id}`** (no more test-space dsr-173-video-detail?id=…); products on `/{lang}/product/{id}` (⚠ Martin wrote `product`; BL table says `/products/` – agent checks both after merge). (3) CF creation must follow the folder rules exactly: page generation is directory-strict.
- 2026-10-20 06:44 Martin: PR merged to main, works on main. **Some TEST CFs were deleted by the directory clean-up** – QA re-creates them. QA decision: re-seed with TD-587 set (qa587-*, correct folders); qa501-* and qa190-mv-* are retired. Video list: https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/search
- 2026-10-20 09:25 Martin: this morning's PR = video + product only; **catalog overlay is out of scope for now** (not this afternoon). → Catalog list/download pages stay on the current implementation; QA catalog data under /content/dam/ykk/common/product-cf/test/ (qa190-cat-*) stays valid; no catalog re-seed.
- 2026-10-20 09:29 Martin: for video, product and catalog, **1 content CF ⇒ 1 CF related, preferably with the same ID**. QA rule: every QA content CF gets its own DSR CF with the same name (also related items such as qa587-r1…r6, qa587-off), except negative TCs that deliberately test "content CF only" (TD-587-06, TD-586-07).
- 2026-10-20 11:09–11:40 Martin (thread): **all product-related data is broken on DEV** – the product CF MODEL changed (fields removed/added, 項目fix版 / DSR-585), so the product persistent queries ask for missing fields → 404/500, FE broken. Martin fixing all queries + FE "within this afternoon". Expect product failures on DEV until then = environment, not new bugs.
- 2026-10-20 12:40 Martin: catalog overlay finished locally → **merging into dev now (Dat OK)**. Supersedes 09:25 "out of scope". After merge, catalog pages/list follow the overlay rules: CF commune `/content/dam/common/{lang}/catalogs/{id}`, CF related `/content/dam/dsr/{lang}/catalogs/{id}` (1 content CF ⇒ 1 DSR CF same id), page `/{lang}/library/catalog/{id}` (URL to confirm). Old QA catalog CFs (qa190-cat-* in /content/dam/ykk/common/product-cf/test/) expected to disappear from lists.
- 2026-10-20 JOB-20261019-05: product URL = `/{lang}/products/{id}` (200 on .aem.page); `/{lang}/product/{id}` = 404 → Martin's "/product/" in chat was a typo.
- 2026-10-20 12:45 Martin: catalog overlay merged to dev; sample page https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa190-cat-pdf-form (catalog URL /{lang}/library/catalog/{id} confirmed). JOB-20261020-05 inventories which qa190-cat-* exist.
- 2026-10-20 Martin incident report (docs/incidents/2026-10-20-dm-product-CR-DSR-585.txt): DSR-585 CR (dsr-fullstack#103, 12:12 JST) changed dm_product (−30 fields, +9); 4 persisted queries broke (dsr-product-list, dsr-product-page, dm-product-list, product-detail). Fixed: queries 5e827682 (13:25 JST), FE dsr-eds#189 (13:50 JST). Removed from UI: product-list tag groups, plastic-parts filter, standard color card badge, 生産国 tooltip; product detail/overlay: topBottomStopVariation. New fields (itemVariationsImage, colorVariationsImage, Howtouse, HowtouseImage, recycledMaterial, recycledMaterialNote, parentProduct, applicableSliderStandard, applicableSliderSpecial) parsed but NOT rendered (no design). Fix verified statically only (no GraphiQL / browser) → QA verifies (JOB-20261020-07). Video, catalog, search-count queries not affected.
