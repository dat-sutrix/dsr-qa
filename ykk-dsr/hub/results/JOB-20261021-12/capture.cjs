const {chromium}=require('playwright');
const fs=require('node:fs');
const {execFileSync}=require('node:child_process');
(async()=>{
const result={job:'JOB-20261021-12',agent:'codex',us:'DSR-654',env:'dev',started:new Date().toISOString(),status:'done',tests:[],lighthouse:[],questions:[],code_changes:['ykk-dsr/hub/results/JOB-20261021-12/capture.cjs'],automation_head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),baseline:'DSR-654.spec.json TC 20.0; BL-OVL-1 update 2026-10-21',typescript:{command:'npx tsc --noEmit',exit_code:0,result:'no errors'},command:'node ykk-dsr/hub/results/JOB-20261021-12/capture.cjs',probes:[]};
let browser;let number=0;
try{
browser=await chromium.launch();result.browser=browser.version();
for(const target of ['/ja/library/catalog/qa190-cat-pdf-form','/en/library/catalog/qa190-cat-pdf-form','/master/ja/test-space/dsr-570-catalog-detail']){
const demo=target.includes('/master/');let selected;
for(const host of ['live','page']){
const url=`https://main--dsr-eds-dev--sutrix-projects.aem.${host}${target}`;
const response=await browser.newContext().then(async c=>{try{const r=await c.request.get(url);return {url,status:r.status(),final_url:r.url(),last_modified:r.headers()['last-modified']||null,body:(await r.text()).slice(0,500000)};}finally{await c.close();}});
const {body,...probe}=response;result.probes.push(probe);
if(response.status===200){selected=probe;break;}
}
if(!selected){result.tests.push({tc:'DSR-CATOV-020',lang:demo?'ja':target.split('/')[1],target,result:demo?'skip':'blocked',error:'Neither .aem.live nor .aem.page returns 200',suspect:'data',cause:'none',confidence:0,evidence:''});continue;}
for(const width of [1440,375]){
const context=await browser.newContext({viewport:{width,height:900},deviceScaleFactor:1});const page=await context.newPage();
const row={tc:'DSR-CATOV-020',lang:demo?'ja':target.split('/')[1],demo,width,url:selected.url,result:'blocked',error:'',evidence:'',suspect:'data',cause:'none',confidence:0,requests_failed:[]};
page.on('requestfailed',r=>row.requests_failed.push({url:r.url(),error:r.failure()?.errorText}));
try{
const r=await page.goto(selected.url,{waitUntil:'domcontentloaded',timeout:60000});row.http_status=r?.status();
await page.waitForTimeout(5000);
await page.evaluate(async()=>{await document.fonts.ready;for(let y=0;y<document.documentElement.scrollHeight;y+=650){scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}scrollTo(0,0);});
await page.waitForTimeout(1500);
Object.assign(row,await page.evaluate(()=>{const rect=e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y,width:r.width,height:r.height}};return {final_url:location.href,title:document.title,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,text:document.body.innerText,h1:[...document.querySelectorAll('h1')].map(e=>({text:e.innerText,...rect(e)})),blocks:[...document.querySelectorAll('main [data-block-name]')].map(e=>({name:e.dataset.blockName,status:e.dataset.blockStatus,...rect(e)})),headings:[...document.querySelectorAll('main h1, main h2, main h3')].map(e=>({tag:e.tagName,text:e.innerText,...rect(e)})),images:[...document.querySelectorAll('main img')].map(e=>({src:e.currentSrc,alt:e.alt,naturalWidth:e.naturalWidth,...rect(e)})),controls:[...document.querySelectorAll('main form, main button, main a, main iframe')].map(e=>({tag:e.tagName,text:e.innerText,href:e.getAttribute('href'),src:e.getAttribute('src'),...rect(e)})),meta:[...document.querySelectorAll('meta[name],meta[property]')].map(e=>({name:e.name||e.getAttribute('property'),content:e.content}))};}));
row.evidence=`evidence/DSR-654/DEV/DSR-CATOV-020_DEV_${String(++number).padStart(2,'0')}.png`;
await page.screenshot({path:row.evidence,fullPage:true});
row.result=row.final_url!==row.url||!row.blocks.some(b=>b.name==='catalog-detail' && b.height>0) || !row.h1.length?'blocked':row.scrollWidth>width?'fail':'pass';
row.error=row.result==='blocked'?'Catalog layout unavailable or navigation redirected; comparison Pending':row.result==='fail'?`Horizontal overflow: scrollWidth ${row.scrollWidth} > ${width}`:'';
if(row.result==='fail'){row.suspect='product';row.confidence=85;}
}catch(e){row.error=e.message.slice(0,200);row.suspect='env';}
result.tests.push(row);console.log(JSON.stringify({url:row.url,width,result:row.result,final_url:row.final_url,scrollWidth:row.scrollWidth,evidence:row.evidence,error:row.error}));await context.close();
}
}
}catch(e){result.status='failed';result.execution_error=e.message;}
finally{if(browser)await browser.close();result.finished=new Date().toISOString();fs.writeFileSync(__dirname+'/result.json',JSON.stringify(result,null,2)+'\n');}
})();
