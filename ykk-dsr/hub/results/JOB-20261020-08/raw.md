# JOB-20261020-08 – raw values (DEV, read-only, 2026-10-21 08:59–09:10Z)

Tools: curl (queries, JS headers) and a Playwright script outside the repo (pages, chromium 1440×900, networkidle + 2.5 s). Page screenshots/HTML from checks 2/3 stay local (`/tmp/j08/shots/`, not committed: hub rule = failed-test screenshots only). Baseline = `results/JOB-20261020-07/raw.md` (20/10 06:45–06:58Z, after DSR-585 CR fix, before ver0.4).

## 1. Publish persisted queries (`https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/…`, unencoded `;`, 08:59:15–08:59:18Z)

| Query + params | HTTP | `errors` | Items | Cache headers | vs JOB-07 |
|---|---|---|---|---|---|
| `dsr-product-list` (no param) | 200 | **yes**: `Variable 'folder' has coerced Null value for NonNull type 'ID!'` (ValidationError) | – | s-maxage=300, x-cache MISS | same (param required by design) |
| `dsr-product-list;folder=/content/dam/dsr/ja/products/` | 200 | no | related 3 | s-maxage=300, MISS | same |
| `dsr-product-list;folder=/content/dam/dsr/en/products/` | 200 | no | related 3 | s-maxage=300, MISS | same |
| `dsr-product-page;path=/content/dam/dsr/ja/products/46` | 200 | no | related 1, inactive 0 | s-maxage=0, MISS | same counts; field names changed (below) |
| `dsr-product-page;path=/content/dam/dsr/en/products/46` | 200 | no | related 1, inactive 0 | s-maxage=0, MISS | same counts; field names changed |
| `product-detail;productId=productId-01x` (param the dsr-278 page sends) | 200 | no | dmProductList 5, dmProductRelatedList 4 | s-maxage=7200, **age 26165 s, x-cache HIT** (cached since ≈01:43Z) | same counts; field names changed |
| same + `?t=<now>` (cache-busted, as the page sends) | 200 | no | 5 / 4 | age 0, MISS | identical field set to the cached copy |
| `dm-product-list` (19.0 query) | 200 | no | dmProductList 42 | s-maxage=7200, age 26164 s, HIT; `?t=` MISS identical | same |

### Field names (TC 19.0; oracle = fixtures/dsr-585.ts: 27 removed names, 6 old spellings)

| Query | Removed (27) | Old spellings (6) | ver0.4 detail fields present |
|---|---|---|---|
| dsr-product-page 46 ja | 0 | 0 | itemVariationsImage, colorVariationsImage, howToUse, howToUseImage, recycledMaterial, recycledMaterialNote, applicableSliderSameAsParent, parentProduct, notice, noticeImage |
| dsr-product-page 46 en | 0 | 0 | same 10 |
| product-detail productId-01x (cached and cache-busted) | 0 | 0 | same 10 |
| dsr-product-list ja/en | 0 | 0 | none (list query, not expected) |
| dm-product-list | 0 | 0 | none (list query, not expected) |

- Old names (`Howtouse`, `HowtouseImage`, `Notice`, `NoticeImage`, `applicableSliderStandard`, `applicableSliderSpecial`) are **not** returned anywhere, so there were no old-name/cache headers to record. JOB-20261020-09 (20/10 09:31Z) still saw them in product-detail; the DSR-585 run of 21/10 01:45Z already saw them gone.
- Values: 46 ja/en → all new fields null/empty (`howToUse`/`notice` = `{plaintext:null, html:null}`). productId-01x → `parentProduct` = [parentProduct-2 …] on 4 of 5 items; `applicableSliderSameAsParent` empty. JOB-07 saw `applicableSliderSpecial` = [applicableSliderSpecial-2 …]; that field no longer exists in ver0.4 (expected by the model change).

## 2. Pages (main--dsr-eds-dev--sutrix-projects, 09:00–09:02Z)

