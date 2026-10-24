# JOB-20261024-06 – DSR-671 cf-align spec, DEV ja/en – done (04:17–04:23Z)
New spec `tests/cf-model/DSR-671.cf-align.spec.ts` + `fixtures/dsr-671.ts`; tsc 0. Reports: `results/DSR-671/DEV/automation-run-20261024.md` (+ `-tc170.md` for 17.0). **Merge/incident-related (cause ≠ none): none. NEW FAIL: none.**

| TC | Lang | Proposed | Raw value | suspect / cause / conf. |
|---|---|---|---|---|
| 1.0 | – | Skipped | Author `/adobe/sites/cf/models` HTTP 401 (cookie) | – |
| 2.0 | ja, en | Pass | 200, no errors; `hubspotFormId: null`, `promoText: {plaintext: null, html: null}` | – |
| 3.0 | en | Skipped | Blocked-by TD-671-03: `dsr-catalog-page` qa671-cat `related.items: []`; page 404 | – |
| 6.0 | en | Skipped | Blocked-by TD-671-01: `dsr-product-page` 990671001 empty; page 404 | – |
| 7.0 model | – | Skipped | HTTP 401 (cookie) | – |
| 7.0 | ja, en | Pass | every `dsr-product-list` item (ja 8, en 4) → `dsr-product-page` 200, no errors, no `relatedMoodboards` | – |
| 8.0 | – | Skipped | HTTP 401 (cookie) | – |
| 11.0 | ja | Pass | product 8 / catalog 15 / video 7: 0 mismatches (null ref: products/990586009) | – |
| 11.0 | en | Fail | `dsr/en/movies/standard/qa501-main-a`, `-b` → `/content/dam/ykk/common/product-cf/test/qa501-main-{a,b}`; product/catalog 0 mismatches | data / none / 20% |
| 12.0 | – | Skipped | HTTP 401 (cookie) | – |
| 14.0, 15.0 | en | Skipped | Blocked-by TD-671-01 (/en/products/990671001 404) | – |
| 16.0 | en | Skipped | Blocked-by TD-671-02 (/en/products/990671002 404) | – |
| 17.0 | ja, en | Pass | 586/654/587 (+2 retest specs): 118 tests 85/6/27; 88 ledger keys, 0 NEW FAIL; fails = CATOV-001/012 [ja,en], already fail (known data) | – |

Why 11.0 en fails: qa501-main-a/b are legacy QA video CFs still pointing to the pre-overlay folder (IDLE-44: "qa501-* not re-seeded"); DSR-671 #8 is a save-time check, so old CFs are not blocked → likely data, not a product bug.
Next: Dat pastes a new Author cookie; after TD-671-01/02/03 (Mon 26/10) rerun `run-only` with this TC list. 14.0 may need an Expected review: related catalogs on product detail currently render as a PDF link ("View this product's catalog"), not a `/en/library/catalog/<id>` link.
Evidence: none committed (the only job fail is API-only; 17.0 fails are known).
