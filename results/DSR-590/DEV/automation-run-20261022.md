# DSR-590 DEV automation run — 20261022

Job: JOB-20261022-04 (run-only, ja, layout/structure TCs). first run of JOB-20261022-04 on .aem.live. Both failures were 30 s test timeouts caused by test reads (`heroTag.textContent()`, `boundingBox()`) waiting on elements absent from the page, so the remaining soft assertions never evaluated. Fixed (2 s timeouts on those reads, expectations unchanged) → see `automation-run-20261022-rerun-live.md`.

## 1. Header

- Run start (UTC): 2026-10-22T02:16:35Z
- Run end (UTC): 2026-10-22T02:19:30Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/ja/test-space/dsr-590-eco-top-page`, `/master/ja/test-space/dsr-590-eco-detail-page` (demo pages, Ngọc 21/10 – demo data only)
- Build under test: not independently verified (EDS main branch at run time)
- Baseline ID: BL-v1 (DSR-590 desc 10/17, Figma C14 3066-24396, URL design P076–P087). New Figma node 3351-51595 not checked (no Figma access on VPS).
- Automation HEAD commit SHA: 17074b71fbaa189501bd2d144cfcaaf9b70ad2c5 + uncommitted working-tree changes of this job (detail demo path, demo-data skips), committed with this report
- Exact command used:

```sh
npm run test:dev -- tests/eco-products/DSR-590.eco-products.spec.ts --project=chromium --grep '\[ja\]'
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 11 | 4 | 2 | 5 | 1 | 2 | 1 configured; 2 used (005, 006) | 2m 54s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `--grep '\[ja\]'` of `DSR-590.eco-products.spec.ts`; chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ECO-001 | DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | pass | 3.4 s | — |
| DSR-ECO-003 | DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | pass | 14.4 s | — |
| DSR-ECO-005 | DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary | fail (2 attempts, all timedOut) | 30.9 s + 31.1 s | Test timeout 30 s (heroTag.textContent waited on missing element) |
| DSR-ECO-006 | DSR-ECO-006 [ja] free editing area renders between hero and product list | fail (2 attempts, all timedOut) | 30.5 s + 30.7 s | Test timeout 30 s (boundingBox waited on missing free area) |
| DSR-ECO-012 | DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | pass | 4.4 s | — |
| DSR-ECO-013 | DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | pass | 5.0 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ECO-002 | demo data (Ngọc 21/10) |
| DSR-ECO-004 | demo data (Ngọc 21/10) |
| DSR-ECO-007 | demo data (Ngọc 21/10) |
| DSR-ECO-010 | demo data (Ngọc 21/10) |
| DSR-ECO-009 | demo data (Ngọc 21/10) |

## 6. Failed tests

### DSR-ECO-005 [ja]
- Failing point: `tests/eco-products/DSR-590.eco-products.spec.ts:180` (`eco.heroTag.textContent()` without timeout) → test timeout 30 s; Playwright reported the next call (`:183` `heroImg.count()`) as "Target page … closed".
- Expected: hero tag label, background image, one h1, summary (TC 5.0). Actual: not evaluated (timeout).
- Evidence (not committed, gitignored): `test-results/eco-products-DSR-590.eco-p-b65d2-e-category-name-and-summary-chromium{,-retry1}/test-failed-1.png`
- Proposed cause: test (missing-element read without timeout).

### DSR-ECO-006 [ja]
- Failing point: `tests/eco-products/DSR-590.eco-products.spec.ts:225` (`boundingBox()` on a free-area locator matching nothing) → test timeout 30 s.
- Expected: free editing area between hero and product list (TC 6.0). Actual: not evaluated (timeout).
- Evidence (not committed): `test-results/eco-products-DSR-590.eco-p-700c9-tween-hero-and-product-list-chromium{,-retry1}/test-failed-1.png`
- Proposed cause: test.

## 7. Open points for QA

- Content-value TCs (002, 004, 007, 009, 010) skipped on demo pages per job ("demo data only, check layout only"); not verified.
- ECO-005 tag label: whether the C15 hero must show a separate tag label vs. the round icon is not verified against Figma (node 3351-51595 not accessible to the agent).
- ECO-006: free area position is author-controlled on a demo page; the list locator gap (`[class*="product-list"]` vs `.listing-product-index`) is a test issue to fix with data-testid.
- en/cn not run (job lang: ja).
