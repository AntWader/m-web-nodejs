import { Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from 'src/swapi/entities/planet.entity';
import { Species } from 'src/swapi/entities/species.entity';
import { Person } from 'src/swapi/entities/person.entity';
import { Film } from 'src/swapi/entities/film.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Planet, Species, Person, Film])],
  controllers: [PlanetsController],
  providers: [PlanetsService]
})
export class PlanetsModule { }
