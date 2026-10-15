# DSR-552 DEV automation run — 20261015-job02

Hub job JOB-20261015-02 retests bug DSR-591 (breadcrumb skips published ancestors that are missing from query-index). It requeues JOB-20261014-01 after `/master/en/test-space` was reported as published on DEV on 2026-10-15.

## 1. Header

- Run start (UTC): 2026-10-15T05:53:59Z
- Run end (UTC): 2026-10-15T05:55:56Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/test-space/dsr552-bc/child and /master/{ja,en}/test-space/dsr552-bc/child/grandchild (link targets: /dsr552-bc/child, /dsr552-bc, /test-space, /master/{lang})
- Build under test: DEV as deployed on 2026-10-15; build ID/SHA not independently verified
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: 8dfe71c14c6fd6c507d3dcba2ff714d9d2360be7 + uncommitted changes to `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` (committed together with this report)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261015-02/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job-20261015-02.json npm run test:dev -- tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts --project=chromium
```

PRE (curl, 2026-10-15T05:53:15Z):
- (a) `/master/en/test-space`: HTTP **404**, `<title>`/og:title `Page not found`. The response header is `x-error: … failed to load /master/en/test-space.md from content-bus: 404`. The `?cb=`, trailing-slash, `.plain.html` and `/index` variants also return 404. For comparison, `/master/ja/test-space` returns 200 with title `test space`.
- (b) `/query-index.json` has 118 rows. `/master/en/test-space` present: **false**; `/master/ja/test-space` present: true.
- `/master/ja` and `/master/en` (HOME) both return 404.

Spec changes made for this job:
- Locators now use the live data-testid (`breadcrumb`, `breadcrumb-item`, `breadcrumb-link`) instead of `nav[aria-label]` + role.
- Added DSR-BREAD-001 (child trail).
- In DSR-BREAD-002, the HOME HTTP status is now recorded as a `home-status` annotation and not asserted, as the job requires. HOME href, URL and same-tab checks are still asserted.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 | 4 | 4 | 0 | 1 | 1 (config 2) | configured 1; 4 retries used, all failed again | 1m57s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (retest spec only); chromium. Flaky outcomes: 0.

## 4. Executed tests

Durations are per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-001 | DSR-BREAD-001 [ja] child trail follows URL hierarchy | passed | 6.1s | — |
| DSR-BREAD-005 | DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | passed | 4.5s | — |
| DSR-BREAD-002 | DSR-BREAD-002 [ja] ancestor links navigate in same tab | passed (HOME 404 recorded separately) | 8.9s | — |
| DSR-BREAD-011 | DSR-BREAD-011 [ja] items equal page titles | passed | 5.4s | — |
| DSR-BREAD-001 | DSR-BREAD-001 [en] child trail follows URL hierarchy | failed | 7.9s / 8.1s | test-space item missing (3 items) |
| DSR-BREAD-005 | DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | failed | 7.9s / 10.9s | test-space item missing (4 items) |
| DSR-BREAD-002 | DSR-BREAD-002 [en] ancestor links navigate in same tab | failed | 7.0s / 5.2s | test-space link missing |
| DSR-BREAD-011 | DSR-BREAD-011 [en] items equal page titles | failed | 10.0s / 13.3s | test-space item missing |

## 5. Skipped tests

None

## 6. Failed tests

All 4 en failures have one root cause: `/master/en/test-space` is not published (PRE a = 404). Under the job's verdict rule, en is proposed as **blocked (suspect: data)**, not as a product failure.

### DSR-BREAD-001 [en] — child trail follows URL hierarchy

- Failing assertion: `expect(items).toHaveText(expectedTrail(lang, 1))` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:50`
- Expected: `HOME > test-space > QA Parent > QA Child`
- Actual: `HOME > QA Parent > QA Child`
- Attempt(s): failed / retry failed (identical)
- Evidence paths: ykk-dsr/hub/results/JOB-20261015-02/evidence/DSR-BREAD-001_en.png; test-results/breadcrumb-DSR-552.breadcr-e62d3-trail-follows-URL-hierarchy-chromium*/

### DSR-BREAD-005 [en] — grandchild trail follows URL hierarchy

- Failing assertion: `expect(items).toHaveText(expectedTrail(lang, 2))` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:58`
- Expected: `HOME > test-space > QA Parent > QA Child > QA Grandchild` (5 items)
- Actual: `HOME > QA Parent > QA Child > QA Grandchild` (4 items)
- Attempt(s): failed / retry failed (identical)
- Evidence paths: ykk-dsr/hub/results/JOB-20261015-02/evidence/DSR-BREAD-005_en.png; test-results/breadcrumb-DSR-552.breadcr-94395-trail-follows-URL-hierarchy-chromium*/

### DSR-BREAD-002 [en] — ancestor links navigate in same tab

- Failing assertion: `expect.soft(await link.count(), 'breadcrumb link "test-space" present').toBe(1)` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:69`
- Expected: four ancestor links with hrefs …/child, …/dsr552-bc, /master/en/test-space and /master/en, each returning 200 in the same tab
- Actual: QA Child and QA Parent have the correct href, return 200, open in the same tab, and have target null. The test-space link is missing. The HOME href /master/en is correct and opens in the same tab, but returns HTTP 404 (known data gap; recorded only, not asserted).
- Attempt(s): failed / retry failed (identical)
- Evidence paths: ykk-dsr/hub/results/JOB-20261015-02/evidence/DSR-BREAD-002_en.png; test-results/breadcrumb-DSR-552.breadcr-e81ef--links-navigate-in-same-tab-chromium*/

### DSR-BREAD-011 [en] — items equal page titles

- Failing assertion: `expect(items).toHaveText(expectedTrail(lang, 2))` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:104`
- Expected: 5 items equal to page titles, including `test-space`
- Actual: the 4 rendered items match their page titles (QA Parent, QA Child, QA Grandchild; HOME is a fixed label). No item is empty and no item is a slug. The test-space item is absent, and its page has no title to compare against because it returns 404.
- Attempt(s): failed / retry failed (identical)
- Evidence paths: ykk-dsr/hub/results/JOB-20261015-02/evidence/DSR-BREAD-011_en.png; test-results/breadcrumb-DSR-552.breadcr-a7988--en-items-equal-page-titles-chromium*/

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- The job says Dat published `/master/en/test-space` on DEV on 2026-10-15. At 05:53Z, publish returned 404 from the content bus, so the page is not published (or it was published to a different path). Please re-check publication in AEM. This retest is inconclusive for DSR-591 again; the en results are identical to JOB-20261014-01.
- HOME `/master/ja` and `/master/en` still return 404 (known data gap). The HOME hrefs are correct.
- ja passed on all 4 TCs. ja test-space is published and indexed, so ja does not exercise the DSR-591 path.
- en evidence screenshots for 002/005/011 all show the grandchild breadcrumb; the 001 screenshot shows the child.
- Build identity of DEV was not verified.
- Hub housekeeping: `ykk-dsr/hub/jobs/hold/` contains a different job (codex visual) under the same ID JOB-20261015-02. `jobs/queue/JOB-20261015-03` is also a DSR-591 retest. Neither was touched.
