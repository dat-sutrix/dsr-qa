# DSR-654 DEV automation run — 20261023-job09

## 1. Header

- Run start (UTC): 2026-10-23T04:48:25Z
- Run end (UTC): 2026-10-23T04:48:34Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (preview tier `.aem.page` for the preview-only TCs)
- Target page(s): /en/library/catalog/qa654-preview on .aem.page and .aem.live
- Build under test: not independently verified (EDS main branch on DEV at run time)
- Baseline ID: BL-OVL-1 (docs/DSR-587/overlay-data-flow-BL.md) + Martin 23/10 decision (overlay has no preview; DSR-674 Dismissed)
- Automation HEAD commit SHA: c3af819e51009c34b86d444778d5d7e0ac206792 (+ uncommitted JOB-20261023-09 edits to the 3 spec files, committed with this report)
- Exact command used:

```sh
ENV=dev npx playwright test --grep "DSR-VOV-002|DSR-CATOV-009|DSR-PDO-002" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 1 | 1 | 0 | 0 | 0 | 2 | 1 configured; 0 test(s) retried | 1.8 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset – DSR-CATOV-009 from a 3-test run (VOV-002, CATOV-009, PDO-002; all 3 passed, exit 0, wall 7.2 s); this report lists DSR-CATOV-009 only; chromium. Flaky outcomes: none.

## 4. Executed tests

Duration = summed over attempts. Failed tests failed on both attempts (initial + 1 retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATOV-009 | DSR-CATOV-009 [en] preview-only DSR CF → not-found stub on .aem.page (overlay has no preview), 404 on .aem.live | passed | 1.8 s | — |

## 5. Skipped tests

None

## 6. Failed tests

None
## 7. Open points for QA

- Expected changed per JOB-20261023-09 (approved exception to AGENTS §4): preview-only DSR CF → `.aem.page` 200 overlay not-found stub (rows source: overlay + unavailable: not-found, robots noindex, no item title/name) and `.aem.live` 404. Source: Martin 23/10, DSR-674 Dismissed, tc-out updated by Claude in 1e02259.
- Build identity on DEV not independently verified.
- The 'no title/name' check is a substring search for the TD title/name in the raw HTML body (PDO/VOV) or the full HTML (CATOV).
- Wall time column = this test's summed duration; the whole 3-test run took 7.2 s.
- JSON reporter output went to stdout (reporter override) – parsed from the saved log; HTML report written to playwright-report/ (not committed).
