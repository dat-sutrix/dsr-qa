#!/usr/bin/env node
// Compare two Playwright JSON reports (e.g. last green @overlay run vs the run right after a deploy) → markdown diff.
// Usage: node scripts/compare-runs.mjs <before.json> <after.json> [--out file.md]
// Key = project + file + full title. Outcome per test = final attempt status (passed / failed / skipped / flaky = passed on retry).
import { readFileSync, writeFileSync } from 'node:fs';

const [beforeFile, afterFile, ...rest] = process.argv.slice(2);
const outIdx = rest.indexOf('--out');
const outFile = outIdx >= 0 ? rest[outIdx + 1] : null;
if (!beforeFile || !afterFile) {
  process.stderr.write('usage: node scripts/compare-runs.mjs <before.json> <after.json> [--out file.md]\n');
  process.exit(2);
}

function outcomes(file) {
  const report = JSON.parse(readFileSync(file, 'utf8'));
  const map = new Map();
  const walk = (suite, titles) => {
    const path = suite.title ? [...titles, suite.title] : titles;
    for (const spec of suite.specs ?? []) {
      for (const t of spec.tests ?? []) {
        const results = t.results ?? [];
        const last = results[results.length - 1];
        const status = t.status === 'skipped' ? 'skipped' : t.status === 'flaky' ? 'flaky' : last?.status === 'passed' ? 'passed' : last?.status ?? 'unknown';
        const error = (last?.error?.message ?? '').replace(/\u001b\[[0-9;]*m/g, '').split('\n')[0].slice(0, 160);
        map.set(`${t.projectName} › ${spec.file} › ${[...path.slice(1), spec.title].join(' › ')}`, { status, error });
      }
    }
    for (const s of suite.suites ?? []) walk(s, path);
  };
  for (const s of report.suites ?? []) walk(s, []);
  return { map, startTime: report.stats?.startTime ?? '?' };
}

const before = outcomes(beforeFile);
const after = outcomes(afterFile);
const ok = (s) => s === 'passed' || s === 'flaky';
const rows = { regressed: [], fixed: [], changed: [], added: [], removed: [] };
for (const [key, a] of after.map) {
  const b = before.map.get(key);
  if (!b) { rows.added.push([key, '—', a.status, a.error]); continue; }
  if (b.status === a.status) continue;
  if (ok(b.status) && a.status === 'failed') rows.regressed.push([key, b.status, a.status, a.error]);
  else if (b.status === 'failed' && ok(a.status)) rows.fixed.push([key, b.status, a.status, '']);
  else rows.changed.push([key, b.status, a.status, a.error]);
}
for (const [key, b] of before.map) if (!after.map.has(key)) rows.removed.push([key, b.status, '—', '']);

const count = (m) => [...m.values()].reduce((c, { status }) => ({ ...c, [status]: (c[status] ?? 0) + 1 }), {});
const fmt = (c) => Object.entries(c).map(([k, v]) => `${k} ${v}`).join(' · ');
const table = (title, list) => [
  `## ${title} (${list.length})`, '',
  ...(list.length ? ['| Test | Before | After | After error (first line) |', '|---|---|---|---|',
    ...list.map(([k, b, a, e]) => `| ${k.replaceAll('|', '\\|')} | ${b} | ${a} | ${(e || '—').replaceAll('|', '\\|')} |`)] : ['None.']),
  '',
];
const md = [
  `# Run comparison`, '',
  `- Before: \`${beforeFile}\` (start ${before.startTime}) – ${fmt(count(before.map))}`,
  `- After: \`${afterFile}\` (start ${after.startTime}) – ${fmt(count(after.map))}`, '',
  ...table('Regressed: passed before, failed now', rows.regressed),
  ...table('Fixed: failed before, passed now', rows.fixed),
  ...table('Other status changes (skip ↔ pass/fail)', rows.changed),
  ...table('New tests', rows.added),
  ...table('Tests no longer present', rows.removed),
].join('\n');
if (outFile) writeFileSync(outFile, md);
process.stdout.write(outFile ? `written ${outFile}; regressed ${rows.regressed.length}\n` : md);
process.exit(rows.regressed.length ? 1 : 0);
