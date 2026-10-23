# verify ykk-dsr/hub/author/manifests/TD-587-PHASE2.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa587-unavail | exists |
| L1 | model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #1 content-cf | en | PASS | qa587-unavail | qa587-unavail |
| L2 | replicated:unpublish-publish | #1 content-cf | en | PASS | Deactivate ≥ 2026-10-23T03:35:52Z (timestamp present) | Deactivate @ Fri Oct 23 2026 03:35:55 GMT+0000 |
| L1 | exists | #2 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-unavail | exists |
| L1 | model | #2 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #2 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #2 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-unavail | /content/dam/common/en/movies/qa587-unavail |
| L2 | replicated:publish | #2 dsr-cf | en | PASS | Activate ≥ 2026-10-23T03:35:52Z (timestamp present) | Activate @ Fri Oct 23 2026 03:36:07 GMT+0000 |
| L1 | exists | #3 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-removed | exists |
| L1 | model | #3 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #3 dsr-cf | en | PASS | true | true |
| L2 | replicated:unpublish-publish | #3 dsr-cf | en | PASS | Deactivate ≥ 2026-10-23T03:35:52Z (timestamp present) | Deactivate @ Fri Oct 23 2026 03:35:55 GMT+0000 |
| L2 | replicated:unpublish-preview | #3 dsr-cf | en | PASS | Deactivate ≥ 2026-10-23T03:35:52Z (timestamp present) | Deactivate @ Fri Oct 23 2026 03:35:56 GMT+0000 |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/video/qa587-unavail | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/video/qa587-unavail | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 404 on /en/library/video/qa587-removed | 404; title="Page not found" |
| L3 | delivery:.aem.live | url live | - | PASS | 404 on /en/library/video/qa587-removed | 404; title="Page not found" |

PASS 18 · FAIL 0 · WARN 0
