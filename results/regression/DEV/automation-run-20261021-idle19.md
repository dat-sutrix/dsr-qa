# regression DEV automation run — 20261021-idle19 (JOB-ZZ-IDLE-19)

## 1. Header

- Run start (UTC): 2026-10-21T01:13:35Z
- Run end (UTC): 2026-10-21T01:32:57Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): all specs under tests/ (23 spec files)
- Build under test: not independently verified (EDS main branch on DEV at run time)
- Baseline ID: per US — docs/<US>/ (e.g. DSR-173/DSR-529 BL-v1, DSR-587 BL-OVL-1); not re-verified in this run
- Automation HEAD commit SHA: 6e06ab85cc0f5b688127ad41a08a7aa3a70544ea + uncommitted locator change in pages/ArticleDetailPage.ts (see §7)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/idle19.json npm run test:dev
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run immediately before the aborted run 1, 2026-10-21T00:53Z; re-run 01:33Z after final locator change: exit 0, no errors)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 345 | 116 | 64 | 165 | 1 | 2 | 1 configured; 65 tests retried | 1162 s (19.4 min) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: full suite; chromium (all specs) + firefox/webkit (DSR-BREAD-032 only). Flaky outcomes: 1 — DSR-CATDL-015 [ja] (passed on retry).

## 4. Executed tests

