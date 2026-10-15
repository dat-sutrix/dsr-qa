# DSR-566 DEV automation run — 20261015

## 1. Header

- Run start (UTC): 2026-10-15T09:16:08Z
- Run end (UTC): 2026-10-15T09:19:15Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/en/test-space/dsr-357-news-detail` (200), `/master/ja/test-space/dsr-357-news-detail` (404 → ja Blocked). Dev-authored page; QA pages `qa566-*` (TD-566-01/02) not yet created.
- Build under test: not independently verified (no build ID exposed on publish)
- Baseline ID: BL-v1 = DSR-357 BAC 1–5 / TCC 1–6 (`docs/DSR-566/baseline-BL-v1.md`, copied from `ykk-dsr/hub/tc-out/DSR-566.spec.json`)
- Automation HEAD commit SHA: `b1e24fea129ae32e95b2081bbe53234d165e6740`. The new spec, page object, fixture and docs were uncommitted at run time and are committed with this report.
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job09.json npm run test:dev -- tests/news-detail --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 22 | 5 | 6 | 11 | 1 | 2 | 1 configured; 6 used (all failed tests failed again on retry) | 185s (Playwright 3.1m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/news-detail` (11 TCs × en/ja), Chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-NEWS-001 | en › DSR-NEWS-001 [en] page shows date, category, title and body | passed | 5.1s | — |
| DSR-NEWS-002 | en › DSR-NEWS-002 [en] fixed order date → category → title → body → CTA → Back to list | failed | 5.1s / 5.3s | Back to list not rendered (required elements missing: backToList) |
| DSR-NEWS-003 | en › DSR-NEWS-003 [en] shown date equals meta publish date | failed | 3.3s / 5.6s | shown 2026.03.30 ≠ meta published-time 2026-09-29 |
| DSR-NEWS-004 | en › DSR-NEWS-004 [en] category and title are non-empty text | passed | 5.3s | — |
| DSR-NEWS-006 | en › DSR-NEWS-006 [en] Back to list href resolves to /en/news/ | failed | 14.2s / 9.6s | Back to list link count 0 |
| DSR-NEWS-007 | en › DSR-NEWS-007 [en] page row in query-index with publishDate/category/tags/template | failed | 9.5s / 9.9s | both job index paths 404 |
| DSR-NEWS-009 | en › DSR-NEWS-009 [en] no related-content block | passed | 6.5s | — |
| DSR-NEWS-010 | en › DSR-NEWS-010 [en] CTA (Button8) href equals authored URL | passed | 7.8s | — |
| DSR-NEWS-012 | en › DSR-NEWS-012 [en] My List button and share icons visible and enabled (no click) | failed | 17.1s / 13.5s | no My List button, 0 share icons (article-meta `no-mylist no-share`) |
| DSR-NEWS-013 | en › DSR-NEWS-013 [en] body keeps h2/h3, strong, ul/ol, a when present | passed | 2.2s | — (no h2/h3/strong/ul/ol/a in body; recorded) |
| DSR-NEWS-018 | en › DSR-NEWS-018 [en] title, description and og tags non-empty | failed | 4.5s / 5.7s | meta description and og:description absent |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-NEWS-001 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-002 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-003 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-004 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-006 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-007 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-009 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-010 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-012 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-013 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |
| DSR-NEWS-018 [ja] | Blocked – page not on DEV (/master/ja/test-space/dsr-357-news-detail HTTP 404) |

## 6. Failed tests

All failures were identical on the initial attempt and the retry.

### DSR-NEWS-002 — en › fixed order date → category → title → body → CTA → Back to list

- Failing assertion: `expect(missing, 'required elements missing').toEqual([])` — `tests/news-detail/DSR-566.news-detail.spec.ts:44`
- Expected: date, category, title, body and Back to list are all present (CTA optional), in that order
- Actual: `["backToList"]` missing. Counts: date 1, category 1, title 1, body 1, CTA 1, Back to list 0. The rendered blocks are breadcrumb, article-meta, news-detail, spacer, text, spacer, image, spacer, button. The order check was not reached.
- Evidence paths: `ykk-dsr/hub/results/JOB-20261015-09/evidence/DSR-NEWS-002_en.png` (committed); `test-results/news-detail-DSR-566.news-d-85807-→-body-→-CTA-→-Back-to-list-chromium-retry1/`

### DSR-NEWS-003 — en › shown date equals meta publish date

- Failing assertion: `expect(isoDate(shown)).toBe(isoDate(meta))` — `tests/news-detail/DSR-566.news-detail.spec.ts:57`
- Expected: the displayed date equals the `<meta>` publish date (same day)
- Actual: displayed `2026.03.30` (format YYYY.MM.DD, recorded only); `meta[name="published-time"]` = `2026-09-29T04:17:55.512Z`. The page has no other publish-date meta, and its `/query-index.json` row has an empty `publicationdate`.
- Evidence paths: `ykk-dsr/hub/results/JOB-20261015-09/evidence/DSR-NEWS-003_en.png`; `test-results/news-detail-DSR-566.news-d-7e96d-te-equals-meta-publish-date-chromium-retry1/`

### DSR-NEWS-006 — en › Back to list href resolves to /en/news/

- Failing assertion: `await expect(news.backToList, 'Back to list link').toHaveCount(1)` — `tests/news-detail/DSR-566.news-detail.spec.ts:76`
- Expected: one Back to list link whose href resolves to a path ending in `/en/news/`
- Actual: 0 links in `main` matching role link /back to list|一覧へ戻る/i. No href to check.
- Evidence paths: `ykk-dsr/hub/results/JOB-20261015-09/evidence/DSR-NEWS-006_en.png`; `test-results/news-detail-DSR-566.news-d-cba47-t-href-resolves-to-en-news--chromium-retry1/`

### DSR-NEWS-007 — en › page row in query-index with publishDate/category/tags/template

- Failing assertion: `expect(found, ...).not.toBeNull()` — `tests/news-detail/DSR-566.news-detail.spec.ts:98`
- Expected: a row with path `/master/en/test-space/dsr-357-news-detail` in `/master/en/query-index.json` or `/master/en/news/query-index.json`
- Actual: both URLs return HTTP 404. Recorded only (not asserted): the site-root `/query-index.json` (200) does contain the row. It has columns `publicationdate`, `category`, `tags` and `template`, but all four values are empty for this page.
- Evidence paths: `ykk-dsr/hub/results/JOB-20261015-09/evidence/DSR-NEWS-007_en.png` (page screenshot; the HTTP data is in the `observed` attachment); `test-results/news-detail-DSR-566.news-d-8cd37-Date-category-tags-template-chromium-retry1/`

### DSR-NEWS-012 — en › My List button and share icons visible and enabled (no click)

- Failing assertions: `toBeVisible()` / `toBeEnabled()` on the My List button — `tests/news-detail/DSR-566.news-detail.spec.ts:131`, `:132`; `expect.soft(shares.length).toBeGreaterThan(0)` — `:133`
- Expected: My List button visible and enabled; share icons visible with a non-empty href
- Actual: article-meta has class `article-meta no-mylist no-share block`, and `.article-meta-actions` is empty: My List 0, share 0. Nothing was clicked. The "My List" link in the global header is outside article-meta and is not counted.
- Evidence paths: `ykk-dsr/hub/results/JOB-20261015-09/evidence/DSR-NEWS-012_en.png`; `test-results/news-detail-DSR-566.news-d-931a9-sible-and-enabled-no-click--chromium-retry1/`

### DSR-NEWS-018 — en › title, description and og tags non-empty

- Failing assertion: `expect.soft(content?.trim() ?? '', selector).not.toBe('')` for `meta[name="description"]` and `meta[property="og:description"]` — `tests/news-detail/DSR-566.news-detail.spec.ts:158`
- Expected: `<title>`, meta description, og:title, og:description, og:url and og:image present and non-empty
- Actual: `<title>` / og:title = `DSR-357 News-Detail`; og:url and og:image present (absolute URLs on `dev-eds.ykkdigitalshowroom.com`); meta description and og:description are **absent**
- Evidence paths: `ykk-dsr/hub/results/JOB-20261015-09/evidence/DSR-NEWS-018_en.png`; `test-results/news-detail-DSR-566.news-d-cadfe-ption-and-og-tags-non-empty-chromium-retry1/`

The six PNGs under `ykk-dsr/hub/results/JOB-20261015-09/evidence/` (viewport screenshots from the retry attempt) are committed. Everything under `test-results/` and `playwright-report/` is gitignored and **not committed**.

## 7. Open points for QA

- The run used the dev-authored page, not TD-566-01. Failures in 003, 012 and 018 may come from how that page was authored (no description, My List/share disabled, date property vs publish timestamp) rather than from the product. Re-run on `qa566-news-01` (`DSR566_SLUG=qa566-news-01`) after 2026-10-16.
- DSR-NEWS-002/006: Back to list is missing. Per A2 it is a fixed template area, so this looks like a product issue (or the dev page does not use the `news-article` template; the root-index `template` value is empty). Not independently verified.
- DSR-NEWS-003 compares against `meta[name="published-time"]`, the only publish-date meta on the page. That meta may be the EDS publication timestamp, not the authored publish-date property. The date format was recorded only (A4 / Q1 open).
- DSR-NEWS-004 passed on the job's measurable criterion (non-empty text, not images). Recorded only: the title is an `h2` and the page has **0 `h1`**. spec.json 4.0 also says "title is the single h1 of the page", which was not asserted in this job.
- DSR-NEWS-007: tc-questions Q2 is open. The page appears only in the site-root `/query-index.json`, with empty publicationdate/category/tags/template. The index column is named `publicationdate`, not `publishDate`.
- DSR-NEWS-010 passed: rendered href `google.com` equals the authored value from `.plain.html`. As authored it is a relative link that resolves to `/master/en/test-space/google.com` (HTTP 404). Navigation was not asserted (job scope: href only).
- DSR-NEWS-013 passed vacuously: the body contains only a plain paragraph (no h2/h3/strong/ul/ol/a). It needs TD-566-01 for a meaningful check.
- DSR-NEWS-001: no console errors recorded. The Back to list count (0) was recorded but is not part of the job's 001 criterion.
- All 11 ja tests are Blocked because the ja page returns 404.
