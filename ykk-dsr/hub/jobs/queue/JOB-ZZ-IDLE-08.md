---
id: JOB-ZZ-IDLE-08
agent: codex
us: lighthouse-baseline
type: lighthouse
env: dev
lang: [ja, en]
tcs: [lighthouse baseline, DSR-278 SP capture retry]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle work, no dependency: Lighthouse baseline (record only, no verdict) of existing DEV pages, plus the SP capture that timed out in JOB-ZZ-IDLE-04.

## Pages (https://main--dsr-eds-dev--sutrix-projects.aem.live)
/master/ja · /master/en · /master/{ja,en}/test-space/dsr552-bc/child/grandchild · /master/{ja,en}/test-space/list-catalog · /master/en/test-space/dsr-173-video-detail · /master/ja/test-space/product-list · /master/en/test-space/dsr-278-product-detail

## Steps
1. Lighthouse mobile + desktop, 3 runs each, median of Performance / Accessibility / Best Practices / SEO. Skip 404 (record).
2. Top 3 failing audits per page (id + displayValue).
3. Retry SP 390×844 full-page capture of /master/en/test-space/dsr-278-product-detail with `load` + 3 s instead of network idle; record which requests keep the network busy (URL, count).

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-08/result.json` (`lighthouse[]`) + `summary.md` (score table) + `lighthouse-summary.json` + `evidence/dsr-278-product-detail_390x844.png`. No HTML reports in git. Read-only.
