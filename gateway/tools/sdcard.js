const Promise = require('bluebird')
const Board = require('firmata')
const board = new Board('/dev/ttyACM0')

const SD_RESET_ENABLE = 0x12
const SD_RESET_DISABLE = 0x13

const LED_PIN = 13
const SD_MUX_SEL_PIN = 28
const USB_MUX_SEL_PIN = 29

board.on('ready', async function() {
	console.log('Board ready')
	const HW_SERIAL5 = 5
	var sd_state;

	switch (process.argv[2]) {
		case "on":
			sd_state = board.HIGH
			console.log("Setting state: on")
			break
		case "off":
			sd_state = board.LOW
			console.log("Setting state: off")
			break
		default:
			console.log("Input parameter should be 'on' (SD card connected to gateway) or 'off' (SD card connected to device)")
			process.exit(1)
	}

	board.serialConfig({ portId: HW_SERIAL5, baud: 9600 })

	board.pinMode(SD_MUX_SEL_PIN, board.MODES.OUTPUT)
	board.digitalWrite(SD_MUX_SEL_PIN, board.LOW) //SD sub-board SD socket connected via USB (board.HIGH), or to dummy SD card contacts (board.LOW)
	board.pinMode(USB_MUX_SEL_PIN, board.MODES.OUTPUT)
	board.digitalWrite(USB_MUX_SEL_PIN, board.LOW) //SD sub-board connected via USB to Teensy (board.HIGH), or to USB hub (board.LOW)
	board.pinMode(LED_PIN, board.MODES.OUTPUT)

	board.serialWrite(HW_SERIAL5, [ SD_RESET_ENABLE, 0, 0 ])
	await Promise.delay(10)
	board.serialWrite(HW_SERIAL5, [ SD_RESET_DISABLE, 0, 0 ])

	board.digitalWrite(SD_MUX_SEL_PIN, sd_state) //SD sub-board SD socket connected to dummy SD card contacts

	board.serialWrite(HW_SERIAL5, [ SD_RESET_ENABLE, 0, 0 ])
	await Promise.delay(10)
	board.serialWrite(HW_SERIAL5, [ SD_RESET_DISABLE, 0, 0 ])
	console.log("Done.")
	process.exit()
})


console.log("Starting.")