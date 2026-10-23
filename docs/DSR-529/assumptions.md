# DSR-529 article detail – changed expectations and verification

Baseline: `docs/DSR-529/baseline-BL-v1.md` (A16 = TC 11 re-baseline). Spec: `tests/article-detail/DSR-529.article-detail.spec.ts`.

## DSR-ARTICLE-011 re-baseline – verified (JOB-20261023-07, 2026-10-23)

| Place | State | Matches the source |
|---|---|---|
| Source | Martin 22/10, DSR-659 c.64884 (KNOWN-FACTS 2026-10-22): `<meta name="thumbnail">` stays relative by design. EDS only makes og:image / og:image:secure_url / twitter:image absolute. | — |
| `docs/DSR-529/baseline-BL-v1.md` | A16 + row 11.0: og:image + twitter:image absolute + 200 image/*; related/listing card images absolute + 200; thumbnail meta present (exactly 1, non-empty), no URL-form assertion | yes |
| `ykk-dsr/hub/tc-out/DSR-529.spec.json` 11.0 | same Expected, design cites "re-baseline Martin 22/10 DSR-659 c.64884" | yes |
| Spec, test 1 (`DSR-ARTICLE-011 [ja/en] og:image + twitter:image …`) | asserts thumbnail count = 1, og/twitter absolute + 200 + image/*, related card src absolute + 200 + image/*. No URL-form check on the thumbnail. | yes |
| Spec, test 2 (`… listing card images of qa529 articles …`) | listing card src absolute + 200. Skipped with "Blocked" when the list is 404 or shows no qa529 card. | yes |

Result: already re-baselined (JOB-20261022-13). No change was needed. Test 2 now also has the `@overlay` tag, so it runs in `npm run test:dev:overlay` (DSR-669 regression).
