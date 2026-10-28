#!/bin/bash

set -e # Exit on any errors

cd "$HOME/.local/share/Steam/steamapps/common/The Binding of Isaac Rebirth/tools/ModUploader/Linux"

# Runs the binary directly because the bundled "moduploader" launcher has CRLF line endings and fails.
export LD_LIBRARY_PATH=lib64
exec ./ModUploader.bin
