const { chromium } = require('playwright');
const fs = require('node:fs');
const path = require('node:path');
const { execFileSync } = require('node:child_process');
(async () => {
 const started = new Date();
 const base = 'https://main--dsr-eds-dev--sutrix-projects.aem.live';
 const result = {job:'JOB-20261020-11',agent:'codex',us:'DSR-587',env:'dev',started:started.toISOString(),status:'done',tests:[],lighthouse:[],code_changes:[],questions:[], automation_head:execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim(),base_url:base,baseline:'BL-OVL-1; job TC 19.0 measurable expectation; Figma C08 unavailable',design_comparison:'Pending Claude web; SP informational'};
 let browser;
 try {
 browser = await chromium.launch({headless:true});
 result.browser = browser.version();
 for (const target of ['/en/library/video/qa587-rel-a','/en/library/video/qa587-main','/ja/library/video/qa587-main']) {
 for (const [device,width,height] of [['PC',1440,900],['SP',390,844]]) {
 const start = Date.now();
 const context = await browser.newContext({viewport:{width,height},deviceScaleFactor:1});
 const page = await context.newPage();
 const row = {tc:'DSR-587 19.0',lang:target.split('/')[1],device,url:base+target,viewport:{width,height},result:'blocked',error:'',evidence:'',suspect:'env'};
 try {
 const response = await page.goto(row.url,{waitUntil:'networkidle',timeout:60000});
 row.http_status=response?.status(); row.last_modified=response?.headers()['last-modified']||null;
 await page.evaluate(()=>document.fonts.ready);
 // Trigger lazy content without clicking controls or playing media.
 await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=600){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,120));}window.scrollTo(0,0);});
 await page.waitForTimeout(2000);
 Object.assign(row,await page.evaluate(()=>({final_url:location.href,title:document.title,scrollWidth:document.documentElement.scrollWidth,scrollHeight:document.documentElement.scrollHeight,h1:[...document.querySelectorAll('h1')].map(e=>e.textContent.trim()),text:document.body.innerText,meta:[...document.querySelectorAll('meta[name],meta[property]')].map(e=>({name:e.getAttribute('name')||e.getAttribute('property'),content:e.content})),related_links:[...document.querySelectorAll('main a[href*="/library/video/"]')].map(e=>({text:e.innerText,href:e.href})),images:[...document.querySelectorAll('main img')].map(e=>({src:e.currentSrc,complete:e.complete,naturalWidth:e.naturalWidth}))})));
 row.evidence=`evidence/DSR-587-19.0_${row.lang}_${target.split('/').pop()}_${device}.png`;
 await page.screenshot({path:path.join(__dirname,row.evidence),fullPage:true});
 row.result = row.http_status===200 && row.final_url===row.url && row.scrollWidth<=width ? 'pass':'fail';
 if(row.result==='fail'){row.error=`HTTP ${row.http_status}; final URL ${row.final_url}; scrollWidth ${row.scrollWidth} (max ${width})`.slice(0,200);row.suspect=row.scrollWidth>width?'product':'env';row.cause='none';row.confidence=row.scrollWidth>width?85:50;}
 } catch(e){row.error=e.message.slice(0,200);row.cause='none';row.confidence=0;result.status='failed';}
 row.duration_ms=Date.now()-start;result.tests.push(row);
 console.log(JSON.stringify({url:row.url,device,result:row.result,status:row.http_status,scrollWidth:row.scrollWidth,evidence:row.evidence,error:row.error}));
 await context.close();
 }
 }
 } catch(e){result.status='failed';result.execution_error=e.message;}
 finally{if(browser)await browser.close();}
 result.finished=new Date().toISOString();result.duration_ms=Date.now()-started.getTime();
 result.evidence_bytes=fs.readdirSync(path.join(__dirname,'evidence')).reduce((s,f)=>s+fs.statSync(path.join(__dirname,'evidence',f)).size,0);
 if(result.evidence_bytes>5_000_000){result.status='failed';result.execution_error='Evidence exceeds 5 MB budget';}
 fs.writeFileSync(path.join(__dirname,'result.json'),JSON.stringify(result,null,2)+'\n');
 process.exitCode=result.status==='failed'?1:0;
})();
