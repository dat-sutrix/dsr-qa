**PRE-INDEX class: B** – `/master/en/test-space` returns HTTP 200 (title `test-space`), but it is now **present** in `/query-index.json` (119 rows). Checked at 2026-10-15T06:19:30Z.

# JOB-20261015-06 – DSR-591 retest (DSR-552 breadcrumb), DEV, ja/en

The publish reached `.aem.live` (last-modified 06:09:39 GMT), and it also added the page to the query-index. The breadcrumb therefore gets the same result with or without the fix.
**DSR-591: fix NOT provable.** All en tests pass, but they are marked `suspect: data` as the job requires for class B.

8 tests ran on chromium (005 and 011 from the retest spec, 001 and 025 from the main spec, ja + en). **All 8 pass on the first attempt, with no retries and no flakes.**
- 005: ja `HOME > test space > QA Parent > QA Child > QA Grandchild`; en `HOME > test-space > QA Parent > QA Child > QA Grandchild` (5 items each).
- 011: every item equals its page title, and every ancestor returns 200. No item is empty and none is a node name (ja + en).
- 001: the en child trail includes `test-space`. The en JSON-LD BreadcrumbList has `test-space` at position 2, with item `/master/en/test-space`.
- 025: the JSON-LD has 5 entries, and its names equal the visible trail. Item URLs are absolute, and the last entry has no item (ja + en).

Code change: the main spec's `open()` now uses the same trail-settle wait as the retest spec (networkidle, then item count stable), as the job asked for 025. With that wait, 025 was stable this run; JOB-03 was flaky on it.
HOME `/master/ja` and `/master/en` return 404. This is a known data gap and is noted only.
**Ask:** to prove DSR-591 we need a **published** ancestor that is **absent** from `query-index.json`. Examples: an ancestor excluded by the index config or by `robots: noindex`, or one removed from the index without unpublishing it. Please define that with dev and requeue.
Side note: the `Bug-INDEX` annotation on en 001/005/025 in the main spec is now stale, because en test-space is indexed. I left it unchanged.
The main spec overwrote committed evidence under `evidence/DSR-552/DEV/`, and I reverted it. Run report: `results/DSR-552/DEV/automation-run-20261015-job06.md`.
