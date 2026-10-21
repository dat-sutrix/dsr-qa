# JOB-20261021-07 – DSR-529 early post-merge check 658/659/660 (DEV .aem.live, 10:18–10:23Z)
## Merge/incident-related
None. Every fail has cause `none` (the BUG-RULES §4 merges don't touch article pages).
- **Code live?** Yes. article-meta.js, image.js and the listing adapters have last-modified 2026-10-21T09:42:41Z. scripts.js is unchanged (19/10). The qa529-01 page HTML is still from 20/10 (ja 15:38Z, en 12:56Z) and has not been republished.
- **Code:** DSR-ARTICLE-007 now asserts that the shown date matches `^\d{4}\.\d{2}\.\d{2}$` and equals meta publicationdate as YYYY.MM.DD. The existing meta check is kept. tsc: no errors.
- **Run:** 48 tests: 16 pass, 17 fail, 15 skip, 0 flaky. That is the same count as JOB-04, but the reasons changed. Report: results/DSR-529/DEV/automation-run-20261021-job07.md.

| Bug | Proposal | Raw value | suspect | conf. |
|---|---|---|---|---|
| DSR-660 (007) | **Pass** | ja+en show `2026.10.01`, matching meta 2026-10-01 (JOB-04 showed 2026/10/01) | – | – |
| DSR-658 (006) | **Pass** (spec fails) | 2 `span.article-meta-tag` = 2 article:tag metas (JOB-04 had 0). The spec counts 3 because its locator also matches the wrapper `div.article-meta-tags` | test | 10% |
| DSR-659 (011/013) | **Fail (partial)** | Related-card imgs ×3 are absolute publish-p192812 URLs and return 200 (fixed). The thumbnail meta is still relative `/content/dam/…` and returns 404 on .aem.live | product | 60% |
| DSR-657 (002, record only) | still Fail | ja: 1 image block, 640px, img 200. en: 0 image blocks. 0 empty blocks and 0 console errors (JOB-04: 1 empty block, 3× 404). subtitle, articleImage and description are still missing | data | 50% |

- **Why 659 is only 60%:** the thumbnail meta comes from page HTML that was last published before the merge. It may only change after tonight's QA-PT republish, and JOB-20261021-05 will decide.
- **Unchanged vs JOB-04 (data/test):** 012/014 have no category meta, 028 shows the title instead of navtitle, 016 robots, 023 related-items heading, 024 href "#".
- **Suggested fix (not applied, out of job scope):** change the 006 locator to `.article-meta-tag`. Also open: the en page shows the ja label "バイオベース", and one chip reads "do-not-translate" (A5/Q5).
- **Not verified:** Author state, the merge commit identity, Jira. DASHBOARD, BUGS and Jira not edited. The related-card data came from an ad-hoc read-only probe (result.json `probe_raw`).
