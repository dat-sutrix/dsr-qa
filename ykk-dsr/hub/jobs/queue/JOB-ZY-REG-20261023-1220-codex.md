---
id: JOB-ZY-REG-20261023-1220-codex
agent: codex
us: Regression S12 – visual P1 + P2 baseline + Lighthouse 3 P1 pages
type: regression visual + lighthouse (read-only)
env: dev
lang: [ja, en]
priority: P3 (regression, below real jobs)
created_by: claude-web [regression-guard] 23/10 12:20 VN
---
Policy: `ykk-dsr/hub/regression/README.md` §3–§5. P2 included because `regression/CHANGES.md` has pending `global` / `block:*` / `template:*` rows (dev/2026.10.22_3, video block, breadcrumb/eco DSR-666, news-detail template DSR-672).

## 1. Visual (viewport captures, NOT fullPage)
- Viewports 1440×900 and 390×844, `.aem.live`, ja + en (skip a lang that returns 404 – record it), wait for network idle + 1 s, cache-bust query.
- Pages (resolve real live paths from `fixtures/dsr-*.ts` / `fixtures/paths.ts`; same page set every run):
  - P1: TOP (609 `/{lang}/top-page`), breadcrumb test page (552 fixture), video detail `/{lang}/library/video/qa587-main`, video list `/{lang}/library/video/search`, catalog list `/{lang}/library/catalog`, 1 catalog overlay detail (654 fixture), 1 product overlay detail (586 fixture), product list (583 fixture), catalog download page (570 `test-space/dsr-570-catalog-detail`).
  - P2: article `qa529-01`, news `test-space/qa566-news-01`, eco TOP `test-space/dsr-590-eco-top-page`, video block page `test-space/drs21-aem-block-library` (en).
- `results/REGRESSION/visual-ledger.json` does not exist yet → this run CREATES it as the baseline: `{ "<page-key> [<lang>] <vw>": { "png": "<path>", "sha": "...", "at": "<ISO>", "job": "<id>", "http": 200 } }`. If it exists when you start, compare pixel diff vs the stored capture (mask carousels/video/time) and flag diff > 1% as "VISUAL CHANGE".
- Evidence: `evidence/REGRESSION/20261023-1220/<page-key>_<lang>_<vw>.png` (gitignored if under test-results; else commit PNGs ≤ 300 KB each).

## 2. Lighthouse (mobile + desktop, .aem.live, 3 runs → median)
TOP ja, video detail qa587-main ja, catalog list ja. Record Perf / A11y / BP / SEO, LCP, CLS, TBT. Store in `results/REGRESSION/lighthouse-ledger.json` (baseline).

## 3. Output
`ykk-dsr/hub/results/JOB-ZY-REG-20261023-1220-codex/summary.md` + `result.json`. summary.md starts with a "NEW FAIL" table (visual change > 1% or HTTP ≠ 200 on a page that was 200 before, or Lighthouse score drop ≥ 10 vs ledger; first baseline → write "baseline – none"). Columns: page | lang | vw | metric | before | now | suspect CHANGES.md row | confidence. Proposed verdicts only. No AEM writes, no login, no form submit.
