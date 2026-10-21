---
id: JOB-ZZ-IDLE-19
agent: claude-code
us: regression (all specs)
type: run-only (read-only)
env: dev
lang: [ja, en]
tcs: [all specs under tests/]
priority: P3 (idle)
created_by: claude-web ([schedule] morning 2026-10-21)
---

## Context
Daily idle regression (IDLE-README). Since JOB-20261020-09: QA-PT re-seeded overlay/catalog CFs (Night 20/10, pages still 404 – 表示フラグ/Draft suspected), 529 data fixed (JOB-20261020-10), new bugs DSR-657/658/659 (article). Rules: BUG-RULES.md §3–4, AGENTS.md "Fail cause tag".

## Steps
1. `npx tsc --noEmit`; run the full suite once on DEV (`npm run test:dev`), default workers/retries. Standard run report per root AGENTS.md "Run reporting".
2. Compare each fail with JOB-20261020-09 / JOB-20261020-10. Tag `cause` + `confidence`; "same fail as before" = cause none. Map 529 fails to DSR-657 (002), DSR-658 (006), DSR-659 (011/013 images).
3. Record HTTP status (.page and .live) of `/en/library/video/qa587-main`, `/ja/library/video/qa587-main`, `/{ja,en}/library/catalog/qa190-cat-pdf-form`, `/{ja,en}/library/video/search` – tells QA whether the 404s cleared.
4. No code changes except obvious locator fix: DSR-529 spec looks for `related-stories`, block is `related-articles` (JOB-10 summary) – fix it, note in report.

## Output
`ykk-dsr/hub/results/JOB-ZZ-IDLE-19/` result.json + summary.md (first table "Merge/incident-related") + run report.
