// Read-only observation for JOB-ZY-REG-20261024-1620-claude-code step 4 (no verdict): Last-Modified + ETag on .live and .page.
// Baseline = REG-1220 observations.json.
// blocks/list/* is 404 on DEV; the list block on /{lang}/library/video/search is class "listing" → blocks/listing/* recorded too.
// Usage: node observe.cjs (cwd = repo root)
const fs=require('node:fs');
const dir='ykk-dsr/hub/results/JOB-ZY-REG-20261024-1620-claude-code';
const prev=JSON.parse(fs.readFileSync('ykk-dsr/hub/results/JOB-ZY-REG-20261024-1220-claude-code/observations.json')).headers;
const base=require('dotenv').parse(fs.readFileSync('envs/dev.env')).BASE_URL;
const files=['scripts/scripts.js','styles/styles.css','blocks/header/header.js','blocks/footer/footer.js',
 'blocks/related-content/related-content.js','blocks/related-content/related-content.css',
 'blocks/list/list.js','blocks/list/list.css','blocks/listing/listing.js','blocks/listing/listing.css'];
(async()=>{
 const out={started:new Date().toISOString(),base,baseline:'JOB-ZY-REG-20261024-1220-claude-code observations.json',headers:[]};
 for(const host of ['live','page'])for(const f of files){
  const url=base.replace('.aem.live','.aem.'+host)+'/'+f;
  const r=await fetch(url,{method:'HEAD',cache:'no-store'});
  const p=prev.find(x=>x.host===host&&x.file===f);
  out.headers.push({host,file:f,httpStatus:r.status,lastModified:r.headers.get('last-modified'),etag:r.headers.get('etag'),
   baseline:p?{lastModified:p.lastModified,etag:p.etag}:null,
   changed:p?(p.lastModified!==r.headers.get('last-modified')||p.etag!==r.headers.get('etag')):'no baseline'});
 }
 out.finished=new Date().toISOString();fs.writeFileSync(`${dir}/observations.json`,JSON.stringify(out,null,1));
 for(const h of out.headers)console.log(h.host,h.file,h.httpStatus,h.lastModified,h.etag,'changed:',h.changed);
})();
