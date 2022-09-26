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

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', jsonParser, async function (req, res) {
    try {
        console.log('/')
        console.log(req.url)

        let books = JSON.parse(fs.readFileSync(
            path.join(__dirname, '../frontend/books-data.txt'), 'utf-8')) as bookType[]

        if (/^\/$/.test(req.url)) {
            let content = books.slice(0, 2)
            res.send(makeBooksPage(content, books.length));
        }
        if (/^\/\?/.test(req.url)) {
            // I NEED TO ADD SEARCH COMPONENTS !!!!!!!!!!
            let body = querystring.parse(req.url.replace(/^\/\?/, '')) as unknown as { offset: number }

            if (body.offset) {
                let content = books.length > body.offset ? books.slice(0, body.offset) : books
                res.send(makeBooksPage(content, books.length));
            } else res.status(404).send({ error: "...." });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
})

app.get('/book/:bookId', jsonParser, async function (req, res) {
    try {
        console.log('/book/:bookId')
        console.log(req.url)

        let books = JSON.parse(fs.readFileSync(
            path.join(__dirname, '../frontend/books-data.txt'), 'utf-8')) as bookType[]

        let book = books.find(el => el.id == req.params.bookId)

        book ? res.send(makeBookPage(book)) : res.status(404).send({ error: "...." });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

function authentication(req: express.Request, res: express.Response, next: () => void) {
    let headerAuth = req.headers.authorization;
    //console.log(req.headers);

    if (!headerAuth) {
        res.setHeader('WWW-Authenticate', 'Basic');
        res.status(401).send({ error: "..." });
    } else {
        // @ts-ignore
        var auth = new Buffer.from(headerAuth.split(' ')[1],
            'base64').toString().split(':');
        var user = auth[0];
        var pass = auth[1];

        if (user === 'admin' && pass === 'admin') {
            next()
        } else {
            res.setHeader('WWW-Authenticate', 'Basic');
            res.status(401).send({ error: "..." });
        }
    }
}

app.get('/admin', jsonParser, authentication, async function (req, res) {
    try {
        res.sendFile(path.join(__dirname, '../frontend/admin-page/admin-page.html'))
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

app.get('/admin/api/v1/books', jsonParser, async function (req, res) {
    try {
        let books = JSON.parse(fs.readFileSync(
            path.join(__dirname, '../frontend/books-data.txt'), 'utf-8')) as bookType[]

        res.send(JSON.stringify(books))

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

app.post('/admin/api/v1/book', jsonParser, async function (req, res) {
    try {
        console.log(req.url)
        console.log(req.body)

        res.writeHead(302, {
            Location: `http://localhost:${port}/admin/`
        }).end();

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
})