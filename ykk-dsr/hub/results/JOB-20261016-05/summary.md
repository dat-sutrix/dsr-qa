# JOB-20261016-05: DSR-501-P3 rerun (DEV, en, page A)

I ran DSR-501-P3 only from `tests/movie-detail/DSR-587.overlay-retest-DSR-647.spec.ts` (chromium). Playwright: 1 passed, exit 0. tsc is clean.
- The query (unencoded `;path=`) now returns **6** relatedMovies: rel1–rel6 (`video title rel1`…`rel6`). For all six, publishDate is 2026-10-15, updateDate is **null** and isUnavailable is null.
- Page A shows **exactly 5** movie cards: rel1, rel2, rel3, rel4, rel5 (authored order). rel6 is not shown. 0 GraphQL calls in the browser, and the title is in the static HTML.
- **Proposed verdict: blocked (data), not pass.** The branch page's HTML has `last-modified: Fri, 16 Oct 2026 06:43:41 GMT`. That is earlier than the rel6 change: JOB-04 still saw 5 at ~07:01Z. The static HTML has only 5 `relatedMovies` rows, and "rel6" does not appear anywhere in the source.
  So the 5 cards come from an old preview built from 5 inputs. The 5-cap with 6 inputs has **not** been exercised.
- Order rule: **order not verifiable**. updateDate is null for all six and publishDate is identical. The spec's order assertion passed only because a stable sort keeps the authored order.
- Suggested fix: re-preview `/en/library/video/qa501-main-a` on the branch (aem.page) so the HTML is regenerated with 6 rows. Then rerun P3, ideally after QA-PT sets distinct updateDates.
Screenshot: evidence/DSR-501-P3_en_fullpage.png. Report: results/DSR-587/DEV/automation-run-20261016-job05.md
