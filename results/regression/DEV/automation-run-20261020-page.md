# regression DEV automation run — 20261020-page

Job: `JOB-20261019-05` (post-merge overlay regression, run-only, read-only). Run 2 of 2: EDS `main` on **.aem.page** (preview); the other host is in `results/regression/DEV/automation-run-20261020.md`. Comparison baseline: JOB-ZZ-IDLE-07 (`results/regression/DEV/automation-run-20261017.md`, .aem.live, 2026-10-19).

## 1. Header

- Run start (UTC): 2026-10-20T01:36:18Z (tsc check ~2026-10-20T01:10Z, before run 1)
- Run end (UTC): 2026-10-20T01:51:35Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page (BASE_URL overridden on the command line; dotenv reported `injected env (0)`, so the override was kept)
- Target page(s): all pages used by existing specs (DSR-173/501/587 movie, DSR-227 assets, DSR-433 mail, DSR-529 article, DSR-552 breadcrumb, DSR-557 catalog/video, DSR-566 news, DSR-570 catalog download, DSR-583 product list, DSR-586 product detail, DSR-589 icons, DSR-590 eco products, DSR-609 top, smoke). Specs with a hard-coded host still hit Martin's branch `dsr-productdetail-moustache--…aem.page`: DSR-587.overlay-retest-DSR-647 (fixtures/dsr-501.ts `overlayBase`) and the DSR-227 fallback (fixtures/dsr-227.ts `fallbackBase`).
- Build under test: not independently verified. EDS `main` after the overlay PR merge (DSR-PRODUCTDETAIL-moustache), per Martin DSR-647 comment 61460 as quoted in the job. Preflight 2026-10-20T01:10Z: `/en/library/video/qa501-main-a` = 200 on main .aem.page, 404 on main .aem.live.
- Baseline ID: per US as recorded in `docs/<US>/` (DSR-173: BL-v1; overlay: BL-OVL-1 / overlay-data-flow-BL update 2026-10-19); not re-verified in this run
- Automation HEAD commit SHA: 948977d09df11af9a0325a008437eecccf1a13df
- Exact command used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j05-page.json npm run test:dev -- --project=chromium --output=test-results/j05-page
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run once at HEAD before run 1; no code changed between runs)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 333 | 112 | 53 | 168 | 1 | 2 | configured 1; 53 tests retried | 15m 17s (Playwright 15.2m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: full suite, chromium project only (same scope as the baseline). The firefox/webkit projects (DSR-BREAD-032 only) were not run. Flaky: 0.
An earlier attempt at run 1 (started 2026-10-20T01:10:35Z) was killed by the agent's 10-minute shell limit after 267 of 333 tests. Its output was discarded and it is not counted here.

### Changes vs baseline JOB-ZZ-IDLE-07

| Spec | Test | Before | Now | Class | Note |
|---|---|---|---|---|---|
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-007 [ja] info bar date = meta published-date | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | skip | pass | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-007 [en] info bar date = meta published-date | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | skip | pass | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | skip | pass | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | skip | pass | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | skip | fail | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | skip | pass | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| article-detail/DSR-529.article-detail.spec.ts | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | skip | pass | test | spec/fixture rewritten after baseline (d55d17e, JOB-20261019-02: fixture switched to /master/{lang}/library/article/stories, test-space fallback removed); same results as JOB-20261019-02 |
| catalog-detail/DSR-570.visual.spec.ts | DSR-CATDL-014 [ja] capture catalog download form at 1440px | fail | pass | test | baseline was a 30 s timeout / flaky; spec unchanged since baseline, cause of the change not verified (catalog, not in this merge) |
| catalog-detail/DSR-570.visual.spec.ts | DSR-CATDL-015 [ja] capture catalog download form at 375px | flaky | pass | test | baseline was a 30 s timeout / flaky; spec unchanged since baseline, cause of the change not verified (catalog, not in this merge) |
| catalog-video/DSR-557.catalog-video.spec.ts | DSR-CATV-016 e-book item opens ebookUrl without form | fail | pass | test | spec changed after baseline (8f07f8e, JOB-20261019-01) |
| catalog-video/DSR-557.catalog-video.spec.ts | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | fail | pass | test | spec changed after baseline (8f07f8e, JOB-20261019-01) |
| catalog-video/DSR-557.catalog-video.spec.ts | DSR-CATV-016 e-book item opens ebookUrl without form | fail | pass | test | spec changed after baseline (8f07f8e, JOB-20261019-01) |
| catalog-video/DSR-557.catalog-video.spec.ts | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | fail | pass | test | spec changed after baseline (8f07f8e, JOB-20261019-01) |
| movie-detail/DSR-587.movie-overlay.spec.ts | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | fail | pass | merge-expected | /{lang}/library/video/search now 200 on main .aem.page (still 404 on .aem.live); fail→pass, not a regression |
| movie-detail/DSR-587.movie-overlay.spec.ts | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | fail | pass | merge-expected | /{lang}/library/video/search now 200 on main .aem.page (still 404 on .aem.live); fail→pass, not a regression |
| movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts | DSR-501-P2 [en] unavailable related movie is not displayed | fail | pass | test | spec changed after baseline (8f07f8e, JOB-20261019-01); still targets branch host dsr-productdetail-moustache, not main |

Tests not in the baseline (specs added after 2026-10-19 05:00Z): 63: article-detail/DSR-529.visual-capture.spec.ts pass=6, asset-migration/DSR-227.asset-migration.spec.ts skip=17, eco-products/DSR-590.eco-products.spec.ts fail=2, eco-products/DSR-590.eco-products.spec.ts pass=4, eco-products/DSR-590.eco-products.spec.ts skip=13, eco-products/DSR-590.stable-capture.spec.ts pass=2, eco-products/DSR-590.visual-capture.spec.ts pass=2, icons/DSR-589.icons.spec.ts fail=2, icons/DSR-589.icons.spec.ts skip=13, mail/DSR-433.mail-endpoints.spec.ts pass=2.

## 4. Executed tests

Duration is summed over attempts. Previous = result in the baseline JOB-ZZ-IDLE-07 (`new` = not in baseline).

| TC ID | Title | Result | Duration | Previous | One-line failure reason |
|---|---|---|---|---|---|
| DSR-ARTICLE-002 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | failed | 14.3s | skip | Error: required blocks missing |
| DSR-ARTICLE-003 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | failed | 5.6s | skip | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-006 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | failed | 16.5s | skip | Error: tag labels |
| DSR-ARTICLE-007 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [ja] info bar date = meta published-date | failed | 17.0s | skip | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-008 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | passed | 8.1s | skip | — |
| DSR-ARTICLE-010 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible | failed | 16.6s | skip | Error: published-date count |
| DSR-ARTICLE-011 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 5.9s | skip | Error: absolute URL |
| DSR-ARTICLE-012 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | failed | 6.0s | skip | Error: category tag IDs |
| DSR-ARTICLE-013 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | failed | 5.9s | skip | Error: item 1 = qa529-r1 |
| DSR-ARTICLE-014 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | failed | 7.4s | skip | Error: published-date count |
| DSR-ARTICLE-016 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 7.2s | skip | Error: qa529-01 robots |
| DSR-ARTICLE-024 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | failed | 5.3s | skip | Error: viewAllStories href |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | failed | 26.4s | skip | Error: expect(locator).toHaveText(expected) failed |
| DSR-ARTICLE-002 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | failed | 18.9s | skip | Error: required blocks missing |
| DSR-ARTICLE-003 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | failed | 18.6s | skip | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-006 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | failed | 15.5s | skip | Error: tag labels |
| DSR-ARTICLE-007 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [en] info bar date = meta published-date | failed | 17.0s | skip | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-008 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | passed | 7.6s | skip | — |
| DSR-ARTICLE-010 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible | failed | 16.6s | skip | Error: published-date count |
| DSR-ARTICLE-011 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 16.9s | skip | Error: absolute URL |
| DSR-ARTICLE-012 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | failed | 16.4s | skip | Error: category tag IDs |
| DSR-ARTICLE-013 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | failed | 16.6s | skip | Error: item 1 = qa529-r1 |
| DSR-ARTICLE-014 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | failed | 18.7s | skip | Error: published-date count |
| DSR-ARTICLE-016 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 16.1s | skip | Error: qa529-01 robots |
| DSR-ARTICLE-024 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | failed | 15.1s | skip | Error: viewAllStories href |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | failed | 23.5s | skip | Error: expect(locator).toHaveText(expected) failed |
| DSR-ARTICLE-015 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | passed | 9.0s | skip | — |
| DSR-ARTICLE-020 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | passed | 8.5s | skip | — |
| DSR-ARTICLE-023 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | failed | 15.7s | skip | Error: visible related items heading |
| DSR-ARTICLE-025 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | passed | 7.7s | skip | — |
| DSR-ARTICLE-009 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | passed | 9.4s | skip | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [ja] qa529-01 1440x900 capture only | passed | 11.6s | new | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [ja] qa529-01 390x844 capture only | passed | 3.7s | new | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [en] qa529-01 1440x900 capture only | passed | 4.5s | new | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [en] qa529-01 390x844 capture only | passed | 3.2s | new | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [ja] qa529-02 1440x900 capture only | passed | 11.2s | new | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [ja] qa529-02 390x844 capture only | passed | 8.6s | new | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [ja] child trail follows URL hierarchy | passed | 2.2s | pass | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | passed | 2.3s | pass | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [ja] ancestor links navigate in same tab | passed | 5.5s | pass | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [ja] items equal page titles | passed | 2.1s | pass | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [en] child trail follows URL hierarchy | passed | 2.3s | pass | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | passed | 5.3s | pass | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [en] ancestor links navigate in same tab | passed | 8.5s | pass | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [en] items equal page titles | passed | 5.7s | pass | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 4.7s | pass | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-002 ancestor links | passed | 13.1s | pass | — |
| DSR-BREAD-003 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-003 current page is not linked | passed | 4.6s | pass | — |
| DSR-BREAD-004 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-004 HOME label and destination | passed | 4.4s | pass | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 4.4s | pass | — |
| DSR-BREAD-006 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-006 parent trail | passed | 4.6s | pass | — |
| DSR-BREAD-007 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-007 missing intermediate page | passed | 4.5s | pass | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 3.4s | pass | — |
| DSR-BREAD-009 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-009 404 excludes breadcrumb | passed | 4.2s | pass | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-011 empty label uses title | passed | 4.4s | pass | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 7.0s | pass | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 4.5s | pass | — |
| DSR-BREAD-027 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-027 semantic markup and accessibility | passed | 5.8s | pass | — |
| DSR-BREAD-028 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-028 keyboard navigation | passed | 5.5s | pass | — |
| DSR-BREAD-031 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-031 site-origin console errors | passed | 4.6s | pass | — |
| DSR-BREAD-035 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-035 arrow asset origin and status | passed | 5.5s | pass | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 4.3s | pass | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 4.5s | pass | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 3.9s | pass | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 4.3s | pass | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 4.5s | pass | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [ja] display name overrides page title | passed | 8.3s | pass | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [en] display name overrides page title | passed | 7.7s | pass | — |
| DSR-BREAD-014 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-014 [ja] 100-character display name keeps layout | passed | 9.2s | pass | — |
| DSR-BREAD-015 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-015 [ja] special characters in display name are plain text | passed | 7.2s | pass | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [ja] each language uses its own display names | passed | 5.3s | pass | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [en] each language uses its own display names | passed | 5.3s | pass | — |
| DSR-BREAD-020 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-020 PC breadcrumb baseline | passed | 4.6s | pass | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline | passed | 4.5s | pass | — |
| DSR-CATDL-014 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-014 [ja] capture catalog download form at 1440px | passed | 3.5s | fail | — |
| DSR-CATDL-015 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-015 [ja] capture catalog download form at 375px | passed | 2.7s | flaky | — |
| DSR-CATDL-001 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-001 [ja] catalog detail header renders | passed | 2.8s | pass | — |
| DSR-CATDL-002 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 2.7s | pass | — |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 5.8s | pass | — |
| DSR-CATDL-018 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | passed | 4.1s | pass | — |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 4.4s | pass | — |
| DSR-CATDL-018 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | passed | 4.1s | pass | — |
| DSR-CATDL-003 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 2.7s | pass | — |
| DSR-CATDL-007 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | 16.6s | fail | Error: gated PDF URL delivered to the browser before submit |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 7.4s | pass | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 8.4s | pass | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 6.0s | fail | — |
| DSR-CATV-017 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | passed | 5.9s | fail | — |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 3.6s | pass | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 3.0s | pass | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 3.3s | pass | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click | passed | 5.6s | pass | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 4.6s | pass | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) | passed | 3.9s | pass | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 6.1s | pass | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 7.9s | pass | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 9.7s | pass | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 7.3s | fail | — |
| DSR-CATV-017 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | passed | 6.6s | fail | — |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 3.8s | pass | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 3.8s | pass | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 4.2s | pass | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click | passed | 7.2s | pass | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 5.3s | pass | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) | passed | 2.5s | pass | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 3.2s | pass | — |
| DSR-ECO-001 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | passed | 6.0s | new | — |
| DSR-ECO-002 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language) | failed | 10.4s | new | Error: VIEW MORE not on site with same language prefix |
| DSR-ECO-004 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200) | failed | 5.2s | new | Error: finder URL (P087), same language |
| DSR-ECO-003 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | passed | 14.1s | new | — |
| DSR-ECO-012 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | passed | 1.6s | new | — |
| DSR-ECO-013 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | passed | 1.9s | new | — |
| DSR-ECO-014 | `eco-products/DSR-590.stable-capture.spec.ts` › DSR-ECO-014 [ja] stable PC initial, Next, dot 5 and fullPage captures | passed | 10.8s | new | — |
| DSR-ECO-016 | `eco-products/DSR-590.stable-capture.spec.ts` › DSR-ECO-016 [ja] stable SP initial and swipe captures | passed | 6.3s | new | — |
| DSR-ECO-014 | `eco-products/DSR-590.visual-capture.spec.ts` › DSR-ECO-014 [ja] PC carousel visual capture and measurements | passed | 6.1s | new | — |
| DSR-ECO-016 | `eco-products/DSR-590.visual-capture.spec.ts` › DSR-ECO-016 [ja] SP capture, horizontal overflow and carousel interaction facts | passed | 5.9s | new | — |
| DSR-ICON-006 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed | 9.0s | new | Error: console errors |
| DSR-ICON-006 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed | 9.3s | new | Error: console errors |
| DSR-MAIL-016 | `mail/DSR-433.mail-endpoints.spec.ts` › DSR-MAIL-016 [—] webhook GET without auth is refused | passed | 0.5s | new | — |
| DSR-MAIL-017 | `mail/DSR-433.mail-endpoints.spec.ts` › DSR-MAIL-017 [—] test-send GET without params or auth is not public | passed | 0.4s | new | — |
| DSR-501-P3 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P3 [en] related movies are limited to 5 in authored order | failed | 19.5s | fail | Error: expect(locator).toBeVisible() failed |
| DSR-501-P2 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | failed | 18.6s | fail | Error: expect(locator).toBeVisible() failed |
| DSR-MOVIE-012 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-012 displays the exact movie title | passed | 1.3s | pass | — |
| DSR-MOVIE-014 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-014 embeds the configured YouTube movie | failed | 13.4s | fail | Error: expect(locator).toHaveAttribute(expected) failed |
| DSR-MOVIE-036 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-036 no site-origin console errors on the movie component page | passed | 1.7s | pass | — |
| DSR-MOVIE-026 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | failed | 16.1s | fail | Error: Related card 1 thumbnail |
| DSR-MOVIE-027 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-027 outputs exactly one title and og:title | passed | 1.0s | pass | — |
| DSR-MOVIE-029 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | passed | 1.5s | pass | — |
| DSR-MOVIE-033 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-033 displays component sections in vertical order on PC | failed | 13.2s | fail | Error: expect(locator).toBeVisible() failed |
| DSR-MOVIE-034 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-034 displays the component back control | passed | 3.6s | pass | — |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed | 3.0s | fail | — |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | passed | 1.8s | fail | — |
| DSR-501-P2 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | passed | 2.2s | fail | — |
| DSR-NEWS-001 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-001 [en] page shows date, category, title and body | passed | 3.2s | pass | — |
| DSR-NEWS-002 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list | failed | 3.8s | fail | Error: required elements missing |
| DSR-NEWS-003 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [en] shown date equals meta publish date | failed | 4.1s | fail | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-NEWS-004 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-004 [en] category and title are non-empty text | passed | 1.6s | pass | — |
| DSR-NEWS-006 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | failed | 13.4s | fail | Error: Back to list link |
| DSR-NEWS-007 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | failed | 4.3s | fail | Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json |
| DSR-NEWS-009 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-009 [en] no related-content block | passed | 1.5s | pass | — |
| DSR-NEWS-010 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | passed | 2.0s | pass | — |
| DSR-NEWS-012 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | failed | 28.2s | fail | Error: My List button |
| DSR-NEWS-013 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | passed | 5.9s | pass | — |
| DSR-NEWS-018 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [en] title, description and og tags non-empty | failed | 18.8s | fail | Error: meta[name="description"] |
| DSR-PRODLIST-001 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | failed | 4.4s | fail | Error: TD-583-01 ≥ 6 products |
| DSR-PRODLIST-002 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed | 20.0s | fail | Error: 320: distinct column offsets |
| DSR-PRODLIST-003 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | failed | 18.1s | fail | Error: open: distinct column offsets |
| DSR-PRODLIST-004 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed | 20.9s | fail | Error: 1440: distinct column offsets |
| SMOKE-001 | `smoke.spec.ts` › SMOKE-001 DSR-173 test page is reachable | passed | 1.9s | pass | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | failed | 14.6s | fail | Error: text/background colour changes on hover |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 8.6s | fail | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | failed | 8.0s | fail | Error: page requests /ja/news/query-index.json |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 6.8s | fail | Error: SP item 1 title lines ≤ 1 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [ja] NEWS with empty query-index renders without error | passed | 3.5s | pass | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [ja] main visual image is eager and is the LCP element | passed | 4.1s | pass | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | failed | 6.3s | fail | Error: text/background colour changes on hover |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 7.5s | fail | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | failed | 7.8s | fail | Error: page requests /en/news/query-index.json |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 6.3s | fail | Error: SP item 1 title lines ≤ 1 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [en] NEWS with empty query-index renders without error | passed | 3.1s | pass | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [en] main visual image is eager and is the LCP element | passed | 3.8s | pass | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | passed | 8.5s | pass | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | passed | 7.8s | pass | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] PC full-page capture and horizontal overflow | passed | 8.9s | pass | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] SP full-page capture and horizontal overflow | passed | 7.7s | pass | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-026 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-026 [ja] stories query-index contains qa529-01 with 6 properties | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-026 [en] stories query-index contains qa529-01 with 6 properties | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |
| DSR-ARTICLE-001 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-001 [ja] page creation with article template (Author, BAC#1) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-004 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-004 [ja] article-specific info not editable in body (Author, BAC#5) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-005 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-005 [ja] author-editable areas 4/5/6/9/11 (Author, BAC#1) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-021 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-021 [ja] related stories picker max 3, stories only (Author) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-032 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-032 [ja] required page properties validation (Author, negative) | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-030 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-030 [ja] visual PC 1440 vs Figma | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-031 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-031 [ja] visual SP 390 vs Figma | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-017 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-017 [ja] related stories cards r1..r3 (block 12) | Blocked: Stories index not on DEV yet – Martin prereq #1 (helix-query.yaml) / Q7 |
| DSR-ARTICLE-018 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-018 [ja] related stories NEW icon on r1 only | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; NEW period Q6 |
| DSR-ARTICLE-019 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-019 [ja] related stories max 3, missing path skipped (qa529-04) | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; TD-529-04 not seeded |
| DSR-ARTICLE-022 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-022 [ja] related items cards from product index (block 13) | Blocked: 製品index relatedArticles/sortOrder not defined – 製品詳細 ticket (Martin prereq #3) |
| DSR-ARTICLE-027 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-027 [ja] published article appears in article list | Blocked: Article list DSR-170 (out of scope) + stories index |
| DSR-ARTICLE-028 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-028 [ja] breadcrumb on article page | Blocked: Martin open decision #4 (breadcrumb in scope?) + DSR-552 – Q9 |
| DSR-ARTICLE-029 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [cn] language page (cn) | Blocked: no /master/cn on DEV (Issue #18) – all cn rows |
| DSR-ASSET-003 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-003 [ja] migrated asset paths after the DAM root use lowercase letters, digits and hyphens only | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-009 [ja] product page images load from the new DAM (naturalWidth > 0, 200, no legacy/sample path) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-010 [ja] product PDFs open from the new DAM (200, application/pdf, size > 0, naming rule) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-012 [ja] main image: SP (375, DPR 2) rendition smaller than PC (1440, DPR 1) and not upscaled | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-013 [ja] .webp-source image displays in Chromium and WebKit (naturalWidth > 0, 200, image content-type) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-014 [ja] migrated assets are reachable without login (fresh context, 200) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-015 [ja] migrated content images keep a non-empty alt | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-016 [ja] no asset response >= 400 on DEV product pages (query-index, max 50) | blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-003 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-003 [en] migrated asset paths after the DAM root use lowercase letters, digits and hyphens only | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-009 [en] product page images load from the new DAM (naturalWidth > 0, 200, no legacy/sample path) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-010 [en] product PDFs open from the new DAM (200, application/pdf, size > 0, naming rule) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-012 [en] main image: SP (375, DPR 2) rendition smaller than PC (1440, DPR 1) and not upscaled | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-013 [en] .webp-source image displays in Chromium and WebKit (naturalWidth > 0, 200, image content-type) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-014 [en] migrated assets are reachable without login (fresh context, 200) | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-015 [en] migrated content images keep a non-empty alt | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-016 [en] no asset response >= 400 on DEV product pages (query-index, max 50) | blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-017 — `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-017 [ja+en] same product uses the same DAM image paths in ja and en | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-BREAD-001 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | cn: no /master/cn (Issue #18) |
| DSR-BREAD-018 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [cn] each language uses its own display names | cn: no /master/cn (Issue #18) |
| DSR-BREAD-019 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-019 Japanese and Chinese fonts | DSR-555 + cn |
| DSR-BREAD-021 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-021 SP breadcrumb and back control | DSR-575 Q5 (SP display) |
| DSR-BREAD-022 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-022 SP parent navigation | DSR-575 Q5 (SP display) |
| DSR-BREAD-023 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-023 narrow SP overflow | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-029 STG Lighthouse performance | Run on STG (Lighthouse) |
| DSR-BREAD-030 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-030 movie breadcrumb regression | DSR-536 / movie-detail placement |
| DSR-BREAD-033 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-033 all page types | Layout tickets |
| DSR-BREAD-034 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-034 responsive movie back control | DSR-536 / movie-detail placement |
| DSR-CATDL-006 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/ja/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15: demo page is layout only, not bound to catalog CF) |
| DSR-CATDL-001 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-001 [en] catalog detail header renders | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-002 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-002 [en] download form fields, labels, consent and button present | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-006 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [en] requiresForm=true card leads to the download form | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/en/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15: demo page is layout only, not bound to catalog CF) |
| DSR-CATDL-010 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-010 [ja] catalog ID handed to the form | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/ja/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15) + HubSpot EX-06/EX-07 |
| DSR-CATDL-017 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form | no catalog-ID mechanism on DEV yet: "QA190 PDF form required" card not rendered; demo form page is not bound to a CF (Ngoc 10/15) |
| DSR-CATDL-016 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-016 [en] fixed texts translated (no Japanese) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-016 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-016 [cn] fixed texts translated (Chinese) | cn: no /master/cn (Issue #18) |
| DSR-ECO-001 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-001 [en] TOP shows one card per category with image, name, and active summary + VIEW MORE | en demo page not on DEV |
| DSR-ECO-002 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-002 [en] each category card VIEW MORE links to its TD-590-02 detail page (200, same language) | en demo page not on DEV |
| DSR-ECO-004 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-004 [en] 環境配慮型製品診断 button links to the product finder (P087, 200) | en demo page not on DEV |
| DSR-ECO-005 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-005 [ja] detail hero shows tag, background image, category name, and summary | DSR-590 page not on DEV |
| DSR-ECO-007 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-007 [ja] detail product list equals the query-index products carrying the eco tag | DSR-590 page not on DEV |
| DSR-ECO-010 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-010 [ja] detail product cards link to /ja/products/{id} with HTTP 200 | DSR-590 page not on DEV |
| DSR-ECO-005 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-005 [en] detail hero shows tag, background image, category name, and summary | DSR-590 page not on DEV |
| DSR-ECO-007 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-007 [en] detail product list equals the query-index products carrying the eco tag | DSR-590 page not on DEV |
| DSR-ECO-010 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-010 [en] detail product cards link to /en/products/{id} with HTTP 200 | DSR-590 page not on DEV |
| DSR-ECO-006 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-006 [ja] free editing area renders between hero and product list | DSR-590 page not on DEV |
| DSR-ECO-009 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-009 [ja] detail with 0 matching products shows no broken list and no error | DSR-590 page not on DEV |
| DSR-ECO-013 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-013 [en] TOP exists with html lang, names in its language, and language-kept internal links | en demo page not on DEV |
| DSR-ECO-013 — `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-013 [cn] TOP and detail exist with html lang and language-kept internal links | cn: no /master/cn on DEV (Issue #18) |
| DSR-ICON-001 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-001 [ja] product detail performance/function icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-002 [ja] product list card icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-003 [ja] condition search option and result icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-004 [ja] no temporary icon (TD-589-06) remains on the target pages | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-001 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-001 [en] product detail performance/function icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-002 [en] product list card icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-003 [en] condition search option and result icons all match the official set (TD-589-04) | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-004 [en] no temporary icon (TD-589-06) remains on the target pages | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-005 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-005 [ja] same function uses the same asset on detail, list card and condition search | Blocked: TD-589-04 official icon list |
| DSR-ICON-007 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-007 [ja] product without function values shows no icon area | blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-008 [ja] maximum number of icons wraps on SP without overflow or overlap | blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-009 [ja] language versions show the same ordered icon set | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 — `icons/DSR-589.icons.spec.ts` › DSR-ICON-009 [en] language versions show the same ordered icon set | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-MOVIE-020 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-020 displays visible related product codes in order | Issue #1: related products specification pending |
| DSR-MOVIE-021 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-021 sorts related content by update date descending | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-023 excludes unavailable and inactive related movies | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-025 navigates the related content carousel to its end | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-028 removes line breaks from description metadata | Description line-break separator is unconfirmed |
| DSR-MOVIE-001 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-001 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-002 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-002 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-003 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-003 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-004 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-004 M: Universal Editor requires IMS login; manual only | M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-005 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-006 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-006 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-007 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-008 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-009 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-010 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-011 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-013 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-013 C: overflow automation deferred; CJK font manual | C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-015 C: iframe source automation deferred; playback manual | C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-016 B: movie-detail-player-video not implemented, DAM test data pending | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-017 B: movie-detail-player-video not implemented, DAM test data pending | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-018 B: test data pending (docs/DSR-173/test-data.md); Issue #12 | B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-019 C: layout automation deferred; in-iframe error manual | C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-022 B: test data pending (docs/DSR-173/test-data.md) | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-024 B: test data pending (docs/DSR-173/test-data.md) | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-030 M: SNS debuggers need login and public URL; manual only | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-031 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-032 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-032 B: ja/zh pages not available | B: ja/zh pages not available |
| DSR-MOVIE-035 — `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-035 B: SP design pending | B: SP design pending |
| DSR-VOV-001 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-001 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-002 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-002 [en] preview-only CF related → 200 on .aem.page, 404 on .aem.live | TD-587-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-preview HTTP 404) |
| DSR-VOV-003 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-003 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-004 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-004 [en] CF related name with uppercase / underscore → 404 | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404 | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .aem.live | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-007 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-007 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-008 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list | TD-587-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-unavail HTTP 404) |
| DSR-VOV-010 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-010 [en] unpublished CF related → 404 on both hosts, absent from query-index | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/tech-talk stays a list page | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/video/tech-talk) |
| DSR-VOV-011 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/tech-talk stays a list page | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/tech-talk) |
| DSR-VOV-011 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [cn] list pages | Issue #18: no /cn path on DEV |
| DSR-VOV-014 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-014 [en] related movies max 5 when 6 are linked | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-015 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | TD-587-15 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-rel-b HTTP 404) |
| DSR-VOV-016 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-016 [en] related contents ordered by update date, newest first | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-017 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-017 [en] DSR-173 Group A page switched to the overlay page | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [ja] language variant: 200, html lang, title | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [en] language variant: 200, html lang, title | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [cn] language variant | Issue #18: no /cn path on DEV |
| DSR-501-P3 — `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P3 [en] related movies are max 5, newest updated first | blocked-data: stale preview, static HTML has fewer relatedMovies rows than query (static HTML 5 relatedMovies rows, query 6; last-modified Fri, 16 Oct 2026 06:43:41 GMT) |
| DSR-NEWS-001 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-001 [ja] page shows date, category, title and body | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-002 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [ja] fixed order date → category → title → body → CTA → Back to list | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-003 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [ja] shown date equals meta publish date | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-004 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-004 [ja] category and title are non-empty text | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-006 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [ja] Back to list href resolves to /ja/news/ | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-007 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [ja] page row in query-index with publishDate/category/tags/template | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-009 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-009 [ja] no related-content block | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-010 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-010 [ja] CTA (Button8) href equals authored URL | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-012 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [ja] My List button and share icons visible and enabled (no click) | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-013 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-013 [ja] body keeps h2/h3, strong, ul/ol, a when present | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-018 — `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [ja] title, description and og tags non-empty | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-PDO-001 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586001 HTTP 404) |
| DSR-PDO-001 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/products/990586001 HTTP 404) |
| DSR-PDO-002 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-003 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586001 HTTP 404) |
| DSR-PDO-003 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/products/990586001 HTTP 404) |
| DSR-PDO-004 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586001 HTTP 404) |
| DSR-PDO-005 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586001 HTTP 404) |
| DSR-PDO-006 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-006 [ja] CF related in subfolder → no page (404) | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-008 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | TD-586-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586008 HTTP 404) |
| DSR-PDO-009 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | TD-586-09 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586009 HTTP 404) |
| DSR-PDO-011 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-012 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/products/990586001 HTTP 404) |
| DSR-PDO-014 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586001 HTTP 404) |
| DSR-PDO-014 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/products/990586001 HTTP 404) |
| DSR-PDO-014 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issue #18) | (no reason given; test.fixme/skip without description) |
| DSR-PDO-017 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-017 [ja] fixed Product CF field set displayed, removed fields absent | DSR-585 項目fix版 field list not in repo (Q27 review open) |
| DSR-PDO-019 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586001 HTTP 404) |
| DSR-PRODLIST-003 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [en] SP column count stays 2 after scroll, load more, filter and 3 reloads | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1): last card = column width, left aligned | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-006 [ja] SP card layout vs Figma 375 frame (visual) | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-006 [en] SP card layout vs Figma 375 frame (visual) | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-007 [ja] Real device iOS Safari / Android Chrome: 2 columns (manual) | Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |

## 6. Failed tests

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. Copies of selected screenshots are in `ykk-dsr/hub/results/JOB-20261019-05/evidence/`.

### DSR-ARTICLE-002 — DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing` — `tests/article-detail/DSR-529.article-detail.spec.ts:42`
- Previous (baseline): skip; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: required blocks missing
expect(received).toEqual(expected) // deep equality
- Expected  - 1
+ Received  + 6
- Array []
+ Array [
+   "subtitle",
+   "articleImage",
+   "description",
+   "relatedStories",
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-003 — DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts:56`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: expect(received).toBe(expected) // Object.is equality
Expected: "QA529 ストーリー詳細テスト"
Received: "QA529 ナビ"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-4cd2c-TD-title-one-h1-title-title-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-4cd2c-TD-title-one-h1-title-title-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-006 — DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels` — `tests/article-detail/DSR-529.article-detail.spec.ts:65`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: tag labels
expect(received).toHaveLength(expected)
Expected length: 2
Received length: 0
Received array:  []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-007 — DSR-ARTICLE-007 [ja] info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts:77`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: expect(received).toBe(expected) // Object.is equality
Expected: null
Received: "2026-10-01"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-86406-ar-date-meta-published-date-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-86406-ar-date-meta-published-date-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-010 — DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:101`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: published-date count
expect(received).toHaveLength(expected)
Expected length: 1
Received length: 0
Received array:  []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-79b36-ach-update-date-not-visible-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-79b36-ach-update-date-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-011 — DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL` — `tests/article-detail/DSR-529.article-detail.spec.ts:116`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: absolute URL
expect(received).toMatch(expected)
Expected pattern: /^https?:\/\//
Received string:  "/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-012 — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs` — `tests/article-detail/DSR-529.article-detail.spec.ts:132`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: category tag IDs
expect(received).toHaveLength(expected)
Expected length: 2
Received length: 0
Received array:  []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-b3344-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-b3344-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-013 — DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order

- Failing assertion: `Error: item 1 = qa529-r1` — `tests/article-detail/DSR-529.article-detail.spec.ts:146`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: item 1 = qa529-r1
expect(received).toMatch(expected)
Expected pattern: /\/qa529-r1(\.html)?$/
Received string:  "qa529-r1"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-829ce-d-stories-r1-r2-r3-in-order-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-829ce-d-stories-r1-r2-r3-in-order-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-014 — DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:157`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: published-date count
expect(received).toHaveLength(expected)
Expected length: 1
Received length: 0
Received array:  []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-162e5-gory-exactly-once-non-empty-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-162e5-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-016 — DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots` — `tests/article-detail/DSR-529.article-detail.spec.ts:171`
- Previous (baseline): skip; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: qa529-01 robots
expect(received).not.toMatch(expected)
Expected pattern: not /noindex/i
Received string:      "noindex, nofollow"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-024 — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href` — `tests/article-detail/DSR-529.article-detail.spec.ts:190`
- Previous (baseline): skip; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: viewAllStories href
expect(received).not.toMatch(expected)
Expected pattern: not /^(#?)$/
Received string:      "#"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-029 — DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/article-detail/DSR-529.article-detail.spec.ts:223`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main').locator('h1').first()
Expected: "QA529 ストーリー詳細テスト"
Received: "QA529 ナビ"
Timeout:  5000ms
Call log:
  - Expect "soft toHaveText" locator('main').locator('h1').first() with timeout 5000ms
  - waiting for locator('main').locator('h1').first()
    14 × locator resolved to <h1 class="article-title-heading">QA529 ナビ</h1>
       - unexpected value "QA529 ナビ"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-04322-info-bar-in-ja-html-lang-ja-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-04322-info-bar-in-ja-html-lang-ja-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-002 — DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing` — `tests/article-detail/DSR-529.article-detail.spec.ts:42`
- Previous (baseline): skip; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: required blocks missing
expect(received).toEqual(expected) // deep equality
- Expected  - 1
+ Received  + 6
- Array []
+ Array [
+   "subtitle",
+   "articleImage",
+   "description",
+   "relatedStories",
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-003 — DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts:56`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: expect(received).toBe(expected) // Object.is equality
Expected: "QA529 Story detail test"
Received: "QA529 Nav"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-fc143-TD-title-one-h1-title-title-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-fc143-TD-title-one-h1-title-title-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-006 — DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels` — `tests/article-detail/DSR-529.article-detail.spec.ts:65`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: tag labels
expect(received).toHaveLength(expected)
Expected length: 2
Received length: 0
Received array:  []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-007 — DSR-ARTICLE-007 [en] info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts:77`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: expect(received).toBe(expected) // Object.is equality
Expected: null
Received: "2026-10-01"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-7079a-ar-date-meta-published-date-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-7079a-ar-date-meta-published-date-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-010 — DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:101`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: published-date count
expect(received).toHaveLength(expected)
Expected length: 1
Received length: 0
Received array:  []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-11a6e-ach-update-date-not-visible-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-11a6e-ach-update-date-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-011 — DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL` — `tests/article-detail/DSR-529.article-detail.spec.ts:116`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: absolute URL
expect(received).toMatch(expected)
Expected pattern: /^https?:\/\//
Received string:  "/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-012 — DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs` — `tests/article-detail/DSR-529.article-detail.spec.ts:132`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: category tag IDs
expect(received).toHaveLength(expected)
Expected length: 2
Received length: 0
Received array:  []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-b15c5-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-b15c5-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-013 — DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order

- Failing assertion: `Error: item 1 = qa529-r1` — `tests/article-detail/DSR-529.article-detail.spec.ts:146`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: item 1 = qa529-r1
expect(received).toMatch(expected)
Expected pattern: /\/qa529-r1(\.html)?$/
Received string:  "qa529-r1"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-d97de-d-stories-r1-r2-r3-in-order-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-d97de-d-stories-r1-r2-r3-in-order-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-014 — DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts:157`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: published-date count
expect(received).toHaveLength(expected)
Expected length: 1
Received length: 0
Received array:  []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-401db-gory-exactly-once-non-empty-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-401db-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-016 — DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots` — `tests/article-detail/DSR-529.article-detail.spec.ts:171`
- Previous (baseline): skip; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: qa529-01 robots
expect(received).not.toMatch(expected)
Expected pattern: not /noindex/i
Received string:      "noindex, nofollow"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-024 — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href` — `tests/article-detail/DSR-529.article-detail.spec.ts:190`
- Previous (baseline): skip; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: viewAllStories href
expect(received).not.toMatch(expected)
Expected pattern: not /^(#?)$/
Received string:      "#"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-029 — DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en

- Failing assertion: `Error: expect(locator).toHaveText(expected) failed` — `tests/article-detail/DSR-529.article-detail.spec.ts:223`
- Previous (baseline): skip; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: expect(locator).toHaveText(expected) failed
Locator:  locator('main').locator('h1').first()
Expected: "QA529 Story detail test"
Received: "QA529 Nav"
Timeout:  5000ms
Call log:
  - Expect "soft toHaveText" locator('main').locator('h1').first() with timeout 5000ms
  - waiting for locator('main').locator('h1').first()
    14 × locator resolved to <h1 class="article-title-heading">QA529 Nav</h1>
       - unexpected value "QA529 Nav"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-c6c1a-info-bar-in-en-html-lang-en-chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-c6c1a-info-bar-in-en-html-lang-en-chromium-retry1/test-failed-1.png`

### DSR-ARTICLE-023 — DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion: `Error: visible related items heading` — `tests/article-detail/DSR-529.article-detail.spec.ts:266`
- Previous (baseline): skip; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: visible related items heading
expect(received).toEqual(expected) // deep equality
- Expected  - 1
+ Received  + 6
- Array []
+ Array [
+   Object {
+     "height": 32.390625,
+     "visible": true,
+   },
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium/test-failed-1.png`, `test-results/j05-page/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium-retry1/test-failed-1.png`

### DSR-CATDL-007 — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `Error: gated PDF URL delivered to the browser before submit` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:187`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: gated PDF URL delivered to the browser before submit
expect(received).toEqual(expected) // deep equality
- Expected  - 1
+ Received  + 3
- Array []
+ Array [
+   "dm-catalog-list response: item qa190-cat-pdf-form (requiresForm=true) pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf",
+ ]
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png`, `test-results/j05-page/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png`

### DSR-ECO-002 — DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language)

- Failing assertion: `Error: VIEW MORE not on site with same language prefix` — `tests/eco-products/DSR-590.eco-products.spec.ts:106`
- Previous (baseline): new; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: VIEW MORE not on site with same language prefix
expect(received).toEqual(expected) // deep equality
- Expected  -  1
+ Received  + 11
- Array []
+ Array [
+   "http://google.com/",
+   "http://google.com/",
+   "http://google.com/",
+   "http://google.com/",
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/eco-products-DSR-590.eco-p-b04ae-ail-page-200-same-language--chromium/test-failed-1.png`, `test-results/j05-page/eco-products-DSR-590.eco-p-b04ae-ail-page-200-same-language--chromium-retry1/test-failed-1.png`

### DSR-ECO-004 — DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200)

- Failing assertion: `Error: finder URL (P087), same language` — `tests/eco-products/DSR-590.eco-products.spec.ts:122`
- Previous (baseline): new; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: finder URL (P087), same language
expect(received).toContain(expected) // indexOf
Expected value: ""
Received array: ["/ja/product/performance/sustainable/sustainable-solution-finder", "/master/ja/product/performance/sustainable/sustainable-solution-finder"]
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/eco-products-DSR-590.eco-p-54993-he-product-finder-P087-200--chromium/test-failed-1.png`, `test-results/j05-page/eco-products-DSR-590.eco-p-54993-he-product-finder-P087-200--chromium-retry1/test-failed-1.png`

### DSR-ICON-006 — DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `Error: console errors` — `tests/icons/DSR-589.icons.spec.ts:107`
- Previous (baseline): new; suspect: env
- Expected vs actual (Playwright error, truncated to 10 lines):

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
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium/test-failed-1.png`, `test-results/j05-page/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-ICON-006 — DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `Error: console errors` — `tests/icons/DSR-589.icons.spec.ts:107`
- Previous (baseline): new; suspect: env
- Expected vs actual (Playwright error, truncated to 10 lines):

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
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium/test-failed-1.png`, `test-results/j05-page/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium-retry1/test-failed-1.png`

### DSR-501-P3 — DSR-501-P3 [en] related movies are limited to 5 in authored order

- Failing assertion: `Error: expect(locator).toBeVisible() failed` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:268`
- Previous (baseline): fail; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

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
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium/test-failed-1.png`, `test-results/j05-page/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium-retry1/test-failed-1.png`

### DSR-501-P2 — DSR-501-P2 [en] unavailable related movie is not displayed

- Failing assertion: `Error: expect(locator).toBeVisible() failed` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:275`
- Previous (baseline): fail; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

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
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium/test-failed-1.png`, `test-results/j05-page/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-014 — DSR-MOVIE-014 embeds the configured YouTube movie

- Failing assertion: `Error: expect(locator).toHaveAttribute(expected) failed` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:32`
- Previous (baseline): fail; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: expect(locator).toHaveAttribute(expected) failed
Locator: getByTestId('movie-detail-player-embed')
Expected pattern: /\/embed\//
Timeout: 5000ms
Error: element(s) not found
Call log:
  - Expect "toHaveAttribute" getByTestId('movie-detail-player-embed') with timeout 5000ms
  - waiting for getByTestId('movie-detail-player-embed')
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/test-failed-1.png`, `test-results/j05-page/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-026 — DSR-MOVIE-026 displays related thumbnails, types, tags and valid links

- Failing assertion: `Error: Related card 1 thumbnail` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:141`
- Previous (baseline): fail; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

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
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`, `test-results/j05-page/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-033 — DSR-MOVIE-033 displays component sections in vertical order on PC

- Failing assertion: `Error: expect(locator).toBeVisible() failed` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:201`
- Previous (baseline): fail; suspect: test
- Expected vs actual (Playwright error, truncated to 10 lines):

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
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium/test-failed-1.png`, `test-results/j05-page/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium-retry1/test-failed-1.png`

### DSR-NEWS-002 — DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list

- Failing assertion: `Error: required elements missing` — `tests/news-detail/DSR-566.news-detail.spec.ts:44`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: required elements missing
expect(received).toEqual(expected) // deep equality
- Expected  - 1
+ Received  + 3
- Array []
+ Array [
+   "backToList",
+ ]
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium/test-failed-1.png`, `test-results/j05-page/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium-retry1/test-failed-1.png`

### DSR-NEWS-003 — DSR-NEWS-003 [en] shown date equals meta publish date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/news-detail/DSR-566.news-detail.spec.ts:57`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: expect(received).toBe(expected) // Object.is equality
Expected: "2026-09-29"
Received: "2026-03-30"
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium/test-failed-1.png`, `test-results/j05-page/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium-retry1/test-failed-1.png`

### DSR-NEWS-006 — DSR-NEWS-006 [en] Back to list href resolves to /en/news/

- Failing assertion: `Error: Back to list link` — `tests/news-detail/DSR-566.news-detail.spec.ts:76`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: Back to list link
expect(locator).toHaveCount(expected) failed
Locator:  locator('main').getByRole('link', { name: /back to list|一覧へ戻る/i })
Expected: 1
Received: 0
Timeout:  5000ms
Call log:
  - Back to list link locator('main').getByRole('link', { name: /back to list|一覧へ戻る/i }) with timeout 5000ms
  - waiting for locator('main').getByRole('link', { name: /back to list|一覧へ戻る/i })
    14 × locator resolved to 0 elements
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium/test-failed-1.png`, `test-results/j05-page/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium-retry1/test-failed-1.png`

### DSR-NEWS-007 — DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template

- Failing assertion: `Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json` — `tests/news-detail/DSR-566.news-detail.spec.ts:98`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json
expect(received).not.toBeNull()
Received: null
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium/test-failed-1.png`, `test-results/j05-page/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium-retry1/test-failed-1.png`

### DSR-NEWS-012 — DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click)

- Failing assertion: `Error: My List button` — `tests/news-detail/DSR-566.news-detail.spec.ts:131`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: My List button
expect(locator).toBeVisible() failed
Locator: locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list|マイリスト/i })
Expected: visible
Timeout: 5000ms
Error: element(s) not found
Call log:
  - My List button locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list|マイリスト/i }) with timeout 5000ms
  - waiting for locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list|マイリスト/i })
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium/test-failed-1.png`, `test-results/j05-page/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium-retry1/test-failed-1.png`

### DSR-NEWS-018 — DSR-NEWS-018 [en] title, description and og tags non-empty

- Failing assertion: `Error: meta[name="description"]` — `tests/news-detail/DSR-566.news-detail.spec.ts:158`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: meta[name="description"]
expect(received).not.toBe(expected) // Object.is equality
Expected: not ""
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium/test-failed-1.png`, `test-results/j05-page/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-001 — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `Error: TD-583-01 ≥ 6 products` — `tests/product-list/DSR-583.product-list.spec.ts:48`
- Previous (baseline): fail; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: TD-583-01 ≥ 6 products
expect(received).toBeGreaterThanOrEqual(expected)
Expected: >= 6
Received:    1
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/j05-page/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-002 — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `Error: 320: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:33`
- Previous (baseline): fail; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: 320: distinct column offsets
expect(received).toBe(expected) // Object.is equality
Expected: 2
Received: 1
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/j05-page/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-003 — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `Error: open: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:70`
- Previous (baseline): fail; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: open: distinct column offsets
expect(received).toBe(expected) // Object.is equality
Expected: 2
Received: 1
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium/test-failed-1.png`, `test-results/j05-page/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-004 — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `Error: 1440: distinct column offsets` — `tests/product-list/DSR-583.product-list.spec.ts:153`
- Previous (baseline): fail; suspect: data
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: 1440: distinct column offsets
expect(received).toBe(expected) // Object.is equality
Expected: 4
Received: 1
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium/test-failed-1.png`, `test-results/j05-page/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 — DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover` — `tests/top/DSR-609.top.spec.ts:40`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: text/background colour changes on hover
expect(received).not.toEqual(expected) // deep equality
Expected: not []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/j05-page/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 — DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})
expect(received).toBe(expected) // Object.is equality
Expected: true
Received: false
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/j05-page/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 — DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /ja/news/query-index.json` — `tests/top/DSR-609.top.spec.ts:124`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: page requests /ja/news/query-index.json
expect(received).toContain(expected) // indexOf
Expected value: "/ja/news/query-index.json"
Received array: ["/query-index.json"]
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/j05-page/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 — DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: SP item 1 title lines ≤ 1
expect(received).toBeLessThanOrEqual(expected)
Expected: <= 1
Received:    2
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/j05-page/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 — DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover` — `tests/top/DSR-609.top.spec.ts:40`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: text/background colour changes on hover
expect(received).not.toEqual(expected) // deep equality
Expected: not []
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/j05-page/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 — DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})` — `tests/top/DSR-609.top.spec.ts:83`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})
expect(received).toBe(expected) // Object.is equality
Expected: true
Received: false
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/j05-page/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 — DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /en/news/query-index.json` — `tests/top/DSR-609.top.spec.ts:124`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: page requests /en/news/query-index.json
expect(received).toContain(expected) // indexOf
Expected value: "/en/news/query-index.json"
Received array: ["/query-index.json"]
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/j05-page/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 — DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1` — `tests/top/DSR-609.top.spec.ts:160`
- Previous (baseline): fail; suspect: product
- Expected vs actual (Playwright error, truncated to 10 lines):

```text
Error: SP item 1 title lines ≤ 1
expect(received).toBeLessThanOrEqual(expected)
Expected: <= 1
Received:    2
```
- Attempt(s): failed on attempt 1 and retry 1
- Evidence paths: `test-results/j05-page/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/j05-page/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

## 7. Open points for QA

- Build identity is not verified. The merge is inferred from the job note (Martin, DSR-647 comment 61460) and the preflight 200 on main .aem.page.
- The expected post-merge breakage did not appear. `/master/en/test-space/dsr-173-video-detail` and `/master/en/test-space/qa501-a` still return 200 on main (both hosts). The QA overlay ids (qa586-*, qa587-*) returned 404 before and after the merge, so the DSR-586/587 tests stay skipped (`not seeded`).
- DSR-173 spec results are unchanged, but the spec is classed `obsolete-test` (Martin 19/10: test video only on /{lang}/library/video/{id}). The smoke test and DSR-CATV-001/002/006 also use the dsr-173-video-detail page (fixtures/dsr-557.ts `videoPath`).
- DSR-587.overlay-retest-DSR-647 (501-P2/P3) and the DSR-227 fallback still target the branch host, not main. Their results do not show main's behaviour. On main .aem.page, qa501-main-a and qa501-main-b return 200.
- Product URL check (curl, 2026-10-20 ~01:12Z, id 46 = the DSR-227 fallback id): `/{en,ja}/products/46` = 200 on main .aem.page (title "QUICKFIT® | YKK DIGITAL SHOWROOM"); `/{en,ja}/product/46` = 404; both forms 404 on main .aem.live.
- Catalog overlay is not in this merge. Catalog specs (DSR-557, DSR-570) use /master/{lang}/test-space pages and gave the same results on both hosts.
- Baseline comparison matches on spec file + test title. VOV-011 in the .aem.page run is compared against a .aem.live baseline, and there is no .aem.page baseline.
- Run-rewritten tracked files (DSR-552 evidence PNGs, codex result JSON/PNGs of JOB-20261015-14, -20261016-13, -20261019-09, -20261020-01) were reverted, and run-created untracked DSR-552 PNGs were removed. None were committed.
