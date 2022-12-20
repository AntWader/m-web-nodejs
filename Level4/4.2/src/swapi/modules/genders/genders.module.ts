import { Module } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GendersController } from './genders.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/swapi/entities/person.entity';
import { Gender } from 'src/swapi/entities/gender.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Person, Gender])],
  controllers: [GendersController],
  providers: [GendersService]
})
export class GendersModule { }
