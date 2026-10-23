# Regression DEV automation run — 20261023-2020

## 1. Header

- Run start (UTC): 2026-10-23T13:26:45.965Z
- Run end (UTC): 2026-10-23T13:37:22.837Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /en/library/catalog, /en/library/catalog/qa190-cat-pdf, /en/library/video/qa587-main, /en/library/video/search, /en/products/990586001, /en/top-page, /ja/library/catalog, /ja/library/catalog/qa190-cat-pdf, /ja/library/video/qa587-main, /ja/library/video/search, /ja/product/performance/sustainable/product-index, /ja/products/990586001, /ja/top-page, /master/en/library/article/stories/qa529-01, /master/en/test-space/drs21-aem-block-library, /master/en/test-space/dsr-570-catalog-detail, /master/en/test-space/dsr-590-eco-top-page, /master/en/test-space/dsr552-bc/child/grandchild, /master/en/test-space/product-list, /master/en/test-space/qa566-news-01, /master/ja/library/article/stories/qa529-01, /master/ja/test-space/dsr-570-catalog-detail, /master/ja/test-space/dsr-590-eco-top-page, /master/ja/test-space/dsr552-bc/child/grandchild, /master/ja/test-space/qa566-news-01
- Build under test: not independently verified; latest recorded deploy dev/2026.10.23_2 b33514f.
- Baseline ID: JOB-ZY-REG-20261023-1620-codex (post-669); previous ledgers snapshotted in measurements.json.
- Automation HEAD commit SHA: a50877c49aa190a58a6a44abe924c891e0016d03
- Exact command: `node results/REGRESSION/run-20261023-2020.cjs > /tmp/reg2020-run.log 2>&1`
- Postprocessing: `python3 results/REGRESSION/finish-20261023-2020.py`

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| 56 | 47 | 1 | 8 | 0 | 0 | 1 | 0 | 636.9 s |

Proposed outcomes only. Chromium capture script, not npm suite. Three Lighthouse measurements per combination are not retries.

## 4. Executed tests

Duration per capture or sum of three audits.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| VISUAL-top-1440 [ja] | /ja/top-page | pass | 11908 ms | — |
| VISUAL-top-390 [ja] | /ja/top-page | pass | 8303 ms | — |
| VISUAL-top-1440 [en] | /en/top-page | pass | 9650 ms | — |
| VISUAL-top-390 [en] | /en/top-page | pass | 7828 ms | — |
| VISUAL-breadcrumb-1440 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 5190 ms | — |
| VISUAL-breadcrumb-390 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 4798 ms | — |
| VISUAL-breadcrumb-1440 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 5202 ms | — |
| VISUAL-breadcrumb-390 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 4855 ms | — |
| VISUAL-video-detail-1440 [ja] | /ja/library/video/qa587-main | pass | 6919 ms | — |
| VISUAL-video-detail-390 [ja] | /ja/library/video/qa587-main | pass | 5958 ms | — |
| VISUAL-video-detail-1440 [en] | /en/library/video/qa587-main | pass | 7085 ms | — |
| VISUAL-video-detail-390 [en] | /en/library/video/qa587-main | pass | 6482 ms | — |
| VISUAL-video-list-1440 [ja] | /ja/library/video/search | pass | 7461 ms | — |
| VISUAL-video-list-390 [ja] | /ja/library/video/search | pass | 7466 ms | — |
| VISUAL-video-list-1440 [en] | /en/library/video/search | fail | 7316 ms | NEW FAIL candidate: pixel diff % |
| VISUAL-video-list-390 [en] | /en/library/video/search | pass | 7630 ms | — |
| VISUAL-catalog-list-1440 [ja] | /ja/library/catalog | pass | 7409 ms | — |
| VISUAL-catalog-list-390 [ja] | /ja/library/catalog | pass | 7283 ms | — |
| VISUAL-catalog-list-1440 [en] | /en/library/catalog | pass | 7572 ms | — |
| VISUAL-catalog-list-390 [en] | /en/library/catalog | pass | 4966 ms | — |
| VISUAL-catalog-detail-1440 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 3400 ms | — |
| VISUAL-catalog-detail-390 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 3115 ms | — |
| VISUAL-catalog-detail-1440 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2836 ms | — |
| VISUAL-catalog-detail-390 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2634 ms | — |
| VISUAL-product-detail-1440 [ja] | /ja/products/990586001 | pass | 4159 ms | — |
| VISUAL-product-detail-390 [ja] | /ja/products/990586001 | pass | 3291 ms | — |
| VISUAL-product-detail-1440 [en] | /en/products/990586001 | pass | 4406 ms | — |
| VISUAL-product-detail-390 [en] | /en/products/990586001 | pass | 3072 ms | — |
| VISUAL-catalog-download-1440 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 3093 ms | — |
| VISUAL-catalog-download-390 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 2786 ms | — |
| VISUAL-article-1440 [ja] | /master/ja/library/article/stories/qa529-01 | pass | 7010 ms | — |
| VISUAL-article-390 [ja] | /master/ja/library/article/stories/qa529-01 | pass | 12031 ms | — |
| VISUAL-article-1440 [en] | /master/en/library/article/stories/qa529-01 | pass | 10663 ms | — |
| VISUAL-article-390 [en] | /master/en/library/article/stories/qa529-01 | pass | 10217 ms | — |
| VISUAL-news-1440 [ja] | /master/ja/test-space/qa566-news-01 | pass | 7068 ms | — |
| VISUAL-news-390 [ja] | /master/ja/test-space/qa566-news-01 | pass | 6377 ms | — |
| VISUAL-news-1440 [en] | /master/en/test-space/qa566-news-01 | pass | 7273 ms | — |
| VISUAL-news-390 [en] | /master/en/test-space/qa566-news-01 | pass | 7613 ms | — |
| VISUAL-eco-top-1440 [ja] | /master/ja/test-space/dsr-590-eco-top-page | pass | 9772 ms | — |
| VISUAL-eco-top-390 [ja] | /master/ja/test-space/dsr-590-eco-top-page | pass | 5684 ms | — |
| VISUAL-video-block-1440 [en] | /master/en/test-space/drs21-aem-block-library | pass | 11265 ms | — |
| VISUAL-video-block-390 [en] | /master/en/test-space/drs21-aem-block-library | pass | 8547 ms | — |
| LIGHTHOUSE-top-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 57374 ms | — |
| LIGHTHOUSE-top-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 52684 ms | — |
| LIGHTHOUSE-video-detail-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 50843 ms | — |
| LIGHTHOUSE-video-detail-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 52898 ms | — |
| LIGHTHOUSE-catalog-list-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 60181 ms | — |
| LIGHTHOUSE-catalog-list-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 58537 ms | — |

