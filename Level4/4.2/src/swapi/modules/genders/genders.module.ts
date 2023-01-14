import { Module } from '@nestjs/common';
import { GendersService } from './genders.service';
import { GendersController } from './genders.controller';
import { DatabaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../../../swapi/entities/person.entity';
import { Gender } from '../../../swapi/entities/gender.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Person, Gender])],
  controllers: [GendersController],
  providers: [GendersService]
})
export class GendersModule { }
