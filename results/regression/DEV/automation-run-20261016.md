# regression DEV automation run — 20261016

Job: `JOB-ZZ-IDLE-01` (idle nightly regression, all existing specs, read-only).

## 1. Header

- Run start (UTC): 2026-10-16T10:46:17Z
- Run end (UTC): 2026-10-16T10:58:53Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): all pages used by existing specs (DSR-173/501/587 movie detail, DSR-552 breadcrumb test-space, DSR-557 catalog/video, DSR-566 news detail, DSR-609 top page, smoke)
- Build under test: not independently verified (EDS `main` branch as published at run time)
- Baseline ID: per US as recorded in `docs/<US>/` (DSR-173: BL-v1); not re-verified in this run
- Automation HEAD commit SHA: 27bed78852ba453eaffad2a31bf344326062fa17
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/idle01/results.json npm run test:dev -- --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 152 | 72 (+1 flaky) | 22 | 57 | 1 | 2 | configured 1; 23 tests retried | 12m 34s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: full suite, chromium project only (the firefox/webkit projects, which only run DSR-BREAD-032, were not run). Flaky outcomes: 1 — DSR-TOP-001 [ja] SP timed out on attempt 1 (90 s), passed on retry (6.4 s).

### Changes vs previous run reports (`results/<US>/DEV/`)

| Spec | TC | Previous (report) | Now | Suspect |
|---|---|---|---|---|
| movie-detail/DSR-173.movie-detail.spec.ts | DSR-MOVIE-014 | pass (DSR-173 automation-run-20261007) | fail | product |
| movie-detail/DSR-173.movie-detail.spec.ts | DSR-MOVIE-033 | pass (DSR-173 automation-run-20261007) | fail | product |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [ja] PC | pass (DSR-609 automation-run-20261015) | fail (timeout) | test |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [en] PC | pass (DSR-609 automation-run-20261015) | fail (timeout) | test |
| top-page/DSR-609.visual-capture.spec.ts | DSR-TOP-001 [ja] SP | pass (DSR-609 automation-run-20261015) | flaky (pass on retry) | test |

No fail→pass changes. All other failures were already failing in the latest report for that test (DSR-BREAD-014, DSR-MOVIE-026, DSR-501-P2/P3 in the DSR-173 spec, DSR-NEWS-002/003/006/007/012/018, DSR-TOP-004/005/006/007 ja+en). Skip/fixme left as is.

## 4. Executed tests

