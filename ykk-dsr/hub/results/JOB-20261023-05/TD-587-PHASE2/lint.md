# lint ykk-dsr/hub/author/manifests/TD-587-PHASE2.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-08 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/movies/qa587-unavail |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa587-unavail |
| L0 | replicate-values | #1 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | unpublish-publish |
| L0 | model-exists | #1 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa587-unavail | patch |
| L0 | live-model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L0 | unpublish-target-exists | #1 content-cf | en | PASS | existing CF /content/dam/common/en/movies/qa587-unavail | exists |
| L0 | field-name:movieId | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #1 content-cf | en | PASS | text | qa587-unavail |
| L0 | id=node-name:movieId | #1 content-cf | en | PASS | qa587-unavail | qa587-unavail |
| L0 | live-id:movieId | #1 content-cf | en | PASS | qa587-unavail (manifest will patch) | qa587-unavail |
| L0 | required-fields (patch) | #1 content-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #2 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-08 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #2 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/movies/standard/qa587-unavail |
| L0 | node-name | #2 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa587-unavail |
| L0 | replicate-values | #2 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | publish |
| L0 | model-exists | #2 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-unavail | patch |
| L0 | live-model | #2 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | field-name:isActive | #2 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #2 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:movie | #2 dsr-cf | en | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #2 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/movies/qa587-unavail |
| L0 | flag-set:isActive | #2 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #2 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:movie | #2 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-unavail | in manifest |
| L0 | lang-pair | #3 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-10 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #3 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/movies/standard/qa587-removed |
| L0 | node-name | #3 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa587-removed |
| L0 | replicate-values | #3 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | unpublish-publish, unpublish-preview |
| L0 | not-before | #3 dsr-cf | en | PASS | now ≥ 2026-10-23T02:39:01Z | 2026-10-23T02:51:37.896Z |
| L0 | model-exists | #3 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #3 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-removed | patch |
| L0 | live-model | #3 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | unpublish-target-exists | #3 dsr-cf | en | PASS | existing CF /content/dam/dsr/en/movies/standard/qa587-removed | exists |
| L0 | field-name:isActive | #3 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #3 dsr-cf | en | PASS | boolean | true |
| L0 | flag-set:isActive | #3 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (patch) | #3 dsr-cf | en | PASS | all required present | ok |

PASS 37 · FAIL 0 · WARN 3
