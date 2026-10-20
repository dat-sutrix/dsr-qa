# JOB-20261020-07 – raw values (DEV, read-only, 2026-10-20 06:45–06:58Z)

Tools: curl (queries, JS headers) and a Playwright script outside the repo (pages, 1440×900, networkidle + 2.5 s). Page screenshots from checks 2/3 stay local (`/tmp/j07/shots/`, not committed: hub rule = failed-test screenshots only).

## 1. Publish persisted queries (`https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/…`, unencoded `;`)

| Query + params | HTTP | `errors` | Items |
|---|---|---|---|
| `dsr-product-list` (no param, as written in the job) | 200 | **yes**: `Variable 'folder' has an invalid value: … coerced Null value for NonNull type 'ID!'` (ValidationError) | – |
| `dsr-product-list;folder=/content/dam/dsr/ja/products/` (param the pages send) | 200 | no | related 3 (135, 46, productid-01x) |
| `dsr-product-list;folder=/content/dam/dsr/en/products/` | 200 | no | related 3 (135, 46, productid-01x) |
| `dsr-product-page;path=/content/dam/dsr/ja/products/46` | 200 | no | related 1, inactive 0 |
| `dsr-product-page;path=/content/dam/dsr/en/products/46` | 200 | no | related 1, inactive 0 |
| `product-detail;productId=productId-01x` (param the dsr-278 page sends) | 200 | no | dmProductList 5, dmProductRelatedList 4 |
| `dm-product-list` (extra, not in job) | 200 | no | dmProductList 42 |

- Removed fields (isStandardItem, sustainabilityText, materials, appearances, sewingSuitabilities, plasticHardwareFunctionCategories, productionCountries, internalCertifications, topBottomStopVariation): **absent** from every response body.
- New fields (itemVariationsImage, colorVariationsImage, Howtouse, HowtouseImage, recycledMaterial, recycledMaterialNote, parentProduct, applicableSliderStandard, applicableSliderSpecial): present in `dsr-product-page` (ja/en 46) and `product-detail`; absent from the list queries (as per the incident report: only the 2 detail queries got them).
- Values: 46 ja → all new fields null/empty. productId-01x (cf-products1) → `parentProduct` = [parentProduct-2 …], `applicableSliderSpecial` = [applicableSliderSpecial-2 …], others null/empty.

## 2. Pages (main--dsr-eds-dev--sutrix-projects)

| Page | .aem.page | .aem.live | Cards / block | Console errors | Failed requests |
|---|---|---|---|---|---|
| /master/ja/test-space/product-list | 200 | 200 | `listing` block, 3 cards | 1 (placeholders.json 404) | placeholders.json 404 |
| /master/en/test-space/product-list | **404** | **404** | – | 1 (page 404) | page 404 |
| /ja/products/46 | 200 | **404** | `product-detail` (QUICKFIT®, Z15-1) | 2 (404s) | placeholders.json, /ja/products (404) |
| /en/products/46 | 200 | **404** | `product-detail` (QUICKFIT®, Z15-1) | 2 (404s) | placeholders.json, /en/products (404) |
| /master/en/test-space/dsr-278-product-detail | 200 | 200 (curl; Playwright networkidle timed out at 45 s, page rendered) | `product-detail` (ADVANCEN® for ISOFIX) | 3 (1×404, 2×403) | placeholders.json 404; scene7 `indexed-color-800x600`, `gradient-transparent-1920x1080` 403; scene7 `sample-4` aborted; publish `gradient-transparent-1920x1080.webp` ERR_BLOCKED_BY_ORB |
| /ja/product-list (extra: product-list block page) | 200 | 200 | `product-list` block, 3 cards | 1 (placeholders.json 404) | placeholders.json 404 |
| /en/product-list (extra) | 200 | 200 | `product-list` block, 3 cards | 1 (placeholders.json 404) | placeholders.json 404 |

- Browser GraphQL calls: test-space product-list and /{lang}/product-list → `dsr-product-list;folder=/content/dam/dsr/{lang}/products/;cb=…` 200, no errors, 3 items. dsr-278 → `product-detail;productId=productId-01x?t=…` 200, no errors. /{lang}/products/46 → 0 GraphQL calls (overlay, static rows).
- /{ja,en}/products/46 = 404 on .aem.live was already recorded pre-CR (JOB-20261019-05, ~01:12Z): not live-published, not a CR effect.

## 3. Removed UI / new fields

| Item | Where checked | Observed |
|---|---|---|
| Tag groups (素材/外観/縫製/生産国/認証 …) | /{ja,en}/product-list sidebar | Headings only: キーワード検索, 製品カテゴリー, 用途, 性能, ファスナー チェーンタイプ (en: Keyword search, Product Category, Applications, Performance, Zipper Chain Type). **Gone.** |
| Plastic-parts filter | same | No "プラスチックパーツ"/"Plastic Parts" text in the block. **Gone.** (`FAMILIES.plastic` still in product-list.js, but no option rendered: no plastic product in data → cannot prove removal vs. no data.) |
| Standard color card badge | product-list.js + cards | `COLOR_CARDS` has only `global`; 0 color-card images on 3 cards. **Gone** (code). |
| 生産国 tooltip row | hover first card | ja: 1 row `ファスナー製品仕様：止`; en: 1 row `Opening type：止`. No 生産国 row. **Gone.** (ja label for openingType reads "ファスナー製品仕様" – recorded only.) |
| topBottomStopVariation | /{ja,en}/products/46, dsr-278; product-detail.js, cf-templates/product.html | No "上下止"/"stop variation"/field name in HTML or JS. **Gone.** |
| New-field text rendered | same pages | **None.** dsr-278 data has parentProduct-2 / applicableSliderSpecial-2, but neither name appears in the HTML. "Recycled tape compatibility / recycledTapeNote" on dsr-278 = existing field `recycledTape`, not the new `recycledMaterial`. product-detail.js comment: "parentProduct / applicableSlider* (DSR-585) are parsed but not rendered". |

## 5. Deploy evidence (Last-Modified, identical on .aem.page and .aem.live)

| File | Last-Modified (GMT) | JST |
|---|---|---|
| blocks/product-list/product-list.js | Tue, 20 Oct 2026 04:50:11 | 13:50:11 (= dsr-eds#189 merge time) |
| blocks/product-list/product-list.css | Thu, 08 Oct 2026 03:23:23 | – |
| blocks/product-detail/product-detail.js | Tue, 20 Oct 2026 05:42:57 | 14:42:57 (later than #189) |
| blocks/product-detail/product-detail.css | Tue, 20 Oct 2026 04:50:11 | 13:50:11 |
| cf-templates/product.html | Tue, 20 Oct 2026 05:43:36 | 14:43:36 |
| blocks/listing/listing.js | Thu, 08 Oct 2026 03:23:23 | – |
| blocks/listing/adapters/cf.js | Tue, 20 Oct 2026 05:42:57 | 14:42:57 (has a DSR-585 comment) |
| blocks/listing/types.js | Tue, 20 Oct 2026 04:50:11 | 13:50:11 |
| scripts/dsr-products.js, scripts/overlay-rows.js | Mon, 19 Oct 2026 23:35:11 | 08:35:11 |

Deployed JS: no removed field name in product-list.js, product-detail.js, listing.js, overlay-rows.js; product-detail.js references the new fields; cf-templates/product.html references the new fields (no topBottomStopVariation).
