// Read-only job capture; geometry reused from IDLE-41; font wait follows layout-capture spec.
// TODO: data-testid eco-carousel, eco-carousel-dot, eco-carousel-next, eco-carousel-dots.
const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('node:fs');
const dir='ykk-dsr/hub/results/JOB-20261023-12';
const started=new Date().toISOString();
const stamp=started.replace(/[-:]/g,'').slice(0,15);
const out=`${dir}/evidence/DSR-590/retest-666`;
const url=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL+'/master/ja/test-space/dsr-590-eco-top-page';
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch();const records=[];
 try{for(const host of ['live','page'])for(const lang of ['ja','en'])for(const [width,height] of [[1440,900],[428,926],[393,852],[390,844],[375,667]]){
 const target=url.replace('.aem.live','.aem.'+host).replace('/ja/','/'+lang+'/');const r={host,lang,width,height,requestedUrl:target,evidence:[],consoleErrors:[]};records.push(r);
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 page.on('console',m=>{if(m.type()==='error')r.consoleErrors.push(m.text())});page.on('pageerror',e=>r.consoleErrors.push(e.message));
 try{
 const response=await page.goto(target,{waitUntil:'networkidle',timeout:60000});r.httpStatus=response.status();r.finalUrl=page.url();if(r.httpStatus!==200){r.error='HTTP '+r.httpStatus;continue;}
 await page.locator('.eco-carousel-dot').nth(8).waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
 r.reg=await page.evaluate(()=>({title:document.querySelector('h1')?.textContent,header:!!document.querySelector('header'),breadcrumb:!!document.querySelector('[data-testid="breadcrumb"]'),carousel:!!document.querySelector('.eco-carousel'),lists:[...document.querySelectorAll('[class*="listing"]')].map(e=>({class:e.className,text:e.textContent.trim().slice(0,150)})),headings:[...document.querySelectorAll('h1,h2')].map(e=>e.textContent.trim())}));
 r.css=[];for(const href of await page.locator('link[rel="stylesheet"]').evaluateAll(es=>es.map(e=>e.href).filter(h=>/eco|breadcrumb/.test(h)))){const cr=await page.request.get(href);r.css.push({url:href,status:cr.status(),lastModified:cr.headers()['last-modified']??null});}
 r.gap=await page.evaluate(()=>{const rect=s=>{const e=document.querySelector(s);if(!e)throw Error('Missing '+s);return e.getBoundingClientRect().toJSON()};const breadcrumb=rect('[data-testid="breadcrumb"]'),section=rect('.breadcrumb-section'),hero=rect('.eco-carousel');return {breadcrumb,section,hero,navGap:hero.top-breadcrumb.bottom,sectionGap:hero.top-section.bottom,scrollY};});
 const top=`${out}/${host}-${lang}-${width}x${height}-top.png`;await page.screenshot({path:top,fullPage:false,scale:'css'});r.evidence.push(top);
 await page.locator('.eco-carousel-controls').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 r.controls=await page.evaluate(()=>{const rect=s=>{const e=document.querySelector(s);if(!e)throw Error('Missing '+s);return e.getBoundingClientRect().toJSON()};const dots=[...document.querySelectorAll('.eco-carousel-dot')];const dot9=dots[8].getBoundingClientRect().toJSON(),next=rect('.eco-carousel-next'),container=rect('.eco-carousel-dots');return {dotCount:dots.length,dot9,next,container,clearance:next.left-dot9.right,clippedRight:Math.max(0,dot9.right-container.right),overflowX:getComputedStyle(document.querySelector('.eco-carousel-dots')).overflowX,scrollY};});
 const controls=`${out}/${host}-${lang}-${width}x${height}-controls.png`;if(width!==1440){await page.screenshot({path:controls,fullPage:false,scale:'css'});r.evidence.push(controls);}r.capturedAt=new Date().toISOString();
 }catch(e){r.error=e.message;}finally{await page.close();}
 }}finally{await browser.close();}
 fs.writeFileSync(`${dir}/measurements.json`,JSON.stringify({started,finished:new Date().toISOString(),records},null,2)+'\n');
 console.log(JSON.stringify(records.map(r=>({host:r.host,lang:r.lang,width:r.width,http:r.httpStatus,gap:r.gap?.sectionGap,reg:r.reg,errors:r.consoleErrors,error:r.error,controls:r.controls})),null,2));
})().catch(e=>{console.error(e);process.exitCode=1});
