---
id: JOB-ZZ-IDLE-09
agent: codex
us: DSR-360
type: visual
env: dev
lang: [en, ja]
tcs: [DSR-278 SP render timing]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle, no dependency. JOB-ZZ-IDLE-08: SP 390×844 capture of `/master/en/test-space/dsr-278-product-detail` at `load` + 3 s shows breadcrumb but **blank product content**; Lighthouse mobile P71 / A84. Decide whether content is late-rendering (timing) or never renders at SP width. Record only – no product verdict.

## Input
| Item | Value |
|---|---|
| Page URL(s) | https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/dsr-278-product-detail (ja: same path under /master/ja/ if 200, else record 404) |
| Viewports | 390×844 (SP), 1440×900 (PC) |
| data-testid available | no → visual only |

## Steps
1. Each viewport × lang: open page, capture full-page PNG at `load` + 3 s, + 10 s, + 20 s.
2. At each point record: count of visible elements inside `main` below the breadcrumb, document height, console errors (text, ≤ 5), failed requests (URL + status, ≤ 10).
3. If content appears only at SP after > 3 s → note the time. If never at SP but present at PC → note it (suspect: product).

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-09/result.json` + `summary.md` (table viewport × time → content visible yes/no) + `evidence/` (only the captures where content is blank, ≤ 5 MB). Read-only.
