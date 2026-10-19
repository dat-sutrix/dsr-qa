# regression DEV automation run — 20261017

Job: `JOB-ZZ-IDLE-07` (idle daily regression, all existing specs, read-only). The filename date 20261017 is the date the job asked for. The run actually started on **2026-10-19** (UTC); see Open points.

## 1. Header

- Run start (UTC): 2026-10-19T04:48:03Z (tsc check started 2026-10-19T04:47Z)
- Run end (UTC): 2026-10-19T04:59:07Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): all pages used by existing specs (DSR-173/501/587 movie detail and overlay, DSR-529 article detail, DSR-552 breadcrumb test-space, DSR-557 catalog/video, DSR-566 news detail, DSR-570 catalog download, DSR-583 product list, DSR-586 product detail, DSR-609 top page, smoke)
- Build under test: not independently verified (EDS `main` branch as published at run time)
- Baseline ID: per US as recorded in `docs/<US>/` (DSR-173: BL-v1); not re-verified in this run
- Automation HEAD commit SHA: 9f8f6a35753c81a1df972af4b9b69389310cd53d
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/idle07/results.json npm run test:dev -- --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 270 | 81 (+1 flaky) | 32 | 156 | 1 | 2 | configured 1; 33 tests retried | 11m 04s (Playwright 11.0m) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms them.
Scope/browser: full suite, chromium project only. The firefox/webkit projects, which only run DSR-BREAD-032, were not run.
Flaky: 1. DSR-CATDL-015 [ja] hit the 30 s timeout on attempt 1 and passed on retry (2.2 s).
Since 16/10 there are 118 more tests (152 → 270). They come from specs added after JOB-ZZ-IDLE-01: DSR-529 article-detail (47, all skip), DSR-570 catalog-download (16) + catalog-detail visual (2), DSR-583 product-list (9), DSR-586 product-detail (20, all skip), DSR-587 movie-overlay (24).

### Changes vs 16/10 (`results/regression/DEV/automation-run-20261016.md`)

| Spec | TC | 16/10 | Now | Suspect |
|---|---|---|---|---|
| breadcrumb/DSR-552.breadcrumb.spec.ts | DSR-BREAD-014 [ja] | fail | pass | — (no test change since 16/10; page/product change) |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [ja] PC | fail (timeout) | pass | — (test fix 3ac42ec) |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [en] PC | fail (timeout) | pass | — (test fix 3ac42ec) |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [ja] SP | flaky | pass | — (test fix 3ac42ec) |
| catalog-video/DSR-557.catalog-video.spec.ts | DSR-CATV-016 [ja]/[en] | skip (blocked-data) | fail | test |
| catalog-video/DSR-557.catalog-video.spec.ts | DSR-CATV-017 [ja]/[en] | skip (blocked-data) | fail | test |
| movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts | DSR-501-P2 [en] | pass | fail | test |
| movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts | DSR-501-P3 [en] | pass | skip (blocked-data guard: stale static HTML) | data |

Unchanged fails vs 16/10: 19. They are DSR-MOVIE-014/026/033, DSR-501-P2/P3 (DSR-173 spec), DSR-NEWS-002/003/006/007/012/018 [en] and DSR-TOP-004..007 ja+en.
Failures in specs that are not in the 16/10 run: 9 (8 fail + 1 flaky). They are DSR-CATDL-014 (timeout), DSR-CATDL-015 (flaky), DSR-CATDL-007, DSR-VOV-011 [ja]/[en] and DSR-PRODLIST-001..004 [ja]. Each matches the latest result for that US (DSR-570 rerun2, JOB-ZZ-IDLE-06, JOB-ZZ-IDLE-03). DSR-CATDL-014/015 have no earlier claude-code report.

## 4. Executed tests

Duration is per attempt (attempt 1 / retry). "16/10" = result in `automation-run-20261016.md` (JOB-ZZ-IDLE-01); "(new)" = test not in that run.

