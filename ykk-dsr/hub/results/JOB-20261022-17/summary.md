# JOB-20261022-17 – DSR-586 overlay negatives (claude-code, DEV .aem.page + .aem.live, ja+en, 01:12–01:16Z 23/10) – status: done
**Merge/incident-related:** none (both fails have cause `none`). No code changed. tsc exit 0. `DSR586_SEEDED=05,06,07,11` (Night 22/10 Pass).
Runs per tier: 005–009/011/014 = 6 pass / 2 fail. 001 = 2/2 pass. result.json has 32 rows: 16 pass, 4 fail (2 TCs × 2 tiers), 12 skip (en rows of ja-only TCs 005–011).

| TC | Proposed | Observed (both tiers) | suspect | cause | conf. bug |
|---|---|---|---|---|---|
| PDO-001 ja/en, 014 ja/en | pass | 200, html lang ok, "QA586 product A" | – | – | – |
| PDO-007 | pass | 990586007 = 404 page+live | – | – | – |
| PDO-008 | pass | raw 200 (no 30x) + noindex + `unavailable\|inactive`; browser final URL /ja/product-list | – | – | – |
| PDO-009 | pass | raw 200 + noindex + single `unavailable\|no-product`; final URL /ja/product-list | – | – | – |
| PDO-011 | pass | 990586011 = 404 page+live, not in query-index | – | – | – |
| PDO-005 | fail | /ja/products/qa586-alpha = 200 + product-detail block (QA586 alpha); in query-index + sitemap | test | none | 25% |
| PDO-006 | fail | /ja/products/990586006 = 404 OK; /ja/products/qa586/990586006 = 200, noindex, `unavailable\|not-found`, browser → /ja/product-list, listed in query-index | product | none | 65% |

**Why:** PDO-005 expects digits-only (old BL regex). BL-OVL-1 Update 21/10 (binding) says URL = DSR CF node name with lowercase/digits/"-" allowed, so DEV follows the newer BL and TC 5.0 looks outdated. Proposal: update TC 5.0 expected. PDO-006: a page document is generated at the subfolder path. Visitors are redirected to the list (QA-PT judged OK), but the BL says "no page" and the path is in query-index. < 80%, so it goes to Dat/Claude to decide.
**Side note:** query-index.json also lists noindex pages 990586008/009 (sitemap excludes them). Not in TC scope.
Evidence: `evidence/DSR-PDO-005_ja_{page,live}.png` (PDO-006 is HTTP-only, no screenshot). Report: `results/DSR-586/DEV/automation-run-20261023-job17.md`. Read-only; no Author access in this job.
