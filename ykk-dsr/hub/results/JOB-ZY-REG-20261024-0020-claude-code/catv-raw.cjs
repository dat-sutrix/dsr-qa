// NEW FAIL raw capture for DSR-CATV-018/019 (JOB-ZY-REG-20261024-0020-claude-code): page HTTP status, dsr-catalog-list JSON, rendered QA190 labels.
// Browser in host TZ (Europe/Berlin) and in Asia/Tokyo. Read-only. Usage: node catv-raw.cjs (cwd = repo root)
const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('node:fs');
const dir='ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code';
const base=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL;
(async()=>{
 const out={at:new Date().toISOString(),hostTZ:Intl.DateTimeFormat().resolvedOptions().timeZone,runs:[]};
 const browser=await chromium.launch();
 try{for(const tz of [null,'Asia/Tokyo'])for(const lang of ['ja','en']){
  const ctx=await browser.newContext(tz?{timezoneId:tz}:{});const page=await ctx.newPage();
  const url=`${base}/master/${lang}/test-space/list-catalog`;const r={tz:tz||'host',url};out.runs.push(r);
  let q=null;page.on('response',res=>{if(/dsr-catalog-list/.test(res.url()))q=res;});
  const res=await page.goto(url,{waitUntil:'networkidle',timeout:60000});r.httpStatus=res.status();await page.waitForTimeout(1500);
  r.browserToday=await page.evaluate(()=>new Date().toString());
  if(q){r.queryUrl=q.url();r.queryStatus=q.status();const body=await q.text();if(!tz){r.queryFile=`q_dsr-catalog-list_${lang}.json`;fs.writeFileSync(`${dir}/${r.queryFile}`,body);}
   const items=JSON.parse(body).data?.list?.items??Object.values(JSON.parse(body).data||{})[0]?.items??[];
   r.qa190=items.filter(i=>/QA190 (NEW|UPD|BOTH)/.test(JSON.stringify(i))).map(i=>({_path:i._path,title:i.catalogTitle??i.catalog?.catalogTitle,publishDate:i.publishDate??i.catalog?.publishDate,updateDate:i.updateDate??i.catalog?.updateDate}));}
  r.cards=await page.evaluate(()=>[...document.querySelectorAll('main li')].filter(li=>/QA190 (NEW|UPD|BOTH)/.test(li.innerText)).map(li=>li.innerText.replace(/\s+/g,' ').trim().slice(0,120)));
  await ctx.close();
 }}finally{await browser.close();}
 fs.writeFileSync(`${dir}/catv-raw.json`,JSON.stringify(out,null,1));
})();
