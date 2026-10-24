import fs from 'fs';
import { test, expect } from '../../fixtures/capture-graphql';
import { listPath } from '../../fixtures/dsr-587';

// JOB-20261024-08: proves the capture-on-fail hook (fixtures/capture-graphql.ts) with a forced 500 on dsr-video-list.
// @selftest only – not part of regression; the mock lives in this browser context, DEV content is untouched.
test('SELFTEST capture-graphql [en] forced 500 on dsr-video-list writes a capture file', { tag: ['@selftest'] }, async ({ page, graphqlCapture }) => {
  await page.route(/graphql\/execute\.json\/ykk\/dsr-video-list/, route =>
    route.fulfill({ status: 500, contentType: 'application/json', body: JSON.stringify({ errors: [{ message: 'selftest forced 500' }] }) }));
  const forced = page.waitForResponse(r => /dsr-video-list/.test(r.url()), { timeout: 15_000 });
  await page.goto(listPath('en'));
  expect((await forced).status(), 'mocked status').toBe(500);
  await page.waitForTimeout(1_000); // let the page log its own error state into the console

  const [file] = await graphqlCapture.flush();
  expect(file, 'capture file path').toBeTruthy();
  const [capture] = JSON.parse(fs.readFileSync(file, 'utf8'));
  await test.info().attach('selftest-capture-path', { body: file, contentType: 'text/plain' });
  expect(capture).toMatchObject({ reason: 'status 500', status: 500, method: 'GET' });
  expect(capture.url).toMatch(/dsr-video-list/);
  expect(capture.body).toContain('selftest forced 500');
  expect(capture.headers['content-type']).toContain('application/json');
  expect(capture.timing.durationMs).toBeGreaterThanOrEqual(0);
  expect(Array.isArray(capture.consoleErrors)).toBe(true);
});

test('SELFTEST capture-graphql [en] healthy dsr-video-list writes nothing', { tag: ['@selftest'] }, async ({ page, graphqlCapture }) => {
  const query = page.waitForResponse(r => /dsr-video-list/.test(r.url()), { timeout: 15_000 });
  await page.goto(listPath('en'));
  const response = await query;
  test.skip(response.status() !== 200, `live dsr-video-list answered ${response.status()} – healthy case not testable now`);
  expect(await graphqlCapture.flush(), 'no capture for a healthy 200 with items').toEqual([]);
});
