# Usage

## Power

Power management via a TP-Link smartplug. Requires a PLUG_IP env var
to be set.

Turn the device on:
```
node power.js on
```
(should output `relay_state: 1` afterwards if successful)

Turn device off
```
node power.js off
```
(should output `relay_state: 0` afterwards if successful)

Check smartplug:
```
node power.js
```
The output should be the JSON object of all variables of the plug,
for reference.

## SD card

Connect the SD card to the gateway or the device. Please only change this
setting when the device is powered off!

Connect the SD card to the gateway:
```
node sdcard.js on
```
(card should show up as `/dev/sda` for the gateway)

Connect the SD card to the device:
```
node sdcard.js off
```
