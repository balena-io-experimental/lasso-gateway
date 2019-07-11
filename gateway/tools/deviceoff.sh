#!/usr/bin/env bash

pushd "$(dirname "$0")"
echo "Turning device OFF"
for i in seq 1 3; do echo -n "."; sleep 1; done ; echo
node power.js off && node sdcard.js on
popd
