# lint ykk-dsr/hub/author/manifests/TD-654-02-08.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #1 content-cf | ja | PASS | allowed qa* path | /content/dam/common/ja/catalogs/qa654-inactive |
| L0 | node-name | #1 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-inactive |
| L0 | model-exists | #1 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #1 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa654-inactive (or rename item) | missing → would create |
| L0 | field-name:catalogId | #1 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #1 content-cf | ja | PASS | text | qa654-inactive |
| L0 | field-name:catalogTitle | #1 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #1 content-cf | ja | PASS | text | QA654 inactive |
| L0 | field-name:description | #1 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #1 content-cf | ja | PASS | long-text | QA654 description |
| L0 | field-name:catalogCategories | #1 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #1 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #1 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #1 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:catalogType | #1 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #1 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #1 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #1 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #1 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #1 content-cf | ja | PASS | boolean | false |
| L0 | field-name:publishDate | #1 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #1 content-cf | ja | PASS | date | 2026-10-01 |
| L0 | id=node-name:catalogId | #1 content-cf | ja | PASS | qa654-inactive | qa654-inactive |
| L0 | required-fields (create) | #1 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #1 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | ref-exists:pdfAsset | #1 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/catalogs/qa654-inactive |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-inactive |
| L0 | model-exists | #1 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #1 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa654-inactive (or rename item) | missing → would create |
| L0 | field-name:catalogId | #1 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #1 content-cf | en | PASS | text | qa654-inactive |
| L0 | field-name:catalogTitle | #1 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #1 content-cf | en | PASS | text | QA654 inactive |
| L0 | field-name:description | #1 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #1 content-cf | en | PASS | long-text | QA654 description |
| L0 | field-name:catalogCategories | #1 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #1 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #1 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #1 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:catalogType | #1 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #1 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #1 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #1 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #1 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #1 content-cf | en | PASS | boolean | false |
| L0 | field-name:publishDate | #1 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #1 content-cf | en | PASS | date | 2026-10-01 |
| L0 | id=node-name:catalogId | #1 content-cf | en | PASS | qa654-inactive | qa654-inactive |
| L0 | required-fields (create) | #1 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | ref-exists:pdfAsset | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #2 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #2 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa654-inactive |
| L0 | node-name | #2 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-inactive |
| L0 | model-exists | #2 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #2 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa654-inactive (or rename item) | missing → would create |
| L0 | field-name:isActive | #2 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | ja | PASS | boolean | false |
| L0 | field-name:catalog | #2 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #2 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa654-inactive |
| L0 | flag-set:isActive | #2 dsr-cf | ja | PASS | isActive set in manifest | false |
| L0 | required-fields (create) | #2 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #2 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa654-inactive | in manifest |
| L0 | path-guard | #2 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa654-inactive |
| L0 | node-name | #2 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-inactive |
| L0 | model-exists | #2 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #2 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa654-inactive (or rename item) | missing → would create |
| L0 | field-name:isActive | #2 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | en | PASS | boolean | false |
| L0 | field-name:catalog | #2 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #2 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa654-inactive |
| L0 | flag-set:isActive | #2 dsr-cf | en | PASS | isActive set in manifest | false |
| L0 | required-fields (create) | #2 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #2 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa654-inactive | in manifest |
| L0 | lang-pair | #3 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-654-04 is en only (A7)) |
| L0 | path-guard | #3 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/catalogs/qa654-preview |
| L0 | node-name | #3 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-preview |
| L0 | model-exists | #3 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #3 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa654-preview (or rename item) | missing → would create |
| L0 | field-name:catalogId | #3 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #3 content-cf | en | PASS | text | qa654-preview |
| L0 | field-name:catalogTitle | #3 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #3 content-cf | en | PASS | text | QA654 preview |
| L0 | field-name:description | #3 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #3 content-cf | en | PASS | long-text | QA654 description |
| L0 | field-name:catalogCategories | #3 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #3 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #3 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #3 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:catalogType | #3 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #3 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #3 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #3 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #3 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #3 content-cf | en | PASS | boolean | false |
| L0 | field-name:publishDate | #3 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #3 content-cf | en | PASS | date | 2026-10-01 |
| L0 | id=node-name:catalogId | #3 content-cf | en | PASS | qa654-preview | qa654-preview |
| L0 | required-fields (create) | #3 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #3 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | ref-exists:pdfAsset | #3 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #4 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-654-04 is en only (A7)) |
| L0 | path-guard | #4 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa654-preview |
| L0 | node-name | #4 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-preview |
| L0 | model-exists | #4 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #4 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa654-preview (or rename item) | missing → would create |
| L0 | field-name:isActive | #4 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #4 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #4 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #4 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa654-preview |
| L0 | flag-set:isActive | #4 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #4 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #4 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa654-preview | in manifest |
| L0 | lang-pair | #5 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-654-06 is en only (A7)) |
| L0 | path-guard | #5 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/catalogs/qa654-content-only |
| L0 | node-name | #5 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-content-only |
| L0 | model-exists | #5 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #5 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa654-content-only (or rename item) | missing → would create |
| L0 | field-name:catalogId | #5 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #5 content-cf | en | PASS | text | qa654-content-only |
| L0 | field-name:catalogTitle | #5 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #5 content-cf | en | PASS | text | QA654 content only |
| L0 | field-name:description | #5 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #5 content-cf | en | PASS | long-text | QA654 description |
| L0 | field-name:catalogCategories | #5 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #5 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #5 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #5 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:catalogType | #5 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #5 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #5 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #5 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #5 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #5 content-cf | en | PASS | boolean | false |
| L0 | field-name:publishDate | #5 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #5 content-cf | en | PASS | date | 2026-10-01 |
| L0 | id=node-name:catalogId | #5 content-cf | en | PASS | qa654-content-only | qa654-content-only |
| L0 | required-fields (create) | #5 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #5 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | ref-exists:pdfAsset | #5 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #6 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-654-07 is en only (A7)) |
| L0 | path-guard | #6 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/catalogs/qa654-update |
| L0 | node-name | #6 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-update |
| L0 | model-exists | #6 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #6 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa654-update (or rename item) | missing → would create |
| L0 | field-name:catalogId | #6 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #6 content-cf | en | PASS | text | qa654-update |
| L0 | field-name:catalogTitle | #6 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #6 content-cf | en | PASS | text | QA654 update |
| L0 | field-name:description | #6 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #6 content-cf | en | PASS | long-text | QA654 before |
| L0 | field-name:catalogCategories | #6 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #6 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #6 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #6 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:catalogType | #6 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #6 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #6 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #6 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #6 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #6 content-cf | en | PASS | boolean | false |
| L0 | field-name:publishDate | #6 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #6 content-cf | en | PASS | date | 2026-10-01 |
| L0 | id=node-name:catalogId | #6 content-cf | en | PASS | qa654-update | qa654-update |
| L0 | required-fields (create) | #6 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #6 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | ref-exists:pdfAsset | #6 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #7 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-654-07 is en only (A7)) |
| L0 | path-guard | #7 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa654-update |
| L0 | node-name | #7 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-update |
| L0 | model-exists | #7 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #7 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa654-update (or rename item) | missing → would create |
| L0 | field-name:isActive | #7 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #7 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #7 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #7 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa654-update |
| L0 | flag-set:isActive | #7 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #7 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #7 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa654-update | in manifest |
| L0 | lang-pair | #8 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-654-08 is en only (A7)) |
| L0 | path-guard | #8 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/catalogs/qa654-content-unpub |
| L0 | node-name | #8 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-content-unpub |
| L0 | model-exists | #8 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #8 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa654-content-unpub (or rename item) | missing → would create |
| L0 | field-name:catalogId | #8 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #8 content-cf | en | PASS | text | qa654-content-unpub |
| L0 | field-name:catalogTitle | #8 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #8 content-cf | en | PASS | text | QA654 content unpublished |
| L0 | field-name:description | #8 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #8 content-cf | en | PASS | long-text | QA654 description |
| L0 | field-name:catalogCategories | #8 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #8 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #8 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #8 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:catalogType | #8 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #8 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #8 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #8 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #8 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #8 content-cf | en | PASS | boolean | false |
| L0 | field-name:publishDate | #8 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #8 content-cf | en | PASS | date | 2026-10-01 |
| L0 | id=node-name:catalogId | #8 content-cf | en | PASS | qa654-content-unpub | qa654-content-unpub |
| L0 | required-fields (create) | #8 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #8 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | ref-exists:pdfAsset | #8 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #9 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-654-08 is en only (A7)) |
| L0 | path-guard | #9 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa654-content-unpub |
| L0 | node-name | #9 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-content-unpub |
| L0 | model-exists | #9 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #9 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa654-content-unpub (or rename item) | missing → would create |
| L0 | field-name:isActive | #9 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #9 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #9 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #9 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa654-content-unpub |
| L0 | flag-set:isActive | #9 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #9 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #9 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa654-content-unpub | in manifest |

PASS 202 · FAIL 0 · WARN 18
