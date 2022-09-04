"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const source = 'https://random-data-api.com/api/name/random_name';
const res = () => (0, node_fetch_1.default)(source).then(result => result.json());
for (let ind = 0; ind < 3; ind++) {
    res().then(val => { console.log(`${ind} ` + val.name); });
}