| TC ID | Title | Result | Duration | 16/10 | One-line failure reason |
|---|---|---|---|---|---|
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [ja] child trail follows URL hierarchy | passed | 2.4s | pass | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | passed | 2.4s | pass | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [ja] ancestor links navigate in same tab | passed | 5.7s | pass | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [ja] items equal page titles | passed | 2.8s | pass | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [en] child trail follows URL hierarchy | passed | 2.2s | pass | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | passed | 2.1s | pass | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [en] ancestor links navigate in same tab | passed | 5.9s | pass | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [en] items equal page titles | passed | 3.8s | pass | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [ja] display name overrides page title | passed | 4.7s | pass | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [en] display name overrides page title | passed | 4.2s | pass | — |
| DSR-BREAD-014 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-014 [ja] 100-character display name keeps layout | passed | 7.1s | fail | — |
| DSR-BREAD-015 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-015 [ja] special characters in display name are plain text | passed | 3.7s | pass | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [ja] each language uses its own display names | passed | 2.8s | pass | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [en] each language uses its own display names | passed | 2.0s | pass | — |
| DSR-BREAD-020 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-020 PC breadcrumb baseline | passed | 2.5s | pass | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline | passed | 2.4s | pass | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement [ja] | passed | 5.1s | pass,pass,skip | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-002 ancestor links [ja] | passed | 16.0s | pass | — |
| DSR-BREAD-003 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-003 current page is not linked [ja] | passed | 5.8s | pass | — |
| DSR-BREAD-004 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-004 HOME label and destination [ja] | passed | 5.6s | pass | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order [ja] | passed | 5.0s | pass,pass,skip | — |
| DSR-BREAD-006 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-006 parent trail [ja] | passed | 5.3s | pass | — |
| DSR-BREAD-007 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-007 missing intermediate page [ja] | passed | 4.2s | pass | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb [ja] | passed | 4.0s | pass,pass,skip | — |
| DSR-BREAD-009 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-009 404 excludes breadcrumb [ja] | passed | 4.1s | pass | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-011 empty label uses title [ja] | passed | 5.2s | pass | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations [ja] | passed | 2.3s | pass,pass,skip | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data [ja] | passed | 3.2s | pass,pass,skip | — |
| DSR-BREAD-027 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-027 semantic markup and accessibility [ja] | passed | 4.6s | pass | — |
| DSR-BREAD-028 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-028 keyboard navigation [ja] | passed | 3.6s | pass | — |
| DSR-BREAD-031 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-031 site-origin console errors [ja] | passed | 2.2s | pass | — |
| DSR-BREAD-035 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-035 arrow asset origin and status [ja] | passed | 2.6s | pass | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement [en] | passed | 2.3s | pass,pass,skip | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order [en] | passed | 2.0s | pass,pass,skip | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb [en] | passed | 2.0s | pass,pass,skip | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations [en] | passed | 4.0s | pass,pass,skip | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data [en] | passed | 3.1s | pass,pass,skip | — |
| DSR-CATDL-014 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-014 [ja] capture catalog download form at 1440px | failed | 30.7s / 30.8s | (new) | Test timeout of 30000ms exceeded. |
| DSR-CATDL-015 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-015 [ja] capture catalog download form at 375px | flaky (passed on retry) | 30.9s / 2.2s | (new) | Test timeout of 30000ms exceeded. |
| DSR-CATDL-001 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-001 [ja] catalog detail header renders | passed | 1.8s | (new) | — |
| DSR-CATDL-002 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 1.8s | (new) | — |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 4.0s | (new) | — |
| DSR-CATDL-018 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | passed | 3.5s | (new) | — |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 2.3s | (new) | — |
| DSR-CATDL-018 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | passed | 4.2s | (new) | — |
| DSR-CATDL-003 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 2.1s | (new) | — |
| DSR-CATDL-007 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | 5.3s / 5.5s | (new) | Error: gated PDF URL delivered to the browser before submit |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title [ja] | passed | 6.3s | pass,pass | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab [ja] | passed | 7.5s | pass,pass | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form [ja] | failed | 10.2s / 10.3s | skip,skip | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-CATV-017 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form [ja] | failed | 6.9s / 9.7s | skip,skip | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate [ja] | passed | 2.5s | pass,pass | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate [ja] | passed | 4.1s | pass,pass | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply [ja] | passed | 3.9s | pass,pass | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click [ja] | passed | 5.7s | pass,pass | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) [ja] | passed | 5.1s | pass,pass | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) [ja] | passed | 3.9s | pass,pass | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction [ja] | passed | 6.3s | pass,pass | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title [en] | passed | 8.5s | pass,pass | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab [en] | passed | 9.5s | pass,pass | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form [en] | failed | 9.4s / 9.5s | skip,skip | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-CATV-017 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form [en] | failed | 8.7s / 11.5s | skip,skip | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate [en] | passed | 2.5s | pass,pass | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate [en] | passed | 1.9s | pass,pass | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply [en] | passed | 1.4s | pass,pass | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click [en] | passed | 2.1s | pass,pass | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) [en] | passed | 1.9s | pass,pass | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) [en] | passed | 2.0s | pass,pass | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction [en] | passed | 1.9s | pass,pass | — |
| DSR-MOVIE-012 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-012 displays the exact movie title | passed | 1.5s | pass | — |
| DSR-MOVIE-014 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-014 embeds the configured YouTube movie | failed | 6.6s / 6.7s | fail | Error: expect(locator).toHaveAttribute(expected) failed |
| DSR-MOVIE-036 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-036 no site-origin console errors on the movie component page | passed | 1.3s | pass | — |
| DSR-MOVIE-026 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | failed | 14.0s / 12.6s | fail | Error: Related card 1 thumbnail |
| DSR-MOVIE-027 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-027 outputs exactly one title and og:title | passed | 2.9s | pass | — |
| DSR-MOVIE-029 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | passed | 3.6s | pass | — |
| DSR-MOVIE-033 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-033 displays component sections in vertical order on PC | failed | 7.3s / 9.0s | fail | Error: expect(locator).toBeVisible() failed |
| DSR-MOVIE-034 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-034 displays the component back control | passed | 4.1s | pass | — |
| DSR-501-P3 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P3 [en] related movies are limited to 5 in authored order | failed | 9.6s / 9.1s | fail | Error: expect(locator).toBeVisible() failed |
| DSR-501-P2 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | failed | 10.1s / 10.3s | fail | Error: expect(locator).toBeVisible() failed |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed | 1.4s / 2.1s | (new) | Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/search |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed | 1.0s / 1.9s | (new) | Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/search |
| DSR-501-P2 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | failed | 3.5s / 3.3s | pass | Error: expect(received).not.toContain(expected) // indexOf |
| DSR-NEWS-001 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-001 [en] page shows date, category, title and body | passed | 3.1s | pass | — |
| DSR-NEWS-002 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list | failed | 2.3s / 2.3s | fail | Error: required elements missing |
| DSR-NEWS-003 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [en] shown date equals meta publish date | failed | 7.3s / 6.2s | fail | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-NEWS-004 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-004 [en] category and title are non-empty text | passed | 7.6s | pass | — |
| DSR-NEWS-006 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | failed | 13.2s / 11.4s | fail | Error: Back to list link |
| DSR-NEWS-007 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | failed | 6.9s / 3.0s | fail | Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json |
| DSR-NEWS-009 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-009 [en] no related-content block | passed | 2.1s | pass | — |
| DSR-NEWS-010 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | passed | 2.0s | pass | — |
| DSR-NEWS-012 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | failed | 12.5s / 12.5s | fail | Error: My List button |
| DSR-NEWS-013 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | passed | 2.1s | pass | — |
| DSR-NEWS-018 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [en] title, description and og tags non-empty | failed | 4.2s / 5.1s | fail | Error: meta[name="description"] |
| DSR-PRODLIST-001 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | failed | 9.4s / 8.3s | (new) | Error: 375: distinct column offsets |
| DSR-PRODLIST-002 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed | 23.6s / 19.7s | (new) | Error: 320: distinct column offsets |
| DSR-PRODLIST-003 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | failed | 10.3s / 9.6s | (new) | Error: open: distinct column offsets |
| DSR-PRODLIST-004 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed | 13.0s / 11.3s | (new) | Error: 1440: distinct column offsets |
| SMOKE-001 | `smoke.spec.ts` › SMOKE-001 DSR-173 test page is reachable | passed | 0.8s | pass | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | failed | 5.7s / 5.8s | fail | Error: text/background colour changes on hover |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 6.2s / 4.8s | fail | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | failed | 3.7s / 3.8s | fail | Error: page requests /ja/news/query-index.json |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 4.0s / 4.1s | fail | Error: SP item 1 title lines ≤ 1 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [ja] NEWS with empty query-index renders without error | passed | 5.0s | pass | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [ja] main visual image is eager and is the LCP element | passed | 5.0s | pass | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | failed | 4.2s / 4.8s | fail | Error: text/background colour changes on hover |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 4.5s / 4.1s | fail | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | failed | 4.5s / 3.0s | fail | Error: page requests /en/news/query-index.json |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 3.7s / 7.3s | fail | Error: SP item 1 title lines ≤ 1 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [en] NEWS with empty query-index renders without error | passed | 7.5s | pass | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [en] main visual image is eager and is the LCP element | passed | 8.0s | pass | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | passed | 10.3s | fail | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | passed | 8.3s | flaky | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] PC full-page capture and horizontal overflow | passed | 9.0s | fail | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] SP full-page capture and horizontal overflow | passed | 8.1s | pass | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
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
| DSR-ARTICLE-002 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-003 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-006 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-007 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [ja] info bar date = meta published-date | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-008 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-010 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-011 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-012 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-013 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-014 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-016 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-024 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-026 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-026 [ja] stories query-index contains qa529-01 with 6 properties | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-029 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-002 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-003 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-006 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-007 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [en] info bar date = meta published-date | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-008 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-010 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-011 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-012 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-013 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-014 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-016 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-024 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-026 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-026 [en] stories query-index contains qa529-01 with 6 properties | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-029 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-015 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-02 and /master/ja/test-space/qa529-02 HTTP 404) |
| DSR-ARTICLE-020 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-02 and /master/ja/test-space/qa529-02 HTTP 404) |
| DSR-ARTICLE-023 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-02 and /master/ja/test-space/qa529-02 HTTP 404) |
| DSR-ARTICLE-025 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-02 and /master/ja/test-space/qa529-02 HTTP 404) |
| DSR-ARTICLE-009 — `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-BREAD-018 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [cn] each language uses its own display names | cn: no /master/cn (Issue #18) |
| DSR-BREAD-019 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-019 Japanese and Chinese fonts | DSR-555 + cn |
| DSR-BREAD-021 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-021 SP breadcrumb and back control | DSR-575 Q5 (SP display) |
| DSR-BREAD-022 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-022 SP parent navigation | DSR-575 Q5 (SP display) |
| DSR-BREAD-023 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-023 narrow SP overflow | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-029 STG Lighthouse performance | Run on STG (Lighthouse) |
| DSR-BREAD-030 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-030 movie breadcrumb regression | DSR-536 / movie-detail placement |
| DSR-BREAD-033 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-033 all page types | Layout tickets |
| DSR-BREAD-034 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-034 responsive movie back control | DSR-536 / movie-detail placement |
| DSR-BREAD-001 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 — `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data [cn] | cn: no /master/cn (Issue #18) |
| DSR-CATDL-006 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/ja/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15: demo page is layout only, not bound to catalog CF) |
| DSR-CATDL-001 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-001 [en] catalog detail header renders | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-002 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-002 [en] download form fields, labels, consent and button present | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-006 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [en] requiresForm=true card leads to the download form | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/en/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15: demo page is layout only, not bound to catalog CF) |
| DSR-CATDL-010 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-010 [ja] catalog ID handed to the form | blocked-data: card "QA190 PDF form required" (qa190-cat-pdf-form) not rendered on /master/ja/test-space/list-catalog (in dm-catalog-list: yes) – DSR-570 CF integration (Ngoc 10/15) + HubSpot EX-06/EX-07 |
| DSR-CATDL-017 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-017 [ja] unknown or missing catalog ID never shows another catalog form | no catalog-ID mechanism on DEV yet: "QA190 PDF form required" card not rendered; demo form page is not bound to a CF (Ngoc 10/15) |
| DSR-CATDL-016 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-016 [en] fixed texts translated (no Japanese) | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-016 — `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-016 [cn] fixed texts translated (Chinese) | cn: no /master/cn (Issue #18) |
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
| DSR-VOV-001 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-001 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-002 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-002 [en] preview-only CF related → 200 on .aem.page, 404 on .aem.live | TD-587-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-preview HTTP 404) |
| DSR-VOV-003 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-003 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-004 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-004 [en] CF related name with uppercase / underscore → 404 | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-005 [en] CF related in subfolder / outside /content/dam/dsr → 404 | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-006 [en] CF commune alone → 404 on .aem.page and .aem.live | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-007 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-007 [ja] isActive = false → noindex, browser sent to movie list | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-007 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-007 [en] isActive = false → noindex, browser sent to movie list | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-008 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-008 [en] CF commune unpublished → single unavailable row, noindex, browser sent to movie list | TD-587-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-unavail HTTP 404) |
| DSR-VOV-010 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-010 [en] unpublished CF related → 404 on both hosts, absent from query-index | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/tech-talk stays a list page | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/tech-talk stays a list page | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [cn] list pages | Issue #18: no /cn path on DEV |
| DSR-VOV-014 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-014 [en] related movies max 5 when 6 are linked | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-015 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | TD-587-15 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-b HTTP 404) |
| DSR-VOV-016 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-016 [en] related contents ordered by update date, newest first | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-017 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-017 [en] DSR-173 Group A page switched to the overlay page | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [ja] language variant: 200, html lang, title | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 — `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [en] language variant: 200, html lang, title | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
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
| DSR-PDO-001 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-001 [ja] live CF related → detail page shows name, code, images and specs | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-001 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-001 [en] live CF related → detail page shows name, code, images and specs | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-002 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-002 [ja] preview-only CF related → 200 on .aem.page, 404 on .aem.live | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-003 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-003 [ja] raw HTML (no JS) has name and description in body, title / description / og:image in head | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-003 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-003 [en] raw HTML (no JS) has name and description in body, title / description / og:image in head | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-004 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-004 [ja] no GraphQL / execute.json request from the browser | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-005 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-005 [ja] only numeric ids render product detail; non-numeric and /products/ are not overlay pages | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-006 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-006 [ja] CF related in subfolder → no page (404) | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-007 [ja] CF commune alone → 404 on .aem.page and .aem.live | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-008 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-008 [ja] isActive = false → 200 + noindex, browser sent to product list | TD-586-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586008 HTTP 404) |
| DSR-PDO-009 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-009 [ja] CF commune unpublished → single unavailable row + noindex | TD-586-09 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586009 HTTP 404) |
| DSR-PDO-011 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-011 [ja] unpublished CF related → 404 on both hosts, absent from query-index | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-012 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-012 [ja] live product page listed in query-index and sitemap; preview-only absent | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-013 [ja] Contact button → inquiry page with product code (no submit) | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-013 [en] Contact button → inquiry page with product code (no submit) | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [ja] language variant: 200, html lang matches, product name present | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-014 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [en] language variant: 200, html lang matches, product name present | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issue #18) | (no reason string; `test.fixme` — reason is in the title) |
| DSR-PDO-017 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-017 [ja] fixed Product CF field set displayed, removed fields absent | DSR-585 項目fix版 field list not in repo (Q27 review open) |
| DSR-PDO-019 — `product-detail/DSR-586.product-detail.spec.ts` › DSR-PDO-019 [ja] DSR-457 regression items recorded on overlay page | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PRODLIST-003 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [en] SP column count stays 2 after scroll, load more, filter and 3 reloads | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-005 [ja] SP odd count (3) and single result (1): last card = column width, left aligned | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-006 [ja] SP card layout vs Figma 375 frame (visual) | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-006 [en] SP card layout vs Figma 375 frame (visual) | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 — `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-007 [ja] Real device iOS Safari / Android Chrome: 2 columns (manual) | Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |

## 6. Failed tests

Includes the flaky test. Evidence under `test-results/` is gitignored and not committed; screenshots of the 5 tests that changed to fail vs 16/10 are committed under `ykk-dsr/hub/results/JOB-ZZ-IDLE-07/evidence/`.

### DSR-CATDL-014 [ja] capture catalog download form at 1440px (`catalog-detail/DSR-570.visual.spec.ts`)

- 16/10: (new) → now: fail
- Failing assertion: none (test timeout, no assertion location) — spec line `tests/catalog-detail/DSR-570.visual.spec.ts:7`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Attempt(s): timedOut / timedOut
- Evidence paths: `test-results/catalog-detail-DSR-570.vis-618ef-log-download-form-at-1440px-chromium/test-failed-1.png`, `test-results/catalog-detail-DSR-570.vis-618ef-log-download-form-at-1440px-chromium-retry1/test-failed-1.png`

### DSR-CATDL-015 [ja] capture catalog download form at 375px (`catalog-detail/DSR-570.visual.spec.ts`)

- 16/10: (new) → now: flaky
- Failing assertion: none (test timeout, no assertion location) — spec line `tests/catalog-detail/DSR-570.visual.spec.ts:7`
- Expected vs actual: Test timeout of 30000ms exceeded.
- Attempt(s): timedOut / passed
- Evidence paths: `test-results/catalog-detail-DSR-570.vis-aa1cc-alog-download-form-at-375px-chromium/test-failed-1.png`

### DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit (`catalog-download/DSR-570.catalog-download.spec.ts`)

- 16/10: (new) → now: fail
- Failing assertion: `expect(gatedHits, 'gated PDF URL delivered to the browser before submit').toEqual([]);` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:187`
- Expected vs actual: Error: gated PDF URL delivered to the browser before submit · expect(received).toEqual(expected) // deep equality · - Expected  - 1 · + Received  + 3 · - Array [] · + Array [ · +   "dm-catalog-list response: item qa190-cat-pdf-form (requiresForm=true) pdfAsset._publishUrl = https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf", · + ]
- Attempt(s): failed / failed
- Evidence paths: `test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png`, `test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png`

