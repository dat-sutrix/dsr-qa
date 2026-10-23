# regression DEV automation run — 20261023-idle39

Job: `JOB-ZZ-IDLE-39` (daily DEV regression 23/10, all specs; run-only, read-only). One full run of `npm run test:dev` (all projects) on EDS `main` **.aem.live**, compared with `JOB-ZZ-IDLE-35` (22/10, 09:13Z). The comparison and cause tags are in `ykk-dsr/hub/results/JOB-ZZ-IDLE-39/` (summary.md, result.json). The job asked for `results/<US>/DEV/…` per US. Following IDLE-35, this is one cross-US report with a per-spec/US totals table (§3).

## 1. Header

- Run start (UTC): 2026-10-23T01:20:59Z (tsc check ran right before it, 01:20:50Z)
- Run end (UTC): 2026-10-23T01:42:01Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): all pages used by the existing specs (movie DSR-173/501/538/587/647/664, assets DSR-227, mail DSR-433, article DSR-529, breadcrumb DSR-552, catalog/video DSR-557, news DSR-566, catalog download DSR-570, product list DSR-583, product CF DSR-585, product detail DSR-586, icons DSR-589, eco DSR-590, top DSR-609, catalog overlay DSR-654, smoke). Default path mode (`DSR_PATHS` unset = v1).
- Build under test: not independently verified (I did not read the deploy log). Last-Modified headers seen in this job: the CATOV-010 subfolder URL shows 2026-10-22 14:37:47 GMT and the ja news test page qa566-news-01 shows 2026-10-22 13:43:26 GMT. Both are after IDLE-35 ended.
- Baseline ID: per US as recorded in `docs/<US>/` (DSR-173: BL-v1; overlay: BL-OVL-1). Not re-verified in this run.
- Automation HEAD commit SHA: 2b9a78c6b9a49e6144ed4c4fe545ef87c670f514
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/idle39.json npm run test:dev
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 545 | 294 | 57 | 194 | 1 | 2 | configured 1; 57 retries run (every failed test, none recovered) | 21.0 min (1258 s) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms. Scope/browser: full suite, all projects (chromium; firefox/webkit for DSR-BREAD-032 only). Flaky outcomes: 0. The "1 did not run" in Playwright's list output is DSR-NEWS-015 (serial after NEWS-014 failed), which is counted under skipped.
Compared with IDLE-35 (541 tests): +4 tests. They come from the DSR-566 spec change in JOB-ZZ-IDLE-37 (NEWS-002 renamed, NEWS-008 ja/en added) and the DSR-566 visual-capture spec (NEWS-014/015).

Per spec (US) totals, pass / fail / skip (IDLE-35 in brackets where different):

| Spec | Pass | Fail | Skip |
|---|---:|---:|---:|
| article-detail/DSR-529.article-detail.spec.ts | 24 | 9 | 17 |
| article-detail/DSR-529.idle27-capture.spec.ts | 10 | 0 | 0 |
| article-detail/DSR-529.visual-capture.spec.ts | 6 | 0 | 0 |
| asset-migration/DSR-227.asset-migration.spec.ts | 2 (1) | 0 | 15 (16) |
| breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts | 8 | 0 | 0 |
| breadcrumb/DSR-552.breadcrumb.spec.ts | 29 | 2 | 14 |
| catalog-detail/DSR-570.visual.spec.ts | 2 | 0 | 0 |
| catalog-download/DSR-570.catalog-download.spec.ts | 12 | 2 | 2 |
| catalog-overlay/DSR-654.catalog-overlay.spec.ts | 39 (40) | 16 (15) | 7 |
| catalog-video/DSR-557.catalog-video.spec.ts | 24 | 0 | 6 |
| eco-products/DSR-590.eco-products.spec.ts | 4 | 2 | 13 |
| eco-products/DSR-590.layout-capture.spec.ts | 4 | 0 | 0 |
| eco-products/DSR-590.stable-capture.spec.ts | 2 | 0 | 0 |
| eco-products/DSR-590.visual-capture.spec.ts | 2 | 0 | 0 |
| icons/DSR-589.icons.spec.ts | 0 | 2 | 13 |
| mail/DSR-433.mail-endpoints.spec.ts | 2 | 0 | 0 |
| movie-detail/DSR-173.movie-detail.spec.ts | 5 | 5 | 28 |
| movie-detail/DSR-587.movie-overlay.spec.ts | 11 | 0 | 15 |
| movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts | 2 | 0 | 0 |
| movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts | 2 | 0 | 4 |
| news-detail/DSR-566.news-detail.spec.ts | 0 (3) | 0 (8) | 24 (11) |
| news-detail/DSR-566.visual-capture.spec.ts | 0 | 1 (0) | 1 (0) |
| overlay-seo/DSR-587.overlay-seo.spec.ts | 61 | 0 | 5 |
| product-cf/DSR-585.product-cf.spec.ts | 8 | 0 | 17 |
| product-detail/DSR-586.product-detail.spec.ts | 16 (0) | 0 | 6 (22) |
| product-list/DSR-583.product-list-sp.spec.ts | 4 | 6 | 0 |
| product-list/DSR-583.product-list.spec.ts | 0 | 4 | 5 |
| smoke.spec.ts | 1 | 0 | 0 |
| top-page/DSR-609.visual-capture.spec.ts | 4 | 0 | 0 |
| top/DSR-609.top.spec.ts | 4 | 8 | 0 |
| video-block/DSR-664.video-caption-null.spec.ts | 6 | 0 | 2 |

## 4. Executed tests

