"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
async function getIp() {
    const res = await (0, node_fetch_1.default)('https://api.ipify.org/?format=json');
    const json = await res.json();
    return json.ip;
}
// global ip variable
let ip = 'old ip';
function funcNo1(callback) {
    // takes global parametr 
    callback(ip);
}
async function funcNo2() {
    getIp().then((newIp) => {
        // changing global parametr
        ip = newIp;
        funcNo1((x) => console.log(x));
    });
}
async function test() {
    await funcNo2();
}
test();
