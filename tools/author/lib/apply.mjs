// apply: build an ordered request plan from lint state; execute ONLY when every gate passes.
// Gates: AUTHOR_WRITE_ENABLED=1 AND --apply AND Asia/Saigon Mon–Fri 08:00–18:00 AND lint has no FAIL.
import { appendFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { getModels, getFragment } from './aem.mjs';
import { aemWrite, csrfToken } from './http.mjs';
import { assertWritablePath, assertRenamable, inWriteWindow, nodeName, parentPath } from './guard.mjs';

const toApi = (p) => `/api/assets${p.replace(/^\/content\/dam/, '')}`;
const ORDER = { rename: 0, 'content-cf': 1, 'dsr-cf': 2 };
const asArray = (v) => [].concat(v ?? []);

/** Build the plan. `lintResult` = output of lint(); no network writes. */
export async function buildPlan(lintResult) {
  const models = await getModels();
  const { entries, live } = lintResult;
  const plan = [];
  const renamed = new Map(); // to → from
  const sorted = [...entries].sort((a, b) => (ORDER[a.kind] ?? 9) - (ORDER[b.kind] ?? 9) || a.idx - b.idx);

  for (const e of sorted) {
    if (e.kind === 'rename') {
      if (live.get(e.to)?.exists) { plan.push({ skip: `rename ${e.lang}: target already exists`, path: e.to }); continue; }
      renamed.set(e.to, e.from);
      plan.push({
        op: 'rename', lang: e.lang, method: 'MOVE', path: toApi(e.from), target: e.from,
        headers: { 'X-Destination': toApi(e.to), 'X-Depth': 'infinity', 'X-Overwrite': 'F' },
        bodyKeys: [], note: `${nodeName(e.from)} → ${nodeName(e.to)}`,
      });
      continue;
    }
    const model = models[e.model];
    const cur = live.get(e.path) ?? (await getFragment(e.path));
    const base = cur.exists ? cur : renamed.has(e.path) ? live.get(renamed.get(e.path)) : null;
    const typed = (k) => model?.fields.find((f) => f.name === k)?.type;

    if (!base?.exists) {
      plan.push({
        op: 'create', lang: e.lang, method: 'POST', path: '/adobe/sites/cf/fragments', target: e.path,
        headers: { 'Content-Type': 'application/json', 'CSRF-Token': '<runtime>' },
        body: {
          title: nodeName(e.path), name: nodeName(e.path), modelId: model?.id ?? `<${e.model}>`,
          parentPath: parentPath(e.path).replace(/^\/content\/dam/, ''),
          fields: Object.entries(e.fields).map(([name, v]) => ({ name, type: typed(name), values: asArray(v.value) })),
        },
        bodyKeys: ['title', 'name', 'modelId', 'parentPath', ...Object.keys(e.fields).map((k) => `fields.${k}`)],
      });
    } else {
      const ops = [];
      const changes = [];
      for (const [k, v] of Object.entries(e.fields)) {
        const want = asArray(v.value);
        const have = base.fields[k] ?? [];
        if (JSON.stringify(want) === JSON.stringify(have)) continue;
        const i = base.fieldOrder.indexOf(k);
        ops.push({ op: 'replace', path: `/fields/${i < 0 ? `<${k}>` : i}/values`, value: want });
        changes.push({ field: k, before: have, after: want });
      }
      if (!ops.length) { plan.push({ skip: `${e.kind} ${e.lang}: no field change`, path: e.path }); }
      else plan.push({
        op: 'patch', lang: e.lang, method: 'PATCH', path: `/adobe/sites/cf/fragments/${cur.exists ? cur.id : `<id of ${nodeName(base.path)} after rename>`}`, target: e.path,
        headers: { 'Content-Type': 'application/json-patch+json', 'If-Match': base.etag ? '<ETag from GET>' : '<ETag>', 'CSRF-Token': '<runtime>' },
        body: ops, bodyKeys: changes.map((c) => `fields.${c.field}`), changes,
      });
    }
  }
  // Replication (after all content writes): per tier, content CFs first, then DSR CFs (D10) – one request each.
  // References are never published implicitly (filterReferencesByStatus: []); every CF carries its own replicate.
  for (const tier of ['preview', 'publish']) {
    for (const kind of ['content-cf', 'dsr-cf']) {
      const paths = sorted.filter((e) => e.kind === kind && e.replicate.includes(tier)).map((e) => e.path);
      if (paths.length) plan.push({
        op: `replicate:${tier} ${kind}`, method: 'POST', path: '/adobe/sites/cf/fragments/publish', target: paths.join(', '),
        headers: { 'Content-Type': 'application/json', 'CSRF-Token': '<runtime>' },
        body: { paths, agentId: tier, filterReferencesByStatus: [], workflowTitle: `qa-author ${tier} ${kind}` },
        bodyKeys: ['paths', 'agentId', 'filterReferencesByStatus', 'workflowTitle'],
      });
    }
  }
  return plan;
}

export function gates({ applyFlag, lintFails }) {
  const win = inWriteWindow();
  const g = [
    ['AUTHOR_WRITE_ENABLED=1', process.env.AUTHOR_WRITE_ENABLED === '1'],
    ['--apply flag', !!applyFlag],
    [`write window Mon–Fri 08:00–18:00 Asia/Saigon (now ${win.local})`, win.ok],
    ['lint: 0 FAIL', lintFails === 0],
  ];
  return { open: g.every(([, ok]) => ok), list: g };
}

export function planTable(plan) {
  const rows = plan.map((p, i) => p.skip
    ? `| ${i + 1} | skip | – | ${p.path} | ${p.skip} |`
    : `| ${i + 1} | ${p.op}${p.lang ? ` (${p.lang})` : ''} | ${p.method} \`${p.path}\` | ${p.target} | headers: ${Object.keys(p.headers).join(', ')}; body: ${p.bodyKeys.join(', ') || '–'} |`);
  return ['| # | Op | Request | Target | Keys |', '|---|---|---|---|---|', ...rows].join('\n');
}

/** Snapshot of every target (before.json). No people/user fields stored. */
export function snapshot(lintResult) {
  const out = {};
  for (const [p, s] of lintResult.live) out[p] = s.exists
    ? { exists: true, id: s.id, model: s.model, etag: s.etag, status: s.status, previewStatus: s.previewStatus, fields: s.fields }
    : { exists: false };
  return out;
}

/** Execute the plan. Only reachable when gates().open. Logs every write to writes.log. */
export async function execute(plan, { outDir, maxWrites = 40 }) {
  const writes = plan.filter((p) => !p.skip);
  if (writes.length > maxWrites) throw new Error(`plan has ${writes.length} writes > max_writes ${maxWrites}`);
  mkdirSync(outDir, { recursive: true });
  const log = join(outDir, 'writes.log');
  const csrf = await csrfToken();
  const results = [];
  for (const p of writes) {
    if (p.op === 'rename') assertRenamable(p.target, `/content/dam${p.headers['X-Destination'].replace(/^\/api\/assets/, '')}`);
    else for (const t of p.target.split(', ')) assertWritablePath(t);
    const headers = { ...p.headers, 'CSRF-Token': csrf };
    if (p.op === 'patch') {
      const fresh = await getFragment(p.target); // re-read for current id + ETag
      if (!fresh.exists) throw new Error(`patch target vanished: ${p.target}`);
      headers['If-Match'] = fresh.etag;
      p.path = `/adobe/sites/cf/fragments/${fresh.id}`;
      p.body = p.changes.map((c) => {
        const i = fresh.fieldOrder.indexOf(c.field);
        if (i < 0) throw new Error(`field ${c.field} not on ${p.target}`);
        return { op: 'replace', path: `/fields/${i}/values`, value: c.after };
      });
    }
    const r = await aemWrite(p.method, p.path, { headers, body: p.body ? JSON.stringify(p.body) : undefined });
    const line = { at: new Date().toISOString(), op: p.op, method: p.method, path: p.path, target: p.target, status: r.status, changes: p.changes ?? null };
    appendFileSync(log, `${JSON.stringify(line)}\n`);
    results.push(line);
    if (r.status >= 300) throw new Error(`${p.method} ${p.path}: HTTP ${r.status} (stopped; see writes.log)`);
  }
  writeFileSync(join(outDir, 'apply-result.json'), JSON.stringify(results, null, 2));
  return results;
}
