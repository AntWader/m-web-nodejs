"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
// r/w to mongodb
const rwmongo_1 = require("./rwmongo");
const rwmongo_2 = require("./rwmongo");
const express_session_1 = __importDefault(require("express-session"));
const mongodb_1 = require("mongodb");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const app = (0, express_1.default)();
const port = 3005;
// create application/json parser
let jsonParser = body_parser_1.default.json();
const client = new mongodb_1.MongoClient("mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority");
function checkUsr(login, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        let usr = yield (0, rwmongo_2.getUsrDataM)(client, 'usrSecurity', login);
        return usr == null ? false : usr.pass === pass;
    });
}
function addUsr(login, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, rwmongo_1.writeUsrDataM)(client, 'usrSecurity', login, { pass: pass });
    });
}
let responce = (res, a) => {
    res.send(a);
    console.log(a);
};
app.use((0, express_session_1.default)({
    secret: 'SecretString',
    resave: true,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({
        client: client,
        dbName: 'test',
        collectionName: 'sessions',
        // mongoOptions: { useUnifiedTopology: true }
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 1000ms*60sec*60min*24h 
    },
}));
const initData = { items: [] };
const initId = 0;
let data = initData;
let id = initId;
function refresh() {
    data = initData;
    id = initId;
}
/**
 * Gets data from mongodb 'usrData' collection from unic login as key.
 * Expected type: { id: number, data: object }.
 *
 * @param login user login
 */
function get(login) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield (0, rwmongo_2.getUsrDataM)(client, 'usrData', login);
    });
}
function getFromSession() {
}
/**
 * Write content to mongodb 'usrData' collection with unic login as key.
 *
 * @param login user login
 * @param content data to form user content
 */
function update(login, content) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, rwmongo_1.writeUsrDataM)(client, 'usrData', login, content);
    });
}
/**
 * Method to get item with unic id from array, and execute callback function if sucsess,
 * orr error function if fail.
 *
 * @param arr erray of items
 * @param id item unic id
 * @param action function to execute if item was found
 * @param err function to execute if item was not found
 */
function getItem(arr, id, action, err) {
    let matchInd = -1;
    arr.forEach((element, index) => {
        if (element.id === id) {
            matchInd = index;
        }
    });
    if (matchInd >= 0) {
        action(matchInd);
    }
    else
        err();
}
let mongoStore = {
    collectionName: 'usrData',
    mongoClient: client,
    set: (login, content) => __awaiter(void 0, void 0, void 0, function* () {
        yield (0, rwmongo_1.writeUsrDataM)(mongoStore.mongoClient, mongoStore.collectionName, login, content);
    }),
    get: (login) => __awaiter(void 0, void 0, void 0, function* () {
        return yield (0, rwmongo_2.getUsrDataM)(mongoStore.mongoClient, mongoStore.collectionName, login);
    })
};
let cookieStore = {
    session: () => { return this; },
    set: (login, content) => __awaiter(void 0, void 0, void 0, function* () {
        // await writeUsrDataM(mongoStore.mongoClient, mongoStore.collectionName, login, content);
    }),
    get: (login) => __awaiter(void 0, void 0, void 0, function* () {
        // return await getUsrDataM(mongoStore.mongoClient, mongoStore.collectionName, login);
        console.log(this);
        console.log(cookieStore.session);
    })
};
app.get('/api/v1/items', jsonParser, (req, res) => {
    console.log("get: ");
    console.log(req.body);
    console.log(req.session);
    cookieStore.get('');
    // get data from mongodb
    get(req.session.login)
        .then(() => responce(res, data));
});
app.post('/api/v1/items', jsonParser, (req, res) => {
    console.log("post: ");
    console.log(req.body);
    console.log(req.session);
    id++;
    data.items.push({ id: id, text: req.body.text, checked: true });
    responce(res, { id: id });
    if (req.session.login != null)
        update(req.session.login, { id: 1, data: data }); //UPDATE
});
app.put('/api/v1/items', jsonParser, (req, res) => {
    console.log("put: ");
    console.log(req.body);
    console.log(req.session);
    if (req.body.id > id || req.body.id < 0) {
        responce(res, { "ok": false });
    }
    else {
        getItem(data.items, req.body.id, function (ind) {
            data.items[ind] = req.body;
            responce(res, { "ok": true });
            if (req.session.login != null)
                update(req.session.login, { id: 1, data: data }); //UPDATE
        }, () => responce(res, { "ok": false }));
    }
});
app.delete('/api/v1/items', jsonParser, (req, res) => {
    console.log("delete: ");
    console.log(req.body);
    console.log(req.session);
    if (req.body.id > id || req.body.id < 0) {
        res.send({ "ok": false });
    }
    else {
        getItem(data.items, req.body.id, function (ind) {
            //delete data.items[ind];
            data.items.splice(ind, 1);
            responce(res, { "ok": true });
            if (req.session.login != null)
                update(req.session.login, { id: 1, data: data }); //UPDATE
        }, () => responce(res, { "ok": false }));
    }
});
//import serveStatic from "serve-static";
const path = __importStar(require("path"));
// static frontend
app.use('/', express_1.default.static(path.join(__dirname, '../static/')));
app.post('/api/v1/login', jsonParser, (req, res) => {
    console.log("post login: ");
    console.log(req.body);
    checkUsr(req.body.login, req.body.pass).then(function (a) {
        if (a) {
            req.session['login'] = req.body.login;
            console.log(req.session);
            // get data from mongodb
            get(req.session.login)
                .then(() => responce(res, { ok: true }));
        }
        else
            responce(res, { ok: false });
    });
});
app.post('/api/v1/logout', jsonParser, (req, res) => {
    console.log("post logout: ");
    console.log(req.body);
    // JSON.parse(req.session.session).expires = new Date().toUTCString();
    req.session.destroy();
    refresh();
    responce(res, { ok: true });
});
app.post('/api/v1/register', jsonParser, (req, res) => {
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
});
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/frontend.html`);
});
