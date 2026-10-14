# DSR-173 DEV automation run — 20260929-tc036

## 1. Header

- Run start (UTC): 2026-09-29T13:46:38.886Z
- Run end (UTC): 2026-09-29T13:48:02.520Z
- Environment + base URL: DEV — `https://main--dsr-eds-dev--sutrix-projects.aem.live`.
- Target page: `/master/en/test-space/dsr-173-video-detail` (English manually authored component host).
- Build under test: documented `dev/2026.09.15.2` / application commit `f13b984`, from `docs/DSR-173/agent-run-DEV.md` and `data-testid.md`; live deployment identity not independently verified.
- Baseline ID: `BL-v1_20260916`; TC-036 is the additional check explicitly requested by QA in this task.
- Automation HEAD: `82fc672fe36fe927e077a7e0f9743a59c06629a9`; tested with the uncommitted spec change included in this report commit.
- Exact suite command:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=node_modules/.cache/dsr-tc036/results.json npm run test:dev -- --reporter=list,html,json
```

## 2. TypeScript check

`npx tsc --noEmit` ran before the suite: exit code **0**, **no errors** (empty output).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 37 | 7 | 2 | 28 | 1 | 2 | 1 configured per test; 2 retry attempts executed | 83.635 s |

Full DEV suite, Chromium; 0 flaky tests. Counts are unique tests, not attempts. All outcomes are **proposed**, pending human QA confirmation.

## 4. Executed tests

Durations are initial attempt / retry, when applicable.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-MOVIE-012 | displays the exact movie title | PASSED | 3.666 s | — |
| DSR-MOVIE-014 | embeds the configured YouTube movie | PASSED | 3.257 s | — |
| DSR-MOVIE-026 | displays related thumbnails, types, tags and valid links | FAILED | 10.518 s / 15.372 s | Missing thumbnails, /ja/ link paths, HTTP 500 on both cards (DSR-538); both attempts. |
| DSR-MOVIE-027 | outputs exactly one title and og:title | PASSED | 4.622 s | — |
| DSR-MOVIE-029 | outputs an absolute reachable CF thumbnail | PASSED | 5.694 s | — |
| DSR-MOVIE-033 | displays component sections in vertical order on PC | PASSED | 5.636 s | — |
| DSR-MOVIE-034 | displays the component back control | PASSED | 3.772 s | — |
| DSR-MOVIE-036 | no site-origin console errors on the movie component page | FAILED | 5.898 s / 7.545 s | Site-origin CSP console error blocks the Google Fonts stylesheet; both attempts. |
| SMOKE-001 | DSR-173 test page is reachable | PASSED | 1.778 s | — |

### DSR-MOVIE-014 — embed checks and retained diagnostics

Proposed outcome: **PASSED**. The iframe src has the embed path and configured YouTube ID, and the host matches the allowed YouTube host pattern. TC-014 no longer asserts on console/page errors. Its passing result retains the `collected-errors` JSON attachment in `playwright-report/index.html`.

Captured Event: name `""`, message `"Event"`, stack `""`, first stack frame `null`, source URL `null`. Origin is **unknown**, not established as site or third-party. The attachment also retains the site-origin CSP console error.

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

### DSR-MOVIE-026 — related content (DSR-538)

Eight soft assertion failures per attempt. Both attempts failed with the same expected/actual values.

| Card/check | Failing assertion (file:line) | Expected | Actual |
|---|---|---|---|
| Related card 1 thumbnail | `expect.soft(image).toBeVisible({ timeout: 1_000 })` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:140` | `Visible image` | `element(s) not found` |
| Related card 1 thumbnail loaded | `.toBe(true) (image count/load predicate)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:143` | `true` | `false` |
| Related card 1 language | `expect.soft(url.pathname).toMatch(/^\/master\/en\//)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:148` | `Path starts /master/en/` | `/digital-showroom/ja/test-space/pages/article-page-1.html` |
| Related card 1 https://publish-p192812-e2014374.adobeaemcloud.com/digital-showroom/ja/test-space/pages/article-page-1.html | `expect.soft(response.status()).toBe(200)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:150` | `200` | `500` |
| Related card 2 thumbnail | `expect.soft(image).toBeVisible({ timeout: 1_000 })` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:140` | `Visible image` | `element(s) not found` |
| Related card 2 thumbnail loaded | `.toBe(true) (image count/load predicate)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:143` | `true` | `false` |
| Related card 2 language | `expect.soft(url.pathname).toMatch(/^\/master\/en\//)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:148` | `Path starts /master/en/` | `/digital-showroom/ja/test-space/pages/article-page-2.html` |
| Related card 2 https://publish-p192812-e2014374.adobeaemcloud.com/digital-showroom/ja/test-space/pages/article-page-2.html | `expect.soft(response.status()).toBe(200)` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:150` | `200` | `500` |

- Initial screenshot: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`.
- Initial error-context: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/error-context.md`.
- Initial trace: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/trace.zip`.
- Retry 1 screenshot: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`.
- Retry 1 error-context: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/error-context.md`.
- Retry 1 trace: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/trace.zip`.

### DSR-MOVIE-036 — site-origin errors (@known-bug-CSP)

- Failing assertion: `expect(movie.consoleErrors(baseURL!).filter((error) => error.source === 'site')).toEqual([])` — `tests/movie-detail/DSR-173.movie-detail.spec.ts:53`.
- Expected: `[]`. Actual: one site-origin console error; initial attempt and retry both failed.
- Source URL: `https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/dsr-173-video-detail`; console line/column: 0/0.
- Exact console message:

```text
Loading the stylesheet 'https://fonts.googleapis.com/css2?family=Noto+Sans+JP:wght@400;500;700&family=Noto+Sans+SC:wght@400;500;700&family=Noto+Sans:wght@400;500;700&display=swap' violates the following Content Security Policy directive: "style-src 'self' 'unsafe-inline'". Note that 'style-src-elem' was not explicitly set, so 'style-src' is used as a fallback. The action has been blocked.
```

The Google Fonts URL is the blocked resource; the console source is the site page. The active assertion remains tagged as a known bug rather than skipped or marked as an expected failure. Both attempts attach `collected-errors` JSON in `playwright-report/index.html`.

- Initial screenshot: `test-results/movie-detail-DSR-173.movie-3e6c5-on-the-movie-component-page-chromium/test-failed-1.png`.
- Initial error-context: `test-results/movie-detail-DSR-173.movie-3e6c5-on-the-movie-component-page-chromium/error-context.md`.
- Initial trace: `test-results/movie-detail-DSR-173.movie-3e6c5-on-the-movie-component-page-chromium/trace.zip`.
- Retry 1 screenshot: `test-results/movie-detail-DSR-173.movie-3e6c5-on-the-movie-component-page-chromium-retry1/test-failed-1.png`.
- Retry 1 error-context: `test-results/movie-detail-DSR-173.movie-3e6c5-on-the-movie-component-page-chromium-retry1/error-context.md`.
- Retry 1 trace: `test-results/movie-detail-DSR-173.movie-3e6c5-on-the-movie-component-page-chromium-retry1/trace.zip`.

Evidence paths are relative to `projects/dsr/`. `test-results/` and `playwright-report/` stay gitignored and **are not committed**; local evidence may be overwritten by later runs. Passing TC-014 has its JSON attachment but no screenshot under the failure-only screenshot configuration.

## 7. Open points for QA

- Build identity and Author CF source values were not independently verified. Expected data comes from checked-in fixtures.
- TC-036 is a QA-requested additional check; the existing BL-v1 docs/TC manifest were not modified by this task. The requested CSP comment identifies the Noto Sans JP/SC font impact; computed font rendering was not independently measured.
- The source of the stackless Event remains unknown. Unknown and off-origin errors are retained as diagnostics; only configured-site-origin errors fail TC-036.
- TC-014 validates the embed, not playback. This run covers the English placeholder only; generated routing, ja/zh, mobile/Figma, STG/PRO and manual QA checks were not verified.
- TC-026 still exercises two article cards rather than seeded mixed content; DSR-538 remains reproduced. Existing skipped cases retain their data/specification blockers.
- The explicit task commit message is used; the report and spec change are committed together.
