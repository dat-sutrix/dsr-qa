# DSR-227 DEV automation run — 20261019

## 1. Header

- Run start (UTC): 2026-10-19T05:26:34Z (Playwright stats startTime 2026-10-19T05:26:36.593Z)
- Run end (UTC): 2026-10-19T05:27:55Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`envs/dev.env`)
- Target page(s): product pages from `/query-index.json` matching `/{lang}/products/<digits>` (TD-227-08, BL-OVL-1). None found, so the fallback (A7) was used: `https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page/{ja,en}/products/46` (aem.page preview on branch DSR-PRODUCTDETAIL-moustache). en = 200, ja = 404.
- Build under test: not independently verified (EDS main branch + moustache branch preview, no build ID exposed)
- Baseline ID: `ykk-dsr/hub/tc-out/DSR-227.spec.json` (DSR-227 TC export, Automation TCs 3.0, 9.0, 10.0, 12.0–17.0); job JOB-ZZ-IDLE-12
- Automation HEAD commit SHA: c0b351f38a2b2c88dfb7c3b1ac379be5054069d3 (new DSR-227 files uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-227.json npm run test:dev -- --grep "DSR-ASSET"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0 (final)
- Result: no errors. **Note:** the first check (before the run) exited 2 with 10 × TS2339 errors in `DSR-ASSET-012` (`rows` inferred as `{ page: string }[]`, so `pc`/`sp` were not typed). The test run was started straight after it, against that code. The fix only adds type annotations (`Shot` type on `rows`/`shot`), with no runtime change, and the job allows one run, so the run was not repeated. Re-check after the fix: exit 0, no output.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 17 | 0 | 0 | 17 | 0 | 1 (config 2; 17 tests in 1 file) | configured 1; actual 0 | 79.0 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `--grep "DSR-ASSET"`, project chromium (13.0 also tries a WebKit launch inside the test). Flaky outcomes: 0.

## 4. Executed tests

No test reached a verdict: all 17 skipped (see section 5). Durations are per attempt (single attempt each). The en tests skip after collecting the baseline, which is why they take longer.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ASSET-003 | DSR-ASSET-003 [ja] migrated asset paths after the DAM root use lowercase letters, digits and hyphens only | skipped | 1.7 s | — |
| DSR-ASSET-009 | DSR-ASSET-009 [ja] product page images load from the new DAM (naturalWidth > 0, 200, no legacy/sample path) | skipped | 1.5 s | — |
| DSR-ASSET-010 | DSR-ASSET-010 [ja] product PDFs open from the new DAM (200, application/pdf, size > 0, naming rule) | skipped | 1.4 s | — |
| DSR-ASSET-012 | DSR-ASSET-012 [ja] main image: SP (375, DPR 2) rendition smaller than PC (1440, DPR 1) and not upscaled | skipped | 1.2 s | — |
| DSR-ASSET-013 | DSR-ASSET-013 [ja] .webp-source image displays in Chromium and WebKit (naturalWidth > 0, 200, image content-type) | skipped | 1.5 s | — |
| DSR-ASSET-014 | DSR-ASSET-014 [ja] migrated assets are reachable without login (fresh context, 200) | skipped | 1.8 s | — |
| DSR-ASSET-015 | DSR-ASSET-015 [ja] migrated content images keep a non-empty alt | skipped | 1.9 s | — |
| DSR-ASSET-016 | DSR-ASSET-016 [ja] no asset response >= 400 on DEV product pages (query-index, max 50) | skipped | 1.5 s | — |
| DSR-ASSET-003 | DSR-ASSET-003 [en] migrated asset paths after the DAM root use lowercase letters, digits and hyphens only | skipped | 7.8 s | — |
| DSR-ASSET-009 | DSR-ASSET-009 [en] product page images load from the new DAM (naturalWidth > 0, 200, no legacy/sample path) | skipped | 8.3 s | — |
| DSR-ASSET-010 | DSR-ASSET-010 [en] product PDFs open from the new DAM (200, application/pdf, size > 0, naming rule) | skipped | 8.0 s | — |
| DSR-ASSET-012 | DSR-ASSET-012 [en] main image: SP (375, DPR 2) rendition smaller than PC (1440, DPR 1) and not upscaled | skipped | 18.8 s | — |
| DSR-ASSET-013 | DSR-ASSET-013 [en] .webp-source image displays in Chromium and WebKit (naturalWidth > 0, 200, image content-type) | skipped | 5.1 s | — |
| DSR-ASSET-014 | DSR-ASSET-014 [en] migrated assets are reachable without login (fresh context, 200) | skipped | 6.3 s | — |
| DSR-ASSET-015 | DSR-ASSET-015 [en] migrated content images keep a non-empty alt | skipped | 4.8 s | — |
| DSR-ASSET-016 | DSR-ASSET-016 [en] no asset response >= 400 on DEV product pages (query-index, max 50) | skipped | 3.5 s | — |
| DSR-ASSET-017 | DSR-ASSET-017 [ja+en] same product uses the same DAM image paths in ja and en | skipped | 0.5 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ASSET-003 [ja] | DSR-227 no product page on DEV |
| DSR-ASSET-009 [ja] | DSR-227 no product page on DEV |
| DSR-ASSET-010 [ja] | DSR-227 no product page on DEV |
| DSR-ASSET-012 [ja] | DSR-227 no product page on DEV |
| DSR-ASSET-013 [ja] | DSR-227 no product page on DEV |
| DSR-ASSET-014 [ja] | DSR-227 no product page on DEV |
| DSR-ASSET-015 [ja] | DSR-227 no product page on DEV |
| DSR-ASSET-016 [ja] | DSR-227 no product page on DEV |
| DSR-ASSET-003 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 [en] | blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-017 [ja+en] | DSR-227 no product page on DEV |

## 6. Failed tests

None.

## Pre-migration baseline (record only, no verdict)

Source: the `observed` attachments of the en tests (fallback page `/en/products/46`, aem.page). ja has no reachable product page.

- **Product pages found:** query-index rows `/{lang}/products/<digits>`: ja 0, en 0 (134 rows in `/query-index.json`). Fallback: en 200 (1 page audited), ja 404.
- **Asset URL hosts/roots** (unique URLs, DOM refs + image/media/pdf responses, 016 [en]):

| Host / root | Unique URLs |
|---|---:|
| dsr-productdetail-moustache--…aem.page (EDS `media_` hashes) | 9 |
| dsr-productdetail-moustache--…aem.page/blocks/ (code-bundled icons) | 6 |
| s7ap1.scene7.com/is/image/YKKCORPORATIONDEV/ (Dynamic Media) | 5 |
| publish-p192812-e2014374.adobeaemcloud.com/content/dam/ | 1 |
| placehold.co/284x170/ (placeholder) | 1 |

- **Naming violations** (rule `^[a-z0-9-]+(\.[a-z0-9]+)?$` per decoded segment after the DAM root): **6** (all 6 DAM/DM URLs on the page; 4 distinct asset names):
  1. `https://s7ap1.scene7.com/is/image/YKKCORPORATIONDEV/QUICKFIT%C2%AE_1?wid=900…` → `QUICKFIT®_1`
  2. `https://s7ap1.scene7.com/is/image/YKKCORPORATIONDEV/QUICKFIT%C2%AE_1?wid=200…` → `QUICKFIT®_1`
  3. `https://s7ap1.scene7.com/is/image/YKKCORPORATIONDEV/QUICKFIT%C2%AE_2?wid=200…` → `QUICKFIT®_2`
  4. `https://s7ap1.scene7.com/is/image/YKKCORPORATIONDEV/QUICKFIT%C2%AE_3?wid=200…` → `QUICKFIT®_3`
  5. `https://s7ap1.scene7.com/is/image/YKKCORPORATIONDEV/QUICKFIT%C2%AE_4?wid=200…` → `QUICKFIT®_4`
  6. `https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/common/products/product-sample/QUICKFIT%C2%AE_7.png` → `QUICKFIT®_7.png` (folder segments pass)
- **Asset responses ≥ 400:** 0 (image/media/pdf). The page console shows 2 × "Failed to load resource: 404". The probe saw 404 on non-asset fetches (`/en/products`, `/placeholders.json`), and those are not counted here.
- Other observations: 
  - 009: 1 image still comes from the pre-migration `product-sample` folder. 2 `<img>` (`media_14f6…png?width=750&format=png`) have naturalWidth 0, likely lazy or hidden `<picture>` fallbacks that were never requested (not verified).
  - 010: no PDF link on the page.
  - 012: PC and SP request the same DM rendition (`wid=900`, 22,797 vs 22,800 bytes; naturalWidth 900, rendered 700 / 343 px).
  - 013: no `.webp` source path. 5 responses are delivered as `image/webp` (`fmt=webp`).
  - 014: 6 DAM URLs, all 200 without cookies.
  - 015: 8 of 11 content images have an empty alt.

## 7. Open points for QA

- TD-227-02 sample product ids are not delivered (`// TODO: sample ids from dev` in `fixtures/dsr-227.ts`). Set `DSR227_SAMPLE_IDS=<id>,<id>,<id>` to switch the sample-based TCs from baseline mode to verdict mode.
- The baseline comes from one preview page on a feature branch (aem.page), not from DEV main `.aem.live`. It describes pre-migration state only and is not a DSR-227 verdict.
- DEV `/query-index.json` has no `/{lang}/products/<digits>` rows, so 16.0 (TD-227-08) has no data. This depends on DSR-586 (Martin).
- DSR-ASSET-013: WebKit could not launch on this VPS ("Host system is missing dependencies to run browsers"). The WebKit half of 13.0 cannot run here until the deps are installed (`npx playwright install-deps webkit`, needs sudo). Not done.
- Assumptions, not confirmed:
  - DAM roots = `/content/dam/` and Dynamic Media `/is/{image,content}/<company>/`. EDS `media_<hash>` URLs are not treated as DAM.
  - "Main image" (12.0) = the largest rendered `<img>` in `main`.
  - "webp source" (13.0) = a DAM path ending in `.webp`. This should come from the TD-227-04 mapping instead.
- 17.0 ignores no language-specific files yet (DSR-606 Q2 open, TODO in spec).
- The run was started before the tsc fix (types only); see section 2.
- Evidence: `observed` JSON attachments in `test-results/dsr-227.json` / `playwright-report/`. These are gitignored and **not committed**. No screenshots were taken (no failures).
