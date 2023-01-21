import { DynamicModule, Module } from '@nestjs/common';
import { PlanetsService } from './planets.service';
import { PlanetsController } from './planets.controller';
import { DatabaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Species } from '../../../swapi/entities/species.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Film } from '../../../swapi/entities/film.entity';

// @Module({
//   imports: [DatabaseModule, TypeOrmModule.forFeature([Planet, Species, Person, Film])],
//   controllers: [PlanetsController],
//   providers: [PlanetsService]
// })
// export class PlanetsModule { }

@Module({
  imports: [TypeOrmModule.forFeature([Planet, Species, Person, Film])],
  controllers: [PlanetsController],
  providers: [PlanetsService]
})
export class PlanetsModule {
  static register(options: { db: any }): DynamicModule {
    return {
      module: PlanetsModule,
      imports: [options.db],
    };
  }
}
