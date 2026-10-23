# JOB-ZZ-IDLE-43
DEV https://main--dsr-eds-dev--sutrix-projects.aem.live; 1 rounds; latest 2026-10-23T04:36:29.564Z; schedule=running; cutoff 11:00 UTC / 18:00 VN.
Compared with latest IDLE-42 geometry; identical exact-value change detection. Date on news-02 establishes a new baseline (news-01 is a different page).
| Check | Observed |
|---|---|
| DSR-666/667 1440 | HTTP 200; nav/section gap 13.109375/0px; dot9 clearance 513px; clipping 0px; center hit true |
| DSR-666/667 390 | HTTP 200; nav/section gap 9/0px; dot9 clearance 36px; clipping 4px; center hit true |
| DSR-666/667 393 | HTTP 200; nav/section gap 9/0px; dot9 clearance 39px; clipping 1px; center hit true |
| DSR-672 news-02 | HTTP 200; date ["2026.10.02"]; format pass |
Geometry outcomes remain QA proposals, using IDLE-42 acceptance policy; changes do not confirm closure.
TC 14.0/15.0 Pending: Figma 6010-59004 export unavailable; four existing viewport captures inspected. See results/JOB-ZZ-IDLE-43/visual-review.md.
L&F historical points: ISO date (85%); Back to list absent (70%); My List/share absent (50%); all cause=none. No Figma differences asserted.
npx tsc --noEmit: exit 0, no errors. No npm test suite invoked. Build identity not independently verified.
Raw geometry, URLs, HTTP statuses and screenshot paths: results/JOB-ZZ-IDLE-43/history.json. Schedule: schedule.json in the same folder.
Screenshots are viewport-based; unchanged captures deduplicated. No AEM writes. Original IDLE-42 process left untouched.
