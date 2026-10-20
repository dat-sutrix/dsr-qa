import { test } from '@playwright/test';
import fs from 'node:fs/promises';
import path from 'node:path';

// JOB-20261019-04: capture only. Successful execution is not a visual verdict.
const output = 'ykk-dsr/hub/results/JOB-20261019-04';
for (const [lang, slug] of [['ja', 'qa529-01'], ['en', 'qa529-01'], ['ja', 'qa529-02']] as const) {
  for (const viewport of [{ width: 1440, height: 900 }, { width: 390, height: 844 }]) {
    const tc = viewport.width === 1440 ? 'DSR-ARTICLE-030' : 'DSR-ARTICLE-031';
    test(`${tc} [${lang}] ${slug} ${viewport.width}x${viewport.height} capture only`, async ({ page }) => {
      test.setTimeout(90_000);
      await page.setViewportSize(viewport);
      const response = await page.goto(`/master/${lang}/library/article/stories/${slug}`, { waitUntil: 'networkidle' });
      await page.waitForTimeout(1_000);
      const observation = await page.evaluate(() => ({
        finalURL: location.href, title: document.title,
        viewport: { width: innerWidth, height: innerHeight },
        scrollWidth: document.documentElement.scrollWidth,
        bodyScrollWidth: document.body.scrollWidth,
        scrollHeight: document.documentElement.scrollHeight,
        headings: Array.from(document.querySelectorAll('h1')).map(e => e.textContent),
      }));
      const stem = `${tc}_${lang}_${slug}_${viewport.width}x${viewport.height}`;
      await fs.mkdir(path.join(output, 'evidence'), { recursive: true });
      await page.screenshot({ path: path.join(output, 'evidence', `${stem}.png`), fullPage: true });
      await fs.writeFile(test.info().outputPath('observation.json'), JSON.stringify({
        tc, lang, slug, ...observation, httpStatus: response?.status() ?? null,
        captured: new Date().toISOString(), evidence: `evidence/${stem}.png`,
        verdict: null, note: 'Capture only; Figma comparison deferred to Claude.',
      }, null, 2));
    });
  }
}
