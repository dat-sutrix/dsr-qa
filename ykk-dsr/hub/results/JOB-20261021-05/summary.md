# JOB-20261021-05 – DSR-529 retest DSR-657/658/659/660 (DEV .aem.live, 16:57–17:02Z)
## Merge/incident-related
None. Every fail has cause `none`.
- **Freshness:** the qa529-01 pages were republished after the merge (ja 15:09:36Z, en 15:10:40Z, code 09:42:41Z), so this retest is valid. qa529-02 was not republished (20/10).
- **Run:** 48 tests: 18 pass, 15 fail, 15 skip, 0 flaky. tsc: no errors. Report: results/DSR-529/DEV/automation-run-20261021-job05.md.

| Bug (TC) | Proposal | Raw value (ja + en) | conf. product bug |
|---|---|---|---|
| DSR-657 (002) | **Pass** | 1 image block, img `media_1b1b7cd0….png` 200 (1200 px), 0 empty blocks, 0 console errors, 0 HTTP ≥ 400. Spec 002 still fails, but only on stale subtitle/articleImage/description locators (test) | – |
| DSR-658 (006) | **Pass** | Two `article:tag` metas (`do-not-translate`, `site:product/bio-based`) produce 2 chips: "do-not-translate", "バイオベース" (labels). Spec 006 counts 3 because its locator also matches the wrapper (test) | – |
| DSR-659 (011 + related) | **Fail (partial)** | Related imgs ×3: absolute `publish-p192812…/content/dam/…`, all 200 (fixed). The thumbnail meta is still relative `/content/dam/ykk/digital-showroom/test/png/…` (ja gradient-transparent-1920x1080, en highres-photo-4000x3000). That is 404 on .aem.live and 200 on the publish host | 85% |
| DSR-660 (007) | **Pass** | Shown `2026.10.01` = meta publicationdate 2026-10-01T00:00:00.000Z | – |

- **Stories index:** only `/query-index.json` returns 200; all the stories-specific index paths return 404. In the qa529-01 row, ja+en `tags` = [do-not-translate, site:product/bio-based] (non-empty) and **`category` = "" (empty)**. 012/014 also fail on the missing category meta, so either the category field was not authored/published or it is not emitted (data 40%).
- **Other fails (not the 4 bugs):** 016 has en qa529-01 robots "noindex, nofollow" and ja qa529-02 robots "" (data). 023 shows a related-items heading on qa529-02 (data/test). 024 hrefs are "#" (test, A8/Q8).
- **Next:** 657/658/660 can get "QA confirm DEV – fixed" and the transitions. 659 stays open with a comment that the thumbnail meta is still relative. Locator fixes for 002/006 are suggested but were not applied, since this was a run-only job.
- **Not verified:** Author state (category, robots), merge commit, Jira. DASHBOARD, BUGS and Jira were not edited.
