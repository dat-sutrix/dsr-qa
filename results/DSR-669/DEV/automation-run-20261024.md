# DSR-669 DEV automation run — 20261024

## 1. Header

- Run start (UTC): 2026-10-24T02:23:18Z
- Run end (UTC): 2026-10-24T02:24:46Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/ja|en/library/video/qa587-main`, `/ja|en/products/990586001`, `/ja|en/library/catalog/qa190-cat-pdf`, `/ja/products/990586008`, `/ja/library/catalog/qa669-new`, lists `/ja|en/library/video/search`, `/ja|en/library/catalog`, `/master/ja/test-space/product-list`, `/en/product-list`; publish GraphQL `https://publish-p192812-e2014374.adobeaemcloud.com/graphql/execute.json/ykk/<8 queries>`
- Build under test: Not independently verified. Job input: deploy `dev/2026.10.23` a47274d (DSR-669). Observed: `product-detail.js`, `video-detail.js`, `related-product.js` Last-Modified Fri, 23 Oct 2026 07:15:23 GMT; `catalog-detail.js` Thu, 22 Oct 2026 01:48:45 GMT.
- Baseline ID: BL-669-1 (tc-out/DSR-669.spec.json A1); BL-OVL-1 for overlay specs; pre-669 oracle `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json` (A2)
- Automation HEAD commit SHA: 1bf151d25aad0f19753fffb2964f71f865ad16f1 (+ uncommitted `tests/cf-model/DSR-669.cf-model-rename.spec.ts`, `fixtures/dsr-669.ts`, committed with this report)
- Job: JOB-20261024-04 (lane claude-code)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/run669/spec.json npx playwright test tests/cf-model/DSR-669.cf-model-rename.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run before the first spec run and again after the test fix, both exit 0 with empty output)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 36 | 29 | 2 | 7 | 1 | 2 | 1 configured; 2 tests retried (both failed again) | 1.4 min (85.7 s) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: Subset: new spec `tests/cf-model/DSR-669.cf-model-rename.spec.ts` (all tests), Chromium. Flaky: 0. Code state = HEAD + the uncommitted new spec/fixture of this job (committed together with this report).

## 4. Executed tests

