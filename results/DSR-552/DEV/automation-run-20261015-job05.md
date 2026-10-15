# DSR-552 DEV automation run — 20261015-job05

## 1. Header

- Run start (UTC): 2026-10-15T07:18:58.159Z
- Run end (UTC): 2026-10-15T07:19:16Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page: /master/ja/test-space/dsr552-bc/child
- Build under test: not independently verified.
- Baseline ID: committed DSR-BREAD-20-ja-chromium.png and DSR-BREAD-32-ja-chromium.png in tests/breadcrumb/DSR-552.breadcrumb.spec.ts-snapshots/ at d2a7c80c584a644e4cda1fe0ce2d23a323d57caa; maxDiffPixelRatio=0.01. Existing DEV appearance baselines, not approved Figma matches.
- Automation HEAD commit SHA: d2a7c80c584a644e4cda1fe0ce2d23a323d57caa
- Exact command used (stdout/stderr captured in /tmp/JOB-20261015-05/run.log):

```sh
DSR_PREFLIGHT=/tmp/JOB-20261015-05/preflight.json npm run test:dev -- tests/breadcrumb/DSR-552.breadcrumb.spec.ts --project=chromium --grep 'DSR-BREAD-020|DSR-BREAD-032' --retries=0
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---|---|---|
| 2 | 2 | 0 | 0 | 0 | 1 actual; 2 configured | 0 configured; 0 actual | 17.997 s |

Counts are unique tests. Proposed automated outcomes only; human QA confirms.
Scope: DSR-BREAD-020 and DSR-BREAD-032, ja, Chromium, 1440×900. No flaky outcomes. Retries disabled for this visual comparison.

## 4. Executed tests

Durations are per first and only attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-020 | DSR-BREAD-020 PC breadcrumb baseline | Proposed pass | 7206 ms | — |
| DSR-BREAD-032 | DSR-BREAD-032 cross-browser baseline | Proposed pass | 5992 ms | — |

Both observations recorded HTTP 200 and final URL https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/dsr552-bc/child, with exact breadcrumb texts: HOME, test space, QA Parent, QA Child.
Local screenshots:

- `test-results/breadcrumb-DSR-552.breadcr-5f101--020-PC-breadcrumb-baseline-chromium/attachments/ja-evidence-e7da023ff8c835b7a0f5522a873f5c0bce460b74.png`
- `test-results/breadcrumb-DSR-552.breadcr-02fb2--032-cross-browser-baseline-chromium/attachments/ja-evidence-2e19ec3ee7d7bded84cdd1e51b565be76992e56f.png`

## 5. Skipped tests

None.

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and not committed; local files may be overwritten by later runs. Job evidence is limited to failures, so no PNGs were committed.

## 7. Open points for QA

- Read-only preflight checked only Japanese T1 parent and child, both HTTP 200 with exact expected titles QA Parent and QA Child. Its temporary JSON path is supplied in the command above.
- Snapshots and test code remained unchanged. No Figma approval or deployed application build identity was independently verified.
- Firefox, WebKit, other languages, STG/PRO and Lighthouse were outside this job's scope.
- Runner push and subsequent job lifecycle moves cannot be verified by this agent before returning; runner owns these steps per hub protocol.
