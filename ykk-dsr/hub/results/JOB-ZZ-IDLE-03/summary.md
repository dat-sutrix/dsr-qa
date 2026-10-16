# JOB-ZZ-IDLE-03: DSR-583 product-list SP columns spec (idle), DEV, 2026-10-16
Wrote `tests/product-list/DSR-583.product-list.spec.ts`, `pages/ProductListPage.ts`, `fixtures/dsr-583.ts` and `docs/DSR-583/` (baseline-BL-v1, test-data, data-testid). IDs: `DSR-PRODLIST-00N` = TC N.0.
`npx tsc --noEmit`: exit 0, no errors. `npm run test:dev -- tests/product-list`: 9 tests, 0 passed, 4 failed, 5 skipped, exit 1 (11:11–11:13Z). Report: `results/DSR-583/DEV/automation-run-20261016.md`.

Failed (ja, /master/ja/test-space/product-list, 7 cards): 001 (375), 002 (320/360/390/414/430/767), 003 (open/scroll/3 reloads) and 004 (1440/1200/980/768).
Every viewport shows **1 column**, card width = content width (e.g. 327px at 375, 1240px at 1440). No horizontal scroll, no overflow. The count stayed stable across reloads.
Why: the page renders cards variant `product-index`. DEV cards.css defines it as a 1-column row list (Figma 3324:63239 PRODUCTS INDEX, `grid-template-columns: 1fr`), not the 製品検索一覧 grid of Figma 1333-6510. Suspect = data (wrong page for DSR-583), not product. DSR-583 is still To Do.
Skipped: 003 [en] blocked-data (en test-space and /master/en/product-list 404). 005 blocked-data (no filter on page, TD-583-02). 006 [ja/en] visual (codex lane) and 007 manual are fixme.
Open: which DEV page shows the 製品検索一覧 grid? TD-583-03 not met (longest name 31 chars). Selectors are class-based (no data-testid).
Evidence: `evidence/DSR-PRODLIST-00{1..4}_ja.png` (352 KB).
