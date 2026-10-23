---
id: JOB-ZY-REG-20261023-2020-claude-code
agent: claude-code
us: Regression S12 – R3 full P1 + P2 (rotation: odd slot 20:20 → P1+P2)
type: regression (read-only, publish side only – no Author, no cookie needed)
env: dev
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 23/10 20:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. No `CHANGES.md` row has `regressed = no` (all covered by JOB-ZY-REG-20261023-1620-claude-code) → R3 full S12, P1 + P2. P3 not included (only on the 00:20 run).

1. Specs, ja + en, chromium, `ENV=dev`, `@auto` only (exclude `@manual`/`@blocked`/`analysis/`/`*capture*`/`*retest*`):
   - P1: `npm run test:dev:overlay` (587, 586, 654, overlay-seo), `smoke.spec.ts`, `breadcrumb/DSR-552.breadcrumb.spec.ts`, `top/*`, `catalog-video/*`, `product-list/*`, `catalog-download/*`
   - P2: `article-detail/DSR-529.article-detail.spec.ts`, `news-detail/DSR-566.news-detail.spec.ts`, `video-block/*`, `movie-detail/DSR-173.*`, `eco-products/DSR-590.eco-products.spec.ts`, `icons/*`, `product-cf/*`
2. Compare per TC/lang vs `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = REG-1620). NEW FAIL = key with `last: pass` now failing. On a NEW FAIL: retry that test 2× and record raw response (HTTP status, list/query JSON) before classifying.
3. Classification: the 32 known fails listed in `results/JOB-ZY-REG-20261023-1620-claude-code/summary.md` stay known (cause none). Expected not-live items (skip, not fail) as in JOB-ZY-REG-20261023-1620-claude-code step 3. P2 specs not in the REG-1620 ledger (566, 664, 173, 589) → first entry = baseline, not NEW FAIL.
4. Observations (no verdict): `Last-Modified` + ETag of `scripts/scripts.js`, `styles/styles.css`, `blocks/header/header.js`, `blocks/eco-carousel/eco-carousel.{js,css}` (.live + .page) – detects unannounced deploys (pending rows DSR-639 header/footer, DSR-661, DSR-675 in `CHANGES.md`). `/ja/products/990586001` productLabel value (671-LABEL, DASHBOARD 🐞).
5. Output: update ledger; `ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code/summary.md` (starts with "NEW FAIL" table: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence; then Merge/incident table) + `result.json`; run report `results/REGRESSION/DEV/automation-run-20261023-reg2020.md` (root AGENTS.md "Run reporting"). `npx tsc --noEmit` exit 0. No AEM writes, no login, no form submit.