| Page | Device | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|---|---|---|
| top | mobile | 85 | 96 | 96 | 61 | 1808.873 | 0.018359722993602782 | 568.5 |
| top | desktop | 99 | 91 | 96 | 61 | 749.4347 | 0.053166639954897406 | 2 |
| video-detail | mobile | 95 | 100 | 96 | 69 | 2263.5036 | 0.009149918066949638 | 212.49999999999994 |
| video-detail | desktop | 99 | 90 | 96 | 69 | 612.941 | 0.05334653702430294 | 0 |
| catalog-list | mobile | 91 | 96 | 96 | 61 | 2532.5115 | 0.009168107733049147 | 289.50000000000006 |
| catalog-list | desktop | 97 | 89 | 96 | 61 | 1111.6070000000002 | 0.057966250649513835 | 0 |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| VISUAL-product-list-1440 [ja] | HTTP 404 — language/page skipped per job |
| VISUAL-product-list-390 [ja] | HTTP 404 — language/page skipped per job |
| VISUAL-product-list-1440 [en] | HTTP 404 — language/page skipped per job |
| VISUAL-product-list-390 [en] | HTTP 404 — language/page skipped per job |
| VISUAL-catalog-download-1440 [en] | HTTP 404 — language/page skipped per job |
| VISUAL-catalog-download-390 [en] | HTTP 404 — language/page skipped per job |
| VISUAL-eco-top-1440 [en] | HTTP 404 — language/page skipped per job |
| VISUAL-eco-top-390 [en] | HTTP 404 — language/page skipped per job |

## 6. Failed tests

### VISUAL-video-list-1440 [en]

- Failing comparison: `results/REGRESSION/finish-20261023-2020.py:12`; no Playwright assertion exception.
- Expected: unchanged HTTP/title, pixel diff <=1%, performance drop <10, LCP rise <1000 ms.
- Actual: [{'page': 'video-list', 'lang': 'en', 'vw': 1440, 'metric': 'pixel diff %', 'before': 0, 'now': 8.4328, 'suspect': 'unannounced', 'confidence': 50, 'cause': 'none'}]
- Attempts: one capture or three Lighthouse audits, no retry.
- Evidence: evidence/REGRESSION/20261023-2020/video-list_en_1440.png
- Cause: none; product-bug confidence 50%; suspect product.


# NEW FAIL
| page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence |
|---|---|---|---|---|---|---|---|
| video-list | en | 1440 | pixel diff % | 0 | 8.4328 | unannounced | 50% |

## 7. Open points for QA

- Image inspection: English video list desktop first row changed from QA587 main movie / QA587 rel B / video title main a to QA587 main movie / QA587 main movie / QA587 rel B. This may be seed content or query ordering; no data writes or independent Author verification performed.
- Proposed outcomes only; human QA confirms. No login, writes, or form submission.
- Visual baseline preserved from REG-1620; last measurements updated. HTTP/title and >1% pixel changes compared.
- Pixel comparison: RGB max-channel difference >32/255, masking current/baseline carousel, video, iframe and time rectangles. Historical masks unavailable; current rectangles applied to both images. Compression can cause residual noise.
- 404 pages skipped unless HTTP/title changed; eight known baseline 404 captures do not constitute new regression.
- Lighthouse: three runs per page/device, medians; performance drop >=10 or LCP rise >=1000 ms are candidates, not confirmed bugs.
- Pending DSR-639/661/649 changes are not confirmed deployed; none can be causally linked from screenshot/performance measurements. Unexplained changes tagged unannounced, cause none, confidence 50%.
- Build and AEM seed content not independently verified. P2 scope is the inherited page set; no dedicated booth page added.
- PNG palette compression then JPEG q80 above 300,000 bytes; oversized evidence omitted with SHA/size retained. Committed captures are under evidence/REGRESSION/20261023-2020. Raw Lighthouse /tmp files, test-results/ and playwright-report/ are not committed.
