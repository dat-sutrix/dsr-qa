# DSR-583 DEV automation run — 20261016

First run of the new product-list SP column spec (JOB-ZZ-IDLE-03, idle). Records the computed grid column count and card width per viewport.

## 1. Header

- Run start (UTC): 2026-10-16T11:11:08Z
- Run end (UTC): 2026-10-16T11:13:28Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/test-space/product-list (primary); fallback /master/{ja,en}/product-list (A1)
- Build under test: not independently verified (no build ID exposed). Live `/blocks/cards/cards.css` on DEV was read at 11:13Z for the root-cause note in section 6
- Baseline ID: BL-v1 (docs/DSR-583/baseline-BL-v1.md, copied from ykk-dsr/hub/tc-out/DSR-583.spec.json)
- Automation HEAD commit SHA: 1999cd39ac86439dd0e061a982e11b00494808e8 (spec files uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-583-run.json npm run test:dev -- tests/product-list
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 9 | 0 | 4 | 5 | 1 | 2 | 1 configured; 4 used (all 4 failures failed again on retry) | 2m 18s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/product-list`; chromium only (firefox/webkit projects match DSR-552 only). SP tests use viewport 375×812 with `isMobile`/`hasTouch`. Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PRODLIST-001 [ja] | SP 375px: exactly 2 card columns, no horizontal scroll | failed | 8.4s / 7.8s | 1 column (grid-template-columns `327px`), card width 327px; expected 2 |
| DSR-PRODLIST-002 [ja] | SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed | 20.7s / 19.1s | 1 column at every width 320/360/390/414/430/767; expected 2 |
| DSR-PRODLIST-003 [ja] | SP column count stays 2 after scroll, load more, filter and 3 reloads | failed | 12.0s / 12.1s | 1 column at open, scroll-bottom, reload 1–3 (stable, never 2); filter step not run |
| DSR-PRODLIST-004 [ja] | PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed | 14.2s / 17.5s | 1 column at 1440/1200/980/768; expected 4/4/3/3 |

Measured per viewport (ja, 7 cards; same in both attempts):

| Viewport | grid-template-columns | Columns (distinct left offsets) | Card width (px) | Cards per row | scrollWidth | Expected columns |
|---:|---|---:|---:|---|---:|---:|
| 320 | 272px | 1 | 272 | 1×7 | 320 | 2 |
| 360 | 312px | 1 | 312 | 1×7 | 360 | 2 |
| 375 | 327px | 1 | 327 | 1×7 | 375 | 2 |
| 390 | 342px | 1 | 342 | 1×7 | 390 | 2 |
| 414 | 366px | 1 | 366 | 1×7 | 414 | 2 |
| 430 | 382px | 1 | 382 | 1×7 | 430 | 2 |
| 767 | 719px | 1 | 719 | 1×7 | 767 | 2 |
| 768 | 720px | 1 | 720 | 1×7 | 768 | 3 |
| 980 | 916px | 1 | 916 | 1×7 | 980 | 3 |
| 1200 | 1136px | 1 | 1136 | 1×7 | 1200 | 4 |
| 1440 | 1240px | 1 | 1240 | 1×7 | 1440 | 4 |

No horizontal scroll and no card overflow at any width (those assertions passed).

## 5. Skipped tests

Reasons copied verbatim from the Playwright JSON report (`test.skip` / `test.fixme` annotations).

| TC ID | Verbatim skip reason |
|---|---|
| DSR-PRODLIST-003 [en] | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 [ja] | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 [ja] | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 [en] | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 [ja] | Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |

## 6. Failed tests

Common cause for all four: the page renders listing `product_index` → `.cards.product-index`. DEV `blocks/cards/cards.css` defines this variant as "製品インデックス行 — borderless horizontal row … Figma 3324:63239 (環境配慮型製品一覧 / PRODUCTS INDEX)" with `.cards.product-index > ul { grid-template-columns: 1fr; }`, i.e. one column at every width by design. The DSR-583 TCs target the 製品検索一覧 card grid (Figma 1333-6510). Proposed suspect: **data** (page under test is not the DSR-583 grid). Not confirmed with dev.

### DSR-PRODLIST-001 — [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `expect.soft(m.columns, '375: distinct column offsets').toBe(2)`, `expect.soft(m.tracks, …).toBe(2)` and `row 1..6 cards toBe(2)`. Helper `expectColumns` at `tests/product-list/DSR-583.product-list.spec.ts:33-36`, called from line 49
- Expected: 2 distinct column offsets, 2 cards per full row, scrollWidth ≤ 375
- Actual: 1 offset (left 24px), grid-template-columns `327px`, 1 card per row, scrollWidth 375 (OK)
- Attempt(s): failed / failed (retry)
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-03/evidence/DSR-PRODLIST-001_ja.png (committed); test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/ (screenshot, trace, error-context)

### DSR-PRODLIST-002 — [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `expectColumns(m, 2, '<width>')`: `tests/product-list/DSR-583.product-list.spec.ts:33-36`, called from line 60
- Expected: 2 columns at 320, 360, 390, 414, 430, 767 (A2: SP < 768)
- Actual: 1 column at all six widths (see the table in section 4); no overflow, no horizontal scroll
- Attempt(s): failed / failed (retry)
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-03/evidence/DSR-PRODLIST-002_ja.png (committed); test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/

### DSR-PRODLIST-003 — [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `expect.soft(m.columns, '<step>: distinct column offsets').toBe(2)` and `expect.soft(m.tracks, …).toBe(2)`: `tests/product-list/DSR-583.product-list.spec.ts:70-71`
- Expected: 2 columns at every checkpoint (never 3 or 1)
- Actual: 1 column at open, scroll-bottom, reload-1, reload-2, reload-3. The count was stable (no 3↔2 switching seen). No load-more button; filter step not run (no filter control)
- Attempt(s): failed / failed (retry)
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-03/evidence/DSR-PRODLIST-003_ja.png (committed); test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/

### DSR-PRODLIST-004 — [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `expect.soft(m.columns, '<width>: distinct column offsets').toBe(columns)` and `expect.soft(m.tracks, …)`: `tests/product-list/DSR-583.product-list.spec.ts:153-154`
- Expected: 1440 → 4, 1200 → 4, 980 → 3, 768 → 3
- Actual: 1 column at all four widths (card width 1240/1136/916/720)
- Attempt(s): failed / failed (retry)
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-03/evidence/DSR-PRODLIST-004_ja.png (committed); test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- The page under test (/master/ja/test-space/product-list) uses the `product-index` variant, which is a 1-column list by design (cards.css). QA/dev should confirm which DEV page shows the 製品検索一覧 grid from Figma 1333-6510. Until then the four failures are not evidence of a product defect.
- DSR-583 is still To Do (waiting for customer info, 10/14), so no fix is on DEV yet.
- en page missing (test-space and A1 path both 404) → DSR-PRODLIST-003 [en] blocked-data. /master/ja/product-list (A1) also 404.
- TD-583-02: no filter control on the page → DSR-PRODLIST-005 blocked-data; DSR-PRODLIST-003 filter step not run.
- TD-583-03 not met: longest name has 31 chars (needs ≥ 40). Relevant for the visual TC 006 (codex lane).
- SP breakpoint assumed < 768 (A2 / Q22; default kept per Dat 16/10). "Rotation within SP range" in TC 2.0 is covered only by the width list, not by real rotation.
- SP emulation = Chromium viewport 375×812 + isMobile/hasTouch, not the full iPhone 13 device descriptor (390×844).
- Selectors are class-based (no data-testid in DOM); see docs/DSR-583/data-testid.md.
- Build identity not verified.
