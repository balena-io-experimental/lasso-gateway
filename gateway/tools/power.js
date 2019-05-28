const { Client } = require('tplink-smarthome-api');
const sleep = require('await-sleep');

const client = new Client();

async function setupPlug(plugIP) {
    if (process.env.PLUG_IP) {
        let plugIP = process.env.PLUG_IP
        console.log(`Using power plug at IP: ${plugIP}`)
        myPlug = client.getDevice({host: plugIP});
    } else {
        console.log('Please set PLUG_IP environment variable.')
        process.exit(1)
    }
}

async function powerChange() {
    await plug.setPowerState(state);
}
async function getdDeviceInfo(plug, element) {
    let results = await plug.getSysInfo();
    if (element) {
        console.log(`${element}: ${results[element]}`)
    } else {
        console.log(JSON.stringify(results, null, 2))
    }
}

async function main() {
    var myPlug;

    if (process.env.PLUG_IP) {
        let plugIP = process.env.PLUG_IP;
        myPlug = await client.getDevice({host: plugIP});
    } else {
        console.log('Please set PLUG_IP environment variable.')
        process.exit(1)
    }

    if (process.argv.length < 3) {
        getdDeviceInfo(myPlug)
    } else {
        switch (process.argv[2]) {
            case "on":
                myPlug.setPowerState(true);
                await sleep(5 * 1000);
                getdDeviceInfo(myPlug, "relay_state")
                break;
            case "off":
                myPlug.setPowerState(false);
                await sleep(5 * 1000);
                getdDeviceInfo(myPlug, "relay_state")
                break;
            default:
                console.log(`Unknown power state: ${process.argv[2]}`)
                process.exit(2)
        }
    }
}


main()