// Markdown helpers for check tables.
const cell = (v) => (v === undefined || v === null ? '' : String(typeof v === 'string' ? v : JSON.stringify(v)))
  .replace(/\|/g, '\\|').replace(/\n/g, '⏎').slice(0, 160);

export function checksTable(checks) {
  const rows = checks.map((c) => `| ${c.layer} | ${c.check} | ${c.item} | ${c.lang} | ${c.result} | ${cell(c.expected)} | ${cell(c.actual)} |`);
  return ['| Layer | Check | Item | Lang | Result | Expected | Actual |', '|---|---|---|---|---|---|---|', ...rows].join('\n');
}

export function tally(checks) {
  const t = { PASS: 0, FAIL: 0, WARN: 0 };
  for (const c of checks) t[c.result] = (t[c.result] ?? 0) + 1;
  return t;
}
