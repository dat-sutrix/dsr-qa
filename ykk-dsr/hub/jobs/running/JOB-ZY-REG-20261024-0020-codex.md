---
id: JOB-ZY-REG-20261024-0020-codex
agent: codex
us: Regression S12 – visual P1 vs visual-ledger + Lighthouse 3 P1 pages
type: regression visual + lighthouse (read-only)
env: dev
lang: [ja, en]
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 24/10 00:20 VN
---
**Same P1 page set, viewports (1440×900, 390×844, viewport only – no fullPage) and Lighthouse scope as `jobs/done/JOB-ZY-REG-20261023-2020-codex.md` (→ 1620/1220 job files) – read and follow it.** P2 not included: no `global`/`block`/`template` row was deployed since REG-2020 (DSR-639/661/649 still `pending` in `regression/CHANGES.md`).
- Compare each capture vs `results/REGRESSION/visual-ledger.json` (last = REG-2020): pixel diff > threshold, HTTP status or title change = NEW FAIL candidate (suspect CHANGES.md row if any, else "unannounced"; confidence per BUG-RULES). Then update the ledger (`last`, keep baseline).
- **video-list en 1440** (REG-2020 candidate 8.4%, card order changed + "QA587 main movie" twice): capture again; also compare vs the REG-2020 image. Same as REG-2020 → note "stable since REG-2020 (data change likely)"; different again → record card titles in order (from page text) for both runs.
- Lighthouse: TOP ja, video detail qa587-main ja, catalog list ja (mobile + desktop, 3 runs, median) vs `results/REGRESSION/lighthouse-ledger.json`; perf score drop ≥ 10 or LCP +1 s on median = candidate.
- PNG size rule as in 1620-codex (JPEG q80 fallback; > 300 KB → sha256 + size only, "not committed"; never fail for file size).
Output `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-codex/summary.md` + `result.json` + `measurements.json`; summary starts with the "NEW FAIL" table (page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence). Proposed verdicts only. No AEM writes, no login, no form submit.
