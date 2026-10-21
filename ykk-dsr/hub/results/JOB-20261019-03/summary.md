# JOB-20261019-03 – DSR-647 retest on main (DSR-587) – done

Merge/incident-related fails: none.

Ran `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` on DEV main (.aem.page) after the retarget: 2/2 pass, 0 retries, tsc 0.

| TC | Page | Result | Observed |
|---|---|---|---|
| DSR-501-P3 [en] | /en/library/video/qa587-rel-a | pass | 5 cards QA587 related 6→2, r1 absent; query 6 related (updateDate 10-01…10-06), static 6 rows, no browser GraphQL |
| DSR-501-P2 [en] | /en/library/video/qa587-rel-b | pass | exactly 1 card (QA587 related 1); "QA587 off" not in DOM; no browser GraphQL |

- DSR-647 order rule (newest updateDate first, max 5) and isUnavailable hiding hold on main → bug DSR-647 looks fixed on DEV (proposal; Claude decides closing).
- Fixtures: qa501-* replaced by qa587-rel-a/rel-b on main (`fixtures/dsr-501.ts` mainBase/mainPageA/mainPageB); freshness skip kept.
- [Giả định] freshness threshold = Night 21/10 start 2026-10-21T11:00Z (report 23:15 VN is written after publishing). Pages last-modified 13:30 / 13:42 UTC.
- ja not run: TD-587-14/15 en-only. DSR-BREAD-014 in Context is not in `tcs:` → not run.
- Data note: qa587-r1 movieTitle has a trailing space ("QA587 related 1 "); spec trims. Not a bug.
- No evidence committed (no fails). Run report: results/DSR-587/DEV/automation-run-20261021-job19-03.md.
