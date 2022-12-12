import { Module } from '@nestjs/common';
import { PeopleModule } from '../swapi/modules/people/people.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { ImagesModule } from 'src/swapi/modules/images/images.module';
import { TransformInterceptor } from 'src/middleware/transform.interceptor';
import { AuthModule } from 'src/auth/auth.module';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';
import { RolesGuard } from 'src/auth/roles/roles.guard';

@Module({
  imports: [
    PeopleModule, ImagesModule, AuthModule,
    RouterModule.register([
      {
        path: 'login',
        module: AuthModule,
      },
      {
        path: 'people',
        module: PeopleModule,
        children: []
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
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
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