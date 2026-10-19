# JOB-20261017-01: DSR-647 retest, DSR-501-P2 + P3 (DEV, en, branch aem.page)

I ran the DSR-587 overlay retest spec twice in chromium. tsc is clean. Final run: P2 failed, P3 skipped (blocked-data), exit 1.
- **P3 → blocked (data), not Fail.** Publish now has 6 relatedMovies with distinct updateDate: rel1 2026-10-01 … rel6 2026-10-06. publishDate is 2026-10-15 for all and isUnavailable is null. But page A's HTML is still `last-modified: Fri, 16 Oct 2026 06:43:41 GMT`: 5 `relatedMovies` rows (rel1–rel5), no rel6, no updateDate field. The cards shown are rel1..rel5.
  The Night Report "Fail (order not rel6..rel2)" comes from this stale preview. Fix: re-preview `/en/library/video/qa501-main-a` on the branch, then rerun.
- **P2 → fail on one criterion; suspect: test.** The DOM part is correct: exactly 1 card (rel1), "video title off" absent from the DOM, 0 GraphQL calls. But the static HTML still contains the movieoff row (`isUnavailable: true`), and the job's Expected says it must be absent from the static HTML.
  BL-OVL-1 says the template writes every row and the block filters on the client. Hiding it server-side is not in the baseline, so this TC may be stricter than the spec. Claude to decide.
- Spec changes: the P3 order assertion is now "updateDate desc", checked against fixture rel6..rel2. P3 also gets two freshness skips: static rows < query rows, and updateDate missing or not distinct. P2 gets the static-HTML assertion. The new P3 order assertion has not run yet because the freshness skip fires first.
- Page B's HTML is also the 16/10 build (06:43:43Z). This does not affect P2.
Screenshots: evidence/DSR-501-P2_en_fullpage.png, evidence/DSR-501-P3_en_fullpage.png. Reports: results/DSR-587/DEV/automation-run-20261019-job17-01.md and results/DSR-587/DEV/automation-run-20261019-job17-01-rerun2.md (final).
