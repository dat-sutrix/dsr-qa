# DSR-529 DEV automation run — 20261020-rerun2

JOB-20261019-02 run 2: the job requires failures to run twice. The same 25 tests failed again, on the same assertions with the same observed values. No test changed outcome.

## 1. Header

- Run start (UTC): 2026-10-20T01:00:40Z
- Run end (UTC): 2026-10-20T01:06:16Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01 (TD-529-01), /master/ja/library/article/stories/qa529-02 (TD-529-02); no test-space fallback
- Build under test: not independently verified (no build ID exposed). Pages published 2026-10-19 (`published-time` meta 2026-10-19T15:30–15:31Z)
- Baseline ID: BL-v1 (docs/DSR-529/baseline-BL-v1.md)
- Automation HEAD commit SHA: 37eb49f0726b89273646c1fe49c8e0e0f968662d (+ uncommitted fixture/spec change that removes the test-space fallback; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job19-02-run2.json npm run test:dev -- tests/article-detail --last-failed
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 25 | 0 | 25 | 0 | 1 | 1 (config 2; one file) | 1 configured; 25 used | 5.6m |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: rerun of the 25 run-1 failures (`--last-failed`); chromium only. Flaky outcomes: 0 (every failure failed on both attempts).

## 4. Executed tests

Duration = initial + retry #1 attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 [ja] | blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail (proposed) | 11.8s (3.2 + 8.6) | Selectors for blocks 4/5/6/12 unconfirmed; an empty image block is in the DOM |
| DSR-ARTICLE-002 [en] | blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail (proposed) | 11.8s (3.2 + 8.6) | Selectors for blocks 4/5/6/12 unconfirmed; an empty image block is in the DOM |
| DSR-ARTICLE-003 [ja] | title block = TD title, one h1, <title> = title | fail (proposed) | 24.6s (16.6 + 8.0) | h1/<title> shows navTitle, not title |
| DSR-ARTICLE-003 [en] | title block = TD title, one h1, <title> = title | fail (proposed) | 19.5s (8.5 + 11.0) | h1/<title> shows navTitle, not title |
| DSR-ARTICLE-006 [ja] | info bar shows 2 tag labels, not raw tag IDs | fail (proposed) | 14.8s (7.4 + 7.4) | No tag labels rendered in info bar |
| DSR-ARTICLE-006 [en] | info bar shows 2 tag labels, not raw tag IDs | fail (proposed) | 17.6s (8.9 + 8.8) | No tag labels rendered in info bar |
| DSR-ARTICLE-007 [ja] | info bar date = meta published-date | fail (proposed) | 18.6s (8.9 + 9.7) | No `published-date` meta; `publicationdate` served instead |
| DSR-ARTICLE-007 [en] | info bar date = meta published-date | fail (proposed) | 10.8s (8.8 + 1.9) | No `published-date` meta; `publicationdate` served instead |
| DSR-ARTICLE-010 [ja] | meta published-date / updated-date ISO 8601, one each; update date not visible | fail (proposed) | 18.2s (8.9 + 9.2) | Meta names differ from spec (`publicationdate` / `updatedate`) |
| DSR-ARTICLE-010 [en] | meta published-date / updated-date ISO 8601, one each; update date not visible | fail (proposed) | 6.7s (2.2 + 4.5) | Meta names differ from spec (`publicationdate` / `updatedate`) |
| DSR-ARTICLE-011 [ja] | meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail (proposed) | 17.7s (8.8 + 8.9) | Thumbnail meta is a relative DAM path |
| DSR-ARTICLE-011 [en] | meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail (proposed) | 4.8s (2.4 + 2.4) | Thumbnail meta is a relative DAM path |
| DSR-ARTICLE-012 [ja] | meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | fail (proposed) | 9.2s (7.0 + 2.2) | No `category` meta; keywords served as `searchkeywords` |
| DSR-ARTICLE-012 [en] | meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | fail (proposed) | 4.7s (2.4 + 2.2) | No `category` meta; keywords served as `searchkeywords` |
| DSR-ARTICLE-013 [ja] | meta related-stories = r1,r2,r3 in order | fail (proposed) | 5.4s (2.4 + 3.0) | related-stories holds bare names, not paths; en order r1,r3,r2 |
| DSR-ARTICLE-013 [en] | meta related-stories = r1,r2,r3 in order | fail (proposed) | 4.5s (1.9 + 2.6) | related-stories holds bare names, not paths; en order r1,r3,r2 |
| DSR-ARTICLE-014 [ja] | title/description/OGP/published-date/thumbnail/category exactly once, non-empty | fail (proposed) | 4.7s (2.6 + 2.1) | No `published-date` / `category` meta |
| DSR-ARTICLE-014 [en] | title/description/OGP/published-date/thumbnail/category exactly once, non-empty | fail (proposed) | 5.3s (2.8 + 2.5) | No `published-date` / `category` meta |
| DSR-ARTICLE-016 [ja] | robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail (proposed) | 6.5s (3.3 + 3.2) | robots values look swapped between qa529-01 and qa529-02 |
| DSR-ARTICLE-016 [en] | robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail (proposed) | 4.2s (2.0 + 2.2) | robots values look swapped between qa529-01 and qa529-02 |
| DSR-ARTICLE-024 [ja] | VIEW ALL STORIES + Contact visible; hrefs recorded | fail (proposed) | 4.4s (2.2 + 2.1) | Both footer action hrefs are "#" |
| DSR-ARTICLE-024 [en] | VIEW ALL STORIES + Contact visible; hrefs recorded | fail (proposed) | 4.2s (2.2 + 1.9) | Both footer action hrefs are "#" |
| DSR-ARTICLE-029 [ja] | language page: 200, title/info bar in ja, <html lang>=ja | fail (proposed) | 14.1s (7.2 + 7.0) | h1 shows navTitle, not title |
| DSR-ARTICLE-029 [en] | language page: 200, title/info bar in en, <html lang>=en | fail (proposed) | 16.3s (7.9 + 8.4) | h1 shows navTitle, not title |
| DSR-ARTICLE-023 [ja] | no related items block/heading when 0 results (トルツメ) | fail (proposed) | 5.5s (2.8 + 2.7) | qa529-02 shows a related items block with 4 items |

## 5. Skipped tests

None (rerun of the 25 failed tests only).

## 6. Failed tests

### DSR-ARTICLE-002 [ja] — blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `required blocks missing` (L42), `infoBar before body` (L45), `empty blocks` (L47) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: missing = [] ; each present block before the next ; no empty block
- Actual: missing subtitle, articleImage, description, relatedStories (selectors find 0; DOM block names: breadcrumb, article-title, text, image, text, [image], article-meta, text, profile, related-product, footer-actions); body (`.text.block`) matches text blocks above article-meta; empty `image block` present (ja: 2nd image block empty; en: only image block empty)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-002_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-002 [en] — blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `required blocks missing` (L42), `infoBar before body` (L45), `empty blocks` (L47) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: missing = [] ; each present block before the next ; no empty block
- Actual: missing subtitle, articleImage, description, relatedStories (selectors find 0; DOM block names: breadcrumb, article-title, text, image, text, [image], article-meta, text, profile, related-product, footer-actions); body (`.text.block`) matches text blocks above article-meta; empty `image block` present (ja: 2nd image block empty; en: only image block empty)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-002_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-003 [ja] — title block = TD title, one h1, <title> = title

- Failing assertion: `expect.soft(info.text).toBe(td01.title)` (L56), `<title>` (L58) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: h1 = <title> = "QA529 ストーリー詳細テスト" (ja) / "QA529 Story detail test" (en)
- Actual: h1 = <title> = "QA529 ナビ" (ja) / "QA529 Nav" (en), i.e. the TD navTitle; one h1, no image
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-003_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-003 [en] — title block = TD title, one h1, <title> = title

- Failing assertion: `expect.soft(info.text).toBe(td01.title)` (L56), `<title>` (L58) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: h1 = <title> = "QA529 ストーリー詳細テスト" (ja) / "QA529 Story detail test" (en)
- Actual: h1 = <title> = "QA529 ナビ" (ja) / "QA529 Nav" (en), i.e. the TD navTitle; one h1, no image
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-003_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-006 [ja] — info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `tag labels` toHaveLength(2) (L65) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: 2 tag labels in info bar
- Actual: 0 labels; info bar text = date, マイリストに追加, シェア only. Raw HTML has `article:tag` = do-not-translate, site:product/bio-based
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-006_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-006 [en] — info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `tag labels` toHaveLength(2) (L65) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: 2 tag labels in info bar
- Actual: 0 labels; info bar text = date, マイリストに追加, シェア only. Raw HTML has `article:tag` = do-not-translate, site:product/bio-based
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-006_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-007 [ja] — info bar date = meta published-date

- Failing assertion: `expect(isoDate(shown)).toBe(isoDate(meta))` (L77) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: shown date = meta published-date
- Actual: shown "2026/10/01" (parsed 2026-10-01); no `published-date` meta (served `publicationdate` = 2026-10-01T00:00:00.000Z)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-007_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-007 [en] — info bar date = meta published-date

- Failing assertion: `expect(isoDate(shown)).toBe(isoDate(meta))` (L77) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: shown date = meta published-date
- Actual: shown "2026/10/01" (parsed 2026-10-01); no `published-date` meta (served `publicationdate` = 2026-10-01T00:00:00.000Z)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-007_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-010 [ja] — meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `published-date count` (L101), `updated-date count` (L102), starts-with/ISO (L104-105) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: one `published-date` (2026-10-01…) and one `updated-date` (2026-10-10…)
- Actual: 0 of each; served names `publicationdate` = 2026-10-01T00:00:00.000Z, `updatedate` = 2026-10-10T00:00:00.000Z
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-010_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-010 [en] — meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `published-date count` (L101), `updated-date count` (L102), starts-with/ISO (L104-105) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: one `published-date` (2026-10-01…) and one `updated-date` (2026-10-10…)
- Actual: 0 of each; served names `publicationdate` = 2026-10-01T00:00:00.000Z, `updatedate` = 2026-10-10T00:00:00.000Z
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-010_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-011 [ja] — meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `absolute URL` (L116) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: thumbnail meta matches ^https?://
- Actual: ja `/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png`; en `/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png` (relative DAM path)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-011_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-011 [en] — meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `absolute URL` (L116) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: thumbnail meta matches ^https?://
- Actual: ja `/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png`; en `/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png` (relative DAM path)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-011_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-012 [ja] — meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `category tag IDs` (L132), `search-keywords has qa529kw1/2` (L134) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: category = 2 tag IDs; search-keywords contains qa529kw1, qa529kw2
- Actual: no `category` meta; no `search-keywords` (served `searchkeywords` = "qa529kw1, qa529kw2")
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-012_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-012 [en] — meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `category tag IDs` (L132), `search-keywords has qa529kw1/2` (L134) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: category = 2 tag IDs; search-keywords contains qa529kw1, qa529kw2
- Actual: no `category` meta; no `search-keywords` (served `searchkeywords` = "qa529kw1, qa529kw2")
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-012_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-013 [ja] — meta related-stories = r1,r2,r3 in order

- Failing assertion: `item N = qa529-rN` (L146), `under /library/article/stories/` (L147) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: 3 paths ending /qa529-r1, -r2, -r3 under /library/article/stories/
- Actual: ja "qa529-r1, qa529-r2, qa529-r3"; en "qa529-r1, qa529-r3, qa529-r2" (bare names, not paths; en order differs)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-013_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-013 [en] — meta related-stories = r1,r2,r3 in order

- Failing assertion: `item N = qa529-rN` (L146), `under /library/article/stories/` (L147) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: 3 paths ending /qa529-r1, -r2, -r3 under /library/article/stories/
- Actual: ja "qa529-r1, qa529-r2, qa529-r3"; en "qa529-r1, qa529-r3, qa529-r2" (bare names, not paths; en order differs)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-013_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-014 [ja] — title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `published-date count` / `category count` + non-empty (L157-158) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: each of 8 keys exactly once, non-empty
- Actual: published-date: 0, category: 0; title, description, og:title, og:description, og:image, thumbnail: 1 each (og:title/og:description = TD values, og:image absolute)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-014_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-014 [en] — title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `published-date count` / `category count` + non-empty (L157-158) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: each of 8 keys exactly once, non-empty
- Actual: published-date: 0, category: 0; title, description, og:title, og:description, og:image, thumbnail: 1 each (og:title/og:description = TD values, og:image absolute)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-014_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-016 [ja] — robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `qa529-01 robots` not noindex (L171); ja also `qa529-02 robots` noindex/nofollow (L179-180) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: qa529-01: no noindex; qa529-02: noindex,nofollow
- Actual: qa529-01 (ja, en) robots = "noindex, nofollow"; qa529-02 (ja) no robots meta
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-016_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-016 [en] — robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `qa529-01 robots` not noindex (L171); ja also `qa529-02 robots` noindex/nofollow (L179-180) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: qa529-01: no noindex; qa529-02: noindex,nofollow
- Actual: qa529-01 (ja, en) robots = "noindex, nofollow"; qa529-02 (ja) no robots meta
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-016_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-024 [ja] — VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `viewAllStories href` / `contact href` not ^#?$ (L190) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: href not empty / "#"
- Actual: VIEW ALL STORIES href "#"; お問い合わせ / Contact href "#"; both visible
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-024_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-024 [en] — VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `viewAllStories href` / `contact href` not ^#?$ (L190) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: href not empty / "#"
- Actual: VIEW ALL STORIES href "#"; お問い合わせ / Contact href "#"; both visible
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-024_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-029 [ja] — language page: 200, title/info bar in ja, <html lang>=ja

- Failing assertion: `toHaveText(td01.title)` on h1 (L223) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: h1 = TD title
- Actual: h1 = "QA529 ナビ" / "QA529 Nav"; `<html lang>` = ja / en OK; info bar visible
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-029_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-029 [en] — language page: 200, title/info bar in en, <html lang>=en

- Failing assertion: `toHaveText(td01.title)` on h1 (L223) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: h1 = TD title
- Actual: h1 = "QA529 ナビ" / "QA529 Nav"; `<html lang>` = ja / en OK; info bar visible
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-029_en.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

### DSR-ARTICLE-023 [ja] — no related items block/heading when 0 results (トルツメ)

- Failing assertion: `visible related items heading` (L266) — `tests/article-detail/DSR-529.article-detail.spec.ts`
- Expected: no related-items block/heading on qa529-02
- Actual: heading 関連アイテム visible (32px); `related-product` block 282px with 4 links (QuickFree® click-TRAK® Magnetic, NATULON® Fiber Sourced®, EXCELLA®, AiryString®). Block locator found 0 (`related-product` not in selector)
- Attempt(s): failed, retry #1 failed
- Evidence paths: ykk-dsr/hub/results/JOB-20261019-02/evidence/DSR-ARTICLE-023_ja.png (committed, copied from run 2); test-results/…/trace.zip, error-context.md (not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Selectors are still unconfirmed guesses (no data-testid list for DSR-529). The DOM block names are breadcrumb, article-title, text, image, text, image, article-meta, text, profile, related-product, footer-actions. Subtitle, description and image are generic `text`/`image` blocks, related items is `related-product`, and **no related-stories block is rendered on qa529-01**. This affects 002, 020 (passed with 0 matches, so the pass may be vacuous) and 023.
- Meta names served differ from BL-v1: `publicationdate`, `updatedate`, `searchkeywords` (spec: published-date, updated-date, search-keywords). There is no `category` meta, `related-stories` holds bare names, and `thumbnail` is a relative DAM path. Expected results were not changed. Claude decides whether this is a product or spec issue (007, 010–014).
- robots looks swapped: qa529-01 (ja, en) = "noindex, nofollow"; qa529-02 has no robots meta. Probably TD authoring (016).
- h1/<title> = navTitle ("QA529 ナビ" / "QA529 Nav"), not the TD title (003, 029).
- en related-stories order is r1, r3, r2 (ja: r1, r2, r3). Possibly TD authoring.
- 024: the test asserts href ≠ "#", but the TC says "record hrefs only (targets undecided)". Both hrefs are "#". Suspect test.
- 023: qa529-02 shows 関連アイテム with 4 products. The TD expects 0 related items; the source is the product index (022 blocked).
- Image issue (QA-PT TD-529-01 Fail): ja qa529-01 has 2 image blocks, the 1st with a picture and the 2nd empty; en has 1 empty image block, so no article image is shown. The og:image media differs from the shown image. Raw data: results/DSR-529/DEV/qa529-01-inventory-20261020.json. No verdict.
- Extra HTTP status: /master/{ja,en}/library/article/stories/qa529-01 = 200; /master/{ja,en}/qa529-01 = 404 (no redirect).
- 026: all three stories query-index candidates returned 404 in both languages, so the test is blocked-data.
