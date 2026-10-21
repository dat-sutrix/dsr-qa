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
```
`models`, `lint`, `verify` and `apply` in dry-run send **GET requests only**.
`apply --out <dir>` writes `before.json` (snapshot of every target, field values only) and `plan.json`.

### Manifest values
- `{lang}` in paths and values is expanded for every language in `lang:`.
- `{ ja: "…", en: "…" }` = per-language value.
- `ref(/content/dam/...)` = CF / asset reference (lint checks it exists or is created in the same manifest).
- `replicate: [preview, publish]` per item; `verify.urls` are checked on `.aem.page` / `.aem.live`.

### Checks
| Layer | What |
|---|---|
| L0 lint | path guard; node name `^qa[0-9a-z][0-9a-z-]*$` (no `qa-`); ja+en pair; model exists and matches live CF; field names/types exist in the live model; ID field (`movieId`/`productId`/`catalogId`) = node name (`live-id` WARN shows the current live value); 表示フラグ set; required fields present (create: manifest only; patch: manifest ∪ live); references exist or are in the manifest; missing target with a mis-named `qa-…` sibling → FAIL with hint |
| L1 | CF exists, model, each manifest field exact (dates compared as `YYYY-MM-DD`, multi-values in order) |
| L2 | `jcr:content` `cq:lastReplicationAction_<tier>` = Activate and `cq:lastReplicated_<tier>` present (and ≥ `--since`) |
| L3 | GET `https://main--dsr-eds-dev--sutrix-projects.aem.{page,live}<url>` → 200 + non-empty `<title>` |

## Safety guards
- **Host allowlist** (`lib/http.mjs`): only the Author DEV host and the two EDS DEV hosts; anything else throws.
- **Cookie / CSRF token** are never printed or written: all output goes through `redact()`.
- **No delete**: there is no delete function; `aemWrite` accepts only POST/PUT/PATCH/MOVE and throws on DELETE.
- **Path guard** (`lib/guard.mjs`) on every manifest path (lint) and again on every write target (execute):
  `^/content/dam/(common|dsr)/(ja|en)/(movies|movies/standard|movies/tech|products|catalogs)/qa[0-9a-z][0-9a-z-]*$`,
  `^/content/sites/digital-showroom/master/(ja|en)/library/article/stories/qa[0-9a-z][0-9a-z-]*$`.
- **apply executes only if ALL gates pass**: `AUTHOR_WRITE_ENABLED=1` env, `--apply` flag (and no `--dry-run`),
  Asia/Saigon Mon–Fri 08:00–18:00, lint has 0 FAIL. Otherwise it prints the plan and exits 0 without sending anything.
- `max_writes` (manifest or `--max-writes`, default 40) caps the plan; every write is appended to `<out>/writes.log`
  (time, method, path, field before/after, HTTP status); first non-2xx stops the run.

## Write endpoints (planned; NOT yet exercised – P1b)
Source: Adobe AEM Sites OpenAPI (`developer.adobe.com/experience-cloud/experience-manager-apis/api/stable/sites/`, spec version 2026.07).
| Op | Request | Notes |
|---|---|---|
| create | `POST /adobe/sites/cf/fragments` body `{title, name, modelId, parentPath (relative to /content/dam), fields:[{name,type,values}]}` | 201 + `ETag`, `Location` |
| patch | `PATCH /adobe/sites/cf/fragments/{id}` `Content-Type: application/json-patch+json`, `If-Match: <ETag from GET>`; ops `replace /fields/<i>/values` | 412 on conflict, 428 if If-Match missing. Script re-reads id + ETag + field index right before each PATCH |
| replicate | `POST /adobe/sites/cf/fragments/publish` body `{paths, agentId: "preview"\|"publish", filterReferencesByStatus: []}` | Starts a workflow (async) → verify L2 polls. `agentId: "preview"` for the preview tier is an assumption to confirm in P1b |
| rename | `MOVE /api/assets/<path>` + `X-Destination: /api/assets/<new>`, `X-Depth: infinity`, `X-Overwrite: F` (Assets HTTP API) | OpenAPI has no move. References to the old path are not rewritten by MOVE → patch referrers in the same manifest |
All writes send `CSRF-Token` from `/libs/granite/csrf/token.json` (cookie session).

Alternatives (not implemented): `PUT /adobe/sites/cf/fragments/{id}` (full update, If-Match); Sling POST `:operation=move` + `:dest` for rename;
`POST /bin/replicate` (`cmd=Activate`, `path`, `agentId=preview|publish`) for replication; Assets HTTP API `PUT /api/assets/<path>` for CF element updates.
