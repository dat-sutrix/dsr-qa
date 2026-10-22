# JOB-ZZ-IDLE-33 — DEV proposed results
UTC 2026-10-22T02:29:54.172Z → 2026-10-22T02:35:27.075Z. Lighthouse 13.5.0; 16 sequential audits, default simulated throttling; video 3 runs/device, medians below.
Index: all 175/175 entries checked; qa529-01 JA/EN and qa529-02 JA use /master/. EN qa529-02 absent: both device audits blocked, not passed.
| Path | Device | Perf runs | Median perf | Accessibility | SEO | Best practices |
|---|---|---|---:|---:|---:|---:|
| /master/en/library/article/stories/qa529-01 | mobile | 48 | 48 | 95 | 69 | 100 |
| /master/en/library/article/stories/qa529-01 | desktop | 98 | 98 | 90 | 69 | 100 |
| /master/ja/library/article/stories/qa529-01 | mobile | 93 | 93 | 95 | 69 | 100 |
| /master/ja/library/article/stories/qa529-01 | desktop | 92 | 92 | 90 | 69 | 100 |
| /master/ja/library/article/stories/qa529-02 | mobile | 82 | 82 | 95 | 69 | 100 |
| /master/ja/library/article/stories/qa529-02 | desktop | 94 | 94 | 90 | 69 | 100 |
| /master/ja/test-space/dsr-590-eco-top-page | mobile | 92 | 92 | 95 | 61 | 100 |
| /master/ja/test-space/dsr-590-eco-top-page | desktop | 96 | 96 | 94 | 61 | 100 |
| /master/ja/test-space/dsr-590-eco-detail-page | mobile | 94 | 94 | 100 | 69 | 96 |
| /master/ja/test-space/dsr-590-eco-detail-page | desktop | 74 | 74 | 94 | 69 | 96 |
| /ja/library/video/qa587-main | mobile | 96/98/98 | 98 | 100 | 69 | 96 |
| /ja/library/video/qa587-main | desktop | 99/99/99 | 99 | 90 | 69 | 96 |
PC 1440/SP 390 captures + 2× control crops: evidence/DSR-590/20261022/lf/. PC shows nine dots; SP ninth dot clipped 4 CSS px (container right 294, dot right 298); next arrow starts 334. Cause=none; product-bug confidence=70% (demo data/design unverified).
Reference IDLE-31 perf target ≥95: below-target audits retained in lighthouse-summary.json (cause=none, product-bug confidence=60%; measurement alone does not establish product defect).
TypeScript: npx tsc --noEmit, exit 0, no errors. Build not independently verified; no Author access. Full metrics/discovery/geometry/result.json in ykk-dsr/hub/results/JOB-ZZ-IDLE-33/.
