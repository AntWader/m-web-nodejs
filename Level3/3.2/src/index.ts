import express from "express";
import bodyParser from "body-parser";

import * as path from 'path';

import * as fs from 'fs';

import querystring from 'querystring';

import { makeBooksPage, bookType } from "./booksTemplate";
import { makeBookPage } from "./bookTemplate";

const app = express();
const port = 3000;

// create application/json parser
let jsonParser = bodyParser.json();

// static frontend
app.use('/', express.static(path.join(__dirname, '../frontend/')));

app.get('*', jsonParser, async function (req, res) {
    try {
        let books = JSON.parse(fs.readFileSync(
            path.join(__dirname, '../frontend/books-data.txt'), 'utf-8')) as bookType[]

        if (req.url === '\/') { // url: /
            let content = books.slice(0, 2)
            res.send(makeBooksPage(content, books.length));
        }
        if (/^\/\?/.test(req.url)) { // url starts from: /?
            let body = querystring.parse(req.url.replace(/^\/\?/, '')) as unknown as { offset: number }
            console.log(req.url)

            let content = books.length > body.offset ? books.slice(0, body.offset) : books
            res.send(makeBooksPage(content, books.length));
        }
        if (/^\/book\//.test(req.url)) { // url starts from: /book/
            let bookId = parseInt(req.url.replace(/^\/book\//, ''))
            let book = books.find(el => el.id == bookId)

            book ? res.send(makeBookPage(book)) : null
        }


    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
})