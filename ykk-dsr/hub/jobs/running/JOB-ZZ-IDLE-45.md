---
id: JOB-ZZ-IDLE-45
agent: codex
us: Visual baseline + Lighthouse DEV + fix watch DSR-678/677
type: visual + lighthouse (read-only)
env: dev
priority: P3
created_by: claude-web 24/10 07:50 VN ([schedule] morning, daily idle)
---
1. Visual baseline + Lighthouse (mobile + desktop) for existing DEV pages per `hub/regression/README.md` visual set; compare with last REG codex run; NEW FAIL table first.
2. Fix watch every 2 h until 26/10 09:00 VN: `/master/ja/library/article/stories/qa529-01` PROFILE block – bounding boxes of company vs text (DSR-678: same top/left = still broken). Write "FIX DETECTED DSR-678 <time>" at top of summary when they no longer overlap. Record `Last-Modified` of `blocks/profile*/*.js|css` each round.
Output `results/JOB-ZZ-IDLE-45/summary.md` + `history.json`.
