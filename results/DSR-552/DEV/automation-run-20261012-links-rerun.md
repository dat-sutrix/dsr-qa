# DSR-552 DEV automation run — 20261012 — links-rerun

## 1. Header

- Run start (UTC): 2026-10-12T05:29:00Z
- Run end (UTC): 2026-10-12T05:30:17Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /master/{ja,en}/test-space/dsr552-bc hierarchy; /master/{ja,en}; missing child; T4 leaf blocked.
- Build under test: not independently verified; current public DEV Publish.
- Baseline ID: first DEV Chromium snapshots 20261012; current appearance, not approved Figma.
- Automation HEAD commit SHA: 21cfdf389d4bd3a94dbf3dbc2a58e2b24c0780f9; uncommitted task implementation tested.
- Exact command used:

```sh
ENV=dev DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json PLAYWRIGHT_JSON_OUTPUT_NAME=evidence/DSR-552/DEV/runs/links-rerun.json npx playwright test --grep 'DSR-BREAD-00(2|8)' --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 4 | 0 | 3 | 1 | 1 | 1 actual / 2 configured | 1 configured; 3 actual | 73.43 s |

Counts are unique tests, not attempts. Proposed outcomes; human QA confirms.
Scope: links-rerun; chromium. Flaky: 0.

## 4. Executed tests

Durations summed across attempts. Initial and retry results retained in JSON.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-002 | DSR-BREAD-002 ancestor links [ja/chromium] | Fail | 20.800 s | HOME HTTP 404; expected 200 |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb [ja/chromium] | Fail | 15.064 s | HOME HTTP 404; expected 200 |
| DSR-BREAD-008 | DSR-BREAD-008 HOME excludes breadcrumb [en/chromium] | Fail | 16.498 s | HOME HTTP 404; expected 200 |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-008 [cn/chromium] | cn: no /master/cn (Issue #18) |

## 6. Failed tests

### DSR-BREAD-002 — ja/chromium

- Failing assertion: breadcrumb/DSR-552.breadcrumb.spec.ts:49; exact assertion locations and expected vs actual below.
- Attempts: 0: failed, 1: failed
- Evidence paths: evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_attempt1_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_attempt1_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_attempt1_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_attempt2_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_attempt2_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_attempt2_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_retry0_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_retry0_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_retry0_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_retry1_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_retry1_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-002_ja_fail_links-rerun_chromium_retry1_trace.zip

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404

  91 |        expect(['_self',null,'']).toContain(await link.getAttribute('target'));
  92 |        const status = (await request.get(paths[i])).status();
> 93 |        observations.push({language:lang,link:paths[i],status}); expect.soft(status).toBe(200);
     |                                                                                     ^
  94 |        const pages=page.context().pages().length; await link.click(); await expect(page).toHaveURL(new RegExp(paths[i]+'/?$')); expect(page.context().pages().length).toBe(pages); await open(page,lang,2);
  95 |       }
  96 |     }
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:93:85
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404

  91 |        expect(['_self',null,'']).toContain(await link.getAttribute('target'));
  92 |        const status = (await request.get(paths[i])).status();
> 93 |        observations.push({language:lang,link:paths[i],status}); expect.soft(status).toBe(200);
     |                                                                                     ^
  94 |        const pages=page.context().pages().length; await link.click(); await expect(page).toHaveURL(new RegExp(paths[i]+'/?$')); expect(page.context().pages().length).toBe(pages); await open(page,lang,2);
  95 |       }
  96 |     }
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:93:85
```

### DSR-BREAD-008 — ja/chromium

- Failing assertion: breadcrumb/DSR-552.breadcrumb.spec.ts:49; exact assertion locations and expected vs actual below.
- Attempts: 0: failed, 1: failed
- Evidence paths: evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_attempt1_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_attempt1_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_attempt1_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_attempt2_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_attempt2_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_attempt2_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_retry0_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_retry0_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_retry0_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_retry1_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_retry1_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-008_ja_fail_links-rerun_chromium_retry1_trace.zip

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404

  51 |     if (number === 8 || number === 9) {
  52 |       const response = await page.goto(number === 8 ? homePath(lang) : testSpacePath(lang, 'dsr552-bc/not-exist'));
> 53 |       expect.soft(response?.status()).toBe(number === 8 ? 200 : 404);
     |                                       ^
  54 |       await page.waitForLoadState('networkidle');
  55 |       const bc = new BreadcrumbPage(page); expect(await bc.breadcrumb.count()).toBe(0); expect(await bc.breadcrumbJsonLd()).toEqual([]);
  56 |       observations.push({language:lang,url:page.url(),status:response?.status(),breadcrumbCount:await bc.breadcrumb.count(),jsonld:await bc.breadcrumbJsonLd()}); return;
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:53:39
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404

  51 |     if (number === 8 || number === 9) {
  52 |       const response = await page.goto(number === 8 ? homePath(lang) : testSpacePath(lang, 'dsr552-bc/not-exist'));
> 53 |       expect.soft(response?.status()).toBe(number === 8 ? 200 : 404);
     |                                       ^
  54 |       await page.waitForLoadState('networkidle');
  55 |       const bc = new BreadcrumbPage(page); expect(await bc.breadcrumb.count()).toBe(0); expect(await bc.breadcrumbJsonLd()).toEqual([]);
  56 |       observations.push({language:lang,url:page.url(),status:response?.status(),breadcrumbCount:await bc.breadcrumb.count(),jsonld:await bc.breadcrumbJsonLd()}); return;
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:53:39
```

### DSR-BREAD-008 — en/chromium

- Failing assertion: breadcrumb/DSR-552.breadcrumb.spec.ts:49; exact assertion locations and expected vs actual below.
- Attempts: 0: failed, 1: failed
- Evidence paths: evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_attempt1_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_attempt1_en-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_attempt1_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_attempt2_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_attempt2_en-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_attempt2_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_retry0_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_retry0_en-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_retry0_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_retry1_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_retry1_en-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-008_en_fail_links-rerun_chromium_retry1_trace.zip

```text
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404

  51 |     if (number === 8 || number === 9) {
  52 |       const response = await page.goto(number === 8 ? homePath(lang) : testSpacePath(lang, 'dsr552-bc/not-exist'));
> 53 |       expect.soft(response?.status()).toBe(number === 8 ? 200 : 404);
     |                                       ^
  54 |       await page.waitForLoadState('networkidle');
  55 |       const bc = new BreadcrumbPage(page); expect(await bc.breadcrumb.count()).toBe(0); expect(await bc.breadcrumbJsonLd()).toEqual([]);
  56 |       observations.push({language:lang,url:page.url(),status:response?.status(),breadcrumbCount:await bc.breadcrumb.count(),jsonld:await bc.breadcrumbJsonLd()}); return;
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:53:39
Error: expect(received).toBe(expected) // Object.is equality

Expected: 200
Received: 404

  51 |     if (number === 8 || number === 9) {
  52 |       const response = await page.goto(number === 8 ? homePath(lang) : testSpacePath(lang, 'dsr552-bc/not-exist'));
> 53 |       expect.soft(response?.status()).toBe(number === 8 ? 200 : 404);
     |                                       ^
  54 |       await page.waitForLoadState('networkidle');
  55 |       const bc = new BreadcrumbPage(page); expect(await bc.breadcrumb.count()).toBe(0); expect(await bc.breadcrumbJsonLd()).toEqual([]);
  56 |       observations.push({language:lang,url:page.url(),status:response?.status(),breadcrumbCount:await bc.breadcrumb.count(),jsonld:await bc.breadcrumbJsonLd()}); return;
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:53:39
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
