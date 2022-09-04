"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const rwtofile_1 = require("./rwtofile");
const rwtofile_2 = require("./rwtofile");
const app = (0, express_1.default)();
const port = 3005;
// create application/json parser
let jsonParser = body_parser_1.default.json();
let data = (0, rwtofile_2.readJSONfromF)('../data.txt');
let id = (0, rwtofile_2.readJSONfromF)('../id.txt').currentId;
function update() {
    (0, rwtofile_1.writeJSONtoF)('../data.txt', data);
    (0, rwtofile_1.writeJSONtoF)('../id.txt', { currentId: id });
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
    update();
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
            delete data.items[ind];
            responce = { "ok": true };
            update(); //UPDATE
        }, () => responce = { "ok": false });
    }
    res.send(responce);
    console.log(responce);
});
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/api`);
});
