# JOB-ZY-REG-20261024-2020-claude-code – R3 full P1 + P2 + REG-VOV-EN capture-on-fail, DEV – done
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| none | – | – | 0 of 345 TC/lang keys went pass → fail vs ledger (last = REG-1620 P1 / REG-1220 P2) | – | – | – |

**Merge/incident-related (cause ≠ none):** none.

**Ran** (chromium, ja+en, `ENV=dev`, 13:24–13:45Z, same commands as REG-1220 step 1, `DSR566_SLUG=qa566-news-01`): overlay 257 → 208 pass / 8 fail / 41 skip · P1+P2 non-overlay `@auto` 157 → 82 / 32 / 43 · smoke + 664 + 173 47 → 13 / 5 / 29. Total 461: 303 / 45 / 113, 0 flaky. Per-spec counts are identical to REG-1220. `tsc --noEmit` exit 0. No code changes, no AEM writes, no login, no form submit.
**Ledger:** 345 keys refreshed, 0 status changes. VOV-005 en skip (no `DSR587_SEEDED`, not a fail).
**Known fails unchanged** (cause none, suspect/confidence as in REG-1220/1620): 654 CATOV-001 ×4 + CATOV-012 ×2 (data 0%) · 570 CATDL-007 ja / CATDL-016 en (product 70%) · 583 PLSP-002/003/005, PRODLIST-001..004 (test 10%) · 609 TOP-004..007 (product 40%) · 529 ARTICLE-012 (data 30%) / 024 (product 50%) · 590 ECO-005/006 (test 30%) · 589 ICON-006 (product 40%) · 566 NEWS-002/006 (product 70%) / NEWS-012 (data 15%) · 173 MOVIE-014/033 (data 20%), MOVIE-026 (DSR-538, 60%), 501-P2/P3 en (data 10%).

**Step 3 – REG-VOV-EN capture-on-fail:** **0 captures**. Checked right after the last Playwright run (13:45Z), before any other run: `test-results/graphql-capture/` was never created, so the `graphql-capture/` folder is not in this result. The hook (`fixtures/capture-graphql.ts`) ran in 557 (38 pass), 587 overlay (15 pass) and 654 (49 pass, 6 known data fails). It writes only when a `dsr-video-list`/`dsr-catalog-list` response is ≠ 200, has `errors`, has an empty DSR list or the request fails. So no list query failed during these tests (13:24–13:43Z). This is no evidence for or against 🐞 REG-VOV-EN (< 80%).

**Step 4 – headers** (`observations.json`, script `observe.cjs`; .live = .page): scripts.js, styles.css, header.js, footer.js, related-content.js/.css and listing.js/.css are all unchanged vs REG-1620 (LM + ETag); `blocks/list/*` 404. Nothing suggests an unannounced deploy (DSR-639/661/675), but the build is not verified (README §7).
**Outputs:** ledger · run report `results/REGRESSION/DEV/automation-run-20261024-reg2020.md` · `result.json` · 42 fail PNGs (4.3 MB; TOP-005 en left out for the cap). 552 side-effect PNGs reverted, not committed.
