"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const rwtofile_1 = require("./rwtofile");
const rwtofile_2 = require("./rwtofile");
let input = (0, rwtofile_2.readJSONfromF)('../data.txt');
input.items.push({ id: 11, text: 'string', checked: true });
(0, rwtofile_1.writeJSONtoF)('../data.txt', input);
console.log(input);
let id = { currentId: 55 };
(0, rwtofile_1.writeJSONtoF)('../id.txt', id);
console.log((0, rwtofile_2.readJSONfromF)('../id.txt'));
