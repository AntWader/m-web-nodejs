import { Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from 'src/swapi/entities/starship.entity';
import { Person } from 'src/swapi/entities/person.entity';
import { Film } from 'src/swapi/entities/film.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Starship, Person, Film])],
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule { }
