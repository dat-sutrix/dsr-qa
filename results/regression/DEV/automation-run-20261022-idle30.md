# regression DEV automation run — 20261022-idle30

Job: `JOB-ZZ-IDLE-30` (daily regression 22/10, all specs; run-only, read-only). One full run of `npm run test:dev` (all projects) on EDS `main` **.aem.live**, compared with `JOB-ZZ-IDLE-28` (21/10, 11:11Z). Cause tags, the comparison and the DSR-638 URL check are in `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/` (summary.md, result.json).

## 1. Header

- Run start (UTC): 2026-10-22T01:11:30Z (tsc check ran right before it)
- Run end (UTC): 2026-10-22T01:35:33Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): all pages used by the existing specs (movie DSR-173/501/538/587/647, assets DSR-227, mail DSR-433, article DSR-529 + captures, breadcrumb DSR-552, catalog/video DSR-557, news DSR-566, catalog download DSR-570, product list DSR-583, product CF DSR-585, product detail DSR-586, icons DSR-589, eco DSR-590, top DSR-609, catalog overlay DSR-654, smoke). Default path mode (`DSR_PATHS` unset = v1, old test-space paths).
- Build under test: not independently verified. No new code merge is recorded in the hub since IDLE-28. Content changes seen through Last-Modified: the Night 21/10 republishes (qa529-01 ja 15:09Z, en 15:10Z; qa190 catalogs 14:17–14:30Z; qa587-main 13:06Z), and `/en/library/video/search` was republished at 2026-10-22T01:04:27Z, 7 minutes before the run.
- Baseline ID: per US as recorded in `docs/<US>/` (DSR-173: BL-v1; overlay: BL-OVL-1 incl. "Update 2026-10-21"). Not re-verified in this run.
- Automation HEAD commit SHA: 81f059fc8ff1399907a2eb049c2ac2d0e7d9f5a1
- Exact command used:

