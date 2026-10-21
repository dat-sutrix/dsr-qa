# verify ykk-dsr/hub/author/manifests/TD-587-14-15.resolved.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa587-r1 | exists |
| L1 | model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #1 content-cf | en | PASS | qa587-r1 | qa587-r1 |
| L2 | replicated:preview | #1 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:19:40 GMT+0000 |
| L1 | exists | #2 content-cf | en | PASS | /content/dam/common/en/movies/qa587-r2 | exists |
| L1 | model | #2 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #2 content-cf | en | PASS | qa587-r2 | qa587-r2 |
| L2 | replicated:preview | #2 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #2 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:22:41 GMT+0000 |
| L1 | exists | #3 content-cf | en | PASS | /content/dam/common/en/movies/qa587-r3 | exists |
| L1 | model | #3 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #3 content-cf | en | PASS | qa587-r3 | qa587-r3 |
| L2 | replicated:preview | #3 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #3 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:24:11 GMT+0000 |
| L1 | exists | #4 content-cf | en | PASS | /content/dam/common/en/movies/qa587-r4 | exists |
| L1 | model | #4 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #4 content-cf | en | PASS | qa587-r4 | qa587-r4 |
| L2 | replicated:preview | #4 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #4 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:25:39 GMT+0000 |
| L1 | exists | #5 content-cf | en | PASS | /content/dam/common/en/movies/qa587-r5 | exists |
| L1 | model | #5 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #5 content-cf | en | PASS | qa587-r5 | qa587-r5 |
| L2 | replicated:preview | #5 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #5 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:26:48 GMT+0000 |
| L1 | exists | #6 content-cf | en | PASS | /content/dam/common/en/movies/qa587-r6 | exists |
| L1 | model | #6 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #6 content-cf | en | PASS | qa587-r6 | qa587-r6 |
| L2 | replicated:preview | #6 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #6 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:28:18 GMT+0000 |
| L1 | exists | #7 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r1 | exists |
| L1 | model | #7 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #7 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #7 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-r1 | /content/dam/common/en/movies/qa587-r1 |
| L2 | replicated:preview | #7 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #7 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:21:24 GMT+0000 |
| L1 | exists | #8 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r2 | exists |
| L1 | model | #8 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #8 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #8 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-r2 | /content/dam/common/en/movies/qa587-r2 |
| L2 | replicated:preview | #8 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #8 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:23:14 GMT+0000 |
| L1 | exists | #9 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r3 | exists |
| L1 | model | #9 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #9 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #9 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-r3 | /content/dam/common/en/movies/qa587-r3 |
| L2 | replicated:preview | #9 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #9 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:25:08 GMT+0000 |
| L1 | exists | #10 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r4 | exists |
| L1 | model | #10 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #10 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #10 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-r4 | /content/dam/common/en/movies/qa587-r4 |
| L2 | replicated:preview | #10 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #10 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:26:07 GMT+0000 |
| L1 | exists | #11 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r5 | exists |
| L1 | model | #11 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #11 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #11 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-r5 | /content/dam/common/en/movies/qa587-r5 |
| L2 | replicated:preview | #11 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #11 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:27:39 GMT+0000 |
| L1 | exists | #12 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-r6 | exists |
| L1 | model | #12 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #12 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #12 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-r6 | /content/dam/common/en/movies/qa587-r6 |
| L2 | replicated:preview | #12 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #12 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:28:47 GMT+0000 |
| L1 | exists | #13 content-cf | en | PASS | /content/dam/common/en/movies/qa587-rel-a | exists |
| L1 | model | #13 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #13 content-cf | en | PASS | qa587-rel-a | qa587-rel-a |
| L1 | field:relatedMovies | #13 content-cf | en | PASS | ["/content/dam/common/en/movies/qa587-r1","/content/dam/common/en/movies/qa587-r2","/content/dam/common/en/movies/qa587-r3","/content/dam/common/en/movies/qa587 | ["/content/dam/common/en/movies/qa587-r1","/content/dam/common/en/movies/qa587-r2","/content/dam/common/en/movies/qa587-r3","/content/dam/common/en/movies/qa587 |
| L2 | replicated:preview | #13 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #13 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:32:09 GMT+0000 |
| L1 | exists | #14 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-rel-a | exists |
| L1 | model | #14 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #14 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #14 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-rel-a | /content/dam/common/en/movies/qa587-rel-a |
| L2 | replicated:preview | #14 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 08:08:23 GMT+0000 |
| L2 | replicated:publish | #14 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:30:04 GMT+0000 |
| L1 | exists | #15 content-cf | en | PASS | /content/dam/common/en/movies/qa587-off | exists |
| L1 | model | #15 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #15 content-cf | en | PASS | qa587-off | qa587-off |
| L1 | field:isUnavailable | #15 content-cf | en | PASS | true | true |
| L2 | replicated:preview | #15 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #15 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:35:40 GMT+0000 |
| L1 | exists | #16 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-off | exists |
| L1 | model | #16 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #16 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #16 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-off | /content/dam/common/en/movies/qa587-off |
| L2 | replicated:preview | #16 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ none |
| L2 | replicated:publish | #16 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:38:30 GMT+0000 |
| L1 | exists | #17 content-cf | en | PASS | /content/dam/common/en/movies/qa587-rel-b | exists |
| L1 | model | #17 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #17 content-cf | en | PASS | qa587-rel-b | qa587-rel-b |
| L1 | field:relatedMovies | #17 content-cf | en | PASS | ["/content/dam/common/en/movies/qa587-r1","/content/dam/common/en/movies/qa587-off"] | ["/content/dam/common/en/movies/qa587-r1","/content/dam/common/en/movies/qa587-off"] |
| L2 | replicated:preview | #17 content-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | none @ none |
| L2 | replicated:publish | #17 content-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:40:12 GMT+0000 |
| L1 | exists | #18 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-rel-b | exists |
| L1 | model | #18 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #18 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #18 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-rel-b | /content/dam/common/en/movies/qa587-rel-b |
| L2 | replicated:preview | #18 dsr-cf | en | FAIL | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ none |
| L2 | replicated:publish | #18 dsr-cf | en | PASS | Activate ≥ 2026-10-21T10:00:00Z (timestamp present) | Activate @ Wed Oct 21 2026 13:42:49 GMT+0000 |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/video/qa587-rel-a | 200; title="QA587 rel A \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/video/qa587-rel-a | 200; title="QA587 rel A \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/video/qa587-rel-b | 200; title="QA587 rel B \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/video/qa587-rel-b | 200; title="QA587 rel B \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/video/qa587-r1 | 200; title="QA587 related 1 \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/video/qa587-r1 | 200; title="QA587 related 1 \| YKK DIGITAL SHOWROOM" |

PASS 90 · FAIL 18 · WARN 0
