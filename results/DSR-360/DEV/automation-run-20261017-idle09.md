# DSR-360 DEV automation run — 20261017-idle09

## 1. Header

- Run start (UTC): 2026-10-17T10:14:47.052Z
- Run end (UTC): 2026-10-17T10:16:17.992Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target pages: /master/{en,ja}/test-space/dsr-278-product-detail
- Build under test: not independently verified.
- Baseline ID: JOB-ZZ-IDLE-09 observation instructions; no visual baseline or product assertion.
- Automation HEAD commit SHA: 256cc0973c7a580cf30a28d6958625c69382693b
- Exact command used:

```sh
ENV=dev node /tmp/job-zz-idle-09/run.cjs > /tmp/job-zz-idle-09/run.log 2>&1
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 4 | 4 | 0 | 0 | 0 | 1 | 0 | 90.940 s |

Four viewport/language observation runs, three samples each; headless Chromium via standalone Playwright script, not the npm test suite. Pass denotes capture completion only, not product conformance. Proposed outcomes; human QA confirms.

## 4. Executed tests

Durations are per observation run, including navigation and three captures; no retries.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-278 SP render timing | en 390×844 | pass (recording only) | 22.010 s | — |
| DSR-278 SP render timing | en 1440×900 | pass (recording only) | 22.164 s | — |
| DSR-278 SP render timing | ja 390×844 | pass (recording only) | 21.934 s | — |
| DSR-278 SP render timing | ja 1440×900 | pass (recording only) | 22.091 s | — |

## 5. Skipped tests

None.

## 6. Failed tests

None. No product assertions were made. Blank-content evidence: `ykk-dsr/hub/results/JOB-ZZ-IDLE-09/evidence/en_390x844_3s.png` (committed).

## 7. Open points for QA

- English SP was blank at +3 s and visible at +10/+20 s; exact onset lies between samples. PC and Japanese content appeared by +3 s. One run per combination cannot establish repeatability or root cause.
- Both language URLs returned 200. Japanese and English fixtures show different products; equivalence is not assumed.
- Cumulative console/network errors and actual sample timings are recorded in `ykk-dsr/hub/results/JOB-ZZ-IDLE-09/result.json`. Resource failures are observations, not proven causes.
- Visible-element count includes nested containers and offscreen rendered elements below the breadcrumb, with CSS visibility and opacity checked. Content presence uses text/media, not a visual baseline comparison.
- All 12 full-page screenshots were captured; only the blank sample is committed per job. Remaining PNGs and the temporary script are in `/tmp/job-zz-idle-09`, not committed and not durable evidence.
- No AEM changes, form submissions or login. Build identity, mobile-device behavior beyond viewport size, and visual correctness were not verified.
