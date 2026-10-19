# JOB-20261017-03: bound DSR-TOP-001 image decode wait (DEV)
Fixed the test, not the expectation: `tests/top-page/DSR-609.visual-capture.spec.ts:22` now scrolls in 600 px steps within a 30 s total budget, races each `img.decode()` against a 5 s timeout, and logs undecoded images (src, natural size, outcome) to console, the `undecoded-images` annotation and `undecodedImages` in the layout JSON. Viewports and screenshot paths unchanged.

`npx tsc --noEmit`: exit 0, no errors. `npm run test:dev -- --grep DSR-TOP-001` ran 2×: 4/4 passed each time (exit 0, no retries, ~39 s wall). PC ja/en now take ~10 s instead of hitting the 90 s timeout.

Undecoded images (same in both runs, all timed out at 0×0, so they never loaded):
- ja (3/17): `ja/media_133c223720b35cd5f71bf7b688a81f0570f663551.jpg`, `ja/media_14f6ec45300969a41023acb94fb0df63487cafec8.png` ×2
- en (2/13): `en/media_14f6ec45300969a41023acb94fb0df63487cafec8.png` ×2
These look like lazy images that are not visible, so the browser never fetches them. That would explain the old hang, since `decode()` never settles for an image that never loads. Not verified; check in the Figma compare.

Notes:
- `/ja/top-page` and `/en/top-page` both return 200 on .aem.live now (ja used the .aem.page fallback before).
- The capture writes into codex's `JOB-20261015-14/` folder (path kept as the job asked). The PNGs came out byte-identical. I reverted the changed `layout-*.json` and did not commit them.
- Reports: `results/DSR-609/DEV/automation-run-20261019-tc001.md`, `automation-run-20261019-tc001-run2.md`. No failure evidence.
