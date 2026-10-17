---
id: JOB-ZZ-IDLE-10
agent: claude-code
us: DSR-589
type: write-only
env: dev
lang: [ja, en]
tcs: [4.0, 6.0]
priority: P3 (idle)
created_by: claude-tc-job
---

## Context
Idle work for DSR-589 (icon replacement, To Do – Martin). Capture the **temporary icon inventory** on DEV now, before icons are replaced; it becomes TD-589-06 (oracle for TC 4.0 / 12.0). Spec: `ykk-dsr/hub/tc-out/DSR-589.spec.json`. Read-only.

## Steps
1. Pages (ja, en): product list `/master/{lang}/product-list` (fallback `/{lang}/product-list`), 5 product details linked from it (`/{lang}/products/{id}`). Preflight 404 → record and skip that page.
2. On each page collect every icon in performance/function areas and product cards: `img[src]` (incl. svg), inline `svg use[href]`, CSS background-image icons inside cards. Record page URL, selector, src/href, alt/aria-label, rendered w×h, HTTP status, sha1 of the file.
3. Write `results/DSR-589/DEV/temp-icon-inventory.json` (unique by sha1, with list of pages where used) + a short markdown summary (count per page, broken / missing alt counts → evidence for TC 6.0 baseline).
4. Scaffold `tests/icons/DSR-589.icons.spec.ts` (titles `DSR-ICON-<NNN>`, 1.0 → 001 …) with Automation TCs from the spec; tests that need TD-589-04 (official list) → `test.fixme('Blocked: TD-589-04 official icon list')`. `npx tsc --noEmit`; run once; report per AGENTS.md "Run reporting".

## Output
`results/DSR-589/DEV/temp-icon-inventory.json` + `automation-run-<YYYYMMDD>.md`; commit `[DSR-589] temp icon inventory + scaffold + run report`.
