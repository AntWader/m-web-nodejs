import { Module } from '@nestjs/common';
import { FilmsService } from './films.service';
import { FilmsController } from './films.controller';
import { DatabaseModule } from 'src/database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Person } from 'src/swapi/entities/person.entity';
import { Planet } from 'src/swapi/entities/planet.entity';
import { Film } from 'src/swapi/entities/film.entity';
import { Species } from 'src/swapi/entities/species.entity';
import { Vehicle } from 'src/swapi/entities/vehicle.entity';
import { Starship } from 'src/swapi/entities/starship.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Film, Person, Planet, Starship, Vehicle, Species])],
  controllers: [FilmsController],
  providers: [FilmsService]
})
export class FilmsModule { }
