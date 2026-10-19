# DSR-590 DEV automation run — 20261019-c14

Job: JOB-20261019-08 (C14 TOP demo page). Ngoc asked for the C14 TOP page only (Jira 61343/61370, 19/10). The scaffold from JOB-ZZ-IDLE-11 now targets the DEV demo page first and falls back to the URL-design paths (A1).

## 1. Header

- Run start (UTC): 2026-10-19T12:18:04Z
- Run end (UTC): 2026-10-19T12:21:16Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/ja/test-space/dsr-590-eco-top-page` (200), `/master/en/test-space/dsr-590-eco-top-page` (404). C15 detail and finder URLs are all still 404 (table below).
- Build under test: DEV main branch. Demo page `published-time` 2026-10-19T04:42:04Z. The application SHA was not independently verified.
- Baseline ID: BL-v1. Source: `ykk-dsr/hub/tc-out/DSR-590.spec.json` (DSR-590 BAC#1 / TCC#1, Figma 3066-24396, A1–A9).
- Automation HEAD commit SHA: 149ce852ed105710efee0a051113298c58c0e39c. The spec, page object and fixture changes were uncommitted when the run started; they are committed together with this report.
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-590-c14.json npm run test:dev -- --grep "DSR-ECO"
```

### URL status on DEV (recorded only, no verdict)

Command: `ENV=dev node fixtures/dsr-590-url-status.cjs`, checked 2026-10-19T12:21:28Z. Row 0 (demo page) was added in this job.

| # | Page | ja | en | /master/ja | /master/en |
|---:|---|---|---|---|---|
| 0 | /master/{lang}/test-space/dsr-590-eco-top-page (C14 demo) | – | – | 200 | 404 |
| 1 | /{lang}/product/performance/sustainable (TOP) | 404 | 404 | 404 | 404 |
| 2–10 | …/sustainable/<9 category slugs> | 404 | 404 | 404 | 404 |
| 11 | …/sustainable/sustainable-solution-finder | 404 | 404 | 404 | 404 |

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 19 | 4 | 2 | 13 | 1 | 1 (config 2; single spec file, not fullyParallel) | configured 1; 2 used (both failed tests failed again on retry) | 190.3 s (Playwright), 192 s (shell) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: `--grep DSR-ECO`, Chromium only. Flaky outcomes: 0.
The job covers 001–004, 012 and 013. The grep also matched the C15 tests 005/006/007/009/010, which are out of scope for this job; they were skipped at preflight.

## 4. Executed tests

