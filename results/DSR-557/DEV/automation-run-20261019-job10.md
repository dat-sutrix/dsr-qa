# DSR-557 DEV automation run — 20261019-job10

## 1. Header

- Run start (UTC): 2026-10-19T04:15:37Z (tsc); Playwright start 2026-10-19T04:15:49Z
- Run end (UTC): 2026-10-19T04:18:35Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/ja/test-space/list-catalog`, `/master/en/test-space/list-catalog` (both HTTP 200)
- Build under test: not independently verified (no build ID exposed on publish)
- Baseline ID: none for DSR-557. Expected results come from the job file (JOB-20261016-10) and the spec as fixed in JOB-20261016-06. The Expected results were not changed.
- Automation HEAD commit SHA: `ffbdd067a37bb0503c55bac99f31f98ae238e88a` (run-only job, no code changes)
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job20261016-10.json npm run test:dev -- tests/catalog-video --project=chromium --grep "DSR-CATV-0(12|16|17)" --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 6 | 2 | 4 | 0 | 1 | 2 configured | 1 configured; 4 used (all 4 failures failed again on retry) | 166.1s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms. Scope: subset `tests/catalog-video`, grep `DSR-CATV-0(12|16|17)`, ja + en, Chromium. Flaky: 0.

## 4. Executed tests

Duration is per attempt (initial / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-012 | ja › catalog item shows thumbnail and title | passed | 11.9s | — (`QA190 PDF form required` not rendered, annotated) |
| DSR-CATV-016 | ja › e-book item opens ebookUrl without form | failed | 15.6s / 10.4s | `forms` on popup = 2 (expected 0); the popup is the external site after a redirect |
| DSR-CATV-017 | ja › e-book item flagged requiresForm opens ebookUrl without form | failed | 9.0s / 8.1s | same as 016 ja (forms = 2) |
| DSR-CATV-012 | en › catalog item shows thumbnail and title | passed | 21.1s | — (same annotation as ja) |
| DSR-CATV-016 | en › e-book item opens ebookUrl without form | failed | 15.9s / 14.1s | `forms` on popup = 1 (expected 0) |
| DSR-CATV-017 | en › e-book item flagged requiresForm opens ebookUrl without form | failed | 16.1s / 10.3s | same as 016 en (forms = 1) |

**DSR-CATV-012 (ja + en, identical results).** GraphQL `dm-catalog-list` returns 14 items: 12 qa190 items plus `catalog 01` and `catalog 02`. The page renders 13 cards. Each card has a non-empty title, a loaded thumbnail (naturalWidth 1200 for qa190, 220 for catalog 01/02) and one date in `.cards-card-meta`. 11 of 12 qa190 cards have a title, a thumbnail and a date. The exception is `QA190 PDF form required` (`requiresForm: true`, pdf). It is not rendered and is kept as the `not-rendered` annotation "suspect product or DSR-570 gate". Both e-book cards now render, dated 2026.09.15.

**E-book cards (016/017).** These values were read directly from the DOM with a separate read-only probe. In both languages, both qa190 e-book cards have 2 links: the title and the "e-book" CTA. Each link has `href="https://www.ykkfastening.com/"` (= `ebookUrl`), `target="_blank"`, `rel="noopener"` and no `download` attribute. GraphQL: `QA190 e-book` has `requiresForm: false`; `QA190 e-book form` has `requiresForm: true`.

## 5. Skipped tests

None. The conditional fixme on 016/017 did not apply, because both e-book cards now render.

## 6. Failed tests

### DSR-CATV-016 — e-book item opens ebookUrl without form (ja, en)

- Failing assertion: `expect(forms).toBe(0)` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:110`
- Expected: the popup page has 0 `<form>` elements.
- Actual: ja = 2, en = 1, on both attempts. Every assertion before this one passed:
  - card rendered once;
  - href = ebookUrl;
  - a popup opened;
  - a navigation request to exactly `https://www.ykkfastening.com/` was observed;
  - the original tab stayed on list-catalog.
