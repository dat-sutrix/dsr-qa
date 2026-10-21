# JOB-20261021-03: DSR-586 on product 46 (PDO_ID override), DEV .aem.page, ja+en, 2026-10-21 08:37–08:38Z
## Merge/incident-related
None: 0 fails, and no observation has cause ≠ none.
## Result
- **Code:** I added an optional `PDO_ID` override (fixtures/dsr-586.ts). With `PDO_ID=46`, the host becomes the .aem.page tier of BASE_URL and the TCs open /{lang}/products/46. TCs that are not tied to data values assert presence and self-consistency instead of TD values. Value-specific TCs skip with "needs TD-586". Without `PDO_ID`, behaviour is unchanged.
- **Run:** `PDO_ID=46 npm run test:dev -- --grep DSR-586` gave 20 tests: 12 pass, 0 fail, 8 skip, exit 0, no retries. tsc had no errors. Report: results/DSR-586/DEV/automation-run-20261021-job03.md.
- **Passed (proposed):** URL pattern PDO-005 (/ja/products/ 404, no block; alpha step not run) · page renders PDO-001 ja/en (QUICKFIT® / Z15-1, 5 images, 4 sections) · meta/og PDO-003 ja/en (og:image 200 image/jpeg) · no browser GraphQL PDO-004 (0 of 103 requests) · Contact productCode PDO-013 ja/en · html lang PDO-014 ja/en.
- **Also passed:** removed UI + ver0.4 field-name tolerance PDO-017 (0 of 12 removed labels from spec.json 17.0, no literal undefined/null) · related cards PDO-019 (3 cards, all relative EDS paths, none on the publish domain – DSR-538).
- **Skipped:** "needs TD-586" for 002, 006, 007, 008, 009, 011 and 012; cn fixme (Issue #18). PDO-017 step 2 (TD values per field) is also not verified.
- **Observation (cause none, 0%):** /ja/products/46 and /en/products/46 return 404 on .aem.live and 200 on .aem.page. This is a publish-to-live gap, not a fail.
- **Caveats:**
  - These are passes on real data, not TD-586, and on .aem.page, not .aem.live. Re-run without `PDO_ID` once TD-586 is seeded and live.
  - PDO-019 now has a soft DSR-538 assertion, so it is no longer purely record-only.
  - The PDO-013 Contact link is a same-page `#contact` anchor (DSR-504 target pending).
  - The en meta description looks truncated ("… The"); recorded only.
- No failures, so no evidence screenshots. No content edits, logins or form submits.
