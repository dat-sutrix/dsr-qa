CHANGED
# JOB-ZZ-IDLE-41 — DEV viewport retest
Latest capture: 2026-10-23T04:17:57.672Z; 2 round(s). Read-only Chromium; CSS pixels; unmodified viewport PNGs.
Target: https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/dsr-590-eco-top-page
| Viewport | HTTP | Nav bottom → hero | Section bottom → hero | Dot 9 right | Next left | Clearance | Dot overflow past container |
|---|---:|---:|---:|---:|---:|---:|---:|
| 1440×900 | 200 | 13.109375 | 0 | 827 | 1340 | 513 | 0 |
| 428×926 | 200 | 9 | 0 | 298 | 372 | 74 | 0 |
| 393×852 | 200 | 9 | 0 | 298 | 337 | 39 | 1 |
| 390×844 | 200 | 9 | 0 | 298 | 334 | 36 | 4 |
| 375×667 | 200 | 9 | 0 | 298 | 319 | 21 | 19 |
Evidence and raw geometry: evidence/DSR-590/retest/20261023T041757/; all rounds: ykk-dsr/hub/results/JOB-ZZ-IDLE-41/history.json.
Values changed versus previous round; deployment identity and fix acceptance remain unverified.
Proposed observations only; no final QA verdict. Positive clearance means no button overlap.
Repeated every two hours from first capture until 18:00 VN (11:00 UTC); schedule.json records due times.
TypeScript: npx tsc --noEmit exit 0, no errors (initial setup). No npm suite or manual TC execution.
