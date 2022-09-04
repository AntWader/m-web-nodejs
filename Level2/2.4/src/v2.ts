import express from "express";
import bodyParser from "body-parser";

import session from 'express-session'
import { MongoClient } from "mongodb";
import MongoStore from 'connect-mongo'

import { writeUsrData, getUsrData } from "./rwmongo";

import * as path from 'path';

import querystring from 'querystring';

// import * as cors from 'cors';
var cors = require('cors')


const app = express();
const port = 3005;

// static frontend
app.use('/', express.static(path.join(__dirname, '../static/')));


let corsOptions = {
    allowedHeaders: [
        'Origin',
        'X-Requested-With',
        'Content-Type',
        'Accept',
        'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    origin: 'http://localhost:8080',
    preflightContinue: false,
}

// cors frontend
app.use(cors(corsOptions));

// create application/json parser
let jsonParser = bodyParser.json();

type itemType = { id: number, text: string, checked: boolean };

type dataType = {
    items: itemType[];
} & Record<string, any>;

const mongoConnectString = "mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority";

const client = new MongoClient(mongoConnectString);


/**
 * The name of the collection for storing user data.
 */
const dbStore = 'usrData';

/**
 * The name of the collection for storing user passwords.
 */
const dbSecurity = 'usrSecurity';

async function checkUsr(login: string, pass: string) {
    let usr = await getUsrData(dbSecurity, login);
    return usr == null ? false : usr.pass === pass;
}

async function addUsr(login: string, pass: string) {
    await writeUsrData(dbSecurity, login, { pass: pass });
}

let responce = (res: any, a: object) => {
    res.send(a);
    console.log(a);
}

type storeType = {
    set: (content: object) => {},
    get: () => Promise<contentType> | contentType
} & Record<string, any>;

type contentType = { id: number, data: dataType } & Record<string, any>;

let storeCookie = (session: { buffer?: object } & Record<string, any>) => {
    return {
        set: (content: contentType) => {
            session.buffer = content;
        },
        get: (): contentType => {
            if (session.buffer) {
                return session.buffer as contentType;
            } else return { id: initId, data: initData } as contentType;
        }
    } as storeType
}

const initData: dataType = { items: [] };
const initId: number = 0;

app.use(
    session({
        secret: 'SecretString',
        resave: true,
        saveUninitialized: true,
        store: MongoStore.create({
            client: client,
            dbName: 'test',
            collectionName: 'sessions'
        }),
        cookie: {
            maxAge: 1000 * 60 * 60 * 24 // 1000ms*60sec*60min*24h 
        },
    }));

/**
 * Method to get item with unic id from array, and execute callback function if sucsess,
 * orr error function if fail.
 * 
 * @param arr erray of items
 * @param id item unic id
 * @param action function to execute if item was found
 * @param err function to execute if item was not found
 */
function getItem(arr: itemType[], id: number, action: (ind: number) => any, err: Function) {
    let matchInd = -1;

    arr.forEach((element, index) => {
        if (element.id === id) {
            matchInd = index;
        }
    });

    if (matchInd >= 0) {
        action(matchInd);
    } else err();
}

async function get(session: { buffer?: object, login?: string } & Record<string, any>) {
    return session.login
        ? await getUsrData(dbStore, session.login) as contentType
        : storeCookie(session).get() as contentType
}

async function set(session: { buffer?: object, login?: string } & Record<string, any>, content: object) {
    return session.login
        ? await writeUsrData(dbStore, session.login, content)
        : storeCookie(session).set(content)
}

let methods = {
    login: async (
        req: { body: { login: string, pass: string } } & Record<string, any>,
        res: Record<string, any>
    ) => {
        console.log(`login: ${req.body}`);

        await checkUsr(req.body.login, req.body.pass).then(function (flag) {
            if (flag) {
                req.session['login'] = req.body.login;
                console.log(req.session);

                responce(res, { ok: true });
            } else responce(res, { ok: false });
        })
    },
    logout: async (
        req: Record<string, any>,
        res: Record<string, any>
    ) => {
        console.log(`logout: ${req.body}`);

        req.session.login = null;
        req.session.destroy();

        responce(res, { ok: true })
    },
    register: async (
        req: { body: { login: string, pass: string } } & Record<string, any>,
        res: Record<string, any>
    ) => {
        // add new user
        await addUsr(req.body.login, req.body.pass)

        req.session['login'] = req.body.login;

        // create user collections
        await set(req.session, { id: initId, data: initData });
        responce(res, { ok: true });
    },
    getItems: async (
        req: Record<string, any>,
        res: Record<string, any>
    ) => {
        console.log(`getItems: ${req.body}, session: ${req.session}`);
        let content: contentType = await get(req.session);
        console.log(content);
        responce(res, content.data);
    },
    deleteItem: async (
        req: { body: { id: itemType["id"] } } & Record<string, any>,
        res: Record<string, any>
    ) => {
        let content: contentType = await get(req.session);
        if (req.body.id > content.id || req.body.id < 0) {
            responce(res, { "ok": false });
        } else {
            getItem(
                content.data.items,
                req.body.id,
                async function (ind) {
                    content.data.items.splice(ind, 1);

                    await set(req.session, content); //UPDATE usr data
                    responce(res, { "ok": true });
                },
                () => responce(res, { "ok": false })
            );
        }
    },
    addItem: async (
        req: { body: { text: itemType["text"] } } & Record<string, any>,
        res: Record<string, any>
    ) => {
        let post = (content: contentType): contentType => {
            content.id++;
            content.data.items.push({ id: content.id, text: req.body.text, checked: false });

            return { id: content.id, data: content.data } as contentType;
        }
        let content: contentType = await get(req.session);
        let newContent = post(content);

        await set(req.session, newContent); //UPDATE usr data
        responce(res, { id: newContent.id });
    },
    editItem: async (
        req: { body: itemType } & Record<string, any>,
        res: Record<string, any>
    ) => {
        let content: contentType = await get(req.session);
        if (req.body.id > content.id || req.body.id < 0) {
            responce(res, { "ok": false });
        } else {
            getItem(
                content.data.items,
                req.body.id,
                async function (ind) {
                    content.data.items[ind] = req.body;

                    await set(req.session, content); //UPDATE usr data
                    responce(res, { "ok": true });
                },
                () => responce(res, { "ok": false })
            );
        }
    }
}


app.post('*', jsonParser, async function (req, res) {
    try {
        let body = querystring.parse(req.url.replace('/api/v2/router?', ''));
        console.log(req.url)

        let action = body.action as string;

        if (Object.keys(methods).includes(action)) {
            // @ts-ignore
            await methods[action](req, res);
        } else res.status(400).send({ error: "...." }); //ERROR 400 Bad Request
    } catch (e) {
        console.log(e);
        res.status(500).send({ error: "...." }); //ERROR 500 server error
    }
});

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/frontend.html`);
})