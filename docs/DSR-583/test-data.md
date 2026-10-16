# DSR-583 test data (DEV)

All checks are read-only. Page paths are fixture values (`fixtures/dsr-583.ts`): primary `/master/{lang}/test-space/product-list` (JOB-ZZ-IDLE-03), fallback `/master/{lang}/product-list` (A1). Override the primary without code change: `DSR583_ROOT=product-list npm run test:dev -- tests/product-list`.

| TD | Page | Used by | Status on DEV 2026-10-16 11:1x UTC |
|---|---|---|---|
| TD-583-01 | /master/ja/test-space/product-list | 001–004, 006, 007 | 200, 7 cards (≥ 6 OK). Renders listing `product_index` → cards variant `product-index` (1-column row list, Figma 3324:63239), not the 製品検索一覧 grid of Figma 1333-6510 |
| TD-583-01 | /master/en/test-space/product-list | 003 [en], 006 [en] | 404; fallback /master/en/product-list 404 → blocked-data |
| TD-583-01 | /master/ja/product-list (A1) | fallback | 404 |
| TD-583-02 | filter on same page | 005 | No filter control (`.listing-chip`) on the page → blocked-data |
| TD-583-03 | longest product name | 006 (visual) | Longest ja name "Related 05 ADVANCEN® for ISOFIX" (31 chars) < 40 → TD-583-03 not met |

Card names on ja (2026-10-16): ADVANCEN® for ISOFIX, productName, Related ADVANCEN® for ISOFIX, Related 02–05 ADVANCEN® for ISOFIX.
