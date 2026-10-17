const fs=require('fs');
const {chromium}=require('/home/qa/dsr-qa-codex/node_modules/playwright');
const {execFileSync}=require('child_process');
const root='/home/qa/dsr-qa-codex', out=root+'/ykk-dsr/hub/results/JOB-ZZ-IDLE-08';
const base='https://main--dsr-eds-dev--sutrix-projects.aem.live';
const paths=['/master/ja','/master/en',...['ja','en'].map(l=>`/master/${l}/test-space/dsr552-bc/child/grandchild`),...['ja','en'].map(l=>`/master/${l}/test-space/list-catalog`),'/master/en/test-space/dsr-173-video-detail','/master/ja/test-space/product-list','/master/en/test-space/dsr-278-product-detail'];
const data={started:new Date().toISOString(),head:execFileSync('git',['rev-parse','HEAD'],{cwd:root,encoding:'utf8'}).trim(),base,paths,runs:[],pages:[],medians:[]};
function save(){fs.writeFileSync(out+'/lighthouse-summary.json',JSON.stringify(data,null,2)+'\n');}
(async()=>{
const browser=await chromium.launch({headless:true});
const ctx=await browser.newContext({viewport:{width:390,height:844},deviceScaleFactor:1,isMobile:true,hasTouch:true});
const page=await ctx.newPage(); const events=[]; const active=new Map(); const begin=Date.now();
page.on('request',r=>{const e={url:r.url(),type:r.resourceType(),startMs:Date.now()-begin};events.push(e);active.set(r,e);});
page.on('requestfinished',r=>{if(active.has(r)){active.get(r).endMs=Date.now()-begin;active.delete(r);}});
page.on('requestfailed',r=>{if(active.has(r)){active.get(r).endMs=Date.now()-begin;active.get(r).failure=r.failure()?.errorText;active.delete(r);}});
try {
const response=await page.goto(base+paths.at(-1),{waitUntil:'load',timeout:120000});
const loadMs=Date.now()-begin;await page.waitForTimeout(3000);const captureMs=Date.now()-begin;
await page.screenshot({path:out+'/evidence/dsr-278-product-detail_390x844.png',fullPage:true,timeout:120000});
data.capture={status:'captured',url:page.url(),httpStatus:response.status(),title:await page.title(),viewport:{width:390,height:844},loadMs,captureMs,completedMs:Date.now()-begin,evidence:'evidence/dsr-278-product-detail_390x844.png'};
const counts=new Map();for(const e of events){let c=counts.get(e.url)||{url:e.url,count:0,afterLoadCount:0,inFlightAtCapture:0};c.count++;if(e.startMs>=loadMs)c.afterLoadCount++;if(e.startMs<=captureMs&&(!e.endMs||e.endMs>captureMs))c.inFlightAtCapture++;counts.set(e.url,c);}
data.capture.network={observation:'Navigation through screenshot completion; candidates only, not proof of the earlier timeout cause.',requests:events,urlCounts:[...counts.values()],busyRequests:[...counts.values()].filter(c=>c.afterLoadCount||c.inFlightAtCapture)};
}catch(e){data.capture={status:'failed',error:e.message};}save();await browser.close();
const {default:lighthouse}=await import('/home/qa/.npm/_npx/0f94ee7615faf582/node_modules/lighthouse/core/index.js');
const launcher=await import('/home/qa/.npm/_npx/0f94ee7615faf582/node_modules/chrome-launcher/dist/index.js');
const {default:desktop}=await import('/home/qa/.npm/_npx/0f94ee7615faf582/node_modules/lighthouse/core/config/desktop-config.js');
for(const path of paths){
const url=base+path;let p={url};try{const res=await fetch(url);p.httpStatus=res.status;p.finalUrl=res.url;await res.arrayBuffer();}catch(e){p.error=e.message;}data.pages.push(p);save();
if(p.httpStatus===404){p.skipped='HTTP 404';save();continue;}
for(const device of ['mobile','desktop'])for(let run=1;run<=3;run++){
let chrome;let r={url,device,run,started:new Date().toISOString()};try{
chrome=await launcher.launch({chromePath:chromium.executablePath(),chromeFlags:['--headless','--no-sandbox','--disable-dev-shm-usage']});
const result=await lighthouse(url,{port:chrome.port,output:'json',logLevel:'error',onlyCategories:['performance','accessibility','best-practices','seo']},device==='desktop'?desktop:undefined);
const lhr=result.lhr;fs.writeFileSync(`/tmp/idle08/raw-${paths.indexOf(path)}-${device}-${run}.json`,JSON.stringify(lhr));
r.version=lhr.lighthouseVersion;r.finalUrl=lhr.finalDisplayedUrl;r.runtimeError=lhr.runtimeError;r.warnings=lhr.runWarnings;r.settings=lhr.configSettings;r.scores=Object.fromEntries(Object.entries(lhr.categories).map(([k,v])=>[k,v.score===null?null:Math.round(v.score*100)]));
r.failingAudits=Object.values(lhr.audits).filter(a=>typeof a.score==='number'&&a.score<1).map(a=>({id:a.id,score:a.score,displayValue:a.displayValue??null}));
}catch(e){r.error=e.message;}finally{if(chrome)await chrome.kill();}
r.finished=new Date().toISOString();data.runs.push(r);save();console.log(path,device,run,JSON.stringify(r.scores||r.error));
}}
data.finished=new Date().toISOString();save();
})().catch(e=>{data.error=e.stack;save();console.error(e);process.exitCode=1;});
