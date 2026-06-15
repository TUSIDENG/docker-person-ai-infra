#!/bin/bash
# 自愈保活——转发器挂了自动重启
while true; do
  pgrep -f "port-forward-ollama" > /dev/null || \
    nohup node ~/.openclaw/port-forward-ollama.js >> ~/.openclaw/port-forward.log 2>&1 &
  sleep 30
done
