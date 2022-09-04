"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
async function testRes() {
    const res = await (0, node_fetch_1.default)('https://api.ipify.org/?format=json');
    const json = await res.json();
    return json;
}
testRes()
    .then(function (result) {
    console.log(result.ip);
})
    .catch(function (err) {
    console.log(err);
});
