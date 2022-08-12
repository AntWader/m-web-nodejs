import express from "express";
import bodyParser from "body-parser";

// r/w to mongodb
// import { writeUsrDataM } from "./rwmongo";
// import { getUsrDataM } from "./rwmongo";

import session from 'express-session'
import { MongoClient } from "mongodb";
import MongoStore from 'connect-mongo'

import { MongoRW } from "./rwmongo";

import * as path from 'path';


const app = express();
const port = 3005;

// static frontend
app.use('/', express.static(path.join(__dirname, '../static/')));

// create application/json parser
let jsonParser = bodyParser.json();

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

type contentType = { id: number, data: dataType } & Record<string, any>;

let storeMongo = (collection: string, login: string) => {
    return {
        set: async (content: object) => {
            await mongoRW.writeUsrData(collection, login, content);
        },
        get: async (): Promise<contentType> => {
            return await mongoRW.getUsrData(collection, login) as contentType;
        }
    } as storeType
}

let storeCookie = (session: { buffer?: object } & Record<string, any>) => {
    return {
        set: async (content: contentType) => {
            session.buffer = content;
        },
        get: async (): Promise<contentType> => {
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

function get(session: { buffer?: object, login?: string } & Record<string, any>) {
    return session.login
        ? storeMongo(dbStore, session.login).get() as Promise<contentType>
        : storeCookie(session).get() as Promise<contentType>
}

function set(session: { buffer?: object, login?: string } & Record<string, any>, content: object) {
    return session.login
        ? storeMongo(dbStore, session.login).set(content)
        : storeCookie(session).set(content)
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

        let post = (content: contentType): contentType => {
            content.id++;
            content.data.items.push({ id: content.id, text: req.body.text, checked: true });

            return { id: content.id, data: content.data } as contentType;
        }

        get(req.session).then((content: contentType) => {
            let newContent = post(content);

            set(req.session, newContent); //UPDATE usr data
            responce(res, { id: newContent.id });
        })
    })

app.put('/api/v1/items', jsonParser,
    (
        req: { body: itemType } & Record<string, any>,
        res
    ) => {
        console.log("put: ");
        console.log(req.body);
        console.log(req.session);

        get(req.session).then((content: contentType) => {
            if (req.body.id > content.id || req.body.id < 0) {
                responce(res, { "ok": false });
            } else {
                getItem(
                    content.data.items,
                    req.body.id,
                    function (ind) {
                        content.data.items[ind] = req.body;

                        set(req.session, content); //UPDATE usr data
                        responce(res, { "ok": true });
                    },
                    () => responce(res, { "ok": false })
                );
            }
        })
    })

app.delete('/api/v1/items', jsonParser,
    (
        req: { body: { id: itemType["id"] } } & Record<string, any>,
        res
    ) => {
        console.log("delete: ")
        console.log(req.body)
        console.log(req.session);

        get(req.session).then((content: contentType) => {
            if (req.body.id > content.id || req.body.id < 0) {
                responce(res, { "ok": false });
            } else {
                getItem(
                    content.data.items,
                    req.body.id,
                    function (ind) {
                        content.data.items.splice(ind, 1);

                        set(req.session, content); //UPDATE usr data
                        responce(res, { "ok": true });
                    },
                    () => responce(res, { "ok": false })
                );
            }
        })
    })

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

                responce(res, { ok: true });
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
        req.session.login = null;
        req.session.destroy();

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
            .then(() => {
                req.session['login'] = req.body.login;

                // create user collections
                set(req.session, { id: initId, data: initData });
                responce(res, { ok: true });
            });
    })

app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/frontend.html`);
})