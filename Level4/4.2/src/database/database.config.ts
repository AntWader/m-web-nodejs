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