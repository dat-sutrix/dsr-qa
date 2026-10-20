# regression DEV automation run — 20261020-job09

Job: `JOB-20261020-09` (regression, all specs, merge/incident sweep; run-only, read-only). One full run of `npm run test:dev` (all projects) on EDS `main` **.aem.live**. Fail classification (`cause` + `confidence`) and the dm_product field sets are in `ykk-dsr/hub/results/JOB-20261020-09/` (summary.md, result.json, raw.md).

## 1. Header

- Run start (UTC): 2026-10-20T09:31:22Z (tsc check ~09:30Z). The job asks for "not earlier than 14:00Z if possible". The run started at 09:31Z because the job says no wait is needed. This is after the dm_product ver0.4 start (17:14 JST = 08:14Z), but ver0.4 may still have been in progress.
- Run end (UTC): 2026-10-20T09:49:08Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): all pages used by the existing specs (23 spec files: DSR-173/501/587 movie, DSR-227 assets, DSR-433 mail endpoints, DSR-529 article, DSR-552 breadcrumb, DSR-557 catalog/video, DSR-566 news, DSR-570 catalog download, DSR-583 product list, DSR-586 product detail, DSR-589 icons, DSR-590 eco products, DSR-609 top, smoke)
- Build under test: not independently verified. Last-Modified on .aem.live: `scripts/catalog-link.js` and `blocks/catalog-detail/catalog-detail.js` 2026-10-20T05:55:17Z; `blocks/product-detail/product-detail.js` and `cf-templates/product.html` **2026-10-20T08:33:41Z** (changed after JOB-20261020-07, which saw 05:42:57Z / 05:43:36Z).
- Baseline ID: per US as recorded in `docs/<US>/` (DSR-173: BL-v1; overlay: BL-OVL-1). Not re-verified in this run.
- Automation HEAD commit SHA: ebdd971e04ffe0f7f07ea8ef4b2487cba9177050
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j09/run.json npm run test:dev -- --output=test-results/j09
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 345 | 111 | 69 | 165 | 1 | 2 | configured 1; 69 tests retried (all failed again) | 17m 46s (Playwright 17.7m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: full suite, all projects (chromium 343 + firefox 1 + webkit 1; firefox/webkit only run DSR-BREAD-032). Flaky: 0.

### Changes vs previous runs (cause tag per BUG-RULES §4)

Comparison: 19/10 = `results/regression/DEV/automation-run-20261017.md` (run 2026-10-19T04:48Z, chromium, before all 20/10 changes); 20/10 early = `results/regression/DEV/automation-run-20261020-page.md` (01:36Z); per-US runs of 20/10 (DSR-570/557 05:53–05:54Z, JOB-20261020-07 06:51Z for product).

| Test | 19/10 | 20/10 earlier | Now | cause |
|---|---|---|---|---|
| DSR-CATDL-006 [ja]/[en] | skip (card not rendered) | skip 01:36Z → fail 05:53Z (card → `/{lang}/library/catalog/qa190-cat-pdf-form`, 404 on .live) | fail: 0 forms on target | overlay-merge (catalog) |
| DSR-CATDL-018 [ja]/[en] | pass | pass 01:36Z, pass 05:53Z (pre DSR-655 Y3) | fail: timeout waiting for popup | overlay-merge (catalog) |
| DSR-CATV-017 (ja)/(en) | fail (form count) | pass 01:36Z; 05:54Z ja pass / en fail | fail: href = `/{lang}/library/catalog/qa190-cat-ebook-form`, not ebookUrl | overlay-merge (catalog) |
| DSR-VOV-011 [ja]/[en] | fail (404) | pass 01:36Z | fail (404 on .live, 200 on .page) | none (same fail as 19/10; flip-flop noted) |
| DSR-BREAD-032 [firefox]/[webkit] | not run (chromium only) | not run | fail (865 px / 2 %; webkit libs missing) | none (same as 12/10) |
| all other 59 fails | — | same failure as the latest previous run | same | none |

No product spec changed status: DSR-583 (4 PLSP + 4 PRODLIST fails) match JOB-20261020-07, and DSR-586 is still all skipped (TD-586 not seeded). So no ver0.4 or CR effect is visible in the specs.

## 4. Executed tests

Duration per attempt (initial / retry). Proposed outcomes.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | failed | 4.6s / 2.8s | Error: required blocks missing |
| DSR-ARTICLE-003 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | failed | 2.6s / 2.4s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-006 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | failed | 2.0s / 2.5s | Error: tag labels |
| DSR-ARTICLE-007 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [ja] info bar date = meta published-date | failed | 2.8s / 2.5s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-008 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | passed | 2.7s | — |
| DSR-ARTICLE-010 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible | failed | 2.9s / 2.7s | Error: published-date count |
| DSR-ARTICLE-011 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 2.7s / 2.5s | Error: absolute URL |
| DSR-ARTICLE-012 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | failed | 3.0s / 8.5s | Error: category tag IDs |
| DSR-ARTICLE-013 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | failed | 8.2s / 8.6s | Error: item 1 = qa529-r1 |
| DSR-ARTICLE-014 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | failed | 8.8s / 8.3s | Error: published-date count |
| DSR-ARTICLE-016 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 10.3s / 11.1s | Error: qa529-01 robots |
| DSR-ARTICLE-024 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | failed | 8.5s / 8.7s | Error: viewAllStories href |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | failed | 13.2s / 8.1s | Error: expect(locator).toHaveText(expected) failed |
| DSR-ARTICLE-002 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | failed | 3.4s / 3.2s | Error: required blocks missing |
| DSR-ARTICLE-003 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | failed | 3.0s / 2.7s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-006 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | failed | 3.0s / 3.0s | Error: tag labels |
| DSR-ARTICLE-007 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [en] info bar date = meta published-date | failed | 4.9s / 3.0s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-008 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | passed | 3.3s | — |
| DSR-ARTICLE-010 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible | failed | 3.3s / 3.2s | Error: published-date count |
| DSR-ARTICLE-011 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 8.9s / 8.8s | Error: absolute URL |
| DSR-ARTICLE-012 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | failed | 8.2s / 9.9s | Error: category tag IDs |
| DSR-ARTICLE-013 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | failed | 9.3s / 8.3s | Error: item 1 = qa529-r1 |
| DSR-ARTICLE-014 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | failed | 3.7s / 3.4s | Error: published-date count |
| DSR-ARTICLE-016 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 3.1s / 3.1s | Error: qa529-01 robots |
| DSR-ARTICLE-024 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | failed | 2.7s / 3.2s | Error: viewAllStories href |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | failed | 7.8s / 8.2s | Error: expect(locator).toHaveText(expected) failed |
| DSR-ARTICLE-015 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | passed | 3.5s | — |
| DSR-ARTICLE-020 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | passed | 2.3s | — |
| DSR-ARTICLE-023 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | failed | 2.6s / 2.9s | Error: visible related items heading |
| DSR-ARTICLE-025 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | passed | 2.9s | — |
| DSR-ARTICLE-009 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | passed | 4.8s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [ja] qa529-01 1440x900 capture only | passed | 5.0s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [ja] qa529-01 390x844 capture only | passed | 2.7s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [en] qa529-01 1440x900 capture only | passed | 3.0s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [en] qa529-01 390x844 capture only | passed | 3.0s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [ja] qa529-02 1440x900 capture only | passed | 3.4s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [ja] qa529-02 390x844 capture only | passed | 3.1s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [ja] child trail follows URL hierarchy | passed | 4.2s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | passed | 4.3s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [ja] ancestor links navigate in same tab | passed | 7.5s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [ja] items equal page titles | passed | 5.6s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [en] child trail follows URL hierarchy | passed | 4.3s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | passed | 4.1s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [en] ancestor links navigate in same tab | passed | 8.0s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [en] items equal page titles | passed | 5.4s | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [ja] display name overrides page title | passed | 4.2s | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [en] display name overrides page title | passed | 4.4s | — |
| DSR-BREAD-014 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-014 [ja] 100-character display name keeps layout | passed | 6.2s | — |
| DSR-BREAD-015 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-015 [ja] special characters in display name are plain text | passed | 3.6s | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [ja] each language uses its own display names | passed | 2.2s | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [en] each language uses its own display names | passed | 1.9s | — |
| DSR-BREAD-020 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-020 PC breadcrumb baseline | passed | 4.8s | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline | passed | 4.4s | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline [firefox] | failed | 10.1s / 7.8s | Error: expect(locator).toHaveScreenshot(expected) failed |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline [webkit] | failed | 0.0s / 0.0s | Error: browserType.launch:  |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 4.8s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-002 ancestor links | passed | 13.5s | — |
| DSR-BREAD-003 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-003 current page is not linked | passed | 4.7s | — |
| DSR-BREAD-004 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-004 HOME label and destination | passed | 4.5s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 1.9s | — |
| DSR-BREAD-006 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-006 parent trail | passed | 2.0s | — |
| DSR-BREAD-007 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-007 missing intermediate page | passed | 1.0s | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 1.4s | — |
| DSR-BREAD-009 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-009 404 excludes breadcrumb | passed | 1.7s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-011 empty label uses title | passed | 2.1s | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 2.1s | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 2.1s | — |
| DSR-BREAD-027 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-027 semantic markup and accessibility | passed | 3.2s | — |
| DSR-BREAD-028 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-028 keyboard navigation | passed | 2.6s | — |
| DSR-BREAD-031 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-031 site-origin console errors | passed | 2.0s | — |
| DSR-BREAD-035 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-035 arrow asset origin and status | passed | 2.1s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 2.0s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 2.2s | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 1.5s | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 2.1s | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 2.5s | — |
| DSR-CATDL-014 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-014 [ja] capture catalog download form at 1440px | passed | 3.7s | — |
| DSR-CATDL-015 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-015 [ja] capture catalog download form at 375px | passed | 3.3s | — |
| DSR-CATDL-001 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-001 [ja] catalog detail header renders | passed | 3.2s | — |
| DSR-CATDL-002 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 3.3s | — |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 5.9s | — |
| DSR-CATDL-006 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | failed | 11.0s / 10.4s | Error: expect(locator).toHaveCount(expected) failed |
| DSR-CATDL-018 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | failed (timeout) | 30.7s / 30.5s | Test timeout of 30000ms exceeded. |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 3.5s | — |
| DSR-CATDL-006 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [en] requiresForm=true card leads to the download form | failed | 7.9s / 8.3s | Error: expect(locator).toHaveCount(expected) failed |
| DSR-CATDL-018 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | failed (timeout) | 30.8s / 30.6s | Test timeout of 30000ms exceeded. |
| DSR-CATDL-003 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 2.3s | — |
| DSR-CATDL-007 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | 6.3s / 4.7s | Error: gated PDF URL delivered to the browser before submit |
| DSR-CATDL-010 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-010 [ja] catalog ID handed to the form | passed | 3.3s | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 6.2s | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 7.4s | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 5.5s | — |
| DSR-CATV-017 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form (ja) | failed | 2.5s / 2.3s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 2.7s | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 2.6s | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 2.6s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click | passed | 3.3s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 2.8s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) | passed | 4.0s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 3.1s | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 7.1s | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 7.0s | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 4.5s | — |
| DSR-CATV-017 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form (en) | failed | 1.5s / 2.1s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 2.5s | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 1.9s | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 2.7s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click | passed | 3.5s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 2.4s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) | passed | 2.0s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 2.7s | — |
| DSR-ECO-001 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | passed | 4.2s | — |
| DSR-ECO-002 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language) | failed | 3.3s / 3.1s | Error: VIEW MORE not on site with same language prefix |
| DSR-ECO-004 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200) | failed | 2.9s / 2.8s | Error: finder URL (P087), same language |
| DSR-ECO-003 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | passed | 14.9s | — |
| DSR-ECO-012 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | passed | 5.1s | — |
| DSR-ECO-013 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | passed | 4.8s | — |
| DSR-ECO-014 | `eco-products/DSR-590.stable-capture.spec.ts` › DSR-ECO-014 [ja] stable PC initial, Next, dot 5 and fullPage captures | passed | 9.3s | — |
| DSR-ECO-016 | `eco-products/DSR-590.stable-capture.spec.ts` › DSR-ECO-016 [ja] stable SP initial and swipe captures | passed | 6.5s | — |
| DSR-ECO-014 | `eco-products/DSR-590.visual-capture.spec.ts` › DSR-ECO-014 [ja] PC carousel visual capture and measurements | passed | 6.0s | — |
| DSR-ECO-016 | `eco-products/DSR-590.visual-capture.spec.ts` › DSR-ECO-016 [ja] SP capture, horizontal overflow and carousel interaction facts | passed | 6.8s | — |
| DSR-ICON-006 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed | 7.5s / 8.5s | Error: console errors |
| DSR-ICON-006 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed | 7.0s / 6.4s | Error: console errors |
| DSR-MAIL-016 | `mail/DSR-433.mail-endpoints.spec.ts` › DSR-MAIL-016 [—] webhook GET without auth is refused | passed | 1.3s | — |
| DSR-MAIL-017 | `mail/DSR-433.mail-endpoints.spec.ts` › DSR-MAIL-017 [—] test-send GET without params or auth is not public | passed | 1.3s | — |
| DSR-MOVIE-012 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-012 displays the exact movie title | passed | 2.7s | — |
| DSR-MOVIE-014 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-014 embeds the configured YouTube movie | failed | 7.6s / 7.3s | Error: expect(locator).toHaveAttribute(expected) failed |
| DSR-MOVIE-036 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-036 no site-origin console errors on the movie component page | passed | 2.2s | — |
| DSR-MOVIE-026 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | failed | 13.5s / 11.3s | Error: Related card 1 thumbnail |
| DSR-MOVIE-027 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-027 outputs exactly one title and og:title | passed | 2.2s | — |
| DSR-MOVIE-029 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | passed | 3.8s | — |
| DSR-MOVIE-033 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-033 displays component sections in vertical order on PC | failed | 7.8s / 9.7s | Error: expect(locator).toBeVisible() failed |
| DSR-MOVIE-034 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-034 displays the component back control | passed | 3.6s | — |
| DSR-501-P3 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P3 [en] related movies are limited to 5 in authored order | failed | 9.6s / 9.9s | Error: expect(locator).toBeVisible() failed |
| DSR-501-P2 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | failed | 9.4s / 9.5s | Error: expect(locator).toBeVisible() failed |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed | 1.4s / 1.1s | Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/search |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed | 1.2s / 1.2s | Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/search |
| DSR-501-P2 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | passed | 2.6s | — |
| DSR-NEWS-001 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-001 [en] page shows date, category, title and body | passed | 2.6s | — |
| DSR-NEWS-002 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list | failed | 1.7s / 2.2s | Error: required elements missing |
| DSR-NEWS-003 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [en] shown date equals meta publish date | failed | 2.0s / 1.9s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-NEWS-004 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-004 [en] category and title are non-empty text | passed | 1.9s | — |
| DSR-NEWS-006 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | failed | 7.3s / 7.3s | Error: Back to list link |
| DSR-NEWS-007 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | failed | 3.0s / 2.1s | Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json |
| DSR-NEWS-009 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-009 [en] no related-content block | passed | 1.7s | — |
| DSR-NEWS-010 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | passed | 1.7s | — |
| DSR-NEWS-012 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | failed | 12.0s / 16.2s | Error: My List button |
| DSR-NEWS-013 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | passed | 6.4s | — |
| DSR-NEWS-018 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [en] title, description and og tags non-empty | failed | 8.3s / 7.9s | Error: meta[name="description"] |
| DSR-PLSP-001 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 3.1s | — |
| DSR-PLSP-002 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | failed | 15.1s / 14.1s | Error: 320: cards overflowing their column |
| DSR-PLSP-003 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | failed (timeout) | 30.4s / 30.5s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | failed | 3.7s / 3.6s | Error: 3 results: left aligned |
| DSR-PLSP-004 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 10.5s | — |
| DSR-PLSP-001 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 2.7s | — |
| DSR-PLSP-002 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | failed | 12.1s / 12.5s | Error: 320: cards overflowing their column |
| DSR-PLSP-003 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | failed (timeout) | 30.7s / 30.4s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | failed | 7.1s / 9.1s | Error: 3 results: left aligned |
| DSR-PLSP-004 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 12.2s | — |
| DSR-PRODLIST-001 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | failed | 3.8s / 2.6s | Error: TD-583-01 ≥ 6 products |
| DSR-PRODLIST-002 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed | 14.7s / 11.3s | Error: 320: distinct column offsets |
| DSR-PRODLIST-003 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | failed | 7.2s / 6.9s | Error: open: distinct column offsets |
| DSR-PRODLIST-004 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed | 11.4s / 11.0s | Error: 1440: distinct column offsets |
| SMOKE-001 | `smoke.spec.ts` › SMOKE-001 DSR-173 test page is reachable | passed | 1.8s | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | failed | 7.5s / 7.2s | Error: text/background colour changes on hover |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 6.8s / 7.9s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | failed | 11.2s / 8.1s | Error: page requests /ja/news/query-index.json |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 6.8s / 6.8s | Error: SP item 1 title lines ≤ 1 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [ja] NEWS with empty query-index renders without error | passed | 6.4s | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [ja] main visual image is eager and is the LCP element | passed | 7.4s | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | failed | 7.2s / 7.2s | Error: text/background colour changes on hover |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 6.7s / 6.4s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | failed | 7.5s / 7.7s | Error: page requests /en/news/query-index.json |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 3.9s / 3.5s | Error: SP item 1 title lines ≤ 1 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [en] NEWS with empty query-index renders without error | passed | 3.8s | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [en] main visual image is eager and is the LCP element | passed | 4.3s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | passed | 6.2s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | passed | 10.2s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] PC full-page capture and horizontal overflow | passed | 10.8s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] SP full-page capture and horizontal overflow | passed | 5.0s | — |

