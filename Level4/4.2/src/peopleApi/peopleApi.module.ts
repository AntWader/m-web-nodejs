import { Module, NestModule, MiddlewareConsumer } from '@nestjs/common';
import { PeopleModule } from './people/people.module';
import { imgUpload } from '../img/img.middleware';

@Module({
  imports: [PeopleModule],
})
export class PeopleApiModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(imgUpload)
      .forRoutes('img/upload/people');
  }
}