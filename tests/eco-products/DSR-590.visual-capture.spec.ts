import { test, expect, devices, type Page } from '@playwright/test';
import fs from 'node:fs';
import path from 'node:path';

const output = path.resolve('ykk-dsr/hub/results/JOB-20261019-09');
const target = '/master/ja/test-space/dsr-590-eco-top-page';
// TODO: data-testid eco-carousel, eco-carousel-card, eco-carousel-label and typography hooks.
// Semantic component classes are temporary hooks; no layout-dependent selectors.
const block = '.eco-carousel';
const active = '.eco-carousel-card.is-active';
test.setTimeout(60_000);
async function open(page: Page) {
  fs.mkdirSync(path.join(output, 'evidence'), { recursive: true });
  const response = await page.goto(target);
  await page.locator(active).waitFor();
  await page.evaluate(async () => { await document.fonts.ready; });
  await page.waitForTimeout(1000); // Allow initial carousel transitions and eager images to settle.
  return { url: page.url(), httpStatus: response?.status(), browser: page.context().browser()?.version() };
}
async function facts(page: Page) {
  return page.locator(block).evaluate(root => {
    const rect = (e: Element) => { const r = e.getBoundingClientRect(); return { x:r.x,y:r.y,width:r.width,height:r.height,right:r.right,bottom:r.bottom }; };
    const style = (e: Element) => { const s = getComputedStyle(e); return {text:e.textContent?.trim(), ...rect(e), fontSize:s.fontSize,lineHeight:s.lineHeight,writingMode:s.writingMode,transform:s.transform,rotate:s.rotate,display:s.display,visibility:s.visibility,opacity:s.opacity}; };
    const card = root.querySelector('.eco-carousel-card.is-active')!;
    const next = card.nextElementSibling!;
    return { scrollX,scrollY,scrollWidth:document.documentElement.scrollWidth,innerWidth, viewportHeight:innerHeight,
      block:rect(root), activeIndex:card.getAttribute('data-index'), active:rect(card),
      inactive:rect(next), gap:next.getBoundingClientRect().x-card.getBoundingClientRect().right,
      heading:style(root.querySelector('h1')!), cardHeading:style(card.querySelector('h2')!),
      summary:style(card.querySelector('.eco-carousel-desc')!), lead:style(root.querySelector('.eco-carousel-lead')!),
      viewMore:style(card.querySelector('a')!), inactiveLabel:style(next.querySelector('.eco-carousel-label')!),
      nextArrow:rect(root.querySelector('.eco-carousel-next')!), finderButton:rect(root.querySelector('.eco-carousel-cta')!),
      images:Array.from(root.querySelectorAll('img')).filter(i=>i.getBoundingClientRect().right>0 && i.getBoundingClientRect().left<innerWidth).map(i=>({src:i.currentSrc,loaded:i.complete&&i.naturalWidth>0})),
    };
  });
}
const save = (name: string, data: unknown) => fs.writeFileSync(path.join(output,name), JSON.stringify(data,null,2)+'\n');

test('DSR-ECO-014 [ja] PC carousel visual capture and measurements', async ({ page }) => {
  await page.setViewportSize({width:1440,height:900});
  const navigation = await open(page);
  await page.screenshot({path:path.join(output,'evidence/DSR-ECO-014_DEV_01.png'),fullPage:true,scale:'css'});
  await page.evaluate(()=>scrollTo(0,0));
  const initial = await facts(page);
  await page.locator(block).screenshot({path:path.join(output,'evidence/DSR-ECO-014_DEV_02.png'),scale:'css'});
  // TODO: data-testid eco-carousel-next
  await page.getByRole('button',{name:'次へ',exact:true}).click();
  await page.waitForTimeout(900);
  await page.evaluate(()=>scrollTo(0,0));
  const afterNext = await facts(page);
  await page.locator(block).screenshot({path:path.join(output,'evidence/DSR-ECO-014_DEV_03.png'),scale:'css'});
  save('pc-facts.json',{navigation,viewport:{width:1440,height:900},initial,afterNext,verdict:'captured'});
  expect(navigation.httpStatus).toBe(200);
  expect(afterNext.activeIndex).not.toBe(initial.activeIndex);
});

test('DSR-ECO-016 [ja] SP capture, horizontal overflow and carousel interaction facts', async ({ browser, baseURL }) => {
  const context = await browser.newContext({...devices['iPhone 13'],viewport:{width:375,height:812},baseURL});
  const page = await context.newPage();
  try {
    const navigation = await open(page);
    await page.screenshot({path:path.join(output,'evidence/DSR-ECO-016_DEV_01.png'),fullPage:true,scale:'css'});
    await page.evaluate(()=>scrollTo(0,0));
    const initial = await facts(page);
    await page.getByRole('button',{name:'次へ',exact:true}).tap();
    await page.waitForTimeout(900);
    const afterArrow = await facts(page);
    await page.locator(active).scrollIntoViewIfNeeded();
    const box = await page.locator(active).boundingBox();
    if (!box) throw new Error('Active card has no bounding box');
    const y = Math.max(20,Math.min(700,box.y+box.height/2));
    const session = await context.newCDPSession(page);
    await session.send('Input.dispatchTouchEvent',{type:'touchStart',touchPoints:[{x:300,y}]});
    for (let x=280;x>=70;x-=30) {
      await session.send('Input.dispatchTouchEvent',{type:'touchMove',touchPoints:[{x,y}]});
      await page.waitForTimeout(25);
    }
    await session.send('Input.dispatchTouchEvent',{type:'touchEnd',touchPoints:[]});
    await page.waitForTimeout(900);
    const afterSwipe = await facts(page);
    const checks = {scrollWidthPass:initial.scrollWidth<=375,arrowWorks:afterArrow.activeIndex!==initial.activeIndex,swipeWorks:afterSwipe.activeIndex!==afterArrow.activeIndex,
      activeHorizontallyInside:[initial,afterArrow,afterSwipe].every(f=>f.active.x>=0&&f.active.right<=375)};
    save('sp-facts.json',{navigation,emulation:'iPhone 13 / Chromium; viewport overridden to 375×812; screenshots CSS pixels',initial,afterArrow,afterSwipe,swipe:{fromX:300,toX:70,y,method:'CDP touchStart/touchMove/touchEnd'},checks});
    expect(navigation.httpStatus).toBe(200);
    expect(initial.scrollWidth,'document.documentElement.scrollWidth <= 375').toBeLessThanOrEqual(375);
  } finally { await context.close(); }
});
