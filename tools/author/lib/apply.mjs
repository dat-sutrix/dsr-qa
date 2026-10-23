// apply: build an ordered request plan from lint state; execute ONLY when every gate passes.
// Order: renames → CF create/patch → page props/component text (D15) → unpublish (D14) → publish/preview (D10).
// Gates: AUTHOR_WRITE_ENABLED=1 AND --apply AND Asia/Saigon Mon–Fri 08:00–18:00 AND lint has no FAIL.
import { appendFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { getModels, getFragment, getNode } from './aem.mjs';
import { aemWrite, csrfToken } from './http.mjs';
import { assertWritablePath, assertRenamable, assertSlingParams, componentPath, inWriteWindow, nodeName, parentPath, PAGE_DATE_PROPS } from './guard.mjs';

const toApi = (p) => `/api/assets${p.replace(/^\/content\/dam/, '')}`;
const ORDER = { rename: 0, 'content-cf': 1, 'dsr-cf': 2, page: 3 };
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
    if (e.kind === 'page') { plan.push(...pageOps(e, live.get(e.path))); continue; }
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
  plan.push(...replicationOps(sorted));
  return plan;
}

const FORM = { 'Content-Type': 'application/x-www-form-urlencoded', 'CSRF-Token': '<runtime>' };

/**
 * Replication requests (after all content writes), pure – no network.
 * 1. Unpublish (D14, Deactivate via /bin/replicate): publish tier first, then preview; per tier DSR CFs, content CFs, pages.
 * 2. Activate per tier preview → publish: content CFs, then DSR CFs (D10), then pages. CFs via CF OpenAPI publish
 *    (references never published implicitly), pages via /bin/replicate.
 */
export function replicationOps(entries) {
  const ops = [];
  const pathsFor = (kind, value) => entries.filter((e) => e.kind === kind && e.replicate.includes(value)).map((e) => e.path);
  for (const tier of ['publish', 'preview']) {
    for (const kind of ['dsr-cf', 'content-cf', 'page']) {
      const paths = pathsFor(kind, `unpublish-${tier}`);
      if (paths.length) ops.push(binReplicate('Deactivate', tier, kind, paths));
    }
  }
  for (const tier of ['preview', 'publish']) {
    for (const kind of ['content-cf', 'dsr-cf', 'page']) {
      const paths = pathsFor(kind, tier);
      if (!paths.length) continue;
      if (kind === 'page') { ops.push(binReplicate('Activate', tier, kind, paths)); continue; }
      ops.push({
        op: `replicate:${tier} ${kind}`, kind, paths, method: 'POST', path: '/adobe/sites/cf/fragments/publish', target: paths.join(', '),
        headers: { 'Content-Type': 'application/json', 'CSRF-Token': '<runtime>' },
        body: { paths, agentId: tier, filterReferencesByStatus: [], workflowTitle: `qa-author ${tier} ${kind}` },
        bodyKeys: ['paths', 'agentId', 'filterReferencesByStatus', 'workflowTitle'],
      });
    }
  }
  return ops;
}

function binReplicate(cmd, tier, kind, paths) {
  return {
    op: `${cmd === 'Deactivate' ? 'unpublish' : 'replicate'}:${tier} ${kind}`, kind, paths, method: 'POST', path: '/bin/replicate', target: paths.join(', '),
    headers: FORM, form: [['_charset_', 'utf-8'], ['cmd', cmd], ['agentId', tier], ...paths.map((p) => ['path', p])],
    bodyKeys: ['cmd', 'agentId', 'path'],
  };
}

/** Live page prop → comparable value (dates as YYYY-MM-DD, multi as array). */
export function normPageValue(name, v) {
  if (v === undefined || v === null) return null;
  if (PAGE_DATE_PROPS.has(name)) { const t = Date.parse(v); return Number.isNaN(t) ? String(v) : new Date(t).toISOString().slice(0, 10); }
  return v;
}
// "" = absent (select default, e.g. robots "Indexed (default)" value "") → no write when the property is not set.
export const samePageValue = (want, have) => JSON.stringify(want) === JSON.stringify(have) || (want === '' && have === null);

