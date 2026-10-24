import { test as base, type Page, type Request, type Response, type TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { dsrItems, type Json } from './cf-models';

// JOB-20261024-08 (REG-VOV-EN): capture-on-fail for the dsr-video-list / dsr-catalog-list persisted queries.
// Diagnostic only – never changes pass/fail. A capture is written when the query answers ≠ 200, has `errors`,
// returns an empty DSR list (data.related.items or dm*RelatedList / dm*DsrList) or the request fails.
// Output: test-results/graphql-capture/<test>-<ts>.json (+ test attachment). REG jobs copy these into their result folder.
export const listQueryPattern = /graphql\/execute\.json\/ykk\/dsr-(video|catalog)-list/;
export const captureDir = path.resolve(__dirname, '..', 'test-results', 'graphql-capture');
const maxBody = 20 * 1024;

type Capture = {
  reason: string;
  url: string;
  method: string;
  status: number | null;
  statusText: string | null;
  failure: string | null;
  headers: Record<string, string> | null;
  body: string | null;
  bodyBytes: number | null;
  bodyTruncated: boolean;
  timing: { startedAt: string; finishedAt: string; durationMs: number; resource: ReturnType<Request['timing']> | null };
  test: string;
  pageUrl: string;
  consoleErrors: string[];
};

export type GraphqlCapture = {
  /** Captures recorded so far (body already read). */
  readonly captures: Capture[];
  /** Writes pending captures to disk + attaches them; returns written paths. Idempotent, also called at teardown. */
  flush(): Promise<string[]>;
};

// Why the response counts as a failure, or null when it looks healthy.
function failureReason(status: number, json: Json | null, body: string): string | null {
  if (status !== 200) return `status ${status}`;
  if (!json) return `body is not JSON (${body.length} chars)`;
  if (Array.isArray(json.errors) ? json.errors.length : json.errors) return 'body has errors';
  const data = json.data as Json | null | undefined;
  if (!data) return 'body has no data';
  if (!dsrItems(data).length) return 'empty DSR list (data.related.items)';
  return null;
}

const safeName = (title: string) => title.replace(/[^\w.-]+/g, '_').replace(/_+/g, '_').slice(0, 120);

function attach(page: Page, info: TestInfo): GraphqlCapture {
  const consoleErrors: string[] = [];
  const captures: Capture[] = [];
  const pending = new Set<Promise<void>>();
  const written = new Set<Capture>();
  const startedAt = new Map<Request, number>();
  const paths: string[] = [];

  const record = (request: Request, partial: Pick<Capture, 'reason' | 'status' | 'statusText' | 'failure' | 'headers' | 'body' | 'bodyBytes' | 'bodyTruncated'>) => {
    const end = Date.now();
    const start = startedAt.get(request) ?? end;
    let resource: ReturnType<Request['timing']> | null = null;
    try { resource = request.timing(); } catch { /* timing unavailable */ }
    captures.push({
      ...partial,
      url: request.url(),
      method: request.method(),
      timing: { startedAt: new Date(start).toISOString(), finishedAt: new Date(end).toISOString(), durationMs: end - start, resource },
      test: info.titlePath.join(' › '),
      pageUrl: page.url(),
      consoleErrors,
    });
  };

  const track = (work: Promise<void>) => {
    const p = work.catch(() => { /* diagnostics must never throw */ }).finally(() => pending.delete(p));
    pending.add(p);
  };

  page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text().slice(0, 500)); });
  page.on('pageerror', e => consoleErrors.push(`pageerror: ${String(e.message ?? e).slice(0, 500)}`));
  page.on('request', r => { if (listQueryPattern.test(r.url())) startedAt.set(r, Date.now()); });
  page.on('requestfailed', r => {
    if (!listQueryPattern.test(r.url())) return;
    const failure = r.failure()?.errorText ?? 'unknown';
    record(r, { reason: `request failed: ${failure}`, status: null, statusText: null, failure, headers: null, body: null, bodyBytes: null, bodyTruncated: false });
  });
  page.on('response', (response: Response) => {
    if (!listQueryPattern.test(response.url())) return;
    track((async () => {
      const status = response.status();
      const body = await response.text().catch(e => `<<body unavailable: ${String(e).slice(0, 200)}>>`);
      let json: Json | null = null;
      try { json = JSON.parse(body) as Json; } catch { /* not JSON */ }
      const reason = failureReason(status, json, body);
      if (!reason) return;
      record(response.request(), {
        reason, status, statusText: response.statusText(), failure: null,
        headers: await response.allHeaders().catch(() => response.headers()),
        body: body.slice(0, maxBody), bodyBytes: Buffer.byteLength(body), bodyTruncated: body.length > maxBody,
      });
    })());
  });

  const flush = async () => {
    // Bounded wait: a hung body read must not block teardown.
    await Promise.race([Promise.all([...pending]), new Promise(r => setTimeout(r, 5_000))]);
    const fresh = captures.filter(c => !written.has(c));
    if (!fresh.length) return [...paths];
    fs.mkdirSync(captureDir, { recursive: true });
    const file = path.join(captureDir, `${safeName(info.titlePath.slice(1).join('-'))}-r${info.repeatEachIndex}-try${info.retry}-${Date.now()}.json`);
    const content = JSON.stringify(fresh.map(c => ({ ...c, consoleErrors: [...c.consoleErrors] })), null, 2);
    fs.writeFileSync(file, content);
    fresh.forEach(c => written.add(c));
    paths.push(file);
    await info.attach('graphql-capture', { path: file, contentType: 'application/json' }).catch(() => {});
    return [...paths];
  };

  return { captures, flush };
}

// `page` is wrapped so every spec importing `test` from here gets the hook without code changes in the tests.
const byPage = new WeakMap<Page, GraphqlCapture>();
export const test = base.extend<{ graphqlCapture: GraphqlCapture }>({
  page: async ({ page }, use, info) => {
    const capture = attach(page, info);
    byPage.set(page, capture);
    await use(page);
    await capture.flush().catch(() => {});
  },
  graphqlCapture: async ({ page }, use) => { await use(byPage.get(page)!); },
});
export { expect } from '@playwright/test';
