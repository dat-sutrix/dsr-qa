# verify ykk-dsr/hub/author/manifests/BUGCHK-190-FORM.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-pdf-form | exists |
| L1 | model | #1 content-cf | ja | PASS | DM_catalog | DM_catalog |
| L1 | field:requiresForm | #1 content-cf | ja | PASS | true | true |
| L2 | replicated:preview | #1 content-cf | ja | PASS | Activate ≥ 2026-10-22T04:55:51Z (timestamp present) | Activate @ Thu Oct 22 2026 04:56:16 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | ja | PASS | Activate ≥ 2026-10-22T04:55:51Z (timestamp present) | Activate @ Thu Oct 22 2026 04:56:17 GMT+0000 |
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-pdf-form | exists |
| L1 | model | #1 content-cf | en | PASS | DM_catalog | DM_catalog |
| L1 | field:requiresForm | #1 content-cf | en | PASS | true | true |
| L2 | replicated:preview | #1 content-cf | en | PASS | Activate ≥ 2026-10-22T04:55:51Z (timestamp present) | Activate @ Thu Oct 22 2026 04:56:16 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | en | PASS | Activate ≥ 2026-10-22T04:55:51Z (timestamp present) | Activate @ Thu Oct 22 2026 04:56:17 GMT+0000 |
| L1 | exists | #2 content-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-ebook-form | exists |
| L1 | model | #2 content-cf | ja | PASS | DM_catalog | DM_catalog |
| L1 | field:requiresForm | #2 content-cf | ja | PASS | true | true |
| L2 | replicated:preview | #2 content-cf | ja | PASS | Activate ≥ 2026-10-22T04:55:51Z (timestamp present) | Activate @ Thu Oct 22 2026 04:56:16 GMT+0000 |
| L2 | replicated:publish | #2 content-cf | ja | PASS | Activate ≥ 2026-10-22T04:55:51Z (timestamp present) | Activate @ Thu Oct 22 2026 04:56:17 GMT+0000 |
| L1 | exists | #2 content-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-ebook-form | exists |
| L1 | model | #2 content-cf | en | PASS | DM_catalog | DM_catalog |
| L1 | field:requiresForm | #2 content-cf | en | PASS | true | true |
| L2 | replicated:preview | #2 content-cf | en | PASS | Activate ≥ 2026-10-22T04:55:51Z (timestamp present) | Activate @ Thu Oct 22 2026 04:56:16 GMT+0000 |
| L2 | replicated:publish | #2 content-cf | en | PASS | Activate ≥ 2026-10-22T04:55:51Z (timestamp present) | Activate @ Thu Oct 22 2026 04:56:17 GMT+0000 |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-pdf-form | 200; title="catalog pdf form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-pdf-form | 200; title="catalog pdf form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-pdf-form | 200; title="catalog pdf form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-pdf-form | 200; title="catalog pdf form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-ebook-form | 200; title="catalog ebook form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/catalog/qa190-cat-ebook-form | 200; title="catalog ebook form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-ebook-form | 200; title="catalog ebook form \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/catalog/qa190-cat-ebook-form | 200; title="catalog ebook form \| YKK DIGITAL SHOWROOM" |

PASS 28 · FAIL 0 · WARN 0
