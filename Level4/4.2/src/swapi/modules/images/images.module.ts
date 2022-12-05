import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from '../../entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Person } from '../../entities/person.entity';

@Module({
  imports: [DatabaseModule, TypeOrmModule.forFeature([Image, Person])],
  controllers: [ImagesController],
  providers: [ImagesService]
})
export class ImagesModule { }
