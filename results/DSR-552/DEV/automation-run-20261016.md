# DSR-552 DEV automation run — 20261016

Hub job JOB-20261016-01 implements the display-name TCs DSR-BREAD-010, 014, 015 and 018. Bug-FIELD (DSR-592) was dismissed on 2026-10-15, and QA-PT seeded T2/T3 on DEV on the night of 2026-10-15. The TC purposes follow the TC Excel: 015 = special characters, 018 = per-language labels. The job's own mapping had swapped them (015 = empty display-name fallback, 018 = special characters); see section 7.

## 1. Header

- Run start (UTC): 2026-10-16T04:59:19Z
- Run end (UTC): 2026-10-16T05:00:44Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): /master/{ja,en}/test-space/dsr552-label/child/grandchild and /child (010, 018); /master/ja/test-space/dsr552-edge/long/leaf (014); /master/ja/test-space/dsr552-edge/special/leaf (015)
- Build under test: DEV as deployed on 2026-10-16. Build ID/SHA not independently verified.
- Baseline ID: BL-v1 (docs/DSR-552/)
- Automation HEAD commit SHA: 6fa8f8e57b02c6cbeffcb991352e7c4cc9780364, plus uncommitted changes to `tests/breadcrumb/DSR-552.breadcrumb.spec.ts` and `fixtures/dsr-552.ts`, committed with this report
- Exact command used:

```sh
DSR_JOB_EVIDENCE=ykk-dsr/hub/results/JOB-20261016-01/evidence PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/job1601/results.json npm run test:dev -- --project=chromium tests/breadcrumb/DSR-552.breadcrumb.spec.ts --grep "DSR-BREAD-0(10|14|15|18) \["
```

Preflight (curl, 2026-10-16 ≈04:55Z): all T2 ja/en and T3 long/special pages, including their leaves, returned HTTP 200 with the expected `<title>`. No TC was blocked by data. T5 (dsr552-author) was not accessed.

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 7 | 4 | 2 | 1 | 1 | 2 | configured 1; 2 used (both failed again) | 82.8s (Playwright), 84.6s including npm startup |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: subset (4 TCs × languages) on chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-BREAD-010 | DSR-BREAD-010 [ja] display name overrides page title | passed | 4.8s | — |
| DSR-BREAD-010 | DSR-BREAD-010 [en] display name overrides page title | passed | 4.8s | — |
| DSR-BREAD-014 | DSR-BREAD-014 [ja] 100-character display name keeps layout | failed | 10.2s → 8.7s | document scrollWidth 1456 > viewport at 1440 and 1024 px (the label does not wrap) |
| DSR-BREAD-015 | DSR-BREAD-015 [ja] special characters in display name are plain text | failed | 14.7s → 11.2s | label shown as `QA & "Test" ®`; the `<b>`/`<script>` parts of the authored string are missing (also in JSON-LD) |
| DSR-BREAD-018 | DSR-BREAD-018 [ja] each language uses its own display names | passed | 7.4s | — |
| DSR-BREAD-018 | DSR-BREAD-018 [en] each language uses its own display names | passed | 6.0s | — |

Observed (from the `observed` attachments):
- 010/018 ja: `HOME, test space, 親ラベル, 子ラベル, QAラベル孫`. 010/018 en: `HOME, test-space, EN Parent Label, EN Child Label, QA Label Grandchild`.
- 010 ancestor hrefs: `/master/{lang}/test-space/dsr552-label` and `/dsr552-label/child`, unchanged. On the child page the last item is `子ラベル` / `EN Child Label`.
- JSON-LD on the T2 grandchild has positions 1..5, and its names equal the visible items. Item 5 `QAラベル孫` / `QA Label Grandchild` is the empty-display-name fallback to the title, with no `item`.
- 014 metrics (record only):

