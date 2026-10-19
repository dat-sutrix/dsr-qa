refreshed — page B Last-Modified: Fri, 16 Oct 2026 06:43:41 GMT.
Literal cutoff: 2026-10-16T06:43:00Z; delta +41 seconds, same minute.
This does not establish a later re-preview or retest readiness.
DEV only; read-only recording, no QA verdicts and no form submissions.
Japanese detail: HTTP 200; form visible at both widths, cover placeholder visible.
English detail: HTTP 404; status/headers only, no screenshots or Lighthouse.
Both catalog lists: HTTP 200; 13 cards each, same DOM order at both widths.
Page B: HTTP 200; five related cards, video title rel1 through video title rel5.
Six full-page catalog PNGs captured after load + 10 seconds at 1440x900 and 390x844.
Successful PNGs remain gitignored in test-results/JOB-ZZ-IDLE-15; no render-failure PNGs to commit.
Lighthouse 13.5.0: 18 runs, three per page/device; category medians below.
Page | Device | Performance / Accessibility / Best practices / SEO
/master/ja/test-space/dsr-570-catalog-detail | mobile | 83 / 96 / 100 / 61
/master/ja/test-space/dsr-570-catalog-detail | desktop | 95 / 90 / 100 / 61
/master/ja/test-space/list-catalog | mobile | 84 / 96 / 96 / 61
/master/ja/test-space/list-catalog | desktop | 94 / 89 / 96 / 61
/master/en/test-space/list-catalog | mobile | 84 / 96 / 96 / 61
/master/en/test-space/list-catalog | desktop | 97 / 89 / 96 / 61
Top three failing audits and per-run data are in result.json.
TypeScript: npx tsc --noEmit exited 0; no errors.