/** Sling POST form for a set of property changes. Dates → ISO + @TypeHint=Date, arrays → repeated + @TypeHint=String[]. */
export function slingForm(changes) {
  const form = [['_charset_', 'utf-8']];
  for (const { field, after } of changes) {
    if (Array.isArray(after)) { for (const v of after) form.push([field, v]); form.push([`${field}@TypeHint`, 'String[]']); }
    else if (PAGE_DATE_PROPS.has(field)) { form.push([field, `${after}T00:00:00.000Z`]); form.push([`${field}@TypeHint`, 'Date']); }
    else { form.push([field, after]); form.push([`${field}@TypeHint`, 'String']); }
  }
  return form;
}

/** D15 page item → Sling POST per node with only the changed props (pure, from lint live state). */
export function pageOps(e, cur) {
  const ops = [];
  const one = (target, node, wanted, have) => {
    const changes = Object.entries(wanted)
      .filter(([k, v]) => !samePageValue(v, normPageValue(k, have?.[k])))
      .map(([k, v]) => ({ field: k, before: have?.[k] ?? null, after: v }));
    if (!changes.length) return ops.push({ skip: `page ${e.lang}: ${node ?? 'jcr:content'} no change`, path: target });
    ops.push({
      op: node ? 'component-text' : 'page-props', lang: e.lang, page: e.path, node, method: 'POST', path: target, target,
      headers: FORM, form: slingForm(changes), bodyKeys: changes.map((c) => c.field), changes,
    });
  };
  if (!cur?.exists) return [{ skip: `page ${e.lang}: page missing (no page create, D15)`, path: e.path }];
  if (Object.keys(e.props).length) one(`${e.path}/jcr:content`, null, e.props, cur.props);
  for (const c of e.components) {
    if (!cur.components?.[c.node]?.exists) { ops.push({ skip: `page ${e.lang}: component ${c.node} missing (no add, D15)`, path: e.path }); continue; }
    one(componentPath(e.path, c.node), c.node, c.props, cur.components[c.node].props);
  }
  return ops;
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
  for (const [p, s] of lintResult.live) out[p] = !s.exists ? { exists: false }
    : s.kind === 'page' ? { exists: true, kind: 'page', props: s.props, components: Object.fromEntries(Object.entries(s.components).map(([n, c]) => [n, c.exists ? c.props : null])) }
      : { exists: true, id: s.id, model: s.model, etag: s.etag, status: s.status, previewStatus: s.previewStatus, fields: s.fields };
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
    else if (p.paths) for (const t of p.paths) assertWritablePath(t, p.kind === 'page' ? 'page' : 'cf');
    else if (p.page) {
      // D15: Sling POST would create missing nodes → target must exist right now; params allowlisted.
      if (p.target !== (p.node ? componentPath(p.page, p.node) : `${p.page}/jcr:content`)) throw new Error(`page target mismatch: ${p.target}`);
      assertSlingParams(p.target, new URLSearchParams(p.form));
      if (!(await getNode(p.target)).exists) throw new Error(`page node vanished: ${p.target}`);
    } else assertWritablePath(p.target, 'cf');
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
    const body = p.form ? new URLSearchParams(p.form).toString() : p.body ? JSON.stringify(p.body) : undefined;
    const r = await aemWrite(p.method, p.path, { headers, body });
    const line = { at: new Date().toISOString(), op: p.op, method: p.method, path: p.path, target: p.target, status: r.status, changes: p.changes ?? null };
    appendFileSync(log, `${JSON.stringify(line)}\n`);
    results.push(line);
    if (r.status >= 300) throw new Error(`${p.method} ${p.path}: HTTP ${r.status} (stopped; see writes.log)`);
  }
  writeFileSync(join(outDir, 'apply-result.json'), JSON.stringify(results, null, 2));
  return results;
}
