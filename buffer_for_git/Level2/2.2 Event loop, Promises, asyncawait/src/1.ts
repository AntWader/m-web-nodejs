import fetch from 'node-fetch';

// level-2 chat
type expectedType = {
    ip: string;
} & Record<string, string>;

async function testRes(): Promise<expectedType> {
    const res = await fetch('https://api.ipify.org/?format=json');
    const json = await res.json();

    return json;
}

testRes()
    .then(function (result) {
        console.log(result.ip);
    })
    .catch(function (err) {
        console.log(err);
    });