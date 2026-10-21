# DSR-586 DEV automation run — 20261021-job20261020-03-live

## 1. Header

- Run start (UTC): 2026-10-21T16:43:49Z
- Run end (UTC): 2026-10-21T16:44:34Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (BASE_URL from envs/dev.env (.aem.live); `DSR586_BASE` and `PDO_ID` not set. PDO-002 also checks the .aem.page tier.)
- Target page(s): /ja/products/990586001 (TD-586-01), /ja/products/990586002 (TD-586-02, .aem.page + .aem.live)
- Build under test: main branch; application SHA not independently verified.
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, update 2026-10-21) + ykk-dsr/hub/tc-out/DSR-586.spec.json (re-baseline 2026-10-20, DM_product_ver0.4, 21 TCs)
- Automation HEAD commit SHA: a3f2cf11b73998889cdfc8c969c08a13d92fa60f (JOB-20261020-03 spec/fixture changes were uncommitted at run time; they are committed with this report)
- Job: ykk-dsr/hub/jobs/running/JOB-20261020-03.md (TCs 1.0–4.0, 12.0–21.0 positive, ja)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/pdo/live.json npm run test:dev -- tests/product-detail --grep "DSR-PDO-0(01|02|03|04|12|13|14|17|19|20|21) \[ja\]"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 11 | 0 | 0 | 11 | 0 | 1 | 1 configured; 0 used | 45 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset of the 11 ja automation TCs in job scope; chromium project only. Flaky outcomes: 0.
Not in this run: 15.0 / 16.0 (visual, lane codex), 18.0 (manual, review list URL Q31), 2.0–21.0 en/cn (job lang = ja).

## 4. Executed tests

None got past the TD preflight. Duration is per attempt (one attempt each) and covers navigation + preflight only.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PDO-001 [ja] | live CF related → detail page shows name, code, images and specs | skip (not executed past preflight) | 6.4 s | — |
| DSR-PDO-002 [ja] | preview-only CF related → 200 on .aem.page, 404 on .aem.live | skip (not executed past preflight) | 0.6 s | — |
| DSR-PDO-003 [ja] | raw HTML (no JS) has name and description in body, title / description / og:image in head | skip (not executed past preflight) | 0.6 s | — |
| DSR-PDO-004 [ja] | no GraphQL / execute.json request from the browser | skip (not executed past preflight) | 6.4 s | — |
| DSR-PDO-012 [ja] | live product page listed in query-index and sitemap; preview-only absent | skip (not executed past preflight) | 0.5 s | — |
| DSR-PDO-013 [ja] | Contact button → inquiry page with product code (no submit) | skip (not executed past preflight) | 5.7 s | — |
| DSR-PDO-014 [ja] | language variant: 200, html lang matches, product name present | skip (not executed past preflight) | 5.6 s | — |
| DSR-PDO-017 [ja] | ver0.4 display fields show the CF values, removed fields absent | skip (not executed past preflight) | 5.7 s | — |
| DSR-PDO-020 [ja] | ver0.4 new fields – current state recorded (Blocked: no design) | skip (not executed past preflight) | 5.3 s | — |
| DSR-PDO-021 [ja] | media slots: media01 first, one item per filled slot, 0 broken images | skip (not executed past preflight) | 2.6 s | — |
| DSR-PDO-019 [ja] | DSR-457 regression items recorded on overlay page | skip (not executed past preflight) | 2.1 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-PDO-001 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-002 [ja] | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-003 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-004 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-012 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-013 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-014 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-017 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-020 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-021 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-019 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**.

## 7. Open points for QA

- **TD-586-01 is not resolved by the overlay.** Raw HTML of /ja/products/990586001 (both tiers, HTTP 200, last-modified 2026-10-21 14:54:59 GMT) has only `source | overlay`, `cfPath | /content/dam/dsr/ja/products/990586001` and `unavailable | no-product`, plus `<meta name="robots" content="noindex">` and the default `<title>YKK DIGITAL SHOWROOM</title>`. The DSR CF exists and is published, but no product data comes through. Product 46 renders fully on the same build (sanity run below), so I suspect data: the CF commune `/content/dam/common/ja/products/990586001` is not published, or the DSR CF `product` reference is empty or points elsewhere. This is not verified, because agents have no Author access.
- **TD-586-02 is not on .aem.page**: /ja/products/990586002 returns 404 on .aem.page and .aem.live. Night 21/10 says it was created with "DSR chỉ preview", but the preview page does not exist.
- The positive TCs now skip on an `unavailable` row for TD-586-01/02 (new preflight `skipIfUnavailable`) instead of failing on missing names. Negative TDs 08/09 are not affected.
- Code changes in this job: fixtures/dsr-586.ts (TD-586-01 ver0.4 values from spec testdata; 17.0 display fields; 20.0 new fields; `td01`; `incomplete` / `unavailableRow`), pages/ProductDetailPage.ts (`gallery`, `thumbs`), and the spec (17.0 rewritten, new 20.0 and 21.0).
- Sanity check of the new logic (not a job run): `PDO_ID=46 npx playwright test tests/product-detail --grep "DSR-PDO-0(17|20|21) \[ja\]"` on .aem.page /ja/products/46 at 16:43Z gave 017 pass (rendered productName/productCode/description/itemVariations; colorVariations/colorVariationsPdf/notice/printable/recycled notes have no CF value), 020 skip (Blocked; no new field has a CF value), and 021 pass (media01–04 = 4 thumbs, media01 first, 5 images loaded, 0 failed media requests).
- 17.0 / 20.0 use the raw overlay row as the CF oracle and cross-check TD values. Optional TD-586-01 fields were "Not run" on Night 21/10 (QA-PT to add on 22/10), so 17.0 step 2 and 20.0 will be partial until then.
- Re-run the same command (both tiers) after QA-PT fixes TD-586-01/02.
