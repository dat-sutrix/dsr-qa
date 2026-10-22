# JOB-20261022-02 – DSR-529 retest, 8 TCs ja+en (DEV .aem.live, 01:04–01:08Z)
## Merge/incident-related
None. Every fail has cause `none`.
- **Run:** 15 tests: 6 pass, 9 fail, 0 skip, 0 flaky. tsc: no errors. Report: results/DSR-529/DEV/automation-run-20261022-job02.md.
- **Freshness:** nothing has been republished since JOB-05. qa529-01 is from ja 15:09:36Z / en 15:10:40Z (21/10). qa529-02 is from 20/10 11:36Z and was **not republished**. The "6 pages 19:44" = r1–r3 ja+en (index 12:44–12:45Z).
- **Locator fixes (test only, no Expected changed):** 4/5/6 are scoped to the article-title section's text/image/text blocks. Body = text outside that section. Tags = leaf `.article-meta-tag`. Related items = `.related-product.block`. 006 now also checks chip count = `article:tag` meta count.

| TC | ja / en | Raw value | suspect | conf. product bug |
|---|---|---|---|---|
| 002 | Pass / Pass | All 10 blocks in design order, 1 image block, 0 empty blocks, 0 console errors | – | – |
| 006 | Pass / Pass | 2 chips [do-not-translate, バイオベース] = 2 `article:tag` metas (en label is Japanese, A5/Q5 open) | – | – |
| 011 | Fail / Fail | Thumbnail still relative `/content/dam/ykk/digital-showroom/test/png/…` → 404 on .aem.live, 200 on the publish host (DSR-659 open) | product | 85% |
| 012 | Fail / Fail | No `category` meta; index `category` = "". searchkeywords OK | data | 50% |
| 014 | Fail / Fail | Only `category` fails (count 0). Every other meta appears once and OGP = authored | data | 50% |
| 016 | Fail / Fail | ja: qa529-02 has no robots meta (stale page). en: qa529-01 robots = "noindex, nofollow" (TD says OFF) | data | 15% |
| 023 | Fail (ja) | qa529-02 shows a related-items block (282 px) + heading. The 4 products are the same as on qa529-01, so the page cannot set 0 results (prereq #3, like 022) | test | 40% |
| 028 | Pass / Pass | Last breadcrumb item = navtitle "QA529 ナビ" / "QA529 Nav", not a link; ancestors link | – | – |

- **Why category is 50%:** navtitle (same UE Page properties dialog) did reach publish, but category did not, on 01 or r1–r3. It is either not authored/saved, or not emitted (DSR-575/Bug-FIELD-like). To reach 80%, QA-PT/Author needs to confirm the field value on qa529-01.
- **Next:** QA-PT republishes qa529-02 (robots ON, 1 tag) and sets en qa529-01 robots OFF, then reruns 016. Check category in Author. Decide 023 against prereq #3. DSR-659 stays open. **Not verified:** Author state, build SHA, Jira (none edited).
