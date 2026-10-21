# DSR-529 DEV automation run — 20261021-idle19-rerun (JOB-ZZ-IDLE-19)

## 1. Header

- Run start (UTC): 2026-10-21T01:34:06Z
- Run end (UTC): 2026-10-21T01:39:39Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01, qa529-02 (ja), qa529-r1..r3
- Build under test: not independently verified (EDS main branch on DEV at run time)
- Baseline ID: per US — docs/<US>/ (e.g. DSR-173/DSR-529 BL-v1, DSR-587 BL-OVL-1); not re-verified in this run
- Automation HEAD commit SHA: 6e06ab85cc0f5b688127ad41a08a7aa3a70544ea + uncommitted locator change in pages/ArticleDetailPage.ts (see §7)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/idle19-r3.json npx playwright test tests/article-detail/DSR-529.article-detail.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (2026-10-21T01:33Z, after final locator change)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 47 | 12 | 19 | 16 | 1 | 2 | 1 configured; 19 tests retried | 333 s (5.5 min) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: tests/article-detail/DSR-529.article-detail.spec.ts, chromium only. Flaky outcomes: 0.

## 4. Executed tests

Duration is summed over attempts (initial + retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 [ja] | DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail | 5.8s | Error: required blocks missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Ar |
| DSR-ARTICLE-003 [ja] | DSR-ARTICLE-003 [ja] title block = TD title, one h1, <title> = title | pass | 2.3s | — |
| DSR-ARTICLE-006 [ja] | DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs | fail | 4.8s | Error: tag labels — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 63 \|       con |
| DSR-ARTICLE-007 [ja] | DSR-ARTICLE-007 [ja] info bar date = meta published-date | fail | 4.9s | Error: expect(received).toBe(expected) // Object.is equality — Expected: null — Received: "2026-10-01" — 75 \|       observations.push({ show |
| DSR-ARTICLE-008 [ja] | DSR-ARTICLE-008 [ja] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 2.7s | — |
| DSR-ARTICLE-010 [ja] | DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible | fail | 5.1s | Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 99 \| |
| DSR-ARTICLE-011 [ja] | DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail | 5.3s | Error: absolute URL — expect(received).toMatch(expected) — Expected pattern: /^https?:\/\// — Received string:  "/content/dam/ykk/digital-sh |
| DSR-ARTICLE-012 [ja] | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | fail | 7.2s | Error: category tag IDs — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 130 \|    |
| DSR-ARTICLE-013 [ja] | DSR-ARTICLE-013 [ja] meta related-stories = r1,r2,r3 in order | pass | 3.3s | — |
| DSR-ARTICLE-014 [ja] | DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | fail | 16.6s | Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 155  |
| DSR-ARTICLE-016 [ja] | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail | 19.3s | Error: qa529-01 robots — expect(received).not.toMatch(expected) — Expected pattern: not /noindex/i — Received string:      "noindex, nofollo |
| DSR-ARTICLE-024 [ja] | DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 15.2s | Error: viewAllStories href — expect(received).not.toMatch(expected) — Expected pattern: not /^(#?)$/ — Received string:      "#" — 188 \|     |
| DSR-ARTICLE-029 [ja] | DSR-ARTICLE-029 [ja] language page: 200, title/info bar in ja, <html lang>=ja | pass | 8.2s | — |
| DSR-ARTICLE-002 [en] | DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | fail | 17.1s | Error: required blocks missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Ar |
| DSR-ARTICLE-003 [en] | DSR-ARTICLE-003 [en] title block = TD title, one h1, <title> = title | pass | 7.5s | — |
| DSR-ARTICLE-006 [en] | DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs | fail | 15.9s | Error: tag labels — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 63 \|       con |
| DSR-ARTICLE-007 [en] | DSR-ARTICLE-007 [en] info bar date = meta published-date | fail | 6.5s | Error: expect(received).toBe(expected) // Object.is equality — Expected: null — Received: "2026-10-01" — 75 \|       observations.push({ show |
| DSR-ARTICLE-008 [en] | DSR-ARTICLE-008 [en] My List button and share icons visible/enabled; share href has encoded page URL (no click) | pass | 3.2s | — |
| DSR-ARTICLE-010 [en] | DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible | fail | 5.7s | Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 99 \| |
| DSR-ARTICLE-011 [en] | DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | fail | 5.1s | Error: absolute URL — expect(received).toMatch(expected) — Expected pattern: /^https?:\/\// — Received string:  "/content/dam/ykk/digital-sh |
| DSR-ARTICLE-012 [en] | DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible | fail | 6.4s | Error: category tag IDs — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 130 \|    |
| DSR-ARTICLE-013 [en] | DSR-ARTICLE-013 [en] meta related-stories = r1,r2,r3 in order | pass | 2.4s | — |
| DSR-ARTICLE-014 [en] | DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty | fail | 7.4s | Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 155  |
| DSR-ARTICLE-016 [en] | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | fail | 6.3s | Error: qa529-01 robots — expect(received).not.toMatch(expected) — Expected pattern: not /noindex/i — Received string:      "noindex, nofollo |
| DSR-ARTICLE-024 [en] | DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded | fail | 15.6s | Error: viewAllStories href — expect(received).not.toMatch(expected) — Expected pattern: not /^(#?)$/ — Received string:      "#" — 188 \|     |
| DSR-ARTICLE-029 [en] | DSR-ARTICLE-029 [en] language page: 200, title/info bar in en, <html lang>=en | pass | 6.6s | — |
| DSR-ARTICLE-015 [ja] | DSR-ARTICLE-015 [ja] OGP fallback: og:title = title, og:description = description, og:image 200 | pass | 7.4s | — |
| DSR-ARTICLE-020 [ja] | DSR-ARTICLE-020 [ja] no related stories block/heading when not specified (トルツメ) | pass | 8.5s | — |
| DSR-ARTICLE-023 [ja] | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | fail | 14.9s | Error: visible related items heading — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 6 — - Array []  |
| DSR-ARTICLE-025 [ja] | DSR-ARTICLE-025 [ja] no empty profile wrapper with height > 0 (トルツメ) | pass | 6.5s | — |
| DSR-ARTICLE-009 [ja] | DSR-ARTICLE-009 [ja] My List add → localStorage has page under stories; kept after reload | pass | 10.3s | — |

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

### DSR-ARTICLE-002 [ja] (chromium) — DSR-ARTICLE-002 [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Array [ — +   "subtitle", — +   "articleImage", — +   "descrip` — `tests/article-detail/DSR-529.article-detail.spec.ts:42`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-cc12c-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-657 (PEND-529-01): subtitle/image/description blocks missing; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-006 [ja] (chromium) — DSR-ARTICLE-006 [ja] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 63 \|       const labels = (await article.tags.allInnerTexts()).map(t => t.` — `tests/article-detail/DSR-529.article-detail.spec.ts:65`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-7a477--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-658 (BUG-3): 0 tag chips, 2 article:tag metas; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-007 [ja] (chromium) — DSR-ARTICLE-007 [ja] info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality — Expected: null — Received: "2026-10-01" — 75 \|       observations.push({ shown, metaPublishedDate: meta, shownIso: isoDate(shown), metaIs` — `tests/article-detail/DSR-529.article-detail.spec.ts:77`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-86406-ar-date-meta-published-date-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-86406-ar-date-meta-published-date-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-6 draft: date shown, published-date meta absent; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 60%

### DSR-ARTICLE-010 [ja] (chromium) — DSR-ARTICLE-010 [ja] meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 99 \|       const visible = await article.main.innerText(); — 100` — `tests/article-detail/DSR-529.article-detail.spec.ts:101`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-79b36-ach-update-date-not-visible-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-79b36-ach-update-date-not-visible-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: meta names publicationdate/updatedate/searchkeywords; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-011 [ja] (chromium) — DSR-ARTICLE-011 [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL — expect(received).toMatch(expected) — Expected pattern: /^https?:\/\// — Received string:  "/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png" — 114 \| ` — `tests/article-detail/DSR-529.article-detail.spec.ts:116`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-6152a-sform-params-GET-200-image--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-659 (BUG-4): thumbnail relative /content/dam path, 404 on .live; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-012 [ja] (chromium) — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 130 \|       const ids = category.split(',').map(s => s.trim()).filte` — `tests/article-detail/DSR-529.article-detail.spec.ts:132`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-b3344-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-b3344-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: no category meta; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-014 [ja] (chromium) — DSR-ARTICLE-014 [ja] title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 155 \|       observations.push({ counts }); — 156 \|       for (co` — `tests/article-detail/DSR-529.article-detail.spec.ts:157`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-162e5-gory-exactly-once-non-empty-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-162e5-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: published-date meta count 0; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-016 [ja] (chromium) — DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots — expect(received).not.toMatch(expected) — Expected pattern: not /noindex/i — Received string:      "noindex, nofollow" — 169 \|       const fullRobots = metaValues((await articl` — `tests/article-detail/DSR-529.article-detail.spec.ts:171`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-00671-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: qa529-01 still noindex,nofollow (Author state not verified); same fail as JOB-20261020-10. cause `none`, suspect `data`, confidence 50%

### DSR-ARTICLE-024 [ja] (chromium) — DSR-ARTICLE-024 [ja] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href — expect(received).not.toMatch(expected) — Expected pattern: not /^(#?)$/ — Received string:      "#" — 188 \|         const href = await el.first().getAttribute('href', { ti` — `tests/article-detail/DSR-529.article-detail.spec.ts:190`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-54265-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: VIEW ALL STORIES / Contact href "#"; same fail as JOB-20261020-10. cause `none`, suspect `test`, confidence 50%

### DSR-ARTICLE-002 [en] (chromium) — DSR-ARTICLE-002 [en] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error

- Failing assertion: `Error: required blocks missing — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 5 — - Array [] — + Array [ — +   "subtitle", — +   "articleImage", — +   "descrip` — `tests/article-detail/DSR-529.article-detail.spec.ts:42`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-53ebb-1→12→13→14-no-console-error-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-657 (PEND-529-01): subtitle/image/description blocks missing; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-006 [en] (chromium) — DSR-ARTICLE-006 [en] info bar shows 2 tag labels, not raw tag IDs

- Failing assertion: `Error: tag labels — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 63 \|       const labels = (await article.tags.allInnerTexts()).map(t => t.` — `tests/article-detail/DSR-529.article-detail.spec.ts:65`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-5aa4c--tag-labels-not-raw-tag-IDs-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-658 (BUG-3): 0 tag chips, 2 article:tag metas; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-007 [en] (chromium) — DSR-ARTICLE-007 [en] info bar date = meta published-date

- Failing assertion: `Error: expect(received).toBe(expected) // Object.is equality — Expected: null — Received: "2026-10-01" — 75 \|       observations.push({ shown, metaPublishedDate: meta, shownIso: isoDate(shown), metaIs` — `tests/article-detail/DSR-529.article-detail.spec.ts:77`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-7079a-ar-date-meta-published-date-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-7079a-ar-date-meta-published-date-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-6 draft: date shown, published-date meta absent; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 60%

### DSR-ARTICLE-010 [en] (chromium) — DSR-ARTICLE-010 [en] meta published-date / updated-date ISO 8601, one each; update date not visible

- Failing assertion: `Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 99 \|       const visible = await article.main.innerText(); — 100` — `tests/article-detail/DSR-529.article-detail.spec.ts:101`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-11a6e-ach-update-date-not-visible-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-11a6e-ach-update-date-not-visible-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: meta names publicationdate/updatedate/searchkeywords; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-011 [en] (chromium) — DSR-ARTICLE-011 [en] meta thumbnail: 1, absolute, no transform params, GET 200 image/*

- Failing assertion: `Error: absolute URL — expect(received).toMatch(expected) — Expected pattern: /^https?:\/\// — Received string:  "/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png" — 114 \|       e` — `tests/article-detail/DSR-529.article-detail.spec.ts:116`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-f0210-sform-params-GET-200-image--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: DSR-659 (BUG-4): thumbnail relative /content/dam path, 404 on .live; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 90%

### DSR-ARTICLE-012 [en] (chromium) — DSR-ARTICLE-012 [en] meta category = 2 tag IDs; search-keywords has qa529kw1/qa529kw2, not visible

- Failing assertion: `Error: category tag IDs — expect(received).toHaveLength(expected) — Expected length: 2 — Received length: 0 — Received array:  [] — 130 \|       const ids = category.split(',').map(s => s.trim()).filte` — `tests/article-detail/DSR-529.article-detail.spec.ts:132`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-b15c5-529kw1-qa529kw2-not-visible-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-b15c5-529kw1-qa529kw2-not-visible-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: no category meta; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-014 [en] (chromium) — DSR-ARTICLE-014 [en] title/description/OGP/published-date/thumbnail/category exactly once, non-empty

- Failing assertion: `Error: published-date count — expect(received).toHaveLength(expected) — Expected length: 1 — Received length: 0 — Received array:  [] — 155 \|       observations.push({ counts }); — 156 \|       for (co` — `tests/article-detail/DSR-529.article-detail.spec.ts:157`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-401db-gory-exactly-once-non-empty-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-401db-gory-exactly-once-non-empty-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: BUG-2 draft: published-date meta count 0; same fail as JOB-20261020-10. cause `none`, suspect `product`, confidence 70%

### DSR-ARTICLE-016 [en] (chromium) — DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex

- Failing assertion: `Error: qa529-01 robots — expect(received).not.toMatch(expected) — Expected pattern: not /noindex/i — Received string:      "noindex, nofollow" — 169 \|       const fullRobots = metaValues((await articl` — `tests/article-detail/DSR-529.article-detail.spec.ts:171`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-d945e-ofollow-qa529-01-no-noindex-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: qa529-01 still noindex,nofollow (Author state not verified); same fail as JOB-20261020-10. cause `none`, suspect `data`, confidence 50%

### DSR-ARTICLE-024 [en] (chromium) — DSR-ARTICLE-024 [en] VIEW ALL STORIES + Contact visible; hrefs recorded

- Failing assertion: `Error: viewAllStories href — expect(received).not.toMatch(expected) — Expected pattern: not /^(#?)$/ — Received string:      "#" — 188 \|         const href = await el.first().getAttribute('href', { ti` — `tests/article-detail/DSR-529.article-detail.spec.ts:190`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-f5300-tact-visible-hrefs-recorded-chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: VIEW ALL STORIES / Contact href "#"; same fail as JOB-20261020-10. cause `none`, suspect `test`, confidence 50%

### DSR-ARTICLE-023 [ja] (chromium) — DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion: `Error: visible related items heading — expect(received).toEqual(expected) // deep equality — - Expected  - 1 — + Received  + 6 — - Array [] — + Array [ — +   Object { — +     "height": 32.390625, — + ` — `tests/article-detail/DSR-529.article-detail.spec.ts:266`
- Expected / actual: see assertion message above (raw values in the Playwright error).
- Attempt(s): 2 attempt(s), all failed
- Evidence paths: test-results/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium/test-failed-1.png, test-results/article-detail-DSR-529.art-c2335-eading-when-0-results-トルツメ--chromium-retry1/test-failed-1.png (test-results/ is gitignored, not committed)
- Comparison: qa529-02 related items heading visible (4 products); same fail as JOB-20261020-10. cause `none`, suspect `test`, confidence 50%

## 7. Open points for QA

- Purpose: verify the narrowed related-articles locator. Result matches JOB-20261020-10 exactly (12 pass / 19 fail / 16 skip); DSR-ARTICLE-020 [ja] pass.
- Locator fix (job step 4): `pages/ArticleDetailPage.ts` `relatedStories` now matches `[data-block-name="related-articles"], .related-articles.block` (old `related-stories` kept as fallback). The first version (`[class*="related-articles"]`, used in the aborted run and the full run) also matched the section wrapper `related-articles-container`, which exists on qa529-02 ja without the block → false fail of DSR-ARTICLE-020 [ja]. Narrowed and verified by the DSR-529 rerun (020 pass). DOM probe: qa529-01 ja has `div.related-articles.auto.block[data-block-name=related-articles]` with 3 qa529-r1..r3 links; qa529-02 ja has only the wrapper (関連アイテム + footer actions).
- Only DSR-ARTICLE-020 uses this locator; no test asserts the block is present on qa529-01, so the positive match is verified by the DOM probe only.
- All fails except DSR-ARTICLE-020 [ja] have the same failing assertion as JOB-20261020-09 / JOB-20261020-10 → cause `none` per job step 2. Confidence values are carried over from those jobs / the 529 decision table; not re-assessed.
- The suite writes pass screenshots into tracked paths (evidence/DSR-552/DEV/, older ykk-dsr/hub/results/JOB-* folders). These side-effect changes (45 modified, 8 new files) were reverted and are not committed.
- Build identity, Author state (robots, 表示フラグ/Draft) and Jira status of DSR-657/658/659 not verified.
