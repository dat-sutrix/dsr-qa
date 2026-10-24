# DSR-608 DEV automation run — 20261024

## 1. Header

- Run start (UTC): 2026-10-24T10:42:04Z
- Run end (UTC): 2026-10-24T10:42:29Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (BASE_URL, envs/dev.env)
- Target page(s): `/ja/digital-showroom/both`, `/en/digital-showroom/both` (Booth TOP, TD-608-01), `/ja/digital-showroom/both/item`, `/en/digital-showroom/both/item` (ITEM for, TD-608-04) — [Giả định] DSR-661 c.64907 sample page; spec.json A3 path `/{lang}/product/application/fashion/fashion(/item01)` returns 404 on .page and .live (curl 2026-10-24 10:28Z)
- Build under test: not independently verified (no build ID exposed; README §7)
- Baseline ID: DSR-172 BAC 1–6 + technical completion conditions 1–6; adopted dev TC sheet "ブース" (A1–A12, `ykk-dsr/hub/tc-out/DSR-608.spec.json`)
- Automation HEAD commit SHA: `662432a335d5da1702b47cd093b108079a11dbbd` (scaffold files uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/idle47-live2.json npm run test:dev -- tests/booth --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 34 | 0 | 0 | 34 | 0 | 1 | 1 configured; none used | 24 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/booth` (new spec `tests/booth/DSR-608.booth.spec.ts`), project chromium. Default base = `.aem.live`. Flaky outcomes: 0.

## 4. Executed tests

Duration = summed over attempts (retries: 1).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| — | None executed | — | — | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BOOTH-001 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-001 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-001 | Blocked: cn path not on DEV (Issue #18, A11) |
| DSR-BOOTH-002 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-002 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-003 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-003 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-003 | Blocked-data: TD-608-02 /ja/test-space/qa608-booth-1img not created (QA copy page, howto #4) |
| DSR-BOOTH-004 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-004 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-005 | Blocked-data: TD-608-04 /ja/digital-showroom/both/item returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-005 | Blocked-data: TD-608-04 /en/digital-showroom/both/item returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-006 | Blocked-data: TD-608-04 /ja/digital-showroom/both/item returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-006 | Blocked-data: TD-608-04 /en/digital-showroom/both/item returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-006 | Blocked-data: TD-608-03 /ja/test-space/qa608-item-1prod not created (QA copy page, howto #5) |
| DSR-BOOTH-007 | Blocked-data: TD-608-04 /ja/digital-showroom/both/item returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-007 | Blocked-data: TD-608-04 /en/digital-showroom/both/item returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-008 | Blocked-data: TD-608-04 /ja/digital-showroom/both/item returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-008 | Blocked-data: TD-608-04 /en/digital-showroom/both/item returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-009 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-009 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-010 | Manual: Author UI edit + publish on QA copy pages (608-10.0, TD-608-02/03; agents read-only) |
| DSR-BOOTH-011 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-011 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-011 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-011 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-011 | Blocked: cn path not on DEV (Issue #18, A11) |
| DSR-BOOTH-012 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-012 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-013 | Visual: lane codex (Playwright screenshots vs Figma C02 3324-64205/64850, 4545-87679/87815/88315) |
| DSR-BOOTH-014 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-014 | Blocked-data: TD-608-01 /ja/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-014 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |
| DSR-BOOTH-014 | Blocked-data: TD-608-01 /en/digital-showroom/both returns 404 on https://main--dsr-eds-dev--sutrix-projects.aem.live (A3, Q16) |

## 6. Failed tests

None.
Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- All 34 skipped: booth pages are not published — `.aem.live` returns 404 for every TD-608 path; they exist on `.aem.page` (preview) only. Preview run: `automation-run-20261024-preview.md`.
- Earlier run in this job (10:32:23–10:32:41Z, same command before two test fixes): 34 skipped, exit 0 — identical outcome, superseded by this run.
- Scaffold of JOB-ZZ-IDLE-47 step 2. DSR-608 was picked among 560/568/608 as the newest `[tc-night]` commit (a6b897b, 2026-10-15 13:32Z); its booth pages exist on DEV (DSR-661 [Dev] In Testing). 560 (search JSON, waits on 585) and 568 (contact form; submit forbidden) are left for later idle jobs.
- TC mapping: 608-n.0 → `DSR-BOOTH-0nn` (n = 1…14). 608-10.0 = manual (Author), 608-13.0 = visual (lane codex), cn = fixme (Issue #18).
- Selectors are class based (`booth-top`/`bt-*`, `booth-item`/`bi-*`, `booth-pills`, `related-content`); no data-testid on booth blocks yet (`// TODO: data-testid` in `pages/BoothPage.ts`).
- Not covered by data: 002 (TOP pills are `<span>`, not links — no sibling booths), 003 multi-image carousel, 007 multi-product thumbnails, 009 CTA modal (no trigger on the page; `button.bt-zoom` is the image preview toggle, not the modal — content pending YKK, Q18 / CB-10). QA copy pages TD-608-02/03 not created.
- Category name (014) has no per-language oracle (TD-608-01 "existing"): asserted non-empty, text recorded. The ja and en sample both show `SPORTS/OUTDOOR` and a Japanese lead/back label on `/en/` (recorded, not asserted).
- Not in any regression tier yet (`@auto` only, like DSR-503); Claude decides whether to add it to P2.
