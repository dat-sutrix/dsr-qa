# DSR-529 DEV automation run — 20261020-job10

JOB-20261020-10: I reran the full 529 spec after QA-PT's data fix (Night Report 20/10). 6 tests changed from fail to pass: ARTICLE-003, 013 and 029 in ja and en (title and related-stories data now correct). The other 19 failures are the same as in JOB-20261020-09.

## 1. Header

- Run start (UTC): 2026-10-20T16:16:23Z
- Run end (UTC): 2026-10-20T16:23:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01 (TD-529-01), /master/ja/library/article/stories/qa529-02 (TD-529-02); related qa529-r1..r3 read through meta and the related-articles block
- Build under test: not independently verified (no build ID exposed). Freshness: `last-modified` of qa529-01 is 2026-10-20T15:38:34Z (ja) and 2026-10-20T12:56:13Z (en). Both are after 12:00Z, so the run is not blocked-data. qa529-02 ja `published-time` is 2026-10-19T15:31:26Z (not republished)
- Baseline ID: BL-v1 (docs/DSR-529/baseline-BL-v1.md)
- Automation HEAD commit SHA: 534cdf5473aa18bd5e143307f39f7f35a5b9cfdc (no code changes)
- Exact command used:

```sh
ENV=dev npx playwright test tests/article-detail/DSR-529.article-detail.spec.ts --output test-results/j10 --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 47 | 12 | 19 | 16 | 1 | 2 | 1 configured; 19 used | 7.1m |

Counts are unique tests, not attempts. All outcomes are proposed; human QA confirms.
Scope/browser: full DSR-529 spec, chromium. Flaky outcomes: 0 (every failure failed on both attempts).

## 4. Executed tests

Duration = initial + retry #1 attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail (2/2 attempts) | 9.2s | Error: required blocks missing |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | pass | 2.8s | — |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | fail (2/2 attempts) | 8.1s | Error: tag labels |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [ja] info bar date = meta published-date | fail (2/2 attempts) | 19.3s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 8.5s | — |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible | fail (2/2 attempts) | 17.0s | Error: published-date count |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail (2/2 attempts) | 18.0s | Error: absolute URL |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | fail (2/2 attempts) | 18.4s | Error: category tag IDs |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | pass | 7.8s | — |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | fail (2/2 attempts) | 17.9s | Error: published-date count |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail (2/2 attempts) | 22.5s | Error: qa529-01 robots |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | fail (2/2 attempts) | 18.5s | Error: viewAllStories href |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | pass | 10.0s | — |
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail (2/2 attempts) | 20.5s | Error: required blocks missing |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | pass | 7.9s | — |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | fail (2/2 attempts) | 17.7s | Error: tag labels |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [en] info bar date = meta published-date | fail (2/2 attempts) | 12.2s | Error: expect(received).toBe(expected) // Object.is equality |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 2.8s | — |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible | fail (2/2 attempts) | 4.4s | Error: published-date count |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail (2/2 attempts) | 5.2s | Error: absolute URL |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | fail (2/2 attempts) | 5.1s | Error: category tag IDs |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | pass | 2.2s | — |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | fail (2/2 attempts) | 6.1s | Error: published-date count |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail (2/2 attempts) | 4.8s | Error: qa529-01 robots |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | fail (2/2 attempts) | 5.0s | Error: viewAllStories href |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | pass | 7.0s | — |
| DSR-ARTICLE-015 | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | pass | 7.4s | — |
| DSR-ARTICLE-020 | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | pass | 7.2s | — |
| DSR-ARTICLE-023 | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | fail (2/2 attempts) | 15.4s | Error: visible related items heading |
| DSR-ARTICLE-025 | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | pass | 7.5s | — |
| DSR-ARTICLE-009 | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | pass | 9.3s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-001 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-004 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-005 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-021 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-032 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-030 [ja] | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-031 [ja] | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-017 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 (helix-query.yaml) / Q7 |
| DSR-ARTICLE-018 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; NEW period Q6 |
| DSR-ARTICLE-019 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; TD-529-04 not seeded |
| DSR-ARTICLE-022 [ja] | Blocked: 製品index relatedArticles/sortOrder not defined – 製品詳細 ticket (Martin prereq #3) |
| DSR-ARTICLE-027 [ja] | Blocked: Article list DSR-170 (out of scope) + stories index |
| DSR-ARTICLE-028 [ja] | Blocked: Martin open decision #4 (breadcrumb in scope?) + DSR-552 – Q9 |
| DSR-ARTICLE-029 [cn] | Blocked: no /master/cn on DEV (Issue #18) – all cn rows |
| DSR-ARTICLE-026 [ja] | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 [en] | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |

## 6. Failed tests

### DSR-ARTICLE-002 [ja] — blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 34)
- Expected vs actual: missing subtitle/articleImage/description/relatedStories; empty image block (h=0); 3 console 404 = related-card DAM images. relatedStories "missing" is a test-locator gap (block renders as related-articles)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 90% (PEND-529-01)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-002_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-006 [ja] — info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 61)
- Expected vs actual: 0 tag chips; 2 article:tag metas authored (do-not-translate, site:product/bio-based); info bar has no tag element
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09 (conf 85→90 per 529-decision). Proposed suspect: product, cause none, confidence 90% (BUG-3)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-006_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-007 [ja] — info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 70)
- Expected vs actual: shown 2026/10/01; no published-date meta (page has publicationdate=2026-10-01T00:00:00.000Z)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 60% (BUG-6 / BUG-2)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-007_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-010 [ja] — meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 94)
- Expected vs actual: published-date/updated-date metas absent; page has publicationdate / updatedate instead
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 70% (BUG-2)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-010_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-011 [ja] — meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 110)
- Expected vs actual: thumbnail still relative /content/dam/... and GET on .live = 404 text/html
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 90% (BUG-4)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-011_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-012 [ja] — meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 125)
- Expected vs actual: no category meta (tags only as article:tag); keywords in searchkeywords, not search-keywords
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 70% (BUG-2)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-012_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-014 [ja] — title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 151)
- Expected vs actual: published-date + category count 0 (first soft fail shown)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 70% (BUG-2)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-014_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-016 [ja] — robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 167)
- Expected vs actual: qa529-01 robots still "noindex, nofollow" after republish; qa529-02 ja has no robots meta and was not republished (published-time 2026-10-19T15:31Z)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: data, cause none, confidence 50% (–)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-016_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-024 [ja] — VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 183)
- Expected vs actual: VIEW ALL STORIES and お問い合わせ hrefs = "#" (targets undecided A8/Q8)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: test, cause none, confidence 50% (–)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-024_ja.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-002 [en] — blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 34)
- Expected vs actual: missing subtitle/articleImage/description/relatedStories; empty image block (h=0); 3 console 404 = related-card DAM images. relatedStories "missing" is a test-locator gap (block renders as related-articles)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 90% (PEND-529-01)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-002_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-006 [en] — info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 61)
- Expected vs actual: 0 tag chips; 2 article:tag metas authored (do-not-translate, site:product/bio-based); info bar has no tag element
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09 (conf 85→90 per 529-decision). Proposed suspect: product, cause none, confidence 90% (BUG-3)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-006_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-007 [en] — info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 70)
- Expected vs actual: shown 2026/10/01; no published-date meta (page has publicationdate=2026-10-01T00:00:00.000Z)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 60% (BUG-6 / BUG-2)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-007_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-010 [en] — meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 94)
- Expected vs actual: published-date/updated-date metas absent; page has publicationdate / updatedate instead
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 70% (BUG-2)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-010_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-011 [en] — meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 110)
- Expected vs actual: thumbnail still relative /content/dam/... and GET on .live = 404 text/html
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 90% (BUG-4)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-011_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-012 [en] — meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 125)
- Expected vs actual: no category meta (tags only as article:tag); keywords in searchkeywords, not search-keywords
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 70% (BUG-2)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-012_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-014 [en] — title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 151)
- Expected vs actual: published-date + category count 0 (first soft fail shown)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: product, cause none, confidence 70% (BUG-2)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-014_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-016 [en] — robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 167)
- Expected vs actual: qa529-01 robots still "noindex, nofollow" after republish; qa529-02 ja has no robots meta and was not republished (published-time 2026-10-19T15:31Z)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: data, cause none, confidence 50% (–)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-016_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-024 [en] — VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 183)
- Expected vs actual: VIEW ALL STORIES and お問い合わせ hrefs = "#" (targets undecided A8/Q8)
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: test, cause none, confidence 50% (–)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-024_en.png (committed); test-results/j10/… (not committed)

### DSR-ARTICLE-023 [ja] — no related items block/heading when 0 results (トルツメ)

- Failing assertion: `Error: visible related items heading` — `tests/article-detail/DSR-529.article-detail.spec.ts` (test at line 260)
- Expected vs actual: qa529-02 related-product block shows 4 items + visible heading; TC precondition "0 results" not met
- Attempt(s): initial fail, retry #1 fail. vs JOB-20261020-09: same fail as JOB-09. Proposed suspect: test, cause none, confidence 50% (–)
- Evidence paths: ykk-dsr/hub/results/JOB-20261020-10/evidence/DSR-ARTICLE-023_ja.png (committed); test-results/j10/… (not committed)
Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs. Copies of the last-attempt failure screenshots are committed under ykk-dsr/hub/results/JOB-20261020-10/evidence/.

## 7. Open points for QA

- **Raw values (job focus), from curl of the raw HTML and a browser probe at about 16:25Z.**
  - ARTICLE-003/029: `<title>` and h1 = "QA529 ストーリー詳細テスト" / "QA529 Story detail test". "QA529 ナビ/Nav" no longer appears anywhere in the body. The breadcrumb last item = the page title. BUG-1 was a data error.
  - ARTICLE-006/012: 0 tag chips in `.article-meta` (no tag element in its HTML). There are 2 `article:tag` metas (`do-not-translate`, `site:product/bio-based`) and no `category`/`tags` meta.
  - ARTICLE-013: related-stories = `/master/{lang}/library/article/stories/qa529-r1, …-r2, …-r3` (full paths). BUG-5 was a data error.
  - ARTICLE-016: robots on qa529-01 is `noindex, nofollow` (ja and en), although both were republished after 12:00Z. qa529-02 ja has no robots meta.
  - ARTICLE-011: thumbnail is still relative (`/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png` ja, `…/highres-photo-4000x3000.png` en), and GET on .live returns 404 text/html. og:image is absolute (dev-eds.ykkdigitalshowroom.com media_…, 200 in ARTICLE-015).
  - ARTICLE-002: ja has 2 `image` blocks: one 640 px with media_1b1b7cd…png, and one with height 0 and no img. en has 1 `image` block with height 0 and no img, so it has no article image. subtitle and description blocks are not present.
- **TD-529-fix "related stories images not shown" is confirmed.** The related-articles block renders 3 cards with correct hrefs, titles and dates (NEW on r1). All 3 card images are relative `/content/dam/…png?width=750…` paths that return 404 on .live (naturalWidth 0), and these are the 3 console 404s in ARTICLE-002. This looks like the same root cause as BUG-4.
- **Test-side gaps.** ARTICLE-002 and the PageObject look for `related-stories`, but the block name is `related-articles`, so block 12 is reported "missing" even though it renders. ARTICLE-017..019 stay skipped (stories index). I did not change the code (run-only job).
- **ARTICLE-016 is not verified on Author.** I cannot tell whether QA-PT's robots change was saved or published (qa529-02 was not republished). Tagged suspect data.
- **Other observations, not judged.**
  - ja `og:image:secure_url` (media_1b1b7cd…) differs from `og:image` (media_125138b…).
  - The en page shows Japanese UI labels (マイリストに追加, シェア, お問い合わせ).
  - Meta names are `publicationdate` / `updatedate` / `searchkeywords` instead of `published-date` / `updated-date` / `search-keywords` (BUG-2).
- **BUG-2 answer not checked.** I did not check Jira for Martin's BUG-2 answer, so confidence stays at 70%.
