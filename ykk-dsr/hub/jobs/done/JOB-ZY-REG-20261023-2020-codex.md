---
id: JOB-ZY-REG-20261023-2020-codex
agent: codex
us: Regression S12 – visual P1 + P2 vs post-669 baseline + Lighthouse 3 P1 pages
type: regression visual + lighthouse (read-only)
env: dev
lang: [ja, en]
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 23/10 20:20 VN
---
**Same page set, viewports (1440×900, 390×844, viewport only – no fullPage) and Lighthouse scope as `jobs/done/JOB-ZY-REG-20261023-1620-codex.md` (→ 1220 job file) – read and follow it.** P2 included: pending `global` (DSR-639 header/footer href) and `block:*` rows (DSR-661 related-content, DSR-649 digital-showroom) in `regression/CHANGES.md`.
- Compare each capture vs `results/REGRESSION/visual-ledger.json` (post-669 baseline from REG-1620-codex): pixel diff > threshold, HTTP status or title change = NEW FAIL candidate (suspect CHANGES.md row if any, else "unannounced"; confidence per BUG-RULES). Then update the ledger (`last`, keep baseline).
- Lighthouse: TOP ja, video detail qa587-main ja, catalog list ja (mobile + desktop, 3 runs, median) vs `results/REGRESSION/lighthouse-ledger.json`; perf score drop ≥ 10 or LCP +1 s on median = candidate.
- PNG size rule as in 1620-codex (JPEG q80 fallback; > 300 KB → sha256 + size only, "not committed"; never fail for file size).
Output `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-codex/summary.md` + `result.json` + `measurements.json`; summary starts with the "NEW FAIL" table (page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence). Proposed verdicts only. No AEM writes, no login, no form submit.
