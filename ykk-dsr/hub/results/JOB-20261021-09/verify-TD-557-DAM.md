# verify ykk-dsr/hub/author/manifests/TD-557-DAM.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa557-dam | exists |
| L1 | model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #1 content-cf | en | PASS | qa557-dam | qa557-dam |
| L1 | field:movieSource | #1 content-cf | en | PASS | dam | dam |
| L2 | replicated:preview | #1 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:45:24 GMT+0000 |
| L1 | exists | #1 content-cf | ja | PASS | /content/dam/common/ja/movies/qa557-dam | exists |
| L1 | model | #1 content-cf | ja | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #1 content-cf | ja | PASS | qa557-dam | qa557-dam |
| L1 | field:movieSource | #1 content-cf | ja | PASS | dam | dam |
| L2 | replicated:preview | #1 content-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #1 content-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:46:51 GMT+0000 |
| L1 | exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa557-dam | exists |
| L1 | model | #2 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #2 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #2 dsr-cf | en | PASS | /content/dam/common/en/movies/qa557-dam | /content/dam/common/en/movies/qa557-dam |
| L2 | replicated:preview | #2 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #2 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:46:08 GMT+0000 |
| L1 | exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/movies/standard/qa557-dam | exists |
| L1 | model | #2 dsr-cf | ja | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #2 dsr-cf | ja | PASS | true | true |
| L1 | field:movie | #2 dsr-cf | ja | PASS | /content/dam/common/ja/movies/qa557-dam | /content/dam/common/ja/movies/qa557-dam |
| L2 | replicated:preview | #2 dsr-cf | ja | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #2 dsr-cf | ja | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:47:43 GMT+0000 |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/video/qa557-dam | 200; title="QA557 DAM movie \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/video/qa557-dam | 200; title="QA557 DAM movie \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/video/qa557-dam | 200; title="QA557 DAM movie \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/video/qa557-dam | 200; title="QA557 DAM movie \| YKK DIGITAL SHOWROOM" |

PASS 24 · FAIL 4 · WARN 0