Duration = sum of all attempts. "pending annotation" = the test passed its executed checks, but part of the TC could not be compared (see §7). It is not a final Pass.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-669 9.0 | DSR-669 9.0 [ja] dsr-video-page → 200, no errors, aliases related + inactive, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 2.1 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [ja] dsr-video-list → 200, no errors, alias related ≥ 1, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.9 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [ja] video-detail → 200, no errors, dm*DsrList, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.8 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [ja] dsr-product-page → 200, no errors, aliases related + inactive, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [ja] dsr-product-list → 200, no errors, alias related ≥ 1, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 2.1 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [ja] product-detail → 200, no errors, dm*DsrList, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [ja] dsr-catalog-page → 200, no errors, aliases related + inactive, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [ja] dsr-catalog-list → 200, no errors, alias related ≥ 1, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [en] dsr-video-page → 200, no errors, aliases related + inactive, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.0 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [en] dsr-video-list → 200, no errors, alias related ≥ 1, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.4 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [en] video-detail → 200, no errors, dm*DsrList, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 0.7 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [en] dsr-product-page → 200, no errors, aliases related + inactive, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.1 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [en] dsr-product-list → 200, no errors, alias related ≥ 1, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [en] product-detail → 200, no errors, dm*DsrList, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [en] dsr-catalog-page → 200, no errors, aliases related + inactive, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.2 s (1 attempt) | — |
| DSR-669 9.0 | DSR-669 9.0 [en] dsr-catalog-list → 200, no errors, alias related ≥ 1, QA item present (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-669 11.0 | DSR-669 11.0 [ja] delivered block JS has no dm*RelatedList / dm_*_related (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 1.3 s (1 attempt) | — |
| DSR-669 11.0 | DSR-669 11.0 [ja] product + video overlay pages send no request to a *-related* persisted query (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 7.6 s (1 attempt) | — |
| DSR-669 12.0 | DSR-669 12.0 [ja] /ja/library/video/qa587-main still renders the DSR CF overlay (200, cfPath dsr, no unavailable row, title) (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 0.7 s (1 attempt) | — |
| DSR-669 12.0 | DSR-669 12.0 [ja] /ja/products/990586001 still renders the DSR CF overlay (200, cfPath dsr, no unavailable row, title) (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-669 12.0 | DSR-669 12.0 [ja] /ja/library/catalog/qa190-cat-pdf still renders the DSR CF overlay (200, cfPath dsr, no unavailable row, title) (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-669 12.0 | DSR-669 12.0 [en] /en/library/video/qa587-main still renders the DSR CF overlay (200, cfPath dsr, no unavailable row, title) (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-669 12.0 | DSR-669 12.0 [en] /en/products/990586001 still renders the DSR CF overlay (200, cfPath dsr, no unavailable row, title) (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 0.6 s (1 attempt) | — |
| DSR-669 12.0 | DSR-669 12.0 [en] /en/library/catalog/qa190-cat-pdf still renders the DSR CF overlay (200, cfPath dsr, no unavailable row, title) (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 0.5 s (1 attempt) | — |
| DSR-669 13.0 | DSR-669 13.0 [ja] video list loads cards, no 'Unable to load', card links 200; ids vs pre-669 (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass (pending annotation) | 7.9 s (1 attempt) | — |
| DSR-669 13.0 | DSR-669 13.0 [ja] catalog list loads cards, no 'Unable to load', card links 200; ids vs pre-669 (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass (pending annotation) | 4.4 s (1 attempt) | — |
| DSR-669 13.0 | DSR-669 13.0 [ja] product list loads cards, no 'Unable to load', card links 200; ids vs pre-669 (`cf-model/DSR-669.cf-model-rename.spec.ts`) | fail | 9.0 s (2 attempts) | Error: card links not 200 |
| DSR-669 13.0 | DSR-669 13.0 [en] video list loads cards, no 'Unable to load', card links 200; ids vs pre-669 (`cf-model/DSR-669.cf-model-rename.spec.ts`) | fail | 9.7 s (2 attempts) | Error: card links not 200 |
| DSR-669 13.0 | DSR-669 13.0 [en] catalog list loads cards, no 'Unable to load', card links 200; ids vs pre-669 (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass (pending annotation) | 4.2 s (1 attempt) | — |
| DSR-669 13.0 | DSR-669 13.0 [en] product list loads cards, no 'Unable to load', card links 200; ids vs pre-669 (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass (pending annotation) | 4.4 s (1 attempt) | — |
| DSR-669 14.0 | DSR-669 14.0 [ja] isActive false product 990586008 → query alias inactive, page 200 + unavailable + noindex, browser leaves detail (`cf-model/DSR-669.cf-model-rename.spec.ts`) | pass | 2.5 s (1 attempt) | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-669 1.0 | DSR-669 1.0 [-] models dm_{movie,product,catalog}_dsr exist with title DM_*_dsr: Author read-only TC: executed with tools/author (GET only), not from Playwright |
| DSR-669 2.0 | DSR-669 2.0 [-] no DM_*_related model remains (negative): Author read-only TC: executed with tools/author (GET only), not from Playwright |
| DSR-669 3.0 | DSR-669 3.0 [-] every DSR CF (incl. sub-folders) uses DM_*_dsr, total ≥ 84: Author read-only TC: executed with tools/author (GET only), not from Playwright |
| DSR-669 4.0 | DSR-669 4.0 [-] CF commune keep DM_movie / DM_product / DM_catalog: Author read-only TC: executed with tools/author (GET only), not from Playwright |
| DSR-669 10.0 | DSR-669 10.0 [-] no persisted query text uses dm*RelatedList (negative): Author read-only TC: executed with tools/author (GET only), not from Playwright |
| DSR-669 15.0 | DSR-669 15.0 [ja/en] republish regenerates the 3 overlay pages (Last-Modified after republish, 200): Blocked-by TD-669-02 (republish by lane author/chrome, no republish time in job input) |
| DSR-669 16.0 | DSR-669 16.0 [ja] new DM_catalog_dsr CF qa669-new → page 200 with title, query returns it under related: Blocked-by TD-669-03 (qa669-new not published) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa669-new HTTP 404) |

## 6. Failed tests

### DSR-669 13.0 [ja] — product list loads cards, no 'Unable to load', card links 200; ids vs pre-669

- Failing assertion: `expect.soft(…'card links not 200').toEqual([])` — `tests/cf-model/DSR-669.cf-model-rename.spec.ts:136`
- Expected: every card on `/master/ja/test-space/product-list` links to a 200 detail page (spec.json 13.0).
- Actual: `[["/ja/products/990586006", 404]]`. 6 cards: `990586001, qa586-alpha, 990586006, productId-01x, 135, 46`; other 5 links 200. Card 990586006 = DSR CF in sub-folder `dsr/ja/products/qa586/990586006`; `/ja/products/qa586/990586006` returns 200 (curl). No "Unable to load".
- Attempt(s): failed / retry failed (same value).
- Evidence paths: `ykk-dsr/hub/results/JOB-20261024-04/evidence/DSR-669-13.0_ja_product-list.png` (committed); `test-results/cf-model-DSR-669.cf-model--228ca-rd-links-200-ids-vs-pre-669-chromium{,-retry1}/` (screenshot, trace).

### DSR-669 13.0 [en] — video list loads cards, no 'Unable to load', card links 200; ids vs pre-669

- Failing assertion: `expect.soft(…'card links not 200').toEqual([])` — `tests/cf-model/DSR-669.cf-model-rename.spec.ts:136`
- Expected: every card on `/en/library/video/search` links to a 200 detail page.
- Actual: `[["/en/library/video/QA587_Upper", 404]]`. 12 cards, other 11 links 200. `QA587_Upper` = uppercase-named DSR CF (TD-587-04, KNOWN-FACTS 23/10: "2 URL 404"), and its card id is the content CF `/content/dam/common/en/movies/qa587-main`. No "Unable to load".
- Attempt(s): failed / retry failed (same value).
- Evidence paths: `ykk-dsr/hub/results/JOB-20261024-04/evidence/DSR-669-13.0_en_video-list.png` (committed); `test-results/cf-model-DSR-669.cf-model--27665-rd-links-200-ids-vs-pre-669-chromium{,-retry1}/`.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- **Author TCs 1.0–4.0 and 10.0 not executed:** `node tools/author/author.mjs models` → HTTP 401 at 2026-10-24T02:16:10Z (cookie expired). The spec skips them by design (Author read-only checks belong to tools/author). 3.0/4.0 (recursive cq:model count) and 10.0 (`/graphql/list.json/ykk`) also need a new read-only tools/author command. It was not written because it could not be validated without a cookie.
- **13.0 id/count comparison not done:** there is no pre-669 card-id oracle. `ledger.json` keeps pass/fail only, and `overlay-before-669.json` has no list ids. Every 13.0 test carries a `pending` annotation. The post-669 snapshot is in `ykk-dsr/hub/results/JOB-20261024-04/lists-after-669.json`.
- [Giả định] Product list URLs: ja = `fixtures/paths.ts` `productList` (v1 `/master/ja/test-space/product-list`), en = `productSearch` (`/en/product-list`), because `/master/en/test-space/product-list` is 404 on DEV. `/en/product-list` cards carry no links, so no link check was run for en.
- Catalog list cards that download a PDF (no detail link) are counted but not link-checked; their `data-card-id` is the PDF path, not unique.
- 9.0: `video-detail` takes no parameter and `product-detail` takes no language, so the ja and en tests send the same request. For `video-detail`, the QA item is matched by `movieId` because its items have no `_path`.
- 15.0 / 16.0 are written as preflight skips (`DSR669_REPUBLISHED_AT` env for TD-669-02; 404 on `qa669-new` for TD-669-03). The 15.0 before/after content comparison is not implemented (needs a TD-669-02 "before" HTML snapshot).
- The 12.0 tests here cover only the 3 TD pages × 2 langs. The full 12.0 diff is in `automation-run-20261024-overlay.md`.
- An earlier run of this spec (02:20:52Z) had a test bug in the 9.0 `video-detail` check; see `automation-run-20261024-run1.md`.
