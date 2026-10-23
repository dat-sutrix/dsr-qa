---
id: JOB-ZZ-IDLE-40
agent: codex
us: DSR-566/586/654 – Lighthouse + viewport baseline of pages seeded Night 22/10
type: visual + lighthouse (read-only)
env: dev
priority: P3 (idle)
created_by: claude-web 23/10 07:50 [schedule] morning
---
Pages (.aem.live; if 404 try .aem.page and record): qa566 news pages from query-index (`qa566-*`, ja + en), /ja/products/990586001, /en/products/990586001, /ja/products/990586005, /en/library/catalog/qa654-update (record redirect target only).
1. Viewport screenshots PC 1440×900 + SP 390×844, scroll step 700 px → evidence/baseline-20261024/.
2. Lighthouse mobile + desktop (performance, accessibility, best-practices, SEO) per page, 1 run each → results/JOB-ZZ-IDLE-40/lighthouse/*.json.
3. summary.md: table URL | HTTP | final URL | LH scores m/d | horizontal overflow px | broken images. No pass/fail on visual; Sprint 12 has no LH threshold – record only. Run only when no dated job is queued for this lane.
