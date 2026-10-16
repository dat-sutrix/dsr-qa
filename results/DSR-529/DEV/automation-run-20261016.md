# DSR-529 DEV automation run — 20261016

Scaffold run for JOB-ZZ-IDLE-02 (write-only job): proves the new spec compiles and skips cleanly while the TD-529 pages are missing on DEV.

## 1. Header

- Run start (UTC): 2026-10-16T11:05:48Z
- Run end (UTC): 2026-10-16T11:07:43Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/library/article/stories/qa529-01, /master/ja/library/article/stories/qa529-02; fallback /master/{lang}/test-space/qa529-01, -02
- Build under test: not independently verified (no build ID exposed; pages under test do not exist yet)
- Baseline ID: BL-v1 (docs/DSR-529/baseline-BL-v1.md, copied from ykk-dsr/hub/tc-out/DSR-529.spec.json)
- Automation HEAD commit SHA: d4ae3b29da5a3911c02864921a85ffa8bd241e63 (spec files uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-529-run.json npm run test:dev -- tests/article-detail
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 47 | 0 | 0 | 47 | 0 | 1 (config 2; one file) | 1 configured; 0 used | 1m 54s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/article-detail`; chromium only (firefox/webkit projects match DSR-552 only). Flaky outcomes: 0.

## 4. Executed tests

No test reached an assertion: all 33 implemented tests stopped at the preflight (page 404) and 14 are fixme. See section 5.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| — | — | — | — | — |

## 5. Skipped tests

Reasons copied verbatim from the Playwright JSON report (`test.skip` / `test.fixme` annotations).

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ARTICLE-001 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-002 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-002 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-003 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-003 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-004 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-005 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-006 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-006 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-007 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-007 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-008 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-008 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-009 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-010 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-010 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-011 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-011 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-012 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-012 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-013 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-013 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-014 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-014 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-015 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-02 and /master/ja/test-space/qa529-02 HTTP 404) |
| DSR-ARTICLE-016 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-016 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-017 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 (helix-query.yaml) / Q7 |
| DSR-ARTICLE-018 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; NEW period Q6 |
| DSR-ARTICLE-019 [ja] | Blocked: Stories index not on DEV yet – Martin prereq #1 / Q7; TD-529-04 not seeded |
| DSR-ARTICLE-020 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-02 and /master/ja/test-space/qa529-02 HTTP 404) |
| DSR-ARTICLE-021 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |
| DSR-ARTICLE-022 [ja] | Blocked: 製品index relatedArticles/sortOrder not defined – 製品詳細 ticket (Martin prereq #3) |
| DSR-ARTICLE-023 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-02 and /master/ja/test-space/qa529-02 HTTP 404) |
| DSR-ARTICLE-024 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-024 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-025 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-02 and /master/ja/test-space/qa529-02 HTTP 404) |
| DSR-ARTICLE-026 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-026 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-027 [ja] | Blocked: Article list DSR-170 (out of scope) + stories index |
| DSR-ARTICLE-028 [ja] | Blocked: Martin open decision #4 (breadcrumb in scope?) + DSR-552 – Q9 |
| DSR-ARTICLE-029 [cn] | Blocked: no /master/cn on DEV (Issue #18) – all cn rows |
| DSR-ARTICLE-029 [en] | blocked-data: TD-529 page missing (/master/en/library/article/stories/qa529-01 and /master/en/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-029 [ja] | blocked-data: TD-529 page missing (/master/ja/library/article/stories/qa529-01 and /master/ja/test-space/qa529-01 HTTP 404) |
| DSR-ARTICLE-030 [ja] | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-031 [ja] | Visual TC – Figma PC/SP design frames missing, only spec board 162-450 (owner: Dat) |
| DSR-ARTICLE-032 [ja] | Manual TC (Author / Universal Editor) – documented only, not automated (read-only rule) |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- All TD-529 pages returned 404 at 11:0x UTC (primary stories path and test-space fallback, ja and en). No product behaviour was verified; the run only proves the spec compiles, preflights and skips.
- Selectors in `pages/ArticleDetailPage.ts` are unverified guesses (no DOM and no data-testid list yet); see docs/DSR-529/data-testid.md. Expect selector fixes when JOB-20261015-12 first runs against seeded pages.
- TD-529-02 is ja only, so DSR-ARTICLE-015/020/023/025 are implemented for ja only; DSR-ARTICLE-016 [en] checks qa529-01 only.
- DSR-ARTICLE-009 clicks My List (client-side localStorage only, no AEM write) per spec.json 9.0.
- DSR-ARTICLE-017/018/019/022/027/028 and all cn rows are fixme (blocked per spec.json); manual 001/004/005/021/032 and visual 030/031 are fixme.
- DSR-ARTICLE-020 records the gap before the footer action in px but does not assert it (normal section gap is not specified in px).
