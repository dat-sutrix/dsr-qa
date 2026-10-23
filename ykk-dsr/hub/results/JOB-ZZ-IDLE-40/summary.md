# JOB-ZZ-IDLE-40 — DEV baseline observations
UTC: 2026-10-23T01:00:34.918Z → 2026-10-23T01:05:42.007Z; automation HEAD: 46375e77e828ded1e00718502d8c1cd94917f8bb.
Queue preflight: no dated Codex jobs queued; dated jobs 03/17/19 belong to claude-code.
Scores are performance/accessibility/best-practices/SEO, mobile then desktop; overflow and broken-image counts are PC/SP. No visual verdict or Lighthouse threshold applied.
| URL | HTTP | Final URL | LH scores m/d | Horizontal overflow px | Broken images |
|---|---|---|---|---|---|
| https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/qa566-news-01 | 200 | https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/qa566-news-01 | 92/95/96/69; 100/90/100/69 | 0/0 | 0/0 |
| https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/qa566-news-02 | 200 | https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/qa566-news-02 | 77/95/100/69; 100/90/100/69 | 0/0 | 0/0 |
| https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/qa566-news-01 | 200 | https://main--dsr-eds-dev--sutrix-projects.aem.live/master/en/test-space/qa566-news-01 | 100/95/96/61; 100/90/100/61 | 0/0 | 0/0 |
| https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 | 200 | https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586001 | 91/83/96/61; 97/78/96/61 | 0/0 | 0/0 |
| https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 | 200 | https://main--dsr-eds-dev--sutrix-projects.aem.live/en/products/990586001 | 91/83/96/61; 96/78/96/61 | 0/0 | 0/0 |
| https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/products/990586005 | 404 live; 404 preview | https://main--dsr-eds-dev--sutrix-projects.aem.page/ja/products/990586005 | N/A/N/A/N/A/N/A; N/A/N/A/N/A/N/A | 0/0 | 0/0 |
| https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa654-update | 200 | https://main--dsr-eds-dev--sutrix-projects.aem.live/en/library/catalog/qa654-update | Redirect only | Not measured | Not measured |
28 viewport PNGs: evidence/baseline-20261024/ (PC 1440×900, SP 390×844, 700 px steps, final step clamped). Date label follows job; actual run date is 2026-10-23.
Raw observations, complete 191-row query index, capture script and 12 Lighthouse JSON reports: results/JOB-ZZ-IDLE-40/.
990586005 returned 404 on both tiers; captures/audits describe the preview error page, not product content. Lighthouse runtime errors/scores are retained in raw JSON.
Catalog redirect-only check: HTTP 200; no redirect observed after 8 seconds in browser. No screenshots or Lighthouse run for catalog, per job.
TypeScript: npx tsc --noEmit, exit 0, no errors. Capture/audit command: node results/JOB-ZZ-IDLE-40/run.cjs; one run/device, no retries.
Observation-only run; no npm suite executed, no product bug asserted. Broken images = completed img elements with naturalWidth 0 after scrolling; not a resource-wide audit.
