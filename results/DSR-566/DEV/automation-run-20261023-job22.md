# DSR-566 DEV automation run — 20261023-job22

Two runs (JOB-20261023-22 step 2), ja only, after the approved Expected change for TC 3.0 / TC 10.0.

## 1. Header

- Run start (UTC): 2026-10-23T10:22:53Z (run A, news-01) · 2026-10-23T10:24:54Z (run B, news-02)
- Run end (UTC): 2026-10-23T10:24:54Z (run A) · 2026-10-23T10:27:11Z (run B)
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/ja/test-space/qa566-news-01` (TD-566-01, run A), `/master/ja/test-space/qa566-news-02` (TD-566-02, run B)
- Build under test: not independently verified
- Baseline ID: BL-v1 (A10 updated in this job: no `published-time` fallback)
- Automation HEAD commit SHA: ac8fe15c20d8b065a6f335524cac3c2615d432c4 + uncommitted spec/fixture change of this job (committed with this report)
- Exact command used:

```sh
DSR566_SLUG=qa566-news-01 npm run test:dev -- tests/news-detail/DSR-566.news-detail.spec.ts --grep "\[ja\]" --reporter=list,json
DSR566_SLUG=qa566-news-02 npm run test:dev -- tests/news-detail/DSR-566.news-detail.spec.ts --grep "\[ja\]" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Run | Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---|---:|---:|---:|---:|---:|---:|---|---|
| A news-01 | 12 | 7 | 4 | 1 | 1 | 2 | 1 configured; 4 used (all failed again) | 1 m 59 s |
| B news-02 | 12 | 7 | 4 | 1 | 1 | 2 | 1 configured; 4 used (all failed again) | 2 m 15 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (DSR-566 news-detail spec, `[ja]`); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = first attempt.

| TC ID | Title | A news-01 | B news-02 | One-line failure reason |
|---|---|---|---|---|
| DSR-NEWS-001 | page shows date, category, title and body | pass 4.1 s | pass 5.9 s | — |
| DSR-NEWS-002 | fixed order meta → … → Back to list | fail 3.0 s | fail 7.2 s | required element `backToList` missing (count 0) |
| DSR-NEWS-003 | shown date equals meta publish date | pass 2.3 s | pass 6.2 s | — (A: 2026.10.01 = publicationdate 2026-10-01; B: no publicationdate, Article Meta date 2026.10.02 format only) |
| DSR-NEWS-004 | category and title are non-empty text | pass 1.9 s | pass 5.3 s | — |
| DSR-NEWS-006 | Back to list href resolves to /ja/news/ | fail 7.0 s | fail 10.7 s | Back to list link count 0 |
| DSR-NEWS-007 | page row in query-index | fail 7.4 s | fail 7.4 s | `/master/ja/query-index.json` and `/master/ja/news/query-index.json` 404 |
| DSR-NEWS-009 | no related-content block | pass 5.6 s | pass 4.8 s | — |
| DSR-NEWS-010 | CTA (Button8) href equals authored URL | pass 6.3 s | pass 4.8 s | — (A: href = authored `/master/ja/test-space`; B: no-CTA branch, CTA 0, buttons 0) |
| DSR-NEWS-012 | My List button and share icons | fail 15.7 s | fail 15.3 s | My List not found; Article Meta class `no-mylist no-share` |
| DSR-NEWS-013 | body keeps h2/h3, strong, ul/ol, a | pass 6.2 s | pass 6.2 s | — |
| DSR-NEWS-018 | title, description and og tags non-empty | pass 5.7 s | pass 5.5 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-NEWS-008 (A and B) | Blocked – page under test is not under /ja/news/ (needs TD-566-03) |

## 6. Failed tests

Same 4 failures in A and B, same as JOB-20261023-06/08/17.

### DSR-NEWS-002 — fixed order
- Failing assertion: `expect(missing, 'required elements missing').toEqual([])` — `tests/news-detail/DSR-566.news-detail.spec.ts:46`
- Expected: `[]` · Actual: `["backToList"]`. Block sequence A: article-meta, title, text, spacer, text, image, spacer, button; B: article-meta, title, text, spacer, text, spacer.
- Attempt(s): fail / retry fail
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-22/evidence/DSR-NEWS-002_ja_news-02.png` (B)

### DSR-NEWS-006 — Back to list href
- Failing assertion: `expect(news.backToList).toHaveCount(1)` — `tests/news-detail/DSR-566.news-detail.spec.ts:83`
- Expected: 1 · Actual: 0
- Attempt(s): fail / retry fail
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-22/evidence/DSR-NEWS-006_ja_news-02.png` (B)

### DSR-NEWS-007 — query-index row
- Failing assertion: `expect(found).not.toBeNull()` — `tests/news-detail/DSR-566.news-detail.spec.ts:105`
- Expected: page row in `/master/ja/query-index.json` or `/master/ja/news/query-index.json` · Actual: both 404; row is present in `/query-index.json` (recorded only)
- Attempt(s): fail / retry fail
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-22/evidence/DSR-NEWS-007_ja_news-02.png` (B)

### DSR-NEWS-012 — My List / share
- Failing assertion: `expect.soft(news.myList).toBeVisible()` — `tests/news-detail/DSR-566.news-detail.spec.ts:166` (share count soft assertion also fails)
- Expected: My List visible + ≥ 1 share icon · Actual: myList 0, shares 0, class `article-meta no-mylist no-share block`
- Attempt(s): fail / retry fail
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-22/evidence/DSR-NEWS-012_ja_news-02.png` (B)

Run A screenshots were overwritten in `test-results/` by run B (same test names) and are not kept. `test-results/` and `playwright-report/` are gitignored and **not committed**.

## 7. Open points for QA

- TC 10.0 no-CTA branch is chosen by fixture `noCtaSlugs` (`qa566-news-02`), not by reading the page; a new no-CTA page must be added there.
- TC 3.0 without `publicationdate` checks the Article Meta date format only; the date value itself (2026.10.02 vs TD-566-02) is not compared with any source.
- Build identity not verified. en not run (job scope = ja).
