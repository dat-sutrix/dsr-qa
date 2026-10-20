---
id: JOB-ZZ-IDLE-18
agent: codex
us: visual-regression
type: visual-capture
env: dev
lang: [ja, en]
tcs: [new baseline after overlay merge]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle, no dependency. Runs after JOB-20261019-06 (dated jobs sort first). Recapture the page list of JOB-ZZ-IDLE-16 (same viewports, wait) plus `/master/ja/test-space/dsr-590-eco-top-page` and `/master/{ja,en}/library/article/stories/qa529-01`, and store them as the **post-merge baseline** for the rest of Sprint 12 (diffs on 21–22/10 compare against this job). Record per page: status, scrollWidth, card counts on list pages. No verdicts.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-18/` result.json + summary.md; commit PNGs only for pages whose status changed vs IDLE-16 or diff > 2 % vs JOB-20261019-06 (others stay on VPS, list their paths).
