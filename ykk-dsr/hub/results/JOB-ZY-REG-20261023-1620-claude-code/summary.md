# JOB-ZY-REG-20261023-1620-claude-code – R2 (+R1) after DSR-669/670/671 + migration, DEV – done
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| none | – | – | 0 of 260 TC/lang keys changed status vs ledger | – | – | – |

**Merge/incident-related (cause ≠ none):** none. No result needs the `cf-model-669` tag: no list/count/query-index/sitemap diff, and every qa* item is present.

**Ran** (chromium, ja+en, `ENV=dev`, 09:52–10:08Z): `npm run test:dev:overlay` 257 → 208 pass / 8 fail / 41 skip. Non-overlay `@auto` (552, 609, 557, 583, 570, 529, 585, 590) 118 → 66 / 24 / 28. Smoke 1/1 pass. Total 376: 275 pass / 32 fail / 69 skip, 0 flaky. `tsc --noEmit` exit 0. No code changes, no AEM writes.
**Compare vs pre-669** (`compare.md`): regressed 0, fixed 4 (CATOV-002 pdf/ebook, already fixed in JOB-23-10/13), 6 skip→pass (CATV-018..020). VOV-011/013 en passed on the first attempt, so no retry was needed.
**32 known fails (30 keys), all already `fail` in the ledger, cause none:** 654 CATOV-001 -form ×4 + CATOV-012 ×2 (data, dev-sample CF titles / TD-190) · 570 CATDL-007 ja, CATDL-016 en (product 70%, drafts) · 529 ARTICLE-012/024 · 590 ECO-005/006 · 583 PLSP-002/003/005, PRODLIST-001..004 (test: DSR-583 dismissed Not a bug, Expected looks outdated) · 609 TOP-004..007.

**Observations (no verdict):**
- Block files: catalog-detail.js Last-Modified still 22 Oct 01:48:45Z (ETag b7e43493, .live = .page) → **refactor not deployed**, that CHANGES.md row stays open. eco-carousel.css 23 Oct 07:21:26Z, .js 19 Oct 04:43:32Z.
- **DSR-667:** 11 dots wrap to 2 rows; dot 9 clipped 0 px at 393/390/375 (JOB-23-12: 1/4/19 px); clearance to next button 58.5/57/49.5 px, both hosts. **670:** `dsr-techmovie-page;path=…/movies/tech/…` → 200, empty `related`/`inactive` (expected, no tech talks on DEV).
- **671:** `/ja/products/990586001` `productLabel` = `990586001`, **not** `{productId}｜{productName}` (query + overlay rows) – dev to confirm whether an un-re-saved CF explains it. `dsr-catalog-page` has `hubspotFormId`/`promoText` (null); `dsr-catalog-list` has neither. `relatedMoodboards` absent everywhere checked.

**Outputs:** ledger updated (260 keys, job/at refreshed) · run report `results/REGRESSION/DEV/automation-run-20261023-reg1620.md` · `compare.md` · `observations.json` · 32 fail PNGs (4.5 MB). Author-side steps 1–3 were not run (they stay with JOB-23-11).
