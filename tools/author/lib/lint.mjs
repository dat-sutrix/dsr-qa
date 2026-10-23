// L0 lint (before any write): AUTHOR-AGENT.md §5. Reads models + live state (GET only).
import { getModels, getFragment, getPage, idField, flagField } from './aem.mjs';
import { discoverModels, resolveEntryModels, modelCurrency, AUTO } from './model-map.mjs';
import { aemGet } from './http.mjs';
import { expandItems, LANGS } from './manifest.mjs';
import { isWritablePath, isRenameSourcePath, isAllowedNodeName, nodeName, parentPath, PAGE_PROPS, PAGE_DATE_PROPS, COMPONENT_PROPS, COMPONENT_NODE, REPLICATE_VALUES } from './guard.mjs';

const REF_TYPES = new Set(['content-fragment', 'content-reference']);

function typeOk(field, v) {
  const vals = Array.isArray(v.value) ? v.value : [v.value];
  if (REF_TYPES.has(field.type)) return v.ref || vals.every((x) => typeof x === 'string' && x.startsWith('/content/'));
  if (field.type === 'boolean') return vals.every((x) => typeof x === 'boolean');
  if (field.type === 'float-number' || field.type === 'number') return vals.every((x) => typeof x === 'number');
  if (field.type === 'date') return vals.every((x) => /^\d{4}-\d{2}-\d{2}/.test(x instanceof Date ? x.toISOString() : String(x)));
  return vals.every((x) => ['string', 'number'].includes(typeof x));
}
const empty = (vals) => !vals || vals.length === 0 || vals.every((x) => x === '' || x === null);

async function pathExists(p) {
  const r = await aemGet(`${p}/jcr:content.json`);
  return r.status === 200;
}

