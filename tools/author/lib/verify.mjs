// L1 read-back, L2 replication, L3 delivery (GET only).
import { getFragment, getReplication, getModels, getPage } from './aem.mjs';
import { normPageValue, samePageValue } from './apply.mjs';
import { edsGet, EDS_HOSTS } from './http.mjs';
import { expandItems, verifyUrls } from './manifest.mjs';
import { resolveEntryModels } from './model-map.mjs';

function norm(type, vals) {
  return [].concat(vals ?? []).map((x) => {
    if (x instanceof Date) x = x.toISOString();
    if (type === 'date' && typeof x === 'string') return x.slice(0, 10);
    return x;
  });
}
const same = (a, b) => JSON.stringify(a) === JSON.stringify(b);

/** opts.since: ISO time; L2 requires replication at/after it (apply time). */
export async function verify(doc, opts = {}) {
  const models = await getModels();
  const checks = [];
  const add = (e, layer, check, ok, expected, actual, warn = false) =>
    checks.push({ layer, check, item: e.item, lang: e.lang, path: e.path, result: ok ? 'PASS' : warn ? 'WARN' : 'FAIL', expected, actual });

  for (const e of resolveEntryModels(expandItems(doc), models)) {
    const ctx = { item: `#${e.idx + 1} ${e.kind}`, lang: e.lang, path: e.path };
    if (e.kind === 'rename') {
      const from = await getFragment(e.from);
      const to = await getFragment(e.to);
      add(ctx, 'L1', 'renamed-target', to.exists, `exists: ${e.to}`, to.exists ? 'exists' : 'missing');
      add(ctx, 'L1', 'renamed-source-gone', !from.exists, `absent: ${e.from}`, from.exists ? 'still exists' : 'absent');
      continue;
    }
    if (e.kind === 'page') { await verifyPage(e, ctx, add, opts); continue; }
    const cf = await getFragment(e.path);
    add(ctx, 'L1', 'exists', cf.exists, e.path, cf.exists ? 'exists' : 'missing');
    if (cf.exists) {
      add(ctx, 'L1', 'model', cf.model === e.model, e.model, cf.model);
      const types = Object.fromEntries((models[e.model]?.fields ?? []).map((f) => [f.name, f.type]));
      for (const [k, v] of Object.entries(e.fields)) {
        const exp = norm(types[k], v.value);
        const act = norm(types[k], cf.fields[k]);
        add(ctx, 'L1', `field:${k}`, k in cf.fields && same(exp, act), exp.length === 1 ? exp[0] : exp, k in cf.fields ? (act.length === 1 ? act[0] : act) : '(no such field)');
      }
    } else {
      for (const k of Object.keys(e.fields)) add(ctx, 'L1', `field:${k}`, false, e.fields[k].value, '(CF missing)');
    }
    if (e.replicate.length) await checkReplication(e, ctx, add, opts, cf.exists);
  }

  // L3: tiers = union of replicate tiers in manifest (default both); a url object may state the expected status per tier.
  const tiersWanted = new Set(expandItems(doc).flatMap((e) => e.replicate.map((r) => r.replace(/^unpublish-/, ''))));
  const tiers = [['preview', 'page'], ['publish', 'live']].filter(([t]) => tiersWanted.size === 0 || tiersWanted.has(t));
  for (const u of verifyUrls(doc)) {
    for (const [, tier] of tiers) {
      const want = u[tier] ?? 200;
      const r = await edsGet(tier, u.url);
      const title = r.text.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
      const actual = `${r.status}${r.location ? ` → ${r.location}` : ''}; title="${title}"`;
      const ok = r.status === want && (want !== 200 || title !== '');
      add({ item: `url ${tier}`, lang: u.lang, path: EDS_HOSTS[tier] + u.url }, 'L3', `delivery:.aem.${tier}`, ok, want === 200 ? `200 + <title> on ${u.url}` : `${want} on ${u.url}`, actual);
    }
  }
  return { checks };
}

/** L2: Activate for <tier>, Deactivate for unpublish-<tier> (D14); timestamp ≥ --since when given. */
async function checkReplication(e, ctx, add, opts, exists) {
  const rep = exists ? await getReplication(e.path) : { status: 404 };
  for (const value of e.replicate) {
    const tier = value.replace(/^unpublish-/, '');
    const action = value.startsWith('unpublish-') ? 'Deactivate' : 'Activate';
    const r = rep[tier];
    const ok = rep.status === 200 && r?.action === action && !!r?.at && (!opts.since || new Date(r.at) >= new Date(opts.since));
    add(ctx, 'L2', `replicated:${value}`, ok, `${action}${opts.since ? ` ≥ ${opts.since}` : ''} (timestamp present)`,
      rep.status !== 200 ? `jcr:content HTTP ${rep.status}` : `${r?.action ?? 'none'} @ ${r?.at ?? 'none'}`);
  }
}

/** D15 page item: L1 page props + component props exact (dates as YYYY-MM-DD), L2 page replication. */
async function verifyPage(e, ctx, add, opts) {
  const pg = await getPage(e.path, e.components.map((c) => c.node));
  add(ctx, 'L1', 'page-exists', pg.exists, e.path, pg.exists ? 'exists' : 'missing');
  const cmp = (label, wanted, have) => {
    for (const [k, v] of Object.entries(wanted)) {
      const act = normPageValue(k, have?.[k]);
      add(ctx, 'L1', `${label}${k}`, samePageValue(v, act), v, act ?? '(absent)');
    }
  };
  if (pg.exists) {
    cmp('prop:', e.props, pg.props);
    for (const c of e.components) cmp(`component:${c.node}.`, c.props, pg.components[c.node]?.props);
  }
  if (e.replicate.length) await checkReplication(e, ctx, add, opts, pg.exists);
}
