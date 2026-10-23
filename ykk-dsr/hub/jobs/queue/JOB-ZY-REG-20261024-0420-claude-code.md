---
id: JOB-ZY-REG-20261024-0420-claude-code
agent: claude-code
us: Regression S12 – R3 full P1 + P2 (rotation: odd slot 04:20 → P1+P2)
type: regression (read-only, publish side only – no Author, no cookie needed)
env: dev
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 24/10 04:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. No `CHANGES.md` row has `regressed = no` (remaining rows are `pending` = not deployed) → R3. Odd slot → P1 + P2. P3 not included (00:20 only).

1. Specs, ja + en, chromium, `ENV=dev`, `@auto` only (exclude `@manual`/`@blocked`/`analysis/`/`*capture*`):
   - P1: `npm run test:dev:overlay` (587, 586, 654, overlay-seo), `smoke.spec.ts`, `breadcrumb/DSR-552.breadcrumb.spec.ts`, `top/*`, `catalog-video/*`, `product-list/*`, `catalog-download/*`
   - P2: `article-detail/DSR-529.article-detail.spec.ts`, `news-detail/DSR-566.news-detail.spec.ts` (run with env `DSR566_SLUG=qa566-news-01` – `test-news-detail-template` is 404, REG-0020 4b), `video-block/*`, `movie-detail/DSR-173.*`, `eco-products/DSR-590.eco-products.spec.ts`, `icons/*`, `product-cf/*`
2. Compare per TC/lang vs `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = REG-0020 for P1, REG-2020 for P2). NEW FAIL = key with `last: pass` now failing. On a NEW FAIL: retry 2× and record raw response (HTTP status, list/query JSON) before classifying. 566 keys that were skip (404) and now run → first real entry = baseline, not NEW FAIL.
3. Classification: known fails listed in `results/JOB-ZY-REG-20261024-0020-claude-code/summary.md` stay known (cause none). **DSR-CATV-018/019 (ja, en)** = known test-TZ artefact (test `today()` JST vs browser host TZ Europe/Berlin; 🐞 REG-CATV-TZ 15%) → classify `test`, not NEW FAIL. Observation only (no code commit): re-run `catalog-video` 018/019/020 once with `timezoneId: 'Asia/Tokyo'` via CLI/config override and record pass/fail. Expected not-live items = skip, not fail.
4. Extra check (observation): `Last-Modified` + ETag of `scripts/scripts.js`, `styles/styles.css`, `blocks/header/header.js`, `blocks/footer/footer.js`, `blocks/related-content/*` (.live + .page) vs REG-0020 4c – unannounced deploys (pending DSR-639, DSR-661, DSR-675). Not verified ≠ not deployed (README §7).
5. Output: update ledger; `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0420-claude-code/summary.md` (starts with "NEW FAIL" table: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence; then Merge/incident table; then step 3 TZ observation + step 4) + `result.json`; run report `results/REGRESSION/DEV/automation-run-20261023-reg0420.md` (UTC date; root AGENTS.md "Run reporting"; choose unused suffix). `npx tsc --noEmit` exit 0. No AEM writes, no login, no form submit.
