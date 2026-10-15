# JOB-20261015-08 – DSR-591 index-independence check (DSR-552 breadcrumb), DEV, en

**DSR-591: FIXED.** With `/query-index.json` aborted, the trail is still `HOME > test-space > QA Parent > QA Child > QA Grandchild` (5 items, JSON-LD the same).
Page: `/master/en/test-space/dsr552-bc/child/grandchild`, HTTP 200. Breadcrumb build: etag `6459d456…`, last-modified 2026-10-13 05:30:31 GMT. Ad-hoc Playwright script (chromium); no test code changed.
- **N1 (normal):** the filter matched 5 requests. Page doc 200, `scripts/query-index.js` 200, and `/query-index.json` 200, which `breadcrumb.js:194 #fetchTitles` fetched. `nav.plain.html` and `footer.plain.html` were 200 (`fragment.js:25`). No ancestor pages were fetched because all 3 are in the index. No other `.json` was requested.
- **N2 (index aborted):** `/query-index.json` failed with `net::ERR_FAILED`. Then `breadcrumb.js:214 #fetchPageTitle`, called from `:114`, fetched `/master/en/test-space`, `/…/dsr552-bc` and `/…/dsr552-bc/child`. All three returned 200, and the trail was complete.
- **C1 (code):** breadcrumb.js **does** read query-index.json, but only as a shortcut. `#fillAncestors` (l.107-115) takes the paths missing from the index and fetches each ancestor's page URL. The label comes from `navtitle`, else `og:title`, else `<title>`. A 404 (bare folder) is left out. If the index fails, it returns an empty Map (l.195/200), so every ancestor is fetched.
  Imports: `scripts/query-index.js` (returns `/query-index.json`, or the .aem.page index on Author), `aem.js` getMetadata, `dom.js`, `languages.js`. None of the imports fetch data.
Caveat: aborting the index simulates "every ancestor unindexed". It is not the exact real case of one ancestor published but missing from the index. That case follows the same `missing` code path (l.113).
No failures, so no evidence was committed (per hub rule). Screenshots were taken locally only and are not committed.
I ran no npm test suite, so I wrote no `results/DSR-552/DEV/automation-run-*` report and did not run tsc, since no code changed.
