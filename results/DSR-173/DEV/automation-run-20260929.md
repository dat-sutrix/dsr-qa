# DSR-173 DEV automation run — 20260929

- Run date/time (UTC): 2026-09-29T13:16:05.971Z to 2026-09-29T13:17:25.125Z.
- Environment: DEV — `https://main--dsr-eds-dev--sutrix-projects.aem.live`.
- Target: `/master/en/test-space/dsr-173-video-detail` (manually authored component host).
- Build under test: documented `dev/2026.09.15.2` (application commit `f13b984`), per `docs/DSR-173/agent-run-DEV.md` and `data-testid.md`; live deployment identity not independently verified.
- Baseline: `BL-v1_20260916`.
- Automation HEAD tested: `e25e4bd532a71c5938029701cc8e30f5b8b9398f` (main; before this report commit).

## TypeScript

`npx tsc --noEmit` — exit code 0. Command output: **no errors** (empty stdout/stderr).

## DEV suite summary

`npm run test:dev` executed with additional JSON reporting; exact invocation:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=node_modules/.cache/dsr-run-20260929/results.json npm run test:dev -- --reporter=list,html,json
```

| Scope | Total | Passed | Failed | Skipped |
|---|---:|---:|---:|---:|
| Full DEV suite | 36 | 6 | 2 | 28 |
| DSR-MOVIE | 35 | 5 | 2 | 28 |
| SMOKE-001 | 1 | 1 | 0 | 0 |

Exit code: 1. Chromium, 2 workers, 1 configured retry; 0 flaky tests. Wall time: 79.154 s. Counts are unique tests, not attempts. SMOKE-001 “DSR-173 test page is reachable” passed in 4.148 s (HTTP 200 and non-empty title).

## Executed DSR-MOVIE tests

Durations are initial attempt / retry where applicable. Skipped cases are listed separately below.

| TC ID | Title | Result | Duration | Short failure reason |
|---|---|---|---|---|
| DSR-MOVIE-012 | displays the exact movie title | PASSED | 5.661 s | — |
| DSR-MOVIE-014 | embeds the configured YouTube movie | FAILED | 3.974 s / 5.241 s | Expected no page errors; received ["Event"] on both attempts. |
| DSR-MOVIE-026 | displays related thumbnails, types, tags and valid links | FAILED | 11.981 s / 11.765 s | Both cards: missing thumbnails, /ja/ link paths, HTTP 500 (DSR-538), on both attempts. |
| DSR-MOVIE-027 | outputs exactly one title and og:title | PASSED | 2.337 s | — |
| DSR-MOVIE-029 | outputs an absolute reachable CF thumbnail | PASSED | 11.771 s | — |
| DSR-MOVIE-033 | displays component sections in vertical order on PC | PASSED | 6.499 s | — |
| DSR-MOVIE-034 | displays the component back control | PASSED | 3.793 s | — |

## Skipped tests

Runtime skip/fixme reasons, verbatim. No skipped case is counted as passed.

| TC ID | Skip reason |
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

## Failed tests

### DSR-MOVIE-014 — YouTube embed

- Failing assertion: `expect(movie.consoleErrors()).toEqual([])` (`tests/movie-detail/DSR-173.movie-detail.spec.ts:35`).
- Expected: `[]`; actual: `["Event"]`, identical on initial attempt and retry.
- This collector listens to `pageerror` (uncaught page errors), not all browser console messages. Embed source/ID/hostname assertions preceding it passed. The error source and playback behavior are not established by this assertion.

- Initial attempt screenshot: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/test-failed-1.png`.
- Initial attempt error-context: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/error-context.md`.
- Initial attempt trace: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium/trace.zip`.
- Retry 1 screenshot: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/test-failed-1.png`.
- Retry 1 error-context: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/error-context.md`.
- Retry 1 trace: `test-results/movie-detail-DSR-173.movie-5eada-he-configured-YouTube-movie-chromium-retry1/trace.zip`.

### DSR-MOVIE-026 — Related content (known bug DSR-538)

Eight soft assertion failures per attempt; the same failures occurred on both attempts. Source: `tests/movie-detail/DSR-173.movie-detail.spec.ts`.

