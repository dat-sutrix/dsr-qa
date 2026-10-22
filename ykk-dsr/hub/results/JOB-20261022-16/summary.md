# JOB-20261022-16 – DSR-664 retest after fix deploy (DEV, en, read-only)

**DSR-664 ready to close (QA confirm DEV – fixed)**

**Merge/incident-related:** none (0 fails).

| TC | Proposed verdict | .live | .page | Observed |
|---|---|---|---|---|
| DSR-VCAP-001 authored video, empty caption | **Pass** | pass | pass | no "null" text node, no `.video-caption` |
| DSR-VCAP-002 booth TOP code-built video (+ DSR-662 c.64873) | **Pass** | skip (404) | pass | no "null" in the block; a scan of the whole page found no "null" text below the video area either |
| DSR-VCAP-003 control video-detail | **Pass** | pass | pass | clean |
| DSR-VCAP-004 control product-detail | **Pass** | skip (404) | pass | clean |

- Run: 8 tests, 6 passed, 0 failed, 2 skipped (404 on .live), exit 0. `tsc` had no errors. No "null" was seen, so the `?cb=` reload was not needed.
- Code served (.live = .page): `blocks/video/video.js` etag `9d598c2aec56299c36ab93b5281d8f42`, last-modified 2026-10-22 09:07:32 GMT, CDN MISS. Lines 80–84 now use `replaceChildren(...[player, caption && …].filter(Boolean))`, so the fix is deployed.
- Caveats: booth TOP and products/46 are verified on .page only (.live returns 404). The ja booth TOP from DSR-662 c.64873 was not checked (job lang = en).
- Run report: `results/DSR-664/DEV/automation-run-20261022-rerun-job16.md`. No evidence was copied here because there were no failures.
