// Path guard + write window. Every manifest path and every write target must pass assertWritablePath().
export const PATH_GUARDS = [
  /^\/content\/dam\/(common|dsr)\/(ja|en)\/(movies|movies\/standard|movies\/tech|products|catalogs)\/qa[0-9a-z][0-9a-z-]*$/,
  /^\/content\/sites\/digital-showroom\/master\/(ja|en)\/library\/article\/stories\/qa[0-9a-z][0-9a-z-]*$/,
];
export const NODE_NAME = /^qa[0-9a-z][0-9a-z-]*$/; // lowercase, digits, "-"; "qa-" prefix rejected by [0-9a-z]
// D8: a rename SOURCE may also be a legacy "qa-" name (e.g. qa-587-main). Targets, creates and patches keep PATH_GUARDS.
export const RENAME_SOURCE_GUARDS = PATH_GUARDS.map((re) => new RegExp(re.source.replace('qa[0-9a-z]', 'qa-?[0-9a-z]')));

export function isWritablePath(p) {
  return PATH_GUARDS.some((re) => re.test(p));
}
export function assertWritablePath(p) {
  if (!isWritablePath(p)) throw new Error(`Path outside guard: ${p}`);
}
export function isRenameSourcePath(p) {
  return RENAME_SOURCE_GUARDS.some((re) => re.test(p));
}
/** Rename (MOVE): legacy-tolerant source, strict target, same folder only (D8). */
export function assertRenamable(from, to) {
  if (!isRenameSourcePath(from)) throw new Error(`Rename source outside guard: ${from}`);
  assertWritablePath(to);
  if (parentPath(from) !== parentPath(to)) throw new Error(`Rename must stay in the same folder: ${from} → ${to}`);
}
export const nodeName = (p) => p.split('/').pop();
export const parentPath = (p) => p.split('/').slice(0, -1).join('/');

/** Write window: Asia/Saigon (UTC+7, no DST) Mon–Fri 08:00–18:00. */
export function inWriteWindow(now = new Date()) {
  const vn = new Date(now.getTime() + 7 * 3600 * 1000);
  const day = vn.getUTCDay(); // 0 Sun … 6 Sat
  const minutes = vn.getUTCHours() * 60 + vn.getUTCMinutes();
  return { ok: day >= 1 && day <= 5 && minutes >= 8 * 60 && minutes < 18 * 60, local: vn.toISOString().replace('Z', '+07:00') };
}