- Where the forms come from:
  - `https://www.ykkfastening.com/` redirects to `https://ykkdigitalshowroom.com/en/`, an external site outside DSR (`popupUrl` in the observations).
  - A separate probe of `https://www.ykkfastening.com/` found 2 `<form>` elements. That probe landed on `https://ykkdigitalshowroom.com/?utm_source=ykkfastening&utm_medium=redirect&utm_campaign=dsr_f3` rather than `/en/`. One is a site search modal (`form.libraryNav__modal`, single text input "SEARCH"). The other is a hidden webfont loader (`action=https://webfont.fontplus.jp/accessor/reql`, hidden inputs only).
  - The count differs by run (1 vs 2), probably because of how far the external page had loaded (the popup screenshot shows a loading spinner). This was not verified.
  - Neither form is a lead or download gate form.
- Suspect: **test**. The assertion counts any `<form>` on a third-party page, so it cannot tell a gate form from a search or font form. The test was not changed: the job is run-only, with no Expected changes. Claude decides.
- Attempt(s): failed / failed on retry, with the same values.
- Evidence (committed): `ykk-dsr/hub/results/JOB-20261016-10/evidence/DSR-CATV-016_{ja,en}.png` (list page) and `..._popup.png` (popup at failure). Full Playwright output, including traces: `test-results/catalog-video-DSR-557.cata-99949-…` (ja) and `…-c25ff-…` (en). These are gitignored and not committed.

### DSR-CATV-017 — e-book item flagged requiresForm opens ebookUrl without form (ja, en)

- Failing assertion: `expect(forms).toBe(0)` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:110`
- Expected: the popup page has 0 `<form>` elements, even with `requiresForm: true`.
- Actual: ja = 2, en = 1. Navigation went straight to `https://www.ykkfastening.com/`, with no DSR form shown before it, then redirected to `https://ykkdigitalshowroom.com/en/`. Everything else is as in 016.
- Suspect: **test** (same reason as 016). The product behaviour this TC targets, opening the ebookUrl without a DSR form even though `requiresForm=true`, looks correct from the observed navigation.
- Attempt(s): failed / failed on retry, with the same values.
- Evidence (committed): `ykk-dsr/hub/results/JOB-20261016-10/evidence/DSR-CATV-017_{ja,en}.png`, `..._popup.png`. Playwright output: `test-results/catalog-video-DSR-557.cata-e2823-…` (ja) and `…-a1b55-…` (en). These are gitignored and not committed.

## 7. Open points for QA

- **016/017 form check.** One option is to check only for a DSR form before navigation, or a form on a DSR origin, instead of any `<form>` on the external target. Another option is a different ebookUrl test value that does not redirect to a page with forms. Either is Claude's call. The tests were not changed.
- **QA190 PDF form required** is still not rendered in either language (cause unknown; suspect product or DSR-570 gate). 012 records it as an annotation, not a failure.
- **Extra: TD-190-03/04** (record only, no spec). DEV GraphQL `ykk/dm-movie-list` (publish) returns both items:
  - `qa190-mv-dam`: path `/content/dam/ykk/common/product-cf/test/qa-190-mv-dam`, movieSource `dam`, publishDate 2026-09-15.
  - `qa190-mv-empty`: path `…/test/qa190-mv-empty`, movieSource `youtube`, movieSourceId `null`, publishDate 2026-09-15.
  - Both render through `/master/{ja,en}/test-space/dsr-173-video-detail?id=<movieId>` (HTTP 200, both languages):
    - `qa190-mv-dam`: player rendered with `<video src=".../test/video/sample-4.mp4">`, h1 "Movie title".
    - `qa190-mv-empty`: h1 "Movie title qa190-mv-empty", no player, no video, no iframe, no error message.
  - Neither appears on `/master/ja/test-space/video-list`, which shows 12 cards (en video-list = 404).
  - So the note "blocked-data: no page binds TD-190-03/04" does **not** apply. The id-based video-detail page renders them. This is input for TC 004/005; the result was not asserted.
- `dsr-video-page;path=…` with the qa190 movie paths returned empty `inactive` / `related` lists. These are only the related-video and inactive sub-queries, not a failure.
- Build identity and Author-side CF values were not independently verified. Values come from the publish GraphQL responses.
