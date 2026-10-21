# DSR-529 DEV automation run — 20261021-job04

## 1. Header

- Run start (UTC): 2026-10-21T09:12:45Z
- Run end (UTC): 2026-10-21T09:16:33Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01, /master/ja/library/article/stories/qa529-02
- Build under test: not independently verified (EDS .aem.live, branch `main`)
- Baseline ID: BL-v1 (docs/DSR-529/baseline-BL-v1.md) + Martin 21/10 meta-name decision (ykk-dsr/hub/bugs/529-decision-20261021.md, update 15:55), applied in JOB-20261021-04
- Automation HEAD commit SHA: 17469cfbe29e9561061406b9e29ea35e2ee00b49 + uncommitted spec/fixture changes from this job (committed together with this report)
- Exact command used:

```sh
ENV=dev PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j04.json npx playwright test tests/article-detail/DSR-529.article-detail.spec.ts --output test-results/j04 --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 48 | 16 | 17 | 15 | 1 | 1 | configured 1; 17 tests retried, all failed again | 3m 46s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset, DSR-529 spec only; chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = sum of all attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 [ja] | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail | 6.5s | required blocks missing | infoBar before body | empty blocks | console errors (product, DSR-657) |
| DSR-ARTICLE-003 [ja] | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | pass | 2.3s | — |
| DSR-ARTICLE-006 [ja] | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | fail | 5.6s | tag labels (product, DSR-658) |
| DSR-ARTICLE-007 [ja] | DSR-ARTICLE-007 [ja] info bar date = meta publicationdate | pass | 2.2s | — |
| DSR-ARTICLE-008 [ja] | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 2.2s | — |
| DSR-ARTICLE-010 [ja] | DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 1.7s | — |
| DSR-ARTICLE-011 [ja] | DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail | 4.7s | absolute URL (product, DSR-659) |
| DSR-ARTICLE-012 [ja] | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 4.7s | category meta count | category tag IDs (data, -) |
| DSR-ARTICLE-013 [ja] | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | pass | 2.2s | — |
| DSR-ARTICLE-014 [ja] | DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | fail | 4.9s | category count | category non-empty (data, -) |
| DSR-ARTICLE-016 [ja] | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail | 7.9s | qa529-01 robots | qa529-02 robots | qa529-02 robots (data, -) |
| DSR-ARTICLE-024 [ja] | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 4.9s | viewAllStories href | contact href (test, -) |
| DSR-ARTICLE-028 [ja] | DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link | fail | 4.6s | last item = navtitle (data, -) |
| DSR-ARTICLE-029 [ja] | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | pass | 2.0s | — |
| DSR-ARTICLE-002 [en] | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail | 6.1s | required blocks missing | infoBar before body | empty blocks | console errors (product, DSR-657) |
| DSR-ARTICLE-003 [en] | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | pass | 1.9s | — |
| DSR-ARTICLE-006 [en] | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | fail | 4.3s | tag labels (product, DSR-658) |
| DSR-ARTICLE-007 [en] | DSR-ARTICLE-007 [en] info bar date = meta publicationdate | pass | 1.8s | — |
| DSR-ARTICLE-008 [en] | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 1.8s | — |
| DSR-ARTICLE-010 [en] | DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 1.6s | — |
| DSR-ARTICLE-011 [en] | DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail | 4.4s | absolute URL (product, DSR-659) |
| DSR-ARTICLE-012 [en] | DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 4.7s | category meta count | category tag IDs (data, -) |
| DSR-ARTICLE-013 [en] | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | pass | 9.0s | — |
| DSR-ARTICLE-014 [en] | DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | fail | 16.9s | category count | category non-empty (data, -) |
| DSR-ARTICLE-016 [en] | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail | 16.1s | qa529-01 robots (data, -) |
| DSR-ARTICLE-024 [en] | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 15.3s | viewAllStories href | contact href (test, -) |
| DSR-ARTICLE-028 [en] | DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link | fail | 4.6s | last item = navtitle (data, -) |
| DSR-ARTICLE-029 [en] | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | pass | 2.0s | — |
| DSR-ARTICLE-015 [ja] | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | pass | 2.4s | — |
| DSR-ARTICLE-020 [ja] | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | pass | 1.9s | — |
| DSR-ARTICLE-023 [ja] | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | fail | 4.9s | visible related items heading (test, -) |
| DSR-ARTICLE-025 [ja] | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | pass | 2.2s | — |
| DSR-ARTICLE-009 [ja] | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | pass | 3.9s | — |

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
| DSR-ARTICLE-029 [cn] | Blocked: no /master/cn on DEV (Issue #18) – all cn rows |
| DSR-ARTICLE-026 [ja] | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 [en] | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |

## 6. Failed tests

### DSR-ARTICLE-002 [ja] — DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion(s): required blocks missing | infoBar before body | empty blocks | console errors — `tests/article-detail/DSR-529.article-detail.spec.ts:35` (test start line)
- Expected: see baseline row DSR-ARTICLE-002 (with 21/10 meta names)
- Actual: missing subtitle/articleImage/description; empty image block (h=0); infoBar not before body; 3 console 404 (related-card DAM images, DSR-659). Raw: `[{"present": [{"name": "title", "count": 1}, {"name": "subtitle", "count": 0}, {"name": "articleImage", "count": 0}, {"name": "description", "count": 0}, {"name": "infoBar", "count": 1}, {"name": "body", "count": 3}, {"name": "profile", "count": 7}, {"name": "relatedStories", "count": 1}, {"name": "relatedItems", "count": 0}, {"name": "footerAction", "count": 1}], "emptyBlocks": ["image block"], "`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-002_ja.png
- Proposed classification: suspect product, cause none, confidence 90%, ref DSR-657

### DSR-ARTICLE-006 [ja] — DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion(s): tag labels — `tests/article-detail/DSR-529.article-detail.spec.ts:62` (test start line)
- Expected: see baseline row DSR-ARTICLE-006 (with 21/10 meta names)
- Actual: 0 tag chips; 2 article:tag metas (do-not-translate, site:product/bio-based). Raw: `[{"labels": [], "note": "label language = page language is assumption A5 / Q5"}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-006_ja.png
- Proposed classification: suspect product, cause none, confidence 90%, ref DSR-658

### DSR-ARTICLE-011 [ja] — DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion(s): absolute URL — `tests/article-detail/DSR-529.article-detail.spec.ts:111` (test start line)
- Expected: see baseline row DSR-ARTICLE-011 (with 21/10 meta names)
- Actual: thumbnail meta is relative /content/dam/... path. Raw: `[{"thumbnail": ["/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png"]}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-011_ja.png
- Proposed classification: suspect product, cause none, confidence 90%, ref DSR-659

### DSR-ARTICLE-012 [ja] — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion(s): category meta count | category tag IDs — `tests/article-detail/DSR-529.article-detail.spec.ts:126` (test start line)
- Expected: see baseline row DSR-ARTICLE-012 (with 21/10 meta names)
- Actual: no category meta; qa529-01 not republished after Night 21/10 0b (published-time 20/10). Raw: `[{"category": [], "keywords": "qa529kw1, qa529kw2", "categoryAuthored": true}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-8b907-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-012_ja.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-014 [ja] — DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty

- Failing assertion(s): category count | category non-empty — `tests/article-detail/DSR-529.article-detail.spec.ts:158` (test start line)
- Expected: see baseline row DSR-ARTICLE-014 (with 21/10 meta names)
- Actual: category count 0 (same cause as 012); other metas OK. Raw: `[{"counts": {"title": ["QA529 ストーリー詳細テスト"], "description": ["QA529 説明 ja"], "og:title": ["QA529 OGPタイトル"], "og:description": ["QA529 OGP説明"], "og:image": ["https://dev-eds.ykkdigitalshowroom.com/master/ja/library/article/stories/media_125138bf052d9d483ebc4bd3b9ec7dda2cfd566c5.png?width=1200&format=pjpg&optimize=medium"], "publicationdate": ["2026-10-01T00:00:00.000Z"], "thumbnail": ["/content/dam/`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-00408-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-014_ja.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-016 [ja] — DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion(s): qa529-01 robots | qa529-02 robots | qa529-02 robots — `tests/article-detail/DSR-529.article-detail.spec.ts:174` (test start line)
- Expected: see baseline row DSR-ARTICLE-016 (with 21/10 meta names)
- Actual: same as JOB-10: qa529-01 noindex,nofollow; qa529-02 no robots. Raw: `[{"page": "qa529-01", "robots": ["noindex, nofollow"]}, {"language": "ja", "path": "/master/ja/library/article/stories/qa529-02", "url": "https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/library/article/stories/qa529-02", "status": 200}, {"page": "qa529-02", "robots": ""}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-016_ja.png
- Proposed classification: suspect data, cause none, confidence 50%, ref -

### DSR-ARTICLE-024 [ja] — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion(s): viewAllStories href | contact href — `tests/article-detail/DSR-529.article-detail.spec.ts:190` (test start line)
- Expected: see baseline row DSR-ARTICLE-024 (with 21/10 meta names)
- Actual: same as JOB-10: VIEW ALL STORIES / Contact href "#" (targets undecided A8/Q8). Raw: `[{"viewAllStories": {"text": "VIEW ALL STORIES", "href": "#", "note": "targets undecided (A8 / Q8) – not judged"}}, {"contact": {"text": "お問い合わせ", "href": "#", "note": "targets undecided (A8 / Q8) – not judged"}}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-024_ja.png
- Proposed classification: suspect test, cause none, confidence 50%, ref -

### DSR-ARTICLE-028 [ja] — DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link

- Failing assertion(s): last item = navtitle — `tests/article-detail/DSR-529.article-detail.spec.ts:225` (test start line)
- Expected: see baseline row DSR-ARTICLE-028 (with 21/10 meta names)
- Actual: last item = page title (fallback), not navtitle; navtitle set in Night 21/10 0b, page not republished since. Raw: `[{"items": [{"text": "HOME", "href": "/master/ja"}, {"text": "Library", "href": "/master/ja/library"}, {"text": "Article", "href": "/master/ja/library/article"}, {"text": "Stories", "href": "/master/ja/library/article/stories"}, {"text": "QA529 ストーリー詳細テスト", "href": null}], "expectedLast": "QA529 ナビ", "fallback": "QA529 ストーリー詳細テスト", "note": "navtitle authored in UE Page properties (Night 21/10 0b);`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-d283c--no-link-earlier-items-link-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-028_ja.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-002 [en] — DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion(s): required blocks missing | infoBar before body | empty blocks | console errors — `tests/article-detail/DSR-529.article-detail.spec.ts:35` (test start line)
- Expected: see baseline row DSR-ARTICLE-002 (with 21/10 meta names)
- Actual: missing subtitle/articleImage/description; empty image block (h=0); infoBar not before body; 3 console 404 (related-card DAM images, DSR-659). Raw: `[{"present": [{"name": "title", "count": 1}, {"name": "subtitle", "count": 0}, {"name": "articleImage", "count": 0}, {"name": "description", "count": 0}, {"name": "infoBar", "count": 1}, {"name": "body", "count": 3}, {"name": "profile", "count": 7}, {"name": "relatedStories", "count": 1}, {"name": "relatedItems", "count": 0}, {"name": "footerAction", "count": 1}], "emptyBlocks": ["image block"], "`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-002_en.png
- Proposed classification: suspect product, cause none, confidence 90%, ref DSR-657

### DSR-ARTICLE-006 [en] — DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion(s): tag labels — `tests/article-detail/DSR-529.article-detail.spec.ts:62` (test start line)
- Expected: see baseline row DSR-ARTICLE-006 (with 21/10 meta names)
- Actual: 0 tag chips; 2 article:tag metas (do-not-translate, site:product/bio-based). Raw: `[{"labels": [], "note": "label language = page language is assumption A5 / Q5"}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-006_en.png
- Proposed classification: suspect product, cause none, confidence 90%, ref DSR-658

### DSR-ARTICLE-011 [en] — DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion(s): absolute URL — `tests/article-detail/DSR-529.article-detail.spec.ts:111` (test start line)
- Expected: see baseline row DSR-ARTICLE-011 (with 21/10 meta names)
- Actual: thumbnail meta is relative /content/dam/... path. Raw: `[{"thumbnail": ["/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png"]}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-011_en.png
- Proposed classification: suspect product, cause none, confidence 90%, ref DSR-659

### DSR-ARTICLE-012 [en] — DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion(s): category meta count | category tag IDs — `tests/article-detail/DSR-529.article-detail.spec.ts:126` (test start line)
- Expected: see baseline row DSR-ARTICLE-012 (with 21/10 meta names)
- Actual: no category meta; qa529-01 not republished after Night 21/10 0b (published-time 20/10). Raw: `[{"category": [], "keywords": "qa529kw1, qa529kw2", "categoryAuthored": true}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-3ce31-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-012_en.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-014 [en] — DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty

- Failing assertion(s): category count | category non-empty — `tests/article-detail/DSR-529.article-detail.spec.ts:158` (test start line)
- Expected: see baseline row DSR-ARTICLE-014 (with 21/10 meta names)
- Actual: category count 0 (same cause as 012); other metas OK. Raw: `[{"counts": {"title": ["QA529 Story detail test"], "description": ["QA529 description en"], "og:title": ["QA529 OGP title"], "og:description": ["QA529 OGP description"], "og:image": ["https://dev-eds.ykkdigitalshowroom.com/master/en/library/article/stories/media_14f6ec45300969a41023acb94fb0df63487cafec8.png?width=1200&format=pjpg&optimize=medium"], "publicationdate": ["2026-10-01T00:00:00.000Z"], `
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-856a2-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-014_en.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-016 [en] — DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion(s): qa529-01 robots — `tests/article-detail/DSR-529.article-detail.spec.ts:174` (test start line)
- Expected: see baseline row DSR-ARTICLE-016 (with 21/10 meta names)
- Actual: same as JOB-10: qa529-01 noindex,nofollow; qa529-02 no robots. Raw: `[{"page": "qa529-01", "robots": ["noindex, nofollow"]}, {"note": "qa529-02 not in TD for en (TD-529-02 is ja only) – full-page part only"}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-016_en.png
- Proposed classification: suspect data, cause none, confidence 50%, ref -

### DSR-ARTICLE-024 [en] — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion(s): viewAllStories href | contact href — `tests/article-detail/DSR-529.article-detail.spec.ts:190` (test start line)
- Expected: see baseline row DSR-ARTICLE-024 (with 21/10 meta names)
- Actual: same as JOB-10: VIEW ALL STORIES / Contact href "#" (targets undecided A8/Q8). Raw: `[{"viewAllStories": {"text": "VIEW ALL STORIES", "href": "#", "note": "targets undecided (A8 / Q8) – not judged"}}, {"contact": {"text": "お問い合わせ", "href": "#", "note": "targets undecided (A8 / Q8) – not judged"}}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-024_en.png
- Proposed classification: suspect test, cause none, confidence 50%, ref -

### DSR-ARTICLE-028 [en] — DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link

- Failing assertion(s): last item = navtitle — `tests/article-detail/DSR-529.article-detail.spec.ts:225` (test start line)
- Expected: see baseline row DSR-ARTICLE-028 (with 21/10 meta names)
- Actual: last item = page title (fallback), not navtitle; navtitle set in Night 21/10 0b, page not republished since. Raw: `[{"items": [{"text": "HOME", "href": "/master/en"}, {"text": "Library", "href": "/master/en/library"}, {"text": "Article", "href": "/master/en/library/article"}, {"text": "Stories", "href": "/master/en/library/article/stories"}, {"text": "QA529 Story detail test", "href": null}], "expectedLast": "QA529 Nav", "fallback": "QA529 Story detail test", "note": "navtitle authored in UE Page properties (N`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-f0bec--no-link-earlier-items-link-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-028_en.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-023 [ja] — DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion(s): visible related items heading — `tests/article-detail/DSR-529.article-detail.spec.ts:280` (test start line)
- Expected: see baseline row DSR-ARTICLE-023 (with 21/10 meta names)
- Actual: same as JOB-10: related-items heading visible (h=32) with no block. Raw: `[{"relatedItemsBlocks": [], "headings": [{"visible": true, "height": 32.390625}]}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j04/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-04/evidence/DSR-ARTICLE-023_ja.png
- Proposed classification: suspect test, cause none, confidence 50%, ref -

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- **DSR-ARTICLE-007 passes, but the job expected a DSR-660 fail.** The spec never asserted the YYYY.MM.DD format: it only records it (`expectedFormat: 'YYYY.MM.DD (A4 / Q4 open – format recorded only)'`). The job said to keep that assertion as is, so I did not add one. Shown date is `2026/10/01` (ja and en), which does not match the YYYY.MM.DD standard (BUG-RULES §6, DSR-660). To make 007 catch DSR-660, a format assertion needs to be added. Claude-web should decide that.
- 012/014 (category) and 028 (navtitle) fail because the published page predates Night 21/10 0b. qa529-01 published-time is ja 2026-10-20T15:38:30Z and en 2026-10-20T12:56:13Z. I did not check in Author whether 0b ran. Rerun after the pages are republished.
- 028 is newly automated. It expects the last breadcrumb item to be td01.navTitle ('QA529 ナビ' / 'QA529 Nav'). It does not pass on the fallback title, because TD-529-01 has navtitle authored.
- 026 skipped: no stories query-index returns 200, so the renamed properties are not exercised yet.
- Related block locator (`related-articles`) was already fixed in JOB-ZZ-IDLE-19 (pages/ArticleDetailPage.ts). This run confirms it: 002 counts relatedStories = 1, and 020 passes.
- Not verified: build identity, Author state, Jira status of DSR-657/658/659/660.
