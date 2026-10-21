# verify ykk-dsr/hub/author/manifests/TD-586-01-02.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | ja | PASS | /content/dam/common/ja/products/990586001 | exists |
| L1 | model | #1 content-cf | ja | PASS | DM_product | DM_product |
| L1 | field:productId | #1 content-cf | ja | PASS | 990586001 | 990586001 |
| L1 | field:productCode | #1 content-cf | ja | PASS | QA586-A | QA586-A |
| L1 | field:productName | #1 content-cf | ja | PASS | QA586 product A | QA586 product A |
| L1 | field:publishDate | #1 content-cf | ja | PASS | 2026-10-01 | 2026-10-01 |
| L1 | field:description | #1 content-cf | ja | PASS | QA586 description for SEO check | QA586 description for SEO check |
| L2 | replicated:preview | #1 content-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #1 content-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:57:00 GMT+0000 |
| L1 | exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/products/990586001 | exists |
| L1 | model | #2 dsr-cf | ja | PASS | DM_product_related | DM_product_related |
| L1 | field:isActive | #2 dsr-cf | ja | PASS | true | true |
| L1 | field:product | #2 dsr-cf | ja | PASS | /content/dam/common/ja/products/990586001 | /content/dam/common/ja/products/990586001 |
| L2 | replicated:preview | #2 dsr-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #2 dsr-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 14:54:26 GMT+0000 |
| L1 | exists | #3 content-cf | ja | PASS | /content/dam/common/ja/products/990586002 | exists |
| L1 | model | #3 content-cf | ja | PASS | DM_product | DM_product |
| L1 | field:productId | #3 content-cf | ja | PASS | 990586002 | 990586002 |
| L1 | field:productCode | #3 content-cf | ja | PASS | QA586-B | QA586-B |
| L1 | field:productName | #3 content-cf | ja | PASS | QA586 product B | QA586 product B |
| L1 | field:publishDate | #3 content-cf | ja | PASS | 2026-10-01 | 2026-10-01 |
| L2 | replicated:preview | #3 content-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L1 | exists | #4 dsr-cf | ja | PASS | /content/dam/dsr/ja/products/990586002 | exists |
| L1 | model | #4 dsr-cf | ja | PASS | DM_product_related | DM_product_related |
| L1 | field:isActive | #4 dsr-cf | ja | PASS | true | true |
| L1 | field:product | #4 dsr-cf | ja | PASS | /content/dam/common/ja/products/990586002 | /content/dam/common/ja/products/990586002 |
| L2 | replicated:preview | #4 dsr-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /ja/products/990586001 | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /ja/products/990586001 | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | FAIL | 200 + <title> on /ja/products/990586002 | 404; title="Page not found" |
| L3 | delivery:.aem.live | url live | - | FAIL | 200 + <title> on /ja/products/990586002 | 404; title="Page not found" |

PASS 25 · FAIL 6 · WARN 0
