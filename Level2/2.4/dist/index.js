"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// r/w to .txt file
// import { writeJSONtoF } from "./rwtofile";
// import { readJSONfromF } from "./rwtofile";
// r/w to mongodb
const rwmongo_1 = require("./rwmongo");
const rwmongo_2 = require("./rwmongo");
const app = (0, express_1.default)();
const port = 3005;
// create application/json parser
let jsonParser = body_parser_1.default.json();
// r/w to .txt file case
// function get() {
//     data = readJSONfromF('../data.txt') as dataType;
//     id = readJSONfromF('../id.txt').currentId as number;
// }
let data;
let id;
// r/w to mongodb
function get() {
    return __awaiter(this, void 0, void 0, function* () {
        data = (yield (0, rwmongo_2.getM)('data'));
        id = (yield (0, rwmongo_2.getM)('lastId')).id;
    });
}
// function update() {
//   writeJSONtoF('../data.txt', data);
//   writeJSONtoF('../id.txt', { currentId: id });
// }
// r/w to mongodb
function update() {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, rwmongo_1.writeM)('data', data);
        yield (0, rwmongo_1.writeM)('lastId', { id: id });
    });
}
/**
 * Method to get item with unic id from array, and execute callback function if sucsess,
 * orr error function if fail.
 *
 * @param arr erray of items
 * @param id item unic id
 * @param action function to execute if item was found
 * @param err function to execute if item was not found
 */
function getItem(arr, id, action, err) {
    let matchInd = -1;
    arr.forEach((element, index) => {
        if (element.id === id) {
            matchInd = index;
        }
    });
    if (matchInd >= 0) {
        action(matchInd);
    }
    else
        err();
}
//console.log(data.items);
app.get('/api/v1/items', jsonParser, (req, res) => {
    console.log("get: ");
    console.log(req.body);
    let responce = data;
    res.send(responce);
    console.log(responce);
});
app.post('/api/v1/items', jsonParser, (req, res) => {
    console.log("post: ");
    console.log(req.body);
    id++;
    data.items.push({ id: id, text: req.body.text, checked: true });
    let responce = { id: id };
    res.send(responce);
    console.log(responce);
    update(); //UPDATE
});
app.put('/api/v1/items', jsonParser, (req, res) => {
    console.log("put: ");
    console.log(req.body);
    let responce;
    if (req.body.id > id || req.body.id < 0) {
        res.send({ "ok": false });
    }
    else {
        getItem(data.items, req.body.id, function (ind) {
            data.items[ind] = req.body;
            responce = { "ok": true };
            update(); //UPDATE
        }, () => responce = { "ok": false });
    }
    res.send(responce);
    console.log(responce);
});
app.delete('/api/v1/items', jsonParser, (req, res) => {
    console.log("delete: ");
    console.log(req.body);
    let responce;
    if (req.body.id > id || req.body.id < 0) {
        res.send({ "ok": false });
    }
    else {
        getItem(data.items, req.body.id, function (ind) {
            //delete data.items[ind];
            data.items.splice(ind, 1);
            responce = { "ok": true };
            update(); //UPDATE
        }, () => responce = { "ok": false });
    }
    res.send(responce);
    console.log(responce);
});
//import serveStatic from "serve-static";
const path = __importStar(require("path"));
app.use('/', express_1.default.static(path.join(__dirname, '../static/')));
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/frontend.html`);
    get();
});
