// L0 lint (before any write): AUTHOR-AGENT.md §5. Reads models + live state (GET only).
import { getModels, getFragment, idField, flagField } from './aem.mjs';
import { aemGet } from './http.mjs';
import { expandItems, LANGS } from './manifest.mjs';
import { isWritablePath, isRenameSourcePath, NODE_NAME, nodeName, parentPath } from './guard.mjs';

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
  const entries = expandItems(doc);
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
    if (e.kind !== 'rename' && e.lang === e.langs[0]) add(e, 'lang-pair', missingLang.length === 0, 'ja+en', e.langs.join('+'));

    if (e.kind === 'rename') add(e, 'path-guard:rename-source', isRenameSourcePath(e.from), 'allowed qa* or legacy qa-* path (D8)', e.from);
    add(e, 'path-guard', isWritablePath(e.path), 'allowed qa* path', e.path);
    const name = nodeName(e.path);
    add(e, 'node-name', NODE_NAME.test(name), '^qa[0-9a-z][0-9a-z-]*$ (no leading "qa-")', name);

    if (e.kind === 'rename') {
      const from = await getFragment(e.from);
      const to = await getFragment(e.to);
      live.set(e.from, from); live.set(e.to, to);
      add(e, 'rename-source', from.exists, `exists: ${e.from}`, from.exists ? 'exists' : 'missing');
      add(e, 'rename-target-free', !to.exists, `free: ${e.to}`, to.exists ? 'exists' : 'free');
      add(e, 'rename-same-folder', parentPath(e.from) === parentPath(e.to), parentPath(e.from), parentPath(e.to));
      continue;
    }

    const model = models[e.model];
    add(e, 'model-exists', !!model, e.model, model ? model.path : 'not found');
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
