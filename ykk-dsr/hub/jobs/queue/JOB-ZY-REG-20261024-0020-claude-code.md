---
id: JOB-ZY-REG-20261024-0020-claude-code
agent: claude-code
us: Regression S12 – R3 P1 + P3 (rotation: even slot 00:20 → P1; P3 daily on 00:20)
type: regression (read-only, publish side only – no Author, no cookie needed)
env: dev
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 24/10 00:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §1, §3 (R3), §5. No `CHANGES.md` row has `regressed = no` (remaining rows are `pending` = not deployed) → R3. Even slot → P1 only; 00:20 run → add P3.

1. Specs, ja + en, chromium, `ENV=dev`, `@auto` only (exclude `@manual`/`@blocked`/`analysis/`/`*capture*`):
   - P1: `npm run test:dev:overlay` (587, 586, 654, overlay-seo), `smoke.spec.ts`, `breadcrumb/DSR-552.breadcrumb.spec.ts`, `top/*`, `catalog-video/*`, `product-list/*`, `catalog-download/*`
   - P3: `asset-migration/DSR-227.asset-migration.spec.ts`, `mail/DSR-433.mail-endpoints.spec.ts` (433 blocked SendGrid – skips/fails tagged `@blocked` stay excluded; never send mail), retest specs `breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts`, `movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`, `movie-detail/DSR-587.related-links-retest-DSR-538.spec.ts`. P3 keys not in the ledger → first entry = baseline, not NEW FAIL.
2. Compare per TC/lang vs `ykk-dsr/hub/results/REGRESSION/ledger.json` (last = REG-2020). NEW FAIL = key with `last: pass` now failing. On a NEW FAIL: retry that test 2× and record raw response (HTTP status, list/query JSON) before classifying.
3. Classification: the known fails listed in `results/JOB-ZY-REG-20261023-2020-claude-code/summary.md` stay known (cause none). Expected not-live items = skip, not fail.
4. Extra checks (observation, no verdict):
   a. **REG-VIDLIST-EN** (codex REG-2020 visual diff 8.4%): `/en/library/video/search` – list every card (title, href, CF path/id from the list query JSON) on page 1. Is "QA587 main movie" shown twice? If yes: are both hrefs/ids different (2 CFs with same title → data) or the same id duplicated (→ code)? Same for ja. Save the raw query JSON.
   b. **566 page**: `/master/{ja,en}/test-space/test-news-detail-template` was 404 in REG-2020 (.live + .page). Check `fixtures/paths.ts` (DSR_PATHS=v2) and `query-index.json` for a news-detail page under the new path; report the URL found, or "not found".
   c. `Last-Modified` + ETag of `scripts/scripts.js`, `styles/styles.css`, `blocks/header/header.js`, `blocks/footer/footer.js`, `blocks/eco-carousel/eco-carousel.{js,css}` (.live + .page) – unannounced deploys (pending rows DSR-639, DSR-661, DSR-675). Not verified ≠ not deployed (README §7).
5. Output: update ledger; `ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code/summary.md` (starts with "NEW FAIL" table: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence; then Merge/incident table; then 4a/4b/4c) + `result.json`; run report `results/REGRESSION/DEV/automation-run-20261023-reg0020.md` (UTC date; root AGENTS.md "Run reporting"). `npx tsc --noEmit` exit 0. No AEM writes, no login, no form submit.
