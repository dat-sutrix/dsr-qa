# JOB-20261021-10 – tools/author P1a′ fixes (D8–D11), DEV, read-only – status: done
Merge/incident-related fails: none. All lint FAILs below: cause `none`, confidence 0% (test-data / manifest state, not product bugs). Only GETs sent to Author DEV (no POST/PUT/PATCH/MOVE/DELETE).

**Code** (`tools/author/lib`): D8 `guard.mjs` rename-source guard `qa-?[0-9a-z]…` + `assertRenamable` (strict target, same folder; lint + again before MOVE). D9 lint `ref-set-after-rename` (DSR item reached via rename must set its content-CF ref). D10 content-cf default `replicate: [preview, publish]`; plan publishes per tier content CFs first, then DSR CFs. Also: `each:`/`{id}` expansion (TD-587-14-15, TD-190 used it; loader did not support it), lang-pair skipped for rename items, L3 tiers from expanded items. README + AUTHOR-AGENT.md §1 (D8–D11) updated. Offline self-test 12/12 OK; `node --check` OK; `npx tsc --noEmit` exit 0.
**Manifests**: TD-587-01.resolved + 2 rename items (ja common; en/ja DSR `qa-587-main → qa587-main`) + content `replicate`. New `*.resolved.yaml`: TD-587-14-15 (comments only + replicate), TD-557-DAM (`movieSource: DAM → dam`, enum is youtube/youku/dam; quoted refs – source file is invalid YAML), TD-190-CAT-CORE (model DM_catalog_related; `catalogId` removed – not a field of that model; `catalog` ref = `/content/dam/ykk/common/product-cf/test/{id}`, as on the live en DSR CFs), TD-586-01-02 (DM_product_related; [Giả định] 990586002 content CF preview only).

**Lint** (`lint-*.md/json`):
| Manifest | PASS | FAIL | WARN | FAILs |
|---|---|---|---|---|
| TD-587-01.resolved | 64 | 0 | 2 | – (WARN: live movieId en "QA587 main1", ja "QA587 main" → patched) |
| TD-587-14-15.resolved | 200 | 18 | 10 | 18× lang-pair (manifest is en-only by design); WARN: 8 wrong live movieIds, DSR qa587-off/rel-b missing → create |
| TD-557-DAM.resolved | 48 | 0 | 2 | – (WARN: live movieId "QA587 dam" en/ja) |
| TD-190-CAT-CORE.resolved | 86 | 2 | 6 | ref `ykk/common/product-cf/test/qa190-cat-pdf` missing (en, ja; found only at common/ja/catalogs); 6 DSR CFs missing → create |
| TD-586-01-02.resolved | 38 | 14 | 4 | 4× path-guard + 4× node-name (numeric 990586001/2 ≠ qa*), 4× lang-pair (ja-only), 2× required (productCategories, applications, media01Asset) |
**Dry-run** TD-587-01.resolved (`apply-dry-run-TD-587-01.md`, `plan.json`, `before.json`; gates env/--apply/window ⛔, lint ✅ → nothing sent): 1–3 MOVE ja common, en DSR, ja DSR → 4 PATCH en common movieId → 5 PATCH ja common movieId (after rename) → 6 skip en DSR (ref already `common/en/…/qa587-main`) → 7 PATCH ja DSR `movie` → 8–11 publish preview content, preview DSR, publish content, publish DSR.

**Open questions for Claude**
1. TD-586: numeric node names 990586001/2 can never pass the `qa*` guard. Rename the test products to `qa586-…` (productId = node name), or widen the guard for these 2 paths?
2. lang-pair FAIL blocks single-language manifests (TD-587-14-15 en, TD-586 ja). Add a manifest opt-out (e.g. `lang_pair: false` + reason) or keep ja+en mandatory?
3. TD-190: create a `qa190-cat-pdf` content CF under `ykk/common/product-cf/test/`, or point the ref to `/content/dam/common/ja/catalogs/qa190-cat-pdf`?
4. TD-586 content CFs miss required productCategories/applications/media01Asset – need values (tags + image) in the manifest.
D11 unchanged: `agentId: preview` and MOVE unverified until P1b; both remain behind all 4 apply gates.
