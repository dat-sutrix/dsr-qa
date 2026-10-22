# JOB-ZZ-IDLE-33 DEV audit report

## 1. Header

UTC: 2026-10-22T02:29:54.172Z → 2026-10-22T02:35:27.075Z
DEV: https://main--dsr-eds-dev--sutrix-projects.aem.live
Build: not independently verified. Baseline: JOB-ZZ-IDLE-33, ≥95 performance reference from IDLE-31.
Automation HEAD: c0e8437168f3c37bfb4db23344b055da63e749e6
Commands: node /tmp/idle33.cjs; node /tmp/idle33-capture.cjs. Script copies: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/execution/. Initial capture failed with crop outside image; corrected fullPage crop rerun succeeded.

## 2. TypeScript check

npx tsc --noEmit: exit 0, no errors.

## 3. Suite summary

16 Lighthouse attempts, all exit 0; sequential worker; no retries. Video repetitions are deliberate samples. Two EN article audits blocked. Capture rerun exit 0. Wall time: UTC timestamps above. No npm test suite ran.

| Total | At target | Below target | Blocked |
|---:|---:|---:|---:|
| 18 | 8 | 8 | 2 |

## 4. Executed tests

Ad hoc audit IDs; per-attempt duration available from start/end in lighthouse-summary.json.

| Path | Device/run | Performance |
|---|---|---:|
| /master/en/library/article/stories/qa529-01 | mobile/1 | 48 |
| /master/en/library/article/stories/qa529-01 | desktop/1 | 98 |
| /master/ja/library/article/stories/qa529-01 | mobile/1 | 93 |
| /master/ja/library/article/stories/qa529-01 | desktop/1 | 92 |
| /master/ja/library/article/stories/qa529-02 | mobile/1 | 82 |
| /master/ja/library/article/stories/qa529-02 | desktop/1 | 94 |
| /master/ja/test-space/dsr-590-eco-top-page | mobile/1 | 92 |
| /master/ja/test-space/dsr-590-eco-top-page | desktop/1 | 96 |
| /master/ja/test-space/dsr-590-eco-detail-page | mobile/1 | 94 |
| /master/ja/test-space/dsr-590-eco-detail-page | desktop/1 | 74 |
| /ja/library/video/qa587-main | mobile/1 | 96 |
| /ja/library/video/qa587-main | mobile/2 | 98 |
| /ja/library/video/qa587-main | mobile/3 | 98 |
| /ja/library/video/qa587-main | desktop/1 | 99 |
| /ja/library/video/qa587-main | desktop/2 | 99 |
| /ja/library/video/qa587-main | desktop/3 | 99 |

TOP PC 1440/SP 390 captures: HTTP 200. SP dot clipping observed; PC all dots visible.

## 5. Skipped tests

EN qa529-02 mobile/desktop blocked: No EN qa529-02 path in complete /query-index.json.

## 6. Failed tests

No framework assertions ran; below-target measurements are proposed findings, not confirmed product defects.

### /master/en/library/article/stories/qa529-01 mobile/1
Expected reference ≥95; actual 48. Assertion file:line N/A (Lighthouse audit). Cause=none; product-bug confidence=60%.
Evidence: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/lighthouse-summary.json. Raw reports in /tmp are not committed.

### /master/ja/library/article/stories/qa529-01 mobile/1
Expected reference ≥95; actual 93. Assertion file:line N/A (Lighthouse audit). Cause=none; product-bug confidence=60%.
Evidence: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/lighthouse-summary.json. Raw reports in /tmp are not committed.

### /master/ja/library/article/stories/qa529-01 desktop/1
Expected reference ≥95; actual 92. Assertion file:line N/A (Lighthouse audit). Cause=none; product-bug confidence=60%.
Evidence: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/lighthouse-summary.json. Raw reports in /tmp are not committed.

### /master/ja/library/article/stories/qa529-02 mobile/1
Expected reference ≥95; actual 82. Assertion file:line N/A (Lighthouse audit). Cause=none; product-bug confidence=60%.
Evidence: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/lighthouse-summary.json. Raw reports in /tmp are not committed.

### /master/ja/library/article/stories/qa529-02 desktop/1
Expected reference ≥95; actual 94. Assertion file:line N/A (Lighthouse audit). Cause=none; product-bug confidence=60%.
Evidence: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/lighthouse-summary.json. Raw reports in /tmp are not committed.

### /master/ja/test-space/dsr-590-eco-top-page mobile/1
Expected reference ≥95; actual 92. Assertion file:line N/A (Lighthouse audit). Cause=none; product-bug confidence=60%.
Evidence: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/lighthouse-summary.json. Raw reports in /tmp are not committed.

### /master/ja/test-space/dsr-590-eco-detail-page mobile/1
Expected reference ≥95; actual 94. Assertion file:line N/A (Lighthouse audit). Cause=none; product-bug confidence=60%.
Evidence: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/lighthouse-summary.json. Raw reports in /tmp are not committed.

### /master/ja/test-space/dsr-590-eco-detail-page desktop/1
Expected reference ≥95; actual 74. Assertion file:line N/A (Lighthouse audit). Cause=none; product-bug confidence=60%.
Evidence: ykk-dsr/hub/results/JOB-ZZ-IDLE-33/lighthouse-summary.json. Raw reports in /tmp are not committed.

### DSR-590 SP dot clipping
Ninth dot right=298; overflow-hidden parent right=294: 4 CSS px clipped. Next arrow starts x=334. Cause=none; product-bug confidence=70%.
Evidence: evidence/DSR-590/20261022/lf/TOP-390-controls-2x.png; geometry in hub result dot-clipping.json.

## 7. Open points for QA

Human QA confirms proposed outcomes. EN qa529-02 publication, deployed build and eco demo design/data not independently verified. Performance measurements alone do not establish product defects. No Author access. Job-specified captures committed; no HTML, traces or videos.
