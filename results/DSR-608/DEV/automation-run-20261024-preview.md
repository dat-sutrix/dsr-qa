# DSR-608 DEV automation run — 20261024-preview

## 1. Header

- Run start (UTC): 2026-10-24T10:42:57Z
- Run end (UTC): 2026-10-24T10:46:39Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.page (preview; override `DSR608_BASE`)
- Target page(s): `/ja/digital-showroom/both`, `/en/digital-showroom/both` (Booth TOP, TD-608-01), `/ja/digital-showroom/both/item`, `/en/digital-showroom/both/item` (ITEM for, TD-608-04) — [Giả định] DSR-661 c.64907 sample page; spec.json A3 path `/{lang}/product/application/fashion/fashion(/item01)` returns 404 on .page and .live (curl 2026-10-24 10:28Z)
- Build under test: not independently verified (no build ID exposed; README §7)
- Baseline ID: DSR-172 BAC 1–6 + technical completion conditions 1–6; adopted dev TC sheet "ブース" (A1–A12, `ykk-dsr/hub/tc-out/DSR-608.spec.json`)
- Automation HEAD commit SHA: `662432a335d5da1702b47cd093b108079a11dbbd` (scaffold files uncommitted at run time; committed with this report)
- Exact command used:

```sh
DSR608_BASE=https://main--dsr-eds-dev--sutrix-projects.aem.page PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/idle47/page3.json npm run test:dev -- tests/booth --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 34 | 13 | 9 | 12 | 1 | 1 | 1 configured; every failed test retried once and failed again | 220 s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/booth` (new spec `tests/booth/DSR-608.booth.spec.ts`), project chromium. Base overridden to `.aem.page` because the pages are not on `.live`. Flaky outcomes: 0.

## 4. Executed tests

