# verify ykk-dsr/hub/author/manifests/TD-557-YOUKU.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa557-youku | exists |
| L1 | model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #1 content-cf | en | PASS | qa557-youku | qa557-youku |
| L1 | field:movieTitle | #1 content-cf | en | PASS | QA557 Youku video | QA557 Youku video |
| L1 | field:description | #1 content-cf | en | PASS | QA557 Youku test (DSR-611 Q4) | QA557 Youku test (DSR-611 Q4) |
| L1 | field:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #1 content-cf | en | PASS | youku | youku |
| L1 | field:movieSourceId | #1 content-cf | en | PASS | XNTgyNzE1ODE5Ng== | XNTgyNzE1ODE5Ng== |
| L1 | field:publishDate | #1 content-cf | en | PASS | 2026-10-01 | 2026-10-01 |
| L2 | replicated:preview | #1 content-cf | en | PASS | Activate ≥ 2026-10-23T02:30:51Z (timestamp present) | Activate @ Fri Oct 23 2026 02:31:15 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | en | PASS | Activate ≥ 2026-10-23T02:30:51Z (timestamp present) | Activate @ Fri Oct 23 2026 02:31:17 GMT+0000 |
| L1 | exists | #1 content-cf | ja | PASS | /content/dam/common/ja/movies/qa557-youku | exists |
| L1 | model | #1 content-cf | ja | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #1 content-cf | ja | PASS | qa557-youku | qa557-youku |
| L1 | field:movieTitle | #1 content-cf | ja | PASS | QA557 Youku video | QA557 Youku video |
| L1 | field:description | #1 content-cf | ja | PASS | QA557 Youku test (DSR-611 Q4) | QA557 Youku test (DSR-611 Q4) |
| L1 | field:thumbnail | #1 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #1 content-cf | ja | PASS | youku | youku |
| L1 | field:movieSourceId | #1 content-cf | ja | PASS | XNTgyNzE1ODE5Ng== | XNTgyNzE1ODE5Ng== |
| L1 | field:publishDate | #1 content-cf | ja | PASS | 2026-10-01 | 2026-10-01 |
| L2 | replicated:preview | #1 content-cf | ja | PASS | Activate ≥ 2026-10-23T02:30:51Z (timestamp present) | Activate @ Fri Oct 23 2026 02:31:15 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | ja | PASS | Activate ≥ 2026-10-23T02:30:51Z (timestamp present) | Activate @ Fri Oct 23 2026 02:31:17 GMT+0000 |
| L1 | exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa557-youku | exists |
| L1 | model | #2 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #2 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #2 dsr-cf | en | PASS | /content/dam/common/en/movies/qa557-youku | /content/dam/common/en/movies/qa557-youku |
| L2 | replicated:preview | #2 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:30:51Z (timestamp present) | Activate @ Fri Oct 23 2026 02:31:16 GMT+0000 |
| L2 | replicated:publish | #2 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:30:51Z (timestamp present) | Activate @ Fri Oct 23 2026 02:31:18 GMT+0000 |
| L1 | exists | #2 dsr-cf | ja | PASS | /content/dam/dsr/ja/movies/standard/qa557-youku | exists |
| L1 | model | #2 dsr-cf | ja | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #2 dsr-cf | ja | PASS | true | true |
| L1 | field:movie | #2 dsr-cf | ja | PASS | /content/dam/common/ja/movies/qa557-youku | /content/dam/common/ja/movies/qa557-youku |
| L2 | replicated:preview | #2 dsr-cf | ja | PASS | Activate ≥ 2026-10-23T02:30:51Z (timestamp present) | Activate @ Fri Oct 23 2026 02:31:16 GMT+0000 |
| L2 | replicated:publish | #2 dsr-cf | ja | PASS | Activate ≥ 2026-10-23T02:30:51Z (timestamp present) | Activate @ Fri Oct 23 2026 02:31:18 GMT+0000 |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/video/qa557-youku | 200; title="QA557 Youku video \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/video/qa557-youku | 200; title="QA557 Youku video \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/video/qa557-youku | 200; title="QA557 Youku video \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/video/qa557-youku | 200; title="QA557 Youku video \| YKK DIGITAL SHOWROOM" |

PASS 38 · FAIL 0 · WARN 0
