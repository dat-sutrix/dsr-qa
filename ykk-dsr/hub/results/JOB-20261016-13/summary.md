# JOB-20261016-13 — done
DEV ja; Chromium PC 1440×900 and SP 375×812; HTTP 200 on both.
014: captured; no visual verdict. Order: h1 → catalog → fields → consent → centered rounded button.
PC catalog image left/text right; labels ABOVE inputs (expected left); all text inputs/selects 320px wide.
015: proposed PASS for explicit scroll criterion: scrollWidth=375px.
SP text inputs/selects 217px / form content 343px = 63.3%, below requested 90%; suspected product layout discrepancy.
SP button fully visible after scrolling; width 290px, x=42.5px.
019: Lighthouse mobile + desktop, three runs each; median scores below (record only).

| Device | Performance | Accessibility | Best Practices | SEO |
|---|---:|---:|---:|---:|
| mobile | 79.0 | 96.0 | 100 | 61.0 |
| desktop | 100 | 90.0 | 100 | 61.0 |

Playwright: 2 passed capture/scroll checks; TypeScript: exit 0, no errors.
Schema pass for 014 means capture completed; 019 means scores recorded, not design/score acceptance.
Both requested PNGs committed; measurements and Lighthouse summary included.
No form submission; thank-you/Figma comparison and build identity not verified.
Claude web / human QA confirms all visual outcomes.
Below-target audits include main-thread work (mobile), contrast/ARIA, missing meta description and blocked indexing.
