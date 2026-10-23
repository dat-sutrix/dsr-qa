# REGRESSION DEV automation run — 20261023-reg1200

Job: `JOB-ZY-REG-20261023-1200-claude-code` (R3 P1 + P2, first ledger baseline). Policy: `ykk-dsr/hub/regression/README.md`.

## 1. Header

- Run start (UTC): 2026-10-23T05:11:18Z
- Run end (UTC): 2026-10-23T05:28:36Z (group A 2026-10-23T05:11:18Z → 2026-10-23T05:26:32Z; group B 2026-10-23T05:26:33Z → 2026-10-23T05:28:36Z). The recheck of the 2 NEW FAIL is reported separately: `results/REGRESSION/DEV/automation-run-20261023-reg1200-recheck.md`.
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` where a test says so)
- Target page(s): all pages used by the P1 + P2 specs listed in section 3 (overlay video/product/catalog, lists, catalog download, breadcrumb, TOP, article, news, eco, icons, product CF, video block, DSR-173 test page)
- Build under test: not independently verified (EDS `main` on DEV at run time). The DSR-669/671 CF-model deploy was announced for "~1–2 h after 12:00 VN" on 23/10 (CHANGES.md, `pending`). I did not check whether it happened during this run.
- Baseline ID: Regression S12 baseline R2 (`regression/CHANGES.md` rows with `regressed = no`); overlay BL-OVL-1
- Automation HEAD commit SHA: 404afc89e76065a85abf88628eb0a95c03668aa6 (no code changes in this job)
- Exact command used (2 groups, run in sequence; tagged specs use `@auto` only, untagged specs exclude only `@manual`/`@blocked`):

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg1200/a.json ENV=dev npx playwright test tests/movie-detail/DSR-587.movie-overlay.spec.ts tests/product-detail/DSR-586.product-detail.spec.ts tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts tests/overlay-seo/DSR-587.overlay-seo.spec.ts tests/catalog-video/DSR-557.catalog-video.spec.ts tests/product-list/DSR-583.product-list.spec.ts tests/product-list/DSR-583.product-list-sp.spec.ts tests/catalog-download/DSR-570.catalog-download.spec.ts tests/breadcrumb/DSR-552.breadcrumb.spec.ts tests/top/DSR-609.top.spec.ts tests/article-detail/DSR-529.article-detail.spec.ts tests/news-detail/DSR-566.news-detail.spec.ts tests/eco-products/DSR-590.eco-products.spec.ts tests/icons/DSR-589.icons.spec.ts tests/product-cf/DSR-585.product-cf.spec.ts --grep @auto --grep-invert "@manual|@blocked" --reporter=line,json
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/reg1200/b.json ENV=dev npx playwright test tests/smoke.spec.ts tests/movie-detail/DSR-173.movie-detail.spec.ts tests/video-block/DSR-664.video-caption-null.spec.ts --grep-invert "@manual|@blocked" --reporter=line,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 443 | 275 | 47 | 121 | A: 1 · B: 1 | 2 | configured 1; 47 retry attempts | A 15.2 min · B 2.0 min |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms. Scope: R3 P1 + P2 functional specs, chromium only. The firefox/webkit projects only match DSR-BREAD-032, which has no `@auto` tag, so it did not run. Flaky outcomes: 0.

Not run (README §1 excludes them): `*retest*` specs (`DSR-552.breadcrumb-retest-DSR-591`, `DSR-587.overlay-retest-DSR-647`, `DSR-587.related-links-retest-DSR-538`), `*capture*`/visual specs, `analysis/`, and P3 specs.

### Wall time per spec file

Wall = first test start → last attempt end inside the shared run (2 workers, so spec files overlap). Sum = summed attempt durations.

| Spec | Tests | Wall (s) | Sum of attempts (s) |
|---|---:|---:|---:|
| `tests/product-list/DSR-583.product-list-sp.spec.ts` | 10 | 363 | 343 |
| `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts` | 58 | 229 | 193 |
| `tests/eco-products/DSR-590.eco-products.spec.ts` | 19 | 198 | 189 |
| `tests/article-detail/DSR-529.article-detail.spec.ts` | 37 | 148 | 122 |
| `tests/catalog-video/DSR-557.catalog-video.spec.ts` | 38 | 142 | 140 |
| `tests/top/DSR-609.top.spec.ts` | 12 | 128 | 98 |
| `tests/movie-detail/DSR-173.movie-detail.spec.ts` | 38 | 119 | 105 |
| `tests/product-list/DSR-583.product-list.spec.ts` | 6 | 112 | 101 |
| `tests/movie-detail/DSR-587.movie-overlay.spec.ts` | 23 | 107 | 96 |
| `tests/breadcrumb/DSR-552.breadcrumb.spec.ts` | 37 | 78 | 77 |
| `tests/product-detail/DSR-586.product-detail.spec.ts` | 21 | 57 | 56 |
| `tests/catalog-download/DSR-570.catalog-download.spec.ts` | 16 | 49 | 40 |
| `tests/icons/DSR-589.icons.spec.ts` | 15 | 41 | 34 |
| `tests/news-detail/DSR-566.news-detail.spec.ts` | 24 | 41 | 40 |
| `tests/overlay-seo/DSR-587.overlay-seo.spec.ts` | 66 | 41 | 40 |
| `tests/video-block/DSR-664.video-caption-null.spec.ts` | 8 | 16 | 15 |
| `tests/product-cf/DSR-585.product-cf.spec.ts` | 14 | 4 | 4 |
| `tests/smoke.spec.ts` | 1 | 1 | 1 |

## 4. Executed tests

Duration = summed over attempts. Fails show "fail (2/2)" when the retry also failed.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 9.4 s | — |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.2 s | — |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.2 s | — |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [ja] info bar date = meta publicationdate, format YYYY.MM.DD (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.4 s | — |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.4 s | — |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.4 s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [ja] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 3.5 s | — |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible (`article-detail/DSR-529.article-detail.spec.ts`) | fail (2/2) | 7.1 s | Error: category tag IDs expect(received).toHaveLength(expected)  |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 3.0 s | — |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 3.0 s | — |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 4.2 s | — |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded (`article-detail/DSR-529.article-detail.spec.ts`) | fail (2/2) | 7.9 s | Error: viewAllStories href expect(received).not.toMatch(expected)  |
| DSR-ARTICLE-028 | DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.1 s | — |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.1 s | — |
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 3.0 s | — |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.0 s | — |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 1.8 s | — |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [en] info bar date = meta publicationdate, format YYYY.MM.DD (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.3 s | — |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.5 s | — |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.2 s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [en] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.6 s | — |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible (`article-detail/DSR-529.article-detail.spec.ts`) | fail (2/2) | 8.3 s | Error: category tag IDs expect(received).toHaveLength(expected)  |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.8 s | — |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.5 s | — |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.1 s | — |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded (`article-detail/DSR-529.article-detail.spec.ts`) | fail (2/2) | 8.4 s | Error: viewAllStories href expect(received).not.toMatch(expected)  |
| DSR-ARTICLE-028 | DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.2 s | — |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.5 s | — |
| DSR-ARTICLE-015 | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.3 s | — |
| DSR-ARTICLE-020 | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.2 s | — |
| DSR-ARTICLE-023 | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) (`article-detail/DSR-529.article-detail.spec.ts`) | fail (2/2) | 4.8 s | Error: visible related items block expect(received).toEqual(expected) // deep equality  |
| DSR-ARTICLE-025 | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 2.0 s | — |
| DSR-ARTICLE-009 | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload (`article-detail/DSR-529.article-detail.spec.ts`) | pass | 3.7 s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [ja] display name overrides page title (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 4.1 s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [en] display name overrides page title (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 3.7 s | — |
| DSR-BREAD-015 | DSR-BREAD-015 [ja] special characters in display name are plain text (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 3.1 s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [ja] each language uses its own display names (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.2 s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [en] each language uses its own display names (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 1.9 s | — |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 5.6 s | — |
| DSR-BREAD-002 | DSR-BREAD-002 ancestor links (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 9.6 s | — |
| DSR-BREAD-003 | DSR-BREAD-003 current page is not linked (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.3 s | — |
| DSR-BREAD-004 | DSR-BREAD-004 HOME label and destination (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.4 s | — |
| DSR-BREAD-005 | DSR-BREAD-005 grandchild trail order (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.5 s | — |
| DSR-BREAD-006 | DSR-BREAD-006 parent trail (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.2 s | — |
| DSR-BREAD-007 | DSR-BREAD-007 missing intermediate page (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 1.2 s | — |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 1.6 s | — |
| DSR-BREAD-009 | DSR-BREAD-009 404 excludes breadcrumb (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 1.7 s | — |
| DSR-BREAD-011 | DSR-BREAD-011 empty label uses title (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.1 s | — |
| DSR-BREAD-017 | DSR-BREAD-017 localized HOME destinations (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.2 s | — |
| DSR-BREAD-025 | DSR-BREAD-025 BreadcrumbList structured data (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.3 s | — |
| DSR-BREAD-027 | DSR-BREAD-027 semantic markup and accessibility (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 4.0 s | — |
| DSR-BREAD-028 | DSR-BREAD-028 keyboard navigation (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 4.1 s | — |
| DSR-BREAD-031 | DSR-BREAD-031 site-origin console errors (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.5 s | — |
| DSR-BREAD-035 | DSR-BREAD-035 arrow asset origin and status (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.7 s | — |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.6 s | — |
| DSR-BREAD-005 | DSR-BREAD-005 grandchild trail order (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.1 s | — |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 1.5 s | — |
| DSR-BREAD-017 | DSR-BREAD-017 localized HOME destinations (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.2 s | — |
| DSR-BREAD-025 | DSR-BREAD-025 BreadcrumbList structured data (`breadcrumb/DSR-552.breadcrumb.spec.ts`) | pass | 2.1 s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [ja] catalog detail header renders (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 1.4 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [ja] download form fields, labels, consent and button present (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 1.5 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 2.1 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 2.4 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [ja] e-book form card links to the detail page with the form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 2.3 s | — |
| DSR-CATDL-001 | DSR-CATDL-001 [en] catalog detail header renders (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 1.4 s | — |
| DSR-CATDL-002 | DSR-CATDL-002 [en] download form fields, labels, consent and button present (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 1.8 s | — |
| DSR-CATDL-005 | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 1.8 s | — |
| DSR-CATDL-006 | DSR-CATDL-006 [en] requiresForm=true card leads to the download form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 2.6 s | — |
| DSR-CATDL-018 | DSR-CATDL-018 [en] e-book form card links to the detail page with the form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 2.7 s | — |
| DSR-CATDL-003 | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 1.9 s | — |
| DSR-CATDL-007 | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit (`catalog-download/DSR-570.catalog-download.spec.ts`) | fail (2/2) | 8.5 s | Error: gated PDF URL delivered to the browser before submit expect(received).toEqual(expected) // deep equality  |
| DSR-CATDL-010 | DSR-CATDL-010 [ja] catalog ID handed to the form (`catalog-download/DSR-570.catalog-download.spec.ts`) | pass | 3.2 s | — |
| DSR-CATDL-016 | DSR-CATDL-016 [en] fixed texts translated (no Japanese) (`catalog-download/DSR-570.catalog-download.spec.ts`) | fail (2/2) | 3.7 s | Error: fixed texts containing Japanese expect(received).toEqual(expected) // deep equality  |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 4.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.6 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 1.1 s | Error: query-index rows expect(received).toHaveLength(expected)  |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 11.7 s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.5 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 1.6 s | Error: query-index rows expect(received).toHaveLength(expected)  |
| DSR-CATOV-001 | DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 12.4 s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 3.7 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [ja] catalog/search is not taken by the overlay (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.7 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.7 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [ja] catalog list card links to the overlay page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 18.0 s | Error: card 'QA190 PDF catalog' expect(locator).toBeVisible() failed  |
| DSR-CATOV-015 | DSR-CATOV-015 [ja] PDF, requiresForm OFF → detail redirects to the PDF directly (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.8 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 3.9 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [ja] e-book, requiresForm OFF → detail redirects to ebookUrl without a form (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 8.5 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [ja] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.7 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.9 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 1.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 2.8 s | Error: query-index rows expect(received).toHaveLength(expected)  |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 12.2 s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.6 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.5 s | — |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page; non-form → redirect to the file (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.5 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 1.4 s | Error: query-index rows expect(received).toHaveLength(expected)  |
| DSR-CATOV-001 | DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 12.0 s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA |
| DSR-CATOV-002 | DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.5 s | — |
| DSR-CATOV-003 | DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-004 | DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] 表示フラグ (isActive) OFF → noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 3.9 s | — |
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-007 | DSR-CATOV-007 [en] catalog/search is not taken by the overlay (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.9 s | — |
| DSR-CATOV-008 | DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 2.8 s | — |
| DSR-CATOV-012 | DSR-CATOV-012 [en] catalog list card links to the overlay page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | fail (2/2) | 18.0 s | Error: card 'QA190 PDF catalog' expect(locator).toBeVisible() failed  |
| DSR-CATOV-015 | DSR-CATOV-015 [en] PDF, requiresForm OFF → detail redirects to the PDF directly (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 4.7 s | — |
| DSR-CATOV-016 | DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 2.1 s | — |
| DSR-CATOV-017 | DSR-CATOV-017 [en] e-book, requiresForm OFF → detail redirects to ebookUrl without a form (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 5.6 s | — |
| DSR-CATOV-019 | DSR-CATOV-019 [en] non-form PDF catalog: detail redirects to the file instead of rendering image, name, description, date and type (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 4.8 s | — |
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.6 s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a sub-folder → no page: flat URL 404, sub-folder URL blank stub → redirect to list (by design) (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 4.4 s | — |
| DSR-CATOV-011 | DSR-CATOV-011 [en] content CF only (no DSR CF) → no page (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 0.1 s | — |
| DSR-CATOV-014 | DSR-CATOV-014 [en] content CF unpublished → page unavailable + noindex, visitor sent to the catalog list (`catalog-overlay/DSR-654.catalog-overlay.spec.ts`) | pass | 4.1 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.5 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 6.8 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.4 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.7 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.8 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.8 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.7 s | — |
| DSR-CATV-012 | DSR-CATV-012 catalog item shows thumbnail and title (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.8 s | — |
| DSR-CATV-013 | DSR-CATV-013 PDF item without form opens in a new tab (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 6.6 s | — |
| DSR-CATV-016 | DSR-CATV-016 e-book item opens ebookUrl without form (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.7 s | — |
| DSR-CATV-017 | DSR-CATV-017 e-book item flagged requiresForm links to the detail page with the form (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.4 s | — |
| DSR-CATV-018 | DSR-CATV-018 NEW label within 10 days of publishDate (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.2 s | — |
| DSR-CATV-019 | DSR-CATV-019 UPDATE label within 10 days of updateDate (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.4 s | — |
| DSR-CATV-020 | DSR-CATV-020 only NEW when publishDate and updateDate both apply (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.9 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.9 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.7 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.3 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 6.8 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.9 s | — |
| DSR-CATV-001 | DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.3 s | — |
| DSR-CATV-002 | DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.3 s | — |
| DSR-CATV-006 | DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.6 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 5.3 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.6 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.2 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.5 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.4 s | — |
| DSR-CATV-001 | DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.1 s | — |
| DSR-CATV-002 | DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.6 s | — |
| DSR-CATV-006 | DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 1.8 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.2 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 3.9 s | — |
| DSR-CATV-003 | DSR-CATV-003 [ja] Youku embed src after click (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.3 s | — |
| DSR-CATV-007 | DSR-CATV-007 [ja] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.1 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.6 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.page) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 6.3 s | — |
| DSR-CATV-003 | DSR-CATV-003 [en] Youku embed src after click (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 2.7 s | — |
| DSR-CATV-007 | DSR-CATV-007 [en] CSP allows the Youku embed, no violation (qa557-youku, .aem.live) (`catalog-video/DSR-557.catalog-video.spec.ts`) | pass | 4.3 s | — |
| DSR-ECO-001 | DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE (`eco-products/DSR-590.eco-products.spec.ts`) | pass | 3.5 s | — |
| DSR-ECO-003 | DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last (`eco-products/DSR-590.eco-products.spec.ts`) | pass | 18.3 s | — |
| DSR-ECO-005 | DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary (`eco-products/DSR-590.eco-products.spec.ts`) | fail (2/2) | 27.3 s | Error: tag label expect(locator).not.toBeEmpty() failed  |
| DSR-ECO-006 | DSR-ECO-006 [ja] free editing area renders between hero and product list (`eco-products/DSR-590.eco-products.spec.ts`) | fail (2/2) | 38.4 s | Error: free area text expect(locator).not.toBeEmpty() failed  |
| DSR-ECO-012 | DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files (`eco-products/DSR-590.eco-products.spec.ts`) | pass | 4.7 s | — |
| DSR-ECO-013 | DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links (`eco-products/DSR-590.eco-products.spec.ts`) | pass | 5.1 s | — |
| DSR-ICON-006 | DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error (`icons/DSR-589.icons.spec.ts`) | fail (2/2) | 14.0 s | Error: console errors expect(received).toEqual(expected) // deep equality  |
| DSR-ICON-006 | DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error (`icons/DSR-589.icons.spec.ts`) | fail (2/2) | 19.0 s | Error: console errors expect(received).toEqual(expected) // deep equality  |
| DSR-VOV-001 | DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 5.4 s | — |
| DSR-VOV-001 | DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 4.3 s | — |
| DSR-VOV-002 | DSR-VOV-002 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 1.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 6.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 5.7 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 6.0 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 5.6 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list (`movie-detail/DSR-587.movie-overlay.spec.ts`) | fail (2/2) | 12.0 s | Error: video-detail rows expect(received).toEqual(expected) // deep equality  |
| DSR-VOV-011 | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.3 s | — |
| DSR-VOV-011 | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) (`movie-detail/DSR-587.movie-overlay.spec.ts`) | fail (2/2) | 14.3 s | Error: list block expect(locator).toHaveCount(expected) failed  |
| DSR-VOV-013 | DSR-VOV-013 [en] movie list shows standard movies only (`movie-detail/DSR-587.movie-overlay.spec.ts`) | fail (2/2) | 14.1 s | Error: first list card (main-frame navigations: 1) expect(received).toBe(expected) // Object.is equality  |
| DSR-VOV-014 | DSR-VOV-014 [en] related movies max 5 when 6 are linked (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.3 s | — |
| DSR-VOV-015 | DSR-VOV-015 [en] related movie with isUnavailable = true is hidden (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.3 s | — |
| DSR-VOV-018 | DSR-VOV-018 [ja] language variant: 200, html lang, title (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 3.2 s | — |
| DSR-VOV-018 | DSR-VOV-018 [en] language variant: 200, html lang, title (`movie-detail/DSR-587.movie-overlay.spec.ts`) | pass | 0.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 2.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 0.3 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.0 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/catalog (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.2 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s | — |
| DSR-VOV-007 | DSR-VOV-007 [ja] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /ja/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive page: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.6 s | — |
| DSR-VOV-007 | DSR-VOV-007 [en] qa587-inactive live: raw 200 + unavailable \| inactive, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.0 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) (`overlay-seo/DSR-587.overlay-seo.spec.ts`) | pass | 1.1 s | — |
| DSR-PCF-007 | DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.1 s | — |
| DSR-PCF-007 | DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.0 s | — |
| DSR-PCF-016 | DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.4 s | — |
| DSR-PCF-016 | DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.4 s | — |
| DSR-PCF-017 | DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.2 s | — |
| DSR-PCF-017 | DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.4 s | — |
| DSR-PCF-019 | DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.8 s | — |
| DSR-PCF-019 | DSR-PCF-019 [en] en product persisted queries return ver0.4 names only (`product-cf/DSR-585.product-cf.spec.ts`) | pass | 0.9 s | — |
| DSR-PDO-001 | DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 2.4 s | — |
| DSR-PDO-001 | DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 2.2 s | — |
| DSR-PDO-002 | DSR-PDO-002 [ja] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 0.6 s | — |
| DSR-PDO-003 | DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 0.5 s | — |
| DSR-PDO-003 | DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 0.5 s | — |
| DSR-PDO-004 | DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 4.1 s | — |
| DSR-PDO-005 | DSR-PDO-005 [ja] URL = DSR CF node name: numeric and lowercase/digit/"-" names render product detail; /products/ is not an overlay page (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 4.2 s | — |
| DSR-PDO-008 | DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 5.4 s | — |
| DSR-PDO-009 | DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 6.9 s | — |
| DSR-PDO-012 | DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 0.1 s | — |
| DSR-PDO-013 | DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 4.4 s | — |
| DSR-PDO-013 | DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 4.0 s | — |
| DSR-PDO-014 | DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 2.6 s | — |
| DSR-PDO-014 | DSR-PDO-014 [en] language variant: 200, html lang matches, product name present (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 2.3 s | — |
| DSR-PDO-017 | DSR-PDO-017 [ja] ver0.4 display fields show the CF values, removed fields absent (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 3.1 s | — |
| DSR-PDO-021 | DSR-PDO-021 [ja] media slots: media01 first, one item per filled slot, 0 broken images (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 5.4 s | — |
| DSR-PDO-019 | DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page (`product-detail/DSR-586.product-detail.spec.ts`) | pass | 2.6 s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll (`product-list/DSR-583.product-list-sp.spec.ts`) | pass | 3.1 s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width (`product-list/DSR-583.product-list-sp.spec.ts`) | fail (2/2) | 32.7 s | Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality  |
| DSR-PLSP-003 | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload (`product-list/DSR-583.product-list-sp.spec.ts`) | fail (2/2) | 61.0 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned (`product-list/DSR-583.product-list-sp.spec.ts`) | fail (2/2) | 61.2 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) (`product-list/DSR-583.product-list-sp.spec.ts`) | pass | 13.0 s | — |
| DSR-PLSP-001 | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll (`product-list/DSR-583.product-list-sp.spec.ts`) | pass | 7.4 s | — |
| DSR-PLSP-002 | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width (`product-list/DSR-583.product-list-sp.spec.ts`) | fail (2/2) | 32.7 s | Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality  |
| DSR-PLSP-003 | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload (`product-list/DSR-583.product-list-sp.spec.ts`) | fail (2/2) | 61.0 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned (`product-list/DSR-583.product-list-sp.spec.ts`) | fail (2/2) | 61.0 s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) (`product-list/DSR-583.product-list-sp.spec.ts`) | pass | 10.2 s | — |
| DSR-PRODLIST-001 | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll (`product-list/DSR-583.product-list.spec.ts`) | fail (2/2) | 7.7 s | Error: 375: distinct column offsets expect(received).toBe(expected) // Object.is equality  |
| DSR-PRODLIST-002 | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll (`product-list/DSR-583.product-list.spec.ts`) | fail (2/2) | 27.7 s | Error: 320: distinct column offsets expect(received).toBe(expected) // Object.is equality  |
| DSR-PRODLIST-003 | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads (`product-list/DSR-583.product-list.spec.ts`) | fail (2/2) | 25.6 s | Error: open: distinct column offsets expect(received).toBe(expected) // Object.is equality  |
| DSR-PRODLIST-004 | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 (`product-list/DSR-583.product-list.spec.ts`) | fail (2/2) | 28.8 s | Error: 1440: distinct column offsets expect(received).toBe(expected) // Object.is equality  |
| DSR-TOP-004 | DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search (`top/DSR-609.top.spec.ts`) | fail (2/2) | 15.1 s | Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality  |
| DSR-TOP-005 | DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (`top/DSR-609.top.spec.ts`) | fail (2/2) | 14.4 s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).toBe(expected) // Object.is equ |
| DSR-TOP-006 | DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date (`top/DSR-609.top.spec.ts`) | fail (2/2) | 15.3 s | Error: page requests /ja/news/query-index.json expect(received).toContain(expected) // indexOf  |
| DSR-TOP-007 | DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (`top/DSR-609.top.spec.ts`) | fail (2/2) | 7.6 s | Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected)  |
| DSR-TOP-008 | DSR-TOP-008 [ja] NEWS with empty query-index renders without error (`top/DSR-609.top.spec.ts`) | pass | 3.7 s | — |
| DSR-TOP-009 | DSR-TOP-009 [ja] main visual image is eager and is the LCP element (`top/DSR-609.top.spec.ts`) | pass | 4.3 s | — |
| DSR-TOP-004 | DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search (`top/DSR-609.top.spec.ts`) | fail (2/2) | 6.4 s | Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality  |
| DSR-TOP-005 | DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (`top/DSR-609.top.spec.ts`) | fail (2/2) | 7.3 s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).toBe(expected) // Object.is equ |
| DSR-TOP-006 | DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date (`top/DSR-609.top.spec.ts`) | fail (2/2) | 6.2 s | Error: page requests /en/news/query-index.json expect(received).toContain(expected) // indexOf  |
| DSR-TOP-007 | DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (`top/DSR-609.top.spec.ts`) | fail (2/2) | 7.8 s | Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected)  |
| DSR-TOP-008 | DSR-TOP-008 [en] NEWS with empty query-index renders without error (`top/DSR-609.top.spec.ts`) | pass | 6.2 s | — |
| DSR-TOP-009 | DSR-TOP-009 [en] main visual image is eager and is the LCP element (`top/DSR-609.top.spec.ts`) | pass | 4.3 s | — |
| DSR-MOVIE-012 | DSR-MOVIE-012 [en] displays the exact movie title (`movie-detail/DSR-173.movie-detail.spec.ts`) | pass | 2.6 s | — |
| DSR-MOVIE-014 | DSR-MOVIE-014 [en] embeds the configured YouTube movie (`movie-detail/DSR-173.movie-detail.spec.ts`) | fail (2/2) | 14.7 s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-player-facade') Expected: visible |
| DSR-MOVIE-036 | DSR-MOVIE-036 no site-origin console errors on the movie component page (`movie-detail/DSR-173.movie-detail.spec.ts`) | pass | 2.1 s | — |
| DSR-MOVIE-026 | DSR-MOVIE-026 displays related thumbnails, types, tags and valid links (`movie-detail/DSR-173.movie-detail.spec.ts`) | fail (2/2) | 25.9 s | Error: Related card 1 thumbnail expect(locator).toBeVisible() failed  |
| DSR-MOVIE-027 | DSR-MOVIE-027 [en] outputs exactly one title and og:title (`movie-detail/DSR-173.movie-detail.spec.ts`) | pass | 2.5 s | — |
| DSR-MOVIE-029 | DSR-MOVIE-029 outputs an absolute reachable CF thumbnail (`movie-detail/DSR-173.movie-detail.spec.ts`) | pass | 3.1 s | — |
| DSR-MOVIE-033 | DSR-MOVIE-033 displays component sections in vertical order on PC (`movie-detail/DSR-173.movie-detail.spec.ts`) | fail (2/2) | 15.1 s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-player') Expected: visible |
| DSR-MOVIE-034 | DSR-MOVIE-034 displays the component back control (`movie-detail/DSR-173.movie-detail.spec.ts`) | pass | 2.2 s | — |
| DSR-501-P3 | DSR-501-P3 [en] related movies are limited to 5 in authored order (`movie-detail/DSR-173.movie-detail.spec.ts`) | fail (2/2) | 17.2 s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-related-content') Expected: visible |
| DSR-501-P2 | DSR-501-P2 [en] unavailable related movie is not displayed (`movie-detail/DSR-173.movie-detail.spec.ts`) | fail (2/2) | 18.3 s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-related-content') Expected: visible |
| SMOKE-001 DSR-173 test page is reachable | SMOKE-001 DSR-173 test page is reachable (`smoke.spec.ts`) | pass | 0.8 s | — |
| DSR-VCAP-001 | DSR-VCAP-001 [en] live: authored video block with empty caption shows no "null" text (`video-block/DSR-664.video-caption-null.spec.ts`) | pass | 4.9 s | — |
| DSR-VCAP-001 | DSR-VCAP-001 [en] page: authored video block with empty caption shows no "null" text (`video-block/DSR-664.video-caption-null.spec.ts`) | pass | 4.4 s | — |
| DSR-VCAP-002 | DSR-VCAP-002 [en] page: booth TOP code-built video block shows no "null" text (`video-block/DSR-664.video-caption-null.spec.ts`) | pass | 1.5 s | — |
| DSR-VCAP-003 | DSR-VCAP-003 [en] live: video detail player area shows no "null" text (control) (`video-block/DSR-664.video-caption-null.spec.ts`) | pass | 1.3 s | — |
| DSR-VCAP-003 | DSR-VCAP-003 [en] page: video detail player area shows no "null" text (control) (`video-block/DSR-664.video-caption-null.spec.ts`) | pass | 1.2 s | — |
| DSR-VCAP-004 | DSR-VCAP-004 [en] page: product detail shows no "null" text (control) (`video-block/DSR-664.video-caption-null.spec.ts`) | pass | 1.1 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-011 (DSR-ARTICLE-011 [ja] listing card images of qa529 articles a) | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-026 (DSR-ARTICLE-026 [ja] stories query-index contains qa529-01 w) | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-011 (DSR-ARTICLE-011 [en] listing card images of qa529 articles a) | Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-ARTICLE-026 (DSR-ARTICLE-026 [en] stories query-index contains qa529-01 w) | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |
| DSR-BREAD-018 (DSR-BREAD-018 [cn] each language uses its own display names) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-022 (DSR-BREAD-022 SP parent navigation) | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 (DSR-BREAD-029 STG Lighthouse performance) | Run on STG (Lighthouse) |
| DSR-BREAD-030 (DSR-BREAD-030 movie breadcrumb regression) | DSR-536 / movie-detail placement |
| DSR-BREAD-033 (DSR-BREAD-033 all page types) | Layout tickets |
| DSR-BREAD-034 (DSR-BREAD-034 responsive movie back control) | DSR-536 / movie-detail placement |
| DSR-BREAD-001 (DSR-BREAD-001 child trail and placement) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 (DSR-BREAD-005 grandchild trail order) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 (DSR-BREAD-008 HOME excludes breadcrumb) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 (DSR-BREAD-017 localized HOME destinations) | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 (DSR-BREAD-025 BreadcrumbList structured data) | cn: no /master/cn (Issue #18) |
| DSR-CATDL-017 (DSR-CATDL-017 [ja] unknown or missing catalog ID never shows) | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=true); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 (DSR-CATDL-016 [cn] fixed texts translated (Chinese)) | cn: no /master/cn (Issue #18) |
| DSR-CATOV-006 (DSR-CATOV-006 [ja] unpublished DSR CF → 404 on both hosts, r) | TD-654-03 exists in en only (A7) |
| DSR-CATOV-018 (DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per D) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-CATOV-018 (DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per D) | Pending (A5): form shown for e-book + requiresForm ON; DSR-655 Y3 open, default = no form |
| DSR-ECO-002 (DSR-ECO-002 [ja] each category card VIEW MORE links to its T) | demo data (Ngọc 21/10) |
| DSR-ECO-004 (DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finde) | demo data (Ngọc 21/10) |
| DSR-ECO-001 (DSR-ECO-001 [en] TOP shows one card per category with image,) | en demo page not on DEV |
| DSR-ECO-002 (DSR-ECO-002 [en] each category card VIEW MORE links to its T) | en demo page not on DEV |
| DSR-ECO-004 (DSR-ECO-004 [en] 環境配慮型製品診断 button links to the product finde) | en demo page not on DEV |
| DSR-ECO-007 (DSR-ECO-007 [ja] detail product list equals the query-index ) | demo data (Ngọc 21/10) |
| DSR-ECO-010 (DSR-ECO-010 [ja] detail product cards link to /ja/products/{) | demo data (Ngọc 21/10) |
| DSR-ECO-005 (DSR-ECO-005 [en] detail hero shows tag, background image, ca) | DSR-590 page not on DEV |
| DSR-ECO-007 (DSR-ECO-007 [en] detail product list equals the query-index ) | DSR-590 page not on DEV |
| DSR-ECO-010 (DSR-ECO-010 [en] detail product cards link to /en/products/{) | DSR-590 page not on DEV |
| DSR-ECO-009 (DSR-ECO-009 [ja] detail with 0 matching products shows no br) | demo data (Ngọc 21/10) |
| DSR-ECO-013 (DSR-ECO-013 [en] TOP exists with html lang, names in its lan) | en demo page not on DEV |
| DSR-ECO-013 (DSR-ECO-013 [cn] TOP and detail exist with html lang and lan) | cn: no /master/cn on DEV (Issue #18) |
| DSR-ICON-001 (DSR-ICON-001 [ja] product detail performance/function icons ) | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 (DSR-ICON-002 [ja] product list card icons all match the offi) | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 (DSR-ICON-003 [ja] condition search option and result icons a) | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 (DSR-ICON-004 [ja] no temporary icon (TD-589-06) remains on t) | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-001 (DSR-ICON-001 [en] product detail performance/function icons ) | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 (DSR-ICON-002 [en] product list card icons all match the offi) | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 (DSR-ICON-003 [en] condition search option and result icons a) | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 (DSR-ICON-004 [en] no temporary icon (TD-589-06) remains on t) | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-005 (DSR-ICON-005 [ja] same function uses the same asset on detai) | Blocked: TD-589-04 official icon list |
| DSR-ICON-007 (DSR-ICON-007 [ja] product without function values shows no i) | blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 (DSR-ICON-008 [ja] maximum number of icons wraps on SP withou) | blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 (DSR-ICON-009 [ja] language versions show the same ordered ic) | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 (DSR-ICON-009 [en] language versions show the same ordered ic) | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-VOV-004 (DSR-VOV-004 [en] CF related name with uppercase / underscore) | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 (DSR-VOV-005 [en] CF related in subfolder / outside /content/) | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 (DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .ae) | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-010 (DSR-VOV-010 [en] unpublished CF related → 404 on both hosts,) | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 (DSR-VOV-011 [ja] video/tech-talk stays a list page) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 (DSR-VOV-011 [en] video/tech-talk stays a list page) | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-016 (DSR-VOV-016 [en] related contents ordered by update date, ne) | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 (DSR-VOV-017 [en] DSR-173 Group A page switched to the overla) | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-NEWS-001 (DSR-NEWS-001 [en] page shows date, category, title and body) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-002 (DSR-NEWS-002 [en] fixed order meta → title → news type → spa) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-003 (DSR-NEWS-003 [en] shown date equals meta publish date) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-004 (DSR-NEWS-004 [en] category and title are non-empty text) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-006 (DSR-NEWS-006 [en] Back to list href resolves to /en/news/) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-007 (DSR-NEWS-007 [en] page row in query-index with publishDate/c) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-008 (DSR-NEWS-008 [en] page appears on the news list with title a) | TC 8.0 is ja only |
| DSR-NEWS-009 (DSR-NEWS-009 [en] no related-content block) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-010 (DSR-NEWS-010 [en] CTA (Button8) href equals authored URL) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-012 (DSR-NEWS-012 [en] My List button and share icons visible and) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-013 (DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when pr) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-018 (DSR-NEWS-018 [en] title, description and og tags non-empty) | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-001 (DSR-NEWS-001 [ja] page shows date, category, title and body) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-002 (DSR-NEWS-002 [ja] fixed order meta → title → news type → spa) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-003 (DSR-NEWS-003 [ja] shown date equals meta publish date) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-004 (DSR-NEWS-004 [ja] category and title are non-empty text) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-006 (DSR-NEWS-006 [ja] Back to list href resolves to /ja/news/) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-007 (DSR-NEWS-007 [ja] page row in query-index with publishDate/c) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-008 (DSR-NEWS-008 [ja] page appears on the news list with title a) | Blocked – page under test is not under /ja/news/ (needs TD-566-03) |
| DSR-NEWS-009 (DSR-NEWS-009 [ja] no related-content block) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-010 (DSR-NEWS-010 [ja] CTA (Button8) href equals authored URL) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-012 (DSR-NEWS-012 [ja] My List button and share icons visible and) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-013 (DSR-NEWS-013 [ja] body keeps h2/h3, strong, ul/ol, a when pr) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-018 (DSR-NEWS-018 [ja] title, description and og tags non-empty) | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-CATOV-002 (DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/q) | preview-only CF: not on .aem.live (HTTP 404 = expected) |
| DSR-PCF-013 (DSR-PCF-013 [ja] published TD-585-01 returns ver0.4 fields v) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 (DSR-PCF-013 [en] published TD-585-01 returns ver0.4 fields v) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 (DSR-PCF-014 [ja] product search JSON entry has search keys a) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 (DSR-PCF-015 [ja] product detail of TD-585-01 renders without) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 (DSR-PCF-018 [ja] product CF name = numeric productId in cont) | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 (DSR-PCF-018 [en] product CF name = numeric productId in cont) | Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-006 (DSR-PDO-006 [ja] CF related in subfolder → no page (404)) | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 (DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .ae) | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-011 (DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts,) | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-020 (DSR-PDO-020 [ja] ver0.4 new fields – current state recorded ) | Blocked: no design for ver0.4 new fields (Figma B04 – Q29); current state recorded: rendered none |
| DSR-PRODLIST-003 (DSR-PRODLIST-003 [en] SP column count stays 2 after scroll, ) | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 (DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1)) | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-MOVIE-020 (DSR-MOVIE-020 displays visible related product codes in orde) | Issue #1: related products specification pending |
| DSR-MOVIE-021 (DSR-MOVIE-021 sorts related content by update date descendin) | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023 (DSR-MOVIE-023 excludes unavailable and inactive related movi) | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025 (DSR-MOVIE-025 navigates the related content carousel to its ) | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 (DSR-MOVIE-028 removes line breaks from description metadata) | Description line-break separator is unconfirmed |
| DSR-MOVIE-001 (DSR-MOVIE-001 B: page auto-generation not implemented) | B: page auto-generation not implemented |
| DSR-MOVIE-002 (DSR-MOVIE-002 B: page auto-generation not implemented) | B: page auto-generation not implemented |
| DSR-MOVIE-003 (DSR-MOVIE-003 B: page auto-generation not implemented) | B: page auto-generation not implemented |
| DSR-MOVIE-004 (DSR-MOVIE-004 M: Universal Editor requires IMS login; manual) | M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005 (DSR-MOVIE-005 B: page auto-generation not implemented) | B: page auto-generation not implemented |
| DSR-MOVIE-006 (DSR-MOVIE-006 B: URL structure not implemented, DSR-536) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007 (DSR-MOVIE-007 B: URL structure not implemented, DSR-536) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008 (DSR-MOVIE-008 B: URL structure not implemented, DSR-536) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009 (DSR-MOVIE-009 B: URL structure not implemented, DSR-536) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010 (DSR-MOVIE-010 B: URL structure not implemented, DSR-536) | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011 (DSR-MOVIE-011 B: page auto-generation not implemented) | B: page auto-generation not implemented |
| DSR-MOVIE-013 (DSR-MOVIE-013 C: overflow automation deferred; CJK font manu) | C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015 (DSR-MOVIE-015 C: iframe source automation deferred; playback) | C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016 (DSR-MOVIE-016 B: movie-detail-player-video not implemented, ) | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017 (DSR-MOVIE-017 B: movie-detail-player-video not implemented, ) | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018 (DSR-MOVIE-018 B: test data pending (docs/DSR-173/test-data.m) | B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019 (DSR-MOVIE-019 C: layout automation deferred; in-iframe error) | C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022 (DSR-MOVIE-022 B: test data pending (docs/DSR-173/test-data.m) | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024 (DSR-MOVIE-024 B: test data pending (docs/DSR-173/test-data.m) | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030 (DSR-MOVIE-030 M: SNS debuggers need login and public URL; ma) | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 (DSR-MOVIE-031 B: page auto-generation not implemented) | B: page auto-generation not implemented |
| DSR-MOVIE-032 (DSR-MOVIE-032 B: ja/zh pages not available) | B: ja/zh pages not available |
| DSR-MOVIE-035 (DSR-MOVIE-035 B: SP design pending) | B: SP design pending |
| DSR-VCAP-002 (DSR-VCAP-002 [en] live: booth TOP code-built video block sho) | live /en/product/application/fashion/fashion returns 404 (not published on this host) |
| DSR-VCAP-004 (DSR-VCAP-004 [en] live: product detail shows no "null" text ) | live /en/products/46 returns 404 (not published on this host) |

## 6. Failed tests

**NEW FAIL (passed in the latest earlier run, fail now):** DSR-VOV-011 [en] and DSR-VOV-013 [en]. Details are below. All other fails were already failing in their latest earlier run (`IDLE-35/39`, `JOB-20261023-06/08/09/10`). Each one has a classification from `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/result.json`.

### DSR-ARTICLE-012 — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs expect(received).toHaveLength(expected) ` — `tests/article-detail/DSR-529.article-detail.spec.ts:183`
- Classification: pre-existing (JOB-23-06, IDLE-39): meta category empty · suspect `data` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/article-detail-DSR-529.art-8b907-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-8b907-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ARTICLE-012_ja_01.png`

### DSR-ARTICLE-024 — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href expect(received).not.toMatch(expected) ` — `tests/article-detail/DSR-529.article-detail.spec.ts:244`
- Classification: pre-existing (IDLE-35/39): VIEW ALL STORIES href "#" · suspect `product` · cause `none` · real-bug confidence 50%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ARTICLE-024_ja_01.png`

### DSR-ARTICLE-012 — DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs expect(received).toHaveLength(expected) ` — `tests/article-detail/DSR-529.article-detail.spec.ts:183`
- Classification: pre-existing (JOB-23-06, IDLE-39): meta category empty · suspect `data` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/article-detail-DSR-529.art-3ce31-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-3ce31-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ARTICLE-012_en_01.png`

### DSR-ARTICLE-024 — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href expect(received).not.toMatch(expected) ` — `tests/article-detail/DSR-529.article-detail.spec.ts:244`
- Classification: pre-existing (IDLE-35/39): VIEW ALL STORIES href "#" · suspect `product` · cause `none` · real-bug confidence 50%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ARTICLE-024_en_01.png`

### DSR-ARTICLE-023 — DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion: `Error: visible related items block expect(received).toEqual(expected) // deep equality ` — `tests/article-detail/DSR-529.article-detail.spec.ts:332`
- Classification: pre-existing (JOB-23-08 blocked, IDLE-39) · suspect `data` · cause `none` · real-bug confidence 20%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium/test-failed-1.png`, `test-results/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ARTICLE-023_ja_01.png`

### DSR-CATDL-007 — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `Error: gated PDF URL delivered to the browser before submit expect(received).toEqual(expected) // deep equality ` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:195`
- Classification: known draft BUG-CAT-PDF-EXPOSE (DASHBOARD 🐞) · suspect `product` · cause `none` · real-bug confidence 70%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png`, `test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATDL-007_ja_01.png`

### DSR-CATDL-016 — DSR-CATDL-016 [en] fixed texts translated (no Japanese)

- Failing assertion: `Error: fixed texts containing Japanese expect(received).toEqual(expected) // deep equality ` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:245`
- Classification: known draft BUG-CAT-FORM-EN (DASHBOARD 🐞) · suspect `product` · cause `none` · real-bug confidence 70%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium/test-failed-1.png`, `test-results/catalog-download-DSR-570.c-4f6f2-xts-translated-no-Japanese--chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATDL-016_en_01.png`

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows expect(received).toHaveLength(expected) ` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:196`
- Classification: pre-existing (JOB-23-10): non-form page in query-index with robots noindex – Expected under review · suspect `test` · cause `none` · real-bug confidence 20%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-2cf94--in-query-index-and-sitemap-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-2cf94--in-query-index-and-sitemap-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-021_ja_01.png`

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required"` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Classification: pre-existing (JOB-23-09/10): -form CF title is a dev sample · suspect `data` · cause `none` · real-bug confidence 0%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-df8ef-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-001_ja_01.png`

