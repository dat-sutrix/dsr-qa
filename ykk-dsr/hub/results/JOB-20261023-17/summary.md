# JOB-20261023-17 · claude-code · DSR-566 · DEV · done – independent check of chrome JOB-20261023-16
**Merge/incident-related:** none (every fail has cause = none).

**Verify qa566-news-02 (ja), .aem.live + .aem.page `?cb=1792745432424`, 08:50Z, both HTTP 200, Last-Modified 08:45:32 GMT:**
1. ✅ No empty button frame: `.button-container` / `a.button` / `.button` = 0 in main (and in the whole document). `.image` block = 0. The only `<img>` in main are 2 breadcrumb `arrow.svg`, so no content image.
2. ✅ Title (h2) = `長いタイトル`×16 + `長いタイ`, exact match, 100 chars. Date 2026.10.02, news type お知らせ, body QA566 本文02. Spacers = 2 (spacer-50, spacer-40).
3. ✅ Chrome `after` (step 7) matches on both hosts. **No chrome error → nothing to propose for QA-PT-ERRORS.md "chrome".** One minor process note for chrome: the publish toast was not captured (chrome's own note), so my HTML check is the only proof that the publish worked.

**Spec run** `DSR566_SLUG=qa566-news-02`, ja: 12 tests, 5 pass, 6 fail, 1 skip (008 needs TD-566-03). tsc exit 0. Report: `results/DSR-566/DEV/automation-run-20261023-job17.md`.
| TC | Observed | suspect | conf. |
|---|---|---|---|
| 002 / 006 | Back to list missing (same as news-01 JOB-23-06/08). Order of the present blocks is OK | product | 70% |
| 003 | shown 2026.10.02. No publicationdate meta, so the spec falls back to published-time 2026-10-23. Display source = Article Meta date (JOB-23-08) | test | 10% |
| 007 | Both ja index paths 404. Row is in /query-index.json (publicationdate empty) | test | 30% |
| 010 | no CTA. **TC 10.0 Expected for TD-566-02 is "shows no button"**, so the product is correct; the spec needs a news-02 branch (expect count 0) | test | 0% |
| 012 | `no-mylist no-share` set on the Article Meta option | data | 15% |
None is new versus news-01. Proposal: fix the 010/003 spec for pages with no CTA / no publicationdate (not done – out of job scope).
