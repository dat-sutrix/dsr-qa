# JOB-20261019-09 — done
DEV ja demo: HTTP 200 in Chromium 153.0.8010.12; PC 1440×900, iPhone 13 emulation overridden to 375×812.
DSR-ECO-014: captured; schema pass means capture completion, not a visual QA verdict.
PC hero x/y/w/h = 0/230/1440/947.390625 px; active 443×556, inactive width 150, gap 8 px.
Heading 24px / 40.8px line-height; card heading 24px / normal; summary 16px; VIEW MORE 237×44 px.
Inactive labels: vertical-rl, transform none, rotate none; Next changes index 0→1.
DSR-ECO-016: proposed PASS for scrollWidth 375 ≤ 375. Arrow 0→1 and touch swipe 1→2 both work.
SP active card x=16, right=359, 343×609 px: horizontal fit in all recorded states.
At initial scrollY=0, card y=340.390625, bottom=949.390625: not fully inside 812px height.
After scrolling for swipe, card y=0.390625, bottom=609.390625: full geometric viewport fit.
No automated assertions failed; no Figma visual verdict made. Build identity unverified; Q36 SP design missing.
A8 temporary image content excluded from judgment. Exact rectangles/text/styles: pc-facts.json and sp-facts.json.
Evidence: 014_DEV_01 full PC; 014_DEV_02 initial carousel; 014_DEV_03 after Next; 016_DEV_01 full SP (all names prefixed DSR-ECO-).
Fourth PNG is necessary to satisfy three PC captures plus one SP capture; total evidence <5 MB.
TypeScript: exit 0, no errors. Tests: 2 passed, 0 failed/skipped, retries 0; outcomes proposed only.
