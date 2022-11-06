import express from "express";

import multer from 'multer';
import bodyParser from "body-parser";

import * as path from 'path';
import * as fs from 'fs';

import { bookType } from "./booksTemplate";

import { db, whiteFilter } from './models/db';

import { cloudinaryUpload } from "./models/uploadImg";


const getBooksAdminStr = fs.readFileSync(path.join(__dirname, '../sqlScripts/get_books-admin.sql')).toString()

const markBookDeleteTime = fs.readFileSync(path.join(__dirname, '../sqlScripts/mark-as-delete_books.sql')).toString()
const markBookAuthorLinksDeleteTime = fs.readFileSync(path.join(__dirname, '../sqlScripts/mark-as-delete_book_author_id.sql')).toString()

export const routerAdmin = express.Router()

// create application/json parser
let jsonParser = bodyParser.json();

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

routerAdmin.get('/', jsonParser, authentication, async function (req, res) {
    try {
        res.sendFile(path.join(__dirname, '../frontend/admin-page/admin-page.html'))
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

routerAdmin.get('/api/v1/books', jsonParser, async function (req, res) {
    try {
        let booksAdmin = await db(getBooksAdminStr) as
            bookType[] & { views: number, clicks: number, delete_time: string }

        res.send(JSON.stringify(booksAdmin))
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

// marks book's delete time
routerAdmin.get('/api/v1/book/:bookId', jsonParser, async function (req, res) {
    try {
        console.log(`book with id:${req.params.bookId} will be deleted after 5 days`)

        await db(markBookDeleteTime.replace(
            /book_id\s*\=\s*\'\d+\'/,
            `book_id = \'${req.params.bookId}\'`
        ))
        await db(markBookAuthorLinksDeleteTime.replace(
            /book_id\s*\=\s*\'\d+\'/,
            `book_id = \'${req.params.bookId}\'`
        ))

        let adminUrl =
            req.protocol + '://' + req.get('host') +
            req.originalUrl.replace(`/api/v1/book/${req.params.bookId}`, '');

        res.writeHead(302, {
            Location: adminUrl
        }).end();

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

const storage = multer.diskStorage({
    destination: 'uploads/',
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
})

const upload = multer({ storage: storage })

const addNewBook = fs.readFileSync(path.join(__dirname, '../sqlScripts/add_new-book.sql')).toString()
const findAuthor = fs.readFileSync(path.join(__dirname, '../sqlScripts/find_author-name.sql')).toString()
const addNewAuthor = fs.readFileSync(path.join(__dirname, '../sqlScripts/add_new-authors.sql')).toString()
const addNewBookAuthorLinks = fs.readFileSync(path.join(__dirname, '../sqlScripts/add_new-book_author_id.sql')).toString()

routerAdmin.post('/api/v1/book', jsonParser, upload.single("img"), async function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)
        console.log(req.file?.path)


        async function addBook() {
            let cloudinaryResponse = req.file ? await cloudinaryUpload(req.file?.path) : null;
            console.log(cloudinaryResponse?.secure_url)

            let answerBooks = await db(addNewBook
                .replace(/\'year\'/, req.body.year ? `\'${req.body.year}\'` : 'NULL')
                .replace(/\'pages\'/, req.body.pages ? `\'${req.body.pages}\'` : 'NULL')
                .replace(/\'isbn\'/, req.body.isbn ? `\'${req.body.isbn}\'` : 'NULL')
                .replace(/\'img\'/, cloudinaryResponse ? `\'${cloudinaryResponse.secure_url}\'` : 'NULL')
                .replace(/\'title\'/, req.body.title ? `\'${req.body.title}\'` : 'NULL')
                .replace(/\'description\'/, req.body.description ? `\'${req.body.description}\'` : 'NULL')
            ) as { insertId: number } & Record<string, any>
            console.log(answerBooks)

            return answerBooks.insertId
        }

        type authorsType = { author_id: number, author: string }[]

        async function findAuthorsByName(authors: string[]) {
            let authorId = await db(findAuthor
                .replace(/WHERE\s+author\s*=\s*\'author\'/,
                    `WHERE ${authors.map(a => `author = \'${a}\'`).join(' OR ')}`)
            ) as authorsType
            console.log('findAuthorsByName')
            console.log(authorId)

            return authorId
        }

        async function addAuthors(authors: string[]) {
            if (authors.length == 0) return []

            let answerAuthors = await db(addNewAuthor
                .replace(/\(\'author\'\)/,
                    `${authors.map(a => `\(\'${a}\'\)`).join(', ')}`)
            ) as { insertId: number } & Record<string, any>

            console.log('addAuthors')
            console.log(answerAuthors)

            let newAuthors = authors.map((el, ind) => {
                return { author_id: answerAuthors.insertId + ind, author: el }
            }) as authorsType
            console.log(newAuthors)

            return newAuthors
        }

        async function addBookAuthorLinks(bookId: number, authorsId: number[]) {
            let send = `${authorsId.map(aId => `\(\'${aId}\', \'${bookId}\'\)`).join(', ')}`
            let answer = await db(addNewBookAuthorLinks
                .replace(/\(\s*\'\d+\'\s*,\s*\'\d+\'\s*\)/, send)
            )
            console.log('addBookAuthorLinks')
            console.log(send)
            console.log(answer)
        }

        // authors names list
        let authors = req.body.authors as string[]

        // VALIDATION body values
        if (
            (/[^\d]+/.test(req.body.year) ||
                /[^\d]+/.test(req.body.pages) ||
                /[^\d\-]/g.test(req.body.isbn) ||
                whiteFilter.test(req.body.title) ||
                whiteFilter.test(req.body.description) ||
                authors.map(a => /[^\w\s\.а-яА-ЯіІїЇєЄ]/g.test(a)).includes(true)) ||
            (req.body.title === '' || authors[0] === '')
        ) { // if invalid:
            console.error('Invalid req.body values.')
        } else { // if valid:
            // found authors object list: {author_id: number, author: string}[]
            let existAuthors = await findAuthorsByName(authors)

            // successfully added authors object list: {author_id: number, author: string}[]
            let newAuthors = await addAuthors(authors
                .filter(a => !existAuthors.some(auth => auth.author === a)))

            // all book authors object list: {author_id: number, author: string}[]
            let bookAuthors = existAuthors.concat(newAuthors)
            console.log(bookAuthors)

            let bookId = await addBook()
            await addBookAuthorLinks(bookId, bookAuthors.map(a => a.author_id))
        }

        let adminUrl =
            req.protocol + '://' + req.get('host') +
            req.originalUrl.replace('/api/v1/book', '');

        res.writeHead(302, {
            Location: adminUrl
        }).end();

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});