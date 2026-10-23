# DSR-586 DEV automation run — 20261023-job17

JOB-20261022-17 (released 23/10 07:50, run after JOB-20261022-03): DSR-586 product overlay negatives (PDO 005–009, 011) plus PDO-001/014 ja+en, on .aem.page and .aem.live. Read-only. Proposed outcomes only; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-23T01:12:52Z (curl preflight); main runs 01:13:29Z (.aem.page) / 01:14:06Z (.aem.live); PDO-001 runs 01:15:41Z / 01:15:54Z
- Run end (UTC): 2026-10-23T01:16:02Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL overridden per tier by DSR586_BASE)
- Target page(s): /en/products/990586001, /ja/products/990586001, /ja/products/qa586-alpha, /ja/products/, /ja/products/990586006, /ja/products/qa586/990586006, /ja/products/990586007, /ja/products/990586008, /ja/products/990586009, /ja/products/990586011
- Build under test: not independently verified (no build ID exposed). No deploy observed during the run.
- Baseline ID: tc-out/DSR-586.spec.json rows 1.0, 5.0–9.0, 11.0, 14.0 + BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md, incl. Update 2026-10-21)
- Automation HEAD commit SHA: e21f7860f0a2597957c4812c5c5e547324d3b5c3 (no code changed in this job)
- Exact commands used (`DSR586_SEEDED=05,06,07,11`: Night Report 22/10 = Pass for TD-586-05/06/07/11, per the job release note):

