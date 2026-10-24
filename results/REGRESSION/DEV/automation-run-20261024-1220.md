# Regression DEV automation run — 2026-10-24 (REG-1220)

## 1. Header

- Run start (UTC): 2026-10-24T05:24:45.839Z
- Run end (UTC): 2026-10-24T05:37:12.827Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /en/library/catalog, /en/library/catalog/qa190-cat-pdf, /en/library/video/qa587-main, /en/library/video/search, /en/products/990586001, /en/top-page, /ja/library/catalog, /ja/library/catalog/qa190-cat-pdf, /ja/library/video/qa587-main, /ja/library/video/search, /ja/product/performance/sustainable/product-index, /ja/products/990586001, /ja/top-page, /master/en/test-space/dsr-570-catalog-detail, /master/en/test-space/dsr552-bc/child/grandchild, /master/en/test-space/product-list, /master/ja/test-space/dsr-570-catalog-detail, /master/ja/test-space/dsr552-bc/child/grandchild
- Build under test: not independently verified; latest recorded deploy dev/2026.10.23_2 b33514f.
- Baseline ID: REG-0820 last measurements; original REG-1620 baseline preserved; previous ledgers snapshotted in measurements.json.
- Automation HEAD commit SHA: 0c3cceddf7bc717cad3575450416d36993539edf
- Exact command: `node results/REGRESSION/run-20261024-1220.cjs > /tmp/reg1220-run.log 2>&1`
- Recovery comparison: `node results/REGRESSION/compare-good-20261024-1220.cjs`
- Postprocessing: `python3 results/REGRESSION/finish-20261024-1220.py`

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| 42 | 36 | 0 | 6 | 0 | 0 | 1 | 0 | 747.0 s |

Proposed outcomes only. Chromium capture script, not npm suite. Three Lighthouse measurements per combination are not retries.

## 4. Executed tests

Duration per capture or sum of three audits.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| VISUAL-top-1440 [ja] | /ja/top-page | pass | 7548 ms | — |
| VISUAL-top-390 [ja] | /ja/top-page | pass | 3888 ms | — |
| VISUAL-top-1440 [en] | /en/top-page | pass | 6466 ms | — |
| VISUAL-top-390 [en] | /en/top-page | pass | 4734 ms | — |
| VISUAL-breadcrumb-1440 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 3216 ms | — |
| VISUAL-breadcrumb-390 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 2420 ms | — |
| VISUAL-breadcrumb-1440 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 2559 ms | — |
| VISUAL-breadcrumb-390 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 2472 ms | — |
| VISUAL-video-detail-1440 [ja] | /ja/library/video/qa587-main | pass | 3084 ms | — |
| VISUAL-video-detail-390 [ja] | /ja/library/video/qa587-main | pass | 2404 ms | — |
| VISUAL-video-detail-1440 [en] | /en/library/video/qa587-main | pass | 2680 ms | — |
| VISUAL-video-detail-390 [en] | /en/library/video/qa587-main | pass | 2404 ms | — |
| VISUAL-video-list-1440 [ja] | /ja/library/video/search | pass | 3838 ms | — |
| VISUAL-video-list-390 [ja] | /ja/library/video/search | pass | 3011 ms | — |
| VISUAL-video-list-1440 [en] | /en/library/video/search | pass | 3699 ms | — |
| VISUAL-video-list-390 [en] | /en/library/video/search | pass | 3533 ms | — |
| VISUAL-catalog-list-1440 [ja] | /ja/library/catalog | pass | 4904 ms | — |
| VISUAL-catalog-list-390 [ja] | /ja/library/catalog | pass | 4532 ms | — |
| VISUAL-catalog-list-1440 [en] | /en/library/catalog | pass | 4059 ms | — |
| VISUAL-catalog-list-390 [en] | /en/library/catalog | pass | 5334 ms | — |
| VISUAL-catalog-detail-1440 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 3701 ms | — |
| VISUAL-catalog-detail-390 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 2827 ms | — |
| VISUAL-catalog-detail-1440 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2720 ms | — |
| VISUAL-catalog-detail-390 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2795 ms | — |
| VISUAL-product-detail-1440 [ja] | /ja/products/990586001 | pass | 3618 ms | — |
| VISUAL-product-detail-390 [ja] | /ja/products/990586001 | pass | 3285 ms | — |
| VISUAL-product-detail-1440 [en] | /en/products/990586001 | pass | 3704 ms | — |
| VISUAL-product-detail-390 [en] | /en/products/990586001 | pass | 3351 ms | — |
| VISUAL-catalog-download-1440 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 2890 ms | — |
| VISUAL-catalog-download-390 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 2516 ms | — |
| LIGHTHOUSE-top-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 61423 ms | — |
| LIGHTHOUSE-top-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 53201 ms | — |
| LIGHTHOUSE-video-detail-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 52470 ms | — |
| LIGHTHOUSE-video-detail-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 52445 ms | — |
| LIGHTHOUSE-catalog-list-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 68655 ms | — |
| LIGHTHOUSE-catalog-list-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 66859 ms | — |

