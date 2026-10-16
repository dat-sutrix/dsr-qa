import { test, expect, type Page, type APIRequestContext } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';
import { BreadcrumbPage } from '../../pages/BreadcrumbPage';
import { viewports, languages, type Language, homePath, testSpacePath, t1, expectedTrail, expectedPaths, normalizeUrl, screenshotOptions, testSpaceLabel, t2, t2Titles, t2Labels, t2Trail, t3Long, t3Special, t3Trail } from '../../fixtures/dsr-552';

test.use({ viewport: viewports.PC });
const evidence = path.resolve('evidence/DSR-552', (process.env.ENV || 'dev').toUpperCase());
const observations: Record<string, unknown>[] = [];
async function open(page: Page, lang: Language, level = 2, url = testSpacePath(lang, t1[level])) {
  if (process.env.DSR_PREFLIGHT && url === testSpacePath(lang, t1[level])) {
    const data = JSON.parse(fs.readFileSync(process.env.DSR_PREFLIGHT, 'utf8'));
    const dependencies = expectedPaths(lang, level).slice(2);
    const bad = data.entries.filter((e: {path:string;blocked:boolean}) => dependencies.includes(e.path) && e.blocked);
    // Blocked: Issue #DSR-552 — published fixture does not match QA manifest.
    test.fixme(bad.length > 0, `Blocked – test data: ${bad.map((e: {path:string}) => e.path).join(', ')}`);
  }
  const response = await page.goto(url);
  expect(response?.status()).toBe(200);
  const bc = new BreadcrumbPage(page); await expect(bc.breadcrumb).toBeVisible();
  // JOB-20261015-06: ancestors (and JSON-LD) are inserted asynchronously; wait until the trail is settled, as in the DSR-591 retest spec.
  await page.waitForLoadState('networkidle');
  let previous = -1;
  await expect.poll(async () => { const count = await bc.items.count(); const settled = count === previous; previous = count; return settled; },
    { intervals: [500], timeout: 10_000, message: 'breadcrumb item count settled' }).toBe(true);
  await page.evaluate(() => document.fonts.ready);
  observations.push({ language: lang, url: page.url(), status: response?.status(), texts: await bc.items.allTextContents(), jsonld: await bc.breadcrumbJsonLd() });
  return bc;
}
async function capture(page: Page, lang: Language) {
  const info = test.info(); const id = info.title.match(/DSR-BREAD-\d+/)![0];
  fs.mkdirSync(evidence, { recursive: true });
  const file = path.join(evidence, `${id}_${lang}_${info.errors.length ? 'fail' : 'pass'}${info.project.name === 'chromium' ? '' : '_' + info.project.name}.png`);
  await page.screenshot({ path: file, fullPage: true });
  await info.attach(`${lang}-evidence`, { path: file, contentType: 'image/png' });
}
test.beforeEach(() => { observations.length = 0; });
test.afterEach(async ({ page }, info) => {
  if (info.status !== 'skipped' && page.url() !== 'about:blank') await capture(page, (new URL(page.url()).pathname.split('/')[2] || 'ja') as Language);
  await info.attach('observed', { body: JSON.stringify(observations, null, 2), contentType: 'application/json' });
});
const localized = new Set([1,5,8,17,25]);
for (const lang of languages) {
 test.describe(lang, () => {
  test.beforeEach(() => {
    // Blocked: Issue #18
    test.fixme(lang === 'cn', 'cn: no /master/cn (Issue #18)');
  });
  for (const [number,title] of [[1,'child trail and placement'],[2,'ancestor links'],[3,'current page is not linked'],[4,'HOME label and destination'],[5,'grandchild trail order'],[6,'parent trail'],[7,'missing intermediate page'],[8,'HOME excludes breadcrumb'],[9,'404 excludes breadcrumb'],[11,'empty label uses title'],[17,'localized HOME destinations'],[25,'BreadcrumbList structured data'],[27,'semantic markup and accessibility'],[28,'keyboard navigation'],[31,'site-origin console errors'],[35,'arrow asset origin and status']] as const) {
   if (lang === 'en' && !localized.has(number)) continue;
   if (lang === 'cn' && !localized.has(number)) continue;
   test(`DSR-BREAD-${String(number).padStart(3,'0')} ${title}`, { tag: ['@groupA','@auto'] }, async ({page,request,baseURL}) => {
    if (lang === 'en' && [1,5,25].includes(number)) test.info().annotations.push({type:'bug',description:'Bug-INDEX'});
    if (number === 8 || number === 9) {
      const response = await page.goto(number === 8 ? homePath(lang) : testSpacePath(lang, 'dsr552-bc/not-exist'));
      await page.waitForLoadState('networkidle');
      const bc = new BreadcrumbPage(page); expect(await bc.breadcrumb.count()).toBe(0); expect(await bc.breadcrumbJsonLd()).toEqual([]);
      observations.push({language:lang,url:page.url(),status:response?.status(),breadcrumbCount:await bc.breadcrumb.count(),jsonld:await bc.breadcrumbJsonLd()});
      // JOB-20261016-07: HOME step blocked while /master/{lang} is 404 on DEV (blocker B3, not a breadcrumb bug); runs again once the top page is published.
      if (number === 8) test.fixme(response?.status() === 404, 'blocked-env: top page 404 on DEV (B3)');
      expect.soft(response?.status()).toBe(number === 8 ? 200 : 404); return;
    }
    if (number === 7) {
      if (process.env.DSR_PREFLIGHT) {
       const data=JSON.parse(fs.readFileSync(process.env.DSR_PREFLIGHT,'utf8'));
       const bad=data.entries.filter((e:{path:string;blocked:boolean})=>e.path.includes('dsr552-gap')&&e.blocked);
       // Blocked: Issue #DSR-552
       test.fixme(bad.length>0,`Blocked – test data: ${bad.map((e:{path:string})=>e.path).join(', ')}`);
      }
      expect((await page.goto(testSpacePath(lang,'dsr552-gap/x/leaf')))?.status()).toBe(200);
      const bc=new BreadcrumbPage(page); await expect(bc.items).toHaveText(['HOME','test space','QA Gap','QA Leaf']);
      for(const link of await bc.links.all()) expect((await request.get((await link.getAttribute('href'))!)).status()).toBe(200); return;
    }
    const errors: {message:string;url:string}[]=[];
    const resources: {url:string;status:number}[]=[];
    page.on('console', m=>{if(m.type()==='error') errors.push({message:m.text(),url:m.location().url});});
    page.on('pageerror', e=>errors.push({message:e.message,url:e.stack?.match(/https?:\/\/[^\s)]+/)?.[0]||''}));
    page.on('response',r=>{if(/\/blocks\/breadcrumb\/breadcrumb\.(js|css)(\?|$)/.test(r.url())) resources.push({url:r.url(),status:r.status()});});
    const level=[1,3,4,17].includes(number)?1:number===6?0:2;
    const bc=await open(page,lang,level); const paths=expectedPaths(lang,level);
    if ([1,5,6,11].includes(number)) {
      await expect.soft(bc.items).toHaveText(expectedTrail(lang,level));
      await expect.soft(bc.items).toHaveCount(level+3);
      if(number===1) expect.soft(await bc.breadcrumb.evaluate(nav=>{
        const section=nav.closest('main > [data-auto-block="breadcrumb"]');
        const header=document.querySelector('header'); const main=document.querySelector('main');
        return !!header && !!section && !!main && main.firstElementChild===section && !!(header.compareDocumentPosition(section)&Node.DOCUMENT_POSITION_FOLLOWING);
      })).toBe(true);
      if(number===6) expect(await bc.items.last().locator('a').count()).toBe(0);
      if(number===11) expect(await bc.items.allTextContents()).not.toContain('dsr552-bc');
    }
    if(number===2) {
      await expect(bc.links).toHaveCount(4);
      // JOB-20261016-07: HOME (i=0) is clicked last; its step is fixme while /master/{lang} is 404 on DEV (B3). Other links run first.
      for(const i of [1,2,3,0]) {
       const link=bc.links.nth(i); expect(normalizeUrl((await link.getAttribute('href'))!,baseURL!)).toBe(normalizeUrl(paths[i],baseURL!));
       expect(['_self',null,'']).toContain(await link.getAttribute('target'));
       const status = (await request.get(paths[i])).status();
       observations.push({language:lang,link:paths[i],status});
       if(i===0) test.fixme(status===404,'blocked-env: top page 404 on DEV (B3)');
       expect.soft(status).toBe(200);
       const pages=page.context().pages().length; await link.click(); await expect(page).toHaveURL(new RegExp(paths[i]+'/?$')); expect(page.context().pages().length).toBe(pages); await open(page,lang,2);
      }
    }
    if(number===3) {
      await expect(bc.items.last().getByTestId('breadcrumb-current')).toHaveAttribute('aria-current','page');
      expect(await bc.current.evaluate(el=>el.closest('a')===null)).toBe(true); const url=page.url(); await bc.current.click(); expect(page.url()).toBe(url);
    }
    if(number===4||number===17) {await expect(bc.links.first()).toHaveText('HOME');expect(normalizeUrl((await bc.links.first().getAttribute('href'))!,baseURL!)).toBe(normalizeUrl(homePath(lang),baseURL!));}
    if(number===25) {
      // JOB-20261016-07: JSON-LD was read before render (flaky); wait for the breadcrumb block to finish loading.
      await expect(page.locator('main [data-block-name="breadcrumb"]')).toHaveAttribute('data-block-status','loaded');
      const lists=await bc.breadcrumbJsonLd(); expect(lists).toHaveLength(1);
      const entries=lists[0].itemListElement as {position:number;name:string;item?:string}[];
      expect.soft(entries).toHaveLength(5);
      expect.soft(entries.map(e=>e.position)).toEqual([1,2,3,4,5]);
      expect.soft(entries.map(e=>e.name)).toEqual(expectedTrail(lang,2));
      expect.soft(entries.map(e=>e.name)).toEqual((await bc.items.allTextContents()).map(s=>s.trim()));
      for(let i=0;i<entries.length;i++){if(i===entries.length-1&&!entries[i].item)continue;expect.soft(entries[i].item).toMatch(/^https:\/\//);expect.soft(normalizeUrl(entries[i].item!,baseURL!)).toBe(normalizeUrl(paths[i],baseURL!));}
    }
    if(number===27) {
      expect(await bc.breadcrumb.evaluate(el=>el.tagName)).toBe('NAV');expect((await bc.breadcrumb.getAttribute('aria-label'))?.trim()).toBeTruthy();
      expect(await bc.list.evaluate(el=>el.tagName)).toBe('OL');expect(await bc.items.evaluateAll(els=>els.every(el=>el.tagName==='LI'&&el.parentElement?.tagName==='OL'))).toBe(true);
      await expect(bc.current).toHaveAttribute('aria-current','page'); for(const arrow of await bc.arrows.all())await expect(arrow).toHaveAttribute('alt','');
      const axe=await new AxeBuilder({page}).include('[data-testid="breadcrumb"]').analyze();await test.info().attach('axe',{body:JSON.stringify(axe.violations),contentType:'application/json'});expect(axe.violations).toEqual([]);
    }
    if(number===28) {
      // TODO: data-testid header; semantic header links used until supplied.
      const headerLinks=page.locator('header').getByRole('link'); const visible=[];
      for(const link of await headerLinks.all())if(await link.isVisible())visible.push(link);
      expect(visible.length).toBeGreaterThan(0);await visible[visible.length-1].focus();
      for(let i=0;i<3;i++) {await page.keyboard.press('Tab');const link=bc.links.nth(i);await expect(link).toBeFocused();expect(await link.evaluate(el=>{const s=getComputedStyle(el);return (s.outlineStyle!=='none'&&parseFloat(s.outlineWidth)>0)||s.boxShadow!=='none';})).toBe(true);}
      expect(await bc.current.evaluate(el=> (el as HTMLElement).tabIndex)).toBe(-1);
      await page.keyboard.press('Enter'); await expect(page).toHaveURL(new RegExp(testSpacePath(lang,t1[0])+'/?$'));
    }
    if(number===31) {
      await page.waitForLoadState('networkidle');await test.info().attach('console-and-resources',{body:JSON.stringify({errors,resources}),contentType:'application/json'});
      expect(errors.filter(e=>e.url.startsWith(new URL(baseURL!).origin))).toEqual([]);
      expect(resources.some(r=>r.url.includes('breadcrumb.js'))).toBe(true);expect(resources.some(r=>r.url.includes('breadcrumb.css'))).toBe(true);for(const r of resources)expect(r.status).toBe(200);
    }
    if(number===35) {expect(await bc.arrows.count()).toBeGreaterThan(0);for(const arrow of await bc.arrows.all()){const src=(await arrow.getAttribute('src'))!;const url=new URL(src,page.url());expect(url.host).toBe(new URL(page.url()).host);expect((await request.get(url.href)).status()).toBe(200);}}
   });
  }
 });
}
// JOB-20261016-01: display-name TCs on T2/T3 (Bug-FIELD DSR-592 dismissed 2026-10-15; data seeded by QA-PT night 15/10).
// Purposes follow the TC Excel: 010 display name over title, 014 100-char label, 015 special characters, 018 per-language labels.
const jobEvidence = path.resolve(process.env.DSR_JOB_EVIDENCE || evidence);
async function requireData(request: APIRequestContext, paths: string[]) {
  const missing: string[] = [];
  for (const p of paths) if ((await request.get(p)).status() === 404) missing.push(p);
  // Blocked: JOB-20261016-01 preflight — an unpublished fixture is blocked-data, not a failure.
  test.fixme(missing.length > 0, `Blocked – test data: ${missing.join(', ')} 404`);
}
for (const lang of ['ja', 'en'] as const) test(`DSR-BREAD-010 [${lang}] display name overrides page title`, { tag: ['@groupA', '@auto'] }, async ({ page, request, baseURL }) => {
  await requireData(request, t2.map(s => testSpacePath(lang, s)));
  const bc = await open(page, lang, 2, testSpacePath(lang, t2[2]));
  await expect.soft(bc.items).toHaveText(t2Trail(lang));
  const text = (await bc.breadcrumb.textContent()) ?? '';
  for (const title of t2Titles[lang].slice(0, 2)) expect.soft(text).not.toContain(title);
  // hrefs still point to the ancestor pages; only the label changes.
  const hrefs = (await bc.links.evaluateAll(els => els.map(el => el.getAttribute('href')!))).map(h => normalizeUrl(h, baseURL!));
  expect.soft(hrefs.slice(2)).toEqual(t2.slice(0, 2).map(s => normalizeUrl(testSpacePath(lang, s), baseURL!)));
  observations.push({ language: lang, hrefs });
  // TC step 3: on the child page the current (last) item is the child's display name.
  const child = await open(page, lang, 1, testSpacePath(lang, t2[1]));
  await expect.soft(child.items.last()).toHaveText(t2Labels[lang][1]);
  await expect.soft(child.current).toHaveText(t2Labels[lang][1]);
});
test('DSR-BREAD-014 [ja] 100-character display name keeps layout', { tag: ['@groupA', '@visual'] }, async ({ page, request }) => {
  await requireData(request, [t3Long.parent, t3Long.leaf].map(s => testSpacePath('ja', s)));
  // 1440 and 375 per job; 1024 is TC Excel step 1. Record only: Figma verdict by QA. SP display itself is open (DSR-575 Q5).
  for (const [name, viewport] of [['1440', viewports.PC], ['1024', { width: 1024, height: 768 }], ['375', viewports.SP]] as const) {
    await page.setViewportSize(viewport);
    const bc = await open(page, 'ja', 2, testSpacePath('ja', t3Long.leaf));
    await expect.soft(bc.items).toHaveText(t3Trail(t3Long));
    const metrics = await bc.breadcrumb.evaluate((nav, label) => {
      const item = Array.from(nav.querySelectorAll('[data-testid="breadcrumb-item"]')).find(li => li.textContent?.trim() === label) as HTMLElement | undefined;
      const text = (item?.querySelector('a, span') as HTMLElement | null) ?? item;
      const header = document.querySelector('header')?.getBoundingClientRect();
      const rect = nav.getBoundingClientRect(); const s = text ? getComputedStyle(text) : null;
      const lineHeight = s ? (parseFloat(s.lineHeight) || parseFloat(s.fontSize) * 1.2) : 0;
      return {
        viewportWidth: window.innerWidth, documentScrollWidth: document.documentElement.scrollWidth,
        navWidth: Math.round(rect.width), navHeight: Math.round(rect.height), navRight: Math.round(rect.right),
        labelWidth: text ? Math.round(text.getBoundingClientRect().width) : null,
        labelLines: text && lineHeight ? Math.round(text.getBoundingClientRect().height / lineHeight) : null,
        textOverflow: s?.textOverflow ?? null, whiteSpace: s?.whiteSpace ?? null, overflow: s?.overflow ?? null,
        clipped: text ? text.scrollWidth > text.clientWidth + 1 || text.scrollHeight > text.clientHeight + 1 : null,
        headerBottom: header ? Math.round(header.bottom) : null, navTop: Math.round(rect.top),
      };
    }, t3Long.label);
    const ellipsis = metrics.textOverflow === 'ellipsis' && !!metrics.clipped;
    observations.push({ viewport: name, ...metrics, ellipsis });
    fs.mkdirSync(jobEvidence, { recursive: true });
    const file = path.join(jobEvidence, `DSR-BREAD-014_ja_${name}.png`);
    await page.locator('main > [data-auto-block="breadcrumb"]').filter({ has: bc.breadcrumb }).screenshot({ path: file });
    await test.info().attach(`014-${name}`, { path: file, contentType: 'image/png' });
    expect.soft(metrics.documentScrollWidth, `${name}px: no horizontal page overflow`).toBeLessThanOrEqual(metrics.viewportWidth);
  }
});
test('DSR-BREAD-015 [ja] special characters in display name are plain text', { tag: ['@groupA', '@auto'] }, async ({ page, request }) => {
  await requireData(request, [t3Special.parent, t3Special.leaf].map(s => testSpacePath('ja', s)));
  const dialogs: string[] = []; const errors: { message: string; url: string }[] = [];
  page.on('dialog', d => { dialogs.push(`${d.type()}: ${d.message()}`); d.dismiss().catch(() => {}); });
  page.on('console', m => { if (m.type() === 'error') errors.push({ message: m.text(), url: m.location().url }); });
  page.on('pageerror', e => errors.push({ message: e.message, url: e.stack?.match(/https?:\/\/[^\s)]+/)?.[0] || '' }));
  // QA decision 2026-10-16: tag stripping upstream accepted
  // AEM strips <b>/<script> before the block, so the expected label is the published navtitle of the parent (meta + query-index), not the authored string.
  const parentPath = testSpacePath('ja', t3Special.parent);
  const metaNavtitle = await page.evaluate(html => new DOMParser().parseFromString(html, 'text/html').querySelector('meta[name="navtitle"]')?.getAttribute('content') ?? null,
    await (await request.get(parentPath)).text());
  const indexRows = (await (await request.get('/query-index.json')).json()).data as { path: string; navtitle: string }[];
  const indexNavtitle = indexRows.find(r => r.path === parentPath)?.navtitle ?? null;
  expect(metaNavtitle, 'published navtitle meta present').toBeTruthy();
  expect.soft(indexNavtitle, 'query-index navtitle equals meta navtitle').toBe(metaNavtitle);
  const navtitle = metaNavtitle!;
  const bc = await open(page, 'ja', 2, testSpacePath('ja', t3Special.leaf));
  await page.waitForTimeout(1000);
  const fourth = bc.items.nth(3);
  // Literal text (entities decoded as text are equivalent in textContent).
  expect.soft((await fourth.textContent())?.trim(), 'label equals published navtitle').toBe(navtitle);
  await expect.soft(bc.items).toHaveText(t3Trail({ ...t3Special, label: navtitle }));
  expect.soft(await bc.breadcrumb.locator('b, strong, script').count(), 'no <b>/<script> inside breadcrumb').toBe(0);
  const lists = await bc.breadcrumbJsonLd();
  const names = ((lists[0]?.itemListElement ?? []) as { name: string }[]).map(e => e.name);
  expect.soft(names[3], 'JSON-LD name equals published navtitle').toBe(navtitle);
  observations.push({ metaNavtitle, indexNavtitle, fourthInnerHTML: await fourth.innerHTML(), jsonldNames: names, dialogs, errors });
  expect.soft(dialogs, 'no dialog/alert fired').toEqual([]);
  expect.soft(errors, 'no console error').toEqual([]);
});
for (const lang of languages) test(`DSR-BREAD-018 [${lang}] each language uses its own display names`, { tag: ['@groupA', '@auto'] }, async ({ page, request }) => {
  // Blocked: Issue #18
  test.fixme(lang === 'cn', 'cn: no /master/cn (Issue #18)');
  const own = lang as 'ja' | 'en'; const other = own === 'ja' ? 'en' : 'ja';
  await requireData(request, t2.map(s => testSpacePath(own, s)));
  const bc = await open(page, own, 2, testSpacePath(own, t2[2]));
  await expect.soft(bc.items).toHaveText(t2Trail(own));
  const text = (await bc.breadcrumb.textContent()) ?? '';
  const foreign = [...t2Labels[other], ...t2Titles[other], testSpaceLabel(other)].filter(s => s && !t2Trail(own).includes(s));
  expect.soft(foreign.filter(s => text.includes(s)), 'no text from another language').toEqual([]);
});
for(const [number,title,reason,group,method] of [
 [19,'Japanese and Chinese fonts','DSR-555 + cn','C','visual'],[21,'SP breadcrumb and back control','DSR-575 Q5 (SP display)','B','visual'],[22,'SP parent navigation','DSR-575 Q5 (SP display)','B','auto'],[23,'narrow SP overflow','DSR-575 Q5 (SP display)','B','visual'],[29,'STG Lighthouse performance','Run on STG (Lighthouse)','C','auto'],[30,'movie breadcrumb regression','DSR-536 / movie-detail placement','C','auto'],[33,'all page types','Layout tickets','C','auto'],[34,'responsive movie back control','DSR-536 / movie-detail placement','C','auto']
] as const) test(`DSR-BREAD-${String(number).padStart(3,'0')} ${title}`,{tag:[`@group${group}`,`@${method}`]},async()=>{
 // Blocked: Issue #DSR-552 — dependency recorded verbatim below.
 test.fixme(true,reason);
});
for(const number of [20,32]) test(`DSR-BREAD-${String(number).padStart(3,'0')} ${number===20?'PC breadcrumb baseline':'cross-browser baseline'}`,{tag:['@groupA','@visual']},async({page},info)=>{
 test.skip(number===20&&info.project.name!=='chromium','TC-020 Chromium only');
 const bc=await open(page,'ja',1);
 // Shared Chromium baseline; project name deliberately excluded for TC-032.
 test.skip(['all', 'changed'].includes(info.config.updateSnapshots) && info.project.name !== 'chromium', 'Baseline creation uses Chromium only; comparison runs all browsers');
 await expect(page.locator('main > [data-auto-block="breadcrumb"]').filter({ has: bc.breadcrumb })).toHaveScreenshot(`DSR-BREAD-${number}_ja-chromium.png`,screenshotOptions);
});
