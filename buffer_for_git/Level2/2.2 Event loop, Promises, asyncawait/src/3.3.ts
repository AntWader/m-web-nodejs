import fetch from 'node-fetch';

type expectedType = {
    name: string;
} & Record<string, string>;

const source = 'https://random-data-api.com/api/name/random_name';

const res = () => fetch(source).then(result => result.json()) as Promise<expectedType>;

for (let ind = 0; ind < 3; ind++) {
    res().then(val => { console.log(`${ind} ` + val.name); });
}
