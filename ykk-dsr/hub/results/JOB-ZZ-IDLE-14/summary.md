# JOB-ZZ-IDLE-14 — record only
Status: done; DEV branch preview; BL-OVL-1. Pass means recorded, not a QA verdict.
English product and video: HTTP 200; main content visible at 1440×900 and 390×844 after load + 10 s.
Japanese /ja/products/46: HTTP 404; status-only record; no screenshot or Lighthouse, as instructed.
Video related cards: 5; DOM order: video title rel1, video title rel2, video title rel3, video title rel4, video title rel5.
Related-card media areas are blank; recorded without verdict.
12 Lighthouse runs; category medians below (Performance / Accessibility / Best Practices / SEO).

| Page | Device | Median P/A/BP/SEO |
|---|---|---|
| /en/products/46 | mobile | 81/83/96/61 |
| /en/products/46 | desktop | 92/78/96/61 |
| /en/library/video/qa501-main-a | mobile | 98/100/96/69 |
| /en/library/video/qa501-main-a | desktop | 99/90/96/69 |

Top 3 failing audits per page/device and individual run measurements: result.json.
Four successful full-page PNGs remain in gitignored test-results/JOB-ZZ-IDLE-14; no PNGs committed.
TypeScript exit 0, no errors. No Figma comparison or product verdict; build identity not independently verified.
