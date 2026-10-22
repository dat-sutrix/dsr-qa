# verify ykk-dsr/hub/author/manifests/TD-654-02-08.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | ja | PASS | /content/dam/common/ja/catalogs/qa654-inactive | exists |
| L1 | model | #1 content-cf | ja | PASS | DM_catalog | DM_catalog |
| L1 | field:catalogId | #1 content-cf | ja | PASS | qa654-inactive | qa654-inactive |
| L1 | field:catalogTitle | #1 content-cf | ja | PASS | QA654 inactive | QA654 inactive |
| L1 | field:description | #1 content-cf | ja | PASS | QA654 description | QA654 description |
| L1 | field:catalogCategories | #1 content-cf | ja | PASS | site:product/material/aluminium | site:product/material/aluminium |
| L1 | field:thumbnail | #1 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:catalogType | #1 content-cf | ja | PASS | pdf | pdf |
| L1 | field:pdfAsset | #1 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L1 | field:requiresForm | #1 content-cf | ja | PASS | false | false |
| L1 | field:publishDate | #1 content-cf | ja | PASS | 2026-10-01 | 2026-10-01 |
| L2 | replicated:preview | #1 content-cf | ja | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:32 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | ja | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:33 GMT+0000 |
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/catalogs/qa654-inactive | exists |
| L1 | model | #1 content-cf | en | PASS | DM_catalog | DM_catalog |
| L1 | field:catalogId | #1 content-cf | en | PASS | qa654-inactive | qa654-inactive |
| L1 | field:catalogTitle | #1 content-cf | en | PASS | QA654 inactive | QA654 inactive |
| L1 | field:description | #1 content-cf | en | PASS | QA654 description | QA654 description |
| L1 | field:catalogCategories | #1 content-cf | en | PASS | site:product/material/aluminium | site:product/material/aluminium |
| L1 | field:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:catalogType | #1 content-cf | en | PASS | pdf | pdf |
| L1 | field:pdfAsset | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L1 | field:requiresForm | #1 content-cf | en | PASS | false | false |
| L1 | field:publishDate | #1 content-cf | en | PASS | 2026-10-01 | 2026-10-01 |
| L2 | replicated:preview | #1 content-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:32 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:33 GMT+0000 |
| L1 | exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa654-inactive | exists |
| L1 | model | #2 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #2 dsr-cf | ja | PASS | false | false |
| L1 | field:catalog | #2 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa654-inactive | /content/dam/common/ja/catalogs/qa654-inactive |
| L2 | replicated:preview | #2 dsr-cf | ja | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:34 GMT+0000 |
| L2 | replicated:publish | #2 dsr-cf | ja | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:35 GMT+0000 |
| L1 | exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-inactive | exists |
| L1 | model | #2 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #2 dsr-cf | en | PASS | false | false |
| L1 | field:catalog | #2 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa654-inactive | /content/dam/common/en/catalogs/qa654-inactive |
| L2 | replicated:preview | #2 dsr-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:34 GMT+0000 |
| L2 | replicated:publish | #2 dsr-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:35 GMT+0000 |
| L1 | exists | #3 content-cf | en | PASS | /content/dam/common/en/catalogs/qa654-preview | exists |
| L1 | model | #3 content-cf | en | PASS | DM_catalog | DM_catalog |
| L1 | field:catalogId | #3 content-cf | en | PASS | qa654-preview | qa654-preview |
| L1 | field:catalogTitle | #3 content-cf | en | PASS | QA654 preview | QA654 preview |
| L1 | field:description | #3 content-cf | en | PASS | QA654 description | QA654 description |
| L1 | field:catalogCategories | #3 content-cf | en | PASS | site:product/material/aluminium | site:product/material/aluminium |
| L1 | field:thumbnail | #3 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:catalogType | #3 content-cf | en | PASS | pdf | pdf |
| L1 | field:pdfAsset | #3 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L1 | field:requiresForm | #3 content-cf | en | PASS | false | false |
| L1 | field:publishDate | #3 content-cf | en | PASS | 2026-10-01 | 2026-10-01 |
| L2 | replicated:preview | #3 content-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:32 GMT+0000 |
| L2 | replicated:publish | #3 content-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:33 GMT+0000 |
| L1 | exists | #4 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-preview | exists |
| L1 | model | #4 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #4 dsr-cf | en | PASS | true | true |
| L1 | field:catalog | #4 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa654-preview | /content/dam/common/en/catalogs/qa654-preview |
| L2 | replicated:preview | #4 dsr-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:34 GMT+0000 |
| L1 | exists | #5 content-cf | en | PASS | /content/dam/common/en/catalogs/qa654-content-only | exists |
| L1 | model | #5 content-cf | en | PASS | DM_catalog | DM_catalog |
| L1 | field:catalogId | #5 content-cf | en | PASS | qa654-content-only | qa654-content-only |
| L1 | field:catalogTitle | #5 content-cf | en | PASS | QA654 content only | QA654 content only |
| L1 | field:description | #5 content-cf | en | PASS | QA654 description | QA654 description |
| L1 | field:catalogCategories | #5 content-cf | en | PASS | site:product/material/aluminium | site:product/material/aluminium |
| L1 | field:thumbnail | #5 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:catalogType | #5 content-cf | en | PASS | pdf | pdf |
| L1 | field:pdfAsset | #5 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L1 | field:requiresForm | #5 content-cf | en | PASS | false | false |
| L1 | field:publishDate | #5 content-cf | en | PASS | 2026-10-01 | 2026-10-01 |
| L2 | replicated:preview | #5 content-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:32 GMT+0000 |
| L2 | replicated:publish | #5 content-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:33 GMT+0000 |
| L1 | exists | #6 content-cf | en | PASS | /content/dam/common/en/catalogs/qa654-update | exists |
| L1 | model | #6 content-cf | en | PASS | DM_catalog | DM_catalog |
| L1 | field:catalogId | #6 content-cf | en | PASS | qa654-update | qa654-update |
| L1 | field:catalogTitle | #6 content-cf | en | PASS | QA654 update | QA654 update |
| L1 | field:description | #6 content-cf | en | PASS | QA654 before | QA654 before |
| L1 | field:catalogCategories | #6 content-cf | en | PASS | site:product/material/aluminium | site:product/material/aluminium |
| L1 | field:thumbnail | #6 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:catalogType | #6 content-cf | en | PASS | pdf | pdf |
| L1 | field:pdfAsset | #6 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L1 | field:requiresForm | #6 content-cf | en | PASS | false | false |
| L1 | field:publishDate | #6 content-cf | en | PASS | 2026-10-01 | 2026-10-01 |
| L2 | replicated:preview | #6 content-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:32 GMT+0000 |
| L2 | replicated:publish | #6 content-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:33 GMT+0000 |
| L1 | exists | #7 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-update | exists |
| L1 | model | #7 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #7 dsr-cf | en | PASS | true | true |
| L1 | field:catalog | #7 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa654-update | /content/dam/common/en/catalogs/qa654-update |
| L2 | replicated:preview | #7 dsr-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:34 GMT+0000 |
| L2 | replicated:publish | #7 dsr-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:35 GMT+0000 |
| L1 | exists | #8 content-cf | en | PASS | /content/dam/common/en/catalogs/qa654-content-unpub | exists |
| L1 | model | #8 content-cf | en | PASS | DM_catalog | DM_catalog |
| L1 | field:catalogId | #8 content-cf | en | PASS | qa654-content-unpub | qa654-content-unpub |
| L1 | field:catalogTitle | #8 content-cf | en | PASS | QA654 content unpublished | QA654 content unpublished |
| L1 | field:description | #8 content-cf | en | PASS | QA654 description | QA654 description |
| L1 | field:catalogCategories | #8 content-cf | en | PASS | site:product/material/aluminium | site:product/material/aluminium |
| L1 | field:thumbnail | #8 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:catalogType | #8 content-cf | en | PASS | pdf | pdf |
| L1 | field:pdfAsset | #8 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L1 | field:requiresForm | #8 content-cf | en | PASS | false | false |
| L1 | field:publishDate | #8 content-cf | en | PASS | 2026-10-01 | 2026-10-01 |
| L1 | exists | #9 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-content-unpub | exists |
| L1 | model | #9 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #9 dsr-cf | en | PASS | true | true |
| L1 | field:catalog | #9 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa654-content-unpub | /content/dam/common/en/catalogs/qa654-content-unpub |
| L2 | replicated:preview | #9 dsr-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:34 GMT+0000 |
| L2 | replicated:publish | #9 dsr-cf | en | PASS | Activate ≥ 2026-10-22T04:56:33Z (timestamp present) | Activate @ Thu Oct 22 2026 04:57:35 GMT+0000 |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/catalog/qa654-inactive | 200; title="QA654 inactive \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/catalog/qa654-inactive | 200; title="QA654 inactive \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /ja/library/catalog/qa654-inactive | 200; title="QA654 inactive \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /ja/library/catalog/qa654-inactive | 200; title="QA654 inactive \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/catalog/qa654-preview | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | FAIL | 200 + <title> on /en/library/catalog/qa654-preview | 404; title="Page not found" |
| L3 | delivery:.aem.page | url page | - | FAIL | 200 + <title> on /en/library/catalog/qa654-content-only | 404; title="Page not found" |
| L3 | delivery:.aem.live | url live | - | FAIL | 200 + <title> on /en/library/catalog/qa654-content-only | 404; title="Page not found" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/catalog/qa654-update | 200; title="QA654 update \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/catalog/qa654-update | 200; title="QA654 update \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/catalog/qa654-content-unpub | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/catalog/qa654-content-unpub | 200; title="YKK DIGITAL SHOWROOM" |

PASS 114 · FAIL 3 · WARN 0
