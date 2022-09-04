// import { writeJSONtoF } from "./rwtofile";
// import { readJSONfromF } from "./rwtofile";

// type itemType = { id: number, text: string, checked: boolean };

// type dataType = {
//   items: itemType[];
// } & Record<string, any>;

// let input = readJSONfromF('../data.txt') as dataType;

// input.items.push({ id: 11, text: 'string', checked: true });

// writeJSONtoF('../data.txt', input);

// console.log(input);

// let id = {currentId:55};
// writeJSONtoF('../id.txt', id);
// console.log(readJSONfromF('../id.txt'));

// let selected = '/api/v2/router?action=login'.replace('api/v2/router/','')
// console.log(selected)

let methods = {
    login: async (
        req: Record<string, any>,
        res: Record<string, any>
    ) => {
        console.log(`login: ${req.body}`);
    },
    logout: async (
        req: Record<string, any>,
        res: Record<string, any>
    ) => {
        console.log(`logout: ${req.body}`);
    },
    getItems: async (
        req: Record<string, any>,
        res: Record<string, any>
    ) => {
        console.log(`getItems: ${req.body}, session: ${req.session}`);
    }
}

console.log(Object.keys(methods));