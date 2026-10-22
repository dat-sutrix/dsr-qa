# DSR-587 DEV automation run — 20261022-job13

## 1. Header

- Run start (UTC): 2026-10-22T08:20:19Z
- Run end (UTC): 2026-10-22T08:26:43Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): 26 overlay pages from manifest REPUBLISH-OVL-20261022 (video/catalog, ja+en) on both tiers with ?cb=<epoch>; /{ja,en}/library/catalog/qa654-inactive, /{ja,en}/library/video/qa587-inactive, /en/library/video/qa587-off; /{ja,en}/library/video/qa587-main (VOV-003); /en/library/video/qa587-main (MOVIE-029 via DSR173_MOVIE_PATH)
- Build under test: dsr-eds `main` on DEV after PR #206 (Martin 22/10); application SHA not independently verified
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md + Update 2026-10-21) + Martin 22/10 (PR #206 og:image; isActive OFF = 200 + unavailable | inactive, browser redirect)
- Automation HEAD commit SHA: 8cc016fbe8b1d69780b2b266e34fde1c3d3bbb1f (spec changes of this job uncommitted in the working tree at run time; committed with this report)
- Job: ykk-dsr/hub/jobs/running/JOB-20261022-13.md
- Exact command(s) used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/seo.json npm run test:dev -- tests/overlay-seo/ --project=chromium --output=test-results/j13-seo   # BASE_URL = envs/dev.env (.aem.live); spec addresses .aem.page and .aem.live itself
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/587-page.json npm run test:dev -- tests/movie-detail/DSR-587.movie-overlay.spec.ts --grep "DSR-VOV-003 " --project=chromium --output=test-results/j13-587-page
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/587-live.json npm run test:dev -- tests/movie-detail/DSR-587.movie-overlay.spec.ts --grep "DSR-VOV-003 " --project=chromium --output=test-results/j13-587-live
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/173-page.json DSR173_MOVIE_PATH=/en/library/video/qa587-main DSR173_RELATED_PATH=/en/library/video/qa587-rel-a npm run test:dev -- tests/movie-detail/DSR-173.movie-detail.spec.ts --grep "DSR-MOVIE-029 " --project=chromium --output=test-results/j13-173-page
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/173-live.json DSR173_MOVIE_PATH=/en/library/video/qa587-main DSR173_RELATED_PATH=/en/library/video/qa587-rel-a npm run test:dev -- tests/movie-detail/DSR-173.movie-detail.spec.ts --grep "DSR-MOVIE-029 " --project=chromium --output=test-results/j13-173-live
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 72 | 67 | 0 | 5 | seo=0, 587/page=0, 587/live=0, 173/page=0, 173/live=0 | 2 | configured 1; actual 0 test(s) retried | 162 s (sum of runs) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (job TCs), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = summed over attempts. Tier = host (.aem.page / .aem.live).

| TC ID | Title | Tier | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook | page | passed | 2.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook | live | passed | 1.8 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-ebook-form | page | passed | 1.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-ebook-form | live | passed | 1.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf | page | passed | 1.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf | live | passed | 1.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa190-cat-pdf-form | page | passed | 1.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa190-cat-pdf-form | live | passed | 1.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-content-unpub | page | passed | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-content-unpub | live | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-inactive | page | passed | 0.4 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-inactive | live | passed | 0.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-preview | page | passed | 0.3 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep page /en/library/catalog/qa654-update | page | passed | 1.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [en] og:image sweep live /en/library/catalog/qa654-update | live | passed | 1.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-a | page | passed | 2.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-a | live | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa501-main-b | page | passed | 2.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa501-main-b | live | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa557-dam | page | passed | 1.6 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa557-dam | live | passed | 1.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-main | page | passed | 2.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-main | live | passed | 1.4 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-off | page | passed | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-off | live | passed | 0.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r1 | page | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r1 | live | passed | 2.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r2 | page | passed | 2.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r2 | live | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r3 | page | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r3 | live | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r4 | page | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r4 | live | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r5 | page | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r5 | live | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-r6 | page | passed | 1.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-r6 | live | passed | 1.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-a | page | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-a | live | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep page /en/library/video/qa587-rel-b | page | passed | 1.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] og:image sweep live /en/library/video/qa587-rel-b | live | passed | 1.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook | page | passed | 2.5 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook | live | passed | 1.6 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-ebook-form | page | passed | 2.1 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-ebook-form | live | passed | 1.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf | page | passed | 1.7 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf | live | passed | 1.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa190-cat-pdf-form | page | passed | 1.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa190-cat-pdf-form | live | passed | 2.2 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep page /ja/library/catalog/qa654-inactive | page | passed | 0.9 s | — |
| DSR-CATOV-002 | DSR-CATOV-002 [ja] og:image sweep live /ja/library/catalog/qa654-inactive | live | passed | 0.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa557-dam | page | passed | 1.7 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa557-dam | live | passed | 1.8 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep page /ja/library/video/qa587-main | page | passed | 1.9 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] og:image sweep live /ja/library/video/qa587-main | live | passed | 1.8 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive page: raw 200 + unavailable / inactive, browser ends on /ja/library/catalog (HTTP 200) | page | passed | 3.9 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [ja] qa654-inactive live: raw 200 + unavailable / inactive, browser ends on /ja/library/catalog (HTTP 200) | live | passed | 4.2 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive page: raw 200 + unavailable / inactive, browser ends on /en/library/catalog (HTTP 200) | page | passed | 4.4 s | — |
| DSR-CATOV-005 | DSR-CATOV-005 [en] qa654-inactive live: raw 200 + unavailable / inactive, browser ends on /en/library/catalog (HTTP 200) | live | passed | 4.3 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable / movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | page | passed | 4.0 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable / movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | live | passed | 4.0 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | page | passed | 7.1 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | page | passed | 6.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [ja] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | live | passed | 6.5 s | — |
| DSR-VOV-003 | DSR-VOV-003 [en] raw HTML has title / description / og:image and movie title; 0 GraphQL requests | live | passed | 6.6 s | — |
| DSR-MOVIE-029 | DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | page | passed | 3.7 s | — |
| DSR-MOVIE-029 | DSR-MOVIE-029 outputs an absolute reachable CF thumbnail | live | passed | 3.7 s | — |