### DSR-CATOV-021 — DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows expect(received).toHaveLength(expected) ` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:196`
- Classification: pre-existing (JOB-23-10): non-form page in query-index with robots noindex – Expected under review · suspect `test` · cause `none` · real-bug confidence 20%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-88ec1--in-query-index-and-sitemap-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-88ec1--in-query-index-and-sitemap-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-021_ja_01.png`

### DSR-CATOV-001 — DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form"` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Classification: pre-existing (JOB-23-09/10): -form CF title is a dev sample · suspect `data` · cause `none` · real-bug confidence 0%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-7452c-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-001_ja_01.png`

### DSR-CATOV-012 — DSR-CATOV-012 [ja] catalog list card links to the overlay page

- Failing assertion: `Error: card 'QA190 PDF catalog' expect(locator).toBeVisible() failed ` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:275`
- Classification: pre-existing (JOB-23-09/10) · suspect `data` · cause `none` · real-bug confidence 0%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-c09f8-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-012_ja_01.png`

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows expect(received).toHaveLength(expected) ` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:196`
- Classification: pre-existing (JOB-23-10): non-form page in query-index with robots noindex – Expected under review · suspect `test` · cause `none` · real-bug confidence 20%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-432a0--in-query-index-and-sitemap-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-432a0--in-query-index-and-sitemap-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-021_en_01.png`

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required"` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Classification: pre-existing (JOB-23-09/10): -form CF title is a dev sample · suspect `data` · cause `none` · real-bug confidence 0%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-2f7b8-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-001_en_01.png`

