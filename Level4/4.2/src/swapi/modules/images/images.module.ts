import { Module } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ImagesController } from './images.controller';
import { Image } from '../../entities/image.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseModule } from 'src/database/database.module';
import { Person } from '../../entities/person.entity';
import { S3Service } from 'src/s3/s3.service';
import { S3Module } from 'src/s3/s3.module';

@Module({
  imports: [
    DatabaseModule, TypeOrmModule.forFeature([Image, Person]),
    S3Module,
  ],
  controllers: [ImagesController],
  providers: [ImagesService, S3Service]
})
export class ImagesModule { }
