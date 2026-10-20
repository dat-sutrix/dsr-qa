# JOB-ZZ-IDLE-18 — Sprint 12 post-merge baseline
UTC: 2026-10-20T01:04:46.222Z to 2026-10-20T01:08:56.083Z; DEV; Chromium 153.0.8010.12.
Status: done; no verdicts. 28 targets: 26 captured, 2 capture errors.
Revisited all 22 IDLE-16 targets plus eco top page and ja/en qa529-01 at both viewports.
Full-page PNG; 1440×900 / 390×844; network idle + 1s; 60s timeout, retry 120s.
HTTP status changes vs IDLE-16: 0; pixel comparisons vs JOB-20261019-06: 18.
Committed 0 qualifying PNGs (0 bytes); all other PNGs remain on VPS in /home/qa/dsr-baselines/JOB-ZZ-IDLE-18/.
Every retained PNG path and SHA-256 is listed per target in result.json.
Catalog cards: /master/ja/test-space/list-catalog 390x844: 17, /master/ja/test-space/list-catalog 1440x900: 17, /master/en/test-space/list-catalog 390x844: 17, /master/en/test-space/list-catalog 1440x900: 17.
Counts describe initial rendered cards; no pagination/load-more interactions.
New targets and previously uncaptured targets lack comparison PNGs; see per-target reasons.
HTTP error pages were also captured to record width and retain a future baseline.
Deployed build / overlay merge identity not independently verified.
TypeScript: npx tsc --noEmit — exit 0, no errors. No npm assertion suite or Lighthouse run.
Capture errors: /master/en/test-space/dsr-278-product-detail 390x844: page.waitForLoadState: Timeout 120000ms exceeded.; /master/en/test-space/dsr-278-product-detail 1440x900: page.waitForLoadState: Timeout 120000ms exceeded.