Duration is summed over attempts (fail rows include the retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error (chromium) | pass | 12.1s |  |
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error (chromium) | pass | 10.2s |  |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title (chromium) | pass | 10.4s |  |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title (chromium) | pass | 7.4s |  |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs (chromium) | pass | 10.3s |  |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs (chromium) | pass | 7.6s |  |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [en] info bar date = meta publicationdate, format YYYY.MM.DD (chromium) | pass | 9.6s |  |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [ja] info bar date = meta publicationdate, format YYYY.MM.DD (chromium) | pass | 7.7s |  |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) (chromium) | pass | 8.4s |  |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) (chromium) | pass | 7.4s |  |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible (chromium) | pass | 9.6s |  |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible (chromium) | pass | 9.5s |  |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [en] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present (chromium) | pass | 9.0s |  |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [ja] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present (chromium) | pass | 12.3s |  |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible (chromium) | fail | 19.5s | Error: category meta count |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible (chromium) | fail | 10.0s | Error: category meta count |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order (chromium) | pass | 8.0s |  |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order (chromium) | pass | 4.1s |  |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty (chromium) | fail | 19.2s | Error: category count |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty (chromium) | fail | 12.3s | Error: category count |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex (chromium) | fail | 17.5s | Error: qa529-01 robots |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex (chromium) | fail | 11.3s | Error: qa529-02 robots |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded (chromium) | fail | 12.7s | Error: viewAllStories href |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded (chromium) | fail | 13.8s | Error: viewAllStories href |
| DSR-ARTICLE-028 | DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link (chromium) | pass | 6.0s |  |
| DSR-ARTICLE-028 | DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link (chromium) | pass | 8.4s |  |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en (chromium) | pass | 2.4s |  |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja (chromium) | pass | 7.5s |  |
| DSR-ARTICLE-015 | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 (chromium) | pass | 2.2s |  |
| DSR-ARTICLE-020 | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) (chromium) | pass | 3.5s |  |
| DSR-ARTICLE-023 | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) (chromium) | fail | 5.9s | Error: visible related items block |
| DSR-ARTICLE-025 | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) (chromium) | pass | 2.4s |  |
| DSR-ARTICLE-009 | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload (chromium) | pass | 4.7s |  |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /en/library/article 1440x900 record only (chromium) | pass | 4.2s |  |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /en/library/article/stories/qa529-01 1440x900 record only (chromium) | pass | 4.2s |  |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /ja/library/article 1440x900 record only (chromium) | pass | 3.9s |  |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /ja/library/article/stories/qa529-01 1440x900 record only (chromium) | pass | 5.1s |  |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 /ja/library/article/stories/qa529-02 1440x900 record only (chromium) | pass | 4.0s |  |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /en/library/article 375x900 record only (chromium) | pass | 3.8s |  |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /en/library/article/stories/qa529-01 375x900 record only (chromium) | pass | 4.0s |  |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /ja/library/article 375x900 record only (chromium) | pass | 3.8s |  |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /ja/library/article/stories/qa529-01 375x900 record only (chromium) | pass | 4.2s |  |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 /ja/library/article/stories/qa529-02 375x900 record only (chromium) | pass | 3.8s |  |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 [en] qa529-01 1440x900 capture only (chromium) | pass | 9.9s |  |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 [ja] qa529-01 1440x900 capture only (chromium) | pass | 10.2s |  |
| DSR-ARTICLE-030 | DSR-ARTICLE-030 [ja] qa529-02 1440x900 capture only (chromium) | pass | 3.6s |  |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 [en] qa529-01 390x844 capture only (chromium) | pass | 5.5s |  |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 [ja] qa529-01 390x844 capture only (chromium) | pass | 10.3s |  |
| DSR-ARTICLE-031 | DSR-ARTICLE-031 [ja] qa529-02 390x844 capture only (chromium) | pass | 3.4s |  |
| DSR-ASSET-016 | DSR-ASSET-016 [en] no asset response >= 400 on DEV product pages (query-index, max 50) (chromium) | pass | 6.0s |  |
| DSR-ASSET-016 | DSR-ASSET-016 [ja] no asset response >= 400 on DEV product pages (query-index, max 50) (chromium) | pass | 14.7s |  |
| DSR-BREAD-001 | DSR-BREAD-001 [en] child trail follows URL hierarchy (chromium) | pass | 4.4s |  |
| DSR-BREAD-001 | DSR-BREAD-001 [ja] child trail follows URL hierarchy (chromium) | pass | 4.8s |  |
| DSR-BREAD-005 | DSR-BREAD-005 [en] grandchild trail follows URL hierarchy (chromium) | pass | 4.3s |  |
| DSR-BREAD-005 | DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy (chromium) | pass | 4.5s |  |
| DSR-BREAD-002 | DSR-BREAD-002 [en] ancestor links navigate in same tab (chromium) | pass | 8.0s |  |
| DSR-BREAD-002 | DSR-BREAD-002 [ja] ancestor links navigate in same tab (chromium) | pass | 8.4s |  |
| DSR-BREAD-011 | DSR-BREAD-011 [en] items equal page titles (chromium) | pass | 5.6s |  |
| DSR-BREAD-011 | DSR-BREAD-011 [ja] items equal page titles (chromium) | pass | 5.6s |  |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement (chromium) | pass | 5.0s |  |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement (chromium) | pass | 2.4s |  |
| DSR-BREAD-002 | DSR-BREAD-002 ancestor links (chromium) | pass | 15.2s |  |
| DSR-BREAD-003 | DSR-BREAD-003 current page is not linked (chromium) | pass | 2.4s |  |
| DSR-BREAD-004 | DSR-BREAD-004 HOME label and destination (chromium) | pass | 2.8s |  |
| DSR-BREAD-005 | DSR-BREAD-005 grandchild trail order (chromium) | pass | 2.9s |  |
| DSR-BREAD-005 | DSR-BREAD-005 grandchild trail order (chromium) | pass | 2.4s |  |
| DSR-BREAD-006 | DSR-BREAD-006 parent trail (chromium) | pass | 2.3s |  |
| DSR-BREAD-007 | DSR-BREAD-007 missing intermediate page (chromium) | pass | 1.4s |  |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb (chromium) | pass | 1.7s |  |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb (chromium) | pass | 1.9s |  |
| DSR-BREAD-009 | DSR-BREAD-009 404 excludes breadcrumb (chromium) | pass | 1.6s |  |
| DSR-BREAD-011 | DSR-BREAD-011 empty label uses title (chromium) | pass | 2.2s |  |
| DSR-BREAD-017 | DSR-BREAD-017 localized HOME destinations (chromium) | pass | 2.2s |  |
| DSR-BREAD-017 | DSR-BREAD-017 localized HOME destinations (chromium) | pass | 2.3s |  |
| DSR-BREAD-025 | DSR-BREAD-025 BreadcrumbList structured data (chromium) | pass | 2.4s |  |
| DSR-BREAD-025 | DSR-BREAD-025 BreadcrumbList structured data (chromium) | pass | 2.2s |  |
| DSR-BREAD-027 | DSR-BREAD-027 semantic markup and accessibility (chromium) | pass | 3.8s |  |
| DSR-BREAD-028 | DSR-BREAD-028 keyboard navigation (chromium) | pass | 3.5s |  |
| DSR-BREAD-031 | DSR-BREAD-031 site-origin console errors (chromium) | pass | 2.5s |  |
| DSR-BREAD-035 | DSR-BREAD-035 arrow asset origin and status (chromium) | pass | 2.5s |  |
| DSR-BREAD-010 | DSR-BREAD-010 [en] display name overrides page title (chromium) | pass | 4.3s |  |
| DSR-BREAD-010 | DSR-BREAD-010 [ja] display name overrides page title (chromium) | pass | 4.6s |  |
| DSR-BREAD-014 | DSR-BREAD-014 [ja] 100-character display name keeps layout (chromium) | pass | 6.4s |  |
| DSR-BREAD-015 | DSR-BREAD-015 [ja] special characters in display name are plain text (chromium) | pass | 4.2s |  |
| DSR-BREAD-018 | DSR-BREAD-018 [en] each language uses its own display names (chromium) | pass | 2.3s |  |
| DSR-BREAD-018 | DSR-BREAD-018 [ja] each language uses its own display names (chromium) | pass | 2.3s |  |
| DSR-BREAD-020 | DSR-BREAD-020 PC breadcrumb baseline (chromium) | pass | 3.0s |  |
| DSR-BREAD-032 | DSR-BREAD-032 cross-browser baseline (chromium) | pass | 2.5s |  |
| DSR-BREAD-032 | DSR-BREAD-032 cross-browser baseline (firefox) | fail | 16.4s | Error: expect(locator).toHaveScreenshot(expected) failed |
| DSR-BREAD-032 | DSR-BREAD-032 cross-browser baseline (webkit) | fail | 0.0s | Error: browserType.launch:  |
| DSR-CATDL-014 | DSR-CATDL-014 [ja] capture catalog download form at 1440px (chromium) | pass | 2.8s |  |
| DSR-CATDL-015 | DSR-CATDL-015 [ja] capture catalog download form at 375px (chromium) | pass | 1.4s |  |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders (chromium) | pass | 1.5s |  |
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders (chromium) | pass | 1.6s |  |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present (chromium) | pass | 1.7s |  |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present (chromium) | pass | 1.6s |  |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly (chromium) | pass | 2.3s |  |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly (chromium) | pass | 2.1s |  |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form (chromium) | pass | 2.1s |  |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form (chromium) | pass | 2.3s |  |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form (chromium) | pass | 1.9s |  |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form (chromium) | pass | 2.1s |  |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) (chromium) | pass | 1.5s |  |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit (chromium) | fail | 8.0s | Error: gated PDF URL delivered to the browser before submit |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form (chromium) | pass | 2.4s |  |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) (chromium) | fail | 3.9s | Error: fixed texts containing Japanese |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (chromium) | fail | 13.6s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (chromium) | pass | 5.7s |  |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (chromium) | fail | 11.6s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (chromium) | pass | 3.8s |  |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (chromium) | fail | 12.0s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (chromium) | pass | 6.5s |  |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (chromium) | fail | 12.1s | Error: expect(locator).toHaveText(expected) failed |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (chromium) | pass | 3.8s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id (chromium) | pass | 0.5s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (chromium) | fail | 0.8s | Error: meta robots |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id (chromium) | pass | 0.5s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (chromium) | fail | 1.0s | Error: meta robots |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id (chromium) | pass | 0.5s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (chromium) | fail | 1.0s | Error: meta robots |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id (chromium) | pass | 0.7s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (chromium) | fail | 1.1s | Error: meta robots |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live (chromium) | pass | 0.1s |  |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live (chromium) | pass | 0.1s |  |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live (chromium) | pass | 0.1s |  |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live (chromium) | pass | 0.2s |  |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live (chromium) | pass | 0.1s |  |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live (chromium) | pass | 0.1s |  |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live (chromium) | pass | 0.1s |  |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live (chromium) | pass | 0.2s |  |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap (chromium) | pass | 0.1s |  |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap (chromium) | fail | 0.3s | Error: sitemap <loc> |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap (chromium) | pass | 0.1s |  |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap (chromium) | fail | 0.6s | Error: sitemap <loc> |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap (chromium) | pass | 0.1s |  |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap (chromium) | fail | 0.3s | Error: sitemap <loc> |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap (chromium) | pass | 0.1s |  |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap (chromium) | fail | 0.4s | Error: sitemap <loc> |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 (chromium) | pass | 0.1s |  |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 (chromium) | pass | 0.1s |  |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list (chromium) | pass | 4.0s |  |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list (chromium) | pass | 3.7s |  |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index (chromium) | pass | 0.1s |  |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay (chromium) | pass | 0.6s |  |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay (chromium) | pass | 0.9s |  |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site (chromium) | pass | 2.7s |  |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site (chromium) | pass | 1.6s |  |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page (chromium) | fail | 17.7s | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page (chromium) | fail | 13.6s | Error: card 'QA190 PDF catalog' |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly (chromium) | pass | 5.2s |  |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly (chromium) | pass | 5.3s |  |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed (chromium) | pass | 1.6s |  |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed (chromium) | pass | 2.2s |  |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form (chromium) | pass | 6.7s |  |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form (chromium) | pass | 6.8s |  |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type (chromium) | pass | 4.1s |  |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type (chromium) | pass | 3.9s |  |
| DSR-CATOV-009 | DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live (chromium) | fail | 0.5s | Error: 'QA654 preview' on .aem.page |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) (chromium) | fail | 0.4s | Error: qa654-folder/qa654-sub |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page (chromium) | pass | 0.1s |  |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list (chromium) | pass | 4.0s |  |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title (chromium) | pass | 3.3s |  |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title (chromium) | pass | 3.1s |  |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab (chromium) | pass | 6.6s |  |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab (chromium) | pass | 6.4s |  |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form (chromium) | pass | 4.3s |  |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form (chromium) | pass | 4.4s |  |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form (chromium) | pass | 2.3s |  |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form (chromium) | pass | 2.1s |  |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) (chromium) | pass | 1.7s |  |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) (chromium) | pass | 2.0s |  |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) (chromium) | pass | 1.5s |  |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) (chromium) | pass | 1.8s |  |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) (chromium) | pass | 2.7s |  |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) (chromium) | pass | 1.6s |  |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) (chromium) | pass | 1.8s |  |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) (chromium) | pass | 1.7s |  |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) (chromium) | pass | 1.6s |  |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) (chromium) | pass | 2.0s |  |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) (chromium) | pass | 2.0s |  |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) (chromium) | pass | 1.5s |  |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) (chromium) | pass | 1.7s |  |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) (chromium) | pass | 1.6s |  |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) (chromium) | pass | 2.1s |  |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) (chromium) | pass | 2.1s |  |
| DSR-ECO-001 | DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE (chromium) | pass | 2.9s |  |
| DSR-ECO-003 | DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last (chromium) | pass | 14.5s |  |
| DSR-ECO-005 | DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary (chromium) | fail | 26.5s | Error: tag label |
| DSR-ECO-006 | DSR-ECO-006 [ja] free editing area renders between hero and product list (chromium) | fail | 34.2s | Error: free area text |
| DSR-ECO-012 | DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files (chromium) | pass | 2.6s |  |
| DSR-ECO-013 | DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links (chromium) | pass | 2.6s |  |
| DSR-590 | DSR-590 capture [ja] eco-detail PC 1440 full page (chromium) | pass | 6.1s |  |
| DSR-590 | DSR-590 capture [ja] eco-top PC 1440 full page (chromium) | pass | 4.4s |  |
| DSR-590 | DSR-590 capture [ja] eco-detail SP 390 full page (chromium) | pass | 5.9s |  |
| DSR-590 | DSR-590 capture [ja] eco-top SP 390 full page (chromium) | pass | 4.2s |  |
| DSR-ECO-014 | DSR-ECO-014 [ja] stable PC initial, Next, dot 5 and fullPage captures (chromium) | pass | 9.4s |  |
| DSR-ECO-016 | DSR-ECO-016 [ja] stable SP initial and swipe captures (chromium) | pass | 7.4s |  |
| DSR-ECO-014 | DSR-ECO-014 [ja] PC carousel visual capture and measurements (chromium) | pass | 6.9s |  |
| DSR-ECO-016 | DSR-ECO-016 [ja] SP capture, horizontal overflow and carousel interaction facts (chromium) | pass | 7.5s |  |
| DSR-ICON-006 | DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error (chromium) | fail | 12.8s | Error: console errors |
| DSR-ICON-006 | DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error (chromium) | fail | 13.9s | Error: console errors |
| DSR-MAIL-016 | DSR-MAIL-016 [—] webhook GET without auth is refused (chromium) | pass | 1.3s |  |
| DSR-MAIL-017 | DSR-MAIL-017 [—] test-send GET without params or auth is not public (chromium) | pass | 1.2s |  |
| DSR-MOVIE-012 | DSR-MOVIE-012 [en] displays the exact movie title (chromium) | pass | 2.6s |  |
| DSR-MOVIE-014 | DSR-MOVIE-014 [en] embeds the configured YouTube movie (chromium) | fail | 15.1s | Error: expect(locator).toBeVisible() failed |
| DSR-MOVIE-036 | DSR-MOVIE-036 no site-origin console errors on the movie component page (chromium) | pass | 3.5s |  |
| DSR-MOVIE-026 | DSR-MOVIE-026 displays related thumbnails, types, tags and valid links (chromium) | fail | 27.6s | Error: Related card 1 thumbnail |
| DSR-MOVIE-027 | DSR-MOVIE-027 [en] outputs exactly one title and og:title (chromium) | pass | 2.6s |  |
| DSR-MOVIE-029 | DSR-MOVIE-029 outputs an absolute reachable CF thumbnail (chromium) | pass | 2.5s |  |
| DSR-MOVIE-033 | DSR-MOVIE-033 displays component sections in vertical order on PC (chromium) | fail | 17.6s | Error: expect(locator).toBeVisible() failed |
| DSR-MOVIE-034 | DSR-MOVIE-034 displays the component back control (chromium) | pass | 4.3s |  |
| DSR-501-P3 | DSR-501-P3 [en] related movies are limited to 5 in authored order (chromium) | fail | 20.5s | Error: expect(locator).toBeVisible() failed |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed (chromium) | fail | 20.0s | Error: expect(locator).toBeVisible() failed |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays (chromium) | pass | 1.3s |  |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays (chromium) | pass | 1.8s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests (chromium) | pass | 2.7s |  |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests (chromium) | pass | 3.1s |  |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) (chromium) | pass | 2.0s |  |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) (chromium) | pass | 2.5s |  |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only (chromium) | pass | 2.6s |  |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked (chromium) | pass | 1.1s |  |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden (chromium) | pass | 2.0s |  |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title (chromium) | pass | 0.7s |  |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title (chromium) | pass | 1.1s |  |
| DSR-501-P3 | DSR-501-P3 [en] related movies are max 5, newest updated first (chromium) | pass | 3.3s |  |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed (chromium) | pass | 4.5s |  |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 (chromium) | pass | 1.9s |  |
| DSR-538-retest | DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 (chromium) | pass | 2.0s |  |
| DSR-NEWS-014 | DSR-NEWS-014 [ja] capture news layout at 1440x900 (chromium) | fail | 61.4s | Test timeout of 30000ms exceeded. |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook (chromium) | pass | 0.4s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub (chromium) | pass | 0.2s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive (chromium) | pass | 0.2s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form (chromium) | pass | 0.4s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form (chromium) | pass | 0.3s |  |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a (chromium) | pass | 0.4s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 (chromium) | pass | 0.5s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 (chromium) | pass | 0.5s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a (chromium) | pass | 0.4s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b (chromium) | pass | 0.5s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a (chromium) | pass | 0.8s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off (chromium) | pass | 0.2s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 (chromium) | pass | 0.5s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 (chromium) | pass | 0.4s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam (chromium) | pass | 0.3s |  |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main (chromium) | pass | 0.5s |  |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) (chromium) | pass | 0.7s |  |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) (chromium) | pass | 0.8s |  |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) (chromium) | pass | 1.2s |  |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) (chromium) | pass | 1.1s |  |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) (chromium) | pass | 0.9s |  |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) (chromium) | pass | 1.0s |  |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) (chromium) | pass | 0.0s |  |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) (chromium) | pass | 0.0s |  |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) (chromium) | pass | 1.0s |  |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) (chromium) | pass | 0.6s |  |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) (chromium) | pass | 0.6s |  |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) (chromium) | pass | 0.3s |  |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only (chromium) | pass | 0.8s |  |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only (chromium) | pass | 1.0s |  |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs (chromium) | pass | 2.1s |  |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs (chromium) | pass | 3.1s |  |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head (chromium) | pass | 0.9s |  |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head (chromium) | pass | 1.1s |  |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser (chromium) | pass | 4.8s |  |
| DSR-PDO-005 | DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages (chromium) | pass | 3.3s |  |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list (chromium) | pass | 7.2s |  |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex (chromium) | pass | 7.0s |  |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent (chromium) | pass | 0.1s |  |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) (chromium) | pass | 4.2s |  |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) (chromium) | pass | 3.9s |  |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present (chromium) | pass | 2.3s |  |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present (chromium) | pass | 2.7s |  |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent (chromium) | pass | 2.7s |  |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images (chromium) | pass | 5.0s |  |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page (chromium) | pass | 2.9s |  |
| DSR-PLSP-001 | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll (chromium) | pass | 4.6s |  |
| DSR-PLSP-001 | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll (chromium) | pass | 4.0s |  |
| DSR-PLSP-002 | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width (chromium) | fail | 41.8s | Error: 320: cards overflowing their column |
| DSR-PLSP-002 | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width (chromium) | fail | 39.9s | Error: 320: cards overflowing their column |
| DSR-PLSP-003 | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload (chromium) | fail | 62.7s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-003 | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload (chromium) | fail | 61.6s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned (chromium) | fail | 61.2s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned (chromium) | fail | 61.6s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) (chromium) | pass | 14.6s |  |
| DSR-PLSP-004 | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) (chromium) | pass | 10.2s |  |
| DSR-PRODLIST-001 | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll (chromium) | fail | 8.3s | Error: 375: distinct column offsets |
| DSR-PRODLIST-002 | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll (chromium) | fail | 23.4s | Error: 320: distinct column offsets |
| DSR-PRODLIST-003 | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads (chromium) | fail | 15.3s | Error: open: distinct column offsets |
| DSR-PRODLIST-004 | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 (chromium) | fail | 19.6s | Error: 1440: distinct column offsets |
| SMOKE-001 | SMOKE-001 DSR-173 test page is reachable (chromium) | pass | 0.8s |  |
| DSR-TOP-001 | DSR-TOP-001 [en] PC full-page capture and horizontal overflow (chromium) | pass | 8.8s |  |
| DSR-TOP-001 | DSR-TOP-001 [en] SP full-page capture and horizontal overflow (chromium) | pass | 8.4s |  |
| DSR-TOP-001 | DSR-TOP-001 [ja] PC full-page capture and horizontal overflow (chromium) | pass | 8.8s |  |
| DSR-TOP-001 | DSR-TOP-001 [ja] SP full-page capture and horizontal overflow (chromium) | pass | 7.9s |  |
| DSR-TOP-004 | DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search (chromium) | fail | 7.3s | Error: text/background colour changes on hover |
| DSR-TOP-004 | DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search (chromium) | fail | 8.8s | Error: text/background colour changes on hover |
| DSR-TOP-005 | DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (chromium) | fail | 9.5s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) |
| DSR-TOP-005 | DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (chromium) | fail | 8.8s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) |
| DSR-TOP-006 | DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date (chromium) | fail | 11.3s | Error: page requests /en/news/query-index.json |
| DSR-TOP-006 | DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date (chromium) | fail | 8.3s | Error: page requests /ja/news/query-index.json |
| DSR-TOP-007 | DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (chromium) | fail | 7.2s | Error: SP item 1 title lines ≤ 1 |
| DSR-TOP-007 | DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (chromium) | fail | 7.9s | Error: SP item 1 title lines ≤ 1 |
| DSR-TOP-008 | DSR-TOP-008 [en] NEWS with empty query-index renders without error (chromium) | pass | 3.9s |  |
| DSR-TOP-008 | DSR-TOP-008 [ja] NEWS with empty query-index renders without error (chromium) | pass | 3.6s |  |
| DSR-TOP-009 | DSR-TOP-009 [en] main visual image is eager and is the LCP element (chromium) | pass | 4.3s |  |
| DSR-TOP-009 | DSR-TOP-009 [ja] main visual image is eager and is the LCP element (chromium) | pass | 4.5s |  |
| DSR-VCAP-001 | DSR-VCAP-001 [en] live: authored video block with empty caption shows no "null" text (chromium) | pass | 4.9s |  |
| DSR-VCAP-001 | DSR-VCAP-001 [en] page: authored video block with empty caption shows no "null" text (chromium) | pass | 4.7s |  |
| DSR-VCAP-002 | DSR-VCAP-002 [en] page: booth TOP code-built video block shows no "null" text (chromium) | pass | 1.4s |  |
| DSR-VCAP-003 | DSR-VCAP-003 [en] live: video detail player area shows no "null" text (control) (chromium) | pass | 1.3s |  |
| DSR-VCAP-003 | DSR-VCAP-003 [en] page: video detail player area shows no "null" text (control) (chromium) | pass | 1.4s |  |
| DSR-VCAP-004 | DSR-VCAP-004 [en] page: product detail shows no "null" text (control) (chromium) | pass | 1.0s |  |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-011 (DSR-ARTICLE-011 [en] listing card images of qa529 articles a) | Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-ARTICLE-011 (DSR-ARTICLE-011 [ja] listing card images of qa529 articles a) | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-026 (DSR-ARTICLE-026 [en] stories query-index contains qa529-01 w) | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 (DSR-ARTICLE-026 [ja] stories query-index contains qa529-01 w) | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-001 (DSR-ARTICLE-001 [ja] page creation with article template (Au) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-004 (DSR-ARTICLE-004 [ja] article-specific info not editable in b) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-005 (DSR-ARTICLE-005 [ja] author-editable areas 4/5/6/9/11 (Autho) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-021 (DSR-ARTICLE-021 [ja] related stories picker max 3, stories o) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-032 (DSR-ARTICLE-032 [ja] required page properties validation (Au) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-030 (DSR-ARTICLE-030 [ja] visual PC 1440 vs Figma (chromium)) | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-031 (DSR-ARTICLE-031 [ja] visual SP 390 vs Figma (chromium)) | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-017 (DSR-ARTICLE-017 [ja] related stories cards r1..r3 (block 12)) | Blocked: Stories index not on DEV yet – Martin prereq #1 (helix-query.yaml) / Q7 |
| DSR-ARTICLE-018 (DSR-ARTICLE-018 [ja] related stories NEW icon on r1 only (ch) | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; NEW period Q6 |
| DSR-ARTICLE-019 (DSR-ARTICLE-019 [ja] related stories max 3, missing path ski) | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; TD-529-04 not seeded |
| DSR-ARTICLE-022 (DSR-ARTICLE-022 [ja] related items cards from product index ) | Blocked: 製品index relatedArticles/sortOrder not defined – 製品詳細 ticket (Martin prereq #3) |
| DSR-ARTICLE-027 (DSR-ARTICLE-027 [ja] published article appears in article li) | Blocked: Article list DSR-170 (out of scope) + stories index |
| DSR-ARTICLE-029 (DSR-ARTICLE-029 [cn] language page (cn) (chromium)) | Blocked: no /master/cn on DEV (Issue #18) – all cn rows |
| DSR-ASSET-003 (DSR-ASSET-003 [en] migrated asset paths after the DAM root u) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-003 (DSR-ASSET-003 [ja] migrated asset paths after the DAM root u) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 (DSR-ASSET-009 [en] product page images load from the new DAM) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 (DSR-ASSET-009 [ja] product page images load from the new DAM) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 (DSR-ASSET-010 [en] product PDFs open from the new DAM (200, ) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 (DSR-ASSET-010 [ja] product PDFs open from the new DAM (200, ) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 (DSR-ASSET-012 [en] main image: SP (375, DPR 2) rendition sma) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 (DSR-ASSET-012 [ja] main image: SP (375, DPR 2) rendition sma) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 (DSR-ASSET-013 [en] .webp-source image displays in Chromium a) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 (DSR-ASSET-013 [ja] .webp-source image displays in Chromium a) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 (DSR-ASSET-014 [en] migrated assets are reachable without log) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 (DSR-ASSET-014 [ja] migrated assets are reachable without log) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 (DSR-ASSET-015 [en] migrated content images keep a non-empty ) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 (DSR-ASSET-015 [ja] migrated content images keep a non-empty ) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-017 (DSR-ASSET-017 [ja+en] same product uses the same DAM image p) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-BREAD-001 (DSR-BREAD-001 child trail and placement (chromium)) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 (DSR-BREAD-005 grandchild trail order (chromium)) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 (DSR-BREAD-008 HOME excludes breadcrumb (chromium)) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 (DSR-BREAD-017 localized HOME destinations (chromium)) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 (DSR-BREAD-025 BreadcrumbList structured data (chromium)) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-018 (DSR-BREAD-018 [cn] each language uses its own display names ) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-019 (DSR-BREAD-019 Japanese and Chinese fonts (chromium)) | DSR-555 + cn |
| DSR-BREAD-021 (DSR-BREAD-021 SP breadcrumb and back control (chromium)) | DSR-575 Q5 (SP display) |
| DSR-BREAD-022 (DSR-BREAD-022 SP parent navigation (chromium)) | DSR-575 Q5 (SP display) |
| DSR-BREAD-023 (DSR-BREAD-023 narrow SP overflow (chromium)) | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 (DSR-BREAD-029 STG Lighthouse performance (chromium)) | Run on STG (Lighthouse) |
| DSR-BREAD-030 (DSR-BREAD-030 movie breadcrumb regression (chromium)) | DSR-536 / movie-detail placement |
| DSR-BREAD-033 (DSR-BREAD-033 all page types (chromium)) | Layout tickets |
| DSR-BREAD-034 (DSR-BREAD-034 responsive movie back control (chromium)) | DSR-536 / movie-detail placement |
| DSR-CATDL-017 (DSR-CATDL-017 [ja] unknown or missing catalog ID never shows) | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 (DSR-CATDL-016 [cn] fixed texts translated (Chinese) (chromiu) | cn: no /master/cn (Issue #18) |
| DSR-CATOV-006 (DSR-CATOV-006 [ja] unpublished DSR CF → 404 on both hosts, r) | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 (DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per D) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 (DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per D) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-020 (DSR-CATOV-020 [en] layout PC 1440 / SP 375 vs pre-overlay de) | Visual – codex job |
| DSR-CATOV-020 (DSR-CATOV-020 [ja] layout PC 1440 / SP 375 vs pre-overlay de) | Visual – codex job |
| DSR-CATOV-013 (DSR-CATOV-013 [en] content CF change shows only after DSR CF) | Manual – QA-PT |
| DSR-CATOV-001 (DSR-CATOV-001 [cn] catalog overlay pages (chromium)) | Issue #18: no /cn path on DEV |
| DSR-CATV-018 (DSR-CATV-018 NEW label within 10 days of publishDate (chromi) | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (ja) |
| DSR-CATV-018 (DSR-CATV-018 NEW label within 10 days of publishDate (chromi) | Blocked – no DEV data for QA190 NEW 0, QA190 NEW 10, QA190 NEW 11 (en) |
| DSR-CATV-019 (DSR-CATV-019 UPDATE label within 10 days of updateDate (chro) | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (ja) |
| DSR-CATV-019 (DSR-CATV-019 UPDATE label within 10 days of updateDate (chro) | Blocked – no DEV data for QA190 UPD 0, QA190 UPD 10, QA190 UPD 11 (en) |
| DSR-CATV-020 (DSR-CATV-020 only NEW when publishDate and updateDate both a) | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (ja) |
| DSR-CATV-020 (DSR-CATV-020 only NEW when publishDate and updateDate both a) | Blocked – no DEV data for QA190 BOTH, qa190-cat-noupd (en) |
| DSR-ECO-001 (DSR-ECO-001 [en] TOP shows one card per category with image,) | en demo page not on DEV |
| DSR-ECO-002 (DSR-ECO-002 [en] each category card VIEW MORE links to its T) | en demo page not on DEV |
| DSR-ECO-002 (DSR-ECO-002 [ja] each category card VIEW MORE links to its T) | demo data (Ngọc 21/10) |
| DSR-ECO-004 (DSR-ECO-004 [en] 環境配慮型製品診断 button links to the product finde) | en demo page not on DEV |
| DSR-ECO-004 (DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finde) | demo data (Ngọc 21/10) |
| DSR-ECO-005 (DSR-ECO-005 [en] detail hero shows tag, background image, ca) | DSR-590 page not on DEV |
| DSR-ECO-007 (DSR-ECO-007 [en] detail product list equals the query-index ) | DSR-590 page not on DEV |
| DSR-ECO-007 (DSR-ECO-007 [ja] detail product list equals the query-index ) | demo data (Ngọc 21/10) |
| DSR-ECO-010 (DSR-ECO-010 [en] detail product cards link to /en/products/{) | DSR-590 page not on DEV |
| DSR-ECO-010 (DSR-ECO-010 [ja] detail product cards link to /ja/products/{) | demo data (Ngọc 21/10) |
| DSR-ECO-009 (DSR-ECO-009 [ja] detail with 0 matching products shows no br) | demo data (Ngọc 21/10) |
| DSR-ECO-013 (DSR-ECO-013 [en] TOP exists with html lang, names in its lan) | en demo page not on DEV |
| DSR-ECO-013 (DSR-ECO-013 [cn] TOP and detail exist with html lang and lan) | cn: no /master/cn on DEV (Issue #18) |
| DSR-ICON-001 (DSR-ICON-001 [en] product detail performance/function icons ) | Blocked: TD-589-04 official icon list |
| DSR-ICON-001 (DSR-ICON-001 [ja] product detail performance/function icons ) | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 (DSR-ICON-002 [en] product list card icons all match the offi) | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 (DSR-ICON-002 [ja] product list card icons all match the offi) | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 (DSR-ICON-003 [en] condition search option and result icons a) | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 (DSR-ICON-003 [ja] condition search option and result icons a) | Blocked: TD-589-04 official icon list |
| DSR-ICON-005 (DSR-ICON-005 [ja] same function uses the same asset on detai) | Blocked: TD-589-04 official icon list |
| DSR-ICON-007 (DSR-ICON-007 [ja] product without function values shows no i) | blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 (DSR-ICON-008 [ja] maximum number of icons wraps on SP withou) | blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 (DSR-ICON-009 [en] language versions show the same ordered ic) | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 (DSR-ICON-009 [ja] language versions show the same ordered ic) | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-004 (DSR-ICON-004 [en] no temporary icon (TD-589-06) remains on t) | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-004 (DSR-ICON-004 [ja] no temporary icon (TD-589-06) remains on t) | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-MOVIE-020 (DSR-MOVIE-020 displays visible related product codes in orde) | Issue #1: related products specification pending |
| DSR-MOVIE-021 (DSR-MOVIE-021 sorts related content by update date descendin) | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023 (DSR-MOVIE-023 excludes unavailable and inactive related movi) | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025 (DSR-MOVIE-025 navigates the related content carousel to its ) | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 (DSR-MOVIE-028 removes line breaks from description metadata ) | Description line-break separator is unconfirmed |
| DSR-MOVIE-001 (DSR-MOVIE-001 B: page auto-generation not implemented (chrom) | B: page auto-generation not implemented |
| DSR-MOVIE-002 (DSR-MOVIE-002 B: page auto-generation not implemented (chrom) | B: page auto-generation not implemented |
| DSR-MOVIE-003 (DSR-MOVIE-003 B: page auto-generation not implemented (chrom) | B: page auto-generation not implemented |
| DSR-MOVIE-004 (DSR-MOVIE-004 M: Universal Editor requires IMS login; manual) | M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005 (DSR-MOVIE-005 B: page auto-generation not implemented (chrom) | B: page auto-generation not implemented |
| DSR-MOVIE-006 (DSR-MOVIE-006 B: URL structure not implemented, DSR-536 (chr) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007 (DSR-MOVIE-007 B: URL structure not implemented, DSR-536 (chr) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008 (DSR-MOVIE-008 B: URL structure not implemented, DSR-536 (chr) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009 (DSR-MOVIE-009 B: URL structure not implemented, DSR-536 (chr) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010 (DSR-MOVIE-010 B: URL structure not implemented, DSR-536 (chr) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011 (DSR-MOVIE-011 B: page auto-generation not implemented (chrom) | B: page auto-generation not implemented |
| DSR-MOVIE-013 (DSR-MOVIE-013 C: overflow automation deferred; CJK font manu) | C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015 (DSR-MOVIE-015 C: iframe source automation deferred; playback) | C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016 (DSR-MOVIE-016 B: movie-detail-player-video not implemented, ) | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017 (DSR-MOVIE-017 B: movie-detail-player-video not implemented, ) | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018 (DSR-MOVIE-018 B: test data pending (docs/DSR-173/test-data.m) | B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019 (DSR-MOVIE-019 C: layout automation deferred; in-iframe error) | C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022 (DSR-MOVIE-022 B: test data pending (docs/DSR-173/test-data.m) | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024 (DSR-MOVIE-024 B: test data pending (docs/DSR-173/test-data.m) | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030 (DSR-MOVIE-030 M: SNS debuggers need login and public URL; ma) | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 (DSR-MOVIE-031 B: page auto-generation not implemented (chrom) | B: page auto-generation not implemented |
| DSR-MOVIE-032 (DSR-MOVIE-032 B: ja/zh pages not available (chromium)) | B: ja/zh pages not available |
| DSR-MOVIE-035 (DSR-MOVIE-035 B: SP design pending (chromium)) | B: SP design pending |
| DSR-VOV-002 (DSR-VOV-002 [en] preview-only CF related → 200 on .aem.page,) | TD-587-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-preview HTTP 404) |
| DSR-VOV-004 (DSR-VOV-004 [en] CF related name with uppercase / underscore) | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 (DSR-VOV-005 [en] CF related in subfolder / outside /content/) | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 (DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .ae) | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-007 (DSR-VOV-007 [en] isActive = false → noindex, browser sent to) | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-007 (DSR-VOV-007 [ja] isActive = false → noindex, browser sent to) | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-008 (DSR-VOV-008 [en] CF commune unpublished → single unavailable) | TD-587-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-unavail HTTP 404) |
| DSR-VOV-009 (DSR-VOV-009 [en] CF commune edit shows only after CF related) | Manual TC: Author edit + publish of CF commune / CF related; agents are read-only (A6) – QA-PT |
| DSR-VOV-010 (DSR-VOV-010 [en] unpublished CF related → 404 on both hosts,) | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 (DSR-VOV-011 [en] video/tech-talk stays a list page (chromium) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 (DSR-VOV-011 [ja] video/tech-talk stays a list page (chromium) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 (DSR-VOV-011 [cn] list pages (chromium)) | Issue #18: no /cn path on DEV |
| DSR-VOV-016 (DSR-VOV-016 [en] related contents ordered by update date, ne) | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 (DSR-VOV-017 [en] DSR-173 Group A page switched to the overla) | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-VOV-018 (DSR-VOV-018 [cn] language variant (chromium)) | Issue #18: no /cn path on DEV |
| DSR-538-retest (DSR-538-retest [en] qa587-main (.aem.live) related card href) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [en] qa587-main (.aem.page) related card href) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [ja] qa587-main (.aem.live) related card href) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest (DSR-538-retest [ja] qa587-main (.aem.page) related card href) | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-NEWS-001 (DSR-NEWS-001 [en] page shows date, category, title and body ) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-001 (DSR-NEWS-001 [ja] page shows date, category, title and body ) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-002 (DSR-NEWS-002 [en] fixed order meta → title → news type → spa) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-002 (DSR-NEWS-002 [ja] fixed order meta → title → news type → spa) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-003 (DSR-NEWS-003 [en] shown date equals meta publish date (chrom) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-003 (DSR-NEWS-003 [ja] shown date equals meta publish date (chrom) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-004 (DSR-NEWS-004 [en] category and title are non-empty text (chr) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-004 (DSR-NEWS-004 [ja] category and title are non-empty text (chr) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-006 (DSR-NEWS-006 [en] Back to list href resolves to /en/news/ (c) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-006 (DSR-NEWS-006 [ja] Back to list href resolves to /ja/news/ (c) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-007 (DSR-NEWS-007 [en] page row in query-index with publishDate/c) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-007 (DSR-NEWS-007 [ja] page row in query-index with publishDate/c) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-008 (DSR-NEWS-008 [en] page appears on the news list with title a) | TC 8.0 is ja only |
| DSR-NEWS-008 (DSR-NEWS-008 [ja] page appears on the news list with title a) | Blocked – page under test is not under /ja/news/ (needs TD-566-03) |
| DSR-NEWS-009 (DSR-NEWS-009 [en] no related-content block (chromium)) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-009 (DSR-NEWS-009 [ja] no related-content block (chromium)) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-010 (DSR-NEWS-010 [en] CTA (Button8) href equals authored URL (ch) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-010 (DSR-NEWS-010 [ja] CTA (Button8) href equals authored URL (ch) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-012 (DSR-NEWS-012 [en] My List button and share icons visible and) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-012 (DSR-NEWS-012 [ja] My List button and share icons visible and) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-013 (DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when pr) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-013 (DSR-NEWS-013 [ja] body keeps h2/h3, strong, ul/ol, a when pr) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-018 (DSR-NEWS-018 [en] title, description and og tags non-empty () | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-018 (DSR-NEWS-018 [ja] title, description and og tags non-empty () | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-015 (DSR-NEWS-015 [ja] capture news layout at 390x844 (chromium)) | (no reason given: serial test not run after earlier failure) |
| DSR-CATOV-002 (DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/q) | preview-only CF: not on .aem.live (HTTP 404 = expected) |
| DSR-VOV-007 (DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable ) | page not seeded on .aem.live (HTTP 404) |
| DSR-VOV-007 (DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable ) | page not seeded on .aem.page (HTTP 404) |
| DSR-VOV-007 (DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable ) | page not seeded on .aem.live (HTTP 404) |
| DSR-VOV-007 (DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable ) | page not seeded on .aem.page (HTTP 404) |
| DSR-PCF-001 (DSR-PCF-001 [ja] DM_product field set matches ver0.4 (10 tab) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 (DSR-PCF-002 [ja] removed fields and old spellings not shown ) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 (DSR-PCF-003 [ja] field types match fix list (chromium)) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 (DSR-PCF-004 [ja] required fields enforced on save (negative)) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 (DSR-PCF-005 [ja] single-line text accepts 255 characters (bo) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 (DSR-PCF-006 [ja] zipperChainTypeCategories tag picker stores) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 (DSR-PCF-008 [ja] data entry template columns match the model) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 (DSR-PCF-009 [ja] bulk import with revised template (chromium) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 (DSR-PCF-010 [ja] bulk import rejects row missing a required ) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 (DSR-PCF-011 [ja] pre-change product CF opens and keeps retai) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 (DSR-PCF-012 [ja] ja / en / cn folders use the same model (ch) | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 (DSR-PCF-013 [en] published TD-585-01 returns ver0.4 fields v) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 (DSR-PCF-013 [ja] published TD-585-01 returns ver0.4 fields v) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 (DSR-PCF-014 [ja] product search JSON entry has search keys a) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 (DSR-PCF-015 [ja] product detail of TD-585-01 renders without) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 (DSR-PCF-018 [en] product CF name = numeric productId in cont) | Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 (DSR-PCF-018 [ja] product CF name = numeric productId in cont) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-002 (DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page,) | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-006 (DSR-PDO-006 [ja] CF related in subfolder → no page (404) (ch) | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 (DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .ae) | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 (DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts,) | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-014 (DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issu) | (no reason given: serial test not run after earlier failure) |
| DSR-PDO-020 (DSR-PDO-020 [ja] ver0.4 new fields – current state recorded ) | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |
| DSR-PRODLIST-003 (DSR-PRODLIST-003 [en] SP column count stays 2 after scroll, ) | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 (DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1)) | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 (DSR-PRODLIST-006 [en] SP card layout vs Figma 375 frame (vis) | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 (DSR-PRODLIST-006 [ja] SP card layout vs Figma 375 frame (vis) | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 (DSR-PRODLIST-007 [ja] Real device iOS Safari / Android Chrom) | Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |
| DSR-VCAP-002 (DSR-VCAP-002 [en] live: booth TOP code-built video block sho) | live /en/product/application/fashion/fashion returns 404 (not published on this host) |
| DSR-VCAP-004 (DSR-VCAP-004 [en] live: product detail shows no "null" text ) | live /en/products/46 returns 404 (not published on this host) |

## 6. Failed tests

Evidence paths are under `test-results/` (gitignored, not committed). Copies for the two new fails are in `ykk-dsr/hub/results/JOB-ZZ-IDLE-39/evidence/`.

### DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:181`
- Expected vs actual (verbatim, truncated):

```text
Error: category meta count

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

- Evidence: `test-results/article-detail-DSR-529.art-3ce31-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-3ce31-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:181`
- Expected vs actual (verbatim, truncated):

```text
Error: category meta count

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

- Evidence: `test-results/article-detail-DSR-529.art-8b907-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-8b907-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:211`
- Expected vs actual (verbatim, truncated):

```text
Error: category count

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

- Evidence: `test-results/article-detail-DSR-529.art-856a2-gory-exactly-once-non-empty-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-856a2-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:211`
- Expected vs actual (verbatim, truncated):

```text
Error: category count

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

- Evidence: `test-results/article-detail-DSR-529.art-00408-gory-exactly-once-non-empty-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-00408-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:225`
- Expected vs actual (verbatim, truncated):

```text
Error: qa529-01 robots

expect(received).not.toMatch(expected)

Expected pattern: not /noindex/i
Received string:      "noindex, nofollow"
```

- Evidence: `test-results/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:233`
- Expected vs actual (verbatim, truncated):

```text
Error: qa529-02 robots

expect(received).toMatch(expected)

Expected pattern: /noindex/i
Received string:  ""
```

- Evidence: `test-results/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:244`
- Expected vs actual (verbatim, truncated):

```text
Error: viewAllStories href

expect(received).not.toMatch(expected)

Expected pattern: not /^(#?)$/
Received string:      "#"
```

- Evidence: `test-results/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:244`
- Expected vs actual (verbatim, truncated):

```text
Error: viewAllStories href

expect(received).not.toMatch(expected)

Expected pattern: not /^(#?)$/
Received string:      "#"
```

- Evidence: `test-results/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) (chromium)

- Failing assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:332`
- Expected vs actual (verbatim, truncated):

```text
Error: visible related items block

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 6

- Array []
+ Array [
+   Object {
+     "height": 281.984375,
+     "visible": true,
+   },
+ ]
```

- Evidence: `test-results/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium-retry1/test-failed-1.png`

### DSR-BREAD-032 cross-browser baseline (firefox)

- Failing assertion: `tests/breadcrumb/DSR-552.breadcrumb.spec.ts:255`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') })
  865 pixels (ratio 0.02 of all image pixels) are different.

  Snapshot: DSR-BREAD-32_ja-chromium.png

Call log:
  - Expect "toHaveScreenshot(DSR-BREAD-32_ja-chromium.png)" locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') }) with timeout 5000ms
    - verifying given screenshot expectation
  - waiting for locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') })
```

- Evidence: `test-results/breadcrumb-DSR-552.breadcr-02fb2--032-cross-browser-baseline-firefox/test-failed-1.png`, `test-results/breadcrumb-DSR-552.breadcr-02fb2--032-cross-browser-baseline-firefox-retry1/test-failed-1.png`

### DSR-BREAD-032 cross-browser baseline (webkit)

- Failing assertion: `breadcrumb/DSR-552.breadcrumb.spec.ts`
- Expected vs actual (verbatim, truncated):

```text
Error: browserType.launch: 
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Missing libraries:                                   ║
║     libgtk-4.so.1                                    ║
║     libgraphene-1.0.so.0                             ║
║     libevent-2.1.so.7                                ║
║     libgstgl-1.0.so.0                                ║
║     libgstcodecparsers-1.0.so.0                      ║
║     libflite.so.1                                    ║
║     libflite_usenglish.so.1                          ║
║
```

- Evidence: none (API/request-level test, no screenshot)

### DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit (chromium)

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Expected vs actual (verbatim, truncated):

```text
Error: gated PDF URL delivered to the browser before submit

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "dsr-catalog-list response: item qa190-cat-pdf-form (requiresForm=true) pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/pdf/sample-pdf-a4-size-65kb.pdf",
+ ]
```

- Evidence: `test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png`, `test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png`

### DSR-CATDL-016 [en] fixed texts translated (no Japanese) (chromium)

- Failing assertion: `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Expected vs actual (verbatim, truncated):

```text
Error: fixed texts containing Japanese

expect(received).toEqual(expected) // deep equality

- Expected  -  1
+ Received  + 44

- Array []
+ Array [
+   "必須
+ 氏名（姓）",
+   "必須
+ 氏名（名）",
+   "必須
+ メールアドレス",
+   "必須
+ 電話番号",
+   "必須
+ 会社名",
+   "任意
+ 部署名",
+   "必須
+ 役職",
+   "必須
+ 職種",
+   "デザイナー",
+   "購買/調達",
+   "営業/マーケティング",
+   "製造/エンジニアリング",
+   "その他",
+   "必須
+ 勤務地",
+   "必須
+ あなたの担当分野は？",
+   "必須
+ 利用規約への同意",
+   "YKK株式会社からの連絡を許可します。",
+   "YKK株式会社が私の個人情報を保存して処理することを許可することに同意します。",
+   "必須
+ 利用規約への同意
+
+ YKK株式会社は、お客様のプライバシーを尊重して保護するために最大限の努力を投じています。お客様の個人情報は、お客様のアカウントの管理、およびお客様が要求した製品やサービ
```

- Evidence: `test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium/test-failed-1.png`, `test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium-retry1/test-failed-1.png`

### DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:139`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 e-book form"
Received: "catalog ebook form"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
    7 × locator resolved to <h2 class="catalog-detail-title">catalog ebook form</h2>
      - unexpected value "catalog ebook form"
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`

### DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:139`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 PDF form required"
Received: "catalog pdf form"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
    8 × locator resolved to <h2 class="catalog-detail-title">catalog pdf form</h2>
      - unexpected value "catalog pdf form"
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`

### DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:139`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 e-book form"
Received: "catalog ebook form"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
    12 × locator resolved to <h2 class="catalog-detail-title">catalog ebook form</h2>
       - unexpected value "catalog ebook form"
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`

### DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:139`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toHaveText(expected) failed

Locator:  locator('main .catalog-detail').locator('.catalog-detail-title')
Expected: "QA190 PDF form required"
Received: "catalog pdf form"
Timeout:  5000ms

Call log:
  - Expect "toHaveText" locator('main .catalog-detail').locator('.catalog-detail-title') with timeout 5000ms
  - waiting for locator('main .catalog-detail').locator('.catalog-detail-title')
    11 × locator resolved to <h2 class="catalog-detail-title">catalog pdf form</h2>
       - unexpected value "catalog pdf form"
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png`

### DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:157`
- Expected vs actual (verbatim, truncated):

```text
Error: meta robots

expect(received).not.toContain(expected) // indexOf

Expected substring: not "noindex"
Received string:        "noindex"
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-65f33-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:157`
- Expected vs actual (verbatim, truncated):

```text
Error: meta robots

expect(received).not.toContain(expected) // indexOf

Expected substring: not "noindex"
Received string:        "noindex"
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-42b16-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:157`
- Expected vs actual (verbatim, truncated):

```text
Error: meta robots

expect(received).not.toContain(expected) // indexOf

Expected substring: not "noindex"
Received string:        "noindex"
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-a755e-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:157`
- Expected vs actual (verbatim, truncated):

```text
Error: meta robots

expect(received).not.toContain(expected) // indexOf

Expected substring: not "noindex"
Received string:        "noindex"
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-53eff-nt-CF-rows-with-the-same-id-chromium-retry1/test-failed-1.png`

### DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:201`
- Expected vs actual (verbatim, truncated):

```text
Error: sitemap <loc>

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

- Evidence: none (API/request-level test, no screenshot)

### DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:201`
- Expected vs actual (verbatim, truncated):

```text
Error: sitemap <loc>

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

- Evidence: none (API/request-level test, no screenshot)

### DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:201`
- Expected vs actual (verbatim, truncated):

```text
Error: sitemap <loc>

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

- Evidence: none (API/request-level test, no screenshot)

### DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:201`
- Expected vs actual (verbatim, truncated):

```text
Error: sitemap <loc>

expect(received).toHaveLength(expected)

Expected length: 1
Received length: 0
Received array:  []
```

- Evidence: none (API/request-level test, no screenshot)

### DSR-CATOV-012 [en] catalog list card links to the overlay page (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:264`
- Expected vs actual (verbatim, truncated):

```text
Error: card 'QA190 PDF catalog'

expect(locator).toBeVisible() failed

Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - card 'QA190 PDF catalog' locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() with timeout 5000ms
  - waiting for locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first()
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png`

### DSR-CATOV-012 [ja] catalog list card links to the overlay page (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:264`
- Expected vs actual (verbatim, truncated):

```text
Error: card 'QA190 PDF catalog'

expect(locator).toBeVisible() failed

Locator: locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first()
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - card 'QA190 PDF catalog' locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first() with timeout 5000ms
  - waiting for locator('main a[href]').filter({ hasText: 'QA190 PDF catalog' }).first()
```

- Evidence: `test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png`

### DSR-CATOV-009 [en] DSR CF published to Preview only → served on .aem.page, not on .aem.live (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:347`
- Expected vs actual (verbatim, truncated):

```text
Error: 'QA654 preview' on .aem.page

expect(received).toContain(expected) // indexOf

Expected substring: "QA654 preview"
Received string:    "<!DOCTYPE html>
<html>
  <head>
    <title>YKK DIGITAL SHOWROOM</title>
    <link rel=\"canonical\" href=\"https://dev-eds.ykkdigitalshowroom.com/en/library/catalog/qa654-preview\">
    <meta property=\"og:title\" content=\"YKK DIGITAL SHOWROOM\">
    <meta property=\"og:url\" content=\"https://dev-eds.ykkdigitalshowroom.com/en/library/catalog/qa654-preview\">
    <meta property=\"og:image\" content=\"https://dev-eds.ykkdigitalshowroom.com/default-meta-
```

- Evidence: none (API/request-level test, no screenshot)

### DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) (chromium)

- Failing assertion: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:357`
- Expected vs actual (verbatim, truncated):

```text
Error: qa654-folder/qa654-sub

expect(received).toBe(expected) // Object.is equality

Expected: 404
Received: 200
```

- Evidence: none (API/request-level test, no screenshot)

### DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary (chromium)

- Failing assertion: `tests/eco-products/DSR-590.eco-products.spec.ts:189`
- Expected vs actual (verbatim, truncated):

```text
Error: tag label

expect(locator).not.toBeEmpty() failed

Locator: locator('main').locator('.hero, [class*="hero"]').first().locator('[class*="tag"]').first()
Expected: not empty
Timeout: 5000ms
Error: element(s) not found

Call log:
  - tag label locator('main').locator('.hero, [class*="hero"]').first().locator('[class*="tag"]').first() with timeout 5000ms
  - waiting for locator('main').locator('.hero, [class*="hero"]').first().locator('[class*="tag"]').first()
```

- Evidence: `test-results/eco-products-DSR-590.eco-p-b65d2-e-category-name-and-summary-chromium/test-failed-1.png`, `test-results/eco-products-DSR-590.eco-p-b65d2-e-category-name-and-summary-chromium-retry1/test-failed-1.png`

### DSR-ECO-006 [ja] free editing area renders between hero and product list (chromium)

- Failing assertion: `tests/eco-products/DSR-590.eco-products.spec.ts:230`
- Expected vs actual (verbatim, truncated):

```text
Error: free area text

expect(locator).not.toBeEmpty() failed

Locator: locator('main').locator('[class*="free"], .default-content-wrapper').first()
Expected: not empty
Timeout: 5000ms
Error: element(s) not found

Call log:
  - free area text locator('main').locator('[class*="free"], .default-content-wrapper').first() with timeout 5000ms
  - waiting for locator('main').locator('[class*="free"], .default-content-wrapper').first()
```

- Evidence: `test-results/eco-products-DSR-590.eco-p-700c9-tween-hero-and-product-list-chromium/test-failed-1.png`, `test-results/eco-products-DSR-590.eco-p-700c9-tween-hero-and-product-list-chromium-retry1/test-failed-1.png`

### DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error (chromium)

- Failing assertion: `tests/icons/DSR-589.icons.spec.ts:107`
- Expected vs actual (verbatim, truncated):

```text
Error: console errors

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "Failed to load resource: the server responded with a status of 404 ()",
+ ]
```

- Evidence: `test-results/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium/test-failed-1.png`, `test-results/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error (chromium)

- Failing assertion: `tests/icons/DSR-589.icons.spec.ts:107`
- Expected vs actual (verbatim, truncated):

```text
Error: console errors

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 3

- Array []
+ Array [
+   "Failed to load resource: the server responded with a status of 404 ()",
+ ]
```

- Evidence: `test-results/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium/test-failed-1.png`, `test-results/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-014 [en] embeds the configured YouTube movie (chromium)

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:36`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('movie-detail-player-facade')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('movie-detail-player-facade') with timeout 5000ms
  - waiting for getByTestId('movie-detail-player-facade')
```

- Evidence: `test-results/movie-detail-DSR-173.movie-570d4-he-configured-YouTube-movie-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-570d4-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-026 displays related thumbnails, types, tags and valid links (chromium)

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:151`
- Expected vs actual (verbatim, truncated):

```text
Error: Related card 1 thumbnail

expect(locator).toBeVisible() failed

Locator: getByTestId('related-content-card').first().getByTestId('related-content-card-image')
Expected: visible
Timeout: 1000ms
Error: element(s) not found

Call log:
  - Related card 1 thumbnail getByTestId('related-content-card').first().getByTestId('related-content-card-image') with timeout 1000ms
  - waiting for getByTestId('related-content-card').first().getByTestId('related-content-card-image')
```

- Evidence: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-033 displays component sections in vertical order on PC (chromium)

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:213`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('movie-detail-player')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('movie-detail-player') with timeout 5000ms
  - waiting for getByTestId('movie-detail-player')
```

- Evidence: `test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium-retry1/test-failed-1.png`

### DSR-501-P3 [en] related movies are limited to 5 in authored order (chromium)

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:280`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('movie-detail-related-content')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('movie-detail-related-content') with timeout 5000ms
  - waiting for getByTestId('movie-detail-related-content')
```

- Evidence: `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium-retry1/test-failed-1.png`

### DSR-501-P2 [en] unavailable related movie is not displayed (chromium)

- Failing assertion: `tests/movie-detail/DSR-173.movie-detail.spec.ts:287`
- Expected vs actual (verbatim, truncated):

```text
Error: expect(locator).toBeVisible() failed

Locator: getByTestId('movie-detail-related-content')
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" getByTestId('movie-detail-related-content') with timeout 5000ms
  - waiting for getByTestId('movie-detail-related-content')
```

- Evidence: `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium-retry1/test-failed-1.png`

### DSR-NEWS-014 [ja] capture news layout at 1440x900 (chromium)

- Failing assertion: `news-detail/DSR-566.visual-capture.spec.ts`
- Expected vs actual (verbatim, truncated):

```text
Test timeout of 30000ms exceeded.
```

- Evidence: `test-results/news-detail-DSR-566.visual-02480-ure-news-layout-at-1440x900-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.visual-02480-ure-news-layout-at-1440x900-chromium-retry1/test-failed-1.png`

### DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width (chromium)

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected vs actual (verbatim, truncated):

```text
Error: 320: cards overflowing their column

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 6

- Array []
+ Array [
+   "",
+   "",
+   "",
+   "",
+ ]
```

- Evidence: `test-results/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium-retry1/test-failed-1.png`

### DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width (chromium)

- Failing assertion: `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected vs actual (verbatim, truncated):

```text
Error: 320: cards overflowing their column

expect(received).toEqual(expected) // deep equality

- Expected  - 1
+ Received  + 8

- Array []
+ Array [
+   "",
+   "",
+   "",
+   "",
+   "",
+   "",
+ ]
```

- Evidence: `test-results/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium-retry1/test-failed-1.png`

### DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload (chromium)

- Failing assertion: `product-list/DSR-583.product-list-sp.spec.ts`
- Expected vs actual (verbatim, truncated):

```text
Test timeout of 30000ms exceeded.
```

- Evidence: `test-results/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png`

### DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload (chromium)

- Failing assertion: `product-list/DSR-583.product-list-sp.spec.ts`
- Expected vs actual (verbatim, truncated):

```text
Test timeout of 30000ms exceeded.
```

- Evidence: `test-results/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png`

### DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned (chromium)

- Failing assertion: `product-list/DSR-583.product-list-sp.spec.ts`
- Expected vs actual (verbatim, truncated):

```text
Test timeout of 30000ms exceeded.
```

- Evidence: `test-results/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium-retry1/test-failed-1.png`

### DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned (chromium)

- Failing assertion: `product-list/DSR-583.product-list-sp.spec.ts`
- Expected vs actual (verbatim, truncated):

```text
Test timeout of 30000ms exceeded.
```

- Evidence: `test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll (chromium)

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual (verbatim, truncated):

```text
Error: 375: distinct column offsets

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 1
```

- Evidence: `test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll (chromium)

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual (verbatim, truncated):

```text
Error: 320: distinct column offsets

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 1
```

- Evidence: `test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads (chromium)

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:70`
- Expected vs actual (verbatim, truncated):

```text
Error: open: distinct column offsets

expect(received).toBe(expected) // Object.is equality

Expected: 2
Received: 1
```

- Evidence: `test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 (chromium)

- Failing assertion: `tests/product-list/DSR-583.product-list.spec.ts:153`
- Expected vs actual (verbatim, truncated):

```text
Error: 1440: distinct column offsets

expect(received).toBe(expected) // Object.is equality

Expected: 4
Received: 1
```

- Evidence: `test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search (chromium)

- Failing assertion: `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual (verbatim, truncated):

```text
Error: text/background colour changes on hover

expect(received).not.toEqual(expected) // deep equality

Expected: not []
```

- Evidence: `test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search (chromium)

- Failing assertion: `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual (verbatim, truncated):

```text
Error: text/background colour changes on hover

expect(received).not.toEqual(expected) // deep equality

Expected: not []
```

- Evidence: `test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (chromium)

- Failing assertion: `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual (verbatim, truncated):

```text
Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

- Evidence: `test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (chromium)

- Failing assertion: `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual (verbatim, truncated):

```text
Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})

expect(received).toBe(expected) // Object.is equality

Expected: true
Received: false
```

- Evidence: `test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date (chromium)

- Failing assertion: `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual (verbatim, truncated):

```text
Error: page requests /en/news/query-index.json

expect(received).toContain(expected) // indexOf

Expected value: "/en/news/query-index.json"
Received array: ["/query-index.json"]
```

- Evidence: `test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date (chromium)

- Failing assertion: `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual (verbatim, truncated):

```text
Error: page requests /ja/news/query-index.json

expect(received).toContain(expected) // indexOf

Expected value: "/ja/news/query-index.json"
Received array: ["/query-index.json"]
```

- Evidence: `test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (chromium)

- Failing assertion: `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual (verbatim, truncated):

```text
Error: SP item 1 title lines ≤ 1

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2
```

- Evidence: `test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (chromium)

- Failing assertion: `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual (verbatim, truncated):

```text
Error: SP item 1 title lines ≤ 1

expect(received).toBeLessThanOrEqual(expected)

Expected: <= 1
Received:    2
```

- Evidence: `test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

## 7. Open points for QA

- New fail DSR-CATOV-010 en: `/en/library/catalog/qa654-folder/qa654-sub` now returns 200 (raw HTML is `catalog-detail` with `source | overlay` / `unavailable | not-found`, `robots noindex`, Last-Modified 2026-10-22 14:37:47 GMT). In the browser it redirects to `/en/library/catalog`. The flat paths `/en/library/catalog/qa654-sub` on .aem.page and .aem.live are still 404, and `qa654-folder/` and `qa654-folder/does-not-exist-zz` are 404. So a stub page was generated for the subfolder CF, which BL "directory-strict → no page" does not allow. I did not check whether this came from a generator change or a QA-PT action on 22/10 (not verified in Author, Jira or the deploy log).
- New fail DSR-NEWS-014 ja (record-only capture spec added by JOB-20261016-11, first run in a full regression): the page is 200 and the title renders. The capture helper's `page.evaluate` times out at `tests/news-detail/DSR-566.visual-capture.spec.ts:23`. A separate probe showed `document.fonts.ready` resolves in 17 ms, but `img.decode()` never resolves for 3 lazy header/menu images that are hidden (`loading=lazy`, complete=false, 0 height). This is a test issue, not a product issue. NEWS-015 did not run (serial).
- DSR-NEWS en: all en TCs are now skipped because the en target changed in JOB-ZZ-IDLE-37 to `/master/en/test-space/test-news-detail-template`, which returns 404 (re-checked with curl). So the 8 en fails from IDLE-35 are no longer evaluated, and they have not been fixed.
- Newly passing: DSR-PDO-001/003/013/014 ja+en, PDO-004/005/008/009/012/017/019/021 ja (TD-586-01 overlay row is no longer `unavailable | no-product`), and DSR-ASSET-016 en (was skipped).
- Side effects: capture specs (DSR-552 evidence, JOB-ZZ-IDLE-27, hub results of JOB-20261015-14 / 20261016-11 / 20261016-13 / 20261019-04 / 20261019-09 / 20261020-01) rewrote 58 tracked files during the run, including another lane's result folder (JOB-20261016-11). I restored all of them with `git checkout`. I moved 16 new untracked files (8 DSR-552 evidence PNGs, 8 under `evidence/DSR-590/20261023/`) to `/tmp/idle39/side-effects/` and did not commit them.
- `test-results/` and `playwright-report/` are gitignored; raw JSON is at `test-results/idle39.json` (not committed).