```sh
DSR586_SEEDED=05,06,07,11 DSR586_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job17/586-page.json npm run test:dev -- tests/product-detail --project=chromium --grep "DSR-PDO-0(05|06|07|08|09|11|14) \[(ja|en)\]" --reporter=list,json --output=test-results/job17-586-page
DSR586_SEEDED=05,06,07,11 DSR586_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job17/586-live.json npm run test:dev -- tests/product-detail --project=chromium --grep "DSR-PDO-0(05|06|07|08|09|11|14) \[(ja|en)\]" --reporter=list,json --output=test-results/job17-586-live
DSR586_SEEDED=05,06,07,11 DSR586_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job17/586-001-page.json npm run test:dev -- tests/product-detail --project=chromium --grep "DSR-PDO-001 \[(ja|en)\]" --reporter=list,json --output=test-results/job17-586-001-page
DSR586_SEEDED=05,06,07,11 DSR586_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job17/586-001-live.json npm run test:dev -- tests/product-detail --project=chromium --grep "DSR-PDO-001 \[(ja|en)\]" --reporter=list,json --output=test-results/job17-586-001-live
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run at 01:13Z before all runs)

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| .aem.page (005–009, 011, 014) | 8 | 6 | 2 | 0 | 1 | 2 | 1; 2 used (both failed again) | 35.0 s |
| .aem.live (005–009, 011, 014) | 8 | 6 | 2 | 0 | 1 | 2 | 1; 2 used (both failed again) | 31.0 s |
| .aem.page (001) | 2 | 2 | 0 | 0 | 0 | 2 | 1; 0 used | 11.4 s |
| .aem.live (001) | 2 | 2 | 0 | 0 | 0 | 2 | 1; 0 used | 6.4 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: tests/product-detail subset by --grep; chromium project. Flaky outcomes: 0.
PDO-005..011 exist in the spec only for ja (spec.json lang: ja). result.json records their en rows as skip with the reason "ja-only by spec".

## 4. Executed tests

| TC ID | Tier | Title | Result | Duration | One-line failure reason / observation |
|---|---|---|---|---|---|
| DSR-PDO-001 | .aem.page | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | pass | 5.5s | — |
| DSR-PDO-001 | .aem.page | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | pass | 4.6s | — |
| DSR-PDO-005 | .aem.page | DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages | fail | 6.8s + 5.1s | qa586-alpha → 200 + product-detail block (expected 404, 0 blocks) |
| DSR-PDO-006 | .aem.page | DSR-PDO-006 [ja] CF related in subfolder → no page (404) | fail | 0.1s + 0.2s | /ja/products/qa586/990586006 → 200 (expected 404) |
| DSR-PDO-007 | .aem.page | DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live | pass | 0.4s | 404 on both hosts |
| DSR-PDO-008 | .aem.page | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | pass | 5.7s | raw 200 (no 30x), noindex, `unavailable \| inactive`; final URL …aem.page/ja/product-list |
| DSR-PDO-009 | .aem.page | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | pass | 5.3s | raw 200, noindex, single `unavailable \| no-product`; final URL …aem.page/ja/product-list |
| DSR-PDO-011 | .aem.page | DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index | pass | 0.6s | 404 on both hosts; not in query-index |
| DSR-PDO-014 | .aem.page | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | pass | 2.6s | lang ja, "QA586 product A" |
| DSR-PDO-014 | .aem.page | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | pass | 1.9s | lang en, "QA586 product A" |
| DSR-PDO-001 | .aem.live | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | pass | 2.0s | — |
| DSR-PDO-001 | .aem.live | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | pass | 2.8s | — |
| DSR-PDO-005 | .aem.live | DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages | fail | 5.0s + 4.1s | qa586-alpha → 200 + product-detail block (expected 404, 0 blocks) |
| DSR-PDO-006 | .aem.live | DSR-PDO-006 [ja] CF related in subfolder → no page (404) | fail | 0.2s + 0.2s | /ja/products/qa586/990586006 → 200 (expected 404) |
| DSR-PDO-007 | .aem.live | DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live | pass | 0.1s | 404 on both hosts |
| DSR-PDO-008 | .aem.live | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | pass | 5.4s | raw 200 (no 30x), noindex; final URL …aem.live/ja/product-list |
| DSR-PDO-009 | .aem.live | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | pass | 5.6s | raw 200, noindex, single `unavailable \| no-product`; final URL …aem.live/ja/product-list |
| DSR-PDO-011 | .aem.live | DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index | pass | 0.1s | 404 on both hosts; not in query-index |
| DSR-PDO-014 | .aem.live | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | pass | 2.0s | lang ja, "QA586 product A" |
| DSR-PDO-014 | .aem.live | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | pass | 1.5s | lang en, "QA586 product A" |

## 5. Skipped tests

None executed-and-skipped. (Not in scope / not run: PDO-014 [cn] is `test.fixme`, because there is no /cn path on DEV (Issue #18). PDO-005..011 have no en variant in the spec.)

## 6. Failed tests

### DSR-PDO-005 [ja] (.aem.page and .aem.live)
- Failing assertions: tests/product-detail/DSR-586.product-detail.spec.ts:136 (`qa586-alpha HTTP`) and :137 (`qa586-alpha: product-detail block`).
- Expected (spec.json 5.0, BL-OVL-1 regex `(?<=/products/)([0-9]+)$`): qa586-alpha → 404, 0 product-detail blocks.
- Actual: HTTP 200 and 1 block on both tiers. Overlay rows: cfPath /content/dam/dsr/ja/products/qa586-alpha, productName "QA586 alpha", productId qa586-alpha, productCode QA586-ALPHA. The page is also listed in /query-index.json and /sitemap.xml. Other steps OK: 990586001 = 200 with block; /ja/products/ = 404 with 0 blocks.
- Assessment: BL-OVL-1 **Update 2026-10-21 (BINDING)** says the page URL = DSR CF node name (lowercase letters, digits, "-"). So a non-numeric node name rendering matches the newer baseline, and TC 5.0 looks outdated. suspect **test**, cause none, confidence product bug 25%.
- Evidence: ykk-dsr/hub/results/JOB-20261022-17/evidence/DSR-PDO-005_ja_page.png, …_live.png (copied from test-results/job17-586-{page,live}/product-detail-DSR-586.pro-00c20-…-chromium/test-failed-1.png, which is not committed).

### DSR-PDO-006 [ja] (.aem.page and .aem.live)
- Failing assertion: tests/product-detail/DSR-586.product-detail.spec.ts:153 (`/ja/products/qa586/990586006`).
- Expected (spec.json 6.0, BL-OVL-1 "subfolder → no page"): /ja/products/990586006 and /ja/products/qa586/990586006 both 404.
- Actual: /ja/products/990586006 = 404 (OK). /ja/products/qa586/990586006 = **200** on both tiers, with no 30x. The raw HTML has meta robots noindex and overlay rows `source | overlay` and `unavailable | not-found` (no cfPath row). In the browser, after 3 s, the final URL is /ja/product-list. The path **is listed in /query-index.json** but is not in /sitemap.xml.
- Assessment: a page document exists at the subfolder path, but the visitor sees no product (it redirects to the list). The Night Report QA-PT row judged this "as expected". The BL wording "no page" vs the unavailable+redirect behaviour needs Claude's decision. suspect **product**, cause none, confidence 65%.
- Evidence: HTTP-level test, no screenshot. Raw values come from the observed attachment and curl preflight; trace is in test-results/job17-586-{page,live}/…-in-subfolder-→-no-page-404--chromium/trace.zip (not committed).

## 7. Open points for QA

- Seeding assumption: `DSR586_SEEDED=05,06,07,11` is taken from the job release note (Night Report 22/10 all Pass). The Night Report sheet was not read by the agent. Agent raw data matches the TD rows for 01 en, 05, 07, 08, 09 and 11. For 06, the subfolder page exists (see PDO-006).
- PDO-008: assertions are the raw 200 (maxRedirects 0, no `location`) and the browser final URL `/ja/product-list`, per the job rule. The product list URL itself is still unconfirmed (Q30). The test only asserts that the visitor left the detail page.
- /query-index.json lists noindex/unavailable pages: /ja/products/990586008, /ja/products/990586009 and /ja/products/qa586/990586006. /sitemap.xml correctly excludes them. This is not asserted by any in-scope TC; it is recorded for Claude (possible SEO/index follow-up).
- PDO-014: only ja+en were run. The en name equals the ja name ("QA586 product A"), because TD-586-01 en is a copy, so "no fallback to another language" cannot be distinguished. cn is fixme (Issue #18).
- PDO-001 was run in a second short run (01:15Z) because the first grep omitted it. Both runs are on the same HEAD and the same data.
- Build/deploy ID not verified.
