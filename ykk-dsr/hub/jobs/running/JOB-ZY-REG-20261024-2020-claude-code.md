---
id: JOB-ZY-REG-20261024-2020-claude-code
agent: claude-code
us: Regression S12 – R3 full P1 + P2 (rotation: odd slot 20:20 → P1+P2) + REG-VOV-EN capture-on-fail
type: regression (read-only, publish side only – no Author, no cookie needed)
env: dev
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 24/10 20:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. No `CHANGES.md` row has `regressed = no` (remaining rows are `pending` = not deployed; Jira 18:20–22:20 JST: no updates) → R3. Odd slot → P1 + P2. P3 not included (00:20 only).

1. Specs: same set, flags and env as `jobs/done/JOB-ZY-REG-20261024-1220-claude-code.md` step 1 (= 0420 step 1: P1 + P2, `DSR566_SLUG=qa566-news-01`).
2. Compare per TC/lang vs `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = REG-1620). NEW FAIL = key with `last: pass` now failing. On a NEW FAIL: retry 2× and record raw response (HTTP status, list/query JSON) before classifying. Known fails = list in `results/JOB-ZY-REG-20261024-1620-claude-code/summary.md` (cause none). VOV-005 en skip (no `DSR587_SEEDED`) = not a fail.
3. **REG-VOV-EN (DASHBOARD 🐞 60%) – capture-on-fail, no fixed probe.** JOB-20261024-08 hook (`fixtures/capture-graphql.ts`) is wired into 587/557/654 specs. Right after the Playwright run, before any other run, copy `test-results/graphql-capture/*.json` (≤ 200 KB total) into `ykk-dsr/hub/results/JOB-ZY-REG-20261024-2020-claude-code/graphql-capture/`. In summary.md: capture count; per capture reason, URL, status, first 300 chars of body, pageUrl. 0 captures → write "0 captures".
4. Extra check (observation): `Last-Modified` + ETag of `scripts/scripts.js`, `styles/styles.css`, `blocks/header/header.js`, `blocks/footer/footer.js`, `blocks/related-content/*` (.live + .page) vs REG-1620 `observations.json`. Not verified ≠ not deployed (README §7).
5. Output: update ledger; `ykk-dsr/hub/results/JOB-ZY-REG-20261024-2020-claude-code/summary.md` (starts with "NEW FAIL" table: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence; then Merge/incident table; then step 3 + step 4) + `result.json`; run report `results/REGRESSION/DEV/automation-run-20261024-reg2020.md` (root AGENTS.md "Run reporting"; unused suffix). `npx tsc --noEmit` exit 0. No AEM writes, no login, no form submit.
