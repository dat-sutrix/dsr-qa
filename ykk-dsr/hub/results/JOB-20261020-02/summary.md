# JOB-20261020-02 – DSR-557 video on overlay + DSR-587 TC 1/3/9/13/17/18 (DEV, ja/en, .aem.page + .aem.live, 16:23–16:36Z)
## Merge/incident-related
| Test | Symptom | cause | conf. | Evidence |
|---|---|---|---|---|
| DSR-VOV-013 [en] (13.0), both tiers | `/{ja,en}/library/video/search` is served by the overlay as video-detail `unavailable=not-found`. video-detail.js:238 then redirects to backListUrl() (the same URL), so the page reloads endlessly (56–213 navigations in 3–8 s) and is blank. BL-OVL-1 regex `(?!search$\|tech-talk$)` should exclude this path. Same for ja (curl + probe). | overlay-merge | 85% | evidence/DSR-VOV-013_en.png |
| DSR-VOV-003 ja/en + DSR-MOVIE-029, both tiers | raw `og:image` = `about:error`; `og:image:secure_url` is correct (200). Same on every QA overlay page checked (video + catalog). All of them use thumbnail `image 7.png` (space in the name), so a data cause is not excluded. | overlay-merge | 65% | evidence/DSR-VOV-003_{ja,en}.png, DSR-MOVIE-029_en.png |

- **DSR-557 (CATV-001/002/006):** retargeted to `/{lang}/library/video/qa587-main` (YouTube) and `qa557-dam` (DAM mp4) on both tiers. **16/16 pass**: no autoplay, DAM `<video>` paused, embed `irFRtAVphCY` after click, no player request before interaction.
- **DSR-587 on both tiers:** 1.0 ja/en pass; 18.0 ja/en pass (cn fixme, Issue #18); 3.0 fails on og:image only (title, description and 0 GraphQL requests pass); 13.0 fails (loop above); 9.0 not run (manual Author TC, agent is read-only).
- **First DSR-587 runs:** VOV-001 failed because the spec did not click the YouTube facade (test bug). I added the click (TC step 3) and reran. The tier-label bug in the DSR-557 spec was also fixed. No Expected value was changed.
- **17.0 (DSR-173 Group A on qa587-main):** 034 and the VOV-017 gate pass; 6 fail.
  - 012/027 (suspect test): the DSR-173 fixture still expects the old title "movieTitle".
  - 014 (test): the spec does not click the facade.
  - 026 (test): the spec opens qa587-main, which has no related movies.
  - 029: og:image, see the table above.
  - 033 (data): there is no relatedProducts row in TD-587-01.
  - Proposal: a job to add TD-587-01 values to fixtures/dsr-173.ts and a facade click to MOVIE-014.
- **Data notes:** raw movieId on qa587-main is "QA587 main1", but BL-OVL-1 says ID = node name (likely a QA-PT data error). The fixture movieSourceId `irFRtAVphCY` was taken from the page.
- **Reports:** results/DSR-557/DEV/automation-run-20261021-job20261020-02{,-collect}.md and results/DSR-587/DEV/automation-run-20261021-job20261020-02-{live,page,live-rerun,page-rerun,tc17}.md. tsc: no errors.
