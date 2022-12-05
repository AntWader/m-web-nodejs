import { Module } from "@nestjs/common";
import { PeopleService } from "./people.service";
import { PeopleController } from "./people.controller";
import { DatabaseModule } from "src/database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "../../entities/person.entity";
import { Gender } from "../../entities/gender.entity";
import { Image } from "../../entities/image.entity";
import { Film } from "src/swapi/entities/film.entity";
import { Planet } from "src/swapi/entities/planet.entity";
import { Species } from "src/swapi/entities/species.entity";
import { Vehicle } from "src/swapi/entities/vehicle.entity";
import { Starship } from "src/swapi/entities/starship.entity";

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Person, Image, Gender, Planet, Film, Species, Vehicle, Starship])],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule { }
