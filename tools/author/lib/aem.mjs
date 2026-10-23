// Read helpers on AEM Author (GET only).
import { aemGet } from './http.mjs';

let modelsCache;
/** All CF models keyed by name (CF OpenAPI /adobe/sites/cf/models). */
export async function getModels() {
  if (modelsCache) return modelsCache;
  const r = await aemGet('/adobe/sites/cf/models?limit=50');
  if (r.status !== 200) throw new Error(`models: HTTP ${r.status}`);
  modelsCache = Object.fromEntries(r.json.items.map((m) => [m.name, m]));
  return modelsCache;
}

/** ID field per content model (text field named <x>Id, required). Related (DSR) models have none: URL = node name. */
export function idField(model) {
  return model.fields.find((f) => f.type === 'text' && f.required && /Id$/.test(f.name))?.name ?? null;
}
/** 表示フラグ = boolean field labelled 表示フラグ. */
export function flagField(model) {
  return model.fields.find((f) => f.type === 'boolean' && f.label === '表示フラグ')?.name ?? null;
}

export async function listFragments(folder, limit = 50) {
  const r = await aemGet(`/adobe/sites/cf/fragments?path=${encodeURIComponent(folder)}&limit=${limit}`);
  if (r.status !== 200) throw new Error(`list ${folder}: HTTP ${r.status}`);
  return r.json.items ?? [];
}

/** Fragment by exact path → { exists, id, etag, model, status, previewStatus, fields{name: values[]}, fieldOrder[] }. */
export async function getFragment(path) {
  const hit = (await listFragments(path, 5)).find((i) => i.path === path);
  if (!hit) {
    const raw = await aemGet(`${path}/jcr:content.json`); // non-CF node at that path?
    return { exists: false, path, nodeExists: raw.status === 200 };
  }
  const r = await aemGet(`/adobe/sites/cf/fragments/${hit.id}`);
  if (r.status !== 200) throw new Error(`fragment ${path}: HTTP ${r.status}`);
  const f = r.json;
  return {
    exists: true,
    path,
    id: f.id,
    etag: r.headers.get('etag') ?? f.etag ?? null,
    model: f.model?.name,
    modelId: f.model?.id,
    title: f.title,
    status: f.status,
    previewStatus: f.previewReplicationStatus,
    fields: Object.fromEntries(f.fields.map((x) => [x.name, x.values])),
    fieldOrder: f.fields.map((x) => x.name),
  };
}

/** Replication props from <path>/jcr:content.json. */
export async function getReplication(path) {
  const r = await aemGet(`${path}/jcr:content.json`);
  if (r.status !== 200) return { status: r.status };
  const j = r.json ?? {};
  const pick = (t) => ({ at: j[`cq:lastReplicated_${t}`] ?? null, action: j[`cq:lastReplicationAction_${t}`] ?? null });
  return { status: 200, preview: pick('preview'), publish: pick('publish') };
}

/** Find CF nodes by node name under /content/dam (QueryBuilder, GET). */
export async function findByNodeName(name, root = '/content/dam') {
  const q = `/bin/querybuilder.json?path=${encodeURIComponent(root)}&nodename=${encodeURIComponent(name)}&p.limit=20&p.hits=selective&p.properties=jcr:path`;
  const r = await aemGet(q);
  return r.status === 200 ? (r.json.hits ?? []).map((h) => h['jcr:path']) : [];
}

// Page props that identify people – never copied into snapshots or reports.
const PEOPLE = /By(_\w+)?$/;
const clean = (j) => Object.fromEntries(Object.entries(j ?? {}).filter(([k, v]) => !PEOPLE.test(k) && (v === null || typeof v !== 'object' || Array.isArray(v))));

/** JCR node (depth 0) → { exists, props } (people fields dropped). */
export async function getNode(path) {
  const r = await aemGet(`${path}.json`);
  return r.status === 200 ? { exists: true, path, props: clean(r.json) } : { exists: false, path, status: r.status };
}

/** Page (D15) → { exists, props of jcr:content, components{node: props} } for the given component nodes. */
export async function getPage(path, nodes = []) {
  const jc = await getNode(`${path}/jcr:content`);
  if (!jc.exists) return { exists: false, path, kind: 'page' };
  const components = {};
  for (const n of nodes) components[n] = await getNode(`${path}/jcr:content/${n}`);
  return { exists: true, path, kind: 'page', props: jc.props, components };
}
