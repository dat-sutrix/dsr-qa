# DSR-566 DEV automation run — 20261023-job17

## 1. Header

- Run start (UTC): 2026-10-23T08:51:17Z
- Run end (UTC): 2026-10-23T08:53:28Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/ja/test-space/qa566-news-02` (TD-566-02)
- Build under test: not independently verified. Page Last-Modified is `Fri, 23 Oct 2026 08:45:32 GMT` (chrome republish, JOB-20261023-16)
- Baseline ID: DSR-566 TC (tc-out/DSR-566.spec.json), TD-566-02
- Automation HEAD commit SHA: 9f00027b2d1836ae492a4c923890289c871c36fa
- Exact command used:

```sh
DSR566_SLUG=qa566-news-02 npm run test:dev -- tests/news-detail/DSR-566.news-detail.spec.ts --grep "\[ja\]" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 12 | 5 | 6 | 1 | not captured (output was piped; Playwright returns 1 when tests fail) | 2 | configured 1; 6 retries used, all failed again | 2.2 min (131.1 s) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: subset (ja only, DSR-566 news-detail spec), chromium, PC 1440×900. Flaky: 0.

## 4. Executed tests

Duration = initial attempt / retry.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-NEWS-001 | [ja] page shows date, category, title and body | passed | 2.5s | — |
| DSR-NEWS-002 | [ja] fixed order meta → title → news type → spacer → body → image → spacer → CTA → Back to list | failed | 2.6s / 2.3s | required element missing: backToList |
| DSR-NEWS-003 | [ja] shown date equals meta publish date | failed | 3.3s / 3.3s | shown 2026-10-02 ≠ published-time 2026-10-23 (no publicationdate meta) |
| DSR-NEWS-004 | [ja] category and title are non-empty text | passed | 2.1s | — |
| DSR-NEWS-006 | [ja] Back to list href resolves to /ja/news/ | failed | 7.2s / 7.1s | Back to list link count 0 |
| DSR-NEWS-007 | [ja] page row in query-index with publishDate/category/tags/template | failed | 3.3s / 7.7s | both ja index paths 404 |
| DSR-NEWS-009 | [ja] no related-content block | passed | 5.1s | — |
| DSR-NEWS-010 | [ja] CTA (Button8) href equals authored URL | failed | 10.3s / 10.1s | Button8 CTA count 0 (TD-566-02 has no CTA by design) |
| DSR-NEWS-012 | [ja] My List button and share icons visible and enabled (no click) | failed | 15.2s / 16.2s | My List 0, share 0 (`no-mylist no-share`) |
| DSR-NEWS-013 | [ja] body keeps h2/h3, strong, ul/ol, a when present | passed | 5.1s | — |
| DSR-NEWS-018 | [ja] title, description and og tags non-empty | passed | 4.9s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-NEWS-008 | Blocked – page under test is not under /ja/news/ (needs TD-566-03) |

## 6. Failed tests

### DSR-NEWS-002 — [ja] fixed order … → Back to list

- Failing assertion: `expect(missing, 'required elements missing').toEqual([])` — `tests/news-detail/DSR-566.news-detail.spec.ts:46`
- Expected: `[]`
- Actual: `["backToList"]`. Present elements: date 1, title 1, category 1, spacer 1, body 1, image 0, spacer2 1, cta 0, backToList 0. Block sequence: article-meta, title, text, spacer, text, spacer
- Attempt(s): failed / failed on retry
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-17/evidence/DSR-NEWS-002_ja.png`

### DSR-NEWS-003 — [ja] shown date equals meta publish date

- Failing assertion: `expect(isoDate(shown)).toBe(isoDate(meta))` — `tests/news-detail/DSR-566.news-detail.spec.ts:63`
- Expected: `2026-10-23` (from `published-time` 2026-10-23T08:45:32.832Z, used because `publicationdate` is absent)
- Actual: `2026-10-02` (shown `2026.10.02`; format check passed)
- Attempt(s): failed / failed on retry
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-17/evidence/DSR-NEWS-003_ja.png`

### DSR-NEWS-006 — [ja] Back to list href resolves to /ja/news/

- Failing assertion: `expect(news.backToList, 'Back to list link').toHaveCount(1)` — `tests/news-detail/DSR-566.news-detail.spec.ts:83`
- Expected: 1 link matching `/back to list|一覧へ戻る/i` in main
- Actual: 0
- Attempt(s): failed / failed on retry
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-17/evidence/DSR-NEWS-006_ja.png`

### DSR-NEWS-007 — [ja] page row in query-index

- Failing assertion: `expect(found, ...).not.toBeNull()` — `tests/news-detail/DSR-566.news-detail.spec.ts:105`
- Expected: the row in `/master/ja/query-index.json` or `/master/ja/news/query-index.json`
- Actual: both return HTTP 404. Recorded only: `/query-index.json` (200) contains the row (category `news`, publicationdate empty, template empty)
- Attempt(s): failed / failed on retry
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-17/evidence/DSR-NEWS-007_ja.png`

### DSR-NEWS-010 — [ja] CTA (Button8) href equals authored URL

- Failing assertion: `expect(news.cta, 'Button8 CTA').toHaveCount(1)` — `tests/news-detail/DSR-566.news-detail.spec.ts:145`
- Expected (spec): 1. Expected (TC 10.0, TD-566-02): "A page without CTA (TD-566-02) shows no button"
- Actual: 0. This matches the TC, so the product behaves correctly here and the spec lacks a no-CTA branch
- Attempt(s): failed / failed on retry
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-17/evidence/DSR-NEWS-010_ja.png`

### DSR-NEWS-012 — [ja] My List button and share icons

- Failing assertion: `expect.soft(news.myList).toBeVisible()` / `toBeEnabled()` — `:158`, `:159`; `expect.soft(shares.length).toBeGreaterThan(0)` — `:160`
- Expected: My List visible + enabled, at least 1 share icon
- Actual: element not found, share count 0. Article meta class = `article-meta no-mylist no-share block`
- Attempt(s): failed / failed on retry
- Evidence paths: `ykk-dsr/hub/results/JOB-20261023-17/evidence/DSR-NEWS-012_ja.png`

The originals are under `test-results/news-detail-DSR-566.news-d-*-chromium/`. That folder is gitignored and **not committed**; only the copies under `ykk-dsr/hub/results/JOB-20261023-17/evidence/` are committed.

## 7. Open points for QA

- The independent DOM check (job steps 1–3) ran with a standalone Playwright script, not part of the spec. Raw values are in `ykk-dsr/hub/results/JOB-20261023-17/result.json` → `verify`. Everything matches chrome JOB-20261023-16 `after`.
- 010 and 003 fail because of the spec design for TD-566-02 (no CTA, no publicationdate). I did not change the spec (verify job, out of scope). Proposal: allow CTA count 0 for TD-566-02 pages, and compare the date with the Article Meta authored date when `publicationdate` is absent.
- 002/006/007/012 match the known news-01 results (JOB-20261023-06/08). Nothing is new.
- The Playwright exit code was not captured, because the command output was piped.
- Build/deploy SHA not independently verified.
