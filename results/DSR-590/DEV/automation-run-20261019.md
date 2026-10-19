# DSR-590 DEV automation run — 20261019

Job: JOB-ZZ-IDLE-11 (idle, write-only). First run of the new scaffold `tests/eco-products/DSR-590.eco-products.spec.ts`.

## 1. Header

- Run start (UTC): 2026-10-19T05:18:49Z
- Run end (UTC): 2026-10-19T05:22:20Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): TOP `/{lang}/product/performance/sustainable` (fallback `/master/{lang}/…`), 9 details `…/sustainable/<slug>` (TD-590-02), finder `…/sustainable/sustainable-solution-finder`. All 404 on DEV (see URL status below).
- Build under test: DEV main branch. The application SHA was not independently verified.
- Baseline ID: spec `ykk-dsr/hub/tc-out/DSR-590.spec.json` (BL-v1: DSR-590 desc 10/17, Figma 3066-24396, URL design P076–P087)
- Automation HEAD commit SHA: 8e56b01a769fe436660df11ffc7bb86f7c178c13 (scaffold uncommitted at run time; committed with this report)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/dsr-590.json npm run test:dev -- --grep "DSR-ECO"
```

### URL status on DEV (recorded only, no verdict)

Command: `ENV=dev node fixtures/dsr-590-url-status.cjs` (plain GET with `redirect: manual`). Re-run it to see when the pages land.

| # | Page | ja | en | /master/ja | /master/en |
|---:|---|---|---|---|---|
| 1 | /{lang}/product/performance/sustainable (TOP) | 404 | 404 | 404 | 404 |
| 2 | …/sustainable/recycled | 404 | 404 | 404 | 404 |
| 3 | …/sustainable/water-saving | 404 | 404 | 404 | 404 |
| 4 | …/sustainable/renewal | 404 | 404 | 404 | 404 |
| 5 | …/sustainable/bio-based | 404 | 404 | 404 | 404 |
| 6 | …/sustainable/bluesign-approved | 404 | 404 | 404 | 404 |
| 7 | …/sustainable/circularity | 404 | 404 | 404 | 404 |
| 8 | …/sustainable/sustainable-metal-finish | 404 | 404 | 404 | 404 |
| 9 | …/sustainable/natural-fiber | 404 | 404 | 404 | 404 |
| 10 | …/sustainable/non-plated | 404 | 404 | 404 | 404 |
| 11 | …/sustainable/sustainable-solution-finder | 404 | 404 | 404 | 404 |

Product query-index candidates (Q14 default, used by DSR-ECO-007): `/ja/products/query-index.json`, `/ja/query-index.json?sheet=products`, `/products_ja.json` and the en equivalents all returned 404. Only the site-wide `/query-index.json` returns 200. It lists pages, not products; its columns include `tags` but no eco tag column.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 19 | 0 | 0 | 19 | 0 | 1 (config 2; single spec file, not fullyParallel) | configured 1; 0 used | 208.4 s (Playwright), 211 s (shell) |

Counts are unique tests. These are proposed automated outcomes only; human QA confirms. No test executed an assertion.
Scope/browser: `--grep DSR-ECO`, Chromium only. Firefox/WebKit projects match only DSR-BREAD-032. Flaky outcomes: 0.

## 4. Executed tests

None. Every test was skipped at preflight (section 5).

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-ECO-001 [ja] | DSR-590 page not on DEV |
| DSR-ECO-001 [en] | DSR-590 page not on DEV |
| DSR-ECO-002 [ja] | DSR-590 page not on DEV |
| DSR-ECO-002 [en] | DSR-590 page not on DEV |
| DSR-ECO-003 [ja] | DSR-590 page not on DEV |
| DSR-ECO-004 [ja] | DSR-590 page not on DEV |
| DSR-ECO-004 [en] | DSR-590 page not on DEV |
| DSR-ECO-005 [ja] | DSR-590 page not on DEV |
| DSR-ECO-005 [en] | DSR-590 page not on DEV |
| DSR-ECO-006 [ja] | DSR-590 page not on DEV |
| DSR-ECO-007 [ja] | DSR-590 page not on DEV |
| DSR-ECO-007 [en] | DSR-590 page not on DEV |
| DSR-ECO-009 [ja] | DSR-590 page not on DEV |
| DSR-ECO-010 [ja] | DSR-590 page not on DEV |
| DSR-ECO-010 [en] | DSR-590 page not on DEV |
| DSR-ECO-012 [ja] | DSR-590 page not on DEV |
| DSR-ECO-013 [ja] | DSR-590 page not on DEV |
| DSR-ECO-013 [en] | DSR-590 page not on DEV |
| DSR-ECO-013 [cn] | cn: no /master/cn on DEV (Issue #18) (fixme) |

## 6. Failed tests

None.

Local artifacts (`test-results/dsr-590.json`, `playwright-report/`) are gitignored and **not committed**.

## 7. Open points for QA

- **Nothing about DSR-590 has been verified.** The scaffold has never run against a real page, so no selector, assertion or flow has been exercised. All selectors are role/text plus generic class guesses from Figma 3066-24396, marked `// TODO: data-testid`. Expect the first run after the pages land to need selector fixes.
- Detail preflight is slow when no page exists: tests 005/006/007/009/010 try TD-590-03 recycled, then the other 8 slugs ("if missing use any published detail"), with both prefixes. That is up to 18 navigations, and it took 16–28 s against the 30 s timeout (worst: DSR-ECO-010 [ja] at 27.7 s). If DEV gets slower, these tests could time out (fail) instead of skipping. A suggested fix is to probe with `page.request` before navigating. It was not applied, because the job says to run once.
- TD-590-02 has no category names in the spec, only the 9 slugs (A3). 001 checks count = 9, 002 checks slug set = 9. Figma shows 8 dots / 9 cards (Q37 open), so 001/003 may fail on count until Q37 is answered.
- 003 assumes the carousel loops (A4). "Active card" = the card with a visible VIEW MORE link (assumption, not in spec).
- 004: if the finder returns 404 after the click, the test is skipped as "Blocked: finder page (S10) not built", per expected "or Blocked".
- 005 checks name/tag against TD-590-03 (リサイクル / Recycled, tag recycled) only when recycled is the page that answered. For a fallback detail it checks non-empty only.
- 006: TD-590-03 free-area content is not given verbatim, so the test checks non-empty text, image 200 and y-order hero < free area < product list.
- 007: the tag column is taken from the index header (/eco/, /sustainab/, then /^tags?$/). The tag value is assumed to equal the detail slug. Product id is taken from the trailing digits of `path`. If no Q14 index answers, the test skips "blocked-data: product query-index (Q14) not found". Product CF eco tag field (DSR-585 fix版) is still missing.
- 009: TD-590-06 is "find existing" and has not been identified. Set `DSR590_TD06=<slug>` to run it; otherwise it skips with blocked-data after the page preflight.
- 012 classifies URLs as code (/blocks/, /styles/, /icons/, /scripts/), DAM (`media_<hash>`, /content/dam/, Dynamic Media, /adobe/assets/, scene7) or other (fails). The Q19 pattern was not confirmed.
- 013: ja/en scaffolded. cn is fixme (Issue #18). The "card names not in another language" check is a script heuristic: ja names must contain kana/kanji, en names must contain none.
- Not scaffolded: 8.0, 11.0 (Manual), 14.0–16.0 (Visual, codex lane).
