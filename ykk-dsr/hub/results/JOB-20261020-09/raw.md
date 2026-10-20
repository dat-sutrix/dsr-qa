# JOB-20261020-09 – raw values (DEV, read-only, 2026-10-20 09:31–09:51Z)

## 1. dm_product field sets (step 4; field names only)

Queried at 09:31:38Z with curl, `https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/…` (unencoded `;` params, same as JOB-07). Every response was HTTP 200 with no `errors` key.

| Query + params | Items | Field names |
|---|---|---|
| `dsr-product-page;path=/content/dam/dsr/ja/products/46` | related 1, inactive 0 | item: _metadata, _path, dsrFeatures, isActive, isBoothLimited, product, productLabel, relatedArticles, relatedContents, relatedLandingPages · `product`: _path, applicableSliderSameAsParent, applications, colorVariations, colorVariationsImage, colorVariationsPdf, description, descriptionImage, howToUse, howToUseImage, is3dSimulatorSupported, isDiscontinued, itemVariations, itemVariationsImage, media01Asset, media02Asset, media02Type, media02Url, media03Asset, media03Type, media03Url, media04Asset, media04Type, media04Url, media05Asset, media05Type, media05Url, media06Asset, media06Type, media06Url, media07Asset, media07Type, media07Url, media08Asset, media08Type, media08Url, media09Asset, media09Type, media09Url, media10Asset, media10Type, media10Url, media11Asset, media11Type, media11Url, media12Asset, media12Type, media12Url, media13Asset, media13Type, media13Url, media14Asset, media14Type, media14Url, media15Asset, media15Type, media15Url, notice, noticeImage, parentProduct, performances, printableTape, printableTapeNote, productCategories, productCode, productId, productName, publishDate, recycledMaterial, recycledMaterialNote, recycledTape, recycledTapeNote, relatedCatalogs, relatedProducts, relatedVideos, updateDate |
| `dsr-product-page;path=/content/dam/dsr/en/products/46` | related 1, inactive 0 | `product`: identical to ja |
| `product-detail;productId=productId-01x` | dmProductList 5, dmProductRelatedList 4 | dmProductList: Howtouse, HowtouseImage, Notice, NoticeImage, _path, applicableSliderSpecial, applicableSliderStandard, applications, colorVariations, colorVariationsImage, colorVariationsPdf, description, descriptionImage, elementSize, is3dSimulatorSupported, isDiscontinued, isDtmSupported, itemVariations, itemVariationsImage, media01Asset, media02Asset, media02Type, media02Url, media03Asset, media03Type, media03Url, media04Asset, media04Type, media04Url, media05Asset, media05Type, media05Url, media06Asset, media06Type, media06Url, media07Asset, media07Type, media07Url, media08Asset, media08Type, media08Url, media09Asset, media09Type, media09Url, media10Asset, media10Type, media10Url, media11Asset, media11Type, media11Url, media12Asset, media12Type, media12Url, media13Asset, media13Type, media13Url, media14Asset, media14Type, media14Url, media15Asset, media15Type, media15Url, openingType, parentProduct, performances, photoForList, printableTape, printableTapeNote, productCategories, productCode, productId, productName, publishDate, recycledMaterial, recycledMaterialNote, recycledTape, recycledTapeNote, relatedCatalogs, relatedProducts, relatedVideos, searchKeywords, sortOrder, updateDate, zipperChainTypeCategories · dmProductRelatedList: _metadata, relatedContents |
| `dsr-product-list;folder=/content/dam/dsr/ja/products/` (reference) | related 3 | `product`: _extendedInfo, _path, applications, elementSize, isDiscontinued, isDtmSupported, media01Asset, media02Asset, openingType, openingTypeNote, performances, photoForList, productCategories, productCode, productId, productName, publishDate, searchKeywords, sortOrder, updateDate, zipperChainTypeCategories |

Differences from JOB-20261020-07 (06:45–06:58Z, which listed the new fields as `itemVariationsImage, colorVariationsImage, Howtouse, HowtouseImage, recycledMaterial, recycledMaterialNote, parentProduct, applicableSliderStandard, applicableSliderSpecial` for **both** detail queries):
- `dsr-product-page` now returns `howToUse`, `howToUseImage` (camelCase), `notice`, `noticeImage` and `applicableSliderSameAsParent`. It has **no** `applicableSliderStandard` / `applicableSliderSpecial` / `Howtouse`. I read this as the ver0.4 state of the query.
- `product-detail` still returns the JOB-07 names (`Howtouse`, `HowtouseImage`, `Notice`, `NoticeImage`, `applicableSliderStandard`, `applicableSliderSpecial`). The two detail queries now use different names for the same concept. JOB-07 did not list `Notice*`, so it is unknown whether those are new.
- The 9 fields removed by the CR (isStandardItem … topBottomStopVariation) are absent from all 4 responses (grep count 0).
- JOB-07 did not record the full field list, so this diff covers only the fields JOB-07 named.

## 2. Pages / deploy (09:50Z, curl)

| URL | Status |
|---|---|
| .aem.page /ja/products/46 | 200, contains "QUICKFIT" and "Z15-1" (overlay renders) |
| .aem.live /ja/products/46 | 404 (same as JOB-07, not live-published) |
| .aem.live /master/en/test-space/dsr-278-product-detail | 200 |
| .aem.page / .aem.live /{ja,en}/library/video/search | 200 / **404** (DSR-VOV-011) |
| /ja/library/catalog/qa190-cat-pdf-form | .page 404 / .live 404 |
| /en/library/catalog/qa190-cat-pdf-form | .page 200 / .live 404 |
| /ja/library/catalog/qa190-cat-ebook-form | .page 404 / .live 404 |
| /en/library/catalog/qa190-cat-ebook-form | .page 200 / .live 404 |

Last-Modified (.aem.live): blocks/product-detail/product-detail.js and cf-templates/product.html **2026-10-20T08:33:41Z** (17:33 JST, after ver0.4 started; JOB-07 saw 05:42:57Z / 05:43:36Z). scripts/catalog-link.js and blocks/catalog-detail/catalog-detail.js 05:55:17Z.
