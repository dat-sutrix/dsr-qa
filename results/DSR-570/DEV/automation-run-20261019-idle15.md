# DSR-570 / DSR-587 DEV record-only run — 20261019

## 1. Header

- Run start (UTC): 2026-10-19T00:53:37.282Z
- Run end (UTC): 2026-10-19T01:00:23.860Z
- Environment: DEV
- Base URLs: https://main--dsr-eds-dev--sutrix-projects.aem.live and https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page
- Target pages: /master/ja/test-space/dsr-570-catalog-detail, /master/en/test-space/dsr-570-catalog-detail, /master/ja/test-space/list-catalog, /master/en/test-space/list-catalog, /en/library/video/qa501-main-a
- Build under test: not independently verified.
- Baseline ID: JOB-ZZ-IDLE-15 record-only capture; no comparison baseline.
- Automation HEAD: 4e53ff7df0784c53769b0ec6d3c698409153a6f3
- Exact commands (temporary drivers; no npm test suite requested):

```sh
node /tmp/job-idle15/capture.cjs
node /tmp/job-idle15/lighthouse.cjs > /tmp/job-idle15/lighthouse.log 2>&1
npx tsc --noEmit > /tmp/job-idle15/tsc.log 2>&1
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors.

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 11 | 11 recorded | 0 | 0 | 0 | 1 | 0 | 406.6 s |

Five page recordings and six Lighthouse page/device groups (18 individual audits). Pass means recorded only; no QA verdict. English detail HTTP 404 was recorded successfully; conditional capture/audit work was not scheduled. Browser: Chromium.

## 4. Executed tests

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| visual baseline DSR-570 /master/ja/test-space/dsr-570-catalog-detail | ja: Both viewport captures recorded; no QA verdict. | Recorded (pass, no verdict) | Not separately measured | — |
| visual baseline DSR-570 /master/en/test-space/dsr-570-catalog-detail | en: HTTP 404 recorded; conditional screenshot/Lighthouse work excluded. | Recorded (pass, no verdict) | Not separately measured | — |
| visual baseline DSR-570 /master/ja/test-space/list-catalog | ja: Both viewport captures recorded; no QA verdict. | Recorded (pass, no verdict) | Not separately measured | — |
| visual baseline DSR-570 /master/en/test-space/list-catalog | en: Both viewport captures recorded; no QA verdict. | Recorded (pass, no verdict) | Not separately measured | — |
| freshness re-check qa501-main-a | en: Freshness and related cards recorded; no QA verdict. | Recorded (pass, no verdict) | Not separately measured | — |
| lighthouse DSR-570 /master/ja/test-space/dsr-570-catalog-detail mobile | ja: Three runs recorded; medians and top three failing audits captured. No score threshold or QA verdict. | Recorded (pass, no verdict) | 53.2 s (sum of 3 runs) | — |
| lighthouse DSR-570 /master/ja/test-space/dsr-570-catalog-detail desktop | ja: Three runs recorded; medians and top three failing audits captured. No score threshold or QA verdict. | Recorded (pass, no verdict) | 49.7 s (sum of 3 runs) | — |
| lighthouse DSR-570 /master/ja/test-space/list-catalog mobile | ja: Three runs recorded; medians and top three failing audits captured. No score threshold or QA verdict. | Recorded (pass, no verdict) | 47.4 s (sum of 3 runs) | — |
| lighthouse DSR-570 /master/ja/test-space/list-catalog desktop | ja: Three runs recorded; medians and top three failing audits captured. No score threshold or QA verdict. | Recorded (pass, no verdict) | 51.3 s (sum of 3 runs) | — |
| lighthouse DSR-570 /master/en/test-space/list-catalog mobile | en: Three runs recorded; medians and top three failing audits captured. No score threshold or QA verdict. | Recorded (pass, no verdict) | 42.2 s (sum of 3 runs) | — |
| lighthouse DSR-570 /master/en/test-space/list-catalog desktop | en: Three runs recorded; medians and top three failing audits captured. No score threshold or QA verdict. | Recorded (pass, no verdict) | 44.1 s (sum of 3 runs) | — |

Individual Lighthouse run start/end times, scores, warnings and failing audits are in [result.json](../../../ykk-dsr/hub/results/JOB-ZZ-IDLE-15/result.json). No fabricated TC IDs; labels follow the job's task names.

## 5. Skipped tests

None. Conditional English-detail screenshots and Lighthouse were excluded because HTTP status was 404.

## 6. Failed tests

None. No visual assertions or Lighthouse score thresholds were imposed.

## 7. Open points for QA

- Literal cutoff comparison: header is 41 seconds after the stated minute-precision cutoff, in the same minute. This does not independently establish a later re-preview or retest readiness.
- Main content rendered in all six eligible catalog captures. Japanese detail cover displays a placeholder; intended imagery was not verified.
- Exact list titles, related-card titles, HTTP statuses, final URLs and Last-Modified values are in result.json.
- Successful screenshots: `test-results/JOB-ZZ-IDLE-15/` (gitignored, not committed). No HTML reports generated or committed.
- Build identity, Figma fidelity, functional form submission and author re-preview were not verified. No Author access or form submissions occurred.
- Lighthouse medians are independent per category; top three audits use lowest score then audit ID from the median-performance run. Three runs are samples, not retries.
- Temporary execution drivers and raw Lighthouse JSON remain in /tmp/job-idle15; only requested results and this report are committed.
