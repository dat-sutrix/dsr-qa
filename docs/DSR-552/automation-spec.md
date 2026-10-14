# DSR-552 – Breadcrumb (breadcrumb) – Automation Spec

Source: TC Excel `[Sutrix] DSR -552- [汎用ブロック] パンくずリスト（Breadcrumb）ブロック開発.xlsx` · [Jira DSR-552](https://sutrix.atlassian.net/browse/DSR-552).

## Scope

QA task dated 2026-10-12 supplies the executable expectations below and supersedes the October scaffold. 35 TC purposes: 24 auto, 6 visual, 5 manual. Implemented: 16 auto + 2 visual; 12 remaining purposes fixme. Outcomes are proposals; human QA confirms. Read-only Publish; never access Author or T5. Excel/Jira/Figma were not independently accessed.

## 1. Environment

| Key | Value | Status |
|---|---|---|
| DEV | envs/dev.env BASE_URL | Default public Publish |
| STG / PRO | envs/stg.env / envs/pro.env BASE_URL | Not run |
| Site path | /master/{ja,en}/ | cn absent: Issue #18 |
| Test root | /master/{lang}/test-space | Included in trail |
| Auth | None | No credentials |
| Viewports | PC 1440×900; SP 375×812 | SP blocked |

Environment variables override dotenv defaults. No credentials or base URLs in test bodies. Normalize trailing slashes. Run scripts require DSR_PREFLIGHT pointing at the fresh preflight JSON; missing/mismatched fixtures become Blocked – test data. English test-space 404 is retained as Bug-INDEX, rather than blocking core T1 tests.

## 2. Automation scope

Same User Story layout, TC-prefixed titles and POM as DSR-173. Existing breadcrumb scaffold tags @groupA/@groupB/@groupC plus @auto/@visual are preserved. DSR-173 has only known-bug tags, so there is no common group-tag scheme to copy. Localized TC purposes generate one test per language. cn localized cases use test.fixme with `cn: no /master/cn (Issue #18)`.

## 3. Group A test cases

| TC ID | Measurable expectation | Languages |
|---|---|---|
| DSR-BREAD-001 | First main section after header; HOME > test space/test-space > QA Parent > QA Child | ja, en |
| DSR-BREAD-002 | Grandchild's four ancestor links: exact normalized URL, HTTP 200, same tab; click each | ja |
| DSR-BREAD-003 | Last current span aria-current=page, no anchor ancestor; click preserves URL | ja |
| DSR-BREAD-004 | HOME exact text, href /master/ja | ja |
| DSR-BREAD-005 | Grandchild exactly five items in expected order | ja, en |
| DSR-BREAD-006 | Parent exactly three items; last has no anchor | ja |
| DSR-BREAD-007 | HOME > test space > QA Gap > QA Leaf; skip unpublished x; hrefs HTTP 200 | ja |
| DSR-BREAD-008 | HOME HTTP 200, zero breadcrumb and BreadcrumbList | ja, en |
| DSR-BREAD-009 | Missing child HTTP 404, zero breadcrumb and BreadcrumbList | ja |
| DSR-BREAD-011 | Grandchild exact page titles; no slug labels | ja |
| DSR-BREAD-017 | HOME text HOME; language-specific HOME URL | ja, en |
| DSR-BREAD-025 | One BreadcrumbList; positions 1..5, exact expected and visible names, absolute HTTPS URLs; final item URL optional | ja, en |
| DSR-BREAD-027 | nav label, ol/li, current aria, empty arrow alt; axe scoped to breadcrumb zero violations | ja |
| DSR-BREAD-028 | Tab from last visible header link through HOME/test space/QA Parent; focus indicator; Enter navigates; current tabIndex=-1 | ja |
| DSR-BREAD-031 | Zero site-origin console errors/pageerrors; breadcrumb JS and CSS captured HTTP 200 | ja |
| DSR-BREAD-035 | Every arrow URL same host (relative resolves there), HTTP 200 | ja |
| DSR-BREAD-020 | Unmasked breadcrumb section screenshot, Chromium 1440×900 | ja |
| DSR-BREAD-032 | Chromium/Firefox/WebKit against shared Chromium screenshot | ja |

Visual threshold maxDiffPixelRatio=0.01. Initial snapshots capture current DEV appearance, not an approved Figma match. Only Chromium creates snapshots; cross-browser comparison cannot overwrite the Chromium baseline. Default Playwright screenshots disable animations and hide carets; no masks or page styling injected.

## 4. Groups B / C / M (not in scope now)

| TC ID | Group / method | Verbatim fixme reason |
|---|---|---|
| 010, 015, 018 | A auto | Bug-FIELD |
| 014 | A visual | Bug-FIELD (100-char label) |
| 019 | C visual | DSR-555 + cn |
| 021, 023 | B visual | DSR-575 Q5 (SP display) |
| 022 | B auto | DSR-575 Q5 (SP display) |
| 029 | C auto | Run on STG (Lighthouse) |
| 030, 034 | C auto | DSR-536 / movie-detail placement |
| 033 | C auto | Layout tickets |
| 012, 013, 016, 024, 026 | M manual | Documented only; source Excel steps not supplied; no execution |

## 5. Open issues affecting automation

- Bug-INDEX: English test-space omitted from index/trail; correct assertions remain active, bug annotation on 001/005/025.
- Bug-FIELD: パンくず表示名 property absent; related tests fixme.
- DSR-575 Q5, DSR-555, DSR-536 and layout tickets remain dependencies.
- Fixture publication/title mismatches listed in test-data.md and preflight.json.
- No system packages installed: repo safety prohibits installation. Local Noto CJK absent; Noto Sans JP web font loaded in preflight. Firefox/WebKit availability reported per run.
- HTML reporter, JSON reporter, retain-on-failure traces and screenshots. Evidence remains in evidence/DSR-552/DEV; raw test-results/playwright-report are gitignored. Standing markdown reports accompany every invocation plus requested CSV. Exact commands recorded in reports.

Reproduce from the project directory in tmux: `node fixtures/dsr-552-preflight.cjs` then set ENV=dev and DSR_PREFLIGHT=evidence/DSR-552/DEV/preflight.json before the Playwright commands recorded in run reports. `docs/DSR-552/run-DEV.sh` provides the first-run sequence and refuses to overwrite the existing first run. Follow-up scripts document the focused checks used during implementation; do not rerun them with existing output paths. `node docs/DSR-552/report.cjs` generates first-run markdown/CSV and refuses to overwrite markdown reports.
