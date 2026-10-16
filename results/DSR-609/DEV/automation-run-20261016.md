# DSR-609 DEV automation run — 20261016

## 1. Header

- Run start (UTC): 2026-10-16T04:49:34Z
- Run end (UTC): 2026-10-16T04:52:58Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live. `/ja/top-page` returned HTTP 404 there; the job-allowed fallback https://main--dsr-eds-dev--sutrix-projects.aem.page served HTTP 200 and was used for ja. `/en/top-page` returned 200 on .aem.live and was used for en.
- Target page(s): /ja/top-page, /en/top-page
- Build under test: not independently verified.
- Baseline ID: DSR-609 BL-v1 (DSR-196 BAC 1–5 + 技術完了条件 1–6; adopted dev TC file, see docs/DSR-609/baseline-BL-v1.md). Job JOB-20261015-13.
- Automation HEAD commit SHA: 78407f336fe142abb53eb2ff759b6921305e593b (new spec, page object and fixture uncommitted during the run).
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/s609/run.json npm run test:dev -- tests/top/DSR-609.top.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors (empty output).

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 12 | 3 | 9 | 0 | 1 | 2 | 1 configured; 9 actual (all retries failed) | 200.7s |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/top/DSR-609.top.spec.ts` (DSR-TOP-004…009 × ja/en), project chromium, PC 1440×900 (TOP-007 also 390×844). Flaky outcomes: 0.

## 4. Executed tests

Duration = initial attempt + retry (seconds). Every failure reproduced identically on retry.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-TOP-004 | [ja] quick search hover style and keyword search navigates to product search | failed | 6.2 + 4.5 | Hover changes only border colour (no text/background change); /ja/search-result?q=zipper HTTP 404 |
| DSR-TOP-005 | [ja] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 4.9 + 13.7 | border-radius 0px on card/media/img; card 1 has no link (href null) |
| DSR-TOP-006 | [ja] NEWS shows the 3 newest items by publish date | failed | 12.3 + 11.9 | Page requests /query-index.json, not /ja/news/query-index.json (404); items 2–3 are not the newest by publicationdate |
| DSR-TOP-007 | [ja] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 9.8 + 6.6 | At 390 px titles render 2 lines (line-clamp 2), expected ≤ 1 |
| DSR-TOP-008 | [ja] NEWS with empty query-index renders without error | failed (test defect, see rerun) | 5.6 + 5.6 | Counted the console 404 of the .aem.live preflight attempt; fixed and rerun passed (automation-run-20261016-tc008.md) |
| DSR-TOP-009 | [ja] main visual image is eager and is the LCP element | passed | 6.5 | — |
| DSR-TOP-004 | [en] quick search hover style and keyword search navigates to product search | failed | 6.5 + 4.5 | Same as ja; /en/search-result?q=zipper HTTP 404 |
| DSR-TOP-005 | [en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link | failed | 4.9 + 4.3 | Same as ja |
| DSR-TOP-006 | [en] NEWS shows the 3 newest items by publish date | failed | 10.5 + 8.6 | Same as ja (/en/news/query-index.json 404) |
| DSR-TOP-007 | [en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP | failed | 7.3 + 7.5 | Same as ja |
| DSR-TOP-008 | [en] NEWS with empty query-index renders without error | passed | 7.7 | — |
| DSR-TOP-009 | [en] main visual image is eager and is the LCP element | passed | 7.9 | — |

## 5. Skipped tests

None.

## 6. Failed tests

Evidence: failure screenshots copied to `ykk-dsr/hub/results/JOB-20261015-13/evidence/DSR-TOP-00N_<lang>.png` (committed). Originals, traces and the `observed` JSON attachments are under `test-results/top-DSR-609.top-*` and `playwright-report/` (gitignored, **not committed**; overwritten by later runs — the tc008 rerun already replaced `test-results/`).

### DSR-TOP-004 — [ja]/[en] quick search hover style and keyword search navigates to product search

- Failing assertions: `expect.soft(changed, 'text/background colour changes on hover').not.toEqual([])` — `tests/top/DSR-609.top.spec.ts:40`; `expect(nav.status(), …).toBe(200)` — `tests/top/DSR-609.top.spec.ts:51`
- Expected: text or background colour changes on hover; keyword search lands on product search page with HTTP 200.
- Actual: before/after hover — form: color rgb(255,255,255), background rgb(255,255,255) unchanged, border rgb(232,232,232) → rgb(0,130,190); title rgb(180,180,180) and input rgb(22,22,22) unchanged. Form action `/{lang}/search-result`; navigation to `…/ja/search-result?q=zipper` (.aem.page) and `…/en/search-result?q=zipper` (.aem.live) returned HTTP 404.
- Attempt(s): failed / failed (identical).
- Evidence paths: ykk-dsr/hub/results/JOB-20261015-13/evidence/DSR-TOP-004_ja.png, …/DSR-TOP-004_en.png

### DSR-TOP-005 — [ja]/[en] RECOMMEND CONTENTS ≤ 4 cards, same image ratio, rounded corners, card-wide link

- Failing assertions: `expect.soft(rounded, 'card N border-radius > 0 …').toBe(true)` — `tests/top/DSR-609.top.spec.ts:83`; `expect.soft(h, 'card 1 <part> is inside a link with a non-empty href').toBeTruthy()` — `tests/top/DSR-609.top.spec.ts:87`
- Expected: border-radius > 0 on card or image; image, title and description of card 1 inside the same non-empty, non-`#` link.
- Actual: 4 cards (≤ 4 passed), all images 320×214 (ratio 1.495, spread 0 — passed). border-radius 0px on `.top-recommend-card`, `.top-recommend-media` and `img` for all 4 cards. Cards are `<div class="top-recommend-card">` with no `<a>` ancestor/child: href null for image, title and description; clicking the image did not navigate (exploration).
- Attempt(s): failed / failed.
- Evidence paths: …/evidence/DSR-TOP-005_ja.png, …/DSR-TOP-005_en.png

