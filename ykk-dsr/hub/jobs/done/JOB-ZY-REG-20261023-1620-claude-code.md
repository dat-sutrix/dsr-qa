---
id: JOB-ZY-REG-20261023-1620-claude-code
agent: claude-code
us: Regression S12 – R2 (+R1) after DSR-669/670/671 deploy + migration, catalog-detail refactor, DSR-667 eco-carousel
type: regression (read-only, publish side only – no Author, no cookie needed)
env: dev
priority: P1
created_by: claude-web [regression-guard] 23/10 16:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §2–§5. Covers `regression/CHANGES.md` rows with `regressed = no`: DSR-669/671 (`dev/2026.10.23` a47274d, cf-model+query), DSR-670 (`dev/2026.10.23_2` b33514f), `block:catalog-detail` (Martin refactor), `fix:DSR-667` / `block:eco-carousel`.
Why now: Martin migration report 16:15 VN "QA can start the regression" (KNOWN-FACTS 23/10). JOB-20261023-11 stopped at the Author probe (cookie 401) and tested nothing; this job runs its **publish-side** part. Author-side steps (runbook 1–3: probe, models diff, manifest lint) stay with JOB-20261023-11 after Dat re-pastes the cookie – do NOT run `tools/author/*`, do NOT read `~/.dsr-secrets/`.

1. R1 + R2 specs, ja + en, chromium, `ENV=dev`, `@auto` only (exclude `@manual`/`@blocked`/`analysis/`/`*capture*`/`*retest*`):
   - `npm run test:dev:overlay` (587, 586, 654, overlay-seo) with `PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/overlay-after-669.json --reporter=list,json`
   - P1 non-overlay: `smoke.spec.ts`, `breadcrumb/DSR-552.breadcrumb.spec.ts`, `top/*`, `catalog-video/*`, `product-list/*`, `catalog-download/*`
   - + `article-detail/DSR-529.article-detail.spec.ts`, `product-cf/*` (585), `eco-products/DSR-590.eco-products.spec.ts`
2. Compare (runbook step 6): `node scripts/compare-runs.mjs ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json test-results/overlay-after-669.json --out ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/compare.md`, and per TC vs `results/REGRESSION/ledger.json` (REG-1200 + JOB-23-13/-15).
3. Classification rules (from Martin's migration report, see JOB-20261023-11 "GO 23/10 16:15"): 22 older preview-only items are now live → list/count diffs (557/583/654 lists, query-index, sitemap) = `data`, cause `cf-model-669`, unless a qa* item is missing. Expected not-live (skip, not fail): en qa654-preview, qa654-removed, qa587-preview, qa587-removed, ja 990586002, 990586011. ja `catalog/catalogid-01` 404 on live = known (Martin). Model/list name in an error → `test` (fixtures/cf-models.ts). Watch DSR-VOV-011/013 en (transient NEW FAIL in REG-1200): on fail, retry 3× and fetch the list JSON directly; record raw response.
4. Observations (no verdict): `Last-Modified` + ETag of `blocks/catalog-detail/catalog-detail.js` and `blocks/eco-carousel/eco-carousel.{js,css}` (.live + .page); 670 tech-talk: query `dsr-techmovie-page` responds (DEV has no tech talks – empty is expected); 671: product label `{productId}｜{productName}` on `/ja/products/990586001`, catalog query contains `hubspotFormId`/`promoText`, `relatedMoodboards` absent; DSR-667 dot 9 overflow at 393/390/375 px vs JOB-20261023-12.
5. Output: update `results/REGRESSION/ledger.json`; `ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code/summary.md` (starts with "NEW FAIL" table: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence; then Merge/incident table) + `result.json` + `compare.md`; run report `results/REGRESSION/DEV/automation-run-20261023-reg1620.md` (root AGENTS.md "Run reporting"). `npx tsc --noEmit` exit 0. No AEM writes, no login, no form submit.
