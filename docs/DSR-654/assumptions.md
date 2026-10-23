# DSR-654 catalog overlay – changed expectations and assumptions

TC sheet: `ykk-dsr/hub/tc-out/DSR-654.spec.json` (TC N.0 = DSR-CATOV-00N). Baseline BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`) + DSR-570/557/655.
Spec: `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts`, fixtures `fixtures/dsr-654.ts`.

## Changed Expected (JOB-20261022-14, 2026-10-22)

| TC | Old Expected (spec) | New Expected | Source |
|---|---|---|---|
| DSR-CATOV-001 (qa190-cat-pdf, qa190-cat-ebook; requiresForm OFF) | HTTP 200, no redirect, detail page renders the catalog name | HTTP 200 on the overlay URL, then the browser is sent to the file: PDF = `pdfAsset` row path, e-book = `ebookUrl` row. No rendered detail page. The `-form` cases are unchanged: detail page, name and form. | IDLE-32 / `catalog-detail.js:165-169` (non-form → `location.replace(file)`, by design) |
| DSR-CATOV-015 | Detail page shows a download button whose href is a `.pdf` (200, application/pdf); no form | The detail URL redirects to the PDF (the navigation target path equals the `pdfAsset` row). The PDF returns 200 with application/pdf. No form. | IDLE-32 / `catalog-detail.js:165-169` |
| DSR-CATOV-017 | Detail page shows a view button: href = ebookUrl, target _blank; no form | The detail URL redirects in the same tab to `ebookUrl` (TD-654-01 `https://www.ykkfastening.com/`). Proven by the first navigation after the detail URL. No rendered detail page. | IDLE-32 / `catalog-detail.js:165-169` |
| DSR-CATOV-019 (td.pdf) | Rendered detail shows image, name, description, date YYYY.MM.DD, type label | The detail URL redirects to the PDF. The rendered-detail checks no longer apply to a non-form catalog. | IDLE-32 / `catalog-detail.js:165-169` |
| DSR-CATOV-002 | `<title>` = TD-190 title + suffix; row catalogTitle = TD-190 title | `<title>` = live content CF title (the `catalogTitle` row of the static HTML, i.e. the DEV sample such as "catalog pdf") + suffix. A difference from TD-190 is annotated `data`. **Target stays the TD-190 value** (`fixtures/dsr-654.ts` `td.*.title`, e.g. "QA190 PDF catalog") until the content CFs carry it. | JOB-20261022-14 rule 4; JOB-20261022-10 finding (content CF titles are dev samples) |

## Assumptions

- [Giả định] Headless Chromium turns the inline PDF navigation into a download (`net::ERR_ABORTED`, IDLE-32). For a PDF, the redirect is proven by the main-frame navigation request (and the download URL, if one fires), not by `page.url()`.
- [Giả định] "Final URL = file" is judged on the first main-frame navigation after the detail URL (the client's `location.replace` target). Later hops belong to the file host. Observed on DEV 2026-10-22: www.ykkfastening.com → `https://ykkdigitalshowroom.com/?utm_source=ykkfastening…` → `/en/`. These hops are recorded, not asserted. This follows the rule DSR-570 CATDL-018 used before 2026-10-22.
- [Giả định] The expected PDF is the `pdfAsset` row (DAM path) of the static overlay HTML. The redirect host (publish domain) is not asserted, only the path.
- CATOV-001 for the `-form` ids still expects the TD-190 title. Rule 4 of the job names only CATOV-002, so a dev-sample title fails there as `data`.
- CATOV-012 (card → overlay page for `td.pdf`) and CATOV-018 (e-book + requiresForm, DSR-655 Y3) were not in the job scope and are unchanged.

## Expected changed (JOB-20261023-10, 2026-10-23) – supersedes the JOB-20261023-07 "Pending" section

| TC | New Expected | Source |
|---|---|---|
| DSR-CATOV-002 (requiresForm = false) | `meta robots` contains `noindex` (non-form page redirects to the file) | Dat 23/10: BUG-CAT-NOINDEX = by design |
| DSR-CATOV-021 (requiresForm = false) | NOT listed in query-index and NOT in sitemap | Dat 23/10: BUG-CAT-NOINDEX = by design |
| DSR-CATOV-002/021 (requiresForm = true) | unchanged: no `noindex`, listed once in query-index and sitemap | – |
| DSR-CATOV-010 | flat `/en/library/catalog/qa654-sub` → 404 on .aem.page and .aem.live; sub-folder `/en/library/catalog/qa654-folder/qa654-sub` → HTTP 200 not-found stub (`source: overlay`, `unavailable: not-found`, robots noindex, no `catalogTitle`), browser final URL = `/en/library/catalog` | Martin 23/10: CF creation is directory-strict, overlay answers only 200 or 404; a 200 with a wrong directory is blank → redirect to list |

- requiresForm is read from the `requiresForm` row of the static overlay HTML (content CF), not hard-coded per id. [Giả định] json2html omits the row when the flag is false (observed 23/10: non-form ids have no row, `-form` ids have `true`), so a missing row = false. CATOV-002 still cross-checks it against `fixtures/dsr-654.ts`.
- Observed 23/10 (JOB-10): non-form pages are excluded from sitemap.xml but still listed in query-index.json with column `robots: noindex` → CATOV-021 non-form fails on query-index only; reported as suspect `test` for Claude to decide.
