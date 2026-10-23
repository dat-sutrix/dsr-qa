# JOB-20261023-05 – Agent Author D13–D15 + 5 manifests, dry-run only (DEV, GET only) – done
**Merge/incident-related:** none. No tests were run, so there are no fails. **0 write requests were sent** (AUTHOR_WRITE_ENABLED unset, no `--apply`).
- **Tool:** D13 = exact Set of 22 paths `{common,dsr}/{ja,en}/products/9905860{01..11}`, not renamable. D14 = `replicate: unpublish-preview|unpublish-publish` sends Deactivate via `/bin/replicate`; all unpublish requests run before any activation, and the target must exist. D15 = page guard (`stories/qa*`, `test-space/qa*`) plus `kind: page`: props from an allowlist, `text`/`title` only on EXISTING block nodes, the node is re-read before each Sling POST, and form params are allowlisted. Also added: `not_before`, and per-tier expected status in `verify.urls`. Kept: host allowlist, no delete, 3-layer apply lock.
- **Checks:** `npm run test:author` 13/13 pass · `npx tsc --noEmit` exit 0. Older manifests lint as before: NEG and YOUKU have 0 FAIL. TD-587-01 has 6 FAIL because its renames are already done on DEV; the old code gives the same 6.

| Manifest | Lint | Writes | Plan |
|---|---|---|---|
| BUGCHK-586-02 | 28 P / 0 F / 2 W | 2 | Preview content CF, then DSR CF 990586002. No publish (.live is already 404) |
| TD-587-PHASE2 | 37 / 0 / 3 | 4 | Deactivate publish DSR qa587-removed → Deactivate publish commune qa587-unavail → Deactivate preview DSR qa587-removed → publish DSR qa587-unavail. The 10-min wait is a `not_before` 02:39:01Z gate (passed) |
| TD-529-META | 23 / 0 / 1 | 4 | qa529-01 category=product (ja+en), en robots "" (OFF); qa529-02 ja robots `noindex, nofollow`; publish 3 pages |
| TD-566-FIX | 29 / 0 / 1 | 6 | Title component placeholder → TD title (01 ja/en; 02 ja = 100 chars); 01 publicationdate 2026-10-01; publish 3 pages |
| TD-190-DSR | 688 / 0 / 32 | 36 | 8 NEW/UPD/BOTH/NOUPD ids × ja/en: content CF + DSR CF (BL-OVL-1 folders), then preview + publish |

- **Left for QA-PT:** remove the empty Image and Button nodes on qa566-news-02 (component removal is outside D15). TD-587-04/05/12 stay as in JOB-23-02. **Not data, no item:** 566 title h2 vs h1 (template), My List/share (not in the TD), DSR-672 date, Back to list. en qa529-02 / en qa566-news-02 do not exist, and their TDs are ja only.
- **[Giả định] / open:** (1) 529 `category` is a single select (news/product/…), but TC 012 expects "2 tag IDs". I set `product`. TC 012/014 Expected needs review (suspect test). (2) TD-190 dates assume apply + run on **23/10 JST**. A later apply needs new dates. Old 15/10 CFs in `ykk/common/product-cf/test` are untouched. (3) `/bin/replicate` (Deactivate/page Activate, `agentId=preview`) and the Sling POST page writes have not run yet. JOB-23-06 is their first real use. (4) TD-587-08: commune stays on preview (job says "on publish").
- Output per manifest: `lint.md/json`, `plan.md/json`, `before.json` (no people fields).
