import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PeopleModule } from './peopleApi/people/people.module';
import { PeopleApiModule } from './peopleApi/peopleApi.module';

@Module({
  imports: [PeopleApiModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
