# JOB-20261021-08 – tools/author P1a (DEV, read-only) – status: done
Merge/incident-related fails: none (all 21 fails: cause `none`, suspect `data`, confidence 0% – known QA-PT data errors, not product bugs).

**Built** `tools/author/` (Node ESM + `yaml`): `author.mjs models|lint|verify|apply`, `lib/` (http allowlist + redact, path guard + write window, manifest {lang}/ref(), lint L0, verify L1–L3, gated apply), `README.md`. No delete function exists; `aemWrite` throws on DELETE. Only GETs were sent to AEM (CF OpenAPI, JCR `.json`, QueryBuilder) and EDS. Cookie/CSRF never printed (outputs go through `redact()`).
**Models** (`author/models.md`, live schema from `/adobe/sites/cf/models` + 2–3 sample CFs each; types declared by the model, not guessed):
| Model | ID field | 表示フラグ | Ref to content CF |
|---|---|---|---|
| DM_movie / DM_product / DM_catalog | movieId / productId / catalogId | – | – |
| DM_movie_related / DM_product_related / DM_catalog_related | – (URL = node name) | isActive | movie / product / catalog (required) |
`(?)` resolved in `author/manifests/TD-587-01.resolved.yaml`: `isActive`, `movie` confirmed; no other change.

**Lint** (TD-587-01.resolved): 37 PASS · 4 FAIL · 1 WARN – catches every known error:
| Item | Lang | Fail | Actual |
|---|---|---|---|
| content-cf | ja | target-exists | qa587-main missing; mis-named `qa-587-main` found → needs rename item |
| content-cf | ja | required-fields (create) | movieTitle, description, thumbnail, movieSource, publishDate missing |
| dsr-cf | en, ja | target-exists | qa587-main missing; mis-named `qa-587-main` found (en too, not only ja) |
| content-cf | en | live-id (WARN) | movieId = "QA587 main1" (manifest would patch to qa587-main) |
**Verify**: 2 PASS · 17 FAIL – L1 en content CF movieId "QA587 main1" ≠ qa587-main; ja content CF + en/ja DSR CF `qa587-main` missing (fields, L2 jcr:content 404); L3 `/{en,ja}/library/video/qa587-main` → 404 "Page not found" on .aem.page and .aem.live.
**Dry-run plan** (`apply`, gates: env ⛔, --apply ⛔, window ✅ 17:33 VN, lint ⛔ → nothing sent; `plan.json`, `before.json`):
1. PATCH `/adobe/sites/cf/fragments/c30079bc-…` (en common qa587-main) – If-Match ETag, json-patch `replace /fields/0/values` movieId "QA587 main1"→"qa587-main"
2. POST `/adobe/sites/cf/fragments` create ja common qa587-main (DM_movie, only movieId → blocked by lint)
3–4. POST `/adobe/sites/cf/fragments` create en/ja DSR qa587-main (DM_movie_related: isActive, movie ref)
5–6. POST `/adobe/sites/cf/fragments/publish` paths=[en,ja DSR] agentId=preview, then agentId=publish
Self-test (temp manifest, not committed): guard/regex/qa-/unknown field/bad type/missing ref/lang pair/cross-folder rename all FAIL as expected; window fn OK (Sat → closed).

**Open questions for Claude**
1. Path guard as specified (`qa[0-9a-z]…`) rejects `qa-587-main`, so the rename that fixes today's data (`qa-587-main → qa587-main`, ja common + en/ja DSR) is blocked as a rename *source*. Allow `qa-*` as rename source only?
2. After rename, DSR CF `movie` refs still point to `…/qa-587-main` (MOVE does not rewrite refs) → manifest must also set `movie` (it does) – confirm DSR en `qa-587-main` should be renamed, not recreated.
3. Content CF has no `replicate:`; publish uses `filterReferencesByStatus: []` → the patched en movieId would not reach .live. Add `replicate` to content-cf items or publish refs with MODIFIED?
4. `agentId: "preview"` for the preview tier and MOVE via Assets HTTP API are unverified until P1b.
Notes: code is in root `tools/author/` (hub AGENTS: hub = results only); existing `hub/tools/author/probe.sh` untouched. Not an npm test run → no `results/<US>/` run report; `npx tsc --noEmit` exit 0 (tools/ not in tsconfig include; `node --check` on all modules OK).
