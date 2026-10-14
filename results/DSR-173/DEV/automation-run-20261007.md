# DSR-173 DEV automation run — 20261007

**DSR-MOVIE-036 (DSR-555): possible fix deployed — needs QA retest.** Previously FAILED; now PASSED. DSR-MOVIE-026 (DSR-538) remains FAILED.

## 1. Header

- Run start (UTC, including TypeScript): 2026-10-07T08:06:48Z
- Suite start (UTC): 2026-10-07T08:06:58.998Z
- Run end (UTC): 2026-10-07T08:08:33Z
- Environment + base URL: DEV — `https://main--dsr-eds-dev--sutrix-projects.aem.live`
- Target page: `/master/en/test-space/dsr-173-video-detail` (English manually authored component host).
- Build under test: live build ID/application SHA not independently verified. Historical docs identify `dev/2026.09.15.2` / `f13b984`; this is not a verified current deployment ID.
- Build comparison: current page last-modified is later than the previous run (2026-09-29). CSP now permits Google Fonts, unlike the previous captured failure. These show a changed served page/policy, but exact build identity cannot be compared because the previous report has no response headers or verified live build ID.
- Baseline ID: `BL-v1_20260916`; TC-036 remains the existing QA-requested additional check.
- Automation HEAD commit SHA: `81b474e68f2baca43a47f7f99ee55b0a7d74e5f4`. `git pull --ff-only`: already up to date on main; no tests, fixtures or configuration changed.
- Exact commands used (reporter arguments only add machine-readable results):

```sh
npx tsc --noEmit
PLAYWRIGHT_JSON_OUTPUT_NAME=node_modules/.cache/dsr-dev-rerun/results.json npm run test:dev -- --reporter=list,html,json
```

### Target page response headers

Read-only Playwright API GET using BASE_URL from envs/dev.env; captured 2026-10-07T08:07:12.277Z, final URL `https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/dsr-173-video-detail`, HTTP 200. No build/version/commit/generator meta marker found. `x-amz-cf-id`, `age`, `etag` and explicit build headers were absent.

| Response header | Observed value |
|---|---|
| connection | keep-alive |
| content-length | 926 |
| content-type | text/html; charset=utf-8 |
| content-security-policy | default-src 'self'; base-uri 'self'; object-src 'none'; script-src 'nonce-r97sd7jTAdPscI2rlaICcPIT' 'strict-dynamic' 'unsafe-inline' 'wasm-unsafe-eval' http: https:; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://s7ap1.scene7.com https://forms-na1.hsforms.com https://img.youtube.com https://picsum.photos https://fastly.picsum.photos https://placehold.co https://publish-p192812-e2014374.adobeaemcloud.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' blob: https://s7ap1.scene7.com https://ot.aem.live https://www.gstatic.com https://forms.hsforms.com https://google.com https://4140651-dsroktabff-stage.adobeioruntime.net https://publish-p192812-e2014374.adobeaemcloud.com; media-src 'self' blob: https://s7ap1.scene7.com https://www.w3schools.com; frame-src 'self' https://www.youtube.com https://www.youtube-nocookie.com https://player.youku.com https://player.vimeo.com https://platform.twitter.com https://syndication.twitter.com https://s7ap1.scene7.com https://www.google.com https://google.com https://js.hsforms.net; worker-src 'self' blob:; form-action 'self'; frame-ancestors 'self' |
| last-modified | Mon, 05 Oct 2026 07:26:42 GMT |
| content-encoding | br |
| via | 1.1 varnish, 1.1 varnish, 1.1 varnish |
| x-timer | S1791360430.031104,VS0,VE0 |
| accept-ranges | bytes |
| date | Wed, 07 Oct 2026 08:07:12 GMT |
| x-served-by | cache-iad-khef600071-IAD, cache-iad-khef600071-IAD, cache-bur-kbur8200132-BUR |
| x-cache | MISS, HIT, HIT |
| x-cache-hits | 0, 1, 2 |
| strict-transport-security | max-age=31557600 |
| x-robots-tag | noindex, nofollow |
| cache-control | max-age=7200, must-revalidate |
| vary | Accept-Encoding,X-Forwarded-Host |
| alt-svc | h3=":443";ma=86400,h3-29=":443";ma=86400,h3-27=":443";ma=86400 |

