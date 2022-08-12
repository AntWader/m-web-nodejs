"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUsrDataM = exports.writeUsrDataM = void 0;
function writeUsrDataM(client, col, login, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            let collection = yield client.db().collection(col);
            if ((yield collection.findOne()) == null) {
                yield client.db().createCollection(col);
                yield client.db().collection(col).insertOne({ login: login, content: content });
            }
            else {
                if ((yield collection.findOne({ login: login })) == null) {
                    yield collection.insertOne({ login: login, content: content });
                }
                else
                    yield collection.replaceOne({ login: login }, { login: login, content: content });
            }
            yield client.close();
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.writeUsrDataM = writeUsrDataM;
function getUsrDataM(client, col, login) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            let parsed = yield client.db().collection(col).findOne({ login: login });
            parsed = JSON.parse(JSON.stringify(parsed));
            client.close();
            return parsed == null ? null : parsed.content;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getUsrDataM = getUsrDataM;
// const client = new MongoClient("mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority");
// import { writeJSONtoF } from "./rwtofile";
// import { readJSONfromF } from "./rwtofile";
// getUsrDataM('usrData', 'admin').then(a => console.log(a));
// writeUsrDataM('usrData', 'user', { "items": [{ "id": 0, "text": "BEST user", "cheaked": false }] });
// async function addUsr(login: string, pass: string) {
//     await writeUsrDataM('usrSecurity', login, { pass: pass });
// }
// async function checkUsr(login: string, pass: string) {
//     let usr = await getUsrDataM('usrSecurity', login);
//     return usr == null ? false : usr.pass === pass;
// }
//addUsr('admin', 'admin')
//checkUsr('admin', 'admin').then(a => console.log(a));
