const { chromium, request } = require('@playwright/test');
const fs = require('fs');
const { execSync } = require('child_process');
const out = 'results/JOB-20261023-01';
const started = new Date().toISOString();
const result = {job:'JOB-20261023-01',agent:'codex',us:'DSR-557/654',env:'dev',started,status:'failed',head:execSync('git rev-parse HEAD').toString().trim(),tests:[],attempts:[],directFetches:[],lighthouse:[],code_changes:[`${out}/run.cjs`],questions:[]};
function parse(body) {
 try {
 const json = JSON.parse(body), items = json?.data?.related?.items ?? json?.data ?? null;
 if (!Array.isArray(items)) return {itemCount:null,items:null,json};
 return {itemCount:items.length,items:items.map(i=>({name:i.catalog?.catalogTitle??i.name??i.title??null,lang:i.lang??null,catalogLang:i.catalog?.lang??null,path:i._path??i.path??null,catalogPath:i.catalog?._path??null})),json};
 } catch {return {itemCount:null,items:null,parseError:'Not JSON'};}
}
(async()=>{
 const browser = await chromium.launch({headless:true}); result.browser=browser.version();
 try {
 for(let attempt=1;attempt<=3;attempt++) {
 await Promise.all(['live','page'].flatMap(host=>['ja','en'].map(async lang=>{
 const url=`https://main--dsr-eds-dev--sutrix-projects.aem.${host}/${lang}/library/catalog`;
 const context=await browser.newContext({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const page=await context.newPage(), pending=[], requests=new Map();
 const row={host,lang,attempt,url,started:new Date().toISOString(),requests:[],consoleErrors:[],pageErrors:[]};
 const match=u=>/dsr-catalog-list|query-index/.test(u);
 page.on('console',m=>{if(m.type()==='error')row.consoleErrors.push({text:m.text(),location:m.location()});});
 page.on('pageerror',e=>row.pageErrors.push(e.message));
 page.on('request',r=>{if(match(r.url())){const entry={url:r.url(),method:r.method(),status:null};requests.set(r,entry);row.requests.push(entry);}});
 page.on('requestfailed',r=>{if(requests.has(r))Object.assign(requests.get(r),{failure:r.failure(),timing:r.timing()});});
 page.on('response',r=>{if(match(r.url()))pending.push((async()=>{const entry=requests.get(r.request());entry.status=r.status();try{const body=await r.body();Object.assign(entry,{bodyLengthBytes:body.length,...parse(body.toString())});}catch(e){entry.bodyError=e.message;}entry.timing=r.request().timing();})());});
 try {
 const response=await page.goto(url,{waitUntil:'domcontentloaded',timeout:60000});row.httpStatus=response?.status()??null;
 await page.waitForTimeout(45000);
 await Promise.all(pending);
 row.finalUrl=page.url();
 // TODO: data-testid catalog-item / catalog-title; semantic selectors from CatalogDisplayPage.
 const cards=page.locator('.listing.listing-catalog .cards.catalog li');
 row.cardCount=await cards.count();row.cardTitles=await cards.locator('.cards-card-title').allTextContents();
 row.mainText=await page.locator('main').innerText().catch(()=>null);
 row.evidence=`evidence/JOB-20261023-01/${lang}-${host}-${attempt}.png`;
 await page.screenshot({path:row.evidence,animations:'disabled'});
 }catch(e){row.error=e.message;}
 row.finished=new Date().toISOString();result.attempts.push(row);fs.writeFileSync(`${out}/result.json`,JSON.stringify(result,null,2));
 console.log(JSON.stringify({host,lang,attempt,status:row.httpStatus,cards:row.cardCount,requests:row.requests.map(r=>({url:r.url,status:r.status}))}));
 await context.close();
 })));
 }
 for(const host of ['live','page'])for(const lang of ['ja','en']) {
 const observed=result.attempts.filter(r=>r.host===host&&r.lang===lang).flatMap(r=>r.requests).find(r=>r.url.includes('dsr-catalog-list'));
 const peer=result.attempts.filter(r=>r.host===host).flatMap(r=>r.requests).find(r=>r.url.includes('dsr-catalog-list'));
 if(!observed&&!peer){result.directFetches.push({host,lang,error:'No catalog query URL observed on either language'});continue;}
 const url=observed?.url??peer.url.replace(/\/en\//g,`/${lang}/`).replace(/%2Fen%2F/gi,`%2F${lang}%2F`);
 const record={host,lang,url,urlSource:observed?'observed page request':'derived from same-host peer request; target page made no catalog request'};
 const start=Date.now();try{const response=await request.newContext();const r=await response.get(url,{timeout:60000});const body=await r.body();Object.assign(record,{status:r.status(),durationMs:Date.now()-start,bodyLengthBytes:body.length,...parse(body.toString())});await response.dispose();}catch(e){record.error=e.message;}
 result.directFetches.push(record);
 }
 result.status='done';
 } finally {await browser.close();}
})().catch(e=>{result.error=e.stack;process.exitCode=1;}).finally(()=>{result.finished=new Date().toISOString();fs.writeFileSync(`${out}/result.json`,JSON.stringify(result,null,2));});
