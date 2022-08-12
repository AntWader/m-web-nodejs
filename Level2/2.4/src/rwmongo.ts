import { MongoClient } from "mongodb";

type mongoDataType = Record<string, any> | null;

// export async function writeUsrDataM(client: MongoClient, col: string, login: string, content: object) {
//     try {
//         await client.connect();
//         let collection = await client.db().collection(col);
//         if (await collection.findOne() == null) {
//             await client.db().createCollection(col);
//             await client.db().collection(col).insertOne({ login: login, content: content });
//         } else {
//             if (await collection.findOne({ login: login }) == null) {
//                 await collection.insertOne({ login: login, content: content });
//             } else await collection.replaceOne({ login: login }, { login: login, content: content });
//         }

//         await client.close();
//     } catch (e) {
//         console.log(e);
//     }
// }

// export async function getUsrDataM(client: MongoClient, col: string, login: string) {
//     try {
//         await client.connect();

//         let parsed = await client.db().collection(col).findOne({ login: login }) as mongoDataType;
//         parsed = JSON.parse(JSON.stringify(parsed));

//         client.close();

//         return parsed == null ? null : parsed.content as mongoDataType;
//     } catch (e) {
//         console.log(e);
//     }
// }


export class MongoRW {
    client: MongoClient;

    constructor(client: MongoClient) {
        this.client = client;
    }

    async writeUsrData(col: string, login: string, content: object) {
        try {
            await this.client.connect();
            let collection = await this.client.db().collection(col);
            if (await collection.findOne() == null) {
                await this.client.db().createCollection(col);
                await this.client.db().collection(col).insertOne({ login: login, content: content });
            } else {
                if (await collection.findOne({ login: login }) == null) {
                    await collection.insertOne({ login: login, content: content });
                } else await collection.replaceOne({ login: login }, { login: login, content: content });
            }
    
            await this.client.close();
        } catch (e) {
            console.log(e);
        }
    }

    async getUsrData(col: string, login: string) {
        try {
            await this.client.connect();
    
            let parsed = await this.client.db().collection(col).findOne({ login: login }) as mongoDataType;
            parsed = JSON.parse(JSON.stringify(parsed));
    
            this.client.close();
    
            return parsed == null ? null : parsed.content as mongoDataType;
        } catch (e) {
            console.log(e);
        }
    }
}
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