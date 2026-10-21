// L1 read-back, L2 replication, L3 delivery (GET only).
import { getFragment, getReplication, getModels } from './aem.mjs';
import { edsGet, EDS_HOSTS } from './http.mjs';
import { expandItems, verifyUrls } from './manifest.mjs';

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

  for (const e of expandItems(doc)) {
    const ctx = { item: `#${e.idx + 1} ${e.kind}`, lang: e.lang, path: e.path };
    if (e.kind === 'rename') {
      const from = await getFragment(e.from);
      const to = await getFragment(e.to);
      add(ctx, 'L1', 'renamed-target', to.exists, `exists: ${e.to}`, to.exists ? 'exists' : 'missing');
      add(ctx, 'L1', 'renamed-source-gone', !from.exists, `absent: ${e.from}`, from.exists ? 'still exists' : 'absent');
      continue;
    }
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
    if (e.replicate.length) {
      const rep = cf.exists ? await getReplication(e.path) : { status: 404 };
      for (const tier of e.replicate) {
        const r = rep[tier];
        const ok = rep.status === 200 && r?.action === 'Activate' && !!r?.at && (!opts.since || new Date(r.at) >= new Date(opts.since));
        add(ctx, 'L2', `replicated:${tier}`, ok, `Activate${opts.since ? ` ≥ ${opts.since}` : ''} (timestamp present)`,
          rep.status !== 200 ? `jcr:content HTTP ${rep.status}` : `${r?.action ?? 'none'} @ ${r?.at ?? 'none'}`);
      }
    }
  }

  // L3: tiers = union of replicate tiers in manifest (default both)
  const tiersWanted = new Set(doc.items.flatMap((i) => [].concat(i.replicate ?? [])));
  const tiers = [['preview', 'page'], ['publish', 'live']].filter(([t]) => tiersWanted.size === 0 || tiersWanted.has(t));
  for (const { lang, url } of verifyUrls(doc)) {
    for (const [, tier] of tiers) {
      const r = await edsGet(tier, url);
      const title = r.text.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() ?? '';
      const actual = `${r.status}${r.location ? ` → ${r.location}` : ''}; title="${title}"`;
      add({ item: `url ${tier}`, lang, path: EDS_HOSTS[tier] + url }, 'L3', `delivery:.aem.${tier}`, r.status === 200 && title !== '', `200 + <title> on ${url}`, actual);
    }
  }
  return { checks };
}
