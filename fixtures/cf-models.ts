// DSR-669/670/671 (CF model refactor, Sprint 12): DSR CF model DM_*_related → DM_*_dsr (+ DM_techmovie_dsr for movies/tech),
// GraphQL list dm*RelatedList → dm*DsrList. Dev plans to keep the query aliases `related` / `inactive` (KNOWN-FACTS 23/10),
// but specs must work before and after the deploy without code changes → read persisted-query responses only through here.
export type Json = Record<string, unknown>;

// Model names of both generations (old _related, new _dsr). Content models (DM_movie / DM_product / DM_catalog) are unchanged.
export const dsrModelName = /^DM_(movie|techmovie|product|catalog)_(related|dsr)$/i;
// Root list fields of a persisted query: aliases first, then the generated list names of either generation.
const dsrAliases = ['related', 'dsr'];
const dsrListField = /^dm[A-Z][A-Za-z]*(Related|Dsr)List$/;
const contentListField = /^dm[A-Z][A-Za-z]*List$/;

const itemsOf = (value: unknown): Json[] => ((value as { items?: Json[] } | null | undefined)?.items ?? []);

/** DSR CF items of a dsr-* persisted query (`related` alias, else dm*RelatedList / dm*DsrList). */
export function dsrItems(data: Json | null | undefined): Json[] {
  if (!data) return [];
  const alias = dsrAliases.find(k => k in data);
  if (alias) return itemsOf(data[alias]);
  return Object.keys(data).filter(k => dsrListField.test(k)).flatMap(k => itemsOf(data[k]));
}

/** Items of the `inactive` alias (DSR CFs with isActive OFF); null when the query has no such list. */
export function inactiveItems(data: Json | null | undefined): Json[] | null {
  return data && 'inactive' in data ? itemsOf(data.inactive) : null;
}

/** Content CF items of a dm-* list query (e.g. dmProductList), never the DSR lists. */
export function contentListItems(data: Json | null | undefined): Json[] {
  if (!data) return [];
  return Object.keys(data).filter(k => contentListField.test(k) && !dsrListField.test(k)).flatMap(k => itemsOf(data[k]));
}

/** Content CF wrapped by a DSR CF item: the named reference (movie / product / catalog), else the first /content/dam/common/ object. */
export function contentOf(item: Json | null | undefined, ref: 'movie' | 'product' | 'catalog'): Json | null {
  if (!item) return null;
  const named = item[ref];
  if (named && typeof named === 'object') return named as Json;
  const found = Object.values(item).find(v => v && typeof v === 'object' && !Array.isArray(v) && String((v as Json)._path ?? '').startsWith('/content/dam/common/'));
  return (found as Json | undefined) ?? null;
}
