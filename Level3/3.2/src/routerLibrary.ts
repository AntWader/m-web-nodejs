import express from "express";
import bodyParser from "body-parser";

import * as fs from 'fs';

import querystring from 'querystring';

import { makeBooksPage, minOffset, bookType } from "./booksTemplate";
import { makeBookPage } from "./bookTemplate";

import { db } from './models/db';


const getBookStr = fs.readFileSync('./sqlScripts/get_book-page.sql').toString()

const updateBookViews = fs.readFileSync('./sqlScripts/update_books_views.sql').toString()

const updateBookClicks = fs.readFileSync('./sqlScripts/update_books_clicks.sql').toString()

export const routerLibrary = express.Router()

// create application/json parser
let jsonParser = bodyParser.json();

routerLibrary.get('/', jsonParser, async function (req, res) {
    try {
        let bookUrl =
            req.protocol + '://' + req.get('host') + '/book/';

        if (/^\/$/.test(req.url)) {
            res.send(await makeBooksPage(minOffset, bookUrl));
        }
        if (/^\/\?/.test(req.url)) {
            // I NEED TO ADD SEARCH COMPONENTS !!!!!!!!!!
            let body = querystring.parse(req.url.replace(/^\/\?/, '')) as unknown as { offset: number }

            if (body.offset) {
                res.send(await makeBooksPage(body.offset, bookUrl, 'ORDER BY authors'));
            } else res.status(404).send({ error: "...." });
        }
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
})

routerLibrary.get('/book/:bookId', jsonParser, async function (req, res) {
    try {
        let book = (await db(
            getBookStr.replace(
                /WHERE\s+books.book_id\s*\=\s*\'\d+\'/,
                `WHERE books.book_id = \'${req.params.bookId}\'`
            )
        ))[0] as bookType

        if (book) {
            await db(
                updateBookViews.replace(
                    /book_id\s*\=\s*\'\d+\'/,
                    `book_id = \'${book.id}\'`
                )
            )

            res.send(makeBookPage(book))
        } else {
            res.status(404).send({ error: "...." });
        }

        // book ? res.send(makeBookPage(book)) : res.status(404).send({ error: "...." });
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

routerLibrary.get('/api/v1/books/:bookId', async function (req, res) {
    try {
        await db(
            updateBookClicks.replace(
                /book_id\s*\=\s*\'\d+\'/,
                `book_id = \'${req.params.bookId}\'`
            )
        )
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
})