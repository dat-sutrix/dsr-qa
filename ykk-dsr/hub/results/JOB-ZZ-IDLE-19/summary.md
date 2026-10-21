# JOB-ZZ-IDLE-19 – daily DEV regression, all specs (.aem.live, 01:13–01:33Z)
## Merge/incident-related
None this run. Every fail has the same assertion as JOB-20261020-09/10, so cause is `none` (job step 2). The 6 catalog fails that JOB-09 tagged overlay-merge (CATDL-006/018, CATV-017 × ja/en) are still failing. Their targets are still 404 (below), so nothing has cleared.

| Path (checked 01:03Z) | .page | .live |
|---|---|---|
| /{en,ja}/library/video/qa587-main | 404 / 404 | 404 / 404 |
| /ja/library/catalog/qa190-cat-pdf-form · /en/… | 404 · **200** | 404 · 404 |
| /{ja,en}/library/video/search | 200 / 200 | 404 / 404 |

- **What ran:** `npm run test:dev`, 345 tests: 116 pass (1 flaky: CATDL-015 ja), 64 fail, 165 skip. tsc had no errors. Report: results/regression/DEV/automation-run-20261021-idle19.md.
- **Run 1 aborted:** the tooling time limit killed it at about 341/345 (report …-idle19-aborted.md). I reran it detached; that rerun is the result above.
- **DSR-529 mapping:** 002 → DSR-657, 006 → DSR-658, 011 (thumbnail relative /content/dam, 404) → DSR-659, all 90%. 013 passes because the meta is now correct. The related-article card images (also relative and 404) are not asserted by any spec, so I have no test result for them. The others match JOB-10: 007 60%, 010/012/014 70%, 016 data 50%, 023/024 test 50%.
- **Locator fix (step 4):** in pages/ArticleDetailPage.ts, `relatedStories` now targets the `related-articles` block. My first version (`[class*=…]`) also matched the section wrapper `related-articles-container`, which caused a false DSR-ARTICLE-020 [ja] fail. I narrowed it to `.related-articles.block` / `[data-block-name=related-articles]`. The DSR-529 rerun gives 12/19/16, the same as JOB-10, with 020 passing (…-idle19-rerun.md).
- **Unchanged since the previous runs:** news ×6, top ×8, movie ×5, product-list ×10, eco ×2, icons ×2, CATDL-007, VOV-011 ×2 (search .live 404), BREAD-032 firefox (pixel diff) and webkit (missing host libs).
- **Side effect:** the suite rewrites tracked evidence PNGs and old hub result files. I reverted those 53 changes and did not commit them.
- **Not verified:** build identity, Author state (表示フラグ/Draft), Jira status of DSR-657/658/659. I did not edit DASHBOARD, BUGS or Jira.
