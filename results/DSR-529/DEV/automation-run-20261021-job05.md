# DSR-529 DEV automation run — 20261021-job05

## 1. Header

- Run start (UTC): 2026-10-21T16:57:15Z
- Run end (UTC): 2026-10-21T17:01:55Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01, /master/ja/library/article/stories/qa529-02
- Build under test: not independently verified (EDS .aem.live, branch `main`). Response `last-modified` (curl, ~17:05Z):

| Resource | last-modified |
|---|---|
| page /master/ja/.../qa529-01 | Wed, 21 Oct 2026 15:09:36 GMT |
| page /master/en/.../qa529-01 | Wed, 21 Oct 2026 15:10:40 GMT |
| page /master/ja/.../qa529-02 | Tue, 20 Oct 2026 11:36:16 GMT |
| /scripts/scripts.js | Mon, 19 Oct 2026 03:10:29 GMT |
| /blocks/article-meta/article-meta.js | Wed, 21 Oct 2026 09:42:41 GMT |
| /blocks/image/image.js | Wed, 21 Oct 2026 09:42:41 GMT |
| /blocks/listing/adapters/query-index.js | Wed, 21 Oct 2026 09:42:41 GMT |
| /blocks/related-articles/related-articles.js | Thu, 01 Oct 2026 07:31:25 GMT |
| /query-index.json | Wed, 21 Oct 2026 15:11:35 GMT |

  → merged code (09:42:41Z) is live and qa529-01 ja+en were republished after it; qa529-02 was not.
- Baseline ID: BL-v1 (docs/DSR-529/baseline-BL-v1.md) + Martin 21/10 meta-name decision + BUG-RULES §6 date standard YYYY.MM.DD
- Automation HEAD commit SHA: dc56c2e9ee750f2e068b4f811e85ec9a559d2006 (no code changes in this job)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/j05.json ENV=dev npx playwright test tests/article-detail/DSR-529.article-detail.spec.ts --project=chromium --reporter=list,json
```

Supplementary read-only probe (not a Playwright test; raw output in `ykk-dsr/hub/results/JOB-20261021-05/result.json` → `probe_raw`): image-block imgs, article-meta chips, article:tag metas, related-article img URLs + HTTP status, thumbnail URL status, query-index candidates.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 48 | 18 | 15 | 15 | 1 | 2 | configured 1; every failed test retried once and failed again | 4.7 min (Playwright 4.5m) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: DSR-529 article-detail spec only; chromium project. Flaky outcomes: 0.

## 4. Executed tests

Duration = sum of attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail (failed→failed) | 13.5s | required blocks missing / infoBar before body |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | pass | 4.3s | — |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | fail (failed→failed) | 10.3s | tag labels |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [ja] info bar date = meta publicationdate, format YYYY.MM.DD | pass | 4.3s | — |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 4.4s | — |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [ja] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 4.3s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail (failed→failed) | 10.8s | absolute URL |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail (failed→failed) | 6.5s | category meta count / category tag IDs |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | pass | 2.2s | — |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | fail (failed→failed) | 6.5s | category count / category non-empty |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail (failed→failed) | 9.7s | qa529-02 robots / qa529-02 robots |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | fail (failed→failed) | 7.4s | viewAllStories href / contact href |
| DSR-ARTICLE-028 | DSR-ARTICLE-028 [ja] breadcrumb present; last item = navtitle (no link); earlier items link | pass | 2.2s | — |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | pass | 2.2s | — |
| DSR-ARTICLE-002 | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail (failed→failed) | 10.1s | required blocks missing / infoBar before body |
| DSR-ARTICLE-003 | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | pass | 4.6s | — |
| DSR-ARTICLE-006 | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | fail (failed→failed) | 10.6s | tag labels |
| DSR-ARTICLE-007 | DSR-ARTICLE-007 [en] info bar date = meta publicationdate, format YYYY.MM.DD | pass | 8.9s | — |
| DSR-ARTICLE-008 | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 5.6s | — |
| DSR-ARTICLE-010 | DSR-ARTICLE-010 [en] meta publicationdate / updatedate ISO 8601, one each; update date not visible | pass | 5.1s | — |
| DSR-ARTICLE-011 | DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail (failed→failed) | 12.4s | absolute URL |
| DSR-ARTICLE-012 | DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail (failed→failed) | 6.5s | category meta count / category tag IDs |
| DSR-ARTICLE-013 | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | pass | 2.2s | — |
| DSR-ARTICLE-014 | DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | fail (failed→failed) | 6.8s | category count / category non-empty |
| DSR-ARTICLE-016 | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail (failed→failed) | 8.1s | qa529-01 robots |
| DSR-ARTICLE-024 | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | fail (failed→failed) | 7.3s | viewAllStories href / contact href |
| DSR-ARTICLE-028 | DSR-ARTICLE-028 [en] breadcrumb present; last item = navtitle (no link); earlier items link | pass | 2.1s | — |
| DSR-ARTICLE-029 | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | pass | 2.4s | — |
| DSR-ARTICLE-015 | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | pass | 1.8s | — |
| DSR-ARTICLE-020 | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | pass | 1.9s | — |
| DSR-ARTICLE-023 | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | fail (failed→failed) | 6.0s | visible related items heading |
| DSR-ARTICLE-025 | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | pass | 2.5s | — |
| DSR-ARTICLE-009 | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | pass | 6.5s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-026 [ja] | blocked-data: no stories query-index returns 200 (/ja/stories/query-index.json, /master/ja/stories/query-index.json, /master/ja/library/article/stories/query-index.json) |
| DSR-ARTICLE-026 [en] | blocked-data: no stories query-index returns 200 (/en/stories/query-index.json, /master/en/stories/query-index.json, /master/en/library/article/stories/query-index.json) |
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

## 6. Failed tests

### DSR-ARTICLE-002 [ja] — DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:35` (test start line):
  - Error: required blocks missing / expect(received).toEqual(expected) // deep equality / - Expected  - 1 / + Received  + 5 / - Array [] / + Array [
  - Error: infoBar before body / expect(received).toBe(expected) // Object.is equality / Expected: true / Received: false /   44 /       const ordered = blockOrder.filter(name => present.find(p => p.name === name)!.count > 0); /   45 /       for (let i = 0; i < ordered.length - 1; i++) {
