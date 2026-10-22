# DSR-664 DEV automation run — 20261022

## 1. Header

- Run start (UTC): 2026-10-22T02:31:25Z
- Run end (UTC): 2026-10-22T02:32:31Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (each test also runs on the .aem.page twin)
- Target page(s): `/master/en/test-space/drs21-aem-block-library`, `/en/product/application/fashion/fashion`, `/en/library/video/qa587-main`, `/en/products/46`
- Build under test: not independently verified. `blocks/video/video.js` on .live had `last-modified: Tue, 13 Oct 2026 04:00:00 GMT` and etag `47479cdfc36c0fdaa2cf56b7ff1c8137`.
- Baseline ID: none formal. The expected result comes from the bug report DSR-664 (Nakamoto) and the block's own contract: caption is optional, and an empty caption must render nothing.
- Automation HEAD commit SHA: e5d0c22e2752937df2eeeecc9ac569630fc2a84f (the spec was uncommitted in the working tree at run time)
- Exact command used:

```sh
DSR_JOB_EVIDENCE=/tmp/dsr664/shots PLAYWRIGHT_JSON_OUTPUT_NAME=/tmp/dsr664/run.json npm run test:dev -- tests/video-block/DSR-664.video-caption-null.spec.ts --project=chromium
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 | 3 | 3 | 2 | 1 | 2 | 1 configured; 3 used (all failed again on retry) | 1m05s |

Counts are unique tests, not attempts. These are proposed automated outcomes only; human QA confirms.
Scope/browser: subset (the DSR-664 spec only), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (first / retry).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VCAP-001 | [en] live: authored video block with empty caption shows no "null" text | fail | 5.0s / 6.1s | text node "null" in `div.video.block` after `.vp-frame` |
| DSR-VCAP-001 | [en] page: authored video block with empty caption shows no "null" text | fail | 7.9s / 6.6s | same as live |
| DSR-VCAP-002 | [en] page: booth TOP code-built video block shows no "null" text | fail | 5.6s / 5.3s | text node "null" in the booth-top nested `div.video.block` |
| DSR-VCAP-003 | [en] live: video detail player area shows no "null" text (control) | pass | 3.9s | — |
| DSR-VCAP-003 | [en] page: video detail player area shows no "null" text (control) | pass | 2.9s | — |
| DSR-VCAP-004 | [en] page: product detail shows no "null" text (control) | pass | 2.6s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-VCAP-002 (live) | live /en/product/application/fashion/fashion returns 404 (not published on this host) |
| DSR-VCAP-004 (live) | live /en/products/46 returns 404 (not published on this host) |

## 6. Failed tests

### DSR-VCAP-001 — [en] live / page: authored video block with empty caption shows no "null" text

- Failing assertion: `expect(nulls, '"null" text under main .video.block').toEqual([])` — `tests/video-block/DSR-664.video-caption-null.spec.ts:82`
- Expected: `[]` (no text node "null"; no `.video-caption` element when the caption is empty)
- Actual: `["#0 in <div class=\"video block\">"]`. Block HTML: `<div class="video block" …><div class="vp-frame" data-provider="youtube"><button … data-testid="video-player-facade">…</button></div>null</div>`
- Attempt(s): failed / failed on retry, on both live and page
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-05/evidence/DSR-VCAP-001_en_live.png`, `…/DSR-VCAP-001_en_page.png` (committed); trace in `test-results/` (not committed)

### DSR-VCAP-002 — [en] page: booth TOP code-built video block shows no "null" text

- Failing assertion: same line, `tests/video-block/DSR-664.video-caption-null.spec.ts:82`
- Expected: `[]`
- Actual: `["#0 in <div class=\"video block\">"]`. The text "null" is visible under the YouTube player in the booth media column.
- Attempt(s): failed / failed on retry (page only; live is 404)
- Evidence paths: `ykk-dsr/hub/results/JOB-20261022-05/evidence/DSR-VCAP-002_en_page.png` (committed); trace in `test-results/` (not committed)

Evidence under `test-results/` and `playwright-report/` is gitignored and **not committed**; local files may be overwritten by later runs.

## 7. Open points for QA

- Root cause is inferred from reading the code, not confirmed by dev: `blocks/video/video.js:80-83` passes `null` to `replaceChildren()`, which renders it as the text "null".
- Only one booth TOP with a video was found (fashion, .page only). There are no booth pages in the query-index; jeans, baby-kids and sports-outdoor have no video. ja/cn booth TOPs were not found.
- Product 46 renders no video player, so VCAP-004 only proves that product-detail does not show "null". From the code, product-detail and video-detail use `video-player.js`/`video-source.js` directly and not the `video` block.
- The video block root has no data-testid (only `video-player-facade`). The spec uses `.video.block` and carries a `// TODO: data-testid`.
