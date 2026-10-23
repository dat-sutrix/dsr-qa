# lint ykk-dsr/hub/author/manifests/TD-190-DSR.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #1 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/catalogs/qa190-cat-new-0 |
| L0 | node-name | #1 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-0 |
| L0 | replicate-values | #1 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #1 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #1 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #1 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa190-cat-new-0 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #1 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #1 content-cf | ja | PASS | text | qa190-cat-new-0 |
| L0 | field-name:catalogTitle | #1 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #1 content-cf | ja | PASS | text | QA190 NEW 0 |
| L0 | field-name:description | #1 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #1 content-cf | ja | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #1 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #1 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #1 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #1 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #1 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #1 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #1 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #1 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #1 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #1 content-cf | ja | PASS | boolean | false |
| L0 | field-name:sortOrder | #1 content-cf | ja | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #1 content-cf | ja | PASS | float-number | 0 |
| L0 | field-name:publishDate | #1 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #1 content-cf | ja | PASS | date | 2026-10-23 |
| L0 | id=node-name:catalogId | #1 content-cf | ja | PASS | qa190-cat-new-0 | qa190-cat-new-0 |
| L0 | required-fields (create) | #1 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #1 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #1 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa190-cat-new-0 |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-0 |
| L0 | replicate-values | #1 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #1 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #1 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #1 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa190-cat-new-0 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #1 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #1 content-cf | en | PASS | text | qa190-cat-new-0 |
| L0 | field-name:catalogTitle | #1 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #1 content-cf | en | PASS | text | QA190 NEW 0 |
| L0 | field-name:description | #1 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #1 content-cf | en | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #1 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #1 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #1 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #1 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #1 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #1 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #1 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #1 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #1 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #1 content-cf | en | PASS | boolean | false |
| L0 | field-name:sortOrder | #1 content-cf | en | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #1 content-cf | en | PASS | float-number | 0 |
| L0 | field-name:publishDate | #1 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #1 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:catalogId | #1 content-cf | en | PASS | qa190-cat-new-0 | qa190-cat-new-0 |
| L0 | required-fields (create) | #1 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #2 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #2 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/catalogs/qa190-cat-new-10 |
| L0 | node-name | #2 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-10 |
| L0 | replicate-values | #2 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #2 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #2 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #2 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa190-cat-new-10 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #2 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #2 content-cf | ja | PASS | text | qa190-cat-new-10 |
| L0 | field-name:catalogTitle | #2 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #2 content-cf | ja | PASS | text | QA190 NEW 10 |
| L0 | field-name:description | #2 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #2 content-cf | ja | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #2 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #2 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #2 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #2 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #2 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #2 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #2 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #2 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #2 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #2 content-cf | ja | PASS | boolean | false |
| L0 | field-name:sortOrder | #2 content-cf | ja | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #2 content-cf | ja | PASS | float-number | 0 |
| L0 | field-name:publishDate | #2 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #2 content-cf | ja | PASS | date | 2026-10-13 |
| L0 | id=node-name:catalogId | #2 content-cf | ja | PASS | qa190-cat-new-10 | qa190-cat-new-10 |
| L0 | required-fields (create) | #2 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #2 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #2 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #2 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa190-cat-new-10 |
| L0 | node-name | #2 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-10 |
| L0 | replicate-values | #2 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #2 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #2 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #2 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa190-cat-new-10 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #2 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #2 content-cf | en | PASS | text | qa190-cat-new-10 |
| L0 | field-name:catalogTitle | #2 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #2 content-cf | en | PASS | text | QA190 NEW 10 |
| L0 | field-name:description | #2 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #2 content-cf | en | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #2 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #2 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #2 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #2 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #2 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #2 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #2 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #2 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #2 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #2 content-cf | en | PASS | boolean | false |
| L0 | field-name:sortOrder | #2 content-cf | en | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #2 content-cf | en | PASS | float-number | 0 |
| L0 | field-name:publishDate | #2 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #2 content-cf | en | PASS | date | 2026-10-13 |
| L0 | id=node-name:catalogId | #2 content-cf | en | PASS | qa190-cat-new-10 | qa190-cat-new-10 |
| L0 | required-fields (create) | #2 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #2 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #2 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #3 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #3 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/catalogs/qa190-cat-new-11 |
| L0 | node-name | #3 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-11 |
| L0 | replicate-values | #3 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #3 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #3 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #3 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa190-cat-new-11 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #3 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #3 content-cf | ja | PASS | text | qa190-cat-new-11 |
| L0 | field-name:catalogTitle | #3 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #3 content-cf | ja | PASS | text | QA190 NEW 11 |
| L0 | field-name:description | #3 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #3 content-cf | ja | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #3 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #3 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #3 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #3 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #3 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #3 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #3 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #3 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #3 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #3 content-cf | ja | PASS | boolean | false |
| L0 | field-name:sortOrder | #3 content-cf | ja | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #3 content-cf | ja | PASS | float-number | 0 |
| L0 | field-name:publishDate | #3 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #3 content-cf | ja | PASS | date | 2026-10-12 |
| L0 | id=node-name:catalogId | #3 content-cf | ja | PASS | qa190-cat-new-11 | qa190-cat-new-11 |
| L0 | required-fields (create) | #3 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #3 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #3 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #3 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa190-cat-new-11 |
| L0 | node-name | #3 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-11 |
| L0 | replicate-values | #3 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #3 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #3 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #3 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa190-cat-new-11 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #3 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #3 content-cf | en | PASS | text | qa190-cat-new-11 |
| L0 | field-name:catalogTitle | #3 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #3 content-cf | en | PASS | text | QA190 NEW 11 |
| L0 | field-name:description | #3 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #3 content-cf | en | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #3 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #3 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #3 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #3 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #3 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #3 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #3 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #3 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #3 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #3 content-cf | en | PASS | boolean | false |
| L0 | field-name:sortOrder | #3 content-cf | en | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #3 content-cf | en | PASS | float-number | 0 |
| L0 | field-name:publishDate | #3 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #3 content-cf | en | PASS | date | 2026-10-12 |
| L0 | id=node-name:catalogId | #3 content-cf | en | PASS | qa190-cat-new-11 | qa190-cat-new-11 |
| L0 | required-fields (create) | #3 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #3 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #3 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #4 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #4 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/catalogs/qa190-cat-upd-0 |
| L0 | node-name | #4 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-0 |
| L0 | replicate-values | #4 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #4 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #4 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #4 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa190-cat-upd-0 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #4 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #4 content-cf | ja | PASS | text | qa190-cat-upd-0 |
| L0 | field-name:catalogTitle | #4 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #4 content-cf | ja | PASS | text | QA190 UPD 0 |
| L0 | field-name:description | #4 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #4 content-cf | ja | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #4 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #4 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #4 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #4 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #4 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #4 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #4 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #4 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #4 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #4 content-cf | ja | PASS | boolean | false |
| L0 | field-name:sortOrder | #4 content-cf | ja | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #4 content-cf | ja | PASS | float-number | 0 |
| L0 | field-name:publishDate | #4 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #4 content-cf | ja | PASS | date | 2026-09-15 |
| L0 | field-name:updateDate | #4 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:updateDate | #4 content-cf | ja | PASS | date | 2026-10-23 |
| L0 | id=node-name:catalogId | #4 content-cf | ja | PASS | qa190-cat-upd-0 | qa190-cat-upd-0 |
| L0 | required-fields (create) | #4 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #4 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #4 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #4 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa190-cat-upd-0 |
| L0 | node-name | #4 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-0 |
| L0 | replicate-values | #4 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #4 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #4 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #4 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa190-cat-upd-0 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #4 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #4 content-cf | en | PASS | text | qa190-cat-upd-0 |
| L0 | field-name:catalogTitle | #4 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #4 content-cf | en | PASS | text | QA190 UPD 0 |
| L0 | field-name:description | #4 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #4 content-cf | en | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #4 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #4 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #4 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #4 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #4 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #4 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #4 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #4 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #4 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #4 content-cf | en | PASS | boolean | false |
| L0 | field-name:sortOrder | #4 content-cf | en | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #4 content-cf | en | PASS | float-number | 0 |
| L0 | field-name:publishDate | #4 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #4 content-cf | en | PASS | date | 2026-09-15 |
| L0 | field-name:updateDate | #4 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:updateDate | #4 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:catalogId | #4 content-cf | en | PASS | qa190-cat-upd-0 | qa190-cat-upd-0 |
| L0 | required-fields (create) | #4 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #4 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #4 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #5 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #5 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/catalogs/qa190-cat-upd-10 |
| L0 | node-name | #5 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-10 |
| L0 | replicate-values | #5 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #5 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #5 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #5 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa190-cat-upd-10 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #5 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #5 content-cf | ja | PASS | text | qa190-cat-upd-10 |
| L0 | field-name:catalogTitle | #5 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #5 content-cf | ja | PASS | text | QA190 UPD 10 |
| L0 | field-name:description | #5 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #5 content-cf | ja | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #5 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #5 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #5 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #5 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #5 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #5 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #5 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #5 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #5 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #5 content-cf | ja | PASS | boolean | false |
| L0 | field-name:sortOrder | #5 content-cf | ja | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #5 content-cf | ja | PASS | float-number | 0 |
| L0 | field-name:publishDate | #5 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #5 content-cf | ja | PASS | date | 2026-09-15 |
| L0 | field-name:updateDate | #5 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:updateDate | #5 content-cf | ja | PASS | date | 2026-10-13 |
| L0 | id=node-name:catalogId | #5 content-cf | ja | PASS | qa190-cat-upd-10 | qa190-cat-upd-10 |
| L0 | required-fields (create) | #5 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #5 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #5 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #5 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa190-cat-upd-10 |
| L0 | node-name | #5 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-10 |
| L0 | replicate-values | #5 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #5 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #5 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #5 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa190-cat-upd-10 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #5 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #5 content-cf | en | PASS | text | qa190-cat-upd-10 |
| L0 | field-name:catalogTitle | #5 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #5 content-cf | en | PASS | text | QA190 UPD 10 |
| L0 | field-name:description | #5 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #5 content-cf | en | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #5 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #5 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #5 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #5 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #5 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #5 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #5 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #5 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #5 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #5 content-cf | en | PASS | boolean | false |
| L0 | field-name:sortOrder | #5 content-cf | en | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #5 content-cf | en | PASS | float-number | 0 |
| L0 | field-name:publishDate | #5 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #5 content-cf | en | PASS | date | 2026-09-15 |
| L0 | field-name:updateDate | #5 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:updateDate | #5 content-cf | en | PASS | date | 2026-10-13 |
| L0 | id=node-name:catalogId | #5 content-cf | en | PASS | qa190-cat-upd-10 | qa190-cat-upd-10 |
| L0 | required-fields (create) | #5 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #5 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #5 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #6 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #6 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/catalogs/qa190-cat-upd-11 |
| L0 | node-name | #6 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-11 |
| L0 | replicate-values | #6 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #6 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #6 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #6 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa190-cat-upd-11 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #6 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #6 content-cf | ja | PASS | text | qa190-cat-upd-11 |
| L0 | field-name:catalogTitle | #6 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #6 content-cf | ja | PASS | text | QA190 UPD 11 |
| L0 | field-name:description | #6 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #6 content-cf | ja | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #6 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #6 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #6 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #6 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #6 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #6 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #6 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #6 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #6 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #6 content-cf | ja | PASS | boolean | false |
| L0 | field-name:sortOrder | #6 content-cf | ja | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #6 content-cf | ja | PASS | float-number | 0 |
| L0 | field-name:publishDate | #6 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #6 content-cf | ja | PASS | date | 2026-09-15 |
| L0 | field-name:updateDate | #6 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:updateDate | #6 content-cf | ja | PASS | date | 2026-10-12 |
| L0 | id=node-name:catalogId | #6 content-cf | ja | PASS | qa190-cat-upd-11 | qa190-cat-upd-11 |
| L0 | required-fields (create) | #6 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #6 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #6 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #6 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa190-cat-upd-11 |
| L0 | node-name | #6 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-11 |
| L0 | replicate-values | #6 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #6 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #6 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #6 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa190-cat-upd-11 (or rename item) | missing → would create |
| L0 | field-name:catalogId | #6 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #6 content-cf | en | PASS | text | qa190-cat-upd-11 |
| L0 | field-name:catalogTitle | #6 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #6 content-cf | en | PASS | text | QA190 UPD 11 |
| L0 | field-name:description | #6 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #6 content-cf | en | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #6 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #6 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #6 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #6 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #6 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #6 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #6 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #6 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #6 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #6 content-cf | en | PASS | boolean | false |
| L0 | field-name:sortOrder | #6 content-cf | en | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #6 content-cf | en | PASS | float-number | 0 |
| L0 | field-name:publishDate | #6 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #6 content-cf | en | PASS | date | 2026-09-15 |
| L0 | field-name:updateDate | #6 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:updateDate | #6 content-cf | en | PASS | date | 2026-10-12 |
| L0 | id=node-name:catalogId | #6 content-cf | en | PASS | qa190-cat-upd-11 | qa190-cat-upd-11 |
| L0 | required-fields (create) | #6 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #6 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #6 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #7 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #7 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/catalogs/qa190-cat-both |
| L0 | node-name | #7 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-both |
| L0 | replicate-values | #7 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #7 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #7 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #7 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa190-cat-both (or rename item) | missing → would create |
| L0 | field-name:catalogId | #7 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #7 content-cf | ja | PASS | text | qa190-cat-both |
| L0 | field-name:catalogTitle | #7 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #7 content-cf | ja | PASS | text | QA190 BOTH |
| L0 | field-name:description | #7 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #7 content-cf | ja | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #7 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #7 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #7 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #7 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #7 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #7 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #7 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #7 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #7 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #7 content-cf | ja | PASS | boolean | false |
| L0 | field-name:sortOrder | #7 content-cf | ja | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #7 content-cf | ja | PASS | float-number | 0 |
| L0 | field-name:publishDate | #7 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #7 content-cf | ja | PASS | date | 2026-10-22 |
| L0 | field-name:updateDate | #7 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:updateDate | #7 content-cf | ja | PASS | date | 2026-10-23 |
| L0 | id=node-name:catalogId | #7 content-cf | ja | PASS | qa190-cat-both | qa190-cat-both |
| L0 | required-fields (create) | #7 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #7 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #7 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #7 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa190-cat-both |
| L0 | node-name | #7 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-both |
| L0 | replicate-values | #7 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #7 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #7 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #7 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa190-cat-both (or rename item) | missing → would create |
| L0 | field-name:catalogId | #7 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #7 content-cf | en | PASS | text | qa190-cat-both |
| L0 | field-name:catalogTitle | #7 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #7 content-cf | en | PASS | text | QA190 BOTH |
| L0 | field-name:description | #7 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #7 content-cf | en | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #7 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #7 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #7 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #7 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #7 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #7 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #7 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #7 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #7 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #7 content-cf | en | PASS | boolean | false |
| L0 | field-name:sortOrder | #7 content-cf | en | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #7 content-cf | en | PASS | float-number | 0 |
| L0 | field-name:publishDate | #7 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #7 content-cf | en | PASS | date | 2026-10-22 |
| L0 | field-name:updateDate | #7 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:updateDate | #7 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:catalogId | #7 content-cf | en | PASS | qa190-cat-both | qa190-cat-both |
| L0 | required-fields (create) | #7 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #7 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #7 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #8 content-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #8 content-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/ja/catalogs/qa190-cat-noupd |
| L0 | node-name | #8 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-noupd |
| L0 | replicate-values | #8 content-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #8 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #8 content-cf | ja | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #8 content-cf | ja | WARN | CF at /content/dam/common/ja/catalogs/qa190-cat-noupd (or rename item) | missing → would create |
| L0 | field-name:catalogId | #8 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #8 content-cf | ja | PASS | text | qa190-cat-noupd |
| L0 | field-name:catalogTitle | #8 content-cf | ja | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #8 content-cf | ja | PASS | text | qa190-cat-noupd |
| L0 | field-name:description | #8 content-cf | ja | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #8 content-cf | ja | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #8 content-cf | ja | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #8 content-cf | ja | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #8 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #8 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #8 content-cf | ja | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #8 content-cf | ja | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #8 content-cf | ja | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #8 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #8 content-cf | ja | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #8 content-cf | ja | PASS | boolean | false |
| L0 | field-name:sortOrder | #8 content-cf | ja | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #8 content-cf | ja | PASS | float-number | 0 |
| L0 | field-name:publishDate | #8 content-cf | ja | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #8 content-cf | ja | PASS | date | 2026-10-22 |
| L0 | id=node-name:catalogId | #8 content-cf | ja | PASS | qa190-cat-noupd | qa190-cat-noupd |
| L0 | required-fields (create) | #8 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #8 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #8 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | path-guard | #8 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa190-cat-noupd |
| L0 | node-name | #8 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-noupd |
| L0 | replicate-values | #8 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #8 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #8 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #8 content-cf | en | WARN | CF at /content/dam/common/en/catalogs/qa190-cat-noupd (or rename item) | missing → would create |
| L0 | field-name:catalogId | #8 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogId | #8 content-cf | en | PASS | text | qa190-cat-noupd |
| L0 | field-name:catalogTitle | #8 content-cf | en | PASS | field of DM_catalog | text |
| L0 | field-type:catalogTitle | #8 content-cf | en | PASS | text | qa190-cat-noupd |
| L0 | field-name:description | #8 content-cf | en | PASS | field of DM_catalog | long-text |
| L0 | field-type:description | #8 content-cf | en | PASS | long-text | catelog description |
| L0 | field-name:catalogCategories | #8 content-cf | en | PASS | field of DM_catalog | tag |
| L0 | field-type:catalogCategories | #8 content-cf | en | PASS | tag | ["site:product/material/aluminium"] |
| L0 | field-name:thumbnail | #8 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:thumbnail | #8 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png |
| L0 | field-name:catalogType | #8 content-cf | en | PASS | field of DM_catalog | enumeration |
| L0 | field-type:catalogType | #8 content-cf | en | PASS | enumeration | pdf |
| L0 | field-name:pdfAsset | #8 content-cf | en | PASS | field of DM_catalog | content-reference |
| L0 | field-type:pdfAsset | #8 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf |
| L0 | field-name:requiresForm | #8 content-cf | en | PASS | field of DM_catalog | boolean |
| L0 | field-type:requiresForm | #8 content-cf | en | PASS | boolean | false |
| L0 | field-name:sortOrder | #8 content-cf | en | PASS | field of DM_catalog | float-number |
| L0 | field-type:sortOrder | #8 content-cf | en | PASS | float-number | 0 |
| L0 | field-name:publishDate | #8 content-cf | en | PASS | field of DM_catalog | date |
| L0 | field-type:publishDate | #8 content-cf | en | PASS | date | 2026-10-22 |
| L0 | id=node-name:catalogId | #8 content-cf | en | PASS | qa190-cat-noupd | qa190-cat-noupd |
| L0 | required-fields (create) | #8 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #8 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/16bit-depth-1200x800.png | exists |
| L0 | ref-exists:pdfAsset | #8 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf | exists |
| L0 | lang-pair | #9 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #9 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/catalogs/qa190-cat-new-0 |
| L0 | node-name | #9 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-0 |
| L0 | replicate-values | #9 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #9 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #9 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #9 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa190-cat-new-0 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #9 dsr-cf | ja | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #9 dsr-cf | ja | PASS | text | qa190-cat-new-0 |
| L0 | field-name:isActive | #9 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #9 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #9 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #9 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa190-cat-new-0 |
| L0 | flag-set:isActive | #9 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #9 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #9 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-new-0 | in manifest |
| L0 | path-guard | #9 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa190-cat-new-0 |
| L0 | node-name | #9 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-0 |
| L0 | replicate-values | #9 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #9 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #9 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #9 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa190-cat-new-0 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #9 dsr-cf | en | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #9 dsr-cf | en | PASS | text | qa190-cat-new-0 |
| L0 | field-name:isActive | #9 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #9 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #9 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #9 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa190-cat-new-0 |
| L0 | flag-set:isActive | #9 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #9 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #9 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-new-0 | in manifest |
| L0 | lang-pair | #10 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #10 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/catalogs/qa190-cat-new-10 |
| L0 | node-name | #10 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-10 |
| L0 | replicate-values | #10 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #10 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #10 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #10 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa190-cat-new-10 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #10 dsr-cf | ja | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #10 dsr-cf | ja | PASS | text | qa190-cat-new-10 |
| L0 | field-name:isActive | #10 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #10 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #10 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #10 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa190-cat-new-10 |
| L0 | flag-set:isActive | #10 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #10 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #10 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-new-10 | in manifest |
| L0 | path-guard | #10 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa190-cat-new-10 |
| L0 | node-name | #10 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-10 |
| L0 | replicate-values | #10 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #10 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #10 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #10 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa190-cat-new-10 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #10 dsr-cf | en | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #10 dsr-cf | en | PASS | text | qa190-cat-new-10 |
| L0 | field-name:isActive | #10 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #10 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #10 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #10 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa190-cat-new-10 |
| L0 | flag-set:isActive | #10 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #10 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #10 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-new-10 | in manifest |
| L0 | lang-pair | #11 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #11 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/catalogs/qa190-cat-new-11 |
| L0 | node-name | #11 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-11 |
| L0 | replicate-values | #11 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #11 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #11 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #11 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa190-cat-new-11 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #11 dsr-cf | ja | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #11 dsr-cf | ja | PASS | text | qa190-cat-new-11 |
| L0 | field-name:isActive | #11 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #11 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #11 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #11 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa190-cat-new-11 |
| L0 | flag-set:isActive | #11 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #11 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #11 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-new-11 | in manifest |
| L0 | path-guard | #11 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa190-cat-new-11 |
| L0 | node-name | #11 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-new-11 |
| L0 | replicate-values | #11 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #11 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #11 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #11 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa190-cat-new-11 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #11 dsr-cf | en | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #11 dsr-cf | en | PASS | text | qa190-cat-new-11 |
| L0 | field-name:isActive | #11 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #11 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #11 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #11 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa190-cat-new-11 |
| L0 | flag-set:isActive | #11 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #11 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #11 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-new-11 | in manifest |
| L0 | lang-pair | #12 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #12 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/catalogs/qa190-cat-upd-0 |
| L0 | node-name | #12 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-0 |
| L0 | replicate-values | #12 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #12 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #12 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #12 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa190-cat-upd-0 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #12 dsr-cf | ja | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #12 dsr-cf | ja | PASS | text | qa190-cat-upd-0 |
| L0 | field-name:isActive | #12 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #12 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #12 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #12 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa190-cat-upd-0 |
| L0 | flag-set:isActive | #12 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #12 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #12 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-upd-0 | in manifest |
| L0 | path-guard | #12 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa190-cat-upd-0 |
| L0 | node-name | #12 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-0 |
| L0 | replicate-values | #12 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #12 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #12 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #12 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa190-cat-upd-0 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #12 dsr-cf | en | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #12 dsr-cf | en | PASS | text | qa190-cat-upd-0 |
| L0 | field-name:isActive | #12 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #12 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #12 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #12 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa190-cat-upd-0 |
| L0 | flag-set:isActive | #12 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #12 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #12 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-upd-0 | in manifest |
| L0 | lang-pair | #13 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #13 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/catalogs/qa190-cat-upd-10 |
| L0 | node-name | #13 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-10 |
| L0 | replicate-values | #13 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #13 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #13 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #13 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa190-cat-upd-10 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #13 dsr-cf | ja | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #13 dsr-cf | ja | PASS | text | qa190-cat-upd-10 |
| L0 | field-name:isActive | #13 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #13 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #13 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #13 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa190-cat-upd-10 |
| L0 | flag-set:isActive | #13 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #13 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #13 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-upd-10 | in manifest |
| L0 | path-guard | #13 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa190-cat-upd-10 |
| L0 | node-name | #13 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-10 |
| L0 | replicate-values | #13 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #13 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #13 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #13 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa190-cat-upd-10 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #13 dsr-cf | en | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #13 dsr-cf | en | PASS | text | qa190-cat-upd-10 |
| L0 | field-name:isActive | #13 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #13 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #13 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #13 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa190-cat-upd-10 |
| L0 | flag-set:isActive | #13 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #13 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #13 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-upd-10 | in manifest |
| L0 | lang-pair | #14 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #14 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/catalogs/qa190-cat-upd-11 |
| L0 | node-name | #14 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-11 |
| L0 | replicate-values | #14 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #14 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #14 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #14 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa190-cat-upd-11 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #14 dsr-cf | ja | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #14 dsr-cf | ja | PASS | text | qa190-cat-upd-11 |
| L0 | field-name:isActive | #14 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #14 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #14 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #14 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa190-cat-upd-11 |
| L0 | flag-set:isActive | #14 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #14 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #14 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-upd-11 | in manifest |
| L0 | path-guard | #14 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa190-cat-upd-11 |
| L0 | node-name | #14 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-upd-11 |
| L0 | replicate-values | #14 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #14 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #14 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #14 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa190-cat-upd-11 (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #14 dsr-cf | en | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #14 dsr-cf | en | PASS | text | qa190-cat-upd-11 |
| L0 | field-name:isActive | #14 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #14 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #14 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #14 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa190-cat-upd-11 |
| L0 | flag-set:isActive | #14 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #14 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #14 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-upd-11 | in manifest |
| L0 | lang-pair | #15 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #15 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/catalogs/qa190-cat-both |
| L0 | node-name | #15 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-both |
| L0 | replicate-values | #15 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #15 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #15 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #15 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa190-cat-both (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #15 dsr-cf | ja | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #15 dsr-cf | ja | PASS | text | qa190-cat-both |
| L0 | field-name:isActive | #15 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #15 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #15 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #15 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa190-cat-both |
| L0 | flag-set:isActive | #15 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #15 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #15 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-both | in manifest |
| L0 | path-guard | #15 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa190-cat-both |
| L0 | node-name | #15 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-both |
| L0 | replicate-values | #15 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #15 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #15 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #15 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa190-cat-both (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #15 dsr-cf | en | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #15 dsr-cf | en | PASS | text | qa190-cat-both |
| L0 | field-name:isActive | #15 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #15 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #15 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #15 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa190-cat-both |
| L0 | flag-set:isActive | #15 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #15 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #15 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-both | in manifest |
| L0 | lang-pair | #16 dsr-cf | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #16 dsr-cf | ja | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/ja/catalogs/qa190-cat-noupd |
| L0 | node-name | #16 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-noupd |
| L0 | replicate-values | #16 dsr-cf | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #16 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #16 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #16 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/catalogs/qa190-cat-noupd (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #16 dsr-cf | ja | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #16 dsr-cf | ja | PASS | text | qa190-cat-noupd |
| L0 | field-name:isActive | #16 dsr-cf | ja | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #16 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:catalog | #16 dsr-cf | ja | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #16 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/catalogs/qa190-cat-noupd |
| L0 | flag-set:isActive | #16 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #16 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:catalog | #16 dsr-cf | ja | PASS | /content/dam/common/ja/catalogs/qa190-cat-noupd | in manifest |
| L0 | path-guard | #16 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa190-cat-noupd |
| L0 | node-name | #16 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa190-cat-noupd |
| L0 | replicate-values | #16 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview, publish |
| L0 | model-current | #16 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #16 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #16 dsr-cf | en | WARN | CF at /content/dam/dsr/en/catalogs/qa190-cat-noupd (or rename item) | missing → would create |
| L0 | field-name:catalogLabel | #16 dsr-cf | en | PASS | field of DM_catalog_related | text |
| L0 | field-type:catalogLabel | #16 dsr-cf | en | PASS | text | qa190-cat-noupd |
| L0 | field-name:isActive | #16 dsr-cf | en | PASS | field of DM_catalog_related | boolean |
| L0 | field-type:isActive | #16 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:catalog | #16 dsr-cf | en | PASS | field of DM_catalog_related | content-fragment |
| L0 | field-type:catalog | #16 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/catalogs/qa190-cat-noupd |
| L0 | flag-set:isActive | #16 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #16 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:catalog | #16 dsr-cf | en | PASS | /content/dam/common/en/catalogs/qa190-cat-noupd | in manifest |

PASS 720 · FAIL 0 · WARN 32