| Page | Device | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|---|---|---|
| top | mobile | 90 | 96 | 96 | 61 | 1659.177 | 0.018359722993602782 | 403 |
| top | desktop | 100 | 91 | 96 | 61 | 429.977 | 0.05351901934864769 | 7.5 |
| video-detail | mobile | 97 | 100 | 96 | 69 | 2269.6860000000006 | 0.008964624281552981 | 141.9999999999999 |
| video-detail | desktop | 99 | 90 | 96 | 69 | 613.787 | 0.05317134958304272 | 6 |
| catalog-list | mobile | 86 | 96 | 96 | 61 | 2678.6202 | 0.009168107733049147 | 338 |
| catalog-list | desktop | 91 | 89 | 96 | 61 | 1203.2437999999997 | 0.057966250649513835 | 0 |

### English video-list timed diagnostics

| Width | Sample | Capture UTC | Title | Cards | Unable to load | GraphQL status | Evidence |
|---|---|---|---|---|---|---|---|
| 1440 | 1 | 2026-10-24T05:26:52.986Z | search | 12 | False | 200 | evidence/REGRESSION/20261024-1220/video-list_en_1440_sample1.png |
| 1440 | 2 | 2026-10-24T05:27:56.539Z | search | 12 | False | 200 | evidence/REGRESSION/20261024-1220/video-list_en_1440_sample2.png |
| 1440 | 3 | 2026-10-24T05:28:59.507Z | search | 12 | False | 200 | evidence/REGRESSION/20261024-1220/video-list_en_1440_sample3.png |
| 390 | 1 | 2026-10-24T05:29:03.024Z | search | 12 | False | 200 | evidence/REGRESSION/20261024-1220/video-list_en_390_sample1.png |
| 390 | 2 | 2026-10-24T05:30:11.401Z | search | 12 | False | 200 | evidence/REGRESSION/20261024-1220/video-list_en_390_sample2.png |
| 390 | 3 | 2026-10-24T05:31:17.421Z | search | 12 | False | 200 | evidence/REGRESSION/20261024-1220/video-list_en_390_sample3.png |

All six samples match the primary captures byte-for-byte and REG-0420 good renders at 0% pixel difference. Response prefixes and console logs are retained in measurements.json.

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| VISUAL-product-list-1440 [ja] | HTTP 404 — language/page skipped per job |
| VISUAL-product-list-390 [ja] | HTTP 404 — language/page skipped per job |
| VISUAL-product-list-1440 [en] | HTTP 404 — language/page skipped per job |
| VISUAL-product-list-390 [en] | HTTP 404 — language/page skipped per job |
| VISUAL-catalog-download-1440 [en] | HTTP 404 — language/page skipped per job |
| VISUAL-catalog-download-390 [en] | HTTP 404 — language/page skipped per job |

## 6. Failed tests

None.

# NEW FAIL
| page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence |
|---|---|---|---|---|---|---|---|
| None | — | — | — | — | — | — | — |

## 7. Open points for QA

- Proposed outcomes only; human QA confirms. No login, AEM writes or form submission.
- P1 only: 36 primary captures plus six English video-list diagnostics, three per width 60 seconds apart. Diagnostic repeats are observations, not additional unique tests.
- Comparisons use REG-0820 last entries; original good-render REG-1620 baseline preserved. Recovery from known Unable to load is not a NEW FAIL.
- Pixel comparison uses RGB max-channel difference >32/255; union of previous/current carousel, video, iframe and time rectangles masked. Compression can introduce residual noise.
- Lighthouse: three runs per page/device; medians compared to REG-0820 last. Performance drop >=10 or LCP rise >=1000 ms are candidates.
- No new deployed change recorded; pending DSR-639/661/649 not attributed. Unexpected differences: unannounced, cause none, confidence 50%. Build and seed content not independently verified.
- Known duplicate QA587 main movie cards are data, excluded from candidate assessment.
- PNG palette compression then JPEG q80 above 300,000 bytes; oversized files not committed, SHA/size retained. Raw Lighthouse /tmp files, test-results/ and playwright-report/ not committed.
- English video-list diagnostics, including request status/body prefix and console logs, are in measurements.json: [{'width': 1440, 'sample': 1, 'at': '2026-10-24T05:26:52.986Z', 'title': 'search', 'cards': 12, 'unable': False}, {'width': 1440, 'sample': 2, 'at': '2026-10-24T05:27:56.539Z', 'title': 'search', 'cards': 12, 'unable': False}, {'width': 1440, 'sample': 3, 'at': '2026-10-24T05:28:59.507Z', 'title': 'search', 'cards': 12, 'unable': False}, {'width': 390, 'sample': 1, 'at': '2026-10-24T05:29:03.024Z', 'title': 'search', 'cards': 12, 'unable': False}, {'width': 390, 'sample': 2, 'at': '2026-10-24T05:30:11.401Z', 'title': 'search', 'cards': 12, 'unable': False}, {'width': 390, 'sample': 3, 'at': '2026-10-24T05:31:17.421Z', 'title': 'search', 'cards': 12, 'unable': False}]
