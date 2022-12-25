import { Module } from '@nestjs/common';
import { PeopleModule } from '../swapi/modules/people/people.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { ImagesModule } from 'src/swapi/modules/images/images.module';
import { TransformInterceptor } from 'src/middleware/transform.interceptor';
import { AuthModule } from 'src/auth/auth.module';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { LoggingInterceptor } from 'src/middleware/logging.interceptor';
import { SpeciesModule } from 'src/swapi/modules/species/species.module';
import { PlanetsModule } from 'src/swapi/modules/planets/planets.module';
import { StarshipsModule } from 'src/swapi/modules/starships/starships.module';
import { VehiclesModule } from 'src/swapi/modules/vehicles/vehicles.module';
import { FilmsModule } from 'src/swapi/modules/films/films.module';
import { GendersModule } from 'src/swapi/modules/genders/genders.module';
import { DatabaseCreateModule } from 'src/database.create/database.create.module';
import { ROUTER_AUTH_PATH, ROUTER_CREATE_DB_PATH, ROUTER_FILMS_PATH, ROUTER_GENDERS_PATH, ROUTER_IMAGES_PATH, ROUTER_PEOPLE_PATH, ROUTER_PLANETS_PATH, ROUTER_SPECIES_PATH, ROUTER_STARSHIPS_PATH, ROUTER_VEHICLES_PATH } from './router.config';

@Module({
  imports: [
    AuthModule,
    DatabaseCreateModule,
    FilmsModule, PeopleModule, GendersModule, PlanetsModule, SpeciesModule, StarshipsModule, VehiclesModule, ImagesModule,
    RouterModule.register([
      {
        path: ROUTER_AUTH_PATH,
        module: AuthModule,
      },
      {
        path: ROUTER_CREATE_DB_PATH,
        module: DatabaseCreateModule,
      },
      {
        path: ROUTER_FILMS_PATH,
        module: FilmsModule,
      },
      {
        path: ROUTER_PEOPLE_PATH,
        module: PeopleModule,
        children: []
      },
      {
        path: ROUTER_GENDERS_PATH,
        module: GendersModule,
      },
      {
        path: ROUTER_PLANETS_PATH,
        module: PlanetsModule,
      },
      {
        path: ROUTER_SPECIES_PATH,
        module: SpeciesModule,
      },
      {
        path: ROUTER_STARSHIPS_PATH,
        module: StarshipsModule,
      },
      {
        path: ROUTER_VEHICLES_PATH,
        module: VehiclesModule,
      },
      {
        path: ROUTER_IMAGES_PATH,
        module: ImagesModule,
      },
    ]),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class ApiRouterModule { }