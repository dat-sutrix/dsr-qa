# JOB-20261020-01
DEV ja: PC 1440×900 and SP 375×812; six PNGs captured and visually inspected.
Capture-integrity checks: 2 passed; no visual QA verdict assigned.
Load + fonts + 2 seconds, then active width stable for 500 ms; rects identical before/after every PNG.
- DSR-ECO-014_DEV_01.png: expanded active card visible in PNG: yes.
- DSR-ECO-014_DEV_02.png: expanded active card visible in PNG: yes.
- DSR-ECO-014_DEV_03.png: expanded active card visible in PNG: yes.
- DSR-ECO-014_DEV_04.png: expanded active card visible in PNG: yes.
- DSR-ECO-016_DEV_01.png: expanded active card visible in PNG: yes.
- DSR-ECO-016_DEV_02.png: expanded active card visible in PNG: yes.
PC indices 0 → 1 → 4; fullPage uses index 4 and animations disabled.
PC active 443×556; neighbours 150×506 at y+25; gap 8; arrow rects 60×60 at x=40/1340.
Observed 9 dots (job baseline says 8); recorded only, no verdict.
SP index 0 → 1 after swipe; active 343×609, scrollWidth 375 in both captures.
PC sticky header overlaps card tops; fullPage header appears at the retained scroll position.
Rect coordinates are viewport-relative; add recorded scrollY for fullPage document coordinates.
Before/after samples bracket screenshot; browser APIs do not guarantee an atomic screenshot/DOM sample.
PNG total 4,210,194 bytes (<5 MB); build and original Figma file not independently verified.