```sh
timeout 3000 env PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/idle30/results.json npm run test:dev
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 461 | 179 (incl. 1 flaky) | 86 | 196 | 1 | 2 | configured 1; 87 tests retried (86 failed again, 1 passed) | 24m 03s (Playwright 23.9m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: full suite, all projects (chromium 459 + firefox 1 + webkit 1; firefox/webkit run only DSR-BREAD-032). Flaky: 1 (DSR-CATDL-014 [ja]: attempt 1 hit the 30 s test timeout, retry passed).

### Changes vs JOB-ZZ-IDLE-28 (cause tag per job: overlay auto-gen / article fix merge / data Night 21/10 / none)

IDLE-28 had 416 tests: 139 pass, 63 fail, 214 skip. The specs changed since IDLE-28 (JOB-20261022-01/02 and JOB-20261020-0x reruns): DSR-654 CATOV was rewritten (021 TCs, new titles), DSR-557 CATV now runs per id × tier, DSR-173 titles carry `[en]`, DSR-570/557 have a requiresForm data preflight, and DSR-538 retest was added. Tests are matched by title. A renamed test is matched to its old TC ID by hand. Confidence = how likely it is a real product bug (BUG-RULES §3).

| Test | IDLE-28 | Now | cause | conf. | Note |
|---|---|---|---|---|---|
| DSR-ARTICLE-002 [ja]/[en] | fail (subtitle/articleImage/description missing) | pass | data Night 21/10 | – | qa529-01 republished 21/10 15:09–15:10Z |
| DSR-ARTICLE-006 [ja]/[en] | fail (3 labels) | pass | data Night 21/10 | – | 2 chips = 2 article:tag metas; spec also got the chip-count = meta-count check |
| DSR-ARTICLE-028 [ja]/[en] | fail (last item = title) | pass | data Night 21/10 | – | navtitle authored (Night 0b) |
| DSR-ARTICLE-016 [ja] | fail (qa529-01 noindex) | fail (new reason) | data Night 21/10 | 40% | qa529-01 ja noindex removed; now qa529-02 has **no** robots meta (Last-Modified 20/10, not republished). [en] unchanged: qa529-01 en still `noindex, nofollow` after the 15:10Z republish |
| DSR-ARTICLE-023 [ja] | fail (heading visible) | fail (new reason) | data Night 21/10 | 50% | the whole related block is now visible (282 px), so trimming (トルツメ) still does not happen |
| DSR-VOV-001/018 [ja]/[en], VOV-014/015 [en], DSR-501-P3 [en] (647 retest) | skip (TD-587 not seeded) | pass | data Night 21/10 | – | qa587-main/rel-a/rel-b now on .live |
| DSR-VOV-003 [ja]/[en] | skip (not seeded) | fail | overlay auto-gen | 75% | raw HTML `og:image content="about:error"` on qa587-main (ja+en) |
| DSR-VOV-011 [ja]/[en] video/search | fail (404 on .live) | fail (new reason) | overlay auto-gen | 65% | page now 200 (republished 22/10 01:04Z) but renders a `video-detail` block + `robots noindex`, no `listing`. Looks like the overlay serves "search" as a movie id |
| DSR-VOV-013 [en] | not present | fail | overlay auto-gen | 50% | depends on the video/search list page (same root cause as VOV-011) |
| DSR-CATOV-001/002/021 × 4 ids × ja/en (24) | skip / fail (old titles) | fail | overlay auto-gen + data Night 21/10 | 001/019 block: 70%; 002 title: 20% | pages now 200 on .live (published 21/10 14:17–14:30Z). 001: `.catalog-detail-title` not found, body empty below breadcrumb. 002: `<title>` = CF title "catalog pdf" ≠ TD "QA190 PDF catalog" (data). 021: 0 sitemap `<loc>` for the catalog pages |
| DSR-CATOV-015…019 [ja]/[en] (10) | not present (new TCs) | fail | overlay auto-gen | 70% | catalog-detail block hidden: no download/view button, no fields shown |
| DSR-CATOV-012 [en] | not present | fail | overlay auto-gen | 60% | list card href = DAM PDF `/content/dam/ykk/.../qa190-catalog-sample.pdf`, not `/en/library/catalog/qa190-cat-pdf` |
| DSR-CATOV-003/004/006/007/008/010/011 | fail / skip | pass | overlay auto-gen | – | ja + en catalog pages now served on both tiers |
| DSR-CATDL-006/007/018, DSR-CATV-017 ja+en | fail | skip (blocked-data) | none (spec preflight) | – | new preflight: qa190-cat-pdf-form / ebook-form have `requiresForm=false` in the content CF (TD expects true) |
| DSR-CATDL-010 [ja] | pass | skip (blocked-data) | none (spec preflight) | – | same preflight |
| DSR-ASSET-016 [ja] | skip | pass | data Night 21/10 | – | a /{lang}/products/<digits> row is now in query-index |
| DSR-MOVIE-014 [en] | fail (embed missing) | fail (new reason) | none | – | spec change: test now waits for `movie-detail-player-facade`, not found on the test-space page |
| DSR-PLSP-005 [ja] | fail (left aligned 2) | fail (timeout) | none | – | 30 s timeout in `pages/ProductListPage.ts:112` filter step, both attempts |
| DSR-CATDL-014 [ja] | pass | flaky (pass on retry) | none | – | attempt 1 timeout |
| all other fails (ARTICLE-011/012/014/024, ECO-002/004, ICON-006, MOVIE-026/033, 501-P2/P3, NEWS-*, PLSP-002/003, PRODLIST-001…004, TOP-004…007, BREAD-032 firefox/webkit) | fail | same fail | unchanged | – | same assertion and values as IDLE-28 |

## 4. Executed tests

Duration per attempt (initial / retry). Proposed outcomes.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | passed | 4.0s | — |
| DSR-ARTICLE-003 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | passed | 3.1s | — |
| DSR-ARTICLE-006 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | passed | 2.5s | — |
| DSR-ARTICLE-007 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [ja] info bar date = meta publicationdate, format YYYY.MM.DD | passed | 2.3s | — |
| DSR-ARTICLE-008 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | passed | 2.4s | — |
| DSR-ARTICLE-010 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible | passed | 2.5s | — |
| DSR-ARTICLE-011 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 3.7s / 4.0s | Error: absolute URL expect(received).toMatch(expected) Expected pattern: /^https?:\/\// Received string: "/content/dam/ykk/digital-showroom/test/png/gradient-tr |
| DSR-ARTICLE-012 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | failed | 4.8s / 3.9s | Error: category meta count expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-ARTICLE-013 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | passed | 2.3s | — |
| DSR-ARTICLE-014 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | failed | 3.4s / 4.3s | Error: category count expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-ARTICLE-016 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 5.0s / 4.6s | Error: qa529-02 robots expect(received).toMatch(expected) Expected pattern: /noindex/i Received string: "" |
| DSR-ARTICLE-024 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | failed | 3.5s / 4.2s | Error: viewAllStories href expect(received).not.toMatch(expected) Expected pattern: not /^(#?)$/ Received string: "#" |
| DSR-ARTICLE-028 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link | passed | 2.0s | — |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | passed | 2.7s | — |
| DSR-ARTICLE-002 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | passed | 3.3s | — |
| DSR-ARTICLE-003 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | passed | 2.1s | — |
| DSR-ARTICLE-006 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | passed | 2.8s | — |
| DSR-ARTICLE-007 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [en] info bar date = meta publicationdate, format YYYY.MM.DD | passed | 2.5s | — |
| DSR-ARTICLE-008 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | passed | 2.9s | — |
| DSR-ARTICLE-010 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible | passed | 2.3s | — |
| DSR-ARTICLE-011 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 3.8s / 9.3s | Error: absolute URL expect(received).toMatch(expected) Expected pattern: /^https?:\/\// Received string: "/content/dam/ykk/digital-showroom/test/png/highres-pho |
| DSR-ARTICLE-012 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | failed | 8.9s / 9.7s | Error: category meta count expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-ARTICLE-013 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | passed | 7.9s | — |
| DSR-ARTICLE-014 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | failed | 9.8s / 12.3s | Error: category count expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-ARTICLE-016 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 5.4s / 5.6s | Error: qa529-01 robots expect(received).not.toMatch(expected) Expected pattern: not /noindex/i Received string: "noindex, nofollow" |
| DSR-ARTICLE-024 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | failed | 8.0s / 6.2s | Error: viewAllStories href expect(received).not.toMatch(expected) Expected pattern: not /^(#?)$/ Received string: "#" |
| DSR-ARTICLE-028 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link | passed | 4.4s | — |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | passed | 5.1s | — |
| DSR-ARTICLE-015 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | passed | 9.4s | — |
| DSR-ARTICLE-020 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | passed | 7.7s | — |
| DSR-ARTICLE-023 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | failed | 8.8s / 8.8s | Error: visible related items block expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + 6 - Array [] + Array [ + Object { + "height": |
| DSR-ARTICLE-025 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | passed | 9.1s | — |
| DSR-ARTICLE-009 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | passed | 11.5s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /ja/library/article/stories/qa529-01 1440x900 record only | passed | 2.3s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /ja/library/article/stories/qa529-01 375x900 record only | passed | 2.0s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /en/library/article/stories/qa529-01 1440x900 record only | passed | 2.6s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /en/library/article/stories/qa529-01 375x900 record only | passed | 1.9s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /ja/library/article/stories/qa529-02 1440x900 record only | passed | 2.1s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /ja/library/article/stories/qa529-02 375x900 record only | passed | 1.8s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /ja/library/article 1440x900 record only | passed | 2.3s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /ja/library/article 375x900 record only | passed | 2.2s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /en/library/article 1440x900 record only | passed | 2.1s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /en/library/article 375x900 record only | passed | 1.7s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [ja] qa529-01 1440x900 capture only | passed | 3.9s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [ja] qa529-01 390x844 capture only | passed | 4.5s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [en] qa529-01 1440x900 capture only | passed | 4.5s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [en] qa529-01 390x844 capture only | passed | 3.7s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [ja] qa529-02 1440x900 capture only | passed | 3.5s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [ja] qa529-02 390x844 capture only | passed | 2.7s | — |
| DSR-ASSET-016 | `asset-migration/DSR-227.asset-migration.spec.ts` › DSR-ASSET-016 [ja] no asset response >= 400 on DEV product pages (query-index, max 50) | passed | 2.6s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [ja] child trail follows URL hierarchy | passed | 2.1s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | passed | 1.8s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [ja] ancestor links navigate in same tab | passed | 4.5s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [ja] items equal page titles | passed | 2.4s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [en] child trail follows URL hierarchy | passed | 2.0s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | passed | 1.8s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [en] ancestor links navigate in same tab | passed | 5.6s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [en] items equal page titles | passed | 5.4s | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [ja] display name overrides page title | passed | 4.0s | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [en] display name overrides page title | passed | 6.0s | — |
| DSR-BREAD-014 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-014 [ja] 100-character display name keeps layout | passed | 6.5s | — |
| DSR-BREAD-015 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-015 [ja] special characters in display name are plain text | passed | 3.8s | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [ja] each language uses its own display names | passed | 2.4s | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [en] each language uses its own display names | passed | 2.1s | — |
| DSR-BREAD-020 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-020 PC breadcrumb baseline | passed | 2.6s | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline | passed | 2.1s | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline (firefox) | failed | 7.0s / 5.3s | Error: expect(locator).toHaveScreenshot(expected) failed Locator: locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') }) 86 |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline (webkit) | failed | 0.0s / 0.0s | Error: browserType.launch: ╔══════════════════════════════════════════════════════╗ ║ Host system is missing dependencies to run browsers. ║ ║ Missing libraries |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 4.6s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-002 ancestor links | passed | 13.8s | — |
| DSR-BREAD-003 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-003 current page is not linked | passed | 4.9s | — |
| DSR-BREAD-004 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-004 HOME label and destination | passed | 5.0s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 4.8s | — |
| DSR-BREAD-006 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-006 parent trail | passed | 4.9s | — |
| DSR-BREAD-007 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-007 missing intermediate page | passed | 3.9s | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 3.8s | — |
| DSR-BREAD-009 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-009 404 excludes breadcrumb | passed | 3.7s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-011 empty label uses title | passed | 4.8s | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 2.1s | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 2.2s | — |
| DSR-BREAD-027 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-027 semantic markup and accessibility | passed | 3.2s | — |
| DSR-BREAD-028 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-028 keyboard navigation | passed | 2.9s | — |
| DSR-BREAD-031 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-031 site-origin console errors | passed | 2.3s | — |
| DSR-BREAD-035 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-035 arrow asset origin and status | passed | 2.3s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 2.0s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 2.2s | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 1.4s | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 2.0s | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 2.0s | — |
| DSR-CATDL-014 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-014 [ja] capture catalog download form at 1440px | passed (flaky: passed on retry) | 30.7s / 4.5s | Test timeout of 30000ms exceeded. |
| DSR-CATDL-015 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-015 [ja] capture catalog download form at 375px | passed | 3.5s | — |
| DSR-CATDL-001 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-001 [ja] catalog detail header renders | passed | 18.2s | — |
| DSR-CATDL-002 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 17.7s | — |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 4.8s | — |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 3.9s | — |
| DSR-CATDL-003 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 16.8s | — |
| DSR-CATOV-001 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-001 [ja] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 7.2s / 7.3s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF catalog" Timeo |
| DSR-CATOV-002 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-002 [ja] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 1.1s / 1.2s | Error: <title> expect(received).toBe(expected) // Object.is equality Expected: "QA190 PDF catalog \| YKK DIGITAL SHOWROOM" Received: "qa190-cat-pdf \| YKK DIGITAL |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [ja] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | passed | 1.3s | — |
| DSR-CATOV-021 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-021 [ja] qa190-cat-pdf: live page listed once in query-index and sitemap | failed | 1.5s / 1.1s | Error: sitemap <loc> expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-CATOV-001 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-001 [ja] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 7.4s / 7.2s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required" |
| DSR-CATOV-002 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-002 [ja] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 1.2s / 1.2s | Error: <title> expect(received).toBe(expected) // Object.is equality Expected: "QA190 PDF form required \| YKK DIGITAL SHOWROOM" Received: "catalog pdf form \| YK |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [ja] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.2s | — |
| DSR-CATOV-021 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | failed | 1.0s / 1.1s | Error: sitemap <loc> expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-CATOV-001 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-001 [ja] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 10.4s / 8.9s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book" Timeout: 5 |
| DSR-CATOV-002 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-002 [ja] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 0.9s / 0.5s | Error: <title> expect(received).toBe(expected) // Object.is equality Expected: "QA190 e-book \| YKK DIGITAL SHOWROOM" Received: "catalog ebook \| YKK DIGITAL SHOW |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [ja] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | passed | 0.2s | — |
| DSR-CATOV-021 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-021 [ja] qa190-cat-ebook: live page listed once in query-index and sitemap | failed | 0.4s / 0.2s | Error: sitemap <loc> expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-CATOV-001 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-001 [ja] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 9.8s / 8.0s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form" Timeo |
| DSR-CATOV-002 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-002 [ja] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 0.9s / 0.7s | Error: <title> expect(received).toBe(expected) // Object.is equality Expected: "QA190 e-book form \| YKK DIGITAL SHOWROOM" Received: "catalog ebook form \| YKK DI |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [ja] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | passed | 0.1s | — |
| DSR-CATOV-021 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | failed | 0.2s / 0.2s | Error: sitemap <loc> expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-CATOV-004 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-004 [ja] naming rule: uppercase / underscore catalog URL → 404 | passed | 1.8s | — |
| DSR-CATOV-007 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-007 [ja] catalog/search is not taken by the overlay | passed | 0.9s | — |
| DSR-CATOV-008 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-008 [ja] catalog detail page makes 0 GraphQL requests; html lang matches the site | passed | 1.5s | — |
| DSR-CATOV-015 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-015 [ja] PDF, requiresForm OFF → download opens the PDF directly | failed | 9.0s / 9.3s | Error: download button expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail').getByRole('link', { name: /download\|view\|ダウンロード\|閲覧\|見る/i })  |
| DSR-CATOV-016 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-016 [ja] PDF, requiresForm ON → form first, PDF URL not exposed | failed | 6.6s / 5.9s | Error: catalog-detail block expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail') Expected: visible Received: hidden Timeout: 5000ms Cal |
| DSR-CATOV-017 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-017 [ja] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form | failed | 11.1s / 12.3s | Error: view button expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail').getByRole('link', { name: /download\|view\|ダウンロード\|閲覧\|見る/i }) Expe |
| DSR-CATOV-018 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-018 [ja] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) | failed | 18.6s / 16.4s | Error: view button expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail').getByRole('link', { name: /download\|view\|ダウンロード\|閲覧\|見る/i }) Expe |
| DSR-CATOV-019 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-019 [ja] catalog detail shows image, name, description, date and type label of the content CF | failed | 8.0s / 8.0s | Error: catalog-detail block expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail') Expected: visible Received: hidden Timeout: 5000ms Cal |
| DSR-CATOV-001 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-001 [en] qa190-cat-pdf: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 5.9s / 6.6s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF catalog" Timeo |
| DSR-CATOV-002 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-002 [en] qa190-cat-pdf: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 0.5s / 0.5s | Error: <title> expect(received).toBe(expected) // Object.is equality Expected: "QA190 PDF catalog \| YKK DIGITAL SHOWROOM" Received: "catalog pdf \| YKK DIGITAL S |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [en] qa190-cat-pdf: live-published catalog is served on .aem.page and .aem.live | passed | 0.2s | — |
| DSR-CATOV-021 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-021 [en] qa190-cat-pdf: live page listed once in query-index and sitemap | failed | 0.1s / 0.2s | Error: sitemap <loc> expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-CATOV-001 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-001 [en] qa190-cat-pdf-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 5.9s / 6.0s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 PDF form required" |
| DSR-CATOV-002 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-002 [en] qa190-cat-pdf-form: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 0.8s / 0.5s | Error: <title> expect(received).toBe(expected) // Object.is equality Expected: "QA190 PDF form required \| YKK DIGITAL SHOWROOM" Received: "catalog pdf form \| YK |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published catalog is served on .aem.page and .aem.live | passed | 0.2s | — |
| DSR-CATOV-021 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | failed | 0.2s / 0.3s | Error: sitemap <loc> expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-CATOV-001 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-001 [en] qa190-cat-ebook: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 8.5s / 11.9s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book" Timeout: 5 |
| DSR-CATOV-002 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-002 [en] qa190-cat-ebook: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 1.2s / 1.3s | Error: <title> expect(received).toBe(expected) // Object.is equality Expected: "QA190 e-book \| YKK DIGITAL SHOWROOM" Received: "catalog ebook \| YKK DIGITAL SHOW |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [en] qa190-cat-ebook: live-published catalog is served on .aem.page and .aem.live | passed | 1.7s | — |
| DSR-CATOV-021 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-021 [en] qa190-cat-ebook: live page listed once in query-index and sitemap | failed | 1.1s / 1.2s | Error: sitemap <loc> expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-CATOV-001 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-001 [en] qa190-cat-ebook-form: publishing DSR CF creates the catalog detail page with the catalog name shown | failed | 9.1s / 9.7s | Error: expect(locator).toHaveText(expected) failed Locator: locator('main .catalog-detail').locator('.catalog-detail-title') Expected: "QA190 e-book form" Timeo |
| DSR-CATOV-002 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-002 [en] qa190-cat-ebook-form: static HTML carries title, description, og:image and the content CF rows with the same id | failed | 1.2s / 1.1s | Error: <title> expect(received).toBe(expected) // Object.is equality Expected: "QA190 e-book form \| YKK DIGITAL SHOWROOM" Received: "catalog ebook form \| YKK DI |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published catalog is served on .aem.page and .aem.live | passed | 1.4s | — |
| DSR-CATOV-021 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | failed | 1.3s / 1.2s | Error: sitemap <loc> expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received array: [] |
| DSR-CATOV-004 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-004 [en] naming rule: uppercase / underscore catalog URL → 404 | passed | 2.6s | — |
| DSR-CATOV-006 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | passed | 1.5s | — |
| DSR-CATOV-007 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-007 [en] catalog/search is not taken by the overlay | passed | 3.0s | — |
| DSR-CATOV-008 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-008 [en] catalog detail page makes 0 GraphQL requests; html lang matches the site | passed | 5.1s | — |
| DSR-CATOV-012 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-012 [en] catalog list card links to the overlay page | failed | 9.3s / 8.9s | Error: href path expect(received).toBe(expected) // Object.is equality Expected: "/en/library/catalog/qa190-cat-pdf" Received: "/content/dam/ykk/digital-showroo |
| DSR-CATOV-015 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-015 [en] PDF, requiresForm OFF → download opens the PDF directly | failed | 10.9s / 10.7s | Error: download button expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail').getByRole('link', { name: /download\|view\|ダウンロード\|閲覧\|見る/i })  |
| DSR-CATOV-016 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-016 [en] PDF, requiresForm ON → form first, PDF URL not exposed | failed | 5.8s / 6.1s | Error: catalog-detail block expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail') Expected: visible Received: hidden Timeout: 5000ms Cal |
| DSR-CATOV-017 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-017 [en] e-book, requiresForm OFF → opens ebookUrl in a new tab without a form | failed | 12.5s / 12.7s | Error: view button expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail').getByRole('link', { name: /download\|view\|ダウンロード\|閲覧\|見る/i }) Expe |
| DSR-CATOV-018 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-018 [en] e-book, requiresForm ON → behaviour per DSR-655 Y3 (default: no form, opens ebookUrl) | failed | 14.1s / 16.7s | Error: view button expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail').getByRole('link', { name: /download\|view\|ダウンロード\|閲覧\|見る/i }) Expe |
| DSR-CATOV-019 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-019 [en] catalog detail shows image, name, description, date and type label of the content CF | failed | 8.3s / 7.9s | Error: catalog-detail block expect(locator).toBeVisible() failed Locator: locator('main .catalog-detail') Expected: visible Received: hidden Timeout: 5000ms Cal |
| DSR-CATOV-010 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | passed | 1.9s | — |
| DSR-CATOV-011 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-011 [en] content CF only (no DSR CF) → no page | passed | 1.3s | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 7.6s | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 6.8s | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 5.4s | — |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 2.5s | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 2.0s | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 1.4s | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 7.9s | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 7.3s | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 5.0s | — |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 1.9s | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 1.8s | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 2.0s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.page) | passed | 2.1s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.page) | passed | 2.0s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.page) | passed | 2.8s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.page) | passed | 1.7s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 [ja] no autoplay before click (qa587-main, .aem.live) | passed | 2.1s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 [ja] no autoplay before click (qa557-dam, .aem.live) | passed | 1.7s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 [ja] YouTube embed src after click (qa587-main, .aem.live) | passed | 3.6s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 [ja] no YouTube/Youku request before interaction (qa587-main, .aem.live) | passed | 5.2s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.page) | passed | 6.5s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.page) | passed | 5.9s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.page) | passed | 4.1s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.page) | passed | 5.2s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 [en] no autoplay before click (qa587-main, .aem.live) | passed | 5.1s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 [en] no autoplay before click (qa557-dam, .aem.live) | passed | 4.6s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 [en] YouTube embed src after click (qa587-main, .aem.live) | passed | 4.4s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 [en] no YouTube/Youku request before interaction (qa587-main, .aem.live) | passed | 4.7s | — |
| DSR-ECO-001 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | passed | 6.6s | — |
| DSR-ECO-002 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language) | failed | 5.8s / 2.9s | Error: detail slugs = TD-590-02 expect(received).toEqual(expected) // deep equality - Expected - 9 + Received + 9 Array [ - "bio-based", - "bluesign-approved",  |
| DSR-ECO-004 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200) | failed | 3.1s / 4.2s | Error: finder URL (P087), same language expect(received).toContain(expected) // indexOf Expected value: "" Received array: ["/ja/product/performance/sustainable |
| DSR-ECO-003 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | passed | 15.4s | — |
| DSR-ECO-012 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | passed | 1.7s | — |
| DSR-ECO-013 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | passed | 2.1s | — |
| DSR-ECO-014 | `eco-products/DSR-590.stable-capture.spec.ts` › DSR-ECO-014 [ja] stable PC initial, Next, dot 5 and fullPage captures | passed | 9.9s | — |
| DSR-ECO-016 | `eco-products/DSR-590.stable-capture.spec.ts` › DSR-ECO-016 [ja] stable SP initial and swipe captures | passed | 10.9s | — |
| DSR-ECO-014 | `eco-products/DSR-590.visual-capture.spec.ts` › DSR-ECO-014 [ja] PC carousel visual capture and measurements | passed | 7.0s | — |
| DSR-ECO-016 | `eco-products/DSR-590.visual-capture.spec.ts` › DSR-ECO-016 [ja] SP capture, horizontal overflow and carousel interaction facts | passed | 7.6s | — |
| DSR-ICON-006 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed | 5.5s / 10.5s | Error: console errors expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + 3 - Array [] + Array [ + "Failed to load resource: the ser |
| DSR-ICON-006 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed | 9.2s / 9.0s | Error: console errors expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + 3 - Array [] + Array [ + "Failed to load resource: the ser |
| DSR-MAIL-016 | `mail/DSR-433.mail-endpoints.spec.ts` › DSR-MAIL-016 [—] webhook GET without auth is refused | passed | 0.5s | — |
| DSR-MAIL-017 | `mail/DSR-433.mail-endpoints.spec.ts` › DSR-MAIL-017 [—] test-send GET without params or auth is not public | passed | 1.4s | — |
| DSR-MOVIE-012 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-012 [en] displays the exact movie title | passed | 5.0s | — |
| DSR-MOVIE-014 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-014 [en] embeds the configured YouTube movie | failed | 9.7s / 10.1s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-player-facade') Expected: visible Timeout: 5000ms Error: element(s) not found Cal |
| DSR-MOVIE-036 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-036 no site-origin console errors on the movie component page | passed | 5.7s | — |
| DSR-MOVIE-026 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | failed | 16.6s / 15.3s | Error: Related card 1 thumbnail expect(locator).toBeVisible() failed Locator: getByTestId('related-content-card').first().getByTestId('related-content-card-imag |
| DSR-MOVIE-027 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-027 [en] outputs exactly one title and og:title | passed | 4.6s | — |
| DSR-MOVIE-029 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | passed | 5.9s | — |
| DSR-MOVIE-033 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-033 displays component sections in vertical order on PC | failed | 9.8s / 10.8s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-player') Expected: visible Timeout: 5000ms Error: element(s) not found Call log:  |
| DSR-MOVIE-034 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-034 displays the component back control | passed | 4.6s | — |
| DSR-501-P3 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P3 [en] related movies are limited to 5 in authored order | failed | 10.6s / 10.9s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-related-content') Expected: visible Timeout: 5000ms Error: element(s) not found C |
| DSR-501-P2 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | failed | 11.1s / 10.8s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-related-content') Expected: visible Timeout: 5000ms Error: element(s) not found C |
| DSR-VOV-001 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-001 [ja] live CF related → movie detail page 200, title shown, movie plays | passed | 4.8s | — |
| DSR-VOV-001 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-001 [en] live CF related → movie detail page 200, title shown, movie plays | passed | 4.7s | — |
| DSR-VOV-003 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | failed | 7.8s / 6.7s | Error: og:image absolute URL expect(received).toMatch(expected) Expected pattern: /^https?:\/\// Received string: "about:error" |
| DSR-VOV-003 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | failed | 6.3s / 6.4s | Error: og:image absolute URL expect(received).toMatch(expected) Expected pattern: /^https?:\/\// Received string: "about:error" |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed | 18.0s / 11.7s | Error: list block expect(locator).toHaveCount(expected) failed Locator: locator('main .listing') Expected: 1 Received: 0 Timeout: 5000ms Call log: - list block  |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed | 18.5s / 17.8s | Error: list block expect(locator).toHaveCount(expected) failed Locator: locator('main .listing') Expected: 1 Received: 0 Timeout: 5000ms Call log: - list block  |
| DSR-VOV-013 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-013 [en] movie list shows standard movies only | failed | 17.3s / 17.7s | Error: first list card (main-frame navigations: 60) expect(received).toBe(expected) // Object.is equality Expected: true Received: false |
| DSR-VOV-014 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-014 [en] related movies max 5 when 6 are linked | passed | 3.3s | — |
| DSR-VOV-015 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-015 [en] related movie with isUnavailable = true is hidden | passed | 3.4s | — |
| DSR-VOV-018 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [ja] language variant: 200, html lang, title | passed | 3.3s | — |
| DSR-VOV-018 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-018 [en] language variant: 200, html lang, title | passed | 3.0s | — |
| DSR-501-P3 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P3 [en] related movies are max 5, newest updated first | passed | 7.6s | — |
| DSR-501-P2 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | passed | 6.8s | — |
| DSR-538-retest | `movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts` › DSR-538-retest [en] qa587-rel-a (.aem.page) related card hrefs on the EDS host, HTTP 200 | passed | 6.6s | — |
| DSR-538-retest | `movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts` › DSR-538-retest [en] qa587-rel-a (.aem.live) related card hrefs on the EDS host, HTTP 200 | passed | 7.0s | — |
| DSR-NEWS-001 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-001 [en] page shows date, category, title and body | passed | 7.1s | — |
| DSR-NEWS-002 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list | failed | 6.8s / 7.8s | Error: required elements missing expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + 3 - Array [] + Array [ + "backToList", + ] |
| DSR-NEWS-003 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [en] shown date equals meta publish date | failed | 2.5s / 2.4s | Error: expect(received).toBe(expected) // Object.is equality Expected: "2026-09-29" Received: "2026-03-30" |
| DSR-NEWS-004 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-004 [en] category and title are non-empty text | passed | 1.9s | — |
| DSR-NEWS-006 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | failed | 7.0s / 7.3s | Error: Back to list link expect(locator).toHaveCount(expected) failed Locator: locator('main').getByRole('link', { name: /back to list\|一覧へ戻る/i }) Expected: 1 Re |
| DSR-NEWS-007 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | failed | 2.4s / 2.4s | Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query-index.json expect(received).not.toBeNull() Receive |
| DSR-NEWS-009 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-009 [en] no related-content block | passed | 1.6s | — |
| DSR-NEWS-010 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | passed | 1.4s | — |
| DSR-NEWS-012 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | failed | 12.3s / 12.5s | Error: My List button expect(locator).toBeVisible() failed Locator: locator('main').locator('.article-meta.block').getByRole('button', { name: /my ?list\|マイリスト/i |
| DSR-NEWS-013 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | passed | 6.2s | — |
| DSR-NEWS-018 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [en] title, description and og tags non-empty | failed | 8.2s / 8.1s | Error: meta[name="description"] expect(received).not.toBe(expected) // Object.is equality Expected: not "" |
| DSR-PCF-007 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.2s | — |
| DSR-PCF-007 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.1s | — |
| DSR-PCF-016 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 0.5s | — |
| DSR-PCF-016 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 0.5s | — |
| DSR-PCF-017 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.2s | — |
| DSR-PCF-017 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.4s | — |
| DSR-PCF-019 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | passed | 0.8s | — |
| DSR-PCF-019 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | passed | 0.9s | — |
| DSR-PLSP-001 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 5.0s | — |
| DSR-PLSP-002 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | failed | 18.2s / 19.9s | Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + 6 - Array [] + Array [ + "", + "", +  |
| DSR-PLSP-003 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | failed | 30.8s / 30.8s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | failed | 30.6s / 30.6s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-004 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 10.2s | — |
| DSR-PLSP-001 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 4.2s | — |
| DSR-PLSP-002 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | failed | 17.2s / 13.8s | Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + 5 - Array [] + Array [ + "", + "", +  |
| DSR-PLSP-003 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | failed | 30.7s / 30.6s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | failed | 3.5s / 3.1s | Error: 3 results: left aligned expect(received).toBe(expected) // Object.is equality Expected: 0 Received: 2 |
| DSR-PLSP-004 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 7.3s | — |
| DSR-PRODLIST-001 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | failed | 5.6s / 5.6s | Error: TD-583-01 ≥ 6 products expect(received).toBeGreaterThanOrEqual(expected) Expected: >= 6 Received: 4 |
| DSR-PRODLIST-002 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed | 15.4s / 20.2s | Error: 320: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 2 Received: 1 |
| DSR-PRODLIST-003 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | failed | 13.6s / 9.4s | Error: open: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 2 Received: 1 |
| DSR-PRODLIST-004 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed | 13.5s / 8.9s | Error: 1440: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 4 Received: 1 |
| SMOKE-001 | `smoke.spec.ts` › SMOKE-001 DSR-173 test page is reachable | passed | 0.5s | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | failed | 4.2s / 3.9s | Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality Expected: not [] |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 4.3s / 4.1s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).toBe(expected) // Object.is equality Expected: true  |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | failed | 3.2s / 3.5s | Error: page requests /ja/news/query-index.json expect(received).toContain(expected) // indexOf Expected value: "/ja/news/query-index.json" Received array: ["/qu |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 3.7s / 4.7s | Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected) Expected: <= 1 Received: 2 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [ja] NEWS with empty query-index renders without error | passed | 3.7s | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [ja] main visual image is eager and is the LCP element | passed | 4.2s | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | failed | 3.2s / 3.5s | Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality Expected: not [] |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 3.8s / 3.5s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).toBe(expected) // Object.is equality Expected: true  |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | failed | 3.7s / 3.4s | Error: page requests /en/news/query-index.json expect(received).toContain(expected) // indexOf Expected value: "/en/news/query-index.json" Received array: ["/qu |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 3.6s / 3.7s | Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected) Expected: <= 1 Received: 2 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [en] NEWS with empty query-index renders without error | passed | 3.8s | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [en] main visual image is eager and is the LCP element | passed | 6.5s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | passed | 9.1s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | passed | 8.0s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] PC full-page capture and horizontal overflow | passed | 10.5s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] SP full-page capture and horizontal overflow | passed | 8.0s | — |

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
| DSR-ASSET-003 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 [en] | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 [en] | blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-017  | blocked-data: no product id published in both ja and en |
| DSR-BREAD-018 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-019  | DSR-555 + cn |
| DSR-BREAD-021  | DSR-575 Q5 (SP display) |
| DSR-BREAD-022  | DSR-575 Q5 (SP display) |
| DSR-BREAD-023  | DSR-575 Q5 (SP display) |
| DSR-BREAD-029  | Run on STG (Lighthouse) |
| DSR-BREAD-030  | DSR-536 / movie-detail placement |
| DSR-BREAD-033  | Layout tickets |
| DSR-BREAD-034  | DSR-536 / movie-detail placement |
| DSR-BREAD-001  | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005  | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008  | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017  | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025  | cn: no /master/cn (Issue #18) |
| DSR-CATDL-006 [ja] | blocked-data: qa190-cat-pdf-form (ja) requiresForm=false in /content/dam/common/ja/catalogs/qa190-cat-pdf-form; TD expects true – TD-570-03 |
| DSR-CATDL-018 [ja] | blocked-data: qa190-cat-ebook-form (ja) requiresForm=false in /content/dam/common/ja/catalogs/qa190-cat-ebook-form; TD expects true – TD-570-04 |
| DSR-CATDL-001 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-002 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-006 [en] | blocked-data: qa190-cat-pdf-form (en) requiresForm=false in /content/dam/common/en/catalogs/qa190-cat-pdf-form; TD expects true – TD-570-03 |
| DSR-CATDL-018 [en] | blocked-data: qa190-cat-ebook-form (en) requiresForm=false in /content/dam/common/en/catalogs/qa190-cat-ebook-form; TD expects true – TD-570-04 |
| DSR-CATDL-007 [ja] | blocked-data: qa190-cat-pdf-form (ja) requiresForm=false in /content/dam/common/ja/catalogs/qa190-cat-pdf-form; nothing is gated (TD-570-03 expects true) |
| DSR-CATDL-010 [ja] | blocked-data: qa190-cat-pdf-form (ja) requiresForm=false in /content/dam/common/ja/catalogs/qa190-cat-pdf-form; TD expects true – TD-570-03 + HubSpot EX-06/EX-07 |
| DSR-CATDL-017 [ja] | no catalog-ID mechanism on DEV yet: "catalog pdf form" card href carries no catalog id (requiresForm=false); overlay detail is /{lang}/library/catalog/{id} (path, not query) |
| DSR-CATDL-016 [en] | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404; /en/library/catalog/qa190-cat-pdf-form renders no form |
| DSR-CATDL-016 [cn] | cn: no /master/cn (Issue #18) |
| DSR-CATOV-005 [ja] | TD-654-02 not seeded (qa654-inactive) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa654-inactive HTTP 404) |
| DSR-CATOV-006 [ja] | TD-654-03 exists in en only (A7) |
| DSR-CATOV-012 [ja] | catalog list not published (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog HTTP 404, DSR-638) |
| DSR-CATOV-020 [ja] | Visual – codex job |
| DSR-CATOV-005 [en] | TD-654-02 not seeded (qa654-inactive) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa654-inactive HTTP 404) |
| DSR-CATOV-020 [en] | Visual – codex job |
| DSR-CATOV-009 [en] | TD-654-04 not seeded (qa654-preview) (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/catalog/qa654-preview HTTP 404) |
| DSR-CATOV-013 [en] | Manual – QA-PT |
| DSR-CATOV-014 [en] | TD-654-08 not seeded (qa654-content-unpub) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa654-content-unpub HTTP 404) |
| DSR-CATOV-001 [cn] | Issue #18: no /cn path on DEV |
| DSR-CATV-017  | Blocked – data: qa190-cat-ebook-form (ja) is not a ebook requiresForm=true item: catalogType=ebook, requiresForm=false, ebookUrl=https://www.ykkfastening.com/ |
| DSR-CATV-017  | Blocked – data: qa190-cat-ebook-form (en) is not a ebook requiresForm=true item: catalogType=ebook, requiresForm=false, ebookUrl=https://www.ykkfastening.com/ |
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
| DSR-MOVIE-020  | Issue #1: related products specification pending |
| DSR-MOVIE-021  | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023  | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025  | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028  | Description line-break separator is unconfirmed |
| DSR-MOVIE-001  | B: page auto-generation not implemented |
| DSR-MOVIE-002  | B: page auto-generation not implemented |
| DSR-MOVIE-003  | B: page auto-generation not implemented |
| DSR-MOVIE-004  | M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005  | B: page auto-generation not implemented |
| DSR-MOVIE-006  | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007  | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008  | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009  | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010  | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011  | B: page auto-generation not implemented |
| DSR-MOVIE-013  | C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015  | C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016  | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017  | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018  | B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019  | C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022  | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024  | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030  | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031  | B: page auto-generation not implemented |
| DSR-MOVIE-032  | B: ja/zh pages not available |
| DSR-MOVIE-035  | B: SP design pending |
| DSR-VOV-002 [en] | TD-587-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-preview HTTP 404) |
| DSR-VOV-004 [en] | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 [en] | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 [en] | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-007 [ja] | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-007 [en] | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-008 [en] | TD-587-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-unavail HTTP 404) |
| DSR-VOV-009 [en] | Manual TC: Author edit + publish of CF commune / CF related; agents are read-only (A6) – QA-PT |
| DSR-VOV-010 [en] | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 [ja] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 [en] | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 [cn] | Issue #18: no /cn path on DEV |
| DSR-VOV-016 [en] | TD-587-14 update dates not recorded (fixtures/dsr-587.ts expectedOrderByUpdateDesc) |
| DSR-VOV-017 [en] | DSR173_MOVIE_PATH / DSR173_RELATED_PATH not set to the TD-587-01 / 14 pages (now /master/en/test-space/dsr-173-video-detail / null); run DSR-173 Group A with them |
| DSR-VOV-018 [cn] | Issue #18: no /cn path on DEV |
| DSR-538-retest [en] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [en] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
| DSR-538-retest [ja] | No related card on qa587-main (TD-587-01 has no related content) – nothing to check |
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
| DSR-PCF-001 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 [ja] | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 [en] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 [ja] | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 [en] | Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-001 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-001 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-002 [ja] | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-003 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-003 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-004 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-005 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-006 [ja] | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 [ja] | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-008 [ja] | TD-586-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586008 HTTP 404) |
| DSR-PDO-009 [ja] | TD-586-09 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586009 HTTP 404) |
| DSR-PDO-011 [ja] | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-012 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-013 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-013 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-014 [en] | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 [cn] | fixme |
| DSR-PDO-017 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-020 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-021 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PDO-019 [ja] | TD-586-01 incomplete: overlay row 'unavailable \| no-product' |
| DSR-PRODLIST-003 [en] | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 [ja] | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 [ja] | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 [en] | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 [ja] | Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |

## 6. Failed tests

86 tests failed. 42 of them fail with the same assertion and values as JOB-ZZ-IDLE-28. For those, see `results/regression/DEV/automation-run-20261021-idle28.md` §6 and the one-line reasons in §4 above. The subsections below cover only the fails that are new or whose reason changed. Every failed test has a screenshot under `test-results/` (gitignored, **not committed**). Copies of the key ones are in `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/evidence/`.

### DSR-VOV-003 [ja]/[en] — raw HTML has title / description / og:image and movie title; 0 GraphQL requests

- Failing assertion: `og:image absolute URL` `toMatch(/^https?:\/\//)` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:125`
- Expected: absolute og:image URL (BL-OVL-1)
- Actual: `<meta property="og:image" content="about:error">` on `/ja|en/library/video/qa587-main` (curl confirmed after the run)
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/evidence/DSR-VOV-003_ja.png`

### DSR-VOV-011 [ja]/[en] — video/search stays a list page (list block with ≥ 1 card, no video-detail)

- Failing assertion: `list block` `toHaveCount(1)` on `main .listing` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:204`
- Expected: list block with ≥ 1 card, no video-detail
- Actual: HTTP 200 (IDLE-28: 404). 0 `.listing`. Raw HTML has `class="video-detail"`, `<title>YKK DIGITAL SHOWROOM`, `robots noindex`. Last-Modified 2026-10-22T01:04:27Z
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/evidence/DSR-VOV-011_ja.png`

### DSR-VOV-013 [en] — movie list shows standard movies only

- Failing assertion: `first list card (main-frame navigations: 60)` `toBe(true)` — `tests/movie-detail/DSR-587.movie-overlay.spec.ts:233`
- Expected: first card of `/en/library/video/search` opens a standard movie
- Actual: false. The list page has no listing block (see VOV-011)
- Attempt(s): fail / fail
- Evidence paths: no screenshot generated (assertion outside page context)

### DSR-CATOV-001 / 015 / 016 / 017 / 018 / 019 [ja]/[en] — catalog detail block content

- Failing assertion: `.catalog-detail-title` `toHaveText` (001, `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:97`); `main .catalog-detail` `toBeVisible` (016/019, :253/:305); download/view link `toBeVisible` (015/017/018, :237/:274/:294)
- Expected: catalog name, image, description, date, type label and download/view button from the content CF
- Actual: raw HTML is 200 with the overlay rows (`catalogTitle` "catalog pdf", `catalogType` pdf …), but the rendered page is empty below the breadcrumb: block hidden, no title, no button
- Attempt(s): fail / fail (all 24)
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/evidence/DSR-CATOV-001_en.png`, `…/DSR-CATOV-019_en.png`

### DSR-CATOV-002 [ja]/[en] × 4 ids — static HTML title

- Failing assertion: `<title>` `toBe` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:108`
- Expected: e.g. "QA190 PDF catalog | YKK DIGITAL SHOWROOM" (TD-190)
- Actual: "catalog pdf | …", "catalog pdf form | …", "catalog ebook | …", "catalog ebook form | …"; ja qa190-cat-pdf = "qa190-cat-pdf | …"
- Attempt(s): fail / fail
- Evidence paths: no screenshot (HTTP-level test)

### DSR-CATOV-021 [ja]/[en] × 4 ids — query-index and sitemap

- Failing assertion: `sitemap <loc>` `toHaveLength(1)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:156`
- Expected: each live catalog page listed once
- Actual: 0 `<loc>` entries
- Attempt(s): fail / fail
- Evidence paths: no screenshot (HTTP-level test)

### DSR-CATOV-012 [en] — catalog list card links to the overlay page

- Failing assertion: `href path` `toBe` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:223`
- Expected: `/en/library/catalog/qa190-cat-pdf`
- Actual: `/content/dam/ykk/digital-showroom/test/qa190-catalog-sample.pdf`
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/evidence/DSR-CATOV-012_en.png`

### DSR-ARTICLE-016 [ja] — robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `qa529-02 robots` `toMatch(/noindex/i)` — `tests/article-detail/DSR-529.article-detail.spec.ts:192`
- Expected: qa529-02 `noindex, nofollow`
- Actual: `""` (no robots meta). qa529-01 ja check now passes. [en] is unchanged and still fails at :184 (qa529-01 en = `noindex, nofollow`)
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/evidence/DSR-ARTICLE-016_ja.png`

### DSR-ARTICLE-023 [ja] — no related items block/heading when 0 results (トルツメ)

- Failing assertion: `visible related items block` `toEqual([])` — `tests/article-detail/DSR-529.article-detail.spec.ts:291`
- Expected: no visible related block
- Actual: 1 visible block, height 281.98 px (IDLE-28: heading only, 32.39 px)
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/evidence/DSR-ARTICLE-023_ja.png`

### DSR-MOVIE-014 [en] — embeds the configured YouTube movie

- Failing assertion: `getByTestId('movie-detail-player-facade')` `toBeVisible` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:36`
- Expected: player facade, then embed with `/embed/`
- Actual: facade not found on `/master/en/test-space/dsr-173-video-detail` (IDLE-28 failed one step later: embed not found)
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/evidence/DSR-MOVIE-014_en.png`

### DSR-PLSP-005 [ja] — SP odd result count: last card = other card width, left aligned

- Failing assertion: test timeout 30 s in the filter step — `pages/ProductListPage.ts:112`
- Expected: left-aligned last card
- Actual: timeout both attempts (IDLE-28: assertion "left aligned" 2 ≠ 0)
- Attempt(s): fail / fail
- Evidence paths: `test-results/product-list-DSR-583.produ-58aaf-her-card-width-left-aligned-chromium/test-failed-1.png` (not committed)

### Flaky (passed on retry, not failed): DSR-CATDL-014 [ja]

- Attempt 1: `Test timeout of 30000ms exceeded.`; attempt 2 passed.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Cause tags and confidence are my inference from timing, Last-Modified headers and hub notes. I did not check Author, Jira or the dev merge log.
- `/en/library/video/search` was republished at 01:04Z, 7 minutes before the run. Someone may still be editing it (DSR-638), so VOV-011/013 should be rechecked later today.
- Catalog CATOV fails: the raw HTML rows are present, but the rendered block is empty. This is not yet checked in a second browser or against the .aem.page tier.
- The CATOV-002 title mismatch looks like data (the CF title differs from TD-190), not a product issue.
- qa529-01 en still has `noindex, nofollow` after the 15:10Z republish (Night 21/10 data?), and qa529-02 has no robots meta. Needs a page-properties check in Author (QA-PT / lane author).
- DSR-638: the run used v1 (old) paths. For the HTTP status of the new paths, see `ykk-dsr/hub/results/JOB-ZZ-IDLE-30/summary.md`. No spec was run with `DSR_PATHS=v2`.
- BREAD-032 webkit still cannot launch on the VPS (missing host libraries). This is env, not product.
- The run did not use `pkill`; no other lane's process was touched.
- Side effect: the run rewrote tracked capture/evidence files of older jobs (evidence/DSR-552/DEV/*, results/JOB-ZZ-IDLE-27/*, hub results of JOB-20261015-14 / 20261016-13 / 20261019-04 / 20261019-09 / 20261020-01) and created 8 untracked BREAD pngs. I restored them to HEAD or deleted them and did not commit them, so historical evidence stays unchanged.
