# JOB-20261024-04 – DSR-669 cf-model rename spec (DEV, ja/en) – done · **needs-input: cookie**
**Merge/incident-related (cause ≠ none): none. NEW FAIL vs pre-669 (12.0): none.** New spec `tests/cf-model/DSR-669.cf-model-rename.spec.ts` (+ `fixtures/dsr-669.ts`): 36 tests, 29 pass · 2 fail · 7 skip. `@overlay` suite: 208 pass · 8 fail · 41 skip, 0 regressed. Read-only: publish GraphQL GET + EDS pages; Author returned 401, so no Author request succeeded.
| TC | Proposed | Raw value | suspect / cause / conf. |
|---|---|---|---|
| 1.0 / 2.0 / 3.0 / 4.0 | Skipped (cookie) | `node tools/author/author.mjs models` → HTTP 401 (02:16:10Z) | env / none / – |
| 9.0 ja + en | Pass | 8/8 queries × 2 langs: 200, no `errors`; page = `inactive`+`related`, list `related` ≥ 1 (video ja 7/en 30, product ja 8/en 4, catalog ja 15/en 16); detail = `dmMovieDsrList`/`dmProductDsrList`, no `*RelatedList`; QA item present | – |
| 10.0 | Skipped (cookie) | Author `/graphql/list.json/ykk` not requested (cookie 401) | env / none / – |
| 11.0 ja | Pass | 4 block JS 200, 0 hits for `dm*RelatedList`/`dm_*_related` (product/video/related-product LM 23 Oct 07:15:23 GMT, catalog 22 Oct 01:48:45); 2 pages: 0 GraphQL requests | – |
| 12.0 ja + en | Pass | `compare-runs` vs `overlay-before-669.json`: regressed 0, fixed 4 (CATOV-002), 8 fails all failed pre-669 (CATOV-001 form ×4 data, CATOV-012 ×2, CATDL-007, CATDL-016 en); 6 TD overlay pages: 200, `source=overlay`, cfPath `/content/dam/dsr/…`, no unavailable row | – |
| 13.0 ja | **Fail** (ids Pending) | product list card `/ja/products/990586006` → 404 (sub-folder CF `qa586/990586006`; page lives at `/ja/products/qa586/990586006` 200). video 6 / catalog 14 / product 6 cards, no "Unable to load" | data / none / 40% |
| 13.0 en | **Fail** (ids Pending) | video list card `/en/library/video/QA587_Upper` → 404 (uppercase node TD-587-04, 404 by design per KNOWN-FACTS 23/10). video 12 / catalog 14 / product 4 cards | data / none / 40% |
| 14.0 ja | Pass | `990586008` under `inactive` (also in `related` with `isActive:false`); page 200, row `unavailable=inactive`, robots `noindex`; browser → `/ja/product-list` | – |
| 15.0 | Skipped | Blocked-by TD-669-02 (no republish time in job input) | data / none / – |
| 16.0 | Skipped | Blocked-by TD-669-03: `/ja/library/catalog/qa669-new` 404 | data / none / – |
Why 13.0 fails: the lists show QA boundary CFs (sub-folder, uppercase name) that by design have no flat page (BL-OVL-1). This is not evidence of a 669 regression. Either the list should hide these CFs or this is test data noise; Claude decides. No pre-669 card ids exist anywhere, so the post-669 snapshot is saved as `lists-after-669.json` (candidate baseline).
Test fix during the job: 9.0 `video-detail` first failed because its content items have no `_path`, so the spec now matches on `movieId` (run report `-run1`). Files: `overlay-diff-vs-before-669.md`, `overlay-after-669.json`, `evidence/` (2 PNG). Reports: `results/DSR-669/DEV/automation-run-20261024{,-run1,-overlay}.md`.
