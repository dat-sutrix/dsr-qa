// Path guard + write window. Every manifest path and every write target must pass assertWritablePath().
export const CF_GUARDS = [
  /^\/content\/dam\/(common|dsr)\/(ja|en)\/(movies|movies\/standard|movies\/tech|products|catalogs)\/qa[0-9a-z][0-9a-z-]*$/,
];
// D15 (Claude 23/10): QA test pages = article stories qa* (P2) + test-space qa* (DSR-566 news pages …).
export const PAGE_GUARDS = [
  /^\/content\/sites\/digital-showroom\/master\/(ja|en)\/library\/article\/stories\/qa[0-9a-z][0-9a-z-]*$/,
  /^\/content\/sites\/digital-showroom\/master\/(ja|en)\/test-space\/qa[0-9a-z][0-9a-z-]*$/,
];
export const PATH_GUARDS = [...CF_GUARDS, ...PAGE_GUARDS];
// D13 (Claude 23/10): exact-path allowlist (NOT a pattern) for the QA-owned numeric product nodes created for DSR-586.
export const QA_NUMERIC_PRODUCTS = new Set(
  ['common', 'dsr'].flatMap((tree) => ['ja', 'en'].flatMap((lang) =>
    Array.from({ length: 11 }, (_, i) => `/content/dam/${tree}/${lang}/products/9905860${String(i + 1).padStart(2, '0')}`))),
);
export const NODE_NAME = /^qa[0-9a-z][0-9a-z-]*$/; // lowercase, digits, "-"; "qa-" prefix rejected by [0-9a-z]
// D8: a rename SOURCE may also be a legacy "qa-" name (e.g. qa-587-main). Targets, creates and patches keep CF_GUARDS.
// Renames are CF-only: pages and the D13 numeric products are never renamed.
export const RENAME_SOURCE_GUARDS = CF_GUARDS.map((re) => new RegExp(re.source.replace('qa[0-9a-z]', 'qa-?[0-9a-z]')));

export const isCfPath = (p) => CF_GUARDS.some((re) => re.test(p)) || QA_NUMERIC_PRODUCTS.has(p);
export const isPagePath = (p) => PAGE_GUARDS.some((re) => re.test(p));
export function isWritablePath(p, kind) {
  if (kind === 'page') return isPagePath(p);
  if (kind) return isCfPath(p);
  return isCfPath(p) || isPagePath(p);
}
export function assertWritablePath(p, kind) {
  if (!isWritablePath(p, kind)) throw new Error(`Path outside guard: ${p}`);
}
/** Node name rule: strict qa* name, or a D13 exact numeric product path. */
export const isAllowedNodeName = (p) => NODE_NAME.test(nodeName(p)) || QA_NUMERIC_PRODUCTS.has(p);
export function isRenameSourcePath(p) {
  return RENAME_SOURCE_GUARDS.some((re) => re.test(p));
}
/** Rename (MOVE): legacy-tolerant source, strict target, same folder only (D8). */
export function assertRenamable(from, to) {
  if (!isRenameSourcePath(from)) throw new Error(`Rename source outside guard: ${from}`);
  if (!CF_GUARDS.some((re) => re.test(to))) throw new Error(`Path outside guard: ${to}`);
  if (parentPath(from) !== parentPath(to)) throw new Error(`Rename must stay in the same folder: ${from} → ${to}`);
}
export const nodeName = (p) => p.split('/').pop();
export const parentPath = (p) => p.split('/').slice(0, -1).join('/');

// D15: page writes = page properties on jcr:content + text of an EXISTING component node. No add/remove/move of nodes.
export const PAGE_PROPS = new Set([
  'jcr:title', 'jcr:description', 'navtitle', 'navTitle', 'category', 'robots', 'tags', 'cq:tags',
  'publicationdate', 'updatedate', 'searchkeywords', 'keywords', 'thumbnail', 'related-stories',
  '_og_title', '_og_description', '_og_image',
]);
export const PAGE_DATE_PROPS = new Set(['publicationdate', 'updatedate']);
export const COMPONENT_PROPS = new Set(['text', 'title']);
export const COMPONENT_NODE = /^root(\/[A-Za-z0-9_-]+)+$/; // relative to <page>/jcr:content, e.g. root/section/title
/** Absolute component path under a guarded page; no "..", no jcr:content itself. */
export function componentPath(page, node) {
  assertWritablePath(page, 'page');
  if (!COMPONENT_NODE.test(node)) throw new Error(`Component node outside guard: ${node}`);
  return `${page}/jcr:content/${node}`;
}
/** Sling POST params: only allowlisted names; never ":operation", "@Delete", "@MoveFrom" … (only our own @TypeHint). */
export function assertSlingParams(target, params) {
  const allowed = target.endsWith('/jcr:content') ? PAGE_PROPS : COMPONENT_PROPS;
  for (const k of params.keys()) {
    if (k === '_charset_') continue;
    const [name, hint, extra] = k.split('@');
    if (extra !== undefined || (hint !== undefined && hint !== 'TypeHint') || !allowed.has(name)) throw new Error(`Sling param not allowed on ${target}: ${k}`);
  }
}

// D14: unpublish = Deactivate per tier, guarded paths only, never delete.
export const REPLICATE_VALUES = new Set(['preview', 'publish', 'unpublish-preview', 'unpublish-publish']);

/** Write window: Asia/Saigon (UTC+7, no DST) Mon–Fri 08:00–18:00. */
export function inWriteWindow(now = new Date()) {
  const vn = new Date(now.getTime() + 7 * 3600 * 1000);
  const day = vn.getUTCDay(); // 0 Sun … 6 Sat
  const minutes = vn.getUTCHours() * 60 + vn.getUTCMinutes();
  return { ok: day >= 1 && day <= 5 && minutes >= 8 * 60 && minutes < 18 * 60, local: vn.toISOString().replace('Z', '+07:00') };
}