### DSR-CATOV-021 — DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in query-index and sitemap

- Failing assertion: `Error: query-index rows expect(received).toHaveLength(expected) ` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:196`
- Classification: pre-existing (JOB-23-10): non-form page in query-index with robots noindex – Expected under review · suspect `test` · cause `none` · real-bug confidence 20%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-1d585--in-query-index-and-sitemap-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-1d585--in-query-index-and-sitemap-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-021_en_01.png`

### DSR-CATOV-001 — DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form"` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:144`
- Classification: pre-existing (JOB-23-09/10): -form CF title is a dev sample · suspect `data` · cause `none` · real-bug confidence 0%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-2b0d7-with-the-catalog-name-shown-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-001_en_01.png`

### DSR-CATOV-012 — DSR-CATOV-012 [en] catalog list card links to the overlay page

- Failing assertion: `Error: card 'QA190 PDF catalog' expect(locator).toBeVisible() failed ` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:275`
- Classification: pre-existing (JOB-23-09/10) · suspect `data` · cause `none` · real-bug confidence 0%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium/test-failed-1.png`, `test-results/catalog-overlay-DSR-654.ca-3ced6-d-links-to-the-overlay-page-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-CATOV-012_en_01.png`

### DSR-ECO-005 — DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary

- Failing assertion: `Error: tag label expect(locator).not.toBeEmpty() failed ` — `tests/eco-products/DSR-590.eco-products.spec.ts:189`
- Classification: pre-existing (IDLE-35/39) · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/eco-products-DSR-590.eco-p-b65d2-e-category-name-and-summary-chromium/test-failed-1.png`, `test-results/eco-products-DSR-590.eco-p-b65d2-e-category-name-and-summary-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ECO-005_ja_01.png`

### DSR-ECO-006 — DSR-ECO-006 [ja] free editing area renders between hero and product list

- Failing assertion: `Error: free area text expect(locator).not.toBeEmpty() failed ` — `tests/eco-products/DSR-590.eco-products.spec.ts:230`
- Classification: pre-existing (IDLE-35/39) · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/eco-products-DSR-590.eco-p-700c9-tween-hero-and-product-list-chromium/test-failed-1.png`, `test-results/eco-products-DSR-590.eco-p-700c9-tween-hero-and-product-list-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ECO-006_ja_01.png`

### DSR-ICON-006 — DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `Error: console errors expect(received).toEqual(expected) // deep equality ` — `tests/icons/DSR-589.icons.spec.ts:107`
- Classification: pre-existing (IDLE-35/39): console "Failed to load resource" · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium/test-failed-1.png`, `test-results/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ICON-006_ja_01.png`

### DSR-ICON-006 — DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `Error: console errors expect(received).toEqual(expected) // deep equality ` — `tests/icons/DSR-589.icons.spec.ts:107`
- Classification: pre-existing (IDLE-35/39): console "Failed to load resource" · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium/test-failed-1.png`, `test-results/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-ICON-006_en_01.png`

### DSR-VOV-008 — DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list

- Failing assertion: `Error: video-detail rows expect(received).toEqual(expected) // deep equality ` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:182`
- Classification: pre-existing (JOB-23-09/10): row-set vs "single row" · suspect `test` · cause `none` · real-bug confidence 10%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium/test-failed-2.png`, `test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium-retry1/test-failed-1.png`, `test-results/movie-detail-DSR-587.movie-43f53--browser-sent-to-movie-list-chromium-retry1/test-failed-2.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-VOV-008_en_01.png`

### DSR-VOV-011 — DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail)

- Failing assertion: `Error: list block expect(locator).toHaveCount(expected) failed ` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:210`
- Classification: NEW FAIL – transient (05:18–05:19Z /en/library/video/search rendered "Unable to load video information."; recheck 05:30Z pass) · suspect `env` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium/test-failed-1.png`, `test-results/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-VOV-011_en_01.png`

### DSR-VOV-013 — DSR-VOV-013 [en] movie list shows standard movies only

- Failing assertion: `Error: first list card (main-frame navigations: 1) expect(received).toBe(expected) // Object.is equality ` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:239`
- Classification: NEW FAIL – transient, same window/page as VOV-011 en; recheck 05:30Z pass · suspect `env` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/movie-detail-DSR-587.movie-1f34b--shows-standard-movies-only-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-587.movie-1f34b--shows-standard-movies-only-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-VOV-013_en_01.png`

### DSR-PLSP-002 — DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality ` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PLSP-002_ja_01.png`

### DSR-PLSP-003 — DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — `n/a`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PLSP-003_ja_01.png`

### DSR-PLSP-005 — DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Test timeout of 30000ms exceeded.` — `n/a`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PLSP-005_ja_01.png`

### DSR-PLSP-002 — DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality ` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PLSP-002_en_01.png`

### DSR-PLSP-003 — DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — `n/a`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PLSP-003_en_01.png`

### DSR-PLSP-005 — DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Test timeout of 30000ms exceeded.` — `n/a`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PLSP-005_en_01.png`

### DSR-PRODLIST-001 — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `Error: 375: distinct column offsets expect(received).toBe(expected) // Object.is equality ` — `tests/product-list/DSR-583.product-list.spec.ts:33`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PRODLIST-001_ja_01.png`

### DSR-PRODLIST-002 — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `Error: 320: distinct column offsets expect(received).toBe(expected) // Object.is equality ` — `tests/product-list/DSR-583.product-list.spec.ts:33`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PRODLIST-002_ja_01.png`

### DSR-PRODLIST-003 — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `Error: open: distinct column offsets expect(received).toBe(expected) // Object.is equality ` — `tests/product-list/DSR-583.product-list.spec.ts:70`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PRODLIST-003_ja_01.png`

### DSR-PRODLIST-004 — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `Error: 1440: distinct column offsets expect(received).toBe(expected) // Object.is equality ` — `tests/product-list/DSR-583.product-list.spec.ts:153`
- Classification: pre-existing (IDLE-35/39): column-offset/timeout · suspect `test` · cause `none` · real-bug confidence 30%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-PRODLIST-004_ja_01.png`

### DSR-TOP-004 — DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality ` — `tests/top/DSR-609.top.spec.ts:40`
- Classification: pre-existing (IDLE-35/39) · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-TOP-004_ja_01.png`

### DSR-TOP-005 — DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).toBe(expected) // Object.is equality ` — `tests/top/DSR-609.top.spec.ts:83`
- Classification: pre-existing (IDLE-35/39) · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-TOP-005_ja_01.png`

### DSR-TOP-006 — DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /ja/news/query-index.json expect(received).toContain(expected) // indexOf ` — `tests/top/DSR-609.top.spec.ts:124`
- Classification: pre-existing (IDLE-35/39) · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-TOP-006_ja_01.png`

### DSR-TOP-007 — DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected) ` — `tests/top/DSR-609.top.spec.ts:160`
- Classification: pre-existing (IDLE-35/39) · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-TOP-007_ja_01.png`

### DSR-TOP-004 — DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality ` — `tests/top/DSR-609.top.spec.ts:40`
- Classification: pre-existing (IDLE-35/39) · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium-retry1/test-failed-1.png` · committed copy: `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/DSR-TOP-004_en_01.png`

### DSR-TOP-005 — DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).toBe(expected) // Object.is equality ` — `tests/top/DSR-609.top.spec.ts:83`
- Classification: pre-existing (IDLE-35/39) · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 — DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /en/news/query-index.json expect(received).toContain(expected) // indexOf ` — `tests/top/DSR-609.top.spec.ts:124`
- Classification: pre-existing (IDLE-35/39) · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 — DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected) ` — `tests/top/DSR-609.top.spec.ts:160`
- Classification: pre-existing (IDLE-35/39) · suspect `product` · cause `none` · real-bug confidence 40%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-014 — DSR-MOVIE-014 [en] embeds the configured YouTube movie

- Failing assertion: `Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-player-facade') Expected: visible` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:36`
- Classification: pre-existing (IDLE-39): legacy DSR-173 test page · suspect `data` · cause `none` · real-bug confidence 20%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/movie-detail-DSR-173.movie-570d4-he-configured-YouTube-movie-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-570d4-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-026 — DSR-MOVIE-026 displays related thumbnails, types, tags and valid links

