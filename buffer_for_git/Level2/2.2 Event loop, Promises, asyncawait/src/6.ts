import fetch from 'node-fetch';

async function funcNo1(): Promise<string> {
    const res = await fetch('https://api.ipify.org/?format=json');
    const json = await res.json();

    return json.ip;
}

type cb = (ip: string) => void;

async function funcNo2(par: cb) {
    funcNo1().then((newIp) => {
        par(newIp);
    });
}

async function test() {
    await funcNo2((x) => console.log(x));
}

test();