| Card(s) | Failing assertion | Expected | Actual |
|---|---|---|---|
| 1 and 2 | `expect.soft(image).toBeVisible({ timeout: 1_000 })` (line 116) | Visible thumbnail | `related-content-card-image` element(s) not found |
| 1 and 2 | Image count/load predicate `.toBe(true)` (lines 117–119) | Exactly one complete HTML image with naturalWidth > 0; `true` | `false` |
| 1 | `expect.soft(url.pathname).toMatch(/^\/master\/en\//)` (line 124) | Path starts `/master/en/` | `/digital-showroom/ja/test-space/pages/article-page-1.html` |
| 2 | Same language assertion (line 124) | Path starts `/master/en/` | `/digital-showroom/ja/test-space/pages/article-page-2.html` |
| 1 and 2 | `expect.soft(response.status()).toBe(200)` (line 126) | HTTP 200 | HTTP 500 for both links |

Observed link origin for both cards: `https://publish-p192812-e2014374.adobeaemcloud.com`; append the exact paths above for the requested URLs.

- Initial attempt screenshot: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/test-failed-1.png`.
- Initial attempt error-context: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/error-context.md`.
- Initial attempt trace: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium/trace.zip`.
- Retry 1 screenshot: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/test-failed-1.png`.
- Retry 1 error-context: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/error-context.md`.
- Retry 1 trace: `test-results/movie-detail-DSR-173.movie-77720--types-tags-and-valid-links-chromium-retry1/trace.zip`.

## Selector usage

Static inspection of all 22 `getByTestId` values in `pages/MovieDetailPage.ts`; scope describes the locator construction, not inferred DOM nesting.

| data-testid | Scoped inside a parent section? |
|---|---|
| `movie-detail-back` | No — page-wide |
| `movie-detail-heading` | No — page-wide |
| `movie-detail-title` | No — page-wide |
| `movie-detail-player` | No — page-wide |
| `movie-detail-player-embed` | No — page-wide |
| `movie-detail-player-video` | No — page-wide |
| `movie-detail-related-products` | No — page-wide |
| `movie-detail-related-products-heading` | No — page-wide |
| `related-product-card` | No — page-wide |
| `related-product-card-link` | No — page-wide |
| `related-product-name` | No — page-wide |
| `related-product-code` | No — page-wide |
| `related-product-bookmark` | No — page-wide |
| `movie-detail-related-content` | No — page-wide |
| `movie-detail-related-content-heading` | No — page-wide |
| `carousel-prev` | Yes — `movie-detail-related-content` |
| `carousel-next` | Yes — `movie-detail-related-content` |
| `related-content-card` | No — page-wide |
| `related-content-card-link` | No — page-wide |
| `related-content-card-image` | No — page-wide |
| `related-content-card-title` | No — page-wide |
| `related-content-tag` | No — page-wide |

The spec additionally scopes TC-026 title/tag/image/link lookups to each card and the skipped TC-020 product-code lookup to each product card. Those do not change the page-object scope above.

## Open points for QA

- Build identity is taken from repository documentation; the current DEV application commit was not independently verified. The automation HEAD is a separate repository revision.
- These are automated outcomes for QA review, not final manual TC verdicts. The run covers the English placeholder component host; page generation, routing, ja/zh, mobile/Figma comparison, and STG/PRO were not verified.
- TC-014 reports only `Event`; root cause and whether it originates in the host or embedded player remain unverified. The test does not start playback.
- TC-026 uses the host’s two article cards while RELATED_MIXED is unseeded; movie and landing-page card behavior remains unverified. Failures reproduce the documented DSR-538 symptoms.
- Runtime data skips for TC-021/023/025 occur before their additional fixme blockers: Issue #13 sort fields, #14 filtering, and #5 carousel behavior. TC-020 awaits Issue #1; TC-028 awaits a confirmed description line-break separator.
- `test-data.md` still says all values are TBD, while `fixtures/dsr-173.ts` supplies VALID_YOUTUBE values. This run uses the checked-in fixtures; Author CF values were not independently revalidated.
- TC-034 verifies back-control count and visibility only; its destination remains deferred under DSR-536/DSR-540. Breadcrumb is out of scope (DSR-539).
- Evidence paths are relative to the DSR project and exist locally at report creation. `test-results/` and `playwright-report/` are ignored, uncommitted, and may be overwritten by later runs; screenshots/traces are not included in this report commit. Passing tests have no screenshots under the current failure-only configuration.
