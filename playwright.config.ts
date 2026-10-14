import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

const ENV = process.env.ENV || 'dev';
dotenv.config({ path: path.resolve(__dirname, 'envs', `${ENV}.env`) });

export default defineConfig({
  testDir: './tests',
  snapshotPathTemplate: '{testDir}/{testFilePath}-snapshots/{arg}{ext}',
  timeout: 30_000,
  retries: 1,
  workers: 2,
  reporter: [['list'], ['html', { open: 'never' }], ['json', { outputFile: process.env.PLAYWRIGHT_JSON_OUTPUT_NAME || 'test-results/results.json' }]],
  use: {
    baseURL: process.env.BASE_URL,
    trace: 'retain-on-failure',
    screenshot: 'only-on-failure',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
    ...['firefox', 'webkit'].map(name => ({ name, testMatch: '**/DSR-552.breadcrumb.spec.ts', grep: /DSR-BREAD-032/, use: { browserName: name as 'firefox' | 'webkit' } })),
  ],
});
