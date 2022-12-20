import { Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from 'src/swapi/entities/species.entity';
import { Planet } from 'src/swapi/entities/planet.entity';
import { Person } from 'src/swapi/entities/person.entity';
import { Film } from 'src/swapi/entities/film.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Species, Planet, Person, Film])],
  controllers: [SpeciesController],
  providers: [SpeciesService]
})
export class SpeciesModule { }
