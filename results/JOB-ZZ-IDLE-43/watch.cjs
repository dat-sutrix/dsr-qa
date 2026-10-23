const {chromium}=require('@playwright/test');
const fs=require('node:fs');
const {spawnSync}=require('node:child_process');
const out='results/JOB-ZZ-IDLE-43', hub='ykk-dsr/hub/results/JOB-ZZ-IDLE-43';
const base=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL;
const cutoff=Date.parse('2026-10-23T11:00:00Z');
const json=(p,v)=>fs.writeFileSync(p,JSON.stringify(v,null,2)+'\n');
const history=fs.existsSync(`${out}/history.json`)?JSON.parse(fs.readFileSync(`${out}/history.json`)):[];
const stamp=()=>new Date().toISOString();
const schedule={started:stamp(),cutoffUTC:new Date(cutoff).toISOString(),intervalMinutes:90,pid:process.pid,state:'running',rounds:[]};
const dirs=[out,hub];
function commit(status){for(const args of [['add','--',...dirs],['commit','--only','-m',`[codex] JOB-ZZ-IDLE-43 ${status}`,'--',...dirs]]){const r=spawnSync('git',args,{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr||r.stdout);console.log(r.stdout);}}
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
 for(const lang of ['ja']){
 const page=await browser.newPage({viewport:{width:1440,height:900},deviceScaleFactor:1});
 const r={bug:'DSR-672',lang,evidence:[]};records.push(r);
 try{
 const response=await page.goto(base+`/master/${lang}/test-space/qa566-news-02`,{waitUntil:'networkidle',timeout:60000});r.httpStatus=response.status();r.url=page.url();
 await page.locator('.article-meta-date').waitFor();await page.evaluate(()=>document.fonts.ready);
 r.dates=(await page.locator('.article-meta-date').allTextContents()).map(t=>t.trim());r.formatPass=r.dates.length>0&&r.dates.every(t=>/^\d{4}\.\d{2}\.\d{2}$/.test(t));
 r.evidence.push(`${out}/evidence/${tag}/news-${lang}.png`);await page.screenshot({path:r.evidence.at(-1),fullPage:false});
 }catch(e){r.error=e.message;}finally{await page.close();}
 }
 }finally{await browser.close();}
 const prev=history.at(-1)||JSON.parse(fs.readFileSync('results/JOB-ZZ-IDLE-42/history.json')).at(-1), changes=[];
 const sig=(r,bug)=>JSON.stringify(bug==='DSR-666'?[r.gap?.navGap,r.gap?.sectionGap]:bug==='DSR-667'?[r.controls?.dotCount,r.controls?.clearance,r.controls?.clippedRight,r.controls?.centerHitsDot]:r.dates);
 if(prev)for(const r of records){const p=prev.records.find(p=>p.bug===r.bug&&p.width===r.width&&p.lang===r.lang&&p.url===r.url);if(!p||r.error||p.error||r.httpStatus!==200||p.httpStatus!==200)continue;for(const bug of r.bug.split('/').map((s,i)=>i?'DSR-'+s:s)){if(sig(r,bug)!==sig(p,bug))changes.push({bug,time:stamp(),width:r.width,lang:r.lang,before:sig(p,bug),after:sig(r,bug)});}}
 const round={started,finished:stamp(),records,changes};history.push(round);json(`${out}/history.json`,history);return round;
}
function report(round){
 const changes=history.flatMap(h=>h.changes);
 const lines=[...changes.slice(-3).map(c=>`CHANGED ${c.bug} ${c.time}`),'# JOB-ZZ-IDLE-43',`DEV ${base}; ${history.length} rounds; latest ${round.finished}; schedule=${schedule.state}; cutoff 11:00 UTC / 18:00 VN.`,
 'Compared with latest IDLE-42 geometry; identical exact-value change detection. Date on news-02 establishes a new baseline (news-01 is a different page).',
 '| Check | Observed |','|---|---|',...round.records.map(r=>`| ${r.bug} ${r.width||"news-02"} | ${r.error?('Blocked: '+r.error.split('\n')[0]):r.gap?`HTTP ${r.httpStatus}; nav/section gap ${r.gap.navGap}/${r.gap.sectionGap}px; dot9 clearance ${r.controls.clearance}px; clipping ${r.controls.clippedRight}px; center hit ${r.controls.centerHitsDot}`:`HTTP ${r.httpStatus}; date ${JSON.stringify(r.dates)}; format ${r.formatPass?'pass':'fail'}`} |`),
 'Geometry outcomes remain QA proposals, using IDLE-42 acceptance policy; changes do not confirm closure.',
 'TC 14.0/15.0 Pending: Figma 6010-59004 export unavailable; four existing viewport captures inspected. See results/JOB-ZZ-IDLE-43/visual-review.md.',
 'L&F historical points: ISO date (85%); Back to list absent (70%); My List/share absent (50%); all cause=none. No Figma differences asserted.',
 'npx tsc --noEmit: exit 0, no errors. No npm test suite invoked. Build identity not independently verified.',
 'Raw geometry, URLs, HTTP statuses and screenshot paths: results/JOB-ZZ-IDLE-43/history.json. Schedule: schedule.json in the same folder.',
 'Screenshots are viewport-based; unchanged captures deduplicated. No AEM writes. Original IDLE-42 process left untouched.' ];
 for(const d of [out,hub])fs.writeFileSync(`${d}/summary.md`,lines.join('\n')+'\n');
 const result={job:'JOB-ZZ-IDLE-43',agent:'codex',us:'DSR-590/566',env:'dev',started:schedule.started,finished:round.finished,status:'needs-input',watch_state:schedule.state,tests:round.records.map(r=>({tc:r.bug,lang:r.lang,width:r.width,result:r.error?'blocked':r.dates?(r.formatPass?'pass':'fail'):'blocked',error:(r.error||(r.dates?(r.formatPass?'':'Date does not match YYYY.MM.DD'):'Geometry captured; QA acceptance pending')).slice(0,200),evidence:r.evidence[0]||'',...(r.dates&&!r.formatPass?{suspect:'product',cause:'none',confidence:85}:{})})).concat(['DSR-NEWS-014','DSR-NEWS-015'].map(tc=>({tc,lang:'ja',result:'blocked',error:'Figma export and comparison threshold unavailable; see visual-review.md',evidence:'evidence/DSR-566/visual-20261023/'}))),lighthouse:[],code_changes:[`${out}/watch.cjs`],questions:['Provide accessible Figma 6010-59004 export and applicable comparison threshold; repository and available tools contain no reference.']};
 for(const d of [out,hub])json(`${d}/result.json`,result);
}
// Retain first unique observations; avoid committing repeated identical captures.
function deduplicate(round){
 for(const r of round.records){
 const old=history.slice(0,-1).flatMap(h=>h.records).find(p=>p.url===r.url&&p.width===r.width&&JSON.stringify([p.gap,p.controls,p.dates,p.error])===JSON.stringify([r.gap,r.controls,r.dates,r.error]));
 if(old){for(const path of r.evidence)fs.unlinkSync(path);r.evidence=old.evidence;}
 }
 json(`${out}/history.json`,history);
}
(async()=>{
 if(Date.now()>cutoff)throw Error('Watch deadline passed');
 // Preserve the previous job cadence and also establish news-02 immediately.
 const prior=JSON.parse(fs.readFileSync('results/JOB-ZZ-IDLE-42/schedule.json'));
 const due=[Date.now(),...prior.rounds.map(r=>Date.parse(r.dueUTC)).filter(t=>t>Date.now()&&t<=cutoff)];
 schedule.rounds=due.map(t=>({dueUTC:new Date(t).toISOString(),state:'pending'}));
 for(const round of schedule.rounds){
 json(`${out}/schedule.json`,schedule);
 await new Promise(r=>setTimeout(r,Math.max(0,Date.parse(round.dueUTC)-Date.now())));
 const captured=await capture();deduplicate(captured);round.state=captured.records.some(r=>r.error)?'failed':'captured';round.finished=captured.finished;
 if(round===schedule.rounds.at(-1))schedule.state='complete';
 json(`${out}/schedule.json`,schedule);report(captured);commit(schedule.state==='complete'?'needs-input':'watching');
 console.log(JSON.stringify({time:stamp(),state:schedule.state,changes:captured.changes,next:schedule.rounds.find(r=>r.state==='pending')?.dueUTC}));
 }
})().catch(e=>{schedule.state='failed';schedule.error=e.stack;json(`${out}/schedule.json`,schedule);console.error(e);process.exitCode=1;});
