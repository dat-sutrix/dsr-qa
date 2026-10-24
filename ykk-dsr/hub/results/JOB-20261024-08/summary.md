# JOB-20261024-08 – capture-on-fail dsr-*-list (REG-VOV-EN) – done
Merge/incident-related fails: none. tsc `--noEmit`: exit 0, no errors.
- **Hook:** `fixtures/capture-graphql.ts` wraps `page` (+ optional `graphqlCapture` fixture). Watches `graphql/execute.json/ykk/dsr-(video|catalog)-list`; captures when status ≠ 200, body not JSON / has `errors` / no `data`, empty DSR list (`data.related.items`, or dm*RelatedList/dm*DsrList via cf-models), or `requestfailed`. Writes `{reason,url,method,status,headers,body ≤ 20 KB,timing,pageUrl,consoleErrors}` at test end, attaches as `graphql-capture`. Never asserts.
- **Wired into** DSR-587 movie-overlay (VOV-011/013), DSR-557 catalog-video, DSR-654 catalog-overlay: only the `test/expect` import changed, tags untouched → every REG run of these specs uses it.
- **Capture path for REG jobs:** `test-results/graphql-capture/<titlePath>-r<repeat>-try<retry>-<epochMs>.json` (project root of `~/dsr-qa`). Playwright empties `test-results/` at every run start → REG jobs must copy `test-results/graphql-capture/*.json` (≤ 200 KB) into `ykk-dsr/hub/results/<JOB-ID>/` right after their run, before any other run.
- **Self-test (@selftest, not regression):** `tests/selftest/capture-graphql.selftest.spec.ts` – forced 500 via `page.route` → file written with status 500, body, headers, timing 75 ms, console errors: PASS; healthy live query → no file: PASS.
- **VOV run** (`--repeat-each=3`, chromium): 9 pass / 0 fail / 9 skip, 25.6 s, 0 captures.
  - VOV-011 ja search: 3/3 pass, HTTP 200, 6 cards · en search: 3/3 pass, HTTP 200, 12 cards.
  - VOV-013 en: 3/3 pass, 12 card paths (QA587_Upper, qa587-main, qa587-rel-b, qa501-main-a/b, qa557-dam, badid, long, noid, rel6, qa587-r6, qa587-rel-a), 0 video-detail.
  - Skips: VOV-011 tech-talk ja/en (HTTP 404, not published on DEV) and cn (Issue #18). VOV-013 exists for en only in the spec (no ja variant).
- REG-VOV-EN not reproduced in this window; confidence unchanged (60%).
- Run reports: `results/DSR-587/DEV/automation-run-20261024-job08.md`, `…-job08-selftest.md`. No evidence (no fails).
