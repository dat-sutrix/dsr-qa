# JOB-20261019-01 — summary (DEV, claude-code)

- Applied the QA decisions from 19/10. Only the scope of each assertion changed; the Expected wording did not.
  - **CATV-016/017** (`tests/catalog-video/DSR-557.catalog-video.spec.ts`): `<form>` elements are now counted only on the DSR origin, i.e. the catalog page after the click, plus the popup if it is on the DSR origin. Forms on the external popup (ykkdigitalshowroom.com) are logged as `externalPopupFormsIgnored` and not asserted.
  - **DSR-501-P2** (`tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts`): removed the "absent from static HTML" assertion. The test still checks for 1 card (rel1), `video title off` absent from the DOM, and 0 GraphQL calls. The static-HTML presence is still recorded. P3 was not touched.
- `npx tsc --noEmit`: exit 0, no errors.
- Each changed TC ran twice on DEV with Chromium:
  - CATV-016/017 (ja + en): 4/4 passed in both runs.
  - P2 (en): 1/1 passed in both runs.
  - No retries were used and no tests were flaky.
- Observed in CATV:
  - DSR page forms: 0 before the click and 0 after it.
  - The popup redirects ykkfastening.com → ykkdigitalshowroom.com, where external forms are ignored: ja 1/2, en 1/1.
- Observed in P2: the static HTML still holds the `movieoff` row (`isUnavailable: true`). The block filters it out on the client, as BL-OVL-1 describes.
- Run 1's CATV JSON file was lost because Playwright wipes `test-results/` on each run. Its result comes from the list output. The P2 JSON was kept in /tmp.
- Run reports: `results/DSR-557/DEV/automation-run-20261019-job19-01-run{1,2}.md` and `results/DSR-587/DEV/automation-run-20261019-job19-01-run{1,2}.md`.
- No failures, so no evidence files are committed.
