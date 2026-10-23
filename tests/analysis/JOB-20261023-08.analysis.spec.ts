import { test, expect, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
import { backToListName } from '../../fixtures/dsr-566';
import { articlePath } from '../../fixtures/dsr-529';

// JOB-20261023-08: read-only follow-up of JOB-20261023-06 fails. Records raw facts + viewport captures (not fullPage).
const output = 'ykk-dsr/hub/results/JOB-20261023-08';
const evidence = path.join(output, 'evidence');
const hosts = { live: 'https://main--dsr-eds-dev--sutrix-projects.aem.live', page: 'https://main--dsr-eds-dev--sutrix-projects.aem.page' } as const;
const cb = () => `cb=${Date.now()}`;
test.use({ viewport: { width: 1440, height: 900 } });
test.describe.configure({ retries: 0 });

function save(name: string, data: unknown) {
  fs.mkdirSync(evidence, { recursive: true });
  fs.writeFileSync(path.join(output, `${name}.json`), JSON.stringify(data, null, 2));
}
const shot = (page: Page, name: string) => page.screenshot({ path: path.join(evidence, `${name}.png`) });
async function open(page: Page, url: string) {
  const response = await page.goto(url);
  await page.waitForLoadState('networkidle').catch(() => undefined);
  return response?.status() ?? null;
}

test('DSR-NEWS-003 [ja] DSR-672 residual: qa566-news-02 date source and shown string', async ({ page }) => {
  const facts: Record<string, unknown>[] = [];
  for (const [tier, host] of Object.entries(hosts)) {
    const url = `${host}/master/ja/test-space/qa566-news-02?${cb()}`;
    const status = await open(page, url);
    const meta = page.locator('main .article-meta.block');
    await meta.first().scrollIntoViewIfNeeded().catch(() => undefined);
    const authored = await page.evaluate(async () => {
      const html = await (await fetch(`${location.pathname}.plain.html`)).text();
      return new DOMParser().parseFromString(html, 'text/html').querySelector('.article-meta')?.textContent?.trim() ?? null;
    });
    facts.push({
      tier, url, status,
      shownDate: await page.locator('.article-meta-date').allTextContents(),
      publicationdate: await page.locator('meta[name="publicationdate"]').getAttribute('content', { timeout: 1_000 }).catch(() => null),
      publishedTime: await page.locator('meta[name="published-time"]').getAttribute('content', { timeout: 1_000 }).catch(() => null),
      modifiedTime: await page.locator('meta[name="modified-time"]').getAttribute('content', { timeout: 1_000 }).catch(() => null),
      articleMetaComponentDate: authored,
      articleMetaHtml: await meta.first().evaluate(e => e.outerHTML).catch(() => null),
    });
    await shot(page, `DSR-NEWS-003_ja_news02_${tier}`);
  }
  // Reference: qa566-news-01 (page property set by TD-566-FIX 03:33Z).
  for (const lang of ['ja', 'en']) {
    const url = `${hosts.live}/master/${lang}/test-space/qa566-news-01?${cb()}`;
    const status = await open(page, url);
    facts.push({ tier: 'live', url, status, shownDate: await page.locator('.article-meta-date').allTextContents(), publicationdate: await page.locator('meta[name="publicationdate"]').getAttribute('content', { timeout: 1_000 }).catch(() => null) });
    await shot(page, `DSR-NEWS-003_${lang}_news01_live`);
  }
  save('DSR-NEWS-003-facts', facts);
});

for (const lang of ['ja', 'en'] as const) {
  test(`DSR-NEWS-002/006 [${lang}] Back to list searched in the whole document (qa566-news-01)`, async ({ page }) => {
    const url = `${hosts.live}/master/${lang}/test-space/qa566-news-01?${cb()}`;
    const status = await open(page, url);
    await page.evaluate(async () => { for (let y = 0; y <= document.documentElement.scrollHeight; y += innerHeight) { scrollTo(0, y); await new Promise(r => setTimeout(r, 150)); } });
    await page.waitForLoadState('networkidle').catch(() => undefined);
    await page.evaluate(() => scrollTo(0, document.documentElement.scrollHeight));
    const facts = await page.evaluate(([langCode, src]) => {
      const name = new RegExp(src, 'i');
      const links = [...document.querySelectorAll('a')].map(a => ({ href: a.getAttribute('href') ?? '', text: (a.textContent ?? '').trim(), inMain: !!a.closest('main'), region: a.closest('header') ? 'header' : a.closest('footer') ? 'footer' : a.closest('main') ? 'main' : 'other' }));
      const newsLinks = links.filter(l => { try { return /\/news\/?$/.test(new URL(l.href, location.href).pathname) && new URL(l.href, location.href).pathname.includes(`/${langCode}/`); } catch { return false; } });
      const textHits = [...document.querySelectorAll('body *')].filter(e => e.children.length === 0 && name.test(e.textContent ?? '')).map(e => ({ tag: e.tagName, class: (e as HTMLElement).className, text: e.textContent?.trim(), inMain: !!e.closest('main') }));
      return { newsLinks, textHits, mainBlocks: [...document.querySelectorAll('main .block')].map(b => b.classList[0]), footerPresent: !!document.querySelector('footer'), footerChildren: document.querySelector('footer')?.children.length ?? 0, scrollHeight: document.documentElement.scrollHeight };
    }, [lang, backToListName.source] as const);
    save(`DSR-NEWS-002-006_${lang}-facts`, { url, status, ...facts });
    await shot(page, `DSR-NEWS-002-006_${lang}_bottom`);
    expect(status).toBe(200);
  });

  test(`DSR-NEWS-012 [${lang}] article-meta block HTML and authored classes (qa566-news-01)`, async ({ page }) => {
    const url = `${hosts.live}/master/${lang}/test-space/qa566-news-01?${cb()}`;
    const status = await open(page, url);
    const meta = page.locator('main .article-meta.block').first();
    await meta.scrollIntoViewIfNeeded().catch(() => undefined);
    const authoredClass = await page.evaluate(async () => {
      const html = await (await fetch(`${location.pathname}.plain.html`)).text();
      return new DOMParser().parseFromString(html, 'text/html').querySelector('[class^="article-meta"]')?.getAttribute('class') ?? null;
    });
    save(`DSR-NEWS-012_${lang}-facts`, { url, status, renderedClass: await meta.getAttribute('class'), authoredClass, html: await meta.evaluate(e => e.outerHTML) });
    await shot(page, `DSR-NEWS-012_${lang}_article-meta`);
  });
}

test('DSR-ARTICLE-023 [ja] related-product block on qa529-02 vs qa529-01', async ({ page }) => {
  const facts: Record<string, unknown>[] = [];
  for (const slug of ['qa529-02', 'qa529-01']) {
    const queries: { url: string; status: number }[] = [];
    page.on('response', r => { if (/query-index|\.json|graphql|persisted/i.test(r.url()) && r.request().resourceType() !== 'document') queries.push({ url: r.url(), status: r.status() }); });
    const url = `${hosts.live}${articlePath('ja', slug)}?${cb()}`;
    const status = await open(page, url);
    const block = page.locator('main .related-product.block, main [data-block-name="related-product"]');
    await block.first().scrollIntoViewIfNeeded().catch(() => undefined);
    await page.waitForTimeout(1_000);
    const info = await block.evaluateAll(els => els.map(e => {
      const r = e.getBoundingClientRect();
      return {
        class: e.className, height: r.height, visible: getComputedStyle(e).display !== 'none' && r.height > 0,
        headings: [...e.closest('.section, div')!.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => h.textContent?.trim()),
        items: e.querySelectorAll('li, .card, [class*="item"]:not([class*="items"])').length,
        links: e.querySelectorAll('a[href]').length,
        dataAttrs: Object.fromEntries([...e.attributes].map(a => [a.name, a.value])),
        html: e.outerHTML.slice(0, 4000),
      };
    }));
    const authored = await page.evaluate(async () => {
      const html = await (await fetch(`${location.pathname}.plain.html`)).text();
      return { relatedInSource: /related-product/.test(html), metaTags: [...document.querySelectorAll('meta[property="article:tag"], meta[name="category"], meta[name="template"]')].map(m => `${m.getAttribute('name') ?? m.getAttribute('property')}=${m.getAttribute('content')}`) };
    });
    facts.push({ slug, url, status, blocks: info, authored, queries: [...queries] });
    await shot(page, `DSR-ARTICLE-023_ja_${slug}`);
    page.removeAllListeners('response');
  }
  save('DSR-ARTICLE-023-facts', facts);
});

test('DSR-VOV-008 [en] overlay rows on unavailable vs normal video pages', async ({ page, request }) => {
  const facts: Record<string, unknown>[] = [];
  for (const id of ['qa587-unavail', 'qa587-off', 'qa587-main']) {
    const url = `${hosts.live}/en/library/video/${id}?${cb()}`;
    const response = await request.get(url, { failOnStatusCode: false, maxRedirects: 0 });
    const html = await response.text();
    const rows = [...html.matchAll(/<div>\s*<div>([^<]{1,60})<\/div>\s*<div>([^<]{0,120})/g)].map(m => ({ key: m[1].trim(), value: m[2].trim() }));
    facts.push({ url, status: response.status(), robots: html.match(/<meta name="robots" content="([^"]*)"/)?.[1] ?? null, rowKeys: rows.map(r => r.key), rows: rows.slice(0, 6) });
  }
  save('DSR-VOV-008-facts', facts);
  await page.goto(`${hosts.live}/en/library/video/qa587-unavail?${cb()}`);
  await page.waitForTimeout(3_000);
  await shot(page, 'DSR-VOV-008_en_after-redirect');
  save('DSR-VOV-008-final', { finalUrl: page.url() });
});
