import { MongoClient } from "mongodb";

const mongoConnectString = "mongodb+srv://user:d2nswPs7tZySH6Ww@cluster0.vnoij.mongodb.net/?retryWrites=true&w=majority";


type mongoDataType = Record<string, any> | null;

export async function writeUsrData(col: string, login: string, content: object) {
    const client = new MongoClient(mongoConnectString);

    await client.connect();
    let collection = await client.db().collection(col);

    if (await collection.findOne() == null) {
        await client.db().createCollection(col);
        await client.db().collection(col).insertOne({ login: login, content: content });
    } else {
        if (await collection.findOne({ login: login }) == null) {
            await collection.insertOne({ login: login, content: content });
        } else await collection.replaceOne({ login: login }, { login: login, content: content });
    }

    await client.close();
}

export async function getUsrData(col: string, login: string) {
    const client = new MongoClient(mongoConnectString);

    await client.connect();

    let parsed = await client.db().collection(col).findOne({ login: login }) as mongoDataType;
    console.log(JSON.stringify(parsed)); //
    parsed = JSON.parse(JSON.stringify(parsed));

    await client.close();

    return parsed == null ? null : parsed.content as mongoDataType;
}
