# lint ykk-dsr/hub/author/manifests/REPUBLISH-OVL-20261022.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #1 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa190-cat-ebook |
| L0 | node-name | #1 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook |
| L0 | model-exists | #1 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #1 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-ebook | patch |
| L0 | live-model | #1 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #1 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #1 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #2 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #2 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa190-cat-ebook-form |
| L0 | node-name | #2 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook-form |
| L0 | model-exists | #2 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-ebook-form | patch |
| L0 | live-model | #2 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #2 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #2 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #3 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #3 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa190-cat-pdf |
| L0 | node-name | #3 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf |
| L0 | model-exists | #3 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #3 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-pdf | patch |
| L0 | live-model | #3 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #3 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #3 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #4 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #4 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa190-cat-pdf-form |
| L0 | node-name | #4 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf-form |
| L0 | model-exists | #4 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #4 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa190-cat-pdf-form | patch |
| L0 | live-model | #4 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #4 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #4 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #5 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #5 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa654-content-unpub |
| L0 | node-name | #5 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-content-unpub |
| L0 | model-exists | #5 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #5 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-content-unpub | patch |
| L0 | live-model | #5 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #5 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #5 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #6 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #6 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa654-inactive |
| L0 | node-name | #6 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-inactive |
| L0 | model-exists | #6 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #6 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-inactive | patch |
| L0 | live-model | #6 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #6 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #6 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #7 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #7 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa654-preview |
| L0 | node-name | #7 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-preview |
| L0 | model-exists | #7 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #7 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-preview | patch |
| L0 | live-model | #7 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #7 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #7 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #8 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #8 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/catalogs/qa654-update |
| L0 | node-name | #8 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-update |
| L0 | model-exists | #8 dsr-cf | en | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #8 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-update | patch |
| L0 | live-model | #8 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #8 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #8 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #9 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #9 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa501-main-a |
| L0 | node-name | #9 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa501-main-a |
| L0 | model-exists | #9 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #9 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa501-main-a | patch |
| L0 | live-model | #9 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #9 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #9 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #10 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #10 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa501-main-b |
| L0 | node-name | #10 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa501-main-b |
| L0 | model-exists | #10 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #10 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa501-main-b | patch |
| L0 | live-model | #10 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #10 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #10 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #11 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #11 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa557-dam |
| L0 | node-name | #11 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-dam |
| L0 | model-exists | #11 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #11 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa557-dam | patch |
| L0 | live-model | #11 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #11 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #11 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #12 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #12 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-main |
| L0 | node-name | #12 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | model-exists | #12 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #12 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-main | patch |
| L0 | live-model | #12 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #12 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #12 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #13 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #13 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-off |
| L0 | node-name | #13 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-off |
| L0 | model-exists | #13 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #13 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-off | patch |
| L0 | live-model | #13 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #13 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #13 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #14 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #14 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-r1 |
| L0 | node-name | #14 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-r1 |
| L0 | model-exists | #14 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #14 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r1 | patch |
| L0 | live-model | #14 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #14 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #14 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #15 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #15 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-r2 |
| L0 | node-name | #15 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-r2 |
| L0 | model-exists | #15 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #15 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r2 | patch |
| L0 | live-model | #15 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #15 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #15 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #16 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #16 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-r3 |
| L0 | node-name | #16 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-r3 |
| L0 | model-exists | #16 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #16 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r3 | patch |
| L0 | live-model | #16 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #16 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #16 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #17 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #17 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-r4 |
| L0 | node-name | #17 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-r4 |
| L0 | model-exists | #17 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #17 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r4 | patch |
| L0 | live-model | #17 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #17 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #17 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #18 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #18 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-r5 |
| L0 | node-name | #18 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-r5 |
| L0 | model-exists | #18 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #18 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r5 | patch |
| L0 | live-model | #18 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #18 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #18 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #19 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #19 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-r6 |
| L0 | node-name | #19 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-r6 |
| L0 | model-exists | #19 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #19 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r6 | patch |
| L0 | live-model | #19 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #19 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #19 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #20 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #20 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-rel-a |
| L0 | node-name | #20 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-rel-a |
| L0 | model-exists | #20 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #20 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-rel-a | patch |
| L0 | live-model | #20 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #20 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #20 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #21 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: republish of the existing en CF only (no data change)) |
| L0 | path-guard | #21 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-rel-b |
| L0 | node-name | #21 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-rel-b |
| L0 | model-exists | #21 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #21 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-rel-b | patch |
| L0 | live-model | #21 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #21 dsr-cf | en | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #21 dsr-cf | en | PASS | all required present | ok |
| L0 | lang-pair | #22 dsr-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: republish of the existing ja CF only (no data change)) |
| L0 | path-guard | #22 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa190-cat-ebook |
| L0 | node-name | #22 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook |
| L0 | model-exists | #22 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #22 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-ebook | patch |
| L0 | live-model | #22 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #22 dsr-cf | ja | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #22 dsr-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #23 dsr-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: republish of the existing ja CF only (no data change)) |
| L0 | path-guard | #23 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa190-cat-ebook-form |
| L0 | node-name | #23 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-ebook-form |
| L0 | model-exists | #23 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #23 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-ebook-form | patch |
| L0 | live-model | #23 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #23 dsr-cf | ja | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #23 dsr-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #24 dsr-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: republish of the existing ja CF only (no data change)) |
| L0 | path-guard | #24 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa190-cat-pdf |
| L0 | node-name | #24 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf |
| L0 | model-exists | #24 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #24 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-pdf | patch |
| L0 | live-model | #24 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #24 dsr-cf | ja | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #24 dsr-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #25 dsr-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: republish of the existing ja CF only (no data change)) |
| L0 | path-guard | #25 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa190-cat-pdf-form |
| L0 | node-name | #25 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa190-cat-pdf-form |
| L0 | model-exists | #25 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #25 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa190-cat-pdf-form | patch |
| L0 | live-model | #25 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #25 dsr-cf | ja | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #25 dsr-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #26 dsr-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: republish of the existing ja CF only (no data change)) |
| L0 | path-guard | #26 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/catalogs/qa654-inactive |
| L0 | node-name | #26 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa654-inactive |
| L0 | model-exists | #26 dsr-cf | ja | PASS | DM_catalog_related | /conf/ykk/settings/dam/cfm/models/dm_catalog_related |
| L0 | target-exists | #26 dsr-cf | ja | PASS | /content/dam/dsr/ja/catalogs/qa654-inactive | patch |
| L0 | live-model | #26 dsr-cf | ja | PASS | DM_catalog_related | DM_catalog_related |
| L0 | flag-set:isActive | #26 dsr-cf | ja | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #26 dsr-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #27 dsr-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: republish of the existing ja CF only (no data change)) |
| L0 | path-guard | #27 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/movies/standard/qa557-dam |
| L0 | node-name | #27 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa557-dam |
| L0 | model-exists | #27 dsr-cf | ja | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #27 dsr-cf | ja | PASS | /content/dam/dsr/ja/movies/standard/qa557-dam | patch |
| L0 | live-model | #27 dsr-cf | ja | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #27 dsr-cf | ja | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #27 dsr-cf | ja | PASS | all required present | ok |
| L0 | lang-pair | #28 dsr-cf | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: republish of the existing ja CF only (no data change)) |
| L0 | path-guard | #28 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/movies/standard/qa587-main |
| L0 | node-name | #28 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-main |
| L0 | model-exists | #28 dsr-cf | ja | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #28 dsr-cf | ja | PASS | /content/dam/dsr/ja/movies/standard/qa587-main | patch |
| L0 | live-model | #28 dsr-cf | ja | PASS | DM_movie_related | DM_movie_related |
| L0 | flag-set:isActive | #28 dsr-cf | ja | WARN | isActive set in manifest | not set |
| L0 | required-fields (patch) | #28 dsr-cf | ja | PASS | all required present | ok |

PASS 168 · FAIL 0 · WARN 56
