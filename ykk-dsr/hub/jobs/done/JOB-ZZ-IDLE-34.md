---
id: JOB-ZZ-IDLE-34
agent: codex
us: DSR-590 – L&F recapture (fix sticky-header artifact)
type: visual capture (read-only)
env: dev
priority: P2
created_by: claude-web
---
JOB-20261022-04 full-page captures drew the sticky header in the middle of the page (wrong order header/breadcrumb, hero title hidden). Recapture /master/ja/test-space/dsr-590-eco-top-page and -eco-detail-page (.aem.live):
1. PC 1440×900 and SP 390×844: viewport screenshots at scrollY = 0, 600, 1200 … to page end (NOT fullPage). Also one fullPage with `header{position:static!important}` injected.
2. SP only: crop of the carousel dots + < > buttons at 3× (does the 9th dot overlap the ">" button? measure dot-9 right edge vs button left edge in CSS px).
3. Measure the gap in CSS px between breadcrumb bottom and hero top on TOP and Detail (DSR-666).
Output evidence/DSR-590/20261022/lf2/ + results/JOB-ZZ-IDLE-34/summary.md.