## 2. TypeScript check

- Command: `npx tsc --noEmit` (before suite).
- Exit code: 0.
- Result: no errors; output contains only an npm update notice, no TypeScript diagnostics.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 67 | 8 | 1 | 58 | 1 | 2 | 1 configured; 1 actual retry (TC-026) | 93.793 s |

Counts are unique tests; proposed automated outcomes only, pending human QA confirmation. Full npm DEV command, Chromium; 0 flaky outcomes. DSR-173 movie suite: 36 total, 7 passed, 1 failed, 28 skipped. SMOKE-001 passed. The command additionally discovers 30 existing DSR-552 skeletons, all skipped before browser actions; no new tests added or data-dependent cases enabled. Compared with the previous 37-test run, the extra 30 cases are existing breadcrumb scaffolding on latest main.

## 4. Executed tests

Durations are per attempt (initial / retry where applicable).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-MOVIE-012 | displays the exact movie title | PASSED | 11.330 s | — |
| DSR-MOVIE-014 | embeds the configured YouTube movie | PASSED | 7.458 s | — |
| DSR-MOVIE-026 | displays related thumbnails, types, tags and valid links | FAILED | 13.501 s / 13.553 s | Missing thumbnails, /ja/ link paths, HTTP 500 on both cards (DSR-538); both attempts. |
| DSR-MOVIE-027 | outputs exactly one title and og:title | PASSED | 8.980 s | — |
| DSR-MOVIE-029 | outputs an absolute reachable CF thumbnail | PASSED | 5.800 s | — |
| DSR-MOVIE-033 | displays component sections in vertical order on PC | PASSED | 6.467 s | — |
| DSR-MOVIE-034 | displays the component back control | PASSED | 3.669 s | — |
| DSR-MOVIE-036 | no site-origin console errors on the movie component page | PASSED | 5.137 s | — |
| SMOKE-001 | DSR-173 test page is reachable | PASSED | 6.336 s | — |

TC-014 and TC-036 collected-errors JSON attachments both contain exactly `[]`. Passing tests have no screenshot under the unchanged failure-only screenshot configuration; attachments can be inspected in `playwright-report/index.html`.

## 5. Skipped tests

Runtime skip/fixme reasons copied verbatim. No skipped case is counted as passed. DSR-BREAD rows are the existing additional skeletons discovered by the full npm command.

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-001 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-002 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-003 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-004 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-005 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-006 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-007 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-008 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-009 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-010 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-011 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-014 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-015 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-017 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-018 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-019 | waiting DSR-555 fonts |
| DSR-BREAD-020 | waiting approved Figma 283:848 baseline |
| DSR-BREAD-021 | waiting DSR-575 Q5 and SP movie-detail baseline |
| DSR-BREAD-022 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-023 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-025 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-027 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-028 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-029 | waiting STG Lighthouse setup |
| DSR-BREAD-030 | waiting DSR-536 and DSR-539 regression requirements |
| DSR-BREAD-031 | selectors pending dev data-testid; test data publication unverified |
| DSR-BREAD-032 | waiting approved Chrome baseline and Firefox/WebKit setup |
| DSR-BREAD-033 | waiting layout tickets and page-type inventory |
| DSR-BREAD-034 | waiting DSR-575 Q5 and movie-detail readiness |
| DSR-BREAD-035 | selectors pending dev data-testid; test data publication unverified |
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
| DSR-MOVIE-020 | Issue #1: related products specification pending |
| DSR-MOVIE-021 | Test data pending: RELATED_SORT.path.en, RELATED_SORT.expectedOrder |
| DSR-MOVIE-022 | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-023 | Test data pending: RELATED_FILTERED.path.en, RELATED_FILTERED.expectedOrder, RELATED_FILTERED.excludedTitles |
| DSR-MOVIE-024 | B: test data pending (docs/DSR-173/test-data.md) |
| DSR-MOVIE-025 | Test data pending: RELATED_6.path.en |
| DSR-MOVIE-028 | Description line-break separator is unconfirmed |
| DSR-MOVIE-030 | M: SNS debuggers need login and public URL; manual only |
| DSR-MOVIE-031 | B: page auto-generation not implemented |
| DSR-MOVIE-032 | B: ja/zh pages not available |
| DSR-MOVIE-035 | B: SP design pending |