## 5. Skipped tests

| TC ID | Tier | Verbatim skip reason |
|---|---|---|
| DSR-CATOV-002 | live | preview-only CF: not on .aem.live (HTTP 404 = expected) |
| DSR-VOV-007 | page | page not seeded on .aem.page (HTTP 404) |
| DSR-VOV-007 | live | page not seeded on .aem.live (HTTP 404) |
| DSR-VOV-007 | page | page not seeded on .aem.page (HTTP 404) |
| DSR-VOV-007 | live | page not seeded on .aem.live (HTTP 404) |

## 6. Failed tests

None

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; failed-test screenshots copied to `ykk-dsr/hub/results/JOB-20261022-13/evidence/`.

## 7. Open points for QA

- New spec tests/overlay-seo/DSR-587.overlay-seo.spec.ts (job part 1 + 3). Sweep titles reuse the TC of the page type (VOV-003 video, CATOV-002 catalog); one test per page × tier.
- Sweep: 9 unavailable pages (qa654-inactive ja/en, qa654-content-unpub, qa654-preview .page, qa587-off) carry the site default og:image (default-meta-image.png, absolute, 200) – recorded as expected per Martin 22/10, annotation `expected-no-og-image`. No page returned `about:error`.
- No product page is in the JOB-12 republish manifest; product og:image is covered by DSR-PDO-003 (see DSR-586 report).
- qa587-inactive (TD-587-07) is HTTP 404 on both tiers ja/en → VOV-007 browser-redirect check skipped (data not seeded). qa587-off (unavailable | movie-unavailable) used as the live qa587 unavailable page: redirects to /en/library/video/search, HTTP 200.
- Existing inactive TCs (VOV-007/008, CATOV-005/014, PDO-008) already assert the browser final URL, not an HTTP 30x → no spec text change needed; tc-out spec.json for 587/654/586 not edited.
- Build SHA of dsr-eds not independently verified; "PR #206 deployed" is taken from Martin 22/10 (KNOWN-FACTS).
