# lint ykk-dsr/hub/author/manifests/TD-587-NEG.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-02 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa587-preview |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-preview |
| L0 | model-exists | #1 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #1 content-cf | en | WARN | CF at /content/dam/common/en/movies/qa587-preview (or rename item) | missing → would create |
| L0 | field-name:movieId | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #1 content-cf | en | PASS | text | qa587-preview |
| L0 | field-name:movieTitle | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #1 content-cf | en | PASS | text | QA587 preview |
| L0 | field-name:description | #1 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #1 content-cf | en | PASS | long-text | QA587 line1 ⏎QA587 line2 |
| L0 | field-name:thumbnail | #1 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #1 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #1 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #1 content-cf | en | PASS | enumeration | youtube |
| L0 | field-name:movieSourceId | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #1 content-cf | en | PASS | text | irFRtAVphCY |
| L0 | field-name:publishDate | #1 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #1 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:movieId | #1 content-cf | en | PASS | qa587-preview | qa587-preview |
| L0 | required-fields (create) | #1 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | lang-pair | #2 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-05 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #2 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa587-sub |
| L0 | node-name | #2 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-sub |
| L0 | model-exists | #2 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #2 content-cf | en | WARN | CF at /content/dam/common/en/movies/qa587-sub (or rename item) | missing → would create |
| L0 | field-name:movieId | #2 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #2 content-cf | en | PASS | text | qa587-sub |
| L0 | field-name:movieTitle | #2 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #2 content-cf | en | PASS | text | QA587 sub |
| L0 | field-name:description | #2 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #2 content-cf | en | PASS | long-text | QA587 line1 ⏎QA587 line2 |
| L0 | field-name:thumbnail | #2 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #2 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #2 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #2 content-cf | en | PASS | enumeration | youtube |
| L0 | field-name:movieSourceId | #2 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #2 content-cf | en | PASS | text | irFRtAVphCY |
| L0 | field-name:publishDate | #2 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #2 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:movieId | #2 content-cf | en | PASS | qa587-sub | qa587-sub |
| L0 | required-fields (create) | #2 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #2 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | lang-pair | #3 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-06 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #3 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa587-commune-only |
| L0 | node-name | #3 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-commune-only |
| L0 | model-exists | #3 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #3 content-cf | en | WARN | CF at /content/dam/common/en/movies/qa587-commune-only (or rename item) | missing → would create |
| L0 | field-name:movieId | #3 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #3 content-cf | en | PASS | text | qa587-commune-only |
| L0 | field-name:movieTitle | #3 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #3 content-cf | en | PASS | text | QA587 commune only |
| L0 | field-name:description | #3 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #3 content-cf | en | PASS | long-text | QA587 line1 ⏎QA587 line2 |
| L0 | field-name:thumbnail | #3 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #3 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #3 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #3 content-cf | en | PASS | enumeration | youtube |
| L0 | field-name:movieSourceId | #3 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #3 content-cf | en | PASS | text | irFRtAVphCY |
| L0 | field-name:publishDate | #3 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #3 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:movieId | #3 content-cf | en | PASS | qa587-commune-only | qa587-commune-only |
| L0 | required-fields (create) | #3 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #3 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | lang-pair | #4 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-08 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #4 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa587-unavail |
| L0 | node-name | #4 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-unavail |
| L0 | model-exists | #4 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #4 content-cf | en | WARN | CF at /content/dam/common/en/movies/qa587-unavail (or rename item) | missing → would create |
| L0 | field-name:movieId | #4 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #4 content-cf | en | PASS | text | qa587-unavail |
| L0 | field-name:movieTitle | #4 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #4 content-cf | en | PASS | text | QA587 unavail |
| L0 | field-name:description | #4 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #4 content-cf | en | PASS | long-text | QA587 line1 ⏎QA587 line2 |
| L0 | field-name:thumbnail | #4 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #4 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #4 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #4 content-cf | en | PASS | enumeration | youtube |
| L0 | field-name:movieSourceId | #4 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #4 content-cf | en | PASS | text | irFRtAVphCY |
| L0 | field-name:publishDate | #4 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #4 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:movieId | #4 content-cf | en | PASS | qa587-unavail | qa587-unavail |
| L0 | required-fields (create) | #4 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #4 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | lang-pair | #5 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-10 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #5 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa587-removed |
| L0 | node-name | #5 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-removed |
| L0 | model-exists | #5 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #5 content-cf | en | WARN | CF at /content/dam/common/en/movies/qa587-removed (or rename item) | missing → would create |
| L0 | field-name:movieId | #5 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #5 content-cf | en | PASS | text | qa587-removed |
| L0 | field-name:movieTitle | #5 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #5 content-cf | en | PASS | text | QA587 removed |
| L0 | field-name:description | #5 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #5 content-cf | en | PASS | long-text | QA587 line1 ⏎QA587 line2 |
| L0 | field-name:thumbnail | #5 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #5 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #5 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #5 content-cf | en | PASS | enumeration | youtube |
| L0 | field-name:movieSourceId | #5 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #5 content-cf | en | PASS | text | irFRtAVphCY |
| L0 | field-name:publishDate | #5 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #5 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:movieId | #5 content-cf | en | PASS | qa587-removed | qa587-removed |
| L0 | required-fields (create) | #5 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #5 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | lang-pair | #6 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-12 en only (TestData ja/cn column = —)) |
| L0 | path-guard | #6 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa587-tt |
| L0 | node-name | #6 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-tt |
| L0 | model-exists | #6 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #6 content-cf | en | WARN | CF at /content/dam/common/en/movies/qa587-tt (or rename item) | missing → would create |
| L0 | field-name:movieId | #6 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #6 content-cf | en | PASS | text | qa587-tt |
| L0 | field-name:movieTitle | #6 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #6 content-cf | en | PASS | text | QA587 tech talk |
| L0 | field-name:description | #6 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #6 content-cf | en | PASS | long-text | QA587 line1 ⏎QA587 line2 |
| L0 | field-name:thumbnail | #6 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #6 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #6 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #6 content-cf | en | PASS | enumeration | youtube |
| L0 | field-name:movieSourceId | #6 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #6 content-cf | en | PASS | text | irFRtAVphCY |
| L0 | field-name:publishDate | #6 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #6 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:movieId | #6 content-cf | en | PASS | qa587-tt | qa587-tt |
| L0 | required-fields (create) | #6 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #6 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | lang-pair | #7 content-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #7 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qa587-inactive |
| L0 | node-name | #7 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-inactive |
| L0 | model-exists | #7 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #7 content-cf | en | WARN | CF at /content/dam/common/en/movies/qa587-inactive (or rename item) | missing → would create |
| L0 | field-name:movieId | #7 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #7 content-cf | en | PASS | text | qa587-inactive |
| L0 | field-name:movieTitle | #7 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #7 content-cf | en | PASS | text | QA587 inactive |
| L0 | field-name:description | #7 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #7 content-cf | en | PASS | long-text | QA587 line1 ⏎QA587 line2 |
| L0 | field-name:thumbnail | #7 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #7 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #7 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #7 content-cf | en | PASS | enumeration | youtube |
| L0 | field-name:movieSourceId | #7 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #7 content-cf | en | PASS | text | irFRtAVphCY |
| L0 | field-name:publishDate | #7 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #7 content-cf | en | PASS | date | 2026-10-23 |
| L0 | id=node-name:movieId | #7 content-cf | en | PASS | qa587-inactive | qa587-inactive |
| L0 | required-fields (create) | #7 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #7 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | path-guard | #7 content-cf | ja | PASS | allowed qa* path | /content/dam/common/ja/movies/qa587-inactive |
| L0 | node-name | #7 content-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-inactive |
| L0 | model-exists | #7 content-cf | ja | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #7 content-cf | ja | WARN | CF at /content/dam/common/ja/movies/qa587-inactive (or rename item) | missing → would create |
| L0 | field-name:movieId | #7 content-cf | ja | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #7 content-cf | ja | PASS | text | qa587-inactive |
| L0 | field-name:movieTitle | #7 content-cf | ja | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #7 content-cf | ja | PASS | text | QA587 inactive |
| L0 | field-name:description | #7 content-cf | ja | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #7 content-cf | ja | PASS | long-text | QA587 line1 ⏎QA587 line2 |
| L0 | field-name:thumbnail | #7 content-cf | ja | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #7 content-cf | ja | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #7 content-cf | ja | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #7 content-cf | ja | PASS | enumeration | youtube |
| L0 | field-name:movieSourceId | #7 content-cf | ja | PASS | field of DM_movie | text |
| L0 | field-type:movieSourceId | #7 content-cf | ja | PASS | text | irFRtAVphCY |
| L0 | field-name:publishDate | #7 content-cf | ja | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #7 content-cf | ja | PASS | date | 2026-10-23 |
| L0 | id=node-name:movieId | #7 content-cf | ja | PASS | qa587-inactive | qa587-inactive |
| L0 | required-fields (create) | #7 content-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #7 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |
| L0 | lang-pair | #8 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-02 en only) |
| L0 | path-guard | #8 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-preview |
| L0 | node-name | #8 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-preview |
| L0 | model-exists | #8 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #8 dsr-cf | en | WARN | CF at /content/dam/dsr/en/movies/standard/qa587-preview (or rename item) | missing → would create |
| L0 | field-name:isActive | #8 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #8 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:movie | #8 dsr-cf | en | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #8 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/movies/qa587-preview |
| L0 | flag-set:isActive | #8 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #8 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:movie | #8 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-preview | in manifest |
| L0 | lang-pair | #9 dsr-cf | en | PASS | ja+en | en+ja |
| L0 | path-guard | #9 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-inactive |
| L0 | node-name | #9 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-inactive |
| L0 | model-exists | #9 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #9 dsr-cf | en | WARN | CF at /content/dam/dsr/en/movies/standard/qa587-inactive (or rename item) | missing → would create |
| L0 | field-name:isActive | #9 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #9 dsr-cf | en | PASS | boolean | false |
| L0 | field-name:movie | #9 dsr-cf | en | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #9 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/movies/qa587-inactive |
| L0 | flag-set:isActive | #9 dsr-cf | en | PASS | isActive set in manifest | false |
| L0 | required-fields (create) | #9 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:movie | #9 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-inactive | in manifest |
| L0 | path-guard | #9 dsr-cf | ja | PASS | allowed qa* path | /content/dam/dsr/ja/movies/standard/qa587-inactive |
| L0 | node-name | #9 dsr-cf | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-inactive |
| L0 | model-exists | #9 dsr-cf | ja | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #9 dsr-cf | ja | WARN | CF at /content/dam/dsr/ja/movies/standard/qa587-inactive (or rename item) | missing → would create |
| L0 | field-name:isActive | #9 dsr-cf | ja | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #9 dsr-cf | ja | PASS | boolean | false |
| L0 | field-name:movie | #9 dsr-cf | ja | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #9 dsr-cf | ja | PASS | content-fragment | /content/dam/common/ja/movies/qa587-inactive |
| L0 | flag-set:isActive | #9 dsr-cf | ja | PASS | isActive set in manifest | false |
| L0 | required-fields (create) | #9 dsr-cf | ja | PASS | all required present | ok |
| L0 | ref-exists:movie | #9 dsr-cf | ja | PASS | /content/dam/common/ja/movies/qa587-inactive | in manifest |
| L0 | lang-pair | #10 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-08/10 en only) |
| L0 | path-guard | #10 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-unavail |
| L0 | node-name | #10 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-unavail |
| L0 | model-exists | #10 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #10 dsr-cf | en | WARN | CF at /content/dam/dsr/en/movies/standard/qa587-unavail (or rename item) | missing → would create |
| L0 | field-name:isActive | #10 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #10 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:movie | #10 dsr-cf | en | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #10 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/movies/qa587-unavail |
| L0 | flag-set:isActive | #10 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #10 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:movie | #10 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-unavail | in manifest |
| L0 | lang-pair | #11 dsr-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: TD-587-08/10 en only) |
| L0 | path-guard | #11 dsr-cf | en | PASS | allowed qa* path | /content/dam/dsr/en/movies/standard/qa587-removed |
| L0 | node-name | #11 dsr-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qa587-removed |
| L0 | model-exists | #11 dsr-cf | en | PASS | DM_movie_related | /conf/ykk/settings/dam/cfm/models/dm_movie_related |
| L0 | target-exists | #11 dsr-cf | en | WARN | CF at /content/dam/dsr/en/movies/standard/qa587-removed (or rename item) | missing → would create |
| L0 | field-name:isActive | #11 dsr-cf | en | PASS | field of DM_movie_related | boolean |
| L0 | field-type:isActive | #11 dsr-cf | en | PASS | boolean | true |
| L0 | field-name:movie | #11 dsr-cf | en | PASS | field of DM_movie_related | content-fragment |
| L0 | field-type:movie | #11 dsr-cf | en | PASS | content-fragment | /content/dam/common/en/movies/qa587-removed |
| L0 | flag-set:isActive | #11 dsr-cf | en | PASS | isActive set in manifest | true |
| L0 | required-fields (create) | #11 dsr-cf | en | PASS | all required present | ok |
| L0 | ref-exists:movie | #11 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-removed | in manifest |

PASS 212 · FAIL 0 · WARN 22