/** Returns { checks, entries, live } — live = Map(path → fragment state) for reuse by apply. */
export async function lint(doc) {
  const models = await getModels();
  const map = discoverModels(models);
  // DSR-669: `model: auto` → live model of the folder; named models are checked against the live model path below.
  const entries = resolveEntryModels(expandItems(doc), models, map);
  const checks = [];
  const live = new Map();
  const add = (e, check, ok, expected, actual, warn = false) =>
    checks.push({ layer: 'L0', check, item: `#${e.idx + 1} ${e.kind}`, lang: e.lang, path: e.path, result: ok ? 'PASS' : warn ? 'WARN' : 'FAIL', expected, actual });

  // Paths that this manifest creates or renames into (refs to them are satisfied).
  const planned = new Set(entries.map((e) => e.path));
  const renameTargets = new Map(entries.filter((e) => e.kind === 'rename').map((e) => [e.to, e.from]));

  for (const e of entries) {
    // ja+en pair (data items; a rename only fixes whichever language is mis-named)
    const missingLang = LANGS.filter((l) => !e.langs.includes(l));
    // Opt-out (Claude 22/10): `lang_pair: false` + `lang_pair_reason` → WARN; without a reason → FAIL.
    if (e.kind !== 'rename' && e.lang === e.langs[0]) {
      if (missingLang.length && !e.langPair) add(e, 'lang-pair', false, 'ja+en or lang_pair: false + lang_pair_reason', `${e.langs.join('+')} (opt-out: ${e.langPairReason ?? 'no reason'})`, !!e.langPairReason);
      else add(e, 'lang-pair', missingLang.length === 0, 'ja+en', e.langs.join('+'));
    }

    if (e.kind === 'rename') add(e, 'path-guard:rename-source', isRenameSourcePath(e.from), 'allowed qa* or legacy qa-* path (D8)', e.from);
    add(e, 'path-guard', isWritablePath(e.path, e.kind === 'page' ? 'page' : 'cf'), e.kind === 'page' ? 'QA page stories/qa* or test-space/qa* (D15)' : 'allowed qa* CF path or D13 numeric product', e.path);
    const name = nodeName(e.path);
    add(e, 'node-name', isAllowedNodeName(e.path), '^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-") or D13 exact path', name);

    // Replication values (D14: unpublish-<tier> = Deactivate); one direction per tier
    const badRep = e.replicate.filter((r) => !REPLICATE_VALUES.has(r));
    const both = ['preview', 'publish'].filter((t) => e.replicate.includes(t) && e.replicate.includes(`unpublish-${t}`));
    if (e.replicate.length || badRep.length) add(e, 'replicate-values', badRep.length === 0 && both.length === 0, [...REPLICATE_VALUES].join(' | ') + ' (one per tier)', e.replicate.join(', '));
    if (e.kind === 'rename' && e.replicate.length) add(e, 'replicate-on-rename', false, 'no replicate on rename items', e.replicate.join(', '));
    // Earliest apply time (e.g. TD-587-10: unpublish ≥ 10 min after publish)
    if (e.notBefore) {
      const t = Date.parse(e.notBefore);
      add(e, 'not-before', !Number.isNaN(t) && Date.now() >= t, `now ≥ ${e.notBefore}`, Number.isNaN(t) ? 'invalid ISO time' : new Date().toISOString());
    }

    if (e.kind === 'page') { await lintPage(e, add, live); continue; }

    if (e.kind === 'rename') {
      const from = await getFragment(e.from);
      const to = await getFragment(e.to);
      live.set(e.from, from); live.set(e.to, to);
      add(e, 'rename-source', from.exists, `exists: ${e.from}`, from.exists ? 'exists' : 'missing');
      add(e, 'rename-target-free', !to.exists, `free: ${e.to}`, to.exists ? 'exists' : 'free');
      add(e, 'rename-same-folder', parentPath(e.from) === parentPath(e.to), parentPath(e.from), parentPath(e.to));
      continue;
    }

    // Old model name in the manifest (e.g. DM_movie_related after DSR-669) → FAIL with the live model to use.
    const currency = modelCurrency(e.modelAuto ? AUTO : e.model, e.path, models, map);
    add(e, 'model-current', currency.ok, currency.expected, currency.message ?? currency.actual);
    const model = e.model ? models[e.model] : null;
    add(e, 'model-exists', !!model, e.model ?? '(auto: unresolved)', model ? model.path : 'not found');
    if (!model) continue;

    const cur = await getFragment(e.path);
    live.set(e.path, cur);
    const viaRename = !cur.exists && renameTargets.has(e.path);
    const action = cur.exists ? 'patch' : viaRename ? 'patch-after-rename' : 'create';
    let base = cur;
    if (viaRename) base = live.get(renameTargets.get(e.path)) ?? (await getFragment(renameTargets.get(e.path)));
    if (!cur.exists && !viaRename) {
      // Hint: a mis-named sibling (e.g. qa-587-main for qa587-main)
      const alt = `${parentPath(e.path)}/${name.replace(/^qa(?!-)/, 'qa-')}`;
      const altCf = alt !== e.path ? await getFragment(alt) : { exists: false };
      add(e, 'target-exists', false, `CF at ${e.path} (or rename item)`, altCf.exists ? `missing; found mis-named ${nodeName(alt)} → add rename item` : 'missing → would create', !altCf.exists);
    } else {
      add(e, 'target-exists', true, e.path, action);
    }
    if (base?.exists) add(e, 'live-model', base.model === e.model, e.model, base.model);
    if (e.replicate.some((r) => r.startsWith('unpublish-'))) add(e, 'unpublish-target-exists', !!cur.exists, `existing CF ${e.path}`, cur.exists ? 'exists' : 'missing');

    // Field names + types
    const byName = Object.fromEntries(model.fields.map((f) => [f.name, f]));
    for (const [k, v] of Object.entries(e.fields)) {
      const f = byName[k];
      add(e, `field-name:${k}`, !!f, `field of ${e.model}`, f ? f.type : 'unknown field');
      if (f) add(e, `field-type:${k}`, typeOk(f, v), f.type, v.value);
    }

    // ID field = node name (content models)
    const idf = idField(model);
    if (idf) {
      const val = e.fields[idf]?.value ?? base?.fields?.[idf]?.[0];
      add(e, `id=node-name:${idf}`, val === name, name, val ?? '(empty)');
      const liveId = base?.fields?.[idf]?.[0];
      if (base?.exists && idf in e.fields) add(e, `live-id:${idf}`, liveId === name, `${name} (manifest will patch)`, liveId ?? '(empty)', true);
    }
    // D9: MOVE does not rewrite references → an item reached via rename must set its content-CF ref itself
    if (viaRename) {
      const refs = model.fields.filter((f) => f.type === 'content-fragment' && f.required).map((f) => f.name);
      for (const r of refs) add(e, `ref-set-after-rename:${r}`, r in e.fields, `${r} set in manifest (D9)`, r in e.fields ? e.fields[r].value : 'not set');
    }
    // 表示フラグ must be stated explicitly (related models)
    const flag = flagField(model);
    if (flag) add(e, `flag-set:${flag}`, flag in e.fields, `${flag} set in manifest`, flag in e.fields ? e.fields[flag].value : 'not set', true);

    // Required fields (create: manifest only; patch: manifest ∪ live)
    const missing = model.fields.filter((f) => f.required).filter((f) => {
      if (f.name in e.fields) return empty([].concat(e.fields[f.name].value));
      return action === 'create' ? true : empty(base?.fields?.[f.name]);
    }).map((f) => f.name);
    add(e, `required-fields (${action})`, missing.length === 0, 'all required present', missing.length ? `missing: ${missing.join(', ')}` : 'ok');

    // References exist or are created in this manifest
    for (const [k, v] of Object.entries(e.fields)) {
      if (!v.ref && !REF_TYPES.has(byName[k]?.type)) continue;
      for (const p of [].concat(v.value)) {
        const inManifest = planned.has(p);
        const exists = inManifest || (await pathExists(p));
        add(e, `ref-exists:${k}`, exists, p, inManifest ? 'in manifest' : exists ? 'exists' : 'missing');
      }
    }
  }
  return { checks, entries, live };
}

