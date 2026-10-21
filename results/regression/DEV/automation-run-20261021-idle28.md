# regression DEV automation run — 20261021-idle28

Job: `JOB-ZZ-IDLE-28` (regression, all specs, after Martin's 21/10 merges; run-only, read-only). One full run of `npm run test:dev` (all projects) on EDS `main` **.aem.live**, compared with `JOB-20261020-09` (20/10, 09:31Z). Cause tags and the comparison are in `ykk-dsr/hub/results/JOB-ZZ-IDLE-28/` (summary.md, result.json).

## 1. Header

- Run start (UTC): 2026-10-21T11:11:26Z (tsc check ran right before it, ~11:11Z). An earlier attempt was started at ~11:10Z and stopped by me within about a minute because my shell timeout was too short. Its partial results were discarded and are not used here.
- Run end (UTC): 2026-10-21T11:31:17Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): all pages used by the existing specs (movie DSR-173/501/587/647, assets DSR-227, mail DSR-433, article DSR-529 + capture, breadcrumb DSR-552, catalog/video DSR-557, news DSR-566, catalog download DSR-570, product list DSR-583, product CF DSR-585 (new since JOB-09), product detail DSR-586, icons DSR-589, eco DSR-590, top DSR-609, catalog overlay DSR-654 (new since JOB-09), smoke)
- Build under test: not independently verified. Martin's 21/10 merges are taken from the hub: article fix DSR-657–660 (article-meta.js/image.js last-modified 2026-10-21T09:42:41Z per JOB-20261021-07), 404 config deploy (same time), and DSR CF page auto-generation since 2026-10-21T08:25Z (BL-OVL-1 update). I did not re-check Last-Modified headers for the code in this run.
- Baseline ID: per US as recorded in `docs/<US>/` (DSR-173: BL-v1; overlay: BL-OVL-1 incl. "Update 2026-10-21"). Not re-verified in this run.
- Automation HEAD commit SHA: 66734114f6991a8cbfa3832b4b0df9231d3b6ee8
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/idle28/results.json npm run test:dev
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 416 | 139 (incl. 2 flaky) | 63 | 214 | 1 | 2 | configured 1; 65 tests retried (63 failed again, 2 passed) | 19m 51s (Playwright 19.8m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: full suite, all projects (chromium 414 + firefox 1 + webkit 1; firefox/webkit only run DSR-BREAD-032). Flaky: 2 (DSR-CATDL-014, DSR-CATDL-015: attempt 1 hit the 30 s test timeout, retry passed).

### Changes vs JOB-20261020-09 (cause tag per job: article fix merge / 404 config deploy / overlay auto-gen / none)

JOB-09: 345 tests, 111 pass / 69 fail / 165 skip. The 71 extra tests are tests added since JOB-09: DSR-654 catalog overlay 35, DSR-585 product CF 25, DSR-529 capture 030/031 10, DSR-ARTICLE-028 [en] 1. Matching is by TC ID + language + browser.

| Test | JOB-09 (20/10) | Now | cause | Note |
|---|---|---|---|---|
| DSR-ARTICLE-007 [ja]/[en] | fail | pass | article fix merge | DSR-660: shown 2026.10.01 = meta publicationdate. Spec was also changed (meta rename + YYYY.MM.DD assert, JOB-04/07) |
| DSR-ARTICLE-006 [ja]/[en] | fail (0 labels) | fail (3 labels) | article fix merge | DSR-658: chips now render. The spec locator also counts the wrapper (JOB-07: suspect test). One chip reads "do-not-translate"; en shows ja label |
| DSR-ARTICLE-010 [ja]/[en] | fail | pass | none | spec meta-name change (publicationdate/updatedate, JOB-04), already passing at 09:12Z before the merge |
| DSR-ARTICLE-003/013/029 [ja]/[en] | fail | pass | none | QA-PT data fix 20/10; passing since JOB-20261020-10 (16:16Z), before 21/10 merges |
| DSR-ARTICLE-012/014 [ja]/[en] | fail | fail (new reason) | none | spec change: category meta now required (TD category authored, Night 21/10 0b); 0 `category` metas |
| DSR-ARTICLE-028 [ja] / [en] | skip (fixme) / not present | fail | none | test unblocked after JOB-09; last breadcrumb item = page title, navtitle expected (navtitle data Night 21/10 0b) |
| DSR-CATOV-003 [en] qa190-cat-pdf-form, qa190-cat-ebook-form | not present (new spec) | fail | overlay auto-gen | .aem.page 200, .aem.live 404: page exists in preview only |
| DSR-CATOV-001…008 (other 33) | not present | skip | – | TD-190 not on this tier / TD ids not seeded |
| DSR-ECO-002 [ja] | fail (lang prefix) | fail (new reason) | none | no spec change; all 9 VIEW MORE → `dsr-590-eco-detail-page`, expected TD-590-02 slugs |
| DSR-CATDL-014/015 [ja] | pass | flaky (pass on retry) | none | attempt 1 timed out at 30 s |
| 404 config deploy | – | – | 404 config deploy | no result changed. VOV-011 still 404 on .live, ICON-006 still /placeholders.json 404 |
| all other fails (CATDL-006/018, CATV-017 = overlay-merge 20/10; rest none) | fail | same fail | unchanged | same assertion and values as JOB-09 |

## 4. Executed tests

Duration per attempt (initial / retry). Proposed outcomes.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | failed | 12.3s / 10.1s | Error: required blocks missing expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + |
| DSR-ARTICLE-003 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | passed | 9.4s | — |
| DSR-ARTICLE-006 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | failed | 9.4s / 10.0s | Error: tag labels expect(received).toHaveLength(expected) Expected length: 2 Received length: 3 Received array |
| DSR-ARTICLE-007 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [ja] info bar date = meta publicationdate, format YYYY.MM.DD | passed | 4.8s | — |
| DSR-ARTICLE-008 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | passed | 5.5s | — |
| DSR-ARTICLE-010 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible | passed | 4.3s | — |
| DSR-ARTICLE-011 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 5.5s / 5.5s | Error: absolute URL expect(received).toMatch(expected) Expected pattern: /^https?:\/\// Received string: "/con |
| DSR-ARTICLE-012 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | failed | 4.9s / 3.6s | Error: category meta count expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Recei |
| DSR-ARTICLE-013 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | passed | 2.6s | — |
| DSR-ARTICLE-014 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | failed | 3.6s / 3.8s | Error: category count expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received a |
| DSR-ARTICLE-016 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 5.1s / 5.6s | Error: qa529-01 robots expect(received).not.toMatch(expected) Expected pattern: not /noindex/i Received string |
| DSR-ARTICLE-024 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | failed | 4.6s / 3.7s | Error: viewAllStories href expect(received).not.toMatch(expected) Expected pattern: not /^(#?)$/ Received stri |
| DSR-ARTICLE-028 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link | failed | 3.7s / 3.3s | Error: last item = navtitle expect(received).toBe(expected) // Object.is equality Expected: "QA529 ナビ" Receive |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | passed | 2.4s | — |
| DSR-ARTICLE-002 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | failed | 4.2s / 4.8s | Error: required blocks missing expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + |
| DSR-ARTICLE-003 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | passed | 2.4s | — |
| DSR-ARTICLE-006 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | failed | 3.3s / 3.4s | Error: tag labels expect(received).toHaveLength(expected) Expected length: 2 Received length: 3 Received array |
| DSR-ARTICLE-007 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-007 [en] info bar date = meta publicationdate, format YYYY.MM.DD | passed | 2.3s | — |
| DSR-ARTICLE-008 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | passed | 2.8s | — |
| DSR-ARTICLE-010 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible | passed | 2.3s | — |
| DSR-ARTICLE-011 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 3.5s / 10.3s | Error: absolute URL expect(received).toMatch(expected) Expected pattern: /^https?:\/\// Received string: "/con |
| DSR-ARTICLE-012 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | failed | 6.4s / 6.2s | Error: category meta count expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Recei |
| DSR-ARTICLE-013 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | passed | 4.8s | — |
| DSR-ARTICLE-014 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | failed | 6.6s / 6.8s | Error: category count expect(received).toHaveLength(expected) Expected length: 1 Received length: 0 Received a |
| DSR-ARTICLE-016 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 6.4s / 5.7s | Error: qa529-01 robots expect(received).not.toMatch(expected) Expected pattern: not /noindex/i Received string |
| DSR-ARTICLE-024 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | failed | 6.0s / 9.7s | Error: viewAllStories href expect(received).not.toMatch(expected) Expected pattern: not /^(#?)$/ Received stri |
| DSR-ARTICLE-028 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link | failed | 12.7s / 10.2s | Error: last item = navtitle expect(received).toBe(expected) // Object.is equality Expected: "QA529 Nav" Receiv |
| DSR-ARTICLE-029 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | passed | 7.5s | — |
| DSR-ARTICLE-015 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | passed | 7.5s | — |
| DSR-ARTICLE-020 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | passed | 8.0s | — |
| DSR-ARTICLE-023 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | failed | 7.6s / 7.9s | Error: visible related items heading expect(received).toEqual(expected) // deep equality - Expected - 1 + Rece |
| DSR-ARTICLE-025 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | passed | 6.7s | — |
| DSR-ARTICLE-009 | `article-detail/DSR-529.article-detail.spec.ts` › DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | passed | 12.0s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /ja/library/article/stories/qa529-01 1440x900 record only | passed | 4.7s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /ja/library/article/stories/qa529-01 375x900 record only | passed | 4.0s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /en/library/article/stories/qa529-01 1440x900 record only | passed | 4.2s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /en/library/article/stories/qa529-01 375x900 record only | passed | 3.8s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /ja/library/article/stories/qa529-02 1440x900 record only | passed | 4.4s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /ja/library/article/stories/qa529-02 375x900 record only | passed | 3.9s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /ja/library/article 1440x900 record only | passed | 4.0s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /ja/library/article 375x900 record only | passed | 4.1s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-030 /en/library/article 1440x900 record only | passed | 4.4s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.idle27-capture.spec.ts` › DSR-ARTICLE-031 /en/library/article 375x900 record only | passed | 4.0s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [ja] qa529-01 1440x900 capture only | passed | 10.6s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [ja] qa529-01 390x844 capture only | passed | 6.2s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [en] qa529-01 1440x900 capture only | passed | 6.2s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [en] qa529-01 390x844 capture only | passed | 5.9s | — |
| DSR-ARTICLE-030 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-030 [ja] qa529-02 1440x900 capture only | passed | 3.9s | — |
| DSR-ARTICLE-031 | `article-detail/DSR-529.visual-capture.spec.ts` › DSR-ARTICLE-031 [ja] qa529-02 390x844 capture only | passed | 3.6s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [ja] child trail follows URL hierarchy | passed | 2.1s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | passed | 2.1s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [ja] ancestor links navigate in same tab | passed | 4.6s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [ja] items equal page titles | passed | 2.2s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-001 [en] child trail follows URL hierarchy | passed | 2.0s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | passed | 1.9s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-002 [en] ancestor links navigate in same tab | passed | 5.2s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` › DSR-BREAD-011 [en] items equal page titles | passed | 2.4s | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [ja] display name overrides page title | passed | 5.4s | — |
| DSR-BREAD-010 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-010 [en] display name overrides page title | passed | 4.3s | — |
| DSR-BREAD-014 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-014 [ja] 100-character display name keeps layout | passed | 6.3s | — |
| DSR-BREAD-015 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-015 [ja] special characters in display name are plain text | passed | 3.9s | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [ja] each language uses its own display names | passed | 3.0s | — |
| DSR-BREAD-018 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-018 [en] each language uses its own display names | passed | 2.6s | — |
| DSR-BREAD-020 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-020 PC breadcrumb baseline | passed | 3.5s | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline | passed | 3.0s | — |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline [firefox] | failed | 8.2s / 7.6s | Error: expect(locator).toHaveScreenshot(expected) failed Locator: locator('main > [data-auto-block="breadcrumb |
| DSR-BREAD-032 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-032 cross-browser baseline [webkit] | failed | 0.0s / 0.0s | Error: browserType.launch: ╔══════════════════════════════════════════════════════╗ ║ Host system is missing d |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 2.4s | — |
| DSR-BREAD-002 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-002 ancestor links | passed | 9.9s | — |
| DSR-BREAD-003 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-003 current page is not linked | passed | 2.8s | — |
| DSR-BREAD-004 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-004 HOME label and destination | passed | 2.3s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 2.5s | — |
| DSR-BREAD-006 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-006 parent trail | passed | 2.5s | — |
| DSR-BREAD-007 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-007 missing intermediate page | passed | 1.5s | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 1.8s | — |
| DSR-BREAD-009 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-009 404 excludes breadcrumb | passed | 2.4s | — |
| DSR-BREAD-011 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-011 empty label uses title | passed | 2.3s | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 2.2s | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 2.4s | — |
| DSR-BREAD-027 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-027 semantic markup and accessibility | passed | 3.7s | — |
| DSR-BREAD-028 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-028 keyboard navigation | passed | 3.1s | — |
| DSR-BREAD-031 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-031 site-origin console errors | passed | 2.6s | — |
| DSR-BREAD-035 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-035 arrow asset origin and status | passed | 2.5s | — |
| DSR-BREAD-001 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-001 child trail and placement | passed | 2.5s | — |
| DSR-BREAD-005 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-005 grandchild trail order | passed | 2.4s | — |
| DSR-BREAD-008 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-008 HOME excludes breadcrumb | passed | 1.5s | — |
| DSR-BREAD-017 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-017 localized HOME destinations | passed | 5.5s | — |
| DSR-BREAD-025 | `breadcrumb/DSR-552.breadcrumb.spec.ts` › DSR-BREAD-025 BreadcrumbList structured data | passed | 4.2s | — |
| DSR-CATDL-014 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-014 [ja] capture catalog download form at 1440px | flaky (passed on retry) | 31.0s / 2.1s | attempt 1: Test timeout of 30000ms exceeded. |
| DSR-CATDL-015 | `catalog-detail/DSR-570.visual.spec.ts` › DSR-CATDL-015 [ja] capture catalog download form at 375px | flaky (passed on retry) | 30.6s / 3.8s | attempt 1: Test timeout of 30000ms exceeded. |
| DSR-CATDL-001 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-001 [ja] catalog detail header renders | passed | 6.0s | — |
| DSR-CATDL-002 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-002 [ja] download form fields, labels, consent and button present | passed | 5.1s | — |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [ja] requiresForm=false card downloads PDF directly | passed | 7.2s | — |
| DSR-CATDL-006 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [ja] requiresForm=true card leads to the download form | failed | 9.7s / 9.6s | Error: expect(locator).toHaveCount(expected) failed Locator: locator('.catalog-detail.block').locator('form')  |
| DSR-CATDL-018 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [ja] e-book form card opens ebookUrl without form | failed | 30.8s / 30.5s | Test timeout of 30000ms exceeded. |
| DSR-CATDL-005 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-005 [en] requiresForm=false card downloads PDF directly | passed | 4.9s | — |
| DSR-CATDL-006 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-006 [en] requiresForm=true card leads to the download form | failed | 10.2s / 10.2s | Error: expect(locator).toHaveCount(expected) failed Locator: locator('.catalog-detail.block').locator('form')  |
| DSR-CATDL-018 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-018 [en] e-book form card opens ebookUrl without form | failed | 30.9s / 30.8s | Test timeout of 30000ms exceeded. |
| DSR-CATDL-003 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-003 [ja] consent unchecked blocks sending (DOM only, no click) | passed | 3.9s | — |
| DSR-CATDL-007 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-007 [ja] form-gated PDF URL not exposed before submit | failed | 9.2s / 9.8s | Error: gated PDF URL delivered to the browser before submit expect(received).toEqual(expected) // deep equalit |
| DSR-CATDL-010 | `catalog-download/DSR-570.catalog-download.spec.ts` › DSR-CATDL-010 [ja] catalog ID handed to the form | passed | 4.2s | — |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [en] qa190-cat-pdf-form: live-published → 200 on .aem.page and .aem.live | failed | 1.2s / 1.3s | Error: .aem.live expect(received).toBe(expected) // Object.is equality Expected: 200 Received: 404 |
| DSR-CATOV-003 | `catalog-overlay/DSR-654.catalog-overlay.spec.ts` › DSR-CATOV-003 [en] qa190-cat-ebook-form: live-published → 200 on .aem.page and .aem.live | failed | 1.2s / 1.3s | Error: .aem.live expect(received).toBe(expected) // Object.is equality Expected: 200 Received: 404 |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 9.5s | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 8.9s | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 7.1s | — |
| DSR-CATV-017 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | failed | 3.4s / 4.3s | Error: expect(received).toBe(expected) // Object.is equality Expected: "https://www.ykkfastening.com/" Receive |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 3.8s | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 3.5s | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 3.5s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click | passed | 5.7s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 6.1s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) | passed | 4.7s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 6.1s | — |
| DSR-CATV-012 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-012 catalog item shows thumbnail and title | passed | 11.3s | — |
| DSR-CATV-013 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-013 PDF item without form opens in a new tab | passed | 10.6s | — |
| DSR-CATV-016 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 6.4s | — |
| DSR-CATV-017 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | failed | 2.6s / 2.7s | Error: expect(received).toBe(expected) // Object.is equality Expected: "https://www.ykkfastening.com/" Receive |
| DSR-CATV-018 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-018 NEW label within 10 days of publishDate | passed | 2.9s | — |
| DSR-CATV-019 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-019 UPDATE label within 10 days of updateDate | passed | 3.5s | — |
| DSR-CATV-020 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-020 only NEW when publishDate and updateDate both apply | passed | 2.7s | — |
| DSR-CATV-001 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-001 no autoplay before click | passed | 3.8s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 3.5s | — |
| DSR-CATV-002 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-002 YouTube embed src after click (long) | passed | 3.0s | — |
| DSR-CATV-006 | `catalog-video/DSR-557.catalog-video.spec.ts` › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 3.1s | — |
| DSR-ECO-001 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-001 [ja] TOP shows one card per category with image, name, and active summary + VIEW MORE | passed | 5.4s | — |
| DSR-ECO-002 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-002 [ja] each category card VIEW MORE links to its TD-590-02 detail page (200, same language) | failed | 4.5s / 3.3s | Error: detail slugs = TD-590-02 expect(received).toEqual(expected) // deep equality - Expected - 9 + Received  |
| DSR-ECO-004 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-004 [ja] 環境配慮型製品診断 button links to the product finder (P087, 200) | failed | 2.9s / 3.1s | Error: finder URL (P087), same language expect(received).toContain(expected) // indexOf Expected value: "" Rec |
| DSR-ECO-003 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-003 [ja] carousel arrows and dots move the active category by one and wrap at first/last | passed | 15.6s | — |
| DSR-ECO-012 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-012 [ja] TOP background and card images are DAM references, not code-bundled files | passed | 4.7s | — |
| DSR-ECO-013 | `eco-products/DSR-590.eco-products.spec.ts` › DSR-ECO-013 [ja] TOP exists with html lang, names in its language, and language-kept internal links | passed | 5.1s | — |
| DSR-ECO-014 | `eco-products/DSR-590.stable-capture.spec.ts` › DSR-ECO-014 [ja] stable PC initial, Next, dot 5 and fullPage captures | passed | 9.6s | — |
| DSR-ECO-016 | `eco-products/DSR-590.stable-capture.spec.ts` › DSR-ECO-016 [ja] stable SP initial and swipe captures | passed | 7.1s | — |
| DSR-ECO-014 | `eco-products/DSR-590.visual-capture.spec.ts` › DSR-ECO-014 [ja] PC carousel visual capture and measurements | passed | 7.0s | — |
| DSR-ECO-016 | `eco-products/DSR-590.visual-capture.spec.ts` › DSR-ECO-016 [ja] SP capture, horizontal overflow and carousel interaction facts | passed | 7.2s | — |
| DSR-ICON-006 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed | 7.5s / 7.5s | Error: console errors expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + 3 - Arra |
| DSR-ICON-006 | `icons/DSR-589.icons.spec.ts` › DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error | failed | 6.7s / 6.6s | Error: console errors expect(received).toEqual(expected) // deep equality - Expected - 1 + Received + 3 - Arra |
| DSR-MAIL-016 | `mail/DSR-433.mail-endpoints.spec.ts` › DSR-MAIL-016 [—] webhook GET without auth is refused | passed | 1.5s | — |
| DSR-MAIL-017 | `mail/DSR-433.mail-endpoints.spec.ts` › DSR-MAIL-017 [—] test-send GET without params or auth is not public | passed | 1.2s | — |
| DSR-MOVIE-012 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-012 displays the exact movie title | passed | 2.3s | — |
| DSR-MOVIE-014 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-014 embeds the configured YouTube movie | failed | 7.4s / 8.0s | Error: expect(locator).toHaveAttribute(expected) failed Locator: getByTestId('movie-detail-player-embed') Expe |
| DSR-MOVIE-036 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-036 no site-origin console errors on the movie component page | passed | 4.0s | — |
| DSR-MOVIE-026 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-026 displays related thumbnails, types, tags and valid links | failed | 12.0s / 11.3s | Error: Related card 1 thumbnail expect(locator).toBeVisible() failed Locator: getByTestId('related-content-car |
| DSR-MOVIE-027 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-027 outputs exactly one title and og:title | passed | 4.1s | — |
| DSR-MOVIE-029 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | passed | 4.4s | — |
| DSR-MOVIE-033 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-033 displays component sections in vertical order on PC | failed | 9.6s / 9.5s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-player') Expected: visible Time |
| DSR-MOVIE-034 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-MOVIE-034 displays the component back control | passed | 3.9s | — |
| DSR-501-P3 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P3 [en] related movies are limited to 5 in authored order | failed | 9.2s / 9.4s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-related-content') Expected: vis |
| DSR-501-P2 | `movie-detail/DSR-173.movie-detail.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | failed | 8.8s / 9.6s | Error: expect(locator).toBeVisible() failed Locator: getByTestId('movie-detail-related-content') Expected: vis |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [ja] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed | 2.1s / 2.2s | Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/search expect(received).toBe(expec |
| DSR-VOV-011 | `movie-detail/DSR-587.movie-overlay.spec.ts` › DSR-VOV-011 [en] video/search stays a list page (list block with ≥ 1 card, no video-detail) | failed | 1.0s / 1.3s | Error: https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/search expect(received).toBe(expec |
| DSR-501-P2 | `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` › DSR-501-P2 [en] unavailable related movie is not displayed | passed | 6.2s | — |
| DSR-NEWS-001 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-001 [en] page shows date, category, title and body | passed | 3.0s | — |
| DSR-NEWS-002 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list | failed | 2.3s / 4.7s | Error: required elements missing expect(received).toEqual(expected) // deep equality - Expected - 1 + Received |
| DSR-NEWS-003 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-003 [en] shown date equals meta publish date | failed | 2.5s / 2.4s | Error: expect(received).toBe(expected) // Object.is equality Expected: "2026-09-29" Received: "2026-03-30" |
| DSR-NEWS-004 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-004 [en] category and title are non-empty text | passed | 1.9s | — |
| DSR-NEWS-006 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | failed | 7.4s / 7.4s | Error: Back to list link expect(locator).toHaveCount(expected) failed Locator: locator('main').getByRole('link |
| DSR-NEWS-007 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | failed | 3.6s / 2.2s | Error: page /master/en/test-space/dsr-357-news-detail in /master/en/query-index.json or /master/en/news/query- |
| DSR-NEWS-009 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-009 [en] no related-content block | passed | 2.0s | — |
| DSR-NEWS-010 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | passed | 1.8s | — |
| DSR-NEWS-012 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | failed | 13.0s / 16.8s | Error: My List button expect(locator).toBeVisible() failed Locator: locator('main').locator('.article-meta.blo |
| DSR-NEWS-013 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | passed | 5.8s | — |
| DSR-NEWS-018 | `news-detail/DSR-566.news-detail.spec.ts` › DSR-NEWS-018 [en] title, description and og tags non-empty | failed | 8.1s / 8.2s | Error: meta[name="description"] expect(received).not.toBe(expected) // Object.is equality Expected: not "" |
| DSR-PCF-007 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-007 [ja] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.1s | — |
| DSR-PCF-007 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-007 [en] openingType stored as multi-value Enumeration with the 4 defined values (publish proxy) | passed | 0.1s | — |
| DSR-PCF-016 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-016 [ja] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 0.6s | — |
| DSR-PCF-016 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-016 [en] media01 image only, media02–15 each Type/Asset/Url (publish proxy) | passed | 0.6s | — |
| DSR-PCF-017 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-017 [ja] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.2s | — |
| DSR-PCF-017 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-017 [en] 7 fields added in ver0.4 exist with the defined type (publish proxy) | passed | 0.5s | — |
| DSR-PCF-019 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-019 [ja] all product persisted queries return ver0.4 names only | passed | 1.2s | — |
| DSR-PCF-019 | `product-cf/DSR-585.product-cf.spec.ts` › DSR-PCF-019 [en] en product persisted queries return ver0.4 names only | passed | 0.8s | — |
| DSR-PLSP-001 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 3.6s | — |
| DSR-PLSP-002 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-002 [ja] SP widths 320–767: 2 card columns at every width | failed | 15.2s / 19.1s | Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality - Expected - 1  |
| DSR-PLSP-003 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-003 [ja] SP column count stays 2 after scroll, filter and reload | failed | 30.5s / 30.7s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-005 [ja] SP odd result count: last card = other card width, left aligned | failed | 8.8s / 8.1s | Error: 3 results: left aligned expect(received).toBe(expected) // Object.is equality Expected: 0 Received: 2 |
| DSR-PLSP-004 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-004 [ja] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 13.2s | — |
| DSR-PLSP-001 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-001 [en] SP 375px: exactly 2 card columns, no horizontal scroll | passed | 7.2s | — |
| DSR-PLSP-002 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-002 [en] SP widths 320–767: 2 card columns at every width | failed | 15.5s / 16.7s | Error: 320: cards overflowing their column expect(received).toEqual(expected) // deep equality - Expected - 1  |
| DSR-PLSP-003 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-003 [en] SP column count stays 2 after scroll, filter and reload | failed | 30.6s / 30.5s | Test timeout of 30000ms exceeded. |
| DSR-PLSP-005 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-005 [en] SP odd result count: last card = other card width, left aligned | failed | 5.6s / 5.0s | Error: 3 results: left aligned expect(received).toBe(expected) // Object.is equality Expected: 0 Received: 2 |
| DSR-PLSP-004 | `product-list/DSR-583.product-list-sp.spec.ts` › DSR-PLSP-004 [en] PC/TB columns recorded at 768/1024/1440 (Figma: 768→3, 1440→4) | passed | 13.0s | — |
| DSR-PRODLIST-001 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-001 [ja] SP 375px: exactly 2 card columns, no horizontal scroll | failed | 6.7s / 7.3s | Error: TD-583-01 ≥ 6 products expect(received).toBeGreaterThanOrEqual(expected) Expected: >= 6 Received: 3 |
| DSR-PRODLIST-002 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-002 [ja] SP boundary widths 320–767: 2 columns, no overflow, no horizontal scroll | failed | 17.9s / 15.4s | Error: 320: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 2 Received |
| DSR-PRODLIST-003 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-003 [ja] SP column count stays 2 after scroll, load more, filter and 3 reloads | failed | 8.8s / 7.2s | Error: open: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 2 Receive |
| DSR-PRODLIST-004 | `product-list/DSR-583.product-list.spec.ts` › DSR-PRODLIST-004 [ja] PC/TB columns unchanged: 1440→4, 1200→4, 980→3, 768→3 | failed | 8.3s / 8.8s | Error: 1440: distinct column offsets expect(received).toBe(expected) // Object.is equality Expected: 4 Receive |
| SMOKE-001 | `smoke.spec.ts` › SMOKE-001 DSR-173 test page is reachable | passed | 0.6s | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [ja] quick search hover style and keyword search navigates to product search | failed | 5.1s / 3.6s | Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality Expecte |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 3.9s / 4.0s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).to |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [ja] NEWS shows the 3 newest items by publish date | failed | 4.6s / 3.4s | Error: page requests /ja/news/query-index.json expect(received).toContain(expected) // indexOf Expected value: |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 3.9s / 4.0s | Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected) Expected: <= 1 Received: 2 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [ja] NEWS with empty query-index renders without error | passed | 3.8s | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [ja] main visual image is eager and is the LCP element | passed | 7.0s | — |
| DSR-TOP-004 | `top/DSR-609.top.spec.ts` › DSR-TOP-004 [en] quick search hover style and keyword search navigates to product search | failed | 5.2s / 4.5s | Error: text/background colour changes on hover expect(received).not.toEqual(expected) // deep equality Expecte |
| DSR-TOP-005 | `top/DSR-609.top.spec.ts` › DSR-TOP-005 [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 4.6s / 4.9s | Error: card 1 border-radius > 0 (card/media/img: {"card":"0px","media":"0px","img":"0px"}) expect(received).to |
| DSR-TOP-006 | `top/DSR-609.top.spec.ts` › DSR-TOP-006 [en] NEWS shows the 3 newest items by publish date | failed | 5.0s / 3.7s | Error: page requests /en/news/query-index.json expect(received).toContain(expected) // indexOf Expected value: |
| DSR-TOP-007 | `top/DSR-609.top.spec.ts` › DSR-TOP-007 [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 4.2s / 3.9s | Error: SP item 1 title lines ≤ 1 expect(received).toBeLessThanOrEqual(expected) Expected: <= 1 Received: 2 |
| DSR-TOP-008 | `top/DSR-609.top.spec.ts` › DSR-TOP-008 [en] NEWS with empty query-index renders without error | passed | 5.4s | — |
| DSR-TOP-009 | `top/DSR-609.top.spec.ts` › DSR-TOP-009 [en] main visual image is eager and is the LCP element | passed | 4.6s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] PC full-page capture and horizontal overflow | passed | 9.6s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [ja] SP full-page capture and horizontal overflow | passed | 8.6s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] PC full-page capture and horizontal overflow | passed | 9.7s | — |
| DSR-TOP-001 | `top-page/DSR-609.visual-capture.spec.ts` › DSR-TOP-001 [en] SP full-page capture and horizontal overflow | passed | 8.7s | — |
## 5. Skipped tests

Reasons are copied from the Playwright annotations (verbatim, not shortened).

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-001 | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-004 | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-005 | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-021 | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-032 | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-030 | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-031 | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-017 | Blocked: Stories index not on DEV yet – Martin prereq #1 (helix-query.yaml) / Q7 |
| DSR-ARTICLE-018 | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; NEW period Q6 |
| DSR-ARTICLE-019 | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; TD-529-04 not seeded |
| DSR-ARTICLE-022 | Blocked: 製品index relatedArticles/sortOrder not defined – 製品詳細 ticket (Martin prereq #3) |
| DSR-ARTICLE-027 | Blocked: Article list DSR-170 (out of scope) + stories index |
| DSR-ARTICLE-029 | Blocked: no /master/cn on DEV (Issue #18) – all cn rows |
| DSR-ARTICLE-026 | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |
| DSR-ASSET-003 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 | blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-003 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-009 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-010 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-012 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-013 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-014 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-015 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-ASSET-016 | blocked-data: no /{lang}/products/<digits> row in DEV query-index (TD-227-08, DSR-586 – Martin); fallback page baseline recorded, no verdict |
| DSR-ASSET-017 | blocked-data: TD-227-02 sample migrated products not delivered (DSR-227 In Progress – Quentin); pre-migration baseline recorded, no verdict |
| DSR-BREAD-018 | cn: no /master/cn (Issue #18) |
| DSR-BREAD-019 | DSR-555 + cn |
| DSR-BREAD-021 | DSR-575 Q5 (SP display) |
| DSR-BREAD-022 | DSR-575 Q5 (SP display) |
| DSR-BREAD-023 | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 | Run on STG (Lighthouse) |
| DSR-BREAD-030 | DSR-536 / movie-detail placement |
| DSR-BREAD-033 | Layout tickets |
| DSR-BREAD-034 | DSR-536 / movie-detail placement |
| DSR-BREAD-001 | cn: no /master/cn (Issue #18) |
| DSR-BREAD-005 | cn: no /master/cn (Issue #18) |
| DSR-BREAD-008 | cn: no /master/cn (Issue #18) |
| DSR-BREAD-017 | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 | cn: no /master/cn (Issue #18) |
| DSR-CATDL-001 | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-002 | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-017 | no catalog-ID mechanism on DEV yet: "QA190 PDF form required" card href carries no catalog id; demo form page is not bound to a CF (Ngoc 10/15) |
| DSR-CATDL-016 | blocked-data: TD-570-01 en form page /master/en/test-space/dsr-570-catalog-detail HTTP 404 |
| DSR-CATDL-016 | cn: no /master/cn (Issue #18) |
| DSR-CATOV-001 | TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-003 | TD-190 qa190-cat-pdf not seeded / not published to this tier (/ja/library/catalog/qa190-cat-pdf HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-003 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (/ja/library/catalog/qa190-cat-pdf-form HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-003 | TD-190 qa190-cat-ebook not seeded / not published to this tier (/ja/library/catalog/qa190-cat-ebook HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | TD-190 qa190-cat-ebook-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-ebook-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-003 | TD-190 qa190-cat-ebook-form not seeded / not published to this tier (/ja/library/catalog/qa190-cat-ebook-form HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-004 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-005 | isActive=false: no TD id yet (set DSR654_INACTIVE_ID once seeded) |
| DSR-CATOV-006 | unpublished: no TD id yet (set DSR654_REMOVED_ID once seeded) |
| DSR-CATOV-007 | catalog/search Sites page not published (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/search HTTP 404) |
| DSR-CATOV-008 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-001 | TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-pdf not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf HTTP 404) |
| DSR-CATOV-003 | TD-190 qa190-cat-pdf not seeded / not published to this tier (/en/library/catalog/qa190-cat-pdf HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-001 | TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-ebook not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook HTTP 404) |
| DSR-CATOV-003 | TD-190 qa190-cat-ebook not seeded / not published to this tier (/en/library/catalog/qa190-cat-ebook HTTP 404 on .aem.page and .aem.live) |
| DSR-CATOV-001 | TD-190 qa190-cat-ebook-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-002 | TD-190 qa190-cat-ebook-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-ebook-form HTTP 404) |
| DSR-CATOV-004 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-005 | isActive=false: no TD id yet (set DSR654_INACTIVE_ID once seeded) |
| DSR-CATOV-006 | unpublished: no TD id yet (set DSR654_REMOVED_ID once seeded) |
| DSR-CATOV-007 | catalog/search Sites page not published (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/search HTTP 404) |
| DSR-CATOV-008 | TD-190 qa190-cat-pdf-form not seeded / not published to this tier (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa190-cat-pdf-form HTTP 404) |
| DSR-CATOV-001 | Issue #18: no /cn path on DEV |
| DSR-ECO-001 | en demo page not on DEV |
| DSR-ECO-002 | en demo page not on DEV |
| DSR-ECO-004 | en demo page not on DEV |
| DSR-ECO-005 | DSR-590 page not on DEV |
| DSR-ECO-007 | DSR-590 page not on DEV |
| DSR-ECO-010 | DSR-590 page not on DEV |
| DSR-ECO-005 | DSR-590 page not on DEV |
| DSR-ECO-007 | DSR-590 page not on DEV |
| DSR-ECO-010 | DSR-590 page not on DEV |
| DSR-ECO-006 | DSR-590 page not on DEV |
| DSR-ECO-009 | DSR-590 page not on DEV |
| DSR-ECO-013 | en demo page not on DEV |
| DSR-ECO-013 | cn: no /master/cn on DEV (Issue #18) |
| DSR-ICON-001 | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-001 | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-005 | Blocked: TD-589-04 official icon list |
| DSR-ICON-007 | blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 | blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-MOVIE-020 | Issue #1: related products specification pending |
| DSR-MOVIE-021 | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-023 | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-025 | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 | Description line-break separator is unconfirmed |
| DSR-MOVIE-001 | B: page auto-generation not implemented |
| DSR-MOVIE-002 | B: page auto-generation not implemented |
| DSR-MOVIE-003 | B: page auto-generation not implemented |
| DSR-MOVIE-004 | M: Universal Editor requires IMS login; manual only |
| DSR-MOVIE-005 | B: page auto-generation not implemented |
| DSR-MOVIE-006 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-007 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-008 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-009 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-010 | B: URL structure not implemented, DSR-536 |
| DSR-MOVIE-011 | B: page auto-generation not implemented |
| DSR-MOVIE-013 | C: overflow automation deferred; CJK font manual |
| DSR-MOVIE-015 | C: iframe source automation deferred; playback manual |
| DSR-MOVIE-016 | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-017 | B: movie-detail-player-video not implemented, DAM test data pending |
| DSR-MOVIE-018 | B: test data pending (docs/DSR-173/test-data.md); Issue #12 |
| DSR-MOVIE-019 | C: layout automation deferred; in-iframe error manual |
| DSR-MOVIE-022 | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-024 | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-030 | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 | B: page auto-generation not implemented |
| DSR-MOVIE-032 | B: ja/zh pages not available |
| DSR-MOVIE-035 | B: SP design pending |
| DSR-VOV-001 | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-001 | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-002 | TD-587-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/en/library/video/qa587-preview HTTP 404) |
| DSR-VOV-003 | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-003 | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-004 | TD-587-04 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-005 | TD-587-05 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-006 | TD-587-06 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-007 | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-007 | TD-587-07 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-inactive HTTP 404) |
| DSR-VOV-008 | TD-587-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-unavail HTTP 404) |
| DSR-VOV-010 | TD-587-10 not seeded (negative TC: confirm via DSR587_SEEDED) |
| DSR-VOV-011 | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/tech-talk) |
| DSR-VOV-011 | tech-talk list page not published on DEV (HTTP 404); 11.0 runs on video/search only (job JOB-ZZ-IDLE-06) (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/tech-talk) |
| DSR-VOV-011 | Issue #18: no /cn path on DEV |
| DSR-VOV-014 | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-015 | TD-587-15 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-b HTTP 404) |
| DSR-VOV-016 | TD-587-14 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-rel-a HTTP 404) |
| DSR-VOV-017 | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 | TD-587-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/video/qa587-main HTTP 404) |
| DSR-VOV-018 | Issue #18: no /cn path on DEV |
| DSR-501-P3 | blocked-data: stale preview, static HTML has fewer relatedMovies rows than query (static HTML 5 relatedMovies rows, query 6; last-modified Tue, 20 Oct 2026 11:36:16 GMT) |
| DSR-NEWS-001 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-002 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-003 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-004 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-006 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-007 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-009 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-010 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-012 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-013 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-018 | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-PCF-001 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-002 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-003 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-004 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-005 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-02; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-006 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 + chain-type tag namespace; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-008 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + template revision (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-009 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-010 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-03 + import procedure (Q28); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-011 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-04; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-012 | Blocked: Author UI (A5, agents read-only, no Author access); TD-585-01 en/cn copies; cn folder may not exist (Issue #18); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-013 | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-014 | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-560/182 search JSON (Nakamoto); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-015 | Blocked: TD-585-01 not seeded (DSR585_SEEDED); DSR-586 overlay; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 | to clean: 1350 (productId 135), 461 (productId 46), cf-products1 (productId productId-01x) \| Blocked: TD-585-01 not seeded (DSR585_SEEDED); DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PCF-018 | to clean: 1350 (productId 135), 461 (productId 46), applicable-slider-special-2 (productId applicableSliderSpecial-2), cf-products1 (productId productId-01x), cf-products10 (productId productId-01x), cf-products11 (productId productId-01x), parent-product-2 (productId parentProduct-2) \| Blocked: TD-585-01 is ja only; DM_product ver0.4 finished on DEV (Martin done ping) + TD-585 seed (QA-PT) |
| DSR-PDO-001 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-001 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-002 | TD-586-02 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586002 HTTP 404) |
| DSR-PDO-003 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-003 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-004 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-005 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-006 | TD-586-06 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-007 | TD-586-07 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-008 | TD-586-08 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586008 HTTP 404) |
| DSR-PDO-009 | TD-586-09 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586009 HTTP 404) |
| DSR-PDO-011 | TD-586-11 not seeded (negative TC: confirm via DSR586_SEEDED) |
| DSR-PDO-012 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-013 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-014 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 HTTP 404) |
| DSR-PDO-014 | (no annotation) |
| DSR-PDO-017 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PDO-019 | TD-586-01 not seeded (https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 HTTP 404) |
| DSR-PRODLIST-003 | blocked-data: TD-583-01 page missing (/master/en/test-space/product-list and /master/en/product-list HTTP 404) |
| DSR-PRODLIST-005 | blocked-data: TD-583-02 no filter on page (no 1-/3-result filter combination available) |
| DSR-PRODLIST-006 | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-006 | Visual TC – codex lane (Playwright screenshot vs Figma 1333-6510 375 frame) |
| DSR-PRODLIST-007 | Manual TC (real iOS Safari / Android Chrome) – documented only, not automated |
## 6. Failed tests

63 tests failed. 53 of them fail with the same assertion and values as JOB-20261020-09; for those, see `results/regression/DEV/automation-run-20261020-job09.md` §6 and the one-line reasons in §4 above. The subsections below cover only the fails that are new or whose reason changed. Every failed test failed on both attempts.

### DSR-ARTICLE-006 [ja]/[en] — info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `expect.soft(labels, 'tag labels').toHaveLength(td01Common.tagCount)` (= 2) — `tests/article-detail/DSR-529.article-detail.spec.ts:66`
- Expected: 2 labels
- Actual: 3 labels `["do-not-translate バイオベース", "do-not-translate", "バイオベース"]` (ja and en identical). JOB-09: 0 labels.
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-28/evidence/DSR-ARTICLE-006_{ja,en}.png`

### DSR-ARTICLE-012 [ja]/[en] — meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `expect.soft(categories, 'category meta count').toHaveLength(1)` — `tests/article-detail/DSR-529.article-detail.spec.ts:138`
- Expected: 1 `category` meta (fixture `categoryAuthored: true`)
- Actual: 0 `category` metas (`[]`)
- Attempt(s): fail / fail
- Evidence paths: `test-results/article-detail-DSR-529.art-8b907-529kw1-qa529kw…-chromium-retry1/test-failed-1.png` (ja), `…-3ce31-…` (en) — not committed

### DSR-ARTICLE-014 [ja]/[en] — title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty

- Failing assertion: `category count` `toHaveLength(1)` — `tests/article-detail/DSR-529.article-detail.spec.ts:162` (test start line)
- Expected: `category` exactly once
- Actual: 0. publicationdate is now found (the JOB-09 reason "published-date count 0" is gone after the spec meta rename).
- Attempt(s): fail / fail
- Evidence paths: `test-results/article-detail-DSR-529.art-00408-…-retry1/test-failed-1.png` (ja), `…-856a2-…` (en) — not committed

### DSR-ARTICLE-028 [ja]/[en] — breadcrumb present; last item = navtitle (no link); earlier items link

- Failing assertion: `expect.soft(items.at(-1)!.text, 'last item = navtitle').toBe(td01[lang].navTitle)` — `tests/article-detail/DSR-529.article-detail.spec.ts:237`
- Expected: ja "QA529 ナビ" / en "QA529 Nav"
- Actual: ja "QA529 ストーリー詳細テスト" / en "QA529 Story detail test" (page title)
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-28/evidence/DSR-ARTICLE-028_{ja,en}.png`

### DSR-CATOV-003 [en] qa190-cat-pdf-form / qa190-cat-ebook-form — live-published → 200 on .aem.page and .aem.live

- Failing assertion: `.aem.live` status `toBe(200)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:99` (test start line)
- Expected: 200 on both hosts
- Actual: .aem.page 200, .aem.live 404 for `/en/library/catalog/qa190-cat-pdf-form` and `/en/library/catalog/qa190-cat-ebook-form`. A read-only curl after the run gave the same codes. The ja ids and the en non-form ids are 404 on both hosts and are skipped.
- Attempt(s): fail / fail
- Evidence paths: none (HTTP-only test, no screenshot)

### DSR-ECO-002 [ja] — each category card VIEW MORE links to its TD-590-02 detail page (200, same language)

- Failing assertion: `detail slugs = TD-590-02` `toEqual` — `tests/eco-products/DSR-590.eco-products.spec.ts:92` (test start line)
- Expected: `bio-based, bluesign-approved, circularity, natural-fiber, non-plated, recycled, renewal, sustainable-metal-finish, water-saving`
- Actual: 9 × `dsr-590-eco-detail-page`. JOB-09 failed earlier, at the language-prefix check.
- Attempt(s): fail / fail
- Evidence paths: `ykk-dsr/hub/results/JOB-ZZ-IDLE-28/evidence/DSR-ECO-002_ja.png`

### Flaky (passed on retry, not failed): DSR-CATDL-014 / DSR-CATDL-015 [ja]

- Attempt 1: `Test timeout of 30000ms exceeded.` — `tests/catalog-detail/DSR-570.visual.spec.ts:7`. Retry passed (2.2 s / 3.8 s).

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Cause tags are my inference from timing and the hub notes (BUGS.md, JOB-20261021-04/07, BL-OVL-1 update). I did not check Author, the merge commits, or Jira.
- Several flips come from spec/fixture changes made after JOB-09 (DSR-529 meta rename, the 028 unblock, the category-authored fixture, new DSR-585/654 specs), not from product changes. They are tagged `none`.
- DSR-ARTICLE-012/014/028 depend on the Night 21/10 0b data (category, navtitle). That data was probably not done at run time (18:11–18:31 UTC+7). Rerun with JOB-20261021-05.
- DSR-659 (011) is unchanged: the thumbnail meta is still relative. The page HTML predates the merge (JOB-07), so no verdict on 659 yet.
- DSR-CATOV-003 en: preview-only pages. This fits "Preview → .page, Publish → .live" (overlay auto-gen) if the CFs were previewed but not published. Data not verified in Author.
- 404 config deploy: no spec result changed, so nothing in this run confirms or contradicts it.
- Process note: the first, aborted attempt was cleaned up with `pkill -f "playwright test"`. On this shared VPS that could also have matched another lane's Playwright process if one was running at the time. I saw only a Lighthouse Chrome (`/tmp/lighthouse.*`) afterwards and left it alone.
