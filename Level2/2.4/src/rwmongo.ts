import { MongoClient } from "mongodb";

const client = new MongoClient("mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority");

type mongoDataType = {
    _id?: any,
} & Record<string, any>;

export async function createM(name: string, data: object) {
    try {
        await client.connect();
        await client.db().createCollection(name);
        await client.db().collection(name).insertOne(data);

        client.close();
    } catch (e) {
        console.log(e);
    }
}

export async function writeM(name: string, data: object) {
    try {
        await client.connect();
        await client.db().collection(name).replaceOne({}, data);
        client.close();
    } catch (e) {
        console.log(e);
    }
}

export async function getM(name: string) {
    try {
        await client.connect();

        let parsed = await client.db().collection(name).findOne() as mongoDataType;

        client.close();

        delete parsed["_id"];

        return parsed as Record<string, any>;
    } catch (e) {
        console.log(e);
    }
}

// import { writeJSONtoF } from "./rwtofile";
// import { readJSONfromF } from "./rwtofile";

// writeM('data',readJSONfromF('../data.txt'));