- Observed: 1 image block + img 200, 0 empty blocks, 0 console errors (657 fixed). Fails only on subtitle/articleImage/description locators (DOM has generic text/image/text blocks) and infoBar-before-body (body locator matches the subtitle text block).
- Proposed: suspect `test`, cause `none`, product-bug confidence 20% (ref DSR-657 (image part = Pass, see probe))
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-002_ja.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-006 [ja] — DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:62` (test start line):
  - Error: tag labels / expect(received).toHaveLength(expected) / Expected length: 2 / Received length: 3 / Received array:  ["do-not-translate / バイオベース", "do-not-translate", "バイオベース"]
- Observed: 2 span.article-meta-tag = 2 article:tag metas. Spec counts 3: locator [class*="tag"] also matches wrapper div.article-meta-tags.
- Proposed: suspect `test`, cause `none`, product-bug confidence 10% (ref DSR-658 (Pass, see probe))
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-006_ja.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-011 [ja] — DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:115` (test start line):
  - Error: absolute URL / expect(received).toMatch(expected) / Expected pattern: /^https?:\/\// / Received string:  "/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png" /   119 /       expect(thumbs, 'thumbnail meta count').toHaveLength(1); /   120 /       const url = thumbs[0];
- Observed: Page republished after merge (last-modified 21/10 15:09Z ja / 15:10Z en), thumbnail meta still relative /content/dam/…; relative URL 404 on .aem.live, same path 200 on publish-p192812 host.
- Proposed: suspect `product`, cause `none`, product-bug confidence 85% (ref DSR-659 (thumbnail part))
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-011_ja.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-012 [ja] — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:130` (test start line):
  - Error: category meta count / expect(received).toHaveLength(expected) / Expected length: 1 / Received length: 0 / Received array:  [] /   136 /       // category is emitted only when the page field is filled (Martin 21/10).
  - Error: category tag IDs / expect(received).toHaveLength(expected) / Expected length: 2 / Received length: 0 / Received array:  [] /   138 /         expect.soft(categories, 'category meta count').toHaveLength(1);
- Observed: No category meta (searchkeywords OK). Index row category "" too. Page republished 15:09Z; Author field not verified.
- Proposed: suspect `data`, cause `none`, product-bug confidence 40% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-012_ja.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-014 [ja] — DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:162` (test start line):
  - Error: category count / expect(received).toHaveLength(expected) / Expected length: 1 / Received length: 0 / Received array:  [] /   166 /       observations.push({ counts });
  - Error: category non-empty / expect(received).not.toBe(expected) // Object.is equality / Expected: not "" /   167 /       for (const key of uniqueMeta) { /   168 /         expect.soft(counts[key], `${key} count`).toHaveLength(1); / > 169 /         expect.soft(counts[key][0]?.trim() ?? '', `${key} non-empty`).not.toBe('');
