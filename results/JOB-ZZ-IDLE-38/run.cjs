const { chromium } = require('playwright');
const fs = require('fs');
const cp = require('child_process');
const out='results/JOB-ZZ-IDLE-38';
const data={started:new Date().toISOString(),baseURL:'https://main--dsr-eds-dev--sutrix-projects.aem.live',head:cp.execSync('git rev-parse HEAD',{encoding:'utf8'}).trim(),pages:[]};
(async()=>{
 const browser=await chromium.launch({headless:true});
 for(const lang of ['ja','en']) for(const kind of ['catalog','article','video']) for(const [device,width,height] of [['PC',1440,900],['SP',390,844]]) {
 const path=kind==='article'?`/master/${lang}/library/article/stories/qa529-01`:`/${lang}/library/${kind}${kind==='video'?'/search':''}`;
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 const row={lang,kind,device,path,viewport:{width,height},screenshots:[],consoleErrors:[]};data.pages.push(row);
 page.on('pageerror',e=>row.consoleErrors.push(e.message));
 try{
 const response=await page.goto(data.baseURL+path,{waitUntil:'networkidle',timeout:60000});row.status=response.status(); await page.waitForTimeout(5000);row.finalURL=page.url();
 let target=0;
 for(let i=0;i<40;i++){
 await page.evaluate(y=>window.scrollTo(0,y),target);await page.waitForTimeout(650);
 const metrics=await page.evaluate(()=>({scrollY,scrollHeight:document.documentElement.scrollHeight,width:document.documentElement.clientWidth,scrollWidth:document.documentElement.scrollWidth}));
 const file=`evidence/baseline-20261023/${lang}-${kind}-${device}-${String(i+1).padStart(2,'0')}.png`;
 await page.screenshot({path:file,fullPage:false});row.screenshots.push({file,...metrics});
 if(metrics.scrollY+height>=metrics.scrollHeight-1)break;
 target+=700;
 }
 row.dom=await page.evaluate(()=>{const main=document.querySelector('main');return {title:document.title,text:main?.innerText||'',blocks:[...document.querySelectorAll('main .block')].map(e=>({class:e.className,html:e.outerHTML})),images:[...document.images].map(e=>({src:e.currentSrc||e.src,complete:e.complete,naturalWidth:e.naturalWidth,visible:!!(e.getBoundingClientRect().width&&e.getBoundingClientRect().height)})),links:[...(main?.querySelectorAll('a')||[])].map(e=>({text:e.innerText,href:e.getAttribute('href'),class:e.className}))};});
 }catch(e){row.error=e.message;}
 await page.close();fs.writeFileSync(`${out}/measurements.json`,JSON.stringify(data,null,2));console.log(`${lang} ${kind} ${device}: HTTP ${row.status}, ${row.screenshots.length} captures`);
 }
 await browser.close();data.finished=new Date().toISOString();fs.writeFileSync(`${out}/measurements.json`,JSON.stringify(data,null,2));
})();
