import express from "express";
import bodyParser from "body-parser";

// r/w to mongodb
// import { writeUsrDataM } from "./rwmongo";
// import { getUsrDataM } from "./rwmongo";

import session from 'express-session'
import { MongoClient } from "mongodb";
import MongoStore from 'connect-mongo'

import { MongoRW } from "./rwmongo";

const app = express()
const port = 3005

// create application/json parser
let jsonParser = bodyParser.json()

type itemType = { id: number, text: string, checked: boolean };

type dataType = {
    items: itemType[];
} & Record<string, any>;

const client = new MongoClient("mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority");

const mongoRW = new MongoRW(client);

/**
 * The name of the collection for storing user data.
 */
const dbStore = 'usrData';

/**
 * The name of the collection for storing user passwords.
 */
const dbSecurity = 'usrSecurity';

async function checkUsr(login: string, pass: string) {
    let usr = await mongoRW.getUsrData(dbSecurity, login);
    return usr == null ? false : usr.pass === pass;
}

async function addUsr(login: string, pass: string) {
    await mongoRW.writeUsrData(dbSecurity, login, { pass: pass });
}

let responce = (res: any, a: object) => {
    res.send(a);
    console.log(a);
}

type storeType = {
    set: (content: object) => {},
    get: () => {}
} & Record<string, any>;

type contentType = { id: number, data: object } & Record<string, any>;

let storeMongo = (collection: string, login: string) => {
    return {
        set: async (content: object) => {
            await mongoRW.writeUsrData(collection, login, content);
        },
        get: async () => {
            return await mongoRW.getUsrData(collection, login);
        }
    } as storeType
}

let storeCookie = (session: { buffer?: object } & Record<string, any>) => {
    return {
        set: async (content: contentType) => {
            session.buffer = content;
        },
        get: async () => {
            if (session.buffer) {
                return session.buffer as contentType;
            } else return { id: initId, data: initData };
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

function get(session: { buffer?: object, login?: string } & Record<string, any>) {
    return session.login
        ? storeMongo(dbStore, session.login).get()
        : storeCookie(session).get()
}

app.get('/api/v1/items', jsonParser,
    (
        req: { body: { text: itemType["text"] } } & Record<string, any>,
        res
    ) => {
        console.log("get: ");
        console.log(req.body);
        console.log(req.session);
        console.log(req.session.login);

        responce(res, get(req.session))
    })

app.post('/api/v1/items', jsonParser,
    (
        req: { body: { text: itemType["text"] } } & Record<string, any>,
        res
    ) => {
        console.log("post: ");
        console.log(req.body);
        console.log(req.session);

        id++;
        data.items.push({ id: id, text: req.body.text, checked: true });

        responce(res, { id: id });

        if (req.session.login != null) update(req.session.login, { id: 1, data: data }); //UPDATE
    })

app.put('/api/v1/items', jsonParser,
    (
        req: { body: itemType } & Record<string, any>,
        res
    ) => {
        console.log("put: ");
        console.log(req.body);
        console.log(req.session);

        if (req.body.id > id || req.body.id < 0) {
            responce(res, { "ok": false });
        } else {
            getItem(
                data.items,
                req.body.id,
                function (ind) {
                    data.items[ind] = req.body;

                    responce(res, { "ok": true });

                    if (req.session.login != null) update(req.session.login, { id: 1, data: data }); //UPDATE
                },
                () => responce(res, { "ok": false })
            );
        }
    })

app.delete('/api/v1/items', jsonParser,
    (
        req: { body: { id: itemType["id"] } } & Record<string, any>,
        res
    ) => {
        console.log("delete: ")
        console.log(req.body)
        console.log(req.session);

        if (req.body.id > id || req.body.id < 0) {
            res.send({ "ok": false })
        } else {
            getItem(
                data.items,
                req.body.id,
                function (ind) {
                    //delete data.items[ind];
                    data.items.splice(ind, 1);

                    responce(res, { "ok": true });

                    if (req.session.login != null) update(req.session.login, { id: 1, data: data }); //UPDATE
                },
                () => responce(res, { "ok": false })
            );
        }
    })

//import serveStatic from "serve-static";

import * as path from 'path';

// static frontend
app.use('/', express.static(path.join(__dirname, '../static/')));

app.post('/api/v1/login', jsonParser,
    (
        req: { body: { login: string, pass: string } } & Record<string, any>,
        res
    ) => {
        console.log("post login: ");
        console.log(req.body);

        checkUsr(req.body.login, req.body.pass).then(function (a) {
            if (a) {
                req.session['login'] = req.body.login;
                console.log(req.session);

                // get data from mongodb
                get(req.session.login)
                    .then(() => responce(res, { ok: true }));
            } else responce(res, { ok: false });
        });
    })

app.post('/api/v1/logout', jsonParser,
    (
        req: { body: { login: string, pass: string } } & Record<string, any>,
        res
    ) => {
        console.log("post logout: ");
        console.log(req.body);

        // JSON.parse(req.session.session).expires = new Date().toUTCString();
        req.session.destroy();
        refresh();

        responce(res, { ok: true })
    })

app.post('/api/v1/register', jsonParser,
    (
        req: { body: { login: string, pass: string } } & Record<string, any>,
        res
    ) => {
        console.log("post register: ");
        console.log(req.body);

        // add new user
        addUsr(req.body.login, req.body.pass)
            .then(function (a) {
                console.log(a);

                // create user collections
                update(req.body.login, { id: 1, data: data }).then(() => {
                    responce(res, { ok: true });
                });
            });
    })

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/frontend.html`);
})