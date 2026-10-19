---
id: JOB-ZZ-IDLE-15
agent: codex
us: DSR-570, DSR-587
type: visual
env: dev
lang: [ja, en]
tcs: [visual baseline DSR-570 pages (record only), lighthouse DSR-570 pages, freshness re-check qa501-main-a]
priority: P3 (idle)
created_by: claude-web ([schedule] morning 2026-10-19)
---

## Context
Idle work, no dependency on Dat/QA-PT. Codex lane had 0 queued jobs (IDLE-README: ≥ 1 per lane). DSR-570 (document download, test ticket DSR-607) pages have no visual baseline or Lighthouse yet; its functional job JOB-20261016-12 is stuck in the claude-code lane. Also re-check whether Martin re-previewed the DSR-647 test page (🔔 #5b): if `last-modified` is newer than 2026-10-16T06:43Z, the claude-code retest JOB-20261017-01 becomes meaningful. **Record only – no verdict.**

## Pages (read-only)
A. Base https://main--dsr-eds-dev--sutrix-projects.aem.live
- /master/ja/test-space/dsr-570-catalog-detail
- /master/en/test-space/dsr-570-catalog-detail (record HTTP status only if 404)
- /master/ja/test-space/list-catalog
- /master/en/test-space/list-catalog (status only if 404)

B. Base https://dsr-productdetail-moustache--dsr-eds-dev--sutrix-projects.aem.page
- /en/library/video/qa501-main-a

## Steps
1. Every page: final URL, HTTP status, `last-modified` response header.
2. Pages in A with 200: full-page PNG at 1440×900 and 390×844, wait `load` + 10 s; record whether main content (catalog cards / form) is visible; on list-catalog record card titles in DOM order.
3. Page B: count related cards, record titles in DOM order, and state `stale` (last-modified ≤ 2026-10-16T06:43Z) or `refreshed`.
4. Lighthouse mobile + desktop, 3 runs, median of the 4 categories, top 3 failing audits – pages in A with 200 only.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-15/result.json` (`lighthouse[]`, `freshness{}`, tests with `result: pass` = recorded) + `summary.md` (≤ 20 lines, first line = page B stale/refreshed). Commit only PNGs of pages that fail to render (≤ 5 MB). No HTML reports. Read-only; never submit the download form; no Author access.
