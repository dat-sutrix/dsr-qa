# DSR-552 DEV automation run — 20261015-dsr591

Hub job JOB-20261014-01, the retest of bug DSR-591. **This run is superseded by [automation-run-20261015-dsr591-rerun.md](automation-run-20261015-dsr591-rerun.md)**. It produced invalid TC-002/TC-011 data because of a test-side timing defect (see §7).

## 1. Header

- Run start (UTC): 2026-10-15T05:07:24Z
- Run end (UTC): 2026-10-15T05:08:42Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/test-space/dsr552-bc/child/grandchild (navigation to ancestors and HOME)
- Build under test: DEV after the DSR-591 fix (deployed 2026-10-14 per job); build ID/SHA not independently verified
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: 8ae839ad3ed9461a3c434fb7cb271a94b5af2e76 + uncommitted new spec `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` (first version, without settle wait)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261014-01/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/JOB-20261014-01.json npm run test:dev -- tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 6 | 2 | 4 | 0 | 1 | 2 | configured 1; 4 retried, all failed again | 77.4 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (retest spec only); chromium. Flaky outcomes: 0.

## 4. Executed tests

Durations are per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-005 | DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | Pass | 3.3 s | — |
| DSR-BREAD-002 | DSR-BREAD-002 [ja] ancestor links navigate in same tab | Fail | 5.1 s / 8.2 s | Attempt 1: ancestor links read before rendering (test defect); both attempts: HOME /master/ja HTTP 404 |
| DSR-BREAD-011 | DSR-BREAD-011 [ja] items equal page titles | Pass (weak) | 3.4 s | — (per-item title loop saw only 2 items; final trail assertion passed) |
| DSR-BREAD-005 | DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | Fail | 8.1 s / 8.1 s | test-space item missing from trail |
| DSR-BREAD-002 | DSR-BREAD-002 [en] ancestor links navigate in same tab | Fail | 4.2 s / 4.1 s | Ancestor links read before rendering (test defect); HOME /master/en HTTP 404 |
| DSR-BREAD-011 | DSR-BREAD-011 [en] items equal page titles | Fail | 8.2 s / 8.7 s | test-space item missing from trail |

## 5. Skipped tests

None

## 6. Failed tests

See the rerun report for the authoritative failure details. The differences in this run are listed below.

### DSR-BREAD-002 — [ja] / [en] ancestor links navigate in same tab

- Failing assertion: `expect.soft(await link.count(), 'breadcrumb link "<item>" present').toBe(1)` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:54` (first version); `expect.soft(response?.status(), 'HTTP status of …').toBe(200)` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:64` (first version)
- Expected: four ancestor links present; each target HTTP 200
- Actual: the observed list was `HOME, QA Grandchild` right after the nav became visible. `locator.count()` does not wait, so QA Child/QA Parent/test-space were reported missing. On the ja retry the links had rendered: Child/Parent/test space returned 200 and HOME `/master/ja` returned 404. On en, HOME `/master/en` returned 404.
- Attempt(s): ja and en both failed twice
- Evidence paths: `test-results/…/test-failed-1.png`, `trace.zip` (gitignored, not committed, overwritten by rerun)

### DSR-BREAD-005 / DSR-BREAD-011 — [en]

- Failing assertion: `expect(items).toHaveText(expectedTrail('en', 2))` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:43` / `:87` (first version)
- Expected: `HOME, test-space, QA Parent, QA Child, QA Grandchild`
- Actual: `HOME, QA Parent, QA Child, QA Grandchild`
- Attempt(s): failed twice
- Evidence paths: overwritten by rerun; see rerun report

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Test defect: the breadcrumb block first renders `HOME > current` and inserts ancestors asynchronously. The spec was fixed with a wait for networkidle and a stable item count, then rerun. This run must not be used for TC-002/TC-011 verdicts.
- Build identity not independently verified.
