---
id: JOB-ZZ-IDLE-04
agent: codex
us: visual-baseline
type: visual-capture
env: dev
lang: [ja, en]
tcs: [baseline screenshots]
priority: P3 (idle)
created_by: claude-web
---

## Context
Idle work, no dependency: capture a visual baseline of existing DEV test pages for later diff (no verdicts).

## Pages (https://main--dsr-eds-dev--sutrix-projects.aem.live)
/master/{ja,en}/test-space/dsr552-bc/child/grandchild · /master/ja/test-space/dsr552-edge/long/leaf · /master/{ja,en}/test-space/list-catalog · /master/en/test-space/dsr-173-video-detail · /master/en/test-space/dsr-278-product-detail · /master/{ja,en}/test-space/product-list · /master/{ja,en} (root)

## Steps
Chromium, viewports 1440×900 and 390×844, full page, wait for network idle + 1 s. Record `document.documentElement.scrollWidth` vs viewport (flag overflow only). Skip 404 pages (record).

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-04/summary.md` + `evidence/<page-slug>_<vp>.png` (commit, ≤ 15 MB total; JPEG quality 70 if larger).
