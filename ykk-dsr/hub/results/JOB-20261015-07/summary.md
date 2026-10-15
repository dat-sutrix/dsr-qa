# JOB-20261015-07 – DSR-557 DSR-CATV-006 facade rule, DEV, en

**Result: DSR-CATV-006 en passes** on the first attempt, with no retries (chromium, 3.2s). tsc: no errors.
The assertion was refined in place under the QA decision (comment `// DSR-109 facade: thumbnail allowed (QA decision 2026-10-15)`). No other test changed.
- Before the click: 0 iframes of any origin, and 0 requests matching the new `playerRequests` pattern in `fixtures/dsr-557.ts` (youtube.com/embed, youtube-nocookie.com, www.youtube.com/s/|iframe_api|player, player.youku.com, *.ytimg.com/yts/).
- The only youtube-domain request before the click was the facade thumbnail `https://img.youtube.com/vi/irFRtAVphCY/maxresdefault.jpg`. It is now allowed and only recorded.
- After the click, the iframe src is `https://www.youtube.com/embed/irFRtAVphCY?rel=0&start=38&autoplay=1&playsinline=1`. It is asserted against `youtube(-nocookie).com/embed/`.
- ja is skipped (runtime skip) because the ja video page returns 404 on DEV. It was not listed in this job's `lang`.
Interpretation note: `www.youtube.com/s` is matched as the `/s/` path (player JS), not any path starting with "s".
Not covered: the below-the-fold precondition (the player is in the first view, and the test does not scroll) and Youku (no CF on DEV).
Run report: `results/DSR-557/DEV/automation-run-20261015-job07.md`. No evidence was committed because nothing failed.
