# lint ykk-dsr/hub/author/manifests/TD-566-FIX.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L0 | lang-pair | #1 page | ja | PASS | ja+en | ja+en |
| L0 | path-guard | #1 page | ja | PASS | QA page stories/qa* or test-space/qa* (D15) | /content/sites/digital-showroom/master/ja/test-space/qa566-news-01 |
| L0 | node-name | #1 page | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa566-news-01 |
| L0 | replicate-values | #1 page | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | publish |
| L0 | page-exists | #1 page | ja | PASS | /content/sites/digital-showroom/master/ja/test-space/qa566-news-01/jcr:content (no page create, D15) | exists |
| L0 | page-prop:publicationdate | #1 page | ja | PASS | allowlisted page property (D15) | publicationdate |
| L0 | page-prop-type:publicationdate | #1 page | ja | PASS | YYYY-MM-DD | 2026-10-01 |
| L0 | component-node:root/section/title | #1 page | ja | PASS | root/<…> under jcr:content | root/section/title |
| L0 | component-exists:root/section/title | #1 page | ja | PASS | existing block component (no add/remove/move, D15) | core/franklin/components/block/v1/block |
| L0 | component-prop:root/section/title.title | #1 page | ja | PASS | text\|title (string) | title="<p>QA566 ニュース詳細テスト</p>" |
| L0 | component-prop-live:root/section/title.title | #1 page | ja | PASS | property exists on the live node | <p>タイトルが入ります。タイトルが入ります。</p> |
| L0 | path-guard | #1 page | en | PASS | QA page stories/qa* or test-space/qa* (D15) | /content/sites/digital-showroom/master/en/test-space/qa566-news-01 |
| L0 | node-name | #1 page | en | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa566-news-01 |
| L0 | replicate-values | #1 page | en | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | publish |
| L0 | page-exists | #1 page | en | PASS | /content/sites/digital-showroom/master/en/test-space/qa566-news-01/jcr:content (no page create, D15) | exists |
| L0 | page-prop:publicationdate | #1 page | en | PASS | allowlisted page property (D15) | publicationdate |
| L0 | page-prop-type:publicationdate | #1 page | en | PASS | YYYY-MM-DD | 2026-10-01 |
| L0 | component-node:root/section/title | #1 page | en | PASS | root/<…> under jcr:content | root/section/title |
| L0 | component-exists:root/section/title | #1 page | en | PASS | existing block component (no add/remove/move, D15) | core/franklin/components/block/v1/block |
| L0 | component-prop:root/section/title.title | #1 page | en | PASS | text\|title (string) | title="<p>QA566 News detail test</p>" |
| L0 | component-prop-live:root/section/title.title | #1 page | en | PASS | property exists on the live node | <p>タイトルが入ります。タイトルが入ります。</p> |
| L0 | lang-pair | #2 page | ja | WARN | ja+en or lang_pair: false + lang_pair_reason | ja (opt-out: TD-566-02 ja only (TestData en/cn column = —)) |
| L0 | path-guard | #2 page | ja | PASS | QA page stories/qa* or test-space/qa* (D15) | /content/sites/digital-showroom/master/ja/test-space/qa566-news-02 |
| L0 | node-name | #2 page | ja | PASS | ^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path | qa566-news-02 |
| L0 | replicate-values | #2 page | ja | PASS | preview \| publish \| unpublish-preview \| unpublish-publish (one per tier) | publish |
| L0 | page-exists | #2 page | ja | PASS | /content/sites/digital-showroom/master/ja/test-space/qa566-news-02/jcr:content (no page create, D15) | exists |
| L0 | component-node:root/section/title | #2 page | ja | PASS | root/<…> under jcr:content | root/section/title |
| L0 | component-exists:root/section/title | #2 page | ja | PASS | existing block component (no add/remove/move, D15) | core/franklin/components/block/v1/block |
| L0 | component-prop:root/section/title.title | #2 page | ja | PASS | text\|title (string) | title="<p>長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイ</p>" |
| L0 | component-prop-live:root/section/title.title | #2 page | ja | PASS | property exists on the live node | <p>タイトルが入ります。タイトルが入ります。</p> |

PASS 29 · FAIL 0 · WARN 1