const isDate = (v) => typeof v === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(v);
const isStrings = (v) => typeof v === 'string' || (Array.isArray(v) && v.every((x) => typeof x === 'string'));

/** D15 page item: page must exist; only allowlisted page props; components must be existing block nodes, text props only. */
async function lintPage(e, add, live) {
  const nodes = e.components.map((c) => c.node);
  const cur = await getPage(e.path, nodes.filter((n) => COMPONENT_NODE.test(n)));
  live.set(e.path, cur);
  add(e, 'page-exists', cur.exists, `${e.path}/jcr:content (no page create, D15)`, cur.exists ? 'exists' : 'missing');
  if (!Object.keys(e.props).length && !e.components.length && !e.replicate.length) add(e, 'page-has-ops', false, 'props, components or replicate', 'nothing to do');
  for (const [k, v] of Object.entries(e.props)) {
    add(e, `page-prop:${k}`, PAGE_PROPS.has(k), `allowlisted page property (D15)`, k);
    const okType = PAGE_DATE_PROPS.has(k) ? isDate(v) : isStrings(v);
    add(e, `page-prop-type:${k}`, okType, PAGE_DATE_PROPS.has(k) ? 'YYYY-MM-DD' : 'string or string[]', v);
  }
  for (const c of e.components) {
    const okNode = COMPONENT_NODE.test(c.node);
    add(e, `component-node:${c.node}`, okNode, 'root/<…> under jcr:content', c.node);
    if (!okNode || !cur.exists) continue;
    const n = cur.components[c.node];
    const isBlock = !!n?.exists && /^core\/franklin\/components\/block\//.test(n.props['sling:resourceType'] ?? '');
    add(e, `component-exists:${c.node}`, isBlock, 'existing block component (no add/remove/move, D15)', n?.exists ? n.props['sling:resourceType'] : `HTTP ${n?.status}`);
    for (const [k, v] of Object.entries(c.props)) {
      add(e, `component-prop:${c.node}.${k}`, COMPONENT_PROPS.has(k) && typeof v === 'string', `${[...COMPONENT_PROPS].join('|')} (string)`, `${k}=${JSON.stringify(v)}`);
      if (isBlock && COMPONENT_PROPS.has(k)) add(e, `component-prop-live:${c.node}.${k}`, k in n.props, 'property exists on the live node', k in n.props ? n.props[k] : '(absent – would be added)', true);
    }
  }
}
