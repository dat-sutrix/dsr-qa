# DSR-590 DEV automation run — 20261022-rerun-live

Job: JOB-20261022-04 (run-only, ja, layout/structure TCs). rerun after the timeout fix (ENV unset → playwright.config defaults to dev).

## 1. Header

- Run start (UTC): 2026-10-22T02:19:57Z
- Run end (UTC): 2026-10-22T02:21:46Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/ja/test-space/dsr-590-eco-top-page`, `/master/ja/test-space/dsr-590-eco-detail-page` (demo pages, Ngọc 21/10 – demo data only)
- Build under test: not independently verified (EDS main branch at run time)
- Baseline ID: BL-v1 (DSR-590 desc 10/17, Figma C14 3066-24396, URL design P076–P087). New Figma node 3351-51595 not checked (no Figma access on VPS).
- Automation HEAD commit SHA: 17074b71fbaa189501bd2d144cfcaaf9b70ad2c5 + uncommitted working-tree changes of this job (detail demo path, demo-data skips, 2 s read timeouts), committed with this report
- Exact command used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/eco-probe/live-2.json npx playwright test tests/eco-products/DSR-590.eco-products.spec.ts --project=chromium --grep '\[ja\]'
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 11 | 4 | 2 | 5 | 1 | 2 | 1 configured; 2 used (005, 006) | 1m 49s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `--grep '\[ja\]'` of `DSR-590.eco-products.spec.ts`; chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ECO-001 | DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | pass | 7.8 s | — |
| DSR-ECO-003 | DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | pass | 17.6 s | — |
| DSR-ECO-005 | DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary | fail (2 attempts, all failed) | 10.1 s + 10.6 s | soft: `tag label` – hero tag element not found ([class*="tag"]) |
| DSR-ECO-006 | DSR-ECO-006 [ja] free editing area renders between hero and product list | fail (2 attempts, all failed) | 16.1 s + 15.7 s | soft: free area not found; free-area image null; order hero<free<list false (free/list null) |
| DSR-ECO-012 | DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | pass | 1.7 s | — |
| DSR-ECO-013 | DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | pass | 1.9 s | — |

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
- Failing assertion: `tests/eco-products/DSR-590.eco-products.spec.ts:189` – `expect.soft(eco.heroTag, 'tag label').not.toBeEmpty()`.
- Expected: hero shows a tag label (TC 5.0; locator `.hero [class*="tag"]`, TODO data-testid eco-hero-tag). Actual: element(s) not found. Rendered hero = `.hero.banner` → `.hero-banner` (background, 200) + `.hero-intro` with `.hero-intro-icon`, `h1.hero-intro-title` "bluesign認証商品", `.hero-intro-text`, `.hero-intro-cert` (logo + notes). No tag element. Other soft checks passed (background images all 200, exactly one h1, summary non-empty).
- Evidence: `ykk-dsr/hub/results/JOB-20261022-04/evidence/DSR-ECO-005_ja_live.png` (committed); `test-results/…b65d2…/` (not committed).

### DSR-ECO-006 [ja]
- Failing assertions: `:230` free area text not empty (element(s) not found), `:231` free area image 200 (received null), `:232` order hero < free < list (hero y=190, free null, list null).
- Rendered order: `.hero.banner` → `.listing.listing-product-index` (4 product cards on screen) → `.text.block` (centered note "* 一部植物由来の素材…"). There is no content between hero and listing; the only free text is after the listing. The list locator `[class*="product-list"]` does not match `.listing-product-index` either (test locator gap → list y = null).
- Evidence: `ykk-dsr/hub/results/JOB-20261022-04/evidence/DSR-ECO-006_ja_live.png` (committed); `test-results/…700c9…/` (not committed).

## 7. Open points for QA

- Content-value TCs (002, 004, 007, 009, 010) skipped on demo pages per job ("demo data only, check layout only"); not verified.
- ECO-005 tag label: whether the C15 hero must show a separate tag label vs. the round icon is not verified against Figma (node 3351-51595 not accessible to the agent).
- ECO-006: free area position is author-controlled on a demo page; the list locator gap (`[class*="product-list"]` vs `.listing-product-index`) is a test issue to fix with data-testid.
- en/cn not run (job lang: ja).
