import { Module } from '@nestjs/common';
import { VehiclesService } from './vehicles.service';
import { VehiclesController } from './vehicles.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from 'src/swapi/entities/vehicle.entity';
import { Person } from 'src/swapi/entities/person.entity';
import { Film } from 'src/swapi/entities/film.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Vehicle, Person, Film])],
  controllers: [VehiclesController],
  providers: [VehiclesService]
})
export class VehiclesModule { }
