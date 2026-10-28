#!/bin/bash

set -e # Exit on any errors

LOG="$HOME/.local/share/Steam/steamapps/compatdata/250900/pfx/drive_c/users/steamuser/Documents/My Games/Binding of Isaac Repentance/log.txt"

# -F rather than -f: Isaac recreates the log on every launch, and -f would stay stuck on the old file.
tail -F -n 100 "$LOG"
