// Read-only observations for JOB-ZY-REG-20261023-1620-claude-code step 4 (no verdict).
// DSR-667 geometry reuses JOB-20261023-12 capture.cjs (same selectors, viewports, waits).
// TODO: data-testid eco-carousel-dot, eco-carousel-next, eco-carousel-dots.
const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('node:fs');
const dir='ykk-dsr/hub/results/JOB-ZY-REG-20261023-1620-claude-code';
const base=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL;
(async()=>{
 const browser=await chromium.launch();const out={started:new Date().toISOString(),dsr667:[],label671:[]};
 try{
  for(const host of ['live','page'])for(const [width,height] of [[393,852],[390,844],[375,667]]){
   const url=base.replace('.aem.live','.aem.'+host)+'/master/ja/test-space/dsr-590-eco-top-page';
   const r={host,width,height,url};out.dsr667.push(r);
   const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
   try{
    const res=await page.goto(url,{waitUntil:'networkidle',timeout:60000});r.httpStatus=res.status();
    await page.locator('.eco-carousel-dot').nth(8).waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
    await page.locator('.eco-carousel-controls').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
    Object.assign(r,await page.evaluate(()=>{const rect=s=>document.querySelector(s).getBoundingClientRect().toJSON();const dots=[...document.querySelectorAll('.eco-carousel-dot')];const dot9=dots[8].getBoundingClientRect().toJSON(),next=rect('.eco-carousel-next'),container=rect('.eco-carousel-dots');
     return {dotCount:dots.length,dot9,next,container,clearance:next.left-dot9.right,clippedRight:Math.max(0,dot9.right-container.right),overflowX:getComputedStyle(document.querySelector('.eco-carousel-dots')).overflowX,dotRows:new Set(dots.map(d=>Math.round(d.getBoundingClientRect().top))).size};}));
    if(host==='live'){r.evidence=`${dir}/evidence/DSR-667_live_${width}.png`;fs.mkdirSync(`${dir}/evidence`,{recursive:true});await page.screenshot({path:r.evidence,scale:'css'});}
   }catch(e){r.error=String(e.message).slice(0,200);}finally{await page.close();}
  }
  for(const lang of ['ja','en']){
   const url=`${base}/${lang}/products/990586001`;const r={url};out.label671.push(r);
   const page=await browser.newPage();
   try{
    const res=await page.goto(url,{waitUntil:'networkidle',timeout:60000});r.httpStatus=res.status();r.finalUrl=page.url();await page.waitForTimeout(1500);
    Object.assign(r,await page.evaluate(()=>{const t=document.body.innerText;return {h1:document.querySelector('h1')?.textContent.trim()??null,title:document.title,fullwidthBar:(t.match(/[^\n]{0,40}｜[^\n]{0,40}/g)||[]).slice(0,5),idOccurrences:(t.match(/990586001[^\n]{0,40}/g)||[]).slice(0,5)};}));
   }catch(e){r.error=String(e.message).slice(0,200);}finally{await page.close();}
  }
 }finally{await browser.close();}
 out.finished=new Date().toISOString();fs.writeFileSync(`${dir}/observations.json`,JSON.stringify(out,null,1));
})();
