# DSR-552 DEV automation run — 20261012 — tc001-rerun

## 1. Header

- Run start (UTC): 2026-10-12T05:27:57Z
- Run end (UTC): 2026-10-12T05:28:40Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /master/{ja,en}/test-space/dsr552-bc hierarchy; /master/{ja,en}; missing child; T4 leaf blocked.
- Build under test: not independently verified; current public DEV Publish.
- Baseline ID: first DEV Chromium snapshots 20261012; current appearance, not approved Figma.
- Automation HEAD commit SHA: 21cfdf389d4bd3a94dbf3dbc2a58e2b24c0780f9; uncommitted task implementation tested.
- Exact command used:

```sh
ENV=dev DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json PLAYWRIGHT_JSON_OUTPUT_NAME=evidence/DSR-552/DEV/runs/tc001-rerun.json npx playwright test --grep 'DSR-BREAD-001' --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 3 | 1 | 1 | 1 | 1 | 1 actual / 2 configured | 1 configured; 1 actual | 40.47 s |

Counts are unique tests, not attempts. Proposed outcomes; human QA confirms.
Scope: tc001-rerun; chromium. Flaky: 0.

## 4. Executed tests

Durations summed across attempts. Initial and retry results retained in JSON.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement [ja/chromium] | Pass | 6.421 s | — |
| DSR-BREAD-001 | DSR-BREAD-001 child trail and placement [en/chromium] | Fail | 26.811 s | Bug-INDEX: missing test-space level; wrong trail/item count |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-001 [cn/chromium] | cn: no /master/cn (Issue #18) |

## 6. Failed tests

### DSR-BREAD-001 — en/chromium

- Failing assertion: breadcrumb/DSR-552.breadcrumb.spec.ts:49; exact assertion locations and expected vs actual below.
- Attempts: 0: failed, 1: failed
- Evidence paths: evidence/DSR-552/DEV/DSR-BREAD-001_en_fail_tc001-rerun_chromium_retry0_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-001_en_fail_tc001-rerun_chromium_retry0_en-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-001_en_fail_tc001-rerun_chromium_retry0_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-001_en_fail_tc001-rerun_chromium_retry1_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-001_en_fail_tc001-rerun_chromium_retry1_en-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-001_en_fail_tc001-rerun_chromium_retry1_trace.zip

```text
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('breadcrumb').getByTestId('breadcrumb-item')
Timeout: 5000ms
- Expected  - 1
+ Received  + 0

  Array [
    "HOME",
-   "test-space",
    "QA Parent",
    "QA Child",
  ]

