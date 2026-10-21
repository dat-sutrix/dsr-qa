---
id: JOB-ZZ-IDLE-26
agent: claude-code
us: DSR-552 (regression) + DSR-638 watch
type: run-only (read-only)
env: dev
lang: [ja, en]
priority: P3 (idle)
created_by: claude-web ([schedule] evening 2026-10-21)
---
1. Regression of the Done US DSR-552: run `tests/breadcrumb/DSR-552.breadcrumb.spec.ts` once on DEV (ja+en, as JOB-20261019-07). Compare with that run; any new fail → `cause` + confidence (21/10 deploys: listing.js/adapters/cf.js 08:54Z, article fixes ~09:45Z).
2. DSR-638 watch (as IDLE-22): HTTP status on .page and .live of old test-space paths (`/master/{ja,en}/test-space/list-catalog`, `video-list`, `product-list`, `article-list`) and the new paths (`/{ja,en}/library/catalog`, `/{ja,en}/library/video/search`, `/{ja,en}/product/performance/sustainable/product-index`, `/{ja,en}/library/article`). Table: path | .page | .live | changed vs IDLE-24/IDLE-22.
Output results/JOB-ZZ-IDLE-26/summary.md + result.json + run report. No content writes.
