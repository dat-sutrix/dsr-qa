# DSR-609 baseline BL-v1 (Top page, template top, design B01)

Source: adopted dev TC file `ykk-dsr/hub/tc-out/[Sutrix] DSR -196- [レイアウト] トップ.xlsx` (sheet Testcase rows 1–9, QA columns P–U, sheet Assumptions A1–A9). Baseline = DSR-196 BAC 1–5 + 技術完了条件 1–6. Do not edit expected results here; re-copy when the TC file changes.

Automation ID: `DSR-TOP-00N`, N = TC number.

| TC | Automation ID | Feature | Expected (measurable, JOB-20261015-13) | Exec | Spec |
|---|---|---|---|---|---|
| 1 | DSR-TOP-001 | Responsive & multi-language layout | Visual vs Figma B01 | Visual | JOB-20261015-14 (`tests/top-page/`) |
| 2 | DSR-TOP-002 | [Author] Main visual editing, max 2 cards | — | Manual (qa609-top copy) | — |
| 3 | DSR-TOP-003 | [Author] RECOMMEND CONTENTS editing, max 4 cards | — | Manual (qa609-top copy) | — |
| 4 | DSR-TOP-004 | Quick search hover style + navigation | Search box visible; hover changes text/background colour (computed colours recorded); keyword `zipper` navigates to product search page, HTTP 200 | Automation | `tests/top/DSR-609.top.spec.ts` |
| 5 | DSR-TOP-005 | RECOMMEND card styling & links | ≤ 4 cards; image aspect ratios equal (±1%); border-radius > 0 on card/image; image, title and description of card 1 lead to the same non-empty, non-`#` href | Automation | same |
| 6 | DSR-TOP-006 | NEWS auto-fetch & order | Exactly 3 items (or all if < 3); = 3 newest rows of `/{lang}/news/query-index.json` by publish date desc; requested index path recorded; each item link HTTP 200 | Automation | same |
| 7 | DSR-TOP-007 | NEWS title truncation | 1440 px: title ≤ 2 lines with ellipsis when overflowing; 390 px: ≤ 1 line; image ratio PC = SP. No long title → not exercised (Pending) | Automation | same |
| 8 | DSR-TOP-008 | NEWS empty state | Route-mock index `{"data":[],"total":0,"offset":0,"limit":0}`: page renders, no console error, NEWS layout not broken; shown content recorded (Q10: PASS on no error / no broken layout) | Automation | same |
| 9 | DSR-TOP-009 | LCP eager loading | Main visual `<img>` not `loading="lazy"` (eager or fetchpriority=high) and is the LCP element; PSI in JOB-20261015-14 | Automation | same |

## Assumptions (from TC file sheet Assumptions)

- A3: DEV only; DSR-196 技術完了条件 2 (STG real URL) applied later.
- A5: Top page on DEV = `/{lang}/top-page`; .aem.live first, .aem.page fallback, host recorded.
- A7: TC 6 step 1 (publish a news) replaced by comparison with the index (read-only).
- A8: TC 8 0-news state simulated by Playwright route mock (no AEM change).
