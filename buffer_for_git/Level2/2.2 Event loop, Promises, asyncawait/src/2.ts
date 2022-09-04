import fetch from 'node-fetch';

// level-2 chat
type expectedType = {
    ip: string;
} & Record<string, string>;

async function testRes(source: string): Promise<expectedType> {
    const res = await fetch(source);
    const json = await res.json() as expectedType;

    return json;
}

async function getIp(source: string): Promise<string> {
    return testRes(source)
        .then(function (result) {
            return result.ip;
        })
        .catch(function (err) {
            return err;
        });
}

getIp('https://api.ipify.org/?format=json').then(result => console.log(result));