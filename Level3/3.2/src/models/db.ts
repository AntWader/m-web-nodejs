import mysql from "mysql";

import { promisify } from 'util';

/**
 * Regex: /[^\w\s\-\+\,\.а-яА-ЯіІїЇєЄ]/g
 */
export const whiteFilter = /[^\w\s\-\+\,\.\!\?\:\#а-яА-ЯіІїЇєЄ]/g

const dbConfig = {
    HOST: "85.10.205.173",
    USER: "nodejs32test",
    PASSWORD: "Ant88Woker",
    DB: "nodejs32test"
};

const connection = mysql.createConnection({
    host: dbConfig.HOST,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB
});

async function makeConnection() {
    console.log('Connecting to mysql DB...')

    const connect = promisify(connection.connect.bind(connection))

    let answer = await connect();
    console.log(`Connection state: ${connection.state} \n`, answer)
}

export async function db(command: string) {
    if (connection.state !== 'authenticated') await makeConnection()

    const execute = promisify(connection.query.bind(connection))

    return JSON.parse(JSON.stringify(await execute(command))) as Promise<object>
}
