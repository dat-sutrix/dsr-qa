# lint ykk-dsr/hub/author/manifests/TD-190-CAT-CORE.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 dsr-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #1 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa190-cat-pdf |
| L0 | node-name | #1 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf |
| L0 | model-exists | #1 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #1 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-pdf | patch |
| L0 | live-model | #1 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | field-name:isActive | #1 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #1 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #1 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #1 dsr-cf | en | PASS | content-fragment | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf |
| L0 | flag-set:isActive | #1 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #1 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #1 dsr-cf | en | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf | missing |
| L0 | path-guard | #1 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa190-cat-pdf |
| L0 | node-name | #1 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf |
| L0 | model-exists | #1 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #1 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-pdf | patch |
| L0 | live-model | #1 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | field-name:isActive | #1 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #1 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #1 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #1 dsr-cf | ja | PASS | content-fragment | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf |
| L0 | flag-set:isActive | #1 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #1 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #1 dsr-cf | ja | FAIL | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf | missing |
| L0 | lang-pair | #2 dsr-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #2 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa190-cat-pdf-form |
| L0 | node-name | #2 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf-form |
| L0 | model-exists | #2 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-pdf-form | patch |
| L0 | live-model | #2 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | field-name:isActive | #2 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #2 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #2 dsr-cf | en | PASS | content-fragment | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form |
| L0 | flag-set:isActive | #2 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #2 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #2 dsr-cf | en | PASS | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form | exists |
| L0 | path-guard | #2 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa190-cat-pdf-form |
| L0 | node-name | #2 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf-form |
| L0 | model-exists | #2 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-pdf-form | patch |
| L0 | live-model | #2 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | field-name:isActive | #2 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #2 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #2 dsr-cf | ja | PASS | content-fragment | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form |
| L0 | flag-set:isActive | #2 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #2 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #2 dsr-cf | ja | PASS | /content/dam/ykk/common/product-cf/test/qa190-cat-pdf-form | exists |
| L0 | lang-pair | #3 dsr-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #3 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa190-cat-ebook |
| L0 | node-name | #3 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook |
| L0 | model-exists | #3 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #3 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-ebook | patch |
| L0 | live-model | #3 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | field-name:isActive | #3 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #3 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #3 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #3 dsr-cf | en | PASS | content-fragment | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook |
| L0 | flag-set:isActive | #3 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #3 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #3 dsr-cf | en | PASS | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook | exists |
| L0 | path-guard | #3 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa190-cat-ebook |
| L0 | node-name | #3 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook |
| L0 | model-exists | #3 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #3 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-ebook | patch |
| L0 | live-model | #3 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | field-name:isActive | #3 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #3 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #3 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #3 dsr-cf | ja | PASS | content-fragment | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook |
| L0 | flag-set:isActive | #3 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #3 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #3 dsr-cf | ja | PASS | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook | exists |
| L0 | lang-pair | #4 dsr-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #4 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa190-cat-ebook-form |
| L0 | node-name | #4 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook-form |
| L0 | model-exists | #4 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #4 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-ebook-form | patch |
| L0 | live-model | #4 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | field-name:isActive | #4 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #4 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #4 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #4 dsr-cf | en | PASS | content-fragment | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook-form |
| L0 | flag-set:isActive | #4 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #4 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #4 dsr-cf | en | PASS | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook-form | exists |
| L0 | path-guard | #4 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa190-cat-ebook-form |
| L0 | node-name | #4 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook-form |
| L0 | model-exists | #4 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #4 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-ebook-form | patch |
| L0 | live-model | #4 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | field-name:isActive | #4 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #4 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #4 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #4 dsr-cf | ja | PASS | content-fragment | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook-form |
| L0 | flag-set:isActive | #4 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #4 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #4 dsr-cf | ja | PASS | /content/dam/ykk/common/product-cf/test/qa190-cat-ebook-form | exists |

PASS 98 · FAIL 2 · WARN 0
