# JOB-20261022-09 – Author P1b prep (DEV, GET only) – status: done
Merge/incident-related fails: none. The only lint FAILs (TD-586) are cause `none`, confidence 0% (manifest/guard, not a product bug). Only GET requests went to Author DEV. `--apply` and `AUTHOR_WRITE_ENABLED` were not used, so every dry-run gate shows ⛔ env + ⛔ --apply.

**Step 1 – probe checks 1–6 (04:43Z): all 200. Cookie age: 0h** (refreshed 11:35 VN).
**Code (decision 2):** item-level `lang_pair: false` + `lang_pair_reason` → lint WARN with the reason; `lang_pair: false` without a reason → still FAIL (checked). Files: `tools/author/lib/{lint,manifest}.mjs`, README. `npx tsc --noEmit` exit 0.

| Manifest | Lint PASS/FAIL/WARN | Writes | Plan (method · path · fields) |
|---|---|---|---|
| P1B-PROBE (new) | 18 / 0 / 2 | 2 | POST create `common/en/movies/qaagent-probe` (DM_movie: movieId, movieTitle "QA agent probe", description, thumbnail `ykk/digital-showroom/test/png/image 7.png`, movieSource youtube, publishDate 2026-10-22) → POST publish agentId preview. en only (`lang_pair: false`, write test) |
| TD-586-01-02.resolved | 50 / **8** / 4 | 4 | No field change (all 4 CFs exist with the manifest values) → POST publish preview: content + DSR 990586001/002; publish: content + DSR 990586001 |
| BUGCHK-190-FORM (new) | 38 / 0 / 0 | 6 | PATCH `requiresForm` false→true on `common/{ja,en}/catalogs/qa190-cat-pdf-form` and `…/qa190-cat-ebook-form` → POST publish preview, then publish (4 content CFs) |
| TD-654-02-08 (new) | 202 / 0 / 18 | 15 | POST create 6 content CFs (DM_catalog, all required fields + pdfAsset, requiresForm false): qa654-inactive ja+en, -preview, -content-only, -update ("QA654 before"), -content-unpub (en) → 5 DSR CFs (DM_catalog_related, `catalog` ref same lang): inactive ja+en (isActive **false**), preview, update, content-unpub (isActive true) → preview: 5 content + 5 DSR; publish: 5 content (not content-unpub) + 4 DSR (not qa654-preview) |
WARNs: lang-pair opt-outs and "missing → would create" only. Full tables: `<manifest>/lint.md`, `apply-dry-run.md`, `plan.json`, `before.json`.

**TD-586 FAILs, not fixed:** path-guard + node-name ×4 (`common|dsr/ja/products/990586001|990586002`). Decision 1 says these nodes are "inside the guard", but `guard.mjs` only allows `qa*` node names, so lint FAILs and apply stays locked. I did not widen the guard. Decision 4 needed no action: the required productCategories/applications/media01Asset already pass (patch = manifest ∪ live). Observed live state: content CF 990586002 = PUBLISHED, but TD-586-02 says it must not be on .live. The tool cannot unpublish it.
**BUGCHK-190-FORM:** the live content CFs are in `common/{lang}/catalogs/` (inside the guard), so this is not an "outside guard → QA-PT" case. Copies also exist at `ykk/common/product-cf/test/` (outside the guard); they were not touched.
**TD-654 excluded:** 03 qa654-removed (needs an unpublish, so it stays with QA-PT). 05 qa654-sub: the DSR CF in sub-folder `dsr/en/catalogs/qa654-folder/` is outside the guard, and the tool cannot create folders, so it goes to QA-PT. 08 assumption: "publish both → unpublish content" is modelled as "content CF never replicated". The tag `site:product/material/aluminium` and the thumbnail are copied from the live qa190-cat-pdf.
**Unverified (D11):** `agentId: preview`, and whether publish with `filterReferencesByStatus: []` really leaves referenced CFs unpublished (this matters for 08 and 586-02).
