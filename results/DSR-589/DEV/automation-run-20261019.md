# DSR-589 DEV automation run — 20261019

Job: JOB-ZZ-IDLE-10 (idle, write-only). First run of the new scaffold `tests/icons/DSR-589.icons.spec.ts`.

## 1. Header

- Run start (UTC): 2026-10-19T05:12:13Z
- Run end (UTC): 2026-10-19T05:13:12Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /ja/product-list, /en/product-list (A3 fallback; /master/{lang}/product-list returned 404). Product detail pages TD-589-01/02/03: no id set (all candidate ids 404).
- Build under test: DEV main branch. The application SHA was not independently verified.
- Baseline ID: spec `ykk-dsr/hub/tc-out/DSR-589.spec.json`; TD-589-06 = `results/DSR-589/DEV/temp-icon-inventory.json` (captured 2026-10-19T05:10Z by this job)
- Automation HEAD commit SHA: 21977bf4fcc709282c074b9640dfbd271f3b2e0b (scaffold uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-589.json npm run test:dev -- tests/icons/DSR-589.icons.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 15 | 0 | 2 | 13 | 1 | 2 | configured 1; 2 retries used (both failed again) | 58.3 s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: DSR-589 spec only, Chromium project. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-ICON-006 | DSR-ICON-006 [ja] icons load (HTTP 200, not broken) and have a text alternative; no console error | Fail (proposed) | 11.4 s / 11.8 s | Console error "Failed to load resource: …404" (`/placeholders.json`). Icon checks passed: 19 visible, 0 bad. |
| DSR-ICON-006 | DSR-ICON-006 [en] icons load (HTTP 200, not broken) and have a text alternative; no console error | Fail (proposed) | 12.4 s / 12.5 s | Same console 404 (`/placeholders.json`). Icon checks passed: 19 visible, 0 bad. |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ICON-001 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-001 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-002 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-003 [en] | Blocked: TD-589-04 official icon list |
| DSR-ICON-004 [ja] | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-004 [en] | Blocked: DSR-589 icon replacement not delivered (To Do – Martin); set DSR589_REPLACED=1 to run |
| DSR-ICON-005 [ja] | Blocked: TD-589-04 official icon list |
| DSR-ICON-007 [ja] | blocked-data: TD-589-02 product with 0 function values not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-008 [ja] | blocked-data: TD-589-03 product with the most function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 [ja] | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |
| DSR-ICON-009 [en] | blocked-data: TD-589-01 product with ≥ 3 function icons not identified (product detail /{lang}/products/{id} HTTP 404 on DEV) |

## 6. Failed tests

### DSR-ICON-006 [ja] — icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `expect.soft(consoleErrors, 'console errors').toEqual([])` — `tests/icons/DSR-589.icons.spec.ts:107`
- Expected: no console error (spec 6.0)
- Actual: `["Failed to load resource: the server responded with a status of 404 ()"]`. A separate network probe shows the 404 is `GET https://main--dsr-eds-dev--sutrix-projects.aem.live/placeholders.json` (fetch), which is not an icon. The other assertions passed: /ja/product-list has 19 visible icons, 0 non-200, 0 broken, 0 without a text alternative.
- Attempt(s): initial fail, retry fail (same error)
- Evidence paths: `test-results/icons-DSR-589.icons-DSR-IC-9fa3a-lternative-no-console-error-chromium/test-failed-1.png` (+ `-retry1/`, trace.zip); committed copy `ykk-dsr/hub/results/JOB-ZZ-IDLE-10/evidence/DSR-ICON-006_ja.png`

### DSR-ICON-006 [en] — icons load (HTTP 200, not broken) and have a text alternative; no console error

- Failing assertion: `expect.soft(consoleErrors, 'console errors').toEqual([])` — `tests/icons/DSR-589.icons.spec.ts:107`
- Expected: no console error (spec 6.0)
- Actual: same single console error (`/placeholders.json` 404). /en/product-list has 19 visible icons, 0 bad.
- Attempt(s): initial fail, retry fail
- Evidence paths: `test-results/icons-DSR-589.icons-DSR-IC-4b0a4-lternative-no-console-error-chromium/test-failed-1.png` (+ `-retry1/`, trace.zip); committed copy `ykk-dsr/hub/results/JOB-ZZ-IDLE-10/evidence/DSR-ICON-006_en.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- **No performance/function icons exist on DEV today.** Cards show none, filter options are text-only, and product detail pages are 404. TD-589-06 therefore holds only 5 UI chrome icons (chevron-right, bookmark, search, color-card-standard, inline close SVG). Please decide whether these are "temporary icons" under A2. If they are not, TD-589-06 must be re-captured once detail pages with function icons are published, before the icons are replaced.
- Product detail: cards have no `<a href>` and do not navigate when clicked. The job's "5 details linked from the list" was therefore approximated from card `data-id` values. All 15 ids return 404 on DEV main (ja and en). The DSR-586 branch page (`dsr-productdetail-moustache…aem.page`) was not used because it is outside this job's env.
- DSR-ICON-006 fails only on the console-error clause. The cause is `/placeholders.json` 404, a site-level fetch that is not icon-related. Suspect product/env (placeholders sheet not published on DEV). QA should decide whether 6.0 "no console error" should count non-icon errors.
- DSR-ICON-004 is skipped by design until DSR-589 is deployed: before replacement, every temp icon is present by definition. QA should run it with `DSR589_REPLACED=1`. Its matching logic (file name + sha1 vs TD-589-06) has not been exercised against a live page.
- DSR-ICON-006 text-alternative rule (A6) as implemented: alt, aria-label (on the icon or an ancestor), or the visible text/placeholder of the surrounding control. CSS pseudo-element "visible" uses the computed `content`/`display`, not a visual check. The search icon passes via the input's placeholder/label.
- 9.0 lists cn; only ja/en are scaffolded (no /master/cn on DEV, Issue #18). 12.0 is Manual and not scaffolded. 10.0/11.0 are Visual (codex lane).
- Detail ids can be supplied without code change: `DSR589_TD01`, `DSR589_TD02`, `DSR589_TD03` (used by 4.0 and 6.0 page sets). 7.0–9.0 remain fixme until those ids exist.
