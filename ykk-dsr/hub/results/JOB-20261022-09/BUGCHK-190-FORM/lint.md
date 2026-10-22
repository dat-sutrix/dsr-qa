# lint ykk-dsr/hub/author/manifests/BUGCHK-190-FORM.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #1 content-cf | ja | PASS | allowed qa* path | /content/dam/common/ja/catalogs/qa190-cat-pdf-form |
| L0 | node-name | #1 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf-form |
| L0 | model-exists | #1 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #1 content-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-pdf-form | patch |
| L0 | live-model | #1 content-cf | ja | PASS | DM_catalog | DM_catalog |
| L0 | field-name:requiresForm | #1 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #1 content-cf | ja | PASS | boolean | true |
| L0 | id=node-name:catalogId | #1 content-cf | ja | PASS | qa190-cat-pdf-form | qa190-cat-pdf-form |
| L0 | required-fields (patch) | #1 content-cf | ja | PASS | all required present | ok |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/catalogs/qa190-cat-pdf-form |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf-form |
| L0 | model-exists | #1 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #1 content-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-pdf-form | patch |
| L0 | live-model | #1 content-cf | en | PASS | DM_catalog | DM_catalog |
| L0 | field-name:requiresForm | #1 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #1 content-cf | en | PASS | boolean | true |
| L0 | id=node-name:catalogId | #1 content-cf | en | PASS | qa190-cat-pdf-form | qa190-cat-pdf-form |
| L0 | required-fields (patch) | #1 content-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #2 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #2 content-cf | ja | PASS | allowed qa* path | /content/dam/common/ja/catalogs/qa190-cat-ebook-form |
| L0 | node-name | #2 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook-form |
| L0 | model-exists | #2 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #2 content-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-ebook-form | patch |
| L0 | live-model | #2 content-cf | ja | PASS | DM_catalog | DM_catalog |
| L0 | field-name:requiresForm | #2 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #2 content-cf | ja | PASS | boolean | true |
| L0 | id=node-name:catalogId | #2 content-cf | ja | PASS | qa190-cat-ebook-form | qa190-cat-ebook-form |
| L0 | required-fields (patch) | #2 content-cf | ja | PASS | all required present | ok |
| L0 | path-guard | #2 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/catalogs/qa190-cat-ebook-form |
| L0 | node-name | #2 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook-form |
| L0 | model-exists | #2 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #2 content-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-ebook-form | patch |
| L0 | live-model | #2 content-cf | en | PASS | DM_catalog | DM_catalog |
| L0 | field-name:requiresForm | #2 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #2 content-cf | en | PASS | boolean | true |
| L0 | id=node-name:catalogId | #2 content-cf | en | PASS | qa190-cat-ebook-form | qa190-cat-ebook-form |
| L0 | required-fields (patch) | #2 content-cf | en | PASS | all required present | ok |

PASS 38 · FAIL 0 · WARN 0
