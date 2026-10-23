# tools/author – AEM Author DEV test-data tool (lane `author`)

Design: `ykk-dsr/hub/AUTHOR-AGENT.md`. Deterministic script, no LLM, driven by a YAML manifest
(`ykk-dsr/hub/author/manifests/*.yaml`). Node ≥ 20, plain ESM, only extra dependency: `yaml`.

## Setup (VPS, user `qa`)
1. `npm ci` in the repo root (installs `yaml`).
2. Session cookie (credential level U1): `~/.dsr-secrets/aem-dev.env` with `AEM_LOGIN_TOKEN=<value of cookie "login-token">`, `chmod 600`.
   Refresh when the commands start returning 401/redirects.

## Commands
```
node tools/author/author.mjs models  [--out ykk-dsr/hub/author/models.md]
node tools/author/author.mjs lint    <manifest> [--json out.json]           # L0, exit 1 on FAIL
node tools/author/author.mjs verify  <manifest> [--since ISO] [--json f]    # L1 read-back, L2 replication, L3 delivery
node tools/author/author.mjs apply   <manifest> [--dry-run] [--out <dir>]   # default: dry-run plan only
npm run test:author                                                         # unit tests (node:test, no network)
```
`models`, `lint`, `verify` and `apply` in dry-run send **GET requests only**.
`apply --out <dir>` writes `before.json` (snapshot of every target, field values only) and `plan.json`.

### Manifest values
- `{lang}` in paths and values is expanded for every language in `lang:`.
- `{ ja: "…", en: "…" }` = per-language value.
- `ref(/content/dam/...)` = CF / asset reference (lint checks it exists or is created in the same manifest).
- `each: [id1, id2, …]` = one item per id, `{id}` substituted in path, values, refs and `verify.urls`.
  Quote values that contain `{lang}`/`{id}` inside a flow map (`{ movie: "ref(/…/{lang}/…)" }`) – unquoted braces there are invalid YAML.
- `lang_pair: false` + `lang_pair_reason: <text>` per item = opt-out of the ja+en pair check (single-language TDs): lint WARN with the reason; without a reason it stays FAIL.
- `replicate: [preview, publish]` per item; **content-cf items default to `[preview, publish]`** (D10), other kinds have no default.
  Each tier publishes content CFs first, then DSR CFs, one request each; references are never published implicitly.
- `kind: rename` items (`from`, `to`, optional `lang`) fix mis-named nodes by MOVE (D9, never delete + recreate). Items whose
  path is a rename target are patched on the moved node; DSR items must set their content-CF ref themselves (MOVE does not rewrite refs).
- `replicate:` values: `preview`, `publish`, `unpublish-preview`, `unpublish-publish` (D14 = Deactivate; one direction per tier).
  Plan order: all unpublish requests first (publish tier, then preview; DSR CFs → content CFs → pages), then activation per tier
  (preview → publish; content CFs → DSR CFs → pages). Unpublish needs an existing target (lint `unpublish-target-exists`).
- `not_before: <ISO>` per item: lint FAILs (so apply stays locked) until that time (e.g. TD-587-10 unpublish ≥ 10 min after publish).
- `kind: page` items (D15): `path` = QA page, `props:` = page properties on `jcr:content` (allowlist below), `components:` =
  `[{ node: root/section/title, props: { title: … } }]` – text of an EXISTING block node only (`text`, `title`); no page create,
  no component add/remove/move. Dates (`publicationdate`, `updatedate`) as `YYYY-MM-DD`; `""` = property absent (select default,
  e.g. robots OFF) → no write when it is not set.
- `verify.urls` are checked on `.aem.page` / `.aem.live`: a string expects 200 + `<title>`; `{ url, page: 404, live: 404 }` states the
  expected status per tier (e.g. after unpublish / preview-only). Pages are served under `/master/{lang}/…` on EDS DEV.

### Checks
| Layer | What |
|---|---|
| L0 lint | path guard (rename source: legacy `qa-` allowed, D8); node name `^qa[0-9a-z][0-9a-z-]*$` (no `qa-`); ja+en pair (not for rename items); rename source exists / target free / same folder; content-CF ref set on items reached via rename (D9); model exists and matches live CF; field names/types exist in the live model; ID field (`movieId`/`productId`/`catalogId`) = node name (`live-id` WARN shows the current live value); 表示フラグ set; required fields present (create: manifest only; patch: manifest ∪ live); references exist or are in the manifest; missing target with a mis-named `qa-…` sibling → FAIL with hint |
| L0 page (D15) | page guard; page exists; props in allowlist + type; component node `root/…` exists and is a `core/franklin/components/block/*` node; component props `text`/`title` only (WARN when the property is absent on the node) |
| L1 | CF exists, model, each manifest field exact (dates compared as `YYYY-MM-DD`, multi-values in order); pages: each prop / component prop exact |
| L2 | `jcr:content` `cq:lastReplicationAction_<tier>` = Activate (`unpublish-<tier>`: Deactivate) and `cq:lastReplicated_<tier>` present (and ≥ `--since`) |
| L3 | GET `https://main--dsr-eds-dev--sutrix-projects.aem.{page,live}<url>` → 200 + non-empty `<title>` (or the stated status) |

