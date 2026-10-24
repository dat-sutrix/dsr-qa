# JOB-ZY-REG-20261024-1620-claude-code – R3 P1 + REG-VOV-EN light probe, DEV – done
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| none | – | – | 0 of 211 refreshed TC/lang keys went pass → fail vs ledger (last = REG-1220) | – | – | – |

**Merge/incident-related (cause ≠ none):** none.

**Ran** (chromium, ja+en, `ENV=dev`, 09:26–09:39Z, P1 set of REG-0020 step 1, no P3): overlay 257 → 208 pass / 8 fail / 41 skip · P1 non-overlay `@auto` (552, 609, 583; 557/570 are all `@overlay`) 65 → 34 / 18 / 13 · smoke 1 → 1 / 0 / 0. Total 323: 243 / 26 / 54, 0 flaky. Per-spec counts are identical to REG-1220. `tsc --noEmit` exit 0. No code changes, no AEM writes, no login, no form submit.
**Ledger:** 211 keys refreshed, 0 status changes. 2 keys not refreshed: `DSR-ARTICLE-011 [ja/en]` (529 = P2). Only its `@overlay` subcase ran (skip, "Blocked: article list…"); the subcase that passed in REG-1220 was out of scope, so the ledger stays `pass`. VOV-005 en skip (no `DSR587_SEEDED`, not a fail).
**Known fails unchanged** (cause none, suspect/confidence as in REG-1220): 654 CATOV-001 ×4 + CATOV-012 ×2 (data 0%) · 570 CATDL-007 ja / CATDL-016 en (product 70%) · 583 PLSP-002/003/005, PRODLIST-001..004 (test 10%) · 609 TOP-004..007 ja+en (product 40%).

**Step 3 – REG-VOV-EN light probe** (`probe-vov-en.json`, script `probe-vov-en.cjs` reused from REG-1220; 09:26:19–09:32:49Z, en 10× ~30 s apart + ja 3× control):
1. **0/10 en loads failed** (0/3 ja). Every load returned a 200 document and titled `search` (ja `動画 検索・一覧`), showed 12 cards en / 6 ja, and never displayed "Unable to load". Each made one `dsr-video-list;folder=…/movies/standard/;cb=<ms>` request: 200 JSON with non-empty `data.related.items`, `x-cache: MISS`, `age: 0`, 261–1562 ms. Console showed only the known `404 Failed to load resource` (cause none).
2. With REG-1220, that is 0/30 en since 05:28Z. The failure was not reproduced, so there is no HAR/screenshot/failing response. 🐞 REG-VOV-EN stays < 80%, with no new evidence for or against.
3. Suggestion: change from a fixed probe to a capture-on-fail hook (`page.on('response')` on `dsr-video-list`) in the normal 557/587 runs. More fixed probes are unlikely to catch a ~1-minute window.

**Step 4 – headers** (`observations.json`; .live = .page): scripts.js, styles.css, header.js, footer.js, related-content.js/.css and listing.js/.css are all unchanged vs REG-1220 (LM + ETag); `blocks/list/*` 404. Nothing suggests an unannounced deploy for DSR-639/661/675, but the build is not verified (README §7).
**Outputs:** ledger · run report `results/REGRESSION/DEV/automation-run-20261024-reg1620.md` · `result.json` · 24 fail PNGs (3.3 MB). 552 side-effect PNGs reverted, not committed.
