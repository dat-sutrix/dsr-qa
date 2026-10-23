# lint ykk-dsr/hub/author/manifests/TD-529-META.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 page | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #1 page | ja | PASS | QA page stories/qa* or test-space/qa* (D15) | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-01 |
| L0 | node-name | #1 page | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa529-01 |
| L0 | replicate-values | #1 page | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | publish |
| L0 | page-exists | #1 page | ja | PASS | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-01/jcr:content (no page create, D15) | exists |
| L0 | page-prop:category | #1 page | ja | PASS | allowlisted page property (D15) | category |
| L0 | page-prop-type:category | #1 page | ja | PASS | string or string[] | product |
| L0 | page-prop:robots | #1 page | ja | PASS | allowlisted page property (D15) | robots |
| L0 | page-prop-type:robots | #1 page | ja | PASS | string or string[] |  |
| L0 | path-guard | #1 page | en | PASS | QA page stories/qa* or test-space/qa* (D15) | /content/sites/digital-showroom/master/en/library/article/stories/qa529-01 |
| L0 | node-name | #1 page | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa529-01 |
| L0 | replicate-values | #1 page | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | publish |
| L0 | page-exists | #1 page | en | PASS | /content/sites/digital-showroom/master/en/library/article/stories/qa529-01/jcr:content (no page create, D15) | exists |
| L0 | page-prop:category | #1 page | en | PASS | allowlisted page property (D15) | category |
| L0 | page-prop-type:category | #1 page | en | PASS | string or string[] | product |
| L0 | page-prop:robots | #1 page | en | PASS | allowlisted page property (D15) | robots |
| L0 | page-prop-type:robots | #1 page | en | PASS | string or string[] |  |
| L0 | lang-pair | #2 page | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: TD-529-02 ja only (TestData en/cn column = —)) |
| L0 | path-guard | #2 page | ja | PASS | QA page stories/qa* or test-space/qa* (D15) | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-02 |
| L0 | node-name | #2 page | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa529-02 |
| L0 | replicate-values | #2 page | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | publish |
| L0 | page-exists | #2 page | ja | PASS | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-02/jcr:content (no page create, D15) | exists |
| L0 | page-prop:robots | #2 page | ja | PASS | allowlisted page property (D15) | robots |
| L0 | page-prop-type:robots | #2 page | ja | PASS | string or string[] | noindex, nofollow |

PASS 23 · FAIL 0 · WARN 1