| Page | .aem.page | .aem.live | Block / cards | Console errors | Failed requests | vs JOB-07 |
|---|---|---|---|---|---|---|
| /master/ja/test-space/product-list | 200 | 200 | `listing`, 3 cards | 1 (placeholders.json 404) | placeholders.json 404 (.page also 3 `media_*.svg` ERR_ABORTED) | same (svg aborts .page only, not errors) |
| /master/en/test-space/product-list | **404** | **404** | – | 1 | page 404 | same |
| /ja/products/46 | 200 | **404** | `product-detail` (QUICKFIT®, Z15-1) | 2 (.page) / 1 (.live) | placeholders.json, /ja/products 404 | same |
| /en/products/46 | 200 | **404** | `product-detail` (QUICKFIT®) | 2 / 1 | placeholders.json, /en/products 404 | same |
| /master/en/test-space/dsr-278-product-detail | 200 | 200 (networkidle timed out at 45 s on .live, page rendered) | `product-detail` (ADVANCEN® for ISOFIX) | 3 (1×404, 2×403) | placeholders.json 404; scene7 indexed-color-800x600 + gradient-transparent-1920x1080 403; scene7 sample-4 aborted; publish gradient-transparent-1920x1080.webp ERR_BLOCKED_BY_ORB | same |
| /ja/product-list (extra) | 200 | 200 | `product-list`, 3 cards | 1 | placeholders.json 404 | same |
| /en/product-list (extra) | 200 | 200 | `product-list`, 3 cards | 1 | placeholders.json 404 | same |

- Browser GraphQL calls: product-list pages → `dsr-product-list;folder=…;cb=…` 200, no errors, 3 items. dsr-278 → `product-detail;productId=productId-01x?t=…` 200, no errors, 5/4 items (MISS). /{lang}/products/46 → 0 GraphQL calls.

## 3. Removed UI / new fields

| Item | Observed (both hosts where 200) | vs JOB-07 |
|---|---|---|
| Tag groups | Sidebar headings only: キーワード検索, 製品カテゴリー, 用途, 性能, ファスナー チェーンタイプ (en: Keyword search, Product Category, Applications, Performance, Zipper Chain Type). **Gone.** | same |
| Plastic-parts filter | No "プラスチックパーツ"/"Plastic Parts" text. **Not shown**; `FAMILIES.plastic` still in product-list.js as a category family, and there is no plastic product in data → removal still unproven. | same |
| Standard color card badge | product-list.js `COLOR_CARDS` has only `global` (Global Color Card); 0 color-card images on the 3 cards. **Gone** (code). | same |
| 生産国 tooltip row | Hover first card: ja `ファスナー製品仕様：止`, en `Opening type：止`. No 生産国 row. **Gone.** | same |
| topBottomStopVariation | No "上下止"/field name on /{ja,en}/products/46, dsr-278; 0 hits in product-detail.js, cf-templates/product.html. **Gone.** | same |
| Text hits "素材", "縫製" on .page /ja/products/46 | Inside the product description ("磁性素材", "縫製ライン"), not a field row. Same counts (4/4) in the JOB-07 HTML. | same, not a removed field |
| New-field text rendered | **None** (no howToUse/notice/parentProduct/applicableSlider/recycledMaterial labels or values; "parentProduct-2" not in dsr-278 HTML). | same |

## 5. Deploy evidence (Last-Modified, identical on .aem.page and .aem.live, 09:01Z)

| File | Last-Modified (GMT) | JOB-07 value | Note |
|---|---|---|---|
| blocks/product-list/product-list.js | Tue, 20 Oct 2026 08:33:41 | 04:50:11 | redeployed 17:33 JST (ver0.4 window); 0 removed/old names |
| blocks/product-list/product-list.css | Tue, 20 Oct 2026 08:33:41 | 08 Oct 03:23:23 | redeployed |
| blocks/product-detail/product-detail.js | Tue, 20 Oct 2026 08:33:41 | 05:42:57 | uses howToUse, howToUseImage, notice, noticeImage, parentProduct, applicableSliderSameAsParent; 0 old names; comment: parentProduct / applicableSliderSameAsParent parsed, not rendered |
| blocks/product-detail/product-detail.css | Tue, 20 Oct 2026 04:50:11 | 04:50:11 | unchanged |
| cf-templates/product.html | Tue, 20 Oct 2026 11:36:16 | 05:43:36 | redeployed 20:36 JST; ver0.4 names only (applicableSliderSameAsParent, howToUse, noticeImage, parentProduct, recycledMaterial) |
| blocks/listing/listing.js | **Wed, 21 Oct 2026 08:54:13** | 08 Oct 03:23:23 | deployed 5 min before this run; diff = tag filter for 環境配慮型製品一覧 (eco), not product fields |
| blocks/listing/adapters/cf.js | **Wed, 21 Oct 2026 08:54:13** | 20 Oct 05:42:57 | same deploy; only DSR-585 comments, no removed names |
| blocks/listing/types.js | Tue, 20 Oct 2026 04:50:11 | 04:50:11 | unchanged |
| scripts/dsr-products.js, scripts/overlay-rows.js | Mon, 19 Oct 2026 23:35:11 | 23:35:11 | unchanged |
