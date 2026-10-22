# JOB-20261022-20 — done (capture only)
DEV .aem.live; ja/en; Chromium 156.0.8078.4; PC 1440×900, SP 390×844.
Eight PNGs (873,131 bytes): full page + first viewport for both languages and sizes.
**ja: list empty.** HTTP 200; main contains an empty div; no dsr-catalog-list response within 45s, zero cards. Stopped card checks per job; proposed blocked, not passed.
**en:** HTTP 200; dsr-catalog-list completed; 5 cards on both viewports (expected 5).
DOM order: QA654 update → catalog ebook → catalog ebook form → catalog pdf → catalog pdf form.
Dates: 2026.10.01, then four × 2026.09.03; all match YYYY.MM.DD.
Type labels in order: PDF, e-book, PDF, PDF, PDF (recorded as rendered).
All five thumbnails: natural 220×132; browser image response HTTP 200 on PC and SP.
PC rows: 3 + 2 cards. SP: one card per row; document scrollWidth = 390.
English SP card text ranges stay inside card and text-element bounds; exact boxes recorded in observations.json.
No pixel pass/fail assigned; “pass” in result.json means capture/measurement completed only. Human visual review remains pending.
Japanese data/product cause not established: suspect data, cause none, product-bug confidence 0%; no failed test verdict assigned.
Initial setup lacked matching Chromium; installed it. Initial ja query timeout reproduced as empty page, not an empty query response.
TypeScript: npx tsc --noEmit exit 0, no errors. No npm suite run; read-only capture script only.
Evidence: evidence/capture-20261022/; raw measurements: observations.json; reproduction: capture.cjs.
