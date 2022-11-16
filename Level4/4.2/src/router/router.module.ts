import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PeopleModule } from '../swapi.entities/people/people.module';
import { RouterModule } from '@nestjs/core';
import { ImgUploader } from 'src/middleware/middleware.img';
import { ImagesModule } from 'src/images/images.module';
import { ImagesController } from 'src/images/images.controller';

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
          }
        ]
      },
    ]),
  ],
})
// export class ApiRouterModule { }
export class ApiRouterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(ImgUploader)
      .forRoutes(ImagesController);
  }
}