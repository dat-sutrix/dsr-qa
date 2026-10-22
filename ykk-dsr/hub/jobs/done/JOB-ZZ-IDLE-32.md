---
id: JOB-ZZ-IDLE-32
agent: claude-code
us: DSR-654, DSR-557, DSR-570 – catalog overlay empty block diagnosis
type: diagnosis (read-only)
env: dev
priority: P2 (idle, raises bug confidence)
created_by: claude-web
---
Goal: decide whether the empty catalog-detail block (IDLE-30: CATOV-001/015–019, 70% overlay auto-gen) is a product bug or data, to reach ≥ 80% or close it.
1) For /ja|en/library/catalog/qa190-cat-pdf, qa190-cat-pdf-form, qa190-cat-ebook-form (.aem.page + .aem.live): record HTTP status, raw HTML of the catalog-detail block (json2html rows: title, requiresForm, file, thumbnail), console errors, network requests to DAM/PDF (net::ERR_ABORTED?), final URL.
2) Same for the demo page used by JOB-20261021-12 (renders fully) → table of field-by-field differences demo vs overlay.
3) Read blocks/catalog-detail/catalog-detail.js on DEV (.aem.live/blocks/...): which condition leaves the block empty or redirects (requiresForm false/missing?). Quote the lines.
4) Verdict per page: product / data / test, with confidence and the exact missing field. Output results/JOB-ZZ-IDLE-32/summary.md (+ evidence/DSR-654/DEV/diag-20261022/). No Author access.
