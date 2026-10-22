# JOB-20261022-04 – DSR-590 eco demo pages, DEV, ja (layout only)

**Merge/incident-related:** none (both fails cause = `none`).

| TC | live | page | suspect | cause | confidence | Why |
|---|---|---|---|---|---|---|
| ECO-005 detail hero | fail | fail | product | none | 50% | Hero has icon + h1 + summary + cert, no tag label element. Need Figma 3351-51595 to confirm a tag is designed. |
| ECO-006 free area | fail | fail | data | none | 30% | Order on demo page: hero → listing (4 cards) → text note. Nothing between hero and listing (author-controlled). The test's list locator also misses `.listing-product-index`, so that part is a test gap. |

- Ran `DSR-590.eco-products.spec.ts` [ja] on .aem.live and .aem.page with identical results: 4 pass (001, 003, 012, 013), 2 fail, 5 skip. 002/004/007/009/010 were skipped as "demo data (Ngọc 21/10)" per the job.
- Code: added the C15 demo path (`detailDemoPath`) as the first detail candidate, added demo-data skips, and added 2 s timeouts on reads of missing elements. In the first live run 005/006 hung until the 30 s timeout. That report is kept as `automation-run-20261022.md`.
- Captures: PC 1440 and SP 390 full-page PNGs of both pages on both hosts are in `evidence/DSR-590/20261022/`. None of them overflows horizontally.
- For the L&F card (not asserted): on TOP SP the 9th dot is partly under the next arrow. All 9 TOP cards have the same name. The detail page has a stray "a" paragraph under the summary (demo data).
- Run reports are in `results/DSR-590/DEV/automation-run-20261022{,-rerun-live,-page,-capture}.md`. Failed screenshots are in `evidence/` here.