### DSR-TOP-006 — [ja]/[en] NEWS shows the 3 newest items by publish date

- Failing assertions: `expect.soft(requestedPaths, 'page requests /{lang}/news/query-index.json').toContain(…)` — `tests/top/DSR-609.top.spec.ts:124`; `expect.soft(shownDates…, 'publish dates of shown items (desc)').toEqual(…)` — `tests/top/DSR-609.top.spec.ts:129`
- Expected: NEWS fetched from `/{lang}/news/query-index.json`; 3 items = 3 newest rows by publish date desc; links 200.
- Actual: requested index = `/query-index.json?_=<ts>` (site root); `/{lang}/news/query-index.json` HTTP 404 on both hosts, so expected rows were taken from the requested root index filtered to `/{lang}/news/` (ja 18 rows, en 9 rows). Shown (ja and en): news-7 (2027-01-06), news-9, news-8 — news-9/news-8 have empty `publicationdate` (displayed 2026.06.25, apparently from lastModified). Expected by publicationdate — ja: news-7, then binh-test3 / sustainability-report (2026-06-19); en: news-7, then two of news-2/news-4/news-5/news-6 (2026-06-25). Count 3 passed; all 3 item links HTTP 200 passed.
- Attempt(s): failed / failed.
- Evidence paths: …/evidence/DSR-TOP-006_ja.png, …/DSR-TOP-006_en.png

### DSR-TOP-007 — [ja]/[en] NEWS title clamp PC 2 lines / SP 1 line, image ratio PC = SP

- Failing assertion: `expect.soft(m.lines, 'SP item N title lines ≤ 1').toBeLessThanOrEqual(1)` — `tests/top/DSR-609.top.spec.ts:160`
- Expected: at 390 px an overflowing title is limited to 1 line with ellipsis.
- Actual: 390 px: all 3 titles need 2 lines unclamped and render 2 lines (line-height 18px, height 36px, `-webkit-line-clamp: 2`). PC 1440 px: all titles fit in 1 line (`line-clamp: none`) → PC 2-line clamp **not exercised**. News image box ratio PC 213×121 (1.760) vs SP 148×84 (1.762) → within 1%, passed.
- Attempt(s): failed / failed.
- Evidence paths: …/evidence/DSR-TOP-007_ja.png, …/DSR-TOP-007_en.png (taken at 390 px)

### DSR-TOP-008 — [ja] NEWS with empty query-index renders without error (test defect)

- Failing assertion: `expect.soft(relevant, 'console / page errors').toEqual([])` — `tests/top/DSR-609.top.spec.ts:189` (as run; line 191 after the fix)
- Expected: no console error.
- Actual: the only asserted error was `Failed to load resource: … 404` with location `https://main--dsr-eds-dev--sutrix-projects.aem.live/ja/top-page`, i.e. the preflight attempt before the .aem.page fallback — not an error of the rendered page. The test now ignores 404 preflight URLs; rerun passed (see automation-run-20261016-tc008.md). Not counted as a product failure.
- Attempt(s): failed / failed (identical cause).
- Evidence paths: none committed (test defect).

## 7. Open points for QA

- ja ran on .aem.page (live 404, blocker B3); en ran on .aem.live. Results for ja are on the preview tier.
- TOP-004: the TC (JP) says 「文字背景記述がホワイトになり」; the observed hover only changes the border colour to rgb(0,130,190). The test asserts the job's "text/background style changes"; QA to judge whether the border change satisfies the design. Search destination `/{lang}/search-result` is 404 — product search page may simply not be on DEV yet (suspect data/env), or the action URL is wrong (product).
- TOP-006: index path differs from the TC (root `/query-index.json` vs `/{lang}/news/query-index.json`, which does not exist). Rows without `publicationdate` are shown ahead of dated rows; whether undated rows should be excluded or fall back to lastModified is not defined by the baseline — question for dev/PM.
- TOP-007: PC 2-line clamp not exercised (no title long enough at 1440 px) → Pending for the PC part. SP renders 2 lines vs expected 1.
- TOP-008: en and ja (rerun) show "現在、お知らせはありません。" / "There is no news at the moment."; no console error other than the pre-existing `/placeholders.json` 404 (excluded as unrelated, present on every load). Empty-state content still undefined (Q10). The mock intercepted every `query-index.json` request, so breadcrumb/other consumers also saw an empty index.
- TOP-009: hero image `loading="eager"`, `fetchpriority="high"`, LCP entry = hero image (`…media_1906…png?width=2000&format=webply`) in headless Chromium, 1440×900, no throttling. PSI not measured here (JOB-14).
- Recorded, not asserted: en page "VIEW ALL NEWS" links to `/ja/news`; en recommend/hero texts are Japanese.
- Build identity not verified; TD-609-01…04 not created on DEV — dev-authored content used.
