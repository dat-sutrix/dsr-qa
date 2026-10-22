const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('fs');
const out='evidence/DSR-590/20261022/lf2';
const resultDir='ykk-dsr/hub/results/JOB-ZZ-IDLE-34';
(async()=>{
 const started=new Date().toISOString();const browser=await chromium.launch();const records=[];
 try {
 for(const name of ['top','detail'])for(const [width,height] of [[1440,900],[390,844]]){
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:width===390?3:1});
 const url=`https://main--dsr-eds-dev--sutrix-projects.aem.live/master/ja/test-space/dsr-590-eco-${name}-page`;
 const response=await page.goto(url);await page.waitForTimeout(3000);await page.evaluate(()=>document.fonts.ready);
 await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}scrollTo(0,0)});await page.waitForTimeout(1000);
 const r={name,width,height,url:page.url(),httpStatus:response.status(),screenshots:[]};
 r.geometry=await page.evaluate((name)=>{const rect=s=>{const e=document.querySelector(s);if(!e)throw Error('Missing '+s);return {selector:s,...e.getBoundingClientRect().toJSON()}};const breadcrumb=rect('[data-testid="breadcrumb"]'),section=rect('.breadcrumb-section'),hero=rect(name==='top'?'.eco-carousel':'.hero-banner');return {breadcrumb,section,hero,gapFromNav:hero.top-breadcrumb.bottom,gapFromSection:hero.top-section.bottom,scrollY,scrollHeight:document.documentElement.scrollHeight}},name);
 const max=await page.evaluate(()=>Math.max(0,document.documentElement.scrollHeight-innerHeight));const positions=[];for(let y=0;y<max;y+=600)positions.push(y);positions.push(max);
 for(const y of positions){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(350);const actual=await page.evaluate(()=>scrollY);const file=`${out}/${name}-${width}-y${actual}.png`;await page.screenshot({path:file,fullPage:false,scale:'css',animations:'disabled'});r.screenshots.push({file,scrollY:actual});}
 if(width===390&&await page.locator('.eco-carousel-controls').count()){
 const controls=page.locator('.eco-carousel-controls');await controls.scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 r.controls=await controls.locator('button').evaluateAll(bs=>bs.map(b=>({class:b.className,label:b.getAttribute('aria-label'),text:b.textContent,...b.getBoundingClientRect().toJSON()})));
 const box=await controls.boundingBox();const file=`${out}/${name}-${width}-controls-3x.png`;
 await page.screenshot({path:file,clip:{x:0,y:Math.max(0,box.y-15),width:390,height:box.height+30},scale:'device',animations:'disabled'});r.controlsCrop=file;
 }
 await page.evaluate(()=>scrollTo(0,0));await page.addStyleTag({content:'header{position:static!important}'});await page.waitForTimeout(350);
 const full=`${out}/${name}-${width}-header-static-full.png`;await page.screenshot({path:full,fullPage:true,scale:'css',animations:'disabled'});r.staticHeaderFullPage=full;
 records.push(r);fs.writeFileSync(`${out}/measurements.json`,JSON.stringify({started,records},null,2)+'\n');await page.close();
 }
 }finally{await browser.close()}
 fs.writeFileSync(`${out}/measurements.json`,JSON.stringify({started,finished:new Date().toISOString(),records},null,2)+'\n');
 console.log(JSON.stringify(records.map(({screenshots,...r})=>({...r,viewportCaptures:screenshots.length})),null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