## Safety guards
- **Host allowlist** (`lib/http.mjs`): only the Author DEV host and the two EDS DEV hosts; anything else throws.
- **Cookie / CSRF token** are never printed or written: all output goes through `redact()`.
- **No delete**: there is no delete function; `aemWrite` accepts only POST/PUT/PATCH/MOVE and throws on DELETE.
- **Path guard** (`lib/guard.mjs`) on every manifest path (lint) and again on every write target (execute), per kind:
  CF items `^/content/dam/(common|dsr)/(ja|en)/(movies|movies/standard|movies/tech|products|catalogs)/qa[0-9a-z][0-9a-z-]*$`
  plus the **D13 exact allowlist** (a Set, not a pattern) `/content/dam/{common,dsr}/{ja,en}/products/9905860{01..11}`;
  page items (D15) `^/content/sites/digital-showroom/master/(ja|en)/library/article/stories/qa[0-9a-z][0-9a-z-]*$`,
  `^/content/sites/digital-showroom/master/(ja|en)/test-space/qa[0-9a-z][0-9a-z-]*$`.
- **Page writes (D15)**: page props allowlist `jcr:title, jcr:description, navtitle, navTitle, category, robots, tags, cq:tags,
  publicationdate, updatedate, searchkeywords, keywords, thumbnail, related-stories, _og_title, _og_description, _og_image`;
  component props `text`, `title`. Before each Sling POST the target node is re-read and must exist (Sling POST would create it),
  and every form param is checked (`assertSlingParams`): no `:operation`, no `@Delete`/`@MoveFrom`…, only our `@TypeHint`.
  **Rename source only** (D8): same patterns with `qa-?[0-9a-z]` (legacy `qa-587-main`); the rename target keeps the strict
  guard and must be in the same folder (`assertRenamable`, checked in lint and again right before the MOVE).
- **apply executes only if ALL gates pass**: `AUTHOR_WRITE_ENABLED=1` env, `--apply` flag (and no `--dry-run`),
  Asia/Saigon Mon–Fri 08:00–18:00, lint has 0 FAIL. Otherwise it prints the plan and exits 0 without sending anything.
- `max_writes` (manifest or `--max-writes`, default 40) caps the plan; every write is appended to `<out>/writes.log`
  (time, method, path, field before/after, HTTP status); first non-2xx stops the run.

## Write endpoints (create / patch / CF publish exercised by JOB-20261023-03; rename, unpublish and page writes NOT yet exercised)
Source: Adobe AEM Sites OpenAPI (`developer.adobe.com/experience-cloud/experience-manager-apis/api/stable/sites/`, spec version 2026.07).
| Op | Request | Notes |
|---|---|---|
| create | `POST /adobe/sites/cf/fragments` body `{title, name, modelId, parentPath (relative to /content/dam), fields:[{name,type,values}]}` | 201 + `ETag`, `Location` |
| patch | `PATCH /adobe/sites/cf/fragments/{id}` `Content-Type: application/json-patch+json`, `If-Match: <ETag from GET>`; ops `replace /fields/<i>/values` | 412 on conflict, 428 if If-Match missing. Script re-reads id + ETag + field index right before each PATCH |
| replicate | `POST /adobe/sites/cf/fragments/publish` body `{paths, agentId: "preview"\|"publish", filterReferencesByStatus: []}` | Starts a workflow (async) → verify L2 polls. `agentId: "preview"` for the preview tier is an assumption to confirm in P1b |
| rename | `MOVE /api/assets/<path>` + `X-Destination: /api/assets/<new>`, `X-Depth: infinity`, `X-Overwrite: F` (Assets HTTP API) | OpenAPI has no move. References to the old path are not rewritten by MOVE → patch referrers in the same manifest |
| unpublish (D14) | `POST /bin/replicate` form `cmd=Deactivate&agentId=preview\|publish&path=…` (repeated) | CFs and pages. Unverified until the first apply (JOB-20261023-06): agentId `preview` for Deactivate |
| page props / component text (D15) | Sling POST `<page>/jcr:content` or `<page>/jcr:content/root/…` form `_charset_=utf-8`, `<prop>=…`, `<prop>@TypeHint=String\|String[]\|Date` | Unverified until the first apply. Values of the UE page model (`component-models.json`, e.g. robots `""`/`noindex, nofollow`) |
| page replicate (D15) | `POST /bin/replicate` form `cmd=Activate&agentId=preview\|publish&path=…` | Unverified until the first apply |
All writes send `CSRF-Token` from `/libs/granite/csrf/token.json` (cookie session).

Alternatives (not implemented): `PUT /adobe/sites/cf/fragments/{id}` (full update, If-Match); Sling POST `:operation=move` + `:dest` for rename;
`POST /bin/replicate` (`cmd=Activate`, `path`, `agentId=preview|publish`) for replication; Assets HTTP API `PUT /api/assets/<path>` for CF element updates.
