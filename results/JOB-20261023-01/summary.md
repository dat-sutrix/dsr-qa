# JOB-20261023-01 — done (proposed outcomes)
DEV Chromium 156.0.8078.4, 1440×900; 12 cold-context loads, 45 s observation each; 4 direct JSON GETs.
UTC: 2026-10-23T00:56:37.418Z → 2026-10-23T00:59:10.919340+00:00; before 11:00 VN deadline.
| Host | Language | Attempts | HTTP | Cards | Direct JSON items | Proposed classification |
|---|---|---|---|---|---|---|
| .aem.live | ja | 1–3 | 200, 200, 200 | 0, 0, 0 | 7 | render issue |
| .aem.live | en | 1–3 | 200, 200, 200 | 6, 6, 6 | 8 | recovered |
| .aem.page | ja | 1–3 | 200, 200, 200 | 0, 0, 0 | 7 | render issue |
| .aem.page | en | 1–3 | 200, 200, 200 | 6, 6, 6 | 8 | recovered |
Japanese pages never requested dsr-catalog-list; direct Japanese JSON contains 7 items. Cause none; suspect product, confidence 70%; page/content configuration not independently verified.
English DOM order (all attempts): QA654 subfolder → QA654 update → catalog ebook → catalog ebook form → catalog pdf → catalog pdf form.
English JSON has 8 items (includes inactive and missing-content entries); six rendered cards are not classified as a failure.
Japanese direct query derived from observed English URL with language folder substitution; no exact Japanese page request existed.
result.json contains per-attempt request URLs/status/timing/body bytes/item counts/lang values, full JSON, console errors, page errors, card titles and screenshot paths.
Absent item lang fields are null; language paths retained. No design verdict; final QA confirmation pending.
Evidence: evidence/JOB-20261023-01/ (12 viewport PNGs, committed as explicitly requested by job).
TypeScript: npx tsc --noEmit exit 0, no errors. Capture script only; no npm suite run.
Direct-fetch setup API error was corrected; all 4 GETs completed using direct.cjs. Browser captures were not rerun.
Run report: results/DSR-557/DEV/automation-run-20261023-job01.md.