### DSR-CATV-016 e-book item opens ebookUrl without form [ja] (`catalog-video/DSR-557.catalog-video.spec.ts`)

- 16/10: skip,skip → now: fail
- Failing assertion: `expect(forms).toBe(0);` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:110`
- Expected vs actual: Error: expect(received).toBe(expected) // Object.is equality · Expected: 0 · Received: 1
- Attempt(s): failed / failed
- Evidence paths: `test-results/catalog-video-DSR-557.cata-99949-opens-ebookUrl-without-form-chromium/test-failed-1.png`, `test-results/catalog-video-DSR-557.cata-99949-opens-ebookUrl-without-form-chromium/test-failed-2.png`, `test-results/catalog-video-DSR-557.cata-99949-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`, `test-results/catalog-video-DSR-557.cata-99949-opens-ebookUrl-without-form-chromium-retry1/test-failed-2.png`

### DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form [ja] (`catalog-video/DSR-557.catalog-video.spec.ts`)

- 16/10: skip,skip → now: fail
- Failing assertion: `expect(forms).toBe(0);` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:110`
- Expected vs actual: Error: expect(received).toBe(expected) // Object.is equality · Expected: 0 · Received: 1
- Attempt(s): failed / failed
- Evidence paths: `test-results/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium/test-failed-1.png`, `test-results/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium/test-failed-2.png`, `test-results/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`, `test-results/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium-retry1/test-failed-2.png`

