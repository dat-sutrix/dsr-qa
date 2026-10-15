# DSR-557 DEV automation run — 20261015-job07

## 1. Header

- Run start (UTC): 2026-10-15T06:22:35Z
- Run end (UTC): 2026-10-15T06:22:45Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live
- Target page(s): `/master/en/test-space/dsr-173-video-detail?id=sort-main` (ja variant `/master/ja/...` included by the spec loop)
- Build under test: not independently verified (no build ID exposed on publish)
- Baseline ID: none for DSR-557. Expected result comes from JOB-20261015-07 (QA decision 2026-10-15, DSR-109 facade pattern).
- Automation HEAD commit SHA: `fdd1764eb513e5c8b7200b7b17050d79b1985832`. The refined DSR-CATV-006 assertion (`tests/catalog-video/DSR-557.catalog-video.spec.ts`, `fixtures/dsr-557.ts`) was uncommitted at run time and is committed with this report.
- Exact command used:

```sh
PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/job07.json npm run test:dev -- tests/catalog-video --project=chromium --grep "DSR-CATV-006"
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 2 | 1 | 0 | 1 | 0 | 1 | 1 configured; 0 used | 7.4s (≈10s incl. npm startup) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset `tests/catalog-video` grep `DSR-CATV-006`, Chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (single attempt).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-CATV-006 | en › DSR-CATV-006 no YouTube/Youku request before interaction | passed | 3.2s | — |

Observed (en, attachment `observed`):
- Requests to youtube/youku domains before interaction: `https://img.youtube.com/vi/irFRtAVphCY/maxresdefault.jpg` only (facade thumbnail, allowed).
- Embed/player requests before interaction: none. iframes before interaction: none (0 iframes of any origin).
- After click: iframe src `https://www.youtube.com/embed/irFRtAVphCY?rel=0&start=38&autoplay=1&playsinline=1`.

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-CATV-006 (ja) | Blocked – no DEV data for ja video page (/master/ja/test-space/dsr-173-video-detail?id=sort-main HTTP 404) |

## 6. Failed tests

None.

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**.

## 7. Open points for QA

- Assertion change (in place, comment `// DSR-109 facade: thumbnail allowed (QA decision 2026-10-15)`): before the click, 0 iframes (any origin) and 0 requests matching `fixtures/dsr-557.ts` `playerRequests` (`*youtube.com/embed`, `*youtube-nocookie.com`, `www.youtube.com/(s/|iframe_api|player)`, `player.youku.com`, `*.ytimg.com/yts/`). After click the iframe src must match `^https://(www.)?youtube(-nocookie)?.com/embed/`. `img.youtube.com` / `i.ytimg.com` thumbnails are recorded but not asserted. No other test changed.
- Interpretation: `www.youtube.com/s` is matched as the `/s/` path prefix (player JS), so an unrelated path such as `/search` would not count. Nothing like that was requested in this run.
- The 0-iframe and 0-player-request checks are `expect.soft`, so both are reported if both fail. The after-click src check is a hard assertion.
- "Before any click/scroll": the test does not scroll; it waits for `networkidle` and then takes the snapshot. The player is in the first view, so lazy loading triggered by scroll was not exercised (the Excel precondition asks for below-the-fold; not tested).
- ja not covered (video page 404 on DEV). Youku not covered (no Youku Movie CF on DEV).
- No screenshot committed: the hub protocol requires evidence only for failed tests.
