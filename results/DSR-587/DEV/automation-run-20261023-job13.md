# DSR-587 DEV automation run — 20261023-job13

Covers the 3 TCs changed by JOB-20261023-13 (DSR-587 VOV-008, DSR-654 CATOV-021, DSR-529 ARTICLE-023).

## 1. Header

- Run start (UTC): 2026-10-23T05:55:03Z
- Run end (UTC): 2026-10-23T05:55:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (`.aem.page` tier where a test says so)
- Build under test: not independently verified (EDS main branch on DEV at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + docs/DSR-529/baseline-BL-v1.md + JOB-20261023-13 approved Expected change (VOV-008 technical rows ignored; CATOV-021 non-form query-index check dropped; ARTICLE-023 fixme Blocked-by DSR-356)
- Automation HEAD commit SHA: b2509a9523faa3322f1b018413f96aac755a154d (+ uncommitted JOB-20261023-13 edits to the 3 specs, committed with this report)
- Target page(s): /en/library/video/qa587-unavail, /en/library/video/qa587-off (.aem.page + .aem.live); /{ja,en}/library/catalog/qa190-cat-{pdf,pdf-form,ebook,ebook-form} + /query-index.json + /sitemap.xml (.aem.live); ja article qa529-02 (fixme, not opened)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job13/run1.json npm run test:dev -- --grep "DSR-VOV-008|DSR-CATOV-021|DSR-ARTICLE-023"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 14 | 13 | 0 | 1 | 0 | 2 | 1 configured; 0 used | 26 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset by `--grep`, chromium. The grep also matched 2 one-off analysis tests in `tests/analysis/JOB-20261023-08.analysis.spec.ts` (ARTICLE-023 / VOV-008 facts) and the 2 VOV-008 rows in `tests/overlay-seo/DSR-587.overlay-seo.spec.ts`. Flaky outcomes: none.

## 4. Executed tests

Duration = summed over attempts (no retries happened).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-023 | DSR-ARTICLE-023 [ja] related-product block on qa529-02 vs qa529-01 | passed | 10.4 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] overlay rows on unavailable vs normal video pages | passed | 5.7 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf: non-form page not listed in sitemap | passed | 0.5 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 0.4 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook: non-form page not listed in sitemap | passed | 1.6 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [ja] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf: non-form page not listed in sitemap | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-pdf-form: live page listed once in query-index and sitemap | passed | 1.3 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook: non-form page not listed in sitemap | passed | 1.2 s | — |
| DSR-CATOV-021 | DSR-CATOV-021 [en] qa190-cat-ebook-form: live page listed once in query-index and sitemap | passed | 1.2 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] CF commune unpublished → only data row is unavailable, noindex, browser sent to movie list | passed | 5.5 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off page: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | passed | 3.8 s | — |
| DSR-VOV-008 | DSR-VOV-008 [en] qa587-off live: raw 200 + unavailable \| movie-unavailable, browser ends on /en/library/video/search (HTTP 200) | passed | 3.5 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-023 (DSR-ARTICLE-023 [ja]) | Blocked-by DSR-356: related-product block renders dummy fixture (QUERY = null), 0-result case unreachable on DEV |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**.

## 7. Open points for QA

- VOV-008 now ignores the `source` / `cfPath` rows and checks that the only data row is `unavailable`. This is the Expected change approved in the job (JOB-08 #5). It passed on DEV.
- CATOV-021 non-form: only the sitemap (0 `<loc>`) and query-index HTTP 200 are checked now. Whether the page appears in query-index is no longer asserted (JOB-10 proposal accepted). Form catalogs still need exactly 1 query-index row and 1 sitemap `<loc>`.
- ARTICLE-023 is `test.fixme` and tagged `@blocked`, so regression runs skip it. Re-enable it when DSR-356 publishes the `dm-product-related` persisted query. Only a `[ja]` variant exists in this spec (minimal article TD-529-02).
- Side effect: the 2 JOB-08 analysis tests matched by the grep rewrote files in `ykk-dsr/hub/results/JOB-20261023-08/` (2 facts JSON + 1 PNG). I restored them from git, so they are not part of this commit.
- I did not independently verify the build identity.
