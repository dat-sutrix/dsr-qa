import { test, expect, type Page } from '@playwright/test';
import AxeBuilder from '@axe-core/playwright';
import fs from 'fs';
import path from 'path';
import { BreadcrumbPage } from '../../pages/BreadcrumbPage';
import { viewports, languages, type Language, homePath, testSpacePath, t1, expectedTrail, expectedPaths, normalizeUrl, screenshotOptions } from '../../fixtures/dsr-552';

test.use({ viewport: viewports.PC });
const evidence = path.resolve('evidence/DSR-552', (process.env.ENV || 'dev').toUpperCase());
const observations: Record<string, unknown>[] = [];
async function open(page: Page, lang: Language, level = 2) {
  const url = testSpacePath(lang, t1[level]);
  if (process.env.DSR_PREFLIGHT) {
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
      expect.soft(response?.status()).toBe(number === 8 ? 200 : 404);
      await page.waitForLoadState('networkidle');
      const bc = new BreadcrumbPage(page); expect(await bc.breadcrumb.count()).toBe(0); expect(await bc.breadcrumbJsonLd()).toEqual([]);
      observations.push({language:lang,url:page.url(),status:response?.status(),breadcrumbCount:await bc.breadcrumb.count(),jsonld:await bc.breadcrumbJsonLd()}); return;
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
      for(let i=0;i<4;i++) {
       const link=bc.links.nth(i); expect(normalizeUrl((await link.getAttribute('href'))!,baseURL!)).toBe(normalizeUrl(paths[i],baseURL!));
       expect(['_self',null,'']).toContain(await link.getAttribute('target'));
       const status = (await request.get(paths[i])).status();
       observations.push({language:lang,link:paths[i],status}); expect.soft(status).toBe(200);
       const pages=page.context().pages().length; await link.click(); await expect(page).toHaveURL(new RegExp(paths[i]+'/?$')); expect(page.context().pages().length).toBe(pages); await open(page,lang,2);
      }
    }
    if(number===3) {
      await expect(bc.items.last().getByTestId('breadcrumb-current')).toHaveAttribute('aria-current','page');
      expect(await bc.current.evaluate(el=>el.closest('a')===null)).toBe(true); const url=page.url(); await bc.current.click(); expect(page.url()).toBe(url);
    }
    if(number===4||number===17) {await expect(bc.links.first()).toHaveText('HOME');expect(normalizeUrl((await bc.links.first().getAttribute('href'))!,baseURL!)).toBe(normalizeUrl(homePath(lang),baseURL!));}
    if(number===25) {
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
for(const [number,title,reason,group,method] of [
 [10,'display labels override titles','Bug-FIELD','A','auto'],[14,'long label wraps','Bug-FIELD (100-char label)','A','visual'],[15,'special label is literal text','Bug-FIELD','A','auto'],[18,'localized display labels','Bug-FIELD','A','auto'],[19,'Japanese and Chinese fonts','DSR-555 + cn','C','visual'],[21,'SP breadcrumb and back control','DSR-575 Q5 (SP display)','B','visual'],[22,'SP parent navigation','DSR-575 Q5 (SP display)','B','auto'],[23,'narrow SP overflow','DSR-575 Q5 (SP display)','B','visual'],[29,'STG Lighthouse performance','Run on STG (Lighthouse)','C','auto'],[30,'movie breadcrumb regression','DSR-536 / movie-detail placement','C','auto'],[33,'all page types','Layout tickets','C','auto'],[34,'responsive movie back control','DSR-536 / movie-detail placement','C','auto']
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
