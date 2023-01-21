import { DynamicModule, Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { DatabaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from '../../../swapi/entities/vehicle.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Film } from '../../../swapi/entities/film.entity';

// @Module({
//   imports: [DatabaseModule, TypeOrmModule.forFeature([Vehicle, Person, Film])],
//   controllers: [VehiclesController],
//   providers: [VehiclesService]
// })
// export class VehiclesModule { }

@Module({
  imports: [TypeOrmModule.forFeature([Vehicle, Person, Film])],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule {
  static register(options: { db: any }): DynamicModule {
    return {
      module: VehiclesModule,
      imports: [options.db],
    };
  }
}
