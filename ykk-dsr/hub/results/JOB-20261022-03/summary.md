# JOB-20261022-03 – DSR-586 + 557/570 form rerun after data fix (claude-code, DEV .aem.page + .aem.live, ja+en, 01:01–01:12Z 23/10) – status: done
**Merge/incident-related:** none (every fail has cause `none`). No code changed, no deploy observed. tsc exit 0.
**Preflight:** 990586001 now resolves on ja+en, both tiers ("QA586 product A", cfPath dsr/{lang}/products/990586001, QA586-A), so BUGCHK-586-01 holds. The `requiresForm` row is `true` on all 4 `-form` pages (ja/en × .page/.live), so SHADOW-190-FORM holds. **990586002 = 404 on .page and .live (ja and en).**
**990586002 Author (GET only, raw: `author-props-990586002.json`):** DSR CF `dsr/ja/products/990586002` is **DRAFT** with previewReplicationStatus **NEVER_PUBLISHED**. It has no `_preview` replication props. `cq:lastReplicationAction_publish=Activate` is set, but there is **no `cq:lastReplicated_publish`** (activation never completed?). Content CF `common/ja/products/990586002` is PUBLISHED to the publish tier (21/10 14:56Z), even though TD-586-02 says preview-only. → **The DSR CF was never Previewed, so the 404 is data (0%) and is not evidence for BUG-CAT-PREVIEW.** Side note: 990586001 also shows NEVER_PUBLISHED for preview and still renders on .page. .page serves published CFs, so a real preview-only check is still open.
Runs (pass/fail/skip per tier, page = live): 586 13/0/2 · 557 24/0/6 · 570 12/2/2. Job verdicts in result.json: 122 rows, 98 pass, 4 fail, 16 blocked, 4 skip.

| Group | TCs | Proposed | suspect | conf. bug |
|---|---|---|---|---|
| 586 positives on TD-586-01 | PDO-001/003/013/014 ja+en, 004/012/017/019/021 ja | pass (017/021 only on the filled fields: optional TD fields + media02/03 empty, data) | – | – |
| TD-586-02 not on .page (DSR CF never Previewed) | PDO-002; 012 "preview-only absent" not verified | blocked | data | 0% |
| ver0.4 new fields, no design (Q29) | PDO-020 | blocked | product | 0% |
| Form part 557/570 | CATV-017, CATDL-006/010/018 ja+en | pass | – | – |
| Gated PDF URL in `dsr-catalog-list` (qa190-cat-pdf-form pdfAsset._publishUrl) | CATDL-007 ja | fail (same as JOB-10/-14) | product | 70% |
| en form renders in Japanese | CATDL-016 en | fail (same as JOB-14) | product | 70% |
| QA190 NEW/UPD/BOTH not in dsr folder | CATV-018..020 | blocked | data | 0% |
| No catalog-ID mechanism on DEV; cn missing (#18) | CATDL-017; CATDL-016 cn | skip | – | – |

**Next:** (1) Preview the DSR CF `dsr/ja/products/990586002` (Preview only, no Publish) in Author. Optionally unpublish the content CF or accept it as is. Then rerun PDO-002/012. Only "Preview OK + still 404" supports BUG-CAT-PREVIEW. (2) Claude to decide on the 2 × 70% (unchanged).
Evidence (fails only, 308 KB): `evidence/`. Reports: `results/DSR-{586,557,570}/DEV/automation-run-20261023-job20261022-03.md`. Read-only; no form submitted, no Author writes.
