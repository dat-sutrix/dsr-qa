---
id: JOB-ZY-REG-20261024-2020-codex
agent: codex
us: Regression S12 – visual P1 vs visual-ledger + Lighthouse 3 P1 pages
type: regression visual + lighthouse (read-only)
env: dev
lang: [ja, en]
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 24/10 20:20 VN
---
**Same P1 page set, viewports (1440×900, 390×844, viewport only – no fullPage) and Lighthouse scope as `jobs/done/JOB-ZY-REG-20261024-1620-codex.md` (→ 1220/0820 job files) – read and follow it.** P2 not included: no `global`/`block`/`template` row deployed since REG-1620 (DSR-639/661/649/675 still `pending` in `regression/CHANGES.md`; Jira 18:20–22:20 JST: no updates).
- Compare each capture vs `results/REGRESSION/visual-ledger.json` (last = REG-1620): pixel diff > threshold, HTTP status or title change = NEW FAIL candidate (suspect CHANGES.md row if any, else "unannounced"; confidence per BUG-RULES). Then update the ledger (`last`; keep baseline = good render).
- **video-list en (REG-VOV-EN, DASHBOARD 🐞):** single capture 1440 + 390 as part of the P1 set (no extra repeats); if "Unable to load" appears → record title, card count, status + first 300 chars of each request whose URL contains `graphql` or `dsr-video-list` (or `requestfailed` errorText) + console log. Duplicate "QA587 main movie" card = known data.
- Lighthouse: TOP ja, video detail qa587-main ja, catalog list ja (mobile + desktop, 3 runs, median) vs `results/REGRESSION/lighthouse-ledger.json`; perf score drop ≥ 10 or LCP +1 s on median = candidate.
- PNG size rule as in 1620-codex 23/10 (JPEG q80 fallback; > 300 KB → sha256 + size only, "not committed"; never fail for file size).
Output `ykk-dsr/hub/results/JOB-ZY-REG-20261024-2020-codex/summary.md` + `result.json` + `measurements.json`; summary starts with the "NEW FAIL" table (page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence). Proposed verdicts only. No AEM writes, no login, no form submit.
