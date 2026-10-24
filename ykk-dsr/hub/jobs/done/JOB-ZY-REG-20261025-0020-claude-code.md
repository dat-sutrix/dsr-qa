---
id: JOB-ZY-REG-20261025-0020-claude-code
agent: claude-code
us: Regression S12 – R3 P1 + P3 (rotation: even slot 00:20 → P1; P3 daily on 00:20) + REG-VOV-EN capture-on-fail
type: regression (read-only, publish side only – no Author, no cookie needed)
env: dev
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 25/10 00:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. No `CHANGES.md` row has `regressed = no` (remaining rows are `pending` = not deployed; Jira 22:15 24/10 – 02:20 25/10 JST: no updates) → R3. Even slot → P1; 00:20 run → add P3.

1. Specs: P1 + P3 set, flags and env exactly as `jobs/done/JOB-ZY-REG-20261024-0020-claude-code.md` step 1 (P1 overlay + smoke + 552 + top + catalog-video + product-list + catalog-download; P3 227, 433 (never send mail, `@blocked` excluded), retest 591/647/538). `@auto` only, chromium, ja + en, `ENV=dev`.
2. Compare per TC/lang vs `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = REG-2020 for P1, REG-0020 24/10 for P3). NEW FAIL = key with `last: pass` now failing. On a NEW FAIL: retry 2× and record raw response (HTTP status, list/query JSON) before classifying. Known fails = list in `results/JOB-ZY-REG-20261024-2020-claude-code/summary.md` (cause none) + P3 known fails in `results/JOB-ZY-REG-20261024-0020-claude-code/summary.md`.
3. **REG-VOV-EN (DASHBOARD 🐞 60%) – capture-on-fail** (`fixtures/capture-graphql.ts`, wired in 587/557/654). Right after the Playwright run, before any other run, copy `test-results/graphql-capture/*.json` (≤ 200 KB total) into `ykk-dsr/hub/results/JOB-ZY-REG-20261025-0020-claude-code/graphql-capture/`. In summary.md: capture count; per capture reason, URL, status, first 300 chars of body, pageUrl. 0 captures → write "0 captures".
4. Extra check (observation): `Last-Modified` + ETag of `scripts/scripts.js`, `styles/styles.css`, `blocks/header/header.js`, `blocks/footer/footer.js`, `blocks/related-content/*`, `blocks/listing/*` (.live + .page) vs REG-2020 `observations.json` (pending DSR-639/661/675). Not verified ≠ not deployed (README §7).
5. Output: update ledger; `ykk-dsr/hub/results/JOB-ZY-REG-20261025-0020-claude-code/summary.md` (starts with "NEW FAIL" table: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence; then Merge/incident table; then step 3 + step 4) + `result.json`; run report `results/REGRESSION/DEV/automation-run-20261024-reg0020b.md` (UTC run-start date 24/10; root AGENTS.md "Run reporting"; pick an unused suffix if taken). `npx tsc --noEmit` exit 0. No AEM writes, no login, no form submit.
