# JOB-20261015-14 — done
DEV Chromium: four full-page captures, Japanese and English, PC 1440×900 and SP 390×844.
Primary .aem.live returned 404 for both languages; the allowed .aem.page fallback returned 200.
English was captured because the fallback exists; the 404 skip applies only when neither host serves it.
All four page-width checks passed: PC 1440px; SP 390px.
All four section orders: main visual → quick search → RECOMMEND CONTENTS → NEWS.
English PC text overflow: “Site Update Information”, scrollWidth 122px > clientWidth 90px (suspect product).
Other captures had no detected direct-text horizontal overflow; carousel/container overflow is listed in layout JSON.
Layout versus Figma: captured only; no pixel baseline or visual verdict.
Lighthouse desktop: performance 94, LCP 0.699s; recorded only.
Lighthouse mobile: performance 87, LCP 1.822s; recorded only.
LCP element selectors and settings are in lighthouse-summary.json.
TypeScript: exit 0, no errors. Playwright: 4 passed, 0 failed, 0 skipped; no retries.
PNG evidence is committed as specifically required by this job (about 3.4 MiB total).
Build identity and Figma compliance were not independently verified. Outcomes are proposals for QA.
