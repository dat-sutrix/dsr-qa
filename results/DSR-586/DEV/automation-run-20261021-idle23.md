# DSR-586 DEV baseline capture run — 20261021

## 1. Header

- Run start (UTC): 2026-10-21T06:43:39.647Z
- Run end (UTC): 2026-10-21T06:45:54.664049+00:00; browser capture finished 2026-10-21T06:44:50.027Z.
- Environment + base URLs: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page and https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /ja/products/46, /en/products/46
- Build under test: not independently verified.
- Baseline ID: baseline-20261021 (initial capture, not an approved expected design).
- Automation HEAD commit SHA: f759217187e67e2d03351f2ba5fe1e6a3d1d236e
- Exact capture command: `ENV=dev node /tmp/job-zz-idle-23.cjs`
- Reproducible source: `ykk-dsr/hub/results/JOB-ZZ-IDLE-23/capture.cjs` (copy to the above temporary path before rerunning; output paths are fixed).
- Supplementary read-only Python 3 urllib GETs: exact GraphQL URLs and returned field sets in `ykk-dsr/hub/results/JOB-ZZ-IDLE-23/product-comparison.json`.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 | 8 | 0 | 0 | 0 | 1 | 0 | 70.380s |

These are capture operations, not TC acceptance results. No npm test suite or visual assertions ran. All four live captures are 404 error pages, not usable product baselines. Proposed outcomes only; human QA confirms.
Scope/browser: Chromium 153.0.8010.12, DPR 1, PC 1440×900 and SP 375×812; no mobile emulation. Flaky outcomes: none.

## 4. Executed tests

Job capture identifiers below are not invented source-TC mappings. Durations are per capture, no retries.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| JOB-ZZ-IDLE-23-page-ja-1440 | ja 1440px https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/46 | Capture succeeded; HTTP 200 | 9.637s | — |
| JOB-ZZ-IDLE-23-page-ja-375 | ja 375px https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/46 | Capture succeeded; HTTP 200 | 8.341s | — |
| JOB-ZZ-IDLE-23-page-en-1440 | en 1440px https://main--dsr-eds-dev--sutrix-projects.aem.page/en/products/46 | Capture succeeded; HTTP 200 | 9.027s | — |
| JOB-ZZ-IDLE-23-page-en-375 | en 375px https://main--dsr-eds-dev--sutrix-projects.aem.page/en/products/46 | Capture succeeded; HTTP 200 | 8.667s | — |
| JOB-ZZ-IDLE-23-live-ja-1440 | ja 1440px https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/46 | Capture succeeded; HTTP 404 | 8.667s | — |
| JOB-ZZ-IDLE-23-live-ja-375 | ja 375px https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/46 | Capture succeeded; HTTP 404 | 8.299s | — |
| JOB-ZZ-IDLE-23-live-en-1440 | en 1440px https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/46 | Capture succeeded; HTTP 404 | 8.541s | — |
| JOB-ZZ-IDLE-23-live-en-375 | en 375px https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/46 | Capture succeeded; HTTP 404 | 8.268s | — |

## 5. Skipped tests

None. No functional suite was requested or executed.

## 6. Failed tests

None. HTTP/resource failures were recorded as observations, not asserted against an inferred expected result.

- Preview: HTTP 404 for /placeholders.json and /{lang}/products on all four captures; two console errors each, placeholders request aborted.
- Live: main document HTTP 404 for both languages and widths, one console error each.
- No uncaught page errors. Cause: none; product-bug confidence: 0% (expected publication state not established).
- Evidence: `evidence/DSR-586/baseline-20261021/` (eight PNGs, committed per job override).
- Raw diagnostics and exact observed text/meta/final URL: `ykk-dsr/hub/results/JOB-ZZ-IDLE-23/observations.json`.
- No test-results/ or playwright-report/ artifacts produced; those paths remain gitignored.

## 7. Open points for QA

- JOB-20261020-09 raw.md records Japanese preview 200/live 404 and QUICKFIT / Z15-1, unchanged now. English prior page status was not recorded.
- Both current dsr-product-page queries have the same product field set documented in JOB-09, including howToUse, notice, applicableSliderSameAsParent; no applicableSliderStandard/Special. Both return QUICKFIT® / Z15-1. Old full product values were not available; product-detail query was not rerun.
- First baseline in the requested folder: no pixel comparison or Figma approval. Live product baselines remain unavailable because the pages return 404.
- Application build, real mobile behavior and seeded functional TC data are not independently verified.
- Scroll traversal triggered lazy content before full-page screenshots; no forms, login, or content changes.
- A supplementary command initially used unavailable `python` (exit 127); rerun with `python3` succeeded. No capture was affected.
