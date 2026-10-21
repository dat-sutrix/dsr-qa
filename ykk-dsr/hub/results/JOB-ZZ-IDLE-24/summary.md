# JOB-ZZ-IDLE-24 — DEV visual baselines
Captured 2026-10-21T08:22:22.279Z–2026-10-21T08:24:35.132Z; Chromium, PC 1440×900 / SP 375×900, DPR 1, full-page PNGs.
All 12 new-page captures returned HTTP 200; 8 layout comparisons match, 4 are blocked by old English pages returning 404. Proposed outcomes only; human QA confirms.
| New path | Host | Old same-language test-space page | Same layout PC / SP | Differences |
|---|---|---|---|---|
| /en/library/catalog | .page | /master/en/test-space/list-catalog (200) | Yes / Yes | Breadcrumb: test-space → library; list-catalog → catalog. Same filters, cards, grouping, footer. |
| /en/library/catalog | .live | /master/en/test-space/list-catalog (200) | Yes / Yes | Same breadcrumb changes; same listing layout. |
| /ja/library/video/search | .page | /master/ja/test-space/video-list (200) | Yes / Yes | Breadcrumb becomes localized library/video labels; same five cards, 3-column PC / 1-column SP. |
| /en/library/video/search | .page | /master/en/test-space/video-list (404) | Unavailable / Unavailable | New page has keyword search, card grid and pagination; old page is a 404 screen. |
| /ja/product/performance/sustainable/product-index | .page | /master/ja/test-space/product-list (200) | Yes / Yes | Breadcrumb: test-space → product; product-list → product_index. Same three product rows and footer. |
| /en/product/performance/sustainable/product-index | .page | /master/en/test-space/product-list (404) | Unavailable / Unavailable | New page has three product rows; old page is a 404 screen. |
Evidence: [baselines/](baselines/) contains all 24 new/reference screenshots; filenames encode feature, language, host, viewport and new/old. [captures.json](captures.json) records requested/final URLs, HTTP status, exact text, meta values and block geometry.
The job explicitly requests successful baselines; these are kept in baselines/, outside the failed-only evidence/ folder. No failed tests or merge/incident-related failures; known missing references: cause none, product-bug confidence 0%.
Visual review used full-page captures with listing geometry corroboration; this is layout comparison, not pixel equality or design approval. No content writes or form submissions.
TypeScript: npx tsc --noEmit, exit 0, no errors. Capture command: ENV=dev node ykk-dsr/hub/results/JOB-ZZ-IDLE-24/capture.cjs (exit 0).
Build identity, Figma conformity, interactions and subsequent pagination were not independently verified. SP is a narrow Chromium viewport, not mobile-device emulation.
