# JOB-20261022-11 – republish DSR CFs after og:image fix: Author dry-run (claude-code, DEV Author, GET only, 07:07–07:12Z) – status: done
**Merge/incident-related:** none (no test run). **No writes:** gates `AUTHOR_WRITE_ENABLED` and `--apply` were closed; every request was a GET.
**Inventory:** `/content/dam/dsr` holds 53 DSR CFs (QueryBuilder and CF OpenAPI list agree). 28 are inside the guard, 25 outside. `movies/tech` and `products` have no `qa*` CF. Per-CF states are in `replication-state.json`.
**Manifest:** `author/manifests/REPUBLISH-OVL-20261022.yaml`, 28 items (one per CF), 0 field changes, content CFs not touched. Lint: PASS 168 · FAIL 0 · WARN 56 (28× lang-pair opt-out with reason, 28× isActive not set on purpose).
**Dry-run plan** (`plan.json`, `before.json`, `apply-dry-run.md`): **2 write requests**, both `POST /adobe/sites/cf/fragments/publish` for DSR CFs. Preview covers 17 CFs and publish covers 27 (44 CF replications); the 28 field patches are skipped as "no field change".

| Folder | preview+publish | publish only | preview only |
|---|---|---|---|
| en/catalogs (8) | qa654-content-unpub, -inactive, -update | qa190-cat-pdf, -pdf-form, -ebook, -ebook-form | qa654-preview |
| ja/catalogs (5) | qa654-inactive | qa190-cat-pdf, -pdf-form, -ebook, -ebook-form | – |
| en/movies/standard (13) | qa501-main-a/b, qa557-dam, qa587-main, -r1..-r6, -rel-a | qa587-off, qa587-rel-b (see ⚠) | – |
| ja/movies/standard (2) | qa587-main | qa557-dam | – |
Never-replicated in the guard: none. Deactivated in the guard: none.
⚠ **For Claude:** en `qa587-off` and `qa587-rel-b` show `cq:lastReplicationAction_preview=Activate`, but they have no `cq:lastReplicated_preview` and the API reports `previewReplicationStatus=NEVER_PUBLISHED`. I kept them publish-only so `.aem.page` exposure does not widen. Add `preview` to both items if you want that tier too.
⚠ All 8 `qa190-cat-*` DSR CFs are publish-only, so their `.aem.page` overlay will **not** regenerate. JOB-10 asked for preview+publish on the `-form` pair, which contradicts this job's rule. I followed the job rule.
**Excluded, outside the guard (not in the manifest) → QA-PT tonight (25):** ja/products/990586001, 990586002 (DSR-586) · {ja,en}/products/135, 46, productid-01x · ja/catalogs/catalogid-01, -02 · en/movies/standard/badid, fil-unav, filtered, long, movieid-01, noid, norelated, rel6, sort-a, sort-b, sort-c, sort-main · ja/movies/standard/filtered, long, sort-main.
**To execute (window closes 18:00 VN):** `AUTHOR_WRITE_ENABLED=1 node tools/author/author.mjs apply <manifest> --apply --out results/JOB-…/`, then `verify --since <apply start>` (L2) and a check of og:image on the overlay pages.
