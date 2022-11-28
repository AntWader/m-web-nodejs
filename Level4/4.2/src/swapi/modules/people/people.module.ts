import { Module } from "@nestjs/common";
import { PeopleService } from "./people.service";
import { PeopleController } from "./people.controller";
import { DatabaseModule } from "src/database/database.module";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Person } from "../../entities/person.entity";
import { Gender } from "../../entities/gender.entity";
import { Images } from "../../entities/image.entity";

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Person, Gender, Images])],
  controllers: [PeopleController],
  providers: [PeopleService]
})
export class PeopleModule { }
