# JOB-ZZ-IDLE-38 — DEV viewport baseline
Run: 2026-10-22T15:54:13.740Z → 2026-10-22T15:56:26.706Z; base: https://main--dsr-eds-dev--sutrix-projects.aem.live.
Captured 50 viewport PNGs across six paths × PC 1440×900 / SP 390×844; scroll step 700 px, final position clamped to bottom.
Evidence: evidence/baseline-20261023/; raw URLs, HTTP statuses, DOM, image sources and scroll measurements: results/JOB-ZZ-IDLE-38/measurements.json.
| Path | Size | HTTP | Cards | Overflow px | Broken images | Proposed result |
|---|---|---|---|---|---|---|
| /ja/library/catalog | PC | 200 | 0 | 0 | 0 | Fail |
| /ja/library/catalog | SP | 200 | 0 | 0 | 0 | Fail |
| /master/ja/library/article/stories/qa529-01 | PC | 200 | 7 | 0 | 0 | Pass (checks only) |
| /master/ja/library/article/stories/qa529-01 | SP | 200 | 7 | 0 | 0 | Pass (checks only) |
| /ja/library/video/search | PC | 200 | 5 | 0 | 0 | Pass (checks only) |
| /ja/library/video/search | SP | 200 | 5 | 0 | 0 | Pass (checks only) |
| /en/library/catalog | PC | 200 | 6 | 0 | 0 | Fail |
| /en/library/catalog | SP | 200 | 6 | 0 | 0 | Fail |
| /master/en/library/article/stories/qa529-01 | PC | 200 | 7 | 0 | 0 | Pass (checks only) |
| /master/en/library/article/stories/qa529-01 | SP | 200 | 7 | 0 | 0 | Pass (checks only) |
| /en/library/video/search | PC | 200 | 12 | 0 | 0 | Pass (checks only) |
| /en/library/video/search | SP | 200 | 12 | 0 | 0 | Pass (checks only) |
Catalog counts: ja 0 vs expected 6 (catalog block absent); en 6 vs expected 5. All four failures: cause=none, suspect=data, product-bug confidence=50%; deployment/publication state unverified.
TypeScript: npx tsc --noEmit exit 0, no errors. Capture: node results/JOB-ZZ-IDLE-38/run.cjs; no npm test suite. HEAD 1ab2f58aab450b309a81edc7f36ed0434cbbfb3f.
