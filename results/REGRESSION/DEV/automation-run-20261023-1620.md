# Regression DEV automation run — 20261023-1620

## 1. Header

- Run start (UTC): 2026-10-23T09:29:18.561Z
- Run end (UTC): 2026-10-23T09:39:03.923Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /en/library/catalog, /en/library/catalog/qa190-cat-pdf, /en/library/video/qa587-main, /en/library/video/search, /en/products/990586001, /en/top-page, /ja/library/catalog, /ja/library/catalog/qa190-cat-pdf, /ja/library/video/qa587-main, /ja/library/video/search, /ja/product/performance/sustainable/product-index, /ja/products/990586001, /ja/top-page, /master/en/library/article/stories/qa529-01, /master/en/test-space/drs21-aem-block-library, /master/en/test-space/dsr-570-catalog-detail, /master/en/test-space/dsr-590-eco-top-page, /master/en/test-space/dsr552-bc/child/grandchild, /master/en/test-space/product-list, /master/en/test-space/qa566-news-01, /master/ja/library/article/stories/qa529-01, /master/ja/test-space/dsr-570-catalog-detail, /master/ja/test-space/dsr-590-eco-top-page, /master/ja/test-space/dsr552-bc/child/grandchild, /master/ja/test-space/qa566-news-01
- Build under test: job reports dev/2026.10.23 a47274d (669/671) and dev/2026.10.23_2 b33514f (670), migration complete 16:15 VN; not independently verified.
- Baseline: post-669 visual baseline; pre-669 measurements from JOB-ZY-REG-20261023-1220-codex and existing Lighthouse medians (snapshot retained in measurements.json).
- Automation HEAD commit SHA: d7e5b32ca39560fe03f7ad330728f04f63e9cdae
- Postprocessing command: `python3 results/REGRESSION/finish-20261023-1620.py`
- Exact command: `node results/REGRESSION/run-20261023-1620.cjs > /tmp/reg1620-run.log 2>&1`
- Initial preparation failed because `python` was unavailable; retried preparation with `python3` before any measurements.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|---|
| 56 | 48 | 0 | 8 | 0 | 0 | 1 | 0; 3 LH measurements, not retries | 585.4 s |

Proposed outcomes only; pass means measurement completed with no detected HTTP/title or score regression, not final visual/design approval. Chromium capture script, no npm suite executed.

## 4. Executed tests

