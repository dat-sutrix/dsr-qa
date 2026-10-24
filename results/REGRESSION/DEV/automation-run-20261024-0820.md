# Regression DEV automation run — 2026-10-24 (REG-0820)

## 1. Header

- Run start (UTC): 2026-10-24T01:23:36.759Z
- Run end (UTC): 2026-10-24T01:32:55.650Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /en/library/catalog, /en/library/catalog/qa190-cat-pdf, /en/library/video/qa587-main, /en/library/video/search, /en/products/990586001, /en/top-page, /ja/library/catalog, /ja/library/catalog/qa190-cat-pdf, /ja/library/video/qa587-main, /ja/library/video/search, /ja/product/performance/sustainable/product-index, /ja/products/990586001, /ja/top-page, /master/en/test-space/dsr-570-catalog-detail, /master/en/test-space/dsr552-bc/child/grandchild, /master/en/test-space/product-list, /master/ja/test-space/dsr-570-catalog-detail, /master/ja/test-space/dsr552-bc/child/grandchild
- Build under test: not independently verified; latest recorded deploy dev/2026.10.23_2 b33514f.
- Baseline ID: REG-0420 last measurements; original REG-1620 baseline preserved; previous ledgers snapshotted in measurements.json.
- Automation HEAD commit SHA: a8a4e34ae6cf2325e6ca17ea1ac30a70ccfddc5f
- Exact command: `node results/REGRESSION/run-20261024-0820.cjs > /tmp/reg0820-run.log 2>&1`
- Postprocessing: `python3 results/REGRESSION/finish-20261024-0820.py`

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| 42 | 34 | 2 | 6 | 0 | 0 | 1 | 0 | 558.9 s |

Proposed outcomes only. Chromium capture script, not npm suite. Three Lighthouse measurements per combination are not retries.

## 4. Executed tests

Duration per capture or sum of three audits.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| VISUAL-top-1440 [ja] | /ja/top-page | pass | 9945 ms | — |
| VISUAL-top-390 [ja] | /ja/top-page | pass | 6841 ms | — |
| VISUAL-top-1440 [en] | /en/top-page | pass | 9129 ms | — |
| VISUAL-top-390 [en] | /en/top-page | pass | 7136 ms | — |
| VISUAL-breadcrumb-1440 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 4955 ms | — |
| VISUAL-breadcrumb-390 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 4596 ms | — |
| VISUAL-breadcrumb-1440 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 4722 ms | — |
| VISUAL-breadcrumb-390 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 4744 ms | — |
| VISUAL-video-detail-1440 [ja] | /ja/library/video/qa587-main | pass | 6204 ms | — |
| VISUAL-video-detail-390 [ja] | /ja/library/video/qa587-main | pass | 5572 ms | — |
| VISUAL-video-detail-1440 [en] | /en/library/video/qa587-main | pass | 6022 ms | — |
| VISUAL-video-detail-390 [en] | /en/library/video/qa587-main | pass | 5457 ms | — |
| VISUAL-video-list-1440 [ja] | /ja/library/video/search | pass | 7411 ms | — |
| VISUAL-video-list-390 [ja] | /ja/library/video/search | pass | 8295 ms | — |
| VISUAL-video-list-1440 [en] | /en/library/video/search | fail | 5696 ms | NEW FAIL candidate: title, pixel diff % |
| VISUAL-video-list-390 [en] | /en/library/video/search | fail | 5489 ms | NEW FAIL candidate: title, pixel diff % |
| VISUAL-catalog-list-1440 [ja] | /ja/library/catalog | pass | 7844 ms | — |
| VISUAL-catalog-list-390 [ja] | /ja/library/catalog | pass | 7673 ms | — |
| VISUAL-catalog-list-1440 [en] | /en/library/catalog | pass | 7196 ms | — |
| VISUAL-catalog-list-390 [en] | /en/library/catalog | pass | 7076 ms | — |
| VISUAL-catalog-detail-1440 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 5645 ms | — |
| VISUAL-catalog-detail-390 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 5444 ms | — |
| VISUAL-catalog-detail-1440 [en] | /en/library/catalog/qa190-cat-pdf | pass | 5653 ms | — |
| VISUAL-catalog-detail-390 [en] | /en/library/catalog/qa190-cat-pdf | pass | 5150 ms | — |
| VISUAL-product-detail-1440 [ja] | /ja/products/990586001 | pass | 5934 ms | — |
| VISUAL-product-detail-390 [ja] | /ja/products/990586001 | pass | 5324 ms | — |
| VISUAL-product-detail-1440 [en] | /en/products/990586001 | pass | 5666 ms | — |
| VISUAL-product-detail-390 [en] | /en/products/990586001 | pass | 5198 ms | — |
| VISUAL-catalog-download-1440 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 5985 ms | — |
| VISUAL-catalog-download-390 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 6585 ms | — |
| LIGHTHOUSE-top-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 50706 ms | — |
| LIGHTHOUSE-top-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 54520 ms | — |
| LIGHTHOUSE-video-detail-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 58599 ms | — |
| LIGHTHOUSE-video-detail-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 61669 ms | — |
| LIGHTHOUSE-catalog-list-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 61757 ms | — |
| LIGHTHOUSE-catalog-list-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 54484 ms | — |

