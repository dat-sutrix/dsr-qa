# JOB-ZZ-IDLE-39 – daily DEV regression 23/10 (run 01:21–01:42Z, .aem.live) vs JOB-ZZ-IDLE-35 (22/10)
**Merge/incident-related:** none. Both new fails have cause `none`.
- **What ran:** `npm run test:dev`, all projects. 545 tests: **294 pass, 57 fail, 194 skip**, 0 flaky, exit 1. tsc had no errors. Report: results/regression/DEV/automation-run-20261023-idle39.md (one report covering all USes, per-spec totals in §3). IDLE-35 had 541 tests (281 pass, 63 fail, 197 skip).
- **Per spec changes (others unchanged):** DSR-586 product-detail 16 pass (was 0, 22 skip → 6) · DSR-227 asset +1 pass · DSR-654 catalog-overlay 39/16/7 (was 40/15/7) · DSR-566 news-detail 0/0/24 (was 3/8/11) · DSR-566 visual-capture new 0/1/1.

| New fail | Was | Failing assertion | Raw actual | cause | suspect | conf. bug | Evidence |
|---|---|---|---|---|---|---|---|
| DSR-CATOV-010 en | pass | DSR-654.catalog-overlay.spec.ts:357 `qa654-folder/qa654-sub` expect 404 | `Received: 200`. Body: catalog-detail `source\|overlay`, `unavailable\|not-found`, robots noindex, Last-Modified 22/10 14:37:47Z. Browser redirects to /en/library/catalog. Flat path is still 404 on .page/.live | none | product | 50% | evidence/DSR-CATOV-010_en.png |
| DSR-NEWS-014 ja | absent (new capture spec) | DSR-566.visual-capture.spec.ts:23 `page.evaluate` | `Test timeout of 30000ms exceeded`. Page 200, title present. `img.decode()` never resolves for 3 hidden lazy header images | none | test | 0% | evidence/DSR-NEWS-014_ja.png |

- **Newly passing:** PDO-001/003/013/014 ja+en and PDO-004/005/008/009/012/017/019/021 ja (TD-586-01 no longer `unavailable | no-product`); ASSET-016 en.
- **Now skip (were fail/pass):** all 12 DSR-NEWS en tests, 8 of which were fails. JOB-ZZ-IDLE-37 changed the en target to `/master/en/test-space/test-news-detail-template`, which is HTTP 404. So these are not evaluated now, and that does not mean they are fixed. NEWS-015 ja did not run (serial after NEWS-014).
- **Still failing (55):** the same set as IDLE-35 minus the NEWS en fails: ARTICLE-012/014/016/024 ja+en, 023 ja · BREAD-032 firefox/webkit · CATDL-007 ja, 016 en · CATOV-001 -form ×4, 002/021 non-form ×8, 012 ja/en, 009 en · ECO-005/006 ja · ICON-006 ja/en · MOVIE-014 en, 026, 033, 501-P2/P3 · PLSP-002/003/005 ja/en · PRODLIST-001..004 ja · TOP-004..007 ja/en.
- **Caveats:** cause and % are my inference from raw HTML, headers and a browser probe. I did not check Author, Jira or the deploy log. CATOV-010 could also be data (a QA-PT republish of TD-654-05 on 22/10), which is not verified. Capture specs rewrote 58 tracked files, including codex's JOB-20261016-11 folder. I restored them, and I moved 16 new untracked files to /tmp/idle39/side-effects (not committed). DASHBOARD/BUGS were not edited (agent lane).
