# JOB-20261015-02 – DSR-591 retest (DSR-552 breadcrumb), DEV, ja/en

**PRE (curl, 2026-10-15T05:53Z):**
- (a) `/master/en/test-space` returns HTTP **404**, `<title>`/og:title "Page not found". The `x-error` header says "content-bus: 404", so the page is still **not published** on DEV. The cache-busting, trailing-slash, `.plain.html` and `/index` variants also return 404.
- (b) query-index.json has 118 rows, and `/master/en/test-space` present = **false**.

**Verdict rule applied:** a≠200, so all en results are `blocked`, suspect `data`. **DSR-591 is not proven fixed and not proven broken.** This is the same blocker as JOB-20261014-01.

Ran 4 TCs × 2 langs, chromium, `tests/breadcrumb/DSR-552.breadcrumb-retest-DSR-591.spec.ts`. The spec now uses data-testid and includes the new BREAD-001. Playwright result: 4 pass (ja), 4 fail (en), 0 flaky.
- ja: 001, 005, 011 PASS. The trail is `HOME > test space > QA Parent > QA Child [> QA Grandchild]`, and all items equal their page titles.
- ja 002 PASS for Child/Parent/test space: hrefs are correct, each returns 200, and each opens in the same tab. HOME `/master/ja` has the correct href but returns 404, so HOME is reported separately as blocked (data).
- en: every TC is missing the test-space level, e.g. 005 shows `HOME > QA Parent > QA Child > QA Grandchild`. The other items are correct: they match page titles, none is empty or a slug, and Child/Parent links return 200 in the same tab. HOME `/master/en` returns 404 (data).

**Why data, not product:** the expected en ancestor is not a published page. A breadcrumb built from published pages will legitimately omit it, so this run cannot distinguish "fixed" from "not fixed".
**Ask:** please re-publish `/master/en/test-space` on DEV (title `test-space`), confirm it returns 200, and keep it out of query-index. Then requeue. The queued JOB-20261015-03 is also a DSR-591 retest and would hit the same 404 if it runs now.
Note: `jobs/hold/` contains a different (codex) job that uses the same ID JOB-20261015-02.
Run report: `results/DSR-552/DEV/automation-run-20261015-job02.md`.
