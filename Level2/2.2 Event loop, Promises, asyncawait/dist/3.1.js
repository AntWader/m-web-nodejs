"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const source = 'https://random-data-api.com/api/name/random_name';
async function req(source) {
    const res = await (0, node_fetch_1.default)(source);
    const json = await res.json();
    return json;
}
async function name(params) {
    return params.name;
}
Promise.all([
    req(source).then(result => name(result)),
    req(source).then(result => name(result)),
    req(source).then(result => name(result))
]).then(values => {
    console.log(values);
});
