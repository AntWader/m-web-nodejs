import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const antwader4nestjsDbConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: '85.10.205.173',
    port: 3306,
    username: 'antwader4nestjs',
    password: 'ViA#pwa3_v5FnWw',
    database: 'antwader4nestjs',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
}

export const nest4jsDbConfig: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'nest4js',
    password: 'PASSWORD',
    database: 'nest4js',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
}

export const dockerDb: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'db',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'mysql',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
}