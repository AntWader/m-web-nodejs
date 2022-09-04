import fetch from 'node-fetch';

async function TestF() {
    const res = await fetch('https://api.ipify.org/?format=json');
    const json = await res.json();
    console.log(json);
}

TestF()