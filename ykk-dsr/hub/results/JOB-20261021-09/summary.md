# JOB-20261021-09 – author lane step V: verify Night 21/10 data (DEV, GET only) – status: done
Run 2026-10-21 17:05–17:12 UTC. Only GETs sent to Author DEV + EDS DEV (no POST/PUT/PATCH/MOVE/DELETE). Merge/incident-related fails: none (every fail `cause: none`, confidence 0% = data/tool, not product). Step 1: `*.resolved.yaml` already done by JOB-10 and sources unchanged since → re-used as-is. `--since 2026-10-21T10:00:00Z` (17:00 VN).

## Data errors to fix (QA-PT Night 22/10 / Dat)
| Night Report row | Item | Expected | Actual | Fix |
|---|---|---|---|---|
| TD-586-02 (reported Pass) | DSR CF `/content/dam/dsr/ja/products/990586002` (+ content CF) | TestData TD-586-02: DSR CF **Preview only** → `/ja/products/990586002` 200 on .aem.page, 404 on .aem.live | DSR CF status DRAFT, never previewed/published; content CF PUBLISHED 14:56 UTC, never previewed → .page 404 (.live 404 = OK) | Open DSR CF 990586002 → **Preview** (not Publish) → check .aem.page 200 + .aem.live 404. Cause: Night Pack v3 việc 6 said "→ Publish" for both products (pack wording, not only QA-PT) → QA-PT-ERRORS + fix pack template |
| TD-190-CAT-NEW (minor, [Giả định]) | content CF `/content/dam/common/ja/catalogs/qa190-cat-pdf` | catalogTitle like the other 3 ja catalogs / en ("catalog pdf") | catalogTitle = `qa190-cat-pdf` → page title "qa190-cat-pdf \| YKK…" | Check TestData DSR-190 ja title; set it if a title exists there. Not a manifest field – not blocking |

## Manifest × item × lang
| Manifest (Night row) | Items × lang | Lint P/F | Verify P/F | Real data result | Non-data FAILs (cause) |
|---|---|---|---|---|---|
| TD-587-01 | qa587-main content+DSR × en/ja | 58/6 | 30/2 | **PASS** – movieId=qa587-main, isActive, ref same-lang, published ≥ since, .page/.live 200 en+ja | lint rename-source missing / target exists ×3 = renames already done by QA-PT (manifest not idempotent); L2 preview |
| TD-587-14/15 | r1–r6, rel-a, off, rel-b content+DSR × en | 212/18 | 90/18 | **PASS** – all fields (incl. r5→r5, rel-a 6 refs in order, rel-b r1+off, off isUnavailable) L1 PASS; rel-a/rel-b/r1 .page/.live 200 | 18× lang-pair (en-only by design, JOB-10 Q2); 18× L2 preview |
| TD-557-DAM | qa557-dam content+DSR × en/ja | 50/0 | 24/4 | **PASS** – movieId, movieSource=dam, isActive, refs; .page/.live 200 en+ja | 4× L2 preview |
| TD-190-CAT-NEW | 4 core catalogs DSR × en/ja | 98/2 | 48/16 | **PASS** – 8 DSR CFs exist, isActive true, published; 8 URLs .page/.live 200 | 8× `catalog` ref = `/content/dam/common/{lang}/catalogs/{id}` ≠ manifest `ykk/common/product-cf/test/{id}` → **manifest wrong** (Night Pack + BL-OVL-1 say common/{lang}/catalogs; content CFs exist there, catalogId = name); 8× L2 preview |
| TD-586-01 | 990586001 content+DSR × ja | 26/6* | 15/2 | **PASS** – all fields L1 PASS, published, .page/.live 200 | lint path-guard/node-name/lang-pair (numeric ids, JOB-10 Q1/Q2); L2 preview |
| TD-586-02 | 990586002 content+DSR × ja | 24/6* | 10/4 | **FAIL (data)** – see table above | .live 404 expected; manifest `verify.urls` wrongly requires 200 on .live |
\* split by product id from `lint/verify-TD-586-01-02.json` (manifest totals lint 50/12, verify 25/6).

## Tool / manifest findings (for Claude, not QA-PT)
1. **L2 `replicated:preview` is not a usable check**: QA-PT only uses Publish; `cq:lastReplicated_preview` is null on every CF (some show a stale `Activate @ 08:08:23 UTC` = pre-night), yet .aem.page is 200 → Publish feeds .page since 21/10 08:25 UTC. Suggest: L2 preview → WARN, L3 .page decides (D11).
2. Fix manifests: TD-190 `catalog` ref → `/content/dam/common/{lang}/catalogs/{id}`; TD-586 per-URL tiers (990586002 = page 200 / live 404); TD-587-01 rename items → skip when target exists and source missing.
3. Morning 07:45: overlay data for 587/647/557/570/654/586-01 is clean → queue those test jobs; hold DSR-PDO-002 (TD-586-02) until QA-PT Previews 990586002.
Files: `lint-*.md/json`, `verify-*.md/json`, `result.json`. No evidence PNGs (no browser run).
