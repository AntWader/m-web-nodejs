import fetch from 'node-fetch';

type expectedType = {
    gender: string;
} & Record<string, string>;

const source = 'https://random-data-api.com/api/users/random_user';

const req = () => fetch(source).then(result => result.json()) as Promise<expectedType>;

let log = function(val: expectedType){
    console.log(`${val.gender} - ${val.first_name} ${val.last_name}`);
}

let recRes = function(){
    req().then(result => {
        if (result.gender === "Female"){
            log(result);
            return result;
        } else {
            log(result);
            recRes();
        }
    });
}

recRes();