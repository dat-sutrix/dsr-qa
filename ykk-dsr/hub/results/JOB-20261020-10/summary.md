# JOB-20261020-10 – DSR-529 full rerun after QA-PT data fix (DEV .aem.live, 16:16–16:23Z)
## Merge/incident-related
None. All 19 fails are cause `none` (article pages are not touched by the overlay/dm_product merge).
- **What ran:** the full spec tests/article-detail/DSR-529.article-detail.spec.ts on chromium, ja+en. 47 tests: 12 pass, 19 fail, 16 skip, 0 flaky. tsc had no errors. Report: results/DSR-529/DEV/automation-run-20261020-job10.md.
- **Freshness OK:** qa529-01 last-modified is 15:38:34Z (ja) and 12:56:13Z (en), both after 12:00Z. qa529-02 ja was not republished (published-time 19/10 15:31Z).
- **Changed vs JOB-09, now pass (data fix worked):** ARTICLE-003 and 029 ja+en (h1 and `<title>` = "QA529 ストーリー詳細テスト" / "QA529 Story detail test"). ARTICLE-013 ja+en (related-stories are now full /master/{lang}/library/article/stories/qa529-r1..r3 paths). → **BUG-1 and BUG-5 are data errors, so close both drafts.**
- **Same fail as JOB-09** (suspect · confidence per 529-decision):

| TC (ja+en) | Raw value | Draft | suspect | conf. |
|---|---|---|---|---|
| 006 | 0 tag chips; 2 `article:tag` metas (do-not-translate, site:product/bio-based) | BUG-3 | product | 90% |
| 011 | thumbnail still relative /content/dam/…png, 404 on .live | BUG-4 | product | 90% |
| 002 | missing subtitle/image/description; ja 1 empty + 1 real image block, en only 1 empty (h=0) | PEND-529-01 | product | 90% |
| 010/012/014 | meta names are publicationdate/updatedate/searchkeywords; no category meta | BUG-2 | product | 70% |
| 007 | shown 2026/10/01; published-date meta absent | BUG-6 | product | 60% |
| 016 | qa529-01 still `noindex, nofollow` after republish; qa529-02 has no robots (not republished) | – | data | 50% |
| 023 (ja) / 024 | qa529-02 related items show 4 products / VIEW ALL + Contact href "#" | – | test | 50% |

- **TD-529-fix "related images not shown" confirmed:** the related-articles block renders 3 correct cards, but their images are relative /content/dam paths that return 404. Same root cause as BUG-4, so add it to that bug. Spec gap: the locator looks for `related-stories`, but the block is `related-articles`.
- **Not verified:** Author state for robots, and Martin's BUG-2 answer (Jira not checked). I made no code changes and did not edit DASHBOARD/BUGS or Jira.
