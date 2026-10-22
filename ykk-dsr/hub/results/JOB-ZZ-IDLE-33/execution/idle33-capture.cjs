const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');const fs=require('fs');
(async()=>{const browser=await chromium.launch({headless:true});const results=[];
for(const width of [1440,390]){
const page=await browser.newPage({viewport:{width,height:900},deviceScaleFactor:2});
const response=await page.goto('https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/dsr-590-eco-top-page');await page.waitForTimeout(5000);
const carousel=page.locator('.eco-carousel').first();await carousel.scrollIntoViewIfNeeded();await page.waitForTimeout(1000);
const prefix='evidence/DSR-590/20261022/lf/TOP-'+width;
await page.screenshot({path:prefix+'.png',fullPage:true});
const controls=await carousel.locator('button').evaluateAll(bs=>bs.map(b=>{const r=b.getBoundingClientRect();return {text:b.textContent,label:b.getAttribute('aria-label'),class:b.className,x:r.x,y:r.y,width:r.width,height:r.height}}));
const visible=controls.filter(b=>b.width&&b.height);const minY=Math.min(...visible.map(b=>b.y)),maxY=Math.max(...visible.map(b=>b.y+b.height));
await page.screenshot({path:prefix+'-controls-2x.png',fullPage:true,clip:{x:0,y:Math.max(0,minY+await page.evaluate(()=>scrollY)-20),width,height:maxY-minY+40}});
results.push({width,status:response.status(),url:page.url(),controls,screenshots:[prefix+'.png',prefix+'-controls-2x.png']});await page.close();
}await browser.close();fs.writeFileSync('ykk-dsr/hub/results/JOB-ZZ-IDLE-33/visual-observations.json',JSON.stringify(results,null,2));})();
