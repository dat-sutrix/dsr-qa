# DSR-552 DEV automation run — 20261012 — visual

## 1. Header

- Run start (UTC): 2026-10-12T05:27:15Z
- Run end (UTC): 2026-10-12T05:27:51Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /master/{ja,en}/test-space/dsr552-bc hierarchy; /master/{ja,en}; missing child; T4 leaf blocked.
- Build under test: not independently verified; current public DEV Publish.
- Baseline ID: first DEV Chromium snapshots 20261012; current appearance, not approved Figma.
- Automation HEAD commit SHA: 21cfdf389d4bd3a94dbf3dbc2a58e2b24c0780f9; uncommitted task implementation tested.
- Exact command used:

```sh
ENV=dev DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json PLAYWRIGHT_JSON_OUTPUT_NAME=evidence/DSR-552/DEV/runs/visual.json npx playwright test --grep DSR-BREAD-0(20|32)
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 4 | 2 | 2 | 0 | 1 | 2 actual / 2 configured | 1 configured; 2 actual | 33.46 s |

Counts are unique tests, not attempts. Proposed outcomes; human QA confirms.
Scope: visual; chromium, firefox, webkit. Flaky: 0.

## 4. Executed tests

Durations summed across attempts. Initial and retry results retained in JSON.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-020 | DSR-BREAD-020 PC breadcrumb baseline [ja/chromium] | Pass | 2.703 s | — |
| DSR-BREAD-032 | DSR-BREAD-032 cross-browser baseline [ja/chromium] | Pass | 3.349 s | — |
| DSR-BREAD-032 | DSR-BREAD-032 cross-browser baseline [ja/firefox] | Fail | 21.254 s | Firefox: 865 pixels differ (~2%); threshold 1% |
| DSR-BREAD-032 | DSR-BREAD-032 cross-browser baseline [ja/webkit] | Blocked (browser dependencies) | 0.018 s | WebKit host libraries missing |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
None

## 6. Failed tests

### DSR-BREAD-032 — ja/firefox

- Failing assertion: breadcrumb/DSR-552.breadcrumb.spec.ts:141; exact assertion locations and expected vs actual below.
- Attempts: 0: failed, 1: failed
- Evidence paths: evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_attempt1_DSR-BREAD-32-ja-chromium-expected-png.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_attempt2_DSR-BREAD-32-ja-chromium-expected-png.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry0_DSR-BREAD-32-ja-chromium-actual-png.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry0_DSR-BREAD-32-ja-chromium-diff-png.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry0_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry0_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry0_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry1_DSR-BREAD-32-ja-chromium-actual-png.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry1_DSR-BREAD-32-ja-chromium-diff-png.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry1_screenshot.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry1_ja-evidence.png, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_firefox_retry1_trace.zip

```text
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') })
  865 pixels (ratio 0.02 of all image pixels) are different.

  Snapshot: DSR-BREAD-32_ja-chromium.png

Call log:
  - Expect "toHaveScreenshot(DSR-BREAD-32_ja-chromium.png)" locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') }) with timeout 5000ms
    - verifying given screenshot expectation
  - waiting for locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') })
    - locator resolved to <div data-auto-block="breadcrumb" data-section-status="loaded" class="full-bleed breadcrumb-section section breadcrumb-container">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - 865 pixels (ratio 0.02 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') })
    - locator resolved to <div data-auto-block="breadcrumb" data-section-status="loaded" class="full-bleed breadcrumb-section section breadcrumb-container">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - 865 pixels (ratio 0.02 of all image pixels) are different.


  144 |  // Shared Chromium baseline; project name deliberately excluded for TC-032.
  145 |  test.skip(['all', 'changed'].includes(info.config.updateSnapshots) && info.project.name !== 'chromium', 'Baseline creation uses Chromium only; comparison runs all browsers');
> 146 |  await expect(page.locator('main > [data-auto-block="breadcrumb"]').filter({ has: bc.breadcrumb })).toHaveScreenshot(`DSR-BREAD-${number}_ja-chromium.png`,screenshotOptions);
      |                                                                                                     ^
  147 | });
  148 |
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:146:101
Error: expect(locator).toHaveScreenshot(expected) failed

Locator: locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') })
  865 pixels (ratio 0.02 of all image pixels) are different.

  Snapshot: DSR-BREAD-32_ja-chromium.png

