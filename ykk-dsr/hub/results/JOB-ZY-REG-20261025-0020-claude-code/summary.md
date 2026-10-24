# JOB-ZY-REG-20261025-0020-claude-code – R3 P1 + P3 + REG-VOV-EN capture-on-fail, DEV – done
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| none | – | – | 0 of 240 TC/lang keys went pass → fail vs ledger (last = REG-2020 P1 / REG-0020 24/10 P3) | – | – | – |

**Merge/incident-related (cause ≠ none):** none.

**Ran** (chromium, ja+en, `ENV=dev`, 17:23–17:41Z, same commands as REG-0020 24/10 step 1): overlay 257 → 208 pass / 8 fail / 41 skip · P1 non-overlay `@auto` + 227 82 → 36 / 18 / 28 · smoke + 433 + 591 retest 11 → 11 / 0 / 0. Total 350: 255 / 26 / 69, 0 flaky. `tsc --noEmit` exit 0. No code changes, no AEM writes, no login, no form submit, no mail sent.
**Ledger:** 240 keys refreshed, 0 status changes (376 keys total; ARTICLE-011 P2 left as is).
**Known fails unchanged** (cause none, suspect/confidence as in REG-2020): 654 CATOV-001 -form ×4 + CATOV-012 ×2 (data 0%) · 570 CATDL-007 ja / CATDL-016 en (product 70%) · 583 PLSP-002/003/005, PRODLIST-001..004 (test 10%) · 609 TOP-004..007 (product 40%).
**557 CATV-018/019** (REG-0020 TZ artefact) pass ja+en this run: both JST and Berlin dates are past the 10-day boundary of the 10-13 rows. The TZ question stays open.
**P3:** 227 ASSET-016 ja/en pass (15 skip, TD-227-02) · 433 MAIL-016/017 pass · retest 591 8/8, 647 2/2 pass, 538 2 pass / 4 skip – all same as baseline.

**Step 3 – REG-VOV-EN capture-on-fail:** **0 captures**. `test-results/graphql-capture/` was removed before the first run and did not exist right after the last run (17:41Z), before any other run, so there is no `graphql-capture/` folder. Hook ran in 557 (38 pass), 587 overlay (15 pass), 654 (49 pass, 6 known data fails): no list query failed / returned empty. This is no evidence for or against 🐞 REG-VOV-EN.

**Step 4 – headers** (`observations.json`, `observe.cjs`; .live = .page): scripts.js, styles.css, header.js, footer.js, related-content.js/.css, listing.js/.css unchanged vs REG-2020 (LM + ETag); `blocks/list/*` 404. DSR-639/661/675: **not verified** (README §7).
**Outputs:** ledger · run report `results/REGRESSION/DEV/automation-run-20261024-reg0020b.md` · `result.json` · 24 fail PNGs (3.3 MB). 552 side-effect PNGs reverted, not committed.
