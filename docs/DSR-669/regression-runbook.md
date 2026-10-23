# DSR-669/670/671 – overlay regression runbook (CF model refactor deploy)

Owner: Claude (decides) · runs: lane `claude-code` (tests + read-only Author steps) and lane `author` (step 4 writes only).
Prepared by JOB-20261023-07 (2026-10-23). Source of the change: DSR-669/670/671 descriptions (KNOWN-FACTS 2026-10-23):
- `DM_*_related` → `DM_*_dsr` (movie / product / catalog), new `DM_techmovie_dsr` for `movies/tech`.
- GraphQL `dm*RelatedList` → `dm*DsrList`, 8 persisted queries. `cq:model` is migrated and the CFs republished. fullstack and eds deploy together.
- 671: catalog gets `hubspotFormId` / `promoText`; product label `{productId}｜{productName}`; `relatedMoodboards` removed; reference language check; isActive of the related catalog/video on product detail.
- Dev keeps the aliases `related` / `inactive`, so the overlay template should not change.

## What is already model-independent (JOB-20261023-07)
| Part | How |
|---|---|
| Specs / fixtures | GraphQL responses are read only through `fixtures/cf-models.ts`: `dsrItems`, `inactiveItems`, `contentListItems`, `contentOf`. These accept the `related` alias or `dm*RelatedList` / `dm*DsrList`, and `item.<ref>` or any `/content/dam/common/` object. Used in `pages/CatalogDisplayPage.ts`, `tests/product-cf/DSR-585…`, `tests/movie-detail/DSR-587.overlay-retest-DSR-647…`. No spec asserts a model name. |
| `tools/author` | `lib/model-map.mjs` finds models by **live model path** (`/conf/…/cfm/models/dm_<type>[_related\|_dsr]`); `_dsr` wins over `_related`. `models` builds its sample list from the live models and prints the model used by the CFs in each folder. Manifests may use `model: auto` (resolved from the CF folder). Lint check `model-current` FAILs a manifest that names an old model, with the message: `manifest names old model DM_x_related (old model (DSR-669 rename)); live model for <path> is DM_x_dsr (<model path>) → set model: DM_x_dsr or model: auto`. |
| One-command regression | `npm run test:dev:overlay` = every test tagged `@overlay`: 587 (movie overlay, overlay-seo, DSR-647/538 retests), 586, 654, 557, 570, 585 (product persisted queries) and 529 ARTICLE-011 listing. 257 tests (chromium). |
| Diff | `node scripts/compare-runs.mjs <last-green.json> <new.json> --out <file.md>` → regressed / fixed / other changes. Exit code 1 when anything regressed. |

## Trigger
Start when **either** happens (Jira sweep 08:05 / 12:05 / 16:05, or a Dat ping):
1. DSR-669 (or 670/671) moves to **[Dev] In Testing**, or
2. a Jira/chat comment from Martin/Kohei says it is deployed on DEV (fullstack + eds).

Claude then queues one `claude-code` job "DSR-669 regression" (steps 1–3, 5–6) and one `author` job (step 4, after step 3 is green). The author job runs only Mon–Fri 08:00–18:00 Asia/Saigon (apply gate).

