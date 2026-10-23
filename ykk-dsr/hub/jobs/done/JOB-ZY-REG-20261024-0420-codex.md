---
id: JOB-ZY-REG-20261024-0420-codex
agent: codex
us: Regression S12 – visual P1 vs visual-ledger + Lighthouse 3 P1 pages
type: regression visual + lighthouse (read-only)
env: dev
lang: [ja, en]
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 24/10 04:20 VN
---
**Same P1 page set, viewports (1440×900, 390×844, viewport only – no fullPage) and Lighthouse scope as `jobs/done/JOB-ZY-REG-20261024-0020-codex.md` (→ 2020/1620 job files) – read and follow it.** P2 not included: no `global`/`block`/`template` row deployed since REG-0020 (DSR-639/661/649 still `pending` in `regression/CHANGES.md`).
- Compare each capture vs `results/REGRESSION/visual-ledger.json` (last = REG-0020): pixel diff > threshold, HTTP status or title change = NEW FAIL candidate (suspect CHANGES.md row if any, else "unannounced"; confidence per BUG-RULES). Then update the ledger (`last`, keep baseline).
- video-list en 1440: duplicate "QA587 main movie" card is data (2 DSR CFs `QA587_Upper` + `qa587-main` → same content CF, REG-0020 claude-code 4a) – not a candidate unless the layout changes otherwise.
- Lighthouse: TOP ja, video detail qa587-main ja, catalog list ja (mobile + desktop, 3 runs, median) vs `results/REGRESSION/lighthouse-ledger.json`; perf score drop ≥ 10 or LCP +1 s on median = candidate.
- PNG size rule as in 1620-codex (JPEG q80 fallback; > 300 KB → sha256 + size only, "not committed"; never fail for file size).
Output `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0420-codex/summary.md` + `result.json` + `measurements.json`; summary starts with the "NEW FAIL" table (page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence). Proposed verdicts only. No AEM writes, no login, no form submit.
