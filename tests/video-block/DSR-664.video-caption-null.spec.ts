// Regression check for bug DSR-664 (hub job JOB-20261022-05): the video block shows the text "null" below
// the player when the caption is empty. Cause seen in blocks/video/video.js on DEV 22/10:
// `block.replaceChildren(player.element, caption ? el('p', …) : null)` — replaceChildren() turns null into a "null" text node.
// DSR-VCAP-001/002 fail while the bug is present; 003/004 are controls (other blocks, must stay clean).
// Each target runs on .aem.live (BASE_URL) and on the .aem.page twin; a host that returns 404 is skipped.
import { test, expect, type Page, type TestInfo } from '@playwright/test';
import fs from 'fs';
import path from 'path';

const evidence = path.resolve(process.env.DSR_JOB_EVIDENCE || 'test-results/DSR-664');

const live = (process.env.BASE_URL || '').replace(/\/$/, '');
const hosts = [
  { name: 'live', origin: live },
  { name: 'page', origin: live.replace('.aem.live', '.aem.page') },
];

type Target = { tc: string; title: string; lang: string; path: string; scope: string; source: string };
const targets: Target[] = [
  // Authored video block, YouTube link only, no caption (section "20. Video", just above "21. Accordion").
  { tc: 'DSR-VCAP-001', title: 'authored video block with empty caption shows no "null" text', lang: 'en',
    path: '/master/en/test-space/drs21-aem-block-library', scope: 'main .video.block', source: 'authored' },
  // booth-top media.js builds the video block in code with row 1 (link) only, so the caption is always empty.
  { tc: 'DSR-VCAP-002', title: 'booth TOP code-built video block shows no "null" text', lang: 'en',
    path: '/en/product/application/fashion/fashion', scope: 'main .booth-top .video.block', source: 'code-built' },
  // Controls: the video-detail block renders its own player (not the video block).
  { tc: 'DSR-VCAP-003', title: 'video detail player area shows no "null" text (control)', lang: 'en',
    path: '/en/library/video/qa587-main', scope: 'main .video-detail.block', source: 'video-detail block' },
  { tc: 'DSR-VCAP-004', title: 'product detail shows no "null" text (control)', lang: 'en',
    path: '/en/products/46', scope: 'main .product-detail.block', source: 'product-detail block' },
];

async function scrollThrough(page: Page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += 600) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 150));
    }
  });
}

/** Text nodes under the scope whose trimmed value is exactly "null", with their parent for the report. */
async function nullTextNodes(page: Page, scope: string) {
  return page.locator(scope).evaluateAll((roots) => roots.flatMap((root, i) => {
    const found: string[] = [];
    const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
    for (let n = walker.nextNode(); n; n = walker.nextNode()) {
      if (n.textContent?.trim() === 'null') found.push(`#${i} in <${n.parentElement?.tagName.toLowerCase()} class="${n.parentElement?.className}">`);
    }
    return found;
  }));
}

async function shot(page: Page, testInfo: TestInfo, scope: string, file: string) {
  fs.mkdirSync(evidence, { recursive: true });
  const target = path.join(evidence, file);
  const el = page.locator(scope).first();
  await el.scrollIntoViewIfNeeded();
  // Block plus a little of what follows, so the stray text is visible in context.
  const box = await el.boundingBox();
  if (box) await page.screenshot({ path: target, clip: { x: 0, y: Math.max(0, box.y - 40), width: page.viewportSize()!.width, height: box.height + 160 } });
  else await page.screenshot({ path: target });
  await testInfo.attach(file, { path: target, contentType: 'image/png' });
}

for (const t of targets) {
  for (const host of hosts) {
    test(`${t.tc} [${t.lang}] ${host.name}: ${t.title}`, { tag: ['@DSR-664'] }, async ({ page }, testInfo) => {
      const response = await page.goto(host.origin + t.path, { waitUntil: 'load' });
      const status = response?.status();
      test.skip(status === 404, `${host.name} ${t.path} returns 404 (not published on this host)`);
      expect(status).toBe(200);
      await scrollThrough(page);
      // TODO: data-testid for the video block root (only video-player-facade exists today).
      await expect(page.locator(t.scope).first()).toHaveAttribute('data-block-status', 'loaded', { timeout: 15_000 });
      if (t.source === 'authored' || t.source === 'code-built') {
        await expect(page.locator(t.scope).getByTestId('video-player-facade').first()).toBeVisible();
      }
      const nulls = await nullTextNodes(page, t.scope);
      testInfo.annotations.push({ type: 'observed', description: `${t.source}; "null" text nodes: ${nulls.length ? nulls.join(', ') : 'none'}` });
      await shot(page, testInfo, t.scope, `${t.tc}_${t.lang}_${host.name}.png`);
      expect(nulls, `"null" text under ${t.scope}`).toEqual([]);
      if (t.source !== 'video-detail block' && t.source !== 'product-detail block') {
        // Empty caption → no caption element at all (トルツメ), not an empty or "null" one.
        await expect(page.locator(`${t.scope} .video-caption`)).toHaveCount(0);
      }
    });
  }
}
