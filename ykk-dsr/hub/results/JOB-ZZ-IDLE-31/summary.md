# JOB-ZZ-IDLE-31 — DEV results
UTC: 2026-10-22T00:59:48.420Z → 2026-10-22T01:02:59.906Z; proposed outcomes, human QA confirms. Lighthouse 13.5.0: 10 attempts, sequential mobile/desktop, default simulated throttling, no retries; .aem.live.

| Path | Device | Perf | Accessibility | SEO | Best practices | Outcome |
|---|---|---:|---:|---:|---:|---|
| /en/library/article/stories/qa529-01 | desktop | N/A | N/A | N/A | N/A | Blocked: HTTP 404 |
| /en/library/article/stories/qa529-01 | mobile | N/A | N/A | N/A | N/A | Blocked: HTTP 404 |
| /en/library/catalog/qa190-cat-pdf | desktop | N/A | N/A | N/A | N/A | Blocked: HTTP 404 |
| /en/library/catalog/qa190-cat-pdf | mobile | N/A | N/A | N/A | N/A | Blocked: HTTP 404 |
| /en/library/video/qa587-main | desktop | 99 | 90 | 69 | 96 | pass |
| /en/library/video/qa587-main | mobile | 95 | 100 | 69 | 96 | pass |
| /ja/library/article/stories/qa529-01 | desktop | N/A | N/A | N/A | N/A | Blocked: HTTP 404 |
| /ja/library/article/stories/qa529-01 | mobile | N/A | N/A | N/A | N/A | Blocked: HTTP 404 |
| /ja/library/video/qa587-main | desktop | 95 | 90 | 69 | 96 | pass |
| /ja/library/video/qa587-main | mobile | 71 | 100 | 69 | 96 | fail |
Preview .aem.page: four HTTP-200 full-page captures at PC 1440×900 / SP 375×812 in evidence/DSR-587/baseline-20261022/.
Against IDLE-29: JA exact pixel match; EN adds “video” breadcrumb (PC 0.1907%, SP 0.4556% differing pixels); page dimensions unchanged.
Current JA resource 404: https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/video; EN has none. Old qa-587-main URLs now return document 404; historical resource identity cannot be proven.
Below-target perf: cause=none, product-bug confidence=60%; blocked 404 audits: cause=none, confidence=40% (publication/data unverified). No merge attribution established.
TypeScript: npx tsc --noEmit, exit 0, no errors. Raw observations/comparison/Lighthouse metrics and failed-audit details in hub result folder; no Author access or mutations.
