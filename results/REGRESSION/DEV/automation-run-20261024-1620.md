# Regression DEV automation run — 2026-10-24 (REG-1620)

## 1. Header

- Run start (UTC): 2026-10-24T09:24:14.766Z
- Run end (UTC): 2026-10-24T09:34:50.401Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /en/library/catalog, /en/library/catalog/qa190-cat-pdf, /en/library/video/qa587-main, /en/library/video/search, /en/products/990586001, /en/top-page, /ja/library/catalog, /ja/library/catalog/qa190-cat-pdf, /ja/library/video/qa587-main, /ja/library/video/search, /ja/product/performance/sustainable/product-index, /ja/products/990586001, /ja/top-page, /master/en/test-space/dsr-570-catalog-detail, /master/en/test-space/dsr552-bc/child/grandchild, /master/en/test-space/product-list, /master/ja/test-space/dsr-570-catalog-detail, /master/ja/test-space/dsr552-bc/child/grandchild
- Build under test: not independently verified; latest recorded deploy dev/2026.10.23_2 b33514f.
- Baseline ID: REG-1220 last measurements; original REG-1620 baseline preserved; previous ledgers snapshotted in measurements.json.
- Automation HEAD commit SHA: 3e1f4ef5551ba901189573c7e66da0a6dcf55473
- Exact command: `node results/REGRESSION/run-20261024-1620.cjs > /tmp/reg241620-run.log 2>&1`
- Postprocessing: `python3 results/REGRESSION/finish-20261024-1620.py`

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| 42 | 36 | 0 | 6 | 0 | 0 | 1 | 0 | 635.6 s |

Proposed outcomes only. Chromium capture script, not npm suite. Three Lighthouse measurements per combination are not retries.

## 4. Executed tests

Duration per capture or sum of three audits.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| VISUAL-top-1440 [ja] | /ja/top-page | pass | 10997 ms | — |
| VISUAL-top-390 [ja] | /ja/top-page | pass | 6855 ms | — |
| VISUAL-top-1440 [en] | /en/top-page | pass | 8875 ms | — |
| VISUAL-top-390 [en] | /en/top-page | pass | 6997 ms | — |
| VISUAL-breadcrumb-1440 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 5055 ms | — |
| VISUAL-breadcrumb-390 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 2344 ms | — |
| VISUAL-breadcrumb-1440 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 2528 ms | — |
| VISUAL-breadcrumb-390 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 3339 ms | — |
| VISUAL-video-detail-1440 [ja] | /ja/library/video/qa587-main | pass | 4281 ms | — |
| VISUAL-video-detail-390 [ja] | /ja/library/video/qa587-main | pass | 2953 ms | — |
| VISUAL-video-detail-1440 [en] | /en/library/video/qa587-main | pass | 3463 ms | — |
| VISUAL-video-detail-390 [en] | /en/library/video/qa587-main | pass | 3209 ms | — |
| VISUAL-video-list-1440 [ja] | /ja/library/video/search | pass | 3794 ms | — |
| VISUAL-video-list-390 [ja] | /ja/library/video/search | pass | 3566 ms | — |
| VISUAL-video-list-1440 [en] | /en/library/video/search | pass | 3407 ms | — |
| VISUAL-video-list-390 [en] | /en/library/video/search | pass | 3244 ms | — |
| VISUAL-catalog-list-1440 [ja] | /ja/library/catalog | pass | 4043 ms | — |
| VISUAL-catalog-list-390 [ja] | /ja/library/catalog | pass | 3332 ms | — |
| VISUAL-catalog-list-1440 [en] | /en/library/catalog | pass | 3473 ms | — |
| VISUAL-catalog-list-390 [en] | /en/library/catalog | pass | 3759 ms | — |
| VISUAL-catalog-detail-1440 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 3104 ms | — |
| VISUAL-catalog-detail-390 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 2453 ms | — |
| VISUAL-catalog-detail-1440 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2447 ms | — |
| VISUAL-catalog-detail-390 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2505 ms | — |
| VISUAL-product-detail-1440 [ja] | /ja/products/990586001 | pass | 6441 ms | — |
| VISUAL-product-detail-390 [ja] | /ja/products/990586001 | pass | 5763 ms | — |
| VISUAL-product-detail-1440 [en] | /en/products/990586001 | pass | 6097 ms | — |
| VISUAL-product-detail-390 [en] | /en/products/990586001 | pass | 5611 ms | — |
| VISUAL-catalog-download-1440 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 5945 ms | — |
| VISUAL-catalog-download-390 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 5428 ms | — |
| LIGHTHOUSE-top-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 63352 ms | — |
| LIGHTHOUSE-top-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 54315 ms | — |
| LIGHTHOUSE-video-detail-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 52192 ms | — |
| LIGHTHOUSE-video-detail-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 50659 ms | — |
| LIGHTHOUSE-catalog-list-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 56401 ms | — |
| LIGHTHOUSE-catalog-list-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 54766 ms | — |

| Page | Device | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|---|---|---|
| top | mobile | 87 | 96 | 96 | 61 | 1755.4799999999996 | 0.0001153015556378669 | 487.0759999999997 |
| top | desktop | 100 | 91 | 96 | 61 | 386.858 | 0.053166639954897406 | 0 |
| video-detail | mobile | 97 | 100 | 96 | 69 | 2270.5766000000003 | 0.009149918066949638 | 111.00000000000006 |
| video-detail | desktop | 99 | 90 | 96 | 69 | 608.0372 | 0.05334653702430294 | 0 |
| catalog-list | mobile | 94 | 96 | 96 | 61 | 2457.0069999999996 | 0.009168107733049147 | 199.5 |
| catalog-list | desktop | 99 | 89 | 96 | 61 | 628.6810999999998 | 0.05814143809077406 | 0 |

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
- P1 only: 36 primary captures plus four English video-list diagnostics, two per width 60 seconds apart. Diagnostic repeats are observations, not additional unique tests.
- Comparisons use REG-1220 last entries; original good-render REG-1620 baseline preserved. Recovery from known Unable to load is not a NEW FAIL.
- Pixel comparison uses RGB max-channel difference >32/255; union of previous/current carousel, video, iframe and time rectangles masked. Compression can introduce residual noise.
- Lighthouse: three runs per page/device; medians compared to REG-1220 last. Performance drop >=10 or LCP rise >=1000 ms are candidates.
- No new deployed change recorded; pending DSR-639/661/649/675 not attributed. Unexpected differences: unannounced, cause none, confidence 50%. Build and seed content not independently verified.
- Known duplicate QA587 main movie cards are data, excluded from candidate assessment.
- PNG palette compression then JPEG q80 above 300,000 bytes; oversized files not committed, SHA/size retained. Raw Lighthouse /tmp files, test-results/ and playwright-report/ not committed.
- English video-list diagnostics, including request status/body prefix and console logs, are in measurements.json: [{'width': 1440, 'sample': 1, 'at': '2026-10-24T09:27:08.471Z', 'title': 'search', 'cards': 12, 'unable': False}, {'width': 1440, 'sample': 2, 'at': '2026-10-24T09:28:11.822Z', 'title': 'search', 'cards': 12, 'unable': False}, {'width': 390, 'sample': 1, 'at': '2026-10-24T09:28:14.887Z', 'title': 'search', 'cards': 12, 'unable': False}, {'width': 390, 'sample': 2, 'at': '2026-10-24T09:29:18.380Z', 'title': 'search', 'cards': 12, 'unable': False}]
