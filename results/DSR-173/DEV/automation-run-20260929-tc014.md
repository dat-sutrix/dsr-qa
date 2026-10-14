# DSR-173 DEV automation run — 20260929-tc014

## 1. Header

- Run start (UTC): 2026-09-29T13:39:27.485Z
- Run end (UTC): 2026-09-29T13:40:50.116Z
- Environment + base URL: DEV — `https://main--dsr-eds-dev--sutrix-projects.aem.live`.
- Target page: `/master/en/test-space/dsr-173-video-detail` (English manually authored component host).
- Build under test: documented `dev/2026.09.15.2` / application commit `f13b984`, from `docs/DSR-173/agent-run-DEV.md` and `data-testid.md`; live deployment identity not independently verified.
- Baseline ID: `BL-v1_20260916`.
- Automation HEAD: `a1fe6156bb0881da9d96b0a4234620e4764ca765`; tested with the uncommitted collector/TC-014 changes included in this report commit.
- Exact suite command (additional reporters preserve the full suite/configuration):

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=node_modules/.cache/dsr-tc014-rerun/results.json npm run test:dev -- --reporter=list,html,json
```

## 2. TypeScript check

`npx tsc --noEmit` ran before the suite: exit code **0**, **no errors** (empty output).
Focused in-memory collector checks also passed: all five specified provider domains excluded; site-origin errors retained despite redirects or third-party URLs in message text; unknown-source errors preserved; non-error console messages ignored.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 36 | 6 | 2 | 28 | 1 | 2 | 1 configured per test; 2 retry attempts executed | 82.631 s |

Full DEV suite, Chromium; 0 flaky tests. Counts are unique tests, not attempts. DSR-MOVIE: 35 total, 5 passed, 2 failed, 28 skipped; SMOKE-001 passed. All outcomes are **proposed**, pending human QA confirmation.

## 4. Executed tests

Durations are initial attempt / retry, when applicable.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-MOVIE-012 | displays the exact movie title | PASSED | 5.458 s | — |
| DSR-MOVIE-014 | embeds the configured YouTube movie | FAILED | 4.546 s / 6.171 s | Site-origin console error: CSP blocks Google Fonts stylesheet; both attempts. |
| DSR-MOVIE-026 | displays related thumbnails, types, tags and valid links | FAILED | 11.850 s / 12.000 s | Both cards lack thumbnails, link to /ja/, and return HTTP 500 (DSR-538); both attempts. |
| DSR-MOVIE-027 | outputs exactly one title and og:title | PASSED | 3.852 s | — |
| DSR-MOVIE-029 | outputs an absolute reachable CF thumbnail | PASSED | 10.553 s | — |
| DSR-MOVIE-033 | displays component sections in vertical order on PC | PASSED | 6.349 s | — |
| DSR-MOVIE-034 | displays the component back control | PASSED | 5.510 s | — |
| SMOKE-001 | DSR-173 test page is reachable | PASSED | 1.954 s | — |

## 5. Skipped tests

Runtime skip/fixme descriptions, verbatim. No skipped test is counted as passed.

| TC ID | Verbatim skip reason |
|---|---|
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

### DSR-MOVIE-014 — error source and exact Event details

- Proposed outcome: **FAILED**, both attempts.
- Failing assertion: `expect(movie.consoleErrors(baseURL!).filter((error) => error.source === 'site')).toEqual([])` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:40`.
- Expected: `[]` (no site-origin page/console errors). Actual: one site-origin console error on each attempt.

| Event field | Exact value |
|---|---|
| `name` | `""` |
| `message` | `"Event"` |
| `stack` | `""` |
| `firstStackFrame` | `null` |
| `sourceUrl` | `null` |
| `source` | `"unknown"` |

The Event is the message, not the error name. Its origin is **unknown**: no source URL or stack frame was supplied. It cannot be attributed to the site origin or a third-party frame from this evidence; it is retained in the attachment and excluded from the site-only assertion.

The failing console entry has source URL `https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/dsr-173-video-detail` (site origin), with line/column 0/0. Exact message:

