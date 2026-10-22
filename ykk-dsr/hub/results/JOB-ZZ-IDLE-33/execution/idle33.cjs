const fs=require('fs'),{spawnSync}=require('child_process');
const root=process.cwd(),out=root+'/ykk-dsr/hub/results/JOB-ZZ-IDLE-33',base='https://main--dsr-eds-dev--sutrix-projects.aem.live';
const index=JSON.parse(fs.readFileSync('/tmp/idle33-index.json'));
const paths=index.data.filter(x=>/\/(ja|en)\/.*\/qa529-0[12]$/.test(x.path)).map(x=>x.path);
fs.writeFileSync(out+'/discovery.json',JSON.stringify({url:base+'/query-index.json',retrieved:new Date().toISOString(),offset:index.offset,total:index.total,count:index.data.length,matches:index.data.filter(x=>paths.includes(x.path)),missing:['en qa529-02']},null,2));
fs.writeFileSync(out+'/started.txt',new Date().toISOString());
paths.push('/master/ja/test-space/dsr-590-eco-top-page','/master/ja/test-space/dsr-590-eco-detail-page','/ja/library/video/qa587-main');
const results=[];
for(const path of paths) for(const device of ['mobile','desktop']) for(let run=1;run<=(path.includes('qa587-main')?3:1);run++){
 const id=path.replaceAll('/','_')+'-'+device+'-'+run,file='/tmp/idle33'+id+'.json';
 const args=['exec','--yes','--package=lighthouse','--','lighthouse',base+path,'--chrome-flags=--headless --no-sandbox','--only-categories=performance,accessibility,seo,best-practices','--output=json','--output-path='+file,'--quiet'];
 if(device==='desktop')args.push('--preset=desktop');
 const start=new Date().toISOString();
 const p=spawnSync('npm',args,{env:{...process.env,CHROME_PATH:'/home/qa/.cache/ms-playwright/chromium-1243/chrome-linux64/chrome'},encoding:'utf8'});
 let j={};try{j=JSON.parse(fs.readFileSync(file))}catch{}
 results.push({path,device,run,started:start,finished:new Date().toISOString(),exit:p.status,version:j.lighthouseVersion,finalUrl:j.finalDisplayedUrl,runtimeError:j.runtimeError,categories:Object.fromEntries(Object.entries(j.categories||{}).map(([k,v])=>[k,Math.round(v.score*100)])),metrics:Object.fromEntries(['first-contentful-paint','largest-contentful-paint','total-blocking-time','cumulative-layout-shift','speed-index'].map(k=>[k,j.audits?.[k]?.numericValue])),failedAudits:Object.values(j.audits||{}).filter(a=>a.score!==null&&a.score<1).map(a=>({id:a.id,title:a.title,score:a.score,displayValue:a.displayValue})),error:p.status?p.stderr.slice(-1000):undefined});
 fs.writeFileSync(out+'/lighthouse-summary.json',JSON.stringify(results,null,2));console.log(id,results.at(-1).categories,p.status);
}
fs.writeFileSync(out+'/finished.txt',new Date().toISOString());
