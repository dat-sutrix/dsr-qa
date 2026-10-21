const fs = require('fs');
const { chromium } = require('@playwright/test');
require('dotenv').config({path:'envs/dev.env',quiet:true});
const root = __dirname;
const targets = [ ['catalog','en','page','/en/library/catalog','list-catalog'], ['catalog','en','live','/en/library/catalog','list-catalog'], ['video','ja','page','/ja/library/video/search','video-list'], ['video','en','page','/en/library/video/search','video-list'], ['product','ja','page','/ja/product/performance/sustainable/product-index','product-list'], ['product','en','page','/en/product/performance/sustainable/product-index','product-list'] ];
(async()=>{
const data={started:new Date().toISOString(),captures:[]};
const browser=await chromium.launch({headless:true});
try {
for(const [name,lang,host,newPath,oldName] of targets) for(const width of [1440,375]) {
 const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});
 for(const [kind,path] of [['new',newPath],['old',`/master/${lang}/test-space/${oldName}`]]) {
 const page=await context.newPage(); const id=`${name}-${lang}-${host}-${width}-${kind}`; const start=Date.now();
 const rec={id,name,lang,host,width,kind,requestedUrl:process.env.BASE_URL.replace(/\/$/,'').replace('.aem.live',`.aem.${host}`)+path};
 try {
 const res=await page.goto(rec.requestedUrl,{waitUntil:'networkidle',timeout:60000}); rec.status=res.status();
 await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.body.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}window.scrollTo(0,0);});
 await page.waitForTimeout(1500);
 rec.finalUrl=page.url(); rec.raw=await page.evaluate(()=>({title:document.title,text:document.body.innerText,meta:[...document.querySelectorAll('meta')].map(m=>({name:m.name||m.getAttribute('property'),content:m.content})),height:document.documentElement.scrollHeight,blocks:[...document.querySelectorAll('main [data-block-name]')].map(e=>({name:e.dataset.blockName,rect:e.getBoundingClientRect().toJSON()}))}));
 rec.screenshot=`baselines/${id}.png`; await page.screenshot({path:`${root}/${rec.screenshot}`,fullPage:true});
 }catch(e){rec.error=e.message;}
 rec.durationMs=Date.now()-start;data.captures.push(rec);fs.writeFileSync(`${root}/captures.json`,JSON.stringify(data,null,2)+'\n');console.log(id,rec.status||rec.error);await page.close();
 }
 await context.close();
}
}finally{await browser.close();data.finished=new Date().toISOString();fs.writeFileSync(`${root}/captures.json`,JSON.stringify(data,null,2)+'\n');}
})();
