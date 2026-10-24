# JOB-20261024-07 · claude-code · DSR-529 retest DSR-678 · DEV · done
**Proposed: Fail (still broken).** DSR-ARTICLE-005 [ja], run 2026-10-24 10:16–10:22Z, Playwright (Chromium), read-only.

| TC | Page(s) | Result | Cause | Confidence |
|---|---|---|---|---|
| DSR-ARTICLE-005 | qa529-01, -tc01, -r1, -r2, -r3 (live + page) | fail @1440, ok @390 | none | 95% |

No merge/incident-related fails (no NEW FAIL table needed).
- **Pages:** query-index has ja `qa529-01`, `-02`, `-tc01`, `-r1`, `-r2`, `-r3`. 5 pages have `class="profile author-profile"`. **qa529-02 has no profile block** (live + page, Last-Modified 23/10 07:24Z). JOB-20261023-23 actually measured qa529-01 (its result.json says "qa529-01, section 3"), so the job context naming qa529-02 is wrong. Codex IDLE-45 watched the right page.
- **1440px, live and page:** the two `.profile-text` boxes are identical (x480, w720, h23.8, same top/left, overlap 17136 px²): Company "会社名・部署名が入ります" over the bio. On qa529-tc01 the second text is "QA529 プロフィール" (that page's authored data). **390px:** no overlap (stacked 43.8px apart).
- **Assets unchanged:** `blocks/profile/profile.js` LM 08 Sep 11:14Z, ETag fda6497b…; `profile.css` LM 18 Sep 01:32Z, ETag a2720cfc…. Same on live and page, both older than 23/10 17:10Z. Only folder `blocks/profile` loads.
- **Codex "FIX DETECTED 08:55Z" is a false positive.** Overlap reproduces on the same page and the code has not changed.
- **Likely root cause (product, FE):** `profile.js` decorate() uses one counter for all text cells. The authored image cell is empty, so it has no `<picture>`, but it still uses up the `profile-name` slot before it is removed. Name → `.profile-company`, Company → `.profile-text`, bio → `.profile-text`. CSS puts every `.profile-text` in `grid-area: 4 / 2`, so the two overlap. Suggested fix: skip image-slot cells, or map cells by field rather than by position.
- Not verified: layout with an image set (no seeded data), and UE canvas (no Author access in this lane).
- Evidence: `evidence/DSR-ARTICLE-005_ja_<page>_live_1440.png` (5 files). The site header was hidden with CSS for the capture only, because the sticky header covered the block. Raw boxes and innerText for all 24 page×host×viewport combinations: `raw-boxes.json`.
- This was a one-off measurement script, not an `npm run test:*` run, so no root `results/` run report and no tsc check.
