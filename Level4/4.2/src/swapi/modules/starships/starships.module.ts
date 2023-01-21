import { DynamicModule, Module } from '@nestjs/common';
import { StarshipsService } from './starships.service';
import { StarshipsController } from './starships.controller';
import { DatabaseModule } from '../../../database/database.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Starship } from '../../../swapi/entities/starship.entity';
import { Person } from '../../../swapi/entities/person.entity';
import { Film } from '../../../swapi/entities/film.entity';

// @Module({
//   imports: [DatabaseModule, TypeOrmModule.forFeature([Starship, Person, Film])],
//   controllers: [StarshipsController],
//   providers: [StarshipsService]
// })
// export class StarshipsModule { }

@Module({
  imports: [TypeOrmModule.forFeature([Starship, Person, Film])],
  controllers: [StarshipsController],
  providers: [StarshipsService]
})
export class StarshipsModule {
  static register(options: { db: any }): DynamicModule {
    return {
      module: StarshipsModule,
      imports: [options.db],
    };
  }
}