Duration is per attempt (attempt 1 / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [ja] child trail follows URL hierarchy | passed | 5.1s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | passed | 4.8s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [ja] ancestor links navigate in same tab | passed | 9.6s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [ja] items equal page titles | passed | 5.7s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [en] child trail follows URL hierarchy | passed | 4.8s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | passed | 5.1s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [en] ancestor links navigate in same tab | passed | 9.6s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [en] items equal page titles | passed | 6.0s | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [ja] display name overrides page title | passed | 4.2s | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [en] display name overrides page title | passed | 4.6s | — |
| DSR-BREAD-014 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-014 [ja] 100-character display name keeps layout | failed | 7.7s / 8.2s | Error: 1440px: no horizontal page overflow  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1440 Received:    1456 |
| DSR-BREAD-015 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-015 [ja] special characters in display name are plain text | passed | 5.2s | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [ja] each language uses its own display names | passed | 2.6s | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [en] each language uses its own display names | passed | 2.5s | — |
| DSR-BREAD-020 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-020 PC breadcrumb baseline | passed | 2.7s | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline | passed | 3.0s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 5.8s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-002 ancestor links | passed | 16.5s | — |
| DSR-BREAD-003 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-003 current page is not linked | passed | 5.5s | — |
| DSR-BREAD-004 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-004 HOME label and destination | passed | 5.7s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 4.8s | — |
| DSR-BREAD-006 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-006 parent trail | passed | 6.0s | — |
| DSR-BREAD-007 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-007 missing intermediate page | passed | 4.4s | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 4.2s | — |
| DSR-BREAD-009 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-009 404 excludes breadcrumb | passed | 4.1s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-011 empty label uses title | passed | 5.2s | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 2.7s | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 2.4s | — |
| DSR-BREAD-027 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-027 semantic markup and accessibility | passed | 4.2s | — |
| DSR-BREAD-028 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-028 keyboard navigation | passed | 3.8s | — |
| DSR-BREAD-031 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-031 site-origin console errors | passed | 2.6s | — |
| DSR-BREAD-035 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-035 arrow asset origin and status | passed | 2.6s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 2.2s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 2.3s | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 2.3s | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 2.4s | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 2.1s | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 8.0s | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 10.1s | — |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 3.1s | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 3.0s | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 2.3s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click | passed | 3.3s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 2.6s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) | passed | 3.5s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 3.9s | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 5.7s | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 8.1s | — |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 3.0s | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 2.8s | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 2.9s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click | passed | 3.6s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 4.6s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) | passed | 3.4s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 3.6s | — |
| DSR-MOVIE-012 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-012 displays the exact movie title | passed | 1.9s | — |
| DSR-MOVIE-014 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-014 embeds the configured YouTube movie | failed | 8.5s / 8.8s | Error: expect(locator).toHaveAttribute(expected) failed  Locator: getByTestId('movie-detail-player-embed') Expected pattern: /\/embed\// Timeout: 5000 |
| DSR-MOVIE-036 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-036 no site-origin console errors on the movie component page | passed | 2.8s | — |
| DSR-MOVIE-026 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | failed | 13.3s / 9.2s | Error: Related card 1 thumbnail  expect(locator).toBeVisible() failed  Locator: getByTestId('related-content-card').first().getByTestId('related-conte |
| DSR-MOVIE-027 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-027 outputs exactly one title and og:title | passed | 1.5s | — |
| DSR-MOVIE-029 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | passed | 1.8s | — |
| DSR-MOVIE-033 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-033 displays component sections in vertical order on PC | failed | 7.1s / 6.8s | Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-player') Expected: visible Timeout: 5000ms Error: element(s) not found |
| DSR-MOVIE-034 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-034 displays the component back control | passed | 1.6s | — |
| DSR-501-P3 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P3 [en] related movies are limited to 5 in authored order | failed | 8.3s / 8.9s | Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-related-content') Expected: visible Timeout: 5000ms Error: element(s)  |
| DSR-501-P2 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | failed | 7.5s / 8.0s | Error: expect(locator).toBeVisible() failed  Locator: getByTestId('movie-detail-related-content') Expected: visible Timeout: 5000ms Error: element(s)  |
| DSR-501-P3 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P3 [en] related movies are max 5, newest updated first | passed | 3.1s | — |
| DSR-501-P2 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | passed | 4.8s | — |
| DSR-NEWS-001 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-001 [en] page shows date, category, title and body | passed | 2.9s | — |
| DSR-NEWS-002 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list | failed | 3.3s / 5.5s | Error: required elements missing  expect(received).toEqual(expected) // deep equality  - Expected  - 1 + Received  + 3  - Array [] + Array [ +   "back |
| DSR-NEWS-003 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [en] shown date equals meta publish date | failed | 3.8s / 2.4s | Error: expect(received).toBe(expected) // Object.is equality  Expected: "2026-09-29" Received: "2026-03-30" |
| DSR-NEWS-004 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-004 [en] category and title are non-empty text | passed | 2.3s | — |
| DSR-NEWS-006 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | failed | 6.9s / 7.4s | Error: Back to list link  expect(locator).toHaveCount(expected) failed  Locator:  locator('main').getByRole('link', { name: /back to list\|一覧へ戻る/i })  |
| DSR-NEWS-007 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | failed | 2.8s / 2.1s | Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json  expect(received).not.toBeNul |
| DSR-NEWS-009 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-009 [en] no related-content block | passed | 1.9s | — |
| DSR-NEWS-010 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | passed | 1.7s | — |
| DSR-NEWS-012 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | failed | 12.4s / 13.9s | Error: My List button  expect(locator).toBeVisible() failed  Locator: locator('main').locator('.article-meta.block').getByRole('button', { name: /my ? |
| DSR-NEWS-013 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | passed | 2.2s | — |
| DSR-NEWS-018 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [en] title, description and og tags non-empty | failed | 4.8s / 4.5s | Error: meta[name="description"]  expect(received).not.toBe(expected) // Object.is equality  Expected: not "" |
| SMOKE-001 | `smoke.spec.ts` › SMOKE-001 DSR-173 test page is reachable | passed | 0.8s | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | failed | 5.4s / 4.7s | Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not [] |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 4.4s / 5.7s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equality  Exp |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | failed | 5.2s / 3.4s | Error: page requests /ja/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/ja/news/query-index.json" Received  |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 3.9s / 7.5s | Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [ja] NEWS with empty query-index renders without error | passed | 7.5s | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [ja] main visual image is eager and is the LCP element | passed | 7.4s | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | failed | 7.2s / 8.7s | Error: text/background colour changes on hover  expect(received).not.toEqual(expected) // deep equality  Expected: not [] |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 7.0s / 7.5s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"})  expect(received).toBe(expected) // Object.is equality  Exp |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | failed | 7.7s / 7.4s | Error: page requests /en/news/query-index.json  expect(received).toContain(expected) // indexOf  Expected value: "/en/news/query-index.json" Received  |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 6.6s / 7.4s | Error: SP item 1 title lines ≤ 1  expect(received).toBeLessThanOrEqual(expected)  Expected: <= 1 Received:    2 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [en] NEWS with empty query-index renders without error | passed | 7.2s | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [en] main visual image is eager and is the LCP element | passed | 7.3s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | failed | 91.1s / 90.9s | Test timeout of 90000ms exceeded. |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | flaky (passed on retry) | 90.9s / 6.4s | Test timeout of 90000ms exceeded. |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] PC full-page capture and horizontal overflow | failed | 90.7s / 90.5s | Test timeout of 90000ms exceeded. |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] SP full-page capture and horizontal overflow | passed | 5.4s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-018 — DSR-BREAD-018 [cn] each language uses its own display names | cn: no /master/cn (Issue #18) |
| DSR-BREAD-019 — DSR-BREAD-019 Japanese and Chinese fonts | DSR-555 + cn |
| DSR-BREAD-021 — DSR-BREAD-021 SP breadcrumb and back control | DSR-575 Q5 (SP display) |
| DSR-BREAD-022 — DSR-BREAD-022 SP parent navigation | DSR-575 Q5 (SP display) |
| DSR-BREAD-023 — DSR-BREAD-023 narrow SP overflow | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 — DSR-BREAD-029 STG Lighthouse performance | Run on STG (Lighthouse) |
| DSR-BREAD-030 — DSR-BREAD-030 movie breadcrumb regression | DSR-536 / movie-detail placement |
| DSR-BREAD-033 — DSR-BREAD-033 all page types | Layout tickets |
| DSR-BREAD-034 — DSR-BREAD-034 responsive movie back control | DSR-536 / movie-detail placement |
| DSR-BREAD-001 — DSR-BREAD-001 child trail and placement | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 — DSR-BREAD-005 grandchild trail order | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 — DSR-BREAD-008 HOME excludes breadcrumb | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 — DSR-BREAD-017 localized HOME destinations | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 — DSR-BREAD-025 BreadcrumbList structured data | cn: no /master/cn (Issue #18) |
| DSR-CATV-016 — DSR-CATV-016 e-book item opens ebookUrl without form | QA190 e-book not rendered – blocked-data: QA-PT fixes ebookUrl 16/10 night |
| DSR-CATV-017 — DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | QA190 e-book form not rendered – blocked-data: QA-PT fixes ebookUrl 16/10 night |
| DSR-CATV-016 — DSR-CATV-016 e-book item opens ebookUrl without form | QA190 e-book not rendered – blocked-data: QA-PT fixes ebookUrl 16/10 night |
| DSR-CATV-017 — DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | QA190 e-book form not rendered – blocked-data: QA-PT fixes ebookUrl 16/10 night |
| DSR-MOVIE-020 — DSR-MOVIE-020 displays visible related product codes in order | Issue #1: related products specification pending |
| DSR-MOVIE-021 — DSR-MOVIE-021 sorts related content by update date descending | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023 — DSR-MOVIE-023 excludes unavailable and inactive related movies | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025 — DSR-MOVIE-025 navigates the related content carousel to its end | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 — DSR-MOVIE-028 removes line breaks from description metadata | Description line-break separator is unconfirmed |
| DSR-MOVIE-001 — DSR-MOVIE-001 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-002 — DSR-MOVIE-002 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-003 — DSR-MOVIE-003 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-004 — DSR-MOVIE-004 M: Universal Editor requires IMS login; manual only | M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005 — DSR-MOVIE-005 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-006 — DSR-MOVIE-006 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007 — DSR-MOVIE-007 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008 — DSR-MOVIE-008 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009 — DSR-MOVIE-009 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010 — DSR-MOVIE-010 B: URL structure not implemented, DSR-536 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011 — DSR-MOVIE-011 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-013 — DSR-MOVIE-013 C: overflow automation deferred; CJK font manual | C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015 — DSR-MOVIE-015 C: iframe source automation deferred; playback manual | C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016 — DSR-MOVIE-016 B: movie-detail-player-video not implemented, DAM test data pending | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017 — DSR-MOVIE-017 B: movie-detail-player-video not implemented, DAM test data pending | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018 — DSR-MOVIE-018 B: test data pending (docs/DSR-173/test-data.md); Issue #12 | B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019 — DSR-MOVIE-019 C: layout automation deferred; in-iframe error manual | C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022 — DSR-MOVIE-022 B: test data pending (docs/DSR-173/test-data.md) | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024 — DSR-MOVIE-024 B: test data pending (docs/DSR-173/test-data.md) | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030 — DSR-MOVIE-030 M: SNS debuggers need login and public URL; manual only | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 — DSR-MOVIE-031 B: page auto-generation not implemented | B: page auto-generation not implemented |
| DSR-MOVIE-032 — DSR-MOVIE-032 B: ja/zh pages not available | B: ja/zh pages not available |
| DSR-MOVIE-035 — DSR-MOVIE-035 B: SP design pending | B: SP design pending |
| DSR-NEWS-001 — DSR-NEWS-001 [ja] page shows date, category, title and body | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-002 — DSR-NEWS-002 [ja] fixed order date → category → title → body → CTA → Back to list | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-003 — DSR-NEWS-003 [ja] shown date equals meta publish date | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-004 — DSR-NEWS-004 [ja] category and title are non-empty text | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-006 — DSR-NEWS-006 [ja] Back to list href resolves to /ja/news/ | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-007 — DSR-NEWS-007 [ja] page row in query-index with publishDate/category/tags/template | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-009 — DSR-NEWS-009 [ja] no related-content block | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-010 — DSR-NEWS-010 [ja] CTA (Button8) href equals authored URL | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-012 — DSR-NEWS-012 [ja] My List button and share icons visible and enabled (no click) | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-013 — DSR-NEWS-013 [ja] body keeps h2/h3, strong, ul/ol, a when present | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-018 — DSR-NEWS-018 [ja] title, description and og tags non-empty | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |

## 6. Failed tests

### DSR-BREAD-014 [ja] 100-character display name keeps layout

- Failing assertion: `expect.soft(metrics.documentScrollWidth, `${name}px: no horizontal page overflow`).toBeLessThanOrEqual(metrics.viewportWidth);` — `tests/breadcrumb/DSR-552.breadcrumb.spec.ts:200`
- Message: Error: 1440px: no horizontal page overflow · Expected: <= 1440 · Received:    1456
- Attempt(s): failed / failed
- Evidence paths: `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium/attachments/014-1440-4aceacdc2a2e8e522239039498dd6fe36af3bcbf.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium/attachments/014-1024-9e283ad84d273766eac925f4f87ae9a9bbd2b97a.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium/attachments/014-375-2c7a079e7371f0c0aaceaf0c9fac5b7754a1e1e2.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium/test-failed-1.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium/attachments/ja-evidence-38e3431b506238f9659acb9e6d6abdb109d7747d.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium-retry1/attachments/014-1440-4aceacdc2a2e8e522239039498dd6fe36af3bcbf.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium-retry1/attachments/014-1024-9e283ad84d273766eac925f4f87ae9a9bbd2b97a.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium-retry1/attachments/014-375-2c7a079e7371f0c0aaceaf0c9fac5b7754a1e1e2.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium-retry1/test-failed-1.png`, `test-results/breadcrumb-DSR-552.breadcr-b08da-r-display-name-keeps-layout-chromium-retry1/attachments/ja-evidence-38e3431b506238f9659acb9e6d6abdb109d7747d.png`

### DSR-MOVIE-014 embeds the configured YouTube movie

- Failing assertion: `await expect(movie.playerEmbed).toHaveAttribute('src', /\/embed\//);` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:32`
- Message: Error: expect(locator).toHaveAttribute(expected) failed · Locator: getByTestId('movie-detail-player-embed') · Error: element(s) not found
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-026 displays related thumbnails, types, tags and valid links

- Failing assertion: `await expect.soft(image, `${label} thumbnail`).toBeVisible({ timeout: 1_000 });` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:141`
- Message: Error: Related card 1 thumbnail · Locator: getByTestId('related-content-card').first().getByTestId('related-content-card-image') · Error: element(s) not found
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`

### DSR-MOVIE-033 displays component sections in vertical order on PC

- Failing assertion: `await expect(section).toBeVisible();` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:201`
- Message: Error: expect(locator).toBeVisible() failed · Locator: getByTestId('movie-detail-player') · Error: element(s) not found
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium-retry1/test-failed-1.png`

### DSR-501-P3 [en] related movies are limited to 5 in authored order

- Failing assertion: `await expect(movie.relatedContentSection).toBeVisible();` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:268`
- Message: Error: expect(locator).toBeVisible() failed · Locator: getByTestId('movie-detail-related-content') · Error: element(s) not found
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium-retry1/test-failed-1.png`

### DSR-501-P2 [en] unavailable related movie is not displayed

- Failing assertion: `await expect(movie.relatedContentSection).toBeVisible();` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:275`
- Message: Error: expect(locator).toBeVisible() failed · Locator: getByTestId('movie-detail-related-content') · Error: element(s) not found
- Attempt(s): failed / failed
- Evidence paths: `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium/test-failed-1.png`, `test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium-retry1/test-failed-1.png`

### DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list

- Failing assertion: `expect(missing, 'required elements missing').toEqual([]);` — `tests/news-detail/DSR-566.news-detail.spec.ts:44`
- Message: Error: required elements missing
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium-retry1/test-failed-1.png`

### DSR-NEWS-003 [en] shown date equals meta publish date

- Failing assertion: `expect(isoDate(shown)).toBe(isoDate(meta));` — `tests/news-detail/DSR-566.news-detail.spec.ts:57`
- Message: Error: expect(received).toBe(expected) // Object.is equality · Expected: "2026-09-29" · Received: "2026-03-30"
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium-retry1/test-failed-1.png`

### DSR-NEWS-006 [en] Back to list href resolves to /en/news/

- Failing assertion: `await expect(news.backToList, 'Back to list link').toHaveCount(1);` — `tests/news-detail/DSR-566.news-detail.spec.ts:76`
- Message: Error: Back to list link · Locator:  locator('main').getByRole('link', { name: /back to list|一覧へ戻る/i }) · Received: 0
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium-retry1/test-failed-1.png`

### DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template

- Failing assertion: `expect(found, `page ${path} in ${queryIndexPaths(lang).join(' or ')}`).not.toBeNull();` — `tests/news-detail/DSR-566.news-detail.spec.ts:98`
- Message: Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json · Received: null
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium-retry1/test-failed-1.png`

### DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click)

- Failing assertion: `await expect.soft(news.myList, 'My List button').toBeVisible();` — `tests/news-detail/DSR-566.news-detail.spec.ts:131`
- Message: Error: My List button · Locator: locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list|マイリスト/i }) · Error: element(s) not found
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium-retry1/test-failed-1.png`

### DSR-NEWS-018 [en] title, description and og tags non-empty

- Failing assertion: `expect.soft(content?.trim() ?? '', selector).not.toBe('');` — `tests/news-detail/DSR-566.news-detail.spec.ts:158`
- Message: Error: meta[name="description"] · Expected: not ""
- Attempt(s): failed / failed
- Evidence paths: `test-results/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium/test-failed-1.png`, `test-results/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `expect.soft(changed, 'text/background colour changes on hover').not.toEqual([]);` — `tests/top/DSR-609.top.spec.ts:40`
- Message: Error: text/background colour changes on hover · Expected: not []
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `expect.soft(rounded, `card ${i + 1} border-radius > 0 (card/media/img: ${JSON.stringify(c.radius)})`).toBe(true);` — `tests/top/DSR-609.top.spec.ts:83`
- Message: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) · Expected: true · Received: false
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `expect.soft(requestedPaths, `page requests ${newsIndexPath(lang)}`).toContain(newsIndexPath(lang));` — `tests/top/DSR-609.top.spec.ts:124`
- Message: Error: page requests /ja/news/query-index.json · Expected value: "/ja/news/query-index.json" · Received array: ["/query-index.json"]
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `expect.soft(m.lines, `${vp} item ${i + 1} title lines ≤ ${titleLineLimit[vp]}`).toBeLessThanOrEqual(titleLineLimit[vp]);` — `tests/top/DSR-609.top.spec.ts:160`
- Message: Error: SP item 1 title lines ≤ 1 · Expected: <= 1 · Received:    2
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

### DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `expect.soft(changed, 'text/background colour changes on hover').not.toEqual([]);` — `tests/top/DSR-609.top.spec.ts:40`
- Message: Error: text/background colour changes on hover · Expected: not []
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium-retry1/test-failed-1.png`

### DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `expect.soft(rounded, `card ${i + 1} border-radius > 0 (card/media/img: ${JSON.stringify(c.radius)})`).toBe(true);` — `tests/top/DSR-609.top.spec.ts:83`
- Message: Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) · Expected: true · Received: false
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png`

### DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `expect.soft(requestedPaths, `page requests ${newsIndexPath(lang)}`).toContain(newsIndexPath(lang));` — `tests/top/DSR-609.top.spec.ts:124`
- Message: Error: page requests /en/news/query-index.json · Expected value: "/en/news/query-index.json" · Received array: ["/query-index.json"]
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png`

### DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `expect.soft(m.lines, `${vp} item ${i + 1} title lines ≤ ${titleLineLimit[vp]}`).toBeLessThanOrEqual(titleLineLimit[vp]);` — `tests/top/DSR-609.top.spec.ts:160`
- Message: Error: SP item 1 title lines ≤ 1 · Expected: <= 1 · Received:    2
- Attempt(s): failed / failed
- Evidence paths: `test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png`, `test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png`

### DSR-TOP-001 [ja] PC full-page capture and horizontal overflow

- Failing assertion: `Test timeout of 90000ms exceeded.` — `tests/top-page/DSR-609.visual-capture.spec.ts (timeout, no assertion)`
- Message: Test timeout of 90000ms exceeded.
- Attempt(s): timedOut / timedOut
- Evidence paths: `test-results/top-page-DSR-609.visual-ca-2fe07-ure-and-horizontal-overflow-chromium/test-failed-1.png`, `test-results/top-page-DSR-609.visual-ca-2fe07-ure-and-horizontal-overflow-chromium-retry1/test-failed-1.png`

### DSR-TOP-001 [en] PC full-page capture and horizontal overflow

- Failing assertion: `Test timeout of 90000ms exceeded.` — `tests/top-page/DSR-609.visual-capture.spec.ts (timeout, no assertion)`
- Message: Test timeout of 90000ms exceeded.
- Attempt(s): timedOut / timedOut
- Evidence paths: `test-results/top-page-DSR-609.visual-ca-f5585-ure-and-horizontal-overflow-chromium/test-failed-1.png`, `test-results/top-page-DSR-609.visual-ca-f5585-ure-and-horizontal-overflow-chromium-retry1/test-failed-1.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. Copies of the new-failure screenshots are committed in `ykk-dsr/hub/results/JOB-ZZ-IDLE-01/evidence/`.

