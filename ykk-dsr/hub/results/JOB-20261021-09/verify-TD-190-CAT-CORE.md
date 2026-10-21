# verify ykk-dsr/hub/author/manifests/TD-190-CAT-CORE.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-pdf | exists |
| L1 | model | #1 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #1 dsr-cf | en | PASS | true | true |
| L1 | field:catalog | #1 dsr-cf | en | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf | /content/dam/common/en/catalogs/qa190-cat-pdf |
| L2 | replicated:preview | #1 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #1 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:30:42 GMT+0000 |
| L1 | exists | #1 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-pdf | exists |
| L1 | model | #1 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #1 dsr-cf | ja | PASS | true | true |
| L1 | field:catalog | #1 dsr-cf | ja | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf | /content/dam/common/ja/catalogs/qa190-cat-pdf |
| L2 | replicated:preview | #1 dsr-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #1 dsr-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:36:44 GMT+0000 |
| L1 | exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-pdf-form | exists |
| L1 | model | #2 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #2 dsr-cf | en | PASS | true | true |
| L1 | field:catalog | #2 dsr-cf | en | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form | /content/dam/common/en/catalogs/qa190-cat-pdf-form |
| L2 | replicated:preview | #2 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #2 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:20:05 GMT+0000 |
| L1 | exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-pdf-form | exists |
| L1 | model | #2 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #2 dsr-cf | ja | PASS | true | true |
| L1 | field:catalog | #2 dsr-cf | ja | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form | /content/dam/common/ja/catalogs/qa190-cat-pdf-form |
| L2 | replicated:preview | #2 dsr-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #2 dsr-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:17:35 GMT+0000 |
| L1 | exists | #3 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-ebook | exists |
| L1 | model | #3 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #3 dsr-cf | en | PASS | true | true |
| L1 | field:catalog | #3 dsr-cf | en | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook | /content/dam/common/en/catalogs/qa190-cat-ebook |
| L2 | replicated:preview | #3 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #3 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:14:49 GMT+0000 |
| L1 | exists | #3 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-ebook | exists |
| L1 | model | #3 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #3 dsr-cf | ja | PASS | true | true |
| L1 | field:catalog | #3 dsr-cf | ja | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook | /content/dam/common/ja/catalogs/qa190-cat-ebook |
| L2 | replicated:preview | #3 dsr-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #3 dsr-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:15:45 GMT+0000 |
| L1 | exists | #4 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-ebook-form | exists |
| L1 | model | #4 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #4 dsr-cf | en | PASS | true | true |
| L1 | field:catalog | #4 dsr-cf | en | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook-form | /content/dam/common/en/catalogs/qa190-cat-ebook-form |
| L2 | replicated:preview | #4 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #4 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:20:39 GMT+0000 |
| L1 | exists | #4 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-ebook-form | exists |
| L1 | model | #4 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L1 | field:isActive | #4 dsr-cf | ja | PASS | true | true |
| L1 | field:catalog | #4 dsr-cf | ja | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook-form | /content/dam/common/ja/catalogs/qa190-cat-ebook-form |
| L2 | replicated:preview | #4 dsr-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #4 dsr-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:18:09 GMT+0000 |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-pdf | 200; title="catalog pdf \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-pdf | 200; title="catalog pdf \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-pdf | 200; title="qa190-cat-pdf \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-pdf | 200; title="qa190-cat-pdf \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-pdf-form | 200; title="catalog pdf form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-pdf-form | 200; title="catalog pdf form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-pdf-form | 200; title="catalog pdf form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-pdf-form | 200; title="catalog pdf form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-ebook | 200; title="catalog ebook \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-ebook | 200; title="catalog ebook \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-ebook | 200; title="catalog ebook \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-ebook | 200; title="catalog ebook \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-ebook-form | 200; title="catalog ebook form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-ebook-form | 200; title="catalog ebook form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-ebook-form | 200; title="catalog ebook form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-ebook-form | 200; title="catalog ebook form \| YKK DIGITAL SHOWROOM" |

PASS 48 · FAIL 16 · WARN 0
