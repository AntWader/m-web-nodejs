"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const source = 'https://random-data-api.com/api/users/random_user';
const req = () => (0, node_fetch_1.default)(source).then(result => result.json());
let log = function (val) {
    console.log(`${val.gender} - ${val.first_name} ${val.last_name}`);
};
let recRes = function () {
    req().then(result => {
        if (result.gender === "Female") {
            log(result);
            return result;
        }
        else {
            log(result);
            recRes();
        }
    });
};
recRes();
