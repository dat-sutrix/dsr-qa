import { test, expect } from '@playwright/test';

test('SMOKE-001 DSR-173 test page is reachable', async ({ page }) => {
  const res = await page.goto('/master/en/test-space/dsr-173-video-detail');
  expect(res?.status()).toBe(200);
  await expect(page).toHaveTitle(/.+/);
});
