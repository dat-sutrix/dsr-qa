# JOB-ZZ-IDLE-34 — DEV recapture
Read-only Chromium capture of Japanese TOP and Detail on .aem.live; all four navigations returned HTTP 200.
Captured 14 unmodified viewport PNGs at 1440×900 / 390×844: scrollY 0, 600, 1200 where reachable, plus exact page end.
Captured four full-page PNGs after injecting `header{position:static!important}`; these are explicitly modified reference views.
Captured SP TOP carousel controls at native 3× (1170×210 PNG); Detail has no eco carousel controls.
Evidence: `evidence/DSR-590/20261022/lf2/`; exact URLs, scroll positions, rectangles and timestamps: `measurements.json`.

| Page | Width | Breadcrumb section bottom | Hero top | Section gap | Nav bottom → hero gap (CSS px) |
|---|---:|---:|---:|---:|---:|
| TOP | 1440 | 190 | 230 | 40 | 53.109375 |
| TOP | 390 | 106 | 146 | 40 | 49 |
| Detail | 1440 | 190 | 190 | 0 | 13.109375 |
| Detail | 390 | 106 | 106 | 0 | 9 |

SP dot 9 right = 298 CSS px; next-button left = 334: 36 px clearance, no overlap.
Dot 9 is clipped by `.eco-carousel-dots` (right = 294, overflow-x: hidden): 4 of its 10 CSS px are clipped; see `dot9-clipping.json` and `top-390-controls-3x.png`.
Proposed findings: TOP gap persists (DSR-666); SP dot clipping persists but button-overlap explanation is incorrect. Each: cause=none, suspect=product, confidence=85%; human QA confirms.
Unmodified TOP y0 screenshot shows header above breadcrumb and visible hero title. Build revision and Figma baseline were not independently verified.
Capture command: `node ykk-dsr/hub/results/JOB-ZZ-IDLE-34/capture.cjs` (exit 0); `npx tsc --noEmit` exit 0, no TypeScript errors. No npm suite, Lighthouse, or interaction tests ran.
