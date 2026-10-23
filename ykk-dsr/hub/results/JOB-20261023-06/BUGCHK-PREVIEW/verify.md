# verify ykk-dsr/hub/results/JOB-20261023-06/BUGCHK-PREVIEW/BUGCHK-PREVIEW.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa587-preview | exists |
| L1 | model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L2 | replicated:preview | #1 content-cf | en | PASS | Activate ≥ 2026-10-23T03:37:27Z (timestamp present) | Activate @ Fri Oct 23 2026 03:37:37 GMT+0000 |
| L1 | exists | #2 content-cf | en | PASS | /content/dam/common/en/catalogs/qa654-preview | exists |
| L1 | model | #2 content-cf | en | PASS | DM_catalog | DM_catalog |
| L2 | replicated:preview | #2 content-cf | en | PASS | Activate ≥ 2026-10-23T03:37:27Z (timestamp present) | Activate @ Fri Oct 23 2026 03:37:37 GMT+0000 |
| L1 | exists | #3 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-preview | exists |
| L1 | model | #3 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L2 | replicated:preview | #3 dsr-cf | en | PASS | Activate ≥ 2026-10-23T03:37:27Z (timestamp present) | Activate @ Fri Oct 23 2026 03:37:38 GMT+0000 |
| L1 | exists | #4 dsr-cf | en | PASS | /content/dam/dsr/en/catalogs/qa654-preview | exists |
| L1 | model | #4 dsr-cf | en | PASS | DM_catalog_related | DM_catalog_related |
| L2 | replicated:preview | #4 dsr-cf | en | PASS | Activate ≥ 2026-10-23T03:37:27Z (timestamp present) | Activate @ Fri Oct 23 2026 03:37:38 GMT+0000 |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/video/qa587-preview | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/catalog/qa654-preview | 200; title="YKK DIGITAL SHOWROOM" |

PASS 14 · FAIL 0 · WARN 0
