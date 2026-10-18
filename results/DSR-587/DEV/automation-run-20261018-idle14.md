# DSR-587 DEV record-only run — 20261018

## 1. Header

- Run start (UTC): 2026-10-18T00:50:04.701Z
- Run end (UTC): 2026-10-18T00:53:15.617Z
- Environment + base URL: DEV — https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page
- Target pages: /en/library/video/qa501-main-a
- Build under test: branch preview; application SHA not independently verified.
- Baseline ID: BL-OVL-1; Figma Q29 pending.
- Automation HEAD commit SHA: ffc09b07d19d7281f1ee732cc1953a0ecb1b9ae4
- Exact commands (temporary recording scripts, no npm suite):

```sh
ENV=dev node /tmp/job-zz-idle-14/capture.cjs
ENV=dev node /tmp/job-zz-idle-14/lighthouse.cjs
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed (recorded) | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---:|---|
| 8 | 8 | 0 | 0 | 0 | 1 per script | 0 | 190.9 s (whole job) |

Counts include viewport/status records and six Lighthouse measurements per English page, not assertion-based tests. Pass means recorded only. No QA verdict.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-587 record | /en/library/video/qa501-main-a 1440×900 | Recorded | 12027 ms | — |
| DSR-587 record | /en/library/video/qa501-main-a 390×844 | Recorded | 11644 ms | — |
| DSR-587 Lighthouse record | mobile run 1 | Recorded | 10127 ms | — |
| DSR-587 Lighthouse record | mobile run 2 | Recorded | 9834 ms | — |
| DSR-587 Lighthouse record | mobile run 3 | Recorded | 10559 ms | — |
| DSR-587 Lighthouse record | desktop run 1 | Recorded | 9813 ms | — |
| DSR-587 Lighthouse record | desktop run 2 | Recorded | 10853 ms | — |
| DSR-587 Lighthouse record | desktop run 3 | Recorded | 18608 ms | — |

Durations are per recording, no retries. Raw values, response headers, card order, medians and failing audits are in `ykk-dsr/hub/results/JOB-ZZ-IDLE-14/result.json`.

## 5. Skipped tests

None.

## 6. Failed tests

None. No assertions or score thresholds were applied; Lighthouse failing audits are recorded separately in result.json.

## 7. Open points for QA

- Record-only; no Figma comparison, product verdict or independently verified application SHA.
- Successful screenshots: `test-results/JOB-ZZ-IDLE-14/en_library_video_qa501-main-a_1440x900.png`, `test-results/JOB-ZZ-IDLE-14/en_library_video_qa501-main-a_390x844.png`. Gitignored and not committed. No pages failed to render; no PNGs committed.
- Screenshot timing is load + 10 s; Lighthouse uses its own navigation lifecycle and default simulated throttling.
- Temporary scripts and raw Lighthouse JSON are local under /tmp/job-zz-idle-14 and not committed; measurements retained in result.json.
- Video playback and related content ordering requirements were not tested. Related-card media areas were blank.
