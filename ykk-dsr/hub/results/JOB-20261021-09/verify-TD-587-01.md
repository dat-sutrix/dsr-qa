# verify ykk-dsr/hub/author/manifests/TD-587-01.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | renamed-target | #1 rename | ja | PASS | exists: /content/dam/common/ja/movies/qa587-main | exists |
| L1 | renamed-source-gone | #1 rename | ja | PASS | absent: /content/dam/common/ja/movies/qa-587-main | absent |
| L1 | renamed-target | #2 rename | en | PASS | exists: /content/dam/dsr/en/movies/standard/qa587-main | exists |
| L1 | renamed-source-gone | #2 rename | en | PASS | absent: /content/dam/dsr/en/movies/standard/qa-587-main | absent |
| L1 | renamed-target | #2 rename | ja | PASS | exists: /content/dam/dsr/ja/movies/standard/qa587-main | exists |
| L1 | renamed-source-gone | #2 rename | ja | PASS | absent: /content/dam/dsr/ja/movies/standard/qa-587-main | absent |
| L1 | exists | #3 content-cf | en | PASS | /content/dam/common/en/movies/qa587-main | exists |
| L1 | model | #3 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #3 content-cf | en | PASS | qa587-main | qa587-main |
| L2 | replicated:preview | #3 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #3 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:10:12 GMT+0000 |
| L1 | exists | #3 content-cf | ja | PASS | /content/dam/common/ja/movies/qa587-main | exists |
| L1 | model | #3 content-cf | ja | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #3 content-cf | ja | PASS | qa587-main | qa587-main |
| L2 | replicated:preview | #3 content-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #3 content-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:08:52 GMT+0000 |
| L1 | exists | #4 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-main | exists |
| L1 | model | #4 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #4 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #4 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-main | /content/dam/common/en/movies/qa587-main |
| L2 | replicated:preview | #4 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:06:28 GMT+0000 |
| L2 | replicated:publish | #4 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:06:27 GMT+0000 |
| L1 | exists | #4 dsr-cf | ja | PASS | /content/dam/dsr/ja/movies/standard/qa587-main | exists |
| L1 | model | #4 dsr-cf | ja | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #4 dsr-cf | ja | PASS | true | true |
| L1 | field:movie | #4 dsr-cf | ja | PASS | /content/dam/common/ja/movies/qa587-main | /content/dam/common/ja/movies/qa587-main |
| L2 | replicated:preview | #4 dsr-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:07:56 GMT+0000 |
| L2 | replicated:publish | #4 dsr-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:14:16 GMT+0000 |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/video/qa587-main | 200; title="QA587 main movie \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/video/qa587-main | 200; title="QA587 main movie \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/video/qa587-main | 200; title="QA587 main movie \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/video/qa587-main | 200; title="QA587 main movie \| YKK DIGITAL SHOWROOM" |

PASS 30 · FAIL 2 · WARN 0
