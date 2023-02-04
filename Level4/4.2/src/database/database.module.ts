import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { antwader4nestjsDbConfig, nest4jsDbConfig } from './database.config';

/**
 * This module provides access to cloud database.
 */
@Module({
  imports: [TypeOrmModule.forRoot(antwader4nestjsDbConfig)],
  exports: [TypeOrmModule.forRoot(antwader4nestjsDbConfig)],
})
export class DatabaseModule { }


/**
 * This module provides access to database.
 */
// @Module({
//   imports: [TypeOrmModule.forRoot(nest4jsDbConfig)],
//   exports: [TypeOrmModule.forRoot(nest4jsDbConfig)],
// })
// export class DatabaseModule { }