Duration is summed over attempts (initial + retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 [ja] | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail | 16.4s | Error: required blocks missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Ar |
| DSR-ARTICLE-003 [ja] | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | pass | 7.6s | — |
| DSR-ARTICLE-006 [ja] | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | fail | 15.1s | Error: tag labels — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 63 \|       con |
| DSR-ARTICLE-007 [ja] | DSR-ARTICLE-007 [ja] info bar date = meta published-date | fail | 17.3s | Error: expect(received).toBe(expected) // Object.is equality — Expected: null — Received: "2026-10-01" — 75 \|       observations.push({ show |
| DSR-ARTICLE-008 [ja] | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 8.6s | — |
| DSR-ARTICLE-010 [ja] | DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible | fail | 19.1s | Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 99 \| |
| DSR-ARTICLE-011 [ja] | DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail | 18.9s | Error: absolute URL — expect(received).toMatch(expected) — Expected pattern: /^https?:\/\// — Received string:  "/content/dam/ykk/digital-sh |
| DSR-ARTICLE-012 [ja] | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | fail | 19.9s | Error: category tag IDs — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 130 \|    |
| DSR-ARTICLE-013 [ja] | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | pass | 8.3s | — |
| DSR-ARTICLE-014 [ja] | DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | fail | 19.5s | Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 155  |
| DSR-ARTICLE-016 [ja] | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail | 21.0s | Error: qa529-01 robots — expect(received).not.toMatch(expected) — Expected pattern: not /noindex/i — Received string:      "noindex, nofollo |
| DSR-ARTICLE-024 [ja] | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 19.3s | Error: viewAllStories href — expect(received).not.toMatch(expected) — Expected pattern: not /^(#?)$/ — Received string:      "#" — 188 \|     |
| DSR-ARTICLE-029 [ja] | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | pass | 2.6s | — |
| DSR-ARTICLE-002 [en] | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail | 7.3s | Error: required blocks missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Ar |
| DSR-ARTICLE-003 [en] | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | pass | 2.0s | — |
| DSR-ARTICLE-006 [en] | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | fail | 4.5s | Error: tag labels — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 63 \|       con |
| DSR-ARTICLE-007 [en] | DSR-ARTICLE-007 [en] info bar date = meta published-date | fail | 5.7s | Error: expect(received).toBe(expected) // Object.is equality — Expected: null — Received: "2026-10-01" — 75 \|       observations.push({ show |
| DSR-ARTICLE-008 [en] | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 2.1s | — |
| DSR-ARTICLE-010 [en] | DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible | fail | 4.7s | Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 99 \| |
| DSR-ARTICLE-011 [en] | DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail | 4.9s | Error: absolute URL — expect(received).toMatch(expected) — Expected pattern: /^https?:\/\// — Received string:  "/content/dam/ykk/digital-sh |
| DSR-ARTICLE-012 [en] | DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | fail | 4.4s | Error: category tag IDs — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 130 \|    |
| DSR-ARTICLE-013 [en] | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | pass | 2.1s | — |
| DSR-ARTICLE-014 [en] | DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | fail | 4.9s | Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 155  |
| DSR-ARTICLE-016 [en] | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail | 4.6s | Error: qa529-01 robots — expect(received).not.toMatch(expected) — Expected pattern: not /noindex/i — Received string:      "noindex, nofollo |
| DSR-ARTICLE-024 [en] | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 5.1s | Error: viewAllStories href — expect(received).not.toMatch(expected) — Expected pattern: not /^(#?)$/ — Received string:      "#" — 188 \|     |
| DSR-ARTICLE-029 [en] | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | pass | 2.2s | — |
| DSR-ARTICLE-015 [ja] | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | pass | 2.2s | — |
| DSR-ARTICLE-020 [ja] | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | fail | 6.8s | Error: visible related stories block — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 6 — - Array []  |
| DSR-ARTICLE-023 [ja] | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | fail | 5.4s | Error: visible related items heading — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 6 — - Array []  |
| DSR-ARTICLE-025 [ja] | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | pass | 1.8s | — |
| DSR-ARTICLE-009 [ja] | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | pass | 3.5s | — |
| DSR-ARTICLE-030 [ja] | DSR-ARTICLE-030 [ja] qa529-01 1440x900 capture only | pass | 9.5s | — |
| DSR-ARTICLE-031 [ja] | DSR-ARTICLE-031 [ja] qa529-01 390x844 capture only | pass | 8.6s | — |
| DSR-ARTICLE-030 [en] | DSR-ARTICLE-030 [en] qa529-01 1440x900 capture only | pass | 8.5s | — |
| DSR-ARTICLE-031 [en] | DSR-ARTICLE-031 [en] qa529-01 390x844 capture only | pass | 8.3s | — |
| DSR-ARTICLE-030 [ja] | DSR-ARTICLE-030 [ja] qa529-02 1440x900 capture only | pass | 8.1s | — |
| DSR-ARTICLE-031 [ja] | DSR-ARTICLE-031 [ja] qa529-02 390x844 capture only | pass | 8.3s | — |
| DSR-BREAD-001 [ja] | DSR-BREAD-001 [ja] child trail follows URL hierarchy | pass | 4.1s | — |
| DSR-BREAD-005 [ja] | DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | pass | 4.5s | — |
| DSR-BREAD-002 [ja] | DSR-BREAD-002 [ja] ancestor links navigate in same tab | pass | 12.5s | — |
| DSR-BREAD-011 [ja] | DSR-BREAD-011 [ja] items equal page titles | pass | 5.8s | — |
| DSR-BREAD-001 [en] | DSR-BREAD-001 [en] child trail follows URL hierarchy | pass | 4.4s | — |
| DSR-BREAD-005 [en] | DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | pass | 4.5s | — |
| DSR-BREAD-002 [en] | DSR-BREAD-002 [en] ancestor links navigate in same tab | pass | 7.4s | — |
| DSR-BREAD-011 [en] | DSR-BREAD-011 [en] items equal page titles | pass | 2.5s | — |
| DSR-BREAD-010 [ja] | DSR-BREAD-010 [ja] display name overrides page title | pass | 4.0s | — |
| DSR-BREAD-010 [en] | DSR-BREAD-010 [en] display name overrides page title | pass | 3.7s | — |
| DSR-BREAD-014 [ja] | DSR-BREAD-014 [ja] 100-character display name keeps layout | pass | 5.3s | — |
| DSR-BREAD-015 [ja] | DSR-BREAD-015 [ja] special characters in display name are plain text | pass | 3.6s | — |
| DSR-BREAD-018 [ja] | DSR-BREAD-018 [ja] each language uses its own display names | pass | 2.4s | — |
| DSR-BREAD-018 [en] | DSR-BREAD-018 [en] each language uses its own display names | pass | 2.2s | — |
| DSR-BREAD-020 [-] | DSR-BREAD-020 PC breadcrumb baseline | pass | 2.4s | — |
| DSR-BREAD-032 [-] | DSR-BREAD-032 cross-browser baseline | pass | 2.5s | — |
| DSR-BREAD-032 [-] | DSR-BREAD-032 cross-browser baseline | fail (firefox) | 13.3s | Error: expect(locator).toHaveScreenshot(expected) failed — Locator: locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTest |
| DSR-BREAD-032 [-] | DSR-BREAD-032 cross-browser baseline | fail (webkit) | 0.0s | Error: browserType.launch: — ╔══════════════════════════════════════════════════════╗ — ║ Host system is missing dependencies to run browser |
| DSR-BREAD-001 [ja] | DSR-BREAD-001 child trail and placement | pass | 2.3s | — |
| DSR-BREAD-002 [ja] | DSR-BREAD-002 ancestor links | pass | 9.7s | — |
| DSR-BREAD-003 [ja] | DSR-BREAD-003 current page is not linked | pass | 2.4s | — |
| DSR-BREAD-004 [ja] | DSR-BREAD-004 HOME label and destination | pass | 2.3s | — |
| DSR-BREAD-005 [ja] | DSR-BREAD-005 grandchild trail order | pass | 2.0s | — |
| DSR-BREAD-006 [ja] | DSR-BREAD-006 parent trail | pass | 2.1s | — |
| DSR-BREAD-007 [ja] | DSR-BREAD-007 missing intermediate page | pass | 0.8s | — |
| DSR-BREAD-008 [ja] | DSR-BREAD-008 HOME excludes breadcrumb | pass | 1.5s | — |
| DSR-BREAD-009 [ja] | DSR-BREAD-009 404 excludes breadcrumb | pass | 1.8s | — |
| DSR-BREAD-011 [ja] | DSR-BREAD-011 empty label uses title | pass | 2.9s | — |
| DSR-BREAD-017 [ja] | DSR-BREAD-017 localized HOME destinations | pass | 2.2s | — |
| DSR-BREAD-025 [ja] | DSR-BREAD-025 BreadcrumbList structured data | pass | 2.1s | — |
| DSR-BREAD-027 [ja] | DSR-BREAD-027 semantic markup and accessibility | pass | 3.6s | — |
| DSR-BREAD-028 [ja] | DSR-BREAD-028 keyboard navigation | pass | 2.9s | — |
| DSR-BREAD-031 [ja] | DSR-BREAD-031 site-origin console errors | pass | 2.2s | — |
| DSR-BREAD-035 [ja] | DSR-BREAD-035 arrow asset origin and status | pass | 2.3s | — |
| DSR-BREAD-001 [en] | DSR-BREAD-001 child trail and placement | pass | 2.1s | — |
| DSR-BREAD-005 [en] | DSR-BREAD-005 grandchild trail order | pass | 1.9s | — |
| DSR-BREAD-008 [en] | DSR-BREAD-008 HOME excludes breadcrumb | pass | 1.5s | — |
| DSR-BREAD-017 [en] | DSR-BREAD-017 localized HOME destinations | pass | 2.2s | — |
| DSR-BREAD-025 [en] | DSR-BREAD-025 BreadcrumbList structured data | pass | 2.2s | — |
| DSR-CATDL-014 [ja] | DSR-CATDL-014 [ja] capture catalog download form at 1440px | pass | 2.1s | — |
| DSR-CATDL-015 [ja] | DSR-CATDL-015 [ja] capture catalog download form at 375px | pass (flaky) | 32.7s | — |
| DSR-CATDL-001 [ja] | DSR-CATDL-001 [ja] catalog detail header renders | pass | 1.3s | — |
| DSR-CATDL-002 [ja] | DSR-CATDL-002 [ja] download form fields, labels, consent and button present | pass | 1.5s | — |
| DSR-CATDL-005 [ja] | DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | pass | 2.1s | — |
| DSR-CATDL-006 [ja] | DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | fail | 15.9s | Error: expect(locator).toHaveCount(expected) failed — Locator:  locator('.catalog-detail.block').locator('form') — Expected: 1 — Received: 0 |
| DSR-CATDL-018 [ja] | DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | fail | 61.3s | Test timeout of 30000ms exceeded. |
| DSR-CATDL-005 [en] | DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | pass | 6.0s | — |
| DSR-CATDL-006 [en] | DSR-CATDL-006 [en] requiresForm=true card leads to the download form | fail | 20.5s | Error: expect(locator).toHaveCount(expected) failed — Locator:  locator('.catalog-detail.block').locator('form') — Expected: 1 — Received: 0 |
| DSR-CATDL-018 [en] | DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | fail | 61.1s | Test timeout of 30000ms exceeded. |
| DSR-CATDL-003 [ja] | DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | pass | 3.9s | — |
| DSR-CATDL-007 [ja] | DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | fail | 8.3s | Error: gated PDF URL delivered to the browser before submit — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Rece |
| DSR-CATDL-010 [ja] | DSR-CATDL-010 [ja] catalog ID handed to the form | pass | 2.9s | — |
| DSR-CATV-012 [ja] | DSR-CATV-012 catalog item shows thumbnail and title | pass | 6.7s | — |
| DSR-CATV-013 [ja] | DSR-CATV-013 PDF item without form opens in a new tab | pass | 7.0s | — |
| DSR-CATV-016 [ja] | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 5.2s | — |
| DSR-CATV-017 [ja] | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | fail | 3.7s | Error: expect(received).toBe(expected) // Object.is equality — Expected: "https://www.ykkfastening.com/" — Received: "https://main--dsr-eds- |
| DSR-CATV-018 [ja] | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 6.0s | — |
| DSR-CATV-019 [ja] | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 3.5s | — |
| DSR-CATV-020 [ja] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 2.3s | — |
| DSR-CATV-001 [ja] | DSR-CATV-001 no autoplay before click | pass | 2.5s | — |
| DSR-CATV-002 [ja] | DSR-CATV-002 YouTube embed src after click (sort-main) | pass | 2.4s | — |
| DSR-CATV-002 [ja] | DSR-CATV-002 YouTube embed src after click (long) | pass | 2.1s | — |
| DSR-CATV-006 [ja] | DSR-CATV-006 no YouTube/Youku request before interaction | pass | 2.2s | — |
| DSR-CATV-012 [en] | DSR-CATV-012 catalog item shows thumbnail and title | pass | 6.4s | — |
| DSR-CATV-013 [en] | DSR-CATV-013 PDF item without form opens in a new tab | pass | 6.6s | — |
| DSR-CATV-016 [en] | DSR-CATV-016 e-book item opens ebookUrl without form | pass | 7.2s | — |
| DSR-CATV-017 [en] | DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | fail | 7.9s | Error: expect(received).toBe(expected) // Object.is equality — Expected: "https://www.ykkfastening.com/" — Received: "https://main--dsr-eds- |
| DSR-CATV-018 [en] | DSR-CATV-018 NEW label within 10 days of publishDate | pass | 4.6s | — |
| DSR-CATV-019 [en] | DSR-CATV-019 UPDATE label within 10 days of updateDate | pass | 5.1s | — |
| DSR-CATV-020 [en] | DSR-CATV-020 only NEW when publishDate and updateDate both apply | pass | 4.5s | — |
| DSR-CATV-001 [en] | DSR-CATV-001 no autoplay before click | pass | 6.5s | — |
| DSR-CATV-002 [en] | DSR-CATV-002 YouTube embed src after click (sort-main) | pass | 5.2s | — |
| DSR-CATV-002 [en] | DSR-CATV-002 YouTube embed src after click (long) | pass | 4.7s | — |
| DSR-CATV-006 [en] | DSR-CATV-006 no YouTube/Youku request before interaction | pass | 6.4s | — |
| DSR-ECO-001 [ja] | DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | pass | 5.8s | — |
| DSR-ECO-002 [ja] | DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language) | fail | 12.3s | Error: VIEW MORE not on site with same language prefix — expect(received).toEqual(expected) // deep equality — - Expected  -  1 — + Received |
| DSR-ECO-004 [ja] | DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200) | fail | 12.5s | Error: finder URL (P087), same language — expect(received).toContain(expected) // indexOf — Expected value: "" — Received array: ["/ja/produ |
| DSR-ECO-003 [ja] | DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | pass | 17.7s | — |
| DSR-ECO-012 [ja] | DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | pass | 5.0s | — |
| DSR-ECO-013 [ja] | DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | pass | 5.4s | — |
| DSR-ECO-014 [ja] | DSR-ECO-014 [ja] stable PC initial, Next, dot 5 and fullPage captures | pass | 9.4s | — |
| DSR-ECO-016 [ja] | DSR-ECO-016 [ja] stable SP initial and swipe captures | pass | 7.4s | — |
| DSR-ECO-014 [ja] | DSR-ECO-014 [ja] PC carousel visual capture and measurements | pass | 6.8s | — |
| DSR-ECO-016 [ja] | DSR-ECO-016 [ja] SP capture, horizontal overflow and carousel interaction facts | pass | 7.1s | — |
| DSR-ICON-006 [ja] | DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error | fail | 11.4s | Error: console errors — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 3 — - Array [] — + Array [ — + |
| DSR-ICON-006 [en] | DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error | fail | 19.2s | Error: console errors — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 3 — - Array [] — + Array [ — + |
| DSR-MAIL-016 [-] | DSR-MAIL-016 [—] webhook GET without auth is refused | pass | 0.5s | — |
| DSR-MAIL-017 [-] | DSR-MAIL-017 [—] test-send GET without params or auth is not public | pass | 0.4s | — |
| DSR-MOVIE-012 [-] | DSR-MOVIE-012 displays the exact movie title | pass | 4.0s | — |
| DSR-MOVIE-014 [-] | DSR-MOVIE-014 embeds the configured YouTube movie | fail | 18.2s | Error: expect(locator).toHaveAttribute(expected) failed — Locator: getByTestId('movie-detail-player-embed') — Expected pattern: /\/embed\//  |
| DSR-MOVIE-036 [-] | DSR-MOVIE-036 no site-origin console errors on the movie component page | pass | 4.7s | — |
| DSR-MOVIE-026 [-] | DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | fail | 33.0s | Error: Related card 1 thumbnail — expect(locator).toBeVisible() failed — Locator: getByTestId('related-content-card').first().getByTestId('r |
| DSR-MOVIE-027 [-] | DSR-MOVIE-027 outputs exactly one title and og:title | pass | 4.4s | — |
| DSR-MOVIE-029 [-] | DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | pass | 5.8s | — |
| DSR-MOVIE-033 [-] | DSR-MOVIE-033 displays component sections in vertical order on PC | fail | 19.2s | Error: expect(locator).toBeVisible() failed — Locator: getByTestId('movie-detail-player') — Expected: visible — Timeout: 5000ms — Error: ele |
| DSR-MOVIE-034 [-] | DSR-MOVIE-034 displays the component back control | pass | 4.0s | — |
| DSR-501-P3 [en] | DSR-501-P3 [en] related movies are limited to 5 in authored order | fail | 20.6s | Error: expect(locator).toBeVisible() failed — Locator: getByTestId('movie-detail-related-content') — Expected: visible — Timeout: 5000ms — E |
| DSR-501-P2 [en] | DSR-501-P2 [en] unavailable related movie is not displayed | fail | 19.6s | Error: expect(locator).toBeVisible() failed — Locator: getByTestId('movie-detail-related-content') — Expected: visible — Timeout: 5000ms — E |
| DSR-VOV-011 [ja] | DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | fail | 4.4s | Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/search — expect(received).toBe(expected) // Object.is equality — |
| DSR-VOV-011 [en] | DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | fail | 4.5s | Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/search — expect(received).toBe(expected) // Object.is equality — |
| DSR-501-P2 [en] | DSR-501-P2 [en] unavailable related movie is not displayed | pass | 6.9s | — |
| DSR-NEWS-001 [en] | DSR-NEWS-001 [en] page shows date, category, title and body | pass | 6.3s | — |
| DSR-NEWS-002 [en] | DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list | fail | 12.5s | Error: required elements missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 3 — - Array [] — +  |
| DSR-NEWS-003 [en] | DSR-NEWS-003 [en] shown date equals meta publish date | fail | 12.6s | Error: expect(received).toBe(expected) // Object.is equality — Expected: "2026-09-29" — Received: "2026-03-30" — 55 \|       observations.pus |
| DSR-NEWS-004 [en] | DSR-NEWS-004 [en] category and title are non-empty text | pass | 7.3s | — |
| DSR-NEWS-006 [en] | DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | fail | 22.2s | Error: Back to list link — expect(locator).toHaveCount(expected) failed — Locator:  locator('main').getByRole('link', { name: /back to list\| |
| DSR-NEWS-007 [en] | DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | fail | 14.8s | Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json — expect(received). |
| DSR-NEWS-009 [en] | DSR-NEWS-009 [en] no related-content block | pass | 2.8s | — |
| DSR-NEWS-010 [en] | DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | pass | 1.7s | — |
| DSR-NEWS-012 [en] | DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | fail | 24.2s | Error: My List button — expect(locator).toBeVisible() failed — Locator: locator('main').locator('.article-meta.block').getByRole('button', { |
| DSR-NEWS-013 [en] | DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | pass | 1.7s | — |
| DSR-NEWS-018 [en] | DSR-NEWS-018 [en] title, description and og tags non-empty | fail | 7.9s | Error: meta[name="description"] — expect(received).not.toBe(expected) // Object.is equality — Expected: not "" — 156 \|       for (const sele |
| DSR-PLSP-001 [ja] | DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | pass | 6.4s | — |
| DSR-PLSP-002 [ja] | DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | fail | 34.1s | Error: 320: cards overflowing their column — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Arr |
| DSR-PLSP-003 [ja] | DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | fail | 62.0s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 [ja] | DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | fail | 16.1s | Error: 3 results: left aligned — expect(received).toBe(expected) // Object.is equality — Expected: 0 — Received: 2 — 128 \|       observation |
| DSR-PLSP-004 [ja] | DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | pass | 9.9s | — |
| DSR-PLSP-001 [en] | DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | pass | 6.6s | — |
| DSR-PLSP-002 [en] | DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | fail | 35.2s | Error: 320: cards overflowing their column — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Arr |
| DSR-PLSP-003 [en] | DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | fail | 60.9s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 [en] | DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | fail | 17.9s | Error: 3 results: left aligned — expect(received).toBe(expected) // Object.is equality — Expected: 0 — Received: 2 — 128 \|       observation |
| DSR-PLSP-004 [en] | DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | pass | 13.1s | — |
| DSR-PRODLIST-001 [ja] | DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | fail | 14.4s | Error: TD-583-01 ≥ 6 products — expect(received).toBeGreaterThanOrEqual(expected) — Expected: >= 6 — Received:    3 — 46 \|     const m = awa |
| DSR-PRODLIST-002 [ja] | DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | fail | 31.3s | Error: 320: distinct column offsets — expect(received).toBe(expected) // Object.is equality — Expected: 2 — Received: 1 — 31 \| // Common SP  |
| DSR-PRODLIST-003 [ja] | DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | fail | 17.5s | Error: open: distinct column offsets — expect(received).toBe(expected) // Object.is equality — Expected: 2 — Received: 1 — 68 \|         cons |
| DSR-PRODLIST-004 [ja] | DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | fail | 18.7s | Error: 1440: distinct column offsets — expect(received).toBe(expected) // Object.is equality — Expected: 4 — Received: 1 — 151 \|       const |
| SMOKE-001 DSR-173 test page is [-] | SMOKE-001 DSR-173 test page is reachable | pass | 0.5s | — |
| DSR-TOP-004 [ja] | DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | fail | 9.3s | Error: text/background colour changes on hover — expect(received).not.toEqual(expected) // deep equality — Expected: not [] — 38 \|       }); |
| DSR-TOP-005 [ja] | DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | fail | 11.3s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) — expect(received).toBe(expected) // Object.is eq |
| DSR-TOP-006 [ja] | DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | fail | 16.6s | Error: page requests /ja/news/query-index.json — expect(received).toContain(expected) // indexOf — Expected value: "/ja/news/query-index.jso |
| DSR-TOP-007 [ja] | DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | fail | 15.1s | Error: SP item 1 title lines ≤ 1 — expect(received).toBeLessThanOrEqual(expected) — Expected: <= 1 — Received:    2 — 158 \|       for (const |
| DSR-TOP-008 [ja] | DSR-TOP-008 [ja] NEWS with empty query-index renders without error | pass | 7.7s | — |
| DSR-TOP-009 [ja] | DSR-TOP-009 [ja] main visual image is eager and is the LCP element | pass | 8.9s | — |
| DSR-TOP-004 [en] | DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | fail | 8.2s | Error: text/background colour changes on hover — expect(received).not.toEqual(expected) // deep equality — Expected: not [] — 38 \|       }); |
| DSR-TOP-005 [en] | DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | fail | 7.4s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) — expect(received).toBe(expected) // Object.is eq |
| DSR-TOP-006 [en] | DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | fail | 7.8s | Error: page requests /en/news/query-index.json — expect(received).toContain(expected) // indexOf — Expected value: "/en/news/query-index.jso |
| DSR-TOP-007 [en] | DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | fail | 7.3s | Error: SP item 1 title lines ≤ 1 — expect(received).toBeLessThanOrEqual(expected) — Expected: <= 1 — Received:    2 — 158 \|       for (const |
| DSR-TOP-008 [en] | DSR-TOP-008 [en] NEWS with empty query-index renders without error | pass | 3.9s | — |
| DSR-TOP-009 [en] | DSR-TOP-009 [en] main visual image is eager and is the LCP element | pass | 4.4s | — |
| DSR-TOP-001 [ja] | DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | pass | 8.8s | — |
| DSR-TOP-001 [ja] | DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | pass | 8.0s | — |
| DSR-TOP-001 [en] | DSR-TOP-001 [en] PC full-page capture and horizontal overflow | pass | 8.8s | — |
| DSR-TOP-001 [en] | DSR-TOP-001 [en] SP full-page capture and horizontal overflow | pass | 7.9s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-001 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-004 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-005 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-021 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-032 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-030 [ja] | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-031 [ja] | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-017 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 (helix-query.yaml) / Q7 |
| DSR-ARTICLE-018 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; NEW period Q6 |
| DSR-ARTICLE-019 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; TD-529-04 not seeded |
| DSR-ARTICLE-022 [ja] | Blocked: 製品index relatedArticles/sortOrder not defined – 製品詳細 ticket (Martin prereq #3) |
| DSR-ARTICLE-027 [ja] | Blocked: Article list DSR-170 (out of scope) + stories index |
| DSR-ARTICLE-028 [ja] | Blocked: Martin open decision #4 (breadcrumb in scope?) + DSR-552 – Q9 |
| DSR-ARTICLE-029 [cn] | Blocked: no /master/cn on DEV (Issue #18) – all cn rows |
| DSR-ARTICLE-026 [ja] | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 [en] | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |
| DSR-ASSET-003 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 [ja] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 [ja] | blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-003 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 [en] | blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-017 [-] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-BREAD-018 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-019 [-] | DSR-555 + cn |
| DSR-BREAD-021 [-] | DSR-575 Q5 (SP display) |
| DSR-BREAD-022 [-] | DSR-575 Q5 (SP display) |
| DSR-BREAD-023 [-] | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 [-] | Run on STG (Lighthouse) |
| DSR-BREAD-030 [-] | DSR-536 / movie-detail placement |
| DSR-BREAD-033 [-] | Layout tickets |
| DSR-BREAD-034 [-] | DSR-536 / movie-detail placement |
| DSR-BREAD-001 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 [cn] | cn: no /master/cn (Issue #18) |
| DSR-CATDL-001 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-002 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-017 [ja] | no catalog-ID mechanism on DEV yet: "QA190 PDF form required" card href carries no catalog id; demo form page is not bound to a CF (Ngoc 10/15) |
| DSR-CATDL-016 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-016 [cn] | cn: no /master/cn (Issue #18) |
| DSR-ECO-001 [en] | en demo page not on DEV |
| DSR-ECO-002 [en] | en demo page not on DEV |
| DSR-ECO-004 [en] | en demo page not on DEV |
| DSR-ECO-005 [ja] | DSR-590 page not on DEV |
| DSR-ECO-007 [ja] | DSR-590 page not on DEV |
| DSR-ECO-010 [ja] | DSR-590 page not on DEV |
| DSR-ECO-005 [en] | DSR-590 page not on DEV |
| DSR-ECO-007 [en] | DSR-590 page not on DEV |
| DSR-ECO-010 [en] | DSR-590 page not on DEV |
| DSR-ECO-006 [ja] | DSR-590 page not on DEV |
| DSR-ECO-009 [ja] | DSR-590 page not on DEV |
| DSR-ECO-013 [en] | en demo page not on DEV |
| DSR-ECO-013 [cn] | cn: no /master/cn on DEV (Issue #18) |
| DSR-ICON-001 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 [ja] | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-001 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 [en] | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-005 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-007 [ja] | blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 [ja] | blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 [ja] | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 [en] | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-MOVIE-020 [-] | Issue #1: related products specification pending |
| DSR-MOVIE-021 [-] | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023 [-] | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025 [-] | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 [-] | Description line-break separator is unconfirmed |
| DSR-MOVIE-001 [-] | B: page auto-generation not implemented |
| DSR-MOVIE-002 [-] | B: page auto-generation not implemented |
| DSR-MOVIE-003 [-] | B: page auto-generation not implemented |
| DSR-MOVIE-004 [-] | M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005 [-] | B: page auto-generation not implemented |
| DSR-MOVIE-006 [-] | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007 [-] | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008 [-] | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009 [-] | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010 [-] | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011 [-] | B: page auto-generation not implemented |
| DSR-MOVIE-013 [-] | C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015 [-] | C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016 [-] | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017 [-] | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018 [-] | B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019 [-] | C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022 [-] | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024 [-] | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030 [-] | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 [-] | B: page auto-generation not implemented |
| DSR-MOVIE-032 [-] | B: ja/zh pages not available |
| DSR-MOVIE-035 [-] | B: SP design pending |
| DSR-VOV-001 [ja] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-001 [en] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-002 [en] | TD-587-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-preview HTTP 404) |
| DSR-VOV-003 [ja] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-003 [en] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-004 [en] | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 [en] | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 [en] | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-007 [ja] | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-007 [en] | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-008 [en] | TD-587-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-unavail HTTP 404) |
| DSR-VOV-010 [en] | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 [ja] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 [cn] | Issue #18: no /cn path on DEV |
| DSR-VOV-014 [en] | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-015 [en] | TD-587-15 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-b HTTP 404) |
| DSR-VOV-016 [en] | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-017 [en] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 [ja] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 [en] | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 [cn] | Issue #18: no /cn path on DEV |
| DSR-501-P3 [en] | blocked-data: stale preview, static HTML has fewer relatedMovies rows than query (static HTML 5 relatedMovies rows, query 6; last-modified Tue, 20 Oct 2026 11:36:16 GMT) |
| DSR-NEWS-001 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-002 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-003 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-004 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-006 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-007 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-009 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-010 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-012 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-013 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-018 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-PDO-001 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-001 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-002 [ja] | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-003 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-003 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-004 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-005 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-006 [ja] | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 [ja] | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-008 [ja] | TD-586-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586008 HTTP 404) |
| DSR-PDO-009 [ja] | TD-586-09 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586009 HTTP 404) |
| DSR-PDO-011 [ja] | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-012 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-014 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 [cn] | (no annotation text; test.fixme with reason in its title: "DSR-PDO-014 [cn] language variant – no /cn path on DEV (Issue #18)") |
| DSR-PDO-017 [ja] | DSR-585 項目fix版 field list not in repo (Q27 review open) |
| DSR-PDO-019 [ja] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PRODLIST-003 [en] | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 [ja] | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 [ja] | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 [en] | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 [ja] | Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |

## 6. Failed tests

### DSR-ARTICLE-002 [ja] (chromium) — DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Array [ — +   "subtitle", — +   "articleImage", — +   "descrip` — `tests/article-detail/DSR-529.article-detail.spec.ts:42`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-657 (PEND-529-01): subtitle/image/description blocks missing; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-006 [ja] (chromium) — DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 63 \|       const labels = (await article.tags.allInnerTexts()).map(t => t.` — `tests/article-detail/DSR-529.article-detail.spec.ts:65`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-658 (BUG-3): 0 tag chips, 2 article:tag metas; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-007 [ja] (chromium) — DSR-ARTICLE-007 [ja] info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality — Expected: null — Received: "2026-10-01" — 75 \|       observations.push({ shown, metaPublishedDate: meta, shownIso: isoDate(shown), metaIs` — `tests/article-detail/DSR-529.article-detail.spec.ts:77`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-86406-ar-date-meta-published-date-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-86406-ar-date-meta-published-date-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-6 draft: date shown, published-date meta absent; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 60%

### DSR-ARTICLE-010 [ja] (chromium) — DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 99 \|       const visible = await article.main.innerText(); — 100` — `tests/article-detail/DSR-529.article-detail.spec.ts:101`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-79b36-ach-update-date-not-visible-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-79b36-ach-update-date-not-visible-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: meta names publicationdate/updatedate/searchkeywords; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-011 [ja] (chromium) — DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL — expect(received).toMatch(expected) — Expected pattern: /^https?:\/\// — Received string:  "/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png" — 114 \| ` — `tests/article-detail/DSR-529.article-detail.spec.ts:116`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-659 (BUG-4): thumbnail relative /content/dam path, 404 on .live; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-012 [ja] (chromium) — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 130 \|       const ids = category.split(',').map(s => s.trim()).filte` — `tests/article-detail/DSR-529.article-detail.spec.ts:132`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-b3344-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-b3344-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: no category meta; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-014 [ja] (chromium) — DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 155 \|       observations.push({ counts }); — 156 \|       for (co` — `tests/article-detail/DSR-529.article-detail.spec.ts:157`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-162e5-gory-exactly-once-non-empty-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-162e5-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: published-date meta count 0; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-016 [ja] (chromium) — DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots — expect(received).not.toMatch(expected) — Expected pattern: not /noindex/i — Received string:      "noindex, nofollow" — 169 \|       const fullRobots = metaValues((await articl` — `tests/article-detail/DSR-529.article-detail.spec.ts:171`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: qa529-01 still noindex,nofollow (Author state not verified); same fail as JOB-20261020-10. cause `none`, suspect `data`, confidence 50%

### DSR-ARTICLE-024 [ja] (chromium) — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href — expect(received).not.toMatch(expected) — Expected pattern: not /^(#?)$/ — Received string:      "#" — 188 \|         const href = await el.first().getAttribute('href', { ti` — `tests/article-detail/DSR-529.article-detail.spec.ts:190`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: VIEW ALL STORIES / Contact href "#"; same fail as JOB-20261020-10. cause `none`, suspect `test`, confidence 50%

### DSR-ARTICLE-002 [en] (chromium) — DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Array [ — +   "subtitle", — +   "articleImage", — +   "descrip` — `tests/article-detail/DSR-529.article-detail.spec.ts:42`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-657 (PEND-529-01): subtitle/image/description blocks missing; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-006 [en] (chromium) — DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 63 \|       const labels = (await article.tags.allInnerTexts()).map(t => t.` — `tests/article-detail/DSR-529.article-detail.spec.ts:65`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-658 (BUG-3): 0 tag chips, 2 article:tag metas; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-007 [en] (chromium) — DSR-ARTICLE-007 [en] info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality — Expected: null — Received: "2026-10-01" — 75 \|       observations.push({ shown, metaPublishedDate: meta, shownIso: isoDate(shown), metaIs` — `tests/article-detail/DSR-529.article-detail.spec.ts:77`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-7079a-ar-date-meta-published-date-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-7079a-ar-date-meta-published-date-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-6 draft: date shown, published-date meta absent; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 60%

### DSR-ARTICLE-010 [en] (chromium) — DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 99 \|       const visible = await article.main.innerText(); — 100` — `tests/article-detail/DSR-529.article-detail.spec.ts:101`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-11a6e-ach-update-date-not-visible-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-11a6e-ach-update-date-not-visible-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: meta names publicationdate/updatedate/searchkeywords; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-011 [en] (chromium) — DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL — expect(received).toMatch(expected) — Expected pattern: /^https?:\/\// — Received string:  "/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png" — 114 \|       e` — `tests/article-detail/DSR-529.article-detail.spec.ts:116`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-659 (BUG-4): thumbnail relative /content/dam path, 404 on .live; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-012 [en] (chromium) — DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 130 \|       const ids = category.split(',').map(s => s.trim()).filte` — `tests/article-detail/DSR-529.article-detail.spec.ts:132`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-b15c5-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-b15c5-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: no category meta; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-014 [en] (chromium) — DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 155 \|       observations.push({ counts }); — 156 \|       for (co` — `tests/article-detail/DSR-529.article-detail.spec.ts:157`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-401db-gory-exactly-once-non-empty-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-401db-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: published-date meta count 0; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-016 [en] (chromium) — DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots — expect(received).not.toMatch(expected) — Expected pattern: not /noindex/i — Received string:      "noindex, nofollow" — 169 \|       const fullRobots = metaValues((await articl` — `tests/article-detail/DSR-529.article-detail.spec.ts:171`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: qa529-01 still noindex,nofollow (Author state not verified); same fail as JOB-20261020-10. cause `none`, suspect `data`, confidence 50%

### DSR-ARTICLE-024 [en] (chromium) — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href — expect(received).not.toMatch(expected) — Expected pattern: not /^(#?)$/ — Received string:      "#" — 188 \|         const href = await el.first().getAttribute('href', { ti` — `tests/article-detail/DSR-529.article-detail.spec.ts:190`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: VIEW ALL STORIES / Contact href "#"; same fail as JOB-20261020-10. cause `none`, suspect `test`, confidence 50%

### DSR-ARTICLE-020 [ja] (chromium) — DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ)

- Failing assertion: `Error: visible related stories block — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 6 — - Array [] — + Array [ — +   Object { — +     "height": 435.984375, — +` — `tests/article-detail/DSR-529.article-detail.spec.ts:256`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-d4171-ng-when-not-specified-トルツメ--chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-d4171-ng-when-not-specified-トルツメ--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: Caused by this job's first locator fix ([class*="related-articles"] matched the section wrapper). Locator narrowed; passes in rerun (results/DSR-529/DEV/automation-run-20261021-idle19-rerun.md). cause `none`, suspect `test`, confidence 0%

### DSR-ARTICLE-023 [ja] (chromium) — DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion: `Error: visible related items heading — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 6 — - Array [] — + Array [ — +   Object { — +     "height": 32.390625, — + ` — `tests/article-detail/DSR-529.article-detail.spec.ts:266`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: qa529-02 related items heading visible (4 products); same fail as JOB-20261020-10. cause `none`, suspect `test`, confidence 50%

### DSR-BREAD-032 [-] (firefox) — DSR-BREAD-032 cross-browser baseline

- Failing assertion: `Error: expect(locator).toHaveScreenshot(expected) failed — Locator: locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') }) — 865 pixels (ratio 0.02 of all image pi` — `tests/breadcrumb/DSR-552.breadcrumb.spec.ts:255`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/breadcrumb-DSR-552.breadcr-02fb2--032-cross-browser-baseline-firefox/test-failed-1.png, test-results/breadcrumb-DSR-552.breadcr-02fb2--032-cross-browser-baseline-firefox-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `env`, confidence 20%

### DSR-BREAD-032 [-] (webkit) — DSR-BREAD-032 cross-browser baseline

- Failing assertion: `Error: browserType.launch: — ╔══════════════════════════════════════════════════════╗ — ║ Host system is missing dependencies to run browsers. ║ — ║ Missing libraries:                                 ` — `breadcrumb/DSR-552.breadcrumb.spec.ts`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: none generated (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `env`, confidence 20%

### DSR-CATDL-006 [ja] (chromium) — DSR-CATDL-006 [ja] requiresForm=true card leads to the download form

- Failing assertion: `Error: expect(locator).toHaveCount(expected) failed — Locator:  locator('.catalog-detail.block').locator('form') — Expected: 1 — Received: 0 — Timeout:  5000ms — Call log: — - Expect "toHaveCount" loc` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:101`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/catalog-download-DSR-570.c-0ac41--leads-to-the-download-form-chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-0ac41--leads-to-the-download-form-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09 (tagged overlay-merge there). cause `none`, suspect `data`, confidence 50%

### DSR-CATDL-018 [ja] (chromium) — DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form

- Failing assertion: `Test timeout of 30000ms exceeded.` — `catalog-download/DSR-570.catalog-download.spec.ts`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/catalog-download-DSR-570.c-937ce-opens-ebookUrl-without-form-chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-937ce-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09 (tagged overlay-merge there). cause `none`, suspect `test`, confidence 30%

### DSR-CATDL-006 [en] (chromium) — DSR-CATDL-006 [en] requiresForm=true card leads to the download form

- Failing assertion: `Error: expect(locator).toHaveCount(expected) failed — Locator:  locator('.catalog-detail.block').locator('form') — Expected: 1 — Received: 0 — Timeout:  5000ms — Call log: — - Expect "toHaveCount" loc` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:101`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/catalog-download-DSR-570.c-9941f--leads-to-the-download-form-chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-9941f--leads-to-the-download-form-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09 (tagged overlay-merge there). cause `none`, suspect `data`, confidence 50%

### DSR-CATDL-018 [en] (chromium) — DSR-CATDL-018 [en] e-book form card opens ebookUrl without form

- Failing assertion: `Test timeout of 30000ms exceeded.` — `catalog-download/DSR-570.catalog-download.spec.ts`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/catalog-download-DSR-570.c-b8a9e-opens-ebookUrl-without-form-chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-b8a9e-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09 (tagged overlay-merge there). cause `none`, suspect `test`, confidence 30%

### DSR-CATDL-007 [ja] (chromium) — DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit

- Failing assertion: `Error: gated PDF URL delivered to the browser before submit — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 3 — - Array [] — + Array [ — +   "dm-catalog-list re` — `tests/catalog-download/DSR-570.catalog-download.spec.ts:187`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium/test-failed-1.png, test-results/catalog-download-DSR-570.c-0375f-L-not-exposed-before-submit-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-CATV-017 [ja] (chromium) — DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality — Expected: "https://www.ykkfastening.com/" — Received: "https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-e` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:102`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium/test-failed-1.png, test-results/catalog-video-DSR-557.cata-e2823-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09 (tagged overlay-merge there). cause `none`, suspect `test`, confidence 30%

### DSR-CATV-017 [en] (chromium) — DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality — Expected: "https://www.ykkfastening.com/" — Received: "https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-e` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:102`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium/test-failed-1.png, test-results/catalog-video-DSR-557.cata-a1b55-opens-ebookUrl-without-form-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09 (tagged overlay-merge there). cause `none`, suspect `test`, confidence 30%

### DSR-ECO-002 [ja] (chromium) — DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language)

- Failing assertion: `Error: VIEW MORE not on site with same language prefix — expect(received).toEqual(expected) // deep equality — - Expected  -  1 — + Received  + 11 — - Array [] — + Array [ — +   "http://google.com/", ` — `tests/eco-products/DSR-590.eco-products.spec.ts:106`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/eco-products-DSR-590.eco-p-b04ae-ail-page-200-same-language--chromium/test-failed-1.png, test-results/eco-products-DSR-590.eco-p-b04ae-ail-page-200-same-language--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 60%

### DSR-ECO-004 [ja] (chromium) — DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200)

- Failing assertion: `Error: finder URL (P087), same language — expect(received).toContain(expected) // indexOf — Expected value: "" — Received array: ["/ja/product/performance/sustainable/sustainable-solution-finder", "/m` — `tests/eco-products/DSR-590.eco-products.spec.ts:122`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/eco-products-DSR-590.eco-p-54993-he-product-finder-P087-200--chromium/test-failed-1.png, test-results/eco-products-DSR-590.eco-p-54993-he-product-finder-P087-200--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 60%

### DSR-ICON-006 [ja] (chromium) — DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `Error: console errors — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 3 — - Array [] — + Array [ — +   "Failed to load resource: the server responded with a sta` — `tests/icons/DSR-589.icons.spec.ts:107`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium/test-failed-1.png, test-results/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `env`, confidence 40%

### DSR-ICON-006 [en] (chromium) — DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `Error: console errors — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 3 — - Array [] — + Array [ — +   "Failed to load resource: the server responded with a sta` — `tests/icons/DSR-589.icons.spec.ts:107`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium/test-failed-1.png, test-results/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `env`, confidence 40%

### DSR-MOVIE-014 [-] (chromium) — DSR-MOVIE-014 embeds the configured YouTube movie

- Failing assertion: `Error: expect(locator).toHaveAttribute(expected) failed — Locator: getByTestId('movie-detail-player-embed') — Expected pattern: /\/embed\// — Timeout: 5000ms — Error: element(s) not found — Call log: ` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:32`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/test-failed-1.png, test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-MOVIE-026 [-] (chromium) — DSR-MOVIE-026 displays related thumbnails, types, tags and valid links

- Failing assertion: `Error: Related card 1 thumbnail — expect(locator).toBeVisible() failed — Locator: getByTestId('related-content-card').first().getByTestId('related-content-card-image') — Expected: visible — Timeout: 1` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:141`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png, test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-MOVIE-033 [-] (chromium) — DSR-MOVIE-033 displays component sections in vertical order on PC

- Failing assertion: `Error: expect(locator).toBeVisible() failed — Locator: getByTestId('movie-detail-player') — Expected: visible — Timeout: 5000ms — Error: element(s) not found — Call log: — - Expect "toBeVisible" getBy` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:201`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium/test-failed-1.png, test-results/movie-detail-DSR-173.movie-e47ea-ons-in-vertical-order-on-PC-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-501-P3 [en] (chromium) — DSR-501-P3 [en] related movies are limited to 5 in authored order

- Failing assertion: `Error: expect(locator).toBeVisible() failed — Locator: getByTestId('movie-detail-related-content') — Expected: visible — Timeout: 5000ms — Error: element(s) not found — Call log: — - Expect "toBeVisib` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:268`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium/test-failed-1.png, test-results/movie-detail-DSR-173.movie-7baab-ited-to-5-in-authored-order-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-501-P2 [en] (chromium) — DSR-501-P2 [en] unavailable related movie is not displayed

- Failing assertion: `Error: expect(locator).toBeVisible() failed — Locator: getByTestId('movie-detail-related-content') — Expected: visible — Timeout: 5000ms — Error: element(s) not found — Call log: — - Expect "toBeVisib` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:275`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium/test-failed-1.png, test-results/movie-detail-DSR-173.movie-93f32-ated-movie-is-not-displayed-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-VOV-011 [ja] (chromium) — DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail)

- Failing assertion: `Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/search — expect(received).toBe(expected) // Object.is equality — Expected: 200 — Received: 404 — 195 \|       const response ` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:197`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/movie-detail-DSR-587.movie-f5a89-h-≥-1-card-no-video-detail--chromium/test-failed-1.png, test-results/movie-detail-DSR-587.movie-f5a89-h-≥-1-card-no-video-detail--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `env`, confidence 50%

### DSR-VOV-011 [en] (chromium) — DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail)

- Failing assertion: `Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/search — expect(received).toBe(expected) // Object.is equality — Expected: 200 — Received: 404 — 195 \|       const response ` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:197`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium/test-failed-1.png, test-results/movie-detail-DSR-587.movie-4c66c-h-≥-1-card-no-video-detail--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `env`, confidence 50%

### DSR-NEWS-002 [en] (chromium) — DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list

- Failing assertion: `Error: required elements missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 3 — - Array [] — + Array [ — +   "backToList", — + ] — 42 \|       // CTA is opt` — `tests/news-detail/DSR-566.news-detail.spec.ts:44`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium/test-failed-1.png, test-results/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-NEWS-003 [en] (chromium) — DSR-NEWS-003 [en] shown date equals meta publish date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality — Expected: "2026-09-29" — Received: "2026-03-30" — 55 \|       observations.push({ shown, metaPublishedTime: meta, shownIso: isoDate(shown)` — `tests/news-detail/DSR-566.news-detail.spec.ts:57`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium/test-failed-1.png, test-results/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-NEWS-006 [en] (chromium) — DSR-NEWS-006 [en] Back to list href resolves to /en/news/

- Failing assertion: `Error: Back to list link — expect(locator).toHaveCount(expected) failed — Locator:  locator('main').getByRole('link', { name: /back to list\|一覧へ戻る/i }) — Expected: 1 — Received: 0 — Timeout:  5000ms — ` — `tests/news-detail/DSR-566.news-detail.spec.ts:76`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium/test-failed-1.png, test-results/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-NEWS-007 [en] (chromium) — DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template

- Failing assertion: `Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json — expect(received).not.toBeNull() — Received: null — 96 \|       const rootJson ` — `tests/news-detail/DSR-566.news-detail.spec.ts:98`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium/test-failed-1.png, test-results/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-NEWS-012 [en] (chromium) — DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click)

- Failing assertion: `Error: My List button — expect(locator).toBeVisible() failed — Locator: locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list\|マイリスト/i }) — Expected: visible — Timeout: 5` — `tests/news-detail/DSR-566.news-detail.spec.ts:131`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium/test-failed-1.png, test-results/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-NEWS-018 [en] (chromium) — DSR-NEWS-018 [en] title, description and og tags non-empty

- Failing assertion: `Error: meta[name="description"] — expect(received).not.toBe(expected) // Object.is equality — Expected: not "" — 156 \|       for (const selector of seoMeta) { — 157 \|         const content = await pag` — `tests/news-detail/DSR-566.news-detail.spec.ts:158`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium/test-failed-1.png, test-results/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 50%

### DSR-PLSP-002 [ja] (chromium) — DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Array [ — +   "", — +   "", — +   "", — + ] — 43 \|` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-5da44-card-columns-at-every-width-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 70%

### DSR-PLSP-003 [ja] (chromium) — DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — `product-list/DSR-583.product-list-sp.spec.ts`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-063f2-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `test`, confidence 20%

### DSR-PLSP-005 [ja] (chromium) — DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Error: 3 results: left aligned — expect(received).toBe(expected) // Object.is equality — Expected: 0 — Received: 2 — 128 \|       observations.push({ lastCardWidth: last, reference, referenceKind: m.ca` — `tests/product-list/DSR-583.product-list-sp.spec.ts:130`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `test`, confidence 20%

### DSR-PLSP-002 [en] (chromium) — DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width

- Failing assertion: `Error: 320: cards overflowing their column — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Array [ — +   "", — +   "", — +   "", — + ] — 43 \|` — `tests/product-list/DSR-583.product-list-sp.spec.ts:45`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-777ce-card-columns-at-every-width-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 70%

### DSR-PLSP-003 [en] (chromium) — DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload

- Failing assertion: `Test timeout of 30000ms exceeded.` — `product-list/DSR-583.product-list-sp.spec.ts`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-fa118-er-scroll-filter-and-reload-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `test`, confidence 20%

### DSR-PLSP-005 [en] (chromium) — DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned

- Failing assertion: `Error: 3 results: left aligned — expect(received).toBe(expected) // Object.is equality — Expected: 0 — Received: 2 — 128 \|       observations.push({ lastCardWidth: last, reference, referenceKind: m.ca` — `tests/product-list/DSR-583.product-list-sp.spec.ts:130`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-a7886-her-card-width-left-aligned-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `test`, confidence 20%

### DSR-PRODLIST-001 [ja] (chromium) — DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll

- Failing assertion: `Error: TD-583-01 ≥ 6 products — expect(received).toBeGreaterThanOrEqual(expected) — Expected: >= 6 — Received:    3 — 46 \|     const m = await list.metrics(); — 47 \|     observations.push({ step: '375` — `tests/product-list/DSR-583.product-list.spec.ts:48`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-500a1-olumns-no-horizontal-scroll-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 10%

### DSR-PRODLIST-002 [ja] (chromium) — DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll

- Failing assertion: `Error: 320: distinct column offsets — expect(received).toBe(expected) // Object.is equality — Expected: 2 — Received: 1 — 31 \| // Common SP expectations: N columns, full rows of N, no card overflow, n` — `tests/product-list/DSR-583.product-list.spec.ts:33`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-70fa9-erflow-no-horizontal-scroll-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 10%

### DSR-PRODLIST-003 [ja] (chromium) — DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads

- Failing assertion: `Error: open: distinct column offsets — expect(received).toBe(expected) // Object.is equality — Expected: 2 — Received: 1 — 68 \|         const m = await list.metrics(); — 69 \|         observations.push` — `tests/product-list/DSR-583.product-list.spec.ts:70`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-5df0e-d-more-filter-and-3-reloads-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 10%

### DSR-PRODLIST-004 [ja] (chromium) — DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3

- Failing assertion: `Error: 1440: distinct column offsets — expect(received).toBe(expected) // Object.is equality — Expected: 4 — Received: 1 — 151 \|       const m = await list.metrics(); — 152 \|       observations.push({` — `tests/product-list/DSR-583.product-list.spec.ts:153`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium/test-failed-1.png, test-results/product-list-DSR-583.produ-8e264-d-1440→4-1200→4-980→3-768→3-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `data`, confidence 10%

### DSR-TOP-004 [ja] (chromium) — DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover — expect(received).not.toEqual(expected) // deep equality — Expected: not [] — 38 \|       }); — 39 \|       observations.push({ hover: { before, after, te` — `tests/top/DSR-609.top.spec.ts:40`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium/test-failed-1.png, test-results/top-DSR-609.top-ja-DSR-TOP-40820-navigates-to-product-search-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-TOP-005 [ja] (chromium) — DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) — expect(received).toBe(expected) // Object.is equality — Expected: true — Received: false — 81 \|       for (` — `tests/top/DSR-609.top.spec.ts:83`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium/test-failed-1.png, test-results/top-DSR-609.top-ja-DSR-TOP-5f9cf-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-TOP-006 [ja] (chromium) — DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /ja/news/query-index.json — expect(received).toContain(expected) // indexOf — Expected value: "/ja/news/query-index.json" — Received array: ["/query-index.json"] — 122 \|       obs` — `tests/top/DSR-609.top.spec.ts:124`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium/test-failed-1.png, test-results/top-DSR-609.top-ja-DSR-TOP-9e53e-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-TOP-007 [ja] (chromium) — DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1 — expect(received).toBeLessThanOrEqual(expected) — Expected: <= 1 — Received:    2 — 158 \|       for (const vp of exercised) { — 159 \|         for (const [i, m] of mea` — `tests/top/DSR-609.top.spec.ts:160`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png, test-results/top-DSR-609.top-ja-DSR-TOP-1c949-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-TOP-004 [en] (chromium) — DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search

- Failing assertion: `Error: text/background colour changes on hover — expect(received).not.toEqual(expected) // deep equality — Expected: not [] — 38 \|       }); — 39 \|       observations.push({ hover: { before, after, te` — `tests/top/DSR-609.top.spec.ts:40`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium/test-failed-1.png, test-results/top-DSR-609.top-en-DSR-TOP-ac27f-navigates-to-product-search-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-TOP-005 [en] (chromium) — DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertion: `Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) — expect(received).toBe(expected) // Object.is equality — Expected: true — Received: false — 81 \|       for (` — `tests/top/DSR-609.top.spec.ts:83`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium/test-failed-1.png, test-results/top-DSR-609.top-en-DSR-TOP-de1e7-nded-corners-card-wide-link-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-TOP-006 [en] (chromium) — DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date

- Failing assertion: `Error: page requests /en/news/query-index.json — expect(received).toContain(expected) // indexOf — Expected value: "/en/news/query-index.json" — Received array: ["/query-index.json"] — 122 \|       obs` — `tests/top/DSR-609.top.spec.ts:124`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium/test-failed-1.png, test-results/top-DSR-609.top-en-DSR-TOP-f5b5a-ewest-items-by-publish-date-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

### DSR-TOP-007 [en] (chromium) — DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `Error: SP item 1 title lines ≤ 1 — expect(received).toBeLessThanOrEqual(expected) — Expected: <= 1 — Received:    2 — 158 \|       for (const vp of exercised) { — 159 \|         for (const [i, m] of mea` — `tests/top/DSR-609.top.spec.ts:160`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium/test-failed-1.png, test-results/top-DSR-609.top-en-DSR-TOP-5446f-SP-1-line-image-ratio-PC-SP-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: same fail as JOB-20261020-09. cause `none`, suspect `product`, confidence 60%

## 7. Open points for QA

- Run with the first (too broad) locator version; see first bullet.
- Locator fix (job step 4): `pages/ArticleDetailPage.ts` `relatedStories` now matches `[data-block-name="related-articles"], .related-articles.block` (old `related-stories` kept as fallback). The first version (`[class*="related-articles"]`, used in the aborted run and the full run) also matched the section wrapper `related-articles-container`, which exists on qa529-02 ja without the block → false fail of DSR-ARTICLE-020 [ja]. Narrowed and verified by the DSR-529 rerun (020 pass). DOM probe: qa529-01 ja has `div.related-articles.auto.block[data-block-name=related-articles]` with 3 qa529-r1..r3 links; qa529-02 ja has only the wrapper (関連アイテム + footer actions).
- Only DSR-ARTICLE-020 uses this locator; no test asserts the block is present on qa529-01, so the positive match is verified by the DOM probe only.
- All fails except DSR-ARTICLE-020 [ja] have the same failing assertion as JOB-20261020-09 / JOB-20261020-10 → cause `none` per job step 2. Confidence values are carried over from those jobs / the 529 decision table; not re-assessed.
- The suite writes pass screenshots into tracked paths (evidence/DSR-552/DEV/, older ykk-dsr/hub/results/JOB-* folders). These side-effect changes (45 modified, 8 new files) were reverted and are not committed.
- Build identity, Author state (robots, 表示フラグ/Draft) and Jira status of DSR-657/658/659 not verified.

- HTTP status check (curl, no redirects followed, 2026-10-21T01:03Z, `main--dsr-eds-dev--sutrix-projects`):

| Path | .aem.page | .aem.live |
|---|---:|---:|
| /en/library/video/qa587-main | 404 | 404 |
| /ja/library/video/qa587-main | 404 | 404 |
| /ja/library/catalog/qa190-cat-pdf-form | 404 | 404 |
| /en/library/catalog/qa190-cat-pdf-form | 200 | 404 |
| /ja/library/video/search | 200 | 404 |
| /en/library/video/search | 200 | 404 |