Duration per capture or sum of three audits.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| VISUAL-top-1440 [ja] | /ja/top-page | pass | 8222 ms | — |
| VISUAL-top-390 [ja] | /ja/top-page | pass | 4247 ms | — |
| VISUAL-top-1440 [en] | /en/top-page | pass | 5429 ms | — |
| VISUAL-top-390 [en] | /en/top-page | pass | 3828 ms | — |
| VISUAL-breadcrumb-1440 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 2958 ms | — |
| VISUAL-breadcrumb-390 [ja] | /master/ja/test-space/dsr552-bc/child/grandchild | pass | 2458 ms | — |
| VISUAL-breadcrumb-1440 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 2237 ms | — |
| VISUAL-breadcrumb-390 [en] | /master/en/test-space/dsr552-bc/child/grandchild | pass | 2283 ms | — |
| VISUAL-video-detail-1440 [ja] | /ja/library/video/qa587-main | pass | 3732 ms | — |
| VISUAL-video-detail-390 [ja] | /ja/library/video/qa587-main | pass | 3064 ms | — |
| VISUAL-video-detail-1440 [en] | /en/library/video/qa587-main | pass | 3321 ms | — |
| VISUAL-video-detail-390 [en] | /en/library/video/qa587-main | pass | 5974 ms | — |
| VISUAL-video-list-1440 [ja] | /ja/library/video/search | pass | 4955 ms | — |
| VISUAL-video-list-390 [ja] | /ja/library/video/search | pass | 4459 ms | — |
| VISUAL-video-list-1440 [en] | /en/library/video/search | pass | 3364 ms | — |
| VISUAL-video-list-390 [en] | /en/library/video/search | pass | 4126 ms | — |
| VISUAL-catalog-list-1440 [ja] | /ja/library/catalog | pass | 5849 ms | — |
| VISUAL-catalog-list-390 [ja] | /ja/library/catalog | pass | 4577 ms | — |
| VISUAL-catalog-list-1440 [en] | /en/library/catalog | pass | 3925 ms | — |
| VISUAL-catalog-list-390 [en] | /en/library/catalog | pass | 4646 ms | — |
| VISUAL-catalog-detail-1440 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 2729 ms | — |
| VISUAL-catalog-detail-390 [ja] | /ja/library/catalog/qa190-cat-pdf | pass | 2763 ms | — |
| VISUAL-catalog-detail-1440 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2624 ms | — |
| VISUAL-catalog-detail-390 [en] | /en/library/catalog/qa190-cat-pdf | pass | 2627 ms | — |
| VISUAL-product-detail-1440 [ja] | /ja/products/990586001 | pass | 5961 ms | — |
| VISUAL-product-detail-390 [ja] | /ja/products/990586001 | pass | 5748 ms | — |
| VISUAL-product-detail-1440 [en] | /en/products/990586001 | pass | 4236 ms | — |
| VISUAL-product-detail-390 [en] | /en/products/990586001 | pass | 3819 ms | — |
| VISUAL-catalog-download-1440 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 2771 ms | — |
| VISUAL-catalog-download-390 [ja] | /master/ja/test-space/dsr-570-catalog-detail | pass | 3000 ms | — |
| VISUAL-article-1440 [ja] | /master/ja/library/article/stories/qa529-01 | pass | 8309 ms | — |
| VISUAL-article-390 [ja] | /master/ja/library/article/stories/qa529-01 | pass | 5252 ms | — |
| VISUAL-article-1440 [en] | /master/en/library/article/stories/qa529-01 | pass | 5230 ms | — |
| VISUAL-article-390 [en] | /master/en/library/article/stories/qa529-01 | pass | 6125 ms | — |
| VISUAL-news-1440 [ja] | /master/ja/test-space/qa566-news-01 | pass | 7344 ms | — |
| VISUAL-news-390 [ja] | /master/ja/test-space/qa566-news-01 | pass | 6878 ms | — |
| VISUAL-news-1440 [en] | /master/en/test-space/qa566-news-01 | pass | 6390 ms | — |
| VISUAL-news-390 [en] | /master/en/test-space/qa566-news-01 | pass | 6324 ms | — |
| VISUAL-eco-top-1440 [ja] | /master/ja/test-space/dsr-590-eco-top-page | pass | 8957 ms | — |
| VISUAL-eco-top-390 [ja] | /master/ja/test-space/dsr-590-eco-top-page | pass | 5848 ms | — |
| VISUAL-video-block-1440 [en] | /master/en/test-space/drs21-aem-block-library | pass | 13322 ms | — |
| VISUAL-video-block-390 [en] | /master/en/test-space/drs21-aem-block-library | pass | 9388 ms | — |
| LIGHTHOUSE-top-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 61226 ms | — |
| LIGHTHOUSE-top-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page | pass | 53258 ms | — |
| LIGHTHOUSE-video-detail-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 60310 ms | — |
| LIGHTHOUSE-video-detail-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main | pass | 60802 ms | — |
| LIGHTHOUSE-catalog-list-mobile [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 55661 ms | — |
| LIGHTHOUSE-catalog-list-desktop [ja] | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog | pass | 57710 ms | — |

Lighthouse component-wise medians (three runs each):

| Page | Device | Perf | A11y | BP | SEO | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|---|---|---|
| top | mobile | 90 | 96 | 96 | 61 | 1818.8815 | 0.018359722993602782 | 295.5 |
| top | desktop | 100 | 91 | 96 | 61 | 364.76099999999997 | 0.05316666383133921 | 0 |
| video-detail | mobile | 93 | 100 | 96 | 69 | 2262.315 | 0.009149918066949638 | 276.5 |
| video-detail | desktop | 96 | 90 | 96 | 69 | 749.4738 | 0.05317134958304272 | 0 |
| catalog-list | mobile | 93 | 96 | 96 | 61 | 2532.1002893563536 | 0.009168107733049147 | 176.5 |
| catalog-list | desktop | 98 | 89 | 96 | 61 | 854.057 | 0.0581615847898709 | 0.5 |

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

None.

# NEW FAIL
| page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence |
|---|---|---|---|---|---|---|---|
| baseline – none | — | — | HTTP/title + prior LH medians | pre-669 | no regression candidate | none | N/A |

## 7. Open points for QA

- Spot-check: catalog-detail ja mobile viewport shows header/breadcrumb and otherwise white space. Body text length matches pre-669 (183 characters); this is not evidence of a new regression or confirmed content correctness.
- Original visual ledger was empty: no prior image pixel diff is possible. Baseline captures are unmasked; future comparisons must mask carousel/video/time regions on both captures.
- HTTP 404 is skipped per job, except a changed HTTP/title is flagged as a candidate; skipped pages are never counted as passing.
- Candidate HTTP/title differences and Lighthouse drops are not confirmed bugs. AEM seed data and actual deployed build were not independently verified. CHANGES.md attribution is temporal, not causal proof.
- PNG palette compression used above 300,000 bytes, then JPEG quality 80. Files still oversized are omitted and retain SHA-256/size plus “not committed” in ledger/measurements.
- Evidence paths are project-relative. Captures in evidence/REGRESSION are committed per job exception; raw Lighthouse JSON remains /tmp/reg1620-*.json, not committed. test-results/ and playwright-report/ remain gitignored.
- All navigation was read-only; no AEM writes, login, or form submissions. Partial prior Lighthouse ledger is compared only where a median exists; remaining groups establish baselines.
