"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
async function testRes(source) {
    const res = await (0, node_fetch_1.default)(source);
    const json = await res.json();
    return json;
}
async function getIp(source) {
    return testRes(source)
        .then(function (result) {
        return result.ip;
    })
        .catch(function (err) {
        return err;
    });
}
getIp('https://api.ipify.org/?format=json').then(result => console.log(result));
