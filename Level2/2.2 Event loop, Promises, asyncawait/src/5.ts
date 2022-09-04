import fetch from 'node-fetch';

async function getIp(): Promise<string> {
    const res = await fetch('https://api.ipify.org/?format=json');
    const json = await res.json();

    return json.ip;
}

type cbIp = (ip: string) => void;

// global ip variable
let ip = 'old ip';

function funcNo1(callback: cbIp) {
    // takes global parametr 
    callback(ip);
}

async function funcNo2() {
    getIp().then((newIp) => {
        // changing global parametr
        ip = newIp;
        funcNo1((x) => console.log(x));
    });
}

async function test() {
    await funcNo2();
}

test();