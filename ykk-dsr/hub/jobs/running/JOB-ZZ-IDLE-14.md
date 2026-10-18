---
id: JOB-ZZ-IDLE-14
agent: codex
us: DSR-586, DSR-587
type: visual
env: dev
lang: [en, ja]
tcs: [visual baseline overlay pages (record only), lighthouse overlay pages]
priority: P3 (idle)
created_by: claude-web ([schedule] morning 2026-10-18)
---

## Context
Idle work, no dependency on Dat/QA-PT. Codex lane had no queued job. Overlay (json2html) pages of DSR-586 / DSR-587 (baseline BL-OVL-1, `docs/DSR-587/overlay-data-flow-BL.md`) have no visual baseline yet; their visual TCs wait for Figma nodes (Q29), so this is a **record-only** baseline for later comparison. No verdict.

## Pages (branch preview, read-only)
Base: https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page
- /en/products/46 (DSR-586 test page)
- /en/library/video/qa501-main-a (DSR-587 / DSR-647 test page)
- /ja/products/46 (record HTTP status only if 404)

## Steps
1. For each page: final URL, HTTP status, `last-modified` response header.
2. Full-page PNG at 1440×900 and 390×844, wait `load` + 10 s (JOB-ZZ-IDLE-09 showed SP content can appear only after 3–10 s). Record whether main content is visible.
3. On the video page: count related cards and record their titles in DOM order (input for DSR-647 P3-order; no verdict).
4. Lighthouse mobile + desktop, 3 runs, median of the 4 categories; top 3 failing audits per page.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-14/result.json` (`lighthouse[]`, tests with `result: pass` = recorded) + `summary.md` (≤ 20 lines). Commit only PNGs of pages that fail to render (≤ 5 MB). No HTML reports. Read-only; no Author access.
