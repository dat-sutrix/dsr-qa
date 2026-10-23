# JOB-20261023-19 – verify TD-587-04/05 (DSR-587, DEV, en) – needs-input (cookie)

**Merge/incident-related fails:** none (no fail with cause ≠ none).

- **Step 1 (Author read-only): blocked – cookie.** GET on the CF fragment list and `author.mjs models` both return HTTP 401. The cookie file was last written 23/10 09:20 UTC. **Not verified:** the real node name of the TD-587-04 CF (QA-PT says `QA587_Upper` was created), and for `qa587/qa587-sub` whether it exists, its model, isActive, its movie ref (`qa587-main`) and its replication status.
- **Step 2:** `DSR587_SEEDED=04,05 npm run test:dev -- tests/movie-detail/DSR-587.movie-overlay.spec.ts -g "DSR-VOV-00[45]"`: 1 pass, 1 fail, exit 1. tsc exit 0.

| TC | Result | Note | suspect / cause / confidence |
|---|---|---|---|
| DSR-VOV-004 (4.0) | pass | `QA587_Upper` + `qa587_upper` → 404 | – |
| DSR-VOV-005 (5.0) | fail | `qa587-sub` → 404 ✅; legacy check `qa501-main-a` → **200**, expected 404 | test / none / 5% |

- VOV-005 fail: the `legacyId: 'qa501-main-a'` fixture is stale. That movie was moved under `movies/standard` and now has a valid page (JOB-ZZ-IDLE-06 noted this earlier). This is not a product bug. Proposal: drop or replace `legacyId` in `fixtures/dsr-587.ts` (I did not change it; the job is verify only).
- **Comparison with chrome/QA-PT `after` (Night Report 23/10):** it matches. On .live and .page, `QA587_Upper` and `qa587_upper` → 404, flat `qa587-sub` → 404, and `/en/library/video/qa587/qa587-sub` → 200 stub (noindex, body "unavailable" → list), which is by design per KNOWN-FACTS CATOV-010.
- If AEM had renamed the node, I could not check the new name's URL, because the name is unknown until the Author read works.
- Next: Dat pastes a new cookie, then step 1 is re-run alone.

Report: `results/DSR-587/DEV/automation-run-20261023-job19.md`. Evidence: `evidence/DSR-VOV-005_en.png` (qa501-main-a 200 page).
