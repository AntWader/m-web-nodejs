import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PeopleModule } from '../swapi.entities/people/people.module';
import { RouterModule } from '@nestjs/core';
import { PeopleImgModule } from 'src/people.img/people.img.module';
import { PeopleImgController } from 'src/people.img/people.img.controller';
import { ImgUploader } from 'src/middleware/middleware.img';
import { PeopleController } from 'src/swapi.entities/people/people.controller';

@Module({
  imports: [
    PeopleModule, PeopleImgModule,
    RouterModule.register([
      {
        path: 'people',
        module: PeopleModule,
        children: [
          {
            path: 'img',
            module: PeopleImgModule,
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
      .forRoutes(PeopleImgController);
  }
}