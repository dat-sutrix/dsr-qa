# JOB-20261021-04 – DSR-529 meta-name update + rerun (DEV .aem.live, 09:12–09:16Z)
## Merge/incident-related
None. Every fail has cause `none`, because article pages are not touched by the merges.
- **Code:** fixtures/dsr-529.ts and the spec now use publicationdate / updatedate / searchkeywords / category (007, 010, 012, 014, 026). `category` is asserted present iff authored (`td01Common.categoryAuthored = true`). 028 is now automated: last breadcrumb item = navtitle, not a link. The `related-articles` locator was already fixed in IDLE-19, and this run confirms it (relatedStories found, 020 pass). tsc: no errors.
- **Run:** 48 tests: 16 pass, 17 fail, 15 skip, 0 flaky. Report: results/DSR-529/DEV/automation-run-20261021-job04.md.
- **Now pass (rename worked):** 010 ja+en (publicationdate 2026-10-01, updatedate 2026-10-10). 007 ja+en also passes, see the warning below.

| TC (ja+en) | Raw value | Ref | suspect | conf. |
|---|---|---|---|---|
| 002 | no subtitle/image/description blocks, empty image block, 3 console 404 | DSR-657 | product | 90% |
| 006 | 0 tag chips | DSR-658 | product | 90% |
| 011 | thumbnail relative /content/dam/… | DSR-659 | product | 90% |
| 012 / 014 | no `category` meta (searchkeywords OK) | – | data | 30% |
| 028 | last item = "QA529 ストーリー詳細テスト" / "QA529 Story detail test" (fallback title), not navtitle | – | data | 30% |
| 016, 023 (ja), 024 | same as JOB-10 | – | data/test | 50% |

- **012/014/028 cause:** qa529-01 was last published 20/10 (ja 15:38Z, en 12:56Z), before Night 21/10 0b, so category and navtitle are not live yet. Rerun after republish.
- **⚠ 007 does not catch DSR-660:** the spec never asserted YYYY.MM.DD. It only records it, and the job said "keep as is". Shown date is 2026/10/01. A format assertion has to be added for 007 to fail on DSR-660. Your call.
- **TC expectations changed (for xlsx re-baseline):** 007 (publicationdate), 010 (publicationdate/updatedate), 012 (searchkeywords; category iff authored), 014 (publicationdate; category iff authored), 026 (index props publicationdate/updatedate/searchkeywords), 028 (navtitle = last item, fallback title; unblocked).
- **Not verified:** Author state (did 0b run?), build identity, Jira status. I did not edit DASHBOARD, BUGS or Jira.