- Failing assertion: `Error: Related card 1 thumbnail expect(locator).toBeVisible() failed ` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:151`
- Classification: known bug DSR-538 (@known-bug-DSR-538) · suspect `product` · cause `none` · real-bug confidence 60%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-033 — DSR-MOVIE-033 displays component sections in vertical order on PC

- Failing assertion: `Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-player') Expected: visible` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:213`
- Classification: pre-existing (IDLE-39): legacy DSR-173 test page · suspect `data` · cause `none` · real-bug confidence 20%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium-retry1/test-failed-1.png`

### DSR-501-P3 — DSR-501-P3 [en] related movies are limited to 5 in authored order

- Failing assertion: `Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-related-content') Expected: visible` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:280`
- Classification: pre-existing in this spec (IDLE-30/35/39): qa501-* not re-seeded after overlay merge; the JOB-23-09 pass is the overlay-retest spec (same TC ID, out of regression scope) · suspect `data` · cause `none` · real-bug confidence 10%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium-retry1/test-failed-1.png`

### DSR-501-P2 — DSR-501-P2 [en] unavailable related movie is not displayed

- Failing assertion: `Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-related-content') Expected: visible` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:287`
- Classification: pre-existing in this spec (IDLE-30/35/39): qa501-* not re-seeded after overlay merge; the JOB-23-09 pass is the overlay-retest spec (same TC ID, out of regression scope) · suspect `data` · cause `none` · real-bug confidence 10%
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium-retry1/test-failed-1.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**. Group B overwrote the group A `test-results/` folder. The agent copied the group A files to a temporary folder outside the repo first; that copy does not persist. Committed first-attempt PNGs for 35 of the 43 failing TC/lang pairs (≤ 5 MB cap) are under `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/evidence/`. The 8 pairs without a committed PNG are DSR-501-P2/P3 en, MOVIE-014 en, MOVIE-026, MOVIE-033 and TOP-005/006/007 en, all pre-existing.

