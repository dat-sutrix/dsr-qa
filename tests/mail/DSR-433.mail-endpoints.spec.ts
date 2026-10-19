import { test, expect } from '@playwright/test';

// DSR-433 mail platform: read-only endpoint checks (Automation TCs 16.0, 17.0 → DSR-MAIL-016/017).
// GET only, no auth, no query parameters. Never POST and never pass `to` (no mail may be sent from tests).
const publish = process.env.PUBLISH_URL || 'https://publish-p192812-e2014374.adobeaemcloud.com';
const webhookUrl = `${publish}/bin/ykk/mail/webhook`;
const testSendUrl = `${publish}/bin/ykk/mail/test-send`;

test.describe('DSR-433 mail endpoints (API)', () => {
  test('DSR-MAIL-016 [—] webhook GET without auth is refused', async ({ request }, info) => {
    const res = await request.get(webhookUrl, { maxRedirects: 0, failOnStatusCode: false });
    const body = await res.body();
    const observed = { url: webhookUrl, status: res.status(), bodyLength: body.length, contentType: res.headers()['content-type'] ?? '' };
    await info.attach('observed', { body: JSON.stringify(observed, null, 2), contentType: 'application/json' });
    expect([403, 404, 405], `GET ${webhookUrl} status ${res.status()}`).toContain(res.status());
  });

  test('DSR-MAIL-017 [—] test-send GET without params or auth is not public', async ({ request }, info) => {
    const res = await request.get(testSendUrl, { maxRedirects: 0, failOnStatusCode: false });
    const body = await res.body();
    const observed = { url: testSendUrl, status: res.status(), bodyLength: body.length, contentType: res.headers()['content-type'] ?? '' };
    await info.attach('observed', { body: JSON.stringify(observed, null, 2), contentType: 'application/json' });
    // 200 or 500 = possible anonymous mail attempt → proposed Fail, flagged in the run report.
    expect([401, 403, 404], `GET ${testSendUrl} status ${res.status()}`).toContain(res.status());
  });
});
