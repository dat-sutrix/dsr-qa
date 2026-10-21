# Workload split – Sprint 12 (15–21/10/2026), human-equivalent hours (snapshot 21/10 17:45)

Method: each output converted to the hours a human QA would need (TC design = SP of TC sub-tasks, 1 SP = 1h; automation spec ≈ 3h each; automated test execution ≈ 5 min per test × language run; visual job ≈ 1h; coordination/triage/bugs/Night Pack ≈ 26h). QA-PT = actual reported hours.

| Actor | Work | Human-eq. hours | % |
|---|---|---|---|
| Claude web + scheduled tasks | 18 US TC design (213 TC), triage, 8+ Jira bugs, plans, dashboards, Night Packs | 113 | 33% |
| Agent claude-code | 58 jobs: 28 specs written, 1,327 test executions, diagnostics | 194 | 57% |
| Agent codex | 20 jobs: visual baselines / diffs / Lighthouse | 20 | 6% |
| QA-PT | 4 nights: 15/10 5h, 16/10 2h40, 19/10 3h30, 20/10 4h | 15 | **4%** |
| Total | | 342 | 100% |

Critical-path dependency (what really limits speed): 100% of AEM Author data work + manual TC is QA-PT today; 65/213 TC (31%) are Manual; overlay/product/catalog/article automation all waits for QA-PT data. Night Pack time split (20–21/10): ~75–80% CF create/fix (→ Author agent Phase 1), ~15% page/UE edits (Phase 2 partly), ~5–10% manual TC.

KPI (Dat 21/10): QA-PT ≤ 10% of total effort → met by effort (4%); real target = QA-PT ≤ 10% of critical-path work: Phase 1 (CF via Author agent) → QA-PT ~1h/night; Phase 2 (page props) → ~45 min/night (UE block edits + manual/visual judgement only).
