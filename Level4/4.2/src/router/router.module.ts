import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PeopleModule } from '../swapi/modules/people/people.module';
import { RouterModule } from '@nestjs/core';
import { ImgUploader } from 'src/middleware/middleware.img';
import { ImagesModule } from 'src/swapi/modules/images/images.module';
import { ImagesController } from 'src/swapi/modules/images/images.controller';

@Module({
  imports: [
    PeopleModule, ImagesModule,
    RouterModule.register([
      {
        path: 'people',
        module: PeopleModule,
        children: [
          {
            path: 'img',
            module: ImagesModule,
          },
        ]
      }
    ]),
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