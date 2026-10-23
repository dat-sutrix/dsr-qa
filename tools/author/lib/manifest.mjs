// Manifest loader: expands {lang}, per-language values ({ja: …, en: …}) and ref(<path>).
import { readFileSync } from 'node:fs';
import { parse } from 'yaml';

export const LANGS = ['ja', 'en'];
const REF = /^ref\((.+)\)$/;

export function loadManifest(file) {
  const doc = parse(readFileSync(file, 'utf8'));
  if (!doc || !Array.isArray(doc.items)) throw new Error(`${file}: no items[]`);
  return doc;
}

const sub = (s, lang) => String(s).replaceAll('{lang}', lang);
// D10: content CFs are replicated on their own (no reliance on reference publishing).
export const DEFAULT_REPLICATE = { 'content-cf': ['preview', 'publish'] };

/** `each: [id, …]` → one item per id with `{id}` substituted everywhere (paths, values, refs). */
function expandEach(items) {
  return items.flatMap((item) => {
    if (!item.each) return [item];
    const { each, ...rest } = item;
    const json = JSON.stringify(rest);
    return [].concat(each).map((id) => JSON.parse(json.replaceAll('{id}', String(id))));
  });
}

/** Resolve one manifest value for a language → { value, ref } (ref = true when value is a CF/asset path reference). */
export function resolveValue(v, lang) {
  if (v && typeof v === 'object' && !Array.isArray(v) && (lang in v || LANGS.some((l) => l in v))) v = v[lang];
  if (Array.isArray(v)) {
    const r = v.map((x) => resolveValue(x, lang));
    return { value: r.map((x) => x.value), ref: r.some((x) => x.ref) };
  }
  if (typeof v === 'string') {
    const m = v.match(REF);
    if (m) return { value: sub(m[1].trim(), lang), ref: true };
    return { value: sub(v, lang), ref: false };
  }
  return { value: v, ref: false };
}

/** Expand items into one entry per (item, lang). */
export function expandItems(doc) {
  const out = [];
  expandEach(doc.items).forEach((item, idx) => {
    const langs = item.lang ?? LANGS;
    for (const lang of langs) {
      const e = { idx, kind: item.kind, model: item.model, lang, langs, langPair: item.lang_pair !== false, langPairReason: item.lang_pair_reason ?? null, replicate: [].concat(item.replicate ?? DEFAULT_REPLICATE[item.kind] ?? []) };
      if (item.kind === 'rename') {
        e.from = sub(item.from, lang);
        e.to = sub(item.to, lang);
        e.path = e.to;
      } else if (item.kind === 'page') {
        // D15: page props on jcr:content + text props of existing component nodes (node path relative to jcr:content).
        e.path = sub(item.path, lang);
        e.props = {};
        for (const [k, v] of Object.entries(item.props ?? {})) e.props[k] = resolveValue(v, lang).value;
        e.components = (item.components ?? []).map((c) => ({
          node: c.node,
          props: Object.fromEntries(Object.entries(c.props ?? {}).map(([k, v]) => [k, resolveValue(v, lang).value])),
        }));
      } else {
        e.path = sub(item.path, lang);
        e.fields = {};
        for (const [k, v] of Object.entries(item.fields ?? {})) e.fields[k] = resolveValue(v, lang);
      }
      if (item.not_before) e.notBefore = String(item.not_before);
      out.push(e);
    }
  });
  return out;
}

/** verify.urls: "url" (expects 200 on each replicated tier) or { url, page: <status>, live: <status> } (e.g. 404 after unpublish). */
export function verifyUrls(doc) {
  const langs = [...new Set(doc.items.flatMap((i) => i.lang ?? LANGS))];
  const ids = [...new Set(doc.items.flatMap((i) => [].concat(i.each ?? [])))];
  const norm = (u) => (typeof u === 'string' ? { url: u } : u);
  const urls = (doc.verify?.urls ?? []).map(norm)
    .flatMap((u) => (u.url.includes('{id}') ? ids.map((id) => ({ ...u, url: u.url.replaceAll('{id}', id) })) : [u]));
  return urls.flatMap((u) => (u.url.includes('{lang}') ? langs.map((l) => ({ ...u, lang: l, url: sub(u.url, l) })) : [{ ...u, lang: '-' }]));
}