### DSR-CATV-016 e-book item opens ebookUrl without form [en] (`catalog-video/DSR-557.catalog-video.spec.ts`)

- 16/10: skip,skip → now: fail
- Failing assertion: `expect(forms).toBe(0);` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:110`
- Expected vs actual: Error: expect(received).toBe(expected) // Object.is equality · Expected: 0 · Received: 1
- Attempt(s): failed / failed
- Evidence paths: `test-results/catalog-video-DSR-557.cata-c25ff-opens-ebookUrl-without-form-chromium/test-failed-1.png`, `test-results/catalog-video-DSR-557.cata-c25ff-opens-ebookUrl-without-form-chromium/test-failed-2.png`, `test-results/catalog-video-DSR-557.cata-c25ff-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`, `test-results/catalog-video-DSR-557.cata-c25ff-opens-ebookUrl-without-form-chromium-retry1/test-failed-2.png`

### DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form [en] (`catalog-video/DSR-557.catalog-video.spec.ts`)

- 16/10: skip,skip → now: fail
- Failing assertion: `expect(forms).toBe(0);` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:110`
- Expected vs actual: Error: expect(received).toBe(expected) // Object.is equality · Expected: 0 · Received: 1
- Attempt(s): failed / failed
- Evidence paths: `test-results/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium/test-failed-1.png`, `test-results/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium/test-failed-2.png`, `test-results/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png`, `test-results/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium-retry1/test-failed-2.png`

