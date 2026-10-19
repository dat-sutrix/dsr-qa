# JOB-ZZ-IDLE-11 — DSR-590 eco-friendly scaffold (DEV)

- Scaffold written: fixtures/dsr-590.ts, pages/EcoProductsPage.ts, tests/eco-products/DSR-590.eco-products.spec.ts. Titles DSR-ECO-001…013 cover Automation TCs 1.0–7.0, 9.0, 10.0, 12.0, 13.0 in ja/en. 13.0 [cn] is fixme (Issue #18).
- URL status probe: fixtures/dsr-590-url-status.cjs. All 11 URLs (TOP, 9 details, finder) return 404 on DEV in ja and en, with and without the /master prefix. Recorded in the run report.
- Q14 product query-index candidates are all 404. Only the site /query-index.json exists, and it has no eco tag column.
- tsc: no errors. Run `npm run test:dev -- --grep "DSR-ECO"`: 19 tests, 0 passed, 0 failed, 19 skipped, exit 0.
- Why skipped: the DSR-590 pages are not on DEV (ticket To Do – Ngoc). Nothing in the scaffold has been exercised against a real page, so selectors are unverified (TODO data-testid).
- Risk: detail preflight tries up to 18 URLs and took up to 27.7 s against the 30 s timeout. It could time out instead of skipping. A fix is suggested in the report but not applied, because the job says to run once.
- TD-590-06 (0-product detail) is not identified; set DSR590_TD06=<slug> to run 9.0.
- Report: results/DSR-590/DEV/automation-run-20261019.md.
