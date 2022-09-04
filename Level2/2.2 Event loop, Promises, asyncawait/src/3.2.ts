import fetch from 'node-fetch';

type expectedType = {
    name: string;
} & Record<string, string>;

const source = 'https://random-data-api.com/api/name/random_name';

async function req(source: string): Promise<expectedType> {
    const res = await fetch(source);
    const json = await res.json();

    return json;
}

async function name(params: expectedType): Promise<string> {
    return params.name;
}

for (let ind = 0; ind < 3; ind++) {
    req(source).then(result => name(result)).then(val => { console.log(`${ind} ` + val); });
}
