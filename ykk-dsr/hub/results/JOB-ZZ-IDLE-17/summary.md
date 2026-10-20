# JOB-ZZ-IDLE-17 – DSR-583 product list SP 2 columns (DEV)

- New spec `tests/product-list/DSR-583.product-list-sp.spec.ts` (DSR-PLSP-001…005 × ja/en = 10 tests). Reuses ProductListPage (new `blockSelectors` set) and fixtures/dsr-583.ts.
- Page: /master/{lang}/product-list = 404 → fallback /{lang}/product-list (200, product-list block, 3 cards per lang).
- tsc: no errors. Run once: 4 passed, 6 failed, 0 skipped (exit 1). Report: results/DSR-583/DEV/automation-run-20261020.md.
- Columns: 320–430 = 2; 767 = 3; 768 = 3; 1024 = 3; 1440 = 4 tracks. 375 = 2 columns, no horizontal scroll (001 pass). PC/TB matches Figma 768→3, 1440→4 (004 pass).
- 002 fail (suspect product, ticket To Do): 767 shows 3 columns, so DEV's breakpoint is below the assumed SP<768 (Q22 open). At 320 all cards overflow their column.
- 003 fail (suspect test): filter-step locator bug (`filter({has})` rooted at the block) → timeout. open/scroll-bottom = 2; filter/reload not measured.
- 005 fail (suspect test): odd count (unfiltered 3) last card width = others (OK); left-aligned check used grid border-box (0) vs card left (2).
- Test defects in 003/005 were not fixed or re-run (job: run once). Fix them before the next run.
- Only 3 cards on the page (TD-583-01 ≥ 6 not met). Counts recorded, not asserted.
