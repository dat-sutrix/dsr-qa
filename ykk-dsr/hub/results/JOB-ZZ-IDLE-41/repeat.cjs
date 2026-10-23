const fs=require('node:fs');const {spawnSync}=require('node:child_process');
const dir='ykk-dsr/hub/results/JOB-ZZ-IDLE-41';
const history=JSON.parse(fs.readFileSync(`${dir}/history.json`));
const start=Date.parse(history[0].started);const cutoff=Date.parse(history[0].started.slice(0,10)+'T11:00:00Z');
const schedule={cutoffUTC:new Date(cutoff).toISOString(),pid:process.pid,state:'running',rounds:[]};
for(let due=start+7200000;due<=cutoff;due+=7200000)schedule.rounds.push({dueUTC:new Date(due).toISOString(),state:'pending'});
const save=()=>fs.writeFileSync(`${dir}/schedule.json`,JSON.stringify(schedule,null,2)+'\n');save();
const run=(args)=>spawnSync('git',args,{encoding:'utf8'});
(async()=>{
for(const round of schedule.rounds){
 await new Promise(r=>setTimeout(r,Math.max(0,Date.parse(round.dueUTC)-Date.now())));
 const capture=spawnSync(process.execPath,[`${dir}/capture.cjs`],{encoding:'utf8',timeout:600000});
 round.exitCode=capture.status;round.state=capture.status===0?'captured':'failed';round.finished=new Date().toISOString();
 if(capture.status!==0)fs.writeFileSync(`${dir}/scheduler-error.log`,(capture.stderr||'')+'\n'+(capture.error?.message||''));
 if(round===schedule.rounds.at(-1))schedule.state='complete';save();
 const add=run(['add','--',dir,'results/JOB-ZZ-IDLE-41','evidence/DSR-590/retest']);
 const commit=add.status===0?run(['commit','-m',`[codex] JOB-ZZ-IDLE-41 ${capture.status===0?'done':'failed'}`]):add;
 if(commit.status!==0){schedule.commitError=commit.stderr;save();}
}
schedule.state='complete';save();
})().catch(e=>{schedule.state='failed';schedule.error=e.message;save();process.exitCode=1;});
