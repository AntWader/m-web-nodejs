"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const app = (0, express_1.default)();
const port = 3005;
// create application/json parser
let jsonParser = body_parser_1.default.json();
let data = { items: [{ id: 0, text: '...', checked: true }] };
let currentId = 0;
//console.log(data.items);
app.get('/api/v1/items', jsonParser, (req, res) => {
    console.log("get: ");
    console.log(req.body);
    res.send(data);
});
app.post('/api/v1/items', jsonParser, (req, res) => {
    console.log("post: ");
    console.log(req.body);
    currentId++;
    data.items.push({ id: currentId, text: req.body.text, checked: true });
    res.send({ id: currentId });
});
app.put('/api/v1/items', jsonParser, (req, res) => {
    console.log("put: ");
    console.log(req.body);
    if (req.body.id > currentId || req.body.id < 0) {
        res.send({ "ok": false });
    }
    else {
        data.items.forEach((element, index) => {
            if (element.id === req.body.id) {
                data.items[index] = req.body;
            }
        });
        res.send({ "ok": true });
    }
});
app.delete('/api/v1/items', jsonParser, (req, res) => {
    console.log("delete: ");
    console.log(req.body);
    if (req.body.id > currentId || req.body.id < 0) {
        res.send({ "ok": false });
    }
    else {
        data.items.forEach((element, index) => {
            if (element.id === req.body.id) {
                delete data.items[index];
            }
        });
        res.send({ "ok": true });
    }
});
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/api`);
});
