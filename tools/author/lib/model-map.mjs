// Live model lookup (DSR-669/670/671): model NAMES change (DM_*_related → DM_*_dsr, new DM_techmovie_dsr for movies/tech),
// so the tool resolves models from the live model PATH (/conf/…/cfm/models/<node>) and the CF folder, never from a fixed name list.
// Pure functions (no network): input = getModels() result.

// Model node name → { type, role, gen }. dm_movie = content; dm_movie_related (old) / dm_movie_dsr (new) = DSR CF.
const MODEL_NODE = /^dm_?(tech_?movie|movie|product|catalog)(?:_(related|dsr))?$/i;
const TYPES = ['movie', 'techmovie', 'product', 'catalog'];

export function classifyModel(m) {
  const node = String(m?.path ?? '').split('/').pop() || String(m?.name ?? '');
  const hit = node.match(MODEL_NODE) ?? String(m?.name ?? '').match(MODEL_NODE);
  if (!hit) return null;
  const type = hit[1].toLowerCase().replace('_', '');
  const gen = hit[2]?.toLowerCase() ?? null;
  return { type, role: gen ? 'dsr' : 'content', gen };
}

/** { content: {movie, product, catalog}, dsr: {movie, techmovie, product, catalog} } → live model (name, path, gen). New gen (_dsr) wins. */
export function discoverModels(models) {
  const map = { content: {}, dsr: {} };
  const rank = (c) => (c.gen === 'dsr' ? 2 : c.gen === 'related' ? 1 : 0);
  for (const m of Object.values(models)) {
    const c = classifyModel(m);
    if (!c) continue;
    const cur = map[c.role][c.type];
    if (!cur || rank(c) > rank(cur)) map[c.role][c.type] = { name: m.name, path: m.path, gen: c.gen };
  }
  return map;
}

// CF folder → model slot. movies/tech uses its own DSR model when one exists (DSR-669), else the movie DSR model.
const FOLDER = /^\/content\/dam\/(common|dsr)\/[a-z]{2}\/(movies(?:\/(standard|tech))?|products|catalogs)\//;
export function folderSlot(cfPath) {
  const m = String(cfPath).match(FOLDER);
  if (!m) return null;
  const role = m[1] === 'common' ? 'content' : 'dsr';
  const type = m[2].startsWith('movies') ? (role === 'dsr' && m[3] === 'tech' ? 'techmovie' : 'movie') : m[2] === 'products' ? 'product' : 'catalog';
  return { role, type };
}

/** Live model expected for a CF path (null when the folder is unknown or no live model matches). */
export function expectedModel(cfPath, map) {
  const slot = folderSlot(cfPath);
  if (!slot) return null;
  return map[slot.role][slot.type] ?? (slot.type === 'techmovie' ? map.dsr.movie : null) ?? null;
}

export const AUTO = 'auto';
export const isAuto = (name) => name === undefined || name === null || name === '' || name === AUTO;

/**
 * Is the manifest model the current live model of its folder?
 * → { ok, expected, actual, message }. Fails when the manifest names an old/renamed model (e.g. DM_movie_related after DSR-669).
 */
export function modelCurrency(name, cfPath, models, map = discoverModels(models)) {
  const exp = expectedModel(cfPath, map);
  if (isAuto(name)) {
    return exp
      ? { ok: true, expected: exp.name, actual: `auto → ${exp.name}` }
      : { ok: false, expected: 'live model for this folder', actual: 'auto (unresolved)', message: `model: auto – no live model found for ${cfPath}` };
  }
  if (!exp) return { ok: !!models[name], expected: name, actual: models[name] ? models[name].path : 'not found' };
  if (exp.name === name) return { ok: true, expected: exp.name, actual: exp.path };
  const old = classifyModel(models[name] ?? { name });
  const why = !models[name] ? 'not found on DEV' : old?.gen === 'related' && exp.gen === 'dsr' ? 'old model (DSR-669 rename)' : 'not the live model of this folder';
  return {
    ok: false, expected: exp.name, actual: `${name} (${why})`,
    message: `manifest names old model ${name} (${why}); live model for ${cfPath} is ${exp.name} (${exp.path}) → set model: ${exp.name} or model: auto`,
  };
}

/** Manifest entries with `model: auto` (or no model) on CF items → live model name of their folder (e.modelAuto = true). */
export function resolveEntryModels(entries, models, map = discoverModels(models)) {
  for (const e of entries) {
    if (e.kind !== 'content-cf' && e.kind !== 'dsr-cf') continue;
    if (!isAuto(e.model)) continue;
    e.modelAuto = true;
    e.model = expectedModel(e.path, map)?.name ?? null;
  }
  return entries;
}

// Sample folders per slot for the `models` report (ja first, en second).
export function sampleFolders(role, type) {
  const langs = ['ja', 'en'];
  if (role === 'content') return langs.map((l) => `/content/dam/common/${l}/${type === 'product' ? 'products' : type === 'catalog' ? 'catalogs' : 'movies'}`);
  if (type === 'movie') return langs.map((l) => `/content/dam/dsr/${l}/movies/standard`);
  if (type === 'techmovie') return langs.map((l) => `/content/dam/dsr/${l}/movies/tech`);
  return langs.map((l) => `/content/dam/dsr/${l}/${type === 'product' ? 'products' : 'catalogs'}`);
}
export { TYPES };
