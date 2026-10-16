# JOB-ZZ-IDLE-04 — DEV visual baseline
UTC: 2026-10-16T10:48:45.806Z to 2026-10-16T10:52:32.093Z; Chromium 153.0.8010.12.
Base URL: https://main--dsr-eds-dev--sutrix-projects.aem.live
Full-page captures at 1440×900 and 390×844; network idle + 1 second before each screenshot.
22 page/viewport targets: 19 PNG captures (3374308 bytes), 2 HTTP 404 skips, 1 capture error. No verdicts.
Scroll widths below are desktop/mobile CSS px; viewport widths are 1440/390. Raw URLs, HTTP status, retries and evidence paths: [captures.json](captures.json).
| Page | HTTP desktop/mobile | Scroll width desktop/mobile | Capture notes |
|---|---|---|---|
| /master/ja/test-space/dsr552-bc/child/grandchild | 200/200 | 1440/390 | Both captured |
| /master/en/test-space/dsr552-bc/child/grandchild | 200/200 | 1440/390 | Both captured |
| /master/ja/test-space/dsr552-edge/long/leaf | 200/200 | 1456/390 | Desktop overflow flagged: +16 px |
| /master/ja/test-space/list-catalog | 200/200 | 1440/390 | Both captured |
| /master/en/test-space/list-catalog | 200/200 | 1440/390 | Both captured |
| /master/en/test-space/dsr-173-video-detail | 200/200 | 1440/390 | Both captured |
| /master/en/test-space/dsr-278-product-detail | 200/200 | 1440/not measured | Desktop captured on retry; mobile network idle timed out at 60 s and 120 s; no mobile PNG/width |
| /master/ja/test-space/product-list | 200/200 | 1440/390 | Both captured |
| /master/en/test-space/product-list | 404/404 | not measured/not measured | Both skipped: HTTP 404 |
| /master/ja | 200/200 | 1440/390 | Both captured |
| /master/en | 200/200 | 1440/390 | Both captured |
No npm test suite, TypeScript check, Figma comparison or Lighthouse run: capture-only job. Timeout cause not verified; no content changes.
