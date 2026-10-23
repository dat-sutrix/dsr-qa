DSR-673 DEV retest — proposed outcomes; human QA confirms.
Run: 2026-10-23T02:30:12.013Z to 2026-10-23T02:34:12.985660+00:00 (UTC). Read-only; no forms submitted.

| Item | Proposed result | Raw observations |
|---|---|---|
| /ja/library/catalog .aem.live, 3 cache-busted loads | Pass | HTTP [200, 200, 200]; cards [6, 6, 6]; JSON raw [7, 7, 7], eligible [6, 6, 6] |
| /ja/library/catalog .aem.page, 3 cache-busted loads | Pass | HTTP [200, 200, 200]; cards [6, 6, 6]; JSON raw [7, 7, 7], eligible [6, 6, 6] |
| /en/library/catalog .aem.live, 3 cache-busted loads | Pass | HTTP [200, 200, 200]; cards [6, 6, 6]; JSON raw [8, 8, 8], eligible [6, 6, 6] |
| /en/library/catalog .aem.page, 3 cache-busted loads | Pass | HTTP [200, 200, 200]; cards [6, 6, 6]; JSON raw [8, 8, 8], eligible [6, 6, 6] |
| Card links, all 12 loads | Pass | All form-gated cards → same-tier overlay; non-form → PDF/ebook URL matching JSON |
| Console clean | Fail (known background issue) | placeholders.json HTTP 404; one ja/live load also /ja/library HTTP 404; cause=none, confidence=50%; no page exceptions |
| CATV-013/016/017; CATDL-005/006 (ja live) | Pass | 5 automated passes |
| CATDL-007 (ja live) | Fail | Gated PDF URL exposed in JSON on both attempts; cause=none, confidence=70%; known issue pending Quentin, not DSR-673 |
| CATV-018/019/020 | Pending / skipped | NEW/UPDATE fixture data absent; not passed |
| CATV-014 / CATV-015 | Pass (supplemental) / Pending | Prior job mobile check: scrollWidth 390/390; 015 not implemented, expected result unavailable |
JA raw 7 → eligible 6: qa654-inactive excluded; EN raw 8 → eligible 6 (inactive + missing content excluded). Published endpoint used; unpublished inventory not independently verified.
DSR-673 empty-list symptom no longer reproduced. Separate CATDL-007 failure does not invalidate this proposed fix confirmation.
Raw titles, links, HTTP and console records: results/JOB-20261023-04/result.json; suite.json; mobile.json.
Viewport-only evidence: evidence/DSR-673/ (12 desktop loads, mobile, failed-test attempts).
TypeScript: exit 0, no errors. Suite: 9 tests, 5 pass / 1 fail / 3 skip; CATV-015 not run.
