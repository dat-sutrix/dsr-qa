# JOB-ZZ-IDLE-16 — DEV comparison with JOB-ZZ-IDLE-04
UTC: 2026-10-19T04:53:02.682Z to 2026-10-19T04:56:55.542Z; Chromium 153.0.8010.12 (baseline 153.0.8010.12).
Base URL: https://main--dsr-eds-dev--sutrix-projects.aem.live; full-page 1440×900 / 390×844; network idle + 1 s.
22 targets: 18 captured, 2 HTTP 404 skips, 2 capture errors; 18 compared; 4 above 2%; 1618513 PNG bytes committed. No verdicts.
Diff = exact RGBA changed pixels / maximum image rectangle; unmatched dimensions count as changed; no masks/tolerance.
Values below are desktop/mobile; N/A means no comparison. Raw HTTP status, final URLs, dimensions, scrollWidth, attempts and evidence: [result.json](result.json).
| Page | HTTP | Diff % | scrollWidth | Capture status |
|---|---|---|---|---|
| /master/ja/test-space/dsr552-bc/child/grandchild | 200/200 | 0.102433/0.000000 | 1440/390 | captured/captured |
| /master/en/test-space/dsr552-bc/child/grandchild | 200/200 | 0.000241/0.000000 | 1440/390 | captured/captured |
| /master/ja/test-space/dsr552-edge/long/leaf | 200/200 | 1.290513/0.000000 | 1440/390 | captured/captured |
| /master/ja/test-space/list-catalog | 200/200 | 23.405880/21.685638 | 1440/390 | captured/captured |
| /master/en/test-space/list-catalog | 200/200 | 23.404846/21.682896 | 1440/390 | captured/captured |
| /master/en/test-space/dsr-173-video-detail | 200/200 | 0.000096/0.000000 | 1440/390 | captured/captured |
| /master/en/test-space/dsr-278-product-detail | 200/200 | N/A/N/A | N/A/N/A | error/error |
| /master/ja/test-space/product-list | 200/200 | 0.000168/0.000000 | 1440/390 | captured/captured |
| /master/en/test-space/product-list | 404/404 | N/A/N/A | N/A/N/A | skipped/skipped |
| /master/ja | 200/200 | 0.081869/0.000000 | 1440/390 | captured/captured |
| /master/en | 200/200 | 0.000000/0.000000 | 1440/390 | captured/captured |
Only PNGs with diff > 2% committed. Product-detail network idle timed out at 60 s and 120 s on both viewports; widths/diffs unavailable. No overflow observed on captured pages. Rendering/dynamic-content variation may contribute; deploy cause not verified. No npm suite, TypeScript, Figma or Lighthouse run.
