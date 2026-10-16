# DSR-609 DEV automation run — 20261016-tc008

## 1. Header

- Run start (UTC): 2026-10-16T04:53:37Z
- Run end (UTC): 2026-10-16T04:53:53Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (ja via .aem.page fallback after live 404; en on .aem.live).
- Target page(s): /ja/top-page, /en/top-page
- Build under test: not independently verified.
- Baseline ID: DSR-609 BL-v1 (docs/DSR-609/baseline-BL-v1.md). Job JOB-20261015-13.
- Automation HEAD commit SHA: 78407f336fe142abb53eb2ff759b6921305e593b (spec uncommitted; includes the TOP-008 preflight-404 filter fix made after automation-run-20261016.md).
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/s609/run2.json npm run test:dev -- tests/top/DSR-609.top.spec.ts --project=chromium -g DSR-TOP-008
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (empty output).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 | 1 configured; 0 actual | 13.5s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: rerun of DSR-TOP-008 (ja, en) after fixing a test defect; chromium, 1440×900. Flaky outcomes: 0.

## 4. Executed tests

Duration per single attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-TOP-008 | [ja] NEWS with empty query-index renders without error | passed | 6.5s | — |
| DSR-TOP-008 | [en] NEWS with empty query-index renders without error | passed | 4.3s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None.

## 7. Open points for QA

- Fix: the test now ignores the console 404 of a .aem.live preflight attempt (`tests/top/DSR-609.top.spec.ts:188`); the first run counted it for ja only.
- NEWS area under the mock shows heading, "VIEW ALL NEWS" and "現在、お知らせはありません。" (ja) / "There is no news at the moment." (en); 0 items; area width 1404px; page scrollWidth 1440. Empty-state content is undefined (Q10) — recorded only; pass per Q10 working rule (no console error, no broken layout).
- `/placeholders.json` 404 console error is excluded (present on every load, unrelated to NEWS); the mock replaced every `query-index.json` request, not only NEWS.
- Build identity not verified.