Durations are per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ECO-001 | DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | passed | 5.1 s | — (9 cards = 9 in A3, no Q37 note; 0 console errors) |
| DSR-ECO-002 | DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language) | failed | 2.7 s / retry 2.9 s | All 9 VIEW MORE links point to `http://google.com/` (not on the site, no `/master/ja` prefix, slugs ≠ TD-590-02) |
| DSR-ECO-003 | DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | passed | 14.5 s | — |
| DSR-ECO-004 | DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200) | failed | 2.3 s / retry 2.5 s | Finder link points to `https://google.com/`, not P087 on the same site |
| DSR-ECO-012 | DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | passed | 2.0 s | — (12 URLs, all `media_` hashes) |
| DSR-ECO-013 | DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | passed | 2.5 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ECO-001 [en] | en demo page not on DEV |
| DSR-ECO-002 [en] | en demo page not on DEV |
| DSR-ECO-004 [en] | en demo page not on DEV |
| DSR-ECO-013 [en] | en demo page not on DEV |
| DSR-ECO-013 [cn] | cn: no /master/cn on DEV (Issue #18) (fixme) |
| DSR-ECO-005 [ja], [en] | DSR-590 page not on DEV (out of job scope, C15) |
| DSR-ECO-007 [ja], [en] | DSR-590 page not on DEV (out of job scope, C15) |
| DSR-ECO-010 [ja], [en] | DSR-590 page not on DEV (out of job scope, C15) |
| DSR-ECO-006 [ja] | DSR-590 page not on DEV (out of job scope, C15) |
| DSR-ECO-009 [ja] | DSR-590 page not on DEV (out of job scope, C15) |

## 6. Failed tests

### DSR-ECO-002 [ja] — each category card VIEW MORE links to its TD-590-02 detail page (200, same language)

- Failing assertion: `expect.soft(…, 'VIEW MORE not on site with same language prefix').toEqual([])` — `tests/eco-products/DSR-590.eco-products.spec.ts:106`
  - Expected: `[]` (every VIEW MORE on `main--dsr-eds-dev--sutrix-projects.aem.live` under `/master/ja/`)
  - Actual: 9 × `http://google.com/`
- Failing assertion: `expect.soft(…, 'detail slugs = TD-590-02').toEqual(…)` — `tests/eco-products/DSR-590.eco-products.spec.ts:108`
  - Expected: `bio-based, bluesign-approved, circularity, natural-fiber, non-plated, recycled, renewal, sustainable-metal-finish, water-saving`
  - Actual: 9 × `""` (href path `/`)
- Passed checks: no `ykkdigitalshowroom.com` link. Each target answered 301 → 200, so no target was 404 and the "detail page not on DEV" skip did not apply.
- Attempt(s): failed / retry failed (identical).
- Evidence paths: `ykk-dsr/hub/results/JOB-20261019-08/evidence/DSR-ECO-002_ja.png` (committed); `test-results/eco-products-DSR-590.eco-p-b04ae-ail-page-200-same-language--chromium-retry1/` (trace, error-context; not committed)

### DSR-ECO-004 [ja] — 環境配慮型製品診断 button links to the product finder (P087, 200)

- Failing assertion: `expect.soft(finderPaths(lang), 'finder URL (P087), same language').toContain(…)` — `tests/eco-products/DSR-590.eco-products.spec.ts:122`
  - Expected: path in `/ja/…/sustainable-solution-finder` or `/master/ja/…/sustainable-solution-finder`
  - Actual: `""` (href `https://google.com/`)
- Failing assertion: `expect.soft(origin, 'finder link on the same site').toBe(…)` — `tests/eco-products/DSR-590.eco-products.spec.ts:123`
  - Expected: `https://main--dsr-eds-dev--sutrix-projects.aem.live`; Actual: `https://google.com`
- The button is present. The link answered 301 → 200, so the "finder page (S10) not built" skip did not apply.
- Attempt(s): failed / retry failed (identical).
- Evidence paths: `ykk-dsr/hub/results/JOB-20261019-08/evidence/DSR-ECO-004_ja.png` (committed); `test-results/eco-products-DSR-590.eco-p-54993-he-product-finder-P087-200--chromium-retry1/` (not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Both failures look like **demo content placeholders**: the author set every VIEW MORE link and the finder link to google.com. The real detail pages (C15) and the finder (S10) are not on DEV. Suspected cause: data, not the block. Confirm with Ngoc whether real links are expected on the demo page.
- Every card on the demo page has the same name and summary (`bluesign認証商品`). Category names therefore cannot be compared with TD-590-02. DSR-ECO-003 tracks cards by `data-index`, not by name. Non-empty name and summary pass, but the content was not verified against the category list.
- The carousel renders 9 real cards plus 18 loop clones (`.is-clone`, `aria-hidden`). The clones are excluded from the count. 9 cards and 9 dots match A3, so no Q37 note was raised. Figma shows 8 dots, so Q37 is still open on the design side.
- DSR-ECO-012: 12 URLs are in scope (block background and card images/icons), and all are `./media_` hashes. The carousel arrow icon `/blocks/eco-carousel/assets/arrow-pc.svg` is code-bundled. I classified it as a UI control, not a background, so it was only recorded. QA should confirm this scope.
- DSR-ECO-013 checked only links inside `<main>`: 2 breadcrumb links, both `/master/ja`. Header and footer links were not checked.
- The cards and dots have no ARIA state, so selectors use block classes (`.eco-carousel-card`, `.is-active`, `.eco-carousel-dot`) with `// TODO: data-testid`. The active dot is shown by `aria-current=""`.
- The en demo page is 404, so all en cases were skipped. cn is fixme (Issue #18). The demo page path is not the URL-design path (A1), so automation must be re-run when the real TOP is published.
- The build SHA was not verified.
