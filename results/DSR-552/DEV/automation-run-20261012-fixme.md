# DSR-552 DEV automation run — 20261012 — fixme

## 1. Header

- Run start (UTC): 2026-10-12T05:28:41Z
- Run end (UTC): 2026-10-12T05:28:50Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /master/{ja,en}/test-space/dsr552-bc hierarchy; /master/{ja,en}; missing child; T4 leaf blocked.
- Build under test: not independently verified; current public DEV Publish.
- Baseline ID: first DEV Chromium snapshots 20261012; current appearance, not approved Figma.
- Automation HEAD commit SHA: 21cfdf389d4bd3a94dbf3dbc2a58e2b24c0780f9; uncommitted task implementation tested.
- Exact command used:

```sh
ENV=dev DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json PLAYWRIGHT_JSON_OUTPUT_NAME=evidence/DSR-552/DEV/runs/fixme.json npx playwright test --grep 'DSR-BREAD-0(10|14|15|18|19|21|22|23|29|30|33|34)' --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 12 | 0 | 0 | 12 | 0 | 1 actual / 2 configured | 1 configured; 0 actual | 6.81 s |

Counts are unique tests, not attempts. Proposed outcomes; human QA confirms.
Scope: fixme; chromium. Flaky: 0.

## 4. Executed tests

Durations summed across attempts. Initial and retry results retained in JSON.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-010 [N/A/chromium] | Bug-FIELD |
| DSR-BREAD-014 [N/A/chromium] | Bug-FIELD (100-char label) |
| DSR-BREAD-015 [N/A/chromium] | Bug-FIELD |
| DSR-BREAD-018 [N/A/chromium] | Bug-FIELD |
| DSR-BREAD-019 [N/A/chromium] | DSR-555 + cn |
| DSR-BREAD-021 [N/A/chromium] | DSR-575 Q5 (SP display) |
| DSR-BREAD-022 [N/A/chromium] | DSR-575 Q5 (SP display) |
| DSR-BREAD-023 [N/A/chromium] | DSR-575 Q5 (SP display) |
| DSR-BREAD-029 [N/A/chromium] | Run on STG (Lighthouse) |
| DSR-BREAD-030 [N/A/chromium] | DSR-536 / movie-detail placement |
| DSR-BREAD-033 [N/A/chromium] | Layout tickets |
| DSR-BREAD-034 [N/A/chromium] | DSR-536 / movie-detail placement |

## 6. Failed tests

None
Evidence copied to evidence/DSR-552/DEV is committed. Original test-results/ and playwright-report/ plus local archived copies are gitignored, not committed.

## 7. Open points for QA

- Proposed outcomes only; build ID, Jira/Excel/Figma and Author values not independently verified.
- T4 leaf 404 blocks TC-007. T3 sp-a title mismatch; sp-b/sp-c 404. English test-space 404 is known Bug-INDEX, assertions remain active.
- Noto CJK system package absent; installation prohibited by repo safety. Noto Sans JP web font loaded in preflight. No Chinese font validation.
- Auto command adds --grep-invert @visual to avoid creating/checking visual snapshots before the dedicated first baseline run. Visual creation runs Chromium only to preserve its reference; comparison runs all TC-032 projects.
- TC-001 initial placement locator selected inner duplicate data-auto-block; corrected to direct main section, followed by focused rerun. TC-002/008 rerun collects remaining checks despite the HOME HTTP failure (soft assertion).
- Browser launch failures due to missing host libraries are infrastructure blocks, not product failures. STG/PRO and manual cases were not run.

- Raw observed attachments sample trail at initial breadcrumb visibility, before asynchronous index/title enrichment finishes. Assertions wait for expected values; screenshots are captured after assertions. Do not interpret initial samples as final trail counts. Final TypeScript check: exit 0, no errors.