## 7. Open points for QA

- DSR-MOVIE-014/033 (new): on `/master/en/test-space/dsr-173-video-detail` the player (`movie-detail-player`, `movie-detail-player-embed`) and the related-products section are no longer rendered; title "movieTitle", back link and Related Content still render. The page HTML is unchanged (`last-modified: Mon, 05 Oct 2026 07:26:42 GMT`, only `video-detail` block with `movieid-01`), so the change is in client-side rendering or in the `movieid-01` CF data. Suspect product (dev deploy); the CF data was not checked, so data is possible too.
- DSR-TOP-001 PC (new): both languages hit the 90 s test timeout inside the scroll/`img.decode()` `page.evaluate` (`tests/top-page/DSR-609.visual-capture.spec.ts:22`); SP passed in 5–6 s. Suspect test: the image-decode wait has no time limit. A slow page or a new lazy image (product/env) was not ruled out.
- Side effects of the run were reverted and not committed: the DSR-552 spec rewrote `evidence/DSR-552/DEV/*.png`, and the DSR-609 visual-capture spec rewrote codex's `ykk-dsr/hub/results/JOB-20261015-14/layout-*-sp.json`. Both specs write to tracked paths on every run.
- The firefox/webkit projects (DSR-BREAD-032 only) were excluded because the job asked for chromium.
- Previous results were matched by TC ID + language against the most recent committed report that included that test. Reports for subset runs only cover their own TCs.
- Build identity was not independently verified.
