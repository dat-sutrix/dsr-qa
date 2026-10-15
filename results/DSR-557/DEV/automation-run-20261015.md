# DSR-557 DEV automation run — 20261015

## 1. Header

- Run start (UTC): 2026-10-15T06:09:13Z
- Run end (UTC): 2026-10-15T06:12:14Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/{ja,en}/test-space/list-catalog`; `/master/{ja,en}/test-space/dsr-173-video-detail?id=sort-main|long`
- Build under test: not independently verified (no build ID exposed on publish)
- Baseline ID: none for DSR-557. Expected results come from JOB-20261015-04. TC titles were cross-checked with Drive `…動画・カタログ表示_v20261007_dev` (the dev draft; the QA edition was not found in the Drive folder).
- Automation HEAD commit SHA: `4ae69cd22a99e4fe0ed8db4e26a59c3674b8bcae`. The new DSR-557 spec, page objects and fixture were uncommitted in the working tree at run time and are committed with this report.
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job04.json npm run test:dev -- tests/catalog-video --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 22 | 6 | 1 | 15 | 1 | 2 | 1 configured; 1 used (DSR-CATV-006 en, failed again) | 3.0 min |

Counts are unique tests, not attempts. All outcomes are proposed automated outcomes only; human QA confirms them.
Scope/browser: subset `tests/catalog-video` (new spec only), Chromium. Flaky outcomes: 0.

## 4. Executed tests

Durations are per attempt.

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-012 | ja › DSR-CATV-012 catalog item shows thumbnail and title | passed | 2.8s | — |
| DSR-CATV-013 | ja › DSR-CATV-013 PDF item without form opens in a new tab | passed | 7.3s | — |
| DSR-CATV-016 | ja › DSR-CATV-016 e-book item opens ebookUrl without form | passed | 5.0s | — |
| DSR-CATV-001 | en › DSR-CATV-001 no autoplay before click | passed | 7.3s | — |
| DSR-CATV-002 | en › DSR-CATV-002 YouTube embed src after click (sort-main) | passed | 5.2s | — |
| DSR-CATV-002 | en › DSR-CATV-002 YouTube embed src after click (long) | passed | 6.3s | — |
| DSR-CATV-006 | en › DSR-CATV-006 no YouTube/Youku request before interaction | failed | 7.4s / 9.1s (retry) | poster `img.youtube.com/vi/irFRtAVphCY/maxresdefault.jpg` is requested on page load before any click |

## 5. Skipped tests

All skips are runtime `test.skip` calls (blocked: no DEV data). None counts as passed.

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATV-017 (ja) | Blocked – no DEV data for ebook requiresForm=true item (ja) |
| DSR-CATV-018 (ja) | Blocked – no DEV data for NEW case (ja, today 2026-10-15); all items' labels match the rule |
| DSR-CATV-019 (ja) | Blocked – no DEV data for UPDATE case (ja, today 2026-10-15); all items' labels match the rule |
| DSR-CATV-020 (ja) | Blocked – no DEV data for publishDate and updateDate both within 10 days (ja, today 2026-10-15); all items' labels match the rule |
| DSR-CATV-001 (ja) | Blocked – no DEV data for ja video page (/master/ja/test-space/dsr-173-video-detail?id=sort-main HTTP 404) |
| DSR-CATV-002 (ja, sort-main) | Blocked – no DEV data for ja video page (/master/ja/test-space/dsr-173-video-detail?id=sort-main HTTP 404) |
| DSR-CATV-002 (ja, long) | Blocked – no DEV data for ja video page (/master/ja/test-space/dsr-173-video-detail?id=long HTTP 404) |
| DSR-CATV-006 (ja) | Blocked – no DEV data for ja video page (/master/ja/test-space/dsr-173-video-detail?id=sort-main HTTP 404) |
| DSR-CATV-012 (en) | Blocked – no DEV data for en catalog page (/master/en/test-space/list-catalog HTTP 404) |
| DSR-CATV-013 (en) | Blocked – no DEV data for en catalog page (/master/en/test-space/list-catalog HTTP 404) |
| DSR-CATV-016 (en) | Blocked – no DEV data for en catalog page (/master/en/test-space/list-catalog HTTP 404) |
| DSR-CATV-017 (en) | Blocked – no DEV data for en catalog page (/master/en/test-space/list-catalog HTTP 404) |
| DSR-CATV-018 (en) | Blocked – no DEV data for en catalog page (/master/en/test-space/list-catalog HTTP 404) |
| DSR-CATV-019 (en) | Blocked – no DEV data for en catalog page (/master/en/test-space/list-catalog HTTP 404) |
| DSR-CATV-020 (en) | Blocked – no DEV data for en catalog page (/master/en/test-space/list-catalog HTTP 404) |

## 6. Failed tests

### DSR-CATV-006 — en › DSR-CATV-006 no YouTube/Youku request before interaction

- Failing assertion: `expect(before).toEqual([])` — `tests/catalog-video/DSR-557.catalog-video.spec.ts:152`
- Expected: no request to youtube/youku domains (`youtube.com`, `youtube-nocookie.com`, `youtu.be`, `ytimg.com`, `youku.com`, `ykimg.com`, including subdomains) before scroll or click.
- Actual: `["https://img.youtube.com/vi/irFRtAVphCY/maxresdefault.jpg"]`, which is the facade poster `<img loading="eager" fetchpriority="high">`. Before the click there was no iframe (soft check passed). The embed iframe was created only after the click (`https://www.youtube.com/embed/irFRtAVphCY?rel=0&start=38&autoplay=1&playsinline=1`).
- Attempt(s): failed on the initial attempt and on retry #1 with the same value.
- Evidence paths: `test-results/catalog-video-DSR-557.cata-14d6b--request-before-interaction-chromium/test-failed-1.png` (+ `-retry1/`, `trace.zip`). A copy is committed at `ykk-dsr/hub/results/JOB-20261015-04/evidence/DSR-CATV-006_en.png`. That screenshot was taken after the click, at test end.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**. Later runs may overwrite these local files.

## 7. Open points for QA

- DSR-CATV-006: the poster thumbnail is fetched from `img.youtube.com` on load. The job's expected result ("no request to youtube/youku domains") counts this as a failure. If DSR-109's facade policy allows a YouTube-hosted poster and only forbids the player/iframe, the TC wording needs clarification. Also, the player is in the first view, but the Excel precondition asks for it to be below the first view.
- Video TCs run on the DSR-173 video-detail block (`?id=` switches the Movie CF). No standalone DSR-557 video-player block was found on DEV, and `/ja/library/video/search` returns 404.
- DSR-CATV-013: in headless Chromium, the popup URL read as empty (PDF viewer/download handling). The result rests on the network response for the clicked href (200, `application/pdf`, `content-disposition: inline`) and on the original tab staying unchanged. A visible PDF viewer and the absence of a downloaded file were not verified.
- DSR-CATV-016: `ebookUrl` is a placeholder (`https://translate.google.com/`). "No form" counts `<form>` elements on that page (0). This was not verified against a real e-book viewer.
- DSR-CATV-018/019/020: both items are 42 days old, and no label is shown, which matches the rule. Positive cases are blocked. The date shown in the DOM (`2026.09.03`) does not indicate whether it is the publish or update date. "Today" = Asia/Tokyo date (assumption).
- DSR-CATV-012: only title and thumbnail load are asserted. Date/type are recorded but not compared against Figma C09.
- Not covered: Youku (no Youku CF), DAM movie, and the en catalog and ja video pages (404).
