---
id: JOB-ZZ-IDLE-22
agent: claude-code
us: DSR-638 impact (557, 570, 583, 590, 529 list pages)
type: automation-maintenance (read-only on AEM)
env: dev
lang: [ja, en]
priority: P3 (idle)
created_by: claude-web
---
## Context
DSR-638 (Mayuka, In Progress 21/10) moves ja test-space pages to public paths; old paths go 404:
list-catalog → /ja/library/catalog · video-list → /ja/library/video/search · product-list → /ja/product/performance/sustainable/product-index · article-list → /ja/library/article · actual-cases → /ja/product/application/industrial/actual-cases · /ja/product-list → /ja/product/search · /ja/search-condition → /ja/product/select.
## Steps
1. For each pair (ja; en counterpart if exists) record HTTP status on .aem.page and .aem.live for old and new path, plus whether the new page has the same main block as the old one.
2. Grep tests/, fixtures/, pages/ for every old path. Move hard-coded paths into one fixture map (`fixtures/paths.ts`) with old path as default and new path behind env var `DSR_PATHS=v2` – no behaviour change today. tsc must pass.
3. Run the affected specs once with default paths (no fixes to assertions).
## Output
results/JOB-ZZ-IDLE-22/summary.md: table old/new path status + list of specs touched; commit code + run report per AGENTS.md.