Call log:
  - Expect "soft toHaveText" getByTestId('breadcrumb').getByTestId('breadcrumb-item') with timeout 5000ms
  - waiting for getByTestId('breadcrumb').getByTestId('breadcrumb-item')
    13 × locator resolved to 3 elements


  75 |     const bc=await open(page,lang,level); const paths=expectedPaths(lang,level);
  76 |     if ([1,5,6,11].includes(number)) {
> 77 |       await expect.soft(bc.items).toHaveText(expectedTrail(lang,level));
     |                                   ^
  78 |       await expect.soft(bc.items).toHaveCount(level+3);
  79 |       if(number===1) expect.soft(await bc.breadcrumb.evaluate(nav=>{
  80 |         const section=nav.closest('main > [data-auto-block="breadcrumb"]');
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:77:35
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('breadcrumb').getByTestId('breadcrumb-item')
Expected: 4
Received: 3
Timeout:  5000ms

Call log:
  - Expect "soft toHaveCount" getByTestId('breadcrumb').getByTestId('breadcrumb-item') with timeout 5000ms
  - waiting for getByTestId('breadcrumb').getByTestId('breadcrumb-item')
    13 × locator resolved to 3 elements
       - unexpected value "3"


  76 |     if ([1,5,6,11].includes(number)) {
  77 |       await expect.soft(bc.items).toHaveText(expectedTrail(lang,level));
> 78 |       await expect.soft(bc.items).toHaveCount(level+3);
     |                                   ^
  79 |       if(number===1) expect.soft(await bc.breadcrumb.evaluate(nav=>{
  80 |         const section=nav.closest('main > [data-auto-block="breadcrumb"]');
  81 |         const header=document.querySelector('header'); const main=document.querySelector('main');
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:78:35
Error: expect(locator).toHaveText(expected) failed

Locator: getByTestId('breadcrumb').getByTestId('breadcrumb-item')
Timeout: 5000ms
- Expected  - 1
+ Received  + 0

  Array [
    "HOME",
-   "test-space",
    "QA Parent",
    "QA Child",
  ]

Call log:
  - Expect "soft toHaveText" getByTestId('breadcrumb').getByTestId('breadcrumb-item') with timeout 5000ms
  - waiting for getByTestId('breadcrumb').getByTestId('breadcrumb-item')
    14 × locator resolved to 3 elements


  75 |     const bc=await open(page,lang,level); const paths=expectedPaths(lang,level);
  76 |     if ([1,5,6,11].includes(number)) {
> 77 |       await expect.soft(bc.items).toHaveText(expectedTrail(lang,level));
     |                                   ^
  78 |       await expect.soft(bc.items).toHaveCount(level+3);
  79 |       if(number===1) expect.soft(await bc.breadcrumb.evaluate(nav=>{
  80 |         const section=nav.closest('main > [data-auto-block="breadcrumb"]');
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:77:35
Error: expect(locator).toHaveCount(expected) failed

Locator:  getByTestId('breadcrumb').getByTestId('breadcrumb-item')
Expected: 4
Received: 3
Timeout:  5000ms

Call log:
  - Expect "soft toHaveCount" getByTestId('breadcrumb').getByTestId('breadcrumb-item') with timeout 5000ms
  - waiting for getByTestId('breadcrumb').getByTestId('breadcrumb-item')
    14 × locator resolved to 3 elements
       - unexpected value "3"


  76 |     if ([1,5,6,11].includes(number)) {
  77 |       await expect.soft(bc.items).toHaveText(expectedTrail(lang,level));
> 78 |       await expect.soft(bc.items).toHaveCount(level+3);
     |                                   ^
  79 |       if(number===1) expect.soft(await bc.breadcrumb.evaluate(nav=>{
  80 |         const section=nav.closest('main > [data-auto-block="breadcrumb"]');
  81 |         const header=document.querySelector('header'); const main=document.querySelector('main');
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:78:35
```

Evidence copied to evidence/DSR-552/DEV is committed. Original test-results/ and playwright-report/ plus local archived copies are gitignored, not committed.

## 7. Open points for QA

- Proposed outcomes only; build ID, Jira/Excel/Figma and Author values not independently verified.
- T4 leaf 404 blocks TC-007. T3 sp-a title mismatch; sp-b/sp-c 404. English test-space 404 is known Bug-INDEX, assertions remain active.
- Noto CJK system package absent; installation prohibited by repo safety. Noto Sans JP web font loaded in preflight. No Chinese font validation.
- Auto command adds --grep-invert @visual to avoid creating/checking visual snapshots before the dedicated first baseline run. Visual creation runs Chromium only to preserve its reference; comparison runs all TC-032 projects.
- TC-001 initial placement locator selected inner duplicate data-auto-block; corrected to direct main section, followed by focused rerun. TC-002/008 rerun collects remaining checks despite the HOME HTTP failure (soft assertion).
- Browser launch failures due to missing host libraries are infrastructure blocks, not product failures. STG/PRO and manual cases were not run.

- Raw observed attachments sample trail at initial breadcrumb visibility, before asynchronous index/title enrichment finishes. Assertions wait for expected values; screenshots are captured after assertions. Do not interpret initial samples as final trail counts. Final TypeScript check: exit 0, no errors.