| Page | Device | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|---|---|---|
| top | mobile | 98 | 96 | 96 | 61 | 1654.521 | 0 | 133.5 |
| top | desktop | 97 | 91 | 96 | 61 | 509.96900000000005 | 0.053166687707781005 | 0 |
| video-detail | mobile | 95 | 100 | 96 | 69 | 2429.3225 | 0.009149918066949638 | 114.5 |
| video-detail | desktop | 96 | 90 | 96 | 69 | 744.6736000000001 | 0.05317134958304272 | 0 |
| catalog-list | mobile | 89 | 96 | 96 | 61 | 2851.1260000000007 | 0.009168107733049147 | 132.5 |
| catalog-list | desktop | 99 | 89 | 96 | 61 | 548.6985000000001 | 0.057966250649513835 | 0 |

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

### VISUAL-video-list-1440 [en]

- Failing comparison: `results/REGRESSION/finish-20261024-0820.py:12`; no Playwright assertion exception.
- Expected: unchanged HTTP/title, pixel diff <=1%, performance drop <10, LCP rise <1000 ms.
- Actual: [{'page': 'video-list', 'lang': 'en', 'vw': 1440, 'metric': 'title', 'before': 'search', 'now': 'YKK DIGITAL SHOWROOM', 'suspect': 'unannounced', 'confidence': 50, 'cause': 'none'}, {'page': 'video-list', 'lang': 'en', 'vw': 1440, 'metric': 'pixel diff %', 'before': 0, 'now': 12.2254, 'suspect': 'unannounced', 'confidence': 50, 'cause': 'none'}]
- Attempts: one capture or three Lighthouse audits, no retry.
- Evidence: evidence/REGRESSION/20261024-0820/video-list_en_1440.png
- Cause: none; product-bug confidence 50%; suspect product.

### VISUAL-video-list-390 [en]

- Failing comparison: `results/REGRESSION/finish-20261024-0820.py:12`; no Playwright assertion exception.
- Expected: unchanged HTTP/title, pixel diff <=1%, performance drop <10, LCP rise <1000 ms.
- Actual: [{'page': 'video-list', 'lang': 'en', 'vw': 390, 'metric': 'title', 'before': 'search', 'now': 'YKK DIGITAL SHOWROOM', 'suspect': 'unannounced', 'confidence': 50, 'cause': 'none'}, {'page': 'video-list', 'lang': 'en', 'vw': 390, 'metric': 'pixel diff %', 'before': 0, 'now': 8.9081, 'suspect': 'unannounced', 'confidence': 50, 'cause': 'none'}]
- Attempts: one capture or three Lighthouse audits, no retry.
- Evidence: evidence/REGRESSION/20261024-0820/video-list_en_390.png
- Cause: none; product-bug confidence 50%; suspect product.


# NEW FAIL
| page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence |
|---|---|---|---|---|---|---|---|
| video-list | en | 1440 | title | search | YKK DIGITAL SHOWROOM | unannounced | 50% |
| video-list | en | 1440 | pixel diff % | 0 | 12.2254 | unannounced | 50% |
| video-list | en | 390 | title | search | YKK DIGITAL SHOWROOM | unannounced | 50% |
| video-list | en | 390 | pixel diff % | 0 | 8.9081 | unannounced | 50% |

## 7. Open points for QA

- Known duplicate QA587 main movie card is data (QA587_Upper + qa587-main); English video list 1440: Cards replaced by Unable to load video information at both widths; distinct from known duplicate-card data; ordered page text from both runs retained. Both ordered page texts retained in measurements.json.
- Proposed outcomes only; human QA confirms. No login, AEM writes, or form submission.
- P1 only: 36 captures. Comparisons use REG-0420 last entries; original REG-1620 baselines preserved.
- Pixel comparison uses RGB max-channel difference >32/255, with union of previous/current carousel, video, iframe and time rectangles masked. Compression may introduce residual noise.
- Known 404 pages skipped unless HTTP/title changed.
- Lighthouse: three runs per page/device, medians compared to REG-0420 last; performance drop >=10 or LCP rise >=1000 ms are candidates.
- English video-list screenshots show Unable to load video information instead of the previous cards (1440 and 390); cause not independently verified. No new deployed change recorded since REG-0420; pending DSR-639/661/649 not attributed. Unexpected changes tagged unannounced, cause none; confidence 50%.
- Build and AEM seed content not independently verified. No P2 pages in this job.
- PNG palette compression then JPEG q80 above 300,000 bytes; oversized images not committed, SHA/size retained. Captures under evidence/REGRESSION/20261024-0820. Raw Lighthouse /tmp files, test-results/ and playwright-report/ not committed.
