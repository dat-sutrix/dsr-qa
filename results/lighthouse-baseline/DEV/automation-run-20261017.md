# lighthouse-baseline DEV automation run — 20261017

## 1. Header

- Run start (UTC): 2026-10-17T00:55:03.696Z
- Run end (UTC): 2026-10-17T01:07:10.781Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /master/ja, /master/en, /master/ja/test-space/dsr552-bc/child/grandchild, /master/en/test-space/dsr552-bc/child/grandchild, /master/ja/test-space/list-catalog, /master/en/test-space/list-catalog, /master/en/test-space/dsr-173-video-detail, /master/ja/test-space/product-list, /master/en/test-space/dsr-278-product-detail
- Build under test: not independently verified
- Baseline ID: JOB-ZZ-IDLE-08 initial recorded baseline; no quality threshold
- Automation HEAD commit SHA: 1dec2f7919aeab096df91495a6371e612ee76d09
- Exact command used:

```sh
node /tmp/idle08/run.cjs > /tmp/idle08/run.log 2>&1
npx tsc --noEmit > /tmp/idle08/tsc.log 2>&1; echo $? > /tmp/idle08/tsc.exit
```

Reproduction script: ykk-dsr/hub/results/JOB-ZZ-IDLE-08/run.cjs (originally executed from /tmp).

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---|---:|---:|---:|---:|---:|---|
| 55 | 1 capture operation; 54 measurements recorded without verdict | 0 | 0 pages | 0 | 1 | 0 | 727.1 s |

Measurement counts are runs, not unique test cases. No npm suite requested or run. Chromium, Lighthouse 13.5.0. Capture success is not a product pass. All QA outcomes remain proposals.

## 4. Executed tests