## 5. Skipped tests

Verbatim skip/fixme annotation per test (title — reason).

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-001 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-001 [ja] page creation with article template (Author, BAC#1) — Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-004 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-004 [ja] article-specific info not editable in body (Author, BAC#5) — Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-005 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-005 [ja] author-editable areas 4/5/6/9/11 (Author, BAC#1) — Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-021 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-021 [ja] related stories picker max 3, stories only (Author) — Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-032 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-032 [ja] required page properties validation (Author, negative) — Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-030 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-030 [ja] visual PC 1440 vs Figma — Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-031 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-031 [ja] visual SP 390 vs Figma — Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-017 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-017 [ja] related stories cards r1..r3 (block 12) — Blocked: Stories index not on DEV yet – Martin prereq #1 (helix-query.yaml) / Q7 |
| DSR-ARTICLE-018 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-018 [ja] related stories NEW icon on r1 only — Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; NEW period Q6 |
| DSR-ARTICLE-019 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-019 [ja] related stories max 3, missing path skipped (qa529-04) — Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; TD-529-04 not seeded |
| DSR-ARTICLE-022 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-022 [ja] related items cards from product index (block 13) — Blocked: 製品index relatedArticles/sortOrder not defined – 製品詳細 ticket (Martin prereq #3) |
| DSR-ARTICLE-027 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-027 [ja] published article appears in article list — Blocked: Article list DSR-170 (out of scope) + stories index |
| DSR-ARTICLE-028 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-028 [ja] breadcrumb on article page — Blocked: Martin open decision #4 (breadcrumb in scope?) + DSR-552 – Q9 |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [cn] language page (cn) — Blocked: no /master/cn on DEV (Issue #18) – all cn rows |
| DSR-ARTICLE-026 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-026 [ja] stories query-index contains qa529-01 with 6 properties — blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-026 [en] stories query-index contains qa529-01 with 6 properties — blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |
| DSR-ASSET-003 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-003 [ja] migrated asset paths after the DAM root use lowercase letters, digits and hyphens only — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-009 [ja] product page images load from the new DAM (naturalWidth > 0, 200, no legacy/sample path) — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-010 [ja] product PDFs open from the new DAM (200, application/pdf, size > 0, naming rule) — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-012 [ja] main image: SP (375, DPR 2) rendition smaller than PC (1440, DPR 1) and not upscaled — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-013 [ja] .webp-source image displays in Chromium and WebKit (naturalWidth > 0, 200, image content-type) — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-014 [ja] migrated assets are reachable without login (fresh context, 200) — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-015 [ja] migrated content images keep a non-empty alt — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-016 [ja] no asset response >= 400 on DEV product pages (query-index, max 50) — blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-003 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-003 [en] migrated asset paths after the DAM root use lowercase letters, digits and hyphens only — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-009 [en] product page images load from the new DAM (naturalWidth > 0, 200, no legacy/sample path) — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-010 [en] product PDFs open from the new DAM (200, application/pdf, size > 0, naming rule) — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-012 [en] main image: SP (375, DPR 2) rendition smaller than PC (1440, DPR 1) and not upscaled — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-013 [en] .webp-source image displays in Chromium and WebKit (naturalWidth > 0, 200, image content-type) — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-014 [en] migrated assets are reachable without login (fresh context, 200) — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-015 [en] migrated content images keep a non-empty alt — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-016 [en] no asset response >= 400 on DEV product pages (query-index, max 50) — blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-017 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-017 [ja+en] same product uses the same DAM image paths in ja and en — blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [cn] each language uses its own display names — cn: no /master/cn (Issue #18) |
| DSR-BREAD-019 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-019 Japanese and Chinese fonts — DSR-555 + cn |
| DSR-BREAD-021 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-021 SP breadcrumb and back control — DSR-575 Q5 (SP display) |
| DSR-BREAD-022 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-022 SP parent navigation — DSR-575 Q5 (SP display) |
| DSR-BREAD-023 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-023 narrow SP overflow — DSR-575 Q5 (SP display) |
| DSR-BREAD-029 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-029 STG Lighthouse performance — Run on STG (Lighthouse) |
| DSR-BREAD-030 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-030 movie breadcrumb regression — DSR-536 / movie-detail placement |
| DSR-BREAD-033 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-033 all page types — Layout tickets |
| DSR-BREAD-034 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-034 responsive movie back control — DSR-536 / movie-detail placement |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement — cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order — cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb — cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations — cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data — cn: no /master/cn (Issue #18) |
| DSR-CATDL-001 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-001 [en] catalog detail header renders — blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-002 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-002 [en] download form fields, labels, consent and button present — blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-017 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form — no catalog-ID mechanism on DEV yet: "QA190 PDF form required" card href carries no catalog id; demo form page is not bound to a CF (Ngoc 10/15) |
| DSR-CATDL-016 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-016 [en] fixed texts translated (no Japanese) — blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-016 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-016 [cn] fixed texts translated (Chinese) — cn: no /master/cn (Issue #18) |
| DSR-ECO-001 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-001 [en] TOP shows one card per category with image, name, and active summary + VIEW MORE — en demo page not on DEV |
| DSR-ECO-002 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-002 [en] each category card VIEW MORE links to its TD-590-02 detail page (200, same language) — en demo page not on DEV |
| DSR-ECO-004 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-004 [en] 環境配慮型製品診断 button links to the product finder (P087, 200) — en demo page not on DEV |
| DSR-ECO-005 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary — DSR-590 page not on DEV |
| DSR-ECO-007 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-007 [ja] detail product list equals the query-index products carrying the eco tag — DSR-590 page not on DEV |
| DSR-ECO-010 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-010 [ja] detail product cards link to /ja/products/{id} with HTTP 200 — DSR-590 page not on DEV |
| DSR-ECO-005 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-005 [en] detail hero shows tag, background image, category name, and summary — DSR-590 page not on DEV |
| DSR-ECO-007 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-007 [en] detail product list equals the query-index products carrying the eco tag — DSR-590 page not on DEV |
| DSR-ECO-010 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-010 [en] detail product cards link to /en/products/{id} with HTTP 200 — DSR-590 page not on DEV |
| DSR-ECO-006 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-006 [ja] free editing area renders between hero and product list — DSR-590 page not on DEV |
| DSR-ECO-009 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-009 [ja] detail with 0 matching products shows no broken list and no error — DSR-590 page not on DEV |
| DSR-ECO-013 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-013 [en] TOP exists with html lang, names in its language, and language-kept internal links — en demo page not on DEV |
| DSR-ECO-013 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-013 [cn] TOP and detail exist with html lang and language-kept internal links — cn: no /master/cn on DEV (Issue #18) |
| DSR-ICON-001 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-001 [ja] product detail performance/function icons all match the official set (TD-589-04) — Blocked: TD-589-04 official icon list |
| DSR-ICON-002 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-002 [ja] product list card icons all match the official set (TD-589-04) — Blocked: TD-589-04 official icon list |
| DSR-ICON-003 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-003 [ja] condition search option and result icons all match the official set (TD-589-04) — Blocked: TD-589-04 official icon list |
| DSR-ICON-004 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-004 [ja] no temporary icon (TD-589-06) remains on the target pages — Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-001 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-001 [en] product detail performance/function icons all match the official set (TD-589-04) — Blocked: TD-589-04 official icon list |
| DSR-ICON-002 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-002 [en] product list card icons all match the official set (TD-589-04) — Blocked: TD-589-04 official icon list |
| DSR-ICON-003 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-003 [en] condition search option and result icons all match the official set (TD-589-04) — Blocked: TD-589-04 official icon list |
| DSR-ICON-004 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-004 [en] no temporary icon (TD-589-06) remains on the target pages — Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-005 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-005 [ja] same function uses the same asset on detail, list card and condition search — Blocked: TD-589-04 official icon list |
| DSR-ICON-007 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-007 [ja] product without function values shows no icon area — blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-008 [ja] maximum number of icons wraps on SP without overflow or overlap — blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-009 [ja] language versions show the same ordered icon set — blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-009 [en] language versions show the same ordered icon set — blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-MOVIE-020 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-020 displays visible related product codes in order — Issue #1: related products specification pending |
| DSR-MOVIE-021 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-021 sorts related content by update date descending — Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-023 excludes unavailable and inactive related movies — Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-025 navigates the related content carousel to its end — Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-028 removes line breaks from description metadata — Description line-break separator is unconfirmed |
| DSR-MOVIE-001 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-001 B: page auto-generation not implemented — B: page auto-generation not implemented |
| DSR-MOVIE-002 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-002 B: page auto-generation not implemented — B: page auto-generation not implemented |
| DSR-MOVIE-003 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-003 B: page auto-generation not implemented — B: page auto-generation not implemented |
| DSR-MOVIE-004 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-004 M: Universal Editor requires IMS login; manual only — M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-005 B: page auto-generation not implemented — B: page auto-generation not implemented |
| DSR-MOVIE-006 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-006 B: URL structure not implemented, DSR-536 — B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-007 B: URL structure not implemented, DSR-536 — B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-008 B: URL structure not implemented, DSR-536 — B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-009 B: URL structure not implemented, DSR-536 — B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-010 B: URL structure not implemented, DSR-536 — B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-011 B: page auto-generation not implemented — B: page auto-generation not implemented |
| DSR-MOVIE-013 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-013 C: overflow automation deferred; CJK font manual — C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-015 C: iframe source automation deferred; playback manual — C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-016 B: movie-detail-player-video not implemented, DAM test data pending — B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-017 B: movie-detail-player-video not implemented, DAM test data pending — B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-018 B: test data pending (docs/DSR-173/test-data.md); Issue #12 — B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-019 C: layout automation deferred; in-iframe error manual — C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-022 B: test data pending (docs/DSR-173/test-data.md) — B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-024 B: test data pending (docs/DSR-173/test-data.md) — B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-030 M: SNS debuggers need login and public URL; manual only — M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-031 B: page auto-generation not implemented — B: page auto-generation not implemented |
| DSR-MOVIE-032 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-032 B: ja/zh pages not available — B: ja/zh pages not available |
| DSR-MOVIE-035 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-035 B: SP design pending — B: SP design pending |
| DSR-VOV-001 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays — TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-001 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays — TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-002 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-002 [en] preview-only CF related → 200 on .aem.page, 404 on .aem.live — TD-587-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-preview HTTP 404) |
| DSR-VOV-003 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests — TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-003 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests — TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-004 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-004 [en] CF related name with uppercase / underscore → 404 — TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404 — TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .aem.live — TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-007 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list — TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-007 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list — TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-008 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list — TD-587-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-unavail HTTP 404) |
| DSR-VOV-010 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-010 [en] unpublished CF related → 404 on both hosts, absent from query-index — TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/tech-talk stays a list page — tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/tech-talk stays a list page — tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [cn] list pages — Issue #18: no /cn path on DEV |
| DSR-VOV-014 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-014 [en] related movies max 5 when 6 are linked — TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-015 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-015 [en] related movie with isUnavailable = true is hidden — TD-587-15 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-b HTTP 404) |
| DSR-VOV-016 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-016 [en] related contents ordered by update date, newest first — TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-017 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-017 [en] DSR-173 Group A page switched to the overlay page — TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [ja] language variant: 200, html lang, title — TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [en] language variant: 200, html lang, title — TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [cn] language variant — Issue #18: no /cn path on DEV |
| DSR-501-P3 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P3 [en] related movies are max 5, newest updated first — blocked-data: stale preview, static HTML has fewer relatedMovies rows than query (static HTML 5 relatedMovies rows, query 6; last-modified Fri, 16 Oct 2026 06:43:41 GMT) |
| DSR-NEWS-001 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-001 [ja] page shows date, category, title and body — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-002 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [ja] fixed order date → category → title → body → CTA → Back to list — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-003 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [ja] shown date equals meta publish date — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-004 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-004 [ja] category and title are non-empty text — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-006 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [ja] Back to list href resolves to /ja/news/ — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-007 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [ja] page row in query-index with publishDate/category/tags/template — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-009 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-009 [ja] no related-content block — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-010 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-010 [ja] CTA (Button8) href equals authored URL — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-012 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [ja] My List button and share icons visible and enabled (no click) — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-013 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-013 [ja] body keeps h2/h3, strong, ul/ol, a when present — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-018 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [ja] title, description and og tags non-empty — Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-PDO-001 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-001 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-002 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live — TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-003 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-003 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-004 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-005 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-006 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-006 [ja] CF related in subfolder → no page (404) — TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live — TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-008 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list — TD-586-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586008 HTTP 404) |
| DSR-PDO-009 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex — TD-586-09 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586009 HTTP 404) |
| DSR-PDO-011 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index — TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-012 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-014 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [en] language variant: 200, html lang matches, product name present — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issue #18) — (no reason given) |
| DSR-PDO-017 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-017 [ja] fixed Product CF field set displayed, removed fields absent — DSR-585 項目fix版 field list not in repo (Q27 review open) |
| DSR-PDO-019 | `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page — TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PRODLIST-003 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [en] SP column count stays 2 after scroll, load more, filter and 3 reloads — blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1): last card = column width, left aligned — blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-006 [ja] SP card layout vs Figma 375 frame (visual) — Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-006 [en] SP card layout vs Figma 375 frame (visual) — Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-007 [ja] Real device iOS Safari / Android Chrome: 2 columns (manual) — Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |

## 6. Failed tests

### DSR-ARTICLE-002 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing` — `tests/article-detail/DSR-529.article-detail.spec.ts:42`
- Failing assertion: `Error: infoBar before body` — `tests/article-detail/DSR-529.article-detail.spec.ts:45` — Expected: true; Received: false
- Failing assertion: `Error: empty blocks` — `tests/article-detail/DSR-529.article-detail.spec.ts:47`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-003 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts:56` — Expected: "QA529 ストーリー詳細テスト"; Received: "QA529 ナビ"
- Failing assertion: `Error: <title>` — `tests/article-detail/DSR-529.article-detail.spec.ts:58` — Expected: "QA529 ストーリー詳細テスト"; Received: "QA529 ナビ"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-4cd2c-TD-title-one-h1-title-title-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-4cd2c-TD-title-one-h1-title-title-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-006 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels` — `tests/article-detail/DSR-529.article-detail.spec.ts:65` — Expected: 2; Received: 0
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-007 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [ja] info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts:77` — Expected: null; Received: "2026-10-01"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-86406-ar-date-meta-published-date-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-86406-ar-date-meta-published-date-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-010 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:101` — Expected: 1; Received: 0
- Failing assertion: `Error: updated-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:102` — Expected: 1; Received: 0
- Failing assertion: `Error: published-date starts with 2026-10-01` — `tests/article-detail/DSR-529.article-detail.spec.ts:104` — Expected: /^2026-10-01/; Received: ""
- Failing assertion: `Error: published-date parses as ISO 8601` — `tests/article-detail/DSR-529.article-detail.spec.ts:105` — Expected: false; Received: true
- … 2 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-79b36-ach-update-date-not-visible-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-79b36-ach-update-date-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-011 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL` — `tests/article-detail/DSR-529.article-detail.spec.ts:116` — Expected: /^https?:\/\//; Received: "/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-012 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs` — `tests/article-detail/DSR-529.article-detail.spec.ts:132` — Expected: 2; Received: 0
- Failing assertion: `Error: search-keywords has qa529kw1` — `tests/article-detail/DSR-529.article-detail.spec.ts:134` — Expected: "qa529kw1"; Received: ""
- Failing assertion: `Error: search-keywords has qa529kw2` — `tests/article-detail/DSR-529.article-detail.spec.ts:134` — Expected: "qa529kw2"; Received: ""
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-b3344-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-b3344-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-013 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order

- Failing assertion: `Error: item 1 = qa529-r1` — `tests/article-detail/DSR-529.article-detail.spec.ts:146` — Expected: /\/qa529-r1(\.html)?$/; Received: "qa529-r1"
- Failing assertion: `Error: item 1 under /library/article/stories/` — `tests/article-detail/DSR-529.article-detail.spec.ts:147` — Expected: "/library/article/stories/"; Received: "qa529-r1"
- Failing assertion: `Error: item 2 = qa529-r2` — `tests/article-detail/DSR-529.article-detail.spec.ts:146` — Expected: /\/qa529-r2(\.html)?$/; Received: "qa529-r2"
- Failing assertion: `Error: item 2 under /library/article/stories/` — `tests/article-detail/DSR-529.article-detail.spec.ts:147` — Expected: "/library/article/stories/"; Received: "qa529-r2"
- … 2 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-829ce-d-stories-r1-r2-r3-in-order-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-829ce-d-stories-r1-r2-r3-in-order-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-014 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:157` — Expected: 1; Received: 0
- Failing assertion: `Error: published-date non-empty` — `tests/article-detail/DSR-529.article-detail.spec.ts:158` — Expected: not ""; Received: ?
- Failing assertion: `Error: category count` — `tests/article-detail/DSR-529.article-detail.spec.ts:157` — Expected: 1; Received: 0
- Failing assertion: `Error: category non-empty` — `tests/article-detail/DSR-529.article-detail.spec.ts:158` — Expected: not ""; Received: ?
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-162e5-gory-exactly-once-non-empty-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-162e5-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-016 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots` — `tests/article-detail/DSR-529.article-detail.spec.ts:171` — Expected: not /noindex/i; Received: "noindex, nofollow"
- Failing assertion: `Error: qa529-02 robots` — `tests/article-detail/DSR-529.article-detail.spec.ts:179` — Expected: /noindex/i; Received: ""
- Failing assertion: `Error: qa529-02 robots` — `tests/article-detail/DSR-529.article-detail.spec.ts:180` — Expected: /nofollow/i; Received: ""
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-024 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href` — `tests/article-detail/DSR-529.article-detail.spec.ts:190` — Expected: not /^(#?)$/; Received: "#"
- Failing assertion: `Error: contact href` — `tests/article-detail/DSR-529.article-detail.spec.ts:190` — Expected: not /^(#?)$/; Received: "#"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-029 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/article-detail/DSR-529.article-detail.spec.ts:223` — Expected: "QA529 ストーリー詳細テスト"; Received: "QA529 ナビ"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-04322-info-bar-in-ja-html-lang-ja-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-04322-info-bar-in-ja-html-lang-ja-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-002 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing` — `tests/article-detail/DSR-529.article-detail.spec.ts:42`
- Failing assertion: `Error: infoBar before body` — `tests/article-detail/DSR-529.article-detail.spec.ts:45` — Expected: true; Received: false
- Failing assertion: `Error: empty blocks` — `tests/article-detail/DSR-529.article-detail.spec.ts:47`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-003 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts:56` — Expected: "QA529 Story detail test"; Received: "QA529 Nav"
- Failing assertion: `Error: <title>` — `tests/article-detail/DSR-529.article-detail.spec.ts:58` — Expected: "QA529 Story detail test"; Received: "QA529 Nav"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-fc143-TD-title-one-h1-title-title-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-fc143-TD-title-one-h1-title-title-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-006 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels` — `tests/article-detail/DSR-529.article-detail.spec.ts:65` — Expected: 2; Received: 0
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-007 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [en] info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts:77` — Expected: null; Received: "2026-10-01"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-7079a-ar-date-meta-published-date-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-7079a-ar-date-meta-published-date-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-010 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:101` — Expected: 1; Received: 0
- Failing assertion: `Error: updated-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:102` — Expected: 1; Received: 0
- Failing assertion: `Error: published-date starts with 2026-10-01` — `tests/article-detail/DSR-529.article-detail.spec.ts:104` — Expected: /^2026-10-01/; Received: ""
- Failing assertion: `Error: published-date parses as ISO 8601` — `tests/article-detail/DSR-529.article-detail.spec.ts:105` — Expected: false; Received: true
- … 2 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-11a6e-ach-update-date-not-visible-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-11a6e-ach-update-date-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-011 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL` — `tests/article-detail/DSR-529.article-detail.spec.ts:116` — Expected: /^https?:\/\//; Received: "/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-012 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs` — `tests/article-detail/DSR-529.article-detail.spec.ts:132` — Expected: 2; Received: 0
- Failing assertion: `Error: search-keywords has qa529kw1` — `tests/article-detail/DSR-529.article-detail.spec.ts:134` — Expected: "qa529kw1"; Received: ""
- Failing assertion: `Error: search-keywords has qa529kw2` — `tests/article-detail/DSR-529.article-detail.spec.ts:134` — Expected: "qa529kw2"; Received: ""
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-b15c5-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-b15c5-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-013 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order

- Failing assertion: `Error: item 1 = qa529-r1` — `tests/article-detail/DSR-529.article-detail.spec.ts:146` — Expected: /\/qa529-r1(\.html)?$/; Received: "qa529-r1"
- Failing assertion: `Error: item 1 under /library/article/stories/` — `tests/article-detail/DSR-529.article-detail.spec.ts:147` — Expected: "/library/article/stories/"; Received: "qa529-r1"
- Failing assertion: `Error: item 2 = qa529-r2` — `tests/article-detail/DSR-529.article-detail.spec.ts:146` — Expected: /\/qa529-r2(\.html)?$/; Received: "qa529-r3"
- Failing assertion: `Error: item 2 under /library/article/stories/` — `tests/article-detail/DSR-529.article-detail.spec.ts:147` — Expected: "/library/article/stories/"; Received: "qa529-r3"
- … 2 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-d97de-d-stories-r1-r2-r3-in-order-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-d97de-d-stories-r1-r2-r3-in-order-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-014 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:157` — Expected: 1; Received: 0
- Failing assertion: `Error: published-date non-empty` — `tests/article-detail/DSR-529.article-detail.spec.ts:158` — Expected: not ""; Received: ?
- Failing assertion: `Error: category count` — `tests/article-detail/DSR-529.article-detail.spec.ts:157` — Expected: 1; Received: 0
- Failing assertion: `Error: category non-empty` — `tests/article-detail/DSR-529.article-detail.spec.ts:158` — Expected: not ""; Received: ?
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-401db-gory-exactly-once-non-empty-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-401db-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-016 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots` — `tests/article-detail/DSR-529.article-detail.spec.ts:171` — Expected: not /noindex/i; Received: "noindex, nofollow"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-024 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href` — `tests/article-detail/DSR-529.article-detail.spec.ts:190` — Expected: not /^(#?)$/; Received: "#"
- Failing assertion: `Error: contact href` — `tests/article-detail/DSR-529.article-detail.spec.ts:190` — Expected: not /^(#?)$/; Received: "#"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-029 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/article-detail/DSR-529.article-detail.spec.ts:223` — Expected: "QA529 Story detail test"; Received: "QA529 Nav"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-c6c1a-info-bar-in-en-html-lang-en-chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-c6c1a-info-bar-in-en-html-lang-en-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-023 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion: `Error: visible related items heading` — `tests/article-detail/DSR-529.article-detail.spec.ts:266`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium/test-failed-1.png`, `test-results/j09/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium-retry1/test-failed-1.png`

### DSR-BREAD-032 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline [firefox]

- Failing assertion: `Error: expect(locator).toHaveScreenshot(expected) failed` — `tests/breadcrumb/DSR-552.breadcrumb.spec.ts:255`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/breadcrumb-DSR-552.breadcr-02fb2--032-cross-browser-baseline-firefox/test-failed-1.png`, `test-results/j09/breadcrumb-DSR-552.breadcr-02fb2--032-cross-browser-baseline-firefox-retry1/test-failed-1.png`

### DSR-BREAD-032 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline [webkit]

- Failing assertion: `Error: browserType.launch: ` — `(no file location: global test timeout)`
- Attempt(s): failed / failed
- Evidence paths: none generated

### DSR-CATDL-006 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [ja] requiresForm=true card leads to the download form

- Failing assertion: `Error: expect(locator).toHaveCount(expected) failed` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:101` — Expected: 1; Received: 0
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/catalog-download-DSR-570.c-0ac41--leads-to-the-download-form-chromium/test-failed-1.png`, `test-results/j09/catalog-download-DSR-570.c-0ac41--leads-to-the-download-form-chromium-retry1/test-failed-1.png`

### DSR-CATDL-018 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form

- Failing assertion: `Test timeout of 30000ms exceeded.` — `(no file location: global test timeout)`
- Failing assertion: `Error: page.waitForEvent: Test timeout of 30000ms exceeded.` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:120`
- Attempt(s): timedOut / timedOut
- Evidence paths: `test-results/j09/catalog-download-DSR-570.c-937ce-opens-ebookUrl-without-form-chromium/test-failed-1.png`, `test-results/j09/catalog-download-DSR-570.c-937ce-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`

### DSR-CATDL-006 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [en] requiresForm=true card leads to the download form

- Failing assertion: `Error: expect(locator).toHaveCount(expected) failed` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:101` — Expected: 1; Received: 0
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/catalog-download-DSR-570.c-9941f--leads-to-the-download-form-chromium/test-failed-1.png`, `test-results/j09/catalog-download-DSR-570.c-9941f--leads-to-the-download-form-chromium-retry1/test-failed-1.png`

### DSR-CATDL-018 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [en] e-book form card opens ebookUrl without form

- Failing assertion: `Test timeout of 30000ms exceeded.` — `(no file location: global test timeout)`
- Failing assertion: `Error: page.waitForEvent: Test timeout of 30000ms exceeded.` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:120`
- Attempt(s): timedOut / timedOut
- Evidence paths: `test-results/j09/catalog-download-DSR-570.c-b8a9e-opens-ebookUrl-without-form-chromium/test-failed-1.png`, `test-results/j09/catalog-download-DSR-570.c-b8a9e-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`

### DSR-CATDL-007 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `Error: gated PDF URL delivered to the browser before submit` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:187`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png`, `test-results/j09/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png`

### DSR-CATV-017 — `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form (ja)

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:102` — Expected: "https://www.ykkfastening.com/"; Received: "https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook-form"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium/test-failed-1.png`, `test-results/j09/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`

### DSR-CATV-017 — `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form (en)

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:102` — Expected: "https://www.ykkfastening.com/"; Received: "https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook-form"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium/test-failed-1.png`, `test-results/j09/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`

### DSR-ECO-002 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language)

- Failing assertion: `Error: VIEW MORE not on site with same language prefix` — `tests/eco-products/DSR-590.eco-products.spec.ts:106`
- Failing assertion: `Error: detail slugs = TD-590-02` — `tests/eco-products/DSR-590.eco-products.spec.ts:108`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/eco-products-DSR-590.eco-p-b04ae-ail-page-200-same-language--chromium/test-failed-1.png`, `test-results/j09/eco-products-DSR-590.eco-p-b04ae-ail-page-200-same-language--chromium-retry1/test-failed-1.png`

### DSR-ECO-004 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200)

- Failing assertion: `Error: finder URL (P087), same language` — `tests/eco-products/DSR-590.eco-products.spec.ts:122` — Expected: ""; Received: ["/ja/product/performance/sustainable/sustainable-solution-finder", "/master/ja/product/performance/sustainable/sustaina
- Failing assertion: `Error: finder link on the same site` — `tests/eco-products/DSR-590.eco-products.spec.ts:123` — Expected: "https://main--dsr-eds-dev--sutrix-projects.aem.live"; Received: "https://google.com"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/eco-products-DSR-590.eco-p-54993-he-product-finder-P087-200--chromium/test-failed-1.png`, `test-results/j09/eco-products-DSR-590.eco-p-54993-he-product-finder-P087-200--chromium-retry1/test-failed-1.png`

### DSR-ICON-006 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `Error: console errors` — `tests/icons/DSR-589.icons.spec.ts:107`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium/test-failed-1.png`, `test-results/j09/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-ICON-006 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `Error: console errors` — `tests/icons/DSR-589.icons.spec.ts:107`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium/test-failed-1.png`, `test-results/j09/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-014 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-014 embeds the configured YouTube movie

- Failing assertion: `Error: expect(locator).toHaveAttribute(expected) failed` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:32` — Expected: /\/embed\//; Received: ?
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/test-failed-1.png`, `test-results/j09/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-026 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-026 displays related thumbnails, types, tags and valid links

- Failing assertion: `Error: Related card 1 thumbnail` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:141` — Expected: visible; Received: ?
- Failing assertion: `Error: Related card 1 thumbnail loaded` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:144` — Expected: true; Received: false
- Failing assertion: `Error: Related card 1 language` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:149` — Expected: /^\/master\/en\//; Received: "/digital-showroom/en/library/catalog.html"
- Failing assertion: `Error: Related card 1 https://publish-p192812-e2014374.adobeaemcloud.com/digital-showroom/en/library/catalog.html` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:151` — Expected: 200; Received: 500
- … 8 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`, `test-results/j09/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-033 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-033 displays component sections in vertical order on PC

- Failing assertion: `Error: expect(locator).toBeVisible() failed` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:201` — Expected: visible; Received: ?
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium/test-failed-1.png`, `test-results/j09/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium-retry1/test-failed-1.png`

### DSR-501-P3 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P3 [en] related movies are limited to 5 in authored order

- Failing assertion: `Error: expect(locator).toBeVisible() failed` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:268` — Expected: visible; Received: ?
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium/test-failed-1.png`, `test-results/j09/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium-retry1/test-failed-1.png`

### DSR-501-P2 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed

- Failing assertion: `Error: expect(locator).toBeVisible() failed` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:275` — Expected: visible; Received: ?
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium/test-failed-1.png`, `test-results/j09/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium-retry1/test-failed-1.png`

### DSR-VOV-011 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail)

- Failing assertion: `Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/search` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:197` — Expected: 200; Received: 404
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/movie-detail-DSR-587.movie-f5a89-h-≥-1-card-no-video-detail--chromium/test-failed-1.png`, `test-results/j09/movie-detail-DSR-587.movie-f5a89-h-≥-1-card-no-video-detail--chromium-retry1/test-failed-1.png`

### DSR-VOV-011 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail)

- Failing assertion: `Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/search` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:197` — Expected: 200; Received: 404
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium/test-failed-1.png`, `test-results/j09/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium-retry1/test-failed-1.png`

### DSR-NEWS-002 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list

- Failing assertion: `Error: required elements missing` — `tests/news-detail/DSR-566.news-detail.spec.ts:44`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium/test-failed-1.png`, `test-results/j09/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium-retry1/test-failed-1.png`

### DSR-NEWS-003 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [en] shown date equals meta publish date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/news-detail/DSR-566.news-detail.spec.ts:57` — Expected: "2026-09-29"; Received: "2026-03-30"
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium/test-failed-1.png`, `test-results/j09/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium-retry1/test-failed-1.png`

### DSR-NEWS-006 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [en] Back to list href resolves to /en/news/

- Failing assertion: `Error: Back to list link` — `tests/news-detail/DSR-566.news-detail.spec.ts:76` — Expected: 1; Received: 0
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium/test-failed-1.png`, `test-results/j09/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium-retry1/test-failed-1.png`

### DSR-NEWS-007 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template

- Failing assertion: `Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json` — `tests/news-detail/DSR-566.news-detail.spec.ts:98` — Expected: ?; Received: null
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium/test-failed-1.png`, `test-results/j09/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium-retry1/test-failed-1.png`

### DSR-NEWS-012 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click)

- Failing assertion: `Error: My List button` — `tests/news-detail/DSR-566.news-detail.spec.ts:131` — Expected: visible; Received: ?
- Failing assertion: `Error: My List enabled` — `tests/news-detail/DSR-566.news-detail.spec.ts:132` — Expected: enabled; Received: ?
- Failing assertion: `Error: share icons` — `tests/news-detail/DSR-566.news-detail.spec.ts:133` — Expected: > 0; Received: 0
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium/test-failed-1.png`, `test-results/j09/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium-retry1/test-failed-1.png`

### DSR-NEWS-018 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [en] title, description and og tags non-empty

- Failing assertion: `Error: meta[name="description"]` — `tests/news-detail/DSR-566.news-detail.spec.ts:158` — Expected: not ""; Received: ?
- Failing assertion: `Error: meta[property="og:description"]` — `tests/news-detail/DSR-566.news-detail.spec.ts:158` — Expected: not ""; Received: ?
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium/test-failed-1.png`, `test-results/j09/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium-retry1/test-failed-1.png`

### DSR-PLSP-002 — `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Failing assertion: `Error: 767: distinct card left values in first row` — `tests/product-list/DSR-583.product-list-sp.spec.ts:43` — Expected: 2; Received: 3
- Failing assertion: `Error: 767: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list-sp.spec.ts:44` — Expected: 2; Received: 3
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium-retry1/test-failed-1.png`

### DSR-PLSP-003 — `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — `(no file location: global test timeout)`
- Failing assertion: `Error: locator.evaluate: Test timeout of 30000ms exceeded.` — `pages/ProductListPage.ts:112`
- Attempt(s): timedOut / timedOut
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png`

### DSR-PLSP-005 — `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Error: 3 results: left aligned` — `tests/product-list/DSR-583.product-list-sp.spec.ts:130` — Expected: 0; Received: 2
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium-retry1/test-failed-1.png`

### DSR-PLSP-002 — `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Failing assertion: `Error: 767: distinct card left values in first row` — `tests/product-list/DSR-583.product-list-sp.spec.ts:43` — Expected: 2; Received: 3
- Failing assertion: `Error: 767: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list-sp.spec.ts:44` — Expected: 2; Received: 3
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium-retry1/test-failed-1.png`

### DSR-PLSP-003 — `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — `(no file location: global test timeout)`
- Failing assertion: `Error: locator.evaluate: Test timeout of 30000ms exceeded.` — `pages/ProductListPage.ts:112`
- Attempt(s): timedOut / timedOut
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png`

### DSR-PLSP-005 — `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Error: 3 results: left aligned` — `tests/product-list/DSR-583.product-list-sp.spec.ts:130` — Expected: 0; Received: 2
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-001 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `Error: TD-583-01 ≥ 6 products` — `tests/product-list/DSR-583.product-list.spec.ts:48` — Expected: >= 6; Received: 3
- Failing assertion: `Error: 375: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33` — Expected: 2; Received: 1
- Failing assertion: `Error: 375: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list.spec.ts:34` — Expected: 2; Received: 1
- Failing assertion: `Error: 375: row 1 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- … 1 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-002 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `Error: 320: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: grid-template-columns tracks` — `tests/product-list/DSR-583.product-list.spec.ts:34` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: row 1 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- Failing assertion: `Error: 320: row 2 cards` — `tests/product-list/DSR-583.product-list.spec.ts:36` — Expected: 2; Received: 1
- … 20 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-003 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `Error: open: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70` — Expected: 2; Received: 1
- Failing assertion: `Error: open: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:71` — Expected: 2; Received: 1
- Failing assertion: `Error: scroll-bottom: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70` — Expected: 2; Received: 1
- Failing assertion: `Error: scroll-bottom: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:71` — Expected: 2; Received: 1
- … 6 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-004 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `Error: 1440: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153` — Expected: 4; Received: 1
- Failing assertion: `Error: 1440: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:154` — Expected: 4; Received: 1
- Failing assertion: `Error: 1200: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153` — Expected: 4; Received: 1
- Failing assertion: `Error: 1200: grid tracks` — `tests/product-list/DSR-583.product-list.spec.ts:154` — Expected: 4; Received: 1
- … 4 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium/test-failed-1.png`, `test-results/j09/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 — `top/DSR-609.top.spec.ts` › DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover` — `tests/top/DSR-609.top.spec.ts:40` — Expected: not []; Received: ?
- Failing assertion: `Error: product search page https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/search-result?q=zipper HTTP status` — `tests/top/DSR-609.top.spec.ts:51` — Expected: 200; Received: 404
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/j09/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 — `top/DSR-609.top.spec.ts` › DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83` — Expected: true; Received: false
- Failing assertion: `Error: card 2 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83` — Expected: true; Received: false
- Failing assertion: `Error: card 3 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83` — Expected: true; Received: false
- Failing assertion: `Error: card 4 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83` — Expected: true; Received: false
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/j09/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 — `top/DSR-609.top.spec.ts` › DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /ja/news/query-index.json` — `tests/top/DSR-609.top.spec.ts:124` — Expected: "/ja/news/query-index.json"; Received: ["/query-index.json"]
- Failing assertion: `Error: publish dates of shown items (desc)` — `tests/top/DSR-609.top.spec.ts:129`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/j09/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 — `top/DSR-609.top.spec.ts` › DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160` — Expected: <= 1; Received: 2
- Failing assertion: `Error: SP item 2 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160` — Expected: <= 1; Received: 2
- Failing assertion: `Error: SP item 3 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160` — Expected: <= 1; Received: 2
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/j09/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 — `top/DSR-609.top.spec.ts` › DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover` — `tests/top/DSR-609.top.spec.ts:40` — Expected: not []; Received: ?
- Failing assertion: `Error: product search page https://main--dsr-eds-dev--sutrix-projects.aem.live/en/search-result?q=zipper HTTP status` — `tests/top/DSR-609.top.spec.ts:51` — Expected: 200; Received: 404
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/j09/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 — `top/DSR-609.top.spec.ts` › DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83` — Expected: true; Received: false
- Failing assertion: `Error: card 2 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83` — Expected: true; Received: false
- Failing assertion: `Error: card 3 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83` — Expected: true; Received: false
- Failing assertion: `Error: card 4 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83` — Expected: true; Received: false
- … 3 more distinct assertion(s) (see Playwright output)
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/j09/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 — `top/DSR-609.top.spec.ts` › DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /en/news/query-index.json` — `tests/top/DSR-609.top.spec.ts:124` — Expected: "/en/news/query-index.json"; Received: ["/query-index.json"]
- Failing assertion: `Error: publish dates of shown items (desc)` — `tests/top/DSR-609.top.spec.ts:129`
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/j09/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 — `top/DSR-609.top.spec.ts` › DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160` — Expected: <= 1; Received: 2
- Failing assertion: `Error: SP item 2 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160` — Expected: <= 1; Received: 2
- Failing assertion: `Error: SP item 3 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160` — Expected: <= 1; Received: 2
- Attempt(s): failed / failed
- Evidence paths: `test-results/j09/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/j09/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. Retry screenshots of the 8 changed tests (CATDL-006, CATDL-018, CATV-017, VOV-011; ja+en) are copied to `ykk-dsr/hub/results/JOB-20261020-09/evidence/` (committed).

## 7. Open points for QA

- The run started at 09:31Z, not ≥ 14:00Z. If Martin's ver0.4 update was still running, product results can change; JOB-20261020-08 (hold) is the dedicated re-smoke.
- The catalog merge time is recorded inconsistently. The job and BUG-RULES say ~12:45 JST, but `results/DSR-570/DEV/automation-run-20261020.md` says ~12:45 UTC+7 (05:45Z). The catalog JS is dated 05:55:17Z either way, and all catalog changes appeared after 01:36Z.
- CATDL-018 and CATV-017 expect "opens ebookUrl without form". DSR-655 Y3 (e-book gated) now routes the card to a catalog detail page, so this needs a TC decision (suspect test). Separately, the target pages `qa190-cat-ebook-form` / `qa190-cat-pdf-form` are 404 on .aem.live (en 200 on .aem.page; ja 404 on both at 09:50Z), so the form flow cannot be checked on .live.
- DSR-VOV-011: `/{ja,en}/library/video/search` is 404 on .aem.live (200 on .aem.page). It passed at 01:36Z and failed on 19/10, so it was probably un-/re-published. Not verified.
- dm_product ver0.4: `dsr-product-page` field names differ from JOB-07 (camelCase `howToUse`/`howToUseImage`, new `notice`/`noticeImage`/`applicableSliderSameAsParent`, no `applicableSliderStandard`/`applicableSliderSpecial`). `product-detail` is unchanged. The specs cannot see this (DSR-586 skipped). See raw.md.
- CATV-017 ja/en labels are assigned from the order of the results and the `/ja/` vs `/en/` in the received href. The JSON report has no describe title for this spec.
- Not verified: STG, Author content, Cloud Manager deploy times, the exact ver0.4 completion time.
