import { test, expect } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const output = path.resolve('ykk-dsr/hub/results/JOB-20261015-14');
for (const [li, lang] of ['ja', 'en'].entries()) {
  for (const [vi, viewport] of [{ width: 1440, height: 900 }, { width: 390, height: 844 }].entries()) {
    test(`DSR-TOP-001 [${lang}] ${vi === 0 ? 'PC' : 'SP'} full-page capture and horizontal overflow`, async ({ page, baseURL }) => {
      test.setTimeout(90_000);
      await page.setViewportSize(viewport);
      const attempts: object[] = [];
      let response = await page.goto(`${baseURL}/${lang}/top-page`);
      attempts.push({ url: page.url(), status: response?.status() });
      if (!response?.ok()) {
        response = await page.goto(`${baseURL?.replace('.aem.live', '.aem.page')}/${lang}/top-page`);
        attempts.push({ url: page.url(), status: response?.status() });
      }
      test.skip(lang === 'en' && response?.status() === 404, 'en /en/top-page returned HTTP 404 on primary and fallback; skip en');
      expect(response?.status(), 'target page HTTP status').toBe(200);
      // TODO: data-testid top-page-recommend-heading
      await expect(page.getByRole('heading', { name: 'RECOMMEND CONTENTS', exact: true })).toBeVisible();
      // Bounded lazy-load: total <= 30 s, each image decode <= 5 s; undecoded images are logged instead of hanging.
      const undecodedImages = await page.evaluate(async ({ perImageMs, totalMs }) => {
        const deadline = Date.now() + totalMs;
        const remaining = () => Math.max(0, deadline - Date.now());
        const timeout = (ms: number) => new Promise<'timeout'>(resolve => setTimeout(() => resolve('timeout'), ms));
        await Promise.race([document.fonts.ready, timeout(Math.min(perImageMs, remaining()))]);
        for (let y = 0; y < document.documentElement.scrollHeight && remaining() > perImageMs; y += 600) {
          window.scrollTo(0, y);
          await new Promise(resolve => setTimeout(resolve, 150));
        }
        const outcomes = await Promise.all(Array.from(document.images).map(async img => {
          const outcome = await Promise.race([img.decode().then(() => 'decoded' as const, () => 'error' as const), timeout(Math.min(perImageMs, remaining()))]);
          return { src: img.currentSrc || img.src, naturalWidth: img.naturalWidth, naturalHeight: img.naturalHeight, outcome };
        }));
        window.scrollTo(0, 0);
        return outcomes.filter(o => o.outcome !== 'decoded');
      }, { perImageMs: 5_000, totalMs: 30_000 });
      console.log(`DSR-TOP-001 [${lang}] ${vi === 0 ? 'PC' : 'SP'} undecoded images: ${JSON.stringify(undecodedImages)}`);
      test.info().annotations.push({ type: 'undecoded-images', description: JSON.stringify(undecodedImages) });
      await page.waitForTimeout(1000);
      const facts = await page.evaluate(() => {
        const visible = (e: Element) => e.getClientRects().length > 0 && getComputedStyle(e).visibility !== 'hidden';
        const describe = (e: Element) => ({ tag: e.tagName, id: e.id, class: e.className, text: (e.textContent || '').trim(), scrollWidth: e.scrollWidth, clientWidth: e.clientWidth, overflowX: getComputedStyle(e).overflowX });
        const all = Array.from(document.body.querySelectorAll('*')).filter(visible);
        const sections = all.filter(e => (e.tagName === 'H1') || e.getAttribute('role') === 'search' || (e.tagName === 'H2')).map(e => ({ tag: e.tagName, role: e.getAttribute('role'), text: (e.textContent || '').trim(), imageAlt: e.querySelector('img')?.alt, top: e.getBoundingClientRect().top + scrollY }));
        return { url: location.href, title: document.title, viewport: { width: innerWidth, height: innerHeight }, scrollWidth: document.documentElement.scrollWidth, bodyScrollWidth: document.body.scrollWidth, sectionsInDomOrder: sections, overflowElements: all.filter(e => e.clientWidth > 0 && e.scrollWidth > e.clientWidth).map(describe), textOverflowElements: all.filter(e => e.clientWidth > 0 && e.scrollWidth > e.clientWidth && Array.from(e.childNodes).some(n => n.nodeType === Node.TEXT_NODE && n.textContent?.trim())).map(describe), images: Array.from(document.images).map(i => ({ src: i.currentSrc, loaded: i.complete && i.naturalWidth > 0 })), exactText: document.body.innerText };
      });
      fs.mkdirSync(path.join(output, 'evidence'), { recursive: true });
      const evidence = `evidence/DSR-TOP-001_DEV_0${li * 2 + vi + 1}.png`;
      await page.screenshot({ path: path.join(output, evidence), fullPage: true });
      fs.writeFileSync(path.join(output, `layout-${lang}-${vi === 0 ? 'pc' : 'sp'}.json`), JSON.stringify({ attempts, evidence, layoutVerdict: 'captured', undecodedImages, ...facts }, null, 2) + '\n');
      expect(facts.scrollWidth, 'document scrollWidth <= viewport width').toBeLessThanOrEqual(viewport.width);
    });
  }
}
