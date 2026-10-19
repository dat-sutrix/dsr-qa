import crypto from 'crypto';
import { test, expect, type Page } from '@playwright/test';
import { IconPage } from '../../pages/IconPage';
import {
  type Language, languages, listPaths, productPath, tdProduct, tempInventory, replaced, notReplaced,
  blockedOfficial, blockedData, listMissing,
} from '../../fixtures/dsr-589';

const observations: Record<string, unknown>[] = [];
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({}, info) => {
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});

// TD-589-07 page set: product list (A3 path, then fallback) + TD-589-01/02/03 details when their ids are set.
// Detail ids are optional: missing ids are recorded, not failed.
async function pageSet(page: Page, lang: Language) {
  const icons = new IconPage(page);
  const pages: string[] = [];
  for (const p of listPaths(lang)) {
    const response = await icons.goto(p);
    observations.push({ tried: p, status: response?.status() });
    if (response?.status() === 200) { pages.push(p); break; }
  }
  test.skip(!pages.length, `${listMissing} (${listPaths(lang).join(', ')} not 200)`);
  for (const td of ['01', '02', '03'] as const) {
    const id = tdProduct(td);
    if (id) pages.push(productPath(lang, id)); else observations.push({ td: `TD-589-${td}`, skipped: 'id not set' });
  }
  return { icons, pages };
}

async function openAndCollect(icons: IconPage, path: string) {
  const response = await icons.goto(path);
  expect(response?.status(), `${path} HTTP status`).toBe(200);
  await icons.page.locator('.pl-card, .product-detail.block').first().waitFor({ state: 'visible' });
  return icons.icons();
}

const fetched = new Map<string, { status: number; sha1: string | null }>();
async function fetchIcon(page: Page, src: string) {
  if (src === 'inline-svg') return { status: 200, sha1: null };
  if (!fetched.has(src)) {
    const r = await page.request.get(src.replace(/#.*$/, ''));
    fetched.set(src, { status: r.status(), sha1: r.ok() ? crypto.createHash('sha1').update(await r.body()).digest('hex') : null });
  }
  return fetched.get(src)!;
}

const fileName = (src: string) => decodeURIComponent(new URL(src).pathname.split('/').pop() || '');

// Scaffolded TCs without an oracle / test data: fixme with the verbatim reason.
const blocked = (title: string, reason: string) => test(title, { tag: ['@auto'] }, async () => { test.fixme(true, reason); });

for (const lang of languages) {
  blocked(`DSR-ICON-001 [${lang}] product detail performance/function icons all match the official set (TD-589-04)`, blockedOfficial);
  blocked(`DSR-ICON-002 [${lang}] product list card icons all match the official set (TD-589-04)`, blockedOfficial);
  blocked(`DSR-ICON-003 [${lang}] condition search option and result icons all match the official set (TD-589-04)`, blockedOfficial);

  test(`DSR-ICON-004 [${lang}] no temporary icon (TD-589-06) remains on the target pages`, { tag: ['@auto'] }, async ({ page }) => {
    test.skip(!replaced, notReplaced);
    const inventory = tempInventory();
    expect(inventory.length, 'TD-589-06 inventory entries').toBeGreaterThan(0);
    const tempNames = new Set(inventory.map(i => i.fileName).filter(Boolean));
    const tempHashes = new Set(inventory.map(i => i.sha1).filter(Boolean));
    const { icons, pages } = await pageSet(page, lang);
    for (const path of pages) {
      const found = await openAndCollect(icons, path);
      const matches: Record<string, unknown>[] = [];
      for (const icon of found) {
        if (icon.src === 'inline-svg') continue; // inline markup has no file; covered by the sha1 of TD-589-06 only in TC 12.0 (manual)
        const { sha1 } = await fetchIcon(page, icon.src);
        const byName = tempNames.has(fileName(icon.src));
        const byHash = !!sha1 && tempHashes.has(sha1);
        if (byName || byHash) matches.push({ selector: icon.selector, src: icon.src, byName, byHash });
      }
      observations.push({ path, icons: found.length, matches });
      expect.soft(matches, `${path}: icons matching TD-589-06`).toEqual([]);
    }
  });
}

blocked('DSR-ICON-005 [ja] same function uses the same asset on detail, list card and condition search', blockedOfficial);

for (const lang of languages) {
  test(`DSR-ICON-006 [${lang}] icons load (HTTP 200, not broken) and have a text alternative; no console error`, { tag: ['@auto'] }, async ({ page }) => {
    const consoleErrors: string[] = [];
    page.on('console', m => { if (m.type() === 'error') consoleErrors.push(m.text()); });
    page.on('pageerror', e => consoleErrors.push(e.message));
    const { icons, pages } = await pageSet(page, lang);
    consoleErrors.length = 0; // count errors from the measured loads below only
    for (const path of pages) {
      const found = (await openAndCollect(icons, path)).filter(i => i.visible);
      expect.soft(found.length, `${path}: visible icons`).toBeGreaterThan(0);
      const bad: Record<string, unknown>[] = [];
      for (const icon of found) {
        const { status } = await fetchIcon(page, icon.src);
        // A6: alt / aria-label, or aria-hidden (or CSS, not exposed) with a visible label around the icon.
        const text = (icon.alt ?? '').trim() || (icon.ariaLabel ?? '').trim() || icon.visibleLabel;
        const issues = [status !== 200 && `HTTP ${status}`, icon.broken && 'broken', !text && 'no text alternative'].filter(Boolean);
        if (issues.length) bad.push({ selector: icon.selector, src: icon.src, issues, alt: icon.alt, ariaLabel: icon.ariaLabel, ariaHidden: icon.ariaHidden });
      }
      observations.push({ path, visibleIcons: found.length, bad });
      expect.soft(bad, `${path}: icons failing load / text alternative`).toEqual([]);
    }
    observations.push({ consoleErrors });
    expect.soft(consoleErrors, 'console errors').toEqual([]);
  });
}

blocked('DSR-ICON-007 [ja] product without function values shows no icon area', blockedData('02', 'product with 0 function values'));
blocked('DSR-ICON-008 [ja] maximum number of icons wraps on SP without overflow or overlap', blockedData('03', 'product with the most function icons'));
// 9.0 also lists cn: no /master/cn on DEV (Issue #18) → ja/en only.
for (const lang of languages) blocked(`DSR-ICON-009 [${lang}] language versions show the same ordered icon set`, blockedData('01', 'product with ≥ 3 function icons'));