- Observed: Same as 012: category count 0; other unique metas once and non-empty.
- Proposed: suspect `data`, cause `none`, product-bug confidence 40% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-014_ja.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-016 [ja] — DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:178` (test start line):
  - Error: qa529-02 robots / expect(received).toMatch(expected) / Expected pattern: /noindex/i / Received string:  "" /   188 /       const minimalRobots = metaValues((await article.rawMeta(request, minimal.path)).meta, 'robots').join(','); /   189 /       observations.push({ page: slugs.minimal, robots: minimalRobots });
  - Error: qa529-02 robots / expect(received).toMatch(expected) / Expected pattern: /nofollow/i / Received string:  "" /   189 /       observations.push({ page: slugs.minimal, robots: minimalRobots }); /   190 /       expect.soft(minimalRobots, `${slugs.minimal} robots`).toMatch(/noindex/i);
- Observed: ja: qa529-02 robots "" (last published 20/10 11:36Z). en: qa529-01 robots "noindex, nofollow" (TD-529-01 robots OFF).
- Proposed: suspect `data`, cause `none`, product-bug confidence 30% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-016_ja.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-024 [ja] — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:194` (test start line):
  - Error: viewAllStories href / expect(received).not.toMatch(expected) / Expected pattern: not /^(#?)$/ / Received string:      "#" /   199 /         const href = await el.first().getAttribute('href', { timeout: 1_000 }).catch(() => null); /   200 /         observations.push({ [name]: { text: await el.first().innerText({ timeout: 1_000 }).catch(() => null), href, note: 'targets undecided (A8 / Q8) – 
  - Error: contact href / expect(received).not.toMatch(expected) / Expected pattern: not /^(#?)$/ / Received string:      "#" /   199 /         const href = await el.first().getAttribute('href', { timeout: 1_000 }).catch(() => null); /   200 /         observations.push({ [name]: { text: await el.first().innerText({ timeout: 1_000 }).catch(() => null), href, note: 'targets undecided (A8 / Q8) – not jud
- Observed: VIEW ALL STORIES and Contact href "#" (targets undecided A8/Q8; unchanged).
- Proposed: suspect `test`, cause `none`, product-bug confidence 30% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-024_ja.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-002 [en] — DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:35` (test start line):
  - Error: required blocks missing / expect(received).toEqual(expected) // deep equality / - Expected  - 1 / + Received  + 5 / - Array [] / + Array [
  - Error: infoBar before body / expect(received).toBe(expected) // Object.is equality / Expected: true / Received: false /   44 /       const ordered = blockOrder.filter(name => present.find(p => p.name === name)!.count > 0); /   45 /       for (let i = 0; i < ordered.length - 1; i++) {
- Observed: 1 image block + img 200, 0 empty blocks, 0 console errors (657 fixed). Fails only on subtitle/articleImage/description locators (DOM has generic text/image/text blocks) and infoBar-before-body (body locator matches the subtitle text block).
- Proposed: suspect `test`, cause `none`, product-bug confidence 20% (ref DSR-657 (image part = Pass, see probe))
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-002_en.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-006 [en] — DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:62` (test start line):
  - Error: tag labels / expect(received).toHaveLength(expected) / Expected length: 2 / Received length: 3 / Received array:  ["do-not-translate / バイオベース", "do-not-translate", "バイオベース"]
- Observed: 2 span.article-meta-tag = 2 article:tag metas. Spec counts 3: locator [class*="tag"] also matches wrapper div.article-meta-tags.
- Proposed: suspect `test`, cause `none`, product-bug confidence 10% (ref DSR-658 (Pass, see probe))
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-006_en.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-011 [en] — DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:115` (test start line):
  - Error: absolute URL / expect(received).toMatch(expected) / Expected pattern: /^https?:\/\// / Received string:  "/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png" /   119 /       expect(thumbs, 'thumbnail meta count').toHaveLength(1); /   120 /       const url = thumbs[0];
- Observed: Page republished after merge (last-modified 21/10 15:09Z ja / 15:10Z en), thumbnail meta still relative /content/dam/…; relative URL 404 on .aem.live, same path 200 on publish-p192812 host.
- Proposed: suspect `product`, cause `none`, product-bug confidence 85% (ref DSR-659 (thumbnail part))
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-011_en.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-012 [en] — DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:130` (test start line):
  - Error: category meta count / expect(received).toHaveLength(expected) / Expected length: 1 / Received length: 0 / Received array:  [] /   136 /       // category is emitted only when the page field is filled (Martin 21/10).
  - Error: category tag IDs / expect(received).toHaveLength(expected) / Expected length: 2 / Received length: 0 / Received array:  [] /   138 /         expect.soft(categories, 'category meta count').toHaveLength(1);
- Observed: No category meta (searchkeywords OK). Index row category "" too. Page republished 15:09Z; Author field not verified.
- Proposed: suspect `data`, cause `none`, product-bug confidence 40% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-012_en.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-014 [en] — DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:162` (test start line):
  - Error: category count / expect(received).toHaveLength(expected) / Expected length: 1 / Received length: 0 / Received array:  [] /   166 /       observations.push({ counts });
  - Error: category non-empty / expect(received).not.toBe(expected) // Object.is equality / Expected: not "" /   167 /       for (const key of uniqueMeta) { /   168 /         expect.soft(counts[key], `${key} count`).toHaveLength(1); / > 169 /         expect.soft(counts[key][0]?.trim() ?? '', `${key} non-empty`).not.toBe('');
- Observed: Same as 012: category count 0; other unique metas once and non-empty.
- Proposed: suspect `data`, cause `none`, product-bug confidence 40% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-014_en.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-016 [en] — DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:178` (test start line):
  - Error: qa529-01 robots / expect(received).not.toMatch(expected) / Expected pattern: not /noindex/i / Received string:      "noindex, nofollow" /   180 /       const fullRobots = metaValues((await article.rawMeta(request, path)).meta, 'robots'); /   181 /       observations.push({ page: slugs.full, robots: fullRobots });
- Observed: ja: qa529-02 robots "" (last published 20/10 11:36Z). en: qa529-01 robots "noindex, nofollow" (TD-529-01 robots OFF).
- Proposed: suspect `data`, cause `none`, product-bug confidence 30% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-016_en.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-024 [en] — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:194` (test start line):
  - Error: viewAllStories href / expect(received).not.toMatch(expected) / Expected pattern: not /^(#?)$/ / Received string:      "#" /   199 /         const href = await el.first().getAttribute('href', { timeout: 1_000 }).catch(() => null); /   200 /         observations.push({ [name]: { text: await el.first().innerText({ timeout: 1_000 }).catch(() => null), href, note: 'targets undecided (A8 / Q8) – 
  - Error: contact href / expect(received).not.toMatch(expected) / Expected pattern: not /^(#?)$/ / Received string:      "#" /   199 /         const href = await el.first().getAttribute('href', { timeout: 1_000 }).catch(() => null); /   200 /         observations.push({ [name]: { text: await el.first().innerText({ timeout: 1_000 }).catch(() => null), href, note: 'targets undecided (A8 / Q8) – not jud
- Observed: VIEW ALL STORIES and Contact href "#" (targets undecided A8/Q8; unchanged).
- Proposed: suspect `test`, cause `none`, product-bug confidence 30% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-024_en.png` (committed); traces under `test-results/` (not committed)

### DSR-ARTICLE-023 [ja] — DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion(s) — `tests/article-detail/DSR-529.article-detail.spec.ts:284` (test start line):
  - Error: visible related items heading / expect(received).toEqual(expected) // deep equality / - Expected  - 1 / + Received  + 6 / - Array [] / + Array [
- Observed: qa529-02: a related items heading is visible though 0 results expected (unchanged vs JOB-04/07).
- Proposed: suspect `data`, cause `none`, product-bug confidence 40% (ref –)
- Attempt(s): failed → failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261021-05/evidence/DSR-ARTICLE-023_ja.png` (committed); traces under `test-results/` (not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Per-bug proposals (657 Pass, 658 Pass, 659 Fail partial, 660 Pass) rest on the probe raw values, not on spec pass/fail: spec 002 and 006 fail for locator reasons (stale subtitle/articleImage/description locators; tag locator matching the wrapper). Locator fixes not applied (run-only job).
- DSR-659: related-article images fixed; meta thumbnail still relative after republish → 404 on .aem.live.
- Stories query-index: only `/query-index.json` returns 200; row for qa529-01 has tags = [do-not-translate, site:product/bio-based] (ja+en) but category = "" (ja+en). Whether the category field was authored (Night 21/10 0b) is not verified (no Author access).
- en qa529-01 robots = "noindex, nofollow" in HTML and index (TD-529-01 robots OFF) — data, not verified in Author.
- en page shows ja tag label "バイオベース" and a chip "do-not-translate" (A5/Q5 label-language assumption).
- Not verified: Author state, merge commit identity, Jira status. DASHBOARD/BUGS/Jira not edited.
