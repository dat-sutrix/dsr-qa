# JOB-ZZ-IDLE-12 — DSR-227 asset migration scaffold (DEV)

- New files: fixtures/dsr-227.ts, pages/AssetAudit.ts, tests/asset-migration/DSR-227.asset-migration.spec.ts.
  - Titles DSR-ASSET-003/009/010/012–017 cover Automation TCs 3.0, 9.0, 10.0, 12.0–17.0 in ja/en. 017 is a single ja+en test.
- Product pages: DEV query-index has 0 `/{lang}/products/<digits>` rows.
  - The en fallback (moustache branch aem.page /en/products/46) returns 200; the ja one returns 404.
- Run `npm run test:dev -- --grep "DSR-ASSET"`: 17 tests, 0 passed, 0 failed, 17 skipped, exit 0, 79 s.
  - ja/017: "DSR-227 no product page on DEV".
  - en: the baseline was recorded, then the test skipped because the TD-227-02 sample ids are not delivered (no verdict).
- Baseline (en fallback):
  - 0 asset responses ≥ 400.
  - 6 naming violations, all `QUICKFIT®_n` (DM scene7 and `/content/dam/ykk/common/products/product-sample/QUICKFIT®_7.png`).
  - Roots: EDS media_, /blocks/, s7ap1.scene7.com/is/image/YKKCORPORATIONDEV, publish /content/dam, placehold.co.
- tsc: the first check failed with type-only errors in 012 and the run had already started. Fixed; re-check has no errors. Not re-run (job says run once).
- WebKit cannot launch on the VPS (missing host deps), so the WebKit half of 013 cannot run here.
- To switch to verdicts, set DSR227_SAMPLE_IDS=<ids> once dev delivers the sample products.
- Report: results/DSR-227/DEV/automation-run-20261019.md.
