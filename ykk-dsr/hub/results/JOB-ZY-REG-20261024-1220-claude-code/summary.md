# JOB-ZY-REG-20261024-1220-claude-code – R3 full P1 + P2 + REG-VOV-EN probe, DEV – done
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| none | – | – | 0 of 345 TC/lang keys went pass → fail vs ledger (last = IDLE-44 01:23Z) | – | – | – |

**Merge/incident-related (cause ≠ none):** none.

**Ran** (chromium, ja+en, `ENV=dev`, 05:27–05:47Z, same commands as REG-0420 step 1, `DSR566_SLUG=qa566-news-01`): overlay 257 → 208 pass / 8 fail / 41 skip · P1+P2 non-overlay `@auto` 157 → 82 / 32 / 43 · smoke + 664 + 173 47 → 13 / 5 / 29. Total 461: 303 / 45 / 113, 0 flaky. `tsc --noEmit` exit 0. No code changes, no AEM writes, no login, no form submit.
**Ledger:** 345 keys refreshed, 0 status changes. CATV-018/019 ja+en pass (TZ fix in code), VOV-011 ja+en + VOV-013 en pass, VOV-005 en skip (no `DSR587_SEEDED`, not a fail).
**Known fails unchanged** (cause none, suspect/confidence as in IDLE-44): 654 CATOV-001 ×4 + CATOV-012 ×2 (data 0%) · 570 CATDL-007 ja / CATDL-016 en (product 70%) · 583 PLSP-002/003/005, PRODLIST-001..004 (test 10%) · 609 TOP-004..007 (product 40%) · 529 ARTICLE-012 (data 30%) / 024 (product 50%) · 590 ECO-005/006 (test 30%) · 589 ICON-006 (product 40%) · 566 NEWS-002/006 (product 70%) / NEWS-012 (data 15%) · 173 MOVIE-014/033 (data 20%), MOVIE-026 (DSR-538, 60%), 501-P2/P3 en (data 10%).

**Step 3 – REG-VOV-EN probe** (`probe-vov-en.json`, script `probe-vov-en.cjs`; 05:28:37–05:41:08Z, in parallel with the regression runs):
1. **0/20 en loads failed** (0/5 ja control). Every load: document 200, title `search` (ja `動画 検索・一覧`), 12 cards en / 6 ja, no "Unable to load video information.".
2. Each load makes exactly 1 matching request: `publish-p192812-e2014374…/graphql/execute.json/ykk/dsr-video-list;folder=/content/dam/dsr/{lang}/movies/standard/;cb=<ms>`. All 25 = 200 `application/json`, `data.related.items` non-empty, `x-cache: MISS`, `age: 0`, no `cdn-cache-control`, `cache-control: max-age=60, s-maxage=300`, 374–2293 ms.
3. The `cb=<timestamp>` cache-buster makes every list fetch a CDN miss to publish, so an intermittent publish/GraphQL error would hit users directly (inference, not observed).
4. No failing response was captured, so no HAR/screenshot was kept. The cause (FE fetch vs publish GraphQL) is still unknown. 🐞 REG-VOV-EN stays < 80% (no new evidence for or against).
5. Console on every load (OK too): two `404 Failed to load resource` (pre-existing class, cause none). VOV-011/013 en also passed in the regression run.

**Step 4 – headers** (`observations.json`; .live = .page): scripts.js, styles.css, header.js, footer.js, related-content.js/.css all unchanged vs REG-0420/IDLE-44 (LM + ETag). `blocks/list/*` = 404; the list block is `listing`: listing.js 21 Oct 09:11:13Z, listing.css 21 Oct 06:45:58Z (first record). Build not verified (README §7).
**Outputs:** ledger · run report `results/REGRESSION/DEV/automation-run-20261024-reg1220.md` · `result.json` · 42 fail PNGs (4.4 MB; TOP-005 en left out for the cap). 552 side-effect PNGs were reverted, not committed.
