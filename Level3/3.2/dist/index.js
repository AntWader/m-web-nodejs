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
const path = __importStar(require("path"));
const fs = __importStar(require("fs"));
const querystring_1 = __importDefault(require("querystring"));
const booksTemplate_1 = require("./booksTemplate");
const bookTemplate_1 = require("./bookTemplate");
const app = (0, express_1.default)();
const port = 3000;
// create application/json parser
let jsonParser = body_parser_1.default.json();
// static frontend
app.use('/', express_1.default.static(path.join(__dirname, '../frontend/')));
app.get('*', jsonParser, function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            let books = JSON.parse(fs.readFileSync(path.join(__dirname, '../frontend/books-data.txt'), 'utf-8'));
            if (req.url === '\/') { // url: /
                let content = books.slice(0, 2);
                res.send((0, booksTemplate_1.makeBooksPage)(content, books.length));
            }
            if (/^\/\?/.test(req.url)) { // url starts from: /?
                let body = querystring_1.default.parse(req.url.replace(/^\/\?/, ''));
                console.log(req.url);
                let content = books.length > body.offset ? books.slice(0, body.offset) : books;
                res.send((0, booksTemplate_1.makeBooksPage)(content, books.length));
            }
            if (/^\/book\//.test(req.url)) { // url starts from: /book/
                let bookId = parseInt(req.url.replace(/^\/book\//, ''));
                let book = books.find(el => el.id == bookId);
                book ? res.send((0, bookTemplate_1.makeBookPage)(book)) : null;
            }
        }
        catch (e) {
            console.log(e);
            res.status(500).send({ error: "...." }); //ERROR 500 server error
        }
    });
});
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
});
