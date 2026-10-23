const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('node:fs');
const dir='ykk-dsr/hub/results/JOB-ZZ-IDLE-41';
const started=new Date().toISOString();
const stamp=started.replace(/[-:]/g,'').slice(0,15);
const out=`evidence/DSR-590/retest/${stamp}`;
const url=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL+'/master/ja/test-space/dsr-590-eco-top-page';
(async()=>{
 fs.mkdirSync(out,{recursive:true});const browser=await chromium.launch();const records=[];
 try{for(const [width,height] of [[1440,900],[428,926],[393,852],[390,844],[375,667]]){
 const r={width,height,requestedUrl:url,evidence:[]};records.push(r);
 const page=await browser.newPage({viewport:{width,height},deviceScaleFactor:1});
 try{
 const response=await page.goto(url,{waitUntil:'networkidle',timeout:60000});r.httpStatus=response.status();r.finalUrl=page.url();
 await page.locator('.eco-carousel-dot').nth(8).waitFor();await page.evaluate(()=>document.fonts.ready);await page.waitForTimeout(1500);
 r.gap=await page.evaluate(()=>{const rect=s=>{const e=document.querySelector(s);if(!e)throw Error('Missing '+s);return e.getBoundingClientRect().toJSON()};const breadcrumb=rect('[data-testid="breadcrumb"]'),section=rect('.breadcrumb-section'),hero=rect('.eco-carousel');return {breadcrumb,section,hero,navGap:hero.top-breadcrumb.bottom,sectionGap:hero.top-section.bottom,scrollY};});
 const top=`${out}/${width}x${height}-top.png`;await page.screenshot({path:top,fullPage:false,scale:'css'});r.evidence.push(top);
 await page.locator('.eco-carousel-controls').scrollIntoViewIfNeeded();await page.waitForTimeout(500);
 r.controls=await page.evaluate(()=>{const rect=s=>{const e=document.querySelector(s);if(!e)throw Error('Missing '+s);return e.getBoundingClientRect().toJSON()};const dots=[...document.querySelectorAll('.eco-carousel-dot')];const dot9=dots[8].getBoundingClientRect().toJSON(),next=rect('.eco-carousel-next'),container=rect('.eco-carousel-dots');return {dotCount:dots.length,dot9,next,container,clearance:next.left-dot9.right,clippedRight:Math.max(0,dot9.right-container.right),overflowX:getComputedStyle(document.querySelector('.eco-carousel-dots')).overflowX,scrollY};});
 const controls=`${out}/${width}x${height}-controls.png`;await page.screenshot({path:controls,fullPage:false,scale:'css'});r.evidence.push(controls);r.capturedAt=new Date().toISOString();
 }catch(e){r.error=e.message;}finally{await page.close();}
 }}finally{await browser.close();}
 const historyPath=`${dir}/history.json`;const history=fs.existsSync(historyPath)?JSON.parse(fs.readFileSync(historyPath)):[];
 const signature=rs=>JSON.stringify(rs.map(r=>[r.width,r.gap?.navGap,r.gap?.sectionGap,r.controls?.dot9.right,r.controls?.next.left,r.controls?.clippedRight]));
 const changed=history.length>0&&records.every(r=>!r.error)&&signature(records)!==signature(history.at(-1).records);
 const finished=new Date().toISOString();history.push({started,finished,changed,records});fs.writeFileSync(historyPath,JSON.stringify(history,null,2)+'\n');
 fs.writeFileSync(`${out}/measurements.json`,JSON.stringify(history.at(-1),null,2)+'\n');
 const lines=[...(history.some(h=>h.changed)?['CHANGED']:[]),'# JOB-ZZ-IDLE-41 — DEV viewport retest',`Latest capture: ${started}; ${history.length} round(s). Read-only Chromium; CSS pixels; unmodified viewport PNGs.`, `Target: ${url}`,'| Viewport | HTTP | Nav bottom → hero | Section bottom → hero | Dot 9 right | Next left | Clearance | Dot overflow past container |','|---|---:|---:|---:|---:|---:|---:|---:|',...records.map(r=>`| ${r.width}×${r.height} | ${r.httpStatus??'error'} | ${r.gap?.navGap??'N/A'} | ${r.gap?.sectionGap??'N/A'} | ${r.controls?.dot9.right??'N/A'} | ${r.controls?.next.left??'N/A'} | ${r.controls?.clearance??'N/A'} | ${r.controls?.clippedRight??'N/A'} |`),`Evidence and raw geometry: ${out}/; all rounds: ${dir}/history.json.`,changed?'Values changed versus previous round; deployment identity and fix acceptance remain unverified.':'No change detected versus previous round (first round establishes baseline).','Proposed observations only; no final QA verdict. Positive clearance means no button overlap.','Repeated every two hours from first capture until 18:00 VN (11:00 UTC); schedule.json records due times.','TypeScript: npx tsc --noEmit exit 0, no errors (initial setup). No npm suite or manual TC execution.'];
 for(const dest of [dir,'results/JOB-ZZ-IDLE-41'])fs.writeFileSync(`${dest}/summary.md`,lines.join('\n')+'\n');
 fs.writeFileSync(`${dir}/result.json`,JSON.stringify({job:'JOB-ZZ-IDLE-41',agent:'codex',us:'DSR-590',env:'dev',started:history[0].started,finished,status:records.some(r=>r.error)?'failed':'done',scope:'Latest capture round only; repetition completion tracked in schedule.json',tests:records.map(r=>({tc:`DSR-590-observation-${r.width}`,lang:'ja',result:r.error?'blocked':'pass',error:r.error?.slice(0,200)??'Capture completed; no product verdict',evidence:r.evidence[0]??'',...(r.error?{suspect:'env',cause:'none',confidence:0}:{})})),lighthouse:[],code_changes:[`${dir}/capture.cjs`],questions:[]},null,2)+'\n');
 console.log(JSON.stringify({started,changed,records},null,2));if(records.some(r=>r.error))process.exitCode=1;
})().catch(e=>{console.error(e);process.exitCode=1});
