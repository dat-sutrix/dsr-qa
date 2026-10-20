import { test, expect, devices, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';
const output = 'ykk-dsr/hub/results/JOB-20261020-01';
const target = '/master/ja/test-space/dsr-590-eco-top-page';
// TODO: data-testid eco-carousel-card-active, eco-category-summary, eco-carousel-dot, eco-finder-button.
// Component hooks match EcoProductsPage until the remaining test IDs land.
const active = '.eco-carousel-card.is-active';
test.setTimeout(90_000);
async function stable(page: Page) {
  await page.evaluate(async selector => {
    const start = performance.now(); let since = start; let previous = '';
    while (performance.now() - start < 15000) {
      const el = document.querySelector(selector)!;
      const state = `${el.getAttribute('data-index')}:${el.getBoundingClientRect().width}`;
      if (state !== previous) { previous = state; since = performance.now(); }
      if (performance.now() - since >= 500) return;
      await new Promise(resolve => requestAnimationFrame(resolve));
    }
    throw new Error('Active card width did not stabilise for 500 ms');
  }, active);
}
async function facts(page: Page) {
  return page.evaluate(() => {
    const root = document.querySelector('.eco-carousel')!;
    const card = root.querySelector('.eco-carousel-card.is-active')!;
    const rect = (el: Element | null): any => {
      if (!el) return null;
      const r = el.getBoundingClientRect(), s = getComputedStyle(el);
      return { x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom,
        text:el.textContent?.trim(),display:s.display,visibility:s.visibility,opacity:s.opacity };
    };
    return { timestamp: new Date().toISOString(), frameTime:performance.now(),url:location.href,
      scrollX,scrollY,scrollWidth:document.documentElement.scrollWidth,viewport:{width:innerWidth,height:innerHeight},
      activeIndex:card.getAttribute('data-index'),active:rect(card),
      neighbours:[rect(card.previousElementSibling),rect(card.nextElementSibling)],
      summary:rect(card.querySelector('.eco-carousel-desc')),viewMore:rect(card.querySelector('a')),
      dots:[...root.querySelectorAll('.eco-carousel-dot')].map(rect),
      arrows:[rect(root.querySelector('.eco-carousel-prev')),rect(root.querySelector('.eco-carousel-next'))],
      finderButton:rect(root.querySelector('.eco-carousel-cta')) };
  });
}
async function open(page: Page) {
  fs.mkdirSync(path.join(output,'evidence'),{recursive:true});
  const response = await page.goto(target);
  await page.locator(active).waitFor();
  await page.evaluate(async()=>{await document.fonts.ready;});
  await page.waitForTimeout(2000);
  // Align the carousel card region in the viewport without locator screenshot scrolling.
  await page.locator(active).evaluate(el=>scrollTo(0,Math.max(0,el.getBoundingClientRect().top+scrollY-60)));
  await stable(page);
  return {httpStatus:response?.status(),url:page.url(),browser:page.context().browser()?.version()};
}
async function capture(page: Page, name: string, fullPage = false) {
  await stable(page);
  const before = await facts(page);
  await page.screenshot({path:path.join(output,'evidence',name+'.png'),fullPage,scale:'css',animations:fullPage?'disabled':'allow'});
  const after = await facts(page);
  const geometry = (f: typeof before) => JSON.stringify({index:f.activeIndex,active:f.active,neighbours:f.neighbours,summary:f.summary,viewMore:f.viewMore,dots:f.dots,arrows:f.arrows,finder:f.finderButton,scrollX:f.scrollX,scrollY:f.scrollY});
  const unchanged = geometry(before) === geometry(after);
  fs.writeFileSync(path.join(output,name+'.json'),JSON.stringify({capture:`evidence/${name}.png`,fullPage,animations:fullPage?'disabled':'allow',before,after,geometryUnchanged:unchanged},null,2)+'\n');
  expect(unchanged,'Geometry unchanged across screenshot').toBe(true);
}
test('DSR-ECO-014 [ja] stable PC initial, Next, dot 5 and fullPage captures',async({page})=>{
  await page.setViewportSize({width:1440,height:900});
  const navigation = await open(page);
  fs.writeFileSync(path.join(output,'pc-navigation.json'),JSON.stringify(navigation,null,2));
  await capture(page,'DSR-ECO-014_DEV_01');
  await page.getByRole('button',{name:'次へ',exact:true}).click();
  await capture(page,'DSR-ECO-014_DEV_02');
  await page.locator('.eco-carousel-dot').nth(4).click();
  await capture(page,'DSR-ECO-014_DEV_03');
  await capture(page,'DSR-ECO-014_DEV_04',true);
});
test('DSR-ECO-016 [ja] stable SP initial and swipe captures',async({browser,baseURL})=>{
  const context = await browser.newContext({...devices['iPhone 13'],viewport:{width:375,height:812},baseURL});
  const page = await context.newPage();
  try {
    const navigation = await open(page);
    fs.writeFileSync(path.join(output,'sp-navigation.json'),JSON.stringify(navigation,null,2));
    await capture(page,'DSR-ECO-016_DEV_01');
    const box = await page.locator(active).boundingBox();
    const y = Math.min(700,box!.y+box!.height/2);
    const session = await context.newCDPSession(page);
    await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:300,y}]});
    for(let x=280;x>=70;x-=30){
      await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y}]});
      await page.waitForTimeout(25);
    }
    await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    fs.writeFileSync(path.join(output,'swipe.json'),JSON.stringify({fromX:300,toX:70,y,method:'CDP touchStart/touchMove/touchEnd'}));
    await capture(page,'DSR-ECO-016_DEV_02');
  } finally { await context.close(); }
});
