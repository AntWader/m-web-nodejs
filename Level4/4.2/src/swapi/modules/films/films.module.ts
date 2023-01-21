import { DynamicModule, Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from '../../../swapi/entities/person.entity';
import { Planet } from '../../../swapi/entities/planet.entity';
import { Film } from '../../../swapi/entities/film.entity';
import { Species } from '../../../swapi/entities/species.entity';
import { Vehicle } from '../../../swapi/entities/vehicle.entity';
import { Starship } from '../../../swapi/entities/starship.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Film, Person, Planet, Starship, Vehicle, Species])],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule {
  static register(options: { db: any }): DynamicModule {
    return {
      module: FilmsModule,
      imports: [options.db],
    };
  }
}

// @Module({
//   imports: [DatabaseModule, TypeOrmModule.forFeature([Film, Person, Planet, Starship, Vehicle, Species])],
//   controllers: [FilmsController],
//   providers: [FilmsService]
// })
// export class FilmsModule { }
