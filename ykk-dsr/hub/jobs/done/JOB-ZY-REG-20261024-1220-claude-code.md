---
id: JOB-ZY-REG-20261024-1220-claude-code
agent: claude-code
us: Regression S12 – R3 full P1 + P2 (rotation: odd slot 12:20 → P1+P2) + REG-VOV-EN probe
type: regression (read-only, publish side only – no Author, no cookie needed)
env: dev
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 24/10 12:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. No `CHANGES.md` row has `regressed = no` (remaining rows are `pending` = not deployed) → R3. Odd slot → P1 + P2. P3 not included (00:20 only).

1. Specs: same set, flags and env as `jobs/done/JOB-ZY-REG-20261024-0420-claude-code.md` step 1 (P1 + P2, `DSR566_SLUG=qa566-news-01`). JOB-20261024-02 fix (557 `timezoneId: 'Asia/Tokyo'`) is in the code → CATV-018/019 are normal TCs now.
2. Compare per TC/lang vs `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = JOB-ZZ-IDLE-44 01:23Z). NEW FAIL = key with `last: pass` now failing. On a NEW FAIL: retry 2× and record raw response (HTTP status, list/query JSON) before classifying. Known fails = list in `results/JOB-ZZ-IDLE-44/summary.md` (cause none). VOV-005 en skip (no `DSR587_SEEDED`) = not a fail.
3. **REG-VOV-EN probe (priority evidence, DASHBOARD 🐞 60%).** `/en/library/video/search` showed "Unable to load video information." in 3 windows: REG-1200 05:18Z 23/10 (VOV-011/013 en), REG-0820-codex 01:25Z 24/10 (title also `search` → `YKK DIGITAL SHOWROOM`), JOB-20261024-05 02:39Z (recovered ~1 min later). The failing response was never captured. Script (observation, not a spec; keep under `results/JOB-ZY-REG-20261024-1220-claude-code/`): load `/en/library/video/search` (.live) **20×, ~30 s apart (~10 min)**, plus `/ja/library/video/search` 5× as control. Per load record: UTC time, document status, `document.title`, card count, "Unable to load" yes/no, and **every** request whose URL contains `graphql` or `dsr-video-list` → status, `x-cache`/`age`/`cdn-cache-control` headers, response body first 500 chars (or `requestfailed` errorText), duration. If any load fails: save HAR for that load + screenshot + the console log. Write `probe-vov-en.json` + a 5-line conclusion in summary.md: fail count/20, which request failed and how (status/timeout/CORS/empty `items`/GraphQL `errors`).
4. Extra check (observation): `Last-Modified` + ETag of `scripts/scripts.js`, `styles/styles.css`, `blocks/header/header.js`, `blocks/footer/footer.js`, `blocks/related-content/*`, `blocks/list/*` (.live + .page) vs IDLE-44. Not verified ≠ not deployed (README §7).
5. Output: update ledger; `ykk-dsr/hub/results/JOB-ZY-REG-20261024-1220-claude-code/summary.md` (starts with "NEW FAIL" table: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence; then Merge/incident table; then step 3 probe conclusion + step 4) + `result.json`; run report `results/REGRESSION/DEV/automation-run-20261024-reg1220.md` (root AGENTS.md "Run reporting"; unused suffix). `npx tsc --noEmit` exit 0. No AEM writes, no login, no form submit.
