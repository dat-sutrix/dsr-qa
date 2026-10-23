# JOB-ZY-REG-20261023-1200-claude-code – R3 P1+P2 regression, DEV – done (first ledger baseline)
| NEW FAIL: TC | lang | last pass (job/date) | error | suspect change (CHANGES.md) | confidence |
|---|---|---|---|---|---|
| DSR-VOV-011 | en | JOB-20261023-10 overlay run, 23/10 05:00Z | /en/library/video/search: 200 but "Unable to load video information.", no `.listing` (05:18:55Z, 2/2 attempts) | 23/10 DSR-669/671 cf-model/query (deploy "~1–2h after 12:00", `pending`); DSR-665-like path handling also possible | 30% |
| DSR-VOV-013 | en | JOB-20261023-10 overlay run, 23/10 05:00Z | same page and window: no list card (05:19:15Z, 2/2) | same as above | 30% |

Both NEW FAIL are **transient**: the recheck at 05:30Z passed 2/2, and ja VOV-011 passed in the main run. Watch the next guard run. Merge/incident-related (cause ≠ none): **none**.

**Ran:** 15 `@auto` P1/P2 specs + smoke, DSR-173 and DSR-664 (no tags), ja + en, chromium, `ENV=dev`. Results: 443 tests – 275 pass, 47 fail, 121 skip, 0 flaky; exit 1/1. Wall time: group A 15.2 min, group B 2.0 min. Per-spec wall times are in the run report §3. The slowest specs are product-list-sp (363 s), catalog-overlay (229 s) and eco (198 s). `npx tsc --noEmit` exit 0. No code changes and no AEM writes.

**Known/pre-existing fails (not NEW FAIL)**, all already failing in IDLE-35/39 or JOB-23-06/08/09/10: 529 ARTICLE-012/023/024 · 570 CATDL-007 (draft BUG-CAT-PDF-EXPOSE), CATDL-016 (draft BUG-CAT-FORM-EN) · 654 CATOV-001 -form, CATOV-012 (data), CATOV-021 non-form (query-index Expected under review) · 590 ECO-005/006 · 589 ICON-006 · 583 PLSP-002/003/005, PRODLIST-001..004 · 609 TOP-004..007 · 587 VOV-008 · 173 MOVIE-014/033, MOVIE-026 (DSR-538).

**Note on DSR-501-P2/P3 [en]:** the TC IDs collide. The DSR-173 spec version fails (qa501 data not re-seeded, since IDLE-30). The overlay-retest spec version passed in JOB-23-09 but is out of regression scope. I classed it as known.

**Outputs:** ledger `ykk-dsr/hub/results/REGRESSION/ledger.json` (331 TC/lang keys, worst case over sub-cases; VOV-011/013 en recorded as the recheck pass, with a note) · run reports `results/REGRESSION/DEV/automation-run-20261023-reg1200.md` and `-reg1200-recheck.md` · evidence: 39 PNGs (4.2 MB), including both NEW FAIL.
