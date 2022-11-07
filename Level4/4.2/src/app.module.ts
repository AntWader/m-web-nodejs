import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './SWAPIentities/people/people.module';
import { ApiRouterModule } from './router/router.module';

@Module({
  imports: [ApiRouterModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
