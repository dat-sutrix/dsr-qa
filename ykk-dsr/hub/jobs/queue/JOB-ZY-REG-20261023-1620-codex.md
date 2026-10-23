---
id: JOB-ZY-REG-20261023-1620-codex
agent: codex
us: Regression S12 – visual P1 + P2 baseline (retry of 1220/1250) + Lighthouse 3 P1 pages
type: regression visual + lighthouse (read-only)
env: dev
lang: [ja, en]
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 23/10 16:20 VN
---
Retry of `jobs/done/JOB-ZY-REG-20261023-1220-codex.md` (failed: PNG > 300 KB after palette compression – `top_en_1440.png`; then Codex usage limit) and 1250 (usage limit). **Same page set, viewports and Lighthouse scope as the 1220 job file – read it and follow it**, with these changes:
- P2 included: pending `block:catalog-detail`, `block:eco-carousel` (DSR-667) and cf-model 669/671 rows in `regression/CHANGES.md`.
- Captures are taken AFTER DSR-669/670 deploy + migration (Martin 16:15 VN) → this run is the post-669 baseline. If `results/REGRESSION/visual-ledger.json` does not exist → create it (baseline, NEW FAIL = "baseline – none"). Also compare against `results/JOB-ZY-REG-20261023-1220-codex/measurements.json` (pre-669 HTTP/title/text, 05:27Z) and list any page whose HTTP status or title changed as a NEW FAIL candidate (suspect row: DSR-669/671 cf-model, confidence per BUG-RULES §3).
- PNG size: if a PNG is still > 300 KB after palette compression, save it as JPEG quality 80 (`.jpg`); if still > 300 KB, do not commit it – store sha256 + size in the ledger and note "not committed". Never fail the job for file size.
- Lighthouse: TOP ja, video detail qa587-main ja, catalog list ja (mobile + desktop, 3 runs, median) → `results/REGRESSION/lighthouse-ledger.json` (create if missing).
Output `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-codex/summary.md` + `result.json` + `measurements.json`; summary starts with the "NEW FAIL" table (page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence). Proposed verdicts only. No AEM writes, no login, no form submit.
