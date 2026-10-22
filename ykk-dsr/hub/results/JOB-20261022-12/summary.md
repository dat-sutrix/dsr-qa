# JOB-20261022-12 – republish DSR CFs (apply) – claude-code, DEV Author, 07:41–07:50Z (14:41–14:50 VN) – status: done
**Merge/incident-related:** none (no test run, no fails).
**Manifest edit (Claude decision):** `replicate: [preview, publish]` on the 8 `qa190-cat-*` items ({ja,en}/catalogs). qa587-off / qa587-rel-b stay publish-only. No other change.
**Gate before write:** lint PASS 168 · FAIL 0 · WARN 56 (same as JOB-11). Dry-run (`dryrun/plan.json`) diffed against JOB-11 `plan.json` by script: the only diff is those 8 paths added to the preview request (17 → 25). The publish request (27 paths) and the 28 "no field change" skips are identical → apply allowed.
**Apply** (`AUTHOR_WRITE_ENABLED=1 … apply --apply`, start 07:42:52Z): 2 writes, both `POST /adobe/sites/cf/fragments/publish` → HTTP 200 (`writes.log`). 0 field changes; content CFs untouched.
**Verify** `--since 07:42:52Z` (`verify.md`): L1–L2 PASS 108 · FAIL 0. All 52 tier replications (25 preview + 27 publish) are Activate with a timestamp after the apply start.
**L3** (`l3.json`, script `l3-check.py`, GET only): 25/25 `.aem.page` (preview items) and 27/27 `.aem.live` (publish items) returned 200 with a non-empty `<title>` on the first poll. URL = `/{lang}/library/{catalog|video}/<id>`.
**og:image observed:** 44/52 point to a DAM asset on publish-p192812. 8 show `default-meta-image.png`: qa654-content-unpub (page+live), en qa654-inactive (page+live), ja qa654-inactive (page+live), qa654-preview (page), qa587-off (live). These are probably the inactive/unpublished-content cases, but I did not check that against the spec.
**Not verified:** L3 cannot prove that EDS re-rendered each page after 07:42Z, because the check does not compare any timestamp. The manifest has no `verify.urls`, so L3 ran from my own script and not from `author.mjs verify`.
Side note: ja `qa190-cat-pdf` title = "qa190-cat-pdf", while the other catalogs show a human-readable title. This is existing data, not changed by this job.
