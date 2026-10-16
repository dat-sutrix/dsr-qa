# JOB-20261016-09 – DSR-501-P3 recheck (branch) + DSR-552 HOME steps after root publish (DEV)

**Part A (DSR-501-P3, en): blocked-data.** The branch page has not regenerated after the CF related republish.
- The spec passed (1/1, exit 0, tsc no errors), but this does not prove the cap.
- The branch page HTML still has `last-modified: Fri, 16 Oct 2026 06:43:41 GMT`, which is before 09:20Z.
- The HTML has 5 `relatedMovies` rows (rel1–rel5). The page shows 5 movie cards (rel1–rel5), all dated 2026-10-15.
- Publish GraphQL already returns 6 related movies (rel1–rel6), with `updateDate` null on all of them.
- So the "regeneration is automatic" claim was not observed about 1 h after the republish. Martin needs to re-preview the page or check the trigger.

**Part B (DSR-552 B3): root pages are live; all 8 tests passed.**
- `/master/ja` returned 200 (published 10:26:28Z).
- `/master/en` returned 404 at 10:27:14Z and 200 at about 10:27:50Z (published 10:27:18Z). Since both were 200, the run went ahead.
- 8/8 passed, exit 0, no retries, no fixme triggered (main spec: 002/004/008/017 ja, 008/017 en; DSR-591 spec: 002 ja/en).
- HOME click: both languages return 200 in the same tab.
- 008: no breadcrumb and no JSON-LD on both roots.
- 004 en has no test (the main spec covers ja only). The en HOME href and destination are covered by 017 en and 002 en.
- **B3 can be closed.** The conditional fixme guards can stay as a safety net or be removed in a later job.

Reports: `results/DSR-587/DEV/automation-run-20261016-job09.md`, `results/DSR-552/DEV/automation-run-20261016-job09.md`. There were no failures, so no hub evidence. Pass screenshots refreshed in `evidence/DSR-552/DEV/`.
