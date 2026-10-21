# DSR-586 DEV automation run — 20261021-job03

## 1. Header

- Run start (UTC): 2026-10-21T08:37:54.704Z
- Run end (UTC): 2026-10-21T08:38:49Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page (`PDO_ID=46` override switches BASE_URL https://main--dsr-eds-dev--sutrix-projects.aem.live to the .aem.page tier; `DSR586_BASE` not set)
- Target page(s): /ja/products/46, /en/products/46, /ja/products/ (.aem.page); /ja/products/46 and /en/products/46 on .aem.live (observation only)
- Build under test: main branch; application SHA not independently verified.
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + ykk-dsr/hub/tc-out/DSR-586.spec.json; DSR-538 (related card links) for the PDO-019 related-card check
- Automation HEAD commit SHA: 6fd03065e82d0ba8f3be72fd1886dd5d738d775d (the PDO_ID changes were uncommitted at run time and are committed with this report)
- Exact command used:

```sh
PDO_ID=46 PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-586-job2026102103.json npm run test:dev -- --grep DSR-586
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 20 | 12 | 0 | 8 | 0 | 1 | 1 configured; 0 used | 54.2 s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms them.
Scope/browser: subset `--grep DSR-586`, chromium project only. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (one attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PDO-001 [ja] | live CF related → detail page shows name, code, images and specs | pass (proposed) | 6.4 s | — (PDO_ID: name QUICKFIT® / code Z15-1 non-empty, 5 images loaded, 4 sections) |
| DSR-PDO-001 [en] | live CF related → detail page shows name, code, images and specs | pass (proposed) | 5.0 s | — (same values; sections Applications / Performance / Item Variations / Related Content) |
| DSR-PDO-003 [ja] | raw HTML (no JS) has name and description in body, title / description / og:image in head | pass (proposed) | 1.0 s | — |
| DSR-PDO-003 [en] | raw HTML (no JS) has name and description in body, title / description / og:image in head | pass (proposed) | 1.2 s | — |
| DSR-PDO-004 [ja] | no GraphQL / execute.json request from the browser | pass (proposed) | 6.3 s | — (103 requests, 0 GraphQL) |
| DSR-PDO-005 [ja] | only numeric ids render product detail; non-numeric and /products/ are not overlay pages | pass (proposed) | 5.9 s | — (qa586-alpha step not run) |
| DSR-PDO-013 [ja] | Contact button → inquiry page with product code (no submit) | pass (proposed) | 7.0 s | — (href `?productCode=Z15-1#contact`) |
| DSR-PDO-013 [en] | Contact button → inquiry page with product code (no submit) | pass (proposed) | 7.0 s | — |
| DSR-PDO-014 [ja] | language variant: 200, html lang matches, product name present | pass (proposed) | 4.6 s | — (lang ja) |
| DSR-PDO-014 [en] | language variant: 200, html lang matches, product name present | pass (proposed) | 2.5 s | — (lang en) |
| DSR-PDO-017 [ja] | fixed Product CF field set displayed, removed fields absent | pass (proposed, partial) | 2.1 s | — (0 removed labels, 0 literal undefined/null; step 2 not verified) |
| DSR-PDO-019 [ja] | DSR-457 regression items recorded on overlay page | pass (proposed, record-only + DSR-538 check) | 2.5 s | — (3 related cards, all relative EDS paths) |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-PDO-002 [ja] | needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-006 [ja] | needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-007 [ja] | needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-008 [ja] | needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-009 [ja] | needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-011 [ja] | needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-012 [ja] | needs TD-586 (PDO_ID=46 override: TC asserts TD-586 data) |
| DSR-PDO-014 [cn] | test.fixme (no runtime reason; title: "language variant – no /cn path on DEV (Issue #18)") |

Annotations on executed tests (steps not verified): PDO-005 "TD-586-05 not seeded (DSR586_SEEDED) – qa586-alpha step not run"; PDO-017 "step 2 display values: needs TD-586"; PDO-019 "DSR-457 items 2/4/5/9/11/12: check definitions not in repo".

## 6. Failed tests

None.

No evidence screenshots generated (no failures). `test-results/` and `playwright-report/` are gitignored and not committed; raw observations are in the `observed` attachments of test-results/dsr-586-job2026102103.json (not committed).

## 7. Open points for QA

- **Observation, not a fail (cause none):** /ja/products/46 and /en/products/46 return HTTP 404 on .aem.live and 200 on .aem.page. This is a publish-to-live gap; product 46 has been published to preview only. Recorded in PDO-001 observations and confirmed by curl at 08:3xZ.
- Product 46 is real migrated data, not TD-586. In PDO_ID mode the tests assert only that values are present and consistent with themselves: name/code non-empty; raw body and title contain the raw `productName` row; the body contains the first 30 characters of the raw `description` row; contact code = the code shown on the page. None of these checks the TD-586 Expected values. Those checks stay skipped ("needs TD-586") until the Night 21/10 seed exists.
- The verdict host is .aem.page in this run. BL-OVL-1/A2 says the final verdict comes from main .aem.live, so re-run after live publish/TD seed without `PDO_ID`.
- PDO-017 removed labels now come from spec.json 17.0 step 3 (12 labels). The display-field list (step 2) is still empty (Q27), and no ver0.4 value comparison ran. "Field-name tolerance" is checked only as no literal `undefined`/`null` in the block text.
- PDO-019: a soft DSR-538 assertion was added (related cards must not link to *.adobeaemcloud.com). That makes 019 no longer purely record-only. The selector `a.pd-related-card` was observed on 46 and matches 3 STORY cards on ja. The en card count was not recorded in this run.
- PDO-013: the Contact link is a same-page anchor `?productCode=Z15-1#contact`, and no product-code input field was found. The DSR-504 inquiry target is still pending, so the pass is based on the URL param only.
- PDO-003 en: the meta description ends mid-sentence ("… in the die set groove. The"), so it appears truncated. No assertion covers length, so this is recorded only.
- PDO-005: /ja/products/ returns 404 on .aem.page with 0 product-detail blocks. The qa586-alpha step was not run.
