# JOB-20261020-04 – DSR-557 catalog + DSR-570 on re-seeded catalogs (claude-code, DEV .aem.live, ja+en, 2026-10-21 16:51–16:55Z)
## Merge/incident-related (no test fails; records)
| Item | Observed | cause | conf. bug | suspect |
|---|---|---|---|---|
| Old cards expected to disappear (BL-OVL-1 20/10 12:40) | **None disappeared.** dm-catalog-list still returns all 15 old-folder CFs (`/content/dam/ykk/common/product-cf/test/…`); ja and en list pages show the same 26 cards (no language filter) | overlay-merge | 55% | product (list not yet on overlay?) |
| Id collision old ↔ new | Old gated cards "QA190 PDF form required"/"QA190 e-book form" (requiresForm=true) link to /{lang}/library/catalog/{id}, which now resolves to the ungated re-seeded CF | overlay-merge | 30% | data |
## Result
- Code: fixtures retargeted to `/content/dam/common/{lang}/catalogs/{qa190-cat-pdf,-pdf-form,-ebook,-ebook-form}` (title resolved from dm-catalog-list by `_path`); NEW/UPD CFs (not re-seeded) stay on the old folder. 570 form TCs try /{lang}/library/catalog/qa190-cat-pdf-form first, fall back to the demo page. tsc no errors.
- DSR-557 (12.0–20.0): 12 pass, 0 fail, 2 skip (017 ja/en). DSR-570: 5 pass (001/002/003 ja on demo page, 005 ja/en), 0 fail, 11 skip.
- Detail URL (actual): `/{lang}/library/catalog/{id}` – all 8 ja/en core ids 200 on .live and .page, source=overlay, cf-path = DSR CF, robots noindex.
- **Main blocker = data (0% bug):** re-seeded content CFs carry dev-sample values, not TD-190: titles "catalog pdf / catalog pdf form / catalog ebook / catalog ebook form" (ja pdf = "qa190-cat-pdf"), dates 2026-09-03, and **requiresForm=false on both `-form` ids** → CATV-017, CATDL-006/007/010/017/018 blocked; overlay detail of pdf-form shows no form (non-form → file). Night Report 21/10 "Pass" did not catch this.
- en demo page 404 → CATDL-001/002/016 en blocked (as before).
- Next: QA-PT sets requiresForm=ON on `common/{ja,en}/catalogs/qa190-cat-pdf-form` + `-ebook-form` (titles/dates per TD-190), re-publish; then rerun both specs. Ask Martin whether the catalog list should drop old-folder CFs and filter by language.
- No evidence screenshots (no fails). Read-only; no form submitted. Reports: results/DSR-557/DEV/ and results/DSR-570/DEV/automation-run-20261021-job20261020-04.md.
