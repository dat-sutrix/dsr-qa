# lint ykk-dsr/hub/author/manifests/P1B-PROBE.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 content-cf | en | WARN | ja+en or lang_pair: false + lang_pair_reason | en (opt-out: write test (P1b probe), no ja pair needed) |
| L0 | path-guard | #1 content-cf | en | PASS | allowed qa* path | /content/dam/common/en/movies/qaagent-probe |
| L0 | node-name | #1 content-cf | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") | qaagent-probe |
| L0 | model-exists | #1 content-cf | en | PASS | DM_movie | /conf/ykk/settings/dam/cfm/models/dm_movie |
| L0 | target-exists | #1 content-cf | en | WARN | CF at /content/dam/common/en/movies/qaagent-probe (or rename item) | missing → would create |
| L0 | field-name:movieId | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieId | #1 content-cf | en | PASS | text | qaagent-probe |
| L0 | field-name:movieTitle | #1 content-cf | en | PASS | field of DM_movie | text |
| L0 | field-type:movieTitle | #1 content-cf | en | PASS | text | QA agent probe |
| L0 | field-name:description | #1 content-cf | en | PASS | field of DM_movie | long-text |
| L0 | field-type:description | #1 content-cf | en | PASS | long-text | QA agent probe |
| L0 | field-name:thumbnail | #1 content-cf | en | PASS | field of DM_movie | content-reference |
| L0 | field-type:thumbnail | #1 content-cf | en | PASS | content-reference | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L0 | field-name:movieSource | #1 content-cf | en | PASS | field of DM_movie | enumeration |
| L0 | field-type:movieSource | #1 content-cf | en | PASS | enumeration | youtube |
| L0 | field-name:publishDate | #1 content-cf | en | PASS | field of DM_movie | date |
| L0 | field-type:publishDate | #1 content-cf | en | PASS | date | 2026-10-22 |
| L0 | id=node-name:movieId | #1 content-cf | en | PASS | qaagent-probe | qaagent-probe |
| L0 | required-fields (create) | #1 content-cf | en | PASS | all required present | ok |
| L0 | ref-exists:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | exists |

PASS 18 · FAIL 0 · WARN 2
