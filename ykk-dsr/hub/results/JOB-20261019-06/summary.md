# JOB-20261019-06 — DEV visual capture
UTC: 2026-10-20T00:57:43.482Z to 2026-10-20T01:01:05.432Z; Chromium 153.0.8010.12; full page, 1440×900 / 390×844, network idle + 1s.
Status: needs-input; no verdicts. 21 captures, 4 HTTP 404 skips, 1 capture errors; four retained baseline comparisons.
All 22 original targets revisited; four supplemental video-list targets added for card counts.
No HTTP status changes on original targets; English product-list remains 404. English video-list is also 404 (no historical status).
| Page | Cards desktop/mobile | Diff % desktop/mobile |
|---|---|---|
| /master/ja/test-space/list-catalog | 17/17 | 8.150612/41.461834 |
| /master/en/test-space/list-catalog | 17/17 | 8.147396/41.448457 |
| /master/ja/test-space/product-list | 1/1 | N/A/N/A |
| /master/ja/test-space/video-list | 3/3 | N/A/N/A |
Product-detail mobile returned HTTP 200 but network idle timed out at 60s and 120s; no screenshot or diff.
Counts describe initial rendered cards per page; pagination/load-more not exercised; historical counts unavailable.
Only four catalog PNGs with diff >2% committed (2,290,700 bytes); all other local captures uncommitted.
Missing IDLE-16 PNGs prevent remaining pixel comparisons; no substitution of older baselines.
Deployed build / requested merge not verified; host UTC precedes the job’s timezone-unspecified 07:45 queue note.
TypeScript: npx tsc --noEmit — exit 0, no errors. No npm suite, Figma or Lighthouse run.
See result.json for per-target HTTP status, URLs, widths, attempts, counts, and comparison limitations.
