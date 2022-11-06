import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { antwader4nestjsDbConfig } from './database.config';

@Module({
  imports: [TypeOrmModule.forRoot(antwader4nestjsDbConfig)],
  exports: [TypeOrmModule.forRoot(antwader4nestjsDbConfig)],
})
export class DatabaseModule { }
