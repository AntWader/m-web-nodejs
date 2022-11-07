import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PeopleModule } from '../SWAPIentities/people/people.module';
import { imgUpload } from '../middleware/middleware.img';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    PeopleModule,
    RouterModule.register([
      {
        path: 'people',
        module: PeopleModule,
      },
    ]),
  ],
})
// export class ApiRouterModule { }
export class ApiRouterModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(imgUpload)
      .forRoutes('img/upload/people');
  }
}