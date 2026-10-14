const fs=require('fs'),path=require('path'),cp=require('child_process');
const root='evidence/DSR-552/DEV/runs';
const esc=v=>String(v??'—').replace(/\|/g,'\\|').replace(/\n/g,' ');
const csv=v=>'"'+String(v??'').replace(/"/g,'""')+'"';
const strip=v=>String(v||'').replace(/\u001b\[[0-9;]*m/g,'');
const flatten=(suites,ancestry=[])=>suites.flatMap(s=>[...(s.specs||[]).flatMap(spec=>spec.tests.map(t=>({...t,title:spec.title,location:`${spec.file}:${spec.line}`,ancestry:[...ancestry,s.title]}))),...flatten(s.suites||[],[...ancestry,s.title])]);
const sha=cp.execFileSync('git',['rev-parse','HEAD'],{encoding:'utf8'}).trim();
const all=[];
for(const label of ['auto','baseline','visual','tc001-rerun','fixme','links-rerun']) {
 if(!fs.existsSync(`${root}/${label}.json`))continue;
 const data=JSON.parse(fs.readFileSync(`${root}/${label}.json`));const tests=flatten(data.suites);
 const start=fs.readFileSync(`${root}/${label}.start`,'utf8').trim(),end=fs.readFileSync(`${root}/${label}.end`,'utf8').trim();const day=start.slice(0,10).replace(/-/g,'');
 const lines=[`# DSR-552 DEV automation run — ${day} — ${label}`,'','## 1. Header','',`- Run start (UTC): ${start}`,`- Run end (UTC): ${end}`,'- Environment + base URL: DEV — https://main--dsr-eds-dev--sutrix-projects.aem.live','- Target pages: /master/{ja,en}/test-space/dsr552-bc hierarchy; /master/{ja,en}; missing child; T4 leaf blocked.','- Build under test: not independently verified; current public DEV Publish.','- Baseline ID: first DEV Chromium snapshots 20261012; current appearance, not approved Figma.',`- Automation HEAD commit SHA: ${sha}; uncommitted task implementation tested.`, '- Exact command used:','', '```sh',fs.readFileSync(`${root}/${label}.command`,'utf8').trim(),'```','','## 2. TypeScript check','', '- Command: `npx tsc --noEmit`',`- Exit code: ${fs.readFileSync(`${root}/typecheck.exit`,'utf8')}`,`- Result: ${fs.readFileSync(`${root}/typecheck.log`,'utf8').trim()||'no errors'}`,'','## 3. Suite summary','', '| Total | Passed | Failed | Skipped | Exit code | Workers | Retries | Wall time |','|---:|---:|---:|---:|---:|---:|---|---|',`| ${tests.length} | ${data.stats.expected+data.stats.flaky} | ${data.stats.unexpected} | ${data.stats.skipped} | ${fs.readFileSync(`${root}/${label}.exit`,'utf8')} | ${data.config.metadata.actualWorkers} actual / ${data.config.workers} configured | ${data.config.projects[0].retries} configured; ${tests.reduce((n,t)=>n+t.results.filter(r=>r.retry>0).length,0)} actual | ${(data.stats.duration/1000).toFixed(2)} s |`,'','Counts are unique tests, not attempts. Proposed outcomes; human QA confirms.',`Scope: ${label}; ${[...new Set(tests.map(t=>t.projectName))].join(', ')}. Flaky: ${data.stats.flaky}.`,'','## 4. Executed tests','','Durations summed across attempts. Initial and retry results retained in JSON.','', '| TC ID | Title | Result | Duration | One-line failure reason |','|---|---|---|---|---|'];
 for(const t of tests) {
  const last=t.results.at(-1),id=t.title.match(/DSR-BREAD-\d+/)[0];t.id=id;t.language=t.ancestry.find(a=>['ja','en','cn'].includes(a))||(/DSR-BREAD-0(20|32)/.test(t.title)?'ja':'N/A');
  t.reason=(t.annotations||[]).filter(a=>['fixme','skip'].includes(a.type)).map(a=>a.description).join('; ');
  t.error=strip(last.errors?.map(e=>e.message).join('; ')||last.error?.message||'');
  t.evidence=[];
  for(const [i,r] of t.results.entries())for(const a of r.attachments||[])if(a.path&&fs.existsSync(a.path)) {
   const ext=path.extname(a.path);if(!['.png','.zip'].includes(ext))continue;
   const target=`evidence/DSR-552/DEV/${id}_${t.language}_${last.status==='passed'?'pass':'fail'}_${label}_${t.projectName}_attempt${i+1}_${a.name.replace(/[^a-zA-Z0-9-]/g,'-')}${ext}`;
   fs.copyFileSync(a.path,target);t.evidence.push(target);
  }
  // Original test-results attachments may have been cleared by a subsequent run.
  const archive=`${root}/${label}-artifacts`;
  for(const r of t.results)for(const a of r.attachments||[])if(a.path) {
    const relative=path.relative(path.resolve('test-results'),a.path);const source=path.join(archive,relative);
    if(!fs.existsSync(source)||!['.png','.zip'].includes(path.extname(source)))continue;
    const target=`evidence/DSR-552/DEV/${id}_${t.language}_${last.status==='passed'?'pass':'fail'}_${label}_${t.projectName}_retry${r.retry}_${a.name.replace(/[^a-zA-Z0-9-]/g,'-')}${path.extname(source)}`;
    fs.copyFileSync(source,target);if(!t.evidence.includes(target))t.evidence.push(target);
  }
  if(last.status!=='skipped')lines.push(`| ${id} | ${esc(t.title+' ['+t.language+'/'+t.projectName+']')} | ${last.status==='passed'?'Pass':t.error.includes('Host system is missing')?'Blocked (browser dependencies)':'Fail'} | ${(t.results.reduce((n,r)=>n+r.duration,0)/1000).toFixed(3)} s | ${esc(t.error||'—')} |`);
 }
 lines.push('','## 5. Skipped tests','','| TC ID | Verbatim skip reason |','|---|---|');
 const skipped=tests.filter(t=>t.results.at(-1).status==='skipped');for(const t of skipped)lines.push(`| ${t.id} [${t.language}/${t.projectName}] | ${esc(t.reason)} |`);if(!skipped.length)lines.push('None');
 lines.push('','## 6. Failed tests','');
 const failed=tests.filter(t=>!['passed','skipped'].includes(t.results.at(-1).status));if(!failed.length)lines.push('None');
 for(const t of failed) {
  lines.push(`### ${t.id} — ${t.language}/${t.projectName}`,'',`- Failing assertion: ${t.location}; exact assertion locations and expected vs actual below.`,`- Attempts: ${t.results.map(r=>`${r.retry}: ${r.status}`).join(', ')}`,`- Evidence paths: ${t.evidence.join(', ')||'None; browser could not launch.'}`,'','```text',...t.results.flatMap(r=>(r.errors||[r.error]).filter(Boolean).map(e=>strip(e.stack||e.message))),'```','');
 }
 lines.push('Evidence copied to evidence/DSR-552/DEV is committed. Original test-results/ and playwright-report/ plus local archived copies are gitignored, not committed.','','## 7. Open points for QA','','- Proposed outcomes only; build ID, Jira/Excel/Figma and Author values not independently verified.','- T4 leaf 404 blocks TC-007. T3 sp-a title mismatch; sp-b/sp-c 404. English test-space 404 is known Bug-INDEX, assertions remain active.','- Noto CJK system package absent; installation prohibited by repo safety. Noto Sans JP web font loaded in preflight. No Chinese font validation.','- Auto command adds --grep-invert @visual to avoid creating/checking visual snapshots before the dedicated first baseline run. Visual creation runs Chromium only to preserve its reference; comparison runs all TC-032 projects.','- TC-001 initial placement locator selected inner duplicate data-auto-block; corrected to direct main section, followed by focused rerun. TC-002/008 rerun collects remaining checks despite the HOME HTTP failure (soft assertion).','- Browser launch failures due to missing host libraries are infrastructure blocks, not product failures. STG/PRO and manual cases were not run.');
 all.push(...tests.map(t=>({...t,run:label})));
 const file=`results/DSR-552/DEV/automation-run-${day}-${label}.md`;if(fs.existsSync(file))throw Error('Refusing overwrite '+file);fs.writeFileSync(file,lines.join('\n')+'\n');
}
// Latest execution per TC/language, aggregate TC-032 browser results.
const grouped=new Map();for(const t of all){const id=t.title.match(/DSR-BREAD-\d+/)[0],lang=t.ancestry.find(a=>['ja','en','cn'].includes(a))||(/DSR-BREAD-0(20|32)/.test(t.title)?'ja':'N/A'),key=id+'|'+lang;const list=grouped.get(key)||[];grouped.set(key,[...list.filter(x=>x.projectName!==t.projectName),t]);}
const rows=[];
for(const [key,ts]of grouped){const [id,lang]=key.split('|');let status='Pass';const actual=[],evidence=[],bugs=new Set();for(const t of ts){const r=t.results.at(-1),reason=(t.annotations||[]).filter(a=>['skip','fixme'].includes(a.type)).map(a=>a.description).join('; '),error=strip(r.errors?.map(e=>e.message).join('; ')||r.error?.message||'');let s=r.status==='passed'?'Pass':r.status==='skipped'?(reason.startsWith('Blocked')?'Blocked':'Fixme'):error.includes('Host system is missing')?'Blocked':'Fail';if(s==='Fail'||status!=='Fail'&&(s==='Blocked'||status==='Pass'&&s==='Fixme'))status=s;let detail=reason||error||'all assertions passed'; if(error.includes('Host system is missing')) detail='Blocked: browser host libraries missing'; else if(error.includes('pixels')) detail=error.match(/\d+ pixels[^\n]*/)?.[0]||'Visual difference exceeds 1%'; else if(error&&['DSR-BREAD-002','DSR-BREAD-008'].includes(id))detail='HOME returns HTTP 404 (expected 200)'; else if(error&&(t.annotations||[]).some(a=>a.description==='Bug-INDEX'))detail='test-space missing from visible trail / JSON-LD (Bug-INDEX)'; else if(error)detail=error.split('\n').filter(Boolean).slice(0,3).join(' '); actual.push(`${t.projectName}: ${detail}`);for(const a of t.annotations||[])if(a.type==='bug')bugs.add(a.description);if(reason.includes('Bug-FIELD'))bugs.add('Bug-FIELD');const obs=(r.attachments||[]).find(a=>a.name==='observed');if(obs?.body){try{const vals=JSON.parse(Buffer.from(obs.body,'base64').toString());if(vals.length){const v=vals.at(-1);actual.push(v.texts?'initial trail sample: '+v.texts.map(x=>x.trim()).join(' > '):'HTTP '+v.status+'; breadcrumb '+v.breadcrumbCount+'; BreadcrumbList '+v.jsonld.length);}}catch{}}
 evidence.push(...(t.evidence||[]));}
 rows.push({id,lang,status,actual:actual.join('; ').replace(/\n/g,' '),bug:[...bugs].join('; '),evidence:[...new Set(evidence)].join('; ')});
}
for(const id of ['012','013','016','024','026'])rows.push({id:'DSR-BREAD-'+id,lang:'N/A',status:'Blocked',actual:'Manual only; documented in automation spec; not executed',bug:'',evidence:''});
rows.sort((a,b)=>a.id.localeCompare(b.id)||a.lang.localeCompare(b.lang));
fs.writeFileSync('results/DSR-552_DEV_20261012.csv',[['TC ID','Language','Status (Pass/Fail/Blocked/Fixme)','Actual (one line)','Bug','Evidence file'],...rows.map(r=>[r.id,r.lang,r.status,r.actual,r.bug,r.evidence])].map(r=>r.map(csv).join(',')).join('\n')+'\n');
fs.writeFileSync('results/DSR-552/DEV/summary-20261012.md','# DSR-552 DEV proposed outcomes\n\n| TC | Language | Status | Actual |\n|---|---|---|---|\n'+rows.map(r=>`| ${r.id} | ${r.lang} | ${r.status} | ${esc(r.actual)} |`).join('\n')+'\n');
console.log(JSON.stringify(rows.map(({id,lang,status,actual})=>({id,lang,status,actual:actual.slice(0,200)})),null,2));
