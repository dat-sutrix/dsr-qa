# JOB-ZY-REG-20261024-0420-claude-code – R3 full P1 + P2, DEV – done
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| none | – | – | 0 of 345 TC/lang keys went pass → fail vs ledger (REG-0020 P1, REG-2020 P2) | – | – | – |

**Merge/incident-related (cause ≠ none):** none.

**Ran** (chromium, ja+en, `ENV=dev`, 21:24–21:42Z): overlay 257 → 204 pass / 12 fail / 41 skip. P1+P2 non-overlay `@auto` (566 with `DSR566_SLUG=qa566-news-01`) 157 → 80 / 34 / 43. Smoke + 664 + 173 (untagged) 47 → 13 / 5 / 29. Total 461: 297 / 51 / 113, 0 flaky. `tsc --noEmit` exit 0. No code changes, no AEM writes, no login, no form submit.
**Known fails unchanged** (cause none): 654 CATOV-001 -form ×4 + CATOV-012 ×2 · 570 CATDL-007 ja, CATDL-016 en · 557 **CATV-018/019 ja+en = known test-TZ artefact (`test`, REG-CATV-TZ 15%)** · 583 PLSP-002/003/005, PRODLIST-001..004 · 609 TOP-004..007 · 529 ARTICLE-012/024 · 590 ECO-005/006 · 589 ICON-006 · 173 MOVIE-014/026/033, 501-P2/P3 en.
**566 baseline** (was skip on the 404 page; first real entry, not NEW FAIL): 14 pass / 8 fail / 2 skip. NEWS-002/006 ja+en: no Back to list (= 🐞 NEWS-BACK, product 70%). NEWS-012 ja+en: My List/share hidden (= DASHBOARD NEWS-012, data 15%). NEWS-007 ja+en: the spec reads `/master/{lang}/query-index.json` and `/master/{lang}/news/query-index.json` (both 404), but the qa566 pages are in root `/query-index.json` with `template` empty → suspect test 20%.

**Step 3 – TZ observation** (no code commit; temporary config `use.timezoneId: 'Asia/Tokyo'`, deleted): CATV-018/019/020 ja+en **6/6 pass** (21:42:45–21:43:13Z). Host TZ Europe/Berlin → 018/019 fail. Confirms the TZ artefact.
**Step 4 – headers** (.live = .page, 21:24Z): scripts.js 19 Oct 03:10:29Z · styles.css 09 Oct 01:34:56Z · header.js 30 Sep 05:35:24Z · footer.js 15 Sep 06:07:33Z – all unchanged vs REG-0020 (LM + ETag). related-content.js 22 Oct 09:07:32Z, .css 06 Oct 04:34:36Z (first record, no baseline). The .js time matches Martin's DSR-661 comment (22/10 18:07 JST), but DSR-661/639/675 are **not verified** as deployed or not deployed (README §7).

**Outputs:** ledger updated (345 keys refreshed; 22 changes, all 566 skip→pass/fail; 31 out-of-scope keys left as is) · run report `results/REGRESSION/DEV/automation-run-20261023-reg0420.md` · `result.json` · `observations.json` · 48 fail PNGs (4.8 MB; TOP-005 en left out for the size cap). 552 spec side-effect PNGs in `evidence/DSR-552/DEV/` were reverted and not committed.