## Steps
| # | Step | Command (repo root, VPS user `qa`) | Pass condition | If it fails | Est. |
|---|---|---|---|---|---|
| 1 | **Probe** (cookie + Author reachable, read-only) | `bash ykk-dsr/hub/tools/author/probe.sh` | check 1 = 200, cookie age shown (the script pushes its own report `results/AUTHOR-PROBE-<date>` through a temporary clone) | 401 → Dat refreshes the cookie (AUTHOR-AGENT §2b); stop | 2 min |
| 2 | **Models** (live schema after the refactor) | `node tools/author/author.mjs models --out ykk-dsr/hub/results/<JOB>/models-after.md`, then `diff` it with the last `models-*.md` (pre-deploy: `ykk-dsr/hub/results/JOB-20261023-07/models-live.md`) | summary shows `DM_movie_dsr` / `DM_product_dsr` / `DM_catalog_dsr` (+ `DM_techmovie_dsr`); the folder table shows **only** the new models in every `dsr/*` folder | Old model still in use in a folder → migration incomplete → report to Martin and stop before step 4. Note new/removed fields (671: `hubspotFormId`, `promoText`, `relatedMoodboards` gone). | 3 min |
| 3 | **Re-lint all manifests** | `for m in ykk-dsr/hub/author/manifests/*.yaml; do node tools/author/author.mjs lint "$m" --json ykk-dsr/hub/results/<JOB>/lint-$(basename "$m" .yaml).json; done` | no `model-current` FAIL. Other FAILs: compare with the last lint (pre-deploy known FAILs: TD-587-01.resolved renames already done; TD-190-CAT-CORE.resolved old ref path) | `model-current` FAIL → Claude sets `model: auto` (or the new name) in that manifest. `field-name:*` FAIL → field changed by 671 → Claude updates the manifest. Re-run step 3. | 10 min (22 manifests) |
| 4 | **Republish qa\* DSR CFs** (lane `author`, write) | Claude refreshes the draft `ykk-dsr/hub/results/JOB-20261023-07/REPUBLISH-669.draft.yaml` (copy of REPUBLISH-OVL-20261022, `model: auto`) from the live state, then saves it as `author/manifests/REPUBLISH-669.yaml`. Then: `node tools/author/author.mjs lint …` → `apply … --dry-run` → `AUTHOR_WRITE_ENABLED=1 node tools/author/author.mjs apply ykk-dsr/hub/author/manifests/REPUBLISH-669.yaml --apply --out ykk-dsr/hub/results/<JOB>/apply` → `verify … --since <apply start>` | lint 0 FAIL; verify L1 model = new model, L2 Activate on each tier ≥ since, L3 200 + `<title>` | Stop on first non-2xx (writes.log). Out-of-guard DSR CFs (e.g. `dsr/ja/products/990586001/2`) → Night Pack for QA-PT. | 15 min (+5 min for page regeneration before step 5) |
| 5 | **Run @overlay** (lane `claude-code`) | `PLAYWRIGHT_JSON_OUTPUT_NAME=test-results/overlay-after-669.json npm run test:dev:overlay -- --reporter=list,json` + `npx tsc --noEmit` | standard run report `results/DSR-669/DEV/automation-run-<YYYYMMDD>.md` (root AGENTS.md) | — | 25–35 min |
| 6 | **Compare with the last green run** | `node scripts/compare-runs.mjs <last-green.json> test-results/overlay-after-669.json --out ykk-dsr/hub/results/<JOB>/compare.md` | 0 regressed | Each regressed test → `suspect` + `cause` (BUG-RULES §4). Model/list name in an error → `test` (update `fixtures/cf-models.ts`). Missing data → `data`. Otherwise → `product`; confidence ≥ 80% → Claude creates the bug (DSR-669 dev). | 5 min |

**Expected total: about 1.5 h** (≈ 1 h of machine time + Claude review between steps 3→4 and after step 6). The author window (08–18) is the constraint: if the deploy lands after ~16:00 VN, steps 4–6 move to the next working morning.

## "Last green run" = reference
- Pre-deploy reference: the `@overlay` run of JOB-20261023-07 (2026-10-23). Report: `results/DSR-669/DEV/automation-run-20261023.md`; JSON: `ykk-dsr/hub/results/JOB-20261023-07/overlay-before-669.json` (committed on purpose as the reference; the HTML report and traces stay gitignored).
- This reference is **not all green**: known fails and skips are listed in that report (data / pending / blocked). Compare **status per test** (`compare-runs.mjs`), not the total pass count.
- If a newer full `@overlay` run is made before the deploy, use it as the reference and update this line.

## Checks to add once 671 is deployed (not automated yet)
- Product detail label `{productId}｜{productName}`; catalog `hubspotFormId` / `promoText` (DSR-570 form, may need `hubspotFormId`); `relatedMoodboards` absent; related catalog/video with isActive OFF hidden on product detail. These need TC rows first (Claude). Until then they are recorded only.
