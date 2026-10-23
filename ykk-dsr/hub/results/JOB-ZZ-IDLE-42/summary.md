FIX DETECTED DSR-672 2026-10-23T04:12:40.481Z
FIX DETECTED DSR-667 2026-10-23T05:42:21.376Z
FIX DETECTED DSR-667 2026-10-23T05:42:21.377Z
# JOB-ZZ-IDLE-42
DEV https://main--dsr-eds-dev--sutrix-projects.aem.live; 6 round(s); latest 2026-10-23T10:12:37.015Z. Watch complete; cutoff 18:00 VN / 11:00 UTC.
Change markers indicate measured changes, not confirmed bug closure. All outcomes are proposals.
| Check | Observed |
|---|---|
| DSR-666/667 ja 1440 | HTTP 200; gap nav/section 13.109375/0px; dot 9 clearance 513px, clipping 0px, center hit true |
| DSR-666/667 ja 390 | HTTP 200; gap nav/section 9/0px; dot 9 clearance 57px, clipping 0px, center hit true |
| DSR-666/667 ja 393 | HTTP 200; gap nav/section 9/0px; dot 9 clearance 58.5px, clipping 0px, center hit true |
| DSR-672 ja  | HTTP 200; date ["2026.10.01"]; YYYY.MM.DD pass |
| DSR-672 en  | HTTP 200; date ["2026.10.01"]; YYYY.MM.DD pass |
Failures: cause=none; date format product-bug confidence 85% when HTTP 200 and text is present. Gap/overlap observations require QA acceptance.
TC 14.0/15.0: 2 viewport sets (1440×900 / 390×844), scrolled captures, fullPage=false; visual baseline comparison pending.
Evidence: evidence/DSR-566/visual-20261023/; watch evidence and exact geometry: results/JOB-ZZ-IDLE-42/history.json and evidence/.
TypeScript: npx tsc --noEmit exit 0, no errors. No npm suite invoked.
Schedule: results/JOB-ZZ-IDLE-42/schedule.json. No AEM writes. Build identity not independently verified.
