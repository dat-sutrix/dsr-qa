# JOB-20261022-06 – Author P1b prep (DEV, GET only) – status: needs-input "refresh cookie"
Merge/incident-related fails: none (all fails below: cause `none`, confidence 0% – expired session, not a product bug).

**Step 1 – probe checks 1–6** (2026-10-22 ~02:40 UTC, GET only, run inline so probe.sh's own git push was not triggered). **Cookie age: 16h.**
| # | Check | HTTP |
|---|---|---|
| 1 | session user `/libs/granite/security/currentuser.json` | 401 |
| 2 | CSRF token endpoint | 200 (answers anonymously too – not proof of a session) |
| 3 | content CF Assets API `common/ja/movies/qa587-main` | 401 |
| 4 | DSR CF Assets API `dsr/ja/movies/standard/qa587-main` | 401 |
| 5 | DSR CF `jcr:content.json` | 401 |
| 6 | DSR CF `data/master.json` | 401 |

The job says to stop on 401/redirect, so I stopped. **Step 2 did not run:** no lint, no dry-run, and no new manifests were written (P1B-PROBE, TD-586-01-02.resolved, BUGCHK-190-FORM, TD-654-02-08). Building the BUGCHK-190 and TD-654 manifests needs live GETs (CF path lookup, the model's required fields), so they wait for the new cookie too.
No POST/PUT/PATCH/MOVE/DELETE sent. `--apply` and `AUTHOR_WRITE_ENABLED` were not used. No code changes.

**Needed:** a fresh `login-token` in `~/.dsr-secrets/aem-dev.env` (chmod 600), then re-queue. Deadline 11:30 VN.
