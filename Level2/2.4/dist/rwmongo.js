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
exports.getUsrData = exports.writeUsrData = void 0;
const mongodb_1 = require("mongodb");
const mongoConnectString = "mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority";
function writeUsrData(col, login, content) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new mongodb_1.MongoClient(mongoConnectString);
            console.log(`Hey!!! ${col} ${login}:${JSON.stringify(content)}`);
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
exports.writeUsrData = writeUsrData;
function getUsrData(col, login) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const client = new mongodb_1.MongoClient(mongoConnectString);
            console.log(`Hey___ ${col} ${login}:`);
            yield client.connect();
            let parsed = yield client.db().collection(col).findOne({ login: login });
            console.log(JSON.stringify(parsed)); //
            parsed = JSON.parse(JSON.stringify(parsed));
            console.log(JSON.stringify(parsed)); //
            yield client.close();
            return parsed == null ? null : parsed.content;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getUsrData = getUsrData;
