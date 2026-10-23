# verify ykk-dsr/hub/author/manifests/BUGCHK-586-02.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | ja | PASS | /content/dam/common/ja/products/990586002 | exists |
| L1 | model | #1 content-cf | ja | PASS | DM_product | DM_product |
| L1 | field:productId | #1 content-cf | ja | PASS | 990586002 | 990586002 |
| L1 | field:productCode | #1 content-cf | ja | PASS | QA586-B | QA586-B |
| L1 | field:productName | #1 content-cf | ja | PASS | QA586 product B | QA586 product B |
| L2 | replicated:preview | #1 content-cf | ja | PASS | Activate ≥ 2026-10-23T03:33:44Z (timestamp present) | Activate @ Fri Oct 23 2026 03:33:53 GMT+0000 |
| L1 | exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/products/990586002 | exists |
| L1 | model | #2 dsr-cf | ja | PASS | DM_product_related | DM_product_related |
| L1 | field:isActive | #2 dsr-cf | ja | PASS | true | true |
| L1 | field:product | #2 dsr-cf | ja | PASS | /content/dam/common/ja/products/990586002 | /content/dam/common/ja/products/990586002 |
| L2 | replicated:preview | #2 dsr-cf | ja | PASS | Activate ≥ 2026-10-23T03:33:44Z (timestamp present) | Activate @ Fri Oct 23 2026 03:33:55 GMT+0000 |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /ja/products/990586002 | 200; title="YKK DIGITAL SHOWROOM" |

PASS 12 · FAIL 0 · WARN 0
