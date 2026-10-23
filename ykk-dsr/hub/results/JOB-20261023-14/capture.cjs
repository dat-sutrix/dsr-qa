const { chromium } = require('playwright');
const fs = require('node:fs');
const {execFileSync}=require('node:child_process');
const out='results/JOB-20261023-14';
(async()=>{
const result={job:'JOB-20261023-14',agent:'codex',us:'DSR-654 / DSR-570',env:'dev',started:new Date().toISOString(),status:'done',automation_head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),tests:[],lighthouse:[],questions:[],code_changes:['ykk-dsr/hub/results/JOB-20261023-14/capture.cjs'],build:[]};
const base='https://main--dsr-eds-dev--sutrix-projects.aem.live';
const browser=await chromium.launch();result.browser=browser.version();
try{
const req=await browser.newContext();
for(const ext of ['js','css']){const url=base+'/blocks/catalog-detail/catalog-detail.'+ext;const r=await req.request.get(url);result.build.push({url,status:r.status(),last_modified:r.headers()['last-modified']||null,etag:r.headers().etag||null});}
await req.close();
for(const target of ['/ja/library/catalog/qa190-cat-pdf-form','/en/library/catalog/qa190-cat-pdf-form','/ja/library/catalog/qa190-cat-ebook-form','/en/library/catalog/qa190-cat-ebook-form','/master/ja/test-space/dsr-570-catalog-detail']){
for(const [width,height] of [[1440,900],[390,844]]){
const id=(target.includes('test-space')?'demo-ja':target.split('/')[1]+'-'+(target.includes('ebook')?'ebook':'pdf'))+'-'+width;
const row={tc:'DSR-CATOV-020',id,lang:target.includes('/en/')?'en':'ja',url:base+target,viewport:{width,height},console_errors:[],http_errors:[],page_errors:[],requests_failed:[],screenshots:[]};
const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1});const page=await context.newPage();
page.on('console',m=>{if(m.type()==='error')row.console_errors.push(m.text());});page.on('response',r=>{if(r.status()>=400)row.http_errors.push({url:r.url(),status:r.status()});});page.on('pageerror',e=>row.page_errors.push(e.message));page.on('requestfailed',r=>row.requests_failed.push({url:r.url(),error:r.failure()?.errorText}));
try{
const r=await page.goto(row.url,{waitUntil:'domcontentloaded',timeout:45000});row.http_status=r?.status();await page.waitForTimeout(4000);
await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.documentElement.scrollHeight;y+=700){scrollTo(0,y);await new Promise(r=>setTimeout(r,80));}scrollTo(0,0);});await page.waitForTimeout(500);
Object.assign(row,await page.evaluate(()=>{const rect=e=>{const r=e.getBoundingClientRect();return{x:r.x,y:r.y+scrollY,width:r.width,height:r.height}};const nodes=s=>[...document.querySelectorAll(s)].map(e=>({tag:e.tagName,class:e.className,text:e.innerText||'',...rect(e)}));return{final_url:location.href,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,text:document.body.innerText,headings:nodes('main h1, main h2, main h3'),regions:nodes('main [data-block-name], .catalog-detail-summary, .catalog-detail-cover, .catalog-detail-info, .catalog-detail-date, .catalog-detail-category, main form'),images:[...document.querySelectorAll('main img')].map(e=>({src:e.currentSrc,alt:e.alt,naturalWidth:e.naturalWidth,...rect(e)})),controls:nodes('main button, main input, main select, main label, main a'),main_html:document.querySelector('main')?.innerHTML};}));
let n=0;for(let y=0;;y+=height-(width===1440?160:64)){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(150);const actual=await page.evaluate(()=>scrollY);const path=`${out}/evidence/${id}-${String(++n).padStart(2,'0')}.png`;await page.screenshot({path,fullPage:false});row.screenshots.push({path,scrollY:actual});if(actual+height>=await page.evaluate(()=>document.documentElement.scrollHeight))break;if(n>=20)throw Error('Capture limit reached');}
row.result='pass';row.error='';row.cause='none';row.confidence=0;
if(row.scrollWidth>width){row.result='fail';row.error=`Horizontal overflow ${row.scrollWidth} > ${width}`;row.suspect='product';row.confidence=85;}
if(!row.headings.length||row.final_url!==row.url){row.result='blocked';row.error='Catalog content missing or redirected';row.suspect='data';}
row.evidence=row.screenshots[0]?.path;
row.geometry_result=row.result;
if(row.lang==='en' && row.regions.some(r=>r.tag==='FORM' && r.text.includes('氏名'))){row.result='fail';row.error='English catalog form displays Japanese labels, consent text and download button';row.suspect='product';row.cause='none';row.confidence=70;}
row.japanese_text=row.lang==='en'?row.text.split('\n').filter(t=>/[\u3040-\u30ff\u3400-\u9fff]/.test(t)):[];
}catch(e){row.result='blocked';row.error=e.message.slice(0,200);row.suspect='env';row.cause='none';row.confidence=0;}
result.tests.push(row);console.log(id,row.result,row.http_status,row.scrollWidth,row.headings?.map(h=>h.text),row.screenshots.length);await context.close();
}
}
}catch(e){result.status='failed';result.execution_error=e.message;}finally{await browser.close();result.finished=new Date().toISOString();fs.writeFileSync('ykk-dsr/hub/results/JOB-20261023-14/result.json',JSON.stringify(result,null,2)+'\n');}
})();
