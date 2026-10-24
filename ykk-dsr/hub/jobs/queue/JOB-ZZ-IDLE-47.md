---
id: JOB-ZZ-IDLE-47
agent: claude-code
us: Regression (all specs) + automation scaffold (weekend idle)
type: run-only + write
env: dev
priority: P3
created_by: claude-web 24/10 17:10 VN ([schedule] evening, idle refill)
---
1. Daily full regression per `hub/regression/README.md` (P1+P2+P3, ja+en, `DSR566_SLUG=qa566-news-01`), skip if a JOB-ZY-REG run finished < 2 h ago (then reuse its ledger). NEW FAIL table first; `cause` + confidence on every fail; update ledger; run report per AGENTS.md. Copy any `test-results/graphql-capture/*.json` (from JOB-20261024-08 hook) into the result folder.
2. Then: next `tc-out/*.spec.json` with no `tests/**` spec among DSR-560 / DSR-568 / DSR-608 (skip 503 – done in IDLE-44) → scaffold Page Object + spec (fixme where data/page missing), `tsc --noEmit` 0, commit `[<US>] scaffold automation + run report`.
Output `results/JOB-ZZ-IDLE-47/summary.md`.
