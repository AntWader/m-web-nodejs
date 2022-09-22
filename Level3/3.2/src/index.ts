import express from "express";
import bodyParser from "body-parser";

import * as path from 'path';

import * as fs from 'fs';

const app = express();
const port = 3000;

// create application/json parser
let jsonParser = bodyParser.json();

// static frontend
app.use('/', express.static(path.join(__dirname, '../frontend/')));

app.get('*', jsonParser, async function (req, res) {
    try {
        if (req.url==='\/') { // url: /
            res.send(
                fs.readFileSync(path.join(__dirname, '../frontend/books-page/books-page.html'), 'utf-8')
                    .replace(
                        /\.\/books-page_files\//g,
                        'http://localhost:3000/books-page/books-page_files/'
                    ));
        }
        if (/^\/\?/.test(req.url)) { // url starts from: /?
            // let body = querystring.parse(req.url.replace('/?', ''));
            // console.log(req.url)
        }
        if (/^\/book\//.test(req.url)) { // url starts from: /book/
            res.send(
                fs.readFileSync(path.join(__dirname, '../frontend/book-page/book-page.html'), 'utf-8')
                    .replace(
                        /\.\/book-page_files\//g,
                        'http://localhost:3000/book-page/book-page_files/'
                    ));
        }


    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/`);
})