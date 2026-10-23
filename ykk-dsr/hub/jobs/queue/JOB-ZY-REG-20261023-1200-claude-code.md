---
id: JOB-ZY-REG-20261023-1200-claude-code
agent: claude-code
us: Regression S12 – baseline R2 (all dev changes 20–23/10) = P1 + P2
type: regression (read-only)
env: dev
priority: P1
created_by: claude-web 23/10 12:00 VN (Dat: regression guard)
---
Policy: `ykk-dsr/hub/regression/README.md`. Changes covered: every row of `regression/CHANGES.md` with `regressed = no` (deploys dev/2026.10.22, _2, _3; og:image PR #206; dsr-catalog-list; /ja/library/catalog authored; news-detail template + date via Text; list config tag; DSR-638 URL moves).
1. Run R3 P1 + P2 specs (README §1 table; `@auto` only, exclude `@manual`/`@blocked`/`analysis/`/`*capture*`/`*retest*`), ja + en, `ENV=dev`. Record wall time per spec file.
2. Create `results/REGRESSION/ledger.json` (first baseline; schema README §5; `last_pass_at` = now for passes). For the baseline, "previous result" = the latest earlier run of that TC in `results/<US>/DEV/automation-run-*.md` / `ykk-dsr/hub/results/*/result.json` – any TC that passed there and fails now → NEW FAIL table at the top of summary.md (TC, lang, last pass job/date, error, suspect change row from CHANGES.md, confidence). Known fails with an open bug / Blocked-by → "known", not NEW FAIL.
3. Standard run report `results/REGRESSION/DEV/automation-run-20261023-reg1200.md`. Output `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1200-claude-code/summary.md` + `result.json`. tsc exit 0. No AEM writes.
