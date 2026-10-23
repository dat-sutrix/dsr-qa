# lint ykk-dsr/hub/author/manifests/BUGCHK-586-02.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: TD-586-02 ja only (TestData en/cn column = —)) |
| L0 | path-guard | #1 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/products/990586002 |
| L0 | node-name | #1 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | 990586002 |
| L0 | replicate-values | #1 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview |
| L0 | model-current | #1 content-cf | ja | PASS | DM_product | /conf/ykk/settings/dam/cfm/models/dm_product |
| L0 | model-exists | #1 content-cf | ja | PASS | DM_product | /conf/ykk/settings/dam/cfm/models/dm_product |
| L0 | target-exists | #1 content-cf | ja | PASS | /content/dam/common/ja/products/990586002 | patch |
| L0 | live-model | #1 content-cf | ja | PASS | DM_product | DM_product |
| L0 | field-name:productId | #1 content-cf | ja | PASS | field of DM_product | text |
| L0 | field-type:productId | #1 content-cf | ja | PASS | text | 990586002 |
| L0 | field-name:productCode | #1 content-cf | ja | PASS | field of DM_product | text |
| L0 | field-type:productCode | #1 content-cf | ja | PASS | text | QA586-B |
| L0 | field-name:productName | #1 content-cf | ja | PASS | field of DM_product | text |
| L0 | field-type:productName | #1 content-cf | ja | PASS | text | QA586 product B |
| L0 | id=node-name:productId | #1 content-cf | ja | PASS | 990586002 | 990586002 |
| L0 | live-id:productId | #1 content-cf | ja | PASS | 990586002 (manifest will patch) | 990586002 |
| L0 | required-fields (patch) | #1 content-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #2 dsr-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: TD-586-02 ja only (TestData en/cn column = —)) |
| L0 | path-guard | #2 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/products/990586002 |
| L0 | node-name | #2 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | 990586002 |
| L0 | replicate-values | #2 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview |
| L0 | model-current | #2 dsr-cf | ja | PASS | DM_product_related | /conf/ykk/settings/dam/cfm/models/dm_product_related |
| L0 | model-exists | #2 dsr-cf | ja | PASS | DM_product_related | /conf/ykk/settings/dam/cfm/models/dm_product_related |
| L0 | target-exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/products/990586002 | patch |
| L0 | live-model | #2 dsr-cf | ja | PASS | DM_product_related | DM_product_related |
| L0 | field-name:isActive | #2 dsr-cf | ja | PASS | field of DM_product_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:product | #2 dsr-cf | ja | PASS | field of DM_product_related | content-fragment |
| L0 | field-type:product | #2 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/products/990586002 |
| L0 | flag-set:isActive | #2 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #2 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:product | #2 dsr-cf | ja | PASS | /content/dam/common/ja/products/990586002 | in manifest |

PASS 30 · FAIL 0 · WARN 2
