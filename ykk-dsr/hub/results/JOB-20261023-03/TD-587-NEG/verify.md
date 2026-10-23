# verify ykk-dsr/hub/author/manifests/TD-587-NEG.yaml

| Layer | Check | Item | Lang | Result | Expected | Actual |
|---|---|---|---|---|---|---|
| L1 | exists | #1 content-cf | en | PASS | /content/dam/common/en/movies/qa587-preview | exists |
| L1 | model | #1 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #1 content-cf | en | PASS | qa587-preview | qa587-preview |
| L1 | field:movieTitle | #1 content-cf | en | PASS | QA587 preview | QA587 preview |
| L1 | field:description | #1 content-cf | en | PASS | QA587 line1 ⏎QA587 line2 | QA587 line1 ⏎QA587 line2 |
| L1 | field:thumbnail | #1 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #1 content-cf | en | PASS | youtube | youtube |
| L1 | field:movieSourceId | #1 content-cf | en | PASS | irFRtAVphCY | irFRtAVphCY |
| L1 | field:publishDate | #1 content-cf | en | PASS | 2026-10-23 | 2026-10-23 |
| L2 | replicated:preview | #1 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #1 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #2 content-cf | en | PASS | /content/dam/common/en/movies/qa587-sub | exists |
| L1 | model | #2 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #2 content-cf | en | PASS | qa587-sub | qa587-sub |
| L1 | field:movieTitle | #2 content-cf | en | PASS | QA587 sub | QA587 sub |
| L1 | field:description | #2 content-cf | en | PASS | QA587 line1 ⏎QA587 line2 | QA587 line1 ⏎QA587 line2 |
| L1 | field:thumbnail | #2 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #2 content-cf | en | PASS | youtube | youtube |
| L1 | field:movieSourceId | #2 content-cf | en | PASS | irFRtAVphCY | irFRtAVphCY |
| L1 | field:publishDate | #2 content-cf | en | PASS | 2026-10-23 | 2026-10-23 |
| L2 | replicated:preview | #2 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #2 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #3 content-cf | en | PASS | /content/dam/common/en/movies/qa587-commune-only | exists |
| L1 | model | #3 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #3 content-cf | en | PASS | qa587-commune-only | qa587-commune-only |
| L1 | field:movieTitle | #3 content-cf | en | PASS | QA587 commune only | QA587 commune only |
| L1 | field:description | #3 content-cf | en | PASS | QA587 line1 ⏎QA587 line2 | QA587 line1 ⏎QA587 line2 |
| L1 | field:thumbnail | #3 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #3 content-cf | en | PASS | youtube | youtube |
| L1 | field:movieSourceId | #3 content-cf | en | PASS | irFRtAVphCY | irFRtAVphCY |
| L1 | field:publishDate | #3 content-cf | en | PASS | 2026-10-23 | 2026-10-23 |
| L2 | replicated:preview | #3 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #3 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #4 content-cf | en | PASS | /content/dam/common/en/movies/qa587-unavail | exists |
| L1 | model | #4 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #4 content-cf | en | PASS | qa587-unavail | qa587-unavail |
| L1 | field:movieTitle | #4 content-cf | en | PASS | QA587 unavail | QA587 unavail |
| L1 | field:description | #4 content-cf | en | PASS | QA587 line1 ⏎QA587 line2 | QA587 line1 ⏎QA587 line2 |
| L1 | field:thumbnail | #4 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #4 content-cf | en | PASS | youtube | youtube |
| L1 | field:movieSourceId | #4 content-cf | en | PASS | irFRtAVphCY | irFRtAVphCY |
| L1 | field:publishDate | #4 content-cf | en | PASS | 2026-10-23 | 2026-10-23 |
| L2 | replicated:preview | #4 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #4 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #5 content-cf | en | PASS | /content/dam/common/en/movies/qa587-removed | exists |
| L1 | model | #5 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #5 content-cf | en | PASS | qa587-removed | qa587-removed |
| L1 | field:movieTitle | #5 content-cf | en | PASS | QA587 removed | QA587 removed |
| L1 | field:description | #5 content-cf | en | PASS | QA587 line1 ⏎QA587 line2 | QA587 line1 ⏎QA587 line2 |
| L1 | field:thumbnail | #5 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #5 content-cf | en | PASS | youtube | youtube |
| L1 | field:movieSourceId | #5 content-cf | en | PASS | irFRtAVphCY | irFRtAVphCY |
| L1 | field:publishDate | #5 content-cf | en | PASS | 2026-10-23 | 2026-10-23 |
| L2 | replicated:preview | #5 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #5 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #6 content-cf | en | PASS | /content/dam/common/en/movies/qa587-tt | exists |
| L1 | model | #6 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #6 content-cf | en | PASS | qa587-tt | qa587-tt |
| L1 | field:movieTitle | #6 content-cf | en | PASS | QA587 tech talk | QA587 tech talk |
| L1 | field:description | #6 content-cf | en | PASS | QA587 line1 ⏎QA587 line2 | QA587 line1 ⏎QA587 line2 |
| L1 | field:thumbnail | #6 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #6 content-cf | en | PASS | youtube | youtube |
| L1 | field:movieSourceId | #6 content-cf | en | PASS | irFRtAVphCY | irFRtAVphCY |
| L1 | field:publishDate | #6 content-cf | en | PASS | 2026-10-23 | 2026-10-23 |
| L2 | replicated:preview | #6 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #6 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #7 content-cf | en | PASS | /content/dam/common/en/movies/qa587-inactive | exists |
| L1 | model | #7 content-cf | en | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #7 content-cf | en | PASS | qa587-inactive | qa587-inactive |
| L1 | field:movieTitle | #7 content-cf | en | PASS | QA587 inactive | QA587 inactive |
| L1 | field:description | #7 content-cf | en | PASS | QA587 line1 ⏎QA587 line2 | QA587 line1 ⏎QA587 line2 |
| L1 | field:thumbnail | #7 content-cf | en | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #7 content-cf | en | PASS | youtube | youtube |
| L1 | field:movieSourceId | #7 content-cf | en | PASS | irFRtAVphCY | irFRtAVphCY |
| L1 | field:publishDate | #7 content-cf | en | PASS | 2026-10-23 | 2026-10-23 |
| L2 | replicated:preview | #7 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #7 content-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #7 content-cf | ja | PASS | /content/dam/common/ja/movies/qa587-inactive | exists |
| L1 | model | #7 content-cf | ja | PASS | DM_movie | DM_movie |
| L1 | field:movieId | #7 content-cf | ja | PASS | qa587-inactive | qa587-inactive |
| L1 | field:movieTitle | #7 content-cf | ja | PASS | QA587 inactive | QA587 inactive |
| L1 | field:description | #7 content-cf | ja | PASS | QA587 line1 ⏎QA587 line2 | QA587 line1 ⏎QA587 line2 |
| L1 | field:thumbnail | #7 content-cf | ja | PASS | /content/dam/ykk/digital-showroom/test/png/image 7.png | /content/dam/ykk/digital-showroom/test/png/image 7.png |
| L1 | field:movieSource | #7 content-cf | ja | PASS | youtube | youtube |
| L1 | field:movieSourceId | #7 content-cf | ja | PASS | irFRtAVphCY | irFRtAVphCY |
| L1 | field:publishDate | #7 content-cf | ja | PASS | 2026-10-23 | 2026-10-23 |
| L2 | replicated:preview | #7 content-cf | ja | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #7 content-cf | ja | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #8 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-preview | exists |
| L1 | model | #8 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #8 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #8 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-preview | /content/dam/common/en/movies/qa587-preview |
| L2 | replicated:preview | #8 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L1 | exists | #9 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-inactive | exists |
| L1 | model | #9 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #9 dsr-cf | en | PASS | false | false |
| L1 | field:movie | #9 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-inactive | /content/dam/common/en/movies/qa587-inactive |
| L2 | replicated:preview | #9 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #9 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #9 dsr-cf | ja | PASS | /content/dam/dsr/ja/movies/standard/qa587-inactive | exists |
| L1 | model | #9 dsr-cf | ja | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #9 dsr-cf | ja | PASS | false | false |
| L1 | field:movie | #9 dsr-cf | ja | PASS | /content/dam/common/ja/movies/qa587-inactive | /content/dam/common/ja/movies/qa587-inactive |
| L2 | replicated:preview | #9 dsr-cf | ja | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #9 dsr-cf | ja | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #10 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-unavail | exists |
| L1 | model | #10 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #10 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #10 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-unavail | /content/dam/common/en/movies/qa587-unavail |
| L2 | replicated:preview | #10 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #10 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L1 | exists | #11 dsr-cf | en | PASS | /content/dam/dsr/en/movies/standard/qa587-removed | exists |
| L1 | model | #11 dsr-cf | en | PASS | DM_movie_related | DM_movie_related |
| L1 | field:isActive | #11 dsr-cf | en | PASS | true | true |
| L1 | field:movie | #11 dsr-cf | en | PASS | /content/dam/common/en/movies/qa587-removed | /content/dam/common/en/movies/qa587-removed |
| L2 | replicated:preview | #11 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:28:59 GMT+0000 |
| L2 | replicated:publish | #11 dsr-cf | en | PASS | Activate ≥ 2026-10-23T02:28:31Z (timestamp present) | Activate @ Fri Oct 23 2026 02:29:01 GMT+0000 |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/video/qa587-preview | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | FAIL | 200 + <title> on /en/library/video/qa587-preview | 404; title="Page not found" |
| L3 | delivery:.aem.page | url page | en | PASS | 200 + <title> on /en/library/video/qa587-inactive | 200; title="QA587 inactive \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | en | PASS | 200 + <title> on /en/library/video/qa587-inactive | 200; title="QA587 inactive \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | ja | PASS | 200 + <title> on /ja/library/video/qa587-inactive | 200; title="QA587 inactive \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | ja | PASS | 200 + <title> on /ja/library/video/qa587-inactive | 200; title="QA587 inactive \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/video/qa587-unavail | 200; title="QA587 unavail \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/video/qa587-unavail | 200; title="QA587 unavail \| YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.page | url page | - | PASS | 200 + <title> on /en/library/video/qa587-removed | 200; title="YKK DIGITAL SHOWROOM" |
| L3 | delivery:.aem.live | url live | - | PASS | 200 + <title> on /en/library/video/qa587-removed | 200; title="YKK DIGITAL SHOWROOM" |

PASS 126 · FAIL 1 · WARN 0
