# DSR-583 DEV automation run — 20261020

JOB-ZZ-IDLE-17 (idle): new spec `tests/product-list/DSR-583.product-list-sp.spec.ts` (DSR-PLSP-001…005) on the product-list block page. Records columns per viewport; card counts recorded, not asserted.

## 1. Header

- Run start (UTC): 2026-10-20T01:57:44Z
- Run end (UTC): 2026-10-20T02:01:55Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/product-list (HTTP 404) → fallback /{ja,en}/product-list (HTTP 200, `product-list` block, 3 cards each)
- Build under test: not independently verified (no build ID exposed)
- Baseline ID: BL-v1 (ykk-dsr/hub/tc-out/DSR-583.spec.json, TCs 1.0–5.0)
- Automation HEAD commit SHA: 842361e327213d4a4ae6aab78eeaf1e45e41a021 (new spec + fixture/page-object changes uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-583-plsp-run.json npm run test:dev -- tests/product-list/DSR-583.product-list-sp.spec.ts
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 10 | 4 | 6 | 0 | 1 | 2 | 1 configured; 6 used (all 6 failed again on retry) | 4m 10s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (this spec only); chromium. SP = viewport 375×812 + isMobile/hasTouch. Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PLSP-001 [ja] | SP 375px: exactly 2 card columns, no horizontal scroll | passed | 7.5s | — |
| DSR-PLSP-002 [ja] | SP widths 320–767: 2 card columns at every width | failed | 18.4s / 15.7s | 767 → 3 columns; 320 → all 3 cards overflow their column |
| DSR-PLSP-003 [ja] | SP column count stays 2 after scroll, filter and reload | failed | 30.6s / 30.5s | timeout in filter step: test locator never matches (test defect) |
| DSR-PLSP-004 [ja] | PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 6.9s | — |
| DSR-PLSP-005 [ja] | SP odd result count: last card = other card width, left aligned | failed | 3.1s / 2.9s | "left aligned" compares card left 2 vs grid border-box left 0 (test defect); width OK |
| DSR-PLSP-001 [en] | SP 375px: exactly 2 card columns, no horizontal scroll | passed | 2.3s | — |
| DSR-PLSP-002 [en] | SP widths 320–767: 2 card columns at every width | failed | 14.5s / 14.1s | same as ja |
| DSR-PLSP-003 [en] | SP column count stays 2 after scroll, filter and reload | failed | 30.4s / 30.5s | same as ja |
| DSR-PLSP-004 [en] | PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 10.3s | — |
| DSR-PLSP-005 [en] | SP odd result count: last card = other card width, left aligned | failed | 6.3s / 7.1s | same as ja |

Columns per width (ja and en identical, 3 cards; columns = distinct card left values in first row; tracks = grid-template-columns):

| Viewport | grid-template-columns | Tracks | First-row columns | Card width | Overflow | scrollWidth | Expected |
|---:|---|---:|---:|---:|---|---:|---|
| 320 | 159px 159px | 2 | 2 | 159 | all 3 cards | 320 | 2 |
| 360 | 179px 179px | 2 | 2 | 179 | none | 360 | 2 |
| 375 | 186.5px 186.5px | 2 | 2 | 186.5 | none | 375 | 2 |
| 390 | 194px 194px | 2 | 2 | 194 | none | 390 | 2 |
| 414 | 206px 206px | 2 | 2 | 206 | none | 414 | 2 |
| 430 | 214px 214px | 2 | 2 | 214 | none | 430 | 2 |
| 767 | 255px ×3 | 3 | 3 | 255 | none | 767 | 2 (A2: SP < 768) |
| 768 | 255.328px ×3 | 3 | 3 | 255.3 | none | 768 | 3 (Figma) |
| 1024 | 219.328px ×3 | 3 | 3 | 219.3 | none | 1024 | recorded only |
| 1440 | 268.5px ×4 | 4 | 3 (only 3 cards) | 268.5 | none | 1440 | 4 (Figma) |

DSR-PLSP-003 checkpoints recorded before the timeout: open = 2, scroll-bottom = 2 (no load-more button). Filter and reload checkpoints not reached.
DSR-PLSP-005: unfiltered list = 3 cards (odd), so no filter was needed; last card 186.5px = first card 186.5px (width check passed).

## 5. Skipped tests

None.

## 6. Failed tests

The spec's `afterEach` annotates every failure with `suspect: product – ticket To Do` (job step 5). The analysis below overrides that annotation for 003 and 005, which are test defects.

### DSR-PLSP-002 — [ja]/[en] SP widths 320–767: 2 card columns at every width

- Failing assertions: `expect.soft(m.overflow, '320: cards overflowing their column').toEqual([])` (`tests/product-list/DSR-583.product-list-sp.spec.ts:45`); `expect.soft(m.firstRowColumns, '767: …').toBe(2)` (`:43`); `expect.soft(m.tracks, '767: …').toBe(2)` (`:44`)
- Expected: 2 columns at 320/360/375/390/414/430/767, no card overflow, no horizontal scroll
- Actual: 2 columns at 320–430, **3 columns at 767**, which means DEV's SP→TB breakpoint is below 767. At 320, all 3 cards have scrollWidth > clientWidth + 1 (content overflows the 159px card). No horizontal page scroll at any width
- Attempt(s): failed / failed (same values)
- Proposed suspect: product (ticket To Do). The 767 result depends on the unconfirmed breakpoint (Q22/A2), so it could also turn out to be a test assumption
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-17/evidence/DSR-PLSP-002_ja.png, DSR-PLSP-002_en.png (committed); test-results/product-list-DSR-583.produ-5da44-…-retry1/, test-results/product-list-DSR-583.produ-777ce-…-retry1/

### DSR-PLSP-003 — [ja]/[en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: test timeout 30000 ms at `group.evaluate(...)` in `pages/ProductListPage.ts:112` (`toggleBlockFilter`, called from spec line 87)
- Expected: 2 columns at open, scroll-bottom, filter, reload ×3
- Actual: open = 2, scroll-bottom = 2. The filter step hung because `this.listing.locator('.pl-filter-group').filter({ has: option })` uses an `option` locator rooted at `main .product-list.block`, which can never match inside a group. **Test defect**; the product was not exercised. Filter and reload checkpoints were not recorded
- Attempt(s): timedOut / timedOut
- Proposed suspect: test
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-17/evidence/DSR-PLSP-003_ja.png, DSR-PLSP-003_en.png (committed); test-results/product-list-DSR-583.produ-063f2-…-retry1/, test-results/product-list-DSR-583.produ-fa118-…-retry1/

### DSR-PLSP-005 — [ja]/[en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `expect.soft(m.cardLefts[0], '3 results: left aligned').toBe(gridLeft)`, `tests/product-list/DSR-583.product-list-sp.spec.ts:130`
- Expected (spec 5.0): last card width = other card width (±2px) and left aligned
- Actual: width 186.5 = 186.5 (passed). Card left = 2, grid `getBoundingClientRect().left` = 0. The first card sits in the first column, so the card is left aligned. The 2px is likely grid padding, so comparing against the border box is a **test defect**
- Attempt(s): failed / failed
- Proposed suspect: test
- Evidence paths: ykk-dsr/hub/results/JOB-ZZ-IDLE-17/evidence/DSR-PLSP-005_ja.png, DSR-PLSP-005_en.png (committed); test-results/product-list-DSR-583.produ-58aaf-…-retry1/, test-results/product-list-DSR-583.produ-a7886-…-retry1/

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- DSR-583 is still To Do (owner Martin). Even so, the `/{lang}/product-list` page already shows 2 columns at 320–430 and 3 at 767/768. This page is the product-list block, not the 1-column `product-index` listing used in the 20261016 run.
- SP breakpoint (Q22) is still unknown. DEV switches to 3 columns at or below 767; the exact switch width was not measured.
- Two test defects (003 filter locator, 005 left-aligned reference) were not fixed and re-run, because the job said "run once". Before the next run: build the `has:` locator relative to the group (e.g. iterate `.pl-filter-group` and their own `.pl-filter-option`), and compare the card's left edge with the grid content-box left (rect.left + border + padding).
- Filter behaviour not verified at SP: every filter option gave 1 result in a pre-run probe (unscripted, ja). Spec 5.0 asks for a 3-result filter (TD-583-02); the unfiltered 3-card list was used instead.
- Only 3 cards on the page (post-overlay merge). TD-583-01 (≥ 6) not met; counts recorded, not asserted. The 1440 first row shows 3 cards against 4 tracks.
- The 3.0 job step asked to reload; the spec reloads 3 times (fixture `reloads`, spec 3.0). Not reached in this run.
- 4.0 widths follow the job (768/1024/1440), not spec (1440/1200/980/768). The 1024 width has no Figma frame and is recorded only.
- Selectors are class-based (`.pl-grid`, `.pl-card`, `.pl-filter-option`); no data-testid on the block. TODOs are in pages/ProductListPage.ts.
- Build identity not verified.
