---
id: JOB-ZZ-IDLE-44
agent: claude-code
us: Regression (all specs) + automation scaffold
type: run-only + write
env: dev
priority: P3
created_by: claude-web 24/10 07:50 VN ([schedule] morning, daily idle)
---
1. Daily full regression per `hub/regression/README.md` (P1+P2+P3, ja+en, `DSR566_SLUG=qa566-news-01`), skip if a JOB-ZY-REG run finished < 2 h ago (then reuse its ledger). NEW FAIL table first; `cause` + confidence on every fail; update ledger; run report per AGENTS.md.
2. Then: newest `tc-out/*.spec.json` with no `tests/**` spec → scaffold Page Object + spec (fixme where data/page missing), `tsc --noEmit` 0, commit `[<US>] scaffold automation + run report`.
Output `results/JOB-ZZ-IDLE-44/summary.md`.
