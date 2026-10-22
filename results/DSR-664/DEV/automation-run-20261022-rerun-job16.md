# DSR-664 DEV automation run — 20261022-rerun-job16

Retest after the fix deploy (hub job JOB-20261022-16; `dev/2026.10.22_2`, commit b6b1416). Also covers DSR-662 comment 64873 ("null" text on booth TOP).

## 1. Header

- Run start (UTC): 2026-10-22T09:11:41Z
- Run end (UTC): 2026-10-22T09:12:04Z
- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live (+ .aem.page twin)
- Target page(s): `/master/en/test-space/drs21-aem-block-library` · `/en/product/application/fashion/fashion` (booth TOP) · controls `/en/library/video/qa587-main`, `/en/products/46`
- Build under test: `blocks/video/video.js` served on .live and .page at 09:11Z: etag `"9d598c2aec56299c36ab93b5281d8f42"`, last-modified `Thu, 22 Oct 2026 09:07:32 GMT`, `x-cache: MISS`; decompressed sha256 `9c3d25a1b6a0fd930168a2421aae7585e5392bacc8c3c14128c6bd3b85112946` (same on both hosts). Lines 80–84 contain the fix: `block.replaceChildren(...[player.element, caption && el('p', …)].filter(Boolean))` with the comment "replaceChildren() would write a null child as the text "null"." The deploy ID/commit b6b1416 itself was not verified (from the job file).
- Baseline ID: DSR-664 expected behaviour (empty caption → no caption element, no "null" text), as given in JOB-20261022-16
- Automation HEAD commit SHA: cc313b3958091192f30b29c8b4d901e769cf5ccd
- Exact command used:

```sh
DSR_JOB_EVIDENCE=test-results/DSR-664-job16 npm run test:dev -- tests/video-block/DSR-664.video-caption-null.spec.ts --reporter=list,json
```

## 2. TypeScript check

- Command: `npx tsc --noEmit`
- Exit code: 0
- Result: no errors

## 3. Suite summary

| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |
|---:|---:|---:|---:|---:|---:|---|---|
| 8 | 6 | 0 | 2 | 0 | 1 (config 2) | 1 configured; 0 used | 22.4 s (24 s incl. npm) |

Counts are unique tests, not attempts. Proposed automated outcomes only; human QA confirms.
Scope/browser: subset (DSR-664 spec only), chromium. Flaky outcomes: 0.

## 4. Executed tests

Duration is per attempt (one attempt each).

| TC ID | Title | Result | Duration | One-line failure reason |
|---|---|---|---|---|
| DSR-VCAP-001 | DSR-VCAP-001 [en] live: authored video block with empty caption shows no "null" text | passed | 5.3 s | — ("null" text nodes: none) |
| DSR-VCAP-001 | DSR-VCAP-001 [en] page: authored video block with empty caption shows no "null" text | passed | 5.2 s | — ("null" text nodes: none) |
| DSR-VCAP-002 | DSR-VCAP-002 [en] page: booth TOP code-built video block shows no "null" text | passed | 2.0 s | — ("null" text nodes: none) |
| DSR-VCAP-003 | DSR-VCAP-003 [en] live: video detail player area shows no "null" text (control) | passed | 1.7 s | — |
| DSR-VCAP-003 | DSR-VCAP-003 [en] page: video detail player area shows no "null" text (control) | passed | 1.7 s | — |
| DSR-VCAP-004 | DSR-VCAP-004 [en] page: product detail shows no "null" text (control) | passed | 1.6 s | — |

## 5. Skipped tests

| TC ID | Verbatim skip reason |
|---|---|
| DSR-VCAP-002 | live /en/product/application/fashion/fashion returns 404 (not published on this host) |
| DSR-VCAP-004 | live /en/products/46 returns 404 (not published on this host) |

## 6. Failed tests

None.

No page showed "null", so the `?cb=<ts>` cache-busting reload was not needed. `video.js` was a CDN MISS on both hosts.

Evidence (passes; gitignored, **not committed**): `test-results/DSR-664-job16/DSR-VCAP-001_en_live.png`, `…/DSR-VCAP-001_en_page.png`, `…/DSR-VCAP-002_en_page.png`, `…/DSR-VCAP-003_en_live.png`, `…/DSR-VCAP-003_en_page.png`, `…/DSR-VCAP-004_en_page.png`, `…/DSR-VCAP-002_en_page_fullpage.png`.

## 7. Open points for QA

- DSR-662 c.64873 (booth TOP): an extra ad-hoc scan of the whole `/en/product/application/fashion/fashion` page on .page (after scrolling through it) found no text node containing "null", and `main` innerText does not contain "null". The page has three blocks: breadcrumb, booth-top and video. It has no heading named "related videos". The only video area is the code-built video in the right column, below the "ITEM for SPORTSWEAR" links, and nothing follows it. Full-page screenshot: `test-results/DSR-664-job16/DSR-VCAP-002_en_page_fullpage.png`. The sticky header overlaps it, which is a screenshot artifact. The ja booth TOP named in 石谷's comment was not checked (job lang = en).
- Booth TOP and `/en/products/46` still return 404 on .aem.live. Those cases are verified on .aem.page only.
- The deploy ID `dev/2026.10.22_2` / commit b6b1416 is taken from the job file. What was verified is the served `video.js` content (fix present; last-modified 09:07:32Z, later than the stated 08:52Z deploy).
