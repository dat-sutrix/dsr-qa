# JOB-20261016-04: DSR-647 retest on overlay branch (DEV, en)

I ran DSR-501-P3/P2 against the branch preview pages qa501-main-a and qa501-main-b with a new spec, `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`. Result: P2 pass, P3 blocked-data. tsc is clean and the exit code was 0.
DSR-647 looks fixed: both pages now render the related area with movie cards. The browser makes no GraphQL calls, and the title is in the static HTML.
- P3 (page A): the publish query returns only 5 relatedMovies (rel1-rel5), and 5 cards are shown. The ≤ 5 check passes. The 5-cap with 6 inputs could not be tested because rel6 is not in the publish response (blocked-data).
- Order rule cannot be checked: every related movie has updateDate null and publishDate 2026-10-15. The shown order rel1→rel5 equals the authored order.
- P2 (page B): the query returns rel1 plus movieoff (isUnavailable true). Only `video title rel1` is shown, and `video title off` is not in the rendered DOM.
  Note: the raw HTML still includes a block row with `video title off` / `isUnavailable: true`. The block filters it out on the client. Your call on whether the source must omit it.
- Query URL: the %2F-encoded form in the job returns empty `related.items` for both ids. The unencoded `;path=/content/...` form returns data.
Suggested data fix: add a 6th related movie with a distinct updateDate to qa501-main-a, publish it, then re-run P3.
Report: results/DSR-587/DEV/automation-run-20261016.md
