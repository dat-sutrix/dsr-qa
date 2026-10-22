# DSR-529 DEV automation run — 20261022-job13

## 1. Header

- Run start (UTC): 2026-10-22T08:25:37Z
- Run end (UTC): 2026-10-22T08:29:56Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live (envs/dev.env BASE_URL = .aem.live; overridden per tier)
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01; article list pagePath(articleList)
- Build under test: dsr-eds `main` on DEV after PR #206 (Martin 22/10); application SHA not independently verified
- Baseline ID: BL-v1 + A16 re-baseline TC 11 (Martin 22/10 DSR-659 c.64884)
- Automation HEAD commit SHA: 8cc016fbe8b1d69780b2b266e34fde1c3d3bbb1f (spec changes of this job uncommitted in the working tree at run time; committed with this report)
- Job: ykk-dsr/hub/jobs/running/JOB-20261022-13.md
- Exact command(s) used:

```sh
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/529-page.json npm run test:dev -- tests/article-detail/DSR-529.article-detail.spec.ts --grep "DSR-ARTICLE-011 " --project=chromium --output=test-results/j13-529-page
BASE_URL=https://main--dsr-eds-dev--sutrix-projects.aem.live PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j13/529-live.json npm run test:dev -- tests/article-detail/DSR-529.article-detail.spec.ts --grep "DSR-ARTICLE-011 " --project=chromium --output=test-results/j13-529-live
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 | 4 | 0 | 4 | 529/page=0, 529/live=0 | 2 | configured 1; actual 0 test(s) retried | 79 s (sum of runs) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (job TCs), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = summed over attempts. Tier = host (.aem.page / .aem.live).

| TC ID | Title | Tier | Result | Duration | One-line failure reason |
|---|---|---|---|---|---|
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [ja] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present | page | passed | 16.0 s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [en] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present | page | passed | 12.6 s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [ja] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present | live | passed | 14.0 s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [en] og:image + twitter:image absolute, GET 200; related card images absolute, GET 200; thumbnail meta present | live | passed | 12.9 s | — |

## 5. Skipped tests

| TC ID | Tier | Verbatim skip reason |
|---|---|---|
| DSR-ARTICLE-011 | page | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-011 | page | Blocked: article list /master/en/test-space/article-list HTTP 404 |
| DSR-ARTICLE-011 | live | Blocked: article list /master/ja/test-space/article-list shows no qa529 card (listing renders 9 placeholder fixture images, not the stories index) |
| DSR-ARTICLE-011 | live | Blocked: article list /master/en/test-space/article-list HTTP 404 |

## 6. Failed tests

None

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; failed-test screenshots copied to `ykk-dsr/hub/results/JOB-20261022-13/evidence/`.

## 7. Open points for QA

- TC 11 re-baselined this job: og:image + twitter:image absolute + 200 image/*; related card images absolute + 200; thumbnail meta present only.
- Listing card part Blocked: /master/ja/test-space/article-list renders placeholder fixture images (no qa529 card); /master/en/test-space/article-list is 404; /master/{lang}/library/article has no listing block.
- thumbnail meta remains relative (/content/dam/…/highres-photo-4000x3000.png) – by design now, not asserted.
