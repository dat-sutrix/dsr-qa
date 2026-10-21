# DSR-529 DEV automation run — 20261021-job07

## 1. Header

- Run start (UTC): 2026-10-21T10:18:06Z
- Run end (UTC): 2026-10-21T10:23:07Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01, /master/ja/library/article/stories/qa529-02
- Build under test: not independently verified (EDS .aem.live, branch `main`). Response `last-modified` (curl/browser, ~10:17Z):

| Resource | last-modified |
|---|---|
| page /master/ja/.../qa529-01 | Tue, 20 Oct 2026 15:38:34 GMT |
| page /master/en/.../qa529-01 | Tue, 20 Oct 2026 12:56:13 GMT |
| /scripts/scripts.js | Mon, 19 Oct 2026 03:10:29 GMT |
| /blocks/article-meta/article-meta.js | Wed, 21 Oct 2026 09:42:41 GMT |
| /blocks/image/image.js | Wed, 21 Oct 2026 09:42:41 GMT |
| /blocks/listing/adapters/normalize.js | Wed, 21 Oct 2026 09:42:41 GMT |
| /blocks/listing/adapters/query-index.js | Wed, 21 Oct 2026 09:42:41 GMT |
| /blocks/related-articles/related-articles.js | Thu, 01 Oct 2026 07:31:25 GMT |
| /blocks/article-title/article-title.js | Thu, 24 Sep 2026 05:17:16 GMT |
| /blocks/article-meta/article-meta.css | Thu, 24 Sep 2026 05:17:16 GMT |

  → merged code (article-meta.js, image.js, listing adapters 09:42:41Z) is live; page HTML not republished since 20/10.
- Baseline ID: BL-v1 (docs/DSR-529/baseline-BL-v1.md) + Martin 21/10 meta-name decision + BUG-RULES §6 date standard YYYY.MM.DD (DSR-660)
- Automation HEAD commit SHA: d0d8ea0aceedfa39e4460c67310b3b1aa0370f62 + uncommitted DSR-ARTICLE-007 spec change from this job (committed together with this report)
- Exact command used:

