# DSR-566 (+ DSR-529, DSR-587) DEV automation run — 20261023-job08

## 1. Header

- Run start (UTC): 2026-10-23T04:39:36Z
- Run end (UTC): 2026-10-23T04:40:27Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (the spec also reads .aem.page for qa566-news-02)
- Target page(s): /master/{ja,en}/test-space/qa566-news-01, /master/ja/test-space/qa566-news-02, /master/ja/library/article/stories/qa529-0{1,2}, /en/library/video/qa587-{unavail,off,main}
- Build under test: not independently verified
- Baseline ID: DSR-566 BL-v1 (docs/DSR-566/baseline-BL-v1.md), DSR-529 baseline, BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md)
- Automation HEAD commit SHA: 8b706ebcfccbbe96f3a3bb1eb59c7dfabac016ec (spec file added in this commit)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job08.json npm run test:dev -- tests/analysis/JOB-20261023-08.analysis.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 7 | 7 | 0 | 0 | 0 | 1 | 0 (file sets retries 0); 0 actual | 50.2s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: subset (the JOB-20261023-08 fact-capture spec); chromium. Flaky outcomes: 0.
"Passed" means the facts were captured. These tests do not assert the TC Expected. The TC-level proposals are in `ykk-dsr/hub/results/JOB-20261023-08/result.json`.

## 4. Executed tests

Duration = single attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-NEWS-003 [ja] | DSR-672 residual: qa566-news-02 date source and shown string | pass | 19.9s | — |
| DSR-NEWS-002/006 [ja] | Back to list searched in the whole document (qa566-news-01) | pass | 2.5s | — |
| DSR-NEWS-012 [ja] | article-meta block HTML and authored classes (qa566-news-01) | pass | 4.5s | — |
| DSR-NEWS-002/006 [en] | Back to list searched in the whole document (qa566-news-01) | pass | 2.6s | — |
| DSR-NEWS-012 [en] | article-meta block HTML and authored classes (qa566-news-01) | pass | 2.5s | — |
| DSR-ARTICLE-023 [ja] | related-product block on qa529-02 vs qa529-01 | pass | 12.1s | — |
| DSR-VOV-008 [en] | overlay rows on unavailable vs normal video pages | pass | 3.9s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None. TC-level findings are in the next section.

Evidence: `ykk-dsr/hub/results/JOB-20261023-08/evidence/*.png` (viewport captures, committed) and `*-facts.json`. `test-results/` and `playwright-report/` are gitignored and **not committed**.

## 7. Open points for QA

- DSR-672 residual is not reproduced: qa566-news-02 shows `2026.10.02` without `publicationdate`, and the date comes from the Article Meta component.
- NEWS-002/006: Back to list is absent from the whole document (product, 70%). I made no locator change.
- NEWS-012: `no-mylist no-share` are authored options (data, 15%). Template default not verified.
- ARTICLE-023: the block renders a dummy fixture (`QUERY = null`, TODO DSR-356), so 0 results cannot be reached. Proposed: blocked.
- VOV-008: I propose an Expected change that ignores the technical rows `source`/`cfPath`. The test Expected is not edited. `claude/BL-OVL-1_Overlay_Data_Flow.md` is not in the repo, so I used the repo copy.
- I checked `related-product.js` and the fixture comment on DEV via curl (excerpt saved). AEM persisted query `dsr/dm-product-related` execute.json on publish returned 404. The exact query name/path is [Giả định].
