# lint ykk-dsr/hub/author/manifests/TD-557-DAM.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa557-dam |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-dam |
| L0 | model-exists | #1 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa557-dam | patch |
| L0 | live-model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L0 | field-name:movieId | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #1 content-cf | en | PASS | text | qa557-dam |
| L0 | field-name:movieSource | #1 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #1 content-cf | en | PASS | enumeration | dam |
| L0 | id=node-name:movieId | #1 content-cf | en | PASS | qa557-dam | qa557-dam |
| L0 | live-id:movieId | #1 content-cf | en | WARN | qa557-dam (manifest will patch) | QA587 dam |
| L0 | required-fields (patch) | #1 content-cf | en | PASS | all required present | ok |
| L0 | path-guard | #1 content-cf | ja | PASS | allowed qa* path | /content/dam/common/ja/movies/qa557-dam |
| L0 | node-name | #1 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-dam |
| L0 | model-exists | #1 content-cf | ja | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #1 content-cf | ja | PASS | /content/dam/common/ja/movies/qa557-dam | patch |
| L0 | live-model | #1 content-cf | ja | PASS | DM_movie | DM_movie |
| L0 | field-name:movieId | #1 content-cf | ja | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #1 content-cf | ja | PASS | text | qa557-dam |
| L0 | field-name:movieSource | #1 content-cf | ja | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #1 content-cf | ja | PASS | enumeration | dam |
| L0 | id=node-name:movieId | #1 content-cf | ja | PASS | qa557-dam | qa557-dam |
| L0 | live-id:movieId | #1 content-cf | ja | WARN | qa557-dam (manifest will patch) | QA587 dam |
| L0 | required-fields (patch) | #1 content-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #2 dsr-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #2 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa557-dam |
| L0 | node-name | #2 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-dam |
| L0 | model-exists | #2 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa557-dam | patch |
| L0 | live-model | #2 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | field-name:isActive | #2 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:movie | #2 dsr-cf | en | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #2 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/movies/qa557-dam |
| L0 | flag-set:isActive | #2 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #2 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:movie | #2 dsr-cf | en | PASS | /content/dam/common/en/movies/qa557-dam | in manifest |
| L0 | path-guard | #2 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/movies/standard/qa557-dam |
| L0 | node-name | #2 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-dam |
| L0 | model-exists | #2 dsr-cf | ja | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/movies/standard/qa557-dam | patch |
| L0 | live-model | #2 dsr-cf | ja | PASS | DM_movie_related | DM_movie_related |
| L0 | field-name:isActive | #2 dsr-cf | ja | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:movie | #2 dsr-cf | ja | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #2 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/movies/qa557-dam |
| L0 | flag-set:isActive | #2 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #2 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:movie | #2 dsr-cf | ja | PASS | /content/dam/common/ja/movies/qa557-dam | in manifest |

PASS 48 · FAIL 0 · WARN 2