## 7. Open points for QA

- **VOV-011/013 en (NEW FAIL, transient):** at 05:18:55–05:19:24Z `/en/library/video/search` returned 200 but rendered the video-detail error "Unable to load video information." with no `.listing` block, on both attempts. A static HTML fetch and a recheck at 05:30Z were OK (2/2 pass). ja VOV-011 passed at the same time. Possible links: in-flight DSR-669/671 CF migration/republish (CHANGES.md row `pending`, announced for this window) or a DSR-665-like regression (search path treated as a video id). Neither was verified. Real-bug confidence 30%.
- **TC ID collision:** DSR-501-P2/P3 [en] exist in `DSR-173.movie-detail.spec.ts` (legacy qa501 pages, failing since IDLE-30) and in `DSR-587.overlay-retest-DSR-647.spec.ts` (passed in JOB-20261023-09). The ledger key `<TC> [<lang>]` cannot tell them apart. I classed this as pre-existing, not NEW FAIL.
- **Ledger:** TC/lang keys with several sub-cases (e.g. CATOV-001 ×2 catalogs, ×2 viewports) are collapsed worst-case. Tests without a language tag use `[-]`. "Previous result" was read from `results/*/DEV/automation-run-*.md` (Run start header, or git commit time when the header is missing) and `ykk-dsr/hub/results/*/result.json` (`started`). The markdown table parsing is heuristic.
- **Path assumption:** the ledger is at `ykk-dsr/hub/results/REGRESSION/ledger.json` (hub, README §5 and hub AGENTS exception). This run report is at project-root `results/REGRESSION/DEV/` (job step 3). Older idle reports use lowercase `results/regression/DEV/`.
- **Not done:** fail causes were not re-investigated beyond the earlier job notes (pre-existing fails keep their suspect from JOB-09/10/IDLE-39). The build/deploy identity was not verified. No AEM writes; read-only.
