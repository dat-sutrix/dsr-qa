# Idle jobs (dependency-free work for agents)

Runner takes the first queued job for its lane in name order. Dated jobs (`JOB-2026…`) sort before `JOB-ZZ-IDLE-…`, so idle jobs run only when no real job is queued.

Rules for anyone adding idle jobs (Claude web, 07:45/17:10 schedules, Night TC job):
- Must need nothing from Dat or QA-PT: existing DEV pages, existing TC specs (`tc-out/*.spec.json`), read-only.
- Types: regression of existing specs · write automation from a finished TC spec (skip when page missing) · visual baseline / Lighthouse of existing pages.
- Keep ≥ 1 idle job per lane in `jobs/queue/` at all times (07:45 refills: regression `JOB-ZZ-IDLE-<NN>` daily; next spec scaffold from the newest TC spec without automation).
- Agents cannot reach Jira/Figma/Drive → writing TCs from requirements stays with the Claude TC job (scheduled), not VPS agents.
