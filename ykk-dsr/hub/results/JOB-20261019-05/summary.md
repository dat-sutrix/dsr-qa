# JOB-20261019-05: post-merge overlay regression, DEV main, 2026-10-20
Preflight 01:10Z: `/en/library/video/qa501-main-a` = 200 on main .aem.page and 404 on .aem.live, so tests were not marked blocked-env. `npx tsc --noEmit`: exit 0. Full suite, chromium, run twice: **.aem.live** 110 pass / 55 fail / 168 skip and **.aem.page** 112 / 53 / 168 (333 tests each, exit 1, no flaky). Reports: `results/regression/DEV/automation-run-20261020.md` (live) and `-page.md`.

| Spec | Before (IDLE-07) | After live / page | Class |
|---|---|---|---|
| DSR-529 article-detail (31 tests, ja+en) | skip | 25 fail + 6 pass / same | test (spec rewritten in d55d17e; same as JOB-20261019-02) |
| DSR-557 catalog-video CATV-016/017 ja+en | fail | pass / pass | test (spec fix 8f07f8e). Catalog, not in merge |
| DSR-570 visual CATDL-014 / CATDL-015 | fail / flaky | pass / pass | test (old timeout, cause not verified). Catalog, not in merge |
| DSR-587 overlay-retest 501-P2 [en] | fail | pass / pass | test (spec fix 8f07f8e; still runs on branch host, not main) |
| DSR-587 movie-overlay VOV-011 ja+en | fail | fail / **pass** | merge-expected (video/search now 200 on main .aem.page, 404 on .live) |
| DSR-173 movie-detail (38 tests) | 5 fail, 5 pass, 28 skip | unchanged / unchanged | obsolete-test |

- None of the expected merge breakage shows up, and no change is classed `product`. `/master/en/test-space/dsr-173-video-detail` and `qa501-a` are still 200 on main on both hosts. The qa586-*/qa587-* QA ids were 404 before and after, so DSR-586/587 stay skipped as "not seeded".
- `merge-expected` is used for a fail→pass flip. The job has no class for a merge that fixes a test, so Claude should confirm.
- Product URL, id 46: `/{en,ja}/products/46` = 200 on .aem.page; `/{en,ja}/product/46` = 404; both forms are 404 on .aem.live (not live-published yet).
- Catalog pages (test-space list-catalog / dsr-570) gave the same results on both hosts. CATDL-007 is still failing (product, unchanged).
- Stale targets: overlay-retest (fixtures/dsr-501 `overlayBase`) and the DSR-227 fallback hard-code Martin's branch host. smoke and CATV-001/002/006 also use dsr-173-video-detail (obsolete-test candidates).
- 63 tests are not in the baseline (DSR-227/433/589/590 and DSR-529 visual). Their new fails ECO-002/004 [ja] (data) and ICON-006 ja/en (env, /placeholders.json 404) match those USes' earlier reports; ECO-004 now gets the finder link but the expected P087 URL is empty.
- The first run-1 attempt was killed by the agent's 10-minute shell limit and was rerun in full. Run-rewritten files from other jobs/lanes were reverted and not committed.
- Evidence: 6 live-run failure screenshots (VOV-011, ECO-002/004, ICON-006), 1.2 MB.
