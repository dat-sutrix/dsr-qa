---
id: JOB-ZY-REG-20261024-1620-claude-code
agent: claude-code
us: Regression S12 – R3 P1 (rotation: even slot 16:20 → P1) + REG-VOV-EN light probe
type: regression (read-only, publish side only – no Author, no cookie needed)
env: dev
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 24/10 16:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. No `CHANGES.md` row has `regressed = no` (remaining rows are `pending` = not deployed) → R3. Even slot → P1 only. P3 not included (00:20 only).

1. Specs: the **P1** set, flags and env of `jobs/done/JOB-ZY-REG-20261024-0020-claude-code.md` step 1 (P1 only, no P3): overlay (`npm run test:dev:overlay`), smoke, 552 breadcrumb, `top/*`, `catalog-video/*`, `product-list/*`, `catalog-download/*`. ja + en, chromium, `ENV=dev`, `@auto` only.
2. Compare per TC/lang vs `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = REG-1220). NEW FAIL = key with `last: pass` now failing → retry 2× and record raw response (HTTP status, list/query JSON) before classifying. Known fails = list in `results/JOB-ZY-REG-20261024-1220-claude-code/summary.md` (cause none). VOV-005 en skip (no `DSR587_SEEDED`) = not a fail.
3. **REG-VOV-EN light probe** (DASHBOARD 🐞 60%; REG-1220 probe 0/20): reuse `results/JOB-ZY-REG-20261024-1220-claude-code/probe-vov-en.cjs`, en 10× ~30 s apart + ja 3× control, same fields. Any failed load → HAR + screenshot + console log + the failing `dsr-video-list` response (status/headers/body 500 chars). Write `probe-vov-en.json` + 3-line conclusion.
4. Extra check (observation): `Last-Modified` + ETag of `scripts/scripts.js`, `styles/styles.css`, `blocks/header/header.js`, `blocks/footer/footer.js`, `blocks/related-content/*`, `blocks/listing/*` (.live + .page) vs REG-1220 – unannounced deploys (pending rows DSR-639/661/675). Not verified ≠ not deployed (README §7).
5. Output: update ledger; `ykk-dsr/hub/results/JOB-ZY-REG-20261024-1620-claude-code/summary.md` (starts with "NEW FAIL" table: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence; then Merge/incident table; then step 3 + 4) + `result.json`; run report `results/REGRESSION/DEV/automation-run-20261024-reg1620.md` (root AGENTS.md "Run reporting"; unused suffix). `npx tsc --noEmit` exit 0. No AEM writes, no login, no form submit.
