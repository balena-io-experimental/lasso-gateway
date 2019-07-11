#!/usr/bin/env bash

pushd "$(dirname "$0")"
echo "Turning device ON"
for i in seq 1 3; do echo -n "."; sleep 1; done ; echo
node sdcard.js off && node power.js on
popd
