# DSR-586 product detail overlay – changed expectations and assumptions

TC sheet: `ykk-dsr/hub/tc-out/DSR-586.spec.json` (TC N.0 = DSR-PDO-00N). Baseline BL-OVL-1 (`docs/DSR-587/overlay-data-flow-BL.md`).
Spec: `tests/product-detail/DSR-586.product-detail.spec.ts`, fixtures `fixtures/dsr-586.ts`.

## Changed Expected (JOB-20261023-07, 2026-10-23)

| TC | Old Expected (spec.json 5.0) | New Expected | Source |
|---|---|---|---|
| DSR-PDO-005 | 990586001 → 200 product detail; `qa586-alpha` → 404, no product-detail block; `/ja/products/` → no product-detail block. Design: BL-OVL-1 regex `(?<=/products/)([0-9]+)$` (digits only) | 990586001 → 200 product detail; `qa586-alpha` → **200 with the product-detail block** (name "QA586 alpha", TD-586-05); `/ja/products/` → no product-detail block (unchanged) | BL-OVL-1 **"Update 2026-10-21 15:40 VN – Martin DSR CF audit + platform fix (BINDING)"**: "Page URL = DSR CF node name: … /{lang}/products/{name}" and "the id field … must equal the node name: lowercase letters, digits, "-" only". `qa586-alpha` matches that rule. Observed on DEV: JOB-20261022-17 (`/ja/products/qa586-alpha` = 200 + product-detail block, in query-index + sitemap; `suspect: test`). |

## Assumptions

- [Giả định] The digits-only rule (old BL regex, TCC#2) is replaced by the node-name rule for every overlay type. The binding update names video, product and catalog URLs alike. DSR-503 TC 5.0/6.0 (malformed ids → 404, A5) is unchanged here.
- `qa586-alpha` is now a positive case. If it returns 404 and `DSR586_SEEDED` does not list `05`, the step is recorded as `not-verified` (data not seeded), not as a pass or fail.
- `ykk-dsr/hub/tc-out/DSR-586.spec.json` 5.0 is owned by Claude (hub rule). Its `expected` and `design` fields still carry the old text. **Open point: Claude needs to update 5.0 to the text above.**
- Not changed: PDO-006 (subfolder → page generated, 65%, waiting for a decision). There is no written source yet.
