# JOB-20261014-01 – DSR-591 retest (DSR-552 breadcrumb), DEV, ja/en

**PRE-INDEX** (query-index.json, 118 rows, 2026-10-15T05:05Z): `/master/en/test-space` present: **false**; `/master/en/test-space/dsr552-label` present: **true**. The ancestor is still not indexed, so the en result is a valid test of the fix.
**Verdict on DSR-591: NOT proven fixed.** DSR-BREAD-005 en fails: EN trail is still `HOME > QA Parent > QA Child > QA Grandchild` (4 items, test-space level missing). It is the same as on 2026-10-12.

Ran 3 TCs × 2 langs on DEV, Chromium, new spec `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts`. Selectors are `nav[aria-label]` + role, as the job specified. Result: 2 pass, 4 fail (no flaky).
- 005 ja PASS (`HOME > test space > QA Parent > QA Child > QA Grandchild`). 011 ja PASS (all items = page titles).
- 005 en FAIL: test-space item missing. 011 en FAIL for the same reason; the 4 items shown match page titles and none is empty or a node name.
- 002 ja FAIL only on HOME: `/master/ja` returns HTTP 404. Child/Parent/test space hrefs are correct, all return 200, and all open in the same tab.
- 002 en FAIL: test-space link missing, and HOME `/master/en` returns 404. Child/Parent are OK.

**Why I mark suspect = data, not product:** `/master/en/test-space` returns **HTTP 404** on publish (and `/`, `/index` variants too). So the en ancestor is not a published page. If the fix follows "published pages in the URL hierarchy", omitting it is arguably correct. The en expectation then needs that page published first. Until it is published, this retest cannot tell "fixed" apart from "not fixed". Suggest: publish `/master/en/test-space` (title `test-space`) on DEV, keep it out of the index, then requeue.
HOME 404 on `/master/ja` and `/master/en` is the same data gap as on 2026-10-12. The breadcrumb hrefs themselves are correct.

Test-side note: run 1 read the list before the block finished inserting ancestors, which gave bad 002/011 data. I added a wait for the trail to settle. Run 2 is authoritative. Both run reports are in `results/DSR-552/DEV/automation-run-20261015-dsr591*.md`.
Note: `data-testid`s are actually present in the DOM, although the job says they are not. Retest used role selectors anyway.
