import { DynamicModule, Module } from "@nestjs/common";
import { PeopleService } from "./people.service";
import { PeopleController } from "./people.controller";
import { DatabaseModule } from "../../../database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "../../entities/person.entity";
import { Gender } from "../../entities/gender.entity";
import { Image } from "../../entities/image.entity";
import { Film } from "../../../swapi/entities/film.entity";
import { Planet } from "../../../swapi/entities/planet.entity";
import { Species } from "../../../swapi/entities/species.entity";
import { Vehicle } from "../../../swapi/entities/vehicle.entity";
import { Starship } from "../../../swapi/entities/starship.entity";

// @Module({
//   imports: [DatabaseModule, TypeOrmModule.forFeature([Person, Image, Gender, Planet, Film, Species, Vehicle, Starship])],
//   controllers: [PeopleController],
//   providers: [PeopleService]
// })
// export class PeopleModule { }

@Module({
  imports: [TypeOrmModule.forFeature([Person, Image, Gender, Planet, Film, Species, Vehicle, Starship])],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule {
  static register(options: { db: any }): DynamicModule {
    return {
      module: PeopleModule,
      imports: [options.db],
    };
  }
}
