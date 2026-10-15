# DSR-552 DEV automation run — 20261015-dsr591-rerun

Hub job JOB-20261014-01, the retest of bug DSR-591 (breadcrumb skipped published ancestors missing from query-index). This is the authoritative run. The first run is in [automation-run-20261015-dsr591.md](automation-run-20261015-dsr591.md).

## 1. Header

- Run start (UTC): 2026-10-15T05:09:09Z
- Run end (UTC): 2026-10-15T05:10:52Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/test-space/dsr552-bc/child/grandchild (navigation to /dsr552-bc/child, /dsr552-bc, /test-space, /master/{lang})
- Build under test: DEV after the DSR-591 fix (deployed 2026-10-14 per job); build ID/SHA not independently verified
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: 8ae839ad3ed9461a3c434fb7cb271a94b5af2e76 + uncommitted `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts` (committed together with this report)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261014-01/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/JOB-20261014-01.json npm run test:dev -- tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts --project=chromium
```

PRE-INDEX (curl, 2026-10-15T05:05:40Z): `/query-index.json` HTTP 200, 118 rows. `/master/en/test-space` present: **false**. `/master/en/test-space/dsr552-label` present: **true**. Direct HTTP: `/master/en/test-space` 404, `/master/ja/test-space` 200, `/master/ja` 404, `/master/en` 404, all T1 ja/en pages 200.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 6 | 2 | 4 | 0 | 1 | 2 | configured 1; 4 retried, all failed again | 102.5 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (retest spec only, 3 TCs × ja/en); chromium. Flaky outcomes: 0.

## 4. Executed tests

Durations are per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-005 | DSR-BREAD-005 [ja] grandchild trail follows URL hierarchy | Pass | 6.0 s | — |
| DSR-BREAD-002 | DSR-BREAD-002 [ja] ancestor links navigate in same tab | Fail | 9.9 s / 6.6 s | HOME /master/ja HTTP 404 (other 3 links OK) |
| DSR-BREAD-011 | DSR-BREAD-011 [ja] items equal page titles | Pass | 2.9 s | — |
| DSR-BREAD-005 | DSR-BREAD-005 [en] grandchild trail follows URL hierarchy | Fail | 9.4 s / 11.4 s | test-space item missing (4 items, expected 5) |
| DSR-BREAD-002 | DSR-BREAD-002 [en] ancestor links navigate in same tab | Fail | 10.2 s / 6.4 s | test-space link missing; HOME /master/en HTTP 404 |
| DSR-BREAD-011 | DSR-BREAD-011 [en] items equal page titles | Fail | 9.0 s / 10.1 s | test-space item missing (shown items match titles) |

## 5. Skipped tests

None

## 6. Failed tests

### DSR-BREAD-005 — [en] grandchild trail follows URL hierarchy

- Failing assertion: `await expect(items).toHaveText(expectedTrail(lang, 2))` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:48`
- Expected: `HOME > test-space > QA Parent > QA Child > QA Grandchild` (5 items)
- Actual: `HOME > QA Parent > QA Child > QA Grandchild` (4 items)
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261014-01/evidence/DSR-BREAD-005_en.png` (committed); `test-results/breadcrumb-DSR-552.breadcr-94395-trail-follows-URL-hierarchy-chromium{,-retry1}/` (not committed)

### DSR-BREAD-002 — [ja] ancestor links navigate in same tab

- Failing assertion: `expect.soft(response?.status(), 'HTTP status of /master/ja').toBe(200)` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:69`
- Expected: hrefs …/dsr552-bc/child, …/dsr552-bc, /master/ja/test-space, /master/ja; each HTTP 200, same tab
- Actual: all 4 hrefs as expected, target null, same tab (1 page). Status codes: child 200, dsr552-bc 200, test-space 200, **/master/ja 404**
- Attempt(s): failed / failed (same)
- Evidence paths: `ykk-dsr/hub/results/JOB-20261014-01/evidence/DSR-BREAD-002_ja.png` (committed); `test-results/breadcrumb-DSR-552.breadcr-a062d--links-navigate-in-same-tab-chromium{,-retry1}/` (not committed)

### DSR-BREAD-002 — [en] ancestor links navigate in same tab

- Failing assertion: `expect.soft(await link.count(), 'breadcrumb link "test-space" present').toBe(1)` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:59`; `HTTP status of /master/en` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:69`
- Expected: as for ja, with /master/en paths
- Actual: QA Child and QA Parent hrefs correct, 200, same tab. **test-space link absent.** HOME href `/master/en` correct, same tab, **HTTP 404**
- Attempt(s): failed / failed (same)
- Evidence paths: `ykk-dsr/hub/results/JOB-20261014-01/evidence/DSR-BREAD-002_en.png` (committed); `test-results/breadcrumb-DSR-552.breadcr-e81ef--links-navigate-in-same-tab-chromium{,-retry1}/` (not committed)

### DSR-BREAD-011 — [en] items equal page titles

- Failing assertion: `await expect(items).toHaveText(expectedTrail(lang, 2))` — `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts:92`
- Expected: items equal page titles, no empty item, no node name; full 5-item trail
- Actual: per-item soft checks passed (QA Parent/QA Child/QA Grandchild equal their page `<title>`; HOME fixed label; none empty; no node name). The trail is missing the `test-space` item.
- Attempt(s): failed / failed
- Evidence paths: `ykk-dsr/hub/results/JOB-20261014-01/evidence/DSR-BREAD-011_en.png` (committed); `test-results/breadcrumb-DSR-552.breadcr-a7988--en-items-equal-page-titles-chromium{,-retry1}/` (not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- **DSR-591 not proven fixed.** The pass criterion is "005 en PASS while /master/en/test-space is not in query-index". The ancestor is still not indexed, but 005 en fails.
- `/master/en/test-space` returns **HTTP 404** on publish. It is not a published page, so a breadcrumb that follows published pages would legitimately omit it. Proposed suspect: **data**. Publish the en test-space page (title `test-space`), keep it out of the index, and retest. Until then this retest cannot tell "fixed" from "not fixed".
- HOME `/master/ja` and `/master/en` return 404 (unchanged since 2026-10-12). The breadcrumb href is correct; proposed suspect: data.
- The job states data-testid is unavailable, but `data-testid="breadcrumb*"` attributes are present in the DOM. The retest uses `main nav[aria-label]` + role selectors as instructed. The nav aria-label is `パンくずリスト` on the en page as well (not asserted; for QA review).
- TC-011 HOME is checked as a fixed label (docs/DSR-552/test-data.md), not against a page title (HOME page is 404).
- Retest lives in a separate spec so the main spec's afterEach does not overwrite committed DSR-552 evidence.
- Build identity not independently verified. Firefox/WebKit not run (job scope).
- Commit follows hub job protocol (`[claude-code] JOB-20261014-01 done`, no push by agent; runner.sh pushes). This overrides the root AGENTS.md commit format per ykk-dsr/hub/AGENTS.md precedence.
