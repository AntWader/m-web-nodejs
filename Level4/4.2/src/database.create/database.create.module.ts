import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "src/database/database.module";
import { Film } from "src/swapi/entities/film.entity";
import { Gender } from "src/swapi/entities/gender.entity";
import { Image } from "src/swapi/entities/image.entity";
import { Person } from "src/swapi/entities/person.entity";
import { Planet } from "src/swapi/entities/planet.entity";
import { Species } from "src/swapi/entities/species.entity";
import { Starship } from "src/swapi/entities/starship.entity";
import { Vehicle } from "src/swapi/entities/vehicle.entity";
import { FilmsService } from "src/swapi/modules/films/films.service";
import { PeopleService } from "src/swapi/modules/people/people.service";
import { PlanetsService } from "src/swapi/modules/planets/planets.service";
import { SpeciesService } from "src/swapi/modules/species/species.service";
import { StarshipsService } from "src/swapi/modules/starships/starships.service";
import { VehiclesService } from "src/swapi/modules/vehicles/vehicles.service";
import { DatabaseCreateController } from "./database.create.controller";
import { DatabaseCreateService } from "./database.create.service";

/**
 * This module provides creating db data by requesting with GET method on it's controller root.
 * Data must be stored in .json files with each swapi entity data stored within directory SWAPI_ENTITY_PATH.
 */
@Module({
    imports: [DatabaseModule, TypeOrmModule.forFeature([Person, Image, Gender, Planet, Film, Species, Vehicle, Starship])],
    controllers: [DatabaseCreateController],
    providers: [
        DatabaseCreateService,
        FilmsService, PeopleService, PlanetsService, SpeciesService, StarshipsService, VehiclesService
    ]
})
export class DatabaseCreateModule { }