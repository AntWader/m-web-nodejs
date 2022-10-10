import express from "express";
import bodyParser from "body-parser";

import * as path from 'path';
import * as fs from 'fs';

import querystring from 'querystring';

import { makeBooksPage, minOffset, bookType } from "./booksTemplate";
import { makeBookPage } from "./bookTemplate";

import { db, whiteFilter } from './models/db';


const getBookStr = fs.readFileSync(path.join(__dirname, '../sqlScripts/get_book-page.sql')).toString()

const booksSearchStr = fs.readFileSync(path.join(__dirname, '../sqlScripts/search_str_books-page.sql')).toString()
const booksSearchAuthor = fs.readFileSync(path.join(__dirname, '../sqlScripts/search_str_books-page_author_id.sql')).toString()
const booksSearchYear = fs.readFileSync(path.join(__dirname, '../sqlScripts/search_str_books-page_year.sql')).toString()

const updateBookViews = fs.readFileSync(path.join(__dirname, '../sqlScripts/update_books_views.sql')).toString()

const updateBookClicks = fs.readFileSync(path.join(__dirname, '../sqlScripts/update_books_clicks.sql')).toString()

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
            let body = querystring.parse(
                req.url.replace(/^\/\?/, '')
            ) as unknown as { offset: number, search?: string, author?: number, year?: number }

            if (body.offset) {
                // SQL injections prevent
                if (body.search && (whiteFilter.test(body.search))) {
                    res.send(await makeBooksPage(
                        body.offset,
                        bookUrl,
                        'Invalid search string!'
                    ));
                } else {
                    if (body.search) {
                        let searchStr = body.search ?
                            `WHERE \n${booksSearchStr.replace(/searchString/g, body.search)} ` :
                            '';
                        let searchAuthor = body.author ?
                            `\nAND ${booksSearchAuthor.replace(/\.author_id\s*=\s*\'\d+\'/, `.author_id = \'${body.author}\'`)} ` :
                            '';
                        let searchYear = body.year ?
                            `\nAND${booksSearchYear.replace(/yearString/g, `${body.year}`)} ` :
                            '';

                        res.send(await makeBooksPage(
                            body.offset,
                            bookUrl,
                            'Search: '.concat(body.search),
                            searchStr + searchAuthor + searchYear
                        ));
                    } else {
                        res.send(await makeBooksPage(body.offset, bookUrl));
                    }
                }
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
        ) as object[])[0] as bookType

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