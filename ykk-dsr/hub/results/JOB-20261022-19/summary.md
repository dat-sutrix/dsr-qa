# JOB-20261022-19 – DSR-654 CATOV-006/010 en (claude-code, DEV, 01:17–01:20Z) – status: done
**Merge/incident-related:** none (all `cause: none`).
**Preflight:** data proof taken from the release note's Night Report 22/10 quote (TD-654-03 / -05 Pass); sheet not read directly. SHADOW-TD-654 vs JOB-07: no real mismatch (qa654-preview .page "→ list" = 200 page with `unavailable: not-found`); TC expectations unchanged.
Run: 2 tests, 1 pass / 1 fail (retry also failed; second run same). tsc exit 0. Report: `results/DSR-654/DEV/automation-run-20261023-job19.md`.

| TC | Result | Observed | suspect | cause | conf. bug |
|---|---|---|---|---|---|
| DSR-CATOV-006 [en] | pass | qa654-removed 404 on .page + .live; no query-index row | – | none | – |
| DSR-CATOV-010 [en] | fail | qa654-sub 404 both tiers, but `/en/library/catalog/qa654-folder/qa654-sub` **200** on .live (spec) and .page (curl): noindex, title "YKK DIGITAL SHOWROOM", block rows `source: overlay` + `unavailable: not-found`, browser is sent to `/en/library/catalog` | product | none | 70% |

Why I think 010 fails: the overlay still generates a page for a DSR CF in a subfolder (BL-OVL-1: "subfolder → no page"). It handles it as not-found and redirects to the list, not as 404. A made-up folder path (`zz-nofolder/qa654-update`) gives 404, so the cause is the seeded subfolder CF. The QA-PT Night Report saw the same list redirect. < 80% → Claude/Dat to decide (bug vs accepted behaviour).
Spec gap: 010 checks the folder URL only on BASE_URL (.live); the TC wants both tiers. Fix in a later job.
Evidence: `evidence/DSR-CATOV-010_en_{live,page}.png` (list page after redirect). Read-only; no code changed.
