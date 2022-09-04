"use strict";
// import { writeJSONtoF } from "./rwtofile";
// import { readJSONfromF } from "./rwtofile";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
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
    login: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`login: ${req.body}`);
    }),
    logout: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`logout: ${req.body}`);
    }),
    getItems: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        console.log(`getItems: ${req.body}, session: ${req.session}`);
    })
};
console.log(Object.keys(methods));
