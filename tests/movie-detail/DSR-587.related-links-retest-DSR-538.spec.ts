// Retest of bug DSR-538 (related card links pointed to the AEM publish domain / HTTP 500) on the overlay pages, hub job JOB-20261022-01.
// Expected (job): every related / Related Content card href is on the EDS host of the tier
// (main--dsr-eds-dev--sutrix-projects.aem.{page,live}), none on publish-p192812…, each HTTP 200.
// Read-only. og:image is recorded only (open point, JOB-20261020-02); it is not asserted here.
import { test, expect } from '@playwright/test';
import { MovieDetailPage } from '../../pages/MovieDetailPage';
import { type Language, hosts, videoPath, td, notSeeded } from '../../fixtures/dsr-587';

const publishDomain = /publish-p192812/;
const targets: ReadonlyArray<{ lang: Language; tdId: '01' | '14' }> = [
  { lang: 'en', tdId: '14' }, { lang: 'en', tdId: '01' }, { lang: 'ja', tdId: '01' },
];

for (const tier of ['page', 'live'] as const) {
  for (const { lang, tdId } of targets) {
    const id = td[tdId].id;
    test(`DSR-538-retest [${lang}] ${id} (.aem.${tier}) related card hrefs on the EDS host, HTTP 200`, { tag: ['@overlay', '@DSR-538'] }, async ({ page, request }, testInfo) => {
      const host = hosts()[tier];
      const target = `${host}${videoPath(lang, id)}`;
      const raw = await request.get(target, { failOnStatusCode: false });
      test.skip(raw.status() === 404, `${notSeeded(tdId)} (${target} HTTP 404)`);
      const rawHtml = await raw.text();
      const movie = new MovieDetailPage(page);
      const response = await movie.goto(target);
      expect(response?.status()).toBe(200);
      await expect(movie.title).toBeVisible();
      await page.waitForLoadState('networkidle');
      // Related cards + any link inside the Related Content / Related Products sections.
      const hrefs = [...new Set([
        ...await movie.relatedContentCardLinks.evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? '')),
        ...await movie.relatedContentSection.locator('a[href]').evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? '')),
        ...await movie.relatedProductsSection.locator('a[href]').evaluateAll((links) => links.map((a) => a.getAttribute('href') ?? '')),
      ])];
      const checked: { href: string; url: string; host: string; status: number }[] = [];
      for (const href of hrefs) {
        const url = new URL(href, page.url());
        const status = (await request.get(url.href, { maxRedirects: 0, failOnStatusCode: false })).status();
        checked.push({ href, url: url.href, host: url.host, status });
      }
      const observed = {
        target, finalUrl: page.url(), lastModified: raw.headers()['last-modified'] ?? null,
        relatedCards: await movie.relatedContentCards().count(), checked,
        publishDomainInRawHtml: (rawHtml.match(/publish-p192812[^"'\s<]*/g) ?? []),
        ogImage: await movie.metaContent('og:image'),
      };
      await testInfo.attach('observed', { body: JSON.stringify(observed, null, 2), contentType: 'application/json' });
      test.skip(hrefs.length === 0, `No related card on ${id} (TD-587-${tdId} has no related content) – nothing to check`);
      for (const c of checked) {
        expect.soft(c.host, `${c.href} host`).toBe(new URL(host).host);
        expect.soft(c.url, `${c.href} publish domain`).not.toMatch(publishDomain);
        expect.soft(c.status, `${c.url} HTTP`).toBe(200);
      }
    });
  }
}
