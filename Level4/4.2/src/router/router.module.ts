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

@Module({
  imports: [
    AuthModule,
    FilmsModule, PeopleModule, GendersModule, PlanetsModule, SpeciesModule, StarshipsModule, VehiclesModule, ImagesModule,
    RouterModule.register([
      {
        path: 'login',
        module: AuthModule,
      },
      {
        path: 'films',
        module: FilmsModule,
      },
      {
        path: 'people',
        module: PeopleModule,
        children: []
      },
      {
        path: 'genders',
        module: GendersModule,
      },
      {
        path: 'planets',
        module: PlanetsModule,
      },
      {
        path: 'species',
        module: SpeciesModule,
      },
      {
        path: 'starships',
        module: StarshipsModule,
      },
      {
        path: 'vehicles',
        module: VehiclesModule,
      },
      {
        path: 'img/people',
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
    // {
    //   provide: APP_GUARD,
    //   useClass: RolesGuard,
    // },
  ],
})
export class ApiRouterModule { }
// export class ApiRouterModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer
//       .apply(ImgUploader)
//       .forRoutes(ImagesController);
//   }
// }