### DSR-MOVIE-014 embeds the configured YouTube movie (`movie-detail/DSR-173.movie-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `await expect(movie.playerEmbed).toHaveAttribute('src', /\/embed\//);` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:32`
- Expected vs actual: Error: expect(locator).toHaveAttribute(expected) failed · Locator: getByTestId('movie-detail-player-embed') · Expected pattern: /\/embed\// · Timeout: 5000ms · Error: element(s) not found · Call log: · - Expect "toHaveAttribute" getByTestId('movie-detail-player-embed') with timeout 5000ms · - waiting for getByTestId('movie-detail-player-embed')
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-026 displays related thumbnails, types, tags and valid links (`movie-detail/DSR-173.movie-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `await expect.soft(image, `${label} thumbnail`).toBeVisible({ timeout: 1_000 });` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:141`
- Expected vs actual: Error: Related card 1 thumbnail · expect(locator).toBeVisible() failed · Locator: getByTestId('related-content-card').first().getByTestId('related-content-card-image') · Expected: visible · Timeout: 1000ms · Error: element(s) not found · Call log: · - Related card 1 thumbnail getByTestId('related-content-card').first().getByTestId('related-content-card-image') with timeout 1000ms · - waiting for getByTestId('related-content-card').first().getByTestId('related-content-card-image')
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-033 displays component sections in vertical order on PC (`movie-detail/DSR-173.movie-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `await expect(section).toBeVisible();` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:201`
- Expected vs actual: Error: expect(locator).toBeVisible() failed · Locator: getByTestId('movie-detail-player') · Expected: visible · Timeout: 5000ms · Error: element(s) not found · Call log: · - Expect "toBeVisible" getByTestId('movie-detail-player') with timeout 5000ms · - waiting for getByTestId('movie-detail-player')
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium-retry1/test-failed-1.png`

### DSR-501-P3 [en] related movies are limited to 5 in authored order (`movie-detail/DSR-173.movie-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `await expect(movie.relatedContentSection).toBeVisible();` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:268`
- Expected vs actual: Error: expect(locator).toBeVisible() failed · Locator: getByTestId('movie-detail-related-content') · Expected: visible · Timeout: 5000ms · Error: element(s) not found · Call log: · - Expect "toBeVisible" getByTestId('movie-detail-related-content') with timeout 5000ms · - waiting for getByTestId('movie-detail-related-content')
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium-retry1/test-failed-1.png`

### DSR-501-P2 [en] unavailable related movie is not displayed (`movie-detail/DSR-173.movie-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `await expect(movie.relatedContentSection).toBeVisible();` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:275`
- Expected vs actual: Error: expect(locator).toBeVisible() failed · Locator: getByTestId('movie-detail-related-content') · Expected: visible · Timeout: 5000ms · Error: element(s) not found · Call log: · - Expect "toBeVisible" getByTestId('movie-detail-related-content') with timeout 5000ms · - waiting for getByTestId('movie-detail-related-content')
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium-retry1/test-failed-1.png`

### DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) (`movie-detail/DSR-587.movie-overlay.spec.ts`)

- 16/10: (new) → now: fail
- Failing assertion: `expect(response?.status(), target).toBe(200);` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:197`
- Expected vs actual: Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/search · expect(received).toBe(expected) // Object.is equality · Expected: 200 · Received: 404
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-587.movie-f5a89-h-≥-1-card-no-video-detail--chromium/test-failed-1.png`, `test-results/movie-detail-DSR-587.movie-f5a89-h-≥-1-card-no-video-detail--chromium-retry1/test-failed-1.png`

### DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) (`movie-detail/DSR-587.movie-overlay.spec.ts`)

- 16/10: (new) → now: fail
- Failing assertion: `expect(response?.status(), target).toBe(200);` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:197`
- Expected vs actual: Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/search · expect(received).toBe(expected) // Object.is equality · Expected: 200 · Received: 404
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium/test-failed-1.png`, `test-results/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium-retry1/test-failed-1.png`

### DSR-501-P2 [en] unavailable related movie is not displayed (`movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`)

- 16/10: pass → now: fail
- Failing assertion: `expect(o.html).not.toContain(pageB.excludedTitle);` — `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts:87`
- Expected vs actual: Error: expect(received).not.toContain(expected) // indexOf · Expected substring: not "video title off" · Received string:        "<!DOCTYPE html> · <html> · <head> · <title>video title main b \| YKK DIGITAL SHOWROOM</title> · <link rel=\"canonical\" href=\"https://dev-eds.ykkdigitalshowroom.com/en/library/video/qa501-main-b\"> · <meta name=\"description\" content=\"Video description main b\"> · <meta property=\"og:title\" content=\"video title main b \| YKK DIGITAL SHOWROOM\"> · <meta property=\"o
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-587.overl-796aa-ated-movie-is-not-displayed-chromium/attachments/page-f4fbccafeb12e7f9263d773e27644416ce5ad205.png`, `test-results/movie-detail-DSR-587.overl-796aa-ated-movie-is-not-displayed-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-587.overl-796aa-ated-movie-is-not-displayed-chromium-retry1/attachments/page-f4fbccafeb12e7f9263d773e27644416ce5ad205.png`, `test-results/movie-detail-DSR-587.overl-796aa-ated-movie-is-not-displayed-chromium-retry1/test-failed-1.png`

### DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list (`news-detail/DSR-566.news-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect(missing, 'required elements missing').toEqual([]);` — `tests/news-detail/DSR-566.news-detail.spec.ts:44`
- Expected vs actual: Error: required elements missing · expect(received).toEqual(expected) // deep equality · - Expected  - 1 · + Received  + 3 · - Array [] · + Array [ · +   "backToList", · + ]
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium-retry1/test-failed-1.png`

### DSR-NEWS-003 [en] shown date equals meta publish date (`news-detail/DSR-566.news-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect(isoDate(shown)).toBe(isoDate(meta));` — `tests/news-detail/DSR-566.news-detail.spec.ts:57`
- Expected vs actual: Error: expect(received).toBe(expected) // Object.is equality · Expected: "2026-09-29" · Received: "2026-03-30"
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium-retry1/test-failed-1.png`

### DSR-NEWS-006 [en] Back to list href resolves to /en/news/ (`news-detail/DSR-566.news-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `await expect(news.backToList, 'Back to list link').toHaveCount(1);` — `tests/news-detail/DSR-566.news-detail.spec.ts:76`
- Expected vs actual: Error: Back to list link · expect(locator).toHaveCount(expected) failed · Locator:  locator('main').getByRole('link', { name: /back to list\|一覧へ戻る/i }) · Expected: 1 · Received: 0 · Timeout:  5000ms · Call log: · - Back to list link locator('main').getByRole('link', { name: /back to list\|一覧へ戻る/i }) with timeout 5000ms · - waiting for locator('main').getByRole('link', { name: /back to list\|一覧へ戻る/i }) · 13 × locator resolved to 0 elements · - unexpected value "0"
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium-retry1/test-failed-1.png`

### DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template (`news-detail/DSR-566.news-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect(found, `page ${path} in ${queryIndexPaths(lang).join(' or ')}`).not.toBeNull();` — `tests/news-detail/DSR-566.news-detail.spec.ts:98`
- Expected vs actual: Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json · expect(received).not.toBeNull() · Received: null
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium-retry1/test-failed-1.png`

### DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) (`news-detail/DSR-566.news-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `await expect.soft(news.myList, 'My List button').toBeVisible();` — `tests/news-detail/DSR-566.news-detail.spec.ts:131`
- Expected vs actual: Error: My List button · expect(locator).toBeVisible() failed · Locator: locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list\|マイリスト/i }) · Expected: visible · Timeout: 5000ms · Error: element(s) not found · Call log: · - My List button locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list\|マイリスト/i }) with timeout 5000ms · - waiting for locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list\|マイリスト/i })
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium-retry1/test-failed-1.png`

### DSR-NEWS-018 [en] title, description and og tags non-empty (`news-detail/DSR-566.news-detail.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(content?.trim() ?? '', selector).not.toBe('');` — `tests/news-detail/DSR-566.news-detail.spec.ts:158`
- Expected vs actual: Error: meta[name="description"] · expect(received).not.toBe(expected) // Object.is equality · Expected: not ""
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll (`product-list/DSR-583.product-list.spec.ts`)

- 16/10: (new) → now: fail
- Failing assertion: `expect.soft(m.columns, `${label}: distinct column offsets`).toBe(columns);` — `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual: Error: 375: distinct column offsets · expect(received).toBe(expected) // Object.is equality · Expected: 2 · Received: 1
- Attempt(s): failed / failed
- Evidence paths: `test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll (`product-list/DSR-583.product-list.spec.ts`)

- 16/10: (new) → now: fail
- Failing assertion: `expect.soft(m.columns, `${label}: distinct column offsets`).toBe(columns);` — `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected vs actual: Error: 320: distinct column offsets · expect(received).toBe(expected) // Object.is equality · Expected: 2 · Received: 1
- Attempt(s): failed / failed
- Evidence paths: `test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads (`product-list/DSR-583.product-list.spec.ts`)

- 16/10: (new) → now: fail
- Failing assertion: `expect.soft(m.columns, `${step}: distinct column offsets`).toBe(spColumns);` — `tests/product-list/DSR-583.product-list.spec.ts:70`
- Expected vs actual: Error: open: distinct column offsets · expect(received).toBe(expected) // Object.is equality · Expected: 2 · Received: 1
- Attempt(s): failed / failed
- Evidence paths: `test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/test-failed-1.png`

### DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 (`product-list/DSR-583.product-list.spec.ts`)

- 16/10: (new) → now: fail
- Failing assertion: `expect.soft(m.columns, `${width}: distinct column offsets`).toBe(columns);` — `tests/product-list/DSR-583.product-list.spec.ts:153`
- Expected vs actual: Error: 1440: distinct column offsets · expect(received).toBe(expected) // Object.is equality · Expected: 4 · Received: 1
- Attempt(s): failed / failed
- Evidence paths: `test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium/test-failed-1.png`, `test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search (`top/DSR-609.top.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(changed, 'text/background colour changes on hover').not.toEqual([]);` — `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual: Error: text/background colour changes on hover · expect(received).not.toEqual(expected) // deep equality · Expected: not []
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (`top/DSR-609.top.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(rounded, `card ${i + 1} border-radius > 0 (card/media/img: ${JSON.stringify(c.radius)})`).toBe(true);` — `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) · expect(received).toBe(expected) // Object.is equality · Expected: true · Received: false
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date (`top/DSR-609.top.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(requestedPaths, `page requests ${newsIndexPath(lang)}`).toContain(newsIndexPath(lang));` — `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual: Error: page requests /ja/news/query-index.json · expect(received).toContain(expected) // indexOf · Expected value: "/ja/news/query-index.json" · Received array: ["/query-index.json"]
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (`top/DSR-609.top.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(m.lines, `${vp} item ${i + 1} title lines ≤ ${titleLineLimit[vp]}`).toBeLessThanOrEqual(titleLineLimit[vp]);` — `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual: Error: SP item 1 title lines ≤ 1 · expect(received).toBeLessThanOrEqual(expected) · Expected: <= 1 · Received:    2
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search (`top/DSR-609.top.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(changed, 'text/background colour changes on hover').not.toEqual([]);` — `tests/top/DSR-609.top.spec.ts:40`
- Expected vs actual: Error: text/background colour changes on hover · expect(received).not.toEqual(expected) // deep equality · Expected: not []
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link (`top/DSR-609.top.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(rounded, `card ${i + 1} border-radius > 0 (card/media/img: ${JSON.stringify(c.radius)})`).toBe(true);` — `tests/top/DSR-609.top.spec.ts:83`
- Expected vs actual: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) · expect(received).toBe(expected) // Object.is equality · Expected: true · Received: false
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date (`top/DSR-609.top.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(requestedPaths, `page requests ${newsIndexPath(lang)}`).toContain(newsIndexPath(lang));` — `tests/top/DSR-609.top.spec.ts:124`
- Expected vs actual: Error: page requests /en/news/query-index.json · expect(received).toContain(expected) // indexOf · Expected value: "/en/news/query-index.json" · Received array: ["/query-index.json"]
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP (`top/DSR-609.top.spec.ts`)

- 16/10: fail → now: fail
- Failing assertion: `expect.soft(m.lines, `${vp} item ${i + 1} title lines ≤ ${titleLineLimit[vp]}`).toBeLessThanOrEqual(titleLineLimit[vp]);` — `tests/top/DSR-609.top.spec.ts:160`
- Expected vs actual: Error: SP item 1 title lines ≤ 1 · expect(received).toBeLessThanOrEqual(expected) · Expected: <= 1 · Received:    2
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

## 7. Open points for QA

- **Report date.** The job names this file `automation-run-20261017.md` and describes the run as "2026-10-17". The run actually started on 2026-10-19 (UTC). Root AGENTS.md asks for the run-start date in the filename, but the job file takes precedence under the hub protocol, so I used the job's name. Rename it if the run-start date should win.
- **DSR-CATV-016/017 (skip → fail).** The blocked-data guard no longer triggers, so the tests now run. They fail at `tests/catalog-video/DSR-557.catalog-video.spec.ts:110` because the e-book popup redirects to an external page that has 1–2 `<form>` elements. The DSR link itself (href = ebookUrl, `_blank`) looked correct in JOB-20261016-10. Suspect test: the assertion counts forms on the external target. The test was not changed.
- **DSR-501-P2 retest (pass → fail).** The static HTML of `qa501-main-b` still contains "video title off" (the unavailable row). This matches JOB-20261017-01; in that run the DOM was correct. Suspect test/data, depending on whether the static-HTML check is in scope. P3 is now skipped by its stale-preview guard (static HTML has 5 relatedMovies rows, the query has 6).
- **DSR-BREAD-014 (fail → pass).** The 1440px page overflow is gone (it was 1456 > 1440 on 16/10). The breadcrumb spec has not changed since 16/10, so the page or product changed. The cause was not verified.
- **DSR-TOP-001 (fail/flaky → pass).** Explained by test commit 3ac42ec (bounded image-decode wait).
- **Side effects reverted, not committed.** The run rewrote tracked files: `evidence/DSR-552/DEV/*.png` (21 modified and 9 new files), codex's `ykk-dsr/hub/results/JOB-20261015-14/layout-*.json` (4) and codex's `ykk-dsr/hub/results/JOB-20261016-13/evidence/DSR-CATDL-015_DEV_01.png`. All were reverted or removed; a copy is in `/tmp/idle07/side-effects` (not in git). The DSR-570 visual spec now also writes into a tracked codex folder.
- **Matching method.** Previous results were matched by spec + test title (multiset per title) against the 16/10 report only. The 16/10 skipped table has no spec column, so skips were matched by title.
- The firefox/webkit projects were excluded because the job asked for chromium. Build identity was not independently verified.
