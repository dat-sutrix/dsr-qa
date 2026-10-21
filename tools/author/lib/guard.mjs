// Path guard + write window. Every manifest path and every write target must pass assertWritablePath().
export const PATH_GUARDS = [
  /^\/content\/dam\/(common|dsr)\/(ja|en)\/(movies|movies\/standard|movies\/tech|products|catalogs)\/qa[0-9a-z][0-9a-z-]*$/,
  /^\/content\/sites\/digital-showroom\/master\/(ja|en)\/library\/article\/stories\/qa[0-9a-z][0-9a-z-]*$/,
];
export const NODE_NAME = /^qa[0-9a-z][0-9a-z-]*$/; // lowercase, digits, "-"; "qa-" prefix rejected by [0-9a-z]

export function isWritablePath(p) {
  return PATH_GUARDS.some((re) => re.test(p));
}
export function assertWritablePath(p) {
  if (!isWritablePath(p)) throw new Error(`Path outside guard: ${p}`);
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
