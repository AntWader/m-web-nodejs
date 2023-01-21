import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { MysqlConnectionOptions } from "typeorm/driver/mysql/MysqlConnectionOptions";

export const test_db: MysqlConnectionOptions = {
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'test_db',
    password: 'PASSWORD',
    database: 'test_db',
    entities: [
        __dirname + '/../**/*.entity{.ts,.js}',
    ],
    synchronize: true,
}

/**
 * This module provides access to database (db).
 */
@Module({
    imports: [TypeOrmModule.forRoot(test_db)],
    exports: [TypeOrmModule.forRoot(test_db)],
})
export class TestDatabaseModule { }