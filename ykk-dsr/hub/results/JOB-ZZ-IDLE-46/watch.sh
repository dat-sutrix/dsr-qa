#!/usr/bin/env bash
set -euo pipefail
cd /home/qa/dsr-qa-codex
exec /usr/bin/flock -n /tmp/dsr-idle46.lock /usr/bin/node ykk-dsr/hub/results/JOB-ZZ-IDLE-46/watch.cjs
