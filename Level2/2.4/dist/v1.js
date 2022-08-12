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
// import { writeUsrDataM } from "./rwmongo";
// import { getUsrDataM } from "./rwmongo";
const express_session_1 = __importDefault(require("express-session"));
const mongodb_1 = require("mongodb");
const connect_mongo_1 = __importDefault(require("connect-mongo"));
const rwmongo_1 = require("./rwmongo");
const path = __importStar(require("path"));
const app = (0, express_1.default)();
const port = 3005;
// static frontend
app.use('/', express_1.default.static(path.join(__dirname, '../static/')));
// create application/json parser
let jsonParser = body_parser_1.default.json();
const mongoConnectString = "mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority";
const client = new mongodb_1.MongoClient(mongoConnectString);
/**
 * The name of the collection for storing user data.
 */
const dbStore = 'usrData';
/**
 * The name of the collection for storing user passwords.
 */
const dbSecurity = 'usrSecurity';
function checkUsr(login, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        let usr = yield (0, rwmongo_1.getUsrData)(dbSecurity, login);
        return usr == null ? false : usr.pass === pass;
    });
}
function addUsr(login, pass) {
    return __awaiter(this, void 0, void 0, function* () {
        yield (0, rwmongo_1.writeUsrData)(dbSecurity, login, { pass: pass });
    });
}
let responce = (res, a) => {
    res.send(a);
    console.log(a);
};
let storeCookie = (session) => {
    return {
        set: (content) => {
            session.buffer = content;
        },
        get: () => {
            if (session.buffer) {
                return session.buffer;
            }
            else
                return { id: initId, data: initData };
        }
    };
};
const initData = { items: [] };
const initId = 0;
app.use((0, express_session_1.default)({
    secret: 'SecretString',
    resave: true,
    saveUninitialized: true,
    store: connect_mongo_1.default.create({
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
function get(session) {
    return __awaiter(this, void 0, void 0, function* () {
        return session.login
            ? yield (0, rwmongo_1.getUsrData)(dbStore, session.login)
            : storeCookie(session).get();
    });
}
function set(session, content) {
    return __awaiter(this, void 0, void 0, function* () {
        return session.login
            ? yield (0, rwmongo_1.writeUsrData)(dbStore, session.login, content)
            : storeCookie(session).set(content);
    });
}
app.get('/api/v1/items', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("get: ");
    console.log(req.body);
    console.log(req.session);
    yield get(req.session).then((content) => {
        console.log(content);
        responce(res, content.data);
    });
}));
app.post('/api/v1/items', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("post: ");
    console.log(req.body);
    console.log(req.session);
    let post = (content) => {
        content.id++;
        content.data.items.push({ id: content.id, text: req.body.text, checked: true });
        return { id: content.id, data: content.data };
    };
    yield get(req.session).then((content) => {
        let newContent = post(content);
        set(req.session, newContent); //UPDATE usr data
        responce(res, { id: newContent.id });
    });
}));
app.put('/api/v1/items', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("put: ");
    console.log(req.body);
    console.log(req.session);
    yield get(req.session).then((content) => {
        if (req.body.id > content.id || req.body.id < 0) {
            responce(res, { "ok": false });
        }
        else {
            getItem(content.data.items, req.body.id, function (ind) {
                content.data.items[ind] = req.body;
                set(req.session, content); //UPDATE usr data
                responce(res, { "ok": true });
            }, () => responce(res, { "ok": false }));
        }
    });
}));
app.delete('/api/v1/items', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("delete: ");
    console.log(req.body);
    console.log(req.session);
    yield get(req.session).then((content) => {
        if (req.body.id > content.id || req.body.id < 0) {
            responce(res, { "ok": false });
        }
        else {
            getItem(content.data.items, req.body.id, function (ind) {
                content.data.items.splice(ind, 1);
                set(req.session, content); //UPDATE usr data
                responce(res, { "ok": true });
            }, () => responce(res, { "ok": false }));
        }
    });
}));
app.post('/api/v1/login', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("post login: ");
    console.log(req.body);
    yield checkUsr(req.body.login, req.body.pass).then(function (flag) {
        if (flag) {
            req.session['login'] = req.body.login;
            console.log(req.session);
            responce(res, { ok: true });
        }
        else
            responce(res, { ok: false });
    });
}));
app.post('/api/v1/logout', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("post logout: ");
    console.log(req.body);
    // JSON.parse(req.session.session).expires = new Date().toUTCString();
    req.session.login = null;
    req.session.destroy();
    responce(res, { ok: true });
}));
app.post('/api/v1/register', jsonParser, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("post register: ");
    console.log(req.body);
    // add new user
    yield addUsr(req.body.login, req.body.pass)
        .then(() => {
        req.session['login'] = req.body.login;
        // create user collections
        set(req.session, { id: initId, data: initData });
        responce(res, { ok: true });
    });
}));
app.listen(port, () => {
    console.log(`Example app listening on http://localhost:${port}/frontend.html`);
});
