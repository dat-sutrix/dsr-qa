# JOB-20261023-15 – R2 regression for block:catalog-detail (654/570/557), DEV, ja+en – done
**NEW FAIL:** none (0 TCs went from pass in the ledger to fail now). **Merge/incident-related (cause ≠ none):** none.

**Build caveat:** `blocks/catalog-detail/catalog-detail.js` on DEV (.live and .page) has `Last-Modified: Thu, 22 Oct 2026 01:48:45 GMT` (ETag `b7e43493…`). That is older than Martin's refactor (CHANGES.md 23/10 ~12:50 VN). The refactor is probably **not deployed** on DEV `main` yet, so this run does not prove it is regression-free. Re-run when Last-Modified changes.

**Ran:** 3 specs, ja+en, chromium: 100 tests – 85 pass / 8 fail / 7 skip, 0 flaky, exit 1, 3.6 min. `tsc --noEmit` exit 0. No code changes.

| Fail | Why (my guess) | suspect | cause | confidence |
|---|---|---|---|---|
| CATOV-001 -form ja/en ×2 (pdf-form, ebook-form) | title shows dev-sample text, see below | data | none | 0% |
| CATOV-012 ja/en | no list card "QA190 PDF catalog" (TD-190 not seeded) | data | none | 0% |
| CATDL-007 ja | gated PDF `_publishUrl` in dsr-catalog-list before submit (draft BUG-CAT-PDF-EXPOSE) | product | none | 70% |
| CATDL-016 en | Japanese fixed texts on en form (draft BUG-CAT-FORM-EN) | product | none | 70% |
All 8 are the same fails as in REG-1200 and JOB-23-13.

**CATOV-001 title (ja and en are identical):**
- pdf-form: rendered `.catalog-detail-title` = "catalog pdf form". Static HTML `<title>` = "catalog pdf form | YKK DIGITAL SHOWROOM". Static row `catalogTitle` = "catalog pdf form". TD-190 expects "QA190 PDF form required".
- ebook-form: rendered = "catalog ebook form". `<title>` = "catalog ebook form | YKK DIGITAL SHOWROOM". Row = "catalog ebook form". TD-190 expects "QA190 e-book form".
- The deployed block renders `catalog.catalogTitle` from the overlay rows. It uses the dev mock only when the page has no rows. So the block does **not** ignore the CF title: the CF holds the sample text → **data**. The CF was not read in Author (read-only lane). The overlay row is taken as the CF value.
**Outputs:** run report `results/REGRESSION/DEV/automation-run-20261023-job15.md`. The ledger has 62 keys updated, plus 3 new skip keys (CATOV-013 en, CATOV-020 ja/en). Evidence: 8 PNGs (560 KB).
