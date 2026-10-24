# JOB-ZZ-IDLE-45 DEV run

Start/end UTC: 2026-10-24T00:53:41.254Z / 2026-10-24T01:01:54.615Z
Environment: DEV https://main--dsr-eds-dev--sutrix-projects.aem.live
Targets: 13 page types, ja/en; exact paths in measurements.json.
Build: not independently verified; baseline: last REG visual/Lighthouse ledger entries.
Automation HEAD: 9d40be5fb39ae43f80c7255c972f585cdf54dd72
Exact command: node results/JOB-ZZ-IDLE-45/run.cjs

## TypeScript

npx tsc --noEmit: exit 0, no errors.

## Suite summary

Custom read-only Playwright captures; no npm test suite invoked. One worker, no retries.

| Total captures | Pass | Candidate fail | Skip | Blocked | Exit | Wall seconds |
|---|---|---|---|---|---|---|
| 50 | 42 | 0 | 8 | 0 | 0 | 493.361 |

## Executed checks

| Check | Lang/width | Proposed | Duration ms | Reason |
|---|---|---|---|---|
| top | ja/1440 | pass | 7477 | Capture completed; comparison recorded separately |
| top | ja/390 | pass | 3686 | Capture completed; comparison recorded separately |
| top | en/1440 | pass | 5280 | Capture completed; comparison recorded separately |
| top | en/390 | pass | 3985 | Capture completed; comparison recorded separately |
| breadcrumb | ja/1440 | pass | 2607 | Capture completed; comparison recorded separately |
| breadcrumb | ja/390 | pass | 2182 | Capture completed; comparison recorded separately |
| breadcrumb | en/1440 | pass | 2258 | Capture completed; comparison recorded separately |
| breadcrumb | en/390 | pass | 2135 | Capture completed; comparison recorded separately |
| video-detail | ja/1440 | pass | 2480 | Capture completed; comparison recorded separately |
| video-detail | ja/390 | pass | 2236 | Capture completed; comparison recorded separately |
| video-detail | en/1440 | pass | 2385 | Capture completed; comparison recorded separately |
| video-detail | en/390 | pass | 2161 | Capture completed; comparison recorded separately |
| video-list | ja/1440 | pass | 3221 | Capture completed; comparison recorded separately |
| video-list | ja/390 | pass | 2779 | Capture completed; comparison recorded separately |
| video-list | en/1440 | pass | 3128 | Capture completed; comparison recorded separately |
| video-list | en/390 | pass | 2793 | Capture completed; comparison recorded separately |
| catalog-list | ja/1440 | pass | 3422 | Capture completed; comparison recorded separately |
| catalog-list | ja/390 | pass | 2978 | Capture completed; comparison recorded separately |
| catalog-list | en/1440 | pass | 2860 | Capture completed; comparison recorded separately |
| catalog-list | en/390 | pass | 3044 | Capture completed; comparison recorded separately |
| catalog-detail | ja/1440 | pass | 2500 | Capture completed; comparison recorded separately |
| catalog-detail | ja/390 | pass | 2259 | Capture completed; comparison recorded separately |
| catalog-detail | en/1440 | pass | 2381 | Capture completed; comparison recorded separately |
| catalog-detail | en/390 | pass | 2168 | Capture completed; comparison recorded separately |
| product-detail | ja/1440 | pass | 3043 | Capture completed; comparison recorded separately |
| product-detail | ja/390 | pass | 4921 | Capture completed; comparison recorded separately |
| product-detail | en/1440 | pass | 4360 | Capture completed; comparison recorded separately |
| product-detail | en/390 | pass | 3396 | Capture completed; comparison recorded separately |
| product-list | ja/1440 | skip | 2434 | HTTP 404 — language/page skipped per job |
| product-list | ja/390 | skip | 2178 | HTTP 404 — language/page skipped per job |
| product-list | en/1440 | skip | 2174 | HTTP 404 — language/page skipped per job |
| product-list | en/390 | skip | 2002 | HTTP 404 — language/page skipped per job |
| catalog-download | ja/1440 | pass | 2640 | Capture completed; comparison recorded separately |
| catalog-download | ja/390 | pass | 2520 | Capture completed; comparison recorded separately |
| catalog-download | en/1440 | skip | 2379 | HTTP 404 — language/page skipped per job |
| catalog-download | en/390 | skip | 2186 | HTTP 404 — language/page skipped per job |
| article | ja/1440 | pass | 5776 | Capture completed; comparison recorded separately |
| article | ja/390 | pass | 4896 | Capture completed; comparison recorded separately |
| article | en/1440 | pass | 5519 | Capture completed; comparison recorded separately |
| article | en/390 | pass | 5026 | Capture completed; comparison recorded separately |
| news | ja/1440 | pass | 2457 | Capture completed; comparison recorded separately |
| news | ja/390 | pass | 2275 | Capture completed; comparison recorded separately |
| news | en/1440 | pass | 2423 | Capture completed; comparison recorded separately |
| news | en/390 | pass | 2377 | Capture completed; comparison recorded separately |
| eco-top | ja/1440 | pass | 8646 | Capture completed; comparison recorded separately |
| eco-top | ja/390 | pass | 2562 | Capture completed; comparison recorded separately |
| eco-top | en/1440 | skip | 2252 | HTTP 404 — language/page skipped per job |
| eco-top | en/390 | skip | 2085 | HTTP 404 — language/page skipped per job |
| video-block | en/1440 | pass | 5396 | Capture completed; comparison recorded separately |
| video-block | en/390 | pass | 2718 | Capture completed; comparison recorded separately |

## Skipped checks

- product-list ja 1440: HTTP 404 — language/page skipped per job
- product-list ja 390: HTTP 404 — language/page skipped per job
- product-list en 1440: HTTP 404 — language/page skipped per job
- product-list en 390: HTTP 404 — language/page skipped per job
- catalog-download en 1440: HTTP 404 — language/page skipped per job
- catalog-download en 390: HTTP 404 — language/page skipped per job
- eco-top en 1440: HTTP 404 — language/page skipped per job
- eco-top en 390: HTTP 404 — language/page skipped per job

## Failed checks

None.

## Lighthouse medians

| Page | Device | Perf/A11y/BP/SEO | LCP ms | CLS | TBT ms |
|---|---|---|---|---|---|
| top | mobile | 93/96/96/61 | 1655.308 | 0.018359608322736906 | 313 |
| top | desktop | 100/91/96/61 | 368.152 | 0.053166639954897406 | 0 |
| video-detail | mobile | 95/100/96/69 | 2451.7332 | 0.009149918066949638 | 53.5 |
| video-detail | desktop | 99/90/96/69 | 608.6034 | 0.05334653702430294 | 0 |
| catalog-list | mobile | 94/96/96/61 | 2810.9459999999995 | 0.009168107733049147 | 102 |
| catalog-list | desktop | 99/89/96/61 | 554.6836 | 0.057966250649513835 | 52 |

## Open points for QA

- Proposals only; pixel changes do not establish a product defect. Missing pages remain skipped.
- Build identity, seed correctness and Figma compliance not independently verified. P2 references can predate latest P1 run.
- DSR-678 watch runs separately every two hours through 2026-10-26T02:00:00Z; future rounds are not yet executed.
- Job title mentions DSR-677 but supplies no check or expected result; no verdict inferred.
- No login, form submission or AEM writes. test-results/ and playwright-report/ remain uncommitted.
