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

## QA observations (not in the source)
- DEV excerpt of the video CF commune shows `relatedProducts` but **no `relatedMovies`** → DSR-647 gap remains in the new flow unless the query/template add it.
- Two flags: `isActive` (CF related, hides detail page) vs `isUnavailable` (CF commune DM_movie, DSR-501 point 2) – relation not defined.
- "Today's test CFs live elsewhere": QA data `qa501-*`, `qa190-*` under `/content/dam/ykk/common/product-cf/test/` will **not** generate overlay pages.
