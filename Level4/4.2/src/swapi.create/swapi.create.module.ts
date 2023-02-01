import { DynamicModule, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DatabaseModule } from "../database/database.module";
import { Film } from "../swapi/entities/film.entity";
import { Gender } from "../swapi/entities/gender.entity";
import { Image } from "../swapi/entities/image.entity";
import { Person } from "../swapi/entities/person.entity";
import { Planet } from "../swapi/entities/planet.entity";
import { Species } from "../swapi/entities/species.entity";
import { Starship } from "../swapi/entities/starship.entity";
import { Vehicle } from "../swapi/entities/vehicle.entity";
import { FilmsService } from "../swapi/modules/films/films.service";
import { PeopleService } from "../swapi/modules/people/people.service";
import { PlanetsService } from "../swapi/modules/planets/planets.service";
import { SpeciesService } from "../swapi/modules/species/species.service";
import { StarshipsService } from "../swapi/modules/starships/starships.service";
import { VehiclesService } from "../swapi/modules/vehicles/vehicles.service";
import { DatabaseCreateController } from "./swapi.create.controller";
import { DatabaseCreateService } from "./swapi.create.service";

/**
 * This module provides creating db data by requesting with GET method on it's controller root.
 * Data must be stored in .json files with each swapi entity data stored within directory SWAPI_ENTITY_PATH.
 */
// @Module({
//     imports: [DatabaseModule, TypeOrmModule.forFeature([Person, Image, Gender, Planet, Film, Species, Vehicle, Starship])],
//     controllers: [DatabaseCreateController],
//     providers: [
//         DatabaseCreateService,
//         FilmsService, PeopleService, PlanetsService, SpeciesService, StarshipsService, VehiclesService
//     ]
// })
// export class DatabaseCreateModule { }

@Module({
    imports: [TypeOrmModule.forFeature([Person, Image, Gender, Planet, Film, Species, Vehicle, Starship])],
    controllers: [DatabaseCreateController],
    providers: [
        FilmsService, PeopleService, PlanetsService, SpeciesService, StarshipsService, VehiclesService
    ]
})
export class DatabaseCreateModule {
    static register(options: { db: any, backupPath: string }): DynamicModule {
        return {
            module: DatabaseCreateModule,
            imports: [options.db],
            providers: [
                {
                    provide: 'BACKUP_PATH',
                    useValue: options.backupPath,
                },
                DatabaseCreateService
            ]
        };
    }
}