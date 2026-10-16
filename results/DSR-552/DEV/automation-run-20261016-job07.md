# DSR-552 DEV automation run — 20261016-job07

Hub job JOB-20261016-07 is the DSR-552 close-out on DEV. It applies the QA decisions of 2026-10-16:
- **015:** the expected label is now the published navtitle, and tag stripping upstream is accepted.
- **002/008:** the HOME step is fixme while the top page returns 404 (B3).
- **025:** the test waits for the breadcrumb block to load before reading JSON-LD.

## 1. Header

- Run start (UTC): 2026-10-16T10:04:59Z
- Run end (UTC): 2026-10-16T10:05:29Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s):
  - /master/{ja,en}/test-space/dsr552-bc/child/grandchild (002, 025)
  - /master/{ja,en} (008)
  - /master/ja/test-space/dsr552-edge/special/leaf, with parent /dsr552-edge/special (015)
- Build under test: DEV as deployed on 2026-10-16. Build ID/SHA not independently verified.
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: a7a229304d533683e1cec991ff6f11253ad04d99, plus uncommitted changes to `tests/breadcrumb/DSR-552.breadcrumb.spec.ts` and `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts`, committed with this report
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261016-07/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job07/results.json npm run test:dev -- --project=chromium tests/breadcrumb/ --grep "DSR-BREAD-0(02|08|15|25) "
```

Preflight (Playwright request, about 10:03Z):
- `/master/ja` and `/master/en` return 404 (B3 still open).
- `/master/en/test-space` returns 200.
- For `/master/ja/test-space/dsr552-edge/special`, query-index `navtitle` = `QA & "Test" ®`.

Spec changes:
- **015** (`DSR-552.breadcrumb.spec.ts:209`):
  - Expected label = the published navtitle of the parent page. It is read from the page `<meta name="navtitle">` and from `/query-index.json`, and the two values must be equal.
  - The 4th item, the full trail and the JSON-LD name must all equal that navtitle literally.
  - Also asserted: no `b/strong/script` element, no dialog, and no console or page error (any origin; before, only breadcrumb-related errors were checked).
  - Comment `// QA decision 2026-10-16: tag stripping upstream accepted`.
- **002** (main spec `:101`, ja only; DSR-591 retest spec `:79`, ja+en):
  - HOME is now the last link.
  - The other 3 links run in full: href, target, HTTP 200, URL after click, same tab.
  - The HOME href/target are still asserted. Then `test.fixme(homeStatus === 404, 'blocked-env: top page 404 on DEV (B3)')` stops the test before the HOME click and status check.
- **008** (`:61`): the test first asserts 0 breadcrumb and 0 BreadcrumbList on `/master/{lang}`. Then `test.fixme(status === 404, 'blocked-env: top page 404 on DEV (B3)')` runs before the HTTP 200 assertion.
- **025** (`:113`): the test waits for `main [data-block-name="breadcrumb"]` to reach `data-block-status="loaded"` before reading JSON-LD. Probe: on DEV, the block element is `div.breadcrumb.block[data-block-name="breadcrumb"]`.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 10 | 3 | 0 | 7 | 0 | 2 | configured 1; 0 used | 28.9s (Playwright), 30s including npm startup |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: subset (002/008/015/025, both breadcrumb specs) on chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt. The fixme tests ran their non-HOME assertions before the runtime fixme. A soft failure before the fixme would have marked the test failed (Playwright keeps `failed` over `skipped`), and none occurred (0 errors recorded).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-002 | ja › DSR-BREAD-002 ancestor links | skipped (fixme at HOME step; 3 other links passed) | 11.7s | — |
| DSR-BREAD-002 | DSR-BREAD-002 [ja] ancestor links navigate in same tab (DSR-591 spec) | skipped (fixme at HOME step; 3 other links passed) | 6.6s | — |
| DSR-BREAD-002 | DSR-BREAD-002 [en] ancestor links navigate in same tab (DSR-591 spec) | skipped (fixme at HOME step; 3 other links passed) | 5.2s | — |
| DSR-BREAD-008 | ja › DSR-BREAD-008 HOME excludes breadcrumb | skipped (fixme at HOME status; breadcrumb/JSON-LD absence passed) | 1.5s | — |
| DSR-BREAD-008 | en › DSR-BREAD-008 HOME excludes breadcrumb | skipped (fixme at HOME status; breadcrumb/JSON-LD absence passed) | 1.4s | — |
| DSR-BREAD-015 | DSR-BREAD-015 [ja] special characters in display name are plain text | passed | 4.3s | — |
| DSR-BREAD-025 | ja › DSR-BREAD-025 BreadcrumbList structured data | passed (first attempt) | 3.2s | — |
| DSR-BREAD-025 | en › DSR-BREAD-025 BreadcrumbList structured data | passed (first attempt) | 2.1s | — |