Durations are per measurement.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| lighthouse baseline | /master/ja mobile run 1 | Recorded; no verdict | 14.5 s | — |
| lighthouse baseline | /master/ja mobile run 2 | Recorded; no verdict | 10.0 s | — |
| lighthouse baseline | /master/ja mobile run 3 | Recorded; no verdict | 9.8 s | — |
| lighthouse baseline | /master/ja desktop run 1 | Recorded; no verdict | 10.2 s | — |
| lighthouse baseline | /master/ja desktop run 2 | Recorded; no verdict | 10.1 s | — |
| lighthouse baseline | /master/ja desktop run 3 | Recorded; no verdict | 10.2 s | — |
| lighthouse baseline | /master/en mobile run 1 | Recorded; no verdict | 9.6 s | — |
| lighthouse baseline | /master/en mobile run 2 | Recorded; no verdict | 9.1 s | — |
| lighthouse baseline | /master/en mobile run 3 | Recorded; no verdict | 10.3 s | — |
| lighthouse baseline | /master/en desktop run 1 | Recorded; no verdict | 9.3 s | — |
| lighthouse baseline | /master/en desktop run 2 | Recorded; no verdict | 10.0 s | — |
| lighthouse baseline | /master/en desktop run 3 | Recorded; no verdict | 9.9 s | — |
| lighthouse baseline | /master/ja/test-space/dsr552-bc/child/grandchild mobile run 1 | Recorded; no verdict | 10.3 s | — |
| lighthouse baseline | /master/ja/test-space/dsr552-bc/child/grandchild mobile run 2 | Recorded; no verdict | 10.2 s | — |
| lighthouse baseline | /master/ja/test-space/dsr552-bc/child/grandchild mobile run 3 | Recorded; no verdict | 10.2 s | — |
| lighthouse baseline | /master/ja/test-space/dsr552-bc/child/grandchild desktop run 1 | Recorded; no verdict | 9.9 s | — |
| lighthouse baseline | /master/ja/test-space/dsr552-bc/child/grandchild desktop run 2 | Recorded; no verdict | 10.5 s | — |
| lighthouse baseline | /master/ja/test-space/dsr552-bc/child/grandchild desktop run 3 | Recorded; no verdict | 10.4 s | — |
| lighthouse baseline | /master/en/test-space/dsr552-bc/child/grandchild mobile run 1 | Recorded; no verdict | 9.4 s | — |
| lighthouse baseline | /master/en/test-space/dsr552-bc/child/grandchild mobile run 2 | Recorded; no verdict | 9.6 s | — |
| lighthouse baseline | /master/en/test-space/dsr552-bc/child/grandchild mobile run 3 | Recorded; no verdict | 10.4 s | — |
| lighthouse baseline | /master/en/test-space/dsr552-bc/child/grandchild desktop run 1 | Recorded; no verdict | 10.6 s | — |
| lighthouse baseline | /master/en/test-space/dsr552-bc/child/grandchild desktop run 2 | Recorded; no verdict | 11.0 s | — |
| lighthouse baseline | /master/en/test-space/dsr552-bc/child/grandchild desktop run 3 | Recorded; no verdict | 9.6 s | — |
| lighthouse baseline | /master/ja/test-space/list-catalog mobile run 1 | Recorded; no verdict | 14.2 s | — |
| lighthouse baseline | /master/ja/test-space/list-catalog mobile run 2 | Recorded; no verdict | 15.6 s | — |
| lighthouse baseline | /master/ja/test-space/list-catalog mobile run 3 | Recorded; no verdict | 22.6 s | — |
| lighthouse baseline | /master/ja/test-space/list-catalog desktop run 1 | Recorded; no verdict | 20.3 s | — |
| lighthouse baseline | /master/ja/test-space/list-catalog desktop run 2 | Recorded; no verdict | 19.0 s | — |
| lighthouse baseline | /master/ja/test-space/list-catalog desktop run 3 | Recorded; no verdict | 15.4 s | — |
| lighthouse baseline | /master/en/test-space/list-catalog mobile run 1 | Recorded; no verdict | 15.3 s | — |
| lighthouse baseline | /master/en/test-space/list-catalog mobile run 2 | Recorded; no verdict | 14.4 s | — |
| lighthouse baseline | /master/en/test-space/list-catalog mobile run 3 | Recorded; no verdict | 16.2 s | — |
| lighthouse baseline | /master/en/test-space/list-catalog desktop run 1 | Recorded; no verdict | 17.1 s | — |
| lighthouse baseline | /master/en/test-space/list-catalog desktop run 2 | Recorded; no verdict | 16.7 s | — |
| lighthouse baseline | /master/en/test-space/list-catalog desktop run 3 | Recorded; no verdict | 16.9 s | — |
| lighthouse baseline | /master/en/test-space/dsr-173-video-detail mobile run 1 | Recorded; no verdict | 15.8 s | — |
| lighthouse baseline | /master/en/test-space/dsr-173-video-detail mobile run 2 | Recorded; no verdict | 15.0 s | — |
| lighthouse baseline | /master/en/test-space/dsr-173-video-detail mobile run 3 | Recorded; no verdict | 15.2 s | — |
| lighthouse baseline | /master/en/test-space/dsr-173-video-detail desktop run 1 | Recorded; no verdict | 13.7 s | — |
| lighthouse baseline | /master/en/test-space/dsr-173-video-detail desktop run 2 | Recorded; no verdict | 10.6 s | — |
| lighthouse baseline | /master/en/test-space/dsr-173-video-detail desktop run 3 | Recorded; no verdict | 11.6 s | — |
| lighthouse baseline | /master/ja/test-space/product-list mobile run 1 | Recorded; no verdict | 12.5 s | — |
| lighthouse baseline | /master/ja/test-space/product-list mobile run 2 | Recorded; no verdict | 12.8 s | — |
| lighthouse baseline | /master/ja/test-space/product-list mobile run 3 | Recorded; no verdict | 13.8 s | — |
| lighthouse baseline | /master/ja/test-space/product-list desktop run 1 | Recorded; no verdict | 16.7 s | — |
| lighthouse baseline | /master/ja/test-space/product-list desktop run 2 | Recorded; no verdict | 19.0 s | — |
| lighthouse baseline | /master/ja/test-space/product-list desktop run 3 | Recorded; no verdict | 18.4 s | — |
| lighthouse baseline | /master/en/test-space/dsr-278-product-detail mobile run 1 | Recorded; no verdict | 17.6 s | — |
| lighthouse baseline | /master/en/test-space/dsr-278-product-detail mobile run 2 | Recorded; no verdict | 15.0 s | — |
| lighthouse baseline | /master/en/test-space/dsr-278-product-detail mobile run 3 | Recorded; no verdict | 13.2 s | — |
| lighthouse baseline | /master/en/test-space/dsr-278-product-detail desktop run 1 | Recorded; no verdict | 14.8 s | — |
| lighthouse baseline | /master/en/test-space/dsr-278-product-detail desktop run 2 | Recorded; no verdict | 14.5 s | — |
| lighthouse baseline | /master/en/test-space/dsr-278-product-detail desktop run 3 | Recorded; no verdict | 15.2 s | — |
| DSR-278 SP capture retry | Product detail at 390×844, full-page, load + 3 s | captured | 5.0 s | Product content blank; capture operation completed |

## 5. Skipped tests

None

## 6. Failed tests

None

Lighthouse audit findings are baseline observations, not assertion failures. Screenshot: ykk-dsr/hub/results/JOB-ZZ-IDLE-08/evidence/dsr-278-product-detail_390x844.png. Full Lighthouse JSON and logs in /tmp/idle08 are not committed. No test-results/ or playwright-report/ artifacts were produced.

## 7. Open points for QA

- Build identity was not independently verified. No Figma baseline or visual assertions requested.
- Mobile screenshot shows only breadcrumb and blank product area at the specified time; no inference that the page is complete.
- Request URL/count and timing observations cover navigation through screenshot completion, not a reproduction of the earlier network-idle timeout.
- Top audits use lowest audit score, then ID, from each device's median-Performance run; missing displayValue is preserved as null.
- Results are DEV only, record-only; no quality verdict.
