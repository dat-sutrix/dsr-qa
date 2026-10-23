# DSR-566 DEV automation run — 20261023

## 1. Header

- Run start (UTC): 2026-10-23T00:54:50Z
- Run end (UTC): 2026-10-23T00:58:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/ja/test-space/qa566-news-01, /master/en/test-space/qa566-news-01 (qa566-news-02 used only for the extra measurements, outside the spec)
- Build under test: not independently verified
- Baseline ID: BL-v1 (docs/DSR-566/baseline-BL-v1.md, incl. A7–A11)
- Automation HEAD commit SHA: facb94adf42b5e685737848894300ddb305905ed
- Exact command used (job JOB-20261016-08):

```sh
DSR566_SLUG=qa566-news-01 PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job08.json npm run test:dev -- tests/news-detail --project=chromium --grep "DSR-NEWS-0(01|02|03|04|06|07|09|10|12|13|18) "
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 22 | 12 | 10 | 0 | 1 | 2 | 1 configured; 10 retried, all failed again | 3m 40s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: subset (11 TCs from the job × ja/en); chromium. Flaky outcomes: 0.

## 4. Executed tests

Durations are per attempt (first / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-NEWS-001 | [ja] page shows date, category, title and body | passed | 5.7s | — |
| DSR-NEWS-002 | [ja] fixed order meta → … → Back to list | failed | 6.2s / 7.4s | Back to list missing (count 0) |
| DSR-NEWS-003 | [ja] shown date equals meta publish date | failed | 6.7s / 6.6s | shown `2026-10-01T00:00:00.000Z`, not YYYY.MM.DD; ≠ published-time 2026-10-22 |
| DSR-NEWS-004 | [ja] category and title are non-empty text | passed | 6.3s | — |
| DSR-NEWS-006 | [ja] Back to list href resolves to /ja/news/ | failed | 10.6s / 10.6s | Back to list link not found |
| DSR-NEWS-007 | [ja] page row in query-index … | failed | 6.9s / 6.6s | both job index paths 404 |
| DSR-NEWS-009 | [ja] no related-content block | passed | 5.3s | — |
| DSR-NEWS-010 | [ja] CTA (Button8) href equals authored URL | passed | 5.9s | — |
| DSR-NEWS-012 | [ja] My List button and share icons … | failed | 15.5s / 11.7s | My List 0, share icons 0 (`no-mylist no-share`) |
| DSR-NEWS-013 | [ja] body keeps h2/h3, strong, ul/ol, a | passed | 1.5s | — |
| DSR-NEWS-018 | [ja] title, description and og tags non-empty | passed | 1.4s | — |
| DSR-NEWS-001 | [en] page shows date, category, title and body | passed | 5.9s | — |
| DSR-NEWS-002 | [en] fixed order meta → … → Back to list | failed | 2.2s / 2.2s | Back to list missing (count 0) |
| DSR-NEWS-003 | [en] shown date equals meta publish date | failed | 2.9s / 2.7s | shown `2026-10-01T00:00:00.000Z`, not YYYY.MM.DD; ≠ published-time 2026-10-22 |
| DSR-NEWS-004 | [en] category and title are non-empty text | passed | 1.8s | — |
| DSR-NEWS-006 | [en] Back to list href resolves to /en/news/ | failed | 6.6s / 6.6s | Back to list link not found |
| DSR-NEWS-007 | [en] page row in query-index … | failed | 1.8s / 1.6s | both job index paths 404 |
| DSR-NEWS-009 | [en] no related-content block | passed | 1.5s | — |
| DSR-NEWS-010 | [en] CTA (Button8) href equals authored URL | passed | 1.9s | — |
| DSR-NEWS-012 | [en] My List button and share icons … | failed | 11.8s / 11.8s | My List 0, share icons 0 (`no-mylist no-share`) |
| DSR-NEWS-013 | [en] body keeps h2/h3, strong, ul/ol, a | passed | 5.9s | — |
| DSR-NEWS-018 | [en] title, description and og tags non-empty | passed | 5.3s | — |

## 5. Skipped tests

None.

## 6. Failed tests

The same assertion failed in both attempts for every failed test. The Evidence lines below give the job copy (`ykk-dsr/hub/results/JOB-20261016-08/evidence/`, committed) and the original under `test-results/` (gitignored, **not committed**).

### DSR-NEWS-002 [ja] / [en] — fixed order

- Failing assertion: `expect(missing, 'required elements missing').toEqual([])` — `tests/news-detail/DSR-566.news-detail.spec.ts:46`
- Expected: `[]`
- Actual: `["backToList"]`. Every other element is present. Block sequence: article-meta, title, text, spacer, text, image, spacer, button.
- Attempt(s): failed / failed (ja, en)
- Evidence: `ykk-dsr/hub/results/JOB-20261016-08/evidence/DSR-NEWS-002_{ja,en}.png`

### DSR-NEWS-003 [ja] / [en] — shown date

- Failing assertions: `expect.soft(shown).toMatch(dateFormat)` — `tests/news-detail/DSR-566.news-detail.spec.ts:61`; `expect(isoDate(shown)).toBe(isoDate(meta))` — `:63`
- Expected: `/^\d{4}\.\d{2}\.\d{2}$/`; the shown date equals the meta date.
- Actual: shown `2026-10-01T00:00:00.000Z` (ja and en). `publicationdate` meta is absent. `published-time` = 2026-10-22T13:43:25.832Z (ja) and 2026-10-22T14:28:53.236Z (en). The shown date matches the authored TD-566-01 date (2026-10-01). The test falls back to `published-time`, which is the publish timestamp.
- Attempt(s): failed / failed
- Evidence: `ykk-dsr/hub/results/JOB-20261016-08/evidence/DSR-NEWS-003_{ja,en}.png`

### DSR-NEWS-006 [ja] / [en] — Back to list href

- Failing assertion: `expect(news.backToList).toHaveCount(1)` — `tests/news-detail/DSR-566.news-detail.spec.ts:83`
- Expected: 1 link named /back to list|一覧へ戻る/i in `main`
- Actual: 0
- Attempt(s): failed / failed
- Evidence: `ykk-dsr/hub/results/JOB-20261016-08/evidence/DSR-NEWS-006_{ja,en}.png`

### DSR-NEWS-007 [ja] / [en] — query-index

- Failing assertion: `expect(found).not.toBeNull()` — `tests/news-detail/DSR-566.news-detail.spec.ts:105`
- Expected: a page row in `/master/{lang}/query-index.json` or `/master/{lang}/news/query-index.json`
- Actual: both return HTTP 404. This value is recorded only: the row exists in `/query-index.json` with `category: "news"`, tags `site:product/bio-based` and `site:product/zipper-chain-type`, and the empty fields `template: ""` and `publicationdate: ""`.
- Attempt(s): failed / failed
- Evidence: `ykk-dsr/hub/results/JOB-20261016-08/evidence/DSR-NEWS-007_{ja,en}.png`

### DSR-NEWS-012 [ja] / [en] — My List / share

- Failing assertions: `toBeVisible()` — `:158`, `toBeEnabled()` — `:159`, `expect.soft(shares.length).toBeGreaterThan(0)` — `:160` (`tests/news-detail/DSR-566.news-detail.spec.ts`)
- Expected: My List button is visible and enabled; at least 1 share icon
- Actual: the `article-meta` class is `article-meta no-mylist no-share block`; My List count 0; shares `[]`
- Attempt(s): failed / failed
- Evidence: `ykk-dsr/hub/results/JOB-20261016-08/evidence/DSR-NEWS-012_{ja,en}.png`

## 7. Open points for QA

- Build under test was not verified. Proposed causes and confidence levels are in `ykk-dsr/hub/results/JOB-20261016-08/summary.md`.
- The Title block on all qa566 pages shows the template placeholder `タイトルが入ります。タイトルが入ります。`, not the authored title. TC 004 still passes because it only checks that the text is not empty. Authored values were not compared.
- TC 003 equality: the spec compares the shown date with `published-time` when `publicationdate` is absent. The publish timestamp is not the authored date, so this assertion may need a spec change.
- TC 012: the My List and share features were not enabled on the page (`no-mylist no-share`). A re-test needs both features turned on in Author.
- Figma comparison (news-type position, image height) was not done because this lane has no Figma access. Only the measured values were recorded.
- DSR-NEWS-005 (qa566-news-02) was not run: it is not in the job's TC list and has no test in the spec.