```text
Loading the stylesheet 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Sans:wght@400;500;700&display=swap' violates the following Content Security Policy directive: "style-src 'self' 'unsafe-inline'". Note that 'style-src-elem' was not explicitly set, so 'style-src' is used as a fallback. The action has been blocked.
```

The blocked resource is on googleapis.com, but the console location is the site page. Mentioning a third-party URL does not make this a third-party-frame error. Embed source/ID/hostname checks before the error assertion passed.

- Both attempts attach `collected-errors` (`application/json`) via `testInfo.attach`; inspect TC-014 in `playwright-report/index.html`. The `finally` block also attaches on a passing run.
- Initial screenshot: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/test-failed-1.png`.
- Initial error-context: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/error-context.md`.
- Initial trace: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/trace.zip`.
- Retry 1 screenshot: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png`.
- Retry 1 error-context: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/error-context.md`.
- Retry 1 trace: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/trace.zip`.

### DSR-MOVIE-026 — related content (DSR-538)

Eight soft assertion failures on each attempt, identical expected/actual values. Source file: `tests/movie-detail/DSR-173.movie-detail.spec.ts`.

| Card(s) | Failing assertion (file:line) | Expected | Actual |
|---|---|---|---|
| Related card 1 thumbnail | `expect.soft(image).toBeVisible({ timeout: 1_000 })` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:127` | `Visible image` | `element(s) not found` |
| Related card 1 thumbnail loaded | `.toBe(true) (image count/load predicate)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:130` | `true` | `false` |
| Related card 1 language | `expect.soft(url.pathname).toMatch(/^\/master\/en\//)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:135` | `Path starts /master/en/` | `/digital-showroom/ja/test-space/pages/article-page-1.html` |
| Related card 1 https://publish-p192812-e2014374.adobeaemcloud.com/digital-showroom/ja/test-space/pages/article-page-1.html | `expect.soft(response.status()).toBe(200)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:137` | `200` | `500` |
| Related card 2 thumbnail | `expect.soft(image).toBeVisible({ timeout: 1_000 })` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:127` | `Visible image` | `element(s) not found` |
| Related card 2 thumbnail loaded | `.toBe(true) (image count/load predicate)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:130` | `true` | `false` |
| Related card 2 language | `expect.soft(url.pathname).toMatch(/^\/master\/en\//)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:135` | `Path starts /master/en/` | `/digital-showroom/ja/test-space/pages/article-page-2.html` |
| Related card 2 https://publish-p192812-e2014374.adobeaemcloud.com/digital-showroom/ja/test-space/pages/article-page-2.html | `expect.soft(response.status()).toBe(200)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:137` | `200` | `500` |

- Initial screenshot: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`.
- Initial error-context: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/error-context.md`.
- Initial trace: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/trace.zip`.
- Retry 1 screenshot: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`.
- Retry 1 error-context: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/error-context.md`.
- Retry 1 trace: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/trace.zip`.

Evidence paths are relative to `projects/dsr/`. `test-results/` and `playwright-report/` stay gitignored and **are not committed**; local evidence may be overwritten by later runs.

## 7. Open points for QA

- The Event has no attributable source. No claim that it originated in YouTube or another third-party frame is supported by the captured fields.
- The source-aware assertion intentionally retains site-origin CSP failures. TC-014 does not pass on this run; suppressing this site-sourced error would contradict the requested origin rule.
- Origin comparison uses the configured baseURL, not a potentially redirected page URL. Only exact same-origin errors fail; off-origin sources (including youtube.com, ytimg.com, googleapis.com, gstatic.com, doubleclick.net and subdomains) and unknown sources remain in the attachment.
- Build identity and Author CF source values were not independently verified; checked-in fixtures supply the expected data. `test-data.md` still labels all values TBD.
- This run checks the English placeholder component host only. Playback, generated pages/routing, ja/zh, STG/PRO, and manual Figma comparison were not verified.
- Skipped TC-021/023/025 have additional requirement blockers (#13/#14/#5) after their runtime missing-data checks; TC-020 awaits #1 and TC-028 awaits the description separator.
- TC-026 uses two article cards rather than seeded mixed content. DSR-538 remains reproduced; TC-034 checks back-control existence/visibility, not the unresolved destination (DSR-536/DSR-540).
