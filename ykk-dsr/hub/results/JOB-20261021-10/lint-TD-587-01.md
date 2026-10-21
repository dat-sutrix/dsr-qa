# lint ykk-dsr/hub/author/manifests/TD-587-01.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | path-guard:rename-source | #1 rename | ja | PASS | allowed qa* or legacy qa-* path (D8) | /content/dam/common/ja/movies/qa-587-main |
| L0 | path-guard | #1 rename | ja | PASS | allowed qa* path | /content/dam/common/ja/movies/qa587-main |
| L0 | node-name | #1 rename | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | rename-source | #1 rename | ja | PASS | exists: /content/dam/common/ja/movies/qa-587-main | exists |
| L0 | rename-target-free | #1 rename | ja | PASS | free: /content/dam/common/ja/movies/qa587-main | free |
| L0 | rename-same-folder | #1 rename | ja | PASS | /content/dam/common/ja/movies | /content/dam/common/ja/movies |
| L0 | path-guard:rename-source | #2 rename | en | PASS | allowed qa* or legacy qa-* path (D8) | /content/dam/dsr/en/movies/standard/qa-587-main |
| L0 | path-guard | #2 rename | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-main |
| L0 | node-name | #2 rename | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | rename-source | #2 rename | en | PASS | exists: /content/dam/dsr/en/movies/standard/qa-587-main | exists |
| L0 | rename-target-free | #2 rename | en | PASS | free: /content/dam/dsr/en/movies/standard/qa587-main | free |
| L0 | rename-same-folder | #2 rename | en | PASS | /content/dam/dsr/en/movies/standard | /content/dam/dsr/en/movies/standard |
| L0 | path-guard:rename-source | #2 rename | ja | PASS | allowed qa* or legacy qa-* path (D8) | /content/dam/dsr/ja/movies/standard/qa-587-main |
| L0 | path-guard | #2 rename | ja | PASS | allowed qa* path | /content/dam/dsr/ja/movies/standard/qa587-main |
| L0 | node-name | #2 rename | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | rename-source | #2 rename | ja | PASS | exists: /content/dam/dsr/ja/movies/standard/qa-587-main | exists |
| L0 | rename-target-free | #2 rename | ja | PASS | free: /content/dam/dsr/ja/movies/standard/qa587-main | free |
| L0 | rename-same-folder | #2 rename | ja | PASS | /content/dam/dsr/ja/movies/standard | /content/dam/dsr/ja/movies/standard |
| L0 | lang-pair | #3 content-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #3 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa587-main |
| L0 | node-name | #3 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | model-exists | #3 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #3 content-cf | en | PASS | /content/dam/common/en/movies/qa587-main | patch |
| L0 | live-model | #3 content-cf | en | PASS | DM_movie | DM_movie |
| L0 | field-name:movieId | #3 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #3 content-cf | en | PASS | text | qa587-main |
| L0 | id=node-name:movieId | #3 content-cf | en | PASS | qa587-main | qa587-main |
| L0 | live-id:movieId | #3 content-cf | en | WARN | qa587-main (manifest will patch) | QA587 main1 |
| L0 | required-fields (patch) | #3 content-cf | en | PASS | all required present | ok |
| L0 | path-guard | #3 content-cf | ja | PASS | allowed qa* path | /content/dam/common/ja/movies/qa587-main |
| L0 | node-name | #3 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | model-exists | #3 content-cf | ja | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #3 content-cf | ja | PASS | /content/dam/common/ja/movies/qa587-main | patch-after-rename |
| L0 | live-model | #3 content-cf | ja | PASS | DM_movie | DM_movie |
| L0 | field-name:movieId | #3 content-cf | ja | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #3 content-cf | ja | PASS | text | qa587-main |
| L0 | id=node-name:movieId | #3 content-cf | ja | PASS | qa587-main | qa587-main |
| L0 | live-id:movieId | #3 content-cf | ja | WARN | qa587-main (manifest will patch) | QA587 main |
| L0 | required-fields (patch-after-rename) | #3 content-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #4 dsr-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #4 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-main |
| L0 | node-name | #4 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | model-exists | #4 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #4 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-main | patch-after-rename |
| L0 | live-model | #4 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | field-name:isActive | #4 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #4 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:movie | #4 dsr-cf | en | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #4 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/movies/qa587-main |
| L0 | ref-set-after-rename:movie | #4 dsr-cf | en | PASS | movie set in manifest (D9) | /content/dam/common/en/movies/qa587-main |
| L0 | flag-set:isActive | #4 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (patch-after-rename) | #4 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:movie | #4 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-main | in manifest |
| L0 | path-guard | #4 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/movies/standard/qa587-main |
| L0 | node-name | #4 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | model-exists | #4 dsr-cf | ja | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #4 dsr-cf | ja | PASS | /content/dam/dsr/ja/movies/standard/qa587-main | patch-after-rename |
| L0 | live-model | #4 dsr-cf | ja | PASS | DM_movie_related | DM_movie_related |
| L0 | field-name:isActive | #4 dsr-cf | ja | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #4 dsr-cf | ja | PASS | boolean | true |
| L0 | field-name:movie | #4 dsr-cf | ja | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #4 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/movies/qa587-main |
| L0 | ref-set-after-rename:movie | #4 dsr-cf | ja | PASS | movie set in manifest (D9) | /content/dam/common/ja/movies/qa587-main |
| L0 | flag-set:isActive | #4 dsr-cf | ja | PASS | isActive set in manifest | true |
| L0 | required-fields (patch-after-rename) | #4 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:movie | #4 dsr-cf | ja | PASS | /content/dam/common/ja/movies/qa587-main | in manifest |

PASS 64 · FAIL 0 · WARN 2
