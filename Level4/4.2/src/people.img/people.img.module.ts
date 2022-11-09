import { Module } from '@nestjs/common';
import { PeopleImgService } from './people.img.service';
import { PeopleImgController } from './people.img.controller';
import { DatabaseModule } from 'src/database/database.module';
import { PersonImg } from './entities/people.img.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([PersonImg])],
  controllers: [PeopleImgController],
  providers: [PeopleImgService]
})
export class PeopleImgModule { }
