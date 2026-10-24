# DSR-503 DEV automation run — 20261024

Job: `JOB-ZZ-IDLE-44` step 2: scaffold for the newest `tc-out/*.spec.json` that has no `tests/**` spec. Publish side only: no Author, no login, no form submit, no AEM writes.

## 1. Header

- Run start (UTC): 2026-10-24T01:02:29Z
- Run end (UTC): 2026-10-24T01:03:20Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live; CF oracle = publish persisted query `dsr-product-page` on publish-p192812-e2014374
- Target page(s): `/{ja,en}/products/46` (TD-503-01), `/ja/products/135` (TD-503-02), `/ja/products/999999` (TD-503-03), and the malformed variants `/ja/products/abc`, `/ja/products/046`, `/ja/products/46/`, `/JA/products/46`
- Build under test: not independently verified (no dev repo access)
- Baseline ID: DSR-503 TC (`ykk-dsr/hub/tc-out/DSR-503.spec.json`) + BL-OVL-1 Update 2026-10-21 (URL id = DSR CF node name)
- Automation HEAD commit SHA: 8b08492445262e3bf02f571dd23314ab7bf9b242 + uncommitted scaffold (`fixtures/dsr-503.ts`, `pages/ProductUrlPage.ts`, `tests/product-url/DSR-503.product-url.spec.ts`), committed with this report
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/idle44/s503.json ENV=dev npx playwright test tests/product-url/DSR-503.product-url.spec.ts --project=chromium --reporter=list,json --output=/tmp/idle44/tr-503
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 13 | 8 | 0 | 5 | 0 | 1 | configured 1; none used | 49.9 s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms them.
Scope/browser: the whole new spec, chromium. Flaky outcomes: 0. This ran at the same time as the JOB-ZZ-IDLE-44 regression, so the overlay suite was running in parallel.

## 4. Executed tests

Durations are per test (one attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-PURL-001 [ja] | DSR-PURL-001 [ja] /{lang}/products/{id} returns 200 without redirect and shows the CF product | pass | 5.3 s | — |
| DSR-PURL-001 [en] | DSR-PURL-001 [en] /{lang}/products/{id} returns 200 without redirect and shows the CF product | pass | 5.8 s | — |
| DSR-PURL-002 [ja,en] | DSR-PURL-002 [ja,en] same id resolves under every language with only {lang} different | pass | 11.2 s | — |
| DSR-PURL-003 [ja] | DSR-PURL-003 [ja] two ids → two fixed URLs, stable across reloads | pass | 13.9 s | — |
| DSR-PURL-005 [ja] | DSR-PURL-005 [ja] unknown id → 404, no product block | pass | 4.3 s | — |
| DSR-PURL-006 [ja] | DSR-PURL-006 [ja] malformed ids → 404 (trailing slash 404 or 301 to canonical) | pass | 3.0 s | — |
| DSR-PURL-007 [ja] | DSR-PURL-007 [ja] raw HTML contains product name + code; canonical / og:url end with the URL | pass | 2.0 s | — |
| DSR-PURL-007 [en] | DSR-PURL-007 [en] raw HTML contains product name + code; canonical / og:url end with the URL | pass | 2.2 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-PURL-001 [cn] | Blocked: cn path not on DEV (Issue #18, A5) |
| DSR-PURL-004 [ja] | Blocked: product list page on DEV linking to product detail not confirmed (Q20, Quentin) |
| DSR-PURL-004 [en] | Blocked: product list page on DEV linking to product detail not confirmed (Q20, Quentin) |
| DSR-PURL-008 [ja] | Manual: Author UI (agents read-only, no Author access) |
| DSR-PURL-009 [ja] | Manual: Author UI (agents read-only, no Author access); needs Author write TD-503-04 (QA-PT) |

## 6. Failed tests

None.

## 7. Open points for QA

- DASHBOARD lists DSR-503 as **Dismissed**. The job rule still selected it: it is the newest uncovered spec.json. All four uncovered files (503/560/568/608) have the same mtime (2026-10-16 06:39:57), so the tie was broken by the newest `[tc-night]` commit (503, 2026-10-15 14:23Z). Claude should decide whether 503 stays as a separate spec or is folded into the DSR-586 regression. The spec is tagged `@auto` only (not `@overlay`), so it is not part of any regression tier yet.
- [Giả định] TD-503-01/02 are existing published products, not QA seed data (spec.json howto #1): 46 (Z15-1 / QUICKFIT®) and 135 (ABC-123), observed 2026-10-24. They can be overridden with `DSR503_ID1` / `DSR503_ID2`. The expected product code comes from the CF via the publish query. If the CF is missing, the test skips (data) rather than failing.
- A2 (numeric product-id) is superseded by BL-OVL-1 Update 2026-10-21 (id = DSR CF node name). The TC text for 1.0/8.0 still says "product-id"; the tc-backlog note already flags it for an update.
- DSR-PURL-006: every variant returned 404, including the trailing slash (A4 accepts 404 or 301). `/ja/products/046` → 404.
- DSR-PURL-007: canonical and og:url are `https://dev-eds.ykkdigitalshowroom.com/{lang}/products/46`. The **path** matches, but the host is the dev-eds domain, not the `.aem.live` host under test. The spec checks only the path. Whether the host is correct is not verified here.
- DSR-PURL-002: html lang is checked after JS runs. The raw HTML `<html>` has no `lang` attribute (recorded, not asserted).
- Evidence: no failures, so nothing is committed. Playwright output is in `/tmp/idle44/tr-503`; `test-results/` and `playwright-report/` are not committed.
