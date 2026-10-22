# verify ykk-dsr/hub/author/manifests/P1B-PROBE.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qaagent-probe | exists |
| L1 | model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #1 content-cf | en | PASS | qaagent-probe | qaagent-probe |
| L1 | field:movieTitle | #1 content-cf | en | PASS | QA agent probe | QA agent probe |
| L1 | field:description | #1 content-cf | en | PASS | QA agent probe | QA agent probe |
| L1 | field:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #1 content-cf | en | PASS | youtube | youtube |
| L1 | field:publishDate | #1 content-cf | en | PASS | 2026-10-22 | 2026-10-22 |
| L2 | replicated:preview | #1 content-cf | en | PASS | Activate ≥ 2026-10-22T04:55:17Z (timestamp present) | Activate @ Thu Oct 22 2026 04:55:32 GMT+0000 |

PASS 9 · FAIL 0 · WARN 0
