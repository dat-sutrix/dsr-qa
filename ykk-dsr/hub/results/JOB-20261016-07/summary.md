# JOB-20261016-07 – DSR-552 close-out on DEV (015 decision, B3 fixme, 025 wait), ja + en

**Playwright: 10 tests (both breadcrumb specs). 3 passed, 0 failed, 7 skipped (5 B3 fixme, 2 cn Issue #18). tsc: no errors. Exit code 0. No retries used.**
- **015:** pass. The expected label is now the parent's published navtitle, read from meta and query-index; both are `QA & "Test" ®`.
  - The 4th item and the JSON-LD name equal that navtitle literally.
  - No `<b>`/`<script>` element, no dialog, and no console error of any origin.
  - The code has the comment `// QA decision 2026-10-16: tag stripping upstream accepted`.
- **002 and 008:** fixme at the HOME step. The reason is "blocked-env: top page 404 on DEV (B3)", because `/master/ja` and `/master/en` still return 404.
  - **002:** HOME is now clicked last. The other 3 links passed for ja and en (href, target, HTTP 200, same tab).
  - **008:** "no breadcrumb / no JSON-LD" passed for ja and en.
  - The fixme only applies while HOME returns 404, so the steps run again automatically after B3 is fixed.
- **025:** pass for ja and en on the first attempt. The test now waits for the breadcrumb block `data-block-status="loaded"` before reading JSON-LD. This was one clean run, not a repeated flakiness check.
- **Note:** main-spec 002 covers ja only; en 002 is covered by the DSR-591 retest spec, where the same change was made.
- **Note:** 025 en still has the stale `Bug-INDEX` annotation, although en test-space is now 200 and appears in the trail.
- Run report: `results/DSR-552/DEV/automation-run-20261016-job07.md`. No failures, so no evidence was committed.
