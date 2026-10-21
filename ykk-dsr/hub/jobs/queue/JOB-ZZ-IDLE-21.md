---
id: JOB-ZZ-IDLE-21
agent: codex
us: DSR-529
type: visual + lighthouse (record only)
env: dev
lang: [ja, en]
tcs: [visual baseline + Lighthouse article-detail pages]
priority: P3 (idle)
created_by: claude-web ([schedule] morning 2026-10-21)
---

## Context
Idle work, no dependency on Dat/QA-PT. Codex queue empty. Article pages now have correct data (JOB-20261020-10). Capture a visual baseline and Lighthouse for later before/after comparison once DSR-657/658/659 are fixed. **Record only – no verdict.**

## Input
| Item | Value |
|---|---|
| Page URL(s) | https://main--dsr-eds-dev--sutrix-projects.aem.live/master/{ja,en}/library/article/stories/qa529-01, …/qa529-r1, /master/ja/library/article/stories/qa529-02 |
| Viewports | PC 1440×900, SP 390×844 |

## Steps
1. Preflight HTTP status; 404 → record and skip.
2. Full-page screenshots (fonts loaded, animations disabled) → `results/JOB-ZZ-IDLE-21/baseline/<page>_<lang>_<vp>.png` (≤ 5 MB total, compress).
3. Lighthouse mobile + desktop per page: performance, accessibility, best-practices, SEO into result.json `lighthouse[]`. Flag < 95 performance, image 404s (relative /content/dam → DSR-659).

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-21/` result.json + summary.md.
