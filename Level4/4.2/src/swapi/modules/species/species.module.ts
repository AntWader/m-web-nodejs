import { DynamicModule, Module } from '@nestjs/common';
import { SpeciesService } from './species.service';
import { SpeciesController } from './species.controller';
import { DatabaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Species } from '../../../swapi/entities/species.entity';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Film } from '../../../swapi/entities/film.entity';

// @Module({
//   imports: [DatabaseModule, TypeOrmModule.forFeature([Species, Planet, Person, Film])],
//   controllers: [SpeciesController],
//   providers: [SpeciesService]
// })
// export class SpeciesModule { }

@Module({
  imports: [TypeOrmModule.forFeature([Species, Planet, Person, Film])],
  controllers: [SpeciesController],
  providers: [SpeciesService]
})
export class SpeciesModule {
  static register(options: { db: any }): DynamicModule {
    return {
      module: SpeciesModule,
      imports: [options.db],
    };
  }
}
