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