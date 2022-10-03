import express from "express";

import multer from 'multer';
import bodyParser from "body-parser";

import * as path from 'path';
import * as fs from 'fs';

import { bookType } from "./booksTemplate";

import { db } from './models/db';

const getBooksStr = fs.readFileSync('./sqlScripts/get_books-page.sql').toString()

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
        let books = await db(getBooksStr) as bookType[]

        res.send(JSON.stringify(books))
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

routerAdmin.post('/api/v1/book', jsonParser, upload.single("img"), async function (req, res) {
    try {
        console.log(req.body)
        console.log(req.file)

        //cloudinaryUpload(req.file?.path)

        let adminUrl =
            req.protocol + '://' + req.get('host') + req.originalUrl.replace('/api/v1/book', '');

        res.writeHead(302, {
            Location: adminUrl
        }).end();

    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});