# DSR-671 DEV automation run — 20261024

Job: `ykk-dsr/hub/jobs/running/JOB-20261024-06.md` (lane claude-code). New spec `tests/cf-model/DSR-671.cf-align.spec.ts`.
TC 17.0 (regression of DSR-586 / 654 / 587 vs ledger) ran separately: [automation-run-20261024-tc170.md](automation-run-20261024-tc170.md).

## 1. Header

- Run start (UTC): 2026-10-24T04:17:46Z
- Run end (UTC): 2026-10-24T04:18:29Z
- Environment + base URL: DEV — `https://main--dsr-eds-dev--sutrix-projects.aem.live` (publish GraphQL `https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/…`)
- Target page(s): persisted queries `dsr-catalog-page` (`dsr/{ja,en}/catalogs/qa190-cat-pdf`, `dsr/en/catalogs/qa671-cat`), `dsr-product-page` (every `dsr-product-list` item ja/en; `dsr/en/products/990671001`, `990671002`), `dsr-product-list`, `dsr-catalog-list`, `dsr-video-list` (ja, en); pages `/en/products/990671001`, `/en/products/990671002`, `/en/products/990586001`; Author `/adobe/sites/cf/models` (GET)
- Build under test: not independently verified. DSR-671 deployed with 669 on `dev/2026.10.23` a47274d (job input). Last-Modified on .aem.live at run time: `product-detail.js` / `video-detail.js` Fri, 23 Oct 2026 07:15:23 GMT, `catalog-detail.js` Thu, 22 Oct 2026 01:48:45 GMT.
- Baseline ID: BL-671-1 (`ykk-dsr/hub/tc-out/DSR-671.spec.json` A1 = DSR-671 description)
- Automation HEAD commit SHA: `16f080d0c82ed9c7fdb9a3247bfa644b4d473c07` (spec + fixture uncommitted at run time, committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j06/run1/results.json npm run test:dev -- tests/cf-model/DSR-671.cf-align.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 15 | 5 | 1 | 9 | 1 | 2 | configured 1; 1 actual (11.0 [en], failed again) | 40.9 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (one spec file); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = summed over attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-671 2.0 | DSR-671 2.0 [ja] dsr-catalog-page qa190-cat-pdf → 200, no errors, keys hubspotFormId + promoText | Pass (proposed) | 1.5 s (1 attempt) | — |
| DSR-671 2.0 | DSR-671 2.0 [en] dsr-catalog-page qa190-cat-pdf → 200, no errors, keys hubspotFormId + promoText | Pass (proposed) | 1.4 s (1 attempt) | — |
| DSR-671 7.0 | DSR-671 7.0 [ja] dsr-product-page of every dsr-product-list item → no relatedMoodboards, no errors | Pass (proposed) | 9.0 s (1 attempt) | — |
| DSR-671 7.0 | DSR-671 7.0 [en] dsr-product-page of every dsr-product-list item → no relatedMoodboards, no errors | Pass (proposed) | 4.4 s (1 attempt) | — |
| DSR-671 11.0 | DSR-671 11.0 [ja] every DSR CF of dsr-product/catalog/video-list references a content CF of the same language and type | Pass (proposed) | 2.5 s (1 attempt) | — |
| DSR-671 11.0 | DSR-671 11.0 [en] every DSR CF of dsr-product/catalog/video-list references a content CF of the same language and type | Fail (proposed) | 4.5 s (2 attempts) | language/type mismatches: 2 en video DSR CFs reference `/content/dam/ykk/common/product-cf/test/…` |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-671 1.0 [-] | Blocked-by Author cookie (HTTP 401) – Author model TC skipped (cookie): models: HTTP 401 |
| DSR-671 3.0 [en] | Blocked-by TD-671-03 (no data on DEV) – https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/dsr-catalog-page;path=/content/dam/dsr/en/catalogs/qa671-cat returns no item |
| DSR-671 6.0 [en] | Blocked-by TD-671-01 (no data on DEV) – https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/dsr-product-page;path=/content/dam/dsr/en/products/990671001 returns no item |
| DSR-671 7.0 [-] | Blocked-by Author cookie (HTTP 401) – Author model TC skipped (cookie): models: HTTP 401 |
| DSR-671 8.0 [-] | Blocked-by Author cookie (HTTP 401) – Author model TC skipped (cookie): models: HTTP 401 |
| DSR-671 12.0 [-] | Blocked-by Author cookie (HTTP 401) – Author model TC skipped (cookie): models: HTTP 401 |
| DSR-671 14.0 [en] | Blocked-by TD-671-01 (no data on DEV) – https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/dsr-product-page;path=/content/dam/dsr/en/products/990671001 returns no item |
| DSR-671 15.0 [en] | Blocked-by TD-671-01 (no data on DEV) – https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/dsr-product-page;path=/content/dam/dsr/en/products/990671001 returns no item |
| DSR-671 16.0 [en] | Blocked-by TD-671-02 (no data on DEV) – https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/dsr-product-page;path=/content/dam/dsr/en/products/990671002 returns no item |

## 6. Failed tests

### DSR-671 11.0 — DSR-671 11.0 [en] every DSR CF of dsr-product/catalog/video-list references a content CF of the same language and type

- Failing assertion: `expect.soft(mismatches, 'language/type mismatches').toEqual([])` — `tests/cf-model/DSR-671.cf-align.spec.ts:160`
- Expected: every DSR CF `/content/dam/dsr/en/{type}/…` references `/content/dam/common/en/{products|catalogs|movies}/…`; 0 mismatches.
- Actual (raw, `dsr-video-list;folder=/content/dam/dsr/en/`, 30 items):
  - `/content/dam/dsr/en/movies/standard/qa501-main-a` → `movie._path` = `/content/dam/ykk/common/product-cf/test/qa501-main-a`
  - `/content/dam/dsr/en/movies/standard/qa501-main-b` → `movie._path` = `/content/dam/ykk/common/product-cf/test/qa501-main-b`
  - `dsr-product-list` en (4 items) and `dsr-catalog-list` en (16 items): 0 mismatches.
  - Not counted (reference null on publish, raw only): `/content/dam/dsr/en/catalogs/qa654-content-unpub`, `/content/dam/dsr/en/movies/standard/qa587-unavail` (both TD with an unpublished content CF by design).
- Attempt(s): failed on attempt 1 and on retry 1 (same values).
- Evidence paths: API-only test, no screenshot. Attachment `observed` in `test-results/cf-model-DSR-671.cf-align--ec246--the-same-language-and-type-chromium-retry1/` (trace.zip).

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- 11.0 [en] fail is most likely **legacy QA data** (qa501-main-a/b point to the pre-overlay folder `/content/dam/ykk/common/product-cf/test/`; JOB-ZZ-IDLE-44 already lists "qa501-* not re-seeded after overlay merge"). DSR-671 #8 is a save-time check, so CFs saved before the deploy are not blocked. Suggested: fix/re-seed qa501-* data or exclude legacy test items; not a product bug as such (suspect data, confidence 20%).
- 11.0 [ja]: 0 mismatches (product 8, catalog 15, video 7). `dsr/ja/products/990586009` has a null `product` reference on publish (raw only, not counted).
- Author cookie returned HTTP 401 at 04:17Z (`/adobe/sites/cf/models`) → 1.0, 7.0 (model part), 8.0, 12.0 not executed. Earlier read (JOB-20261023-21 `models-after.md`) showed `hubspotFormId` text / `promoText` long-text with the expected labels and `relatedMoodboards` removed – not re-verified today.
- 8.0 / 12.0: even with a valid cookie the CF OpenAPI may not expose rootPath / tag-root / forceSelection; the spec then skips with "Pending: … not exposed" and attaches the raw field JSON.
- TD-671-01/02/03 do not exist on DEV (query empty, `/en/products/990671001`, `/en/products/990671002`, `/en/library/catalog/qa671-cat` → 404) → 3.0, 6.0, 14.0, 15.0, 16.0 skipped (Blocked-by). Rerun = `run-only` after lane chrome/author seeds the data (Mon 26/10).
- 14.0 selector assumption: related catalogs on product detail are collected as links to `/library/catalog/` or `.pd-link-row` (not `.pd-pdf-link`). On `/en/products/productid-01x` the related catalog currently renders as "View this product's catalog" linking to the PDF asset, not to `/en/library/catalog/<id>`; if TD-671-01 renders the same way, 14.0 will fail on the link check – Claude to decide whether the Expected link is right.
- 16.0 compares h2/h3 texts of `main .product-detail` with 990586001 (currently only "Applications"); headings depend on product data, not only on relations.
- 2.0 confirms keys only; values are `hubspotFormId: null`, `promoText: {plaintext: null, html: null}` (ja and en).