| Viewport | doc scrollWidth | nav width | label width | label lines | white-space | text-overflow | ellipsis | header bottom / nav top |
|---|---:|---:|---:|---:|---|---|---|---|
| 1440×900 | 1456 | 1360 | 1400 | 1 | nowrap | clip | no | 140 / 148 |
| 1024×768 | 1456 | 944 | 1400 | 1 | nowrap | clip | no | 140 / 148 |
| 375×812 | 375 | 343 | 96 | 1 | nowrap | ellipsis (overflow hidden) | yes, label clipped | 48 / 81 |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-BREAD-018 [cn] | cn: no /master/cn (Issue #18) |

## 6. Failed tests

### DSR-BREAD-014 — DSR-BREAD-014 [ja] 100-character display name keeps layout

- Failing assertion: `expect.soft(metrics.documentScrollWidth, \`${name}px: no horizontal page overflow\`).toBeLessThanOrEqual(metrics.viewportWidth)` — `tests/breadcrumb/DSR-552.breadcrumb.spec.ts:193`
- Expected: document scrollWidth ≤ viewport width (no horizontal scroll); the TC also expects the text to wrap within the content width.
- Actual: 1440 px → 1456; 1024 px → 1456; 375 px → 375 (pass, with ellipsis). The 100-char label link is `white-space: nowrap`, 1400 px wide, and starts on its own line. Its arrow image ends at x=1456 and is the element that overflows. Control: the T1 child page at 1440 px has scrollWidth 1440, so the overflow comes from the long breadcrumb label.
- Attempt(s): failed, failed on retry (identical values)
- Evidence paths: ykk-dsr/hub/results/JOB-20261016-01/evidence/DSR-BREAD-014_ja_{1440,1024,375}.png (section screenshots; the 375 file is from the final viewport of the loop); evidence/DSR-552/DEV/DSR-BREAD-014_ja_fail.png (full page at 375 px, the last viewport)

### DSR-BREAD-015 — DSR-BREAD-015 [ja] special characters in display name are plain text

- Failing assertions: `expect.soft((await fourth.textContent())?.trim()).toBe(t3Special.label)` — `tests/breadcrumb/DSR-552.breadcrumb.spec.ts:206`; `toHaveText(t3Trail(t3Special))` — `:207`; `expect.soft(names[3], 'JSON-LD name equals the authored string')` — `:211`
- Expected: `<b>QA</b> & "Test" ® <script>alert(1)</script>` shown literally, and the JSON-LD name equals the same string.
- Actual: visible text and JSON-LD name are both `QA & "Test" ®`. Item markup: `<a …>QA &amp; "Test" ®</a>`. Passed parts: 0 `<b>/<strong>/<script>` elements in the breadcrumb, 0 dialogs, 0 console/page errors.
- Root-cause note: the published page already has `<meta name="navtitle" content="QA &#x26; &#x22;Test&#x22; ®">`, and query-index `navtitle` = `QA & "Test" ®`. The tags are therefore removed before the breadcrumb block reads the value: either in the AEM → EDS publish pipeline, or the value was entered differently in Author. The Author value was not checked (read-only).
- Attempt(s): failed, failed on retry (identical)
- Evidence paths: evidence/DSR-552/DEV/DSR-BREAD-015_ja_fail.png; ykk-dsr/hub/results/JOB-20261016-01/evidence/DSR-BREAD-015_ja.png (copy)

Raw Playwright artifacts (traces, error-context) are in `test-results/breadcrumb-DSR-552.breadcr-b08da-…` and `…-b5753-…`. Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- TC purpose mapping: the job file mapped 015 to the empty-display-name fallback and 018 to special characters. The TC Excel on Drive (`Sutrix DSR -552- 汎用ブロック パンくずリスト（Breadcrumb）ブロック開発.xlsx`, read 2026-10-16) has 015 = special characters and 018 = multi-language labels. The TC file was followed, as the job instructs. The job's fallback check (grandchild = title, JSON-LD names = visible names) is covered inside 010/018 and passed. Per the TC file, TC-025 also uses T2 data, but the current 025 test uses T1 (not changed here).
- 014 adds 1024 px from TC step 1 (the job listed 1440 and 375). The pass/fail assertion is only page overflow. Overlap and clipping are recorded but not asserted, and the Figma verdict is for QA. The SP display rule is still open (DSR-575 Q5), so the 375 px ellipsis is recorded only. The TC wording "all characters visible (no clipping)" would not hold at 375 px.
- 015 suspect is data/pipeline, not the breadcrumb renderer, because the stored navtitle is already stripped. Whether EDS strips HTML from page metadata by design needs dev confirmation. If it does, the TC expectation (literal tags) may be unachievable and needs a decision.
- Root AGENTS.md "Project: DSR-552" counts (18 implemented / 12 fixme, Bug-FIELD open) are now stale; not edited in this job.
- Build identity not verified; Chromium only.
