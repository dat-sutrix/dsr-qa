// Read-only observations for JOB-ZY-REG-20261023-2020-claude-code step 4 (no verdict).
// Header check of global/eco-carousel files (.live + .page) + 671 productLabel on /ja/products/990586001 (same probe as REG-1620 observe.cjs).
const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('node:fs');
const dir='ykk-dsr/hub/results/JOB-ZY-REG-20261023-2020-claude-code';
const base=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL;
const files=['scripts/scripts.js','styles/styles.css','blocks/header/header.js','blocks/eco-carousel/eco-carousel.js','blocks/eco-carousel/eco-carousel.css'];
(async()=>{
 const out={started:new Date().toISOString(),headers:[],label671:[]};
 for(const host of ['live','page'])for(const f of files){
  const url=base.replace('.aem.live','.aem.'+host)+'/'+f;
  const r=await fetch(url,{method:'HEAD',cache:'no-store'});
  out.headers.push({host,file:f,httpStatus:r.status,lastModified:r.headers.get('last-modified'),etag:r.headers.get('etag')});
 }
 const browser=await chromium.launch();
 try{
  for(const lang of ['ja','en']){
   const url=`${base}/${lang}/products/990586001`;const r={url};out.label671.push(r);
   const page=await browser.newPage();
   try{
    const res=await page.goto(url,{waitUntil:'networkidle',timeout:60000});r.httpStatus=res.status();r.finalUrl=page.url();await page.waitForTimeout(1500);
    Object.assign(r,await page.evaluate(()=>{const t=document.body.innerText;return {h1:document.querySelector('h1')?.textContent.trim()??null,title:document.title,fullwidthBar:(t.match(/[^\n]{0,40}｜[^\n]{0,40}/g)||[]).slice(0,5),idOccurrences:(t.match(/990586001[^\n]{0,40}/g)||[]).slice(0,5)};}));
   }catch(e){r.error=String(e.message).slice(0,200);}finally{await page.close();}
  }
 }finally{await browser.close();}
 out.finished=new Date().toISOString();fs.writeFileSync(`${dir}/observations.json`,JSON.stringify(out,null,1));
})();
