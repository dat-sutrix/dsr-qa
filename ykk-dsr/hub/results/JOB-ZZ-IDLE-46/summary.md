# NEW FAIL
| Observation | Cause | Product-bug confidence |
|---|---|---|
| None established; visual/Lighthouse comparison skipped by job condition | none | 0% |
Step 1 skipped: JOB-ZY-REG-20261024-1620-codex finished 2026-10-24T09:34:50.401Z, under 2 hours before this run.
Step 2: captured the exact live `/ja/library/article/stories/qa529-02` at 1440×900, 2026-10-24T10:16:29.231Z.
HTTP 404; final URL unchanged. Article rendering is blocked, not a product-fix verdict.
Screenshot and raw observations: `captures/` and `captures.json` in this folder.
No profile assets loaded on the 404 page; direct GETs of profile.js/profile.css both returned 200.
Last-Modified: JS `Tue, 08 Sep 2026 11:14:30 GMT`; CSS `Fri, 18 Sep 2026 01:32:54 GMT`.
Recurring capture installed in local crontab, tagged JOB-ZZ-IDLE-46; watch.sh uses flock, watch.cjs enforces ≥2-hour spacing.
First next capture due about 2026-10-24T12:16:29Z; expires 2026-10-26T02:00:00Z (09:00 VN).
Future captures remain pending; cron needs this host running and writes captures.json/screenshots locally, without automatic commits or pushes.
No fix detection is performed. Only blocks/profile* asset Last-Modified headers are recorded.
No npm suite ran; TypeScript check not applicable to this capture-only execution. Existing watch jobs were not modified.
Proposed observation only; human QA confirms. No AEM writes, form submissions, or login.