```sh
ENV=dev PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/j07.json npx playwright test tests/article-detail/DSR-529.article-detail.spec.ts --output test-results/j07 --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 48 | 16 | 17 | 15 | 1 | 2 (config) | configured 1; 17 tests retried, all failed again | 5m 01s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset, DSR-529 spec only; chromium. Flaky outcomes: 0.

### Post-merge bug check (proposals)

| Bug | TC | Proposal | Raw values | cause | confidence (real bug) |
|---|---|---|---|---|---|
| DSR-660 | DSR-ARTICLE-007 | Pass | ja+en shown "2026.10.01"; meta publicationdate 2026-10-01T00:00:00.000Z → expected 2026.10.01 (JOB-04: 2026/10/01) | none | 5% |
| DSR-658 | DSR-ARTICLE-006 | Pass | ja+en: 2 span.article-meta-tag ("do-not-translate", "バイオベース") = 2 article:tag metas (do-not-translate, site:product/bio-based); JOB-04: 0 chips. Spec fails only because locator also matches wrapper div.article-meta-tags (test issue). Open: en shows ja label; "do-not-translate" label = tag value (A5/Q5, data?) | none | 10% |
| DSR-659 | DSR-ARTICLE-011 / 013 | Fail (partial) | related-story card img src absolute https://publish-p192812-e2014374.adobeaemcloud.com/content/dam/... ×3, HTTP 200 image/png ja+en (fixed part). meta thumbnail still relative /content/dam/ykk/digital-showroom/test/png/{gradient-transparent-1920x1080|highres-photo-4000x3000}.png (ja|en), resolves 404 on .aem.live; page HTML last-modified 20/10 (before merge) → may need republish | none | 60% |
| DSR-657 | DSR-ARTICLE-002 | record only (still Fail) | ja: 1 image block h=640, img media_1b1b7cd…png 200 image/webp; en: 0 image blocks; 0 empty blocks, 0 console errors (JOB-04: empty image block, 3× 404); subtitle/articleImage/description still missing (data) | none | 50% |

## 4. Executed tests

Duration = sum of all attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-001 [ja] | DSR-ARTICLE-001 [ja] page creation with article template (Author, BAC#1) | skip | 0.0s | — |
| DSR-ARTICLE-004 [ja] | DSR-ARTICLE-004 [ja] article-specific info not editable in body (Author, BAC#5) | skip | 0.0s | — |
| DSR-ARTICLE-005 [ja] | DSR-ARTICLE-005 [ja] author-editable areas 4/5/6/9/11 (Author, BAC#1) | skip | 0.0s | — |
| DSR-ARTICLE-021 [ja] | DSR-ARTICLE-021 [ja] related stories picker max 3, stories only (Author) | skip | 0.0s | — |
| DSR-ARTICLE-032 [ja] | DSR-ARTICLE-032 [ja] required page properties validation (Author, negative) | skip | 0.0s | — |
| DSR-ARTICLE-030 [ja] | DSR-ARTICLE-030 [ja] visual PC 1440 vs Figma | skip | 0.0s | — |
| DSR-ARTICLE-031 [ja] | DSR-ARTICLE-031 [ja] visual SP 390 vs Figma | skip | 0.0s | — |
| DSR-ARTICLE-017 [ja] | DSR-ARTICLE-017 [ja] related stories cards r1..r3 (block 12) | skip | 0.0s | — |
| DSR-ARTICLE-018 [ja] | DSR-ARTICLE-018 [ja] related stories NEW icon on r1 only | skip | 0.0s | — |
| DSR-ARTICLE-019 [ja] | DSR-ARTICLE-019 [ja] related stories max 3, missing path skipped (qa529-04) | skip | 0.0s | — |
| DSR-ARTICLE-022 [ja] | DSR-ARTICLE-022 [ja] related items cards from product index (block 13) | skip | 0.0s | — |
| DSR-ARTICLE-027 [ja] | DSR-ARTICLE-027 [ja] published article appears in article list | skip | 0.0s | — |
| DSR-ARTICLE-029 [cn] | DSR-ARTICLE-029 [cn] language page (cn) | skip | 0.0s | — |
| DSR-ARTICLE-002 [ja] | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail | 10.6s | required blocks missing | infoBar before body (data, DSR-657) |
| DSR-ARTICLE-003 [ja] | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | pass | 2.4s | — |
| DSR-ARTICLE-006 [ja] | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | fail | 6.7s | tag labels (test, DSR-658) |
| DSR-ARTICLE-007 [ja] | DSR-ARTICLE-007 [ja] info bar date = meta publicationdate, format YYYY.MM.DD | pass | 2.2s | — |
| DSR-ARTICLE-008 [ja] | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 2.4s | — |
| DSR-ARTICLE-010 [ja] | DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 2.5s | — |
| DSR-ARTICLE-011 [ja] | DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail | 6.1s | absolute URL (product, DSR-659) |
| DSR-ARTICLE-012 [ja] | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 7.0s | category meta count | category tag IDs (data, -) |
| DSR-ARTICLE-013 [ja] | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | pass | 6.0s | — |
| DSR-ARTICLE-014 [ja] | DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | fail | 12.3s | category count | category non-empty (data, -) |
| DSR-ARTICLE-016 [ja] | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail | 15.0s | qa529-01 robots | qa529-02 robots | qa529-02 robots (data, -) |
| DSR-ARTICLE-024 [ja] | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 13.3s | viewAllStories href | contact href (test, -) |
| DSR-ARTICLE-026 [ja] | DSR-ARTICLE-026 [ja] stories query-index contains qa529-01 with 6 properties | skip | 9.2s | — |
| DSR-ARTICLE-028 [ja] | DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link | fail | 16.6s | last item = navtitle (data, -) |
| DSR-ARTICLE-029 [ja] | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | pass | 8.0s | — |
| DSR-ARTICLE-002 [en] | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail | 18.2s | required blocks missing | infoBar before body (data, DSR-657) |
| DSR-ARTICLE-003 [en] | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | pass | 2.4s | — |
| DSR-ARTICLE-006 [en] | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | fail | 7.1s | tag labels (test, DSR-658) |
| DSR-ARTICLE-007 [en] | DSR-ARTICLE-007 [en] info bar date = meta publicationdate, format YYYY.MM.DD | pass | 2.3s | — |
| DSR-ARTICLE-008 [en] | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 2.4s | — |
| DSR-ARTICLE-010 [en] | DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 2.4s | — |
| DSR-ARTICLE-011 [en] | DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail | 6.5s | absolute URL (product, DSR-659) |
| DSR-ARTICLE-012 [en] | DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 7.4s | category meta count | category tag IDs (data, -) |
| DSR-ARTICLE-013 [en] | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | pass | 2.1s | — |
| DSR-ARTICLE-014 [en] | DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | fail | 6.8s | category count | category non-empty (data, -) |
| DSR-ARTICLE-016 [en] | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail | 6.6s | qa529-01 robots (data, -) |
| DSR-ARTICLE-024 [en] | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 6.3s | viewAllStories href | contact href (test, -) |
| DSR-ARTICLE-026 [en] | DSR-ARTICLE-026 [en] stories query-index contains qa529-01 with 6 properties | skip | 2.5s | — |
| DSR-ARTICLE-028 [en] | DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link | fail | 6.2s | last item = navtitle (data, -) |
| DSR-ARTICLE-029 [en] | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | pass | 2.5s | — |
| DSR-ARTICLE-015 [ja] | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | pass | 2.4s | — |
| DSR-ARTICLE-020 [ja] | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | pass | 2.2s | — |
| DSR-ARTICLE-023 [ja] | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | fail | 5.3s | visible related items heading (test, -) |
| DSR-ARTICLE-025 [ja] | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | pass | 2.6s | — |
| DSR-ARTICLE-009 [ja] | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | pass | 4.5s | — |

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

- Failing assertion(s): required blocks missing | infoBar before body — `tests/article-detail/DSR-529.article-detail.spec.ts:35` (test start line)
- Expected: see baseline row DSR-ARTICLE-002 (BL-v1 + 21/10 meta names)
- Actual: ja: still missing subtitle/articleImage/description; infoBar not before body. Improved vs JOB-04: 0 empty blocks, 0 console errors. Needs QA-PT data fix (657). Raw: `[{"present": [{"name": "title", "count": 1}, {"name": "subtitle", "count": 0}, {"name": "articleImage", "count": 0}, {"name": "description", "count": 0}, {"name": "infoBar", "count": 1}, {"name": "body", "count": 3}, {"name": "profile", "count": 7}, {"name": "relatedStories", "count": 1}, {"name": "relatedItems", "count": 0}, {"name": "footerAction", "count": 1}], "emptyBlocks": [], "consoleErrors": [], "blockNames": ["breadcrumb", "article-title", "text", "image", "text", "article-meta", "text", "profile", "related-articles", "related-product", "footer-actions"]}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-002_ja.png
- Proposed classification: suspect data, cause none, confidence 50%, ref DSR-657

### DSR-ARTICLE-006 [ja] — DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion(s): tag labels — `tests/article-detail/DSR-529.article-detail.spec.ts:62` (test start line)
- Expected: see baseline row DSR-ARTICLE-006 (BL-v1 + 21/10 meta names)
- Actual: 2 .article-meta-tag chips = 2 article:tag metas (DSR-658 fixed); locator [class*="tag"] also matches wrapper .article-meta-tags → 3. Raw: `[{"labels": ["do-not-translate\nバイオベース", "do-not-translate", "バイオベース"], "note": "label language = page language is assumption A5 / Q5"}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-006_ja.png
- Proposed classification: suspect test, cause none, confidence 10%, ref DSR-658

### DSR-ARTICLE-011 [ja] — DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion(s): absolute URL — `tests/article-detail/DSR-529.article-detail.spec.ts:115` (test start line)
- Expected: see baseline row DSR-ARTICLE-011 (BL-v1 + 21/10 meta names)
- Actual: thumbnail meta still relative /content/dam/... (404 on .aem.live); page not republished since merge, so may need republish. Raw: `[{"thumbnail": ["/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png"]}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-011_ja.png
- Proposed classification: suspect product, cause none, confidence 60%, ref DSR-659

### DSR-ARTICLE-012 [ja] — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion(s): category meta count | category tag IDs — `tests/article-detail/DSR-529.article-detail.spec.ts:130` (test start line)
- Expected: see baseline row DSR-ARTICLE-012 (BL-v1 + 21/10 meta names)
- Actual: no category meta; qa529-01 not republished after Night 21/10 0b. Raw: `[{"category": [], "keywords": "qa529kw1, qa529kw2", "categoryAuthored": true}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-8b907-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-012_ja.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-014 [ja] — DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty

- Failing assertion(s): category count | category non-empty — `tests/article-detail/DSR-529.article-detail.spec.ts:162` (test start line)
- Expected: see baseline row DSR-ARTICLE-014 (BL-v1 + 21/10 meta names)
- Actual: category count 0 (same cause as 012); other metas OK; thumbnail relative (659). Raw: `[{"counts": {"title": ["QA529 ストーリー詳細テスト"], "description": ["QA529 説明 ja"], "og:title": ["QA529 OGPタイトル"], "og:description": ["QA529 OGP説明"], "og:image": ["https://dev-eds.ykkdigitalshowroom.com/master/ja/library/article/stories/media_125138bf052d9d483ebc4bd3b9ec7dda2cfd566c5.png?width=1200&format=pjpg&optimize=medium"], "publicationdate": ["2026-10-01T00:00:00.000Z"], "thumbnail": ["/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png"], "category": []}}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-00408-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-014_ja.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-016 [ja] — DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion(s): qa529-01 robots | qa529-02 robots | qa529-02 robots — `tests/article-detail/DSR-529.article-detail.spec.ts:178` (test start line)
- Expected: see baseline row DSR-ARTICLE-016 (BL-v1 + 21/10 meta names)
- Actual: same as JOB-04: qa529-01 noindex,nofollow; qa529-02 no robots (ja). Raw: `[{"page": "qa529-01", "robots": ["noindex, nofollow"]}, {"language": "ja", "path": "/master/ja/library/article/stories/qa529-02", "url": "https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/library/article/stories/qa529-02", "status": 200}, {"page": "qa529-02", "robots": ""}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-016_ja.png
- Proposed classification: suspect data, cause none, confidence 50%, ref -

### DSR-ARTICLE-024 [ja] — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion(s): viewAllStories href | contact href — `tests/article-detail/DSR-529.article-detail.spec.ts:194` (test start line)
- Expected: see baseline row DSR-ARTICLE-024 (BL-v1 + 21/10 meta names)
- Actual: same as JOB-04: VIEW ALL STORIES / Contact href "#" (targets undecided A8/Q8). Raw: `[{"viewAllStories": {"text": "VIEW ALL STORIES", "href": "#", "note": "targets undecided (A8 / Q8) – not judged"}}, {"contact": {"text": "お問い合わせ", "href": "#", "note": "targets undecided (A8 / Q8) – not judged"}}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-024_ja.png
- Proposed classification: suspect test, cause none, confidence 50%, ref -

### DSR-ARTICLE-028 [ja] — DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link

- Failing assertion(s): last item = navtitle — `tests/article-detail/DSR-529.article-detail.spec.ts:229` (test start line)
- Expected: see baseline row DSR-ARTICLE-028 (BL-v1 + 21/10 meta names)
- Actual: last item = page title (fallback), not navtitle; page not republished since Night 0b. Raw: `[{"items": [{"text": "HOME", "href": "/master/ja"}, {"text": "Library", "href": "/master/ja/library"}, {"text": "Article", "href": "/master/ja/library/article"}, {"text": "Stories", "href": "/master/ja/library/article/stories"}, {"text": "QA529 ストーリー詳細テスト", "href": null}], "expectedLast": "QA529 ナビ", "fallback": "QA529 ストーリー詳細テスト", "note": "navtitle authored in UE Page properties (Night 21/10 0b); fallback = page title"}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-d283c--no-link-earlier-items-link-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-028_ja.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-002 [en] — DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion(s): required blocks missing | infoBar before body — `tests/article-detail/DSR-529.article-detail.spec.ts:35` (test start line)
- Expected: see baseline row DSR-ARTICLE-002 (BL-v1 + 21/10 meta names)
- Actual: en: still missing subtitle/articleImage/description; infoBar not before body. Improved vs JOB-04: 0 empty blocks, 0 console errors. Needs QA-PT data fix (657). Raw: `[{"present": [{"name": "title", "count": 1}, {"name": "subtitle", "count": 0}, {"name": "articleImage", "count": 0}, {"name": "description", "count": 0}, {"name": "infoBar", "count": 1}, {"name": "body", "count": 3}, {"name": "profile", "count": 7}, {"name": "relatedStories", "count": 1}, {"name": "relatedItems", "count": 0}, {"name": "footerAction", "count": 1}], "emptyBlocks": [], "consoleErrors": [], "blockNames": ["breadcrumb", "article-title", "text", "text", "article-meta", "text", "profile", "related-articles", "related-product", "footer-actions"]}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-002_en.png
- Proposed classification: suspect data, cause none, confidence 50%, ref DSR-657

### DSR-ARTICLE-006 [en] — DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion(s): tag labels — `tests/article-detail/DSR-529.article-detail.spec.ts:62` (test start line)
- Expected: see baseline row DSR-ARTICLE-006 (BL-v1 + 21/10 meta names)
- Actual: 2 .article-meta-tag chips = 2 article:tag metas (DSR-658 fixed); locator [class*="tag"] also matches wrapper .article-meta-tags → 3. Raw: `[{"labels": ["do-not-translate\nバイオベース", "do-not-translate", "バイオベース"], "note": "label language = page language is assumption A5 / Q5"}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-006_en.png
- Proposed classification: suspect test, cause none, confidence 10%, ref DSR-658

### DSR-ARTICLE-011 [en] — DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion(s): absolute URL — `tests/article-detail/DSR-529.article-detail.spec.ts:115` (test start line)
- Expected: see baseline row DSR-ARTICLE-011 (BL-v1 + 21/10 meta names)
- Actual: thumbnail meta still relative /content/dam/... (404 on .aem.live); page not republished since merge, so may need republish. Raw: `[{"thumbnail": ["/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png"]}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-011_en.png
- Proposed classification: suspect product, cause none, confidence 60%, ref DSR-659

### DSR-ARTICLE-012 [en] — DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion(s): category meta count | category tag IDs — `tests/article-detail/DSR-529.article-detail.spec.ts:130` (test start line)
- Expected: see baseline row DSR-ARTICLE-012 (BL-v1 + 21/10 meta names)
- Actual: no category meta; qa529-01 not republished after Night 21/10 0b. Raw: `[{"category": [], "keywords": "qa529kw1, qa529kw2", "categoryAuthored": true}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-3ce31-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-012_en.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-014 [en] — DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty

- Failing assertion(s): category count | category non-empty — `tests/article-detail/DSR-529.article-detail.spec.ts:162` (test start line)
- Expected: see baseline row DSR-ARTICLE-014 (BL-v1 + 21/10 meta names)
- Actual: category count 0 (same cause as 012); other metas OK; thumbnail relative (659). Raw: `[{"counts": {"title": ["QA529 Story detail test"], "description": ["QA529 description en"], "og:title": ["QA529 OGP title"], "og:description": ["QA529 OGP description"], "og:image": ["https://dev-eds.ykkdigitalshowroom.com/master/en/library/article/stories/media_14f6ec45300969a41023acb94fb0df63487cafec8.png?width=1200&format=pjpg&optimize=medium"], "publicationdate": ["2026-10-01T00:00:00.000Z"], "thumbnail": ["/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png"], "category": []}}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-856a2-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-014_en.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-016 [en] — DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion(s): qa529-01 robots — `tests/article-detail/DSR-529.article-detail.spec.ts:178` (test start line)
- Expected: see baseline row DSR-ARTICLE-016 (BL-v1 + 21/10 meta names)
- Actual: same as JOB-04: qa529-01 noindex,nofollow; qa529-02 no robots (ja). Raw: `[{"page": "qa529-01", "robots": ["noindex, nofollow"]}, {"note": "qa529-02 not in TD for en (TD-529-02 is ja only) – full-page part only"}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-016_en.png
- Proposed classification: suspect data, cause none, confidence 50%, ref -

### DSR-ARTICLE-024 [en] — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion(s): viewAllStories href | contact href — `tests/article-detail/DSR-529.article-detail.spec.ts:194` (test start line)
- Expected: see baseline row DSR-ARTICLE-024 (BL-v1 + 21/10 meta names)
- Actual: same as JOB-04: VIEW ALL STORIES / Contact href "#" (targets undecided A8/Q8). Raw: `[{"viewAllStories": {"text": "VIEW ALL STORIES", "href": "#", "note": "targets undecided (A8 / Q8) – not judged"}}, {"contact": {"text": "お問い合わせ", "href": "#", "note": "targets undecided (A8 / Q8) – not judged"}}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-024_en.png
- Proposed classification: suspect test, cause none, confidence 50%, ref -

### DSR-ARTICLE-028 [en] — DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link

- Failing assertion(s): last item = navtitle — `tests/article-detail/DSR-529.article-detail.spec.ts:229` (test start line)
- Expected: see baseline row DSR-ARTICLE-028 (BL-v1 + 21/10 meta names)
- Actual: last item = page title (fallback), not navtitle; page not republished since Night 0b. Raw: `[{"items": [{"text": "HOME", "href": "/master/en"}, {"text": "Library", "href": "/master/en/library"}, {"text": "Article", "href": "/master/en/library/article"}, {"text": "Stories", "href": "/master/en/library/article/stories"}, {"text": "QA529 Story detail test", "href": null}], "expectedLast": "QA529 Nav", "fallback": "QA529 Story detail test", "note": "navtitle authored in UE Page properties (Night 21/10 0b); fallback = page title"}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-f0bec--no-link-earlier-items-link-chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-028_en.png
- Proposed classification: suspect data, cause none, confidence 30%, ref -

### DSR-ARTICLE-023 [ja] — DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion(s): visible related items heading — `tests/article-detail/DSR-529.article-detail.spec.ts:284` (test start line)
- Expected: see baseline row DSR-ARTICLE-023 (BL-v1 + 21/10 meta names)
- Actual: same as JOB-04: related items heading visible (h=32) with 0 blocks. Raw: `[{"relatedItemsBlocks": [], "headings": [{"visible": true, "height": 32.390625}]}]`
- Attempt(s): initial fail, retry fail
- Evidence paths: test-results/j07/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium-retry1/test-failed-1.png (not committed); copy at ykk-dsr/hub/results/JOB-20261021-07/evidence/DSR-ARTICLE-023_ja.png
- Proposed classification: suspect test, cause none, confidence 50%, ref -

## 7. Open points for QA

- DSR-ARTICLE-006: tag locator `[class*="tag"]` (pages/ArticleDetailPage.ts:40) also matches wrapper `div.article-meta-tags`; suggest `.article-meta-tag` (+ `// TODO: data-testid article-tag`). Not changed in this job (job scoped the code change to 007).
- DSR-ARTICLE-006: en page shows ja label "バイオベース"; chip "do-not-translate" equals the tag value (no namespace) — A5/Q5 label-language assumption and possibly a data choice; not judged.
- DSR-659 thumbnail meta: cannot separate "fix not working" from "page not republished" until QA-PT republish tonight → JOB-20261021-05.
- DSR-ARTICLE-013 spec checks only the related-stories meta; related-card img src/status was collected with an ad-hoc read-only Playwright probe (same session, ~10:24Z), recorded in result.json `probe_raw`.
- 012/014/016/023/024/028: unchanged vs JOB-20261021-04 (data not republished / test expectation open).
- Not verified: Author state, build/commit identity of the merge, Jira status. DASHBOARD/BUGS/Jira not edited.
- `test-results/` is gitignored; failure screenshots copied to ykk-dsr/hub/results/JOB-20261021-07/evidence/.
