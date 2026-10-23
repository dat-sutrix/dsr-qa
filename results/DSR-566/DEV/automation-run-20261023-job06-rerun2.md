# DSR-566 DEV automation run — 20261023-job06-rerun2

JOB-20261023-06 (run 2 = evidence rerun of the same subset, read-only; run 1 JSON/screenshots had been overwritten by the next Playwright run). Agent Author applied BUGCHK-586-02, TD-529-META, TD-566-FIX, TD-190-DSR, TD-587-PHASE2 on DEV between 03:33:44Z and 03:35:53Z (52 writes, all 2xx; verify L1–L3 0 FAIL – see ykk-dsr/hub/results/JOB-20261023-06/).

## 1. Header

- Run start (UTC): 2026-10-23T03:48:28Z
- Run end (UTC): 2026-10-23T03:52:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (.aem.live; .aem.page where the spec checks preview)
- Target page(s): same as -job06
- Build under test: not independently verified (EDS `main` as served at run time; no build ID exposed)
- Baseline ID: same as -job06
- Automation HEAD commit SHA: 43b8fc86ce2bb93cb03fdedcb99e8caa7e0b7242
- Exact command used:

```sh
DSR566_SLUG=qa566-news-01 PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/j06-566.json npm run test:dev -- tests/news-detail/DSR-566.news-detail.spec.ts --project=chromium
```
(`npm run test:dev` = `ENV=dev playwright test`; BASE_URL from envs/dev.env.)

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run 2026-10-23 ~03:39Z after the DSR-557 spec change; no code change afterwards)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 24 | 14 | 8 | 2 | 1 | 2 (config) | configured 1; 8 retries used (all failed again) | 4.0 min |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (whole functional spec; visual 014/015 = codex follow-up); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (attempt 1 / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-NEWS-001 [en] | DSR-NEWS-001 [en] page shows date, category, title and body | pass | 5.9s | — |
| DSR-NEWS-002 [en] | DSR-NEWS-002 [en] fixed order meta → title → news type → spacer → body → image → spacer → CTA → Back to list | fail | 7.4s / 6.9s | Back to list missing (required template area) |
| DSR-NEWS-003 [en] | DSR-NEWS-003 [en] shown date equals meta publish date | pass | 6.6s | — |
| DSR-NEWS-004 [en] | DSR-NEWS-004 [en] category and title are non-empty text | pass | 7.0s | — |
| DSR-NEWS-006 [en] | DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | fail | 11.5s / 10.8s | no "Back to list" link in main |
| DSR-NEWS-007 [en] | DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | fail | 7.0s / 6.7s | qa566-news-01 absent from both query-index files |
| DSR-NEWS-009 [en] | DSR-NEWS-009 [en] no related-content block | pass | 5.5s | — |
| DSR-NEWS-010 [en] | DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | pass | 6.9s | — |
| DSR-NEWS-012 [en] | DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | fail | 16.9s / 16.1s | My List button and share icons not found in .article-meta |
| DSR-NEWS-013 [en] | DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | pass | 5.8s | — |
| DSR-NEWS-018 [en] | DSR-NEWS-018 [en] title, description and og tags non-empty | pass | 5.4s | — |
| DSR-NEWS-001 [ja] | DSR-NEWS-001 [ja] page shows date, category, title and body | pass | 6.0s | — |
| DSR-NEWS-002 [ja] | DSR-NEWS-002 [ja] fixed order meta → title → news type → spacer → body → image → spacer → CTA → Back to list | fail | 7.7s / 6.7s | Back to list missing (required template area) |
| DSR-NEWS-003 [ja] | DSR-NEWS-003 [ja] shown date equals meta publish date | pass | 5.9s | — |
| DSR-NEWS-004 [ja] | DSR-NEWS-004 [ja] category and title are non-empty text | pass | 5.7s | — |
| DSR-NEWS-006 [ja] | DSR-NEWS-006 [ja] Back to list href resolves to /ja/news/ | fail | 10.7s / 7.0s | no "Back to list" link in main |
| DSR-NEWS-007 [ja] | DSR-NEWS-007 [ja] page row in query-index with publishDate/category/tags/template | fail | 2.0s / 2.1s | qa566-news-01 absent from both query-index files |
| DSR-NEWS-009 [ja] | DSR-NEWS-009 [ja] no related-content block | pass | 1.7s | — |
| DSR-NEWS-010 [ja] | DSR-NEWS-010 [ja] CTA (Button8) href equals authored URL | pass | 1.6s | — |
| DSR-NEWS-012 [ja] | DSR-NEWS-012 [ja] My List button and share icons visible and enabled (no click) | fail | 12.4s / 12.7s | My List button and share icons not found in .article-meta |
| DSR-NEWS-013 [ja] | DSR-NEWS-013 [ja] body keeps h2/h3, strong, ul/ol, a when present | pass | 1.7s | — |
| DSR-NEWS-018 [ja] | DSR-NEWS-018 [ja] title, description and og tags non-empty | pass | 1.6s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-NEWS-008 [en] | TC 8.0 is ja only |
| DSR-NEWS-008 [ja] | Blocked – page under test is not under /ja/news/ (needs TD-566-03) |

## 6. Failed tests

### DSR-NEWS-002 [en] — DSR-NEWS-002 [en] fixed order meta → title → news type → spacer → body → image → spacer → CTA → Back to list

- Failing assertion(s): tests/news-detail/DSR-566.news-detail.spec.ts:46 (`required elements missing`)
- Assertion messages: `Error: required elements missing`
- Expected: fixed order meta → title → news type → spacer → body → image → spacer → CTA → Back to list; Back to list must exist
- Actual: missing = ["backToList"]
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 70%. Template fixed area (JOB-16-08 rule: 002/006 Back to list missing → product); JOB-05 listed it as "not data".
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-NEWS-002_en.png

### DSR-NEWS-006 [en] — DSR-NEWS-006 [en] Back to list href resolves to /en/news/

- Failing assertion(s): tests/news-detail/DSR-566.news-detail.spec.ts:81–88 (`Back to list link` toHaveCount(1))
- Assertion messages: `Error: Back to list link`
- Expected: Back to list href ends with /en/news/
- Actual: 0 links matching /back to list|一覧へ戻る/i in main
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 70%. Same root cause as 002.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-NEWS-006_en.png

### DSR-NEWS-007 [en] — DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template

- Failing assertion(s): tests/news-detail/DSR-566.news-detail.spec.ts:90+ (`page … in query-index` not null)
- Assertion messages: `Error: page /master/en/test-space/qa566-news-01 in /master/en/query-index.json or /master/en/news/query-index.json`
- Expected: row for /master/en/test-space/qa566-news-01 in /master/en/query-index.json or /master/en/news/query-index.json
- Actual: no row in either index after republish 03:33:59Z
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 50%. Q2 (index location) still open; test-space pages may be excluded from the index by design.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-NEWS-007_en.png

### DSR-NEWS-012 [en] — DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click)

- Failing assertion(s): tests/news-detail/DSR-566.news-detail.spec.ts:154+ (`My List button`, `My List enabled`, `share icons`)
- Assertion messages: `Error: My List button` · `Error: My List enabled` · `Error: share icons`
- Expected: My List button + share icons visible/enabled
- Actual: locator('main .article-meta.block').getByRole('button', {name: /my ?list|マイリスト/i}) not found; share icons not found
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 60%. Not in TD-566 (JOB-05: "My List/share – not data"); enabled state on the page not verified by the agent.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-NEWS-012_en.png

### DSR-NEWS-002 [ja] — DSR-NEWS-002 [ja] fixed order meta → title → news type → spacer → body → image → spacer → CTA → Back to list

- Failing assertion(s): tests/news-detail/DSR-566.news-detail.spec.ts:46 (`required elements missing`)
- Assertion messages: `Error: required elements missing`
- Expected: fixed order meta → title → news type → spacer → body → image → spacer → CTA → Back to list; Back to list must exist
- Actual: missing = ["backToList"]
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 70%. Template fixed area (JOB-16-08 rule: 002/006 Back to list missing → product); JOB-05 listed it as "not data".
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-NEWS-002_ja.png

### DSR-NEWS-006 [ja] — DSR-NEWS-006 [ja] Back to list href resolves to /ja/news/

- Failing assertion(s): tests/news-detail/DSR-566.news-detail.spec.ts:81–88 (`Back to list link` toHaveCount(1))
- Assertion messages: `Error: Back to list link`
- Expected: Back to list href ends with /ja/news/
- Actual: 0 links matching /back to list|一覧へ戻る/i in main
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 70%. Same root cause as 002.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-NEWS-006_ja.png

### DSR-NEWS-007 [ja] — DSR-NEWS-007 [ja] page row in query-index with publishDate/category/tags/template

- Failing assertion(s): tests/news-detail/DSR-566.news-detail.spec.ts:90+ (`page … in query-index` not null)
- Assertion messages: `Error: page /master/ja/test-space/qa566-news-01 in /master/ja/query-index.json or /master/ja/news/query-index.json`
- Expected: row for /master/ja/test-space/qa566-news-01 in /master/ja/query-index.json or /master/ja/news/query-index.json
- Actual: no row in either index after republish 03:33:59Z
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 50%. Q2 (index location) still open; test-space pages may be excluded from the index by design.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-NEWS-007_ja.png

### DSR-NEWS-012 [ja] — DSR-NEWS-012 [ja] My List button and share icons visible and enabled (no click)

- Failing assertion(s): tests/news-detail/DSR-566.news-detail.spec.ts:154+ (`My List button`, `My List enabled`, `share icons`)
- Assertion messages: `Error: My List button` · `Error: My List enabled` · `Error: share icons`
- Expected: My List button + share icons visible/enabled
- Actual: locator('main .article-meta.block').getByRole('button', {name: /my ?list|マイリスト/i}) not found; share icons not found
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 60%. Not in TD-566 (JOB-05: "My List/share – not data"); enabled state on the page not verified by the agent.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-NEWS-012_ja.png

## 7. Open points for QA

- Same outcome as run 1. 001/003/004 pass with the TD-566-FIX title + publicationdate 2026-10-01.
- TC 005 not automated; not run.
- Build under test not independently verified.
- `test-results/` and `playwright-report/` are gitignored; trace/screenshot paths there are not committed.
