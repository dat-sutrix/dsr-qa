# JOB-20261022-07 – Author P1b write + Night 22/10 CF tasks (DEV, WRITE) – status: done
Merge/incident-related fails: none (cause `none`, 0% product-bug confidence for all items). Window: Thu 11:54–12:12 VN, `AUTHOR_WRITE_ENABLED=1 … apply --apply`. Re-ran dry-runs before writing: plan.json for all 3 manifests was **byte-identical** to JOB-20261022-09 (no deviation). Stop-at-first-failure: not triggered.

| # | Item | Result | Writes (HTTP) | writes.log | L0 | L1 | L2 | L3 |
|---|---|---|---|---|---|---|---|---|
| 1 | P1B-PROBE | done | 2 (201, 200) | `P1B-PROBE/writes.log` | 0 FAIL | 8/8 | 1/1 | n/a (no `verify.urls`) |
| 2 | TD-586-01-02 | SKIP (job) | 0 | – | lint FAIL (guard) | – | – | – |
| 3 | BUGCHK-190-FORM | done | 6 (all 200) | `BUGCHK-190-FORM/writes.log` | 0 FAIL | 12/12 | 8/8 | 8/8 |
| 4 | TD-654-02-08 | done | 15 (11×201, 4×200) | `TD-654-02-08/writes.log` | 0 FAIL | 86/86 | 19/19 | 9/12 (see below) |

**D11 (P1b):** `agentId: preview` works: qaagent-probe has `preview` Activate @ 04:55:32Z and publish stays null. Replicate via `POST /adobe/sites/cf/fragments/publish` works for both tiers (L2 within seconds). CF create (POST) and PATCH with If-Match also work. `filterReferencesByStatus: []` does **not** publish references: content CF qa654-content-unpub stays unreplicated on both tiers while its DSR CF is published. MOVE was not exercised (no rename in these manifests), so it is still unverified.
**TD-654 L3 3×404, expected by design, not a data error:** `qa654-preview` on .live (DSR CF is preview only, TD-654-04) and `qa654-content-only` on .page and .live (no DSR CF). `verify` has no "expect 404" option yet, so it counts them as FAIL.
**For the test agents (observations only, not judged):** `qa654-inactive` (isActive=false) renders 200 with title "QA654 inactive" on .page/.live ja+en. `qa654-content-unpub` renders 200 with only the generic title "YKK DIGITAL SHOWROOM". BUGCHK-190 L3 checks only 200 + title; whether the form is shown was not checked.
Post-apply re-lint (now patch mode): P1B 21/0/1, 190-FORM 38/0/0, TD-654 230/0/7 (PASS/FAIL/WARN). No npm test run → no root run report. No code changed. No secrets in outputs (grep checked). Per manifest: `apply.md`, `before.json` (pre-write snapshot), `plan.json`, `writes.log`, `apply-result.json`, `verify.md/json`.
This result replaces the QA-PT Night 22/10 tasks for BUGCHK-190-FORM and TD-654-02/04/06/07/08. TD-586-01-02, TD-654-03 (unpublish) and TD-654-05 (sub-folder) stay with QA-PT.
