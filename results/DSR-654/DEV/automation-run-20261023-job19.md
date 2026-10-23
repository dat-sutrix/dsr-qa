# DSR-654 DEV automation run — 20261023-job19

Job: `ykk-dsr/hub/jobs/running/JOB-20261022-19.md` (run-only, en, DSR-CATOV-006 + DSR-CATOV-010). Proposed outcomes only; human QA confirms.

## 1. Header

- Run start (UTC): 2026-10-23T01:17:59Z (run 1); run 2 directly after
- Run end (UTC): 2026-10-23T01:18:09Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (tiers checked by the spec: .aem.page + .aem.live)
- Target page(s): `/en/library/catalog/qa654-removed`, `/en/library/catalog/qa654-sub`, `/en/library/catalog/qa654-folder/qa654-sub`, `/query-index.json`
- Build under test: not independently verified (EDS main branch at run time)
- Baseline ID: BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`, incl. Update 2026-10-19/21); TC source `ykk-dsr/hub/tc-out/DSR-654.spec.json` (TC 6.0, 10.0)
- Automation HEAD commit SHA: 68fd6a44ba15de6a1d231abbc020a1c6deabf34e
- Exact command used (run 1 also wrote the JSON reporter output; run 2 list only, same result):

```sh
ENV=dev npx playwright test tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts -g "DSR-CATOV-006 \[en\]|DSR-CATOV-010" --reporter=list,json
ENV=dev npx playwright test tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts -g "DSR-CATOV-006 \[en\]|DSR-CATOV-010" --reporter=list
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 1 | 1 | 0 | 1 | 1 | config 1; 1 used (CATOV-010) | 4.3 s (run 1); run 2 3.2 s |

Both runs gave the same result. Scope: subset (2 tests), chromium. Flaky: 0.

## 4. Executed tests

Duration per attempt (run 1).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATOV-006 | DSR-CATOV-006 [en] unpublished DSR CF → 404 on both hosts, removed from query-index | passed | 1.1 s | — |
| DSR-CATOV-010 | DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict) | failed (2 attempts) | 131 ms / 214 ms | `/en/library/catalog/qa654-folder/qa654-sub` HTTP 200, expected 404 |

Raw observations (attachment `observed`):
- 006: .aem.page `/en/library/catalog/qa654-removed` 404 · .aem.live 404 · `.aem.live/query-index.json` 200, no row ending `/catalog/qa654-removed`.
- 010: .aem.page `/en/library/catalog/qa654-sub` 404 · .aem.live 404 · .aem.live `/en/library/catalog/qa654-folder/qa654-sub` **200**.

## 5. Skipped tests

None.

## 6. Failed tests

### DSR-CATOV-010 — DSR-CATOV-010 [en] DSR CF in a subfolder → no page (directory-strict)

- Failing assertion: `expect.soft(status(.../en/library/catalog/qa654-folder/qa654-sub)).toBe(404)` — `tests/catalog-overlay/DSR-654.catalog-overlay.spec.ts:357`
- Expected: HTTP 404 (TC 10.0 "All return HTTP 404"; BL-OVL-1 "Other folder or subfolder → no page").
- Actual: HTTP 200, no redirect header. Extra curl check after the run (01:19Z): the same URL is also 200 on .aem.page. Static HTML: title "YKK DIGITAL SHOWROOM", `robots=noindex`, `<main>` = `catalog-detail` block with rows `source: overlay` and `unavailable: not-found`. In a browser the client then sends the visitor to `/en/library/catalog` (list) on both tiers. Control: `/en/library/catalog/zz-nofolder/qa654-update` → 404, so the 200 is specific to the existing subfolder DSR CF.
- Attempt(s): initial fail, retry fail; run 2 same.
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-19/evidence/DSR-CATOV-010_en_live.png`, `..._page.png` (screenshot after the client redirect, list page; committed). Trace: `test-results/catalog-overlay-DSR-654.ca-50d7b-→-no-page-directory-strict--chromium*/trace.zip`.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Preflight data proof taken from the job's "Released 23/10 07:50" note quoting the Night Report 22/10 (TD-654-03 Pass: before unpublish opened the PDF, after 404; TD-654-05 Pass). The Night Report sheet itself was not read by the agent (no Drive access on VPS).
- CATOV-010: the overlay generates a page for a DSR CF in a subfolder (200 + noindex + "unavailable: not-found" + client redirect to list) instead of no page. Proposed: product, ~70% (agent + QA-PT Night Report agree on the behaviour; BL-OVL-1 says "no page", but the dev might treat a not-found overlay with list redirect as acceptable). For Claude to decide.
- Spec gap: CATOV-010 checks the folder URL only on BASE_URL (.aem.live); the TC asks both tiers. The .aem.page 200 was found by a manual curl, not by the spec.
- CATOV-006 query-index checked on .aem.live only (BASE_URL), as written in the spec.
- SHADOW-TD-654 vs JOB-20261022-07: qa654-preview .page → catalog list (shadow) while JOB-07 L3 recorded .page 200 + title. Not a contradiction in HTTP terms (JOB-10 saw `unavailable: not-found`, which redirects to the list), noted only; TC expectations unchanged.
