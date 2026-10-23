---
id: JOB-ZY-REG-20261023-1250-codex
agent: codex
us: Regression S12 – visual baseline P1 (retry of JOB-ZY-REG-20261023-1220-codex, rc=1, no summary)
type: visual regression (read-only)
env: dev
priority: P2
created_by: claude-web 23/10 12:50 VN
---
Previous run captured PNGs under `results/REGRESSION/20261023-1220/` and wrote `lighthouse-ledger.json`, but exited rc=1 without `result.json` and `visual-ledger.json` is empty (likely timeout).
1. **Write result.json + summary.md first (status running), update them after each page group** so a timeout still leaves output.
2. Reuse the 1220 captures as the baseline: fill `results/REGRESSION/visual-ledger.json` (`{"<page> [<lang>] <width>": {"png": "...", "sha256": "...", "at": "<ISO>", "height": n}}`) for P1 pages (overlay video/product/catalog detail, video/catalog list, product list, catalog download, breadcrumb, TOP) ja/en at 1440/390, viewport-based (not fullPage).
3. Capture once more now and compare with the baseline (pixel diff %; > 1% → list as CHANGED with both images). Lighthouse: skip if `lighthouse-ledger.json` already has today's 3 P1 pages.
4. Time box 40 min. Output results/JOB-ZY-REG-20261023-1250-codex/.
