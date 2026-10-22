# DSR-566 DEV automation run — 20261022

Selector check for the new `news-detail` template (JOB-ZZ-IDLE-37). This is a **selector check, not a set of verdicts**.

## 1. Header

- Run start (UTC): 2026-10-22T15:59:58Z
- Run end (UTC): 2026-10-22T16:01:32Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/ja/test-space/test-news-detail-template (and the en path the spec derives from it)
- Build under test: not independently verified. The template was redeployed around 08:25Z on 2026-10-22 (JOB-20261022-15).
- Baseline ID: BL-v1 + assumptions A7–A11 (docs/DSR-566/baseline-BL-v1.md)
- Automation HEAD commit SHA: f342dd030d5ac26c2f6e42b62c0cf2f0e580a93e (spec changes uncommitted at run time; committed with this report)
- Exact command used:

```sh
DSR566_SLUG=test-news-detail-template PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/idle37.json npm run test:dev -- tests/news-detail --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 24 | 0 | 0 | 24 | 0 | 1 | 1 configured; 0 used | 93.9 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/news-detail` (DSR-566), chromium only. Flaky outcomes: 0.

## 4. Executed tests

None. Every test was skipped (section 5).

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-NEWS-001 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-002 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-003 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-004 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-006 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-007 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-008 [en] | TC 8.0 is ja only |
| DSR-NEWS-009 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-010 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-012 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-013 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-018 [en] | Blocked – page not on DEV (/master/en/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-001 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-002 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-003 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-004 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-006 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-007 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-008 [ja] | Blocked – page under test is not under /ja/news/ (needs TD-566-03) |
| DSR-NEWS-009 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-010 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-012 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-013 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |
| DSR-NEWS-018 [ja] | Blocked – page not on DEV (/master/ja/test-space/test-news-detail-template HTTP 404) |

## 6. Failed tests

None.

## 7. Open points for QA

- The target page is in Author (JCR dump, JOB-20261022-15) but returned **404 on both .aem.live and .aem.page** at 2026-10-22 16:00Z, so it has not been published. No live selector was validated. The en copy does not exist.
- What was checked instead: (a) on live DEV pages, `title` renders as `.title.block > h1/h2` (/ja/news, /master/ja/test-space/actual-cases) and `text`, `spacer`, `image` and `button8` render as before (/master/en/test-space/dsr-357-news-detail); (b) the new locators were run against a synthetic DOM that copies the EDS wrapper structure of the template. Each locator matched exactly the intended block. This is evidence for the selector logic only, not for the page.
- qa566-* pages were seen in the site query-index with `title` + `text-12` blocks, but were not opened or tested, as the job requires.
- Back to list is still required by TC 1/2/6 (TC intent). The new template does not place it, so expect fails there once the page is published (A8).
- TC 8.0 was added to the spec. It is Blocked until a page under /ja/news/ (TD-566-03) is used. Its list-item selector is provisional (`main li, main article`).
- Evidence: no screenshots (no test ran). test-results/idle37.json is gitignored and not committed.
