# verify ykk-dsr/hub/author/manifests/TD-566-FIX.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | page-exists | #1 page | ja | PASS | /content/sites/digital-showroom/master/ja/test-space/qa566-news-01 | exists |
| L1 | prop:publicationdate | #1 page | ja | PASS | 2026-10-01 | 2026-10-01 |
| L1 | component:root/section/title.title | #1 page | ja | PASS | <p>QA566 ニュース詳細テスト</p> | <p>QA566 ニュース詳細テスト</p> |
| L2 | replicated:publish | #1 page | ja | PASS | Activate ≥ 2026-10-23T03:33:54Z (timestamp present) | Activate @ Fri Oct 23 2026 03:33:59 GMT+0000 |
| L1 | page-exists | #1 page | en | PASS | /content/sites/digital-showroom/master/en/test-space/qa566-news-01 | exists |
| L1 | prop:publicationdate | #1 page | en | PASS | 2026-10-01 | 2026-10-01 |
| L1 | component:root/section/title.title | #1 page | en | PASS | <p>QA566 News detail test</p> | <p>QA566 News detail test</p> |
| L2 | replicated:publish | #1 page | en | PASS | Activate ≥ 2026-10-23T03:33:54Z (timestamp present) | Activate @ Fri Oct 23 2026 03:33:59 GMT+0000 |
| L1 | page-exists | #2 page | ja | PASS | /content/sites/digital-showroom/master/ja/test-space/qa566-news-02 | exists |
| L1 | component:root/section/title.title | #2 page | ja | PASS | <p>長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイ</p> | <p>長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイ</p> |
| L2 | replicated:publish | #2 page | ja | PASS | Activate ≥ 2026-10-23T03:33:54Z (timestamp present) | Activate @ Fri Oct 23 2026 03:33:59 GMT+0000 |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /master/ja/test-space/qa566-news-01 | 200; title="QA566 ニュース詳細テスト" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /master/en/test-space/qa566-news-01 | 200; title="QA566 News detail test" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /master/ja/test-space/qa566-news-02 | 200; title="長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイトル長いタイ" |

PASS 14 · FAIL 0 · WARN 0
