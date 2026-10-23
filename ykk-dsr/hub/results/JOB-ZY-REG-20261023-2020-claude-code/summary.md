# JOB-ZY-REG-20261023-2020-claude-code – R3 full S12 (P1 + P2), DEV – done
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| none | – | – | 0 of 341 TC/lang keys changed status vs ledger (REG-1620; P2 keys from REG-1200) | – | – | – |

**Merge/incident-related (cause ≠ none):** none.

**Ran** (chromium, ja+en, `ENV=dev`, 13:25–13:45Z): `npm run test:dev:overlay` 257 → 208 pass / 8 fail / 41 skip. P1+P2 non-overlay `@auto` (552, 609, 557, 583, 570, 529, 566, 590, 589, 585) 157 → 66 / 26 / 65. Smoke + 664 + 173 (no `@auto` tag in those specs, so they ran without that filter) 47 → 13 / 5 / 29. Total 461: 287 pass / 39 fail / 135 skip, 0 flaky. `tsc --noEmit` exit 0. No code changes, no AEM writes.
**P1 is identical to REG-1620** (same 32 known fails, cause none): 654 CATOV-001 -form ×4 + CATOV-012 ×2 (data) · 570 CATDL-007 ja, CATDL-016 en (product 70%) · 529 ARTICLE-012/024 · 590 ECO-005/006 · 583 PLSP-002/003/005, PRODLIST-001..004 (test, Expected outdated) · 609 TOP-004..007.
**P2 baseline** (not in REG-1620, ledger rows from REG-1200, all unchanged): 589 ICON-006 ja/en fail (console "Failed to load resource", product 40%) · 173 MOVIE-014/033 (data 20%, legacy page), MOVIE-026 (DSR-538, product 60%), 501-P2/P3 en (data 10%, qa501 not re-seeded) · 664 VCAP 7 pass / 1 skip · 566 all 24 skip.
**Watch – 566:** `/master/{ja,en}/test-space/test-news-detail-template` is 404 on .live and .page, so the whole spec skips. It was also skip in REG-1200, but NEWS-001/003/004 passed at 03:32–04:39Z today. Claude to check whether the page was moved or unpublished.

**Observations (no verdict, .live = .page):** scripts.js LM 19 Oct 03:10:29Z (ETag 53efa556) · styles.css 09 Oct 01:34:56Z (b22adbb6) · header.js 30 Sep 05:35:24Z (4a5ef25f) · eco-carousel.js 19 Oct 04:43:32Z, .css 23 Oct 07:21:26Z (unchanged vs REG-1620). No header change seen for the pending rows DSR-639/661/675. Per README §7 that is **not verified** as "not deployed". **671-LABEL:** `productLabel` ja 990586001 = `"990586001"`, en = `null`; no `｜` label on the page (h1 "QA586 product A"). Unchanged.

**Outputs:** ledger updated (341 keys refreshed, 6 not produced left as is) · run report `results/REGRESSION/DEV/automation-run-20261023-reg2020.md` · `result.json` · `observations.json` + 2 raw query JSONs · 37 fail PNGs (4.99 MB, losslessly recompressed).
