# JOB-20261023-21 – DSR-669/670/671 regression on DEV – done
**NEW FAIL (ledger pass → now fail): none.** | TC | lang | last pass | error | CHANGES.md row | cause | confidence | → no rows. **Merge/incident-related (cause ≠ none): none.**
- Runbook: step 1 probe 200 (cookie 0 h, `AUTHOR-PROBE-20261023-0924`). Step 2 models: every `dsr/*` folder now uses only `DM_*_dsr`, plus `DM_techmovie_dsr`; `hubspotFormId`/`promoText` added, `relatedMoodboards` removed (`models-after.md`, `models-diff.txt`). Step 4 not run (job says it is not needed).
- Step 3 lint (21 of 22 manifests; `TD-557-DAM.yaml` does not parse, YAML error at line 14 col 62): 17 manifests FAIL `model-current` + `model-exists` because they still name `DM_*_related` → **Claude: set `model: auto`**. No `field-name` FAIL. Other FAILs (lang-pair, rename-*) are as before.
- Step 5 @overlay (257 tests): 208 pass, 8 fail, 41 skip. P1 non-overlay (557, 583, 570, 552, 609; @auto, non-@overlay): 34 pass, 18 fail, 13 skip. smoke: 1 pass. 0 flaky. `tsc --noEmit` exit 0.
- Step 6: `compare.md`: 0 regressed vs `overlay-before-669.json`, 4 fixed (CATOV-002 ja/en ×2), 0 NEW FAIL vs ledger. Ledger: 196 keys updated, 13 added; ARTICLE-011 and 501-P2/P3 [en] left unchanged (only part of each key ran).
| Fail (all were already failing in the ledger) | suspect | cause | confidence |
|---|---|---|---|
| CATOV-001 ja/en pdf-form + ebook-form: title shows CF sample text "catalog pdf form" (TD-190 expects "QA190 …") | data | none | 0% |
| CATOV-012 ja/en: no list card "QA190 PDF catalog" | data | none | 0% |
| CATDL-007 ja: gated PDF `_publishUrl` in dsr-catalog-list before submit (draft BUG-CAT-PDF-EXPOSE) | product | none | 70% |
| CATDL-016 en: Japanese fixed texts on the en form (draft BUG-CAT-FORM-EN) | product | none | 70% |
| 583 PLSP-002/003/005 ja/en, PRODLIST-001…004 ja: column offsets / timeouts | test | none | 30% |
| 609 TOP-004…007 ja/en: hover, radius, news query-index, title clamp | product | none | 40% |
- Build: `catalog-detail.js` Last-Modified is still Thu, 22 Oct 2026 01:48:45 GMT (both hosts) → **refactor not deployed**, so the 654/570/557 rerun does not cover it.
- 670: model and `dsr-techmovie-page` exist (empty, no tech talks on DEV). 671 (`observations-670-671.md`, Pending proposals): no qa586 product has a related catalog/video with isActive=false → (a) cannot be tested, data needed. (b) `productLabel` is never `{productId}｜{productName}` (stored id or null). `hubspotFormId`/`promoText` are in `dsr-catalog-page` but not in `dsr-catalog-list`.
- Run report: `results/DSR-669/DEV/automation-run-20261023-job21.md`. Evidence: 26 PNGs from a rerun of the failed tests only (the first screenshots were overwritten by later runs).
