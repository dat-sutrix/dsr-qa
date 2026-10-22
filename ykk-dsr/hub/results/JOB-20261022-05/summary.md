# JOB-20261022-05 – DSR-664 repro: video block shows "null" with an empty caption (DEV, en, read-only)

**Merge/incident-related:** none (all fails have cause = `none`). **Repro: YES** on the authored and code-built video blocks. **NO** on video-detail and product-detail.

| Page | Block source | .page | .live | DOM under the video block | cause | confidence |
|---|---|---|---|---|---|---|
| /master/en/test-space/drs21-aem-block-library (above "21. Accordion") | authored `video` (YouTube link, no caption) | **repro** | **repro** | `div.video.block` > `div.vp-frame` + text node `"null"`, no `.video-caption` | none | 95% |
| /en/product/application/fashion/fashion (booth TOP) | code-built (`booth-top/media.js` `buildBlock('video', [[link]])`) | **repro** | 404 (not published) | the same: `"null"` text node after `.vp-frame` | none | 95% |
| /en/library/video/qa587-main | `video-detail` block (own player) | no | no | no `"null"` text; does not use the `video` block | – | – |
| /en/products/46 | `product-detail` block | no | 404 | no `"null"` text; no player is rendered for product 46 | – | – |

- Root cause (code read on DEV, `blocks/video/video.js:80-83`): `block.replaceChildren(player.element, caption ? el('p', …) : null)`. DOM `replaceChildren()` turns `null` into the text "null". `dom.js el()` filters out null, but `replaceChildren` does not. Suggested fix: pass the caption only when it is set. This was found by reading the code and has not been confirmed by dev.
- Every code-built video is affected, because booth-top only ever passes row 1 (the link). The only booth TOP found is fashion, on .page only. jeans, baby-kids and sports-outdoor have no video block, and the query-index lists no booth pages.
- `/ja/test-space/pages/movie-list-test` has an empty authored video block. It is collapsed (no source), so no "null" appears.
- Regression check: `tests/video-block/DSR-664.video-caption-null.spec.ts` (DSR-VCAP-001..004, live + page twin). Run: 3 fail (the repro cases), 3 pass (controls), 2 skip (404 on .live). It should go green once the fix is deployed.
- Evidence: `evidence/DSR-VCAP-001_en_live.png`, `evidence/DSR-VCAP-001_en_page.png`, `evidence/DSR-VCAP-002_en_page.png`. Run report: `results/DSR-664/DEV/automation-run-20261022.md`.
