// Read-only observations for JOB-ZY-REG-20261024-0020-claude-code step 4 (no verdict). Usage: node observe.cjs (cwd = repo root)
// 4a video list cards + raw list query JSON, 4b news-detail page lookup, 4c Last-Modified/ETag (.live + .page).
const {chromium}=require(process.cwd()+'/node_modules/@playwright/test');
const fs=require('node:fs');
const dir='ykk-dsr/hub/results/JOB-ZY-REG-20261024-0020-claude-code';
const base=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL;
const files=['scripts/scripts.js','styles/styles.css','blocks/header/header.js','blocks/footer/footer.js','blocks/eco-carousel/eco-carousel.js','blocks/eco-carousel/eco-carousel.css'];
(async()=>{
 const out={started:new Date().toISOString(),base,headers:[],videoList:[],newsDetail:{}};
 // 4c
 for(const host of ['live','page'])for(const f of files){
  const url=base.replace('.aem.live','.aem.'+host)+'/'+f;
  const r=await fetch(url,{method:'HEAD',cache:'no-store'});
  out.headers.push({host,file:f,httpStatus:r.status,lastModified:r.headers.get('last-modified'),etag:r.headers.get('etag')});
 }
 // 4b
 const nd=out.newsDetail;
 nd.oldPaths=[];
 for(const host of ['live','page'])for(const lang of ['ja','en']){
  const url=base.replace('.aem.live','.aem.'+host)+`/master/${lang}/test-space/test-news-detail-template`;
  const r=await fetch(url,{cache:'no-store',redirect:'manual'});nd.oldPaths.push({url,httpStatus:r.status});
 }
 nd.queryIndex=[];
 for(const qi of ['/query-index.json','/ja/query-index.json','/en/query-index.json','/master/ja/query-index.json','/master/en/query-index.json']){
  const e={url:base+qi};nd.queryIndex.push(e);
  try{const r=await fetch(e.url+'?limit=10000',{cache:'no-store'});e.httpStatus=r.status;
   if(r.ok){const j=await r.json();const data=j.data||[];e.total=j.total??data.length;
    e.newsHits=data.filter(d=>/news/i.test(JSON.stringify(d))).map(d=>({path:d.path,title:d.title,template:d.template}));}}catch(x){e.error=String(x.message).slice(0,200);}
 }
 // 4a
 const browser=await chromium.launch();
 try{
  for(const lang of ['ja','en']){
   const url=`${base}/${lang}/library/video/search`;const r={url,queries:[]};out.videoList.push(r);
   const page=await browser.newPage({viewport:{width:1440,height:900}});
   const pend=[];
   page.on('response',res=>{const u=res.url();if(/execute\.json|graphql/i.test(u))pend.push((async()=>{let body=null;try{body=await res.text();}catch{}return {url:u,status:res.status(),body};})());});
   try{
    const res=await page.goto(url,{waitUntil:'networkidle',timeout:60000});r.httpStatus=res.status();r.finalUrl=page.url();await page.waitForTimeout(2000);
    r.cards=await page.evaluate(()=>{const m=document.querySelector('main');const seen=[];
     for(const a of m.querySelectorAll('a[href]')){const li=a.closest('li,[class*="card"]');if(!li)continue;
      const t=(li.querySelector('h2,h3,h4,[class*="title"]')||a).textContent.trim().replace(/\s+/g,' ');
      const data={};for(const el of [li,a])for(const [k,v] of Object.entries(el.dataset))data[k]=v;
      seen.push({title:t,href:a.getAttribute('href'),cardClass:li.className,data});}
     return seen;});
    r.title=await page.title();
    await page.screenshot({path:`${dir}/evidence-obs/REG-VIDLIST_${lang}.png`});
   }catch(e){r.error=String(e.message).slice(0,200);}finally{await page.close();}
   const qs=await Promise.all(pend);
   qs.forEach((q,i)=>{const fn=`q_video-search_${lang}_${i}.json`;fs.writeFileSync(`${dir}/${fn}`,q.body??'');
    let items=null;try{const j=JSON.parse(q.body);const walk=o=>{if(Array.isArray(o))return o.flatMap(walk);if(o&&typeof o==='object'){if(o.items&&Array.isArray(o.items))return o.items;return Object.values(o).flatMap(walk);}return [];};
     items=walk(j).map(it=>({title:it.title??it.name??null,_path:it._path??null,_id:it._id??null,_variation:it._variation??null}));}catch{}
    r.queries.push({url:q.url,status:q.status,file:fn,items});});
  }
 }finally{await browser.close();}
 out.finished=new Date().toISOString();fs.writeFileSync(`${dir}/observations.json`,JSON.stringify(out,null,1));
})();
