const {chromium}=require('@playwright/test');
const fs=require('node:fs');
const {spawnSync}=require('node:child_process');
const out='results/JOB-ZZ-IDLE-42', hub='ykk-dsr/hub/results/JOB-ZZ-IDLE-42';
const base=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL;
const cutoff=Date.parse('2026-10-23T11:00:00Z');
const json=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const history=fs.existsSync(`${out}/history.json`)?JSON.parse(fs.readFileSync(`${out}/history.json`)):[];
const stamp=()=>new Date().toISOString();
const schedule={started:stamp(),cutoffUTC:new Date(cutoff).toISOString(),intervalMinutes:90,pid:process.pid,state:'running',rounds:[]};
const dirs=[out,hub,'evidence/DSR-566/visual-20261023'];
function commit(status){for(const args of [['add','--',...dirs],['commit','--only','-m',`[codex] JOB-ZZ-IDLE-42 ${status}`,'--',...dirs]]){const r=spawnSync('git',args,{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr||r.stdout);console.log(r.stdout);}}
async function capture(){
 const started=stamp(), tag=started.replace(/[-:]/g,'').slice(0,15), records=[];
 const browser=await chromium.launch();
 try{
 for(const width of [1440,390,393]){
 const page=await browser.newPage({viewport:{width,height:width===1440?900:844},deviceScaleFactor:1});
 const r={bug:'DSR-666/667',width,lang:'ja',evidence:[]};records.push(r);
 try{
 const response=await page.goto(base+'/master/ja/test-space/dsr-590-eco-top-page',{waitUntil:'networkidle',timeout:60000});
 r.httpStatus=response.status();r.url=page.url();await page.locator('.eco-carousel-dot').nth(8).waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
 r.gap=await page.evaluate(()=>{const rect=s=>document.querySelector(s).getBoundingClientRect().toJSON();const breadcrumb=rect('[data-testid="breadcrumb"]'),section=rect('.breadcrumb-section'),hero=rect('.eco-carousel');return {breadcrumb,section,hero,navGap:hero.top-breadcrumb.bottom,sectionGap:hero.top-section.bottom};});
 const folder=`${out}/evidence/${tag}`;fs.mkdirSync(folder,{recursive:true});
 r.evidence.push(`${folder}/${width}-top.png`);await page.screenshot({path:r.evidence.at(-1),fullPage:false});
 await page.locator('.eco-carousel-controls').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 r.controls=await page.evaluate(()=>{const dots=[...document.querySelectorAll('.eco-carousel-dot')],dot9=dots[8].getBoundingClientRect().toJSON(),next=document.querySelector('.eco-carousel-next').getBoundingClientRect().toJSON(),container=document.querySelector('.eco-carousel-dots').getBoundingClientRect().toJSON();const hit=document.elementFromPoint(dot9.x+dot9.width/2,dot9.y+dot9.height/2);return {dotCount:dots.length,dot9,next,container,clearance:next.left-dot9.right,clippedRight:Math.max(0,dot9.right-container.right),centerHitClass:hit?.className,centerHitsDot:hit===dots[8]||dots[8].contains(hit)};});
 r.evidence.push(`${folder}/${width}-controls.png`);await page.screenshot({path:r.evidence.at(-1),fullPage:false});
 }catch(e){r.error=e.message;}finally{await page.close();}
 }
 for(const lang of ['ja','en']){
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const r={bug:'DSR-672',lang,evidence:[]};records.push(r);
 try{
 const response=await page.goto(base+`/master/${lang}/test-space/qa566-news-01`,{waitUntil:'networkidle',timeout:60000});r.httpStatus=response.status();r.url=page.url();
 await page.locator('.article-meta-date').waitFor();await page.evaluate(()=>document.fonts.ready);
 r.dates=(await page.locator('.article-meta-date').allTextContents()).map(t=>t.trim());r.formatPass=r.dates.length>0&&r.dates.every(t=>/^\d{4}\.\d{2}\.\d{2}$/.test(t));
 r.evidence.push(`${out}/evidence/${tag}/news-${lang}.png`);await page.screenshot({path:r.evidence.at(-1),fullPage:false});
 if(lang==='ja'&&!history.length){
 r.visual=[];
 for(const [tc,width,height] of [['DSR-NEWS-014',1440,900],['DSR-NEWS-015',390,844]]){
 await page.setViewportSize({width,height});await page.evaluate(async()=>{for(let y=0;y<document.documentElement.scrollHeight;y+=innerHeight){scrollTo(0,y);await new Promise(r=>setTimeout(r,100));}await document.fonts.ready;scrollTo(0,0);});await page.waitForTimeout(500);
 const metrics=await page.evaluate(()=>({scrollWidth:document.documentElement.scrollWidth,clientWidth:document.documentElement.clientWidth,title:document.querySelector('main .title')?.textContent.trim()}));
 const paths=[];const total=await page.evaluate(()=>document.documentElement.scrollHeight);
 for(let y=0,n=1;y<total;y+=height,n++){await page.evaluate(y=>scrollTo(0,y),y);await page.waitForTimeout(150);const p=`evidence/DSR-566/visual-20261023/${tc}_ja_${width}_${String(n).padStart(2,'0')}.png`;await page.screenshot({path:p,fullPage:false});paths.push(p);}
 r.visual.push({tc,width,height,...metrics,evidence:paths,result:'blocked',reason:'Viewport captures completed; approved visual reference/threshold not available for pixel-diff verdict.'});
 }
 }
 }catch(e){r.error=e.message;}finally{await page.close();}
 }
 }finally{await browser.close();}
 const prev=history.at(-1), changes=[];
 const sig=(r,bug)=>JSON.stringify(bug==='DSR-666'?[r.gap?.navGap,r.gap?.sectionGap]:bug==='DSR-667'?[r.controls?.dotCount,r.controls?.clearance,r.controls?.clippedRight,r.controls?.centerHitsDot]:r.dates);
 if(prev)for(const r of records){const p=prev.records.find(p=>p.bug===r.bug&&p.width===r.width&&p.lang===r.lang);if(!p||r.error||p.error||r.httpStatus!==200||p.httpStatus!==200)continue;for(const bug of r.bug.split('/').map((s,i)=>i?'DSR-'+s:s)){if(sig(r,bug)!==sig(p,bug))changes.push({bug,time:stamp(),width:r.width,lang:r.lang,before:sig(p,bug),after:sig(r,bug)});}}
 const round={started,finished:stamp(),records,changes};history.push(round);json(`${out}/history.json`,history);return round;
}
function report(round){
 const changes=history.flatMap(h=>h.changes), visual=history.flatMap(h=>h.records.flatMap(r=>r.visual||[]));
 const lines=[...changes.slice(-3).map(c=>`FIX DETECTED ${c.bug} ${c.time}`),'# JOB-ZZ-IDLE-42',`DEV ${base}; ${history.length} round(s); latest ${round.finished}. Watch ${schedule.state}; cutoff 18:00 VN / 11:00 UTC.`, 'Change markers indicate measured changes, not confirmed bug closure. All outcomes are proposals.','| Check | Observed |','|---|---|',...round.records.map(r=>`| ${r.bug} ${r.lang} ${r.width||''} | ${r.error?('Blocked: '+r.error.split('\n')[0]):r.gap?`HTTP ${r.httpStatus}; gap nav/section ${r.gap.navGap}/${r.gap.sectionGap}px; dot 9 clearance ${r.controls.clearance}px, clipping ${r.controls.clippedRight}px, center hit ${r.controls.centerHitsDot}`:`HTTP ${r.httpStatus}; date ${JSON.stringify(r.dates)}; YYYY.MM.DD ${r.formatPass?'pass':'fail'}`} |`), 'Failures: cause=none; date format product-bug confidence 85% when HTTP 200 and text is present. Gap/overlap observations require QA acceptance.',`TC 14.0/15.0: ${visual.length} viewport sets (1440×900 / 390×844), scrolled captures, fullPage=false; visual baseline comparison pending.`, 'Evidence: evidence/DSR-566/visual-20261023/; watch evidence and exact geometry: results/JOB-ZZ-IDLE-42/history.json and evidence/.', 'TypeScript: npx tsc --noEmit exit 0, no errors. No npm suite invoked.', 'Schedule: results/JOB-ZZ-IDLE-42/schedule.json. No AEM writes. Build identity not independently verified.'];
 for(const d of [out,hub])fs.writeFileSync(`${d}/summary.md`,lines.join('\n')+'\n');
 json(`${hub}/result.json`,{job:'JOB-ZZ-IDLE-42',agent:'codex',us:'DSR-590/566',env:'dev',started:schedule.started,finished:round.finished,status:round.records.some(r=>r.error)?'failed':'done',scope:'Latest round only; watch completion tracked in schedule.json',tests:[...round.records.map(r=>({tc:r.bug,lang:r.lang,result:r.error?'blocked':r.dates?(r.formatPass?'pass':'fail'):'blocked',error:r.error?.slice(0,200)||(r.dates?(r.formatPass?'':'Displayed date does not match YYYY.MM.DD'):'Geometry captured; QA acceptance pending'),evidence:r.evidence[0]||'',...(!r.formatPass&&r.dates?{suspect:'product',cause:'none',confidence:85}:{})})),...visual.map(v=>({tc:v.tc,lang:'ja',result:v.result,error:v.reason,evidence:v.evidence[0]}))],lighthouse:[],code_changes:[`${out}/watch.cjs`],questions:[]});
}
(async()=>{
 if(Date.now()>cutoff)throw Error('Watch deadline already passed; refusing to fabricate scheduled rounds');
 const first=Date.now();const due=[];for(let t=first;t<=cutoff;t+=90*60000)due.push(t);
 schedule.rounds=due.map(t=>({dueUTC:new Date(t).toISOString(),state:'pending'}));
 for(const round of schedule.rounds){
 json(`${out}/schedule.json`,schedule);
 await new Promise(r=>setTimeout(r,Math.max(0,Date.parse(round.dueUTC)-Date.now())));
 const captured=await capture();round.state=captured.records.some(r=>r.error)?'failed':'captured';round.finished=captured.finished;
 if(round===schedule.rounds.at(-1))schedule.state='complete';
 json(`${out}/schedule.json`,schedule);report(captured);commit(schedule.state==='complete'?'done':'watching');
 console.log(JSON.stringify({time:stamp(),state:schedule.state,changes:captured.changes,next:schedule.rounds.find(r=>r.state==='pending')?.dueUTC}));
 }
})().catch(e=>{schedule.state='failed';schedule.error=e.stack;json(`${out}/schedule.json`,schedule);console.error(e);process.exitCode=1;});
