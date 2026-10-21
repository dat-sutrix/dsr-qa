const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('fs');
(async()=>{
 const run={started:new Date().toISOString(),head:require('child_process').execSync('git rev-parse HEAD').toString().trim(),captures:[]};
 const browser=await chromium.launch({headless:true});run.browser=browser.version();
 for(const host of ['page','live']) for(const lang of ['ja','en']) for(const width of [1440,375]){
 const start=Date.now(); const context=await browser.newContext({viewport:{width,height:width===1440?900:812},deviceScaleFactor:1}); const page=await context.newPage();
 const row={id:`${host}-${lang}-${width}`,lang,width,url:`https://main--dsr-eds-dev--sutrix-projects.aem.${host}/${lang}/products/46`,consoleErrors:[],pageErrors:[],failedRequests:[],httpErrors:[],productData:[]};
 page.on('console',m=>{if(m.type()==='error')row.consoleErrors.push(m.text())});page.on('pageerror',e=>row.pageErrors.push(e.message));page.on('requestfailed',r=>row.failedRequests.push({url:r.url(),error:r.failure()?.errorText}));
 const pending=[];page.on('response',r=>{if(r.status()>=400)row.httpErrors.push({url:r.url(),status:r.status()});if(r.url().includes('graphql/execute'))pending.push((async()=>{try {const data=await r.json(); row.productData.push({url:r.url(),status:r.status(),data})}catch{}})())});
 try {const response=await page.goto(row.url,{waitUntil:'domcontentloaded',timeout:60000});row.status=response?.status();row.finalUrl=page.url();await page.waitForTimeout(5000);
 await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=700){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}window.scrollTo(0,0);await document.fonts.ready;});await page.waitForTimeout(1500);
 row.observed=await page.evaluate(()=>({title:document.title,text:document.body.innerText,headings:[...document.querySelectorAll('h1,h2,h3')].map(e=>e.textContent),meta:[...document.querySelectorAll('meta[name],meta[property]')].map(e=>({name:e.getAttribute('name')||e.getAttribute('property'),content:e.content})),width:document.documentElement.scrollWidth,height:document.documentElement.scrollHeight}));
 row.evidence=`evidence/DSR-586/baseline-20261021/${row.id}.png`;await page.screenshot({path:row.evidence,fullPage:true});await Promise.allSettled(pending);
 }catch(e){row.error=e.message;}row.durationMs=Date.now()-start;run.captures.push(row);await context.close();console.log(row.id,row.status,row.error||'',row.evidence);fs.writeFileSync('ykk-dsr/hub/results/JOB-ZZ-IDLE-23/observations.json',JSON.stringify(run,null,2)+'\n');
 }await browser.close();run.finished=new Date().toISOString();fs.writeFileSync('ykk-dsr/hub/results/JOB-ZZ-IDLE-23/observations.json',JSON.stringify(run,null,2)+'\n');
})();
