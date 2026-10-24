---
id: JOB-ZZ-IDLE-46
agent: codex
us: Visual baseline + Lighthouse DEV (weekend idle)
type: visual + lighthouse (read-only)
env: dev
priority: P3
created_by: claude-web 24/10 17:10 VN ([schedule] evening, idle refill)
---
1. Visual baseline + Lighthouse (mobile + desktop) for existing DEV pages per `hub/regression/README.md` visual set; compare with REG-20261024-1620-codex; NEW FAIL table first. Skip if a JOB-ZY-REG codex run finished < 2 h ago (then only step 2).
2. DSR-678 watch is moved to claude-code JOB-20261024-07 (codex watch on `/master/ja/...qa529-01` was not reliable) → **do not** write "FIX DETECTED". Instead, every 2 h until 26/10 09:00 VN, capture `/ja/library/article/stories/qa529-02` (live, 1440) and record `Last-Modified` of `blocks/profile*/*` only.
Output `results/JOB-ZZ-IDLE-46/summary.md`.