Call log:
  - Expect "toHaveScreenshot(DSR-BREAD-32_ja-chromium.png)" locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') }) with timeout 5000ms
    - verifying given screenshot expectation
  - waiting for locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') })
    - locator resolved to <div data-auto-block="breadcrumb" data-section-status="loaded" class="full-bleed breadcrumb-section section breadcrumb-container">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - 865 pixels (ratio 0.02 of all image pixels) are different.
  - waiting 100ms before taking screenshot
  - waiting for locator('main > [data-auto-block="breadcrumb"]').filter({ has: getByTestId('breadcrumb') })
    - locator resolved to <div data-auto-block="breadcrumb" data-section-status="loaded" class="full-bleed breadcrumb-section section breadcrumb-container">…</div>
  - taking element screenshot
    - disabled all CSS animations
  - waiting for fonts to load...
  - fonts loaded
  - attempting scroll into view action
    - waiting for element to be stable
  - captured a stable screenshot
  - 865 pixels (ratio 0.02 of all image pixels) are different.


  144 |  // Shared Chromium baseline; project name deliberately excluded for TC-032.
  145 |  test.skip(['all', 'changed'].includes(info.config.updateSnapshots) && info.project.name !== 'chromium', 'Baseline creation uses Chromium only; comparison runs all browsers');
> 146 |  await expect(page.locator('main > [data-auto-block="breadcrumb"]').filter({ has: bc.breadcrumb })).toHaveScreenshot(`DSR-BREAD-${number}_ja-chromium.png`,screenshotOptions);
      |                                                                                                     ^
  147 | });
  148 |
    at /home/qa/work/automation-test/projects/dsr/tests/breadcrumb/DSR-552.breadcrumb.spec.ts:146:101
```

### DSR-BREAD-032 — ja/webkit

- Failing assertion: breadcrumb/DSR-552.breadcrumb.spec.ts:141; exact assertion locations and expected vs actual below.
- Attempts: 0: failed, 1: failed
- Evidence paths: evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_webkit_retry0_trace.zip, evidence/DSR-552/DEV/DSR-BREAD-032_ja_fail_visual_webkit_retry1_trace.zip

```text
Error: browserType.launch: 
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Missing libraries:                                   ║
║     libgtk-4.so.1                                    ║
║     libgraphene-1.0.so.0                             ║
║     libevent-2.1.so.7                                ║
║     libgstgl-1.0.so.0                                ║
║     libgstcodecparsers-1.0.so.0                      ║
║     libflite.so.1                                    ║
║     libflite_usenglish.so.1                          ║
║     libflite_cmu_grapheme_lang.so.1                  ║
║     libflite_cmu_grapheme_lex.so.1                   ║
║     libflite_cmu_indic_lang.so.1                     ║
║     libflite_cmu_indic_lex.so.1                      ║
║     libflite_cmulex.so.1                             ║
║     libflite_cmu_time_awb.so.1                       ║
║     libflite_cmu_us_awb.so.1                         ║
║     libflite_cmu_us_kal16.so.1                       ║
║     libflite_cmu_us_kal.so.1                         ║
║     libflite_cmu_us_rms.so.1                         ║
║     libflite_cmu_us_slt.so.1                         ║
║     libwebpdemux.so.2                                ║
║     libavif.so.16                                    ║
║     libharfbuzz-icu.so.0                             ║
║     libwayland-server.so.0                           ║
║     libmanette-0.2.so.0                              ║
║     libenchant-2.so.2                                ║
║     libhyphen.so.0                                   ║
║     libsecret-1.so.0                                 ║
║     libGLESv2.so.2                                   ║
╚══════════════════════════════════════════════════════╝
Error: browserType.launch: 
╔══════════════════════════════════════════════════════╗
║ Host system is missing dependencies to run browsers. ║
║ Missing libraries:                                   ║
║     libgtk-4.so.1                                    ║
║     libgraphene-1.0.so.0                             ║
║     libevent-2.1.so.7                                ║
║     libgstgl-1.0.so.0                                ║
║     libgstcodecparsers-1.0.so.0                      ║
║     libflite.so.1                                    ║
║     libflite_usenglish.so.1                          ║
║     libflite_cmu_grapheme_lang.so.1                  ║
║     libflite_cmu_grapheme_lex.so.1                   ║
║     libflite_cmu_indic_lang.so.1                     ║
║     libflite_cmu_indic_lex.so.1                      ║
║     libflite_cmulex.so.1                             ║
║     libflite_cmu_time_awb.so.1                       ║
║     libflite_cmu_us_awb.so.1                         ║
║     libflite_cmu_us_kal16.so.1                       ║
║     libflite_cmu_us_kal.so.1                         ║
║     libflite_cmu_us_rms.so.1                         ║
║     libflite_cmu_us_slt.so.1                         ║
║     libwebpdemux.so.2                                ║
║     libavif.so.16                                    ║
║     libharfbuzz-icu.so.0                             ║
║     libwayland-server.so.0                           ║
║     libmanette-0.2.so.0                              ║
║     libenchant-2.so.2                                ║
║     libhyphen.so.0                                   ║
║     libsecret-1.so.0                                 ║
║     libGLESv2.so.2                                   ║
╚══════════════════════════════════════════════════════╝
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
