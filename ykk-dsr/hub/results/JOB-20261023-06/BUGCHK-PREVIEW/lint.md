# lint ykk-dsr/hub/results/JOB-20261023-06/BUGCHK-PREVIEW/BUGCHK-PREVIEW.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: re-preview of existing en CF only (TD-587-02 en only), no data change) |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/movies/qa587-preview |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa587-preview |
| L0 | replicate-values | #1 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview |
| L0 | model-current | #1 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | model-exists | #1 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa587-preview | patch |
| L0 | live-model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L0 | id=node-name:movieId | #1 content-cf | en | PASS | qa587-preview | qa587-preview |
| L0 | required-fields (patch) | #1 content-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #2 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: re-preview of existing en CF only (TD-654-04 en only), no data change) |
| L0 | path-guard | #2 content-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/common/en/catalogs/qa654-preview |
| L0 | node-name | #2 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa654-preview |
| L0 | replicate-values | #2 content-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview |
| L0 | model-current | #2 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | model-exists | #2 content-cf | en | PASS | DM_catalog | /conf/ykk/settings/dam/cfm/models/dm_catalog |
| L0 | target-exists | #2 content-cf | en | PASS | /content/dam/common/en/catalogs/qa654-preview | patch |
| L0 | live-model | #2 content-cf | en | PASS | DM_catalog | DM_catalog |
| L0 | id=node-name:catalogId | #2 content-cf | en | PASS | qa654-preview | qa654-preview |
| L0 | required-fields (patch) | #2 content-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #3 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: re-preview of existing en CF only (TD-587-02 en only), no data change) |
| L0 | path-guard | #3 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/movies/standard/qa587-preview |
| L0 | node-name | #3 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa587-preview |
| L0 | replicate-values | #3 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview |
| L0 | model-current | #3 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | model-exists | #3 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #3 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-preview | patch |
| L0 | live-model | #3 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #3 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #3 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #4 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: re-preview of existing en CF only (TD-654-04 en only), no data change) |
| L0 | path-guard | #4 dsr-cf | en | PASS | allowed qa* CF path or D13 numeric product | /content/dam/dsr/en/catalogs/qa654-preview |
| L0 | node-name | #4 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa654-preview |
| L0 | replicate-values | #4 dsr-cf | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | preview |
| L0 | model-current | #4 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | model-exists | #4 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #4 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-preview | patch |
| L0 | live-model | #4 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #4 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #4 dsr-cf | en | PASS | all required present | ok |

PASS 34 · FAIL 0 · WARN 6
