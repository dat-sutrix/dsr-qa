# DSR-557 DEV automation run — 20261019-job19-01-run1 (JOB-20261019-01, CATV-016/017 form-count scope fix, run 1 of 2)

## 1. Header

- Run start (UTC): 2026-10-19T05:03:54Z
- Run end (UTC): 2026-10-19T05:04:29Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/ja/test-space/list-catalog`, `/master/en/test-space/list-catalog` (both HTTP 200)
- Build under test: not independently verified (no build ID exposed on publish)
- Baseline ID: none for DSR-557. Expected results come from the TC ("no form before the e-book opens"). Assertion scope follows the QA decision of 19/10 in JOB-20261019-01. The Expected wording was not changed.
- Automation HEAD commit SHA: `9ab00a5814b58a21fb3866c27aa649f1f3116bd1`, plus uncommitted edits to `tests/catalog-video/DSR-557.catalog-video.spec.ts`. Those edits are committed with this report.
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job20261019-01-catv-run1.json npm run test:dev -- tests/catalog-video --project=chromium --grep "DSR-CATV-01[67]" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit` (one check before both runs, 2026-10-19T05:03:45Z)
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 4 | 4 | 0 | 0 | 0 | 1 (2 configured) | 1 configured; 0 used | 33.1 s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope: subset `tests/catalog-video`, grep `DSR-CATV-01[67]`, ja + en, Chromium. Flaky: 0.

## 4. Executed tests

Durations are per attempt (single attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-016 | ja › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 8.7s | — |
| DSR-CATV-017 | ja › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | passed | 7.7s | — |
| DSR-CATV-016 | en › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 6.9s | — |
| DSR-CATV-017 | en › DSR-CATV-017 e-book item flagged requiresForm opens ebookUrl without form | passed | 7.2s | — |

**Change under test.** The test still clicks the e-book link and waits for the popup navigation to `ebookUrl` (`https://www.ykkfastening.com/`). It now counts `<form>` elements only on the DSR origin, `https://main--dsr-eds-dev--sutrix-projects.aem.live`. That covers the catalog page right after the click, plus the popup only if the popup is on the DSR origin. Forms on the external popup are recorded as `externalPopupFormsIgnored` but are not asserted.

**Observed.** Run 1's JSON reporter file was deleted by run 2, because Playwright clears `test-results/` at the start of every run. Run 1's result is taken from the list reporter output (4 passed, 33.1 s). Run 2 recorded these values in all 4 tests: `formsBefore` 0, `formsOnPage` 0, `popupOnDsr` false. The run-1 per-test values were not preserved.

## 5. Skipped tests

None.

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- The DSR-origin form count is taken right after the popup's navigation request to `ebookUrl` is seen. A DSR form injected later on the catalog page, after the e-book has already opened, would not be counted. This matches the decision ("before the e-book opens").
- The popup redirects off-origin (ykkfastening.com → ykkdigitalshowroom.com), so the popup is never on the DSR origin, and `formsOnPopup` is always 0 by construction.
- Build identity was not independently verified.
