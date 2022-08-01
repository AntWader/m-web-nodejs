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
exports.getM = exports.writeM = exports.createM = void 0;
const mongodb_1 = require("mongodb");
const client = new mongodb_1.MongoClient("mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority");
function createM(name, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.db().createCollection(name);
            yield client.db().collection(name).insertOne(data);
            client.close();
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.createM = createM;
function writeM(name, data) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            yield client.db().collection(name).replaceOne({}, data);
            client.close();
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.writeM = writeM;
function getM(name) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield client.connect();
            let parsed = yield client.db().collection(name).findOne();
            client.close();
            delete parsed["_id"];
            return parsed;
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.getM = getM;
