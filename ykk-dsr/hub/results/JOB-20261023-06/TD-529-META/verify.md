# verify ykk-dsr/hub/author/manifests/TD-529-META.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | page-exists | #1 page | ja | PASS | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-01 | exists |
| L1 | prop:category | #1 page | ja | PASS | product | product |
| L1 | prop:robots | #1 page | ja | PASS |  | (absent) |
| L2 | replicated:publish | #1 page | ja | PASS | Activate ≥ 2026-10-23T03:33:47Z (timestamp present) | Activate @ Fri Oct 23 2026 03:33:54 GMT+0000 |
| L1 | page-exists | #1 page | en | PASS | /content/sites/digital-showroom/master/en/library/article/stories/qa529-01 | exists |
| L1 | prop:category | #1 page | en | PASS | product | product |
| L1 | prop:robots | #1 page | en | PASS |  | (absent) |
| L2 | replicated:publish | #1 page | en | PASS | Activate ≥ 2026-10-23T03:33:47Z (timestamp present) | Activate @ Fri Oct 23 2026 03:33:54 GMT+0000 |
| L1 | page-exists | #2 page | ja | PASS | /content/sites/digital-showroom/master/ja/library/article/stories/qa529-02 | exists |
| L1 | prop:robots | #2 page | ja | PASS | noindex, nofollow | noindex, nofollow |
| L2 | replicated:publish | #2 page | ja | PASS | Activate ≥ 2026-10-23T03:33:47Z (timestamp present) | Activate @ Fri Oct 23 2026 03:33:54 GMT+0000 |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /master/ja/library/article/stories/qa529-01 | 200; title="QA529 ストーリー詳細テスト" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /master/en/library/article/stories/qa529-01 | 200; title="QA529 Story detail test" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /master/ja/library/article/stories/qa529-02 | 200; title="QA529 最小記事" |

PASS 14 · FAIL 0 · WARN 0
