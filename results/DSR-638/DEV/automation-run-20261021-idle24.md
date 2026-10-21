# DSR-638 DEV visual capture run — 20261021

## 1. Header

- Run start (UTC): 2026-10-21T08:22:22.279Z
- Run end (UTC): 2026-10-21T08:24:35.132Z
- Environment: DEV; bases: https://main--dsr-eds-dev--sutrix-projects.aem.page, https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /en/library/catalog, /ja/library/video/search, /en/library/video/search, /ja/product/performance/sustainable/product-index, /en/product/performance/sustainable/product-index
- Build under test: not independently verified.
- Baseline ID: JOB-ZZ-IDLE-24; contemporaneous old test-space references from JOB-ZZ-IDLE-22.
- Automation HEAD: 500a27e37d2714a478b553270c384383002738e1
- Exact command: `ENV=dev node ykk-dsr/hub/results/JOB-ZZ-IDLE-24/capture.cjs`

## 2. TypeScript check

`npx tsc --noEmit`: exit 0; no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Blocked | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---:|---|
| 24 | 20 | 0 | 0 | 4 | 0 | 1 | 0 | 132.853s |

Ad hoc read-only Chromium capture script, not an npm test suite. Counts comprise 12 capture checks and 12 visual comparisons. Proposed outcomes only. IDs below are job observation IDs, not invented source TC IDs. No flaky retries.

## 4. Executed tests

Durations are individual capture durations; comparison timing was not measured separately.

| TC ID / observation ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| catalog-en-page-1440-new-capture | Capture public page | pass | 9283ms | — |
| catalog-en-page-1440-comparison | Compare with old same-language page | pass | Not measured | Same layout; breadcrumb labels differ. |
| catalog-en-page-375-new-capture | Capture public page | pass | 7716ms | — |
| catalog-en-page-375-comparison | Compare with old same-language page | pass | Not measured | Same layout; breadcrumb labels differ. |
| catalog-en-live-1440-new-capture | Capture public page | pass | 9826ms | — |
| catalog-en-live-1440-comparison | Compare with old same-language page | pass | Not measured | Same layout; breadcrumb labels differ. |
| catalog-en-live-375-new-capture | Capture public page | pass | 9920ms | — |
| catalog-en-live-375-comparison | Compare with old same-language page | pass | Not measured | Same layout; breadcrumb labels differ. |
| video-ja-page-1440-new-capture | Capture public page | pass | 6458ms | — |
| video-ja-page-1440-comparison | Compare with old same-language page | pass | Not measured | Same layout; breadcrumb labels differ. |
| video-ja-page-375-new-capture | Capture public page | pass | 4522ms | — |
| video-ja-page-375-comparison | Compare with old same-language page | pass | Not measured | Same layout; breadcrumb labels differ. |
| video-en-page-1440-new-capture | Capture public page | pass | 6440ms | — |
| video-en-page-1440-comparison | Compare with old same-language page | blocked | Not measured | Old same-language page returns HTTP 404; comparison unavailable. |
| video-en-page-375-new-capture | Capture public page | pass | 5938ms | — |
| video-en-page-375-comparison | Compare with old same-language page | blocked | Not measured | Old same-language page returns HTTP 404; comparison unavailable. |
| product-ja-page-1440-new-capture | Capture public page | pass | 6234ms | — |
| product-ja-page-1440-comparison | Compare with old same-language page | pass | Not measured | Same layout; breadcrumb labels differ. |
| product-ja-page-375-new-capture | Capture public page | pass | 4723ms | — |
| product-ja-page-375-comparison | Compare with old same-language page | pass | Not measured | Same layout; breadcrumb labels differ. |
| product-en-page-1440-new-capture | Capture public page | pass | 5201ms | — |
| product-en-page-1440-comparison | Compare with old same-language page | blocked | Not measured | Old same-language page returns HTTP 404; comparison unavailable. |
| product-en-page-375-new-capture | Capture public page | pass | 4946ms | — |
| product-en-page-375-comparison | Compare with old same-language page | blocked | Not measured | Old same-language page returns HTTP 404; comparison unavailable. |

## 5. Skipped tests

None. Four comparisons are blocked (not passed): old English video/product pages return HTTP 404 at both widths.

## 6. Failed tests

None. Missing reference pages are comparison blockers, not new product-failure assertions. All screenshot paths and HTTP observations are in [captures.json](../../../ykk-dsr/hub/results/JOB-ZZ-IDLE-24/captures.json).

## 7. Open points for QA

- See [job summary](../../../ykk-dsr/hub/results/JOB-ZZ-IDLE-24/summary.md) for visual differences. All 24 PNGs are committed under ykk-dsr/hub/results/JOB-ZZ-IDLE-24/baselines/ as explicitly requested by this baseline job; no test-results/ or playwright-report/ artifacts are committed.
- English video/product parity cannot be assessed without a valid old same-language reference; known 404s were reproduced. cause: none; confidence of a new product bug: 0%.
- Build identity, Figma conformity and interactive behavior are not independently verified; no filters/forms/pagination were activated.
- Captures show current seeded content. Matching layouts do not establish pixel equality or final QA acceptance. SP uses a 375px viewport with desktop Chromium, DPR 1.
