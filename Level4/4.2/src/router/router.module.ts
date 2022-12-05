import { Module } from '@nestjs/common';
import { PeopleModule } from '../swapi/modules/people/people.module';
import { APP_INTERCEPTOR, RouterModule } from '@nestjs/core';
import { ImagesModule } from 'src/swapi/modules/images/images.module';
import { TransformInterceptor } from 'src/middleware/transform.interceptor';

@Module({
  imports: [
    PeopleModule, ImagesModule,
    RouterModule.register([
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