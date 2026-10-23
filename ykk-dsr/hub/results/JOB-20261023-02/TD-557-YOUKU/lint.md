# lint ykk-dsr/hub/author/manifests/TD-557-YOUKU.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa557-youku |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-youku |
| L0 | model-exists | #1 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #1 content-cf | en | WARN | CF at /content/dam/common/en/movies/qa557-youku (or rename item) | missing → would create |
| L0 | field-name:movieId | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #1 content-cf | en | PASS | text | qa557-youku |
| L0 | field-name:movieTitle | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #1 content-cf | en | PASS | text | QA557 Youku video |
| L0 | field-name:description | #1 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #1 content-cf | en | PASS | long-text | QA557 Youku test (DSR-611 Q4) |
| L0 | field-name:thumbnail | #1 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #1 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #1 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #1 content-cf | en | PASS | enumeration | youku |
| L0 | field-name:movieSourceId | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #1 content-cf | en | PASS | text | XNTgyNzE1ODE5Ng== |
| L0 | field-name:publishDate | #1 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #1 content-cf | en | PASS | date | 2026-10-01 |
| L0 | id=node-name:movieId | #1 content-cf | en | PASS | qa557-youku | qa557-youku |
| L0 | required-fields (create) | #1 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | path-guard | #1 content-cf | ja | PASS | allowed qa* path | /content/dam/common/ja/movies/qa557-youku |
| L0 | node-name | #1 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-youku |
| L0 | model-exists | #1 content-cf | ja | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #1 content-cf | ja | WARN | CF at /content/dam/common/ja/movies/qa557-youku (or rename item) | missing → would create |
| L0 | field-name:movieId | #1 content-cf | ja | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #1 content-cf | ja | PASS | text | qa557-youku |
| L0 | field-name:movieTitle | #1 content-cf | ja | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #1 content-cf | ja | PASS | text | QA557 Youku video |
| L0 | field-name:description | #1 content-cf | ja | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #1 content-cf | ja | PASS | long-text | QA557 Youku test (DSR-611 Q4) |
| L0 | field-name:thumbnail | #1 content-cf | ja | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #1 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #1 content-cf | ja | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #1 content-cf | ja | PASS | enumeration | youku |
| L0 | field-name:movieSourceId | #1 content-cf | ja | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #1 content-cf | ja | PASS | text | XNTgyNzE1ODE5Ng== |
| L0 | field-name:publishDate | #1 content-cf | ja | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #1 content-cf | ja | PASS | date | 2026-10-01 |
| L0 | id=node-name:movieId | #1 content-cf | ja | PASS | qa557-youku | qa557-youku |
| L0 | required-fields (create) | #1 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #1 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | lang-pair | #2 dsr-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #2 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa557-youku |
| L0 | node-name | #2 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-youku |
| L0 | model-exists | #2 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #2 dsr-cf | en | WARN | CF at /content/dam/dsr/en/movies/standard/qa557-youku (or rename item) | missing → would create |
| L0 | field-name:isActive | #2 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:movie | #2 dsr-cf | en | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #2 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/movies/qa557-youku |
| L0 | flag-set:isActive | #2 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #2 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:movie | #2 dsr-cf | en | PASS | /content/dam/common/en/movies/qa557-youku | in manifest |
| L0 | path-guard | #2 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/movies/standard/qa557-youku |
| L0 | node-name | #2 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-youku |
| L0 | model-exists | #2 dsr-cf | ja | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #2 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/movies/standard/qa557-youku (or rename item) | missing → would create |
| L0 | field-name:isActive | #2 dsr-cf | ja | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:movie | #2 dsr-cf | ja | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #2 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/movies/qa557-youku |
| L0 | flag-set:isActive | #2 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #2 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:movie | #2 dsr-cf | ja | PASS | /content/dam/common/ja/movies/qa557-youku | in manifest |

PASS 62 · FAIL 0 · WARN 4
