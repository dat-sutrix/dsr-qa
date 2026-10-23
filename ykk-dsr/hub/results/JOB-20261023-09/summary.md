# JOB-20261023-09 – preview-only Expected change (DSR-674 Dismissed) – done
**Merge/incident-related:** none (every fail has cause = none).

**Change:** I updated DSR-VOV-002, DSR-CATOV-009 and DSR-PDO-002 to the approved Expected. `.aem.page` must return HTTP 200 with the overlay not-found stub: rows `source: overlay` + `unavailable: not-found`, robots containing `noindex`, and no TD title/name. `.aem.live` must return 404. I renamed the titles and kept the tags. `npx tsc --noEmit` exit 0.
**Run 1 (3 TCs):** 3/3 pass. curl showed the same stub on all 3 `.aem.page` URLs (`<title>YKK DIGITAL SHOWROOM</title>`), and `.aem.live` returned 404.
**Run 2 (`npm run test:dev:overlay`):** 257 tests: 198 pass, 18 fail, 41 skip, 0 flaky, exit 1. All 18 fails are pre-existing and none involve the changed tests. CATOV-009 used to fail and now passes.

| TC | Fails | suspect | cause | confidence (real bug) |
|---|---|---|---|---|
| CATOV-002 non-form pdf/ebook ja/en | 4 – noindex on page | product | none | 40% |
| CATOV-021 non-form pdf/ebook ja/en | 4 – not in sitemap | product | none | 50% |
| CATOV-001 -form ja/en | 4 – title is dev sample, not "QA190 …" | data | none | 0% |
| CATOV-012 ja/en | 2 – no card 'QA190 PDF catalog' | data | none | 0% |
| CATOV-010 en | 1 – subfolder path 200 stub, expected 404 | product | none | 50% |
| CATDL-007 ja | 1 – gated PDF URL in list JSON | product | none | 70% |
| CATDL-016 en | 1 – Japanese fixed texts on en form | product | none | 70% |
| VOV-008 en | 1 – rows source+cfPath+unavailable vs "single row" (JOB-08 proposal) | test | none | 10% |

I copied the suspect/cause/confidence values from earlier job summaries and did not re-investigate them in this job.
Reports: `results/{DSR-587,DSR-654,DSR-586}/DEV/automation-run-20261023-job09.md` (run 1, one TC each) and `results/DSR-587/DEV/automation-run-20261023-job09-overlay.md` (run 2, cross-US). Evidence: first-attempt PNGs of the failed tests (13 files, ~0.9 MB). CATOV-021 and CATOV-010 are request-only tests with no screenshot.
