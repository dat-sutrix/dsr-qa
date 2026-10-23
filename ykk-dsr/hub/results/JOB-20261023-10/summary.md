# JOB-20261023-10 – CATOV-010 sub-folder + CATOV-002/021 non-form noindex Expected change – done
**Merge/incident-related:** none (every fail has cause = none).

**Change** (`tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts`; `npx tsc --noEmit` exit 0):
- CATOV-010 (retitled as the job asks): the flat URL must still return 404 on both hosts. The sub-folder URL must return 200 with rows `source: overlay` + `unavailable: not-found`, robots noindex, no `catalogTitle`, and the browser must end on `/en/library/catalog`.
- CATOV-002/021: if requiresForm = false, the page must be noindex and must have 0 rows in query-index and sitemap. Form catalogs keep the old checks. requiresForm is read from the content CF row in the static HTML. That row is missing on non-form pages, so a missing row counts as false. The value is still checked against the fixture. I also updated `docs/DSR-654/assumptions.md`.

**3-TC run:** try 1 failed 8 tests: CATOV-002 non-form expected a literal `requiresForm` row that does not exist. I fixed the spec and re-ran. Re-run: CATOV-002 8/8 pass, CATOV-010 pass, CATOV-021 form 4/4 pass, CATOV-021 non-form 4/4 fail.
**Overlay run (`npm run test:dev:overlay`):** 257 tests: 203 pass, 13 fail, 41 skip, 0 flaky, exit 1. Compared with JOB-09: CATOV-002 non-form ×4 and CATOV-010 now pass.

| TC | Fails | suspect | cause | confidence (real bug) |
|---|---|---|---|---|
| CATOV-021 non-form pdf/ebook ja/en | 4 – sitemap OK (0), but query-index still lists the page (row `robots: noindex`) | test | none | 20% |
| CATOV-001 -form ja/en | 4 – title is a dev sample, not "QA190 …" (pre-existing) | data | none | 0% |
| CATOV-012 ja/en | 2 – no card 'QA190 PDF catalog' (pre-existing) | data | none | 0% |
| CATDL-007 ja | 1 – gated PDF URL in list JSON (pre-existing) | product | none | 70% |
| CATDL-016 en | 1 – Japanese fixed texts on en form (pre-existing) | product | none | 70% |
| VOV-008 en | 1 – row-set vs "single row" (pre-existing) | test | none | 10% |

**CATOV-021, for Claude:** the job expects non-form pages to be absent from query-index. EDS normally keeps noindex pages in query-index with a `robots` column, and list blocks may read that index; only the sitemap is meant for crawlers. I kept the Expected unchanged. I suggest dropping the query-index part of that check.
Reports: `results/DSR-654/DEV/automation-run-20261023-job10{-try1,,-overlay}.md`. Evidence: 9 first-attempt PNGs (~0.7 MB). CATOV-021 makes only HTTP requests, so it has no screenshot to keep. Pre-existing fails were not re-investigated; their suspect, cause and confidence are copied from JOB-09.
