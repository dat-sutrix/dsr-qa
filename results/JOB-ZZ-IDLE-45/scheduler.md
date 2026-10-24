# DSR-678 fix watch

Installed in user qa's crontab by this job:

```cron
* * * * * /bin/bash /home/qa/dsr-qa-codex/results/JOB-ZZ-IDLE-45/watch.sh >> /tmp/idle45-cron.log 2>&1 # JOB-ZZ-IDLE-45
```

The minute tick only checks whether the next two-hour round is due. The first round started 2026-10-24T00:54:15.614Z. Subsequent rounds follow that cadence, plus a final round at 2026-10-26T02:00:00Z (09:00 Vietnam). `schedule.json` records the next due time. `flock` prevents overlapping watch processes. Each executed round updates history, summary and result files and commits only this job's two result directories. It does not push; the hub protocol assigns pushing to runner.sh.

The wrapper expires at 2026-10-26T02:10:00Z. Cron must remain available and this checkout accessible. Future observations are pending, not completed by scheduling. Logs stay in /tmp. No AEM writes, login or form submission occur.

Visual/Lighthouse check: `node results/JOB-ZZ-IDLE-45/run.cjs`; report generation: `node results/JOB-ZZ-IDLE-45/report.cjs`. Passing viewport captures and full Lighthouse reports are in /tmp and not committed. Fixed profile geometry is retained without passing screenshots, following the hub evidence policy.
