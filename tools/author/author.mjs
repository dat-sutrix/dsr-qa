#!/usr/bin/env node
// tools/author CLI – see README.md. Commands: models | lint | verify | apply
import { writeFileSync, mkdirSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { loadManifest } from './lib/manifest.mjs';
import { lint } from './lib/lint.mjs';
import { verify } from './lib/verify.mjs';
import { buildPlan, gates, planTable, snapshot, execute } from './lib/apply.mjs';
import { modelsReport } from './lib/models.mjs';
import { checksTable, tally } from './lib/report.mjs';
import { redact } from './lib/http.mjs';

const [cmd, ...rest] = process.argv.slice(2);
const flags = {};
const args = [];
for (let i = 0; i < rest.length; i++) {
  if (rest[i].startsWith('--')) {
    const k = rest[i].slice(2);
    flags[k] = rest[i + 1] && !rest[i + 1].startsWith('--') ? rest[++i] : true;
  } else args.push(rest[i]);
}
const save = (file, text) => { mkdirSync(dirname(file), { recursive: true }); writeFileSync(file, redact(text)); };
const print = (text) => process.stdout.write(`${redact(text)}\n`);

async function main() {
  switch (cmd) {
    case 'models': {
      const md = await modelsReport();
      if (flags.out) save(flags.out, md);
      print(flags.out ? `written ${flags.out}` : md);
      return 0;
    }
    case 'lint': {
      const { checks } = await lint(loadManifest(args[0]));
      const t = tally(checks);
      print(`# lint ${args[0]}\n\n${checksTable(checks)}\n\nPASS ${t.PASS} · FAIL ${t.FAIL} · WARN ${t.WARN}`);
      if (flags.json) save(flags.json, JSON.stringify(checks, null, 2));
      return t.FAIL ? 1 : 0;
    }
    case 'verify': {
      const { checks } = await verify(loadManifest(args[0]), { since: flags.since });
      const t = tally(checks);
      print(`# verify ${args[0]}\n\n${checksTable(checks)}\n\nPASS ${t.PASS} · FAIL ${t.FAIL} · WARN ${t.WARN}`);
      if (flags.json) save(flags.json, JSON.stringify(checks, null, 2));
      return t.FAIL ? 1 : 0;
    }
    case 'apply': {
      const doc = loadManifest(args[0]);
      const lr = await lint(doc);
      const fails = lr.checks.filter((c) => c.result === 'FAIL');
      const plan = await buildPlan(lr);
      const g = gates({ applyFlag: flags.apply === true && !flags['dry-run'], lintFails: fails.length });
      const outDir = flags.out ?? null;
      if (outDir) save(join(outDir, 'before.json'), JSON.stringify(snapshot(lr), null, 2));
      const gateLines = g.list.map(([n, ok]) => `- ${ok ? '✅' : '⛔'} ${n}`).join('\n');
      print(`# apply ${args[0]} – ${g.open ? 'EXECUTE' : 'DRY-RUN (no request sent)'}\n\nGates:\n${gateLines}\n\nLint FAIL: ${fails.length}\n\n${planTable(plan)}`);
      if (flags['plan-json'] || outDir) save(flags['plan-json'] ?? join(outDir, 'plan.json'), JSON.stringify(plan, null, 2));
      if (!g.open) return 0;
      if (!outDir) throw new Error('--out <dir> required to execute (writes.log, before.json)');
      const res = await execute(plan, { outDir, maxWrites: Number(flags['max-writes'] ?? doc.max_writes ?? 40) });
      print(`executed ${res.length} writes; see ${join(outDir, 'writes.log')}`);
      return 0;
    }
    default:
      print('usage: node tools/author/author.mjs models [--out f] | lint <manifest> [--json f] | verify <manifest> [--since ISO] [--json f] | apply <manifest> [--dry-run|--apply] [--out dir]');
      return 2;
  }
}
main().then((c) => process.exit(c), (e) => { process.stderr.write(`${redact(e.stack ?? e)}\n`); process.exit(3); });
