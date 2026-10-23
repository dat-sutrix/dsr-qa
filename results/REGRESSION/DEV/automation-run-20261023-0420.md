# Regression DEV automation run — 2026-10-23 (REG-0420)

## 1. Header

- Run start (UTC): 2026-10-23T21:23:27.393Z
- Run end (UTC): 2026-10-23T21:31:27.101Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /en/library/catalog, /en/library/catalog/qa190-cat-pdf, /en/library/video/qa587-main, /en/library/video/search, /en/products/990586001, /en/top-page, /ja/library/catalog, /ja/library/catalog/qa190-cat-pdf, /ja/library/video/qa587-main, /ja/library/video/search, /ja/product/performance/sustainable/product-index, /ja/products/990586001, /ja/top-page, /master/en/test-space/dsr-570-catalog-detail, /master/en/test-space/dsr552-bc/child/grandchild, /master/en/test-space/product-list, /master/ja/test-space/dsr-570-catalog-detail, /master/ja/test-space/dsr552-bc/child/grandchild
- Build under test: not independently verified; latest recorded deploy dev/2026.10.23_2 b33514f.
- Baseline ID: REG-0020 last measurements; original REG-1620 baseline preserved; previous ledgers snapshotted in measurements.json.
- Automation HEAD commit SHA: 15062eb3d5c62af9944424f5b0568e869e8937a2
- Exact command: `node results/REGRESSION/run-20261024-0420.cjs > /tmp/reg0420-run.log 2>&1`
- Postprocessing: `python3 results/REGRESSION/finish-20261024-0420.py`

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| 42 | 36 | 0 | 6 | 0 | 0 | 1 | 0 | 479.7 s |

Proposed outcomes only. Chromium capture script, not npm suite. Three Lighthouse measurements per combination are not retries.

## 4. Executed tests

Duration per capture or sum of three audits.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| VISUAL-top-1440 [ja] | /ja/top-page | pass | 8019 ms | — |
| VISUAL-top-390 [ja] | /ja/top-page | pass | 3504 ms | — |
| VISUAL-top-1440 [en] | /en/top-page | pass | 5636 ms | — |
| VISUAL-top-390 [en] | /en/top-page | pass | 3901 ms | — |
| VISUAL-breadcrumb-1440 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 2769 ms | — |
| VISUAL-breadcrumb-390 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 2221 ms | — |
| VISUAL-breadcrumb-1440 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 2381 ms | — |
| VISUAL-breadcrumb-390 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 2433 ms | — |
| VISUAL-video-detail-1440 [ja] | /ja/library/video/qa587-main | pass | 3403 ms | — |
| VISUAL-video-detail-390 [ja] | /ja/library/video/qa587-main | pass | 3116 ms | — |
| VISUAL-video-detail-1440 [en] | /en/library/video/qa587-main | pass | 2868 ms | — |
| VISUAL-video-detail-390 [en] | /en/library/video/qa587-main | pass | 2191 ms | — |
| VISUAL-video-list-1440 [ja] | /ja/library/video/search | pass | 6079 ms | — |
| VISUAL-video-list-390 [ja] | /ja/library/video/search | pass | 3195 ms | — |
| VISUAL-video-list-1440 [en] | /en/library/video/search | pass | 5750 ms | — |
| VISUAL-video-list-390 [en] | /en/library/video/search | pass | 5825 ms | — |
| VISUAL-catalog-list-1440 [ja] | /ja/library/catalog | pass | 5730 ms | — |
| VISUAL-catalog-list-390 [ja] | /ja/library/catalog | pass | 4790 ms | — |
| VISUAL-catalog-list-1440 [en] | /en/library/catalog | pass | 4893 ms | — |
| VISUAL-catalog-list-390 [en] | /en/library/catalog | pass | 5016 ms | — |
| VISUAL-catalog-detail-1440 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 2953 ms | — |
| VISUAL-catalog-detail-390 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 2540 ms | — |
| VISUAL-catalog-detail-1440 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2928 ms | — |
| VISUAL-catalog-detail-390 [en] | /en/library/catalog/qa190-cat-pdf | pass | 4841 ms | — |
| VISUAL-product-detail-1440 [ja] | /ja/products/990586001 | pass | 4421 ms | — |
| VISUAL-product-detail-390 [ja] | /ja/products/990586001 | pass | 3481 ms | — |
| VISUAL-product-detail-1440 [en] | /en/products/990586001 | pass | 3508 ms | — |
| VISUAL-product-detail-390 [en] | /en/products/990586001 | pass | 3230 ms | — |
| VISUAL-catalog-download-1440 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 3556 ms | — |
| VISUAL-catalog-download-390 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 2979 ms | — |
| LIGHTHOUSE-top-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 58021 ms | — |
| LIGHTHOUSE-top-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 52775 ms | — |
| LIGHTHOUSE-video-detail-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 50381 ms | — |
| LIGHTHOUSE-video-detail-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 54020 ms | — |
| LIGHTHOUSE-catalog-list-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 65101 ms | — |
| LIGHTHOUSE-catalog-list-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 64121 ms | — |

| Page | Device | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|---|---|---|
| top | mobile | 91 | 96 | 96 | 61 | 1654.225 | 0.0001153015556378669 | 357.49999999999994 |
| top | desktop | 99 | 91 | 96 | 61 | 748.4504 | 0.05316666383133921 | 0 |
| video-detail | mobile | 96 | 100 | 96 | 69 | 2350.7284194439417 | 0.009149918066949638 | 133.5 |
| video-detail | desktop | 99 | 90 | 96 | 69 | 597.9853 | 0.05317134958304272 | 0 |
| catalog-list | mobile | 78 | 96 | 96 | 61 | 2634.4696 | 0.009168107733049147 | 621 |
| catalog-list | desktop | 95 | 89 | 96 | 61 | 1330.4308999999998 | 0.057966250649513835 | 0 |

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

- Known duplicate QA587 main movie card is data (QA587_Upper + qa587-main); English video list 1440: stable since REG-0020 (known duplicate is test data). Both ordered page texts retained in measurements.json.
- Proposed outcomes only; human QA confirms. No login, AEM writes, or form submission.
- P1 only: 36 captures. Comparisons use REG-0020 last entries; original REG-1620 baselines preserved.
- Pixel comparison uses RGB max-channel difference >32/255, with union of previous/current carousel, video, iframe and time rectangles masked. Compression may introduce residual noise.
- Known 404 pages skipped unless HTTP/title changed.
- Lighthouse: three runs per page/device, medians compared to REG-0020 last; performance drop >=10 or LCP rise >=1000 ms are candidates.
- No new deployed change recorded since REG-0020; pending DSR-639/661/649 not attributed. Unexpected changes tagged unannounced, cause none; confidence 50%.
- Build and AEM seed content not independently verified. No P2 pages in this job.
- PNG palette compression then JPEG q80 above 300,000 bytes; oversized images not committed, SHA/size retained. Captures under evidence/REGRESSION/20261024-0420. Raw Lighthouse /tmp files, test-results/ and playwright-report/ not committed.
