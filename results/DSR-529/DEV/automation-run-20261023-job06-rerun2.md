# DSR-529 DEV automation run — 20261023-job06-rerun2

JOB-20261023-06 (run 2 = evidence rerun of the same subset, read-only; run 1 JSON/screenshots had been overwritten by the next Playwright run). Agent Author applied BUGCHK-586-02, TD-529-META, TD-566-FIX, TD-190-DSR, TD-587-PHASE2 on DEV between 03:33:44Z and 03:35:53Z (52 writes, all 2xx; verify L1–L3 0 FAIL – see ykk-dsr/hub/results/JOB-20261023-06/).

## 1. Header

- Run start (UTC): 2026-10-23T03:46:29Z
- Run end (UTC): 2026-10-23T03:48:28Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (.aem.live; .aem.page where the spec checks preview)
- Target page(s): same as -job06
- Build under test: not independently verified (EDS `main` as served at run time; no build ID exposed)
- Baseline ID: same as -job06
- Automation HEAD commit SHA: 43b8fc86ce2bb93cb03fdedcb99e8caa7e0b7242
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/j06-529.json npm run test:dev -- tests/article-detail/DSR-529.article-detail.spec.ts --project=chromium --grep "DSR-ARTICLE-0(12|14|16|23) "
```
(`npm run test:dev` = `ENV=dev playwright test`; BASE_URL from envs/dev.env.)

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (run 2026-10-23 ~03:39Z after the DSR-557 spec change; no code change afterwards)

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 7 | 4 | 3 | 0 | 1 | 2 (config) | configured 1; 3 retries used (all failed again) | 2.0 min |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (012/014/016/023 after TD-529-META); chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration = per attempt (attempt 1 / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ARTICLE-012 [ja] | DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 11.0s / 11.3s | meta category = `product` (1 value) – TC expects 2 tag IDs |
| DSR-ARTICLE-014 [ja] | DSR-ARTICLE-014 [ja] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | pass | 12.1s | — |
| DSR-ARTICLE-016 [ja] | DSR-ARTICLE-016 [ja] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | pass | 10.7s | — |
| DSR-ARTICLE-012 [en] | DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible | fail | 10.7s / 11.0s | meta category = `product` (1 value) – TC expects 2 tag IDs |
| DSR-ARTICLE-014 [en] | DSR-ARTICLE-014 [en] title/description/OGP/publicationdate/thumbnail/category exactly once, non-empty | pass | 10.3s | — |
| DSR-ARTICLE-016 [en] | DSR-ARTICLE-016 [en] robots: qa529-02 noindex,nofollow; qa529-01 no noindex | pass | 9.5s | — |
| DSR-ARTICLE-023 [ja] | DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ) | fail | 8.0s / 8.1s | related items block + heading visible on qa529-02 (0 results expected → トルツメ) |

## 5. Skipped tests

None.

## 6. Failed tests

### DSR-ARTICLE-012 [ja] — DSR-ARTICLE-012 [ja] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion(s): tests/article-detail/DSR-529.article-detail.spec.ts:183 (`category tag IDs`), :184 (`tag ID namespace:path`)
- Assertion messages: `Error: category tag IDs` · `Error: tag ID namespace:path`
- Expected: meta category = 2 tag IDs in namespace:path form (TC 012)
- Actual: one meta category, value `product` (TD-529-META sets category = product; field is a single select news/product/…)
- Proposed classification: suspect `test`, cause `none`, confidence real product bug 10%. Accepted [Giả định] in job approval: TC 012/014 Expected → Pending review.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-ARTICLE-012_ja.png

### DSR-ARTICLE-012 [en] — DSR-ARTICLE-012 [en] meta category = 2 tag IDs (present iff authored); searchkeywords has qa529kw1/qa529kw2, not visible

- Failing assertion(s): tests/article-detail/DSR-529.article-detail.spec.ts:183, :184
- Assertion messages: `Error: category tag IDs` · `Error: tag ID namespace:path`
- Expected: meta category = 2 tag IDs in namespace:path form
- Actual: one meta category, value `product`
- Proposed classification: suspect `test`, cause `none`, confidence real product bug 10%. Same as [ja].
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-ARTICLE-012_en.png

### DSR-ARTICLE-023 [ja] — DSR-ARTICLE-023 [ja] no related items block/heading when 0 results (トルツメ)

- Failing assertion(s): tests/article-detail/DSR-529.article-detail.spec.ts:332 (`visible related items block`), :333 (`visible related items heading`)
- Assertion messages: `Error: visible related items block` · `Error: visible related items heading`
- Expected: no visible related items block/heading on ja qa529-02 (0 results)
- Actual: 1 visible related items block (height ≈ 282 px) and heading
- Proposed classification: suspect `product`, cause `none`, confidence real product bug 50%. Not touched by this job (TD-529-META changed robots only on qa529-02); same fail since JOB-20261021-05/07.
- Evidence: ykk-dsr/hub/results/JOB-20261023-06/evidence/DSR-ARTICLE-023_ja.png

## 7. Open points for QA

- Same outcome as run 1.
- Build under test not independently verified.
- `test-results/` and `playwright-report/` are gitignored; trace/screenshot paths there are not committed.
