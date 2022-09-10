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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const port = 3055;
// create application/json parser
let jsonParser = body_parser_1.default.json();
// static frontend
app.use('/', express_1.default.static(path.join(__dirname, '../frontend/')));
var button;
(function (button) {
    button[button["minus"] = 0] = "minus";
    button[button["plus"] = 1] = "plus";
})(button || (button = {}));
let counter = [0, 0];
app.post('*', jsonParser, (req, res) => {
    console.log(req.url);
    console.log(req.body);
    counter[req.body.button]++;
    res.send(counter);
});
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/f_3055.html`);
});
