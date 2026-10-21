---
id: JOB-ZZ-IDLE-25
agent: claude-code
us: DSR-654
type: automation run (read-only)
env: dev
priority: P3 (idle)
created_by: claude-web
---
Run tests/catalog-overlay (DSR-654 scaffold) once with `DSR654_BASE=<.aem.page host>` for the en catalogs that are 200 on .page (qa190-cat-pdf-form, qa190-cat-ebook-form). Record content checks (title, form slot, cf-path same id, catalogId vs node name per BL-OVL-1 update 2026-10-21). Classify fails with cause/confidence; do not change assertions. Output results/JOB-ZZ-IDLE-25/summary.md + run report.
