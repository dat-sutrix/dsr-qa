# JOB-ZZ-IDLE-47 – regression reuse + DSR-608 Booth scaffold, DEV – done
| NEW FAIL: TC | lang | last pass | error | suspect CHANGES.md row | cause | confidence |
|---|---|---|---|---|---|---|
| none | – | – | regression not re-run; REG-1620 had 0 pass → fail | – | – | – |

**Merge/incident-related (cause ≠ none):** none.

**Step 1 – regression skipped:** JOB-ZY-REG-20261024-1620-claude-code finished 09:38:36Z, < 2 h before this job (10:27Z). Its ledger is reused unchanged (213 rows: 141 pass / 24 fail / 48 skip, known fails only). ⚠ REG-1620 was P1 only; P2/P3 last ran in IDLE-44 (01:00Z). `test-results/graphql-capture/` does not exist (no capture-on-fail output from JOB-20261024-08) → nothing copied.
**Step 2 – DSR-608 scaffold** (newest `[tc-night]` of 560/568/608; booth live in DEV via DSR-661). New: `fixtures/dsr-608.ts`, `pages/BoothPage.ts`, `tests/booth/DSR-608.booth.spec.ts` (DSR-BOOTH-001..014 = 608-1.0..14.0; 010 manual, 013 visual/codex, cn fixme). `tsc --noEmit` exit 0.
[Giả định] TD-608-01/04 = Martin's sample `/{lang}/digital-showroom/both(/item)` (DSR-661 c.64907); the spec.json path `/product/application/fashion/fashion` 404s. The pages exist on **.aem.page only** (.live 404) → `DSR608_BASE` override.
**Runs:** `.live` 34 → 0 pass / 0 fail / 34 skip (blocked-data, page 404). `.page` 34 → 13 pass / 9 fail / 12 skip, 0 flaky. The first preview run found 4 test defects, all fixed: the CTA trigger was the image-zoom button, and 2 tests did not wait for navigation.
**Fails on preview (sample content, proposed, cause none):**
| TC | lang | observation | suspect | conf. |
|---|---|---|---|---|
| BOOTH-001, 011 | ja | ja TOP back → `/en/digital-showroom`, Products → `/en/product-list` without booth-tag query (en has `?applications=…`) | data | 40% |
| BOOTH-005, 011 | ja, en | all 4 ITEM-for pills `href=/content/sites` (404, label TEST) | data | 50% |
| BOOTH-014 SP | ja, en | `.bt-bg` `display:none` at 390 px; image 200 + decoded, PC OK → TC 14.0 may over-specify SP (check Figma 3324-64850) | test | 25% |
**Data-blocked:** 002 (TOP pills are `<span>`, no sibling booths) · 003 ≥ 2 MV · 007 ≥ 2 products · 009 no CTA modal trigger (Q18/CB-10) · TD-608-02/03 QA copies not created. Not added to a regression tier (Claude decides).
**Outputs:** `results/DSR-608/DEV/automation-run-20261024{,-preview}.md` · `result.json` · 9 fail PNGs (2.5 MB). No AEM writes, login or form submit.
