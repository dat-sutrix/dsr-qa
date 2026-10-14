---
id: JOB-YYYYMMDD-NN
agent: claude-code          # claude-code (functional) | codex (visual + lighthouse)
us: DSR-NNN
type: write-and-run         # write-and-run | run-only | visual | lighthouse | retest
env: dev                    # dev | stg | pro
lang: [ja, en, zh]
tcs: [DSR-XXX-001, DSR-XXX-002]
priority: P1                # P1 runs first
created_by: claude-web
---

## Context
<1–3 lines: what the feature does, what changed since last run>

## Input
| Item | Value |
|---|---|
| Page URL(s) | ... |
| Test data (CF path / page path) | ... |
| data-testid available | yes / partial (list) / no → use role/text |
| Figma baseline (visual only) | ykk-dsr/baseline/<file>.png |

## Test cases
| TC ID | Steps (short) | Expected (measurable) |
|---|---|---|
| DSR-XXX-001 | ... | ... |

## Pass criteria
- All listed TCs executed on `env` × `lang`; result.json written.
- Lighthouse (if type=lighthouse): performance ≥ 95 mobile & desktop.

## Output
`ykk-dsr/hub/results/<id>/result.json` + `summary.md` (+ `evidence/` for failures only).
