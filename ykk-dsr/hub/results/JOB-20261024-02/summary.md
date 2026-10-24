# JOB-20261024-02 – test-side fixes VOV-005 / CATV-018–020 / NEWS-007 (DEV, ja+en) – done

**Merge/incident-related fails:** none (0 fails).

- Fixes: `fixtures/dsr-587.ts` stale `legacyId 'qa501-main-a'` removed (VOV-005 now asserts flat `qa587-sub` → 404) · DSR-557 spec `test.use({ timezoneId: 'Asia/Tokyo' })` (spec-level) · NEWS-007 reads root `/query-index.json` first, falls back to `/master/{lang}/query-index.json` and `/master/{lang}/news/query-index.json`.
- `npx tsc --noEmit`: exit 0, no errors.
- Run: `DSR566_SLUG=qa566-news-01 DSR587_SEEDED=05 npm run test:dev -- <3 specs> -g "DSR-VOV-005|DSR-CATV-01[89]|DSR-CATV-020|DSR-NEWS-007"` → **9/9 pass**, 0 retries, exit 0.

| TC | ja | en | Raw |
|---|---|---|---|
| DSR-VOV-005 | – (en-only TC) | pass | `/en/library/video/qa587-sub` 404 |
| DSR-CATV-018 | pass | pass | NEW 0 → NEW; NEW 10/11 (11/12 days) → none; today 2026-10-24 JST |
| DSR-CATV-019 | pass | pass | UPD 0 → UPDATE; UPD 10/11 → none |
| DSR-CATV-020 | pass | pass | QA190 BOTH (pub 10-22, upd 10-23) → NEW |
| DSR-NEWS-007 | pass | pass | row found in root `/query-index.json` (238 rows); category news = meta |

Open points (details in the run report §7):
- VOV-005: the "outside /content/dam/dsr" half of TC 5.0 is no longer covered. The job-19 raw data had no suitable 404 id, so one needs to be seeded.
- CATV-018/019: the qa190 dates were seeded relative to 23/10, so the inclusive day-10 boundary was not exercised on 24/10 (NEW 10/UPD 10 are 11 days old today). Re-seed the dates or compute them relative to the run day.
- NEWS-007: `template` column is present, but its value is "".

Report: `results/DSR-587/DEV/automation-run-20261024-job02.md`. Ledger updated for 9 keys. No evidence files (no fails).