Duration = summed over attempts (retries: 1).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BOOTH-001 | DSR-BOOTH-001 [ja] Products and ITEM for buttons navigate to their pages | fail | 27.2 s (2 attempts) | Error: Products target language prefix |
| DSR-BOOTH-001 | DSR-BOOTH-001 [en] Products and ITEM for buttons navigate to their pages | pass | 10.9 s (1 attempt) | — |
| DSR-BOOTH-003 | DSR-BOOTH-003 [ja] main visual: 1 image static, ≥ 2 images carousel | pass | 6.0 s (1 attempt) | — |
| DSR-BOOTH-003 | DSR-BOOTH-003 [en] main visual: 1 image static, ≥ 2 images carousel | pass | 6.6 s (1 attempt) | — |
| DSR-BOOTH-004 | DSR-BOOTH-004 [ja] exactly 1 related YouTube video embeds and loads | pass | 2.7 s (1 attempt) | — |
| DSR-BOOTH-004 | DSR-BOOTH-004 [en] exactly 1 related YouTube video embeds and loads | pass | 2.8 s (1 attempt) | — |
| DSR-BOOTH-005 | DSR-BOOTH-005 [ja] ITEM for back link returns to Booth TOP; pills switch ITEM for | fail | 9.7 s (2 attempts) | Error: pill /content/sites is a site path with language prefix |
| DSR-BOOTH-005 | DSR-BOOTH-005 [en] ITEM for back link returns to Booth TOP; pills switch ITEM for | fail | 10.1 s (2 attempts) | Error: pill /content/sites is a site path with language prefix |
| DSR-BOOTH-006 | DSR-BOOTH-006 [ja] single product: no thumbnails, image + name + text + CTA shown | pass | 3.9 s (1 attempt) | — |
| DSR-BOOTH-006 | DSR-BOOTH-006 [en] single product: no thumbnails, image + name + text + CTA shown | pass | 3.1 s (1 attempt) | — |
| DSR-BOOTH-008 | DSR-BOOTH-008 [ja] related contents auto-fetched (same language) or block hidden | pass | 3.3 s (1 attempt) | — |
| DSR-BOOTH-008 | DSR-BOOTH-008 [en] related contents auto-fetched (same language) or block hidden | pass | 3.2 s (1 attempt) | — |
| DSR-BOOTH-011 | DSR-BOOTH-011 [ja] PC Booth TOP + ITEM for render in the right language without horizontal scroll | fail | 12.7 s (2 attempts) | Error: language-specific link |
| DSR-BOOTH-011 | DSR-BOOTH-011 [ja] SP Booth TOP + ITEM for render in the right language without horizontal scroll | fail | 11.9 s (2 attempts) | Error: language-specific link |
| DSR-BOOTH-011 | DSR-BOOTH-011 [en] PC Booth TOP + ITEM for render in the right language without horizontal scroll | fail | 10.6 s (2 attempts) | Error: language-specific link |
| DSR-BOOTH-011 | DSR-BOOTH-011 [en] SP Booth TOP + ITEM for render in the right language without horizontal scroll | fail | 10.5 s (2 attempts) | Error: language-specific link |
| DSR-BOOTH-012 | DSR-BOOTH-012 [ja] interactive elements are keyboard reachable and Enter opens ITEM for | pass | 5.2 s (1 attempt) | — |
| DSR-BOOTH-012 | DSR-BOOTH-012 [en] interactive elements are keyboard reachable and Enter opens ITEM for | pass | 4.8 s (1 attempt) | — |
| DSR-BOOTH-014 | DSR-BOOTH-014 [ja] PC Booth TOP background image (200, width > 0) and category name | pass | 2.1 s (1 attempt) | — |
| DSR-BOOTH-014 | DSR-BOOTH-014 [ja] SP Booth TOP background image (200, width > 0) and category name | fail | 4.5 s (2 attempts) | Error: background rendered width |
| DSR-BOOTH-014 | DSR-BOOTH-014 [en] PC Booth TOP background image (200, width > 0) and category name | pass | 2.4 s (1 attempt) | — |
| DSR-BOOTH-014 | DSR-BOOTH-014 [en] SP Booth TOP background image (200, width > 0) and category name | fail | 4.0 s (2 attempts) | Error: background rendered width |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BOOTH-001 | Blocked: cn path not on DEV (Issue #18, A11) |
| DSR-BOOTH-002 | Blocked-data: no sibling booth pill links on /ja/digital-showroom/both (4 pills, none linked; TD-608-01 needs ≥ 2 sibling booths) |
| DSR-BOOTH-002 | Blocked-data: no sibling booth pill links on /en/digital-showroom/both (4 pills, none linked; TD-608-01 needs ≥ 2 sibling booths) |
| DSR-BOOTH-003 | Blocked-data: TD-608-02 /ja/test-space/qa608-booth-1img not created (QA copy page, howto #4) |
| DSR-BOOTH-006 | Blocked-data: TD-608-03 /ja/test-space/qa608-item-1prod not created (QA copy page, howto #5) |
| DSR-BOOTH-007 | Blocked-data: /ja/digital-showroom/both/item has 1 product (TD-608-04 needs ≥ 2) |
| DSR-BOOTH-007 | Blocked-data: /en/digital-showroom/both/item has 1 product (TD-608-04 needs ≥ 2) |
| DSR-BOOTH-009 | Blocked-data: no CTA modal trigger on Booth TOP (modal content pending YKK, Q18 / CB-10) |
| DSR-BOOTH-009 | Blocked-data: no CTA modal trigger on Booth TOP (modal content pending YKK, Q18 / CB-10) |
| DSR-BOOTH-010 | Manual: Author UI edit + publish on QA copy pages (608-10.0, TD-608-02/03; agents read-only) |
| DSR-BOOTH-011 | Blocked: cn path not on DEV (Issue #18, A11) |
| DSR-BOOTH-013 | Visual: lane codex (Playwright screenshots vs Figma C02 3324-64205/64850, 4545-87679/87815/88315) |

## 6. Failed tests

### DSR-BOOTH-001 [ja] Products and ITEM for buttons navigate to their pages

- Failing assertion: `Error: Products target language prefix` — `tests/booth/DSR-608.booth.spec.ts:44`
- Expected: /^\/ja\//
- Actual: "/en/product-list"
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-3a13d-ons-navigate-to-their-pages-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-3a13d-ons-navigate-to-their-pages-chromium-retry1/test-failed-1.png`

### DSR-BOOTH-005 [ja] ITEM for back link returns to Booth TOP; pills switch ITEM for

- Failing assertion: `Error: pill /content/sites is a site path with language prefix` — `tests/booth/DSR-608.booth.spec.ts:137`
- Expected: /^\/ja\//
- Actual: "/content/sites"
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-678cc-h-TOP-pills-switch-ITEM-for-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-678cc-h-TOP-pills-switch-ITEM-for-chromium-retry1/test-failed-1.png`

### DSR-BOOTH-005 [en] ITEM for back link returns to Booth TOP; pills switch ITEM for

- Failing assertion: `Error: pill /content/sites is a site path with language prefix` — `tests/booth/DSR-608.booth.spec.ts:137`
- Expected: /^\/en\//
- Actual: "/content/sites"
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-80d66-h-TOP-pills-switch-ITEM-for-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-80d66-h-TOP-pills-switch-ITEM-for-chromium-retry1/test-failed-1.png`

### DSR-BOOTH-011 [ja] PC Booth TOP + ITEM for render in the right language without horizontal scroll

- Failing assertion: `Error: language-specific link` — `tests/booth/DSR-608.booth.spec.ts:238`
- Expected: /^\/ja(\/|$)/
- Actual: "/en/digital-showroom"
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-62e2a-e-without-horizontal-scroll-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-62e2a-e-without-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-BOOTH-011 [ja] SP Booth TOP + ITEM for render in the right language without horizontal scroll

- Failing assertion: `Error: language-specific link` — `tests/booth/DSR-608.booth.spec.ts:238`
- Expected: /^\/ja(\/|$)/
- Actual: "/en/digital-showroom"
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-70c81-e-without-horizontal-scroll-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-70c81-e-without-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-BOOTH-011 [en] PC Booth TOP + ITEM for render in the right language without horizontal scroll

- Failing assertion: `Error: language-specific link` — `tests/booth/DSR-608.booth.spec.ts:238`
- Expected: /^\/en(\/|$)/
- Actual: "/content/sites"
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-e4cc5-e-without-horizontal-scroll-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-e4cc5-e-without-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-BOOTH-011 [en] SP Booth TOP + ITEM for render in the right language without horizontal scroll

- Failing assertion: `Error: language-specific link` — `tests/booth/DSR-608.booth.spec.ts:238`
- Expected: /^\/en(\/|$)/
- Actual: "/content/sites"
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-d3fba-e-without-horizontal-scroll-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-d3fba-e-without-horizontal-scroll-chromium-retry1/test-failed-1.png`

### DSR-BOOTH-014 [ja] SP Booth TOP background image (200, width > 0) and category name

- Failing assertion: `Error: background rendered width` — `tests/booth/DSR-608.booth.spec.ts:291`
- Expected: > 0
- Actual: 0
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-647d5-0-width-0-and-category-name-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-647d5-0-width-0-and-category-name-chromium-retry1/test-failed-1.png`

### DSR-BOOTH-014 [en] SP Booth TOP background image (200, width > 0) and category name

- Failing assertion: `Error: background rendered width` — `tests/booth/DSR-608.booth.spec.ts:291`
- Expected: > 0
- Actual: 0
- Attempt(s): failed, failed
- Evidence paths: `test-results/booth-DSR-608.booth-DSR-60-6d27d-0-width-0-and-category-name-chromium/test-failed-1.png`
  - Retry 1: same assertion (same); screenshot `test-results/booth-DSR-608.booth-DSR-60-6d27d-0-width-0-and-category-name-chromium-retry1/test-failed-1.png`

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Pages are preview only (not published). Martin's sample page content (`TEST` pills, Japanese copy on `/en/`) — fails below are proposed observations on sample data, **not** product verdicts. Read-only GETs/clicks only; no Author access, no form submission.
- Failure triage (proposed): **001 ja / 011 ja** — on `/ja/…/both` the back link goes to `/en/digital-showroom` and Products to `/en/product-list` with no booth-tag query (en: `?applications=site:product/application/baby-kids`) → suspect data (authored link), confidence 40%. **005 ja+en / 011 en** — all 4 ITEM-for pills `href="/content/sites"` (GET 404; label `TEST`) → suspect data/product (unresolved Author link in pill), confidence 50%. **014 SP ja+en** — `.bt-bg` is `display:none` at 390 px (CSS); background image is 200 and decodes (naturalWidth 1600), PC renders → suspect test (QA-added 14.0 may over-specify SP; Figma SP 3324-64850 not checked), confidence 25%. cause = none for all (BUG-RULES §4).
- 011 uses soft assertions: only the first failing link is in the message; full link lists are in the `observed` attachment (ja TOP: `/en/digital-showroom`, `/en/product-list`; en ITEM: `/content/sites` ×4). No horizontal scroll at 390 px on any page (overflow 0); `html lang` correct.
- Earlier runs in this job on the same base: run 1 (10:32:41–10:38:21Z) 11 pass / 13 fail / 10 skip; run 2 (10:37:20–10:41:48Z) 13 / 9 / 12. Run 1 had 4 test defects, fixed before run 2: 009 used `button.bt-zoom` (image preview) as the modal trigger; 012 / 001 did not wait for navigation after Enter/click. Run 2 artefacts were wiped when the next run cleaned `test-results/`; this run (3) is the reported one, with the same outcome as run 2.
- Screenshots of the 9 failed tests (first attempt) are copied to `ykk-dsr/hub/results/JOB-ZZ-IDLE-47/evidence/` (committed).
- Scaffold of JOB-ZZ-IDLE-47 step 2. DSR-608 was picked among 560/568/608 as the newest `[tc-night]` commit (a6b897b, 2026-10-15 13:32Z); its booth pages exist on DEV (DSR-661 [Dev] In Testing). 560 (search JSON, waits on 585) and 568 (contact form; submit forbidden) are left for later idle jobs.
- TC mapping: 608-n.0 → `DSR-BOOTH-0nn` (n = 1…14). 608-10.0 = manual (Author), 608-13.0 = visual (lane codex), cn = fixme (Issue #18).
- Selectors are class based (`booth-top`/`bt-*`, `booth-item`/`bi-*`, `booth-pills`, `related-content`); no data-testid on booth blocks yet (`// TODO: data-testid` in `pages/BoothPage.ts`).
- Not covered by data: 002 (TOP pills are `<span>`, not links — no sibling booths), 003 multi-image carousel, 007 multi-product thumbnails, 009 CTA modal (no trigger on the page; `button.bt-zoom` is the image preview toggle, not the modal — content pending YKK, Q18 / CB-10). QA copy pages TD-608-02/03 not created.
- Category name (014) has no per-language oracle (TD-608-01 "existing"): asserted non-empty, text recorded. The ja and en sample both show `SPORTS/OUTDOOR` and a Japanese lead/back label on `/en/` (recorded, not asserted).
- Not in any regression tier yet (`@auto` only, like DSR-503); Claude decides whether to add it to P2.