## 6. Failed tests

### DSR-MOVIE-026 — displays related thumbnails, types, tags and valid links

Initial attempt and retry both FAILED; eight identical soft-assertion failures per attempt.

| Check | Failing assertion (file:line) | Expected | Actual |
|---|---|---|---|
| Related card 1 thumbnail | `expect.soft(image).toBeVisible({ timeout: 1_000 })` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:140` | Visible image | element(s) not found |
| Related card 1 thumbnail loaded | `image count/load predicate .toBe(true)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:143` | true | false |
| Related card 1 language | `expect.soft(url.pathname).toMatch(/^\/master\/en\//)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:148` | Path starts /master/en/ | /digital-showroom/ja/test-space/pages/article-page-1.html |
| Related card 1 https://publish-p192812-e2014374.adobeaemcloud.com/digital-showroom/ja/test-space/pages/article-page-1.html | `expect.soft(response.status()).toBe(200)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:150` | 200 | 500 |
| Related card 2 thumbnail | `expect.soft(image).toBeVisible({ timeout: 1_000 })` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:140` | Visible image | element(s) not found |
| Related card 2 thumbnail loaded | `image count/load predicate .toBe(true)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:143` | true | false |
| Related card 2 language | `expect.soft(url.pathname).toMatch(/^\/master\/en\//)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:148` | Path starts /master/en/ | /digital-showroom/ja/test-space/pages/article-page-2.html |
| Related card 2 https://publish-p192812-e2014374.adobeaemcloud.com/digital-showroom/ja/test-space/pages/article-page-2.html | `expect.soft(response.status()).toBe(200)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:150` | 200 | 500 |

Evidence paths:

- Initial screenshot: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`.
- Initial error-context: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/error-context.md`.
- Initial trace: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/trace.zip`.
- Retry 1 screenshot: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`.
- Retry 1 error-context: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/error-context.md`.
- Retry 1 trace: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/trace.zip`.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Retest DSR-555 before confirming a fix. TC-036 observed no collected errors at its existing assertion timing; computed Noto font rendering and later asynchronous errors were not independently checked.
- DSR-538 remains reproduced; TC-026 covers the existing two article cards, not the unseeded RELATED_MIXED data set.
- No new test data seeded (QA context); all 28 existing movie skips retained. Author CF values and publication flags were not independently verified; expected data comes from checked-in fixtures.
- English placeholder component only. Generated routing, ja/zh, mobile/Figma, playback, STG/PRO and manual checks were not verified. TC-034 checks back-control presence, not destination.
- Response headers identify served content/policy and cache behavior, not a confirmed application commit or deployment ID; prior report lacks matching header evidence.

## Changes since last run

Compared every executed test with [automation-run-20260929-tc036.md](automation-run-20260929-tc036.md), the latest previous report by UTC run-start time.

Changed result: **DSR-MOVIE-036 FAILED → PASSED — possible fix deployed — needs QA retest (DSR-555).** Previous site-origin CSP blocked Google Fonts; current collected-errors is exactly `[]`, and current response CSP allows `https://fonts.googleapis.com` in style-src and `https://fonts.gstatic.com` in font-src. No other executed test changed result.

| TC ID | Previous result | Current proposed result | Change / visible reason |
|---|---|---|---|
| DSR-MOVIE-012 | PASSED | PASSED | Unchanged. |
| DSR-MOVIE-014 | PASSED | PASSED | Unchanged. |
| DSR-MOVIE-026 | FAILED | FAILED | Unchanged: same eight assertion failures on both attempts (DSR-538). |
| DSR-MOVIE-027 | PASSED | PASSED | Unchanged. |
| DSR-MOVIE-029 | PASSED | PASSED | Unchanged. |
| DSR-MOVIE-033 | PASSED | PASSED | Unchanged. |
| DSR-MOVIE-034 | PASSED | PASSED | Unchanged. |
| DSR-MOVIE-036 | FAILED | PASSED | Changed: site-origin CSP failure absent; Google Fonts now permitted. |
| SMOKE-001 | PASSED | PASSED | Unchanged. |

## DSR-555 follow-up — live font application (Playwright MCP)

- Observation time (UTC): 2026-10-07T08:42:28.874Z; follow-up checks and screenshot immediately afterwards.
- Target/final URL: `https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/dsr-173-video-detail`.
- Method: read-only Playwright MCP navigation, await movie title and `document.fonts.ready`, inspect computed styles and FontFaceSet, and Chromium CDP `CSS.getPlatformFontsForNode` to identify fonts actually rendering glyphs. No tests, fixtures or configuration changed; no npm suite rerun.

### Every captured Google Fonts request

Playwright MCP network log with successful static resources included. Repeated URLs below are separate captured requests; none failed or remained pending in the captured log.

| MCP request index | Method | URL | HTTP status |
|---:|---|---|---:|
| 25 | GET | https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;600;700&family=Noto+Sans+SC:wght@400;500;600;700&family=Noto+Sans:wght@400;500;600;700&display=swap | 200 |
| 27 | GET | https://fonts.gstatic.com/s/notosans/v42/o-0bIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjc5a7duw.woff2 | 200 |
| 33 | GET | https://fonts.gstatic.com/s/notosans/v42/o-0bIpQlx3QUlC5A4PNB6Ryti20_6n1iPHjc5a7duw.woff2 | 200 |
| 34 | GET | https://fonts.gstatic.com/s/notosansjp/v57/-F62fjtqLzI2JPCgQBnw7HFYwQgP.woff2 | 200 |
| 35 | GET | https://fonts.gstatic.com/s/notosansjp/v57/-F62fjtqLzI2JPCgQBnw7HFYwQgP.woff2 | 200 |
| 36 | GET | https://fonts.gstatic.com/s/notosansjp/v57/-F62fjtqLzI2JPCgQBnw7HFYwQgP.woff2 | 200 |
| 52 | GET | https://fonts.gstatic.com/s/roboto/v48/KFO7CnqEu92Fr1ME7kSn66aGLdTylUAMa3yUBA.woff2 | 200 |

### Computed styles and actual rendered fonts

| Element | Exact computed font-family | Font weight / size | Actual rendered font (CDP) |
|---|---|---|---|
| Movie title `[data-testid="movie-detail-title"]`, text `movieTitle` | `"Noto Sans", helvetica, arial, sans-serif` | 700 / 18px | familyName `Noto Sans`, postScriptName `NotoSans-Regular`, isCustomFont `true`, glyphCount `10` |
| `body` | `"Noto Sans", helvetica, arial, sans-serif` | 400 / 14px | Empty font list: body itself has no directly rendered text glyphs; descendant text must be inspected separately. |
| First related-content title `[data-testid="related-content-card-title"]`, text `article-page-1` | `"Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", meiryo, sans-serif` | Not recorded | familyName `Noto Sans JP Thin`, postScriptName `NotoSansJP-Thin`, isCustomFont `true`, glyphCount `14` |

- Exact requested check: `document.fonts.check("16px 'Noto Sans JP'")` → **false**.
- Additional read-only checks: same font specification with text `movieTitle` → **false**; text `動画` → **false**.
- `document.fonts.status` → `loaded` after awaiting `document.fonts.ready`.
- Loaded FontFace entries: Noto Sans weights 400 and 700; Noto Sans JP weights 400, 600 and 700; roboto weight 400.
- Noto Sans JP face statuses across all declared entries: **3 loaded, 493 unloaded**. Readiness means currently requested loads finished; it does not mean every declared face/subset was downloaded. The precise matching face/subset responsible for the false check was not isolated, and no forced font load or style alteration was performed.

### Proposed finding for QA / Jira DSR-555

**Design web fonts are actually used on the inspected DEV elements, rather than system fallback:** the movie title renders custom Noto Sans glyphs, and the sampled related-content title renders custom Noto Sans JP glyphs. The body declares Noto Sans as its first family. Successful font network requests plus CDP glyph attribution establish actual usage beyond the earlier absence of CSP errors.

**The requested Noto Sans JP availability check does not pass.** Do not record it as true or claim complete JP/SC font coverage. This English page observation supports a deployed CSP/font-loading fix, but QA should resolve the false check and confirm intended weights and Japanese/Chinese design rendering before closing DSR-555. CDP's reported PostScript/family names are recorded verbatim; intended font-weight rendering was not compared with Figma.

- Full-page screenshot: `evidence/DSR-173/DEV/DSR-555_DEV_20261007-fonts.png` (committed with this follow-up).
- Proposed findings only; human QA confirms Jira closure. No Jira status was changed.


## DSR-MOVIE-033 follow-up — PC visual evidence and measurements

- Observation time (UTC): 2026-10-07T08:49:56.952Z.
- Target/final URL: `https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/dsr-173-video-detail`; navigation HTTP **200**.
- Page title: `movieTitle | YKK DIGITAL SHOWROOM`.
- Viewport: **1440 × 900 CSS px**; scroll position **0**; document height **2228 CSS px**.
- Method: read-only Playwright MCP; await title and `document.fonts.ready`, full-page screenshot, `getComputedStyle` and `getBoundingClientRect`. No test code changed and no npm suite rerun.
- Evidence: `evidence/DSR-173/DEV/DSR-MOVIE-033_DEV_02.png` (full-page screenshot, committed). Existing DEV_01 preserved.

### Typography and vertical positions

All measurements are CSS pixels. Top and bottom are document coordinates (`getBoundingClientRect() + scrollY`), referring to the element box rather than the text baseline. Both rendered related-content card titles are included.

| Element / data-testid | Exact text | Computed font-family | Font-size | Font-weight | Line-height | Color | Top Y | Bottom Y |
|---|---|---|---|---|---|---|---:|---:|
| `movie-detail-title` | movieTitle | `"Noto Sans", helvetica, arial, sans-serif` | 18px | 700 | 32.4px | rgb(22, 22, 22) | 324.390625 | 356.78125 |
| `movie-detail-related-products-heading` | Related Products | `"Noto Sans", helvetica, arial, sans-serif` | 20px | 700 | 32px | rgb(22, 22, 22) | 927.328125 | 959.328125 |
| `movie-detail-related-content-heading` | Related Content | `"Noto Sans", helvetica, arial, sans-serif` | 20px | 700 | 32px | rgb(22, 22, 22) | 1368.8125 | 1400.8125 |
| `related-product-name` | ADVANCEN® for ISOFIX | `"Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", meiryo, sans-serif` | 14px | 400 | 24px | rgb(22, 22, 22) | 1226.328125 | 1274.328125 |
| `related-content-card-title` | article-page-1 | `"Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", meiryo, sans-serif` | 14px | 400 | 24px | rgb(22, 22, 22) | 1627.8125 | 1675.8125 |
| `related-content-card-title` | article-page-2 | `"Noto Sans JP", "Hiragino Sans", "Hiragino Kaku Gothic ProN", "Yu Gothic", meiryo, sans-serif` | 14px | 400 | 24px | rgb(22, 22, 22) | 1627.8125 | 1675.8125 |

### Horizontal component width and margins

The live block is `[data-block-name="video-detail"]`, identified from the movie title's nearest block ancestor; its parent is `.video-detail-wrapper`.

| Box | Border-box width | Left X | Right X | Gap to viewport left / right | Computed margin left / right | Padding left / right | Inner content width |
|---|---:|---:|---:|---|---|---|---:|
| Component block | 1360px | 40px | 1400px | 40px / 40px | 0px / 0px | 40px / 40px | 1280px |
| Parent wrapper | 1360px | 40px | 1400px | 40px / 40px | 40px / 40px | 0px / 0px | 1360px |

The component content spans **X=80 to X=1360**, width **1280px**, giving **80px left and right offsets** from the viewport. Each offset comprises a 40px wrapper margin plus 40px block padding. The block itself has 0px computed horizontal margins; its outer edges sit 40px from each viewport edge.

### Visual observation and QA status

The screenshot shows the movie title, embedded player, Related Products and Related Content in vertical order. There is one product card and two related-content cards; the related-content image areas are blank grey placeholders, consistent with the existing DSR-538 finding. Typography measurements show Noto Sans declared for the movie title/headings and Noto Sans JP for product/card text.

**Proposed visual verdict: Pending.** This captures current rendered appearance and measurements; it does not establish a Figma match. The approved `FIGMA_283-848_movie-detail_20260916.png` baseline was not available for an independent comparison. Human QA confirms layout/typography against the design; the previous automated TC-033 pass remains an order/visibility result, not a visual-design pass. DSR-555 is treated as fixed per QA's current instruction; this follow-up does not replace or alter the earlier recorded font-check observations.
