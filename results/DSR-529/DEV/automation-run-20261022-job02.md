# DSR-529 DEV automation run — 20261022-job02

## 1. Header

- Run start (UTC): 2026-10-22T01:04:54Z
- Run end (UTC): 2026-10-22T01:07:55Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01, /master/ja/library/article/stories/qa529-02 (job input `/{ja,en}/library/article/stories/…` returns 404; fixture `/master/…` path used, as in JOB-20261021-05)
- Build under test: not independently verified (EDS .aem.live, branch `main`). Response `last-modified` (curl, ~01:10Z):

| Resource | last-modified |
|---|---|
| page /master/ja/.../qa529-01 | Wed, 21 Oct 2026 15:09:36 GMT |
| page /master/en/.../qa529-01 | Wed, 21 Oct 2026 15:10:40 GMT |
| page /master/ja/.../qa529-02 | Tue, 20 Oct 2026 11:36:16 GMT (query-index lastModified 2026-10-19T15:31:30Z) |
| /blocks/article-meta/article-meta.js | Wed, 21 Oct 2026 09:42:41 GMT |
| /query-index.json | Wed, 21 Oct 2026 15:11:35 GMT |

  → Nothing has been republished since JOB-20261021-05. qa529-02 was not republished after the Night 21/10 data work.
- Baseline ID: BL-v1 (docs/DSR-529/baseline-BL-v1.md) + Martin 21/10 meta-name decision
- Automation HEAD commit SHA: a44edafc7c3095382d6bdf9ff00daa7111f3b38a (+ uncommitted locator changes in this job, committed together with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job-20261022-02.json npm run test:dev -- tests/article-detail/DSR-529.article-detail.spec.ts --project=chromium -g "DSR-ARTICLE-0(02|06|11|12|14|16|23|28) "
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 15 | 6 | 9 | 0 | 1 | 2 | 1 configured; 9 retried (all failed again) | 3.0 min (179 s) |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: subset of 8 TCs (ja+en; 023 is ja only), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = sum of attempts.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-002 | [ja] blocks in design order 3→4→5→6→7→9→11→12→13→14, no console error | passed | 7.9 s | — |
| DSR-ARTICLE-006 | [ja] info bar shows 2 tag labels, not raw tag IDs | passed | 5.8 s | — |
| DSR-ARTICLE-011 | [ja] meta thumbnail: 1, absolute, no transform params, GET 200 image/* | failed | 24.8 s | thumbnail meta relative (DSR-659) |
| DSR-ARTICLE-012 | [ja] meta category = 2 tag IDs (present iff authored); searchkeywords … | failed | 23.8 s | no `category` meta |
| DSR-ARTICLE-014 | [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | failed | 12.0 s | `category` count 0 |
| DSR-ARTICLE-016 | [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | failed | 14.2 s | qa529-02 has no robots meta |
| DSR-ARTICLE-028 | [ja] breadcrumb present; last item = navtitle (no link); earlier items link | passed | 4.6 s | — |
| DSR-ARTICLE-002 | [en] blocks in design order … | passed | 5.6 s | — |
| DSR-ARTICLE-006 | [en] info bar shows 2 tag labels, not raw tag IDs | passed | 3.1 s | — |
| DSR-ARTICLE-011 | [en] meta thumbnail … | failed | 8.1 s | thumbnail meta relative (DSR-659) |
| DSR-ARTICLE-012 | [en] meta category … | failed | 7.1 s | no `category` meta |
| DSR-ARTICLE-014 | [en] … exactly once, non-empty | failed | 6.6 s | `category` count 0 |
| DSR-ARTICLE-016 | [en] robots … | failed | 6.9 s | qa529-01 en robots "noindex, nofollow" |
| DSR-ARTICLE-028 | [en] breadcrumb … | passed | 2.4 s | — |
| DSR-ARTICLE-023 | [ja] no related items block/heading when 0 results (トルツメ) | failed | 4.3 s | related-product block + heading visible on qa529-02 |

## 5. Skipped tests

None.

## 6. Failed tests

Evidence: hub copies are at `ykk-dsr/hub/results/JOB-20261022-02/evidence/<TC>_<lang>.png` (committed). The originals and traces are in `test-results/…-retry1/` (gitignored, not committed).

### DSR-ARTICLE-011 [ja, en]
- Assertion: `tests/article-detail/DSR-529.article-detail.spec.ts:123`, `absolute URL` toMatch `/^https?:\/\//`
- Expected: absolute URL, GET 200 image/*. Actual: ja `/content/dam/ykk/digital-showroom/test/png/gradient-transparent-1920x1080.png`, en `/content/dam/ykk/digital-showroom/test/png/highres-photo-4000x3000.png`. Both are 404 on .aem.live; the ja file is 200 image/png on the publish host.
- Proposed: product (DSR-659 still open), 85%.

### DSR-ARTICLE-012 [ja, en]
- Assertion: `:140` `category meta count` toHaveLength(1) and `:142` `category tag IDs` toHaveLength(2)
- Expected: one `category` meta with 2 tag IDs. Actual: no `category` meta; query-index `category` = "" (also "" on r1–r3). `searchkeywords` = "qa529kw1, qa529kw2" (OK, not visible).
- Proposed: data 50%. navtitle from the same UE dialog is published; the Author category value was not verified.

### DSR-ARTICLE-014 [ja, en]
- Assertion: `:170` / `:171` for key `category` (count 0, empty)
- Every other key = 1 and non-empty; og:title/og:description = authored; og:image absolute 200. Same cause as 012.

### DSR-ARTICLE-016 [ja, en]
- ja: `:192`/`:193`. qa529-02 robots = "" (expected noindex + nofollow). The page has not been republished since 20/10 (index row robots "", tags "" vs TD 1 tag). data, 15%.
- en: `:184`. qa529-01 robots = "noindex, nofollow" (TD-529-01 robots OFF). The page was republished 15:10:40Z with robots still ON; ja is correct. data, 15%.

### DSR-ARTICLE-023 [ja]
- Assertion: `:291` `visible related items block` (1 × 282 px) and `:292` `visible related items heading` (関連アイテム, 32 px)
- The 4 products (/ja/products/p00320, p00101, p00001, p00210) are identical on qa529-01 and qa529-02. The page cannot drive the "0 results" precondition, because product index relatedArticles/sortOrder is undefined (Martin prereq #3, same block as fixme 022). test/precondition, 40%. In JOB-05 this test failed on the heading only; the block is now matched after the locator fix.

## 7. Open points for QA

- Locator-only changes in `pages/ArticleDetailPage.ts`: subtitle/articleImage/description scoped to the article-title section; body = text blocks outside it; tags = `.article-meta-tag`; relatedItems = `.related-product.block`. In `tests/…spec.ts`, 006 also asserts chip count = `article:tag` meta count (the job's Expected). No Expected value was changed.
- `profile` locator still matches 7 elements (`[class*="profile"]`). It does not affect 002 (order uses `.first()`), but it is a candidate for cleanup.
- 006 en shows the Japanese label "バイオベース" on the en page (A5/Q5 label language open). Not judged.
- query-index `title` for qa529-01 = og:title ("QA529 OGPタイトル"), not the page title. Recorded only.
- Not verified: Author page properties (category, robots), build SHA, Jira state.
