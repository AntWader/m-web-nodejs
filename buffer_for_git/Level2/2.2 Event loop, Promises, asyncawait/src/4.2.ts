import fetch from 'node-fetch';

type expectedType = {
    gender: string;
} & Record<string, string>;

const source = 'https://random-data-api.com/api/users/random_user';

async function req(): Promise<expectedType> {
    const res = await fetch(source);
    const json = await res.json();

    return json;
}

let log = function(val: expectedType){
    console.log(`${val.gender} - ${val.first_name} ${val.last_name}`);
}

async function getG() {
    let gender = "";
    while (gender !== "Female"){
        const result = await req();
        log(result);
        gender = result.gender;
    }
}

getG();