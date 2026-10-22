---
id: JOB-ZZ-IDLE-30
agent: claude-code
us: regression (all specs) – daily 22/10
type: run-only (read-only)
env: dev
priority: P3 (idle)
created_by: claude-web
---
Full `npm run test:dev` once (use a shell timeout ≥ 40 min; do NOT `pkill -f "playwright test"` – it can kill the codex lane). Compare with JOB-ZZ-IDLE-28 (21/10). Tag each changed result `cause` (overlay auto-gen / article fix merge / data Night 21/10 / none) + confidence. Also: check DSR-638 URL move (/ja/library/catalog, /ja/library/video/search, /ja/library/article, product-index) – list specs whose base path now 404s. Output results/JOB-ZZ-IDLE-30/summary.md + run report.
