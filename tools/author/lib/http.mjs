// HTTP client for AEM Author DEV + EDS DEV.
// Safety: host allowlist, cookie read from ~/.dsr-secrets (never logged), no DELETE anywhere.
import { readFileSync } from 'node:fs';
import { homedir } from 'node:os';
import { join } from 'node:path';

export const AUTHOR_HOST = 'https://author-p192812-e2014374.adobeaemcloud.com'; // DEV only – hard-coded
export const EDS_HOSTS = {
  page: 'https://main--dsr-eds-dev--sutrix-projects.aem.page',
  live: 'https://main--dsr-eds-dev--sutrix-projects.aem.live',
};
const ALLOWED_ORIGINS = new Set([AUTHOR_HOST, EDS_HOSTS.page, EDS_HOSTS.live]);
const SECRET_FILE = join(homedir(), '.dsr-secrets', 'aem-dev.env');

let token; // cached login-token; never exported, never printed
function loginToken() {
  if (token) return token;
  let raw;
  try { raw = readFileSync(SECRET_FILE, 'utf8'); } catch { throw new Error(`Missing ${SECRET_FILE} (AEM_LOGIN_TOKEN)`); }
  const m = raw.match(/^\s*(?:export\s+)?AEM_LOGIN_TOKEN=["']?([^"'\r\n]+)["']?\s*$/m);
  if (!m) throw new Error(`AEM_LOGIN_TOKEN not set in ${SECRET_FILE}`);
  token = m[1];
  return token;
}

/** Remove anything secret-looking from a string before it is printed or written. */
export function redact(s) {
  let out = String(s);
  if (token) out = out.split(token).join('<hidden>');
  return out
    .replace(/login-token=[^;"'\s]*/g, 'login-token=<hidden>')
    .replace(/("?(?:token|csrf[-_]?token|cursor)"?\s*[:=]\s*"?)[^",}\s]+/gi, '$1<hidden>')
    .replace(/[\w.+-]+@[\w-]+\.[\w.]+/g, '<email>');
}

function checkOrigin(url) {
  const u = new URL(url);
  if (!ALLOWED_ORIGINS.has(u.origin)) throw new Error(`Host not allowed: ${u.origin}`);
  return u;
}

async function send(url, { method = 'GET', headers = {}, body, auth = false } = {}) {
  checkOrigin(url);
  if (method === 'DELETE') throw new Error('DELETE is forbidden'); // defence in depth; no caller uses it
  const h = { ...headers };
  if (auth) h.Cookie = `login-token=${loginToken()}`;
  const res = await fetch(url, { method, headers: h, body, redirect: 'manual' });
  const text = await res.text();
  let json;
  try { json = JSON.parse(text); } catch { /* not JSON */ }
  return { status: res.status, headers: res.headers, text, json, location: res.headers.get('location') };
}

/** Authenticated GET on AEM Author. `path` is host-relative. */
export function aemGet(path, headers = {}) {
  return send(AUTHOR_HOST + path, { auth: true, headers: { Accept: 'application/json', ...headers } });
}

/** Anonymous GET on EDS (.aem.page / .aem.live). */
export function edsGet(tier, path) {
  return send(EDS_HOSTS[tier] + path, {});
}

/**
 * Authenticated write on AEM Author. Only called from apply.mjs after every gate passed.
 * Allowed methods: POST, PUT, PATCH, MOVE (Assets HTTP API rename). There is intentionally no delete helper.
 */
export function aemWrite(method, path, { headers = {}, body } = {}) {
  if (!['POST', 'PUT', 'PATCH', 'MOVE'].includes(method)) throw new Error(`Method not allowed: ${method}`);
  return send(AUTHOR_HOST + path, { method, auth: true, headers, body });
}

export async function csrfToken() {
  const r = await aemGet('/libs/granite/csrf/token.json');
  if (r.status !== 200 || !r.json?.token) throw new Error(`CSRF token: HTTP ${r.status}`);
  return r.json.token;
}