Observed:
- **002:**
  - ja links (main spec): `/master/ja/test-space`, `/dsr552-bc` and `/dsr552-bc/child` return 200; `/master/ja` returns 404.
  - DSR-591 spec, ja and en: QA Child, QA Parent and test space/test-space links have `target=null`, return 200 and open in the same tab. The HOME href is `/master/{lang}` (404).
- **008:** ja and en `/master/{lang}` return 404. breadcrumbCount 0, BreadcrumbList 0.
- **015:**
  - meta navtitle and query-index navtitle are both `QA & "Test" ®`. The 4th item is `<a …>QA &amp; "Test" ®</a>` followed by the arrow image.
  - Trail: `HOME, test space, QA Edge, QA & "Test" ®, QA Special Leaf`. JSON-LD names are identical to the trail.
  - 0 dialogs, 0 console/page errors.
- **025:** ja trail is `HOME, test space, QA Parent, QA Child, QA Grandchild`; en trail is `HOME, test-space, …`. Both have 5 JSON-LD entries. The en run has the stale `Bug-INDEX` annotation, but the en trail now includes test-space.

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-002 [ja] (main spec) | blocked-env: top page 404 on DEV (B3) |
| DSR-BREAD-002 [ja] (DSR-591 spec) | blocked-env: top page 404 on DEV (B3) |
| DSR-BREAD-002 [en] (DSR-591 spec) | blocked-env: top page 404 on DEV (B3) |
| DSR-BREAD-008 [ja] | blocked-env: top page 404 on DEV (B3) |
| DSR-BREAD-008 [en] | blocked-env: top page 404 on DEV (B3) |
| DSR-BREAD-008 [cn] | cn: no /master/cn (Issue #18) |
| DSR-BREAD-025 [cn] | cn: no /master/cn (Issue #18) |

## 6. Failed tests

None.

The main spec's afterEach wrote `evidence/DSR-552/DEV/DSR-BREAD-025_ja_pass.png` (a committed file, now reverted to its committed version) and created `DSR-BREAD-015_ja_pass.png` and `DSR-BREAD-025_en_pass.png` (removed). This keeps the committed evidence unchanged; per the hub protocol only failure screenshots are committed. Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- **002/008 fixme design:**
  - `test.fixme` inside a test stops the test at that point. The HOME step was therefore moved to the end, so that all other assertions run first.
  - The fixme is conditional on HOME returning 404. Once B3 is fixed (top page published), the HOME click and status assertions run again automatically.
  - Main-spec 002 exists only for ja, so the en 002 coverage comes from the DSR-591 retest spec.
- **015:**
  - The test now passes on the QA "Pass with assumption" basis. The authored Author value was not checked (read-only).
  - The no-console-error check now covers every origin. If a third-party script error appears later, 015 will fail on it.
- **025:** one clean run per language, with no retry used. Flakiness over repeated runs was not measured; `--repeat-each` was not run.
- 025 en still has the `Bug-INDEX` annotation, although `/master/en/test-space` is now 200 and appears in the trail. QA may want to remove the annotation; it was not changed here.
- Build identity not verified; Chromium only.
