"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const source = 'https://random-data-api.com/api/users/random_user';
async function req() {
    const res = await (0, node_fetch_1.default)(source);
    const json = await res.json();
    return json;
}
let log = function (val) {
    console.log(`${val.gender} - ${val.first_name} ${val.last_name}`);
};
async function getG() {
    let gender = "";
    while (gender !== "Female") {
        const result = await req();
        log(result);
        gender = result.gender;
    }
}
getG();
