#!/usr/bin/env bash
set -euo pipefail
cd /home/qa/dsr-qa-codex
# Expire without touching other jobs or cron entries. UTC deadline + 10 min grace.
if [ "$(date -u +%s)" -gt 1792980600 ]; then exit 0; fi
exec /usr/bin/flock -n /tmp/dsr-idle45.lock /usr/bin/node results/JOB-ZZ-IDLE-45/watch.cjs
